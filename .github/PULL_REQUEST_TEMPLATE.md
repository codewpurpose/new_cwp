## Summary

<!-- What does this PR do and why? -->

## Related Issue

<!-- Link to the issue this addresses, e.g. Closes #123. Lessons need a proposal issue. -->

## Type of Change

- [ ] New lesson
- [ ] Lesson fix or improvement
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Breaking change

## Checklist

- [ ] `npm run check` passes (lint + typecheck + lesson validator + build)

### If this touches `/learn`

- [ ] A lesson proposal issue was opened and confirmed before writing
- [ ] `npm run learn:check` passes
- [ ] Every id in `headings` has a matching `id="..."` in the body component
- [ ] Cover art added — not the silent fallback
- [ ] Data is seeded at module scope; no `Math.random()`, `Date.now()`, or `new Date()`
- [ ] No `toLocaleString` or `Intl.NumberFormat`
- [ ] Composed from `src/components/learn/primitives/`, no hand-rolled styled blocks
- [ ] No heading ids renamed on an existing lesson (they are permanent links)
- [ ] Read back at 375px and with reduced motion
- [ ] Original work, not paraphrased from another course, book, or blog
