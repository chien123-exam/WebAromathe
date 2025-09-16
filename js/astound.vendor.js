(self.webpackChunkaromatherapy_2_0 = self.webpackChunkaromatherapy_2_0 || []).push([
    [736], {
        8764: function(e, t, n) {
            "use strict";

            function s(e, t, n) {
                if (-1 === e.indexOf(t)) return n;
                const s = e[e.indexOf(t) + 1];
                if (!s) return n;
                if ("duration" === t) {
                    let e = s.match(/([0-9]+)ms/);
                    if (e) return e[1]
                }
                if ("min" === t) {
                    let e = s.match(/([0-9]+)px/);
                    if (e) return e[1]
                }
                return s
            }
            n.d(t, {
                Z: function() {
                    return i
                }
            });
            var i = function(e) {
                function t(t, {
                    modifiers: n
                }) {
                    let i = s(n, "duration", 250) / 1e3,
                        r = s(n, "min", 0),
                        a = !n.includes("min");
                    t._x_isShown || (t.style.height = `${r}px`), !t._x_isShown && a && (t.hidden = !0), t._x_isShown || (t.style.overflow = "hidden");
                    let o = (t, n) => {
                            let s = e.setStyles(t, n);
                            return n.height ? () => {} : s
                        },
                        l = {
                            transitionProperty: "height",
                            transitionDuration: `${i}s`,
                            transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)"
                        };
                    t._x_transition = {
                        in(n = (() => {}), s = (() => {})) {
                            a && (t.hidden = !1), a && (t.style.display = null);
                            let i = t.getBoundingClientRect().height;
                            t.style.height = "auto";
                            let o = t.getBoundingClientRect().height;
                            i === o && (i = r), e.transition(t, e.setStyles, {
                                during: l,
                                start: {
                                    height: i + "px"
                                },
                                end: {
                                    height: o + "px"
                                }
                            }, (() => t._x_isShown = !0), (() => {
                                t.getBoundingClientRect().height == o && (t.style.overflow = null)
                            }))
                        },
                        out(n = (() => {}), s = (() => {})) {
                            let i = t.getBoundingClientRect().height;
                            e.transition(t, o, {
                                during: l,
                                start: {
                                    height: i + "px"
                                },
                                end: {
                                    height: r + "px"
                                }
                            }, (() => t.style.overflow = "hidden"), (() => {
                                t._x_isShown = !1, t.style.height == `${r}px` && a && (t.style.display = "none", t.hidden = !0)
                            }))
                        }
                    }
                }
                e.directive("collapse", t), t.inline = (e, {
                    modifiers: t
                }) => {
                    t.includes("min") && (e._x_doShow = () => {}, e._x_doHide = () => {})
                }
            }
        },
        4394: function(e, t, n) {
            "use strict";

            function s(e) {
                if (e.includes("full")) return .99;
                if (e.includes("half")) return .5;
                if (!e.includes("threshold")) return 0;
                let t = e[e.indexOf("threshold") + 1];
                return "100" === t ? 1 : "0" === t ? 0 : Number(`.${t}`)
            }

            function i(e) {
                let t = e.match(/^(-?[0-9]+)(px|%)?$/);
                return t ? t[1] + (t[2] || "px") : void 0
            }

            function r(e) {
                const t = "0px 0px 0px 0px",
                    n = e.indexOf("margin");
                if (-1 === n) return t;
                let s = [];
                for (let t = 1; t < 5; t++) s.push(i(e[n + t] || ""));
                return s = s.filter((e => void 0 !== e)), s.length ? s.join(" ").trim() : t
            }
            n.d(t, {
                Z: function() {
                    return a
                }
            });
            var a = function(e) {
                e.directive("intersect", ((e, {
                    value: t,
                    expression: n,
                    modifiers: i
                }, {
                    evaluateLater: a,
                    cleanup: o
                }) => {
                    let l = a(n),
                        c = {
                            rootMargin: r(i),
                            threshold: s(i)
                        },
                        d = new IntersectionObserver((e => {
                            e.forEach((e => {
                                e.isIntersecting !== ("leave" === t) && (l(), i.includes("once") && d.disconnect())
                            }))
                        }), c);
                    d.observe(e), o((() => {
                        d.disconnect()
                    }))
                }))
            }
        },
        1095: function(e, t, n) {
            "use strict";

            function s(e, t) {
                return null !== t.getItem(e)
            }

            function i(e, t) {
                return JSON.parse(t.getItem(e, t))
            }

            function r(e, t, n) {
                n.setItem(e, JSON.stringify(t))
            }
            n.d(t, {
                Z: function() {
                    return a
                }
            });
            var a = function(e) {
                let t = () => {
                    let t, n = localStorage;
                    return e.interceptor(((a, o, l, c, d) => {
                        let u = t || `_x_${c}`,
                            p = s(u, n) ? i(u, n) : a;
                        return l(p), e.effect((() => {
                            let e = o();
                            r(u, e, n), l(e)
                        })), p
                    }), (e => {
                        e.as = n => (t = n, e), e.using = t => (n = t, e)
                    }))
                };
                Object.defineProperty(e, "$persist", {
                    get: () => t()
                }), e.magic("persist", t), e.persist = (t, {
                    get: n,
                    set: a
                }, o = localStorage) => {
                    let l = s(t, o) ? i(t, o) : n();
                    a(l), e.effect((() => {
                        let e = n();
                        r(t, e, o), a(e)
                    }))
                }
            }
        },
        4306: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return Gn
                }
            });
            var s, i, r, a, o = !1,
                l = !1,
                c = [],
                d = -1;

            function u(e) {
                ! function(e) {
                    c.includes(e) || c.push(e);
                    l || o || (o = !0, queueMicrotask(f))
                }(e)
            }

            function p(e) {
                let t = c.indexOf(e); - 1 !== t && t > d && c.splice(t, 1)
            }

            function f() {
                o = !1, l = !0;
                for (let e = 0; e < c.length; e++) c[e](), d = e;
                c.length = 0, d = -1, l = !1
            }
            var h = !0;

            function m(e) {
                i = e
            }

            function g(e, t, n = {}) {
                e.dispatchEvent(new CustomEvent(t, {
                    detail: n,
                    bubbles: !0,
                    composed: !0,
                    cancelable: !0
                }))
            }

            function v(e, t) {
                if ("function" == typeof ShadowRoot && e instanceof ShadowRoot) return void Array.from(e.children).forEach((e => v(e, t)));
                let n = !1;
                if (t(e, (() => n = !0)), n) return;
                let s = e.firstElementChild;
                for (; s;) v(s, t), s = s.nextElementSibling
            }

            function b(e, ...t) {
                console.warn(`Alpine Warning: ${e}`, ...t)
            }
            var y = !1;
            var w = [],
                x = [];

            function E() {
                return w.map((e => e()))
            }

            function _() {
                return w.concat(x).map((e => e()))
            }

            function C(e) {
                w.push(e)
            }

            function S(e) {
                x.push(e)
            }

            function $(e, t = !1) {
                return T(e, (e => {
                    if ((t ? _() : E()).some((t => e.matches(t)))) return !0
                }))
            }

            function T(e, t) {
                if (e) {
                    if (t(e)) return e;
                    if (e._x_teleportBack && (e = e._x_teleportBack), e.parentElement) return T(e.parentElement, t)
                }
            }
            var M = [];

            function z(e, t = v, n = (() => {})) {
                ! function(e) {
                    Ee = !0;
                    let t = Symbol();
                    Ce = t, _e.set(t, []);
                    let n = () => {
                            for (; _e.get(t).length;) _e.get(t).shift()();
                            _e.delete(t)
                        },
                        s = () => {
                            Ee = !1, n()
                        };
                    e(n), s()
                }((() => {
                    t(e, ((e, t) => {
                        n(e, t), M.forEach((n => n(e, t))), we(e, e.attributes).forEach((e => e())), e._x_ignore && t()
                    }))
                }))
            }

            function P(e) {
                v(e, (e => {
                    D(e),
                        function(e) {
                            if (e._x_cleanups)
                                for (; e._x_cleanups.length;) e._x_cleanups.pop()()
                        }(e)
                }))
            }
            var A = [],
                k = [],
                O = [];

            function L(e, t) {
                "function" == typeof t ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, k.push(t))
            }

            function I(e) {
                A.push(e)
            }

            function N(e, t, n) {
                e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n)
            }

            function D(e, t) {
                e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach((([n, s]) => {
                    (void 0 === t || t.includes(n)) && (s.forEach((e => e())), delete e._x_attributeCleanups[n])
                }))
            }
            var j = new MutationObserver(Y),
                R = !1;

            function B() {
                j.observe(document, {
                    subtree: !0,
                    childList: !0,
                    attributes: !0,
                    attributeOldValue: !0
                }), R = !0
            }

            function H() {
                (W = W.concat(j.takeRecords())).length && !F && (F = !0, queueMicrotask((() => {
                    Y(W), W.length = 0, F = !1
                }))), j.disconnect(), R = !1
            }
            var W = [],
                F = !1;

            function G(e) {
                if (!R) return e();
                H();
                let t = e();
                return B(), t
            }
            var q = !1,
                X = [];

            function Y(e) {
                if (q) return void(X = X.concat(e));
                let t = [],
                    n = [],
                    s = new Map,
                    i = new Map;
                for (let r = 0; r < e.length; r++)
                    if (!e[r].target._x_ignoreMutationObserver && ("childList" === e[r].type && (e[r].addedNodes.forEach((e => 1 === e.nodeType && t.push(e))), e[r].removedNodes.forEach((e => 1 === e.nodeType && n.push(e)))), "attributes" === e[r].type)) {
                        let t = e[r].target,
                            n = e[r].attributeName,
                            a = e[r].oldValue,
                            o = () => {
                                s.has(t) || s.set(t, []), s.get(t).push({
                                    name: n,
                                    value: t.getAttribute(n)
                                })
                            },
                            l = () => {
                                i.has(t) || i.set(t, []), i.get(t).push(n)
                            };
                        t.hasAttribute(n) && null === a ? o() : t.hasAttribute(n) ? (l(), o()) : l()
                    } i.forEach(((e, t) => {
                    D(t, e)
                })), s.forEach(((e, t) => {
                    A.forEach((n => n(t, e)))
                }));
                for (let e of n) t.includes(e) || (k.forEach((t => t(e))), P(e));
                t.forEach((e => {
                    e._x_ignoreSelf = !0, e._x_ignore = !0
                }));
                for (let e of t) n.includes(e) || e.isConnected && (delete e._x_ignoreSelf, delete e._x_ignore, O.forEach((t => t(e))), e._x_ignore = !0, e._x_ignoreSelf = !0);
                t.forEach((e => {
                    delete e._x_ignoreSelf, delete e._x_ignore
                })), t = null, n = null, s = null, i = null
            }

            function V(e) {
                return Z(K(e))
            }

            function U(e, t, n) {
                return e._x_dataStack = [t, ...K(n || e)], () => {
                    e._x_dataStack = e._x_dataStack.filter((e => e !== t))
                }
            }

            function K(e) {
                return e._x_dataStack ? e._x_dataStack : "function" == typeof ShadowRoot && e instanceof ShadowRoot ? K(e.host) : e.parentNode ? K(e.parentNode) : []
            }

            function Z(e) {
                return new Proxy({
                    objects: e
                }, J)
            }
            var J = {
                ownKeys({
                    objects: e
                }) {
                    return Array.from(new Set(e.flatMap((e => Object.keys(e)))))
                },
                has({
                    objects: e
                }, t) {
                    return t != Symbol.unscopables && e.some((e => Object.prototype.hasOwnProperty.call(e, t)))
                },
                get({
                    objects: e
                }, t, n) {
                    return "toJSON" == t ? Q : Reflect.get(e.find((e => Object.prototype.hasOwnProperty.call(e, t))) || {}, t, n)
                },
                set({
                    objects: e
                }, t, n) {
                    return Reflect.set(e.find((e => Object.prototype.hasOwnProperty.call(e, t))) || e[e.length - 1], t, n)
                }
            };

            function Q() {
                return Reflect.ownKeys(this).reduce(((e, t) => (e[t] = Reflect.get(this, t), e)), {})
            }

            function ee(e) {
                let t = (n, s = "") => {
                    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach((([i, {
                        value: r,
                        enumerable: a
                    }]) => {
                        if (!1 === a || void 0 === r) return;
                        let o = "" === s ? i : `${s}.${i}`;
                        var l;
                        "object" == typeof r && null !== r && r._x_interceptor ? n[i] = r.initialize(e, o, i) : "object" != typeof(l = r) || Array.isArray(l) || null === l || r === n || r instanceof Element || t(r, o)
                    }))
                };
                return t(e)
            }

            function te(e, t = (() => {})) {
                let n = {
                    initialValue: void 0,
                    _x_interceptor: !0,
                    initialize(t, n, s) {
                        return e(this.initialValue, (() => function(e, t) {
                            return t.split(".").reduce(((e, t) => e[t]), e)
                        }(t, n)), (e => ne(t, n, e)), n, s)
                    }
                };
                return t(n), e => {
                    if ("object" == typeof e && null !== e && e._x_interceptor) {
                        let t = n.initialize.bind(n);
                        n.initialize = (s, i, r) => {
                            let a = e.initialize(s, i, r);
                            return n.initialValue = a, t(s, i, r)
                        }
                    } else n.initialValue = e;
                    return n
                }
            }

            function ne(e, t, n) {
                if ("string" == typeof t && (t = t.split(".")), 1 !== t.length) {
                    if (0 === t.length) throw error;
                    return e[t[0]] || (e[t[0]] = {}), ne(e[t[0]], t.slice(1), n)
                }
                e[t[0]] = n
            }
            var se = {};

            function ie(e, t) {
                se[e] = t
            }

            function re(e, t) {
                return Object.entries(se).forEach((([n, s]) => {
                    let i = null;
                    Object.defineProperty(e, `$${n}`, {
                        get() {
                            return s(t, function() {
                                if (i) return i;
                                {
                                    let [e, n] = Se(t);
                                    return i = {
                                        interceptor: te,
                                        ...e
                                    }, L(t, n), i
                                }
                            }())
                        },
                        enumerable: !1
                    })
                })), e
            }

            function ae(e, t, n, ...s) {
                try {
                    return n(...s)
                } catch (n) {
                    oe(n, e, t)
                }
            }

            function oe(e, t, n = void 0) {
                Object.assign(e, {
                    el: t,
                    expression: n
                }), console.warn(`Alpine Expression Error: ${e.message}\n\n${n?'Expression: "'+n+'"\n\n':""}`, t), setTimeout((() => {
                    throw e
                }), 0)
            }
            var le = !0;

            function ce(e) {
                let t = le;
                le = !1;
                let n = e();
                return le = t, n
            }

            function de(e, t, n = {}) {
                let s;
                return ue(e, t)((e => s = e), n), s
            }

            function ue(...e) {
                return pe(...e)
            }
            var pe = fe;

            function fe(e, t) {
                let n = {};
                re(n, e);
                let s = [n, ...K(e)],
                    i = "function" == typeof t ? function(e, t) {
                        return (n = (() => {}), {
                            scope: s = {},
                            params: i = []
                        } = {}) => {
                            me(n, t.apply(Z([s, ...e]), i))
                        }
                    }(s, t) : function(e, t, n) {
                        let s = function(e, t) {
                            if (he[e]) return he[e];
                            let n = Object.getPrototypeOf((async function() {})).constructor,
                                s = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e;
                            const i = () => {
                                try {
                                    let t = new n(["__self", "scope"], `with (scope) { __self.result = ${s} }; __self.finished = true; return __self.result;`);
                                    return Object.defineProperty(t, "name", {
                                        value: `[Alpine] ${e}`
                                    }), t
                                } catch (n) {
                                    return oe(n, t, e), Promise.resolve()
                                }
                            };
                            let r = i();
                            return he[e] = r, r
                        }(t, n);
                        return (i = (() => {}), {
                            scope: r = {},
                            params: a = []
                        } = {}) => {
                            s.result = void 0, s.finished = !1;
                            let o = Z([r, ...e]);
                            if ("function" == typeof s) {
                                let e = s(s, o).catch((e => oe(e, n, t)));
                                s.finished ? (me(i, s.result, o, a, n), s.result = void 0) : e.then((e => {
                                    me(i, e, o, a, n)
                                })).catch((e => oe(e, n, t))).finally((() => s.result = void 0))
                            }
                        }
                    }(s, t, e);
                return ae.bind(null, e, t, i)
            }
            var he = {};

            function me(e, t, n, s, i) {
                if (le && "function" == typeof t) {
                    let r = t.apply(n, s);
                    r instanceof Promise ? r.then((t => me(e, t, n, s))).catch((e => oe(e, i, t))) : e(r)
                } else "object" == typeof t && t instanceof Promise ? t.then((t => e(t))) : e(t)
            }
            var ge = "x-";

            function ve(e = "") {
                return ge + e
            }
            var be = {};

            function ye(e, t) {
                return be[e] = t, {
                    before(t) {
                        if (!be[t]) return void console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
                        const n = Oe.indexOf(t);
                        Oe.splice(n >= 0 ? n : Oe.indexOf("DEFAULT"), 0, e)
                    }
                }
            }

            function we(e, t, n) {
                if (t = Array.from(t), e._x_virtualDirectives) {
                    let n = Object.entries(e._x_virtualDirectives).map((([e, t]) => ({
                            name: e,
                            value: t
                        }))),
                        s = xe(n);
                    n = n.map((e => s.find((t => t.name === e.name)) ? {
                        name: `x-bind:${e.name}`,
                        value: `"${e.value}"`
                    } : e)), t = t.concat(n)
                }
                let s = {},
                    i = t.map(Te(((e, t) => s[e] = t))).filter(Pe).map(function(e, t) {
                        return ({
                            name: n,
                            value: s
                        }) => {
                            let i = n.match(Ae()),
                                r = n.match(/:([a-zA-Z0-9\-:]+)/),
                                a = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                                o = t || e[n] || n;
                            return {
                                type: i ? i[1] : null,
                                value: r ? r[1] : null,
                                modifiers: a.map((e => e.replace(".", ""))),
                                expression: s,
                                original: o
                            }
                        }
                    }(s, n)).sort(Le);
                return i.map((t => function(e, t) {
                    let n = () => {},
                        s = be[t.type] || n,
                        [i, r] = Se(e);
                    N(e, t.original, r);
                    let a = () => {
                        e._x_ignore || e._x_ignoreSelf || (s.inline && s.inline(e, t, i), s = s.bind(s, e, t, i), Ee ? _e.get(Ce).push(s) : s())
                    };
                    return a.runCleanups = r, a
                }(e, t)))
            }

            function xe(e) {
                return Array.from(e).map(Te()).filter((e => !Pe(e)))
            }
            var Ee = !1,
                _e = new Map,
                Ce = Symbol();

            function Se(e) {
                let t = [],
                    [n, s] = function(e) {
                        let t = () => {};
                        return [n => {
                            let s = i(n);
                            return e._x_effects || (e._x_effects = new Set, e._x_runEffects = () => {
                                e._x_effects.forEach((e => e()))
                            }), e._x_effects.add(s), t = () => {
                                void 0 !== s && (e._x_effects.delete(s), r(s))
                            }, s
                        }, () => {
                            t()
                        }]
                    }(e);
                t.push(s);
                return [{
                    Alpine: dt,
                    effect: n,
                    cleanup: e => t.push(e),
                    evaluateLater: ue.bind(ue, e),
                    evaluate: de.bind(de, e)
                }, () => t.forEach((e => e()))]
            }
            var $e = (e, t) => ({
                name: n,
                value: s
            }) => (n.startsWith(e) && (n = n.replace(e, t)), {
                name: n,
                value: s
            });

            function Te(e = (() => {})) {
                return ({
                    name: t,
                    value: n
                }) => {
                    let {
                        name: s,
                        value: i
                    } = Me.reduce(((e, t) => t(e)), {
                        name: t,
                        value: n
                    });
                    return s !== t && e(s, t), {
                        name: s,
                        value: i
                    }
                }
            }
            var Me = [];

            function ze(e) {
                Me.push(e)
            }

            function Pe({
                name: e
            }) {
                return Ae().test(e)
            }
            var Ae = () => new RegExp(`^${ge}([^:^.]+)\\b`);
            var ke = "DEFAULT",
                Oe = ["ignore", "ref", "data", "id", "bind", "init", "for", "model", "modelable", "transition", "show", "if", ke, "teleport"];

            function Le(e, t) {
                let n = -1 === Oe.indexOf(e.type) ? ke : e.type,
                    s = -1 === Oe.indexOf(t.type) ? ke : t.type;
                return Oe.indexOf(n) - Oe.indexOf(s)
            }
            var Ie = [],
                Ne = !1;

            function De(e = (() => {})) {
                return queueMicrotask((() => {
                    Ne || setTimeout((() => {
                        je()
                    }))
                })), new Promise((t => {
                    Ie.push((() => {
                        e(), t()
                    }))
                }))
            }

            function je() {
                for (Ne = !1; Ie.length;) Ie.shift()()
            }

            function Re(e, t) {
                return Array.isArray(t) ? Be(e, t.join(" ")) : "object" == typeof t && null !== t ? function(e, t) {
                    let n = e => e.split(" ").filter(Boolean),
                        s = Object.entries(t).flatMap((([e, t]) => !!t && n(e))).filter(Boolean),
                        i = Object.entries(t).flatMap((([e, t]) => !t && n(e))).filter(Boolean),
                        r = [],
                        a = [];
                    return i.forEach((t => {
                        e.classList.contains(t) && (e.classList.remove(t), a.push(t))
                    })), s.forEach((t => {
                        e.classList.contains(t) || (e.classList.add(t), r.push(t))
                    })), () => {
                        a.forEach((t => e.classList.add(t))), r.forEach((t => e.classList.remove(t)))
                    }
                }(e, t) : "function" == typeof t ? Re(e, t()) : Be(e, t)
            }

            function Be(e, t) {
                return t = !0 === t ? t = "" : t || "", n = t.split(" ").filter((t => !e.classList.contains(t))).filter(Boolean), e.classList.add(...n), () => {
                    e.classList.remove(...n)
                };
                var n
            }

            function He(e, t) {
                return "object" == typeof t && null !== t ? function(e, t) {
                    let n = {};
                    return Object.entries(t).forEach((([t, s]) => {
                        n[t] = e.style[t], t.startsWith("--") || (t = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()), e.style.setProperty(t, s)
                    })), setTimeout((() => {
                        0 === e.style.length && e.removeAttribute("style")
                    })), () => {
                        He(e, n)
                    }
                }(e, t) : function(e, t) {
                    let n = e.getAttribute("style", t);
                    return e.setAttribute("style", t), () => {
                        e.setAttribute("style", n || "")
                    }
                }(e, t)
            }

            function We(e, t = (() => {})) {
                let n = !1;
                return function() {
                    n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments))
                }
            }

            function Fe(e, t, n = {}) {
                e._x_transition || (e._x_transition = {
                    enter: {
                        during: n,
                        start: n,
                        end: n
                    },
                    leave: {
                        during: n,
                        start: n,
                        end: n
                    },
                    in(n = (() => {}), s = (() => {})) {
                        qe(e, t, {
                            during: this.enter.during,
                            start: this.enter.start,
                            end: this.enter.end
                        }, n, s)
                    },
                    out(n = (() => {}), s = (() => {})) {
                        qe(e, t, {
                            during: this.leave.during,
                            start: this.leave.start,
                            end: this.leave.end
                        }, n, s)
                    }
                })
            }

            function Ge(e) {
                let t = e.parentNode;
                if (t) return t._x_hidePromise ? t : Ge(t)
            }

            function qe(e, t, {
                during: n,
                start: s,
                end: i
            } = {}, r = (() => {}), a = (() => {})) {
                if (e._x_transitioning && e._x_transitioning.cancel(), 0 === Object.keys(n).length && 0 === Object.keys(s).length && 0 === Object.keys(i).length) return r(), void a();
                let o, l, c;
                ! function(e, t) {
                    let n, s, i, r = We((() => {
                        G((() => {
                            n = !0, s || t.before(), i || (t.end(), je()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning
                        }))
                    }));
                    e._x_transitioning = {
                        beforeCancels: [],
                        beforeCancel(e) {
                            this.beforeCancels.push(e)
                        },
                        cancel: We((function() {
                            for (; this.beforeCancels.length;) this.beforeCancels.shift()();
                            r()
                        })),
                        finish: r
                    }, G((() => {
                        t.start(), t.during()
                    })), Ne = !0, requestAnimationFrame((() => {
                        if (n) return;
                        let r = 1e3 * Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")),
                            a = 1e3 * Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", ""));
                        0 === r && (r = 1e3 * Number(getComputedStyle(e).animationDuration.replace("s", ""))), G((() => {
                            t.before()
                        })), s = !0, requestAnimationFrame((() => {
                            n || (G((() => {
                                t.end()
                            })), je(), setTimeout(e._x_transitioning.finish, r + a), i = !0)
                        }))
                    }))
                }(e, {
                    start() {
                        o = t(e, s)
                    },
                    during() {
                        l = t(e, n)
                    },
                    before: r,
                    end() {
                        o(), c = t(e, i)
                    },
                    after: a,
                    cleanup() {
                        l(), c()
                    }
                })
            }

            function Xe(e, t, n) {
                if (-1 === e.indexOf(t)) return n;
                const s = e[e.indexOf(t) + 1];
                if (!s) return n;
                if ("scale" === t && isNaN(s)) return n;
                if ("duration" === t || "delay" === t) {
                    let e = s.match(/([0-9]+)ms/);
                    if (e) return e[1]
                }
                return "origin" === t && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [s, e[e.indexOf(t) + 2]].join(" ") : s
            }
            ye("transition", ((e, {
                value: t,
                modifiers: n,
                expression: s
            }, {
                evaluate: i
            }) => {
                "function" == typeof s && (s = i(s)), !1 !== s && (s && "boolean" != typeof s ? function(e, t, n) {
                    Fe(e, Re, "");
                    let s = {
                        enter: t => {
                            e._x_transition.enter.during = t
                        },
                        "enter-start": t => {
                            e._x_transition.enter.start = t
                        },
                        "enter-end": t => {
                            e._x_transition.enter.end = t
                        },
                        leave: t => {
                            e._x_transition.leave.during = t
                        },
                        "leave-start": t => {
                            e._x_transition.leave.start = t
                        },
                        "leave-end": t => {
                            e._x_transition.leave.end = t
                        }
                    };
                    s[n](t)
                }(e, s, t) : function(e, t, n) {
                    Fe(e, He);
                    let s = !t.includes("in") && !t.includes("out") && !n,
                        i = s || t.includes("in") || ["enter"].includes(n),
                        r = s || t.includes("out") || ["leave"].includes(n);
                    t.includes("in") && !s && (t = t.filter(((e, n) => n < t.indexOf("out"))));
                    t.includes("out") && !s && (t = t.filter(((e, n) => n > t.indexOf("out"))));
                    let a = !t.includes("opacity") && !t.includes("scale"),
                        o = a || t.includes("opacity"),
                        l = a || t.includes("scale"),
                        c = o ? 0 : 1,
                        d = l ? Xe(t, "scale", 95) / 100 : 1,
                        u = Xe(t, "delay", 0) / 1e3,
                        p = Xe(t, "origin", "center"),
                        f = "opacity, transform",
                        h = Xe(t, "duration", 150) / 1e3,
                        m = Xe(t, "duration", 75) / 1e3,
                        g = "cubic-bezier(0.4, 0.0, 0.2, 1)";
                    i && (e._x_transition.enter.during = {
                        transformOrigin: p,
                        transitionDelay: `${u}s`,
                        transitionProperty: f,
                        transitionDuration: `${h}s`,
                        transitionTimingFunction: g
                    }, e._x_transition.enter.start = {
                        opacity: c,
                        transform: `scale(${d})`
                    }, e._x_transition.enter.end = {
                        opacity: 1,
                        transform: "scale(1)"
                    });
                    r && (e._x_transition.leave.during = {
                        transformOrigin: p,
                        transitionDelay: `${u}s`,
                        transitionProperty: f,
                        transitionDuration: `${m}s`,
                        transitionTimingFunction: g
                    }, e._x_transition.leave.start = {
                        opacity: 1,
                        transform: "scale(1)"
                    }, e._x_transition.leave.end = {
                        opacity: c,
                        transform: `scale(${d})`
                    })
                }(e, n, t))
            })), window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, n, s) {
                const i = "visible" === document.visibilityState ? requestAnimationFrame : setTimeout;
                let r = () => i(n);
                t ? e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(n) : r() : e._x_transition ? e._x_transition.in(n) : r() : (e._x_hidePromise = e._x_transition ? new Promise(((t, n) => {
                    e._x_transition.out((() => {}), (() => t(s))), e._x_transitioning.beforeCancel((() => n({
                        isFromCancelledTransition: !0
                    })))
                })) : Promise.resolve(s), queueMicrotask((() => {
                    let t = Ge(e);
                    t ? (t._x_hideChildren || (t._x_hideChildren = []), t._x_hideChildren.push(e)) : i((() => {
                        let t = e => {
                            let n = Promise.all([e._x_hidePromise, ...(e._x_hideChildren || []).map(t)]).then((([e]) => e()));
                            return delete e._x_hidePromise, delete e._x_hideChildren, n
                        };
                        t(e).catch((e => {
                            if (!e.isFromCancelledTransition) throw e
                        }))
                    }))
                })))
            };
            var Ye = !1;

            function Ve(e, t = (() => {})) {
                return (...n) => Ye ? t(...n) : e(...n)
            }
            var Ue = !1;

            function Ke(e) {
                let t = i;
                m(((e, n) => {
                    let s = t(e);
                    return r(s), () => {}
                })), e(), m(t)
            }

            function Ze(e, t, n, i = []) {
                switch (e._x_bindings || (e._x_bindings = s({})), e._x_bindings[t] = n, t = i.includes("camel") ? t.toLowerCase().replace(/-(\w)/g, ((e, t) => t.toUpperCase())) : t) {
                    case "value":
                        ! function(e, t) {
                            if ("radio" === e.type) void 0 === e.attributes.value && (e.value = t), window.fromModel && (e.checked = Qe(e.value, t));
                            else if ("checkbox" === e.type) Number.isInteger(t) ? e.value = t : Array.isArray(t) || "boolean" == typeof t || [null, void 0].includes(t) ? Array.isArray(t) ? e.checked = t.some((t => Qe(t, e.value))) : e.checked = !!t : e.value = String(t);
                            else if ("SELECT" === e.tagName) ! function(e, t) {
                                const n = [].concat(t).map((e => e + ""));
                                Array.from(e.options).forEach((e => {
                                    e.selected = n.includes(e.value)
                                }))
                            }(e, t);
                            else {
                                if (e.value === t) return;
                                e.value = void 0 === t ? "" : t
                            }
                        }(e, n);
                        break;
                    case "style":
                        ! function(e, t) {
                            e._x_undoAddedStyles && e._x_undoAddedStyles();
                            e._x_undoAddedStyles = He(e, t)
                        }(e, n);
                        break;
                    case "class":
                        ! function(e, t) {
                            e._x_undoAddedClasses && e._x_undoAddedClasses();
                            e._x_undoAddedClasses = Re(e, t)
                        }(e, n);
                        break;
                    case "selected":
                    case "checked":
                        ! function(e, t, n) {
                            Je(e, t, n),
                                function(e, t, n) {
                                    e[t] !== n && (e[t] = n)
                                }(e, t, n)
                        }(e, t, n);
                        break;
                    default:
                        Je(e, t, n)
                }
            }

            function Je(e, t, n) {
                [null, void 0, !1].includes(n) && function(e) {
                    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e)
                }(t) ? e.removeAttribute(t) : (et(t) && (n = t), function(e, t, n) {
                    e.getAttribute(t) != n && e.setAttribute(t, n)
                }(e, t, n))
            }

            function Qe(e, t) {
                return e == t
            }

            function et(e) {
                return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
            }

            function tt(e, t, n) {
                let s = e.getAttribute(t);
                return null === s ? "function" == typeof n ? n() : n : "" === s || (et(t) ? !![t, "true"].includes(s) : s)
            }

            function nt(e, t) {
                var n;
                return function() {
                    var s = this,
                        i = arguments;
                    clearTimeout(n), n = setTimeout((function() {
                        n = null, e.apply(s, i)
                    }), t)
                }
            }

            function st(e, t) {
                let n;
                return function() {
                    let s = this,
                        i = arguments;
                    n || (e.apply(s, i), n = !0, setTimeout((() => n = !1), t))
                }
            }

            function it({
                get: e,
                set: t
            }, {
                get: n,
                set: s
            }) {
                let a, o, l, c, d = !0,
                    u = i((() => {
                        let i, r;
                        d ? (i = e(), s(JSON.parse(JSON.stringify(i))), r = n(), d = !1) : (i = e(), r = n(), l = JSON.stringify(i), c = JSON.stringify(r), l !== a ? (r = n(), s(i), r = i) : (t(JSON.parse(c ?? null)), i = r)), a = JSON.stringify(i), o = JSON.stringify(r)
                    }));
                return () => {
                    r(u)
                }
            }
            var rt = {},
                at = !1;
            var ot = {};

            function lt(e, t, n) {
                let s = [];
                for (; s.length;) s.pop()();
                let i = Object.entries(t).map((([e, t]) => ({
                        name: e,
                        value: t
                    }))),
                    r = xe(i);
                return i = i.map((e => r.find((t => t.name === e.name)) ? {
                    name: `x-bind:${e.name}`,
                    value: `"${e.value}"`
                } : e)), we(e, i, n).map((e => {
                    s.push(e.runCleanups), e()
                })), () => {
                    for (; s.length;) s.pop()()
                }
            }
            var ct = {};
            var dt = {
                get reactive() {
                    return s
                },
                get release() {
                    return r
                },
                get effect() {
                    return i
                },
                get raw() {
                    return a
                },
                version: "3.13.1",
                flushAndStopDeferringMutations: function() {
                    q = !1, Y(X), X = []
                },
                dontAutoEvaluateFunctions: ce,
                disableEffectScheduling: function(e) {
                    h = !1, e(), h = !0
                },
                startObservingMutations: B,
                stopObservingMutations: H,
                setReactivityEngine: function(e) {
                    s = e.reactive, r = e.release, i = t => e.effect(t, {
                        scheduler: e => {
                            h ? u(e) : e()
                        }
                    }), a = e.raw
                },
                onAttributeRemoved: N,
                onAttributesAdded: I,
                closestDataStack: K,
                skipDuringClone: Ve,
                onlyDuringClone: function(e) {
                    return (...t) => Ye && e(...t)
                },
                addRootSelector: C,
                addInitSelector: S,
                addScopeToNode: U,
                deferMutations: function() {
                    q = !0
                },
                mapAttributes: ze,
                evaluateLater: ue,
                interceptInit: function(e) {
                    M.push(e)
                },
                setEvaluator: function(e) {
                    pe = e
                },
                mergeProxies: Z,
                extractProp: function(e, t, n, s = !0) {
                    if (e._x_bindings && void 0 !== e._x_bindings[t]) return e._x_bindings[t];
                    if (e._x_inlineBindings && void 0 !== e._x_inlineBindings[t]) {
                        let n = e._x_inlineBindings[t];
                        return n.extract = s, ce((() => de(e, n.expression)))
                    }
                    return tt(e, t, n)
                },
                findClosest: T,
                onElRemoved: L,
                closestRoot: $,
                destroyTree: P,
                interceptor: te,
                transition: qe,
                setStyles: He,
                mutateDom: G,
                directive: ye,
                entangle: it,
                throttle: st,
                debounce: nt,
                evaluate: de,
                initTree: z,
                nextTick: De,
                prefixed: ve,
                prefix: function(e) {
                    ge = e
                },
                plugin: function(e) {
                    (Array.isArray(e) ? e : [e]).forEach((e => e(dt)))
                },
                magic: ie,
                store: function(e, t) {
                    if (at || (rt = s(rt), at = !0), void 0 === t) return rt[e];
                    rt[e] = t, "object" == typeof t && null !== t && t.hasOwnProperty("init") && "function" == typeof t.init && rt[e].init(), ee(rt[e])
                },
                start: function() {
                    var e;
                    y && b("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), y = !0, document.body || b("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), g(document, "alpine:init"), g(document, "alpine:initializing"), B(), e = e => z(e, v), O.push(e), L((e => P(e))), I(((e, t) => {
                        we(e, t).forEach((e => e()))
                    })), Array.from(document.querySelectorAll(_())).filter((e => !$(e.parentElement, !0))).forEach((e => {
                        z(e)
                    })), g(document, "alpine:initialized")
                },
                clone: function(e, t) {
                    t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ye = !0, Ue = !0, Ke((() => {
                        ! function(e) {
                            let t = !1;
                            z(e, ((e, n) => {
                                v(e, ((e, s) => {
                                    if (t && function(e) {
                                            return E().some((t => e.matches(t)))
                                        }(e)) return s();
                                    t = !0, n(e, s)
                                }))
                            }))
                        }(t)
                    })), Ye = !1, Ue = !1
                },
                cloneNode: function(e, t) {
                    e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0)), Ye = !0, Ke((() => {
                        z(t, ((e, t) => {
                            t(e, (() => {}))
                        }))
                    })), Ye = !1
                },
                bound: function(e, t, n) {
                    return e._x_bindings && void 0 !== e._x_bindings[t] ? e._x_bindings[t] : tt(e, t, n)
                },
                $data: V,
                walk: v,
                data: function(e, t) {
                    ct[e] = t
                },
                bind: function(e, t) {
                    let n = "function" != typeof t ? () => t : t;
                    return e instanceof Element ? lt(e, n()) : (ot[e] = n, () => {})
                }
            };

            function ut(e, t) {
                const n = Object.create(null),
                    s = e.split(",");
                for (let e = 0; e < s.length; e++) n[s[e]] = !0;
                return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
            }
            var pt, ft = Object.freeze({}),
                ht = (Object.freeze([]), Object.prototype.hasOwnProperty),
                mt = (e, t) => ht.call(e, t),
                gt = Array.isArray,
                vt = e => "[object Map]" === xt(e),
                bt = e => "symbol" == typeof e,
                yt = e => null !== e && "object" == typeof e,
                wt = Object.prototype.toString,
                xt = e => wt.call(e),
                Et = e => xt(e).slice(8, -1),
                _t = e => "string" == typeof e && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
                Ct = e => {
                    const t = Object.create(null);
                    return n => t[n] || (t[n] = e(n))
                },
                St = /-(\w)/g,
                $t = (Ct((e => e.replace(St, ((e, t) => t ? t.toUpperCase() : "")))), /\B([A-Z])/g),
                Tt = (Ct((e => e.replace($t, "-$1").toLowerCase())), Ct((e => e.charAt(0).toUpperCase() + e.slice(1)))),
                Mt = (Ct((e => e ? `on${Tt(e)}` : "")), (e, t) => e !== t && (e == e || t == t)),
                zt = new WeakMap,
                Pt = [],
                At = Symbol("iterate"),
                kt = Symbol("Map key iterate");
            var Ot = 0;

            function Lt(e) {
                const {
                    deps: t
                } = e;
                if (t.length) {
                    for (let n = 0; n < t.length; n++) t[n].delete(e);
                    t.length = 0
                }
            }
            var It = !0,
                Nt = [];

            function Dt() {
                const e = Nt.pop();
                It = void 0 === e || e
            }

            function jt(e, t, n) {
                if (!It || void 0 === pt) return;
                let s = zt.get(e);
                s || zt.set(e, s = new Map);
                let i = s.get(n);
                i || s.set(n, i = new Set), i.has(pt) || (i.add(pt), pt.deps.push(i), pt.options.onTrack && pt.options.onTrack({
                    effect: pt,
                    target: e,
                    type: t,
                    key: n
                }))
            }

            function Rt(e, t, n, s, i, r) {
                const a = zt.get(e);
                if (!a) return;
                const o = new Set,
                    l = e => {
                        e && e.forEach((e => {
                            (e !== pt || e.allowRecurse) && o.add(e)
                        }))
                    };
                if ("clear" === t) a.forEach(l);
                else if ("length" === n && gt(e)) a.forEach(((e, t) => {
                    ("length" === t || t >= s) && l(e)
                }));
                else switch (void 0 !== n && l(a.get(n)), t) {
                    case "add":
                        gt(e) ? _t(n) && l(a.get("length")) : (l(a.get(At)), vt(e) && l(a.get(kt)));
                        break;
                    case "delete":
                        gt(e) || (l(a.get(At)), vt(e) && l(a.get(kt)));
                        break;
                    case "set":
                        vt(e) && l(a.get(At))
                }
                o.forEach((a => {
                    a.options.onTrigger && a.options.onTrigger({
                        effect: a,
                        target: e,
                        key: n,
                        type: t,
                        newValue: s,
                        oldValue: i,
                        oldTarget: r
                    }), a.options.scheduler ? a.options.scheduler(a) : a()
                }))
            }
            var Bt = ut("__proto__,__v_isRef,__isVue"),
                Ht = new Set(Object.getOwnPropertyNames(Symbol).map((e => Symbol[e])).filter(bt)),
                Wt = Xt(),
                Ft = Xt(!0),
                Gt = qt();

            function qt() {
                const e = {};
                return ["includes", "indexOf", "lastIndexOf"].forEach((t => {
                    e[t] = function(...e) {
                        const n = Tn(this);
                        for (let e = 0, t = this.length; e < t; e++) jt(n, "get", e + "");
                        const s = n[t](...e);
                        return -1 === s || !1 === s ? n[t](...e.map(Tn)) : s
                    }
                })), ["push", "pop", "shift", "unshift", "splice"].forEach((t => {
                    e[t] = function(...e) {
                        Nt.push(It), It = !1;
                        const n = Tn(this)[t].apply(this, e);
                        return Dt(), n
                    }
                })), e
            }

            function Xt(e = !1, t = !1) {
                return function(n, s, i) {
                    if ("__v_isReactive" === s) return !e;
                    if ("__v_isReadonly" === s) return e;
                    if ("__v_raw" === s && i === (e ? t ? _n : En : t ? xn : wn).get(n)) return n;
                    const r = gt(n);
                    if (!e && r && mt(Gt, s)) return Reflect.get(Gt, s, i);
                    const a = Reflect.get(n, s, i);
                    if (bt(s) ? Ht.has(s) : Bt(s)) return a;
                    if (e || jt(n, "get", s), t) return a;
                    if (Mn(a)) {
                        return !r || !_t(s) ? a.value : a
                    }
                    return yt(a) ? e ? Sn(a) : Cn(a) : a
                }
            }

            function Yt(e = !1) {
                return function(t, n, s, i) {
                    let r = t[n];
                    if (!e && (s = Tn(s), r = Tn(r), !gt(t) && Mn(r) && !Mn(s))) return r.value = s, !0;
                    const a = gt(t) && _t(n) ? Number(n) < t.length : mt(t, n),
                        o = Reflect.set(t, n, s, i);
                    return t === Tn(i) && (a ? Mt(s, r) && Rt(t, "set", n, s, r) : Rt(t, "add", n, s)), o
                }
            }
            var Vt = {
                    get: Wt,
                    set: Yt(),
                    deleteProperty: function(e, t) {
                        const n = mt(e, t),
                            s = e[t],
                            i = Reflect.deleteProperty(e, t);
                        return i && n && Rt(e, "delete", t, void 0, s), i
                    },
                    has: function(e, t) {
                        const n = Reflect.has(e, t);
                        return bt(t) && Ht.has(t) || jt(e, "has", t), n
                    },
                    ownKeys: function(e) {
                        return jt(e, "iterate", gt(e) ? "length" : At), Reflect.ownKeys(e)
                    }
                },
                Ut = {
                    get: Ft,
                    set(e, t) {
                        return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0
                    },
                    deleteProperty(e, t) {
                        return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
                    }
                },
                Kt = e => yt(e) ? Cn(e) : e,
                Zt = e => yt(e) ? Sn(e) : e,
                Jt = e => e,
                Qt = e => Reflect.getPrototypeOf(e);

            function en(e, t, n = !1, s = !1) {
                const i = Tn(e = e.__v_raw),
                    r = Tn(t);
                t !== r && !n && jt(i, "get", t), !n && jt(i, "get", r);
                const {
                    has: a
                } = Qt(i), o = s ? Jt : n ? Zt : Kt;
                return a.call(i, t) ? o(e.get(t)) : a.call(i, r) ? o(e.get(r)) : void(e !== i && e.get(t))
            }

            function tn(e, t = !1) {
                const n = this.__v_raw,
                    s = Tn(n),
                    i = Tn(e);
                return e !== i && !t && jt(s, "has", e), !t && jt(s, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i)
            }

            function nn(e, t = !1) {
                return e = e.__v_raw, !t && jt(Tn(e), "iterate", At), Reflect.get(e, "size", e)
            }

            function sn(e) {
                e = Tn(e);
                const t = Tn(this);
                return Qt(t).has.call(t, e) || (t.add(e), Rt(t, "add", e, e)), this
            }

            function rn(e, t) {
                t = Tn(t);
                const n = Tn(this),
                    {
                        has: s,
                        get: i
                    } = Qt(n);
                let r = s.call(n, e);
                r ? yn(n, s, e) : (e = Tn(e), r = s.call(n, e));
                const a = i.call(n, e);
                return n.set(e, t), r ? Mt(t, a) && Rt(n, "set", e, t, a) : Rt(n, "add", e, t), this
            }

            function an(e) {
                const t = Tn(this),
                    {
                        has: n,
                        get: s
                    } = Qt(t);
                let i = n.call(t, e);
                i ? yn(t, n, e) : (e = Tn(e), i = n.call(t, e));
                const r = s ? s.call(t, e) : void 0,
                    a = t.delete(e);
                return i && Rt(t, "delete", e, void 0, r), a
            }

            function on() {
                const e = Tn(this),
                    t = 0 !== e.size,
                    n = vt(e) ? new Map(e) : new Set(e),
                    s = e.clear();
                return t && Rt(e, "clear", void 0, void 0, n), s
            }

            function ln(e, t) {
                return function(n, s) {
                    const i = this,
                        r = i.__v_raw,
                        a = Tn(r),
                        o = t ? Jt : e ? Zt : Kt;
                    return !e && jt(a, "iterate", At), r.forEach(((e, t) => n.call(s, o(e), o(t), i)))
                }
            }

            function cn(e, t, n) {
                return function(...s) {
                    const i = this.__v_raw,
                        r = Tn(i),
                        a = vt(r),
                        o = "entries" === e || e === Symbol.iterator && a,
                        l = "keys" === e && a,
                        c = i[e](...s),
                        d = n ? Jt : t ? Zt : Kt;
                    return !t && jt(r, "iterate", l ? kt : At), {
                        next() {
                            const {
                                value: e,
                                done: t
                            } = c.next();
                            return t ? {
                                value: e,
                                done: t
                            } : {
                                value: o ? [d(e[0]), d(e[1])] : d(e),
                                done: t
                            }
                        },
                        [Symbol.iterator]() {
                            return this
                        }
                    }
                }
            }

            function dn(e) {
                return function(...t) {
                    {
                        const n = t[0] ? `on key "${t[0]}" ` : "";
                        console.warn(`${Tt(e)} operation ${n}failed: target is readonly.`, Tn(this))
                    }
                    return "delete" !== e && this
                }
            }

            function un() {
                const e = {
                        get(e) {
                            return en(this, e)
                        },
                        get size() {
                            return nn(this)
                        },
                        has: tn,
                        add: sn,
                        set: rn,
                        delete: an,
                        clear: on,
                        forEach: ln(!1, !1)
                    },
                    t = {
                        get(e) {
                            return en(this, e, !1, !0)
                        },
                        get size() {
                            return nn(this)
                        },
                        has: tn,
                        add: sn,
                        set: rn,
                        delete: an,
                        clear: on,
                        forEach: ln(!1, !0)
                    },
                    n = {
                        get(e) {
                            return en(this, e, !0)
                        },
                        get size() {
                            return nn(this, !0)
                        },
                        has(e) {
                            return tn.call(this, e, !0)
                        },
                        add: dn("add"),
                        set: dn("set"),
                        delete: dn("delete"),
                        clear: dn("clear"),
                        forEach: ln(!0, !1)
                    },
                    s = {
                        get(e) {
                            return en(this, e, !0, !0)
                        },
                        get size() {
                            return nn(this, !0)
                        },
                        has(e) {
                            return tn.call(this, e, !0)
                        },
                        add: dn("add"),
                        set: dn("set"),
                        delete: dn("delete"),
                        clear: dn("clear"),
                        forEach: ln(!0, !0)
                    };
                return ["keys", "values", "entries", Symbol.iterator].forEach((i => {
                    e[i] = cn(i, !1, !1), n[i] = cn(i, !0, !1), t[i] = cn(i, !1, !0), s[i] = cn(i, !0, !0)
                })), [e, n, t, s]
            }
            var [pn, fn, hn, mn] = un();

            function gn(e, t) {
                const n = t ? e ? mn : hn : e ? fn : pn;
                return (t, s, i) => "__v_isReactive" === s ? !e : "__v_isReadonly" === s ? e : "__v_raw" === s ? t : Reflect.get(mt(n, s) && s in t ? n : t, s, i)
            }
            var vn = {
                    get: gn(!1, !1)
                },
                bn = {
                    get: gn(!0, !1)
                };

            function yn(e, t, n) {
                const s = Tn(n);
                if (s !== n && t.call(e, s)) {
                    const t = Et(e);
                    console.warn(`Reactive ${t} contains both the raw and reactive versions of the same object${"Map"===t?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
                }
            }
            var wn = new WeakMap,
                xn = new WeakMap,
                En = new WeakMap,
                _n = new WeakMap;

            function Cn(e) {
                return e && e.__v_isReadonly ? e : $n(e, !1, Vt, vn, wn)
            }

            function Sn(e) {
                return $n(e, !0, Ut, bn, En)
            }

            function $n(e, t, n, s, i) {
                if (!yt(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
                if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
                const r = i.get(e);
                if (r) return r;
                const a = (o = e).__v_skip || !Object.isExtensible(o) ? 0 : function(e) {
                    switch (e) {
                        case "Object":
                        case "Array":
                            return 1;
                        case "Map":
                        case "Set":
                        case "WeakMap":
                        case "WeakSet":
                            return 2;
                        default:
                            return 0
                    }
                }(Et(o));
                var o;
                if (0 === a) return e;
                const l = new Proxy(e, 2 === a ? s : n);
                return i.set(e, l), l
            }

            function Tn(e) {
                return e && Tn(e.__v_raw) || e
            }

            function Mn(e) {
                return Boolean(e && !0 === e.__v_isRef)
            }
            ie("nextTick", (() => De)), ie("dispatch", (e => g.bind(g, e))), ie("watch", ((e, {
                evaluateLater: t,
                effect: n
            }) => (s, i) => {
                let r, a = t(s),
                    o = !0,
                    l = n((() => a((e => {
                        JSON.stringify(e), o ? r = e : queueMicrotask((() => {
                            i(e, r), r = e
                        })), o = !1
                    }))));
                e._x_effects.delete(l)
            })), ie("store", (function() {
                return rt
            })), ie("data", (e => V(e))), ie("root", (e => $(e))), ie("refs", (e => (e._x_refs_proxy || (e._x_refs_proxy = Z(function(e) {
                let t = [],
                    n = e;
                for (; n;) n._x_refs && t.push(n._x_refs), n = n.parentNode;
                return t
            }(e))), e._x_refs_proxy)));
            var zn = {};

            function Pn(e) {
                return zn[e] || (zn[e] = 0), ++zn[e]
            }

            function An(e, t, n) {
                ie(t, (s => b(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, s)))
            }
            ie("id", (e => (t, n = null) => {
                let s = function(e, t) {
                        return T(e, (e => {
                            if (e._x_ids && e._x_ids[t]) return !0
                        }))
                    }(e, t),
                    i = s ? s._x_ids[t] : Pn(t);
                return n ? `${t}-${i}-${n}` : `${t}-${i}`
            })), ie("el", (e => e)), An("Focus", "focus", "focus"), An("Persist", "persist", "persist"), ye("modelable", ((e, {
                expression: t
            }, {
                effect: n,
                evaluateLater: s,
                cleanup: i
            }) => {
                let r = s(t),
                    a = () => {
                        let e;
                        return r((t => e = t)), e
                    },
                    o = s(`${t} = __placeholder`),
                    l = e => o((() => {}), {
                        scope: {
                            __placeholder: e
                        }
                    }),
                    c = a();
                l(c), queueMicrotask((() => {
                    if (!e._x_model) return;
                    e._x_removeModelListeners.default();
                    let t = e._x_model.get,
                        n = e._x_model.set,
                        s = it({
                            get() {
                                return t()
                            },
                            set(e) {
                                n(e)
                            }
                        }, {
                            get() {
                                return a()
                            },
                            set(e) {
                                l(e)
                            }
                        });
                    i(s)
                }))
            })), ye("teleport", ((e, {
                modifiers: t,
                expression: n
            }, {
                cleanup: s
            }) => {
                "template" !== e.tagName.toLowerCase() && b("x-teleport can only be used on a <template> tag", e);
                let i = On(n),
                    r = e.content.cloneNode(!0).firstElementChild;
                e._x_teleport = r, r._x_teleportBack = e, e.setAttribute("data-teleport-template", !0), r.setAttribute("data-teleport-target", !0), e._x_forwardEvents && e._x_forwardEvents.forEach((t => {
                    r.addEventListener(t, (t => {
                        t.stopPropagation(), e.dispatchEvent(new t.constructor(t.type, t))
                    }))
                })), U(r, {}, e);
                let a = (e, t, n) => {
                    n.includes("prepend") ? t.parentNode.insertBefore(e, t) : n.includes("append") ? t.parentNode.insertBefore(e, t.nextSibling) : t.appendChild(e)
                };
                G((() => {
                    a(r, i, t), z(r), r._x_ignore = !0
                })), e._x_teleportPutBack = () => {
                    let s = On(n);
                    G((() => {
                        a(e._x_teleport, s, t)
                    }))
                }, s((() => r.remove()))
            }));
            var kn = document.createElement("div");

            function On(e) {
                let t = Ve((() => document.querySelector(e)), (() => kn))();
                return t || b(`Cannot find x-teleport element for selector: "${e}"`), t
            }
            var Ln = () => {};

            function In(e, t, n, s) {
                let i = e,
                    r = e => s(e),
                    a = {},
                    o = (e, t) => n => t(e, n);
                if (n.includes("dot") && (t = t.replace(/-/g, ".")), n.includes("camel") && (t = function(e) {
                        return e.toLowerCase().replace(/-(\w)/g, ((e, t) => t.toUpperCase()))
                    }(t)), n.includes("passive") && (a.passive = !0), n.includes("capture") && (a.capture = !0), n.includes("window") && (i = window), n.includes("document") && (i = document), n.includes("debounce")) {
                    let e = n[n.indexOf("debounce") + 1] || "invalid-wait",
                        t = Nn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
                    r = nt(r, t)
                }
                if (n.includes("throttle")) {
                    let e = n[n.indexOf("throttle") + 1] || "invalid-wait",
                        t = Nn(e.split("ms")[0]) ? Number(e.split("ms")[0]) : 250;
                    r = st(r, t)
                }
                return n.includes("prevent") && (r = o(r, ((e, t) => {
                    t.preventDefault(), e(t)
                }))), n.includes("stop") && (r = o(r, ((e, t) => {
                    t.stopPropagation(), e(t)
                }))), n.includes("self") && (r = o(r, ((t, n) => {
                    n.target === e && t(n)
                }))), (n.includes("away") || n.includes("outside")) && (i = document, r = o(r, ((t, n) => {
                    e.contains(n.target) || !1 !== n.target.isConnected && (e.offsetWidth < 1 && e.offsetHeight < 1 || !1 !== e._x_isShown && t(n))
                }))), n.includes("once") && (r = o(r, ((e, n) => {
                    e(n), i.removeEventListener(t, r, a)
                }))), r = o(r, ((e, s) => {
                    (function(e) {
                        return ["keydown", "keyup"].includes(e)
                    })(t) && function(e, t) {
                        let n = t.filter((e => !["window", "document", "prevent", "stop", "once", "capture"].includes(e)));
                        if (n.includes("debounce")) {
                            let e = n.indexOf("debounce");
                            n.splice(e, Nn((n[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
                        }
                        if (n.includes("throttle")) {
                            let e = n.indexOf("throttle");
                            n.splice(e, Nn((n[e + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
                        }
                        if (0 === n.length) return !1;
                        if (1 === n.length && Dn(e.key).includes(n[0])) return !1;
                        const s = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((e => n.includes(e)));
                        if (n = n.filter((e => !s.includes(e))), s.length > 0) {
                            if (s.filter((t => ("cmd" !== t && "super" !== t || (t = "meta"), e[`${t}Key`]))).length === s.length && Dn(e.key).includes(n[0])) return !1
                        }
                        return !0
                    }(s, n) || e(s)
                })), i.addEventListener(t, r, a), () => {
                    i.removeEventListener(t, r, a)
                }
            }

            function Nn(e) {
                return !Array.isArray(e) && !isNaN(e)
            }

            function Dn(e) {
                if (!e) return [];
                var t;
                e = [" ", "_"].includes(t = e) ? t : t.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
                let n = {
                    ctrl: "control",
                    slash: "/",
                    space: " ",
                    spacebar: " ",
                    cmd: "meta",
                    esc: "escape",
                    up: "arrow-up",
                    down: "arrow-down",
                    left: "arrow-left",
                    right: "arrow-right",
                    period: ".",
                    equal: "=",
                    minus: "-",
                    underscore: "_"
                };
                return n[e] = e, Object.keys(n).map((t => {
                    if (n[t] === e) return t
                })).filter((e => e))
            }

            function jn(e) {
                let t = e ? parseFloat(e) : null;
                return n = t, Array.isArray(n) || isNaN(n) ? e : t;
                var n
            }

            function Rn(e) {
                return null !== e && "object" == typeof e && "function" == typeof e.get && "function" == typeof e.set
            }
            Ln.inline = (e, {
                modifiers: t
            }, {
                cleanup: n
            }) => {
                t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, n((() => {
                    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
                }))
            }, ye("ignore", Ln), ye("effect", ((e, {
                expression: t
            }, {
                effect: n
            }) => n(ue(e, t)))), ye("model", ((e, {
                modifiers: t,
                expression: n
            }, {
                effect: s,
                cleanup: i
            }) => {
                let r = e;
                t.includes("parent") && (r = e.parentNode);
                let a, o = ue(r, n);
                a = "string" == typeof n ? ue(r, `${n} = __placeholder`) : "function" == typeof n && "string" == typeof n() ? ue(r, `${n()} = __placeholder`) : () => {};
                let l = () => {
                        let e;
                        return o((t => e = t)), Rn(e) ? e.get() : e
                    },
                    c = e => {
                        let t;
                        o((e => t = e)), Rn(t) ? t.set(e) : a((() => {}), {
                            scope: {
                                __placeholder: e
                            }
                        })
                    };
                "string" == typeof n && "radio" === e.type && G((() => {
                    e.hasAttribute("name") || e.setAttribute("name", n)
                }));
                var d = "select" === e.tagName.toLowerCase() || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
                let u = Ye ? () => {} : In(e, d, t, (n => {
                    c(function(e, t, n, s) {
                        return G((() => {
                            if (n instanceof CustomEvent && void 0 !== n.detail) return null !== n.detail && void 0 !== n.detail ? n.detail : n.target.value;
                            if ("checkbox" === e.type) {
                                if (Array.isArray(s)) {
                                    let e = t.includes("number") ? jn(n.target.value) : n.target.value;
                                    return n.target.checked ? s.concat([e]) : s.filter((t => !(t == e)))
                                }
                                return n.target.checked
                            }
                            if ("select" === e.tagName.toLowerCase() && e.multiple) return t.includes("number") ? Array.from(n.target.selectedOptions).map((e => jn(e.value || e.text))) : Array.from(n.target.selectedOptions).map((e => e.value || e.text));
                            {
                                let e = n.target.value;
                                return t.includes("number") ? jn(e) : t.includes("trim") ? e.trim() : e
                            }
                        }))
                    }(e, t, n, l()))
                }));
                if (t.includes("fill") && ([null, ""].includes(l()) || "checkbox" === e.type && Array.isArray(l())) && e.dispatchEvent(new Event(d, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = u, i((() => e._x_removeModelListeners.default())), e.form) {
                    let t = In(e.form, "reset", [], (t => {
                        De((() => e._x_model && e._x_model.set(e.value)))
                    }));
                    i((() => t()))
                }
                e._x_model = {
                    get() {
                        return l()
                    },
                    set(e) {
                        c(e)
                    }
                }, e._x_forceModelUpdate = t => {
                    void 0 === t && "string" == typeof n && n.match(/\./) && (t = ""), window.fromModel = !0, G((() => Ze(e, "value", t))), delete window.fromModel
                }, s((() => {
                    let n = l();
                    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(n)
                }))
            })), ye("cloak", (e => queueMicrotask((() => G((() => e.removeAttribute(ve("cloak")))))))), S((() => `[${ve("init")}]`)), ye("init", Ve(((e, {
                expression: t
            }, {
                evaluate: n
            }) => "string" == typeof t ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)))), ye("text", ((e, {
                expression: t
            }, {
                effect: n,
                evaluateLater: s
            }) => {
                let i = s(t);
                n((() => {
                    i((t => {
                        G((() => {
                            e.textContent = t
                        }))
                    }))
                }))
            })), ye("html", ((e, {
                expression: t
            }, {
                effect: n,
                evaluateLater: s
            }) => {
                let i = s(t);
                n((() => {
                    i((t => {
                        G((() => {
                            e.innerHTML = t, e._x_ignoreSelf = !0, z(e), delete e._x_ignoreSelf
                        }))
                    }))
                }))
            })), ze($e(":", ve("bind:")));
            var Bn = (e, {
                value: t,
                modifiers: n,
                expression: s,
                original: i
            }, {
                effect: r
            }) => {
                if (!t) {
                    let t = {};
                    return a = t, Object.entries(ot).forEach((([e, t]) => {
                        Object.defineProperty(a, e, {
                            get() {
                                return (...e) => t(...e)
                            }
                        })
                    })), void ue(e, s)((t => {
                        lt(e, t, i)
                    }), {
                        scope: t
                    })
                }
                var a;
                if ("key" === t) return function(e, t) {
                    e._x_keyExpression = t
                }(e, s);
                if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
                let o = ue(e, s);
                r((() => o((i => {
                    void 0 === i && "string" == typeof s && s.match(/\./) && (i = ""), G((() => Ze(e, t, i, n)))
                }))))
            };

            function Hn(e, t, n, s) {
                let i = {};
                if (/^\[.*\]$/.test(e.item) && Array.isArray(t)) {
                    e.item.replace("[", "").replace("]", "").split(",").map((e => e.trim())).forEach(((e, n) => {
                        i[e] = t[n]
                    }))
                } else if (/^\{.*\}$/.test(e.item) && !Array.isArray(t) && "object" == typeof t) {
                    e.item.replace("{", "").replace("}", "").split(",").map((e => e.trim())).forEach((e => {
                        i[e] = t[e]
                    }))
                } else i[e.item] = t;
                return e.index && (i[e.index] = n), e.collection && (i[e.collection] = s), i
            }

            function Wn() {}

            function Fn(e, t, n) {
                ye(t, (s => b(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, s)))
            }
            Bn.inline = (e, {
                value: t,
                modifiers: n,
                expression: s
            }) => {
                t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = {
                    expression: s,
                    extract: !1
                })
            }, ye("bind", Bn), C((() => `[${ve("data")}]`)), ye("data", ((e, {
                expression: t
            }, {
                cleanup: n
            }) => {
                if (function(e) {
                        return !!Ye && (!!Ue || e.hasAttribute("data-has-alpine-state"))
                    }(e)) return;
                t = "" === t ? "{}" : t;
                let i = {};
                re(i, e);
                let r = {};
                var a, o;
                a = r, o = i, Object.entries(ct).forEach((([e, t]) => {
                    Object.defineProperty(a, e, {
                        get() {
                            return (...e) => t.bind(o)(...e)
                        },
                        enumerable: !1
                    })
                }));
                let l = de(e, t, {
                    scope: r
                });
                void 0 !== l && !0 !== l || (l = {}), re(l, e);
                let c = s(l);
                ee(c);
                let d = U(e, c);
                c.init && de(e, c.init), n((() => {
                    c.destroy && de(e, c.destroy), d()
                }))
            })), ye("show", ((e, {
                modifiers: t,
                expression: n
            }, {
                effect: s
            }) => {
                let i = ue(e, n);
                e._x_doHide || (e._x_doHide = () => {
                    G((() => {
                        e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0)
                    }))
                }), e._x_doShow || (e._x_doShow = () => {
                    G((() => {
                        1 === e.style.length && "none" === e.style.display ? e.removeAttribute("style") : e.style.removeProperty("display")
                    }))
                });
                let r, a = () => {
                        e._x_doHide(), e._x_isShown = !1
                    },
                    o = () => {
                        e._x_doShow(), e._x_isShown = !0
                    },
                    l = () => setTimeout(o),
                    c = We((e => e ? o() : a()), (t => {
                        "function" == typeof e._x_toggleAndCascadeWithTransitions ? e._x_toggleAndCascadeWithTransitions(e, t, o, a) : t ? l() : a()
                    })),
                    d = !0;
                s((() => i((e => {
                    (d || e !== r) && (t.includes("immediate") && (e ? l() : a()), c(e), r = e, d = !1)
                }))))
            })), ye("for", ((e, {
                expression: t
            }, {
                effect: n,
                cleanup: i
            }) => {
                let r = function(e) {
                        let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                            n = /^\s*\(|\)\s*$/g,
                            s = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
                            i = e.match(s);
                        if (!i) return;
                        let r = {};
                        r.items = i[2].trim();
                        let a = i[1].replace(n, "").trim(),
                            o = a.match(t);
                        o ? (r.item = a.replace(t, "").trim(), r.index = o[1].trim(), o[2] && (r.collection = o[2].trim())) : r.item = a;
                        return r
                    }(t),
                    a = ue(e, r.items),
                    o = ue(e, e._x_keyExpression || "index");
                e._x_prevKeys = [], e._x_lookup = {}, n((() => function(e, t, n, i) {
                    let r = e => "object" == typeof e && !Array.isArray(e),
                        a = e;
                    n((n => {
                        var o;
                        o = n, !Array.isArray(o) && !isNaN(o) && n >= 0 && (n = Array.from(Array(n).keys(), (e => e + 1))), void 0 === n && (n = []);
                        let l = e._x_lookup,
                            c = e._x_prevKeys,
                            d = [],
                            u = [];
                        if (r(n)) n = Object.entries(n).map((([e, s]) => {
                            let r = Hn(t, s, e, n);
                            i((e => u.push(e)), {
                                scope: {
                                    index: e,
                                    ...r
                                }
                            }), d.push(r)
                        }));
                        else
                            for (let e = 0; e < n.length; e++) {
                                let s = Hn(t, n[e], e, n);
                                i((e => u.push(e)), {
                                    scope: {
                                        index: e,
                                        ...s
                                    }
                                }), d.push(s)
                            }
                        let f = [],
                            h = [],
                            m = [],
                            g = [];
                        for (let e = 0; e < c.length; e++) {
                            let t = c[e]; - 1 === u.indexOf(t) && m.push(t)
                        }
                        c = c.filter((e => !m.includes(e)));
                        let v = "template";
                        for (let e = 0; e < u.length; e++) {
                            let t = u[e],
                                n = c.indexOf(t);
                            if (-1 === n) c.splice(e, 0, t), f.push([v, e]);
                            else if (n !== e) {
                                let t = c.splice(e, 1)[0],
                                    s = c.splice(n - 1, 1)[0];
                                c.splice(e, 0, s), c.splice(n, 0, t), h.push([t, s])
                            } else g.push(t);
                            v = t
                        }
                        for (let e = 0; e < m.length; e++) {
                            let t = m[e];
                            l[t]._x_effects && l[t]._x_effects.forEach(p), l[t].remove(), l[t] = null, delete l[t]
                        }
                        for (let e = 0; e < h.length; e++) {
                            let [t, n] = h[e], s = l[t], i = l[n], r = document.createElement("div");
                            G((() => {
                                i || b('x-for ":key" is undefined or invalid', a), i.after(r), s.after(i), i._x_currentIfEl && i.after(i._x_currentIfEl), r.before(s), s._x_currentIfEl && s.after(s._x_currentIfEl), r.remove()
                            })), i._x_refreshXForScope(d[u.indexOf(n)])
                        }
                        for (let e = 0; e < f.length; e++) {
                            let [t, n] = f[e], i = "template" === t ? a : l[t];
                            i._x_currentIfEl && (i = i._x_currentIfEl);
                            let r = d[n],
                                o = u[n],
                                c = document.importNode(a.content, !0).firstElementChild,
                                p = s(r);
                            U(c, p, a), c._x_refreshXForScope = e => {
                                Object.entries(e).forEach((([e, t]) => {
                                    p[e] = t
                                }))
                            }, G((() => {
                                i.after(c), z(c)
                            })), "object" == typeof o && b("x-for key cannot be an object, it must be a string or an integer", a), l[o] = c
                        }
                        for (let e = 0; e < g.length; e++) l[g[e]]._x_refreshXForScope(d[u.indexOf(g[e])]);
                        a._x_prevKeys = u
                    }))
                }(e, r, a, o))), i((() => {
                    Object.values(e._x_lookup).forEach((e => e.remove())), delete e._x_prevKeys, delete e._x_lookup
                }))
            })), Wn.inline = (e, {
                expression: t
            }, {
                cleanup: n
            }) => {
                let s = $(e);
                s._x_refs || (s._x_refs = {}), s._x_refs[t] = e, n((() => delete s._x_refs[t]))
            }, ye("ref", Wn), ye("if", ((e, {
                expression: t
            }, {
                effect: n,
                cleanup: s
            }) => {
                "template" !== e.tagName.toLowerCase() && b("x-if can only be used on a <template> tag", e);
                let i = ue(e, t);
                n((() => i((t => {
                    t ? (() => {
                        if (e._x_currentIfEl) return e._x_currentIfEl;
                        let t = e.content.cloneNode(!0).firstElementChild;
                        U(t, {}, e), G((() => {
                            e.after(t), z(t)
                        })), e._x_currentIfEl = t, e._x_undoIf = () => {
                            v(t, (e => {
                                e._x_effects && e._x_effects.forEach(p)
                            })), t.remove(), delete e._x_currentIfEl
                        }
                    })() : e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf)
                })))), s((() => e._x_undoIf && e._x_undoIf()))
            })), ye("id", ((e, {
                expression: t
            }, {
                evaluate: n
            }) => {
                n(t).forEach((t => function(e, t) {
                    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Pn(t))
                }(e, t)))
            })), ze($e("@", ve("on:"))), ye("on", Ve(((e, {
                value: t,
                modifiers: n,
                expression: s
            }, {
                cleanup: i
            }) => {
                let r = s ? ue(e, s) : () => {};
                "template" === e.tagName.toLowerCase() && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
                let a = In(e, t, n, (e => {
                    r((() => {}), {
                        scope: {
                            $event: e
                        },
                        params: [e]
                    })
                }));
                i((() => a()))
            }))), Fn("Collapse", "collapse", "collapse"), Fn("Intersect", "intersect", "intersect"), Fn("Focus", "trap", "focus"), Fn("Mask", "mask", "mask"), dt.setEvaluator(fe), dt.setReactivityEngine({
                reactive: Cn,
                effect: function(e, t = ft) {
                    (function(e) {
                        return e && !0 === e._isEffect
                    })(e) && (e = e.raw);
                    const n = function(e, t) {
                        const n = function() {
                            if (!n.active) return e();
                            if (!Pt.includes(n)) {
                                Lt(n);
                                try {
                                    return Nt.push(It), It = !0, Pt.push(n), pt = n, e()
                                } finally {
                                    Pt.pop(), Dt(), pt = Pt[Pt.length - 1]
                                }
                            }
                        };
                        return n.id = Ot++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n
                    }(e, t);
                    return t.lazy || n(), n
                },
                release: function(e) {
                    e.active && (Lt(e), e.options.onStop && e.options.onStop(), e.active = !1)
                },
                raw: Tn
            });
            var Gn = dt
        },
        2664: function(e, t, n) {
            "use strict";
            n.d(t, {
                Z: function() {
                    return f
                }
            });
            var s = Object.defineProperty,
                i = {};
            ((e, t) => {
                for (var n in (e => {
                        s(e, "__esModule", {
                            value: !0
                        })
                    })(e), t) s(e, n, {
                    get: t[n],
                    enumerable: !0
                })
            })(i, {
                eager: () => r,
                event: () => a,
                idle: () => o,
                media: () => l,
                visible: () => c
            });
            var r = () => !0,
                a = ({
                    component: e,
                    argument: t
                }) => new Promise((n => {
                    if (t) window.addEventListener(t, (() => n()), {
                        once: !0
                    });
                    else {
                        const t = s => {
                            s.detail.id === e.id && (window.removeEventListener("async-alpine:load", t), n())
                        };
                        window.addEventListener("async-alpine:load", t)
                    }
                })),
                o = () => new Promise((e => {
                    "requestIdleCallback" in window ? window.requestIdleCallback(e) : setTimeout(e, 200)
                })),
                l = ({
                    argument: e
                }) => new Promise((t => {
                    if (!e) return console.log("Async Alpine: media strategy requires a media query. Treating as 'eager'"), t();
                    const n = window.matchMedia(`(${e})`);
                    n.matches ? t() : n.addEventListener("change", t, {
                        once: !0
                    })
                })),
                c = ({
                    component: e,
                    argument: t
                }) => new Promise((n => {
                    const s = new IntersectionObserver((e => {
                        e[0].isIntersecting && (s.disconnect(), n())
                    }), {
                        rootMargin: t || "0px 0px 0px 0px"
                    });
                    s.observe(e.el)
                }));

            function d(e) {
                let t = u(e);
                for (; e.length > 0 && ("&&" === e[0].value || "|" === e[0].value || "||" === e[0].value);) {
                    const n = e.shift().value,
                        s = u(e);
                    "expression" === t.type && t.operator === n ? t.parameters.push(s) : t = {
                        type: "expression",
                        operator: n,
                        parameters: [t, s]
                    }
                }
                return t
            }

            function u(e) {
                if ("(" === e[0].value) {
                    e.shift();
                    const t = d(e);
                    return ")" === e[0].value && e.shift(), t
                }
                return e.shift()
            }
            var p = "__internal_",
                f = {
                    Alpine: null,
                    _options: {
                        prefix: "ax-",
                        alpinePrefix: "x-",
                        root: "load",
                        inline: "load-src",
                        defaultStrategy: "eager"
                    },
                    _alias: !1,
                    _data: {},
                    _realIndex: 0,
                    get _index() {
                        return this._realIndex++
                    },
                    init(e, t = {}) {
                        return this.Alpine = e, this._options = {
                            ...this._options,
                            ...t
                        }, this
                    },
                    start() {
                        return this._processInline(), this._setupComponents(), this._mutations(), this
                    },
                    data(e, t = !1) {
                        return this._data[e] = {
                            loaded: !1,
                            download: t
                        }, this
                    },
                    url(e, t) {
                        e && t && (this._data[e] || this.data(e), this._data[e].download = () => import(this._parseUrl(t)))
                    },
                    alias(e) {
                        this._alias = e
                    },
                    _processInline() {
                        const e = document.querySelectorAll(`[${this._options.prefix}${this._options.inline}]`);
                        for (const t of e) this._inlineElement(t)
                    },
                    _inlineElement(e) {
                        const t = e.getAttribute(`${this._options.alpinePrefix}data`);
                        let n = e.getAttribute(`${this._options.prefix}${this._options.inline}`);
                        if (!t || !n) return;
                        const s = this._parseName(t);
                        this.url(s, n)
                    },
                    _setupComponents() {
                        const e = document.querySelectorAll(`[${this._options.prefix}${this._options.root}]`);
                        for (let t of e) this._setupComponent(t)
                    },
                    _setupComponent(e) {
                        const t = e.getAttribute(`${this._options.alpinePrefix}data`);
                        e.setAttribute(`${this._options.alpinePrefix}ignore`, "");
                        const n = this._parseName(t),
                            s = e.getAttribute(`${this._options.prefix}${this._options.root}`) || this._options.defaultStrategy;
                        this._componentStrategy({
                            name: n,
                            strategy: s,
                            el: e,
                            id: e.id || this._index
                        })
                    },
                    async _componentStrategy(e) {
                        const t = function(e) {
                            let t = d(function(e) {
                                const t = /\s*([()])\s*|\s*(\|\||&&|\|)\s*|\s*((?:[^()&|]+\([^()]+\))|[^()&|]+)\s*/g,
                                    n = [];
                                let s;
                                for (; null !== (s = t.exec(e));) {
                                    const [, e, t, i] = s;
                                    if (void 0 !== e) n.push({
                                        type: "parenthesis",
                                        value: e
                                    });
                                    else if (void 0 !== t) n.push({
                                        type: "operator",
                                        value: "|" === t ? "&&" : t
                                    });
                                    else {
                                        const e = {
                                            type: "method",
                                            method: i.trim()
                                        };
                                        i.includes("(") && (e.method = i.substring(0, i.indexOf("(")).trim(), e.argument = i.substring(i.indexOf("(") + 1, i.indexOf(")"))), "immediate" === i.method && (i.method = "eager"), n.push(e)
                                    }
                                }
                                return n
                            }(e));
                            return "method" === t.type ? {
                                type: "expression",
                                operator: "&&",
                                parameters: [t]
                            } : t
                        }(e.strategy);
                        await this._generateRequirements(e, t), await this._download(e.name), this._activate(e)
                    },
                    _generateRequirements(e, t) {
                        if ("expression" === t.type) {
                            if ("&&" === t.operator) return Promise.all(t.parameters.map((t => this._generateRequirements(e, t))));
                            if ("||" === t.operator) return Promise.any(t.parameters.map((t => this._generateRequirements(e, t))))
                        }
                        return !!i[t.method] && i[t.method]({
                            component: e,
                            argument: t.argument
                        })
                    },
                    async _download(e) {
                        if (e.startsWith(p)) return;
                        if (this._handleAlias(e), !this._data[e] || this._data[e].loaded) return;
                        const t = await this._getModule(e);
                        this.Alpine.data(e, t), this._data[e].loaded = !0
                    },
                    async _getModule(e) {
                        if (!this._data[e]) return;
                        const t = await this._data[e].download(e);
                        if ("function" == typeof t) return t;
                        return t[e] || t.default || Object.values(t)[0] || !1
                    },
                    _activate(e) {
                        e.el.removeAttribute(`${this._options.alpinePrefix}ignore`), e.el._x_ignore = !1, this.Alpine.initTree(e.el)
                    },
                    _mutations() {
                        new MutationObserver((e => {
                            for (const t of e)
                                if (t.addedNodes)
                                    for (const e of t.addedNodes) {
                                        if (1 !== e.nodeType) continue;
                                        e.hasAttribute(`${this._options.prefix}${this._options.root}`) && this._mutationEl(e);
                                        e.querySelectorAll(`[${this._options.prefix}${this._options.root}]`).forEach((e => this._mutationEl(e)))
                                    }
                        })).observe(document, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        })
                    },
                    _mutationEl(e) {
                        e.hasAttribute(`${this._options.prefix}${this._options.inline}`) && this._inlineElement(e), this._setupComponent(e)
                    },
                    _handleAlias(e) {
                        this._alias && !this._data[e] && ("function" != typeof this._alias ? this.url(e, this._alias.replaceAll("[name]", e)) : this.data(e, this._alias))
                    },
                    _parseName(e) {
                        return (e || "").split(/[({]/g)[0] || `${p}${this._index}`
                    },
                    _parseUrl(e) {
                        return new RegExp("^(?:[a-z+]+:)?//", "i").test(e) ? e : new URL(e, document.baseURI).href
                    }
                }
        },
        9662: function(e, t, n) {
            "use strict";
            var s = n(614),
                i = n(6330),
                r = TypeError;
            e.exports = function(e) {
                if (s(e)) return e;
                throw new r(i(e) + " is not a function")
            }
        },
        9670: function(e, t, n) {
            "use strict";
            var s = n(111),
                i = String,
                r = TypeError;
            e.exports = function(e) {
                if (s(e)) return e;
                throw new r(i(e) + " is not an object")
            }
        },
        1318: function(e, t, n) {
            "use strict";
            var s = n(5656),
                i = n(1400),
                r = n(6244),
                a = function(e) {
                    return function(t, n, a) {
                        var o, l = s(t),
                            c = r(l),
                            d = i(a, c);
                        if (e && n != n) {
                            for (; c > d;)
                                if ((o = l[d++]) != o) return !0
                        } else
                            for (; c > d; d++)
                                if ((e || d in l) && l[d] === n) return e || d || 0;
                        return !e && -1
                    }
                };
            e.exports = {
                includes: a(!0),
                indexOf: a(!1)
            }
        },
        3658: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(3157),
                r = TypeError,
                a = Object.getOwnPropertyDescriptor,
                o = s && ! function() {
                    if (void 0 !== this) return !0;
                    try {
                        Object.defineProperty([], "length", {
                            writable: !1
                        }).length = 1
                    } catch (e) {
                        return e instanceof TypeError
                    }
                }();
            e.exports = o ? function(e, t) {
                if (i(e) && !a(e, "length").writable) throw new r("Cannot set read only .length");
                return e.length = t
            } : function(e, t) {
                return e.length = t
            }
        },
        4326: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = s({}.toString),
                r = s("".slice);
            e.exports = function(e) {
                return r(i(e), 8, -1)
            }
        },
        648: function(e, t, n) {
            "use strict";
            var s = n(1694),
                i = n(614),
                r = n(4326),
                a = n(5112)("toStringTag"),
                o = Object,
                l = "Arguments" === r(function() {
                    return arguments
                }());
            e.exports = s ? r : function(e) {
                var t, n, s;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
                    try {
                        return e[t]
                    } catch (e) {}
                }(t = o(e), a)) ? n : l ? r(t) : "Object" === (s = r(t)) && i(t.callee) ? "Arguments" : s
            }
        },
        9920: function(e, t, n) {
            "use strict";
            var s = n(2597),
                i = n(3887),
                r = n(1236),
                a = n(3070);
            e.exports = function(e, t, n) {
                for (var o = i(t), l = a.f, c = r.f, d = 0; d < o.length; d++) {
                    var u = o[d];
                    s(e, u) || n && s(n, u) || l(e, u, c(t, u))
                }
            }
        },
        8880: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(3070),
                r = n(9114);
            e.exports = s ? function(e, t, n) {
                return i.f(e, t, r(1, n))
            } : function(e, t, n) {
                return e[t] = n, e
            }
        },
        9114: function(e) {
            "use strict";
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        },
        7045: function(e, t, n) {
            "use strict";
            var s = n(6339),
                i = n(3070);
            e.exports = function(e, t, n) {
                return n.get && s(n.get, t, {
                    getter: !0
                }), n.set && s(n.set, t, {
                    setter: !0
                }), i.f(e, t, n)
            }
        },
        8052: function(e, t, n) {
            "use strict";
            var s = n(614),
                i = n(3070),
                r = n(6339),
                a = n(3072);
            e.exports = function(e, t, n, o) {
                o || (o = {});
                var l = o.enumerable,
                    c = void 0 !== o.name ? o.name : t;
                if (s(n) && r(n, c, o), o.global) l ? e[t] = n : a(t, n);
                else {
                    try {
                        o.unsafe ? e[t] && (l = !0) : delete e[t]
                    } catch (e) {}
                    l ? e[t] = n : i.f(e, t, {
                        value: n,
                        enumerable: !1,
                        configurable: !o.nonConfigurable,
                        writable: !o.nonWritable
                    })
                }
                return e
            }
        },
        3072: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = Object.defineProperty;
            e.exports = function(e, t) {
                try {
                    i(s, e, {
                        value: t,
                        configurable: !0,
                        writable: !0
                    })
                } catch (n) {
                    s[e] = t
                }
                return t
            }
        },
        9781: function(e, t, n) {
            "use strict";
            var s = n(7293);
            e.exports = !s((function() {
                return 7 !== Object.defineProperty({}, 1, {
                    get: function() {
                        return 7
                    }
                })[1]
            }))
        },
        4154: function(e) {
            "use strict";
            var t = "object" == typeof document && document.all,
                n = void 0 === t && void 0 !== t;
            e.exports = {
                all: t,
                IS_HTMLDDA: n
            }
        },
        317: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(111),
                r = s.document,
                a = i(r) && i(r.createElement);
            e.exports = function(e) {
                return a ? r.createElement(e) : {}
            }
        },
        7207: function(e) {
            "use strict";
            var t = TypeError;
            e.exports = function(e) {
                if (e > 9007199254740991) throw t("Maximum allowed index exceeded");
                return e
            }
        },
        8113: function(e) {
            "use strict";
            e.exports = "undefined" != typeof navigator && String(navigator.userAgent) || ""
        },
        7392: function(e, t, n) {
            "use strict";
            var s, i, r = n(7854),
                a = n(8113),
                o = r.process,
                l = r.Deno,
                c = o && o.versions || l && l.version,
                d = c && c.v8;
            d && (i = (s = d.split("."))[0] > 0 && s[0] < 4 ? 1 : +(s[0] + s[1])), !i && a && (!(s = a.match(/Edge\/(\d+)/)) || s[1] >= 74) && (s = a.match(/Chrome\/(\d+)/)) && (i = +s[1]), e.exports = i
        },
        748: function(e) {
            "use strict";
            e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
        },
        2109: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(1236).f,
                r = n(8880),
                a = n(8052),
                o = n(3072),
                l = n(9920),
                c = n(4705);
            e.exports = function(e, t) {
                var n, d, u, p, f, h = e.target,
                    m = e.global,
                    g = e.stat;
                if (n = m ? s : g ? s[h] || o(h, {}) : (s[h] || {}).prototype)
                    for (d in t) {
                        if (p = t[d], u = e.dontCallGetSet ? (f = i(n, d)) && f.value : n[d], !c(m ? d : h + (g ? "." : "#") + d, e.forced) && void 0 !== u) {
                            if (typeof p == typeof u) continue;
                            l(p, u)
                        }(e.sham || u && u.sham) && r(p, "sham", !0), a(n, d, p, e)
                    }
            }
        },
        7293: function(e) {
            "use strict";
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            }
        },
        4374: function(e, t, n) {
            "use strict";
            var s = n(7293);
            e.exports = !s((function() {
                var e = function() {}.bind();
                return "function" != typeof e || e.hasOwnProperty("prototype")
            }))
        },
        6916: function(e, t, n) {
            "use strict";
            var s = n(4374),
                i = Function.prototype.call;
            e.exports = s ? i.bind(i) : function() {
                return i.apply(i, arguments)
            }
        },
        6530: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(2597),
                r = Function.prototype,
                a = s && Object.getOwnPropertyDescriptor,
                o = i(r, "name"),
                l = o && "something" === function() {}.name,
                c = o && (!s || s && a(r, "name").configurable);
            e.exports = {
                EXISTS: o,
                PROPER: l,
                CONFIGURABLE: c
            }
        },
        1702: function(e, t, n) {
            "use strict";
            var s = n(4374),
                i = Function.prototype,
                r = i.call,
                a = s && i.bind.bind(r, r);
            e.exports = s ? a : function(e) {
                return function() {
                    return r.apply(e, arguments)
                }
            }
        },
        5005: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(614);
            e.exports = function(e, t) {
                return arguments.length < 2 ? (n = s[e], i(n) ? n : void 0) : s[e] && s[e][t];
                var n
            }
        },
        8173: function(e, t, n) {
            "use strict";
            var s = n(9662),
                i = n(8554);
            e.exports = function(e, t) {
                var n = e[t];
                return i(n) ? void 0 : s(n)
            }
        },
        7854: function(e, t, n) {
            "use strict";
            var s = function(e) {
                return e && e.Math === Math && e
            };
            e.exports = s("object" == typeof globalThis && globalThis) || s("object" == typeof window && window) || s("object" == typeof self && self) || s("object" == typeof n.g && n.g) || function() {
                return this
            }() || this || Function("return this")()
        },
        2597: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = n(7908),
                r = s({}.hasOwnProperty);
            e.exports = Object.hasOwn || function(e, t) {
                return r(i(e), t)
            }
        },
        3501: function(e) {
            "use strict";
            e.exports = {}
        },
        4664: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(7293),
                r = n(317);
            e.exports = !s && !i((function() {
                return 7 !== Object.defineProperty(r("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }))
        },
        8361: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = n(7293),
                r = n(4326),
                a = Object,
                o = s("".split);
            e.exports = i((function() {
                return !a("z").propertyIsEnumerable(0)
            })) ? function(e) {
                return "String" === r(e) ? o(e, "") : a(e)
            } : a
        },
        2788: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = n(614),
                r = n(5465),
                a = s(Function.toString);
            i(r.inspectSource) || (r.inspectSource = function(e) {
                return a(e)
            }), e.exports = r.inspectSource
        },
        9909: function(e, t, n) {
            "use strict";
            var s, i, r, a = n(4811),
                o = n(7854),
                l = n(111),
                c = n(8880),
                d = n(2597),
                u = n(5465),
                p = n(6200),
                f = n(3501),
                h = "Object already initialized",
                m = o.TypeError,
                g = o.WeakMap;
            if (a || u.state) {
                var v = u.state || (u.state = new g);
                v.get = v.get, v.has = v.has, v.set = v.set, s = function(e, t) {
                    if (v.has(e)) throw new m(h);
                    return t.facade = e, v.set(e, t), t
                }, i = function(e) {
                    return v.get(e) || {}
                }, r = function(e) {
                    return v.has(e)
                }
            } else {
                var b = p("state");
                f[b] = !0, s = function(e, t) {
                    if (d(e, b)) throw new m(h);
                    return t.facade = e, c(e, b, t), t
                }, i = function(e) {
                    return d(e, b) ? e[b] : {}
                }, r = function(e) {
                    return d(e, b)
                }
            }
            e.exports = {
                set: s,
                get: i,
                has: r,
                enforce: function(e) {
                    return r(e) ? i(e) : s(e, {})
                },
                getterFor: function(e) {
                    return function(t) {
                        var n;
                        if (!l(t) || (n = i(t)).type !== e) throw new m("Incompatible receiver, " + e + " required");
                        return n
                    }
                }
            }
        },
        3157: function(e, t, n) {
            "use strict";
            var s = n(4326);
            e.exports = Array.isArray || function(e) {
                return "Array" === s(e)
            }
        },
        614: function(e, t, n) {
            "use strict";
            var s = n(4154),
                i = s.all;
            e.exports = s.IS_HTMLDDA ? function(e) {
                return "function" == typeof e || e === i
            } : function(e) {
                return "function" == typeof e
            }
        },
        4705: function(e, t, n) {
            "use strict";
            var s = n(7293),
                i = n(614),
                r = /#|\.prototype\./,
                a = function(e, t) {
                    var n = l[o(e)];
                    return n === d || n !== c && (i(t) ? s(t) : !!t)
                },
                o = a.normalize = function(e) {
                    return String(e).replace(r, ".").toLowerCase()
                },
                l = a.data = {},
                c = a.NATIVE = "N",
                d = a.POLYFILL = "P";
            e.exports = a
        },
        8554: function(e) {
            "use strict";
            e.exports = function(e) {
                return null == e
            }
        },
        111: function(e, t, n) {
            "use strict";
            var s = n(614),
                i = n(4154),
                r = i.all;
            e.exports = i.IS_HTMLDDA ? function(e) {
                return "object" == typeof e ? null !== e : s(e) || e === r
            } : function(e) {
                return "object" == typeof e ? null !== e : s(e)
            }
        },
        1913: function(e) {
            "use strict";
            e.exports = !1
        },
        2190: function(e, t, n) {
            "use strict";
            var s = n(5005),
                i = n(614),
                r = n(7976),
                a = n(3307),
                o = Object;
            e.exports = a ? function(e) {
                return "symbol" == typeof e
            } : function(e) {
                var t = s("Symbol");
                return i(t) && r(t.prototype, o(e))
            }
        },
        6244: function(e, t, n) {
            "use strict";
            var s = n(7466);
            e.exports = function(e) {
                return s(e.length)
            }
        },
        6339: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = n(7293),
                r = n(614),
                a = n(2597),
                o = n(9781),
                l = n(6530).CONFIGURABLE,
                c = n(2788),
                d = n(9909),
                u = d.enforce,
                p = d.get,
                f = String,
                h = Object.defineProperty,
                m = s("".slice),
                g = s("".replace),
                v = s([].join),
                b = o && !i((function() {
                    return 8 !== h((function() {}), "length", {
                        value: 8
                    }).length
                })),
                y = String(String).split("String"),
                w = e.exports = function(e, t, n) {
                    "Symbol(" === m(f(t), 0, 7) && (t = "[" + g(f(t), /^Symbol\(([^)]*)\)/, "$1") + "]"), n && n.getter && (t = "get " + t), n && n.setter && (t = "set " + t), (!a(e, "name") || l && e.name !== t) && (o ? h(e, "name", {
                        value: t,
                        configurable: !0
                    }) : e.name = t), b && n && a(n, "arity") && e.length !== n.arity && h(e, "length", {
                        value: n.arity
                    });
                    try {
                        n && a(n, "constructor") && n.constructor ? o && h(e, "prototype", {
                            writable: !1
                        }) : e.prototype && (e.prototype = void 0)
                    } catch (e) {}
                    var s = u(e);
                    return a(s, "source") || (s.source = v(y, "string" == typeof t ? t : "")), e
                };
            Function.prototype.toString = w((function() {
                return r(this) && p(this).source || c(this)
            }), "toString")
        },
        4758: function(e) {
            "use strict";
            var t = Math.ceil,
                n = Math.floor;
            e.exports = Math.trunc || function(e) {
                var s = +e;
                return (s > 0 ? n : t)(s)
            }
        },
        3070: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(4664),
                r = n(3353),
                a = n(9670),
                o = n(4948),
                l = TypeError,
                c = Object.defineProperty,
                d = Object.getOwnPropertyDescriptor,
                u = "enumerable",
                p = "configurable",
                f = "writable";
            t.f = s ? r ? function(e, t, n) {
                if (a(e), t = o(t), a(n), "function" == typeof e && "prototype" === t && "value" in n && f in n && !n[f]) {
                    var s = d(e, t);
                    s && s[f] && (e[t] = n.value, n = {
                        configurable: p in n ? n[p] : s[p],
                        enumerable: u in n ? n[u] : s[u],
                        writable: !1
                    })
                }
                return c(e, t, n)
            } : c : function(e, t, n) {
                if (a(e), t = o(t), a(n), i) try {
                    return c(e, t, n)
                } catch (e) {}
                if ("get" in n || "set" in n) throw new l("Accessors not supported");
                return "value" in n && (e[t] = n.value), e
            }
        },
        1236: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(6916),
                r = n(5296),
                a = n(9114),
                o = n(5656),
                l = n(4948),
                c = n(2597),
                d = n(4664),
                u = Object.getOwnPropertyDescriptor;
            t.f = s ? u : function(e, t) {
                if (e = o(e), t = l(t), d) try {
                    return u(e, t)
                } catch (e) {}
                if (c(e, t)) return a(!i(r.f, e, t), e[t])
            }
        },
        8006: function(e, t, n) {
            "use strict";
            var s = n(6324),
                i = n(748).concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function(e) {
                return s(e, i)
            }
        },
        5181: function(e, t) {
            "use strict";
            t.f = Object.getOwnPropertySymbols
        },
        7976: function(e, t, n) {
            "use strict";
            var s = n(1702);
            e.exports = s({}.isPrototypeOf)
        },
        6324: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = n(2597),
                r = n(5656),
                a = n(1318).indexOf,
                o = n(3501),
                l = s([].push);
            e.exports = function(e, t) {
                var n, s = r(e),
                    c = 0,
                    d = [];
                for (n in s) !i(o, n) && i(s, n) && l(d, n);
                for (; t.length > c;) i(s, n = t[c++]) && (~a(d, n) || l(d, n));
                return d
            }
        },
        5296: function(e, t) {
            "use strict";
            var n = {}.propertyIsEnumerable,
                s = Object.getOwnPropertyDescriptor,
                i = s && !n.call({
                    1: 2
                }, 1);
            t.f = i ? function(e) {
                var t = s(this, e);
                return !!t && t.enumerable
            } : n
        },
        2140: function(e, t, n) {
            "use strict";
            var s = n(6916),
                i = n(614),
                r = n(111),
                a = TypeError;
            e.exports = function(e, t) {
                var n, o;
                if ("string" === t && i(n = e.toString) && !r(o = s(n, e))) return o;
                if (i(n = e.valueOf) && !r(o = s(n, e))) return o;
                if ("string" !== t && i(n = e.toString) && !r(o = s(n, e))) return o;
                throw new a("Can't convert object to primitive value")
            }
        },
        3887: function(e, t, n) {
            "use strict";
            var s = n(5005),
                i = n(1702),
                r = n(8006),
                a = n(5181),
                o = n(9670),
                l = i([].concat);
            e.exports = s("Reflect", "ownKeys") || function(e) {
                var t = r.f(o(e)),
                    n = a.f;
                return n ? l(t, n(e)) : t
            }
        },
        4488: function(e, t, n) {
            "use strict";
            var s = n(8554),
                i = TypeError;
            e.exports = function(e) {
                if (s(e)) throw new i("Can't call method on " + e);
                return e
            }
        },
        6200: function(e, t, n) {
            "use strict";
            var s = n(2309),
                i = n(9711),
                r = s("keys");
            e.exports = function(e) {
                return r[e] || (r[e] = i(e))
            }
        },
        5465: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(3072),
                r = "__core-js_shared__",
                a = s[r] || i(r, {});
            e.exports = a
        },
        2309: function(e, t, n) {
            "use strict";
            var s = n(1913),
                i = n(5465);
            (e.exports = function(e, t) {
                return i[e] || (i[e] = void 0 !== t ? t : {})
            })("versions", []).push({
                version: "3.33.0",
                mode: s ? "pure" : "global",
                copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
                license: "https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE",
                source: "https://github.com/zloirock/core-js"
            })
        },
        6293: function(e, t, n) {
            "use strict";
            var s = n(7392),
                i = n(7293),
                r = n(7854).String;
            e.exports = !!Object.getOwnPropertySymbols && !i((function() {
                var e = Symbol("symbol detection");
                return !r(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && s && s < 41
            }))
        },
        1400: function(e, t, n) {
            "use strict";
            var s = n(9303),
                i = Math.max,
                r = Math.min;
            e.exports = function(e, t) {
                var n = s(e);
                return n < 0 ? i(n + t, 0) : r(n, t)
            }
        },
        5656: function(e, t, n) {
            "use strict";
            var s = n(8361),
                i = n(4488);
            e.exports = function(e) {
                return s(i(e))
            }
        },
        9303: function(e, t, n) {
            "use strict";
            var s = n(4758);
            e.exports = function(e) {
                var t = +e;
                return t != t || 0 === t ? 0 : s(t)
            }
        },
        7466: function(e, t, n) {
            "use strict";
            var s = n(9303),
                i = Math.min;
            e.exports = function(e) {
                return e > 0 ? i(s(e), 9007199254740991) : 0
            }
        },
        7908: function(e, t, n) {
            "use strict";
            var s = n(4488),
                i = Object;
            e.exports = function(e) {
                return i(s(e))
            }
        },
        7593: function(e, t, n) {
            "use strict";
            var s = n(6916),
                i = n(111),
                r = n(2190),
                a = n(8173),
                o = n(2140),
                l = n(5112),
                c = TypeError,
                d = l("toPrimitive");
            e.exports = function(e, t) {
                if (!i(e) || r(e)) return e;
                var n, l = a(e, d);
                if (l) {
                    if (void 0 === t && (t = "default"), n = s(l, e, t), !i(n) || r(n)) return n;
                    throw new c("Can't convert object to primitive value")
                }
                return void 0 === t && (t = "number"), o(e, t)
            }
        },
        4948: function(e, t, n) {
            "use strict";
            var s = n(7593),
                i = n(2190);
            e.exports = function(e) {
                var t = s(e, "string");
                return i(t) ? t : t + ""
            }
        },
        1694: function(e, t, n) {
            "use strict";
            var s = {};
            s[n(5112)("toStringTag")] = "z", e.exports = "[object z]" === String(s)
        },
        1340: function(e, t, n) {
            "use strict";
            var s = n(648),
                i = String;
            e.exports = function(e) {
                if ("Symbol" === s(e)) throw new TypeError("Cannot convert a Symbol value to a string");
                return i(e)
            }
        },
        6330: function(e) {
            "use strict";
            var t = String;
            e.exports = function(e) {
                try {
                    return t(e)
                } catch (e) {
                    return "Object"
                }
            }
        },
        9711: function(e, t, n) {
            "use strict";
            var s = n(1702),
                i = 0,
                r = Math.random(),
                a = s(1..toString);
            e.exports = function(e) {
                return "Symbol(" + (void 0 === e ? "" : e) + ")_" + a(++i + r, 36)
            }
        },
        3307: function(e, t, n) {
            "use strict";
            var s = n(6293);
            e.exports = s && !Symbol.sham && "symbol" == typeof Symbol.iterator
        },
        3353: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(7293);
            e.exports = s && i((function() {
                return 42 !== Object.defineProperty((function() {}), "prototype", {
                    value: 42,
                    writable: !1
                }).prototype
            }))
        },
        8053: function(e) {
            "use strict";
            var t = TypeError;
            e.exports = function(e, n) {
                if (e < n) throw new t("Not enough arguments");
                return e
            }
        },
        4811: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(614),
                r = s.WeakMap;
            e.exports = i(r) && /native code/.test(String(r))
        },
        5112: function(e, t, n) {
            "use strict";
            var s = n(7854),
                i = n(2309),
                r = n(2597),
                a = n(9711),
                o = n(6293),
                l = n(3307),
                c = s.Symbol,
                d = i("wks"),
                u = l ? c.for || c : c && c.withoutSetter || a;
            e.exports = function(e) {
                return r(d, e) || (d[e] = o && r(c, e) ? c[e] : u("Symbol." + e)), d[e]
            }
        },
        7658: function(e, t, n) {
            "use strict";
            var s = n(2109),
                i = n(7908),
                r = n(6244),
                a = n(3658),
                o = n(7207);
            s({
                target: "Array",
                proto: !0,
                arity: 1,
                forced: n(7293)((function() {
                    return 4294967297 !== [].push.call({
                        length: 4294967296
                    }, 1)
                })) || ! function() {
                    try {
                        Object.defineProperty([], "length", {
                            writable: !1
                        }).push()
                    } catch (e) {
                        return e instanceof TypeError
                    }
                }()
            }, {
                push: function(e) {
                    var t = i(this),
                        n = r(t),
                        s = arguments.length;
                    o(n + s);
                    for (var l = 0; l < s; l++) t[n] = arguments[l], n++;
                    return a(t, n), n
                }
            })
        },
        6229: function(e, t, n) {
            "use strict";
            var s = n(8052),
                i = n(1702),
                r = n(1340),
                a = n(8053),
                o = URLSearchParams,
                l = o.prototype,
                c = i(l.append),
                d = i(l.delete),
                u = i(l.forEach),
                p = i([].push),
                f = new o("a=1&a=2&b=3");
            f.delete("a", 1), f.delete("b", void 0), f + "" != "a=2" && s(l, "delete", (function(e) {
                var t = arguments.length,
                    n = t < 2 ? void 0 : arguments[1];
                if (t && void 0 === n) return d(this, e);
                var s = [];
                u(this, (function(e, t) {
                    p(s, {
                        key: t,
                        value: e
                    })
                })), a(t, 1);
                for (var i, o = r(e), l = r(n), f = 0, h = 0, m = !1, g = s.length; f < g;) i = s[f++], m || i.key === o ? (m = !0, d(this, i.key)) : h++;
                for (; h < g;)(i = s[h++]).key === o && i.value === l || c(this, i.key, i.value)
            }), {
                enumerable: !0,
                unsafe: !0
            })
        },
        7330: function(e, t, n) {
            "use strict";
            var s = n(8052),
                i = n(1702),
                r = n(1340),
                a = n(8053),
                o = URLSearchParams,
                l = o.prototype,
                c = i(l.getAll),
                d = i(l.has),
                u = new o("a=1");
            !u.has("a", 2) && u.has("a", void 0) || s(l, "has", (function(e) {
                var t = arguments.length,
                    n = t < 2 ? void 0 : arguments[1];
                if (t && void 0 === n) return d(this, e);
                var s = c(this, e);
                a(t, 1);
                for (var i = r(n), o = 0; o < s.length;)
                    if (s[o++] === i) return !0;
                return !1
            }), {
                enumerable: !0,
                unsafe: !0
            })
        },
        2062: function(e, t, n) {
            "use strict";
            var s = n(9781),
                i = n(1702),
                r = n(7045),
                a = URLSearchParams.prototype,
                o = i(a.forEach);
            s && !("size" in a) && r(a, "size", {
                get: function() {
                    var e = 0;
                    return o(this, (function() {
                        e++
                    })), e
                },
                configurable: !0,
                enumerable: !0
            })
        },
        7090: function(e) {
            ! function(t, n) {
                var s = function(e, t, n) {
                    "use strict";
                    var s, i;
                    if (function() {
                            var t, n = {
                                lazyClass: "lazyload",
                                loadedClass: "lazyloaded",
                                loadingClass: "lazyloading",
                                preloadClass: "lazypreload",
                                errorClass: "lazyerror",
                                autosizesClass: "lazyautosizes",
                                fastLoadedClass: "ls-is-cached",
                                iframeLoadMode: 0,
                                srcAttr: "data-src",
                                srcsetAttr: "data-srcset",
                                sizesAttr: "data-sizes",
                                minSize: 40,
                                customMedia: {},
                                init: !0,
                                expFactor: 1.5,
                                hFac: .8,
                                loadMode: 2,
                                loadHidden: !0,
                                ricTimeout: 0,
                                throttleDelay: 125
                            };
                            for (t in i = e.lazySizesConfig || e.lazysizesConfig || {}, n) t in i || (i[t] = n[t])
                        }(), !t || !t.getElementsByClassName) return {
                        init: function() {},
                        cfg: i,
                        noSupport: !0
                    };
                    var r = t.documentElement,
                        a = e.HTMLPictureElement,
                        o = "addEventListener",
                        l = "getAttribute",
                        c = e[o].bind(e),
                        d = e.setTimeout,
                        u = e.requestAnimationFrame || d,
                        p = e.requestIdleCallback,
                        f = /^picture$/i,
                        h = ["load", "error", "lazyincluded", "_lazyloaded"],
                        m = {},
                        g = Array.prototype.forEach,
                        v = function(e, t) {
                            return m[t] || (m[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), m[t].test(e[l]("class") || "") && m[t]
                        },
                        b = function(e, t) {
                            v(e, t) || e.setAttribute("class", (e[l]("class") || "").trim() + " " + t)
                        },
                        y = function(e, t) {
                            var n;
                            (n = v(e, t)) && e.setAttribute("class", (e[l]("class") || "").replace(n, " "))
                        },
                        w = function(e, t, n) {
                            var s = n ? o : "removeEventListener";
                            n && w(e, t), h.forEach((function(n) {
                                e[s](n, t)
                            }))
                        },
                        x = function(e, n, i, r, a) {
                            var o = t.createEvent("Event");
                            return i || (i = {}), i.instance = s, o.initEvent(n, !r, !a), o.detail = i, e.dispatchEvent(o), o
                        },
                        E = function(t, n) {
                            var s;
                            !a && (s = e.picturefill || i.pf) ? (n && n.src && !t[l]("srcset") && t.setAttribute("srcset", n.src), s({
                                reevaluate: !0,
                                elements: [t]
                            })) : n && n.src && (t.src = n.src)
                        },
                        _ = function(e, t) {
                            return (getComputedStyle(e, null) || {})[t]
                        },
                        C = function(e, t, n) {
                            for (n = n || e.offsetWidth; n < i.minSize && t && !e._lazysizesWidth;) n = t.offsetWidth, t = t.parentNode;
                            return n
                        },
                        S = (be = [], ye = [], we = be, xe = function() {
                            var e = we;
                            for (we = be.length ? ye : be, ge = !0, ve = !1; e.length;) e.shift()();
                            ge = !1
                        }, Ee = function(e, n) {
                            ge && !n ? e.apply(this, arguments) : (we.push(e), ve || (ve = !0, (t.hidden ? d : u)(xe)))
                        }, Ee._lsFlush = xe, Ee),
                        $ = function(e, t) {
                            return t ? function() {
                                S(e)
                            } : function() {
                                var t = this,
                                    n = arguments;
                                S((function() {
                                    e.apply(t, n)
                                }))
                            }
                        },
                        T = function(e) {
                            var t, s = 0,
                                r = i.throttleDelay,
                                a = i.ricTimeout,
                                o = function() {
                                    t = !1, s = n.now(), e()
                                },
                                l = p && a > 49 ? function() {
                                    p(o, {
                                        timeout: a
                                    }), a !== i.ricTimeout && (a = i.ricTimeout)
                                } : $((function() {
                                    d(o)
                                }), !0);
                            return function(e) {
                                var i;
                                (e = !0 === e) && (a = 33), t || (t = !0, (i = r - (n.now() - s)) < 0 && (i = 0), e || i < 9 ? l() : d(l, i))
                            }
                        },
                        M = function(e) {
                            var t, s, i = 99,
                                r = function() {
                                    t = null, e()
                                },
                                a = function() {
                                    var e = n.now() - s;
                                    e < i ? d(a, i - e) : (p || r)(r)
                                };
                            return function() {
                                s = n.now(), t || (t = d(a, i))
                            }
                        },
                        z = (V = /^img$/i, U = /^iframe$/i, K = "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent), Z = 0, J = 0, Q = 0, ee = -1, te = function(e) {
                            Q--, (!e || Q < 0 || !e.target) && (Q = 0)
                        }, ne = function(e) {
                            return null == Y && (Y = "hidden" == _(t.body, "visibility")), Y || !("hidden" == _(e.parentNode, "visibility") && "hidden" == _(e, "visibility"))
                        }, se = function(e, n) {
                            var s, i = e,
                                a = ne(e);
                            for (F -= n, X += n, G -= n, q += n; a && (i = i.offsetParent) && i != t.body && i != r;)(a = (_(i, "opacity") || 1) > 0) && "visible" != _(i, "overflow") && (s = i.getBoundingClientRect(), a = q > s.left && G < s.right && X > s.top - 1 && F < s.bottom + 1);
                            return a
                        }, ie = function() {
                            var e, n, a, o, c, d, u, p, f, h, m, g, v = s.elements;
                            if ((R = i.loadMode) && Q < 8 && (e = v.length)) {
                                for (n = 0, ee++; n < e; n++)
                                    if (v[n] && !v[n]._lazyRace)
                                        if (!K || s.prematureUnveil && s.prematureUnveil(v[n])) pe(v[n]);
                                        else if ((p = v[n][l]("data-expand")) && (d = 1 * p) || (d = J), h || (h = !i.expand || i.expand < 1 ? r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370 : i.expand, s._defEx = h, m = h * i.expFactor, g = i.hFac, Y = null, J < m && Q < 1 && ee > 2 && R > 2 && !t.hidden ? (J = m, ee = 0) : J = R > 1 && ee > 1 && Q < 6 ? h : Z), f !== d && (H = innerWidth + d * g, W = innerHeight + d, u = -1 * d, f = d), a = v[n].getBoundingClientRect(), (X = a.bottom) >= u && (F = a.top) <= W && (q = a.right) >= u * g && (G = a.left) <= H && (X || q || G || F) && (i.loadHidden || ne(v[n])) && (D && Q < 3 && !p && (R < 3 || ee < 4) || se(v[n], d))) {
                                    if (pe(v[n]), c = !0, Q > 9) break
                                } else !c && D && !o && Q < 4 && ee < 4 && R > 2 && (N[0] || i.preloadAfterLoad) && (N[0] || !p && (X || q || G || F || "auto" != v[n][l](i.sizesAttr))) && (o = N[0] || v[n]);
                                o && !c && pe(o)
                            }
                        }, re = T(ie), ae = function(e) {
                            var t = e.target;
                            t._lazyCache ? delete t._lazyCache : (te(e), b(t, i.loadedClass), y(t, i.loadingClass), w(t, le), x(t, "lazyloaded"))
                        }, oe = $(ae), le = function(e) {
                            oe({
                                target: e.target
                            })
                        }, ce = function(e, t) {
                            var n = e.getAttribute("data-load-mode") || i.iframeLoadMode;
                            0 == n ? e.contentWindow.location.replace(t) : 1 == n && (e.src = t)
                        }, de = function(e) {
                            var t, n = e[l](i.srcsetAttr);
                            (t = i.customMedia[e[l]("data-media") || e[l]("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n)
                        }, ue = $((function(e, t, n, s, r) {
                            var a, o, c, u, p, h;
                            (p = x(e, "lazybeforeunveil", t)).defaultPrevented || (s && (n ? b(e, i.autosizesClass) : e.setAttribute("sizes", s)), o = e[l](i.srcsetAttr), a = e[l](i.srcAttr), r && (u = (c = e.parentNode) && f.test(c.nodeName || "")), h = t.firesLoad || "src" in e && (o || a || u), p = {
                                target: e
                            }, b(e, i.loadingClass), h && (clearTimeout(j), j = d(te, 2500), w(e, le, !0)), u && g.call(c.getElementsByTagName("source"), de), o ? e.setAttribute("srcset", o) : a && !u && (U.test(e.nodeName) ? ce(e, a) : e.src = a), r && (o || u) && E(e, {
                                src: a
                            })), e._lazyRace && delete e._lazyRace, y(e, i.lazyClass), S((function() {
                                var t = e.complete && e.naturalWidth > 1;
                                h && !t || (t && b(e, i.fastLoadedClass), ae(p), e._lazyCache = !0, d((function() {
                                    "_lazyCache" in e && delete e._lazyCache
                                }), 9)), "lazy" == e.loading && Q--
                            }), !0)
                        })), pe = function(e) {
                            if (!e._lazyRace) {
                                var t, n = V.test(e.nodeName),
                                    s = n && (e[l](i.sizesAttr) || e[l]("sizes")),
                                    r = "auto" == s;
                                (!r && D || !n || !e[l]("src") && !e.srcset || e.complete || v(e, i.errorClass) || !v(e, i.lazyClass)) && (t = x(e, "lazyunveilread").detail, r && P.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, Q++, ue(e, t, r, s, n))
                            }
                        }, fe = M((function() {
                            i.loadMode = 3, re()
                        })), he = function() {
                            3 == i.loadMode && (i.loadMode = 2), fe()
                        }, me = function() {
                            D || (n.now() - B < 999 ? d(me, 999) : (D = !0, i.loadMode = 3, re(), c("scroll", he, !0)))
                        }, {
                            _: function() {
                                B = n.now(), s.elements = t.getElementsByClassName(i.lazyClass), N = t.getElementsByClassName(i.lazyClass + " " + i.preloadClass), c("scroll", re, !0), c("resize", re, !0), c("pageshow", (function(e) {
                                    if (e.persisted) {
                                        var n = t.querySelectorAll("." + i.loadingClass);
                                        n.length && n.forEach && u((function() {
                                            n.forEach((function(e) {
                                                e.complete && pe(e)
                                            }))
                                        }))
                                    }
                                })), e.MutationObserver ? new MutationObserver(re).observe(r, {
                                    childList: !0,
                                    subtree: !0,
                                    attributes: !0
                                }) : (r[o]("DOMNodeInserted", re, !0), r[o]("DOMAttrModified", re, !0), setInterval(re, 999)), c("hashchange", re, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach((function(e) {
                                    t[o](e, re, !0)
                                })), /d$|^c/.test(t.readyState) ? me() : (c("load", me), t[o]("DOMContentLoaded", re), d(me, 2e4)), s.elements.length ? (ie(), S._lsFlush()) : re()
                            },
                            checkElems: re,
                            unveil: pe,
                            _aLSL: he
                        }),
                        P = (O = $((function(e, t, n, s) {
                            var i, r, a;
                            if (e._lazysizesWidth = s, s += "px", e.setAttribute("sizes", s), f.test(t.nodeName || ""))
                                for (r = 0, a = (i = t.getElementsByTagName("source")).length; r < a; r++) i[r].setAttribute("sizes", s);
                            n.detail.dataAttr || E(e, n.detail)
                        })), L = function(e, t, n) {
                            var s, i = e.parentNode;
                            i && (n = C(e, i, n), (s = x(e, "lazybeforesizes", {
                                width: n,
                                dataAttr: !!t
                            })).defaultPrevented || (n = s.detail.width) && n !== e._lazysizesWidth && O(e, i, s, n))
                        }, I = M((function() {
                            var e, t = k.length;
                            if (t)
                                for (e = 0; e < t; e++) L(k[e])
                        })), {
                            _: function() {
                                k = t.getElementsByClassName(i.autosizesClass), c("resize", I)
                            },
                            checkElems: I,
                            updateElem: L
                        }),
                        A = function() {
                            !A.i && t.getElementsByClassName && (A.i = !0, P._(), z._())
                        };
                    var k, O, L, I;
                    var N, D, j, R, B, H, W, F, G, q, X, Y, V, U, K, Z, J, Q, ee, te, ne, se, ie, re, ae, oe, le, ce, de, ue, pe, fe, he, me;
                    var ge, ve, be, ye, we, xe, Ee;
                    return d((function() {
                        i.init && A()
                    })), s = {
                        cfg: i,
                        autoSizer: P,
                        loader: z,
                        init: A,
                        uP: E,
                        aC: b,
                        rC: y,
                        hC: v,
                        fire: x,
                        gW: C,
                        rAF: S
                    }
                }(t, t.document, Date);
                t.lazySizes = s, e.exports && (e.exports = s)
            }("undefined" != typeof window ? window : {})
        },
        9145: function(e, t, n) {
            var s, i, r;
            ! function(a, o) {
                o = o.bind(null, a, a.document), e.exports ? o(n(7090)) : (i = [n(7090)], void 0 === (r = "function" == typeof(s = o) ? s.apply(t, i) : s) || (e.exports = r))
            }(window, (function(e, t, n) {
                "use strict";
                if (e.addEventListener) {
                    var s = n.cfg,
                        i = /\s+/g,
                        r = /\s*\|\s+|\s+\|\s*/g,
                        a = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/,
                        o = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/,
                        l = /\(|\)|'/,
                        c = {
                            contain: 1,
                            cover: 1
                        },
                        d = function(e, t) {
                            if (t) {
                                var n = t.match(o);
                                n && n[1] ? e.setAttribute("type", n[1]) : e.setAttribute("media", s.customMedia[t] || t)
                            }
                        },
                        u = function(e) {
                            if (e.target._lazybgset) {
                                var t = e.target,
                                    s = t._lazybgset,
                                    i = t.currentSrc || t.src;
                                if (i) {
                                    var r = l.test(i) ? JSON.stringify(i) : i,
                                        a = n.fire(s, "bgsetproxy", {
                                            src: i,
                                            useSrc: r,
                                            fullSrc: null
                                        });
                                    a.defaultPrevented || (s.style.backgroundImage = a.detail.fullSrc || "url(" + a.detail.useSrc + ")")
                                }
                                t._lazybgsetLoading && (n.fire(s, "_lazyloaded", {}, !1, !0), delete t._lazybgsetLoading)
                            }
                        };
                    addEventListener("lazybeforeunveil", (function(e) {
                        var o, l, c;
                        !e.defaultPrevented && (o = e.target.getAttribute("data-bgset")) && (c = e.target, (l = t.createElement("img")).alt = "", l._lazybgsetLoading = !0, e.detail.firesLoad = !0, function(e, n, o) {
                            var l = t.createElement("picture"),
                                c = n.getAttribute(s.sizesAttr),
                                u = n.getAttribute("data-ratio"),
                                p = n.getAttribute("data-optimumx");
                            n._lazybgset && n._lazybgset.parentNode == n && n.removeChild(n._lazybgset), Object.defineProperty(o, "_lazybgset", {
                                value: n,
                                writable: !0
                            }), Object.defineProperty(n, "_lazybgset", {
                                value: l,
                                writable: !0
                            }), e = e.replace(i, " ").split(r), l.style.display = "none", o.className = s.lazyClass, 1 != e.length || c || (c = "auto"), e.forEach((function(e) {
                                var n, i = t.createElement("source");
                                c && "auto" != c && i.setAttribute("sizes", c), (n = e.match(a)) ? (i.setAttribute(s.srcsetAttr, n[1]), d(i, n[2]), d(i, n[3])) : i.setAttribute(s.srcsetAttr, e), l.appendChild(i)
                            })), c && (o.setAttribute(s.sizesAttr, c), n.removeAttribute(s.sizesAttr), n.removeAttribute("sizes")), p && o.setAttribute("data-optimumx", p), u && o.setAttribute("data-ratio", u), l.appendChild(o), n.appendChild(l)
                        }(o, c, l), setTimeout((function() {
                            n.loader.unveil(l), n.rAF((function() {
                                n.fire(l, "_lazyloaded", {}, !0, !0), l.complete && u({
                                    target: l
                                })
                            }))
                        })))
                    })), t.addEventListener("load", u, !0), e.addEventListener("lazybeforesizes", (function(e) {
                        if (e.detail.instance == n && e.target._lazybgset && e.detail.dataAttr) {
                            var t = function(e) {
                                var t;
                                return t = (getComputedStyle(e) || {
                                    getPropertyValue: function() {}
                                }).getPropertyValue("background-size"), !c[t] && c[e.style.backgroundSize] && (t = e.style.backgroundSize), t
                            }(e.target._lazybgset);
                            c[t] && (e.target._lazysizesParentFit = t, n.rAF((function() {
                                e.target.setAttribute("data-parent-fit", t), e.target._lazysizesParentFit && delete e.target._lazysizesParentFit
                            })))
                        }
                    }), !0), t.documentElement.addEventListener("lazybeforesizes", (function(e) {
                        var t, s;
                        !e.defaultPrevented && e.target._lazybgset && e.detail.instance == n && (e.detail.width = (t = e.target._lazybgset, s = n.gW(t, t.parentNode), (!t._lazysizesWidth || s > t._lazysizesWidth) && (t._lazysizesWidth = s), t._lazysizesWidth))
                    }))
                }
            }))
        },
        1770: function(e, t, n) {
            var s, i, r;
            ! function(a, o) {
                if (a) {
                    o = o.bind(null, a, a.document), e.exports ? o(n(7090)) : (i = [n(7090)], void 0 === (r = "function" == typeof(s = o) ? s.apply(t, i) : s) || (e.exports = r))
                }
            }("undefined" != typeof window ? window : 0, (function(e, t, n) {
                "use strict";
                if (e.addEventListener) {
                    var s = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                        i = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
                        r = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
                        a = /^picture$/i,
                        o = n.cfg,
                        l = {
                            getParent: function(t, n) {
                                var s = t,
                                    i = t.parentNode;
                                return n && "prev" != n || !i || !a.test(i.nodeName || "") || (i = i.parentNode), "self" != n && (s = "prev" == n ? t.previousElementSibling : n && (i.closest || e.jQuery) && (i.closest ? i.closest(n) : jQuery(i).closest(n)[0]) || i), s
                            },
                            getFit: function(e) {
                                var t, n, s = getComputedStyle(e, null) || {},
                                    a = s.content || s.fontFamily,
                                    o = {
                                        fit: e._lazysizesParentFit || e.getAttribute("data-parent-fit")
                                    };
                                return !o.fit && a && (t = a.match(i)) && (o.fit = t[1]), o.fit ? (!(n = e._lazysizesParentContainer || e.getAttribute("data-parent-container")) && a && (t = a.match(r)) && (n = t[1]), o.parent = l.getParent(e, n)) : o.fit = s.objectFit, o
                            },
                            getImageRatio: function(t) {
                                var n, i, r, l, c, d, u, p = t.parentNode,
                                    f = p && a.test(p.nodeName || "") ? p.querySelectorAll("source, img") : [t];
                                for (n = 0; n < f.length; n++)
                                    if (i = (t = f[n]).getAttribute(o.srcsetAttr) || t.getAttribute("srcset") || t.getAttribute("data-pfsrcset") || t.getAttribute("data-risrcset") || "", r = t._lsMedia || t.getAttribute("media"), r = o.customMedia[t.getAttribute("data-media") || r] || r, i && (!r || (e.matchMedia && matchMedia(r) || {}).matches)) {
                                        (l = parseFloat(t.getAttribute("data-aspectratio"))) || ((c = i.match(s)) ? "w" == c[2] ? (d = c[1], u = c[3]) : (d = c[3], u = c[1]) : (d = t.getAttribute("width"), u = t.getAttribute("height")), l = d / u);
                                        break
                                    } return l
                            },
                            calculateSize: function(e, t) {
                                var n, s, i, r = this.getFit(e),
                                    a = r.fit,
                                    o = r.parent;
                                return "width" == a || ("contain" == a || "cover" == a) && (s = this.getImageRatio(e)) ? (o ? t = o.clientWidth : o = e, i = t, "width" == a ? i = t : (n = t / o.clientHeight) && ("cover" == a && n < s || "contain" == a && n > s) && (i = t * (s / n)), i) : t
                            }
                        };
                    n.parentFit = l, t.addEventListener("lazybeforesizes", (function(e) {
                        if (!e.defaultPrevented && e.detail.instance == n) {
                            var t = e.target;
                            e.detail.width = l.calculateSize(t, e.detail.width)
                        }
                    }))
                }
            }))
        },
        1035: function(e, t, n) {
            var s, i, r;
            ! function(a, o) {
                o = o.bind(null, a, a.document), e.exports ? o(n(7090)) : (i = [n(7090)], void 0 === (r = "function" == typeof(s = o) ? s.apply(t, i) : s) || (e.exports = r))
            }(window, (function(e, t, n) {
                "use strict";
                var s, i, r = n.cfg,
                    a = {
                        string: 1,
                        number: 1
                    },
                    o = /^\-*\+*\d+\.*\d*$/,
                    l = /^picture$/i,
                    c = /\s*\{\s*width\s*\}\s*/i,
                    d = /\s*\{\s*height\s*\}\s*/i,
                    u = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
                    p = /^\[.*\]|\{.*\}$/,
                    f = /^(?:auto|\d+(px)?)$/,
                    h = t.createElement("a"),
                    m = t.createElement("img"),
                    g = "srcset" in m && !("sizes" in m),
                    v = !!e.HTMLPictureElement && !g;

                function b(t, n, s) {
                    var r, a, c, d, f, h = e.getComputedStyle(t);
                    if (s) {
                        for (d in f = {}, s) f[d] = s[d];
                        s = f
                    } else a = t.parentNode, s = {
                        isPicture: !(!a || !l.test(a.nodeName || ""))
                    };
                    for (r in c = function(e, n) {
                            var r = t.getAttribute("data-" + e);
                            if (!r) {
                                var a = h.getPropertyValue("--ls-" + e);
                                a && (r = a.trim())
                            }
                            if (r) {
                                if ("true" == r) r = !0;
                                else if ("false" == r) r = !1;
                                else if (o.test(r)) r = parseFloat(r);
                                else if ("function" == typeof i[e]) r = i[e](t, r);
                                else if (p.test(r)) try {
                                    r = JSON.parse(r)
                                } catch (e) {}
                                s[e] = r
                            } else e in i && "function" != typeof i[e] && !s[e] ? s[e] = i[e] : n && "function" == typeof i[e] && (s[e] = i[e](t, r))
                        }, i) c(r);
                    return n.replace(u, (function(e, t) {
                        t in s || c(t, !0)
                    })), s
                }

                function y(e, n, r) {
                    var o = 0,
                        l = 0,
                        p = r;
                    if (e) {
                        if ("container" === n.ratio) {
                            for (o = p.scrollWidth, l = p.scrollHeight; !(o && l || p === t);) o = (p = p.parentNode).scrollWidth, l = p.scrollHeight;
                            o && l && (n.ratio = n.traditionalRatio ? l / o : o / l)
                        }
                        var f, m, v;
                        f = e, m = n, (v = []).srcset = [], m.absUrl && (h.setAttribute("href", f), f = h.href), f = ((m.prefix || "") + f + (m.postfix || "")).replace(u, (function(e, t) {
                            return a[typeof m[t]] ? m[t] : e
                        })), m.widths.forEach((function(e) {
                            var t = m.widthmap[e] || e,
                                n = m.aspectratio || m.ratio,
                                s = !m.aspectratio && i.traditionalRatio,
                                r = {
                                    u: f.replace(c, t).replace(d, n ? s ? Math.round(e * n) : Math.round(e / n) : ""),
                                    w: e
                                };
                            v.push(r), v.srcset.push(r.c = r.u + " " + e + "w")
                        })), (e = v).isPicture = n.isPicture, g && "IMG" == r.nodeName.toUpperCase() ? r.removeAttribute(s.srcsetAttr) : r.setAttribute(s.srcsetAttr, e.srcset.join(", ")), Object.defineProperty(r, "_lazyrias", {
                            value: e,
                            writable: !0
                        })
                    }
                }

                function w(e) {
                    return e.getAttribute(e.getAttribute("data-srcattr") || i.srcAttr) || e.getAttribute(s.srcsetAttr) || e.getAttribute(s.srcAttr) || e.getAttribute("data-pfsrcset") || ""
                }! function() {
                    var e, t = {
                        prefix: "",
                        postfix: "",
                        srcAttr: "data-src",
                        absUrl: !1,
                        modifyOptions: function() {},
                        widthmap: {},
                        ratio: !1,
                        traditionalRatio: !1,
                        aspectratio: !1
                    };
                    for (e in (s = n && n.cfg).supportsType || (s.supportsType = function(e) {
                            return !e
                        }), s.rias || (s.rias = {}), "widths" in (i = s.rias) || (i.widths = [], function(e) {
                            for (var t, n = 0; !t || t < 3e3;)(n += 5) > 30 && (n += 1), t = 36 * n, e.push(t)
                        }(i.widths)), t) e in i || (i[e] = t[e])
                }(), addEventListener("lazybeforesizes", (function(e) {
                    var t, r, a, o, l, d, u, p, h, m, g, E, _;
                    if (e.detail.instance == n && (t = e.target, e.detail.dataAttr && !e.defaultPrevented && !i.disabled && (h = t.getAttribute(s.sizesAttr) || t.getAttribute("sizes")) && f.test(h))) {
                        if (a = function(e, t) {
                                var s = b(e, t);
                                return i.modifyOptions.call(e, {
                                    target: e,
                                    details: s,
                                    detail: s
                                }), n.fire(e, "lazyriasmodifyoptions", s), s
                            }(t, r = w(t)), g = c.test(a.prefix) || c.test(a.postfix), a.isPicture && (o = t.parentNode))
                            for (d = 0, u = (l = o.getElementsByTagName("source")).length; d < u; d++)(g || c.test(p = w(l[d]))) && (y(p, b(l[d], p, a), l[d]), E = !0);
                        g || c.test(r) ? (y(r, a, t), E = !0) : E && ((_ = []).srcset = [], _.isPicture = !0, Object.defineProperty(t, "_lazyrias", {
                            value: _,
                            writable: !0
                        })), E && (v ? t.removeAttribute(s.srcAttr) : "auto" != h && (m = {
                            width: parseInt(h, 10)
                        }, x({
                            target: t,
                            detail: m
                        })))
                    }
                }), !0);
                var x = function() {
                    var i = function(e, t) {
                            return e.w - t.w
                        },
                        a = function(e, t) {
                            var i;
                            return !e._lazyrias && n.pWS && (i = n.pWS(e.getAttribute(s.srcsetAttr || ""))).length && (Object.defineProperty(e, "_lazyrias", {
                                value: i,
                                writable: !0
                            }), t && e.parentNode && (i.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase())), e._lazyrias
                        },
                        o = function(t, s) {
                            var r, o, l, c, d, u;
                            if ((d = t._lazyrias).isPicture && e.matchMedia)
                                for (o = 0, l = (r = t.parentNode.getElementsByTagName("source")).length; o < l; o++)
                                    if (a(r[o]) && !r[o].getAttribute("type") && (!(c = r[o].getAttribute("media")) || (matchMedia(c) || {}).matches)) {
                                        d = r[o]._lazyrias;
                                        break
                                    } return (!d.w || d.w < s) && (d.w = s, d.d = function(t) {
                                var s = e.devicePixelRatio || 1,
                                    i = n.getX && n.getX(t);
                                return Math.min(i || s, 2.4, s)
                            }(t), u = function(e) {
                                for (var t, n, s = e.length, i = e[s - 1], r = 0; r < s; r++)
                                    if ((i = e[r]).d = i.w / e.w, i.d >= e.d) {
                                        !i.cached && (t = e[r - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (n = Math.pow(t.d - .6, 1.6), t.cached && (t.d += .15 * n), t.d + (i.d - e.d) * n > e.d && (i = t));
                                        break
                                    } return i
                            }(d.sort(i))), u
                        },
                        l = function(i) {
                            if (i.detail.instance == n) {
                                var c, d = i.target;
                                g || !(e.respimage || e.picturefill || r.pf) ? ("_lazyrias" in d || i.detail.dataAttr && a(d, !0)) && (c = o(d, i.detail.width)) && c.u && d._lazyrias.cur != c.u && (d._lazyrias.cur = c.u, c.cached = !0, n.rAF((function() {
                                    d.setAttribute(s.srcAttr, c.u), d.setAttribute("src", c.u)
                                }))) : t.removeEventListener("lazybeforesizes", l)
                            }
                        };
                    return v ? l = function() {} : addEventListener("lazybeforesizes", l), l
                }()
            }))
        },
        5541: function() {
            (function() {
                var e, t, n, s, i, r = function(e, t) {
                        return function() {
                            return e.apply(t, arguments)
                        }
                    },
                    a = [].indexOf || function(e) {
                        for (var t = 0, n = this.length; t < n; t++)
                            if (t in this && this[t] === e) return t;
                        return -1
                    };
                t = function() {
                    function e() {}
                    return e.prototype.extend = function(e, t) {
                        var n, s;
                        for (n in t) s = t[n], null == e[n] && (e[n] = s);
                        return e
                    }, e.prototype.isMobile = function(e) {
                        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
                    }, e.prototype.createEvent = function(e, t, n, s) {
                        var i;
                        return null == t && (t = !1), null == n && (n = !1), null == s && (s = null), null != document.createEvent ? (i = document.createEvent("CustomEvent")).initCustomEvent(e, t, n, s) : null != document.createEventObject ? (i = document.createEventObject()).eventType = e : i.eventName = e, i
                    }, e.prototype.emitEvent = function(e, t) {
                        return null != e.dispatchEvent ? e.dispatchEvent(t) : t in (null != e) ? e[t]() : "on" + t in (null != e) ? e["on" + t]() : void 0
                    }, e.prototype.addEvent = function(e, t, n) {
                        return null != e.addEventListener ? e.addEventListener(t, n, !1) : null != e.attachEvent ? e.attachEvent("on" + t, n) : e[t] = n
                    }, e.prototype.removeEvent = function(e, t, n) {
                        return null != e.removeEventListener ? e.removeEventListener(t, n, !1) : null != e.detachEvent ? e.detachEvent("on" + t, n) : delete e[t]
                    }, e.prototype.innerHeight = function() {
                        return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
                    }, e
                }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
                    function e() {
                        this.keys = [], this.values = []
                    }
                    return e.prototype.get = function(e) {
                        var t, n, s, i;
                        for (t = n = 0, s = (i = this.keys).length; n < s; t = ++n)
                            if (i[t] === e) return this.values[t]
                    }, e.prototype.set = function(e, t) {
                        var n, s, i, r;
                        for (n = s = 0, i = (r = this.keys).length; s < i; n = ++s)
                            if (r[n] === e) return void(this.values[n] = t);
                        return this.keys.push(e), this.values.push(t)
                    }, e
                }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
                    function e() {
                        "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
                    }
                    return e.notSupported = !0, e.prototype.observe = function() {}, e
                }()), s = this.getComputedStyle || function(e, t) {
                    return this.getPropertyValue = function(t) {
                        var n;
                        return "float" === t && (t = "styleFloat"), i.test(t) && t.replace(i, (function(e, t) {
                            return t.toUpperCase()
                        })), (null != (n = e.currentStyle) ? n[t] : void 0) || null
                    }, this
                }, i = /(\-([a-z]){1})/g, this.WOW = function() {
                    function i(e) {
                        null == e && (e = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(e, this.defaults), null != e.scrollContainer && (this.config.scrollContainer = document.querySelector(e.scrollContainer)), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass)
                    }
                    return i.prototype.defaults = {
                        boxClass: "wow",
                        animateClass: "animated",
                        offset: 0,
                        mobile: !0,
                        live: !0,
                        callback: null,
                        scrollContainer: null
                    }, i.prototype.init = function() {
                        var e;
                        return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
                    }, i.prototype.start = function() {
                        var t, n, s, i, r;
                        if (this.stopped = !1, this.boxes = function() {
                                var e, n, s, i;
                                for (i = [], e = 0, n = (s = this.element.querySelectorAll("." + this.config.boxClass)).length; e < n; e++) t = s[e], i.push(t);
                                return i
                            }.call(this), this.all = function() {
                                var e, n, s, i;
                                for (i = [], e = 0, n = (s = this.boxes).length; e < n; e++) t = s[e], i.push(t);
                                return i
                            }.call(this), this.boxes.length)
                            if (this.disabled()) this.resetStyle();
                            else
                                for (n = 0, s = (i = this.boxes).length; n < s; n++) t = i[n], this.applyStyle(t, !0);
                        if (this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live) return new e((r = this, function(e) {
                            var t, n, s, i, a;
                            for (a = [], t = 0, n = e.length; t < n; t++) i = e[t], a.push(function() {
                                var e, t, n, r;
                                for (r = [], e = 0, t = (n = i.addedNodes || []).length; e < t; e++) s = n[e], r.push(this.doSync(s));
                                return r
                            }.call(r));
                            return a
                        })).observe(document.body, {
                            childList: !0,
                            subtree: !0
                        })
                    }, i.prototype.stop = function() {
                        if (this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval) return clearInterval(this.interval)
                    }, i.prototype.sync = function(t) {
                        if (e.notSupported) return this.doSync(this.element)
                    }, i.prototype.doSync = function(e) {
                        var t, n, s, i, r;
                        if (null == e && (e = this.element), 1 === e.nodeType) {
                            for (r = [], n = 0, s = (i = (e = e.parentNode || e).querySelectorAll("." + this.config.boxClass)).length; n < s; n++) t = i[n], a.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                            return r
                        }
                    }, i.prototype.show = function(e) {
                        return this.applyStyle(e), e.className = e.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(e), this.util().emitEvent(e, this.wowEvent), this.util().addEvent(e, "animationend", this.resetAnimation), this.util().addEvent(e, "oanimationend", this.resetAnimation), this.util().addEvent(e, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(e, "MSAnimationEnd", this.resetAnimation), e
                    }, i.prototype.applyStyle = function(e, t) {
                        var n, s, i, r;
                        return s = e.getAttribute("data-wow-duration"), n = e.getAttribute("data-wow-delay"), i = e.getAttribute("data-wow-iteration"), this.animate((r = this, function() {
                            return r.customStyle(e, t, s, n, i)
                        }))
                    }, i.prototype.animate = "requestAnimationFrame" in window ? function(e) {
                        return window.requestAnimationFrame(e)
                    } : function(e) {
                        return e()
                    }, i.prototype.resetStyle = function() {
                        var e, t, n, s, i;
                        for (i = [], t = 0, n = (s = this.boxes).length; t < n; t++) e = s[t], i.push(e.style.visibility = "visible");
                        return i
                    }, i.prototype.resetAnimation = function(e) {
                        var t;
                        if (e.type.toLowerCase().indexOf("animationend") >= 0) return (t = e.target || e.srcElement).className = t.className.replace(this.config.animateClass, "").trim()
                    }, i.prototype.customStyle = function(e, t, n, s, i) {
                        return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", n && this.vendorSet(e.style, {
                            animationDuration: n
                        }), s && this.vendorSet(e.style, {
                            animationDelay: s
                        }), i && this.vendorSet(e.style, {
                            animationIterationCount: i
                        }), this.vendorSet(e.style, {
                            animationName: t ? "none" : this.cachedAnimationName(e)
                        }), e
                    }, i.prototype.vendors = ["moz", "webkit"], i.prototype.vendorSet = function(e, t) {
                        var n, s, i, r;
                        for (n in s = [], t) i = t[n], e["" + n] = i, s.push(function() {
                            var t, s, a, o;
                            for (o = [], t = 0, s = (a = this.vendors).length; t < s; t++) r = a[t], o.push(e["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = i);
                            return o
                        }.call(this));
                        return s
                    }, i.prototype.vendorCSS = function(e, t) {
                        var n, i, r, a, o, l;
                        for (a = (o = s(e)).getPropertyCSSValue(t), n = 0, i = (r = this.vendors).length; n < i; n++) l = r[n], a = a || o.getPropertyCSSValue("-" + l + "-" + t);
                        return a
                    }, i.prototype.animationName = function(e) {
                        var t;
                        try {
                            t = this.vendorCSS(e, "animation-name").cssText
                        } catch (n) {
                            t = s(e).getPropertyValue("animation-name")
                        }
                        return "none" === t ? "" : t
                    }, i.prototype.cacheAnimationName = function(e) {
                        return this.animationNameCache.set(e, this.animationName(e))
                    }, i.prototype.cachedAnimationName = function(e) {
                        return this.animationNameCache.get(e)
                    }, i.prototype.scrollHandler = function() {
                        return this.scrolled = !0
                    }, i.prototype.scrollCallback = function() {
                        var e;
                        if (this.scrolled && (this.scrolled = !1, this.boxes = function() {
                                var t, n, s, i;
                                for (i = [], t = 0, n = (s = this.boxes).length; t < n; t++)(e = s[t]) && (this.isVisible(e) ? this.show(e) : i.push(e));
                                return i
                            }.call(this), !this.boxes.length && !this.config.live)) return this.stop()
                    }, i.prototype.offsetTop = function(e) {
                        for (var t; void 0 === e.offsetTop;) e = e.parentNode;
                        for (t = e.offsetTop; e = e.offsetParent;) t += e.offsetTop;
                        return t
                    }, i.prototype.isVisible = function(e) {
                        var t, n, s, i, r;
                        return n = e.getAttribute("data-wow-offset") || this.config.offset, i = (r = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, t = (s = this.offsetTop(e)) + e.clientHeight, s <= i && t >= r
                    }, i.prototype.util = function() {
                        return null != this._util ? this._util : this._util = new t
                    }, i.prototype.disabled = function() {
                        return !this.config.mobile && this.util().isMobile(navigator.userAgent)
                    }, i
                }()
            }).call(this)
        },
        8250: function(e, t, n) {
            "use strict";

            function s(e) {
                return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
            }

            function i(e = {}, t = {}) {
                Object.keys(t).forEach((n => {
                    void 0 === e[n] ? e[n] = t[n] : s(t[n]) && s(e[n]) && Object.keys(t[n]).length > 0 && i(e[n], t[n])
                }))
            }
            n.d(t, {
                Z: function() {
                    return ee
                }
            });
            const r = {
                body: {},
                addEventListener() {},
                removeEventListener() {},
                activeElement: {
                    blur() {},
                    nodeName: ""
                },
                querySelector() {
                    return null
                },
                querySelectorAll() {
                    return []
                },
                getElementById() {
                    return null
                },
                createEvent() {
                    return {
                        initEvent() {}
                    }
                },
                createElement() {
                    return {
                        children: [],
                        childNodes: [],
                        style: {},
                        setAttribute() {},
                        getElementsByTagName() {
                            return []
                        }
                    }
                },
                createElementNS() {
                    return {}
                },
                importNode() {
                    return null
                },
                location: {
                    hash: "",
                    host: "",
                    hostname: "",
                    href: "",
                    origin: "",
                    pathname: "",
                    protocol: "",
                    search: ""
                }
            };

            function a() {
                const e = "undefined" != typeof document ? document : {};
                return i(e, r), e
            }
            const o = {
                document: r,
                navigator: {
                    userAgent: ""
                },
                location: {
                    hash: "",
                    host: "",
                    hostname: "",
                    href: "",
                    origin: "",
                    pathname: "",
                    protocol: "",
                    search: ""
                },
                history: {
                    replaceState() {},
                    pushState() {},
                    go() {},
                    back() {}
                },
                CustomEvent: function() {
                    return this
                },
                addEventListener() {},
                removeEventListener() {},
                getComputedStyle() {
                    return {
                        getPropertyValue() {
                            return ""
                        }
                    }
                },
                Image() {},
                Date() {},
                screen: {},
                setTimeout() {},
                clearTimeout() {},
                matchMedia() {
                    return {}
                },
                requestAnimationFrame(e) {
                    return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
                },
                cancelAnimationFrame(e) {
                    "undefined" != typeof setTimeout && clearTimeout(e)
                }
            };

            function l() {
                const e = "undefined" != typeof window ? window : {};
                return i(e, o), e
            }
            class c extends Array {
                constructor(e) {
                    "number" == typeof e ? super(e) : (super(...e || []), function(e) {
                        const t = e.__proto__;
                        Object.defineProperty(e, "__proto__", {
                            get() {
                                return t
                            },
                            set(e) {
                                t.__proto__ = e
                            }
                        })
                    }(this))
                }
            }

            function d(e = []) {
                const t = [];
                return e.forEach((e => {
                    Array.isArray(e) ? t.push(...d(e)) : t.push(e)
                })), t
            }

            function u(e, t) {
                return Array.prototype.filter.call(e, t)
            }

            function p(e, t) {
                const n = l(),
                    s = a();
                let i = [];
                if (!t && e instanceof c) return e;
                if (!e) return new c(i);
                if ("string" == typeof e) {
                    const n = e.trim();
                    if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                        let e = "div";
                        0 === n.indexOf("<li") && (e = "ul"), 0 === n.indexOf("<tr") && (e = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (e = "tr"), 0 === n.indexOf("<tbody") && (e = "table"), 0 === n.indexOf("<option") && (e = "select");
                        const t = s.createElement(e);
                        t.innerHTML = n;
                        for (let e = 0; e < t.childNodes.length; e += 1) i.push(t.childNodes[e])
                    } else i = function(e, t) {
                        if ("string" != typeof e) return [e];
                        const n = [],
                            s = t.querySelectorAll(e);
                        for (let e = 0; e < s.length; e += 1) n.push(s[e]);
                        return n
                    }(e.trim(), t || s)
                } else if (e.nodeType || e === n || e === s) i.push(e);
                else if (Array.isArray(e)) {
                    if (e instanceof c) return e;
                    i = e
                }
                return new c(function(e) {
                    const t = [];
                    for (let n = 0; n < e.length; n += 1) - 1 === t.indexOf(e[n]) && t.push(e[n]);
                    return t
                }(i))
            }
            p.fn = c.prototype;
            const f = "resize scroll".split(" ");

            function h(e) {
                return function(...t) {
                    if (void 0 === t[0]) {
                        for (let t = 0; t < this.length; t += 1) f.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : p(this[t]).trigger(e));
                        return this
                    }
                    return this.on(e, ...t)
                }
            }
            h("click"), h("blur"), h("focus"), h("focusin"), h("focusout"), h("keyup"), h("keydown"), h("keypress"), h("submit"), h("change"), h("mousedown"), h("mousemove"), h("mouseup"), h("mouseenter"), h("mouseleave"), h("mouseout"), h("mouseover"), h("touchstart"), h("touchend"), h("touchmove"), h("resize"), h("scroll");
            const m = {
                addClass: function(...e) {
                    const t = d(e.map((e => e.split(" "))));
                    return this.forEach((e => {
                        e.classList.add(...t)
                    })), this
                },
                removeClass: function(...e) {
                    const t = d(e.map((e => e.split(" "))));
                    return this.forEach((e => {
                        e.classList.remove(...t)
                    })), this
                },
                hasClass: function(...e) {
                    const t = d(e.map((e => e.split(" "))));
                    return u(this, (e => t.filter((t => e.classList.contains(t))).length > 0)).length > 0
                },
                toggleClass: function(...e) {
                    const t = d(e.map((e => e.split(" "))));
                    this.forEach((e => {
                        t.forEach((t => {
                            e.classList.toggle(t)
                        }))
                    }))
                },
                attr: function(e, t) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (let n = 0; n < this.length; n += 1)
                        if (2 === arguments.length) this[n].setAttribute(e, t);
                        else
                            for (const t in e) this[n][t] = e[t], this[n].setAttribute(t, e[t]);
                    return this
                },
                removeAttr: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
                    return this
                },
                transform: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
                    return this
                },
                transition: function(e) {
                    for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
                    return this
                },
                on: function(...e) {
                    let [t, n, s, i] = e;

                    function r(e) {
                        const t = e.target;
                        if (!t) return;
                        const i = e.target.dom7EventData || [];
                        if (i.indexOf(e) < 0 && i.unshift(e), p(t).is(n)) s.apply(t, i);
                        else {
                            const e = p(t).parents();
                            for (let t = 0; t < e.length; t += 1) p(e[t]).is(n) && s.apply(e[t], i)
                        }
                    }

                    function a(e) {
                        const t = e && e.target && e.target.dom7EventData || [];
                        t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t)
                    }
                    "function" == typeof e[1] && ([t, s, i] = e, n = void 0), i || (i = !1);
                    const o = t.split(" ");
                    let l;
                    for (let e = 0; e < this.length; e += 1) {
                        const t = this[e];
                        if (n)
                            for (l = 0; l < o.length; l += 1) {
                                const e = o[l];
                                t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
                                    listener: s,
                                    proxyListener: r
                                }), t.addEventListener(e, r, i)
                            } else
                                for (l = 0; l < o.length; l += 1) {
                                    const e = o[l];
                                    t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
                                        listener: s,
                                        proxyListener: a
                                    }), t.addEventListener(e, a, i)
                                }
                    }
                    return this
                },
                off: function(...e) {
                    let [t, n, s, i] = e;
                    "function" == typeof e[1] && ([t, s, i] = e, n = void 0), i || (i = !1);
                    const r = t.split(" ");
                    for (let e = 0; e < r.length; e += 1) {
                        const t = r[e];
                        for (let e = 0; e < this.length; e += 1) {
                            const r = this[e];
                            let a;
                            if (!n && r.dom7Listeners ? a = r.dom7Listeners[t] : n && r.dom7LiveListeners && (a = r.dom7LiveListeners[t]), a && a.length)
                                for (let e = a.length - 1; e >= 0; e -= 1) {
                                    const n = a[e];
                                    s && n.listener === s || s && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === s ? (r.removeEventListener(t, n.proxyListener, i), a.splice(e, 1)) : s || (r.removeEventListener(t, n.proxyListener, i), a.splice(e, 1))
                                }
                        }
                    }
                    return this
                },
                trigger: function(...e) {
                    const t = l(),
                        n = e[0].split(" "),
                        s = e[1];
                    for (let i = 0; i < n.length; i += 1) {
                        const r = n[i];
                        for (let n = 0; n < this.length; n += 1) {
                            const i = this[n];
                            if (t.CustomEvent) {
                                const n = new t.CustomEvent(r, {
                                    detail: s,
                                    bubbles: !0,
                                    cancelable: !0
                                });
                                i.dom7EventData = e.filter(((e, t) => t > 0)), i.dispatchEvent(n), i.dom7EventData = [], delete i.dom7EventData
                            }
                        }
                    }
                    return this
                },
                transitionEnd: function(e) {
                    const t = this;
                    return e && t.on("transitionend", (function n(s) {
                        s.target === this && (e.call(this, s), t.off("transitionend", n))
                    })), this
                },
                outerWidth: function(e) {
                    if (this.length > 0) {
                        if (e) {
                            const e = this.styles();
                            return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                        }
                        return this[0].offsetWidth
                    }
                    return null
                },
                outerHeight: function(e) {
                    if (this.length > 0) {
                        if (e) {
                            const e = this.styles();
                            return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                        }
                        return this[0].offsetHeight
                    }
                    return null
                },
                styles: function() {
                    const e = l();
                    return this[0] ? e.getComputedStyle(this[0], null) : {}
                },
                offset: function() {
                    if (this.length > 0) {
                        const e = l(),
                            t = a(),
                            n = this[0],
                            s = n.getBoundingClientRect(),
                            i = t.body,
                            r = n.clientTop || i.clientTop || 0,
                            o = n.clientLeft || i.clientLeft || 0,
                            c = n === e ? e.scrollY : n.scrollTop,
                            d = n === e ? e.scrollX : n.scrollLeft;
                        return {
                            top: s.top + c - r,
                            left: s.left + d - o
                        }
                    }
                    return null
                },
                css: function(e, t) {
                    const n = l();
                    let s;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (s = 0; s < this.length; s += 1)
                                for (const t in e) this[s].style[t] = e[t];
                            return this
                        }
                        if (this[0]) return n.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    return e ? (this.forEach(((t, n) => {
                        e.apply(t, [t, n])
                    })), this) : this
                },
                html: function(e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : null;
                    for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
                    return this
                },
                text: function(e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
                    return this
                },
                is: function(e) {
                    const t = l(),
                        n = a(),
                        s = this[0];
                    let i, r;
                    if (!s || void 0 === e) return !1;
                    if ("string" == typeof e) {
                        if (s.matches) return s.matches(e);
                        if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
                        if (s.msMatchesSelector) return s.msMatchesSelector(e);
                        for (i = p(e), r = 0; r < i.length; r += 1)
                            if (i[r] === s) return !0;
                        return !1
                    }
                    if (e === n) return s === n;
                    if (e === t) return s === t;
                    if (e.nodeType || e instanceof c) {
                        for (i = e.nodeType ? [e] : e, r = 0; r < i.length; r += 1)
                            if (i[r] === s) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    let e, t = this[0];
                    if (t) {
                        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                        return e
                    }
                },
                eq: function(e) {
                    if (void 0 === e) return this;
                    const t = this.length;
                    if (e > t - 1) return p([]);
                    if (e < 0) {
                        const n = t + e;
                        return p(n < 0 ? [] : [this[n]])
                    }
                    return p([this[e]])
                },
                append: function(...e) {
                    let t;
                    const n = a();
                    for (let s = 0; s < e.length; s += 1) {
                        t = e[s];
                        for (let e = 0; e < this.length; e += 1)
                            if ("string" == typeof t) {
                                const s = n.createElement("div");
                                for (s.innerHTML = t; s.firstChild;) this[e].appendChild(s.firstChild)
                            } else if (t instanceof c)
                            for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);
                        else this[e].appendChild(t)
                    }
                    return this
                },
                prepend: function(e) {
                    const t = a();
                    let n, s;
                    for (n = 0; n < this.length; n += 1)
                        if ("string" == typeof e) {
                            const i = t.createElement("div");
                            for (i.innerHTML = e, s = i.childNodes.length - 1; s >= 0; s -= 1) this[n].insertBefore(i.childNodes[s], this[n].childNodes[0])
                        } else if (e instanceof c)
                        for (s = 0; s < e.length; s += 1) this[n].insertBefore(e[s], this[n].childNodes[0]);
                    else this[n].insertBefore(e, this[n].childNodes[0]);
                    return this
                },
                next: function(e) {
                    return this.length > 0 ? e ? this[0].nextElementSibling && p(this[0].nextElementSibling).is(e) ? p([this[0].nextElementSibling]) : p([]) : this[0].nextElementSibling ? p([this[0].nextElementSibling]) : p([]) : p([])
                },
                nextAll: function(e) {
                    const t = [];
                    let n = this[0];
                    if (!n) return p([]);
                    for (; n.nextElementSibling;) {
                        const s = n.nextElementSibling;
                        e ? p(s).is(e) && t.push(s) : t.push(s), n = s
                    }
                    return p(t)
                },
                prev: function(e) {
                    if (this.length > 0) {
                        const t = this[0];
                        return e ? t.previousElementSibling && p(t.previousElementSibling).is(e) ? p([t.previousElementSibling]) : p([]) : t.previousElementSibling ? p([t.previousElementSibling]) : p([])
                    }
                    return p([])
                },
                prevAll: function(e) {
                    const t = [];
                    let n = this[0];
                    if (!n) return p([]);
                    for (; n.previousElementSibling;) {
                        const s = n.previousElementSibling;
                        e ? p(s).is(e) && t.push(s) : t.push(s), n = s
                    }
                    return p(t)
                },
                parent: function(e) {
                    const t = [];
                    for (let n = 0; n < this.length; n += 1) null !== this[n].parentNode && (e ? p(this[n].parentNode).is(e) && t.push(this[n].parentNode) : t.push(this[n].parentNode));
                    return p(t)
                },
                parents: function(e) {
                    const t = [];
                    for (let n = 0; n < this.length; n += 1) {
                        let s = this[n].parentNode;
                        for (; s;) e ? p(s).is(e) && t.push(s) : t.push(s), s = s.parentNode
                    }
                    return p(t)
                },
                closest: function(e) {
                    let t = this;
                    return void 0 === e ? p([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
                },
                find: function(e) {
                    const t = [];
                    for (let n = 0; n < this.length; n += 1) {
                        const s = this[n].querySelectorAll(e);
                        for (let e = 0; e < s.length; e += 1) t.push(s[e])
                    }
                    return p(t)
                },
                children: function(e) {
                    const t = [];
                    for (let n = 0; n < this.length; n += 1) {
                        const s = this[n].children;
                        for (let n = 0; n < s.length; n += 1) e && !p(s[n]).is(e) || t.push(s[n])
                    }
                    return p(t)
                },
                filter: function(e) {
                    return p(u(this, e))
                },
                remove: function() {
                    for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                }
            };
            Object.keys(m).forEach((e => {
                Object.defineProperty(p.fn, e, {
                    value: m[e],
                    writable: !0
                })
            }));
            var g = p;

            function v(e, t = 0) {
                return setTimeout(e, t)
            }

            function b() {
                return Date.now()
            }

            function y(e, t = "x") {
                const n = l();
                let s, i, r;
                const a = function(e) {
                    const t = l();
                    let n;
                    return t.getComputedStyle && (n = t.getComputedStyle(e, null)), !n && e.currentStyle && (n = e.currentStyle), n || (n = e.style), n
                }(e);
                return n.WebKitCSSMatrix ? (i = a.transform || a.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((e => e.replace(",", "."))).join(", ")), r = new n.WebKitCSSMatrix("none" === i ? "" : i)) : (r = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = r.toString().split(",")), "x" === t && (i = n.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === t && (i = n.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), i || 0
            }

            function w(e) {
                return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
            }

            function x(...e) {
                const t = Object(e[0]),
                    n = ["__proto__", "constructor", "prototype"];
                for (let i = 1; i < e.length; i += 1) {
                    const r = e[i];
                    if (null != r && (s = r, !("undefined" != typeof window && void 0 !== window.HTMLElement ? s instanceof HTMLElement : s && (1 === s.nodeType || 11 === s.nodeType)))) {
                        const e = Object.keys(Object(r)).filter((e => n.indexOf(e) < 0));
                        for (let n = 0, s = e.length; n < s; n += 1) {
                            const s = e[n],
                                i = Object.getOwnPropertyDescriptor(r, s);
                            void 0 !== i && i.enumerable && (w(t[s]) && w(r[s]) ? r[s].__swiper__ ? t[s] = r[s] : x(t[s], r[s]) : !w(t[s]) && w(r[s]) ? (t[s] = {}, r[s].__swiper__ ? t[s] = r[s] : x(t[s], r[s])) : t[s] = r[s])
                        }
                    }
                }
                var s;
                return t
            }

            function E(e, t, n) {
                e.style.setProperty(t, n)
            }

            function _({
                swiper: e,
                targetPosition: t,
                side: n
            }) {
                const s = l(),
                    i = -e.translate;
                let r, a = null;
                const o = e.params.speed;
                e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
                const c = t > i ? "next" : "prev",
                    d = (e, t) => "next" === c && e >= t || "prev" === c && e <= t,
                    u = () => {
                        r = (new Date).getTime(), null === a && (a = r);
                        const l = Math.max(Math.min((r - a) / o, 1), 0),
                            c = .5 - Math.cos(l * Math.PI) / 2;
                        let p = i + c * (t - i);
                        if (d(p, t) && (p = t), e.wrapperEl.scrollTo({
                                [n]: p
                            }), d(p, t)) return e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout((() => {
                            e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                                [n]: p
                            })
                        })), void s.cancelAnimationFrame(e.cssModeFrameID);
                        e.cssModeFrameID = s.requestAnimationFrame(u)
                    };
                u()
            }
            let C, S, $;

            function T() {
                return C || (C = function() {
                    const e = l(),
                        t = a();
                    return {
                        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                        touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                        passiveListener: function() {
                            let t = !1;
                            try {
                                const n = Object.defineProperty({}, "passive", {
                                    get() {
                                        t = !0
                                    }
                                });
                                e.addEventListener("testPassiveListener", null, n)
                            } catch (e) {}
                            return t
                        }(),
                        gestures: "ongesturestart" in e
                    }
                }()), C
            }

            function M(e = {}) {
                return S || (S = function({
                    userAgent: e
                } = {}) {
                    const t = T(),
                        n = l(),
                        s = n.navigator.platform,
                        i = e || n.navigator.userAgent,
                        r = {
                            ios: !1,
                            android: !1
                        },
                        a = n.screen.width,
                        o = n.screen.height,
                        c = i.match(/(Android);?[\s\/]+([\d.]+)?/);
                    let d = i.match(/(iPad).*OS\s([\d_]+)/);
                    const u = i.match(/(iPod)(.*OS\s([\d_]+))?/),
                        p = !d && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                        f = "Win32" === s;
                    let h = "MacIntel" === s;
                    return !d && h && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${a}x${o}`) >= 0 && (d = i.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), h = !1), c && !f && (r.os = "android", r.android = !0), (d || p || u) && (r.os = "ios", r.ios = !0), r
                }(e)), S
            }

            function z() {
                return $ || ($ = function() {
                    const e = l();
                    return {
                        isSafari: function() {
                            const t = e.navigator.userAgent.toLowerCase();
                            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                        }(),
                        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
                    }
                }()), $
            }
            var P = {
                on(e, t, n) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof t) return s;
                    const i = n ? "unshift" : "push";
                    return e.split(" ").forEach((e => {
                        s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][i](t)
                    })), s
                },
                once(e, t, n) {
                    const s = this;
                    if (!s.eventsListeners || s.destroyed) return s;
                    if ("function" != typeof t) return s;

                    function i(...n) {
                        s.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(s, n)
                    }
                    return i.__emitterProxy = t, s.on(e, i, n)
                },
                onAny(e, t) {
                    const n = this;
                    if (!n.eventsListeners || n.destroyed) return n;
                    if ("function" != typeof e) return n;
                    const s = t ? "unshift" : "push";
                    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[s](e), n
                },
                offAny(e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsAnyListeners) return t;
                    const n = t.eventsAnyListeners.indexOf(e);
                    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t
                },
                off(e, t) {
                    const n = this;
                    return !n.eventsListeners || n.destroyed ? n : n.eventsListeners ? (e.split(" ").forEach((e => {
                        void 0 === t ? n.eventsListeners[e] = [] : n.eventsListeners[e] && n.eventsListeners[e].forEach(((s, i) => {
                            (s === t || s.__emitterProxy && s.__emitterProxy === t) && n.eventsListeners[e].splice(i, 1)
                        }))
                    })), n) : n
                },
                emit(...e) {
                    const t = this;
                    if (!t.eventsListeners || t.destroyed) return t;
                    if (!t.eventsListeners) return t;
                    let n, s, i;
                    "string" == typeof e[0] || Array.isArray(e[0]) ? (n = e[0], s = e.slice(1, e.length), i = t) : (n = e[0].events, s = e[0].data, i = e[0].context || t), s.unshift(i);
                    return (Array.isArray(n) ? n : n.split(" ")).forEach((e => {
                        t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t => {
                            t.apply(i, [e, ...s])
                        })), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach((e => {
                            e.apply(i, s)
                        }))
                    })), t
                }
            };
            var A = {
                updateSize: function() {
                    const e = this;
                    let t, n;
                    const s = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : s[0].clientWidth, n = void 0 !== e.params.height && null !== e.params.height ? e.params.height : s[0].clientHeight, 0 === t && e.isHorizontal() || 0 === n && e.isVertical() || (t = t - parseInt(s.css("padding-left") || 0, 10) - parseInt(s.css("padding-right") || 0, 10), n = n - parseInt(s.css("padding-top") || 0, 10) - parseInt(s.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(n) && (n = 0), Object.assign(e, {
                        width: t,
                        height: n,
                        size: e.isHorizontal() ? t : n
                    }))
                },
                updateSlides: function() {
                    const e = this;

                    function t(t) {
                        return e.isHorizontal() ? t : {
                            width: "height",
                            "margin-top": "margin-left",
                            "margin-bottom ": "margin-right",
                            "margin-left": "margin-top",
                            "margin-right": "margin-bottom",
                            "padding-left": "padding-top",
                            "padding-right": "padding-bottom",
                            marginRight: "marginBottom"
                        } [t]
                    }

                    function n(e, n) {
                        return parseFloat(e.getPropertyValue(t(n)) || 0)
                    }
                    const s = e.params,
                        {
                            $wrapperEl: i,
                            size: r,
                            rtlTranslate: a,
                            wrongRTL: o
                        } = e,
                        l = e.virtual && s.virtual.enabled,
                        c = l ? e.virtual.slides.length : e.slides.length,
                        d = i.children(`.${e.params.slideClass}`),
                        u = l ? e.virtual.slides.length : d.length;
                    let p = [];
                    const f = [],
                        h = [];
                    let m = s.slidesOffsetBefore;
                    "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
                    let g = s.slidesOffsetAfter;
                    "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
                    const v = e.snapGrid.length,
                        b = e.slidesGrid.length;
                    let y = s.spaceBetween,
                        w = -m,
                        x = 0,
                        _ = 0;
                    if (void 0 === r) return;
                    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * r), e.virtualSize = -y, a ? d.css({
                        marginLeft: "",
                        marginBottom: "",
                        marginTop: ""
                    }) : d.css({
                        marginRight: "",
                        marginBottom: "",
                        marginTop: ""
                    }), s.centeredSlides && s.cssMode && (E(e.wrapperEl, "--swiper-centered-offset-before", ""), E(e.wrapperEl, "--swiper-centered-offset-after", ""));
                    const C = s.grid && s.grid.rows > 1 && e.grid;
                    let S;
                    C && e.grid.initSlides(u);
                    const $ = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
                    for (let i = 0; i < u; i += 1) {
                        S = 0;
                        const a = d.eq(i);
                        if (C && e.grid.updateSlide(i, a, u, t), "none" !== a.css("display")) {
                            if ("auto" === s.slidesPerView) {
                                $ && (d[i].style[t("width")] = "");
                                const r = getComputedStyle(a[0]),
                                    o = a[0].style.transform,
                                    l = a[0].style.webkitTransform;
                                if (o && (a[0].style.transform = "none"), l && (a[0].style.webkitTransform = "none"), s.roundLengths) S = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                                else {
                                    const e = n(r, "width"),
                                        t = n(r, "padding-left"),
                                        s = n(r, "padding-right"),
                                        i = n(r, "margin-left"),
                                        o = n(r, "margin-right"),
                                        l = r.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) S = e + i + o;
                                    else {
                                        const {
                                            clientWidth: n,
                                            offsetWidth: r
                                        } = a[0];
                                        S = e + t + s + i + o + (r - n)
                                    }
                                }
                                o && (a[0].style.transform = o), l && (a[0].style.webkitTransform = l), s.roundLengths && (S = Math.floor(S))
                            } else S = (r - (s.slidesPerView - 1) * y) / s.slidesPerView, s.roundLengths && (S = Math.floor(S)), d[i] && (d[i].style[t("width")] = `${S}px`);
                            d[i] && (d[i].swiperSlideSize = S), h.push(S), s.centeredSlides ? (w = w + S / 2 + x / 2 + y, 0 === x && 0 !== i && (w = w - r / 2 - y), 0 === i && (w = w - r / 2 - y), Math.abs(w) < .001 && (w = 0), s.roundLengths && (w = Math.floor(w)), _ % s.slidesPerGroup == 0 && p.push(w), f.push(w)) : (s.roundLengths && (w = Math.floor(w)), (_ - Math.min(e.params.slidesPerGroupSkip, _)) % e.params.slidesPerGroup == 0 && p.push(w), f.push(w), w = w + S + y), e.virtualSize += S + y, x = S, _ += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + g, a && o && ("slide" === s.effect || "coverflow" === s.effect) && i.css({
                            width: `${e.virtualSize+s.spaceBetween}px`
                        }), s.setWrapperSize && i.css({
                            [t("width")]: `${e.virtualSize+s.spaceBetween}px`
                        }), C && e.grid.updateWrapperSize(S, p, t), !s.centeredSlides) {
                        const t = [];
                        for (let n = 0; n < p.length; n += 1) {
                            let i = p[n];
                            s.roundLengths && (i = Math.floor(i)), p[n] <= e.virtualSize - r && t.push(i)
                        }
                        p = t, Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - r)
                    }
                    if (0 === p.length && (p = [0]), 0 !== s.spaceBetween) {
                        const n = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
                        d.filter(((e, t) => !s.cssMode || t !== d.length - 1)).css({
                            [n]: `${y}px`
                        })
                    }
                    if (s.centeredSlides && s.centeredSlidesBounds) {
                        let e = 0;
                        h.forEach((t => {
                            e += t + (s.spaceBetween ? s.spaceBetween : 0)
                        })), e -= s.spaceBetween;
                        const t = e - r;
                        p = p.map((e => e < 0 ? -m : e > t ? t + g : e))
                    }
                    if (s.centerInsufficientSlides) {
                        let e = 0;
                        if (h.forEach((t => {
                                e += t + (s.spaceBetween ? s.spaceBetween : 0)
                            })), e -= s.spaceBetween, e < r) {
                            const t = (r - e) / 2;
                            p.forEach(((e, n) => {
                                p[n] = e - t
                            })), f.forEach(((e, n) => {
                                f[n] = e + t
                            }))
                        }
                    }
                    if (Object.assign(e, {
                            slides: d,
                            snapGrid: p,
                            slidesGrid: f,
                            slidesSizesGrid: h
                        }), s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                        E(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"), E(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
                        const t = -e.snapGrid[0],
                            n = -e.slidesGrid[0];
                        e.snapGrid = e.snapGrid.map((e => e + t)), e.slidesGrid = e.slidesGrid.map((e => e + n))
                    }
                    if (u !== c && e.emit("slidesLengthChange"), p.length !== v && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== b && e.emit("slidesGridLengthChange"), s.watchSlidesProgress && e.updateSlidesOffset(), !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                        const t = `${s.containerModifierClass}backface-hidden`,
                            n = e.$el.hasClass(t);
                        u <= s.maxBackfaceHiddenSlides ? n || e.$el.addClass(t) : n && e.$el.removeClass(t)
                    }
                },
                updateAutoHeight: function(e) {
                    const t = this,
                        n = [],
                        s = t.virtual && t.params.virtual.enabled;
                    let i, r = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const a = e => s ? t.slides.filter((t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e))[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)(t.visibleSlides || g([])).each((e => {
                            n.push(e)
                        }));
                        else
                            for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                                const e = t.activeIndex + i;
                                if (e > t.slides.length && !s) break;
                                n.push(a(e))
                            } else n.push(a(t.activeIndex));
                    for (i = 0; i < n.length; i += 1)
                        if (void 0 !== n[i]) {
                            const e = n[i].offsetHeight;
                            r = e > r ? e : r
                        }(r || 0 === r) && t.$wrapperEl.css("height", `${r}px`)
                },
                updateSlidesOffset: function() {
                    const e = this,
                        t = e.slides;
                    for (let n = 0; n < t.length; n += 1) t[n].swiperSlideOffset = e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop
                },
                updateSlidesProgress: function(e = this && this.translate || 0) {
                    const t = this,
                        n = t.params,
                        {
                            slides: s,
                            rtlTranslate: i,
                            snapGrid: r
                        } = t;
                    if (0 === s.length) return;
                    void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
                    let a = -e;
                    i && (a = e), s.removeClass(n.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < s.length; e += 1) {
                        const o = s[e];
                        let l = o.swiperSlideOffset;
                        n.cssMode && n.centeredSlides && (l -= s[0].swiperSlideOffset);
                        const c = (a + (n.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + n.spaceBetween),
                            d = (a - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + n.spaceBetween),
                            u = -(a - l),
                            p = u + t.slidesSizesGrid[e];
                        (u >= 0 && u < t.size - 1 || p > 1 && p <= t.size || u <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), s.eq(e).addClass(n.slideVisibleClass)), o.progress = i ? -c : c, o.originalProgress = i ? -d : d
                    }
                    t.visibleSlides = g(t.visibleSlides)
                },
                updateProgress: function(e) {
                    const t = this;
                    if (void 0 === e) {
                        const n = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * n || 0
                    }
                    const n = t.params,
                        s = t.maxTranslate() - t.minTranslate();
                    let {
                        progress: i,
                        isBeginning: r,
                        isEnd: a
                    } = t;
                    const o = r,
                        l = a;
                    0 === s ? (i = 0, r = !0, a = !0) : (i = (e - t.minTranslate()) / s, r = i <= 0, a = i >= 1), Object.assign(t, {
                        progress: i,
                        isBeginning: r,
                        isEnd: a
                    }), (n.watchSlidesProgress || n.centeredSlides && n.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), a && !l && t.emit("reachEnd toEdge"), (o && !r || l && !a) && t.emit("fromEdge"), t.emit("progress", i)
                },
                updateSlidesClasses: function() {
                    const e = this,
                        {
                            slides: t,
                            params: n,
                            $wrapperEl: s,
                            activeIndex: i,
                            realIndex: r
                        } = e,
                        a = e.virtual && n.virtual.enabled;
                    let o;
                    t.removeClass(`${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`), o = a ? e.$wrapperEl.find(`.${n.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i), o.addClass(n.slideActiveClass), n.loop && (o.hasClass(n.slideDuplicateClass) ? s.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(n.slideDuplicateActiveClass) : s.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(n.slideDuplicateActiveClass));
                    let l = o.nextAll(`.${n.slideClass}`).eq(0).addClass(n.slideNextClass);
                    n.loop && 0 === l.length && (l = t.eq(0), l.addClass(n.slideNextClass));
                    let c = o.prevAll(`.${n.slideClass}`).eq(0).addClass(n.slidePrevClass);
                    n.loop && 0 === c.length && (c = t.eq(-1), c.addClass(n.slidePrevClass)), n.loop && (l.hasClass(n.slideDuplicateClass) ? s.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicateNextClass) : s.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicateNextClass), c.hasClass(n.slideDuplicateClass) ? s.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicatePrevClass) : s.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    const t = this,
                        n = t.rtlTranslate ? t.translate : -t.translate,
                        {
                            slidesGrid: s,
                            snapGrid: i,
                            params: r,
                            activeIndex: a,
                            realIndex: o,
                            snapIndex: l
                        } = t;
                    let c, d = e;
                    if (void 0 === d) {
                        for (let e = 0; e < s.length; e += 1) void 0 !== s[e + 1] ? n >= s[e] && n < s[e + 1] - (s[e + 1] - s[e]) / 2 ? d = e : n >= s[e] && n < s[e + 1] && (d = e + 1) : n >= s[e] && (d = e);
                        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                    }
                    if (i.indexOf(n) >= 0) c = i.indexOf(n);
                    else {
                        const e = Math.min(r.slidesPerGroupSkip, d);
                        c = e + Math.floor((d - e) / r.slidesPerGroup)
                    }
                    if (c >= i.length && (c = i.length - 1), d === a) return void(c !== l && (t.snapIndex = c, t.emit("snapIndexChange")));
                    const u = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                    Object.assign(t, {
                        snapIndex: c,
                        realIndex: u,
                        previousIndex: a,
                        activeIndex: d
                    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== u && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function(e) {
                    const t = this,
                        n = t.params,
                        s = g(e).closest(`.${n.slideClass}`)[0];
                    let i, r = !1;
                    if (s)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === s) {
                                r = !0, i = e;
                                break
                            } if (!s || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(g(s).attr("data-swiper-slide-index"), 10) : t.clickedIndex = i, n.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            };
            var k = {
                getTranslate: function(e = (this.isHorizontal() ? "x" : "y")) {
                    const {
                        params: t,
                        rtlTranslate: n,
                        translate: s,
                        $wrapperEl: i
                    } = this;
                    if (t.virtualTranslate) return n ? -s : s;
                    if (t.cssMode) return s;
                    let r = y(i[0], e);
                    return n && (r = -r), r || 0
                },
                setTranslate: function(e, t) {
                    const n = this,
                        {
                            rtlTranslate: s,
                            params: i,
                            $wrapperEl: r,
                            wrapperEl: a,
                            progress: o
                        } = n;
                    let l, c = 0,
                        d = 0;
                    n.isHorizontal() ? c = s ? -e : e : d = e, i.roundLengths && (c = Math.floor(c), d = Math.floor(d)), i.cssMode ? a[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal() ? -c : -d : i.virtualTranslate || r.transform(`translate3d(${c}px, ${d}px, 0px)`), n.previousTranslate = n.translate, n.translate = n.isHorizontal() ? c : d;
                    const u = n.maxTranslate() - n.minTranslate();
                    l = 0 === u ? 0 : (e - n.minTranslate()) / u, l !== o && n.updateProgress(e), n.emit("setTranslate", n.translate, t)
                },
                minTranslate: function() {
                    return -this.snapGrid[0]
                },
                maxTranslate: function() {
                    return -this.snapGrid[this.snapGrid.length - 1]
                },
                translateTo: function(e = 0, t = this.params.speed, n = !0, s = !0, i) {
                    const r = this,
                        {
                            params: a,
                            wrapperEl: o
                        } = r;
                    if (r.animating && a.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(),
                        c = r.maxTranslate();
                    let d;
                    if (d = s && e > l ? l : s && e < c ? c : e, r.updateProgress(d), a.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -d;
                        else {
                            if (!r.support.smoothScroll) return _({
                                swiper: r,
                                targetPosition: -d,
                                side: e ? "left" : "top"
                            }), !0;
                            o.scrollTo({
                                [e ? "left" : "top"]: -d,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(d), n && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(d), n && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, n && r.emit("transitionEnd"))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            };

            function O({
                swiper: e,
                runCallbacks: t,
                direction: n,
                step: s
            }) {
                const {
                    activeIndex: i,
                    previousIndex: r
                } = e;
                let a = n;
                if (a || (a = i > r ? "next" : i < r ? "prev" : "reset"), e.emit(`transition${s}`), t && i !== r) {
                    if ("reset" === a) return void e.emit(`slideResetTransition${s}`);
                    e.emit(`slideChangeTransition${s}`), "next" === a ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`)
                }
            }
            var L = {
                slideTo: function(e = 0, t = this.params.speed, n = !0, s, i) {
                    if ("number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const r = this;
                    let a = e;
                    a < 0 && (a = 0);
                    const {
                        params: o,
                        snapGrid: l,
                        slidesGrid: c,
                        previousIndex: d,
                        activeIndex: u,
                        rtlTranslate: p,
                        wrapperEl: f,
                        enabled: h
                    } = r;
                    if (r.animating && o.preventInteractionOnTransition || !h && !s && !i) return !1;
                    const m = Math.min(r.params.slidesPerGroupSkip, a);
                    let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (o.normalizeSlideIndex)
                        for (let e = 0; e < c.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                n = Math.floor(100 * c[e]),
                                s = Math.floor(100 * c[e + 1]);
                            void 0 !== c[e + 1] ? t >= n && t < s - (s - n) / 2 ? a = e : t >= n && t < s && (a = e + 1) : t >= n && (a = e)
                        }
                    if (r.initialized && a !== u) {
                        if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
                        if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (u || 0) !== a) return !1
                    }
                    let b;
                    if (a !== (d || 0) && n && r.emit("beforeSlideChangeStart"), r.updateProgress(v), b = a > u ? "next" : a < u ? "prev" : "reset", p && -v === r.translate || !p && v === r.translate) return r.updateActiveIndex(a), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(v), "reset" !== b && (r.transitionStart(n, b), r.transitionEnd(n, b)), !1;
                    if (o.cssMode) {
                        const e = r.isHorizontal(),
                            n = p ? v : -v;
                        if (0 === t) {
                            const t = r.virtual && r.params.virtual.enabled;
                            t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), f[e ? "scrollLeft" : "scrollTop"] = n, t && requestAnimationFrame((() => {
                                r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1
                            }))
                        } else {
                            if (!r.support.smoothScroll) return _({
                                swiper: r,
                                targetPosition: n,
                                side: e ? "left" : "top"
                            }), !0;
                            f.scrollTo({
                                [e ? "left" : "top"]: n,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(n, b), 0 === t ? r.transitionEnd(n, b) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(n, b))
                    }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function(e = 0, t = this.params.speed, n = !0, s) {
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const i = this;
                    let r = e;
                    return i.params.loop && (r += i.loopedSlides), i.slideTo(r, t, n, s)
                },
                slideNext: function(e = this.params.speed, t = !0, n) {
                    const s = this,
                        {
                            animating: i,
                            enabled: r,
                            params: a
                        } = s;
                    if (!r) return s;
                    let o = a.slidesPerGroup;
                    "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
                    const l = s.activeIndex < a.slidesPerGroupSkip ? 1 : o;
                    if (a.loop) {
                        if (i && a.loopPreventsSlide) return !1;
                        s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
                    }
                    return a.rewind && s.isEnd ? s.slideTo(0, e, t, n) : s.slideTo(s.activeIndex + l, e, t, n)
                },
                slidePrev: function(e = this.params.speed, t = !0, n) {
                    const s = this,
                        {
                            params: i,
                            animating: r,
                            snapGrid: a,
                            slidesGrid: o,
                            rtlTranslate: l,
                            enabled: c
                        } = s;
                    if (!c) return s;
                    if (i.loop) {
                        if (r && i.loopPreventsSlide) return !1;
                        s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
                    }

                    function d(e) {
                        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                    }
                    const u = d(l ? s.translate : -s.translate),
                        p = a.map((e => d(e)));
                    let f = a[p.indexOf(u) - 1];
                    if (void 0 === f && i.cssMode) {
                        let e;
                        a.forEach(((t, n) => {
                            u >= t && (e = n)
                        })), void 0 !== e && (f = a[e > 0 ? e - 1 : e])
                    }
                    let h = 0;
                    if (void 0 !== f && (h = o.indexOf(f), h < 0 && (h = s.activeIndex - 1), "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (h = h - s.slidesPerViewDynamic("previous", !0) + 1, h = Math.max(h, 0))), i.rewind && s.isBeginning) {
                        const i = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
                        return s.slideTo(i, e, t, n)
                    }
                    return s.slideTo(h, e, t, n)
                },
                slideReset: function(e = this.params.speed, t = !0, n) {
                    return this.slideTo(this.activeIndex, e, t, n)
                },
                slideToClosest: function(e = this.params.speed, t = !0, n, s = .5) {
                    const i = this;
                    let r = i.activeIndex;
                    const a = Math.min(i.params.slidesPerGroupSkip, r),
                        o = a + Math.floor((r - a) / i.params.slidesPerGroup),
                        l = i.rtlTranslate ? i.translate : -i.translate;
                    if (l >= i.snapGrid[o]) {
                        const e = i.snapGrid[o];
                        l - e > (i.snapGrid[o + 1] - e) * s && (r += i.params.slidesPerGroup)
                    } else {
                        const e = i.snapGrid[o - 1];
                        l - e <= (i.snapGrid[o] - e) * s && (r -= i.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, i.slidesGrid.length - 1), i.slideTo(r, e, t, n)
                },
                slideToClickedSlide: function() {
                    const e = this,
                        {
                            params: t,
                            $wrapperEl: n
                        } = e,
                        s = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let i, r = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        i = parseInt(g(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - s / 2 || r > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), r = n.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), v((() => {
                            e.slideTo(r)
                        }))) : e.slideTo(r) : r > e.slides.length - s ? (e.loopFix(), r = n.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), v((() => {
                            e.slideTo(r)
                        }))) : e.slideTo(r)
                    } else e.slideTo(r)
                }
            };
            var I = {
                loopCreate: function() {
                    const e = this,
                        t = a(),
                        {
                            params: n,
                            $wrapperEl: s
                        } = e,
                        i = s.children().length > 0 ? g(s.children()[0].parentNode) : s;
                    i.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
                    let r = i.children(`.${n.slideClass}`);
                    if (n.loopFillGroupWithBlank) {
                        const e = n.slidesPerGroup - r.length % n.slidesPerGroup;
                        if (e !== n.slidesPerGroup) {
                            for (let s = 0; s < e; s += 1) {
                                const e = g(t.createElement("div")).addClass(`${n.slideClass} ${n.slideBlankClass}`);
                                i.append(e)
                            }
                            r = i.children(`.${n.slideClass}`)
                        }
                    }
                    "auto" !== n.slidesPerView || n.loopedSlides || (n.loopedSlides = r.length), e.loopedSlides = Math.ceil(parseFloat(n.loopedSlides || n.slidesPerView, 10)), e.loopedSlides += n.loopAdditionalSlides, e.loopedSlides > r.length && e.params.loopedSlidesLimit && (e.loopedSlides = r.length);
                    const o = [],
                        l = [];
                    r.each(((e, t) => {
                        g(e).attr("data-swiper-slide-index", t)
                    }));
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / r.length) * r.length;
                        l.push(r.eq(e)[0]), o.unshift(r.eq(r.length - e - 1)[0])
                    }
                    for (let e = 0; e < l.length; e += 1) i.append(g(l[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) i.prepend(g(o[e].cloneNode(!0)).addClass(n.slideDuplicateClass))
                },
                loopFix: function() {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const {
                        activeIndex: t,
                        slides: n,
                        loopedSlides: s,
                        allowSlidePrev: i,
                        allowSlideNext: r,
                        snapGrid: a,
                        rtlTranslate: o
                    } = e;
                    let l;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const c = -a[t] - e.getTranslate();
                    if (t < s) {
                        l = n.length - 3 * s + t, l += s;
                        e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((o ? -e.translate : e.translate) - c)
                    } else if (t >= n.length - s) {
                        l = -n.length + t + s, l += s;
                        e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((o ? -e.translate : e.translate) - c)
                    }
                    e.allowSlidePrev = i, e.allowSlideNext = r, e.emit("loopFix")
                },
                loopDestroy: function() {
                    const {
                        $wrapperEl: e,
                        params: t,
                        slides: n
                    } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), n.removeAttr("data-swiper-slide-index")
                }
            };

            function N(e) {
                const t = this,
                    n = a(),
                    s = l(),
                    i = t.touchEventsData,
                    {
                        params: r,
                        touches: o,
                        enabled: c
                    } = t;
                if (!c) return;
                if (t.animating && r.preventInteractionOnTransition) return;
                !t.animating && r.cssMode && r.loop && t.loopFix();
                let d = e;
                d.originalEvent && (d = d.originalEvent);
                let u = g(d.target);
                if ("wrapper" === r.touchEventsTarget && !u.closest(t.wrapperEl).length) return;
                if (i.isTouchEvent = "touchstart" === d.type, !i.isTouchEvent && "which" in d && 3 === d.which) return;
                if (!i.isTouchEvent && "button" in d && d.button > 0) return;
                if (i.isTouched && i.isMoved) return;
                const p = !!r.noSwipingClass && "" !== r.noSwipingClass,
                    f = e.composedPath ? e.composedPath() : e.path;
                p && d.target && d.target.shadowRoot && f && (u = g(f[0]));
                const h = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
                    m = !(!d.target || !d.target.shadowRoot);
                if (r.noSwiping && (m ? function(e, t = this) {
                        return function t(n) {
                            if (!n || n === a() || n === l()) return null;
                            n.assignedSlot && (n = n.assignedSlot);
                            const s = n.closest(e);
                            return s || n.getRootNode ? s || t(n.getRootNode().host) : null
                        }(t)
                    }(h, u[0]) : u.closest(h)[0])) return void(t.allowClick = !0);
                if (r.swipeHandler && !u.closest(r.swipeHandler)[0]) return;
                o.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, o.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                const v = o.currentX,
                    y = o.currentY,
                    w = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
                    x = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                if (w && (v <= x || v >= s.innerWidth - x)) {
                    if ("prevent" !== w) return;
                    e.preventDefault()
                }
                if (Object.assign(i, {
                        isTouched: !0,
                        isMoved: !1,
                        allowTouchCallbacks: !0,
                        isScrolling: void 0,
                        startMoving: void 0
                    }), o.startX = v, o.startY = y, i.touchStartTime = b(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, r.threshold > 0 && (i.allowThresholdMove = !1), "touchstart" !== d.type) {
                    let e = !0;
                    u.is(i.focusableElements) && (e = !1, "SELECT" === u[0].nodeName && (i.isTouched = !1)), n.activeElement && g(n.activeElement).is(i.focusableElements) && n.activeElement !== u[0] && n.activeElement.blur();
                    const s = e && t.allowTouchMove && r.touchStartPreventDefault;
                    !r.touchStartForcePreventDefault && !s || u[0].isContentEditable || d.preventDefault()
                }
                t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !r.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", d)
            }

            function D(e) {
                const t = a(),
                    n = this,
                    s = n.touchEventsData,
                    {
                        params: i,
                        touches: r,
                        rtlTranslate: o,
                        enabled: l
                    } = n;
                if (!l) return;
                let c = e;
                if (c.originalEvent && (c = c.originalEvent), !s.isTouched) return void(s.startMoving && s.isScrolling && n.emit("touchMoveOpposite", c));
                if (s.isTouchEvent && "touchmove" !== c.type) return;
                const d = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0]),
                    u = "touchmove" === c.type ? d.pageX : c.pageX,
                    p = "touchmove" === c.type ? d.pageY : c.pageY;
                if (c.preventedByNestedSwiper) return r.startX = u, void(r.startY = p);
                if (!n.allowTouchMove) return g(c.target).is(s.focusableElements) || (n.allowClick = !1), void(s.isTouched && (Object.assign(r, {
                    startX: u,
                    startY: p,
                    currentX: u,
                    currentY: p
                }), s.touchStartTime = b()));
                if (s.isTouchEvent && i.touchReleaseOnEdges && !i.loop)
                    if (n.isVertical()) {
                        if (p < r.startY && n.translate <= n.maxTranslate() || p > r.startY && n.translate >= n.minTranslate()) return s.isTouched = !1, void(s.isMoved = !1)
                    } else if (u < r.startX && n.translate <= n.maxTranslate() || u > r.startX && n.translate >= n.minTranslate()) return;
                if (s.isTouchEvent && t.activeElement && c.target === t.activeElement && g(c.target).is(s.focusableElements)) return s.isMoved = !0, void(n.allowClick = !1);
                if (s.allowTouchCallbacks && n.emit("touchMove", c), c.targetTouches && c.targetTouches.length > 1) return;
                r.currentX = u, r.currentY = p;
                const f = r.currentX - r.startX,
                    h = r.currentY - r.startY;
                if (n.params.threshold && Math.sqrt(f ** 2 + h ** 2) < n.params.threshold) return;
                if (void 0 === s.isScrolling) {
                    let e;
                    n.isHorizontal() && r.currentY === r.startY || n.isVertical() && r.currentX === r.startX ? s.isScrolling = !1 : f * f + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(f)) / Math.PI, s.isScrolling = n.isHorizontal() ? e > i.touchAngle : 90 - e > i.touchAngle)
                }
                if (s.isScrolling && n.emit("touchMoveOpposite", c), void 0 === s.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (s.startMoving = !0)), s.isScrolling) return void(s.isTouched = !1);
                if (!s.startMoving) return;
                n.allowClick = !1, !i.cssMode && c.cancelable && c.preventDefault(), i.touchMoveStopPropagation && !i.nested && c.stopPropagation(), s.isMoved || (i.loop && !i.cssMode && n.loopFix(), s.startTranslate = n.getTranslate(), n.setTransition(0), n.animating && n.$wrapperEl.trigger("webkitTransitionEnd transitionend"), s.allowMomentumBounce = !1, !i.grabCursor || !0 !== n.allowSlideNext && !0 !== n.allowSlidePrev || n.setGrabCursor(!0), n.emit("sliderFirstMove", c)), n.emit("sliderMove", c), s.isMoved = !0;
                let m = n.isHorizontal() ? f : h;
                r.diff = m, m *= i.touchRatio, o && (m = -m), n.swipeDirection = m > 0 ? "prev" : "next", s.currentTranslate = m + s.startTranslate;
                let v = !0,
                    y = i.resistanceRatio;
                if (i.touchReleaseOnEdges && (y = 0), m > 0 && s.currentTranslate > n.minTranslate() ? (v = !1, i.resistance && (s.currentTranslate = n.minTranslate() - 1 + (-n.minTranslate() + s.startTranslate + m) ** y)) : m < 0 && s.currentTranslate < n.maxTranslate() && (v = !1, i.resistance && (s.currentTranslate = n.maxTranslate() + 1 - (n.maxTranslate() - s.startTranslate - m) ** y)), v && (c.preventedByNestedSwiper = !0), !n.allowSlideNext && "next" === n.swipeDirection && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !n.allowSlidePrev && "prev" === n.swipeDirection && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), n.allowSlidePrev || n.allowSlideNext || (s.currentTranslate = s.startTranslate), i.threshold > 0) {
                    if (!(Math.abs(m) > i.threshold || s.allowThresholdMove)) return void(s.currentTranslate = s.startTranslate);
                    if (!s.allowThresholdMove) return s.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, s.currentTranslate = s.startTranslate, void(r.diff = n.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                }
                i.followFinger && !i.cssMode && ((i.freeMode && i.freeMode.enabled && n.freeMode || i.watchSlidesProgress) && (n.updateActiveIndex(), n.updateSlidesClasses()), n.params.freeMode && i.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(), n.updateProgress(s.currentTranslate), n.setTranslate(s.currentTranslate))
            }

            function j(e) {
                const t = this,
                    n = t.touchEventsData,
                    {
                        params: s,
                        touches: i,
                        rtlTranslate: r,
                        slidesGrid: a,
                        enabled: o
                    } = t;
                if (!o) return;
                let l = e;
                if (l.originalEvent && (l = l.originalEvent), n.allowTouchCallbacks && t.emit("touchEnd", l), n.allowTouchCallbacks = !1, !n.isTouched) return n.isMoved && s.grabCursor && t.setGrabCursor(!1), n.isMoved = !1, void(n.startMoving = !1);
                s.grabCursor && n.isMoved && n.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                const c = b(),
                    d = c - n.touchStartTime;
                if (t.allowClick) {
                    const e = l.path || l.composedPath && l.composedPath();
                    t.updateClickedSlide(e && e[0] || l.target), t.emit("tap click", l), d < 300 && c - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
                }
                if (n.lastClickTime = b(), v((() => {
                        t.destroyed || (t.allowClick = !0)
                    })), !n.isTouched || !n.isMoved || !t.swipeDirection || 0 === i.diff || n.currentTranslate === n.startTranslate) return n.isTouched = !1, n.isMoved = !1, void(n.startMoving = !1);
                let u;
                if (n.isTouched = !1, n.isMoved = !1, n.startMoving = !1, u = s.followFinger ? r ? t.translate : -t.translate : -n.currentTranslate, s.cssMode) return;
                if (t.params.freeMode && s.freeMode.enabled) return void t.freeMode.onTouchEnd({
                    currentPos: u
                });
                let p = 0,
                    f = t.slidesSizesGrid[0];
                for (let e = 0; e < a.length; e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                    const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                    void 0 !== a[e + t] ? u >= a[e] && u < a[e + t] && (p = e, f = a[e + t] - a[e]) : u >= a[e] && (p = e, f = a[a.length - 1] - a[a.length - 2])
                }
                let h = null,
                    m = null;
                s.rewind && (t.isBeginning ? m = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (h = 0));
                const g = (u - a[p]) / f,
                    y = p < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                if (d > s.longSwipesMs) {
                    if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (g >= s.longSwipesRatio ? t.slideTo(s.rewind && t.isEnd ? h : p + y) : t.slideTo(p)), "prev" === t.swipeDirection && (g > 1 - s.longSwipesRatio ? t.slideTo(p + y) : null !== m && g < 0 && Math.abs(g) > s.longSwipesRatio ? t.slideTo(m) : t.slideTo(p))
                } else {
                    if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl) ? l.target === t.navigation.nextEl ? t.slideTo(p + y) : t.slideTo(p) : ("next" === t.swipeDirection && t.slideTo(null !== h ? h : p + y), "prev" === t.swipeDirection && t.slideTo(null !== m ? m : p))
                }
            }

            function R() {
                const e = this,
                    {
                        params: t,
                        el: n
                    } = e;
                if (n && 0 === n.offsetWidth) return;
                t.breakpoints && e.setBreakpoint();
                const {
                    allowSlideNext: s,
                    allowSlidePrev: i,
                    snapGrid: r
                } = e;
                e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = i, e.allowSlideNext = s, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
            }

            function B(e) {
                const t = this;
                t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
            }

            function H() {
                const e = this,
                    {
                        wrapperEl: t,
                        rtlTranslate: n,
                        enabled: s
                    } = e;
                if (!s) return;
                let i;
                e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
                const r = e.maxTranslate() - e.minTranslate();
                i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, i !== e.progress && e.updateProgress(n ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
            }
            let W = !1;

            function F() {}
            const G = (e, t) => {
                const n = a(),
                    {
                        params: s,
                        touchEvents: i,
                        el: r,
                        wrapperEl: o,
                        device: l,
                        support: c
                    } = e,
                    d = !!s.nested,
                    u = "on" === t ? "addEventListener" : "removeEventListener",
                    p = t;
                if (c.touch) {
                    const t = !("touchstart" !== i.start || !c.passiveListener || !s.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    r[u](i.start, e.onTouchStart, t), r[u](i.move, e.onTouchMove, c.passiveListener ? {
                        passive: !1,
                        capture: d
                    } : d), r[u](i.end, e.onTouchEnd, t), i.cancel && r[u](i.cancel, e.onTouchEnd, t)
                } else r[u](i.start, e.onTouchStart, !1), n[u](i.move, e.onTouchMove, d), n[u](i.end, e.onTouchEnd, !1);
                (s.preventClicks || s.preventClicksPropagation) && r[u]("click", e.onClick, !0), s.cssMode && o[u]("scroll", e.onScroll), s.updateOnWindowResize ? e[p](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", R, !0) : e[p]("observerUpdate", R, !0)
            };
            var q = {
                attachEvents: function() {
                    const e = this,
                        t = a(),
                        {
                            params: n,
                            support: s
                        } = e;
                    e.onTouchStart = N.bind(e), e.onTouchMove = D.bind(e), e.onTouchEnd = j.bind(e), n.cssMode && (e.onScroll = H.bind(e)), e.onClick = B.bind(e), s.touch && !W && (t.addEventListener("touchstart", F), W = !0), G(e, "on")
                },
                detachEvents: function() {
                    G(this, "off")
                }
            };
            const X = (e, t) => e.grid && t.grid && t.grid.rows > 1;
            var Y = {
                setBreakpoint: function() {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: n,
                            loopedSlides: s = 0,
                            params: i,
                            $el: r
                        } = e,
                        a = i.breakpoints;
                    if (!a || a && 0 === Object.keys(a).length) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        c = X(e, i),
                        d = X(e, l),
                        u = i.enabled;
                    c && !d ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !c && d && (r.addClass(`${i.containerModifierClass}grid`), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === i.grid.fill) && r.addClass(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((t => {
                        const n = i[t] && i[t].enabled,
                            s = l[t] && l[t].enabled;
                        n && !s && e[t].disable(), !n && s && e[t].enable()
                    }));
                    const p = l.direction && l.direction !== i.direction,
                        f = i.loop && (l.slidesPerView !== i.slidesPerView || p);
                    p && n && e.changeDirection(), x(e.params, l);
                    const h = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }), u && !h ? e.disable() : !u && h && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", l), f && n && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                },
                getBreakpoint: function(e, t = "window", n) {
                    if (!e || "container" === t && !n) return;
                    let s = !1;
                    const i = l(),
                        r = "window" === t ? i.innerHeight : n.clientHeight,
                        a = Object.keys(e).map((e => {
                            if ("string" == typeof e && 0 === e.indexOf("@")) {
                                const t = parseFloat(e.substr(1));
                                return {
                                    value: r * t,
                                    point: e
                                }
                            }
                            return {
                                value: e,
                                point: e
                            }
                        }));
                    a.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
                    for (let e = 0; e < a.length; e += 1) {
                        const {
                            point: r,
                            value: o
                        } = a[e];
                        "window" === t ? i.matchMedia(`(min-width: ${o}px)`).matches && (s = r) : o <= n.clientWidth && (s = r)
                    }
                    return s || "max"
                }
            };
            var V = {
                addClasses: function() {
                    const e = this,
                        {
                            classNames: t,
                            params: n,
                            rtl: s,
                            $el: i,
                            device: r,
                            support: a
                        } = e,
                        o = function(e, t) {
                            const n = [];
                            return e.forEach((e => {
                                "object" == typeof e ? Object.keys(e).forEach((s => {
                                    e[s] && n.push(t + s)
                                })) : "string" == typeof e && n.push(t + e)
                            })), n
                        }(["initialized", n.direction, {
                            "pointer-events": !a.touch
                        }, {
                            "free-mode": e.params.freeMode && n.freeMode.enabled
                        }, {
                            autoheight: n.autoHeight
                        }, {
                            rtl: s
                        }, {
                            grid: n.grid && n.grid.rows > 1
                        }, {
                            "grid-column": n.grid && n.grid.rows > 1 && "column" === n.grid.fill
                        }, {
                            android: r.android
                        }, {
                            ios: r.ios
                        }, {
                            "css-mode": n.cssMode
                        }, {
                            centered: n.cssMode && n.centeredSlides
                        }, {
                            "watch-progress": n.watchSlidesProgress
                        }], n.containerModifierClass);
                    t.push(...o), i.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    const {
                        $el: e,
                        classNames: t
                    } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            };
            var U = {
                init: !0,
                direction: "horizontal",
                touchEventsTarget: "wrapper",
                initialSlide: 0,
                speed: 300,
                cssMode: !1,
                updateOnWindowResize: !0,
                resizeObserver: !0,
                nested: !1,
                createElements: !1,
                enabled: !0,
                focusableElements: "input, select, option, textarea, button, video, label",
                width: null,
                height: null,
                preventInteractionOnTransition: !1,
                userAgent: null,
                url: null,
                edgeSwipeDetection: !1,
                edgeSwipeThreshold: 20,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                breakpoints: void 0,
                breakpointsBase: "window",
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerGroup: 1,
                slidesPerGroupSkip: 0,
                slidesPerGroupAuto: !1,
                centeredSlides: !1,
                centeredSlidesBounds: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                normalizeSlideIndex: !0,
                centerInsufficientSlides: !1,
                watchOverflow: !0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                allowTouchMove: !0,
                threshold: 0,
                touchMoveStopPropagation: !1,
                touchStartPreventDefault: !0,
                touchStartForcePreventDefault: !1,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                resistance: !0,
                resistanceRatio: .85,
                watchSlidesProgress: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                loopedSlidesLimit: !0,
                loopFillGroupWithBlank: !1,
                loopPreventsSlide: !0,
                rewind: !1,
                allowSlidePrev: !0,
                allowSlideNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                noSwipingSelector: null,
                passiveListeners: !0,
                maxBackfaceHiddenSlides: 10,
                containerModifierClass: "swiper-",
                slideClass: "swiper-slide",
                slideBlankClass: "swiper-slide-invisible-blank",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                runCallbacksOnInit: !0,
                _emitClasses: !1
            };

            function K(e, t) {
                return function(n = {}) {
                    const s = Object.keys(n)[0],
                        i = n[s];
                    "object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 && !0 === e[s] && (e[s] = {
                        auto: !0
                    }), s in e && "enabled" in i ? (!0 === e[s] && (e[s] = {
                        enabled: !0
                    }), "object" != typeof e[s] || "enabled" in e[s] || (e[s].enabled = !0), e[s] || (e[s] = {
                        enabled: !1
                    }), x(t, n)) : x(t, n)) : x(t, n)
                }
            }
            const Z = {
                    eventsEmitter: P,
                    update: A,
                    translate: k,
                    transition: {
                        setTransition: function(e, t) {
                            const n = this;
                            n.params.cssMode || n.$wrapperEl.transition(e), n.emit("setTransition", e, t)
                        },
                        transitionStart: function(e = !0, t) {
                            const n = this,
                                {
                                    params: s
                                } = n;
                            s.cssMode || (s.autoHeight && n.updateAutoHeight(), O({
                                swiper: n,
                                runCallbacks: e,
                                direction: t,
                                step: "Start"
                            }))
                        },
                        transitionEnd: function(e = !0, t) {
                            const n = this,
                                {
                                    params: s
                                } = n;
                            n.animating = !1, s.cssMode || (n.setTransition(0), O({
                                swiper: n,
                                runCallbacks: e,
                                direction: t,
                                step: "End"
                            }))
                        }
                    },
                    slide: L,
                    loop: I,
                    grabCursor: {
                        setGrabCursor: function(e) {
                            const t = this;
                            if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                            const n = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                            n.style.cursor = "move", n.style.cursor = e ? "grabbing" : "grab"
                        },
                        unsetGrabCursor: function() {
                            const e = this;
                            e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                        }
                    },
                    events: q,
                    breakpoints: Y,
                    checkOverflow: {
                        checkOverflow: function() {
                            const e = this,
                                {
                                    isLocked: t,
                                    params: n
                                } = e,
                                {
                                    slidesOffsetBefore: s
                                } = n;
                            if (s) {
                                const t = e.slides.length - 1,
                                    n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
                                e.isLocked = e.size > n
                            } else e.isLocked = 1 === e.snapGrid.length;
                            !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                        }
                    },
                    classes: V,
                    images: {
                        loadImage: function(e, t, n, s, i, r) {
                            const a = l();
                            let o;

                            function c() {
                                r && r()
                            }
                            g(e).parent("picture")[0] || e.complete && i ? c() : t ? (o = new a.Image, o.onload = c, o.onerror = c, s && (o.sizes = s), n && (o.srcset = n), t && (o.src = t)) : c()
                        },
                        preloadImages: function() {
                            const e = this;

                            function t() {
                                null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                            }
                            e.imagesToLoad = e.$el.find("img");
                            for (let n = 0; n < e.imagesToLoad.length; n += 1) {
                                const s = e.imagesToLoad[n];
                                e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                            }
                        }
                    }
                },
                J = {};
            class Q {
                constructor(...e) {
                    let t, n;
                    if (1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? n = e[0] : [t, n] = e, n || (n = {}), n = x({}, n), t && !n.el && (n.el = t), n.el && g(n.el).length > 1) {
                        const e = [];
                        return g(n.el).each((t => {
                            const s = x({}, n, {
                                el: t
                            });
                            e.push(new Q(s))
                        })), e
                    }
                    const s = this;
                    s.__swiper__ = !0, s.support = T(), s.device = M({
                        userAgent: n.userAgent
                    }), s.browser = z(), s.eventsListeners = {}, s.eventsAnyListeners = [], s.modules = [...s.__modules__], n.modules && Array.isArray(n.modules) && s.modules.push(...n.modules);
                    const i = {};
                    s.modules.forEach((e => {
                        e({
                            swiper: s,
                            extendParams: K(n, i),
                            on: s.on.bind(s),
                            once: s.once.bind(s),
                            off: s.off.bind(s),
                            emit: s.emit.bind(s)
                        })
                    }));
                    const r = x({}, U, i);
                    return s.params = x({}, r, J, n), s.originalParams = x({}, s.params), s.passedParams = x({}, n), s.params && s.params.on && Object.keys(s.params.on).forEach((e => {
                        s.on(e, s.params.on[e])
                    })), s.params && s.params.onAny && s.onAny(s.params.onAny), s.$ = g, Object.assign(s, {
                        enabled: s.params.enabled,
                        el: t,
                        classNames: [],
                        slides: g(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal() {
                            return "horizontal" === s.params.direction
                        },
                        isVertical() {
                            return "vertical" === s.params.direction
                        },
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: s.params.allowSlideNext,
                        allowSlidePrev: s.params.allowSlidePrev,
                        touchEvents: function() {
                            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                                t = ["pointerdown", "pointermove", "pointerup"];
                            return s.touchEventsTouch = {
                                start: e[0],
                                move: e[1],
                                end: e[2],
                                cancel: e[3]
                            }, s.touchEventsDesktop = {
                                start: t[0],
                                move: t[1],
                                end: t[2]
                            }, s.support.touch || !s.params.simulateTouch ? s.touchEventsTouch : s.touchEventsDesktop
                        }(),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            focusableElements: s.params.focusableElements,
                            lastClickTime: b(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: s.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), s.emit("_swiper"), s.params.init && s.init(), s
                }
                enable() {
                    const e = this;
                    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
                }
                disable() {
                    const e = this;
                    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
                }
                setProgress(e, t) {
                    const n = this;
                    e = Math.min(Math.max(e, 0), 1);
                    const s = n.minTranslate(),
                        i = (n.maxTranslate() - s) * e + s;
                    n.translateTo(i, void 0 === t ? 0 : t), n.updateActiveIndex(), n.updateSlidesClasses()
                }
                emitContainerClasses() {
                    const e = this;
                    if (!e.params._emitClasses || !e.el) return;
                    const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
                    e.emit("_containerClasses", t.join(" "))
                }
                getSlideClasses(e) {
                    const t = this;
                    return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
                }
                emitSlidesClasses() {
                    const e = this;
                    if (!e.params._emitClasses || !e.el) return;
                    const t = [];
                    e.slides.each((n => {
                        const s = e.getSlideClasses(n);
                        t.push({
                            slideEl: n,
                            classNames: s
                        }), e.emit("_slideClass", n, s)
                    })), e.emit("_slideClasses", t)
                }
                slidesPerViewDynamic(e = "current", t = !1) {
                    const {
                        params: n,
                        slides: s,
                        slidesGrid: i,
                        slidesSizesGrid: r,
                        size: a,
                        activeIndex: o
                    } = this;
                    let l = 1;
                    if (n.centeredSlides) {
                        let e, t = s[o].swiperSlideSize;
                        for (let n = o + 1; n < s.length; n += 1) s[n] && !e && (t += s[n].swiperSlideSize, l += 1, t > a && (e = !0));
                        for (let n = o - 1; n >= 0; n -= 1) s[n] && !e && (t += s[n].swiperSlideSize, l += 1, t > a && (e = !0))
                    } else if ("current" === e)
                        for (let e = o + 1; e < s.length; e += 1) {
                            (t ? i[e] + r[e] - i[o] < a : i[e] - i[o] < a) && (l += 1)
                        } else
                            for (let e = o - 1; e >= 0; e -= 1) {
                                i[o] - i[e] < a && (l += 1)
                            }
                    return l
                }
                update() {
                    const e = this;
                    if (!e || e.destroyed) return;
                    const {
                        snapGrid: t,
                        params: n
                    } = e;

                    function s() {
                        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                        e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses()
                    }
                    let i;
                    n.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), i || s()), n.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }
                changeDirection(e, t = !0) {
                    const n = this,
                        s = n.params.direction;
                    return e || (e = "horizontal" === s ? "vertical" : "horizontal"), e === s || "horizontal" !== e && "vertical" !== e || (n.$el.removeClass(`${n.params.containerModifierClass}${s}`).addClass(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.each((t => {
                        "vertical" === e ? t.style.width = "" : t.style.height = ""
                    })), n.emit("changeDirection"), t && n.update()), n
                }
                changeLanguageDirection(e) {
                    const t = this;
                    t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update())
                }
                mount(e) {
                    const t = this;
                    if (t.mounted) return !0;
                    const n = g(e || t.params.el);
                    if (!(e = n[0])) return !1;
                    e.swiper = t;
                    const s = () => `.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;
                    let i = (() => {
                        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                            const t = g(e.shadowRoot.querySelector(s()));
                            return t.children = e => n.children(e), t
                        }
                        return n.children ? n.children(s()) : g(n).children(s())
                    })();
                    if (0 === i.length && t.params.createElements) {
                        const e = a().createElement("div");
                        i = g(e), e.className = t.params.wrapperClass, n.append(e), n.children(`.${t.params.slideClass}`).each((e => {
                            i.append(e)
                        }))
                    }
                    return Object.assign(t, {
                        $el: n,
                        el: e,
                        $wrapperEl: i,
                        wrapperEl: i[0],
                        mounted: !0,
                        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
                        rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
                        wrongRTL: "-webkit-box" === i.css("display")
                    }), !0
                }
                init(e) {
                    const t = this;
                    if (t.initialized) return t;
                    return !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
                }
                destroy(e = !0, t = !0) {
                    const n = this,
                        {
                            params: s,
                            $el: i,
                            $wrapperEl: r,
                            slides: a
                        } = n;
                    return void 0 === n.params || n.destroyed || (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), s.loop && n.loopDestroy(), t && (n.removeClasses(), i.removeAttr("style"), r.removeAttr("style"), a && a.length && a.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), n.emit("destroy"), Object.keys(n.eventsListeners).forEach((e => {
                        n.off(e)
                    })), !1 !== e && (n.$el[0].swiper = null, function(e) {
                        const t = e;
                        Object.keys(t).forEach((e => {
                            try {
                                t[e] = null
                            } catch (e) {}
                            try {
                                delete t[e]
                            } catch (e) {}
                        }))
                    }(n)), n.destroyed = !0), null
                }
                static extendDefaults(e) {
                    x(J, e)
                }
                static get extendedDefaults() {
                    return J
                }
                static get defaults() {
                    return U
                }
                static installModule(e) {
                    Q.prototype.__modules__ || (Q.prototype.__modules__ = []);
                    const t = Q.prototype.__modules__;
                    "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
                }
                static use(e) {
                    return Array.isArray(e) ? (e.forEach((e => Q.installModule(e))), Q) : (Q.installModule(e), Q)
                }
            }
            Object.keys(Z).forEach((e => {
                Object.keys(Z[e]).forEach((t => {
                    Q.prototype[t] = Z[e][t]
                }))
            })), Q.use([function({
                swiper: e,
                on: t,
                emit: n
            }) {
                const s = l();
                let i = null,
                    r = null;
                const a = () => {
                        e && !e.destroyed && e.initialized && (n("beforeResize"), n("resize"))
                    },
                    o = () => {
                        e && !e.destroyed && e.initialized && n("orientationchange")
                    };
                t("init", (() => {
                    e.params.resizeObserver && void 0 !== s.ResizeObserver ? e && !e.destroyed && e.initialized && (i = new ResizeObserver((t => {
                        r = s.requestAnimationFrame((() => {
                            const {
                                width: n,
                                height: s
                            } = e;
                            let i = n,
                                r = s;
                            t.forEach((({
                                contentBoxSize: t,
                                contentRect: n,
                                target: s
                            }) => {
                                s && s !== e.el || (i = n ? n.width : (t[0] || t).inlineSize, r = n ? n.height : (t[0] || t).blockSize)
                            })), i === n && r === s || a()
                        }))
                    })), i.observe(e.el)) : (s.addEventListener("resize", a), s.addEventListener("orientationchange", o))
                })), t("destroy", (() => {
                    r && s.cancelAnimationFrame(r), i && i.unobserve && e.el && (i.unobserve(e.el), i = null), s.removeEventListener("resize", a), s.removeEventListener("orientationchange", o)
                }))
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = [],
                    r = l(),
                    a = (e, t = {}) => {
                        const n = new(r.MutationObserver || r.WebkitMutationObserver)((e => {
                            if (1 === e.length) return void s("observerUpdate", e[0]);
                            const t = function() {
                                s("observerUpdate", e[0])
                            };
                            r.requestAnimationFrame ? r.requestAnimationFrame(t) : r.setTimeout(t, 0)
                        }));
                        n.observe(e, {
                            attributes: void 0 === t.attributes || t.attributes,
                            childList: void 0 === t.childList || t.childList,
                            characterData: void 0 === t.characterData || t.characterData
                        }), i.push(n)
                    };
                t({
                    observer: !1,
                    observeParents: !1,
                    observeSlideChildren: !1
                }), n("init", (() => {
                    if (e.params.observer) {
                        if (e.params.observeParents) {
                            const t = e.$el.parents();
                            for (let e = 0; e < t.length; e += 1) a(t[e])
                        }
                        a(e.$el[0], {
                            childList: e.params.observeSlideChildren
                        }), a(e.$wrapperEl[0], {
                            attributes: !1
                        })
                    }
                })), n("destroy", (() => {
                    i.forEach((e => {
                        e.disconnect()
                    })), i.splice(0, i.length)
                }))
            }]);
            var ee = Q;

            function te(e, t, n, s) {
                const i = a();
                return e.params.createElements && Object.keys(s).forEach((r => {
                    if (!n[r] && !0 === n.auto) {
                        let a = e.$el.children(`.${s[r]}`)[0];
                        a || (a = i.createElement("div"), a.className = s[r], e.$el.append(a)), n[r] = a, t[r] = a
                    }
                })), n
            }

            function ne(e = "") {
                return `.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`
            }

            function se(e) {
                const t = this,
                    {
                        $wrapperEl: n,
                        params: s
                    } = t;
                if (s.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1) e[t] && n.append(e[t]);
                else n.append(e);
                s.loop && t.loopCreate(), s.observer || t.update()
            }

            function ie(e) {
                const t = this,
                    {
                        params: n,
                        $wrapperEl: s,
                        activeIndex: i
                    } = t;
                n.loop && t.loopDestroy();
                let r = i + 1;
                if ("object" == typeof e && "length" in e) {
                    for (let t = 0; t < e.length; t += 1) e[t] && s.prepend(e[t]);
                    r = i + e.length
                } else s.prepend(e);
                n.loop && t.loopCreate(), n.observer || t.update(), t.slideTo(r, 0, !1)
            }

            function re(e, t) {
                const n = this,
                    {
                        $wrapperEl: s,
                        params: i,
                        activeIndex: r
                    } = n;
                let a = r;
                i.loop && (a -= n.loopedSlides, n.loopDestroy(), n.slides = s.children(`.${i.slideClass}`));
                const o = n.slides.length;
                if (e <= 0) return void n.prependSlide(t);
                if (e >= o) return void n.appendSlide(t);
                let l = a > e ? a + 1 : a;
                const c = [];
                for (let t = o - 1; t >= e; t -= 1) {
                    const e = n.slides.eq(t);
                    e.remove(), c.unshift(e)
                }
                if ("object" == typeof t && "length" in t) {
                    for (let e = 0; e < t.length; e += 1) t[e] && s.append(t[e]);
                    l = a > e ? a + t.length : a
                } else s.append(t);
                for (let e = 0; e < c.length; e += 1) s.append(c[e]);
                i.loop && n.loopCreate(), i.observer || n.update(), i.loop ? n.slideTo(l + n.loopedSlides, 0, !1) : n.slideTo(l, 0, !1)
            }

            function ae(e) {
                const t = this,
                    {
                        params: n,
                        $wrapperEl: s,
                        activeIndex: i
                    } = t;
                let r = i;
                n.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = s.children(`.${n.slideClass}`));
                let a, o = r;
                if ("object" == typeof e && "length" in e) {
                    for (let n = 0; n < e.length; n += 1) a = e[n], t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1);
                    o = Math.max(o, 0)
                } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1), o = Math.max(o, 0);
                n.loop && t.loopCreate(), n.observer || t.update(), n.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
            }

            function oe() {
                const e = this,
                    t = [];
                for (let n = 0; n < e.slides.length; n += 1) t.push(n);
                e.removeSlide(t)
            }

            function le(e) {
                const {
                    effect: t,
                    swiper: n,
                    on: s,
                    setTranslate: i,
                    setTransition: r,
                    overwriteParams: a,
                    perspective: o,
                    recreateShadows: l,
                    getEffectParams: c
                } = e;
                let d;
                s("beforeInit", (() => {
                    if (n.params.effect !== t) return;
                    n.classNames.push(`${n.params.containerModifierClass}${t}`), o && o() && n.classNames.push(`${n.params.containerModifierClass}3d`);
                    const e = a ? a() : {};
                    Object.assign(n.params, e), Object.assign(n.originalParams, e)
                })), s("setTranslate", (() => {
                    n.params.effect === t && i()
                })), s("setTransition", ((e, s) => {
                    n.params.effect === t && r(s)
                })), s("transitionEnd", (() => {
                    if (n.params.effect === t && l) {
                        if (!c || !c().slideShadows) return;
                        n.slides.each((e => {
                            n.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
                        })), l()
                    }
                })), s("virtualUpdate", (() => {
                    n.params.effect === t && (n.slides.length || (d = !0), requestAnimationFrame((() => {
                        d && n.slides && n.slides.length && (i(), d = !1)
                    })))
                }))
            }

            function ce(e, t) {
                return e.transformEl ? t.find(e.transformEl).css({
                    "backface-visibility": "hidden",
                    "-webkit-backface-visibility": "hidden"
                }) : t
            }

            function de({
                swiper: e,
                duration: t,
                transformEl: n,
                allSlides: s
            }) {
                const {
                    slides: i,
                    activeIndex: r,
                    $wrapperEl: a
                } = e;
                if (e.params.virtualTranslate && 0 !== t) {
                    let t, o = !1;
                    t = s ? n ? i.find(n) : i : n ? i.eq(r).find(n) : i.eq(r), t.transitionEnd((() => {
                        if (o) return;
                        if (!e || e.destroyed) return;
                        o = !0, e.animating = !1;
                        const t = ["webkitTransitionEnd", "transitionend"];
                        for (let e = 0; e < t.length; e += 1) a.trigger(t[e])
                    }))
                }
            }

            function ue(e, t, n) {
                const s = "swiper-slide-shadow" + (n ? `-${n}` : ""),
                    i = e.transformEl ? t.find(e.transformEl) : t;
                let r = i.children(`.${s}`);
                return r.length || (r = g(`<div class="swiper-slide-shadow${n?`-${n}`:""}"></div>`), i.append(r)), r
            }
            const pe = [function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                let i;

                function r(t, n) {
                    const s = e.params.virtual;
                    if (s.cache && e.virtual.cache[n]) return e.virtual.cache[n];
                    const i = s.renderSlide ? g(s.renderSlide.call(e, t, n)) : g(`<div class="${e.params.slideClass}" data-swiper-slide-index="${n}">${t}</div>`);
                    return i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", n), s.cache && (e.virtual.cache[n] = i), i
                }

                function a(t) {
                    const {
                        slidesPerView: n,
                        slidesPerGroup: i,
                        centeredSlides: a
                    } = e.params, {
                        addSlidesBefore: o,
                        addSlidesAfter: l
                    } = e.params.virtual, {
                        from: c,
                        to: d,
                        slides: u,
                        slidesGrid: p,
                        offset: f
                    } = e.virtual;
                    e.params.cssMode || e.updateActiveIndex();
                    const h = e.activeIndex || 0;
                    let m, g, v;
                    m = e.rtlTranslate ? "right" : e.isHorizontal() ? "left" : "top", a ? (g = Math.floor(n / 2) + i + l, v = Math.floor(n / 2) + i + o) : (g = n + (i - 1) + l, v = i + o);
                    const b = Math.max((h || 0) - v, 0),
                        y = Math.min((h || 0) + g, u.length - 1),
                        w = (e.slidesGrid[b] || 0) - (e.slidesGrid[0] || 0);

                    function x() {
                        e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.lazy && e.params.lazy.enabled && e.lazy.load(), s("virtualUpdate")
                    }
                    if (Object.assign(e.virtual, {
                            from: b,
                            to: y,
                            offset: w,
                            slidesGrid: e.slidesGrid
                        }), c === b && d === y && !t) return e.slidesGrid !== p && w !== f && e.slides.css(m, `${w}px`), e.updateProgress(), void s("virtualUpdate");
                    if (e.params.virtual.renderExternal) return e.params.virtual.renderExternal.call(e, {
                        offset: w,
                        from: b,
                        to: y,
                        slides: function() {
                            const e = [];
                            for (let t = b; t <= y; t += 1) e.push(u[t]);
                            return e
                        }()
                    }), void(e.params.virtual.renderExternalUpdate ? x() : s("virtualUpdate"));
                    const E = [],
                        _ = [];
                    if (t) e.$wrapperEl.find(`.${e.params.slideClass}`).remove();
                    else
                        for (let t = c; t <= d; t += 1)(t < b || t > y) && e.$wrapperEl.find(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`).remove();
                    for (let e = 0; e < u.length; e += 1) e >= b && e <= y && (void 0 === d || t ? _.push(e) : (e > d && _.push(e), e < c && E.push(e)));
                    _.forEach((t => {
                        e.$wrapperEl.append(r(u[t], t))
                    })), E.sort(((e, t) => t - e)).forEach((t => {
                        e.$wrapperEl.prepend(r(u[t], t))
                    })), e.$wrapperEl.children(".swiper-slide").css(m, `${w}px`), x()
                }
                t({
                    virtual: {
                        enabled: !1,
                        slides: [],
                        cache: !0,
                        renderSlide: null,
                        renderExternal: null,
                        renderExternalUpdate: !0,
                        addSlidesBefore: 0,
                        addSlidesAfter: 0
                    }
                }), e.virtual = {
                    cache: {},
                    from: void 0,
                    to: void 0,
                    slides: [],
                    offset: 0,
                    slidesGrid: []
                }, n("beforeInit", (() => {
                    e.params.virtual.enabled && (e.virtual.slides = e.params.virtual.slides, e.classNames.push(`${e.params.containerModifierClass}virtual`), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0, e.params.initialSlide || a())
                })), n("setTranslate", (() => {
                    e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(i), i = setTimeout((() => {
                        a()
                    }), 100)) : a())
                })), n("init update resize", (() => {
                    e.params.virtual.enabled && e.params.cssMode && E(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`)
                })), Object.assign(e.virtual, {
                    appendSlide: function(t) {
                        if ("object" == typeof t && "length" in t)
                            for (let n = 0; n < t.length; n += 1) t[n] && e.virtual.slides.push(t[n]);
                        else e.virtual.slides.push(t);
                        a(!0)
                    },
                    prependSlide: function(t) {
                        const n = e.activeIndex;
                        let s = n + 1,
                            i = 1;
                        if (Array.isArray(t)) {
                            for (let n = 0; n < t.length; n += 1) t[n] && e.virtual.slides.unshift(t[n]);
                            s = n + t.length, i = t.length
                        } else e.virtual.slides.unshift(t);
                        if (e.params.virtual.cache) {
                            const t = e.virtual.cache,
                                n = {};
                            Object.keys(t).forEach((e => {
                                const s = t[e],
                                    r = s.attr("data-swiper-slide-index");
                                r && s.attr("data-swiper-slide-index", parseInt(r, 10) + i), n[parseInt(e, 10) + i] = s
                            })), e.virtual.cache = n
                        }
                        a(!0), e.slideTo(s, 0)
                    },
                    removeSlide: function(t) {
                        if (null == t) return;
                        let n = e.activeIndex;
                        if (Array.isArray(t))
                            for (let s = t.length - 1; s >= 0; s -= 1) e.virtual.slides.splice(t[s], 1), e.params.virtual.cache && delete e.virtual.cache[t[s]], t[s] < n && (n -= 1), n = Math.max(n, 0);
                        else e.virtual.slides.splice(t, 1), e.params.virtual.cache && delete e.virtual.cache[t], t < n && (n -= 1), n = Math.max(n, 0);
                        a(!0), e.slideTo(n, 0)
                    },
                    removeAllSlides: function() {
                        e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), a(!0), e.slideTo(0, 0)
                    },
                    update: a
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = a(),
                    r = l();

                function o(t) {
                    if (!e.enabled) return;
                    const {
                        rtlTranslate: n
                    } = e;
                    let a = t;
                    a.originalEvent && (a = a.originalEvent);
                    const o = a.keyCode || a.charCode,
                        l = e.params.keyboard.pageUpDown,
                        c = l && 33 === o,
                        d = l && 34 === o,
                        u = 37 === o,
                        p = 39 === o,
                        f = 38 === o,
                        h = 40 === o;
                    if (!e.allowSlideNext && (e.isHorizontal() && p || e.isVertical() && h || d)) return !1;
                    if (!e.allowSlidePrev && (e.isHorizontal() && u || e.isVertical() && f || c)) return !1;
                    if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                        if (e.params.keyboard.onlyInViewport && (c || d || u || p || f || h)) {
                            let t = !1;
                            if (e.$el.parents(`.${e.params.slideClass}`).length > 0 && 0 === e.$el.parents(`.${e.params.slideActiveClass}`).length) return;
                            const s = e.$el,
                                i = s[0].clientWidth,
                                a = s[0].clientHeight,
                                o = r.innerWidth,
                                l = r.innerHeight,
                                c = e.$el.offset();
                            n && (c.left -= e.$el[0].scrollLeft);
                            const d = [
                                [c.left, c.top],
                                [c.left + i, c.top],
                                [c.left, c.top + a],
                                [c.left + i, c.top + a]
                            ];
                            for (let e = 0; e < d.length; e += 1) {
                                const n = d[e];
                                if (n[0] >= 0 && n[0] <= o && n[1] >= 0 && n[1] <= l) {
                                    if (0 === n[0] && 0 === n[1]) continue;
                                    t = !0
                                }
                            }
                            if (!t) return
                        }
                        e.isHorizontal() ? ((c || d || u || p) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), ((d || p) && !n || (c || u) && n) && e.slideNext(), ((c || u) && !n || (d || p) && n) && e.slidePrev()) : ((c || d || f || h) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (d || h) && e.slideNext(), (c || f) && e.slidePrev()), s("keyPress", o)
                    }
                }

                function c() {
                    e.keyboard.enabled || (g(i).on("keydown", o), e.keyboard.enabled = !0)
                }

                function d() {
                    e.keyboard.enabled && (g(i).off("keydown", o), e.keyboard.enabled = !1)
                }
                e.keyboard = {
                    enabled: !1
                }, t({
                    keyboard: {
                        enabled: !1,
                        onlyInViewport: !0,
                        pageUpDown: !0
                    }
                }), n("init", (() => {
                    e.params.keyboard.enabled && c()
                })), n("destroy", (() => {
                    e.keyboard.enabled && d()
                })), Object.assign(e.keyboard, {
                    enable: c,
                    disable: d
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = l();
                let r;
                t({
                    mousewheel: {
                        enabled: !1,
                        releaseOnEdges: !1,
                        invert: !1,
                        forceToAxis: !1,
                        sensitivity: 1,
                        eventsTarget: "container",
                        thresholdDelta: null,
                        thresholdTime: null
                    }
                }), e.mousewheel = {
                    enabled: !1
                };
                let a, o = b();
                const c = [];

                function d() {
                    e.enabled && (e.mouseEntered = !0)
                }

                function u() {
                    e.enabled && (e.mouseEntered = !1)
                }

                function p(t) {
                    return !(e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta) && (!(e.params.mousewheel.thresholdTime && b() - o < e.params.mousewheel.thresholdTime) && (t.delta >= 6 && b() - o < 60 || (t.direction < 0 ? e.isEnd && !e.params.loop || e.animating || (e.slideNext(), s("scroll", t.raw)) : e.isBeginning && !e.params.loop || e.animating || (e.slidePrev(), s("scroll", t.raw)), o = (new i.Date).getTime(), !1)))
                }

                function f(t) {
                    let n = t,
                        i = !0;
                    if (!e.enabled) return;
                    const o = e.params.mousewheel;
                    e.params.cssMode && n.preventDefault();
                    let l = e.$el;
                    if ("container" !== e.params.mousewheel.eventsTarget && (l = g(e.params.mousewheel.eventsTarget)), !e.mouseEntered && !l[0].contains(n.target) && !o.releaseOnEdges) return !0;
                    n.originalEvent && (n = n.originalEvent);
                    let d = 0;
                    const u = e.rtlTranslate ? -1 : 1,
                        f = function(e) {
                            let t = 0,
                                n = 0,
                                s = 0,
                                i = 0;
                            return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), s = 10 * t, i = 10 * n, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = i, i = 0), (s || i) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, i *= 40) : (s *= 800, i *= 800)), s && !t && (t = s < 1 ? -1 : 1), i && !n && (n = i < 1 ? -1 : 1), {
                                spinX: t,
                                spinY: n,
                                pixelX: s,
                                pixelY: i
                            }
                        }(n);
                    if (o.forceToAxis)
                        if (e.isHorizontal()) {
                            if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY))) return !0;
                            d = -f.pixelX * u
                        } else {
                            if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX))) return !0;
                            d = -f.pixelY
                        }
                    else d = Math.abs(f.pixelX) > Math.abs(f.pixelY) ? -f.pixelX * u : -f.pixelY;
                    if (0 === d) return !0;
                    o.invert && (d = -d);
                    let h = e.getTranslate() + d * o.sensitivity;
                    if (h >= e.minTranslate() && (h = e.minTranslate()), h <= e.maxTranslate() && (h = e.maxTranslate()), i = !!e.params.loop || !(h === e.minTranslate() || h === e.maxTranslate()), i && e.params.nested && n.stopPropagation(), e.params.freeMode && e.params.freeMode.enabled) {
                        const t = {
                                time: b(),
                                delta: Math.abs(d),
                                direction: Math.sign(d)
                            },
                            i = a && t.time < a.time + 500 && t.delta <= a.delta && t.direction === a.direction;
                        if (!i) {
                            a = void 0, e.params.loop && e.loopFix();
                            let l = e.getTranslate() + d * o.sensitivity;
                            const u = e.isBeginning,
                                p = e.isEnd;
                            if (l >= e.minTranslate() && (l = e.minTranslate()), l <= e.maxTranslate() && (l = e.maxTranslate()), e.setTransition(0), e.setTranslate(l), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!u && e.isBeginning || !p && e.isEnd) && e.updateSlidesClasses(), e.params.freeMode.sticky) {
                                clearTimeout(r), r = void 0, c.length >= 15 && c.shift();
                                const n = c.length ? c[c.length - 1] : void 0,
                                    s = c[0];
                                if (c.push(t), n && (t.delta > n.delta || t.direction !== n.direction)) c.splice(0);
                                else if (c.length >= 15 && t.time - s.time < 500 && s.delta - t.delta >= 1 && t.delta <= 6) {
                                    const n = d > 0 ? .8 : .2;
                                    a = t, c.splice(0), r = v((() => {
                                        e.slideToClosest(e.params.speed, !0, void 0, n)
                                    }), 0)
                                }
                                r || (r = v((() => {
                                    a = t, c.splice(0), e.slideToClosest(e.params.speed, !0, void 0, .5)
                                }), 500))
                            }
                            if (i || s("scroll", n), e.params.autoplay && e.params.autoplayDisableOnInteraction && e.autoplay.stop(), l === e.minTranslate() || l === e.maxTranslate()) return !0
                        }
                    } else {
                        const n = {
                            time: b(),
                            delta: Math.abs(d),
                            direction: Math.sign(d),
                            raw: t
                        };
                        c.length >= 2 && c.shift();
                        const s = c.length ? c[c.length - 1] : void 0;
                        if (c.push(n), s ? (n.direction !== s.direction || n.delta > s.delta || n.time > s.time + 150) && p(n) : p(n), function(t) {
                                const n = e.params.mousewheel;
                                if (t.direction < 0) {
                                    if (e.isEnd && !e.params.loop && n.releaseOnEdges) return !0
                                } else if (e.isBeginning && !e.params.loop && n.releaseOnEdges) return !0;
                                return !1
                            }(n)) return !0
                    }
                    return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1
                }

                function h(t) {
                    let n = e.$el;
                    "container" !== e.params.mousewheel.eventsTarget && (n = g(e.params.mousewheel.eventsTarget)), n[t]("mouseenter", d), n[t]("mouseleave", u), n[t]("wheel", f)
                }

                function m() {
                    return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", f), !0) : !e.mousewheel.enabled && (h("on"), e.mousewheel.enabled = !0, !0)
                }

                function y() {
                    return e.params.cssMode ? (e.wrapperEl.addEventListener(event, f), !0) : !!e.mousewheel.enabled && (h("off"), e.mousewheel.enabled = !1, !0)
                }
                n("init", (() => {
                    !e.params.mousewheel.enabled && e.params.cssMode && y(), e.params.mousewheel.enabled && m()
                })), n("destroy", (() => {
                    e.params.cssMode && m(), e.mousewheel.enabled && y()
                })), Object.assign(e.mousewheel, {
                    enable: m,
                    disable: y
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                function i(t) {
                    let n;
                    return t && (n = g(t), e.params.uniqueNavElements && "string" == typeof t && n.length > 1 && 1 === e.$el.find(t).length && (n = e.$el.find(t))), n
                }

                function r(t, n) {
                    const s = e.params.navigation;
                    t && t.length > 0 && (t[n ? "addClass" : "removeClass"](s.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = n), e.params.watchOverflow && e.enabled && t[e.isLocked ? "addClass" : "removeClass"](s.lockClass))
                }

                function a() {
                    if (e.params.loop) return;
                    const {
                        $nextEl: t,
                        $prevEl: n
                    } = e.navigation;
                    r(n, e.isBeginning && !e.params.rewind), r(t, e.isEnd && !e.params.rewind)
                }

                function o(t) {
                    t.preventDefault(), (!e.isBeginning || e.params.loop || e.params.rewind) && (e.slidePrev(), s("navigationPrev"))
                }

                function l(t) {
                    t.preventDefault(), (!e.isEnd || e.params.loop || e.params.rewind) && (e.slideNext(), s("navigationNext"))
                }

                function c() {
                    const t = e.params.navigation;
                    if (e.params.navigation = te(e, e.originalParams.navigation, e.params.navigation, {
                            nextEl: "swiper-button-next",
                            prevEl: "swiper-button-prev"
                        }), !t.nextEl && !t.prevEl) return;
                    const n = i(t.nextEl),
                        s = i(t.prevEl);
                    n && n.length > 0 && n.on("click", l), s && s.length > 0 && s.on("click", o), Object.assign(e.navigation, {
                        $nextEl: n,
                        nextEl: n && n[0],
                        $prevEl: s,
                        prevEl: s && s[0]
                    }), e.enabled || (n && n.addClass(t.lockClass), s && s.addClass(t.lockClass))
                }

                function d() {
                    const {
                        $nextEl: t,
                        $prevEl: n
                    } = e.navigation;
                    t && t.length && (t.off("click", l), t.removeClass(e.params.navigation.disabledClass)), n && n.length && (n.off("click", o), n.removeClass(e.params.navigation.disabledClass))
                }
                t({
                    navigation: {
                        nextEl: null,
                        prevEl: null,
                        hideOnClick: !1,
                        disabledClass: "swiper-button-disabled",
                        hiddenClass: "swiper-button-hidden",
                        lockClass: "swiper-button-lock",
                        navigationDisabledClass: "swiper-navigation-disabled"
                    }
                }), e.navigation = {
                    nextEl: null,
                    $nextEl: null,
                    prevEl: null,
                    $prevEl: null
                }, n("init", (() => {
                    !1 === e.params.navigation.enabled ? u() : (c(), a())
                })), n("toEdge fromEdge lock unlock", (() => {
                    a()
                })), n("destroy", (() => {
                    d()
                })), n("enable disable", (() => {
                    const {
                        $nextEl: t,
                        $prevEl: n
                    } = e.navigation;
                    t && t[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass), n && n[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
                })), n("click", ((t, n) => {
                    const {
                        $nextEl: i,
                        $prevEl: r
                    } = e.navigation, a = n.target;
                    if (e.params.navigation.hideOnClick && !g(a).is(r) && !g(a).is(i)) {
                        if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === a || e.pagination.el.contains(a))) return;
                        let t;
                        i ? t = i.hasClass(e.params.navigation.hiddenClass) : r && (t = r.hasClass(e.params.navigation.hiddenClass)), s(!0 === t ? "navigationShow" : "navigationHide"), i && i.toggleClass(e.params.navigation.hiddenClass), r && r.toggleClass(e.params.navigation.hiddenClass)
                    }
                }));
                const u = () => {
                    e.$el.addClass(e.params.navigation.navigationDisabledClass), d()
                };
                Object.assign(e.navigation, {
                    enable: () => {
                        e.$el.removeClass(e.params.navigation.navigationDisabledClass), c(), a()
                    },
                    disable: u,
                    update: a,
                    init: c,
                    destroy: d
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = "swiper-pagination";
                let r;
                t({
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        progressbarOpposite: !1,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        formatFractionCurrent: e => e,
                        formatFractionTotal: e => e,
                        bulletClass: `${i}-bullet`,
                        bulletActiveClass: `${i}-bullet-active`,
                        modifierClass: `${i}-`,
                        currentClass: `${i}-current`,
                        totalClass: `${i}-total`,
                        hiddenClass: `${i}-hidden`,
                        progressbarFillClass: `${i}-progressbar-fill`,
                        progressbarOppositeClass: `${i}-progressbar-opposite`,
                        clickableClass: `${i}-clickable`,
                        lockClass: `${i}-lock`,
                        horizontalClass: `${i}-horizontal`,
                        verticalClass: `${i}-vertical`,
                        paginationDisabledClass: `${i}-disabled`
                    }
                }), e.pagination = {
                    el: null,
                    $el: null,
                    bullets: []
                };
                let a = 0;

                function o() {
                    return !e.params.pagination.el || !e.pagination.el || !e.pagination.$el || 0 === e.pagination.$el.length
                }

                function l(t, n) {
                    const {
                        bulletActiveClass: s
                    } = e.params.pagination;
                    t[n]().addClass(`${s}-${n}`)[n]().addClass(`${s}-${n}-${n}`)
                }

                function c() {
                    const t = e.rtl,
                        n = e.params.pagination;
                    if (o()) return;
                    const i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        c = e.pagination.$el;
                    let d;
                    const u = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                    if (e.params.loop ? (d = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup), d > i - 1 - 2 * e.loopedSlides && (d -= i - 2 * e.loopedSlides), d > u - 1 && (d -= u), d < 0 && "bullets" !== e.params.paginationType && (d = u + d)) : d = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === n.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                        const s = e.pagination.bullets;
                        let i, o, u;
                        if (n.dynamicBullets && (r = s.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), c.css(e.isHorizontal() ? "width" : "height", r * (n.dynamicMainBullets + 4) + "px"), n.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (a += d - (e.previousIndex - e.loopedSlides || 0), a > n.dynamicMainBullets - 1 ? a = n.dynamicMainBullets - 1 : a < 0 && (a = 0)), i = Math.max(d - a, 0), o = i + (Math.min(s.length, n.dynamicMainBullets) - 1), u = (o + i) / 2), s.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e => `${n.bulletActiveClass}${e}`)).join(" ")), c.length > 1) s.each((e => {
                            const t = g(e),
                                s = t.index();
                            s === d && t.addClass(n.bulletActiveClass), n.dynamicBullets && (s >= i && s <= o && t.addClass(`${n.bulletActiveClass}-main`), s === i && l(t, "prev"), s === o && l(t, "next"))
                        }));
                        else {
                            const t = s.eq(d),
                                r = t.index();
                            if (t.addClass(n.bulletActiveClass), n.dynamicBullets) {
                                const t = s.eq(i),
                                    a = s.eq(o);
                                for (let e = i; e <= o; e += 1) s.eq(e).addClass(`${n.bulletActiveClass}-main`);
                                if (e.params.loop)
                                    if (r >= s.length) {
                                        for (let e = n.dynamicMainBullets; e >= 0; e -= 1) s.eq(s.length - e).addClass(`${n.bulletActiveClass}-main`);
                                        s.eq(s.length - n.dynamicMainBullets - 1).addClass(`${n.bulletActiveClass}-prev`)
                                    } else l(t, "prev"), l(a, "next");
                                else l(t, "prev"), l(a, "next")
                            }
                        }
                        if (n.dynamicBullets) {
                            const i = Math.min(s.length, n.dynamicMainBullets + 4),
                                a = (r * i - r) / 2 - u * r,
                                o = t ? "right" : "left";
                            s.css(e.isHorizontal() ? o : "top", `${a}px`)
                        }
                    }
                    if ("fraction" === n.type && (c.find(ne(n.currentClass)).text(n.formatFractionCurrent(d + 1)), c.find(ne(n.totalClass)).text(n.formatFractionTotal(u))), "progressbar" === n.type) {
                        let t;
                        t = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                        const s = (d + 1) / u;
                        let i = 1,
                            r = 1;
                        "horizontal" === t ? i = s : r = s, c.find(ne(n.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${r})`).transition(e.params.speed)
                    }
                    "custom" === n.type && n.renderCustom ? (c.html(n.renderCustom(e, d + 1, u)), s("paginationRender", c[0])) : s("paginationUpdate", c[0]), e.params.watchOverflow && e.enabled && c[e.isLocked ? "addClass" : "removeClass"](n.lockClass)
                }

                function d() {
                    const t = e.params.pagination;
                    if (o()) return;
                    const n = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        i = e.pagination.$el;
                    let r = "";
                    if ("bullets" === t.type) {
                        let s = e.params.loop ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
                        e.params.freeMode && e.params.freeMode.enabled && !e.params.loop && s > n && (s = n);
                        for (let n = 0; n < s; n += 1) t.renderBullet ? r += t.renderBullet.call(e, n, t.bulletClass) : r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
                        i.html(r), e.pagination.bullets = i.find(ne(t.bulletClass))
                    }
                    "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`, i.html(r)), "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, i.html(r)), "custom" !== t.type && s("paginationRender", e.pagination.$el[0])
                }

                function u() {
                    e.params.pagination = te(e, e.originalParams.pagination, e.params.pagination, {
                        el: "swiper-pagination"
                    });
                    const t = e.params.pagination;
                    if (!t.el) return;
                    let n = g(t.el);
                    0 !== n.length && (e.params.uniqueNavElements && "string" == typeof t.el && n.length > 1 && (n = e.$el.find(t.el), n.length > 1 && (n = n.filter((t => g(t).parents(".swiper")[0] === e.el)))), "bullets" === t.type && t.clickable && n.addClass(t.clickableClass), n.addClass(t.modifierClass + t.type), n.addClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass), "bullets" === t.type && t.dynamicBullets && (n.addClass(`${t.modifierClass}${t.type}-dynamic`), a = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && n.addClass(t.progressbarOppositeClass), t.clickable && n.on("click", ne(t.bulletClass), (function(t) {
                        t.preventDefault();
                        let n = g(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (n += e.loopedSlides), e.slideTo(n)
                    })), Object.assign(e.pagination, {
                        $el: n,
                        el: n[0]
                    }), e.enabled || n.addClass(t.lockClass))
                }

                function p() {
                    const t = e.params.pagination;
                    if (o()) return;
                    const n = e.pagination.$el;
                    n.removeClass(t.hiddenClass), n.removeClass(t.modifierClass + t.type), n.removeClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass), e.pagination.bullets && e.pagination.bullets.removeClass && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && n.off("click", ne(t.bulletClass))
                }
                n("init", (() => {
                    !1 === e.params.pagination.enabled ? f() : (u(), d(), c())
                })), n("activeIndexChange", (() => {
                    (e.params.loop || void 0 === e.snapIndex) && c()
                })), n("snapIndexChange", (() => {
                    e.params.loop || c()
                })), n("slidesLengthChange", (() => {
                    e.params.loop && (d(), c())
                })), n("snapGridLengthChange", (() => {
                    e.params.loop || (d(), c())
                })), n("destroy", (() => {
                    p()
                })), n("enable disable", (() => {
                    const {
                        $el: t
                    } = e.pagination;
                    t && t[e.enabled ? "removeClass" : "addClass"](e.params.pagination.lockClass)
                })), n("lock unlock", (() => {
                    c()
                })), n("click", ((t, n) => {
                    const i = n.target,
                        {
                            $el: r
                        } = e.pagination;
                    if (e.params.pagination.el && e.params.pagination.hideOnClick && r && r.length > 0 && !g(i).hasClass(e.params.pagination.bulletClass)) {
                        if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
                        const t = r.hasClass(e.params.pagination.hiddenClass);
                        s(!0 === t ? "paginationShow" : "paginationHide"), r.toggleClass(e.params.pagination.hiddenClass)
                    }
                }));
                const f = () => {
                    e.$el.addClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass), p()
                };
                Object.assign(e.pagination, {
                    enable: () => {
                        e.$el.removeClass(e.params.pagination.paginationDisabledClass), e.pagination.$el && e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass), u(), d(), c()
                    },
                    disable: f,
                    render: d,
                    update: c,
                    init: u,
                    destroy: p
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = a();
                let r, o, l, c, d = !1,
                    u = null,
                    p = null;

                function f() {
                    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
                    const {
                        scrollbar: t,
                        rtlTranslate: n,
                        progress: s
                    } = e, {
                        $dragEl: i,
                        $el: r
                    } = t, a = e.params.scrollbar;
                    let c = o,
                        d = (l - o) * s;
                    n ? (d = -d, d > 0 ? (c = o - d, d = 0) : -d + o > l && (c = l + d)) : d < 0 ? (c = o + d, d = 0) : d + o > l && (c = l - d), e.isHorizontal() ? (i.transform(`translate3d(${d}px, 0, 0)`), i[0].style.width = `${c}px`) : (i.transform(`translate3d(0px, ${d}px, 0)`), i[0].style.height = `${c}px`), a.hide && (clearTimeout(u), r[0].style.opacity = 1, u = setTimeout((() => {
                        r[0].style.opacity = 0, r.transition(400)
                    }), 1e3))
                }

                function h() {
                    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
                    const {
                        scrollbar: t
                    } = e, {
                        $dragEl: n,
                        $el: s
                    } = t;
                    n[0].style.width = "", n[0].style.height = "", l = e.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight, c = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), o = "auto" === e.params.scrollbar.dragSize ? l * c : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? n[0].style.width = `${o}px` : n[0].style.height = `${o}px`, s[0].style.display = c >= 1 ? "none" : "", e.params.scrollbar.hide && (s[0].style.opacity = 0), e.params.watchOverflow && e.enabled && t.$el[e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
                }

                function m(t) {
                    return e.isHorizontal() ? "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientX : t.clientX : "touchstart" === t.type || "touchmove" === t.type ? t.targetTouches[0].clientY : t.clientY
                }

                function b(t) {
                    const {
                        scrollbar: n,
                        rtlTranslate: s
                    } = e, {
                        $el: i
                    } = n;
                    let a;
                    a = (m(t) - i.offset()[e.isHorizontal() ? "left" : "top"] - (null !== r ? r : o / 2)) / (l - o), a = Math.max(Math.min(a, 1), 0), s && (a = 1 - a);
                    const c = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * a;
                    e.updateProgress(c), e.setTranslate(c), e.updateActiveIndex(), e.updateSlidesClasses()
                }

                function y(t) {
                    const n = e.params.scrollbar,
                        {
                            scrollbar: i,
                            $wrapperEl: a
                        } = e,
                        {
                            $el: o,
                            $dragEl: l
                        } = i;
                    d = !0, r = t.target === l[0] || t.target === l ? m(t) - t.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, t.preventDefault(), t.stopPropagation(), a.transition(100), l.transition(100), b(t), clearTimeout(p), o.transition(0), n.hide && o.css("opacity", 1), e.params.cssMode && e.$wrapperEl.css("scroll-snap-type", "none"), s("scrollbarDragStart", t)
                }

                function w(t) {
                    const {
                        scrollbar: n,
                        $wrapperEl: i
                    } = e, {
                        $el: r,
                        $dragEl: a
                    } = n;
                    d && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, b(t), i.transition(0), r.transition(0), a.transition(0), s("scrollbarDragMove", t))
                }

                function x(t) {
                    const n = e.params.scrollbar,
                        {
                            scrollbar: i,
                            $wrapperEl: r
                        } = e,
                        {
                            $el: a
                        } = i;
                    d && (d = !1, e.params.cssMode && (e.$wrapperEl.css("scroll-snap-type", ""), r.transition("")), n.hide && (clearTimeout(p), p = v((() => {
                        a.css("opacity", 0), a.transition(400)
                    }), 1e3)), s("scrollbarDragEnd", t), n.snapOnRelease && e.slideToClosest())
                }

                function E(t) {
                    const {
                        scrollbar: n,
                        touchEventsTouch: s,
                        touchEventsDesktop: r,
                        params: a,
                        support: o
                    } = e, l = n.$el;
                    if (!l) return;
                    const c = l[0],
                        d = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        u = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    if (!c) return;
                    const p = "on" === t ? "addEventListener" : "removeEventListener";
                    o.touch ? (c[p](s.start, y, d), c[p](s.move, w, d), c[p](s.end, x, u)) : (c[p](r.start, y, d), i[p](r.move, w, d), i[p](r.end, x, u))
                }

                function _() {
                    const {
                        scrollbar: t,
                        $el: n
                    } = e;
                    e.params.scrollbar = te(e, e.originalParams.scrollbar, e.params.scrollbar, {
                        el: "swiper-scrollbar"
                    });
                    const s = e.params.scrollbar;
                    if (!s.el) return;
                    let i = g(s.el);
                    e.params.uniqueNavElements && "string" == typeof s.el && i.length > 1 && 1 === n.find(s.el).length && (i = n.find(s.el)), i.addClass(e.isHorizontal() ? s.horizontalClass : s.verticalClass);
                    let r = i.find(`.${e.params.scrollbar.dragClass}`);
                    0 === r.length && (r = g(`<div class="${e.params.scrollbar.dragClass}"></div>`), i.append(r)), Object.assign(t, {
                        $el: i,
                        el: i[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), s.draggable && e.params.scrollbar.el && e.scrollbar.el && E("on"), i && i[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
                }

                function C() {
                    const t = e.params.scrollbar,
                        n = e.scrollbar.$el;
                    n && n.removeClass(e.isHorizontal() ? t.horizontalClass : t.verticalClass), e.params.scrollbar.el && e.scrollbar.el && E("off")
                }
                t({
                    scrollbar: {
                        el: null,
                        dragSize: "auto",
                        hide: !1,
                        draggable: !1,
                        snapOnRelease: !0,
                        lockClass: "swiper-scrollbar-lock",
                        dragClass: "swiper-scrollbar-drag",
                        scrollbarDisabledClass: "swiper-scrollbar-disabled",
                        horizontalClass: "swiper-scrollbar-horizontal",
                        verticalClass: "swiper-scrollbar-vertical"
                    }
                }), e.scrollbar = {
                    el: null,
                    dragEl: null,
                    $el: null,
                    $dragEl: null
                }, n("init", (() => {
                    !1 === e.params.scrollbar.enabled ? S() : (_(), h(), f())
                })), n("update resize observerUpdate lock unlock", (() => {
                    h()
                })), n("setTranslate", (() => {
                    f()
                })), n("setTransition", ((t, n) => {
                    ! function(t) {
                        e.params.scrollbar.el && e.scrollbar.el && e.scrollbar.$dragEl.transition(t)
                    }(n)
                })), n("enable disable", (() => {
                    const {
                        $el: t
                    } = e.scrollbar;
                    t && t[e.enabled ? "removeClass" : "addClass"](e.params.scrollbar.lockClass)
                })), n("destroy", (() => {
                    C()
                }));
                const S = () => {
                    e.$el.addClass(e.params.scrollbar.scrollbarDisabledClass), e.scrollbar.$el && e.scrollbar.$el.addClass(e.params.scrollbar.scrollbarDisabledClass), C()
                };
                Object.assign(e.scrollbar, {
                    enable: () => {
                        e.$el.removeClass(e.params.scrollbar.scrollbarDisabledClass), e.scrollbar.$el && e.scrollbar.$el.removeClass(e.params.scrollbar.scrollbarDisabledClass), _(), h(), f()
                    },
                    disable: S,
                    updateSize: h,
                    setTranslate: f,
                    init: _,
                    destroy: C
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    parallax: {
                        enabled: !1
                    }
                });
                const s = (t, n) => {
                        const {
                            rtl: s
                        } = e, i = g(t), r = s ? -1 : 1, a = i.attr("data-swiper-parallax") || "0";
                        let o = i.attr("data-swiper-parallax-x"),
                            l = i.attr("data-swiper-parallax-y");
                        const c = i.attr("data-swiper-parallax-scale"),
                            d = i.attr("data-swiper-parallax-opacity");
                        if (o || l ? (o = o || "0", l = l || "0") : e.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * n * r + "%" : o * n * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * n + "%" : l * n + "px", null != d) {
                            const e = d - (d - 1) * (1 - Math.abs(n));
                            i[0].style.opacity = e
                        }
                        if (null == c) i.transform(`translate3d(${o}, ${l}, 0px)`);
                        else {
                            const e = c - (c - 1) * (1 - Math.abs(n));
                            i.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`)
                        }
                    },
                    i = () => {
                        const {
                            $el: t,
                            slides: n,
                            progress: i,
                            snapGrid: r
                        } = e;
                        t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
                            s(e, i)
                        })), n.each(((t, n) => {
                            let a = t.progress;
                            e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (a += Math.ceil(n / 2) - i * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), g(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
                                s(e, a)
                            }))
                        }))
                    };
                n("beforeInit", (() => {
                    e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
                })), n("init", (() => {
                    e.params.parallax.enabled && i()
                })), n("setTranslate", (() => {
                    e.params.parallax.enabled && i()
                })), n("setTransition", ((t, n) => {
                    e.params.parallax.enabled && ((t = e.params.speed) => {
                        const {
                            $el: n
                        } = e;
                        n.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e => {
                            const n = g(e);
                            let s = parseInt(n.attr("data-swiper-parallax-duration"), 10) || t;
                            0 === t && (s = 0), n.transition(s)
                        }))
                    })(n)
                }))
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                const i = l();
                t({
                    zoom: {
                        enabled: !1,
                        maxRatio: 3,
                        minRatio: 1,
                        toggle: !0,
                        containerClass: "swiper-zoom-container",
                        zoomedSlideClass: "swiper-slide-zoomed"
                    }
                }), e.zoom = {
                    enabled: !1
                };
                let r, a, o, c = 1,
                    d = !1;
                const u = {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    p = {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    f = {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    };
                let h = 1;

                function m(e) {
                    if (e.targetTouches.length < 2) return 1;
                    const t = e.targetTouches[0].pageX,
                        n = e.targetTouches[0].pageY,
                        s = e.targetTouches[1].pageX,
                        i = e.targetTouches[1].pageY;
                    return Math.sqrt((s - t) ** 2 + (i - n) ** 2)
                }

                function v(t) {
                    const n = e.support,
                        s = e.params.zoom;
                    if (a = !1, o = !1, !n.gestures) {
                        if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
                        a = !0, u.scaleStart = m(t)
                    }
                    u.$slideEl && u.$slideEl.length || (u.$slideEl = g(t.target).closest(`.${e.params.slideClass}`), 0 === u.$slideEl.length && (u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${s.containerClass}`), u.maxRatio = u.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, 0 !== u.$imageWrapEl.length) ? (u.$imageEl && u.$imageEl.transition(0), d = !0) : u.$imageEl = void 0
                }

                function b(t) {
                    const n = e.support,
                        s = e.params.zoom,
                        i = e.zoom;
                    if (!n.gestures) {
                        if ("touchmove" !== t.type || "touchmove" === t.type && t.targetTouches.length < 2) return;
                        o = !0, u.scaleMove = m(t)
                    }
                    u.$imageEl && 0 !== u.$imageEl.length ? (n.gestures ? i.scale = t.scale * c : i.scale = u.scaleMove / u.scaleStart * c, i.scale > u.maxRatio && (i.scale = u.maxRatio - 1 + (i.scale - u.maxRatio + 1) ** .5), i.scale < s.minRatio && (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** .5), u.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === t.type && v(t)
                }

                function w(t) {
                    const n = e.device,
                        s = e.support,
                        i = e.params.zoom,
                        r = e.zoom;
                    if (!s.gestures) {
                        if (!a || !o) return;
                        if ("touchend" !== t.type || "touchend" === t.type && t.changedTouches.length < 2 && !n.android) return;
                        a = !1, o = !1
                    }
                    u.$imageEl && 0 !== u.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, u.maxRatio), i.minRatio), u.$imageEl.transition(e.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), c = r.scale, d = !1, 1 === r.scale && (u.$slideEl = void 0))
                }

                function x(t) {
                    const n = e.zoom;
                    if (!u.$imageEl || 0 === u.$imageEl.length) return;
                    if (e.allowClick = !1, !p.isTouched || !u.$slideEl) return;
                    p.isMoved || (p.width = u.$imageEl[0].offsetWidth, p.height = u.$imageEl[0].offsetHeight, p.startX = y(u.$imageWrapEl[0], "x") || 0, p.startY = y(u.$imageWrapEl[0], "y") || 0, u.slideWidth = u.$slideEl[0].offsetWidth, u.slideHeight = u.$slideEl[0].offsetHeight, u.$imageWrapEl.transition(0));
                    const s = p.width * n.scale,
                        i = p.height * n.scale;
                    if (!(s < u.slideWidth && i < u.slideHeight)) {
                        if (p.minX = Math.min(u.slideWidth / 2 - s / 2, 0), p.maxX = -p.minX, p.minY = Math.min(u.slideHeight / 2 - i / 2, 0), p.maxY = -p.minY, p.touchesCurrent.x = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, p.touchesCurrent.y = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, !p.isMoved && !d) {
                            if (e.isHorizontal() && (Math.floor(p.minX) === Math.floor(p.startX) && p.touchesCurrent.x < p.touchesStart.x || Math.floor(p.maxX) === Math.floor(p.startX) && p.touchesCurrent.x > p.touchesStart.x)) return void(p.isTouched = !1);
                            if (!e.isHorizontal() && (Math.floor(p.minY) === Math.floor(p.startY) && p.touchesCurrent.y < p.touchesStart.y || Math.floor(p.maxY) === Math.floor(p.startY) && p.touchesCurrent.y > p.touchesStart.y)) return void(p.isTouched = !1)
                        }
                        t.cancelable && t.preventDefault(), t.stopPropagation(), p.isMoved = !0, p.currentX = p.touchesCurrent.x - p.touchesStart.x + p.startX, p.currentY = p.touchesCurrent.y - p.touchesStart.y + p.startY, p.currentX < p.minX && (p.currentX = p.minX + 1 - (p.minX - p.currentX + 1) ** .8), p.currentX > p.maxX && (p.currentX = p.maxX - 1 + (p.currentX - p.maxX + 1) ** .8), p.currentY < p.minY && (p.currentY = p.minY + 1 - (p.minY - p.currentY + 1) ** .8), p.currentY > p.maxY && (p.currentY = p.maxY - 1 + (p.currentY - p.maxY + 1) ** .8), f.prevPositionX || (f.prevPositionX = p.touchesCurrent.x), f.prevPositionY || (f.prevPositionY = p.touchesCurrent.y), f.prevTime || (f.prevTime = Date.now()), f.x = (p.touchesCurrent.x - f.prevPositionX) / (Date.now() - f.prevTime) / 2, f.y = (p.touchesCurrent.y - f.prevPositionY) / (Date.now() - f.prevTime) / 2, Math.abs(p.touchesCurrent.x - f.prevPositionX) < 2 && (f.x = 0), Math.abs(p.touchesCurrent.y - f.prevPositionY) < 2 && (f.y = 0), f.prevPositionX = p.touchesCurrent.x, f.prevPositionY = p.touchesCurrent.y, f.prevTime = Date.now(), u.$imageWrapEl.transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`)
                    }
                }

                function E() {
                    const t = e.zoom;
                    u.$slideEl && e.previousIndex !== e.activeIndex && (u.$imageEl && u.$imageEl.transform("translate3d(0,0,0) scale(1)"), u.$imageWrapEl && u.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, c = 1, u.$slideEl = void 0, u.$imageEl = void 0, u.$imageWrapEl = void 0)
                }

                function _(t) {
                    const n = e.zoom,
                        s = e.params.zoom;
                    if (u.$slideEl || (t && t.target && (u.$slideEl = g(t.target).closest(`.${e.params.slideClass}`)), u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex)), u.$imageEl = u.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${s.containerClass}`)), !u.$imageEl || 0 === u.$imageEl.length || !u.$imageWrapEl || 0 === u.$imageWrapEl.length) return;
                    let r, a, o, l, d, f, h, m, v, b, y, w, x, E, _, C, S, $;
                    e.params.cssMode && (e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.touchAction = "none"), u.$slideEl.addClass(`${s.zoomedSlideClass}`), void 0 === p.touchesStart.x && t ? (r = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, a = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (r = p.touchesStart.x, a = p.touchesStart.y), n.scale = u.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, c = u.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio, t ? (S = u.$slideEl[0].offsetWidth, $ = u.$slideEl[0].offsetHeight, o = u.$slideEl.offset().left + i.scrollX, l = u.$slideEl.offset().top + i.scrollY, d = o + S / 2 - r, f = l + $ / 2 - a, v = u.$imageEl[0].offsetWidth, b = u.$imageEl[0].offsetHeight, y = v * n.scale, w = b * n.scale, x = Math.min(S / 2 - y / 2, 0), E = Math.min($ / 2 - w / 2, 0), _ = -x, C = -E, h = d * n.scale, m = f * n.scale, h < x && (h = x), h > _ && (h = _), m < E && (m = E), m > C && (m = C)) : (h = 0, m = 0), u.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${m}px,0)`), u.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${n.scale})`)
                }

                function C() {
                    const t = e.zoom,
                        n = e.params.zoom;
                    u.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? u.$slideEl = e.$wrapperEl.children(`.${e.params.slideActiveClass}`) : u.$slideEl = e.slides.eq(e.activeIndex), u.$imageEl = u.$slideEl.find(`.${n.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), u.$imageWrapEl = u.$imageEl.parent(`.${n.containerClass}`)), u.$imageEl && 0 !== u.$imageEl.length && u.$imageWrapEl && 0 !== u.$imageWrapEl.length && (e.params.cssMode && (e.wrapperEl.style.overflow = "", e.wrapperEl.style.touchAction = ""), t.scale = 1, c = 1, u.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), u.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), u.$slideEl.removeClass(`${n.zoomedSlideClass}`), u.$slideEl = void 0)
                }

                function S(t) {
                    const n = e.zoom;
                    n.scale && 1 !== n.scale ? C() : _(t)
                }

                function $() {
                    const t = e.support;
                    return {
                        passiveListener: !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        activeListenerWithCapture: !t.passiveListener || {
                            passive: !1,
                            capture: !0
                        }
                    }
                }

                function T() {
                    return `.${e.params.slideClass}`
                }

                function M(t) {
                    const {
                        passiveListener: n
                    } = $(), s = T();
                    e.$wrapperEl[t]("gesturestart", s, v, n), e.$wrapperEl[t]("gesturechange", s, b, n), e.$wrapperEl[t]("gestureend", s, w, n)
                }

                function z() {
                    r || (r = !0, M("on"))
                }

                function P() {
                    r && (r = !1, M("off"))
                }

                function A() {
                    const t = e.zoom;
                    if (t.enabled) return;
                    t.enabled = !0;
                    const n = e.support,
                        {
                            passiveListener: s,
                            activeListenerWithCapture: i
                        } = $(),
                        r = T();
                    n.gestures ? (e.$wrapperEl.on(e.touchEvents.start, z, s), e.$wrapperEl.on(e.touchEvents.end, P, s)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, v, s), e.$wrapperEl.on(e.touchEvents.move, r, b, i), e.$wrapperEl.on(e.touchEvents.end, r, w, s), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, w, s)), e.$wrapperEl.on(e.touchEvents.move, `.${e.params.zoom.containerClass}`, x, i)
                }

                function k() {
                    const t = e.zoom;
                    if (!t.enabled) return;
                    const n = e.support;
                    t.enabled = !1;
                    const {
                        passiveListener: s,
                        activeListenerWithCapture: i
                    } = $(), r = T();
                    n.gestures ? (e.$wrapperEl.off(e.touchEvents.start, z, s), e.$wrapperEl.off(e.touchEvents.end, P, s)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, v, s), e.$wrapperEl.off(e.touchEvents.move, r, b, i), e.$wrapperEl.off(e.touchEvents.end, r, w, s), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, w, s)), e.$wrapperEl.off(e.touchEvents.move, `.${e.params.zoom.containerClass}`, x, i)
                }
                Object.defineProperty(e.zoom, "scale", {
                    get() {
                        return h
                    },
                    set(e) {
                        if (h !== e) {
                            const t = u.$imageEl ? u.$imageEl[0] : void 0,
                                n = u.$slideEl ? u.$slideEl[0] : void 0;
                            s("zoomChange", e, t, n)
                        }
                        h = e
                    }
                }), n("init", (() => {
                    e.params.zoom.enabled && A()
                })), n("destroy", (() => {
                    k()
                })), n("touchStart", ((t, n) => {
                    e.zoom.enabled && function(t) {
                        const n = e.device;
                        u.$imageEl && 0 !== u.$imageEl.length && (p.isTouched || (n.android && t.cancelable && t.preventDefault(), p.isTouched = !0, p.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, p.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                    }(n)
                })), n("touchEnd", ((t, n) => {
                    e.zoom.enabled && function() {
                        const t = e.zoom;
                        if (!u.$imageEl || 0 === u.$imageEl.length) return;
                        if (!p.isTouched || !p.isMoved) return p.isTouched = !1, void(p.isMoved = !1);
                        p.isTouched = !1, p.isMoved = !1;
                        let n = 300,
                            s = 300;
                        const i = f.x * n,
                            r = p.currentX + i,
                            a = f.y * s,
                            o = p.currentY + a;
                        0 !== f.x && (n = Math.abs((r - p.currentX) / f.x)), 0 !== f.y && (s = Math.abs((o - p.currentY) / f.y));
                        const l = Math.max(n, s);
                        p.currentX = r, p.currentY = o;
                        const c = p.width * t.scale,
                            d = p.height * t.scale;
                        p.minX = Math.min(u.slideWidth / 2 - c / 2, 0), p.maxX = -p.minX, p.minY = Math.min(u.slideHeight / 2 - d / 2, 0), p.maxY = -p.minY, p.currentX = Math.max(Math.min(p.currentX, p.maxX), p.minX), p.currentY = Math.max(Math.min(p.currentY, p.maxY), p.minY), u.$imageWrapEl.transition(l).transform(`translate3d(${p.currentX}px, ${p.currentY}px,0)`)
                    }()
                })), n("doubleTap", ((t, n) => {
                    !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && S(n)
                })), n("transitionEnd", (() => {
                    e.zoom.enabled && e.params.zoom.enabled && E()
                })), n("slideChange", (() => {
                    e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && E()
                })), Object.assign(e.zoom, {
                    enable: A,
                    disable: k,
                    in: _,
                    out: C,
                    toggle: S
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                t({
                    lazy: {
                        checkInView: !1,
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        scrollingElement: "",
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader"
                    }
                }), e.lazy = {};
                let i = !1,
                    r = !1;

                function a(t, n = !0) {
                    const i = e.params.lazy;
                    if (void 0 === t) return;
                    if (0 === e.slides.length) return;
                    const r = e.virtual && e.params.virtual.enabled ? e.$wrapperEl.children(`.${e.params.slideClass}[data-swiper-slide-index="${t}"]`) : e.slides.eq(t),
                        o = r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
                    !r.hasClass(i.elementClass) || r.hasClass(i.loadedClass) || r.hasClass(i.loadingClass) || o.push(r[0]), 0 !== o.length && o.each((t => {
                        const o = g(t);
                        o.addClass(i.loadingClass);
                        const l = o.attr("data-background"),
                            c = o.attr("data-src"),
                            d = o.attr("data-srcset"),
                            u = o.attr("data-sizes"),
                            p = o.parent("picture");
                        e.loadImage(o[0], c || l, d, u, !1, (() => {
                            if (null != e && e && (!e || e.params) && !e.destroyed) {
                                if (l ? (o.css("background-image", `url("${l}")`), o.removeAttr("data-background")) : (d && (o.attr("srcset", d), o.removeAttr("data-srcset")), u && (o.attr("sizes", u), o.removeAttr("data-sizes")), p.length && p.children("source").each((e => {
                                        const t = g(e);
                                        t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                                    })), c && (o.attr("src", c), o.removeAttr("data-src"))), o.addClass(i.loadedClass).removeClass(i.loadingClass), r.find(`.${i.preloaderClass}`).remove(), e.params.loop && n) {
                                    const t = r.attr("data-swiper-slide-index");
                                    if (r.hasClass(e.params.slideDuplicateClass)) {
                                        a(e.$wrapperEl.children(`[data-swiper-slide-index="${t}"]:not(.${e.params.slideDuplicateClass})`).index(), !1)
                                    } else {
                                        a(e.$wrapperEl.children(`.${e.params.slideDuplicateClass}[data-swiper-slide-index="${t}"]`).index(), !1)
                                    }
                                }
                                s("lazyImageReady", r[0], o[0]), e.params.autoHeight && e.updateAutoHeight()
                            }
                        })), s("lazyImageLoad", r[0], o[0])
                    }))
                }

                function o() {
                    const {
                        $wrapperEl: t,
                        params: n,
                        slides: s,
                        activeIndex: i
                    } = e, o = e.virtual && n.virtual.enabled, l = n.lazy;
                    let c = n.slidesPerView;

                    function d(e) {
                        if (o) {
                            if (t.children(`.${n.slideClass}[data-swiper-slide-index="${e}"]`).length) return !0
                        } else if (s[e]) return !0;
                        return !1
                    }

                    function u(e) {
                        return o ? g(e).attr("data-swiper-slide-index") : g(e).index()
                    }
                    if ("auto" === c && (c = 0), r || (r = !0), e.params.watchSlidesProgress) t.children(`.${n.slideVisibleClass}`).each((e => {
                        a(o ? g(e).attr("data-swiper-slide-index") : g(e).index())
                    }));
                    else if (c > 1)
                        for (let e = i; e < i + c; e += 1) d(e) && a(e);
                    else a(i);
                    if (l.loadPrevNext)
                        if (c > 1 || l.loadPrevNextAmount && l.loadPrevNextAmount > 1) {
                            const e = l.loadPrevNextAmount,
                                t = Math.ceil(c),
                                n = Math.min(i + t + Math.max(e, t), s.length),
                                r = Math.max(i - Math.max(t, e), 0);
                            for (let e = i + t; e < n; e += 1) d(e) && a(e);
                            for (let e = r; e < i; e += 1) d(e) && a(e)
                        } else {
                            const e = t.children(`.${n.slideNextClass}`);
                            e.length > 0 && a(u(e));
                            const s = t.children(`.${n.slidePrevClass}`);
                            s.length > 0 && a(u(s))
                        }
                }

                function c() {
                    const t = l();
                    if (!e || e.destroyed) return;
                    const n = e.params.lazy.scrollingElement ? g(e.params.lazy.scrollingElement) : g(t),
                        s = n[0] === t,
                        r = s ? t.innerWidth : n[0].offsetWidth,
                        a = s ? t.innerHeight : n[0].offsetHeight,
                        d = e.$el.offset(),
                        {
                            rtlTranslate: u
                        } = e;
                    let p = !1;
                    u && (d.left -= e.$el[0].scrollLeft);
                    const f = [
                        [d.left, d.top],
                        [d.left + e.width, d.top],
                        [d.left, d.top + e.height],
                        [d.left + e.width, d.top + e.height]
                    ];
                    for (let e = 0; e < f.length; e += 1) {
                        const t = f[e];
                        if (t[0] >= 0 && t[0] <= r && t[1] >= 0 && t[1] <= a) {
                            if (0 === t[0] && 0 === t[1]) continue;
                            p = !0
                        }
                    }
                    const h = !("touchstart" !== e.touchEvents.start || !e.support.passiveListener || !e.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    };
                    p ? (o(), n.off("scroll", c, h)) : i || (i = !0, n.on("scroll", c, h))
                }
                n("beforeInit", (() => {
                    e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
                })), n("init", (() => {
                    e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : o())
                })), n("scroll", (() => {
                    e.params.freeMode && e.params.freeMode.enabled && !e.params.freeMode.sticky && o()
                })), n("scrollbarDragMove resize _freeModeNoMomentumRelease", (() => {
                    e.params.lazy.enabled && (e.params.lazy.checkInView ? c() : o())
                })), n("transitionStart", (() => {
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !r) && (e.params.lazy.checkInView ? c() : o())
                })), n("transitionEnd", (() => {
                    e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && (e.params.lazy.checkInView ? c() : o())
                })), n("slideChange", (() => {
                    const {
                        lazy: t,
                        cssMode: n,
                        watchSlidesProgress: s,
                        touchReleaseOnEdges: i,
                        resistanceRatio: r
                    } = e.params;
                    t.enabled && (n || s && (i || 0 === r)) && o()
                })), n("destroy", (() => {
                    e.$el && e.$el.find(`.${e.params.lazy.loadingClass}`).removeClass(e.params.lazy.loadingClass)
                })), Object.assign(e.lazy, {
                    load: o,
                    loadInSlide: a
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                function s(e, t) {
                    const n = function() {
                        let e, t, n;
                        return (s, i) => {
                            for (t = -1, e = s.length; e - t > 1;) n = e + t >> 1, s[n] <= i ? t = n : e = n;
                            return e
                        }
                    }();
                    let s, i;
                    return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                        return e ? (i = n(this.x, e), s = i - 1, (e - this.x[s]) * (this.y[i] - this.y[s]) / (this.x[i] - this.x[s]) + this.y[s]) : 0
                    }, this
                }

                function i() {
                    e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
                }
                t({
                    controller: {
                        control: void 0,
                        inverse: !1,
                        by: "slide"
                    }
                }), e.controller = {
                    control: void 0
                }, n("beforeInit", (() => {
                    e.controller.control = e.params.controller.control
                })), n("update", (() => {
                    i()
                })), n("resize", (() => {
                    i()
                })), n("observerUpdate", (() => {
                    i()
                })), n("setTranslate", ((t, n, s) => {
                    e.controller.control && e.controller.setTranslate(n, s)
                })), n("setTransition", ((t, n, s) => {
                    e.controller.control && e.controller.setTransition(n, s)
                })), Object.assign(e.controller, {
                    setTranslate: function(t, n) {
                        const i = e.controller.control;
                        let r, a;
                        const o = e.constructor;

                        function l(t) {
                            const n = e.rtlTranslate ? -e.translate : e.translate;
                            "slide" === e.params.controller.by && (! function(t) {
                                e.controller.spline || (e.controller.spline = e.params.loop ? new s(e.slidesGrid, t.slidesGrid) : new s(e.snapGrid, t.snapGrid))
                            }(t), a = -e.controller.spline.interpolate(-n)), a && "container" !== e.params.controller.by || (r = (t.maxTranslate() - t.minTranslate()) / (e.maxTranslate() - e.minTranslate()), a = (n - e.minTranslate()) * r + t.minTranslate()), e.params.controller.inverse && (a = t.maxTranslate() - a), t.updateProgress(a), t.setTranslate(a, e), t.updateActiveIndex(), t.updateSlidesClasses()
                        }
                        if (Array.isArray(i))
                            for (let e = 0; e < i.length; e += 1) i[e] !== n && i[e] instanceof o && l(i[e]);
                        else i instanceof o && n !== i && l(i)
                    },
                    setTransition: function(t, n) {
                        const s = e.constructor,
                            i = e.controller.control;
                        let r;

                        function a(n) {
                            n.setTransition(t, e), 0 !== t && (n.transitionStart(), n.params.autoHeight && v((() => {
                                n.updateAutoHeight()
                            })), n.$wrapperEl.transitionEnd((() => {
                                i && (n.params.loop && "slide" === e.params.controller.by && n.loopFix(), n.transitionEnd())
                            })))
                        }
                        if (Array.isArray(i))
                            for (r = 0; r < i.length; r += 1) i[r] !== n && i[r] instanceof s && a(i[r]);
                        else i instanceof s && n !== i && a(i)
                    }
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                        slideLabelMessage: "{{index}} / {{slidesLength}}",
                        containerMessage: null,
                        containerRoleDescriptionMessage: null,
                        itemRoleDescriptionMessage: null,
                        slideRole: "group",
                        id: null
                    }
                }), e.a11y = {
                    clicked: !1
                };
                let s = null;

                function i(e) {
                    const t = s;
                    0 !== t.length && (t.html(""), t.html(e))
                }

                function r(e) {
                    e.attr("tabIndex", "0")
                }

                function a(e) {
                    e.attr("tabIndex", "-1")
                }

                function o(e, t) {
                    e.attr("role", t)
                }

                function l(e, t) {
                    e.attr("aria-roledescription", t)
                }

                function c(e, t) {
                    e.attr("aria-label", t)
                }

                function d(e) {
                    e.attr("aria-disabled", !0)
                }

                function u(e) {
                    e.attr("aria-disabled", !1)
                }

                function p(t) {
                    if (13 !== t.keyCode && 32 !== t.keyCode) return;
                    const n = e.params.a11y,
                        s = g(t.target);
                    e.navigation && e.navigation.$nextEl && s.is(e.navigation.$nextEl) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? i(n.lastSlideMessage) : i(n.nextSlideMessage)), e.navigation && e.navigation.$prevEl && s.is(e.navigation.$prevEl) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? i(n.firstSlideMessage) : i(n.prevSlideMessage)), e.pagination && s.is(ne(e.params.pagination.bulletClass)) && s[0].click()
                }

                function f() {
                    return e.pagination && e.pagination.bullets && e.pagination.bullets.length
                }

                function h() {
                    return f() && e.params.pagination.clickable
                }
                const m = (e, t, n) => {
                        r(e), "BUTTON" !== e[0].tagName && (o(e, "button"), e.on("keydown", p)), c(e, n),
                            function(e, t) {
                                e.attr("aria-controls", t)
                            }(e, t)
                    },
                    v = () => {
                        e.a11y.clicked = !0
                    },
                    b = () => {
                        requestAnimationFrame((() => {
                            requestAnimationFrame((() => {
                                e.destroyed || (e.a11y.clicked = !1)
                            }))
                        }))
                    },
                    y = t => {
                        if (e.a11y.clicked) return;
                        const n = t.target.closest(`.${e.params.slideClass}`);
                        if (!n || !e.slides.includes(n)) return;
                        const s = e.slides.indexOf(n) === e.activeIndex,
                            i = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(n);
                        s || i || t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, e.slideTo(e.slides.indexOf(n), 0))
                    },
                    w = () => {
                        const t = e.params.a11y;
                        t.itemRoleDescriptionMessage && l(g(e.slides), t.itemRoleDescriptionMessage), t.slideRole && o(g(e.slides), t.slideRole);
                        const n = e.params.loop ? e.slides.filter((t => !t.classList.contains(e.params.slideDuplicateClass))).length : e.slides.length;
                        t.slideLabelMessage && e.slides.each(((s, i) => {
                            const r = g(s),
                                a = e.params.loop ? parseInt(r.attr("data-swiper-slide-index"), 10) : i;
                            c(r, t.slideLabelMessage.replace(/\{\{index\}\}/, a + 1).replace(/\{\{slidesLength\}\}/, n))
                        }))
                    },
                    x = () => {
                        const t = e.params.a11y;
                        e.$el.append(s);
                        const n = e.$el;
                        t.containerRoleDescriptionMessage && l(n, t.containerRoleDescriptionMessage), t.containerMessage && c(n, t.containerMessage);
                        const i = e.$wrapperEl,
                            r = t.id || i.attr("id") || `swiper-wrapper-${function(e=16){return"x".repeat(e).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}(16)}`,
                            a = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
                        var o;
                        let d, u;
                        o = r, i.attr("id", o),
                            function(e, t) {
                                e.attr("aria-live", t)
                            }(i, a), w(), e.navigation && e.navigation.$nextEl && (d = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (u = e.navigation.$prevEl), d && d.length && m(d, r, t.nextSlideMessage), u && u.length && m(u, r, t.prevSlideMessage), h() && e.pagination.$el.on("keydown", ne(e.params.pagination.bulletClass), p), e.$el.on("focus", y, !0), e.$el.on("pointerdown", v, !0), e.$el.on("pointerup", b, !0)
                    };
                n("beforeInit", (() => {
                    s = g(`<span class="${e.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
                })), n("afterInit", (() => {
                    e.params.a11y.enabled && x()
                })), n("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (() => {
                    e.params.a11y.enabled && w()
                })), n("fromEdge toEdge afterInit lock unlock", (() => {
                    e.params.a11y.enabled && function() {
                        if (e.params.loop || e.params.rewind || !e.navigation) return;
                        const {
                            $nextEl: t,
                            $prevEl: n
                        } = e.navigation;
                        n && n.length > 0 && (e.isBeginning ? (d(n), a(n)) : (u(n), r(n))), t && t.length > 0 && (e.isEnd ? (d(t), a(t)) : (u(t), r(t)))
                    }()
                })), n("paginationUpdate", (() => {
                    e.params.a11y.enabled && function() {
                        const t = e.params.a11y;
                        f() && e.pagination.bullets.each((n => {
                            const s = g(n);
                            e.params.pagination.clickable && (r(s), e.params.pagination.renderBullet || (o(s, "button"), c(s, t.paginationBulletMessage.replace(/\{\{index\}\}/, s.index() + 1)))), s.is(`.${e.params.pagination.bulletActiveClass}`) ? s.attr("aria-current", "true") : s.removeAttr("aria-current")
                        }))
                    }()
                })), n("destroy", (() => {
                    e.params.a11y.enabled && function() {
                        let t, n;
                        s && s.length > 0 && s.remove(), e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (n = e.navigation.$prevEl), t && t.off("keydown", p), n && n.off("keydown", p), h() && e.pagination.$el.off("keydown", ne(e.params.pagination.bulletClass), p), e.$el.off("focus", y, !0), e.$el.off("pointerdown", v, !0), e.$el.off("pointerup", b, !0)
                    }()
                }))
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    history: {
                        enabled: !1,
                        root: "",
                        replaceState: !1,
                        key: "slides",
                        keepQuery: !1
                    }
                });
                let s = !1,
                    i = {};
                const r = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
                    a = e => {
                        const t = l();
                        let n;
                        n = e ? new URL(e) : t.location;
                        const s = n.pathname.slice(1).split("/").filter((e => "" !== e)),
                            i = s.length;
                        return {
                            key: s[i - 2],
                            value: s[i - 1]
                        }
                    },
                    o = (t, n) => {
                        const i = l();
                        if (!s || !e.params.history.enabled) return;
                        let a;
                        a = e.params.url ? new URL(e.params.url) : i.location;
                        const o = e.slides.eq(n);
                        let c = r(o.attr("data-history"));
                        if (e.params.history.root.length > 0) {
                            let n = e.params.history.root;
                            "/" === n[n.length - 1] && (n = n.slice(0, n.length - 1)), c = `${n}/${t}/${c}`
                        } else a.pathname.includes(t) || (c = `${t}/${c}`);
                        e.params.history.keepQuery && (c += a.search);
                        const d = i.history.state;
                        d && d.value === c || (e.params.history.replaceState ? i.history.replaceState({
                            value: c
                        }, null, c) : i.history.pushState({
                            value: c
                        }, null, c))
                    },
                    c = (t, n, s) => {
                        if (n)
                            for (let i = 0, a = e.slides.length; i < a; i += 1) {
                                const a = e.slides.eq(i);
                                if (r(a.attr("data-history")) === n && !a.hasClass(e.params.slideDuplicateClass)) {
                                    const n = a.index();
                                    e.slideTo(n, t, s)
                                }
                            } else e.slideTo(0, t, s)
                    },
                    d = () => {
                        i = a(e.params.url), c(e.params.speed, i.value, !1)
                    };
                n("init", (() => {
                    e.params.history.enabled && (() => {
                        const t = l();
                        if (e.params.history) {
                            if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
                            s = !0, i = a(e.params.url), (i.key || i.value) && (c(0, i.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", d))
                        }
                    })()
                })), n("destroy", (() => {
                    e.params.history.enabled && (() => {
                        const t = l();
                        e.params.history.replaceState || t.removeEventListener("popstate", d)
                    })()
                })), n("transitionEnd _freeModeNoMomentumRelease", (() => {
                    s && o(e.params.history.key, e.activeIndex)
                })), n("slideChange", (() => {
                    s && e.params.cssMode && o(e.params.history.key, e.activeIndex)
                }))
            }, function({
                swiper: e,
                extendParams: t,
                emit: n,
                on: s
            }) {
                let i = !1;
                const r = a(),
                    o = l();
                t({
                    hashNavigation: {
                        enabled: !1,
                        replaceState: !1,
                        watchState: !1
                    }
                });
                const c = () => {
                        n("hashChange");
                        const t = r.location.hash.replace("#", "");
                        if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) {
                            const n = e.$wrapperEl.children(`.${e.params.slideClass}[data-hash="${t}"]`).index();
                            if (void 0 === n) return;
                            e.slideTo(n)
                        }
                    },
                    d = () => {
                        if (i && e.params.hashNavigation.enabled)
                            if (e.params.hashNavigation.replaceState && o.history && o.history.replaceState) o.history.replaceState(null, null, `#${e.slides.eq(e.activeIndex).attr("data-hash")}` || ""), n("hashSet");
                            else {
                                const t = e.slides.eq(e.activeIndex),
                                    s = t.attr("data-hash") || t.attr("data-history");
                                r.location.hash = s || "", n("hashSet")
                            }
                    };
                s("init", (() => {
                    e.params.hashNavigation.enabled && (() => {
                        if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled) return;
                        i = !0;
                        const t = r.location.hash.replace("#", "");
                        if (t) {
                            const n = 0;
                            for (let s = 0, i = e.slides.length; s < i; s += 1) {
                                const i = e.slides.eq(s);
                                if ((i.attr("data-hash") || i.attr("data-history")) === t && !i.hasClass(e.params.slideDuplicateClass)) {
                                    const t = i.index();
                                    e.slideTo(t, n, e.params.runCallbacksOnInit, !0)
                                }
                            }
                        }
                        e.params.hashNavigation.watchState && g(o).on("hashchange", c)
                    })()
                })), s("destroy", (() => {
                    e.params.hashNavigation.enabled && e.params.hashNavigation.watchState && g(o).off("hashchange", c)
                })), s("transitionEnd _freeModeNoMomentumRelease", (() => {
                    i && d()
                })), s("slideChange", (() => {
                    i && e.params.cssMode && d()
                }))
            }, function({
                swiper: e,
                extendParams: t,
                on: n,
                emit: s
            }) {
                let i;

                function r() {
                    if (!e.size) return e.autoplay.running = !1, void(e.autoplay.paused = !1);
                    const t = e.slides.eq(e.activeIndex);
                    let n = e.params.autoplay.delay;
                    t.attr("data-swiper-autoplay") && (n = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(i), i = v((() => {
                        let t;
                        e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), s("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? l() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), s("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), s("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), s("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? l() : (t = e.slideTo(0, e.params.speed, !0, !0), s("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), s("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && r()
                    }), n)
                }

                function o() {
                    return void 0 === i && (!e.autoplay.running && (e.autoplay.running = !0, s("autoplayStart"), r(), !0))
                }

                function l() {
                    return !!e.autoplay.running && (void 0 !== i && (i && (clearTimeout(i), i = void 0), e.autoplay.running = !1, s("autoplayStop"), !0))
                }

                function c(t) {
                    e.autoplay.running && (e.autoplay.paused || (i && clearTimeout(i), e.autoplay.paused = !0, 0 !== t && e.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].addEventListener(t, u)
                    })) : (e.autoplay.paused = !1, r())))
                }

                function d() {
                    const t = a();
                    "hidden" === t.visibilityState && e.autoplay.running && c(), "visible" === t.visibilityState && e.autoplay.paused && (r(), e.autoplay.paused = !1)
                }

                function u(t) {
                    e && !e.destroyed && e.$wrapperEl && t.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].removeEventListener(t, u)
                    })), e.autoplay.paused = !1, e.autoplay.running ? r() : l())
                }

                function p() {
                    e.params.autoplay.disableOnInteraction ? l() : (s("autoplayPause"), c()), ["transitionend", "webkitTransitionEnd"].forEach((t => {
                        e.$wrapperEl[0].removeEventListener(t, u)
                    }))
                }

                function f() {
                    e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1, s("autoplayResume"), r())
                }
                e.autoplay = {
                    running: !1,
                    paused: !1
                }, t({
                    autoplay: {
                        enabled: !1,
                        delay: 3e3,
                        waitForTransition: !0,
                        disableOnInteraction: !0,
                        stopOnLastSlide: !1,
                        reverseDirection: !1,
                        pauseOnMouseEnter: !1
                    }
                }), n("init", (() => {
                    if (e.params.autoplay.enabled) {
                        o();
                        a().addEventListener("visibilitychange", d), e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", p), e.$el.on("mouseleave", f))
                    }
                })), n("beforeTransitionStart", ((t, n, s) => {
                    e.autoplay.running && (s || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(n) : l())
                })), n("sliderFirstMove", (() => {
                    e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : c())
                })), n("touchEnd", (() => {
                    e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && r()
                })), n("destroy", (() => {
                    e.$el.off("mouseenter", p), e.$el.off("mouseleave", f), e.autoplay.running && l();
                    a().removeEventListener("visibilitychange", d)
                })), Object.assign(e.autoplay, {
                    pause: c,
                    run: r,
                    start: o,
                    stop: l
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    thumbs: {
                        swiper: null,
                        multipleActiveThumbs: !0,
                        autoScrollOffset: 0,
                        slideThumbActiveClass: "swiper-slide-thumb-active",
                        thumbsContainerClass: "swiper-thumbs"
                    }
                });
                let s = !1,
                    i = !1;

                function r() {
                    const t = e.thumbs.swiper;
                    if (!t || t.destroyed) return;
                    const n = t.clickedIndex,
                        s = t.clickedSlide;
                    if (s && g(s).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
                    if (null == n) return;
                    let i;
                    if (i = t.params.loop ? parseInt(g(t.clickedSlide).attr("data-swiper-slide-index"), 10) : n, e.params.loop) {
                        let t = e.activeIndex;
                        e.slides.eq(t).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, t = e.activeIndex);
                        const n = e.slides.eq(t).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index(),
                            s = e.slides.eq(t).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();
                        i = void 0 === n ? s : void 0 === s ? n : s - t < t - n ? s : n
                    }
                    e.slideTo(i)
                }

                function a() {
                    const {
                        thumbs: t
                    } = e.params;
                    if (s) return !1;
                    s = !0;
                    const n = e.constructor;
                    if (t.swiper instanceof n) e.thumbs.swiper = t.swiper, Object.assign(e.thumbs.swiper.originalParams, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    }), Object.assign(e.thumbs.swiper.params, {
                        watchSlidesProgress: !0,
                        slideToClickedSlide: !1
                    });
                    else if (w(t.swiper)) {
                        const s = Object.assign({}, t.swiper);
                        Object.assign(s, {
                            watchSlidesProgress: !0,
                            slideToClickedSlide: !1
                        }), e.thumbs.swiper = new n(s), i = !0
                    }
                    return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", r), !0
                }

                function o(t) {
                    const n = e.thumbs.swiper;
                    if (!n || n.destroyed) return;
                    const s = "auto" === n.params.slidesPerView ? n.slidesPerViewDynamic() : n.params.slidesPerView;
                    let i = 1;
                    const r = e.params.thumbs.slideThumbActiveClass;
                    if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (i = e.params.slidesPerView), e.params.thumbs.multipleActiveThumbs || (i = 1), i = Math.floor(i), n.slides.removeClass(r), n.params.loop || n.params.virtual && n.params.virtual.enabled)
                        for (let t = 0; t < i; t += 1) n.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex+t}"]`).addClass(r);
                    else
                        for (let t = 0; t < i; t += 1) n.slides.eq(e.realIndex + t).addClass(r);
                    const a = e.params.thumbs.autoScrollOffset,
                        o = a && !n.params.loop;
                    if (e.realIndex !== n.realIndex || o) {
                        let i, r, l = n.activeIndex;
                        if (n.params.loop) {
                            n.slides.eq(l).hasClass(n.params.slideDuplicateClass) && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, l = n.activeIndex);
                            const t = n.slides.eq(l).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index(),
                                s = n.slides.eq(l).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
                            i = void 0 === t ? s : void 0 === s ? t : s - l == l - t ? n.params.slidesPerGroup > 1 ? s : l : s - l < l - t ? s : t, r = e.activeIndex > e.previousIndex ? "next" : "prev"
                        } else i = e.realIndex, r = i > e.previousIndex ? "next" : "prev";
                        o && (i += "next" === r ? a : -1 * a), n.visibleSlidesIndexes && n.visibleSlidesIndexes.indexOf(i) < 0 && (n.params.centeredSlides ? i = i > l ? i - Math.floor(s / 2) + 1 : i + Math.floor(s / 2) - 1 : i > l && n.params.slidesPerGroup, n.slideTo(i, t ? 0 : void 0))
                    }
                }
                e.thumbs = {
                    swiper: null
                }, n("beforeInit", (() => {
                    const {
                        thumbs: t
                    } = e.params;
                    t && t.swiper && (a(), o(!0))
                })), n("slideChange update resize observerUpdate", (() => {
                    o()
                })), n("setTransition", ((t, n) => {
                    const s = e.thumbs.swiper;
                    s && !s.destroyed && s.setTransition(n)
                })), n("beforeDestroy", (() => {
                    const t = e.thumbs.swiper;
                    t && !t.destroyed && i && t.destroy()
                })), Object.assign(e.thumbs, {
                    init: a,
                    update: o
                })
            }, function({
                swiper: e,
                extendParams: t,
                emit: n,
                once: s
            }) {
                t({
                    freeMode: {
                        enabled: !1,
                        momentum: !0,
                        momentumRatio: 1,
                        momentumBounce: !0,
                        momentumBounceRatio: 1,
                        momentumVelocityRatio: 1,
                        sticky: !1,
                        minimumVelocity: .02
                    }
                }), Object.assign(e, {
                    freeMode: {
                        onTouchStart: function() {
                            const t = e.getTranslate();
                            e.setTranslate(t), e.setTransition(0), e.touchEventsData.velocities.length = 0, e.freeMode.onTouchEnd({
                                currentPos: e.rtl ? e.translate : -e.translate
                            })
                        },
                        onTouchMove: function() {
                            const {
                                touchEventsData: t,
                                touches: n
                            } = e;
                            0 === t.velocities.length && t.velocities.push({
                                position: n[e.isHorizontal() ? "startX" : "startY"],
                                time: t.touchStartTime
                            }), t.velocities.push({
                                position: n[e.isHorizontal() ? "currentX" : "currentY"],
                                time: b()
                            })
                        },
                        onTouchEnd: function({
                            currentPos: t
                        }) {
                            const {
                                params: i,
                                $wrapperEl: r,
                                rtlTranslate: a,
                                snapGrid: o,
                                touchEventsData: l
                            } = e, c = b() - l.touchStartTime;
                            if (t < -e.minTranslate()) e.slideTo(e.activeIndex);
                            else if (t > -e.maxTranslate()) e.slides.length < o.length ? e.slideTo(o.length - 1) : e.slideTo(e.slides.length - 1);
                            else {
                                if (i.freeMode.momentum) {
                                    if (l.velocities.length > 1) {
                                        const t = l.velocities.pop(),
                                            n = l.velocities.pop(),
                                            s = t.position - n.position,
                                            r = t.time - n.time;
                                        e.velocity = s / r, e.velocity /= 2, Math.abs(e.velocity) < i.freeMode.minimumVelocity && (e.velocity = 0), (r > 150 || b() - t.time > 300) && (e.velocity = 0)
                                    } else e.velocity = 0;
                                    e.velocity *= i.freeMode.momentumVelocityRatio, l.velocities.length = 0;
                                    let t = 1e3 * i.freeMode.momentumRatio;
                                    const c = e.velocity * t;
                                    let d = e.translate + c;
                                    a && (d = -d);
                                    let u, p = !1;
                                    const f = 20 * Math.abs(e.velocity) * i.freeMode.momentumBounceRatio;
                                    let h;
                                    if (d < e.maxTranslate()) i.freeMode.momentumBounce ? (d + e.maxTranslate() < -f && (d = e.maxTranslate() - f), u = e.maxTranslate(), p = !0, l.allowMomentumBounce = !0) : d = e.maxTranslate(), i.loop && i.centeredSlides && (h = !0);
                                    else if (d > e.minTranslate()) i.freeMode.momentumBounce ? (d - e.minTranslate() > f && (d = e.minTranslate() + f), u = e.minTranslate(), p = !0, l.allowMomentumBounce = !0) : d = e.minTranslate(), i.loop && i.centeredSlides && (h = !0);
                                    else if (i.freeMode.sticky) {
                                        let t;
                                        for (let e = 0; e < o.length; e += 1)
                                            if (o[e] > -d) {
                                                t = e;
                                                break
                                            } d = Math.abs(o[t] - d) < Math.abs(o[t - 1] - d) || "next" === e.swipeDirection ? o[t] : o[t - 1], d = -d
                                    }
                                    if (h && s("transitionEnd", (() => {
                                            e.loopFix()
                                        })), 0 !== e.velocity) {
                                        if (t = a ? Math.abs((-d - e.translate) / e.velocity) : Math.abs((d - e.translate) / e.velocity), i.freeMode.sticky) {
                                            const n = Math.abs((a ? -d : d) - e.translate),
                                                s = e.slidesSizesGrid[e.activeIndex];
                                            t = n < s ? i.speed : n < 2 * s ? 1.5 * i.speed : 2.5 * i.speed
                                        }
                                    } else if (i.freeMode.sticky) return void e.slideToClosest();
                                    i.freeMode.momentumBounce && p ? (e.updateProgress(u), e.setTransition(t), e.setTranslate(d), e.transitionStart(!0, e.swipeDirection), e.animating = !0, r.transitionEnd((() => {
                                        e && !e.destroyed && l.allowMomentumBounce && (n("momentumBounce"), e.setTransition(i.speed), setTimeout((() => {
                                            e.setTranslate(u), r.transitionEnd((() => {
                                                e && !e.destroyed && e.transitionEnd()
                                            }))
                                        }), 0))
                                    }))) : e.velocity ? (n("_freeModeNoMomentumRelease"), e.updateProgress(d), e.setTransition(t), e.setTranslate(d), e.transitionStart(!0, e.swipeDirection), e.animating || (e.animating = !0, r.transitionEnd((() => {
                                        e && !e.destroyed && e.transitionEnd()
                                    })))) : e.updateProgress(d), e.updateActiveIndex(), e.updateSlidesClasses()
                                } else {
                                    if (i.freeMode.sticky) return void e.slideToClosest();
                                    i.freeMode && n("_freeModeNoMomentumRelease")
                                }(!i.freeMode.momentum || c >= i.longSwipesMs) && (e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses())
                            }
                        }
                    }
                })
            }, function({
                swiper: e,
                extendParams: t
            }) {
                let n, s, i;
                t({
                    grid: {
                        rows: 1,
                        fill: "column"
                    }
                }), e.grid = {
                    initSlides: t => {
                        const {
                            slidesPerView: r
                        } = e.params, {
                            rows: a,
                            fill: o
                        } = e.params.grid;
                        s = n / a, i = Math.floor(t / a), n = Math.floor(t / a) === t / a ? t : Math.ceil(t / a) * a, "auto" !== r && "row" === o && (n = Math.max(n, r * a))
                    },
                    updateSlide: (t, r, a, o) => {
                        const {
                            slidesPerGroup: l,
                            spaceBetween: c
                        } = e.params, {
                            rows: d,
                            fill: u
                        } = e.params.grid;
                        let p, f, h;
                        if ("row" === u && l > 1) {
                            const e = Math.floor(t / (l * d)),
                                s = t - d * l * e,
                                i = 0 === e ? l : Math.min(Math.ceil((a - e * d * l) / d), l);
                            h = Math.floor(s / i), f = s - h * i + e * l, p = f + h * n / d, r.css({
                                "-webkit-order": p,
                                order: p
                            })
                        } else "column" === u ? (f = Math.floor(t / d), h = t - f * d, (f > i || f === i && h === d - 1) && (h += 1, h >= d && (h = 0, f += 1))) : (h = Math.floor(t / s), f = t - h * s);
                        r.css(o("margin-top"), 0 !== h ? c && `${c}px` : "")
                    },
                    updateWrapperSize: (t, s, i) => {
                        const {
                            spaceBetween: r,
                            centeredSlides: a,
                            roundLengths: o
                        } = e.params, {
                            rows: l
                        } = e.params.grid;
                        if (e.virtualSize = (t + r) * n, e.virtualSize = Math.ceil(e.virtualSize / l) - r, e.$wrapperEl.css({
                                [i("width")]: `${e.virtualSize+r}px`
                            }), a) {
                            s.splice(0, s.length);
                            const t = [];
                            for (let n = 0; n < s.length; n += 1) {
                                let i = s[n];
                                o && (i = Math.floor(i)), s[n] < e.virtualSize + s[0] && t.push(i)
                            }
                            s.push(...t)
                        }
                    }
                }
            }, function({
                swiper: e
            }) {
                Object.assign(e, {
                    appendSlide: se.bind(e),
                    prependSlide: ie.bind(e),
                    addSlide: re.bind(e),
                    removeSlide: ae.bind(e),
                    removeAllSlides: oe.bind(e)
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    fadeEffect: {
                        crossFade: !1,
                        transformEl: null
                    }
                }), le({
                    effect: "fade",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            slides: t
                        } = e, n = e.params.fadeEffect;
                        for (let s = 0; s < t.length; s += 1) {
                            const t = e.slides.eq(s);
                            let i = -t[0].swiperSlideOffset;
                            e.params.virtualTranslate || (i -= e.translate);
                            let r = 0;
                            e.isHorizontal() || (r = i, i = 0);
                            const a = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                            ce(n, t).css({
                                opacity: a
                            }).transform(`translate3d(${i}px, ${r}px, 0px)`)
                        }
                    },
                    setTransition: t => {
                        const {
                            transformEl: n
                        } = e.params.fadeEffect;
                        (n ? e.slides.find(n) : e.slides).transition(t), de({
                            swiper: e,
                            duration: t,
                            transformEl: n,
                            allSlides: !0
                        })
                    },
                    overwriteParams: () => ({
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !e.params.cssMode
                    })
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    cubeEffect: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: .94
                    }
                });
                const s = (e, t, n) => {
                    let s = n ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                        i = n ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                    0 === s.length && (s = g(`<div class="swiper-slide-shadow-${n?"left":"top"}"></div>`), e.append(s)), 0 === i.length && (i = g(`<div class="swiper-slide-shadow-${n?"right":"bottom"}"></div>`), e.append(i)), s.length && (s[0].style.opacity = Math.max(-t, 0)), i.length && (i[0].style.opacity = Math.max(t, 0))
                };
                le({
                    effect: "cube",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            $el: t,
                            $wrapperEl: n,
                            slides: i,
                            width: r,
                            height: a,
                            rtlTranslate: o,
                            size: l,
                            browser: c
                        } = e, d = e.params.cubeEffect, u = e.isHorizontal(), p = e.virtual && e.params.virtual.enabled;
                        let f, h = 0;
                        d.shadow && (u ? (f = n.find(".swiper-cube-shadow"), 0 === f.length && (f = g('<div class="swiper-cube-shadow"></div>'), n.append(f)), f.css({
                            height: `${r}px`
                        })) : (f = t.find(".swiper-cube-shadow"), 0 === f.length && (f = g('<div class="swiper-cube-shadow"></div>'), t.append(f))));
                        for (let e = 0; e < i.length; e += 1) {
                            const t = i.eq(e);
                            let n = e;
                            p && (n = parseInt(t.attr("data-swiper-slide-index"), 10));
                            let r = 90 * n,
                                a = Math.floor(r / 360);
                            o && (r = -r, a = Math.floor(-r / 360));
                            const c = Math.max(Math.min(t[0].progress, 1), -1);
                            let f = 0,
                                m = 0,
                                g = 0;
                            n % 4 == 0 ? (f = 4 * -a * l, g = 0) : (n - 1) % 4 == 0 ? (f = 0, g = 4 * -a * l) : (n - 2) % 4 == 0 ? (f = l + 4 * a * l, g = l) : (n - 3) % 4 == 0 && (f = -l, g = 3 * l + 4 * l * a), o && (f = -f), u || (m = f, f = 0);
                            const v = `rotateX(${u?0:-r}deg) rotateY(${u?r:0}deg) translate3d(${f}px, ${m}px, ${g}px)`;
                            c <= 1 && c > -1 && (h = 90 * n + 90 * c, o && (h = 90 * -n - 90 * c)), t.transform(v), d.slideShadows && s(t, c, u)
                        }
                        if (n.css({
                                "-webkit-transform-origin": `50% 50% -${l/2}px`,
                                "transform-origin": `50% 50% -${l/2}px`
                            }), d.shadow)
                            if (u) f.transform(`translate3d(0px, ${r/2+d.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${d.shadowScale})`);
                            else {
                                const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                                    t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                                    n = d.shadowScale,
                                    s = d.shadowScale / t,
                                    i = d.shadowOffset;
                                f.transform(`scale3d(${n}, 1, ${s}) translate3d(0px, ${a/2+i}px, ${-a/2/s}px) rotateX(-90deg)`)
                            } const m = c.isSafari || c.isWebView ? -l / 2 : 0;
                        n.transform(`translate3d(0px,0,${m}px) rotateX(${e.isHorizontal()?0:h}deg) rotateY(${e.isHorizontal()?-h:0}deg)`), n[0].style.setProperty("--swiper-cube-translate-z", `${m}px`)
                    },
                    setTransition: t => {
                        const {
                            $el: n,
                            slides: s
                        } = e;
                        s.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), e.params.cubeEffect.shadow && !e.isHorizontal() && n.find(".swiper-cube-shadow").transition(t)
                    },
                    recreateShadows: () => {
                        const t = e.isHorizontal();
                        e.slides.each((e => {
                            const n = Math.max(Math.min(e.progress, 1), -1);
                            s(g(e), n, t)
                        }))
                    },
                    getEffectParams: () => e.params.cubeEffect,
                    perspective: () => !0,
                    overwriteParams: () => ({
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    })
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    flipEffect: {
                        slideShadows: !0,
                        limitRotation: !0,
                        transformEl: null
                    }
                });
                const s = (t, n, s) => {
                    let i = e.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                        r = e.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === i.length && (i = ue(s, t, e.isHorizontal() ? "left" : "top")), 0 === r.length && (r = ue(s, t, e.isHorizontal() ? "right" : "bottom")), i.length && (i[0].style.opacity = Math.max(-n, 0)), r.length && (r[0].style.opacity = Math.max(n, 0))
                };
                le({
                    effect: "flip",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            slides: t,
                            rtlTranslate: n
                        } = e, i = e.params.flipEffect;
                        for (let r = 0; r < t.length; r += 1) {
                            const a = t.eq(r);
                            let o = a[0].progress;
                            e.params.flipEffect.limitRotation && (o = Math.max(Math.min(a[0].progress, 1), -1));
                            const l = a[0].swiperSlideOffset;
                            let c = -180 * o,
                                d = 0,
                                u = e.params.cssMode ? -l - e.translate : -l,
                                p = 0;
                            e.isHorizontal() ? n && (c = -c) : (p = u, u = 0, d = -c, c = 0), a[0].style.zIndex = -Math.abs(Math.round(o)) + t.length, i.slideShadows && s(a, o, i);
                            const f = `translate3d(${u}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${c}deg)`;
                            ce(i, a).transform(f)
                        }
                    },
                    setTransition: t => {
                        const {
                            transformEl: n
                        } = e.params.flipEffect;
                        (n ? e.slides.find(n) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), de({
                            swiper: e,
                            duration: t,
                            transformEl: n
                        })
                    },
                    recreateShadows: () => {
                        const t = e.params.flipEffect;
                        e.slides.each((n => {
                            const i = g(n);
                            let r = i[0].progress;
                            e.params.flipEffect.limitRotation && (r = Math.max(Math.min(n.progress, 1), -1)), s(i, r, t)
                        }))
                    },
                    getEffectParams: () => e.params.flipEffect,
                    perspective: () => !0,
                    overwriteParams: () => ({
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !e.params.cssMode
                    })
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        scale: 1,
                        modifier: 1,
                        slideShadows: !0,
                        transformEl: null
                    }
                }), le({
                    effect: "coverflow",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            width: t,
                            height: n,
                            slides: s,
                            slidesSizesGrid: i
                        } = e, r = e.params.coverflowEffect, a = e.isHorizontal(), o = e.translate, l = a ? t / 2 - o : n / 2 - o, c = a ? r.rotate : -r.rotate, d = r.depth;
                        for (let e = 0, t = s.length; e < t; e += 1) {
                            const t = s.eq(e),
                                n = i[e],
                                o = (l - t[0].swiperSlideOffset - n / 2) / n,
                                u = "function" == typeof r.modifier ? r.modifier(o) : o * r.modifier;
                            let p = a ? c * u : 0,
                                f = a ? 0 : c * u,
                                h = -d * Math.abs(u),
                                m = r.stretch;
                            "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * n);
                            let g = a ? 0 : m * u,
                                v = a ? m * u : 0,
                                b = 1 - (1 - r.scale) * Math.abs(u);
                            Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(f) < .001 && (f = 0), Math.abs(b) < .001 && (b = 0);
                            const y = `translate3d(${v}px,${g}px,${h}px)  rotateX(${f}deg) rotateY(${p}deg) scale(${b})`;
                            if (ce(r, t).transform(y), t[0].style.zIndex = 1 - Math.abs(Math.round(u)), r.slideShadows) {
                                let e = a ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                    n = a ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                0 === e.length && (e = ue(r, t, a ? "left" : "top")), 0 === n.length && (n = ue(r, t, a ? "right" : "bottom")), e.length && (e[0].style.opacity = u > 0 ? u : 0), n.length && (n[0].style.opacity = -u > 0 ? -u : 0)
                            }
                        }
                    },
                    setTransition: t => {
                        const {
                            transformEl: n
                        } = e.params.coverflowEffect;
                        (n ? e.slides.find(n) : e.slides).transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t)
                    },
                    perspective: () => !0,
                    overwriteParams: () => ({
                        watchSlidesProgress: !0
                    })
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    creativeEffect: {
                        transformEl: null,
                        limitProgress: 1,
                        shadowPerProgress: !1,
                        progressMultiplier: 1,
                        perspective: !0,
                        prev: {
                            translate: [0, 0, 0],
                            rotate: [0, 0, 0],
                            opacity: 1,
                            scale: 1
                        },
                        next: {
                            translate: [0, 0, 0],
                            rotate: [0, 0, 0],
                            opacity: 1,
                            scale: 1
                        }
                    }
                });
                const s = e => "string" == typeof e ? e : `${e}px`;
                le({
                    effect: "creative",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            slides: t,
                            $wrapperEl: n,
                            slidesSizesGrid: i
                        } = e, r = e.params.creativeEffect, {
                            progressMultiplier: a
                        } = r, o = e.params.centeredSlides;
                        if (o) {
                            const t = i[0] / 2 - e.params.slidesOffsetBefore || 0;
                            n.transform(`translateX(calc(50% - ${t}px))`)
                        }
                        for (let n = 0; n < t.length; n += 1) {
                            const i = t.eq(n),
                                l = i[0].progress,
                                c = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
                            let d = c;
                            o || (d = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
                            const u = i[0].swiperSlideOffset,
                                p = [e.params.cssMode ? -u - e.translate : -u, 0, 0],
                                f = [0, 0, 0];
                            let h = !1;
                            e.isHorizontal() || (p[1] = p[0], p[0] = 0);
                            let m = {
                                translate: [0, 0, 0],
                                rotate: [0, 0, 0],
                                scale: 1,
                                opacity: 1
                            };
                            c < 0 ? (m = r.next, h = !0) : c > 0 && (m = r.prev, h = !0), p.forEach(((e, t) => {
                                p[t] = `calc(${e}px + (${s(m.translate[t])} * ${Math.abs(c*a)}))`
                            })), f.forEach(((e, t) => {
                                f[t] = m.rotate[t] * Math.abs(c * a)
                            })), i[0].style.zIndex = -Math.abs(Math.round(l)) + t.length;
                            const g = p.join(", "),
                                v = `rotateX(${f[0]}deg) rotateY(${f[1]}deg) rotateZ(${f[2]}deg)`,
                                b = d < 0 ? `scale(${1+(1-m.scale)*d*a})` : `scale(${1-(1-m.scale)*d*a})`,
                                y = d < 0 ? 1 + (1 - m.opacity) * d * a : 1 - (1 - m.opacity) * d * a,
                                w = `translate3d(${g}) ${v} ${b}`;
                            if (h && m.shadow || !h) {
                                let e = i.children(".swiper-slide-shadow");
                                if (0 === e.length && m.shadow && (e = ue(r, i)), e.length) {
                                    const t = r.shadowPerProgress ? c * (1 / r.limitProgress) : c;
                                    e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                                }
                            }
                            const x = ce(r, i);
                            x.transform(w).css({
                                opacity: y
                            }), m.origin && x.css("transform-origin", m.origin)
                        }
                    },
                    setTransition: t => {
                        const {
                            transformEl: n
                        } = e.params.creativeEffect;
                        (n ? e.slides.find(n) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), de({
                            swiper: e,
                            duration: t,
                            transformEl: n,
                            allSlides: !0
                        })
                    },
                    perspective: () => e.params.creativeEffect.perspective,
                    overwriteParams: () => ({
                        watchSlidesProgress: !0,
                        virtualTranslate: !e.params.cssMode
                    })
                })
            }, function({
                swiper: e,
                extendParams: t,
                on: n
            }) {
                t({
                    cardsEffect: {
                        slideShadows: !0,
                        transformEl: null,
                        rotate: !0,
                        perSlideRotate: 2,
                        perSlideOffset: 8
                    }
                }), le({
                    effect: "cards",
                    swiper: e,
                    on: n,
                    setTranslate: () => {
                        const {
                            slides: t,
                            activeIndex: n
                        } = e, s = e.params.cardsEffect, {
                            startTranslate: i,
                            isTouched: r
                        } = e.touchEventsData, a = e.translate;
                        for (let o = 0; o < t.length; o += 1) {
                            const l = t.eq(o),
                                c = l[0].progress,
                                d = Math.min(Math.max(c, -4), 4);
                            let u = l[0].swiperSlideOffset;
                            e.params.centeredSlides && !e.params.cssMode && e.$wrapperEl.transform(`translateX(${e.minTranslate()}px)`), e.params.centeredSlides && e.params.cssMode && (u -= t[0].swiperSlideOffset);
                            let p = e.params.cssMode ? -u - e.translate : -u,
                                f = 0;
                            const h = -100 * Math.abs(d);
                            let m = 1,
                                g = -s.perSlideRotate * d,
                                v = s.perSlideOffset - .75 * Math.abs(d);
                            const b = e.virtual && e.params.virtual.enabled ? e.virtual.from + o : o,
                                y = (b === n || b === n - 1) && d > 0 && d < 1 && (r || e.params.cssMode) && a < i,
                                w = (b === n || b === n + 1) && d < 0 && d > -1 && (r || e.params.cssMode) && a > i;
                            if (y || w) {
                                const e = (1 - Math.abs((Math.abs(d) - .5) / .5)) ** .5;
                                g += -28 * d * e, m += -.5 * e, v += 96 * e, f = -25 * e * Math.abs(d) + "%"
                            }
                            if (p = d < 0 ? `calc(${p}px + (${v*Math.abs(d)}%))` : d > 0 ? `calc(${p}px + (-${v*Math.abs(d)}%))` : `${p}px`, !e.isHorizontal()) {
                                const e = f;
                                f = p, p = e
                            }
                            const x = d < 0 ? "" + (1 + (1 - m) * d) : "" + (1 - (1 - m) * d),
                                E = `\n        translate3d(${p}, ${f}, ${h}px)\n        rotateZ(${s.rotate?g:0}deg)\n        scale(${x})\n      `;
                            if (s.slideShadows) {
                                let e = l.find(".swiper-slide-shadow");
                                0 === e.length && (e = ue(s, l)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(d) - .5) / .5, 0), 1))
                            }
                            l[0].style.zIndex = -Math.abs(Math.round(c)) + t.length;
                            ce(s, l).transform(E)
                        }
                    },
                    setTransition: t => {
                        const {
                            transformEl: n
                        } = e.params.cardsEffect;
                        (n ? e.slides.find(n) : e.slides).transition(t).find(".swiper-slide-shadow").transition(t), de({
                            swiper: e,
                            duration: t,
                            transformEl: n
                        })
                    },
                    perspective: () => !0,
                    overwriteParams: () => ({
                        watchSlidesProgress: !0,
                        virtualTranslate: !e.params.cssMode
                    })
                })
            }];
            ee.use(pe)
        }
    }
]);