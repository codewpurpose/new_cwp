(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7813], {
        1150: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return l
                }
            });
            let r = n(5155),
                a = n(2115),
                o = n(4437);

            function s(e) {
                return {
                    default: e && "default" in e ? e.default : e
                }
            }
            n(6552);
            let i = {
                    loader: () => Promise.resolve(s(() => null)),
                    loading: null,
                    ssr: !0
                },
                l = function(e) {
                    let t = {
                            ...i,
                            ...e
                        },
                        n = (0, a.lazy)(() => t.loader().then(s)),
                        l = t.loading;

                    function d(e) {
                        let s = l ? (0, r.jsx)(l, {
                                isLoading: !0,
                                pastDelay: !0,
                                error: null
                            }) : null,
                            i = !t.ssr || !!t.loading,
                            d = i ? a.Suspense : a.Fragment,
                            c = t.ssr ? (0, r.jsxs)(r.Fragment, {
                                children: [null, (0, r.jsx)(n, {
                                    ...e
                                })]
                            }) : (0, r.jsx)(o.BailoutToCSR, {
                                reason: "next/dynamic",
                                children: (0, r.jsx)(n, {
                                    ...e
                                })
                            });
                        return (0, r.jsx)(d, {
                            ...i ? {
                                fallback: s
                            } : {},
                            children: c
                        })
                    }
                    return d.displayName = "LoadableComponent", d
                }
        },
        3861: (e, t, n) => {
            "use strict";
            n.d(t, {
                default: () => l
            });
            var r = n(5155),
                a = n(2115),
                o = n(2625);
            let s = [{
                question: "What is Glen, exactly?",
                answer: "Glen is shared learning for AI agents. Your agents call one tool each turn to get the facts that matter and store anything new. What any of them learns belongs to your whole org, so no agent ever starts from scratch."
            }, {
                question: "How is this different from a vector database or building my own RAG?",
                answer: "A vector database is a box you have to fill, tune, and query yourself. Glen is the finished service: it decides what to store and what's relevant for you, with no index to manage or retrieval code to write. And because it's shared across your org, knowledge compounds instead of being stuck in one app."
            }, {
                question: "Who in my org can see what Glen learns?",
                answer: "Everything Glen learns is shared across everyone in your organization, and that's what lets it compound. It's isolated at the org boundary: one organization's records can never be read by another, enforced with row-level security in the database. For anything too sensitive to share, switch on private mode and nothing from that chat is ever written."
            }, {
                question: "Which agents and clients does it work with?",
                answer: "Anything that speaks MCP: Claude and Claude Code, Cursor, Codex, and any custom agent on an MCP client. The same configuration works everywhere, so connecting one agent connects them all."
            }, {
                question: "How is my data stored and kept secure?",
                answer: "Your data lives in Postgres, encrypted in transit with TLS and at rest by the cloud provider. API keys are hashed with argon2id and all agent access goes through OAuth 2.1, so there are no long-lived secrets in agent configs."
            }, {
                question: "Is it production-ready, and how do I get started?",
                answer: "Glen runs in production today, and we onboard teams from the waitlist in waves. Join with your work email and we'll send your invite; from there, connecting one agent over MCP starts the learning on the first session. If you'd rather see it first, book a call with our founder."
            }];

            function i(e) {
                let {
                    faq: t
                } = e, [n, o] = (0, a.useState)(!1), s = (0, a.useId)();
                return (0, r.jsxs)("div", {
                    className: "home-card rounded-xl",
                    children: [(0, r.jsx)("h3", {
                        children: (0, r.jsxs)("button", {
                            type: "button",
                            onClick: () => o(e => !e),
                            "aria-expanded": n,
                            "aria-controls": s,
                            className: "flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left md:p-8",
                            children: [(0, r.jsx)("span", {
                                className: "text-lg leading-[1.2] md:text-xl",
                                children: t.question
                            }), (0, r.jsx)("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 14 14",
                                fill: "none",
                                stroke: "#818181",
                                strokeWidth: "1.5",
                                strokeLinecap: "round",
                                "aria-hidden": "true",
                                className: "shrink-0 transition-transform duration-300 motion-reduce:transition-none ".concat(n ? "rotate-45" : ""),
                                children: (0, r.jsx)("path", {
                                    d: "M7 1v12M1 7h12"
                                })
                            })]
                        })
                    }), (0, r.jsx)("div", {
                        id: s,
                        className: "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ".concat(n ? "grid-rows-[1fr]" : "grid-rows-[0fr]"),
                        children: (0, r.jsx)("div", {
                            className: "overflow-hidden",
                            children: (0, r.jsx)("p", {
                                className: "px-6 pb-6 text-sm leading-[1.5] text-[#636363] transition-opacity duration-300 motion-reduce:transition-none md:px-8 md:pb-8 md:text-[15px] ".concat(n ? "opacity-100" : "opacity-0"),
                                children: t.answer
                            })
                        })
                    })]
                })
            }

            function l() {
                return (0, r.jsx)("section", {
                    children: (0, r.jsxs)("div", {
                        className: "mx-auto w-full max-w-[85rem] px-5 md:px-10",
                        children: [(0, r.jsxs)("h2", {
                            className: "text-center text-base md:text-lg",
                            children: ["What teams usually ask before connecting Glen. Still have a question?", " ", (0, r.jsx)("a", {
                                href: o.fC,
                                className: "text-[#397554] underline-offset-2 hover:underline",
                                children: "Speak with us"
                            }), " ", "and ask us anything."]
                        }), (0, r.jsx)("div", {
                            className: "mx-auto mt-8 flex max-w-[51rem] flex-col gap-2",
                            children: s.map(e => (0, r.jsx)(i, {
                                faq: e
                            }, e.question))
                        })]
                    })
                })
            }
        },
        4054: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), ! function(e, t) {
                for (var n in t) Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
            }(t, {
                bindSnapshot: function() {
                    return s
                },
                createAsyncLocalStorage: function() {
                    return o
                },
                createSnapshot: function() {
                    return i
                }
            });
            let n = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
                value: "E504",
                enumerable: !1,
                configurable: !0
            });
            class r {
                disable() {
                    throw n
                }
                getStore() {}
                run() {
                    throw n
                }
                exit() {
                    throw n
                }
                enterWith() {
                    throw n
                }
                static bind(e) {
                    return e
                }
            }
            let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;

            function o() {
                return a ? new a : new r
            }

            function s(e) {
                return a ? a.bind(e) : r.bind(e)
            }

            function i() {
                return a ? a.snapshot() : function(e, ...t) {
                    return e(...t)
                }
            }
        },
        4437: (e, t, n) => {
            "use strict";

            function r(e) {
                let {
                    reason: t,
                    children: n
                } = e;
                return n
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "BailoutToCSR", {
                enumerable: !0,
                get: function() {
                    return r
                }
            }), n(4553)
        },
        6278: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "default", {
                enumerable: !0,
                get: function() {
                    return a
                }
            });
            let r = n(8140)._(n(1150));

            function a(e, t) {
                var n;
                let a = {};
                "function" == typeof e && (a.loader = e);
                let o = {
                    ...a,
                    ...t
                };
                return (0, r.default)({
                    ...o,
                    modules: null == (n = o.loadableGenerated) ? void 0 : n.modules
                })
            }("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
                value: !0
            }), Object.assign(t.default, t), e.exports = t.default)
        },
        6329: (e, t, n) => {
            Promise.resolve().then(n.bind(n, 2678)), Promise.resolve().then(n.bind(n, 3861)), Promise.resolve().then(n.bind(n, 984)), Promise.resolve().then(n.bind(n, 8001)), Promise.resolve().then(n.bind(n, 6597))
        },
        6552: (e, t, n) => {
            "use strict";

            function r(e) {
                let {
                    moduleIds: t
                } = e;
                return null
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "PreloadChunks", {
                enumerable: !0,
                get: function() {
                    return r
                }
            }), n(5155), n(7650), n(8567), n(7278)
        },
        6597: (e, t, n) => {
            "use strict";
            n.d(t, {
                default: () => l
            });
            var r = n(5155),
                a = n(6278),
                o = n.n(a),
                s = n(2115);
            let i = o()(() => Promise.all([n.e(1831), n.e(3682), n.e(9367), n.e(5847), n.e(9611)]).then(n.bind(n, 9611)).then(e => e.SpaceScrollScene), {
                loadableGenerated: {
                    webpack: () => [9611]
                },
                ssr: !1
            });

            function l() {
                let [e, t] = (0, s.useState)(0), [n, a] = (0, s.useState)(!1), o = (0, s.useRef)(null), l = (0, s.useRef)(0);
                return (0, s.useEffect)(() => {
                    let e = window.matchMedia("(max-width: 767px)"),
                        t = () => a(e.matches);
                    return t(), e.addEventListener("change", t), () => e.removeEventListener("change", t)
                }, []), (0, s.useEffect)(() => {
                    let e = () => {
                            l.current = 0;
                            let e = o.current;
                            if (!e) return;
                            let n = window.innerHeight || 1;
                            t(Math.min(1, Math.max(0, (.4 * n - e.getBoundingClientRect().top) / (.6 * n))))
                        },
                        n = () => {
                            l.current || (l.current = requestAnimationFrame(e))
                        };
                    return e(), window.addEventListener("scroll", n, {
                        passive: !0
                    }), () => {
                        window.removeEventListener("scroll", n), l.current && cancelAnimationFrame(l.current)
                    }
                }, []), (0, r.jsxs)("section", {
                    ref: o,
                    className: "relative mt-10 md:mt-14",
                    "aria-label": "A globe of particles, the shared learning every agent orbits",
                    children: [(0, r.jsx)("div", {
                        className: "mx-auto w-full max-w-[85rem] px-5 md:px-10",
                        children: (0, r.jsx)("div", {
                            className: "aspect-[455/256] w-full"
                        })
                    }), (0, r.jsx)("div", {
                        className: "pointer-events-none absolute inset-x-0 -inset-y-[150%] md:-inset-y-[30%]",
                        children: (0, r.jsx)(i, {
                            className: "absolute inset-0 h-full w-full",
                            transparent: !0,
                            scale: n ? .25 : .5,
                            dust: !1,
                            dissipation: e,
                            baseColor: [10, 14, 25],
                            noiseColor: [99, 99, 99]
                        })
                    })]
                })
            }
        },
        7828: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "workAsyncStorageInstance", {
                enumerable: !0,
                get: function() {
                    return r
                }
            });
            let r = (0, n(4054).createAsyncLocalStorage)()
        },
        8001: (e, t, n) => {
            "use strict";
            n.d(t, {
                default: () => l
            });
            var r = n(5155),
                a = n(2115),
                o = n(2678);
            let s = [{
                label: "One source of truth",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("ellipse", {
                        cx: "10",
                        cy: "4.5",
                        rx: "6.5",
                        ry: "2.5"
                    }), (0, r.jsx)("path", {
                        d: "M3.5 4.5v11c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-11M3.5 10c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5"
                    })]
                }),
                detail: {
                    title: "Every agent gives the same answer",
                    body: "When every person and every agent reads and writes one source of truth, they stop drifting into separate, contradictory versions of it. Different teams answer from the same facts, and each answer carries the turn it came from, so anyone can check why it is what it is.",
                    scenario: "Two teams ask their agents about the refund policy and get the same answer, traced to the decision that set it, not three stale copies that quietly disagree."
                }
            }, {
                label: "No ramp-up time",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("path", {
                        d: "M10 13.5c4.5-2.5 6.5-6.5 6.5-11-4.5 0-8.5 2-11 6.5l4.5 4.5Z"
                    }), (0, r.jsx)("path", {
                        d: "M5.5 9 3 10.5 5 12M11 14.5 9.5 17 8 15M13 7a1 1 0 1 0 0-.01"
                    }), (0, r.jsx)("path", {
                        d: "M4.5 15.5c-.8.8-1.2 2.3-1.3 3.3 1-.1 2.5-.5 3.3-1.3",
                        strokeLinecap: "round"
                    })]
                }),
                detail: {
                    title: "New people are productive on day one",
                    body: "When someone joins, they and their agents inherit a living snapshot of how the org actually works: the decisions, the conventions, and the reasons behind them. Ramp-up collapses from months to the first session, and anyone can do anyone's job to the same standard.",
                    scenario: "A new engineer's first pull request already follows your patterns. Their agent read the architectural decisions and the gotchas the team wrote months ago."
                }
            }, {
                label: "Knowledge that never leaves",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("path", {
                        d: "M10 2.5 17 6.25v7.5L10 17.5 3 13.75v-7.5L10 2.5Z"
                    }), (0, r.jsx)("path", {
                        d: "M3 6.25 10 10l7-3.75M10 10v7.5"
                    })]
                }),
                detail: {
                    title: "When people leave, the knowledge stays",
                    body: "Every decision someone made, every hard-won lesson, every customer quirk they learned stays with the org instead of in one person's head. When they move on, none of it walks out the door. Turnover stops costing you context.",
                    scenario: "A staff engineer resigns on Friday. On Monday, their replacement's agent still knows why the last migration happened and what broke the time before."
                }
            }, {
                label: "Train on your best people",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("path", {
                        d: "M3 4.5h14v9H8l-3.5 3v-3H3v-9Z"
                    }), (0, r.jsx)("path", {
                        d: "M6.5 9h7",
                        strokeLinecap: "round"
                    })]
                }),
                detail: {
                    title: "Your best people become everyone's coach",
                    body: "The judgment of your top performers becomes shared, replayable training. New hires can review calls and decisions as if they were sitting with the person who does it best, and their agents inherit that standard instead of generic advice.",
                    scenario: "A new rep runs call review as Thomas, your head of sales. The agent objects, paces, and closes the way Thomas does, because it learned from his calls."
                }
            }, {
                label: "Customer context that compounds",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("circle", {
                        cx: "10",
                        cy: "10",
                        r: "7.5"
                    }), (0, r.jsx)("ellipse", {
                        cx: "10",
                        cy: "10",
                        rx: "3.2",
                        ry: "7.5"
                    }), (0, r.jsx)("path", {
                        d: "M2.5 10h15"
                    })]
                }),
                detail: {
                    title: "Every account, understood over time",
                    body: "Glen keeps one growing record of each customer. Every call, ticket, and piece of work teaches the org that account's history and preferences, so the context never resets to zero when a different person or agent picks it up.",
                    scenario: "A teammate covers an account they have never touched. Their agent already knows the renewal date, the integration that broke last quarter, and who prefers email over calls."
                }
            }, {
                label: "Tools your agents already know",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("rect", {
                        x: "2",
                        y: "3.5",
                        width: "16",
                        height: "13",
                        rx: "2"
                    }), (0, r.jsx)("path", {
                        d: "m5.5 8 2.5 2-2.5 2M10.5 12.5h4"
                    })]
                }),
                detail: {
                    title: "Agents inherit how your experts use tools",
                    body: "Your agents act through tools over MCP, and they inherit how your people drive them. The hours one person spends teaching an agent a tool become every agent's starting point, so what the org learns turns into action, not recall alone.",
                    scenario: "Someone spends ten hours mastering Ashby with their agent. The next agent to touch Ashby already knows your stages, your fields, and your conventions."
                }
            }, {
                label: "A permanent, auditable record",
                icon: (0, r.jsxs)("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.4",
                    strokeLinejoin: "round",
                    "aria-hidden": "true",
                    children: [(0, r.jsx)("path", {
                        d: "M5 2.5h7l3 3v12H5v-15Z"
                    }), (0, r.jsx)("path", {
                        d: "M12 2.5v3h3M7.5 9.5h5M7.5 12.5h5",
                        strokeLinecap: "round"
                    })]
                }),
                detail: {
                    title: "Every decision, on the record for good",
                    body: "Glen keeps when decisions were made, who made them, and what led to them: one queryable timeline of the whole organization. Run a postmortem and walk the exact chain of choices that produced an outcome. The record still holds up ten or fifteen years from now.",
                    scenario: "Tracing a Q2 outage, you follow the thread back to a January design call, the trade-off noted in March, and who signed off, in minutes instead of weeks."
                }
            }];

            function i(e) {
                let {
                    detail: t
                } = e;
                return (0, r.jsxs)(r.Fragment, {
                    children: [(0, r.jsx)("h4", {
                        className: "pr-8 text-lg leading-[1.2] md:text-xl",
                        children: t.title
                    }), (0, r.jsx)("p", {
                        className: "mt-4 text-[15px] leading-[1.55] text-[#636363]",
                        children: t.body
                    }), (0, r.jsxs)("div", {
                        className: "mt-5 border-t-[0.5px] border-[#e1e1e1] pt-4",
                        children: [(0, r.jsx)("p", {
                            className: "text-[11px] font-medium uppercase tracking-[0.12em] text-[#818181]",
                            children: "In practice"
                        }), (0, r.jsx)("p", {
                            className: "mt-2 text-[14px] leading-[1.55] text-[#0a0e19]",
                            children: t.scenario
                        })]
                    })]
                })
            }

            function l() {
                let [e, t] = (0, a.useState)(null), [n, l] = (0, a.useState)(0), d = s[n].detail;
                return (0, r.jsxs)("div", {
                    className: "mx-auto w-full max-w-[85rem] px-5 md:px-10",
                    children: [(0, r.jsxs)("div", {
                        className: "relative flex overflow-hidden rounded-[24px] md:min-h-[760px]",
                        children: [(0, r.jsx)("div", {
                            className: "absolute inset-0",
                            style: {
                                background: "radial-gradient(120% 90% at 18% 22%, #2c4636 0%, transparent 55%), radial-gradient(110% 80% at 85% 75%, #20303f 0%, transparent 60%), radial-gradient(70% 60% at 60% 35%, #3a3128 0%, transparent 65%), #11161c"
                            }
                        }), (0, r.jsx)("div", {
                            className: "absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/30"
                        }), (0, r.jsxs)("div", {
                            className: "relative z-[1] flex w-full flex-col justify-between gap-10 p-7 md:flex-row md:p-[46px]",
                            children: [(0, r.jsx)("h3", {
                                className: "home-serif text-[1.75rem] leading-[1.05] text-white md:text-[2.75rem]",
                                children: "Why Glen?"
                            }), (0, r.jsxs)("div", {
                                className: "flex w-full flex-col md:w-auto md:flex-row md:self-stretch",
                                children: [(0, r.jsx)("div", {
                                    className: "flex w-full flex-col rounded-xl bg-white/95 p-2 backdrop-blur-[10px] md:w-[452px] md:max-w-none",
                                    children: s.map((n, o) => (0, r.jsxs)(a.Fragment, {
                                        children: [(0, r.jsxs)("button", {
                                            type: "button",
                                            onClick: () => {
                                                e === o ? t(null) : (l(o), t(o))
                                            },
                                            "aria-expanded": e === o,
                                            "aria-controls": "why-glen-detail why-glen-detail-".concat(o),
                                            className: ["home-template-row group flex flex-1 items-center gap-3 border-t-[0.5px] border-[#e1e1e1] px-4 py-4 text-left first:border-t-0", e === o ? "rounded-lg bg-[#f3f3f1]" : ""].join(" "),
                                            children: [(0, r.jsx)("span", {
                                                className: "shrink-0 text-[#0a0e19]",
                                                children: n.icon
                                            }), (0, r.jsx)("span", {
                                                className: "flex-1 text-[15px]",
                                                children: n.label
                                            }), (0, r.jsx)("span", {
                                                className: "home-row-arrow text-[#397554]",
                                                children: "→"
                                            })]
                                        }), (0, r.jsx)("div", {
                                            id: "why-glen-detail-".concat(o),
                                            className: ["home-detail min-[1200px]:hidden", e === o ? "home-detail-open" : ""].join(" "),
                                            "aria-hidden": e !== o,
                                            children: (0, r.jsx)("div", {
                                                className: "home-detail-inner",
                                                children: (0, r.jsx)("div", {
                                                    className: "rounded-lg bg-[#f3f3f1] px-4 py-5",
                                                    children: (0, r.jsx)(i, {
                                                        detail: n.detail
                                                    })
                                                })
                                            })
                                        })]
                                    }, n.label))
                                }), (0, r.jsx)("aside", {
                                    id: "why-glen-detail",
                                    className: ["home-detail hidden shrink-0 min-[1200px]:block", null !== e ? "home-detail-open" : ""].join(" "),
                                    "aria-hidden": null === e,
                                    children: (0, r.jsx)("div", {
                                        className: "home-detail-inner",
                                        children: (0, r.jsxs)("div", {
                                            className: "relative h-full rounded-xl bg-white/95 p-6 backdrop-blur-[10px] md:p-7",
                                            children: [(0, r.jsx)("button", {
                                                type: "button",
                                                onClick: () => t(null),
                                                "aria-label": "Close detail window",
                                                className: "absolute right-5 top-5 text-xl leading-none text-[#818181] transition-colors hover:text-[#0a0e19]",
                                                tabIndex: null === e ? -1 : 0,
                                                children: "\xd7"
                                            }), (0, r.jsx)(i, {
                                                detail: d
                                            })]
                                        })
                                    })
                                })]
                            })]
                        })]
                    }), (0, r.jsx)("div", {
                        className: "mt-5 flex justify-end",
                        children: (0, r.jsxs)(o.WaitlistButton, {
                            location: "templates_card",
                            className: "home-arrow-link cursor-pointer",
                            children: ["Join the waitlist ", (0, r.jsx)("span", {
                                className: "home-arrow",
                                children: "→"
                            })]
                        })
                    })]
                })
            }
        },
        8567: (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "workAsyncStorage", {
                enumerable: !0,
                get: function() {
                    return r.workAsyncStorageInstance
                }
            });
            let r = n(7828)
        }
    },
    e => {
        e.O(0, [984, 8441, 8229, 1255, 7358], () => e(e.s = 6329)), _N_E = e.O()
    }
]);