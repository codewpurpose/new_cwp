"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [984], {
        984: (e, t, l) => {
            l.d(t, {
                default: () => u
            });
            var r = l(5155),
                a = l(2115),
                i = l(2807),
                n = l(2625),
                s = l(2678);
            let o = [{
                    label: "Product",
                    href: "#product"
                }, {
                    label: "Why Glen",
                    href: "#why-glen"
                }, {
                    label: "How it works",
                    href: "#how"
                }, {
                    label: "Security",
                    href: "#security"
                }, {
                    label: "FAQ",
                    href: "#faq"
                }],
                c = {
                    background: "linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85)",
                    border: "0.5px solid rgba(206,206,206,0.22)"
                };

            function d(e) {
                let {
                    href: t
                } = e;
                return (0, r.jsx)("a", {
                    href: t,
                    className: "flex items-center",
                    "aria-label": "Glen home",
                    children: (0, r.jsx)(i.n, {
                        size: 28,
                        color: "#0a0e19"
                    })
                })
            }

            function u(e) {
                let {
                    home: t = !0
                } = e, [l, i] = (0, a.useState)(!1), u = e => t ? e : "/".concat(e);
                return (0, r.jsxs)("header", {
                    className: "sticky top-0 z-10",
                    children: [(0, r.jsxs)("div", {
                        className: "mx-auto grid w-full max-w-[85rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-8",
                        children: [(0, r.jsx)("div", {
                            className: "justify-self-start",
                            children: (0, r.jsx)(d, {
                                href: t ? "#top" : "/"
                            })
                        }), (0, r.jsx)("nav", {
                            className: "home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex",
                            style: c,
                            children: o.map(e => (0, r.jsx)("a", {
                                href: u(e.href),
                                className: "px-3 py-2",
                                children: e.label
                            }, e.href))
                        }), (0, r.jsxs)("div", {
                            className: "col-start-3 flex items-center gap-2 justify-self-end",
                            children: [(0, r.jsx)("div", {
                                className: "hidden min-[1200px]:block",
                                children: (0, r.jsx)("a", {
                                    href: n.fC,
                                    className: "home-btn home-btn-glass whitespace-nowrap",
                                    children: "Speak with us"
                                })
                            }), (0, r.jsx)(s.WaitlistButton, {
                                location: "nav",
                                className: "home-btn home-btn-glass whitespace-nowrap",
                                children: "Join the waitlist"
                            }), (0, r.jsx)("div", {
                                className: "min-[1200px]:hidden",
                                children: (0, r.jsx)("button", {
                                    type: "button",
                                    onClick: () => i(e => !e),
                                    "aria-expanded": l,
                                    "aria-controls": "home-mobile-menu",
                                    "aria-label": l ? "Close menu" : "Open menu",
                                    className: "home-btn home-btn-glass",
                                    children: (0, r.jsx)("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 16 16",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        "aria-hidden": "true",
                                        children: l ? (0, r.jsx)("path", {
                                            d: "M3 3l10 10M13 3L3 13"
                                        }) : (0, r.jsx)("path", {
                                            d: "M2 4.5h12M2 8h12M2 11.5h12"
                                        })
                                    })
                                })
                            })]
                        })]
                    }), l && (0, r.jsxs)("nav", {
                        id: "home-mobile-menu",
                        className: "absolute inset-x-0 top-full mx-5 flex flex-col rounded-xl p-2 backdrop-blur-[10px] min-[1200px]:hidden",
                        style: c,
                        children: [o.map(e => (0, r.jsx)("a", {
                            href: u(e.href),
                            onClick: () => i(!1),
                            className: "rounded-lg px-3 py-2.5 text-[1rem]",
                            children: e.label
                        }, e.href)), (0, r.jsx)("a", {
                            href: n.fC,
                            className: "mt-1 rounded-lg border-t-[0.5px] border-[#e1e1e1] px-3 py-2.5 text-[1rem]",
                            children: "Speak with us"
                        })]
                    })]
                })
            }
        },
        2625: (e, t, l) => {
            l.d(t, {
                fC: () => a,
                uf: () => r
            });
            let r = "mailto:".concat("founders@tryglen.com"),
                a = "https://glen.cal.com/general/glen-chat"
        },
        2678: (e, t, l) => {
            l.r(t), l.d(t, {
                WaitlistButton: () => u
            });
            var r = l(5155),
                a = l(2115),
                i = l(7999);
            let n = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                s = "glen-waitlist-auto-opened",
                o = "glen-waitlist-joined";

            function c(e) {
                try {
                    return null !== window.sessionStorage.getItem(e)
                } catch (e) {
                    return !1
                }
            }

            function d(e) {
                try {
                    window.sessionStorage.setItem(e, "1")
                } catch (e) {}
            }

            function u(e) {
                let {
                    location: t,
                    className: l,
                    children: u,
                    onOpen: h,
                    autoOpenAtScrollFraction: m
                } = e, p = (0, a.useRef)(null), [x, f] = (0, a.useState)(""), [w, b] = (0, a.useState)("idle"), [g, y] = (0, a.useState)(null), v = (0, a.useId)(), j = (0, a.useId)(), k = (0, a.useId)();
                (0, a.useEffect)(() => {
                    if (void 0 === m || c(s) || c(o)) return;
                    let e = 0,
                        l = () => {
                            window.removeEventListener("scroll", a), e && cancelAnimationFrame(e), e = 0
                        },
                        r = () => {
                            var r;
                            e = 0,
                                function(e) {
                                    let t = e.scrollHeight - e.innerHeight;
                                    return !(t <= 0) && e.scrollY / t >= e.fraction
                                }({
                                    scrollY: window.scrollY,
                                    scrollHeight: document.documentElement.scrollHeight,
                                    innerHeight: window.innerHeight,
                                    fraction: m
                                }) && (l(), c(o) || document.querySelector("dialog[open]") || (d(s), i.u.waitlistAutoOpened({
                                    location: t
                                }), null == h || h(), null == (r = p.current) || r.showModal()))
                        },
                        a = () => {
                            e || (e = requestAnimationFrame(r))
                        };
                    return window.addEventListener("scroll", a, {
                        passive: !0
                    }), a(), l
                }, [m, t, h]);
                let N = async e => {
                    e.preventDefault();
                    let l = x.trim();
                    if (!n.test(l)) {
                        y("Enter a valid work email."), b("error"), i.u.waitlistRequestFailed({
                            location: t,
                            error: "invalid_email"
                        });
                        return
                    }
                    b("submitting"), y(null);
                    try {
                        let e = await fetch("/api/request-access", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    email: l
                                })
                            }),
                            n = await e.json().catch(() => ({}));
                        if (!e.ok || !n.ok) {
                            var r, a;
                            y(null != (r = n.error) ? r : "Something went wrong. Try again."), b("error"), i.u.waitlistRequestFailed({
                                location: t,
                                error: null != (a = n.error) ? a : "server_error"
                            });
                            return
                        }
                        b("ok"), d(o), i.u.waitlistRequested({
                            location: t,
                            email: l
                        })
                    } catch (e) {
                        y("Network error. Try again."), b("error"), i.u.waitlistRequestFailed({
                            location: t,
                            error: "network_error"
                        })
                    }
                }, _ = "submitting" === w;
                return (0, r.jsxs)(r.Fragment, {
                    children: [void 0 !== u && (0, r.jsx)("button", {
                        type: "button",
                        className: l,
                        onClick: () => {
                            var e;
                            null == h || h(), null == (e = p.current) || e.showModal()
                        },
                        children: u
                    }), (0, r.jsx)("dialog", {
                        ref: p,
                        "aria-labelledby": v,
                        className: "waitlist-dialog",
                        onClick: e => {
                            var t;
                            e.target === e.currentTarget && (null == (t = p.current) || t.close())
                        },
                        children: (0, r.jsxs)("div", {
                            className: "relative p-6 md:p-8",
                            children: [(0, r.jsx)("button", {
                                type: "button",
                                onClick: () => {
                                    var e;
                                    return null == (e = p.current) ? void 0 : e.close()
                                },
                                "aria-label": "Close",
                                className: "absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-xl text-[#818181] hover:bg-[#f2f2f2] hover:text-[#0a0e19]",
                                children: "\xd7"
                            }), "ok" === w ? (0, r.jsxs)("div", {
                                role: "status",
                                children: [(0, r.jsx)("h2", {
                                    id: v,
                                    className: "pr-8 text-2xl font-medium",
                                    children: "You're on the list."
                                }), (0, r.jsxs)("p", {
                                    className: "mt-3 text-[15px] leading-[1.55] text-[#636363]",
                                    children: ["We'll email", " ", (0, r.jsx)("span", {
                                        className: "text-[#0a0e19]",
                                        children: x.trim()
                                    }), " when your invite is ready."]
                                })]
                            }) : (0, r.jsxs)("form", {
                                onSubmit: N,
                                noValidate: !0,
                                children: [(0, r.jsx)("h2", {
                                    id: v,
                                    className: "pr-8 text-2xl font-medium",
                                    children: "Join the waitlist"
                                }), (0, r.jsx)("p", {
                                    className: "mt-3 text-[15px] leading-[1.55] text-[#636363]",
                                    children: "We onboard teams in waves. Leave your work email and we'll send your invite when your spot opens."
                                }), (0, r.jsx)("label", {
                                    htmlFor: j,
                                    className: "sr-only",
                                    children: "Work email"
                                }), (0, r.jsx)("input", {
                                    id: j,
                                    name: "email",
                                    type: "email",
                                    autoComplete: "email",
                                    inputMode: "email",
                                    value: x,
                                    onChange: e => {
                                        f(e.target.value), "error" === w && b("idle")
                                    },
                                    "aria-invalid": "error" === w,
                                    "aria-describedby": "error" === w ? k : void 0,
                                    placeholder: "you@company.com",
                                    disabled: _,
                                    className: "mt-5 w-full rounded-md border-[0.5px] border-[#cecece] bg-white px-3 py-2 text-base text-[#0a0e19] placeholder:text-[#818181] focus:outline-2 focus:outline-[#0a0e19] disabled:opacity-60"
                                }), "error" === w && (0, r.jsx)("p", {
                                    id: k,
                                    role: "alert",
                                    className: "mt-2 text-sm text-[#b42318]",
                                    children: g
                                }), (0, r.jsx)("button", {
                                    type: "submit",
                                    disabled: _ || !x.trim(),
                                    className: "mt-4 w-full cursor-pointer rounded-lg border border-[#0a0e19] bg-[#0a0e19] px-3 py-2 text-base text-white transition-colors hover:bg-[#1a2030] disabled:cursor-default disabled:opacity-60",
                                    children: _ ? "Joining…" : "Join the waitlist"
                                })]
                            })]
                        })
                    })]
                })
            }
        },
        2807: (e, t, l) => {
            l.d(t, {
                n: () => a
            });
            var r = l(5155);

            function a(e) {
                let {
                    size: t = 24,
                    color: l = "currentColor",
                    className: a
                } = e;
                return (0, r.jsxs)("svg", {
                    width: t,
                    height: t,
                    viewBox: "0 0 32 32",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: a,
                    children: [(0, r.jsx)("path", {
                        d: "M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z",
                        fill: l,
                        opacity: "0.9"
                    }), (0, r.jsx)("path", {
                        d: "M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z",
                        fill: l
                    })]
                })
            }
        },
        7999: (e, t, l) => {
            l.d(t, {
                u: () => i
            });
            var r = l(6614);

            function a(e, t, l) {
                r.Ay.capture(e, {
                    ...null != t ? t : {},
                    ...l ? {
                        $set: l
                    } : {}
                })
            }
            let i = {
                waitlistRequested: e => a("waitlist_requested", {
                    location: e.location
                }, {
                    email: e.email,
                    is_waitlist: !0
                }),
                waitlistRequestFailed: e => a("waitlist_request_failed", {
                    location: e.location,
                    error: e.error
                }),
                waitlistAutoOpened: e => a("waitlist_auto_opened", {
                    location: e.location
                }),
                startupApplicationSubmitted: e => a("startup_application_submitted", {
                    team_size: e.teamSize,
                    stage: e.stage
                }, {
                    email: e.email,
                    company: e.company
                }),
                startupApplicationFailed: e => a("startup_application_failed", {
                    error: e.error
                }),
                ctaClicked: e => a("cta_clicked", {
                    cta: e.cta,
                    location: e.location,
                    href: e.href
                }),
                navLinkClicked: e => a("nav_link_clicked", {
                    label: e.label,
                    href: e.href
                }),
                copyClicked: e => a("copy_clicked", {
                    what: e.what,
                    slug: e.slug
                }),
                faqItemOpened: e => a("faq_item_opened", {
                    question: e.question
                }),
                pricingTierCtaClicked: e => a("pricing_tier_cta_clicked", {
                    tier: e.tier
                }),
                scrollDepth: e => a("scroll_depth", {
                    depth: e.depth,
                    path: e.path
                }),
                view: (e, t) => a(e, t)
            }
        }
    }
]);