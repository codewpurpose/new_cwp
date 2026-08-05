"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ACHIEVEMENTS,
  AVATARS,
  DEFAULT_STUDENT,
  STUDENT_KEY,
  THEMES,
  XP_PER_CHAPTER,
  derive,
  hasToolkitNotes,
  today,
  wasYesterday,
  type StudentState,
} from "@/lib/student";

function load(): StudentState {
  if (typeof window === "undefined") return DEFAULT_STUDENT;
  try {
    const raw = localStorage.getItem(STUDENT_KEY);
    if (!raw) return DEFAULT_STUDENT;
    return { ...DEFAULT_STUDENT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function useStudent() {
  const [state, setState] = useState<StudentState>(DEFAULT_STUDENT);
  const [loaded, setLoaded] = useState(false);
  const [hasNotes, setHasNotes] = useState(false);
  const ready = useRef(false);

  // Load once, and roll the streak forward for today.
  useEffect(() => {
    const initial = load();
    const t = today();
    let streak = initial.streakDays;
    if (initial.lastActive !== t) {
      streak = wasYesterday(initial.lastActive, t) ? initial.streakDays + 1 : 1;
    }
    ready.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ ...initial, streakDays: streak, lastActive: t });
    setHasNotes(hasToolkitNotes());
    setLoaded(true);
  }, []);

  // Persist after every change (once the real state is loaded).
  useEffect(() => {
    if (!ready.current) return;
    try {
      localStorage.setItem(STUDENT_KEY, JSON.stringify(state));
    } catch {
      /* private mode — fine */
    }
  }, [state]);

  // When cross-device sync merges remote progress/XP into the store, re-read it
  // so the dashboard reflects it live.
  useEffect(() => {
    const reload = () => {
      if (!ready.current) return;
      setState((prev) => ({ ...prev, ...load() }));
    };
    window.addEventListener("cwp:progress-changed", reload);
    return () => window.removeEventListener("cwp:progress-changed", reload);
  }, []);

  const toggleChapter = useCallback((courseId: string, slug: string) => {
    setState((s) => {
      const done = s.progress[courseId] || [];
      const has = done.includes(slug);
      const nextDone = has ? done.filter((x) => x !== slug) : [...done, slug];
      return {
        ...s,
        progress: { ...s.progress, [courseId]: nextDone },
        xp: Math.max(0, s.xp + (has ? -XP_PER_CHAPTER : XP_PER_CHAPTER)),
      };
    });
  }, []);

  const unlock = useCallback((id: string, cost: number) => {
    setState((s) => (s.xp >= cost && !s.unlocked.includes(id) ? { ...s, unlocked: [...s.unlocked, id] } : s));
  }, []);

  const equipAvatar = useCallback((id: string) => {
    setState((s) => (s.unlocked.includes(id) ? { ...s, avatar: id } : s));
  }, []);

  const equipTheme = useCallback((id: string) => {
    setState((s) => (s.unlocked.includes(id) ? { ...s, theme: id } : s));
  }, []);

  const setName = useCallback((name: string) => setState((s) => ({ ...s, name })), []);

  const reset = useCallback(() => {
    setState({ ...DEFAULT_STUDENT, lastActive: today(), streakDays: 1 });
  }, []);

  const derived = useMemo(() => derive(state), [state]);
  const earned = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.earned(state, derived, { hasNotes })),
    [state, derived, hasNotes],
  );

  return {
    state,
    loaded,
    derived,
    earned,
    hasNotes,
    avatars: AVATARS,
    themes: THEMES,
    actions: { toggleChapter, unlock, equipAvatar, equipTheme, setName, reset },
  };
}
