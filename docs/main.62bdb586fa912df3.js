"use strict";
(self.webpackChunkmyFlix_Angular_client =
  self.webpackChunkmyFlix_Angular_client || []).push([
  [179],
  {
    873: () => {
      function ce(n) {
        return "function" == typeof n;
      }
      function Wo(n) {
        const e = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (e.prototype = Object.create(Error.prototype)),
          (e.prototype.constructor = e),
          e
        );
      }
      const Aa = Wo(
        (n) =>
          function (e) {
            n(this),
              (this.message = e
                ? `${e.length} errors occurred during unsubscription:\n${e
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = e);
          }
      );
      function Fr(n, t) {
        if (n) {
          const e = n.indexOf(t);
          0 <= e && n.splice(e, 1);
        }
      }
      class ct {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: e } = this;
            if (e)
              if (((this._parentage = null), Array.isArray(e)))
                for (const o of e) o.remove(this);
              else e.remove(this);
            const { initialTeardown: i } = this;
            if (ce(i))
              try {
                i();
              } catch (o) {
                t = o instanceof Aa ? o.errors : [o];
              }
            const { _finalizers: r } = this;
            if (r) {
              this._finalizers = null;
              for (const o of r)
                try {
                  $m(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Aa ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Aa(t);
          }
        }
        add(t) {
          var e;
          if (t && t !== this)
            if (this.closed) $m(t);
            else {
              if (t instanceof ct) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (e = this._finalizers) && void 0 !== e ? e : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: e } = this;
          return e === t || (Array.isArray(e) && e.includes(t));
        }
        _addParent(t) {
          const { _parentage: e } = this;
          this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
        }
        _removeParent(t) {
          const { _parentage: e } = this;
          e === t ? (this._parentage = null) : Array.isArray(e) && Fr(e, t);
        }
        remove(t) {
          const { _finalizers: e } = this;
          e && Fr(e, t), t instanceof ct && t._removeParent(this);
        }
      }
      ct.EMPTY = (() => {
        const n = new ct();
        return (n.closed = !0), n;
      })();
      const Hm = ct.EMPTY;
      function Um(n) {
        return (
          n instanceof ct ||
          (n && "closed" in n && ce(n.remove) && ce(n.add) && ce(n.unsubscribe))
        );
      }
      function $m(n) {
        ce(n) ? n() : n.unsubscribe();
      }
      const zi = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ta = {
          setTimeout(n, t, ...e) {
            const { delegate: i } = Ta;
            return i?.setTimeout
              ? i.setTimeout(n, t, ...e)
              : setTimeout(n, t, ...e);
          },
          clearTimeout(n) {
            const { delegate: t } = Ta;
            return (t?.clearTimeout || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function zm(n) {
        Ta.setTimeout(() => {
          const { onUnhandledError: t } = zi;
          if (!t) throw n;
          t(n);
        });
      }
      function Iu() {}
      const yS = xu("C", void 0, void 0);
      function xu(n, t, e) {
        return { kind: n, value: t, error: e };
      }
      let Gi = null;
      function Ia(n) {
        if (zi.useDeprecatedSynchronousErrorHandling) {
          const t = !Gi;
          if ((t && (Gi = { errorThrown: !1, error: null }), n(), t)) {
            const { errorThrown: e, error: i } = Gi;
            if (((Gi = null), e)) throw i;
          }
        } else n();
      }
      class Ru extends ct {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Um(t) && t.add(this))
              : (this.destination = MS);
        }
        static create(t, e, i) {
          return new qo(t, e, i);
        }
        next(t) {
          this.isStopped
            ? Fu(
                (function bS(n) {
                  return xu("N", n, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Fu(
                (function vS(n) {
                  return xu("E", void 0, n);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Fu(yS, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const DS = Function.prototype.bind;
      function ku(n, t) {
        return DS.call(n, t);
      }
      class wS {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: e } = this;
          if (e.next)
            try {
              e.next(t);
            } catch (i) {
              xa(i);
            }
        }
        error(t) {
          const { partialObserver: e } = this;
          if (e.error)
            try {
              e.error(t);
            } catch (i) {
              xa(i);
            }
          else xa(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (e) {
              xa(e);
            }
        }
      }
      class qo extends Ru {
        constructor(t, e, i) {
          let r;
          if ((super(), ce(t) || !t))
            r = {
              next: t ?? void 0,
              error: e ?? void 0,
              complete: i ?? void 0,
            };
          else {
            let o;
            this && zi.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: t.next && ku(t.next, o),
                  error: t.error && ku(t.error, o),
                  complete: t.complete && ku(t.complete, o),
                }))
              : (r = t);
          }
          this.destination = new wS(r);
        }
      }
      function xa(n) {
        zi.useDeprecatedSynchronousErrorHandling
          ? (function CS(n) {
              zi.useDeprecatedSynchronousErrorHandling &&
                Gi &&
                ((Gi.errorThrown = !0), (Gi.error = n));
            })(n)
          : zm(n);
      }
      function Fu(n, t) {
        const { onStoppedNotification: e } = zi;
        e && Ta.setTimeout(() => e(n, t));
      }
      const MS = {
          closed: !0,
          next: Iu,
          error: function ES(n) {
            throw n;
          },
          complete: Iu,
        },
        Ou =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Ci(n) {
        return n;
      }
      function Gm(n) {
        return 0 === n.length
          ? Ci
          : 1 === n.length
          ? n[0]
          : function (e) {
              return n.reduce((i, r) => r(i), e);
            };
      }
      let De = (() => {
        class n {
          constructor(e) {
            e && (this._subscribe = e);
          }
          lift(e) {
            const i = new n();
            return (i.source = this), (i.operator = e), i;
          }
          subscribe(e, i, r) {
            const o = (function TS(n) {
              return (
                (n && n instanceof Ru) ||
                ((function AS(n) {
                  return n && ce(n.next) && ce(n.error) && ce(n.complete);
                })(n) &&
                  Um(n))
              );
            })(e)
              ? e
              : new qo(e, i, r);
            return (
              Ia(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (i) {
              e.error(i);
            }
          }
          forEach(e, i) {
            return new (i = Wm(i))((r, o) => {
              const s = new qo({
                next: (a) => {
                  try {
                    e(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: r,
              });
              this.subscribe(s);
            });
          }
          _subscribe(e) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(e);
          }
          [Ou]() {
            return this;
          }
          pipe(...e) {
            return Gm(e)(this);
          }
          toPromise(e) {
            return new (e = Wm(e))((i, r) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => r(s),
                () => i(o)
              );
            });
          }
        }
        return (n.create = (t) => new n(t)), n;
      })();
      function Wm(n) {
        var t;
        return null !== (t = n ?? zi.Promise) && void 0 !== t ? t : Promise;
      }
      const IS = Wo(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let te = (() => {
        class n extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(e) {
            const i = new qm(this, this);
            return (i.operator = e), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new IS();
          }
          next(e) {
            Ia(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const i of this.currentObservers) i.next(e);
              }
            });
          }
          error(e) {
            Ia(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = e);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(e);
              }
            });
          }
          complete() {
            Ia(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var e;
            return (
              (null === (e = this.observers) || void 0 === e
                ? void 0
                : e.length) > 0
            );
          }
          _trySubscribe(e) {
            return this._throwIfClosed(), super._trySubscribe(e);
          }
          _subscribe(e) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(e),
              this._innerSubscribe(e)
            );
          }
          _innerSubscribe(e) {
            const { hasError: i, isStopped: r, observers: o } = this;
            return i || r
              ? Hm
              : ((this.currentObservers = null),
                o.push(e),
                new ct(() => {
                  (this.currentObservers = null), Fr(o, e);
                }));
          }
          _checkFinalizedStatuses(e) {
            const { hasError: i, thrownError: r, isStopped: o } = this;
            i ? e.error(r) : o && e.complete();
          }
          asObservable() {
            const e = new De();
            return (e.source = this), e;
          }
        }
        return (n.create = (t, e) => new qm(t, e)), n;
      })();
      class qm extends te {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.next) ||
            void 0 === i ||
            i.call(e, t);
        }
        error(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.error) ||
            void 0 === i ||
            i.call(e, t);
        }
        complete() {
          var t, e;
          null ===
            (e =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === e ||
            e.call(t);
        }
        _subscribe(t) {
          var e, i;
          return null !==
            (i =
              null === (e = this.source) || void 0 === e
                ? void 0
                : e.subscribe(t)) && void 0 !== i
            ? i
            : Hm;
        }
      }
      function Km(n) {
        return ce(n?.lift);
      }
      function Pe(n) {
        return (t) => {
          if (Km(t))
            return t.lift(function (e) {
              try {
                return n(e, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Te(n, t, e, i, r) {
        return new xS(n, t, e, i, r);
      }
      class xS extends Ru {
        constructor(t, e, i, r, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = e
              ? function (a) {
                  try {
                    e(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: e } = this;
            super.unsubscribe(),
              !e &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function P(n, t) {
        return Pe((e, i) => {
          let r = 0;
          e.subscribe(
            Te(i, (o) => {
              i.next(n.call(t, o, r++));
            })
          );
        });
      }
      function Wi(n) {
        return this instanceof Wi ? ((this.v = n), this) : new Wi(n);
      }
      function FS(n, t, e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = e.apply(n, t || []),
          o = [];
        return (
          (r = {}),
          s("next"),
          s("throw"),
          s("return"),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function s(h) {
          i[h] &&
            (r[h] = function (f) {
              return new Promise(function (p, m) {
                o.push([h, f, p, m]) > 1 || a(h, f);
              });
            });
        }
        function a(h, f) {
          try {
            !(function l(h) {
              h.value instanceof Wi
                ? Promise.resolve(h.value.v).then(c, u)
                : d(o[0][2], h);
            })(i[h](f));
          } catch (p) {
            d(o[0][3], p);
          }
        }
        function c(h) {
          a("next", h);
        }
        function u(h) {
          a("throw", h);
        }
        function d(h, f) {
          h(f), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function OS(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var e,
          t = n[Symbol.asyncIterator];
        return t
          ? t.call(n)
          : ((n = (function Qm(n) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                e = t && n[t],
                i = 0;
              if (e) return e.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && i >= n.length && (n = void 0),
                      { value: n && n[i++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (e = {}),
            i("next"),
            i("throw"),
            i("return"),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function i(o) {
          e[o] =
            n[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = n[o](s)).done, s.value);
              });
            };
        }
      }
      const Nu = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function Xm(n) {
        return ce(n?.then);
      }
      function Jm(n) {
        return ce(n[Ou]);
      }
      function eg(n) {
        return Symbol.asyncIterator && ce(n?.[Symbol.asyncIterator]);
      }
      function tg(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const ng = (function NS() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function ig(n) {
        return ce(n?.[ng]);
      }
      function rg(n) {
        return FS(this, arguments, function* () {
          const e = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Wi(e.read());
              if (r) return yield Wi(void 0);
              yield yield Wi(i);
            }
          } finally {
            e.releaseLock();
          }
        });
      }
      function og(n) {
        return ce(n?.getReader);
      }
      function Rt(n) {
        if (n instanceof De) return n;
        if (null != n) {
          if (Jm(n))
            return (function LS(n) {
              return new De((t) => {
                const e = n[Ou]();
                if (ce(e.subscribe)) return e.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (Nu(n))
            return (function VS(n) {
              return new De((t) => {
                for (let e = 0; e < n.length && !t.closed; e++) t.next(n[e]);
                t.complete();
              });
            })(n);
          if (Xm(n))
            return (function BS(n) {
              return new De((t) => {
                n.then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                ).then(null, zm);
              });
            })(n);
          if (eg(n)) return sg(n);
          if (ig(n))
            return (function jS(n) {
              return new De((t) => {
                for (const e of n) if ((t.next(e), t.closed)) return;
                t.complete();
              });
            })(n);
          if (og(n))
            return (function HS(n) {
              return sg(rg(n));
            })(n);
        }
        throw tg(n);
      }
      function sg(n) {
        return new De((t) => {
          (function US(n, t) {
            var e, i, r, o;
            return (function RS(n, t, e, i) {
              return new (e || (e = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function r(o) {
                        return o instanceof e
                          ? o
                          : new e(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (e = OS(n); !(i = yield e.next()).done; )
                  if ((t.next(i.value), t.closed)) return;
              } catch (s) {
                r = { error: s };
              } finally {
                try {
                  i && !i.done && (o = e.return) && (yield o.call(e));
                } finally {
                  if (r) throw r.error;
                }
              }
              t.complete();
            });
          })(n, t).catch((e) => t.error(e));
        });
      }
      function Qn(n, t, e, i = 0, r = !1) {
        const o = t.schedule(function () {
          e(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(o), !r)) return o;
      }
      function it(n, t, e = 1 / 0) {
        return ce(t)
          ? it((i, r) => P((o, s) => t(i, o, r, s))(Rt(n(i, r))), e)
          : ("number" == typeof t && (e = t),
            Pe((i, r) =>
              (function $S(n, t, e, i, r, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && t.complete();
                  },
                  f = (m) => (c < i ? p(m) : l.push(m)),
                  p = (m) => {
                    o && t.next(m), c++;
                    let y = !1;
                    Rt(e(m, u++)).subscribe(
                      Te(
                        t,
                        (v) => {
                          r?.(v), o ? f(v) : t.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (c--; l.length && c < i; ) {
                                const v = l.shift();
                                s ? Qn(t, s, () => p(v)) : p(v);
                              }
                              h();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    Te(t, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(i, r, n, e)
            ));
      }
      function Or(n = 1 / 0) {
        return it(Ci, n);
      }
      const kn = new De((n) => n.complete());
      function ag(n) {
        return n && ce(n.schedule);
      }
      function Lu(n) {
        return n[n.length - 1];
      }
      function lg(n) {
        return ce(Lu(n)) ? n.pop() : void 0;
      }
      function Ko(n) {
        return ag(Lu(n)) ? n.pop() : void 0;
      }
      function cg(n, t = 0) {
        return Pe((e, i) => {
          e.subscribe(
            Te(
              i,
              (r) => Qn(i, n, () => i.next(r), t),
              () => Qn(i, n, () => i.complete(), t),
              (r) => Qn(i, n, () => i.error(r), t)
            )
          );
        });
      }
      function ug(n, t = 0) {
        return Pe((e, i) => {
          i.add(n.schedule(() => e.subscribe(i), t));
        });
      }
      function dg(n, t) {
        if (!n) throw new Error("Iterable cannot be null");
        return new De((e) => {
          Qn(e, t, () => {
            const i = n[Symbol.asyncIterator]();
            Qn(
              e,
              t,
              () => {
                i.next().then((r) => {
                  r.done ? e.complete() : e.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function $e(n, t) {
        return t
          ? (function QS(n, t) {
              if (null != n) {
                if (Jm(n))
                  return (function WS(n, t) {
                    return Rt(n).pipe(ug(t), cg(t));
                  })(n, t);
                if (Nu(n))
                  return (function KS(n, t) {
                    return new De((e) => {
                      let i = 0;
                      return t.schedule(function () {
                        i === n.length
                          ? e.complete()
                          : (e.next(n[i++]), e.closed || this.schedule());
                      });
                    });
                  })(n, t);
                if (Xm(n))
                  return (function qS(n, t) {
                    return Rt(n).pipe(ug(t), cg(t));
                  })(n, t);
                if (eg(n)) return dg(n, t);
                if (ig(n))
                  return (function YS(n, t) {
                    return new De((e) => {
                      let i;
                      return (
                        Qn(e, t, () => {
                          (i = n[ng]()),
                            Qn(
                              e,
                              t,
                              () => {
                                let r, o;
                                try {
                                  ({ value: r, done: o } = i.next());
                                } catch (s) {
                                  return void e.error(s);
                                }
                                o ? e.complete() : e.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ce(i?.return) && i.return()
                      );
                    });
                  })(n, t);
                if (og(n))
                  return (function ZS(n, t) {
                    return dg(rg(n), t);
                  })(n, t);
              }
              throw tg(n);
            })(n, t)
          : Rt(n);
      }
      function Ra(...n) {
        const t = Ko(n),
          e = (function GS(n, t) {
            return "number" == typeof Lu(n) ? n.pop() : t;
          })(n, 1 / 0),
          i = n;
        return i.length ? (1 === i.length ? Rt(i[0]) : Or(e)($e(i, t))) : kn;
      }
      function hg(n = {}) {
        const {
          connector: t = () => new te(),
          resetOnError: e = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = n;
        return (o) => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const h = () => {
              a?.unsubscribe(), (a = void 0);
            },
            f = () => {
              h(), (s = l = void 0), (u = d = !1);
            },
            p = () => {
              const m = s;
              f(), m?.unsubscribe();
            };
          return Pe((m, y) => {
            c++, !d && !u && h();
            const v = (l = l ?? t());
            y.add(() => {
              c--, 0 === c && !d && !u && (a = Vu(p, r));
            }),
              v.subscribe(y),
              !s &&
                c > 0 &&
                ((s = new qo({
                  next: (w) => v.next(w),
                  error: (w) => {
                    (d = !0), h(), (a = Vu(f, e, w)), v.error(w);
                  },
                  complete: () => {
                    (u = !0), h(), (a = Vu(f, i)), v.complete();
                  },
                })),
                Rt(m).subscribe(s));
          })(o);
        };
      }
      function Vu(n, t, ...e) {
        if (!0 === t) return void n();
        if (!1 === t) return;
        const i = new qo({
          next: () => {
            i.unsubscribe(), n();
          },
        });
        return t(...e).subscribe(i);
      }
      function be(n) {
        for (let t in n) if (n[t] === be) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Bu(n, t) {
        for (const e in t)
          t.hasOwnProperty(e) && !n.hasOwnProperty(e) && (n[e] = t[e]);
      }
      function Ce(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(Ce).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const t = n.toString();
        if (null == t) return "" + t;
        const e = t.indexOf("\n");
        return -1 === e ? t : t.substring(0, e);
      }
      function ju(n, t) {
        return null == n || "" === n
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? n
          : n + " " + t;
      }
      const XS = be({ __forward_ref__: be });
      function we(n) {
        return (
          (n.__forward_ref__ = we),
          (n.toString = function () {
            return Ce(this());
          }),
          n
        );
      }
      function H(n) {
        return Hu(n) ? n() : n;
      }
      function Hu(n) {
        return (
          "function" == typeof n &&
          n.hasOwnProperty(XS) &&
          n.__forward_ref__ === we
        );
      }
      class C extends Error {
        constructor(t, e) {
          super(
            (function ka(n, t) {
              return `NG0${Math.abs(n)}${t ? ": " + t.trim() : ""}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function z(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function Fa(n, t) {
        throw new C(-201, !1);
      }
      function Bt(n, t) {
        null == n &&
          (function ge(n, t, e, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${e} ${i} ${t} <=Actual]`)
            );
          })(t, n, null, "!=");
      }
      function M(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function ue(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Uu(n) {
        return fg(n, Oa) || fg(n, mg);
      }
      function fg(n, t) {
        return n.hasOwnProperty(t) ? n[t] : null;
      }
      function pg(n) {
        return n && (n.hasOwnProperty($u) || n.hasOwnProperty(sA))
          ? n[$u]
          : null;
      }
      const Oa = be({ ɵprov: be }),
        $u = be({ ɵinj: be }),
        mg = be({ ngInjectableDef: be }),
        sA = be({ ngInjectorDef: be });
      var L = (() => (
        ((L = L || {})[(L.Default = 0)] = "Default"),
        (L[(L.Host = 1)] = "Host"),
        (L[(L.Self = 2)] = "Self"),
        (L[(L.SkipSelf = 4)] = "SkipSelf"),
        (L[(L.Optional = 8)] = "Optional"),
        L
      ))();
      let zu;
      function tn(n) {
        const t = zu;
        return (zu = n), t;
      }
      function gg(n, t, e) {
        const i = Uu(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : e & L.Optional
          ? null
          : void 0 !== t
          ? t
          : void Fa(Ce(n));
      }
      function Di(n) {
        return { toString: n }.toString();
      }
      var gn = (() => (
          ((gn = gn || {})[(gn.OnPush = 0)] = "OnPush"),
          (gn[(gn.Default = 1)] = "Default"),
          gn
        ))(),
        _n = (() => {
          return (
            ((n = _n || (_n = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            _n
          );
          var n;
        })();
      const ye = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Pr = {},
        pe = [],
        Pa = be({ ɵcmp: be }),
        Gu = be({ ɵdir: be }),
        Wu = be({ ɵpipe: be }),
        _g = be({ ɵmod: be }),
        Jn = be({ ɵfac: be }),
        Yo = be({ __NG_ELEMENT_ID__: be });
      let lA = 0;
      function Re(n) {
        return Di(() => {
          const e = !0 === n.standalone,
            i = {},
            r = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: i,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === gn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: e,
              dependencies: (e && n.dependencies) || null,
              getStandaloneInjector: null,
              selectors: n.selectors || pe,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || _n.Emulated,
              id: "c" + lA++,
              styles: n.styles || pe,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            o = n.dependencies,
            s = n.features;
          return (
            (r.inputs = bg(n.inputs, i)),
            (r.outputs = bg(n.outputs)),
            s && s.forEach((a) => a(r)),
            (r.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(yg).filter(vg)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(Ct).filter(vg)
              : null),
            r
          );
        });
      }
      function yg(n) {
        return _e(n) || bt(n);
      }
      function vg(n) {
        return null !== n;
      }
      const uA = {};
      function he(n) {
        return Di(() => {
          const t = {
            type: n.type,
            bootstrap: n.bootstrap || pe,
            declarations: n.declarations || pe,
            imports: n.imports || pe,
            exports: n.exports || pe,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null,
          };
          return null != n.id && (uA[n.id] = n.type), t;
        });
      }
      function bg(n, t) {
        if (null == n) return Pr;
        const e = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              o = r;
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (e[r] = i),
              t && (t[r] = o);
          }
        return e;
      }
      const F = Re;
      function _e(n) {
        return n[Pa] || null;
      }
      function bt(n) {
        return n[Gu] || null;
      }
      function Ct(n) {
        return n[Wu] || null;
      }
      function jt(n, t) {
        const e = n[_g] || null;
        if (!e && !0 === t)
          throw new Error(`Type ${Ce(n)} does not have '\u0275mod' property.`);
        return e;
      }
      const J = 11;
      function Ft(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function vn(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function Yu(n) {
        return 0 != (8 & n.flags);
      }
      function Ba(n) {
        return 2 == (2 & n.flags);
      }
      function ja(n) {
        return 1 == (1 & n.flags);
      }
      function bn(n) {
        return null !== n.template;
      }
      function mA(n) {
        return 0 != (256 & n[2]);
      }
      function Qi(n, t) {
        return n.hasOwnProperty(Jn) ? n[Jn] : null;
      }
      class yA {
        constructor(t, e, i) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ot() {
        return wg;
      }
      function wg(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = bA), vA;
      }
      function vA() {
        const n = Mg(this),
          t = n?.current;
        if (t) {
          const e = n.previous;
          if (e === Pr) n.previous = t;
          else for (let i in t) e[i] = t[i];
          (n.current = null), this.ngOnChanges(t);
        }
      }
      function bA(n, t, e, i) {
        const r =
            Mg(n) ||
            (function CA(n, t) {
              return (n[Eg] = t);
            })(n, { previous: Pr, current: null }),
          o = r.current || (r.current = {}),
          s = r.previous,
          a = this.declaredInputs[e],
          l = s[a];
        (o[a] = new yA(l && l.currentValue, t, s === Pr)), (n[i] = t);
      }
      Ot.ngInherit = !0;
      const Eg = "__ngSimpleChanges__";
      function Mg(n) {
        return n[Eg] || null;
      }
      function ze(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Ha(n, t) {
        return ze(t[n]);
      }
      function on(n, t) {
        return ze(t[n.index]);
      }
      function ed(n, t) {
        return n.data[t];
      }
      function Ut(n, t) {
        const e = t[n];
        return Ft(e) ? e : e[0];
      }
      function Sg(n) {
        return 4 == (4 & n[2]);
      }
      function td(n) {
        return 64 == (64 & n[2]);
      }
      function wi(n, t) {
        return null == t ? null : n[t];
      }
      function Ag(n) {
        n[18] = 0;
      }
      function nd(n, t) {
        n[5] += t;
        let e = n,
          i = n[3];
        for (
          ;
          null !== i && ((1 === t && 1 === e[5]) || (-1 === t && 0 === e[5]));

        )
          (i[5] += t), (e = i), (i = i[3]);
      }
      const $ = { lFrame: Ng(null), bindingsEnabled: !0 };
      function Ig() {
        return $.bindingsEnabled;
      }
      function D() {
        return $.lFrame.lView;
      }
      function le() {
        return $.lFrame.tView;
      }
      function Fn(n) {
        return ($.lFrame.contextLView = n), n[8];
      }
      function On(n) {
        return ($.lFrame.contextLView = null), n;
      }
      function Ye() {
        let n = xg();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function xg() {
        return $.lFrame.currentTNode;
      }
      function Pn(n, t) {
        const e = $.lFrame;
        (e.currentTNode = n), (e.isParent = t);
      }
      function id() {
        return $.lFrame.isParent;
      }
      function rd() {
        $.lFrame.isParent = !1;
      }
      function Hr() {
        return $.lFrame.bindingIndex++;
      }
      function PA(n, t) {
        const e = $.lFrame;
        (e.bindingIndex = e.bindingRootIndex = n), od(t);
      }
      function od(n) {
        $.lFrame.currentDirectiveIndex = n;
      }
      function sd(n) {
        const t = $.lFrame.currentDirectiveIndex;
        return -1 === t ? null : n[t];
      }
      function Fg() {
        return $.lFrame.currentQueryIndex;
      }
      function ad(n) {
        $.lFrame.currentQueryIndex = n;
      }
      function LA(n) {
        const t = n[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? n[6] : null;
      }
      function Og(n, t, e) {
        if (e & L.SkipSelf) {
          let r = t,
            o = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              e & L.Host ||
              ((r = LA(o)), null === r || ((o = o[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (t = r), (n = o);
        }
        const i = ($.lFrame = Pg());
        return (i.currentTNode = t), (i.lView = n), !0;
      }
      function ld(n) {
        const t = Pg(),
          e = n[1];
        ($.lFrame = t),
          (t.currentTNode = e.firstChild),
          (t.lView = n),
          (t.tView = e),
          (t.contextLView = n),
          (t.bindingIndex = e.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Pg() {
        const n = $.lFrame,
          t = null === n ? null : n.child;
        return null === t ? Ng(n) : t;
      }
      function Ng(n) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = t), t;
      }
      function Lg() {
        const n = $.lFrame;
        return (
          ($.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Vg = Lg;
      function cd() {
        const n = Lg();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function wt() {
        return $.lFrame.selectedIndex;
      }
      function Ei(n) {
        $.lFrame.selectedIndex = n;
      }
      function Le() {
        const n = $.lFrame;
        return ed(n.tView, n.selectedIndex);
      }
      function $a(n, t) {
        for (let e = t.directiveStart, i = t.directiveEnd; e < i; e++) {
          const o = n.data[e].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (n.contentHooks || (n.contentHooks = [])).push(-e, s),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(e, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(e, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-e, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(e, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(e, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(e, u);
        }
      }
      function za(n, t, e) {
        Bg(n, t, 3, e);
      }
      function Ga(n, t, e, i) {
        (3 & n[2]) === e && Bg(n, t, e, i);
      }
      function ud(n, t) {
        let e = n[2];
        (3 & e) === t && ((e &= 2047), (e += 1), (n[2] = e));
      }
      function Bg(n, t, e, i) {
        const o = i ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != i && a >= i)) break;
          } else
            t[l] < 0 && (n[18] += 65536),
              (a < o || -1 == o) &&
                (WA(n, e, t, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function WA(n, t, e, i) {
        const r = e[i] < 0,
          o = e[i + 1],
          a = n[r ? -e[i] : e[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === t) {
            n[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class es {
        constructor(t, e, i) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = i);
        }
      }
      function Wa(n, t, e) {
        let i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if ("number" == typeof r) {
            if (0 !== r) break;
            i++;
            const o = e[i++],
              s = e[i++],
              a = e[i++];
            n.setAttribute(t, s, a, o);
          } else {
            const o = r,
              s = e[++i];
            Hg(o) ? n.setProperty(t, o, s) : n.setAttribute(t, o, s), i++;
          }
        }
        return i;
      }
      function jg(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function Hg(n) {
        return 64 === n.charCodeAt(0);
      }
      function qa(n, t) {
        if (null !== t && 0 !== t.length)
          if (null === n || 0 === n.length) n = t.slice();
          else {
            let e = -1;
            for (let i = 0; i < t.length; i++) {
              const r = t[i];
              "number" == typeof r
                ? (e = r)
                : 0 === e ||
                  Ug(n, e, r, null, -1 === e || 2 === e ? t[++i] : null);
            }
          }
        return n;
      }
      function Ug(n, t, e, i, r) {
        let o = 0,
          s = n.length;
        if (-1 === t) s = -1;
        else
          for (; o < n.length; ) {
            const a = n[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < n.length; ) {
          const a = n[o];
          if ("number" == typeof a) break;
          if (a === e) {
            if (null === i) return void (null !== r && (n[o + 1] = r));
            if (i === n[o + 1]) return void (n[o + 2] = r);
          }
          o++, null !== i && o++, null !== r && o++;
        }
        -1 !== s && (n.splice(s, 0, t), (o = s + 1)),
          n.splice(o++, 0, e),
          null !== i && n.splice(o++, 0, i),
          null !== r && n.splice(o++, 0, r);
      }
      function $g(n) {
        return -1 !== n;
      }
      function Ur(n) {
        return 32767 & n;
      }
      function $r(n, t) {
        let e = (function QA(n) {
            return n >> 16;
          })(n),
          i = t;
        for (; e > 0; ) (i = i[15]), e--;
        return i;
      }
      let hd = !0;
      function Ka(n) {
        const t = hd;
        return (hd = n), t;
      }
      let XA = 0;
      const Nn = {};
      function ns(n, t) {
        const e = pd(n, t);
        if (-1 !== e) return e;
        const i = t[1];
        i.firstCreatePass &&
          ((n.injectorIndex = t.length),
          fd(i.data, n),
          fd(t, null),
          fd(i.blueprint, null));
        const r = Ya(n, t),
          o = n.injectorIndex;
        if ($g(r)) {
          const s = Ur(r),
            a = $r(r, t),
            l = a[1].data;
          for (let c = 0; c < 8; c++) t[o + c] = a[s + c] | l[s + c];
        }
        return (t[o + 8] = r), o;
      }
      function fd(n, t) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function pd(n, t) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === t[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Ya(n, t) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let e = 0,
          i = null,
          r = t;
        for (; null !== r; ) {
          if (((i = Xg(r)), null === i)) return -1;
          if ((e++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (e << 16);
        }
        return -1;
      }
      function Za(n, t, e) {
        !(function JA(n, t, e) {
          let i;
          "string" == typeof e
            ? (i = e.charCodeAt(0) || 0)
            : e.hasOwnProperty(Yo) && (i = e[Yo]),
            null == i && (i = e[Yo] = XA++);
          const r = 255 & i;
          t.data[n + (r >> 5)] |= 1 << r;
        })(n, t, e);
      }
      function Wg(n, t, e) {
        if (e & L.Optional) return n;
        Fa();
      }
      function qg(n, t, e, i) {
        if (
          (e & L.Optional && void 0 === i && (i = null),
          0 == (e & (L.Self | L.Host)))
        ) {
          const r = n[9],
            o = tn(void 0);
          try {
            return r ? r.get(t, i, e & L.Optional) : gg(t, i, e & L.Optional);
          } finally {
            tn(o);
          }
        }
        return Wg(i, 0, e);
      }
      function Kg(n, t, e, i = L.Default, r) {
        if (null !== n) {
          if (1024 & t[2]) {
            const s = (function rT(n, t, e, i, r) {
              let o = n,
                s = t;
              for (
                ;
                null !== o && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Yg(o, s, e, i | L.Self, Nn);
                if (a !== Nn) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[21];
                  if (c) {
                    const u = c.get(e, Nn, i);
                    if (u !== Nn) return u;
                  }
                  (l = Xg(s)), (s = s[15]);
                }
                o = l;
              }
              return r;
            })(n, t, e, i, Nn);
            if (s !== Nn) return s;
          }
          const o = Yg(n, t, e, i, Nn);
          if (o !== Nn) return o;
        }
        return qg(t, e, i, r);
      }
      function Yg(n, t, e, i, r) {
        const o = (function nT(n) {
          if ("string" == typeof n) return n.charCodeAt(0) || 0;
          const t = n.hasOwnProperty(Yo) ? n[Yo] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : iT) : t;
        })(e);
        if ("function" == typeof o) {
          if (!Og(t, n, i)) return i & L.Host ? Wg(r, 0, i) : qg(t, e, i, r);
          try {
            const s = o(i);
            if (null != s || i & L.Optional) return s;
            Fa();
          } finally {
            Vg();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = pd(n, t),
            l = -1,
            c = i & L.Host ? t[16][6] : null;
          for (
            (-1 === a || i & L.SkipSelf) &&
            ((l = -1 === a ? Ya(n, t) : t[a + 8]),
            -1 !== l && Qg(i, !1)
              ? ((s = t[1]), (a = Ur(l)), (t = $r(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = t[1];
            if (Zg(o, a, u.data)) {
              const d = tT(a, t, e, s, i, c);
              if (d !== Nn) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Qg(i, t[1].data[a + 8] === c) && Zg(o, a, t)
                ? ((s = u), (a = Ur(l)), (t = $r(l, t)))
                : (a = -1);
          }
        }
        return r;
      }
      function tT(n, t, e, i, r, o) {
        const s = t[1],
          a = s.data[n + 8],
          u = Qa(
            a,
            s,
            e,
            null == i ? Ba(a) && hd : i != s && 0 != (3 & a.type),
            r & L.Host && o === a
          );
        return null !== u ? is(t, s, u, a) : Nn;
      }
      function Qa(n, t, e, i, r) {
        const o = n.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          l = n.directiveStart,
          u = o >> 20,
          h = r ? a + u : n.directiveEnd;
        for (let f = i ? a : a + u; f < h; f++) {
          const p = s[f];
          if ((f < l && e === p) || (f >= l && p.type === e)) return f;
        }
        if (r) {
          const f = s[l];
          if (f && bn(f) && f.type === e) return l;
        }
        return null;
      }
      function is(n, t, e, i) {
        let r = n[e];
        const o = t.data;
        if (
          (function qA(n) {
            return n instanceof es;
          })(r)
        ) {
          const s = r;
          s.resolving &&
            (function JS(n, t) {
              const e = t ? `. Dependency path: ${t.join(" > ")} > ${n}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${n}${e}`
              );
            })(
              (function fe(n) {
                return "function" == typeof n
                  ? n.name || n.toString()
                  : "object" == typeof n &&
                    null != n &&
                    "function" == typeof n.type
                  ? n.type.name || n.type.toString()
                  : z(n);
              })(o[e])
            );
          const a = Ka(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? tn(s.injectImpl) : null;
          Og(n, i, L.Default);
          try {
            (r = n[e] = s.factory(void 0, o, n, i)),
              t.firstCreatePass &&
                e >= i.directiveStart &&
                (function GA(n, t, e) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (i) {
                    const s = wg(t);
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(n, s),
                      (
                        e.preOrderCheckHooks || (e.preOrderCheckHooks = [])
                      ).push(n, s);
                  }
                  r &&
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(0 - n, r),
                    o &&
                      ((e.preOrderHooks || (e.preOrderHooks = [])).push(n, o),
                      (
                        e.preOrderCheckHooks || (e.preOrderCheckHooks = [])
                      ).push(n, o));
                })(e, o[e], t);
          } finally {
            null !== l && tn(l), Ka(a), (s.resolving = !1), Vg();
          }
        }
        return r;
      }
      function Zg(n, t, e) {
        return !!(e[t + (n >> 5)] & (1 << n));
      }
      function Qg(n, t) {
        return !(n & L.Self || (n & L.Host && t));
      }
      class zr {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e, i) {
          return Kg(this._tNode, this._lView, t, i, e);
        }
      }
      function iT() {
        return new zr(Ye(), D());
      }
      function ut(n) {
        return Di(() => {
          const t = n.prototype.constructor,
            e = t[Jn] || md(t),
            i = Object.prototype;
          let r = Object.getPrototypeOf(n.prototype).constructor;
          for (; r && r !== i; ) {
            const o = r[Jn] || md(r);
            if (o && o !== e) return o;
            r = Object.getPrototypeOf(r);
          }
          return (o) => new o();
        });
      }
      function md(n) {
        return Hu(n)
          ? () => {
              const t = md(H(n));
              return t && t();
            }
          : Qi(n);
      }
      function Xg(n) {
        const t = n[1],
          e = t.type;
        return 2 === e ? t.declTNode : 1 === e ? n[6] : null;
      }
      function Gr(n) {
        return (function eT(n, t) {
          if ("class" === t) return n.classes;
          if ("style" === t) return n.styles;
          const e = n.attrs;
          if (e) {
            const i = e.length;
            let r = 0;
            for (; r < i; ) {
              const o = e[r];
              if (jg(o)) break;
              if (0 === o) r += 2;
              else if ("number" == typeof o)
                for (r++; r < i && "string" == typeof e[r]; ) r++;
              else {
                if (o === t) return e[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(Ye(), n);
      }
      const qr = "__parameters__";
      function Yr(n, t, e) {
        return Di(() => {
          const i = (function gd(n) {
            return function (...e) {
              if (n) {
                const i = n(...e);
                for (const r in i) this[r] = i[r];
              }
            };
          })(t);
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this;
            const s = new r(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(qr)
                ? l[qr]
                : Object.defineProperty(l, qr, { value: [] })[qr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            e && (r.prototype = Object.create(e.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class E {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = M({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const sT = new E("AnalyzeForEntryComponents");
      function $t(n, t) {
        void 0 === t && (t = n);
        for (let e = 0; e < n.length; e++) {
          let i = n[e];
          Array.isArray(i)
            ? (t === n && (t = n.slice(0, e)), $t(i, t))
            : t !== n && t.push(i);
        }
        return t;
      }
      function ni(n, t) {
        n.forEach((e) => (Array.isArray(e) ? ni(e, t) : t(e)));
      }
      function e_(n, t, e) {
        t >= n.length ? n.push(e) : n.splice(t, 0, e);
      }
      function Xa(n, t) {
        return t >= n.length - 1 ? n.pop() : n.splice(t, 1)[0];
      }
      function ss(n, t) {
        const e = [];
        for (let i = 0; i < n; i++) e.push(t);
        return e;
      }
      function zt(n, t, e) {
        let i = Zr(n, t);
        return (
          i >= 0
            ? (n[1 | i] = e)
            : ((i = ~i),
              (function cT(n, t, e, i) {
                let r = n.length;
                if (r == t) n.push(e, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = e);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > t; )
                    (n[r] = n[r - 2]), r--;
                  (n[t] = e), (n[t + 1] = i);
                }
              })(n, i, t, e)),
          i
        );
      }
      function yd(n, t) {
        const e = Zr(n, t);
        if (e >= 0) return n[1 | e];
      }
      function Zr(n, t) {
        return (function i_(n, t, e) {
          let i = 0,
            r = n.length >> e;
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = n[o << e];
            if (t === s) return o << e;
            s > t ? (r = o) : (i = o + 1);
          }
          return ~(r << e);
        })(n, t, 1);
      }
      const as = {},
        bd = "__NG_DI_FLAG__",
        el = "ngTempTokenPath",
        _T = /\n/gm,
        r_ = "__source";
      let ls;
      function Qr(n) {
        const t = ls;
        return (ls = n), t;
      }
      function vT(n, t = L.Default) {
        if (void 0 === ls) throw new C(-203, !1);
        return null === ls
          ? gg(n, void 0, t)
          : ls.get(n, t & L.Optional ? null : void 0, t);
      }
      function _(n, t = L.Default) {
        return (
          (function aA() {
            return zu;
          })() || vT
        )(H(n), t);
      }
      function sn(n, t = L.Default) {
        return (
          "number" != typeof t &&
            (t =
              0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4)),
          _(n, t)
        );
      }
      function Cd(n) {
        const t = [];
        for (let e = 0; e < n.length; e++) {
          const i = H(n[e]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new C(900, !1);
            let r,
              o = L.Default;
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = bT(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (o |= l)
                : (r = a);
            }
            t.push(_(r, o));
          } else t.push(_(i));
        }
        return t;
      }
      function cs(n, t) {
        return (n[bd] = t), (n.prototype[bd] = t), n;
      }
      function bT(n) {
        return n[bd];
      }
      const Ln = cs(Yr("Optional"), 8),
        Xr = cs(Yr("SkipSelf"), 4);
      let wd, il;
      function eo(n) {
        return (
          (function Ed() {
            if (void 0 === il && ((il = null), ye.trustedTypes))
              try {
                il = ye.trustedTypes.createPolicy("angular", {
                  createHTML: (n) => n,
                  createScript: (n) => n,
                  createScriptURL: (n) => n,
                });
              } catch {}
            return il;
          })()?.createHTML(n) || n
        );
      }
      class Xi {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class PT extends Xi {
        getTypeName() {
          return "HTML";
        }
      }
      class NT extends Xi {
        getTypeName() {
          return "Style";
        }
      }
      class LT extends Xi {
        getTypeName() {
          return "Script";
        }
      }
      class VT extends Xi {
        getTypeName() {
          return "URL";
        }
      }
      class BT extends Xi {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function Gt(n) {
        return n instanceof Xi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function Vn(n, t) {
        const e = (function jT(n) {
          return (n instanceof Xi && n.getTypeName()) || null;
        })(n);
        if (null != e && e !== t) {
          if ("ResourceURL" === e && "URL" === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${e} (see https://g.co/ng/security#xss)`
          );
        }
        return e === t;
      }
      class WT {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const e = new window.DOMParser().parseFromString(
              eo(t),
              "text/html"
            ).body;
            return null === e
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (e.removeChild(e.firstChild), e);
          } catch {
            return null;
          }
        }
      }
      class qT {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const e = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(e);
            const i = this.inertDocument.createElement("body");
            e.appendChild(i);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = eo(t)), e;
          const i = this.inertDocument.createElement("body");
          return (
            (i.innerHTML = eo(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(i),
            i
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const s = e.item(r).name;
            ("xmlns:ns1" === s || 0 === s.indexOf("ns1:")) &&
              t.removeAttribute(s);
          }
          let i = t.firstChild;
          for (; i; )
            i.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(i),
              (i = i.nextSibling);
        }
      }
      const YT =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        ZT =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function hs(n) {
        return (n = String(n)).match(YT) || n.match(ZT) ? n : "unsafe:" + n;
      }
      function Bn(n) {
        const t = {};
        for (const e of n.split(",")) t[e] = !0;
        return t;
      }
      function fs(...n) {
        const t = {};
        for (const e of n)
          for (const i in e) e.hasOwnProperty(i) && (t[i] = !0);
        return t;
      }
      const v_ = Bn("area,br,col,hr,img,wbr"),
        b_ = Bn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        C_ = Bn("rp,rt"),
        Sd = fs(
          v_,
          fs(
            b_,
            Bn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          fs(
            C_,
            Bn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          fs(C_, b_)
        ),
        Ad = Bn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Td = Bn("srcset"),
        D_ = fs(
          Ad,
          Td,
          Bn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Bn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        QT = Bn("script,style,template");
      class XT {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            i = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (i = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              i && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let r = this.checkClobberedElement(e, e.nextSibling);
                if (r) {
                  e = r;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Sd.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !QT.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const i = t.attributes;
          for (let r = 0; r < i.length; r++) {
            const o = i.item(r),
              s = o.name,
              a = s.toLowerCase();
            if (!D_.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = o.value;
            Ad[a] && (l = hs(l)),
              Td[a] &&
                ((n = l),
                (l = (n = String(n))
                  .split(",")
                  .map((t) => hs(t.trim()))
                  .join(", "))),
              this.buf.push(" ", s, '="', w_(l), '"');
          }
          var n;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Sd.hasOwnProperty(e) &&
            !v_.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(w_(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const JT = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        eI = /([^\#-~ |!])/g;
      function w_(n) {
        return n
          .replace(/&/g, "&amp;")
          .replace(JT, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(eI, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let ol;
      function E_(n, t) {
        let e = null;
        try {
          ol =
            ol ||
            (function __(n) {
              const t = new qT(n);
              return (function KT() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    eo(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new WT(t)
                : t;
            })(n);
          let i = t ? String(t) : "";
          e = ol.getInertBodyElement(i);
          let r = 5,
            o = i;
          do {
            if (0 === r)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            r--, (i = o), (o = e.innerHTML), (e = ol.getInertBodyElement(i));
          } while (i !== o);
          return eo(new XT().sanitizeChildren(Id(e) || e));
        } finally {
          if (e) {
            const i = Id(e) || e;
            for (; i.firstChild; ) i.removeChild(i.firstChild);
          }
        }
      }
      function Id(n) {
        return "content" in n &&
          (function tI(n) {
            return (
              n.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === n.nodeName
            );
          })(n)
          ? n.content
          : null;
      }
      var me = (() => (
        ((me = me || {})[(me.NONE = 0)] = "NONE"),
        (me[(me.HTML = 1)] = "HTML"),
        (me[(me.STYLE = 2)] = "STYLE"),
        (me[(me.SCRIPT = 3)] = "SCRIPT"),
        (me[(me.URL = 4)] = "URL"),
        (me[(me.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        me
      ))();
      function ps(n) {
        const t = (function ms() {
          const n = D();
          return n && n[12];
        })();
        return t
          ? t.sanitize(me.URL, n) || ""
          : Vn(n, "URL")
          ? Gt(n)
          : hs(z(n));
      }
      const xd = new E("ENVIRONMENT_INITIALIZER"),
        S_ = new E("INJECTOR", -1),
        A_ = new E("INJECTOR_DEF_TYPES");
      class T_ {
        get(t, e = as) {
          if (e === as) {
            const i = new Error(`NullInjectorError: No provider for ${Ce(t)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return e;
        }
      }
      function cI(...n) {
        return { ɵproviders: I_(0, n) };
      }
      function I_(n, ...t) {
        const e = [],
          i = new Set();
        let r;
        return (
          ni(t, (o) => {
            const s = o;
            Rd(s, e, [], i) && (r || (r = []), r.push(s));
          }),
          void 0 !== r && x_(r, e),
          e
        );
      }
      function x_(n, t) {
        for (let e = 0; e < n.length; e++) {
          const { providers: r } = n[e];
          ni(r, (o) => {
            t.push(o);
          });
        }
      }
      function Rd(n, t, e, i) {
        if (!(n = H(n))) return !1;
        let r = null,
          o = pg(n);
        const s = !o && _e(n);
        if (o || s) {
          if (s && !s.standalone) return !1;
          r = n;
        } else {
          const l = n.ngModule;
          if (((o = pg(l)), !o)) return !1;
          r = l;
        }
        const a = i.has(r);
        if (s) {
          if (a) return !1;
          if ((i.add(r), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) Rd(c, t, e, i);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              i.add(r);
              try {
                ni(o.imports, (u) => {
                  Rd(u, t, e, i) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && x_(c, t);
            }
            if (!a) {
              const c = Qi(r) || (() => new r());
              t.push(
                { provide: r, useFactory: c, deps: pe },
                { provide: A_, useValue: r, multi: !0 },
                { provide: xd, useValue: () => _(r), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              ni(l, (u) => {
                t.push(u);
              });
          }
        }
        return r !== n && void 0 !== n.providers;
      }
      const uI = be({ provide: String, useValue: be });
      function kd(n) {
        return null !== n && "object" == typeof n && uI in n;
      }
      function Ji(n) {
        return "function" == typeof n;
      }
      const Fd = new E("Set Injector scope."),
        sl = {},
        hI = {};
      let Od;
      function al() {
        return void 0 === Od && (Od = new T_()), Od;
      }
      class Si {}
      class F_ extends Si {
        constructor(t, e, i, r) {
          super(),
            (this.parent = e),
            (this.source = i),
            (this.scopes = r),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Nd(t, (s) => this.processProvider(s)),
            this.records.set(S_, to(void 0, this)),
            r.has("environment") && this.records.set(Si, to(void 0, this));
          const o = this.records.get(Fd);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(A_.multi, pe, L.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const e = Qr(this),
            i = tn(void 0);
          try {
            return t();
          } finally {
            Qr(e), tn(i);
          }
        }
        get(t, e = as, i = L.Default) {
          this.assertNotDestroyed();
          const r = Qr(this),
            o = tn(void 0);
          try {
            if (!(i & L.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function _I(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof E)
                    );
                  })(t) && Uu(t);
                (a = l && this.injectableDefInScope(l) ? to(Pd(t), sl) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (i & L.Self ? al() : this.parent).get(
              t,
              (e = i & L.Optional && e === as ? null : e)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[el] = s[el] || []).unshift(Ce(t)), r)) throw s;
              return (function CT(n, t, e, i) {
                const r = n[el];
                throw (
                  (t[r_] && r.unshift(t[r_]),
                  (n.message = (function DT(n, t, e, i = null) {
                    n =
                      n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                        ? n.slice(2)
                        : n;
                    let r = Ce(t);
                    if (Array.isArray(t)) r = t.map(Ce).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Ce(a))
                          );
                        }
                      r = `{${o.join(", ")}}`;
                    }
                    return `${e}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
                      _T,
                      "\n  "
                    )}`;
                  })("\n" + n.message, r, e, i)),
                  (n.ngTokenPath = r),
                  (n[el] = null),
                  n)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            tn(o), Qr(r);
          }
        }
        resolveInjectorInitializers() {
          const t = Qr(this),
            e = tn(void 0);
          try {
            const i = this.get(xd.multi, pe, L.Self);
            for (const r of i) r();
          } finally {
            Qr(t), tn(e);
          }
        }
        toString() {
          const t = [],
            e = this.records;
          for (const i of e.keys()) t.push(Ce(i));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let e = Ji((t = H(t))) ? t : H(t && t.provide);
          const i = (function pI(n) {
            return kd(n) ? to(void 0, n.useValue) : to(O_(n), sl);
          })(t);
          if (Ji(t) || !0 !== t.multi) this.records.get(e);
          else {
            let r = this.records.get(e);
            r ||
              ((r = to(void 0, sl, !0)),
              (r.factory = () => Cd(r.multi)),
              this.records.set(e, r)),
              (e = t),
              r.multi.push(t);
          }
          this.records.set(e, i);
        }
        hydrate(t, e) {
          return (
            e.value === sl && ((e.value = hI), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              (function gI(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(e.value) &&
              this._ngOnDestroyHooks.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = H(t.providedIn);
          return "string" == typeof e
            ? "any" === e || this.scopes.has(e)
            : this.injectorDefTypes.has(e);
        }
      }
      function Pd(n) {
        const t = Uu(n),
          e = null !== t ? t.factory : Qi(n);
        if (null !== e) return e;
        if (n instanceof E) throw new C(204, !1);
        if (n instanceof Function)
          return (function fI(n) {
            const t = n.length;
            if (t > 0) throw (ss(t, "?"), new C(204, !1));
            const e = (function rA(n) {
              const t = n && (n[Oa] || n[mg]);
              if (t) {
                const e = (function oA(n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const t = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${e}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${e}" class.`
                  ),
                  t
                );
              }
              return null;
            })(n);
            return null !== e ? () => e.factory(n) : () => new n();
          })(n);
        throw new C(204, !1);
      }
      function O_(n, t, e) {
        let i;
        if (Ji(n)) {
          const r = H(n);
          return Qi(r) || Pd(r);
        }
        if (kd(n)) i = () => H(n.useValue);
        else if (
          (function k_(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...Cd(n.deps || []));
        else if (
          (function R_(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => _(H(n.useExisting));
        else {
          const r = H(n && (n.useClass || n.provide));
          if (
            !(function mI(n) {
              return !!n.deps;
            })(n)
          )
            return Qi(r) || Pd(r);
          i = () => new r(...Cd(n.deps));
        }
        return i;
      }
      function to(n, t, e = !1) {
        return { factory: n, value: t, multi: e ? [] : void 0 };
      }
      function yI(n) {
        return !!n.ɵproviders;
      }
      function Nd(n, t) {
        for (const e of n)
          Array.isArray(e) ? Nd(e, t) : yI(e) ? Nd(e.ɵproviders, t) : t(e);
      }
      class P_ {}
      class CI {
        resolveComponentFactory(t) {
          throw (function bI(n) {
            const t = Error(
              `No component factory found for ${Ce(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = n), t;
          })(t);
        }
      }
      let er = (() => {
        class n {}
        return (n.NULL = new CI()), n;
      })();
      function DI() {
        return no(Ye(), D());
      }
      function no(n, t) {
        return new ve(on(n, t));
      }
      let ve = (() => {
        class n {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (n.__NG_ELEMENT_ID__ = DI), n;
      })();
      function wI(n) {
        return n instanceof ve ? n.nativeElement : n;
      }
      class gs {}
      let ii = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function EI() {
                const n = D(),
                  e = Ut(Ye().index, n);
                return (Ft(e) ? e : n)[J];
              })()),
            n
          );
        })(),
        MI = (() => {
          class n {}
          return (
            (n.ɵprov = M({
              token: n,
              providedIn: "root",
              factory: () => null,
            })),
            n
          );
        })();
      class tr {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const SI = new tr("14.1.0"),
        Ld = {};
      function Ud(n) {
        return n.ngOriginalError;
      }
      class ri {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t);
          this._console.error("ERROR", t),
            e && this._console.error("ORIGINAL ERROR", e);
        }
        _findOriginalError(t) {
          let e = t && Ud(t);
          for (; e && Ud(e); ) e = Ud(e);
          return e || null;
        }
      }
      const $d = new Map();
      let BI = 0;
      const Gd = "__ngContext__";
      function mt(n, t) {
        Ft(t)
          ? ((n[Gd] = t[20]),
            (function HI(n) {
              $d.set(n[20], n);
            })(t))
          : (n[Gd] = t);
      }
      function _s(n) {
        const t = n[Gd];
        return "number" == typeof t
          ? (function H_(n) {
              return $d.get(n) || null;
            })(t)
          : t || null;
      }
      function Wd(n) {
        const t = _s(n);
        return t ? (Ft(t) ? t : t.lView) : null;
      }
      const ZI = (() =>
        (
          (typeof requestAnimationFrame < "u" && requestAnimationFrame) ||
          setTimeout
        ).bind(ye))();
      function oi(n) {
        return n instanceof Function ? n() : n;
      }
      var Pt = (() => (
        ((Pt = Pt || {})[(Pt.Important = 1)] = "Important"),
        (Pt[(Pt.DashCase = 2)] = "DashCase"),
        Pt
      ))();
      function Kd(n, t) {
        return undefined(n, t);
      }
      function ys(n) {
        const t = n[3];
        return vn(t) ? t[3] : t;
      }
      function Yd(n) {
        return Y_(n[13]);
      }
      function Zd(n) {
        return Y_(n[4]);
      }
      function Y_(n) {
        for (; null !== n && !vn(n); ) n = n[4];
        return n;
      }
      function ro(n, t, e, i, r) {
        if (null != i) {
          let o,
            s = !1;
          vn(i) ? (o = i) : Ft(i) && ((s = !0), (i = i[0]));
          const a = ze(i);
          0 === n && null !== e
            ? null == r
              ? ty(t, e, a)
              : nr(t, e, a, r || null, !0)
            : 1 === n && null !== e
            ? nr(t, e, a, r || null, !0)
            : 2 === n
            ? (function ly(n, t, e) {
                const i = ll(n, t);
                i &&
                  (function px(n, t, e, i) {
                    n.removeChild(t, e, i);
                  })(n, i, t, e);
              })(t, a, s)
            : 3 === n && t.destroyNode(a),
            null != o &&
              (function _x(n, t, e, i, r) {
                const o = e[7];
                o !== ze(e) && ro(t, n, i, o, r);
                for (let a = 10; a < e.length; a++) {
                  const l = e[a];
                  vs(l[1], l, n, t, i, o);
                }
              })(t, n, o, e, r);
        }
      }
      function Xd(n, t, e) {
        return n.createElement(t, e);
      }
      function Q_(n, t) {
        const e = n[9],
          i = e.indexOf(t),
          r = t[3];
        512 & t[2] && ((t[2] &= -513), nd(r, -1)), e.splice(i, 1);
      }
      function Jd(n, t) {
        if (n.length <= 10) return;
        const e = 10 + t,
          i = n[e];
        if (i) {
          const r = i[17];
          null !== r && r !== n && Q_(r, i), t > 0 && (n[e - 1][4] = i[4]);
          const o = Xa(n, 10 + t);
          !(function sx(n, t) {
            vs(n, t, t[J], 2, null, null), (t[0] = null), (t[6] = null);
          })(i[1], i);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -65);
        }
        return i;
      }
      function X_(n, t) {
        if (!(128 & t[2])) {
          const e = t[J];
          e.destroyNode && vs(n, t, e, 3, null, null),
            (function cx(n) {
              let t = n[13];
              if (!t) return eh(n[1], n);
              for (; t; ) {
                let e = null;
                if (Ft(t)) e = t[13];
                else {
                  const i = t[10];
                  i && (e = i);
                }
                if (!e) {
                  for (; t && !t[4] && t !== n; )
                    Ft(t) && eh(t[1], t), (t = t[3]);
                  null === t && (t = n), Ft(t) && eh(t[1], t), (e = t && t[4]);
                }
                t = e;
              }
            })(t);
        }
      }
      function eh(n, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function fx(n, t) {
              let e;
              if (null != n && null != (e = n.destroyHooks))
                for (let i = 0; i < e.length; i += 2) {
                  const r = t[e[i]];
                  if (!(r instanceof es)) {
                    const o = e[i + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(r);
                      } finally {
                      }
                  }
                }
            })(n, t),
            (function hx(n, t) {
              const e = n.cleanup,
                i = t[7];
              let r = -1;
              if (null !== e)
                for (let o = 0; o < e.length - 1; o += 2)
                  if ("string" == typeof e[o]) {
                    const s = e[o + 1],
                      a = "function" == typeof s ? s(t) : ze(t[s]),
                      l = i[(r = e[o + 2])],
                      c = e[o + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(e[o], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = i[(r = e[o + 1])];
                    e[o].call(s);
                  }
              if (null !== i) {
                for (let o = r + 1; o < i.length; o++) (0, i[o])();
                t[7] = null;
              }
            })(n, t),
            1 === t[1].type && t[J].destroy();
          const e = t[17];
          if (null !== e && vn(t[3])) {
            e !== t[3] && Q_(e, t);
            const i = t[19];
            null !== i && i.detachView(n);
          }
          !(function UI(n) {
            $d.delete(n[20]);
          })(t);
        }
      }
      function J_(n, t, e) {
        return (function ey(n, t, e) {
          let i = t;
          for (; null !== i && 40 & i.type; ) i = (t = i).parent;
          if (null === i) return e[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === _n.None || r === _n.Emulated) return null;
          }
          return on(i, e);
        })(n, t.parent, e);
      }
      function nr(n, t, e, i, r) {
        n.insertBefore(t, e, i, r);
      }
      function ty(n, t, e) {
        n.appendChild(t, e);
      }
      function ny(n, t, e, i, r) {
        null !== i ? nr(n, t, e, i, r) : ty(n, t, e);
      }
      function ll(n, t) {
        return n.parentNode(t);
      }
      function iy(n, t, e) {
        return oy(n, t, e);
      }
      let oy = function ry(n, t, e) {
        return 40 & n.type ? on(n, e) : null;
      };
      function cl(n, t, e, i) {
        const r = J_(n, i, t),
          o = t[J],
          a = iy(i.parent || t[6], i, t);
        if (null != r)
          if (Array.isArray(e))
            for (let l = 0; l < e.length; l++) ny(o, r, e[l], a, !1);
          else ny(o, r, e, a, !1);
      }
      function ul(n, t) {
        if (null !== t) {
          const e = t.type;
          if (3 & e) return on(t, n);
          if (4 & e) return nh(-1, n[t.index]);
          if (8 & e) {
            const i = t.child;
            if (null !== i) return ul(n, i);
            {
              const r = n[t.index];
              return vn(r) ? nh(-1, r) : ze(r);
            }
          }
          if (32 & e) return Kd(t, n)() || ze(n[t.index]);
          {
            const i = ay(n, t);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : ul(ys(n[16]), i)
              : ul(n, t.next);
          }
        }
        return null;
      }
      function ay(n, t) {
        return null !== t ? n[16][6].projection[t.projection] : null;
      }
      function nh(n, t) {
        const e = 10 + n + 1;
        if (e < t.length) {
          const i = t[e],
            r = i[1].firstChild;
          if (null !== r) return ul(i, r);
        }
        return t[7];
      }
      function ih(n, t, e, i, r, o, s) {
        for (; null != e; ) {
          const a = i[e.index],
            l = e.type;
          if (
            (s && 0 === t && (a && mt(ze(a), i), (e.flags |= 4)),
            64 != (64 & e.flags))
          )
            if (8 & l) ih(n, t, e.child, i, r, o, !1), ro(t, n, r, a, o);
            else if (32 & l) {
              const c = Kd(e, i);
              let u;
              for (; (u = c()); ) ro(t, n, r, u, o);
              ro(t, n, r, a, o);
            } else 16 & l ? cy(n, t, i, e, r, o) : ro(t, n, r, a, o);
          e = s ? e.projectionNext : e.next;
        }
      }
      function vs(n, t, e, i, r, o) {
        ih(e, i, n.firstChild, t, r, o, !1);
      }
      function cy(n, t, e, i, r, o) {
        const s = e[16],
          l = s[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) ro(t, n, r, l[c], o);
        else ih(n, t, l, s[3], r, o, !0);
      }
      function uy(n, t, e) {
        n.setAttribute(t, "style", e);
      }
      function rh(n, t, e) {
        "" === e
          ? n.removeAttribute(t, "class")
          : n.setAttribute(t, "class", e);
      }
      function dy(n, t, e) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(t, e);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const o = t.length;
            if (r + o === i || n.charCodeAt(r + o) <= 32) return r;
          }
          e = r + 1;
        }
      }
      const hy = "ng-template";
      function vx(n, t, e) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (e && "class" === r) {
            if (((r = n[i]), -1 !== dy(r.toLowerCase(), t, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]); )
              if (r.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function fy(n) {
        return 4 === n.type && n.value !== hy;
      }
      function bx(n, t, e) {
        return t === (4 !== n.type || e ? n.value : hy);
      }
      function Cx(n, t, e) {
        let i = 4;
        const r = n.attrs || [],
          o = (function Ex(n) {
            for (let t = 0; t < n.length; t++) if (jg(n[t])) return t;
            return n.length;
          })(r);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !bx(n, l, e)) || ("" === l && 1 === t.length))
                ) {
                  if (Cn(i)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & i ? l : t[++a];
                if (8 & i && null !== n.attrs) {
                  if (!vx(n.attrs, c, e)) {
                    if (Cn(i)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = Dx(8 & i ? "class" : l, r, fy(n), e);
                if (-1 === d) {
                  if (Cn(i)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let h;
                  h = d > o ? "" : r[d + 1].toLowerCase();
                  const f = 8 & i ? h : null;
                  if ((f && -1 !== dy(f, c, 0)) || (2 & i && c !== h)) {
                    if (Cn(i)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Cn(i) && !Cn(l)) return !1;
            if (s && Cn(l)) continue;
            (s = !1), (i = l | (1 & i));
          }
        }
        return Cn(i) || s;
      }
      function Cn(n) {
        return 0 == (1 & n);
      }
      function Dx(n, t, e, i) {
        if (null === t) return -1;
        let r = 0;
        if (i || !e) {
          let o = !1;
          for (; r < t.length; ) {
            const s = t[r];
            if (s === n) return r;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++r];
                for (; "string" == typeof a; ) a = t[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += o ? 1 : 2;
          }
          return -1;
        }
        return (function Mx(n, t) {
          let e = n.indexOf(4);
          if (e > -1)
            for (e++; e < n.length; ) {
              const i = n[e];
              if ("number" == typeof i) return -1;
              if (i === t) return e;
              e++;
            }
          return -1;
        })(t, n);
      }
      function py(n, t, e = !1) {
        for (let i = 0; i < t.length; i++) if (Cx(n, t[i], e)) return !0;
        return !1;
      }
      function Sx(n, t) {
        e: for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function my(n, t) {
        return n ? ":not(" + t.trim() + ")" : t;
      }
      function Ax(n) {
        let t = n[0],
          e = 1,
          i = 2,
          r = "",
          o = !1;
        for (; e < n.length; ) {
          let s = n[e];
          if ("string" == typeof s)
            if (2 & i) {
              const a = n[++e];
              r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + s) : 4 & i && (r += " " + s);
          else
            "" !== r && !Cn(s) && ((t += my(o, r)), (r = "")),
              (i = s),
              (o = o || !Cn(i));
          e++;
        }
        return "" !== r && (t += my(o, r)), t;
      }
      const G = {};
      function q(n) {
        gy(le(), D(), wt() + n, !1);
      }
      function gy(n, t, e, i) {
        if (!i)
          if (3 == (3 & t[2])) {
            const o = n.preOrderCheckHooks;
            null !== o && za(t, o, e);
          } else {
            const o = n.preOrderHooks;
            null !== o && Ga(t, o, 0, e);
          }
        Ei(e);
      }
      function by(n, t = null, e = null, i) {
        const r = Cy(n, t, e, i);
        return r.resolveInjectorInitializers(), r;
      }
      function Cy(n, t = null, e = null, i, r = new Set()) {
        const o = [e || pe, cI(n)];
        return (
          (i = i || ("object" == typeof n ? void 0 : Ce(n))),
          new F_(o, t || al(), i || null, r)
        );
      }
      let xe = (() => {
        class n {
          static create(e, i) {
            if (Array.isArray(e)) return by({ name: "" }, i, e, "");
            {
              const r = e.name ?? "";
              return by({ name: r }, e.parent, e.providers, r);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = as),
          (n.NULL = new T_()),
          (n.ɵprov = M({ token: n, providedIn: "any", factory: () => _(S_) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function g(n, t = L.Default) {
        const e = D();
        return null === e ? _(n, t) : Kg(Ye(), e, H(n), t);
      }
      function hl() {
        throw new Error("invalid");
      }
      function fl(n, t) {
        return (n << 17) | (t << 2);
      }
      function Dn(n) {
        return (n >> 17) & 32767;
      }
      function ch(n) {
        return 2 | n;
      }
      function si(n) {
        return (131068 & n) >> 2;
      }
      function uh(n, t) {
        return (-131069 & n) | (t << 2);
      }
      function dh(n) {
        return 1 | n;
      }
      function Vy(n, t) {
        const e = n.contentQueries;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) {
            const r = e[i],
              o = e[i + 1];
            if (-1 !== o) {
              const s = n.data[o];
              ad(r), s.contentQueries(2, t[o], o);
            }
          }
      }
      function gl(n, t, e, i, r, o, s, a, l, c, u) {
        const d = t.blueprint.slice();
        return (
          (d[0] = r),
          (d[2] = 76 | i),
          (null !== u || (n && 1024 & n[2])) && (d[2] |= 1024),
          Ag(d),
          (d[3] = d[15] = n),
          (d[8] = e),
          (d[10] = s || (n && n[10])),
          (d[J] = a || (n && n[J])),
          (d[12] = l || (n && n[12]) || null),
          (d[9] = c || (n && n[9]) || null),
          (d[6] = o),
          (d[20] = (function jI() {
            return BI++;
          })()),
          (d[21] = u),
          (d[16] = 2 == t.type ? n[16] : d),
          d
        );
      }
      function so(n, t, e, i, r) {
        let o = n.data[t];
        if (null === o)
          (o = (function bh(n, t, e, i, r) {
            const o = xg(),
              s = id(),
              l = (n.data[t] = (function uR(n, t, e, i, r, o) {
                return {
                  type: e,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, e, t, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            );
          })(n, t, e, i, r)),
            (function OA() {
              return $.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = e), (o.value = i), (o.attrs = r);
          const s = (function Jo() {
            const n = $.lFrame,
              t = n.currentTNode;
            return n.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Pn(o, !0), o;
      }
      function ao(n, t, e, i) {
        if (0 === e) return -1;
        const r = t.length;
        for (let o = 0; o < e; o++)
          t.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function _l(n, t, e) {
        ld(t);
        try {
          const i = n.viewQuery;
          null !== i && Ih(1, i, e);
          const r = n.template;
          null !== r && By(n, t, r, 1, e),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && Vy(n, t),
            n.staticViewQueries && Ih(2, n.viewQuery, e);
          const o = n.components;
          null !== o &&
            (function sR(n, t) {
              for (let e = 0; e < t.length; e++) SR(n, t[e]);
            })(t, o);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (t[2] &= -5), cd();
        }
      }
      function bs(n, t, e, i) {
        const r = t[2];
        if (128 != (128 & r)) {
          ld(t);
          try {
            Ag(t),
              (function Rg(n) {
                return ($.lFrame.bindingIndex = n);
              })(n.bindingStartIndex),
              null !== e && By(n, t, e, 2, i);
            const s = 3 == (3 & r);
            if (s) {
              const c = n.preOrderCheckHooks;
              null !== c && za(t, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && Ga(t, c, 0, null), ud(t, 0);
            }
            if (
              ((function ER(n) {
                for (let t = Yd(n); null !== t; t = Zd(t)) {
                  if (!t[2]) continue;
                  const e = t[9];
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i],
                      o = r[3];
                    0 == (512 & r[2]) && nd(o, 1), (r[2] |= 512);
                  }
                }
              })(t),
              (function wR(n) {
                for (let t = Yd(n); null !== t; t = Zd(t))
                  for (let e = 10; e < t.length; e++) {
                    const i = t[e],
                      r = i[1];
                    td(i) && bs(r, i, r.template, i[8]);
                  }
              })(t),
              null !== n.contentQueries && Vy(n, t),
              s)
            ) {
              const c = n.contentCheckHooks;
              null !== c && za(t, c);
            } else {
              const c = n.contentHooks;
              null !== c && Ga(t, c, 1), ud(t, 1);
            }
            !(function rR(n, t) {
              const e = n.hostBindingOpCodes;
              if (null !== e)
                try {
                  for (let i = 0; i < e.length; i++) {
                    const r = e[i];
                    if (r < 0) Ei(~r);
                    else {
                      const o = r,
                        s = e[++i],
                        a = e[++i];
                      PA(s, o), a(2, t[o]);
                    }
                  }
                } finally {
                  Ei(-1);
                }
            })(n, t);
            const a = n.components;
            null !== a &&
              (function oR(n, t) {
                for (let e = 0; e < t.length; e++) MR(n, t[e]);
              })(t, a);
            const l = n.viewQuery;
            if ((null !== l && Ih(2, l, i), s)) {
              const c = n.viewCheckHooks;
              null !== c && za(t, c);
            } else {
              const c = n.viewHooks;
              null !== c && Ga(t, c, 2), ud(t, 2);
            }
            !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), nd(t[3], -1));
          } finally {
            cd();
          }
        }
      }
      function aR(n, t, e, i) {
        const r = t[10],
          s = Sg(t);
        try {
          !s && r.begin && r.begin(), s && _l(n, t, i), bs(n, t, e, i);
        } finally {
          !s && r.end && r.end();
        }
      }
      function By(n, t, e, i, r) {
        const o = wt(),
          s = 2 & i;
        try {
          Ei(-1), s && t.length > 22 && gy(n, t, 22, !1), e(i, r);
        } finally {
          Ei(o);
        }
      }
      function jy(n, t, e) {
        if (Yu(t)) {
          const r = t.directiveEnd;
          for (let o = t.directiveStart; o < r; o++) {
            const s = n.data[o];
            s.contentQueries && s.contentQueries(1, e[o], o);
          }
        }
      }
      function Ch(n, t, e) {
        !Ig() ||
          ((function mR(n, t, e, i) {
            const r = e.directiveStart,
              o = e.directiveEnd;
            n.firstCreatePass || ns(e, t), mt(i, t);
            const s = e.initialInputs;
            for (let a = r; a < o; a++) {
              const l = n.data[a],
                c = bn(l);
              c && bR(t, e, l);
              const u = is(t, n, a, e);
              mt(u, t),
                null !== s && CR(0, a - r, u, l, 0, s),
                c && (Ut(e.index, t)[8] = u);
            }
          })(n, t, e, on(e, t)),
          128 == (128 & e.flags) &&
            (function gR(n, t, e) {
              const i = e.directiveStart,
                r = e.directiveEnd,
                o = e.index,
                s = (function NA() {
                  return $.lFrame.currentDirectiveIndex;
                })();
              try {
                Ei(o);
                for (let a = i; a < r; a++) {
                  const l = n.data[a],
                    c = t[a];
                  od(a),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      qy(l, c);
                }
              } finally {
                Ei(-1), od(s);
              }
            })(n, t, e));
      }
      function Dh(n, t, e = on) {
        const i = t.localNames;
        if (null !== i) {
          let r = t.index + 1;
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? e(t, n) : n[s];
            n[r++] = a;
          }
        }
      }
      function Hy(n) {
        const t = n.tView;
        return null === t || t.incompleteFirstPass
          ? (n.tView = wh(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : t;
      }
      function wh(n, t, e, i, r, o, s, a, l, c) {
        const u = 22 + i,
          d = u + r,
          h = (function lR(n, t) {
            const e = [];
            for (let i = 0; i < t; i++) e.push(i < n ? null : G);
            return e;
          })(u, d),
          f = "function" == typeof c ? c() : c;
        return (h[1] = {
          type: n,
          blueprint: h,
          template: e,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function Uy(n, t, e, i) {
        const r = ev(t);
        null === e
          ? r.push(i)
          : (r.push(e), n.firstCreatePass && tv(n).push(i, r.length - 1));
      }
      function $y(n, t, e) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (e = null === e ? {} : e).hasOwnProperty(i)
              ? e[i].push(t, r)
              : (e[i] = [t, r]);
          }
        return e;
      }
      function zy(n, t) {
        const i = t.directiveEnd,
          r = n.data,
          o = t.attrs,
          s = [];
        let a = null,
          l = null;
        for (let c = t.directiveStart; c < i; c++) {
          const u = r[c],
            d = u.inputs,
            h = null === o || fy(t) ? null : DR(d, o);
          s.push(h), (a = $y(d, c, a)), (l = $y(u.outputs, c, l));
        }
        null !== a &&
          (a.hasOwnProperty("class") && (t.flags |= 16),
          a.hasOwnProperty("style") && (t.flags |= 32)),
          (t.initialInputs = s),
          (t.inputs = a),
          (t.outputs = l);
      }
      function Wt(n, t, e, i, r, o, s, a) {
        const l = on(t, e);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[i])
          ? (xh(n, e, u, i, r), Ba(t) && Gy(e, t.index))
          : 3 & t.type &&
            ((i = (function dR(n) {
              return "class" === n
                ? "className"
                : "for" === n
                ? "htmlFor"
                : "formaction" === n
                ? "formAction"
                : "innerHtml" === n
                ? "innerHTML"
                : "readonly" === n
                ? "readOnly"
                : "tabindex" === n
                ? "tabIndex"
                : n;
            })(i)),
            (r = null != s ? s(r, t.value || "", i) : r),
            o.setProperty(l, i, r));
      }
      function Gy(n, t) {
        const e = Ut(t, n);
        16 & e[2] || (e[2] |= 32);
      }
      function Eh(n, t, e, i) {
        let r = !1;
        if (Ig()) {
          const o = (function _R(n, t, e) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const s = i[o];
                  py(e, s.selectors, !1) &&
                    (r || (r = []),
                    Za(ns(e, t), n, s.type),
                    bn(s) ? (Ky(n, e), r.unshift(s)) : r.push(s));
                }
              return r;
            })(n, t, e),
            s = null === i ? null : { "": -1 };
          if (null !== o) {
            (r = !0), Yy(e, n.data.length, o.length);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = ao(n, t, o.length, null);
            for (let u = 0; u < o.length; u++) {
              const d = o[u];
              (e.mergedAttrs = qa(e.mergedAttrs, d.hostAttrs)),
                Zy(n, e, t, c, d),
                vR(c, d, s),
                null !== d.contentQueries && (e.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (e.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(e.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    e.index
                  ),
                  (l = !0)),
                c++;
            }
            zy(n, e);
          }
          s &&
            (function yR(n, t, e) {
              if (t) {
                const i = (n.localNames = []);
                for (let r = 0; r < t.length; r += 2) {
                  const o = e[t[r + 1]];
                  if (null == o) throw new C(-301, !1);
                  i.push(t[r], o);
                }
              }
            })(e, i, s);
        }
        return (e.mergedAttrs = qa(e.mergedAttrs, e.attrs)), r;
      }
      function Wy(n, t, e, i, r, o) {
        const s = o.hostBindings;
        if (s) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~t.index;
          (function pR(n) {
            let t = n.length;
            for (; t > 0; ) {
              const e = n[--t];
              if ("number" == typeof e && e < 0) return e;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, s);
        }
      }
      function qy(n, t) {
        null !== n.hostBindings && n.hostBindings(1, t);
      }
      function Ky(n, t) {
        (t.flags |= 2), (n.components || (n.components = [])).push(t.index);
      }
      function vR(n, t, e) {
        if (e) {
          if (t.exportAs)
            for (let i = 0; i < t.exportAs.length; i++) e[t.exportAs[i]] = n;
          bn(t) && (e[""] = n);
        }
      }
      function Yy(n, t, e) {
        (n.flags |= 1),
          (n.directiveStart = t),
          (n.directiveEnd = t + e),
          (n.providerIndexes = t);
      }
      function Zy(n, t, e, i, r) {
        n.data[i] = r;
        const o = r.factory || (r.factory = Qi(r.type)),
          s = new es(o, bn(r), g);
        (n.blueprint[i] = s),
          (e[i] = s),
          Wy(n, t, 0, i, ao(n, e, r.hostVars, G), r);
      }
      function bR(n, t, e) {
        const i = on(t, n),
          r = Hy(e),
          o = n[10],
          s = yl(
            n,
            gl(
              n,
              r,
              null,
              e.onPush ? 32 : 16,
              i,
              t,
              o,
              o.createRenderer(i, e),
              null,
              null,
              null
            )
          );
        n[t.index] = s;
      }
      function jn(n, t, e, i, r, o) {
        const s = on(n, t);
        !(function Mh(n, t, e, i, r, o, s) {
          if (null == o) n.removeAttribute(t, r, e);
          else {
            const a = null == s ? z(o) : s(o, i || "", r);
            n.setAttribute(t, r, a, e);
          }
        })(t[J], s, o, n.value, e, i, r);
      }
      function CR(n, t, e, i, r, o) {
        const s = o[t];
        if (null !== s) {
          const a = i.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? i.setInput(e, d, c, u) : (e[u] = d);
          }
        }
      }
      function DR(n, t) {
        let e = null,
          i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) &&
                (null === e && (e = []), e.push(r, n[r], t[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return e;
      }
      function Qy(n, t, e, i) {
        return new Array(n, !0, !1, t, null, 0, i, e, null, null);
      }
      function MR(n, t) {
        const e = Ut(t, n);
        if (td(e)) {
          const i = e[1];
          48 & e[2] ? bs(i, e, i.template, e[8]) : e[5] > 0 && Sh(e);
        }
      }
      function Sh(n) {
        for (let i = Yd(n); null !== i; i = Zd(i))
          for (let r = 10; r < i.length; r++) {
            const o = i[r];
            if (512 & o[2]) {
              const s = o[1];
              bs(s, o, s.template, o[8]);
            } else o[5] > 0 && Sh(o);
          }
        const e = n[1].components;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const r = Ut(e[i], n);
            td(r) && r[5] > 0 && Sh(r);
          }
      }
      function SR(n, t) {
        const e = Ut(t, n),
          i = e[1];
        (function AR(n, t) {
          for (let e = t.length; e < n.blueprint.length; e++)
            t.push(n.blueprint[e]);
        })(i, e),
          _l(i, e, e[8]);
      }
      function yl(n, t) {
        return n[13] ? (n[14][4] = t) : (n[13] = t), (n[14] = t), t;
      }
      function Ah(n) {
        for (; n; ) {
          n[2] |= 32;
          const t = ys(n);
          if (mA(n) && !t) return n;
          n = t;
        }
        return null;
      }
      function Jy(n) {
        !(function Xy(n) {
          for (let t = 0; t < n.components.length; t++) {
            const e = n.components[t],
              i = Wd(e);
            if (null !== i) {
              const r = i[1];
              aR(r, i, r.template, e);
            }
          }
        })(n[8]);
      }
      function Ih(n, t, e) {
        ad(0), t(n, e);
      }
      const IR = (() => Promise.resolve(null))();
      function ev(n) {
        return n[7] || (n[7] = []);
      }
      function tv(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function nv(n, t, e) {
        return (
          (null === n || bn(n)) &&
            (e = (function MA(n) {
              for (; Array.isArray(n); ) {
                if ("object" == typeof n[1]) return n;
                n = n[0];
              }
              return null;
            })(e[t.index])),
          e[J]
        );
      }
      function iv(n, t) {
        const e = n[9],
          i = e ? e.get(ri, null) : null;
        i && i.handleError(t);
      }
      function xh(n, t, e, i, r) {
        for (let o = 0; o < e.length; ) {
          const s = e[o++],
            a = e[o++],
            l = t[s],
            c = n.data[s];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function vl(n, t, e) {
        let i = e ? n.styles : null,
          r = e ? n.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (r = ju(r, a))
              : 2 == o && (i = ju(i, a + ": " + t[++s] + ";"));
          }
        e ? (n.styles = i) : (n.stylesWithoutHost = i),
          e ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      function bl(n, t, e, i, r = !1) {
        for (; null !== e; ) {
          const o = t[e.index];
          if ((null !== o && i.push(ze(o)), vn(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                c = l[1].firstChild;
              null !== c && bl(l[1], l, c, i);
            }
          const s = e.type;
          if (8 & s) bl(n, t, e.child, i);
          else if (32 & s) {
            const a = Kd(e, t);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & s) {
            const a = ay(t, e);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = ys(t[16]);
              bl(l[1], l, a, i, !0);
            }
          }
          e = r ? e.projectionNext : e.next;
        }
        return i;
      }
      class Cs {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return bl(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (vn(t)) {
              const e = t[8],
                i = e ? e.indexOf(this) : -1;
              i > -1 && (Jd(t, i), Xa(e, i));
            }
            this._attachedToViewContainer = !1;
          }
          X_(this._lView[1], this._lView);
        }
        onDestroy(t) {
          Uy(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Ah(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          !(function Th(n, t, e) {
            const i = t[10];
            i.begin && i.begin();
            try {
              bs(n, t, n.template, e);
            } catch (r) {
              throw (iv(t, r), r);
            } finally {
              i.end && i.end();
            }
          })(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function lx(n, t) {
              vs(n, t, t[J], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class xR extends Cs {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Jy(this._view);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Rh extends er {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = _e(t);
          return new Ds(e, this.ngModule);
        }
      }
      function rv(n) {
        const t = [];
        for (let e in n)
          n.hasOwnProperty(e) && t.push({ propName: n[e], templateName: e });
        return t;
      }
      class kR {
        constructor(t, e) {
          (this.injector = t), (this.parentInjector = e);
        }
        get(t, e, i) {
          const r = this.injector.get(t, Ld, i);
          return r !== Ld || e === Ld ? r : this.parentInjector.get(t, e, i);
        }
      }
      class Ds extends P_ {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = (function Tx(n) {
              return n.map(Ax).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return rv(this.componentDef.inputs);
        }
        get outputs() {
          return rv(this.componentDef.outputs);
        }
        create(t, e, i, r) {
          let o = (r = r || this.ngModule) instanceof Si ? r : r?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new kR(t, o) : t,
            a = s.get(gs, null);
          if (null === a) throw new C(407, !1);
          const l = s.get(MI, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            d = i
              ? (function cR(n, t, e) {
                  return n.selectRootElement(t, e === _n.ShadowDom);
                })(c, i, this.componentDef.encapsulation)
              : Xd(
                  a.createRenderer(null, this.componentDef),
                  u,
                  (function RR(n) {
                    const t = n.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(u)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            f = (function LR(n, t) {
              return {
                components: [],
                scheduler: n || ZI,
                clean: IR,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            p = wh(0, null, null, 1, 0, null, null, null, null, null),
            m = gl(null, p, f, h, null, null, a, c, l, s, null);
          let y, v;
          ld(m);
          try {
            const w = (function PR(n, t, e, i, r, o) {
              const s = e[1];
              e[22] = n;
              const l = so(s, 22, 2, "#host", null),
                c = (l.mergedAttrs = t.hostAttrs);
              null !== c &&
                (vl(l, c, !0),
                null !== n &&
                  (Wa(r, n, c),
                  null !== l.classes && rh(r, n, l.classes),
                  null !== l.styles && uy(r, n, l.styles)));
              const u = i.createRenderer(n, t),
                d = gl(
                  e,
                  Hy(t),
                  null,
                  t.onPush ? 32 : 16,
                  e[22],
                  l,
                  i,
                  u,
                  o || null,
                  null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (Za(ns(l, e), s, t.type), Ky(s, l), Yy(l, e.length, 1)),
                yl(e, d),
                (e[22] = d)
              );
            })(d, this.componentDef, m, a, c);
            if (d)
              if (i) Wa(c, d, ["ng-version", SI.full]);
              else {
                const { attrs: b, classes: S } = (function Ix(n) {
                  const t = [],
                    e = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let o = n[i];
                    if ("string" == typeof o)
                      2 === r
                        ? "" !== o && t.push(o, n[++i])
                        : 8 === r && e.push(o);
                    else {
                      if (!Cn(r)) break;
                      r = o;
                    }
                    i++;
                  }
                  return { attrs: t, classes: e };
                })(this.componentDef.selectors[0]);
                b && Wa(c, d, b), S && S.length > 0 && rh(c, d, S.join(" "));
              }
            if (((v = ed(p, 22)), void 0 !== e)) {
              const b = (v.projection = []);
              for (let S = 0; S < this.ngContentSelectors.length; S++) {
                const U = e[S];
                b.push(null != U ? Array.from(U) : null);
              }
            }
            (y = (function NR(n, t, e, i, r) {
              const o = e[1],
                s = (function fR(n, t, e) {
                  const i = Ye();
                  n.firstCreatePass &&
                    (e.providersResolver && e.providersResolver(e),
                    Zy(n, i, t, ao(n, t, 1, null), e),
                    zy(n, i));
                  const r = is(t, n, i.directiveStart, i);
                  mt(r, t);
                  const o = on(i, t);
                  return o && mt(o, t), r;
                })(o, e, t);
              if ((i.components.push(s), (n[8] = s), null !== r))
                for (const l of r) l(s, t);
              if (t.contentQueries) {
                const l = Ye();
                t.contentQueries(1, s, l.directiveStart);
              }
              const a = Ye();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (Ei(a.index),
                  Wy(e[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  qy(t, s)),
                s
              );
            })(w, this.componentDef, m, f, [VR])),
              _l(p, m, null);
          } finally {
            cd();
          }
          return new OR(this.componentType, y, no(v, m), m, v);
        }
      }
      class OR extends class vI {} {
        constructor(t, e, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new xR(r)),
            (this.componentType = t);
        }
        setInput(t, e) {
          const i = this._tNode.inputs;
          let r;
          if (null !== i && (r = i[t])) {
            const o = this._rootLView;
            xh(o[1], o, r, t, e), Gy(o, this._tNode.index);
          }
        }
        get injector() {
          return new zr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function VR() {
        const n = Ye();
        $a(D()[1], n);
      }
      function ee(n) {
        let t = (function ov(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          e = !0;
        const i = [n];
        for (; t; ) {
          let r;
          if (bn(n)) r = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new C(903, !1);
            r = t.ɵdir;
          }
          if (r) {
            if (e) {
              i.push(r);
              const s = n;
              (s.inputs = kh(n.inputs)),
                (s.declaredInputs = kh(n.declaredInputs)),
                (s.outputs = kh(n.outputs));
              const a = r.hostBindings;
              a && UR(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && jR(n, l),
                c && HR(n, c),
                Bu(n.inputs, r.inputs),
                Bu(n.declaredInputs, r.declaredInputs),
                Bu(n.outputs, r.outputs),
                bn(r) && r.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation);
              }
            }
            const o = r.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(n), a === ee && (e = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function BR(n) {
          let t = 0,
            e = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = t += r.hostVars),
              (r.hostAttrs = qa(r.hostAttrs, (e = qa(e, r.hostAttrs))));
          }
        })(i);
      }
      function kh(n) {
        return n === Pr ? {} : n === pe ? [] : n;
      }
      function jR(n, t) {
        const e = n.viewQuery;
        n.viewQuery = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      function HR(n, t) {
        const e = n.contentQueries;
        n.contentQueries = e
          ? (i, r, o) => {
              t(i, r, o), e(i, r, o);
            }
          : t;
      }
      function UR(n, t) {
        const e = n.hostBindings;
        n.hostBindings = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      let Cl = null;
      function ir() {
        if (!Cl) {
          const n = ye.Symbol;
          if (n && n.iterator) Cl = n.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const i = t[e];
              "entries" !== i &&
                "size" !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (Cl = i);
            }
          }
        }
        return Cl;
      }
      function ws(n) {
        return (
          !!(function Fh(n) {
            return (
              null !== n && ("function" == typeof n || "object" == typeof n)
            );
          })(n) &&
          (Array.isArray(n) || (!(n instanceof Map) && ir() in n))
        );
      }
      function gt(n, t, e) {
        return !Object.is(n[t], e) && ((n[t] = e), !0);
      }
      function ot(n, t, e, i) {
        const r = D();
        return gt(r, Hr(), t) && (le(), jn(Le(), r, n, t, e, i)), ot;
      }
      function co(n, t, e, i) {
        return gt(n, Hr(), e) ? t + z(e) + i : G;
      }
      function st(n, t, e, i, r, o, s, a) {
        const l = D(),
          c = le(),
          u = n + 22,
          d = c.firstCreatePass
            ? (function QR(n, t, e, i, r, o, s, a, l) {
                const c = t.consts,
                  u = so(t, n, 4, s || null, wi(c, a));
                Eh(t, e, u, wi(c, l)), $a(t, u);
                const d = (u.tViews = wh(
                  2,
                  u,
                  i,
                  r,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, t, e, i, r, o, s)
            : c.data[u];
        Pn(d, !1);
        const h = l[J].createComment("");
        cl(c, l, h, d),
          mt(h, l),
          yl(l, (l[u] = Qy(h, l, h, d))),
          ja(d) && Ch(c, l, d),
          null != s && Dh(l, d, a);
      }
      function se(n, t, e) {
        const i = D();
        return gt(i, Hr(), t) && Wt(le(), Le(), i, n, t, i[J], e, !1), se;
      }
      function Oh(n, t, e, i, r) {
        const s = r ? "class" : "style";
        xh(n, e, t.inputs[s], s, i);
      }
      function R(n, t, e, i) {
        const r = D(),
          o = le(),
          s = 22 + n,
          a = r[J],
          l = (r[s] = Xd(
            a,
            t,
            (function zA() {
              return $.lFrame.currentNamespace;
            })()
          )),
          c = o.firstCreatePass
            ? (function ek(n, t, e, i, r, o, s) {
                const a = t.consts,
                  c = so(t, n, 2, r, wi(a, o));
                return (
                  Eh(t, e, c, wi(a, s)),
                  null !== c.attrs && vl(c, c.attrs, !1),
                  null !== c.mergedAttrs && vl(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(s, o, r, 0, t, e, i)
            : o.data[s];
        Pn(c, !0);
        const u = c.mergedAttrs;
        null !== u && Wa(a, l, u);
        const d = c.classes;
        null !== d && rh(a, l, d);
        const h = c.styles;
        return (
          null !== h && uy(a, l, h),
          64 != (64 & c.flags) && cl(o, r, l, c),
          0 ===
            (function TA() {
              return $.lFrame.elementDepthCount;
            })() && mt(l, r),
          (function IA() {
            $.lFrame.elementDepthCount++;
          })(),
          ja(c) && (Ch(o, r, c), jy(o, c, r)),
          null !== i && Dh(r, c),
          R
        );
      }
      function x() {
        let n = Ye();
        id() ? rd() : ((n = n.parent), Pn(n, !1));
        const t = n;
        !(function xA() {
          $.lFrame.elementDepthCount--;
        })();
        const e = le();
        return (
          e.firstCreatePass && ($a(e, n), Yu(n) && e.queries.elementEnd(n)),
          null != t.classesWithoutHost &&
            (function YA(n) {
              return 0 != (16 & n.flags);
            })(t) &&
            Oh(e, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function ZA(n) {
              return 0 != (32 & n.flags);
            })(t) &&
            Oh(e, t, D(), t.stylesWithoutHost, !1),
          x
        );
      }
      function Ve(n, t, e, i) {
        return R(n, t, e, i), x(), Ve;
      }
      function Ms(n, t, e) {
        const i = D(),
          r = le(),
          o = n + 22,
          s = r.firstCreatePass
            ? (function tk(n, t, e, i, r) {
                const o = t.consts,
                  s = wi(o, i),
                  a = so(t, n, 8, "ng-container", s);
                return (
                  null !== s && vl(a, s, !0),
                  Eh(t, e, a, wi(o, r)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(o, r, i, t, e)
            : r.data[o];
        Pn(s, !0);
        const a = (i[o] = i[J].createComment(""));
        return (
          cl(r, i, a, s),
          mt(a, i),
          ja(s) && (Ch(r, i, s), jy(r, s, i)),
          null != e && Dh(i, s),
          Ms
        );
      }
      function Ss() {
        let n = Ye();
        const t = le();
        return (
          id() ? rd() : ((n = n.parent), Pn(n, !1)),
          t.firstCreatePass && ($a(t, n), Yu(n) && t.queries.elementEnd(n)),
          Ss
        );
      }
      function yo() {
        return D();
      }
      function As(n) {
        return !!n && "function" == typeof n.then;
      }
      const Ph = function gv(n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function W(n, t, e, i) {
        const r = D(),
          o = le(),
          s = Ye();
        return _v(o, r, r[J], s, n, t, 0, i), W;
      }
      function wl(n, t) {
        const e = Ye(),
          i = D(),
          r = le();
        return _v(r, i, nv(sd(r.data), e, i), e, n, t), wl;
      }
      function _v(n, t, e, i, r, o, s, a) {
        const l = ja(i),
          u = n.firstCreatePass && tv(n),
          d = t[8],
          h = ev(t);
        let f = !0;
        if (3 & i.type || a) {
          const y = on(i, t),
            v = a ? a(y) : y,
            w = h.length,
            b = a ? (U) => a(ze(U[i.index])) : i.index;
          let S = null;
          if (
            (!a &&
              l &&
              (S = (function nk(n, t, e, i) {
                const r = n.cleanup;
                if (null != r)
                  for (let o = 0; o < r.length - 1; o += 2) {
                    const s = r[o];
                    if (s === e && r[o + 1] === i) {
                      const a = t[7],
                        l = r[o + 2];
                      return a.length > l ? a[l] : null;
                    }
                    "string" == typeof s && (o += 2);
                  }
                return null;
              })(n, t, r, i.index)),
            null !== S)
          )
            ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = o),
              (S.__ngLastListenerFn__ = o),
              (f = !1);
          else {
            o = vv(i, t, d, o, !1);
            const U = e.listen(v, r, o);
            h.push(o, U), u && u.push(r, b, w, w + 1);
          }
        } else o = vv(i, t, d, o, !1);
        const p = i.outputs;
        let m;
        if (f && null !== p && (m = p[r])) {
          const y = m.length;
          if (y)
            for (let v = 0; v < y; v += 2) {
              const ae = t[m[v]][m[v + 1]].subscribe(o),
                Fe = h.length;
              h.push(o, ae), u && u.push(r, i.index, Fe, -(Fe + 1));
            }
        }
      }
      function yv(n, t, e, i) {
        try {
          return !1 !== e(i);
        } catch (r) {
          return iv(n, r), !1;
        }
      }
      function vv(n, t, e, i, r) {
        return function o(s) {
          if (s === Function) return i;
          Ah(2 & n.flags ? Ut(n.index, t) : t);
          let l = yv(t, 0, i, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = yv(t, 0, c, s) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Mt(n = 1) {
        return (function VA(n) {
          return ($.lFrame.contextLView = (function BA(n, t) {
            for (; n > 0; ) (t = t[15]), n--;
            return t;
          })(n, $.lFrame.contextLView))[8];
        })(n);
      }
      function ik(n, t) {
        let e = null;
        const i = (function wx(n) {
          const t = n.attrs;
          if (null != t) {
            const e = t.indexOf(5);
            if (0 == (1 & e)) return t[e + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < t.length; r++) {
          const o = t[r];
          if ("*" !== o) {
            if (null === i ? py(n, o, !0) : Sx(i, o)) return r;
          } else e = r;
        }
        return e;
      }
      function or(n) {
        const t = D()[16][6];
        if (!t.projection) {
          const i = (t.projection = ss(n ? n.length : 1, null)),
            r = i.slice();
          let o = t.child;
          for (; null !== o; ) {
            const s = n ? ik(o, n) : 0;
            null !== s &&
              (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o)),
              (o = o.next);
          }
        }
      }
      function at(n, t = 0, e) {
        const i = D(),
          r = le(),
          o = so(r, 22 + n, 16, null, e || null);
        null === o.projection && (o.projection = t),
          rd(),
          64 != (64 & o.flags) &&
            (function gx(n, t, e) {
              cy(t[J], 0, t, e, J_(n, e, t), iy(e.parent || t[6], e, t));
            })(r, i, o);
      }
      function wn(n, t, e) {
        return Nh(n, "", t, "", e), wn;
      }
      function Nh(n, t, e, i, r) {
        const o = D(),
          s = co(o, t, e, i);
        return s !== G && Wt(le(), Le(), o, n, s, o[J], r, !1), Nh;
      }
      function Tv(n, t, e, i, r) {
        const o = n[e + 1],
          s = null === t;
        let a = i ? Dn(o) : si(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = n[a + 1];
          sk(n[a], t) && ((l = !0), (n[a + 1] = i ? dh(u) : ch(u))),
            (a = i ? Dn(u) : si(u));
        }
        l && (n[e + 1] = i ? ch(o) : dh(o));
      }
      function sk(n, t) {
        return (
          null === n ||
          null == t ||
          (Array.isArray(n) ? n[1] : n) === t ||
          (!(!Array.isArray(n) || "string" != typeof t) && Zr(n, t) >= 0)
        );
      }
      function St(n, t) {
        return (
          (function En(n, t, e, i) {
            const r = D(),
              o = le(),
              s = (function ti(n) {
                const t = $.lFrame,
                  e = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + n), e;
              })(2);
            o.firstUpdatePass &&
              (function Lv(n, t, e, i) {
                const r = n.data;
                if (null === r[e + 1]) {
                  const o = r[wt()],
                    s = (function Nv(n, t) {
                      return t >= n.expandoStartIndex;
                    })(n, e);
                  (function Hv(n, t) {
                    return 0 != (n.flags & (t ? 16 : 32));
                  })(o, i) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function mk(n, t, e, i) {
                      const r = sd(n);
                      let o = i ? t.residualClasses : t.residualStyles;
                      if (null === r)
                        0 === (i ? t.classBindings : t.styleBindings) &&
                          ((e = Ts((e = Lh(null, n, t, e, i)), t.attrs, i)),
                          (o = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || n[s] !== r)
                          if (((e = Lh(r, n, t, e, i)), null === o)) {
                            let l = (function gk(n, t, e) {
                              const i = e ? t.classBindings : t.styleBindings;
                              if (0 !== si(i)) return n[Dn(i)];
                            })(n, t, i);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = Lh(null, n, t, l[1], i)),
                              (l = Ts(l, t.attrs, i)),
                              (function _k(n, t, e, i) {
                                n[Dn(e ? t.classBindings : t.styleBindings)] =
                                  i;
                              })(n, t, i, l));
                          } else
                            o = (function yk(n, t, e) {
                              let i;
                              const r = t.directiveEnd;
                              for (
                                let o = 1 + t.directiveStylingLast;
                                o < r;
                                o++
                              )
                                i = Ts(i, n[o].hostAttrs, e);
                              return Ts(i, t.attrs, e);
                            })(n, t, i);
                      }
                      return (
                        void 0 !== o &&
                          (i
                            ? (t.residualClasses = o)
                            : (t.residualStyles = o)),
                        e
                      );
                    })(r, o, t, i)),
                    (function rk(n, t, e, i, r, o) {
                      let s = o ? t.classBindings : t.styleBindings,
                        a = Dn(s),
                        l = si(s);
                      n[i] = e;
                      let u,
                        c = !1;
                      if (Array.isArray(e)) {
                        const d = e;
                        (u = d[1]), (null === u || Zr(d, u) > 0) && (c = !0);
                      } else u = e;
                      if (r)
                        if (0 !== l) {
                          const h = Dn(n[a + 1]);
                          (n[i + 1] = fl(h, a)),
                            0 !== h && (n[h + 1] = uh(n[h + 1], i)),
                            (n[a + 1] = (function Kx(n, t) {
                              return (131071 & n) | (t << 17);
                            })(n[a + 1], i));
                        } else
                          (n[i + 1] = fl(a, 0)),
                            0 !== a && (n[a + 1] = uh(n[a + 1], i)),
                            (a = i);
                      else
                        (n[i + 1] = fl(l, 0)),
                          0 === a ? (a = i) : (n[l + 1] = uh(n[l + 1], i)),
                          (l = i);
                      c && (n[i + 1] = ch(n[i + 1])),
                        Tv(n, u, i, !0),
                        Tv(n, u, i, !1),
                        (function ok(n, t, e, i, r) {
                          const o = r ? n.residualClasses : n.residualStyles;
                          null != o &&
                            "string" == typeof t &&
                            Zr(o, t) >= 0 &&
                            (e[i + 1] = dh(e[i + 1]));
                        })(t, u, n, i, o),
                        (s = fl(a, l)),
                        o ? (t.classBindings = s) : (t.styleBindings = s);
                    })(r, o, t, e, s, i);
                }
              })(o, n, s, i),
              t !== G &&
                gt(r, s, t) &&
                (function Bv(n, t, e, i, r, o, s, a) {
                  if (!(3 & t.type)) return;
                  const l = n.data,
                    c = l[a + 1];
                  El(
                    (function xy(n) {
                      return 1 == (1 & n);
                    })(c)
                      ? jv(l, t, e, r, si(c), s)
                      : void 0
                  ) ||
                    (El(o) ||
                      ((function Iy(n) {
                        return 2 == (2 & n);
                      })(c) &&
                        (o = jv(l, null, e, r, a, s))),
                    (function yx(n, t, e, i, r) {
                      if (t) r ? n.addClass(e, i) : n.removeClass(e, i);
                      else {
                        let o = -1 === i.indexOf("-") ? void 0 : Pt.DashCase;
                        null == r
                          ? n.removeStyle(e, i, o)
                          : ("string" == typeof r &&
                              r.endsWith("!important") &&
                              ((r = r.slice(0, -10)), (o |= Pt.Important)),
                            n.setStyle(e, i, r, o));
                      }
                    })(i, s, Ha(wt(), e), r, o));
                })(
                  o,
                  o.data[wt()],
                  r,
                  r[J],
                  n,
                  (r[s + 1] = (function Ck(n, t) {
                    return (
                      null == n ||
                        ("string" == typeof t
                          ? (n += t)
                          : "object" == typeof n && (n = Ce(Gt(n)))),
                      n
                    );
                  })(t, e)),
                  i,
                  s
                );
          })(n, t, null, !0),
          St
        );
      }
      function Lh(n, t, e, i, r) {
        let o = null;
        const s = e.directiveEnd;
        let a = e.directiveStylingLast;
        for (
          -1 === a ? (a = e.directiveStart) : a++;
          a < s && ((o = t[a]), (i = Ts(i, o.hostAttrs, r)), o !== n);

        )
          a++;
        return null !== n && (e.directiveStylingLast = a), i;
      }
      function Ts(n, t, e) {
        const i = e ? 1 : 2;
        let r = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                zt(n, s, !!e || t[++o]));
          }
        return void 0 === n ? null : n;
      }
      function jv(n, t, e, i, r, o) {
        const s = null === t;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = e[r + 1];
          h === G && (h = d ? pe : void 0);
          let f = d ? yd(h, i) : u === i ? h : void 0;
          if ((c && !El(f) && (f = yd(l, i)), El(f) && ((a = f), s))) return a;
          const p = n[r + 1];
          r = s ? Dn(p) : si(p);
        }
        if (null !== t) {
          let l = o ? t.residualClasses : t.residualStyles;
          null != l && (a = yd(l, i));
        }
        return a;
      }
      function El(n) {
        return void 0 !== n;
      }
      function ie(n, t = "") {
        const e = D(),
          i = le(),
          r = n + 22,
          o = i.firstCreatePass ? so(i, r, 1, t, null) : i.data[r],
          s = (e[r] = (function Qd(n, t) {
            return n.createText(t);
          })(e[J], t));
        cl(i, e, s, o), Pn(o, !1);
      }
      function li(n) {
        return Is("", n, ""), li;
      }
      function Is(n, t, e) {
        const i = D(),
          r = co(i, n, t, e);
        return (
          r !== G &&
            (function ai(n, t, e) {
              const i = Ha(t, n);
              !(function Z_(n, t, e) {
                n.setValue(t, e);
              })(n[J], i, e);
            })(i, wt(), r),
          Is
        );
      }
      function Ml(n, t, e) {
        const i = D();
        return gt(i, Hr(), t) && Wt(le(), Le(), i, n, t, i[J], e, !0), Ml;
      }
      function Sl(n, t, e) {
        const i = D();
        if (gt(i, Hr(), t)) {
          const o = le(),
            s = Le();
          Wt(o, s, i, n, t, nv(sd(o.data), s, i), e, !0);
        }
        return Sl;
      }
      const Co = "en-US";
      let ab = Co;
      function jh(n, t, e, i, r) {
        if (((n = H(n)), Array.isArray(n)))
          for (let o = 0; o < n.length; o++) jh(n[o], t, e, i, r);
        else {
          const o = le(),
            s = D();
          let a = Ji(n) ? n : H(n.provide),
            l = O_(n);
          const c = Ye(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (Ji(n) || !n.multi) {
            const f = new es(l, r, g),
              p = Uh(a, t, r ? u : u + h, d);
            -1 === p
              ? (Za(ns(c, s), o, a),
                Hh(o, n, t.length),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(f),
                s.push(f))
              : ((e[p] = f), (s[p] = f));
          } else {
            const f = Uh(a, t, u + h, d),
              p = Uh(a, t, u, u + h),
              m = f >= 0 && e[f],
              y = p >= 0 && e[p];
            if ((r && !y) || (!r && !m)) {
              Za(ns(c, s), o, a);
              const v = (function BF(n, t, e, i, r) {
                const o = new es(n, e, g);
                return (
                  (o.multi = []),
                  (o.index = t),
                  (o.componentProviders = 0),
                  kb(o, r, i && !e),
                  o
                );
              })(r ? VF : LF, e.length, r, i, l);
              !r && y && (e[p].providerFactory = v),
                Hh(o, n, t.length, 0),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(v),
                s.push(v);
            } else Hh(o, n, f > -1 ? f : p, kb(e[r ? p : f], l, !r && i));
            !r && i && y && e[p].componentProviders++;
          }
        }
      }
      function Hh(n, t, e, i) {
        const r = Ji(t),
          o = (function dI(n) {
            return !!n.useClass;
          })(t);
        if (r || o) {
          const l = (o ? H(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && t.multi) {
              const u = c.indexOf(e);
              -1 === u ? c.push(e, [i, l]) : c[u + 1].push(i, l);
            } else c.push(e, l);
          }
        }
      }
      function kb(n, t, e) {
        return e && n.componentProviders++, n.multi.push(t) - 1;
      }
      function Uh(n, t, e, i) {
        for (let r = e; r < i; r++) if (t[r] === n) return r;
        return -1;
      }
      function LF(n, t, e, i) {
        return $h(this.multi, []);
      }
      function VF(n, t, e, i) {
        const r = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = is(e, e[1], this.providerFactory.index, i);
          (o = a.slice(0, s)), $h(r, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), $h(r, o);
        return o;
      }
      function $h(n, t) {
        for (let e = 0; e < n.length; e++) t.push((0, n[e])());
        return t;
      }
      function Me(n, t = []) {
        return (e) => {
          e.providersResolver = (i, r) =>
            (function NF(n, t, e) {
              const i = le();
              if (i.firstCreatePass) {
                const r = bn(n);
                jh(e, i.data, i.blueprint, r, !0),
                  jh(t, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, t);
        };
      }
      class ar {}
      class Fb {}
      class Ob extends ar {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Rh(this));
          const i = jt(t);
          (this._bootstrapComponents = oi(i.bootstrap)),
            (this._r3Injector = Cy(
              t,
              e,
              [
                { provide: ar, useValue: this },
                { provide: er, useValue: this.componentFactoryResolver },
              ],
              Ce(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class zh extends Fb {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Ob(this.moduleType, t);
        }
      }
      class HF extends ar {
        constructor(t, e, i) {
          super(),
            (this.componentFactoryResolver = new Rh(this)),
            (this.instance = null);
          const r = new F_(
            [
              ...t,
              { provide: ar, useValue: this },
              { provide: er, useValue: this.componentFactoryResolver },
            ],
            e || al(),
            i,
            new Set(["environment"])
          );
          (this.injector = r), r.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Rl(n, t, e = null) {
        return new HF(n, t, e).injector;
      }
      function Wh(n) {
        return (t) => {
          setTimeout(n, void 0, t);
        };
      }
      const Se = class mO extends te {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, i) {
          let r = t,
            o = e || (() => null),
            s = i;
          if (t && "object" == typeof t) {
            const l = t;
            (r = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = Wh(o)), r && (r = Wh(r)), s && (s = Wh(s)));
          const a = super.subscribe({ next: r, error: o, complete: s });
          return t instanceof ct && t.add(a), a;
        }
      };
      function gO() {
        return this._results[ir()]();
      }
      class qh {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = ir(),
            i = qh.prototype;
          i[e] || (i[e] = gO);
        }
        get changes() {
          return this._changes || (this._changes = new Se());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const i = this;
          i.dirty = !1;
          const r = $t(t);
          (this._changesDetected = !(function aT(n, t, e) {
            if (n.length !== t.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                o = t[i];
              if ((e && ((r = e(r)), (o = e(o))), o !== r)) return !1;
            }
            return !0;
          })(i._results, r, e)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let Sn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = vO), n;
      })();
      const _O = Sn,
        yO = class extends _O {
          constructor(t, e, i) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = i);
          }
          createEmbeddedView(t, e) {
            const i = this._declarationTContainer.tViews,
              r = gl(
                this._declarationLView,
                i,
                t,
                16,
                null,
                i.declTNode,
                null,
                null,
                null,
                null,
                e || null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (r[19] = s.createEmbeddedView(i)),
              _l(i, r, t),
              new Cs(r)
            );
          }
        };
      function vO() {
        return kl(Ye(), D());
      }
      function kl(n, t) {
        return 4 & n.type ? new yO(t, n, no(n, t)) : null;
      }
      let ln = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = bO), n;
      })();
      function bO() {
        return Kb(Ye(), D());
      }
      const CO = ln,
        Wb = class extends CO {
          constructor(t, e, i) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = i);
          }
          get element() {
            return no(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new zr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ya(this._hostTNode, this._hostLView);
            if ($g(t)) {
              const e = $r(t, this._hostLView),
                i = Ur(t);
              return new zr(e[1].data[i + 8], e);
            }
            return new zr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = qb(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, e, i) {
            let r, o;
            "number" == typeof i
              ? (r = i)
              : null != i && ((r = i.index), (o = i.injector));
            const s = t.createEmbeddedView(e || {}, o);
            return this.insert(s, r), s;
          }
          createComponent(t, e, i, r, o) {
            const s =
              t &&
              !(function os(n) {
                return "function" == typeof n;
              })(t);
            let a;
            if (s) a = e;
            else {
              const d = e || {};
              (a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (o = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Ds(_e(t)),
              c = i || this.parentInjector;
            if (!o && null == l.ngModule) {
              const h = (s ? c : this.parentInjector).get(Si, null);
              h && (o = h);
            }
            const u = l.create(c, r, void 0, o);
            return this.insert(u.hostView, a), u;
          }
          insert(t, e) {
            const i = t._lView,
              r = i[1];
            if (
              (function AA(n) {
                return vn(n[3]);
              })(i)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  h = new Wb(d, d[6], d[3]);
                h.detach(h.indexOf(t));
              }
            }
            const o = this._adjustIndex(e),
              s = this._lContainer;
            !(function ux(n, t, e, i) {
              const r = 10 + i,
                o = e.length;
              i > 0 && (e[r - 1][4] = t),
                i < o - 10
                  ? ((t[4] = e[r]), e_(e, 10 + i, t))
                  : (e.push(t), (t[4] = null)),
                (t[3] = e);
              const s = t[17];
              null !== s &&
                e !== s &&
                (function dx(n, t) {
                  const e = n[9];
                  t[16] !== t[3][3][16] && (n[2] = !0),
                    null === e ? (n[9] = [t]) : e.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(n), (t[2] |= 64);
            })(r, i, s, o);
            const a = nh(o, s),
              l = i[J],
              c = ll(l, s[7]);
            return (
              null !== c &&
                (function ax(n, t, e, i, r, o) {
                  (i[0] = r), (i[6] = t), vs(n, i, e, 1, r, o);
                })(r, s[6], l, i, c, a),
              t.attachToViewContainerRef(),
              e_(Kh(s), o, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = qb(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              i = Jd(this._lContainer, e);
            i && (Xa(Kh(this._lContainer), e), X_(i[1], i));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              i = Jd(this._lContainer, e);
            return i && null != Xa(Kh(this._lContainer), e) ? new Cs(i) : null;
          }
          _adjustIndex(t, e = 0) {
            return t ?? this.length + e;
          }
        };
      function qb(n) {
        return n[8];
      }
      function Kh(n) {
        return n[8] || (n[8] = []);
      }
      function Kb(n, t) {
        let e;
        const i = t[n.index];
        if (vn(i)) e = i;
        else {
          let r;
          if (8 & n.type) r = ze(i);
          else {
            const o = t[J];
            r = o.createComment("");
            const s = on(n, t);
            nr(
              o,
              ll(o, s),
              r,
              (function mx(n, t) {
                return n.nextSibling(t);
              })(o, s),
              !1
            );
          }
          (t[n.index] = e = Qy(i, t, r, n)), yl(t, e);
        }
        return new Wb(e, n, t);
      }
      class Yh {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Yh(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Zh {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const i =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let o = 0; o < i; o++) {
              const s = e.getByIndex(o);
              r.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Zh(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Jb(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Yb {
        constructor(t, e, i = null) {
          (this.predicate = t), (this.flags = e), (this.read = i);
        }
      }
      class Qh {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== e ? e.length : 0,
              o = this.getByIndex(i).embeddedTView(t, r);
            o &&
              ((o.indexInDeclarationView = i),
              null !== e ? e.push(o) : (e = [o]));
          }
          return null !== e ? new Qh(e) : null;
        }
        template(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Xh {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Xh(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let i = t.parent;
            for (; null !== i && 8 & i.type && i.index !== e; ) i = i.parent;
            return e === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r];
              this.matchTNodeWithReadOption(t, e, EO(e, o)),
                this.matchTNodeWithReadOption(t, e, Qa(e, t, o, !1, !1));
            }
          else
            i === Sn
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Qa(e, t, i, !1, !1));
        }
        matchTNodeWithReadOption(t, e, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === ve || r === ln || (r === Sn && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const o = Qa(e, t, r, !1, !1);
                null !== o && this.addMatch(e.index, o);
              }
            else this.addMatch(e.index, i);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function EO(n, t) {
        const e = n.localNames;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) if (e[i] === t) return e[i + 1];
        return null;
      }
      function SO(n, t, e, i) {
        return -1 === e
          ? (function MO(n, t) {
              return 11 & n.type ? no(n, t) : 4 & n.type ? kl(n, t) : null;
            })(t, n)
          : -2 === e
          ? (function AO(n, t, e) {
              return e === ve
                ? no(t, n)
                : e === Sn
                ? kl(t, n)
                : e === ln
                ? Kb(t, n)
                : void 0;
            })(n, t, i)
          : is(n, n[1], e, t);
      }
      function Zb(n, t, e, i) {
        const r = t[19].queries[i];
        if (null === r.matches) {
          const o = n.data,
            s = e.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : SO(t, o[c], s[l + 1], e.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function Jh(n, t, e, i) {
        const r = n.queries.getByIndex(e),
          o = r.matches;
        if (null !== o) {
          const s = Zb(n, t, r, e);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) i.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = t[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && Jh(h[1], h, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  Jh(f[1], f, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function Xe(n) {
        const t = D(),
          e = le(),
          i = Fg();
        ad(i + 1);
        const r = Jb(e, i);
        if (n.dirty && Sg(t) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) n.reset([]);
          else {
            const o = r.crossesNgTemplate ? Jh(e, t, i, []) : Zb(e, t, r, i);
            n.reset(o, wI), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function lr(n, t, e) {
        const i = le();
        i.firstCreatePass &&
          (Xb(i, new Yb(n, t, e), -1),
          2 == (2 & t) && (i.staticViewQueries = !0)),
          Qb(i, D(), t);
      }
      function qt(n, t, e, i) {
        const r = le();
        if (r.firstCreatePass) {
          const o = Ye();
          Xb(r, new Yb(t, e, i), o.index),
            (function IO(n, t) {
              const e = n.contentQueries || (n.contentQueries = []);
              t !== (e.length ? e[e.length - 1] : -1) &&
                e.push(n.queries.length - 1, t);
            })(r, n),
            2 == (2 & e) && (r.staticContentQueries = !0);
        }
        Qb(r, D(), e);
      }
      function Je() {
        return (function TO(n, t) {
          return n[19].queries[t].queryList;
        })(D(), Fg());
      }
      function Qb(n, t, e) {
        const i = new qh(4 == (4 & e));
        Uy(n, t, i, i.destroy),
          null === t[19] && (t[19] = new Zh()),
          t[19].queries.push(new Yh(i));
      }
      function Xb(n, t, e) {
        null === n.queries && (n.queries = new Qh()),
          n.queries.track(new Xh(t, e));
      }
      function Jb(n, t) {
        return n.queries.getByIndex(t);
      }
      function Ol(...n) {}
      const Pl = new E("Application Initializer");
      let Nl = (() => {
        class n {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = Ol),
              (this.reject = Ol),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]();
                if (As(o)) e.push(o);
                else if (Ph(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({ complete: a, error: l });
                  });
                  e.push(s);
                }
              }
            Promise.all(e)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === e.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Pl, 8));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Ls = new E("AppId", {
        providedIn: "root",
        factory: function yC() {
          return `${sf()}${sf()}${sf()}`;
        },
      });
      function sf() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const vC = new E("Platform Initializer"),
        Ll = new E("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        bC = new E("appBootstrapListener"),
        Ii = new E("AnimationModuleType");
      let ZO = (() => {
        class n {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      const zn = new E("LocaleId", {
        providedIn: "root",
        factory: () =>
          sn(zn, L.Optional | L.SkipSelf) ||
          (function QO() {
            return (typeof $localize < "u" && $localize.locale) || Co;
          })(),
      });
      class JO {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      let af = (() => {
        class n {
          compileModuleSync(e) {
            return new zh(e);
          }
          compileModuleAsync(e) {
            return Promise.resolve(this.compileModuleSync(e));
          }
          compileModuleAndAllComponentsSync(e) {
            const i = this.compileModuleSync(e),
              o = oi(jt(e).declarations).reduce((s, a) => {
                const l = _e(a);
                return l && s.push(new Ds(l)), s;
              }, []);
            return new JO(i, o);
          }
          compileModuleAndAllComponentsAsync(e) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const nP = (() => Promise.resolve(0))();
      function lf(n) {
        typeof Zone > "u"
          ? nP.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class Q {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se(!1)),
            (this.onMicrotaskEmpty = new Se(!1)),
            (this.onStable = new Se(!1)),
            (this.onError = new Se(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const r = this;
          if (
            ((r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.AsyncStackTaggingZoneSpec)
          ) {
            const o = Zone.AsyncStackTaggingZoneSpec;
            r._inner = r._inner.fork(new o("Angular"));
          }
          Zone.TaskTrackingZoneSpec &&
            (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && e),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function iP() {
              let n = ye.requestAnimationFrame,
                t = ye.cancelAnimationFrame;
              if (typeof Zone < "u" && n && t) {
                const e = n[Zone.__symbol__("OriginalDelegate")];
                e && (n = e);
                const i = t[Zone.__symbol__("OriginalDelegate")];
                i && (t = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function sP(n) {
              const t = () => {
                !(function oP(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(ye, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                uf(n),
                                (n.isCheckStableRunning = !0),
                                cf(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    uf(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (e, i, r, o, s, a) => {
                  try {
                    return wC(n), e.invokeTask(r, o, s, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      t(),
                      EC(n);
                  }
                },
                onInvoke: (e, i, r, o, s, a, l) => {
                  try {
                    return wC(n), e.invoke(r, o, s, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && t(), EC(n);
                  }
                },
                onHasTask: (e, i, r, o) => {
                  e.hasTask(r, o),
                    i === r &&
                      ("microTask" == o.change
                        ? ((n._hasPendingMicrotasks = o.microTask),
                          uf(n),
                          cf(n))
                        : "macroTask" == o.change &&
                          (n.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (e, i, r, o) => (
                  e.handleError(r, o),
                  n.runOutsideAngular(() => n.onError.emit(o)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Q.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (Q.isInAngularZone()) throw new C(909, !1);
        }
        run(t, e, i) {
          return this._inner.run(t, e, i);
        }
        runTask(t, e, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + r, t, rP, Ol, Ol);
          try {
            return o.runTask(s, e, i);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, e, i) {
          return this._inner.runGuarded(t, e, i);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const rP = {};
      function cf(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function uf(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function wC(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function EC(n) {
        n._nesting--, cf(n);
      }
      class aP {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Se()),
            (this.onMicrotaskEmpty = new Se()),
            (this.onStable = new Se()),
            (this.onError = new Se());
        }
        run(t, e, i) {
          return t.apply(e, i);
        }
        runGuarded(t, e, i) {
          return t.apply(e, i);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, i, r) {
          return t.apply(e, i);
        }
      }
      const MC = new E(""),
        Vl = new E("");
      let ff,
        df = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                ff ||
                  ((function lP(n) {
                    ff = n;
                  })(r),
                  r.addToWindow(i)),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Q.assertNotInAngularZone(),
                        lf(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                lf(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(e) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((e) => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, i, r) {
              let o = -1;
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    e(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: e, timeoutId: o, updateCb: r });
            }
            whenStable(e, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(e, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(e) {
              this.registry.registerApplication(e, this);
            }
            unregisterApplication(e) {
              this.registry.unregisterApplication(e);
            }
            findProviders(e, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Q), _(hf), _(Vl));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        hf = (() => {
          class n {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(e, i) {
              this._applications.set(e, i);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, i = !0) {
              return ff?.findTestabilityInTree(this, e, i) ?? null;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({
              token: n,
              factory: n.ɵfac,
              providedIn: "platform",
            })),
            n
          );
        })(),
        xi = null;
      const SC = new E("AllowMultipleToken"),
        pf = new E("PlatformDestroyListeners");
      class AC {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function IC(n, t, e = []) {
        const i = `Platform: ${t}`,
          r = new E(i);
        return (o = []) => {
          let s = mf();
          if (!s || s.injector.get(SC, !1)) {
            const a = [...e, ...o, { provide: r, useValue: !0 }];
            n
              ? n(a)
              : (function dP(n) {
                  if (xi && !xi.get(SC, !1)) throw new C(400, !1);
                  xi = n;
                  const t = n.get(RC);
                  (function TC(n) {
                    const t = n.get(vC, null);
                    t && t.forEach((e) => e());
                  })(n);
                })(
                  (function xC(n = [], t) {
                    return xe.create({
                      name: t,
                      providers: [
                        { provide: Fd, useValue: "platform" },
                        { provide: pf, useValue: new Set([() => (xi = null)]) },
                        ...n,
                      ],
                    });
                  })(a, i)
                );
          }
          return (function fP(n) {
            const t = mf();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function mf() {
        return xi?.get(RC) ?? null;
      }
      let RC = (() => {
        class n {
          constructor(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, i) {
            const r = (function pP(n, t) {
                let e;
                return (
                  (e =
                    "noop" === n
                      ? new aP()
                      : ("zone.js" === n ? void 0 : n) || new Q(t)),
                  e
                );
              })(
                i?.ngZone,
                (function kC(n) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!n || !n.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!n || !n.ngZoneRunCoalescing) || !1,
                  };
                })(i)
              ),
              o = [{ provide: Q, useValue: r }];
            return r.run(() => {
              const s = xe.create({
                  providers: o,
                  parent: this.injector,
                  name: e.moduleType.name,
                }),
                a = e.create(s),
                l = a.injector.get(ri, null);
              if (!l) throw new C(402, !1);
              return (
                r.runOutsideAngular(() => {
                  const c = r.onError.subscribe({
                    next: (u) => {
                      l.handleError(u);
                    },
                  });
                  a.onDestroy(() => {
                    Bl(this._modules, a), c.unsubscribe();
                  });
                }),
                (function FC(n, t, e) {
                  try {
                    const i = e();
                    return As(i)
                      ? i.catch((r) => {
                          throw (
                            (t.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (t.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(l, r, () => {
                  const c = a.injector.get(Nl);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function lb(n) {
                          Bt(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (ab = n.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(zn, Co) || Co),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, i = []) {
            const r = OC({}, i);
            return (function cP(n, t, e) {
              const i = new zh(e);
              return Promise.resolve(i);
            })(0, 0, e).then((o) => this.bootstrapModuleFactory(o, r));
          }
          _moduleDoBootstrap(e) {
            const i = e.injector.get(So);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!e.instance.ngDoBootstrap) throw new C(403, !1);
              e.instance.ngDoBootstrap(i);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const e = this._injector.get(pf, null);
            e && (e.forEach((i) => i()), e.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(xe));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "platform" })),
          n
        );
      })();
      function OC(n, t) {
        return Array.isArray(t) ? t.reduce(OC, n) : { ...n, ...t };
      }
      let So = (() => {
        class n {
          constructor(e, i, r) {
            (this._zone = e),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const o = new De((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new De((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Q.assertNotInAngularZone(),
                      lf(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  Q.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = Ra(o, s.pipe(hg()));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(e, i) {
            const r = e instanceof P_;
            if (!this._injector.get(Nl).done)
              throw (
                (!r &&
                  (function Eo(n) {
                    const t = _e(n) || bt(n) || Ct(n);
                    return null !== t && t.standalone;
                  })(e),
                new C(405, false))
              );
            let s;
            (s = r ? e : this._injector.get(er).resolveComponentFactory(e)),
              this.componentTypes.push(s.componentType);
            const a = (function uP(n) {
                return n.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(ar),
              c = s.create(xe.NULL, [], i || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(MC, null);
            return (
              d?.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  Bl(this.components, c),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(e)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const i = e;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(e) {
            const i = e;
            Bl(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(bC, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(e));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((e) => e()),
                  this._views.slice().forEach((e) => e.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(e) {
            return (
              this._destroyListeners.push(e),
              () => Bl(this._destroyListeners, e)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const e = this._injector;
            e.destroy && !e.destroyed && e.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Q), _(Si), _(ri));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function Bl(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      let NC = !0,
        cr = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = _P), n;
        })();
      function _P(n) {
        return (function yP(n, t, e) {
          if (Ba(n) && !e) {
            const i = Ut(n.index, t);
            return new Cs(i, i);
          }
          return 47 & n.type ? new Cs(t[16], t) : null;
        })(Ye(), D(), 16 == (16 & n));
      }
      class HC {
        constructor() {}
        supports(t) {
          return ws(t);
        }
        create(t) {
          return new EP(t);
        }
      }
      const wP = (n, t) => t;
      class EP {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || wP);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null;
          for (; e || i; ) {
            const s = !i || (e && e.currentIndex < $C(i, r, o)) ? e : i,
              a = $C(s, r, o),
              l = s.currentIndex;
            if (s === i) r--, (i = i._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) r++;
            else {
              o || (o = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let h = 0; h < c; h++) {
                  const f = h < o.length ? o[h] : (o[h] = 0),
                    p = f + h;
                  u <= p && p < c && (o[h] = f + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !ws(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let r,
            o,
            s,
            e = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== e && Object.is(e.trackById, s)
                  ? (i && (e = this._verifyReinsertion(e, o, s, a)),
                    Object.is(e.item, o) || this._addIdentityChange(e, o))
                  : ((e = this._mismatch(e, o, s, a)), (i = !0)),
                (e = e._next);
          } else
            (r = 0),
              (function qR(n, t) {
                if (Array.isArray(n))
                  for (let e = 0; e < n.length; e++) t(n[e]);
                else {
                  const e = n[ir()]();
                  let i;
                  for (; !(i = e.next()).done; ) t(i.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(r, a)),
                  null !== e && Object.is(e.trackById, s)
                    ? (i && (e = this._verifyReinsertion(e, a, s, r)),
                      Object.is(e.item, a) || this._addIdentityChange(e, a))
                    : ((e = this._mismatch(e, a, s, r)), (i = !0)),
                  (e = e._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(e), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, i, r) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, o, r))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, o, r))
              : (t = this._addAfter(new MP(e, i), o, r)),
            t
          );
        }
        _verifyReinsertion(t, e, i, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _moveAfter(t, e, i) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _addAfter(t, e, i) {
          return (
            this._insertAfter(t, e, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, i) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new UC()),
            this._linkedRecords.put(t),
            (t.currentIndex = i),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            i = t._next;
          return (
            null === e ? (this._itHead = i) : (e._next = i),
            null === i ? (this._itTail = e) : (i._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new UC()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class MP {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class SP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === e || e <= i.currentIndex) &&
              Object.is(i.trackById, t)
            )
              return i;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            i = t._nextDup;
          return (
            null === e ? (this._head = i) : (e._nextDup = i),
            null === i ? (this._tail = e) : (i._prevDup = e),
            null === this._head
          );
        }
      }
      class UC {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let i = this.map.get(e);
          i || ((i = new SP()), this.map.set(e, i)), i.add(t);
        }
        get(t, e) {
          const r = this.map.get(t);
          return r ? r.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function $C(n, t, e) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return e && i < e.length && (r = e[i]), i + t + r;
      }
      function GC() {
        return new Ul([new HC()]);
      }
      let Ul = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (null != i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return {
              provide: n,
              useFactory: (i) => n.create(e, i || GC()),
              deps: [[n, new Xr(), new Ln()]],
            };
          }
          find(e) {
            const i = this.factories.find((r) => r.supports(e));
            if (null != i) return i;
            throw new C(901, !1);
          }
        }
        return (n.ɵprov = M({ token: n, providedIn: "root", factory: GC })), n;
      })();
      const RP = IC(null, "core", []);
      let kP = (() => {
        class n {
          constructor(e) {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(So));
          }),
          (n.ɵmod = he({ type: n })),
          (n.ɵinj = ue({})),
          n
        );
      })();
      function ui(n) {
        return "boolean" == typeof n ? n : null != n && "false" !== n;
      }
      let $l = null;
      function Gn() {
        return $l;
      }
      const K = new E("DocumentToken");
      let zl = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({
            token: n,
            factory: function () {
              return (function NP() {
                return _(qC);
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      const LP = new E("Location Initialized");
      let qC = (() => {
        class n extends zl {
          constructor(e) {
            super(), (this._doc = e), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Gn().getBaseHref(this._doc);
          }
          onPopState(e) {
            const i = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("popstate", e, !1),
              () => i.removeEventListener("popstate", e)
            );
          }
          onHashChange(e) {
            const i = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("hashchange", e, !1),
              () => i.removeEventListener("hashchange", e)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(e) {
            this.location.pathname = e;
          }
          pushState(e, i, r) {
            KC() ? this._history.pushState(e, i, r) : (this.location.hash = r);
          }
          replaceState(e, i, r) {
            KC()
              ? this._history.replaceState(e, i, r)
              : (this.location.hash = r);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(e = 0) {
            this._history.go(e);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(K));
          }),
          (n.ɵprov = M({
            token: n,
            factory: function () {
              return (function VP() {
                return new qC(_(K));
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      function KC() {
        return !!window.history.pushState;
      }
      function bf(n, t) {
        if (0 == n.length) return t;
        if (0 == t.length) return n;
        let e = 0;
        return (
          n.endsWith("/") && e++,
          t.startsWith("/") && e++,
          2 == e ? n + t.substring(1) : 1 == e ? n + t : n + "/" + t
        );
      }
      function YC(n) {
        const t = n.match(/#|\?|$/),
          e = (t && t.index) || n.length;
        return n.slice(0, e - ("/" === n[e - 1] ? 1 : 0)) + n.slice(e);
      }
      function di(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let dr = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({
            token: n,
            factory: function () {
              return (function BP() {
                const n = _(K).location;
                return new QC(_(zl), (n && n.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const ZC = new E("appBaseHref");
      let QC = (() => {
          class n extends dr {
            constructor(e, i) {
              if (
                (super(),
                (this._platformLocation = e),
                (this._removeListenerFns = []),
                null == i && (i = this._platformLocation.getBaseHrefFromDOM()),
                null == i)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = i;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(e) {
              return bf(this._baseHref, e);
            }
            path(e = !1) {
              const i =
                  this._platformLocation.pathname +
                  di(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && e ? `${i}${r}` : i;
            }
            pushState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + di(o));
              this._platformLocation.pushState(e, i, s);
            }
            replaceState(e, i, r, o) {
              const s = this.prepareExternalUrl(r + di(o));
              this._platformLocation.replaceState(e, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              this._platformLocation.historyGo?.(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(zl), _(ZC, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        jP = (() => {
          class n extends dr {
            constructor(e, i) {
              super(),
                (this._platformLocation = e),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(e = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = "#"), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(e) {
              const i = bf(this._baseHref, e);
              return i.length > 0 ? "#" + i : i;
            }
            pushState(e, i, r, o) {
              let s = this.prepareExternalUrl(r + di(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(e, i, s);
            }
            replaceState(e, i, r, o) {
              let s = this.prepareExternalUrl(r + di(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(e, i, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              this._platformLocation.historyGo?.(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(zl), _(ZC, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Bs = (() => {
          class n {
            constructor(e) {
              (this._subject = new Se()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = e);
              const i = this._locationStrategy.getBaseHref();
              (this._baseHref = YC(XC(i))),
                this._locationStrategy.onPopState((r) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: r.state,
                    type: r.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(e = !1) {
              return this.normalize(this._locationStrategy.path(e));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(e, i = "") {
              return this.path() == this.normalize(e + di(i));
            }
            normalize(e) {
              return n.stripTrailingSlash(
                (function UP(n, t) {
                  return n && t.startsWith(n) ? t.substring(n.length) : t;
                })(this._baseHref, XC(e))
              );
            }
            prepareExternalUrl(e) {
              return (
                e && "/" !== e[0] && (e = "/" + e),
                this._locationStrategy.prepareExternalUrl(e)
              );
            }
            go(e, i = "", r = null) {
              this._locationStrategy.pushState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + di(i)),
                  r
                );
            }
            replaceState(e, i = "", r = null) {
              this._locationStrategy.replaceState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + di(i)),
                  r
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(e = 0) {
              this._locationStrategy.historyGo?.(e);
            }
            onUrlChange(e) {
              return (
                this._urlChangeListeners.push(e),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  })),
                () => {
                  const i = this._urlChangeListeners.indexOf(e);
                  this._urlChangeListeners.splice(i, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(e = "", i) {
              this._urlChangeListeners.forEach((r) => r(e, i));
            }
            subscribe(e, i, r) {
              return this._subject.subscribe({
                next: e,
                error: i,
                complete: r,
              });
            }
          }
          return (
            (n.normalizeQueryParams = di),
            (n.joinWithSlash = bf),
            (n.stripTrailingSlash = YC),
            (n.ɵfac = function (e) {
              return new (e || n)(_(dr));
            }),
            (n.ɵprov = M({
              token: n,
              factory: function () {
                return (function HP() {
                  return new Bs(_(dr));
                })();
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function XC(n) {
        return n.replace(/\/index.html$/, "");
      }
      function aD(n, t) {
        t = encodeURIComponent(t);
        for (const e of n.split(";")) {
          const i = e.indexOf("="),
            [r, o] = -1 == i ? [e, ""] : [e.slice(0, i), e.slice(i + 1)];
          if (r.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      class AN {
        constructor(t, e, i, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let xf = (() => {
        class n {
          constructor(e, i, r) {
            (this._viewContainer = e),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            this._trackByFn = e;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const e = this._ngForOf;
              !this._differ &&
                e &&
                (this._differ = this._differs
                  .find(e)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const i = this._viewContainer;
            e.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new AN(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) i.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = i.get(o);
                i.move(a, s), uD(a, r);
              }
            });
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange((r) => {
              uD(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(ln), g(Sn), g(Ul));
          }),
          (n.ɵdir = F({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          n
        );
      })();
      function uD(n, t) {
        n.context.$implicit = t.item;
      }
      let Rf = (() => {
        class n {
          constructor(e, i) {
            (this._viewContainer = e),
              (this._context = new IN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e),
              this._updateView();
          }
          set ngIfThen(e) {
            dD("ngIfThen", e),
              (this._thenTemplateRef = e),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(e) {
            dD("ngIfElse", e),
              (this._elseTemplateRef = e),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(ln), g(Sn));
          }),
          (n.ɵdir = F({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          n
        );
      })();
      class IN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function dD(n, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${Ce(t)}'.`
          );
      }
      class kf {
        constructor(t, e) {
          (this._viewContainerRef = t),
            (this._templateRef = e),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(t) {
          t && !this._created
            ? this.create()
            : !t && this._created && this.destroy();
        }
      }
      let ec = (() => {
          class n {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(e) {
              (this._ngSwitch = e),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(e) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(e);
            }
            _matchCase(e) {
              const i = e == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || i),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                i
              );
            }
            _updateDefaultCases(e) {
              if (this._defaultViews && e !== this._defaultUsed) {
                this._defaultUsed = e;
                for (let i = 0; i < this._defaultViews.length; i++)
                  this._defaultViews[i].enforceState(e);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
              standalone: !0,
            })),
            n
          );
        })(),
        hD = (() => {
          class n {
            constructor(e, i, r) {
              (this.ngSwitch = r), r._addCase(), (this._view = new kf(e, i));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ln), g(Sn), g(ec, 9));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
              standalone: !0,
            })),
            n
          );
        })(),
        Pf = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })();
      const mD = "browser";
      let s1 = (() => {
        class n {}
        return (
          (n.ɵprov = M({
            token: n,
            providedIn: "root",
            factory: () => new a1(_(K), window),
          })),
          n
        );
      })();
      class a1 {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function l1(n, t) {
            const e = n.getElementById(t) || n.getElementsByName(t)[0];
            if (e) return e;
            if (
              "function" == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const i = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
              let r = i.currentNode;
              for (; r; ) {
                const o = r.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                r = i.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), e.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            i = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(i - o[0], r - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              gD(this.window.history) ||
              gD(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function gD(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class _D {}
      class Nf extends class c1 extends class PP {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function OP(n) {
            $l || ($l = n);
          })(new Nf());
        }
        onAndCancel(t, e, i) {
          return (
            t.addEventListener(e, i, !1),
            () => {
              t.removeEventListener(e, i, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const e = (function u1() {
            return (
              (Us = Us || document.querySelector("base")),
              Us ? Us.getAttribute("href") : null
            );
          })();
          return null == e
            ? null
            : (function d1(n) {
                (tc = tc || document.createElement("a")),
                  tc.setAttribute("href", n);
                const t = tc.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(e);
        }
        resetBaseElement() {
          Us = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return aD(document.cookie, t);
        }
      }
      let tc,
        Us = null;
      const yD = new E("TRANSITION_ID"),
        f1 = [
          {
            provide: Pl,
            useFactory: function h1(n, t, e) {
              return () => {
                e.get(Nl).donePromise.then(() => {
                  const i = Gn(),
                    r = t.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let o = 0; o < r.length; o++) i.remove(r[o]);
                });
              };
            },
            deps: [yD, K, xe],
            multi: !0,
          },
        ];
      let m1 = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const nc = new E("EventManagerPlugins");
      let ic = (() => {
        class n {
          constructor(e, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              e.forEach((r) => (r.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, i, r) {
            return this._findPluginFor(i).addEventListener(e, i, r);
          }
          addGlobalEventListener(e, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(e, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const i = this._eventNameToPlugin.get(e);
            if (i) return i;
            const r = this._plugins;
            for (let o = 0; o < r.length; o++) {
              const s = r[o];
              if (s.supports(e)) return this._eventNameToPlugin.set(e, s), s;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(nc), _(Q));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class vD {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, i) {
          const r = Gn().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, i);
        }
      }
      let bD = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const i = new Set();
              e.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        $s = (() => {
          class n extends bD {
            constructor(e) {
              super(),
                (this._doc = e),
                (this._hostNodes = new Map()),
                this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, i, r) {
              e.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), r.push(i.appendChild(s));
              });
            }
            addHost(e) {
              const i = [];
              this._addStylesToHost(this._stylesSet, e, i),
                this._hostNodes.set(e, i);
            }
            removeHost(e) {
              const i = this._hostNodes.get(e);
              i && i.forEach(CD), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(e, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((e) => e.forEach(CD));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function CD(n) {
        Gn().remove(n);
      }
      const Lf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Vf = /%COMP%/g;
      function rc(n, t, e) {
        for (let i = 0; i < t.length; i++) {
          let r = t[i];
          Array.isArray(r) ? rc(n, r, e) : ((r = r.replace(Vf, n)), e.push(r));
        }
        return e;
      }
      function ED(n) {
        return (t) => {
          if ("__ngUnwrap__" === t) return n;
          !1 === n(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let oc = (() => {
        class n {
          constructor(e, i, r) {
            (this.eventManager = e),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Bf(e));
          }
          createRenderer(e, i) {
            if (!e || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case _n.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new C1(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(e),
                  r
                );
              }
              case 1:
              case _n.ShadowDom:
                return new D1(this.eventManager, this.sharedStylesHost, e, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = rc(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r),
                    this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(ic), _($s), _(Ls));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Bf {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Lf[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          (SD(t) ? t.content : t).appendChild(e);
        }
        insertBefore(t, e, i) {
          t && (SD(t) ? t.content : t).insertBefore(e, i);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let i = "string" == typeof t ? document.querySelector(t) : t;
          if (!i)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (i.textContent = ""), i;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, i, r) {
          if (r) {
            e = r + ":" + e;
            const o = Lf[r];
            o ? t.setAttributeNS(o, e, i) : t.setAttribute(e, i);
          } else t.setAttribute(e, i);
        }
        removeAttribute(t, e, i) {
          if (i) {
            const r = Lf[i];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${i}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, i, r) {
          r & (Pt.DashCase | Pt.Important)
            ? t.style.setProperty(e, i, r & Pt.Important ? "important" : "")
            : (t.style[e] = i);
        }
        removeStyle(t, e, i) {
          i & Pt.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, i) {
          t[e] = i;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, i) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, ED(i))
            : this.eventManager.addEventListener(t, e, ED(i));
        }
      }
      function SD(n) {
        return "TEMPLATE" === n.tagName && void 0 !== n.content;
      }
      class C1 extends Bf {
        constructor(t, e, i, r) {
          super(t), (this.component = i);
          const o = rc(r + "-" + i.id, i.styles, []);
          e.addStyles(o),
            (this.contentAttr = (function y1(n) {
              return "_ngcontent-%COMP%".replace(Vf, n);
            })(r + "-" + i.id)),
            (this.hostAttr = (function v1(n) {
              return "_nghost-%COMP%".replace(Vf, n);
            })(r + "-" + i.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const i = super.createElement(t, e);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class D1 extends Bf {
        constructor(t, e, i, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = rc(r.id, r.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, i) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, i);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let w1 = (() => {
        class n extends vD {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, i, r) {
            return (
              e.addEventListener(i, r, !1),
              () => this.removeEventListener(e, i, r)
            );
          }
          removeEventListener(e, i, r) {
            return e.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(K));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const AD = ["alt", "control", "meta", "shift"],
        M1 = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        TD = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        S1 = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let A1 = (() => {
        class n extends vD {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != n.parseEventName(e);
          }
          addEventListener(e, i, r) {
            const o = n.parseEventName(i),
              s = n.eventCallback(o.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Gn().onAndCancel(e, o.domEventName, s));
          }
          static parseEventName(e) {
            const i = e.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const o = n._normalizeKey(i.pop());
            let s = "";
            if (
              (AD.forEach((l) => {
                const c = i.indexOf(l);
                c > -1 && (i.splice(c, 1), (s += l + "."));
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null;
            const a = {};
            return (a.domEventName = r), (a.fullKey = s), a;
          }
          static getEventFullKey(e) {
            let i = "",
              r = (function T1(n) {
                let t = n.key;
                if (null == t) {
                  if (((t = n.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === n.location && TD.hasOwnProperty(t) && (t = TD[t]));
                }
                return M1[t] || t;
              })(e);
            return (
              (r = r.toLowerCase()),
              " " === r ? (r = "space") : "." === r && (r = "dot"),
              AD.forEach((o) => {
                o != r && (0, S1[o])(e) && (i += o + ".");
              }),
              (i += r),
              i
            );
          }
          static eventCallback(e, i, r) {
            return (o) => {
              n.getEventFullKey(o) === e && r.runGuarded(() => i(o));
            };
          }
          static _normalizeKey(e) {
            return "esc" === e ? "escape" : e;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(K));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const k1 = IC(RP, "browser", [
          { provide: Ll, useValue: mD },
          {
            provide: vC,
            useValue: function I1() {
              Nf.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: K,
            useFactory: function R1() {
              return (
                (function kT(n) {
                  wd = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        xD = new E(""),
        RD = [
          {
            provide: Vl,
            useClass: class p1 {
              addToWindow(t) {
                (ye.getAngularTestability = (i, r = !0) => {
                  const o = t.findTestabilityInTree(i, r);
                  if (null == o)
                    throw new Error("Could not find testability for element.");
                  return o;
                }),
                  (ye.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ye.getAllAngularRootElements = () => t.getAllRootElements()),
                  ye.frameworkStabilizers || (ye.frameworkStabilizers = []),
                  ye.frameworkStabilizers.push((i) => {
                    const r = ye.getAllAngularTestabilities();
                    let o = r.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && i(s);
                    };
                    r.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, e, i) {
                return null == e
                  ? null
                  : t.getTestability(e) ??
                      (i
                        ? Gn().isShadowRoot(e)
                          ? this.findTestabilityInTree(t, e.host, !0)
                          : this.findTestabilityInTree(t, e.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: MC, useClass: df, deps: [Q, hf, Vl] },
          { provide: df, useClass: df, deps: [Q, hf, Vl] },
        ],
        kD = [
          { provide: Fd, useValue: "root" },
          {
            provide: ri,
            useFactory: function x1() {
              return new ri();
            },
            deps: [],
          },
          { provide: nc, useClass: w1, multi: !0, deps: [K, Q, Ll] },
          { provide: nc, useClass: A1, multi: !0, deps: [K] },
          { provide: oc, useClass: oc, deps: [ic, $s, Ls] },
          { provide: gs, useExisting: oc },
          { provide: bD, useExisting: $s },
          { provide: $s, useClass: $s, deps: [K] },
          { provide: ic, useClass: ic, deps: [nc, Q] },
          { provide: _D, useClass: m1, deps: [] },
          [],
        ];
      let FD = (() => {
          class n {
            constructor(e) {}
            static withServerTransition(e) {
              return {
                ngModule: n,
                providers: [
                  { provide: Ls, useValue: e.appId },
                  { provide: yD, useExisting: Ls },
                  f1,
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(xD, 12));
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ providers: [...kD, ...RD], imports: [Pf, kP] })),
            n
          );
        })(),
        OD = (() => {
          class n {
            constructor(e) {
              this._doc = e;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(e) {
              this._doc.title = e || "";
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K));
            }),
            (n.ɵprov = M({
              token: n,
              factory: function (e) {
                let i = null;
                return (
                  (i = e
                    ? new e()
                    : (function O1() {
                        return new OD(_(K));
                      })()),
                  i
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      typeof window < "u" && window;
      let Uf = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({
              token: n,
              factory: function (e) {
                let i = null;
                return (i = e ? new (e || n)() : _(LD)), i;
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        LD = (() => {
          class n extends Uf {
            constructor(e) {
              super(), (this._doc = e);
            }
            sanitize(e, i) {
              if (null == i) return null;
              switch (e) {
                case me.NONE:
                  return i;
                case me.HTML:
                  return Vn(i, "HTML")
                    ? Gt(i)
                    : E_(this._doc, String(i)).toString();
                case me.STYLE:
                  return Vn(i, "Style") ? Gt(i) : i;
                case me.SCRIPT:
                  if (Vn(i, "Script")) return Gt(i);
                  throw new Error("unsafe value used in a script context");
                case me.URL:
                  return Vn(i, "URL") ? Gt(i) : hs(String(i));
                case me.RESOURCE_URL:
                  if (Vn(i, "ResourceURL")) return Gt(i);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${e} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(e) {
              return (function HT(n) {
                return new PT(n);
              })(e);
            }
            bypassSecurityTrustStyle(e) {
              return (function UT(n) {
                return new NT(n);
              })(e);
            }
            bypassSecurityTrustScript(e) {
              return (function $T(n) {
                return new LT(n);
              })(e);
            }
            bypassSecurityTrustUrl(e) {
              return (function zT(n) {
                return new VT(n);
              })(e);
            }
            bypassSecurityTrustResourceUrl(e) {
              return (function GT(n) {
                return new BT(n);
              })(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K));
            }),
            (n.ɵprov = M({
              token: n,
              factory: function (e) {
                let i = null;
                return (
                  (i = e
                    ? new e()
                    : (function U1(n) {
                        return new LD(n.get(K));
                      })(_(xe))),
                  i
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function O(...n) {
        return $e(n, Ko(n));
      }
      class dn extends te {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return !e.closed && t.next(this._value), e;
        }
        getValue() {
          const { hasError: t, thrownError: e, _value: i } = this;
          if (t) throw e;
          return this._throwIfClosed(), i;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const { isArray: $1 } = Array,
        { getPrototypeOf: z1, prototype: G1, keys: W1 } = Object;
      function VD(n) {
        if (1 === n.length) {
          const t = n[0];
          if ($1(t)) return { args: t, keys: null };
          if (
            (function q1(n) {
              return n && "object" == typeof n && z1(n) === G1;
            })(t)
          ) {
            const e = W1(t);
            return { args: e.map((i) => t[i]), keys: e };
          }
        }
        return { args: n, keys: null };
      }
      const { isArray: K1 } = Array;
      function $f(n) {
        return P((t) =>
          (function Y1(n, t) {
            return K1(t) ? n(...t) : n(t);
          })(n, t)
        );
      }
      function BD(n, t) {
        return n.reduce((e, i, r) => ((e[i] = t[r]), e), {});
      }
      function zf(...n) {
        const t = Ko(n),
          e = lg(n),
          { args: i, keys: r } = VD(n);
        if (0 === i.length) return $e([], t);
        const o = new De(
          (function Z1(n, t, e = Ci) {
            return (i) => {
              jD(
                t,
                () => {
                  const { length: r } = n,
                    o = new Array(r);
                  let s = r,
                    a = r;
                  for (let l = 0; l < r; l++)
                    jD(
                      t,
                      () => {
                        const c = $e(n[l], t);
                        let u = !1;
                        c.subscribe(
                          Te(
                            i,
                            (d) => {
                              (o[l] = d),
                                u || ((u = !0), a--),
                                a || i.next(e(o.slice()));
                            },
                            () => {
                              --s || i.complete();
                            }
                          )
                        );
                      },
                      i
                    );
                },
                i
              );
            };
          })(i, t, r ? (s) => BD(r, s) : Ci)
        );
        return e ? o.pipe($f(e)) : o;
      }
      function jD(n, t, e) {
        n ? Qn(e, n, t) : t();
      }
      function sc(...n) {
        return (function Q1() {
          return Or(1);
        })()($e(n, Ko(n)));
      }
      function ac(n) {
        return new De((t) => {
          Rt(n()).subscribe(t);
        });
      }
      function hr(n, t) {
        const e = ce(n) ? n : () => n,
          i = (r) => r.error(e());
        return new De(t ? (r) => t.schedule(i, 0, r) : i);
      }
      const Ao = Wo(
        (n) =>
          function () {
            n(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Gf() {
        return Pe((n, t) => {
          let e = null;
          n._refCount++;
          const i = Te(t, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (e = null);
            const r = n._connection,
              o = e;
            (e = null),
              r && (!o || r === o) && r.unsubscribe(),
              t.unsubscribe();
          });
          n.subscribe(i), i.closed || (e = n.connect());
        });
      }
      class HD extends De {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Km(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new ct();
            const e = this.getSubject();
            t.add(
              this.source.subscribe(
                Te(
                  e,
                  void 0,
                  () => {
                    this._teardown(), e.complete();
                  },
                  (i) => {
                    this._teardown(), e.error(i);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = ct.EMPTY));
          }
          return t;
        }
        refCount() {
          return Gf()(this);
        }
      }
      function Wn(n, t) {
        return Pe((e, i) => {
          let r = null,
            o = 0,
            s = !1;
          const a = () => s && !r && i.complete();
          e.subscribe(
            Te(
              i,
              (l) => {
                r?.unsubscribe();
                let c = 0;
                const u = o++;
                Rt(n(l, u)).subscribe(
                  (r = Te(
                    i,
                    (d) => i.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Lt(n) {
        return n <= 0
          ? () => kn
          : Pe((t, e) => {
              let i = 0;
              t.subscribe(
                Te(e, (r) => {
                  ++i <= n && (e.next(r), n <= i && e.complete());
                })
              );
            });
      }
      function fr(...n) {
        const t = Ko(n);
        return Pe((e, i) => {
          (t ? sc(n, e, t) : sc(n, e)).subscribe(i);
        });
      }
      function It(n, t) {
        return Pe((e, i) => {
          let r = 0;
          e.subscribe(Te(i, (o) => n.call(t, o, r++) && i.next(o)));
        });
      }
      function lc(n) {
        return Pe((t, e) => {
          let i = !1;
          t.subscribe(
            Te(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => {
                i || e.next(n), e.complete();
              }
            )
          );
        });
      }
      function UD(n = X1) {
        return Pe((t, e) => {
          let i = !1;
          t.subscribe(
            Te(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => (i ? e.complete() : e.error(n()))
            )
          );
        });
      }
      function X1() {
        return new Ao();
      }
      function ki(n, t) {
        const e = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? It((r, o) => n(r, o, i)) : Ci,
            Lt(1),
            e ? lc(t) : UD(() => new Ao())
          );
      }
      function Fi(n, t) {
        return ce(t) ? it(n, t, 1) : it(n, 1);
      }
      function tt(n, t, e) {
        const i = ce(n) || t || e ? { next: n, error: t, complete: e } : n;
        return i
          ? Pe((r, o) => {
              var s;
              null === (s = i.subscribe) || void 0 === s || s.call(i);
              let a = !0;
              r.subscribe(
                Te(
                  o,
                  (l) => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = i.complete) || void 0 === l || l.call(i),
                      o.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = i.error) || void 0 === c || c.call(i, l),
                      o.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = i.unsubscribe) ||
                        void 0 === l ||
                        l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : Ci;
      }
      function je(n) {
        return Pe((t, e) => {
          let o,
            i = null,
            r = !1;
          (i = t.subscribe(
            Te(e, void 0, void 0, (s) => {
              (o = Rt(n(s, je(n)(t)))),
                i ? (i.unsubscribe(), (i = null), o.subscribe(e)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), o.subscribe(e));
        });
      }
      function J1(n, t, e, i, r) {
        return (o, s) => {
          let a = e,
            l = t,
            c = 0;
          o.subscribe(
            Te(
              s,
              (u) => {
                const d = c++;
                (l = a ? n(l, u, d) : ((a = !0), u)), i && s.next(l);
              },
              r &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function $D(n, t) {
        return Pe(J1(n, t, arguments.length >= 2, !0));
      }
      function Wf(n) {
        return n <= 0
          ? () => kn
          : Pe((t, e) => {
              let i = [];
              t.subscribe(
                Te(
                  e,
                  (r) => {
                    i.push(r), n < i.length && i.shift();
                  },
                  () => {
                    for (const r of i) e.next(r);
                    e.complete();
                  },
                  void 0,
                  () => {
                    i = null;
                  }
                )
              );
            });
      }
      function zD(n, t) {
        const e = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? It((r, o) => n(r, o, i)) : Ci,
            Wf(1),
            e ? lc(t) : UD(() => new Ao())
          );
      }
      function cc(n) {
        return Pe((t, e) => {
          try {
            t.subscribe(e);
          } finally {
            e.add(n);
          }
        });
      }
      const ne = "primary";
      class nL {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function To(n) {
        return new nL(n);
      }
      function iL(n, t, e) {
        const i = e.path.split("/");
        if (
          i.length > n.length ||
          ("full" === e.pathMatch && (t.hasChildren() || i.length < n.length))
        )
          return null;
        const r = {};
        for (let o = 0; o < i.length; o++) {
          const s = i[o],
            a = n[o];
          if (s.startsWith(":")) r[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: n.slice(0, i.length), posParams: r };
      }
      function qn(n, t) {
        const e = n ? Object.keys(n) : void 0,
          i = t ? Object.keys(t) : void 0;
        if (!e || !i || e.length != i.length) return !1;
        let r;
        for (let o = 0; o < e.length; o++)
          if (((r = e[o]), !GD(n[r], t[r]))) return !1;
        return !0;
      }
      function GD(n, t) {
        if (Array.isArray(n) && Array.isArray(t)) {
          if (n.length !== t.length) return !1;
          const e = [...n].sort(),
            i = [...t].sort();
          return e.every((r, o) => i[o] === r);
        }
        return n === t;
      }
      function WD(n) {
        return Array.prototype.concat.apply([], n);
      }
      function qD(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function dt(n, t) {
        for (const e in n) n.hasOwnProperty(e) && t(n[e], e);
      }
      function fi(n) {
        return Ph(n) ? n : As(n) ? $e(Promise.resolve(n)) : O(n);
      }
      const sL = {
          exact: function ZD(n, t, e) {
            if (
              !mr(n.segments, t.segments) ||
              !uc(n.segments, t.segments, e) ||
              n.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const i in t.children)
              if (!n.children[i] || !ZD(n.children[i], t.children[i], e))
                return !1;
            return !0;
          },
          subset: QD,
        },
        KD = {
          exact: function aL(n, t) {
            return qn(n, t);
          },
          subset: function lL(n, t) {
            return (
              Object.keys(t).length <= Object.keys(n).length &&
              Object.keys(t).every((e) => GD(n[e], t[e]))
            );
          },
          ignored: () => !0,
        };
      function YD(n, t, e) {
        return (
          sL[e.paths](n.root, t.root, e.matrixParams) &&
          KD[e.queryParams](n.queryParams, t.queryParams) &&
          !("exact" === e.fragment && n.fragment !== t.fragment)
        );
      }
      function QD(n, t, e) {
        return XD(n, t, t.segments, e);
      }
      function XD(n, t, e, i) {
        if (n.segments.length > e.length) {
          const r = n.segments.slice(0, e.length);
          return !(!mr(r, e) || t.hasChildren() || !uc(r, e, i));
        }
        if (n.segments.length === e.length) {
          if (!mr(n.segments, e) || !uc(n.segments, e, i)) return !1;
          for (const r in t.children)
            if (!n.children[r] || !QD(n.children[r], t.children[r], i))
              return !1;
          return !0;
        }
        {
          const r = e.slice(0, n.segments.length),
            o = e.slice(n.segments.length);
          return (
            !!(mr(n.segments, r) && uc(n.segments, r, i) && n.children[ne]) &&
            XD(n.children[ne], t, o, i)
          );
        }
      }
      function uc(n, t, e) {
        return t.every((i, r) => KD[e](n[r].parameters, i.parameters));
      }
      class pr {
        constructor(t, e, i) {
          (this.root = t), (this.queryParams = e), (this.fragment = i);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = To(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return dL.serialize(this);
        }
      }
      class re {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            dt(e, (i, r) => (i.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return dc(this);
        }
      }
      class zs {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = To(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return iw(this);
        }
      }
      function mr(n, t) {
        return n.length === t.length && n.every((e, i) => e.path === t[i].path);
      }
      class JD {}
      class ew {
        parse(t) {
          const e = new bL(t);
          return new pr(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          const e = `/${Gs(t.root, !0)}`,
            i = (function pL(n) {
              const t = Object.keys(n)
                .map((e) => {
                  const i = n[e];
                  return Array.isArray(i)
                    ? i.map((r) => `${hc(e)}=${hc(r)}`).join("&")
                    : `${hc(e)}=${hc(i)}`;
                })
                .filter((e) => !!e);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${e}${i}${
            "string" == typeof t.fragment
              ? `#${(function hL(n) {
                  return encodeURI(n);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const dL = new ew();
      function dc(n) {
        return n.segments.map((t) => iw(t)).join("/");
      }
      function Gs(n, t) {
        if (!n.hasChildren()) return dc(n);
        if (t) {
          const e = n.children[ne] ? Gs(n.children[ne], !1) : "",
            i = [];
          return (
            dt(n.children, (r, o) => {
              o !== ne && i.push(`${o}:${Gs(r, !1)}`);
            }),
            i.length > 0 ? `${e}(${i.join("//")})` : e
          );
        }
        {
          const e = (function uL(n, t) {
            let e = [];
            return (
              dt(n.children, (i, r) => {
                r === ne && (e = e.concat(t(i, r)));
              }),
              dt(n.children, (i, r) => {
                r !== ne && (e = e.concat(t(i, r)));
              }),
              e
            );
          })(n, (i, r) =>
            r === ne ? [Gs(n.children[ne], !1)] : [`${r}:${Gs(i, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[ne]
            ? `${dc(n)}/${e[0]}`
            : `${dc(n)}/(${e.join("//")})`;
        }
      }
      function tw(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function hc(n) {
        return tw(n).replace(/%3B/gi, ";");
      }
      function Kf(n) {
        return tw(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function fc(n) {
        return decodeURIComponent(n);
      }
      function nw(n) {
        return fc(n.replace(/\+/g, "%20"));
      }
      function iw(n) {
        return `${Kf(n.path)}${(function fL(n) {
          return Object.keys(n)
            .map((t) => `;${Kf(t)}=${Kf(n[t])}`)
            .join("");
        })(n.parameters)}`;
      }
      const mL = /^[^\/()?;=#]+/;
      function pc(n) {
        const t = n.match(mL);
        return t ? t[0] : "";
      }
      const gL = /^[^=?&#]+/,
        yL = /^[^&#]+/;
      class bL {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new re([], {})
              : new re([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let i = {};
          return (
            this.peekStartsWith("(") && (i = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (i[ne] = new re(t, e)),
            i
          );
        }
        parseSegment() {
          const t = pc(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new C(4009, !1);
          return this.capture(t), new zs(fc(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = pc(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const r = pc(this.remaining);
            r && ((i = r), this.capture(i));
          }
          t[fc(e)] = fc(i);
        }
        parseQueryParam(t) {
          const e = (function _L(n) {
            const t = n.match(gL);
            return t ? t[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const s = (function vL(n) {
              const t = n.match(yL);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((i = s), this.capture(i));
          }
          const r = nw(e),
            o = nw(i);
          if (t.hasOwnProperty(r)) {
            let s = t[r];
            Array.isArray(s) || ((s = [s]), (t[r] = s)), s.push(o);
          } else t[r] = o;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const i = pc(this.remaining),
              r = this.remaining[i.length];
            if ("/" !== r && ")" !== r && ";" !== r) throw new C(4010, !1);
            let o;
            i.indexOf(":") > -1
              ? ((o = i.slice(0, i.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = ne);
            const s = this.parseChildren();
            (e[o] = 1 === Object.keys(s).length ? s[ne] : new re([], s)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new C(4011, !1);
        }
      }
      function Yf(n) {
        return n.segments.length > 0 ? new re([], { [ne]: n }) : n;
      }
      function mc(n) {
        const t = {};
        for (const i of Object.keys(n.children)) {
          const o = mc(n.children[i]);
          (o.segments.length > 0 || o.hasChildren()) && (t[i] = o);
        }
        return (function CL(n) {
          if (1 === n.numberOfChildren && n.children[ne]) {
            const t = n.children[ne];
            return new re(n.segments.concat(t.segments), t.children);
          }
          return n;
        })(new re(n.segments, t));
      }
      function gr(n) {
        return n instanceof pr;
      }
      function EL(n, t, e, i, r) {
        if (0 === e.length) return Io(t.root, t.root, t.root, i, r);
        const o = (function sw(n) {
          if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
            return new ow(!0, 0, n);
          let t = 0,
            e = !1;
          const i = n.reduce((r, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  dt(o.outlets, (l, c) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...r, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...r, o.segmentPath];
            }
            return "string" != typeof o
              ? [...r, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (e = !0)
                      : ".." === a
                      ? t++
                      : "" != a && r.push(a));
                }),
                r)
              : [...r, o];
          }, []);
          return new ow(e, t, i);
        })(e);
        return o.toRoot()
          ? Io(t.root, t.root, new re([], {}), i, r)
          : (function s(l) {
              const c = (function SL(n, t, e, i) {
                  if (n.isAbsolute) return new xo(t.root, !0, 0);
                  if (-1 === i) return new xo(e, e === t.root, 0);
                  return (function aw(n, t, e) {
                    let i = n,
                      r = t,
                      o = e;
                    for (; o > r; ) {
                      if (((o -= r), (i = i.parent), !i)) throw new C(4005, !1);
                      r = i.segments.length;
                    }
                    return new xo(i, !1, r - o);
                  })(e, i + (Ws(n.commands[0]) ? 0 : 1), n.numberOfDoubleDots);
                })(o, t, n.snapshot?._urlSegment, l),
                u = c.processChildren
                  ? Ks(c.segmentGroup, c.index, o.commands)
                  : Qf(c.segmentGroup, c.index, o.commands);
              return Io(t.root, c.segmentGroup, u, i, r);
            })(n.snapshot?._lastPathIndex);
      }
      function Ws(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function qs(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function Io(n, t, e, i, r) {
        let s,
          o = {};
        i &&
          dt(i, (l, c) => {
            o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
          }),
          (s = n === t ? e : rw(n, t, e));
        const a = Yf(mc(s));
        return new pr(a, o, r);
      }
      function rw(n, t, e) {
        const i = {};
        return (
          dt(n.children, (r, o) => {
            i[o] = r === t ? e : rw(r, t, e);
          }),
          new re(n.segments, i)
        );
      }
      class ow {
        constructor(t, e, i) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = i),
            t && i.length > 0 && Ws(i[0]))
          )
            throw new C(4003, !1);
          const r = i.find(qs);
          if (r && r !== qD(i)) throw new C(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class xo {
        constructor(t, e, i) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = i);
        }
      }
      function Qf(n, t, e) {
        if (
          (n || (n = new re([], {})),
          0 === n.segments.length && n.hasChildren())
        )
          return Ks(n, t, e);
        const i = (function TL(n, t, e) {
            let i = 0,
              r = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < n.segments.length; ) {
              if (i >= e.length) return o;
              const s = n.segments[r],
                a = e[i];
              if (qs(a)) break;
              const l = `${a}`,
                c = i < e.length - 1 ? e[i + 1] : null;
              if (r > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!cw(l, c, s)) return o;
                i += 2;
              } else {
                if (!cw(l, {}, s)) return o;
                i++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: i };
          })(n, t, e),
          r = e.slice(i.commandIndex);
        if (i.match && i.pathIndex < n.segments.length) {
          const o = new re(n.segments.slice(0, i.pathIndex), {});
          return (
            (o.children[ne] = new re(
              n.segments.slice(i.pathIndex),
              n.children
            )),
            Ks(o, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new re(n.segments, {})
          : i.match && !n.hasChildren()
          ? Xf(n, t, e)
          : i.match
          ? Ks(n, 0, r)
          : Xf(n, t, e);
      }
      function Ks(n, t, e) {
        if (0 === e.length) return new re(n.segments, {});
        {
          const i = (function AL(n) {
              return qs(n[0]) ? n[0].outlets : { [ne]: n };
            })(e),
            r = {};
          return (
            dt(i, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (r[s] = Qf(n.children[s], t, o));
            }),
            dt(n.children, (o, s) => {
              void 0 === i[s] && (r[s] = o);
            }),
            new re(n.segments, r)
          );
        }
      }
      function Xf(n, t, e) {
        const i = n.segments.slice(0, t);
        let r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if (qs(o)) {
            const l = IL(o.outlets);
            return new re(i, l);
          }
          if (0 === r && Ws(e[0])) {
            i.push(new zs(n.segments[t].path, lw(e[0]))), r++;
            continue;
          }
          const s = qs(o) ? o.outlets[ne] : `${o}`,
            a = r < e.length - 1 ? e[r + 1] : null;
          s && a && Ws(a)
            ? (i.push(new zs(s, lw(a))), (r += 2))
            : (i.push(new zs(s, {})), r++);
        }
        return new re(i, {});
      }
      function IL(n) {
        const t = {};
        return (
          dt(n, (e, i) => {
            "string" == typeof e && (e = [e]),
              null !== e && (t[i] = Xf(new re([], {}), 0, e));
          }),
          t
        );
      }
      function lw(n) {
        const t = {};
        return dt(n, (e, i) => (t[i] = `${e}`)), t;
      }
      function cw(n, t, e) {
        return n == e.path && qn(t, e.parameters);
      }
      class pi {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Jf extends pi {
        constructor(t, e, i = "imperative", r = null) {
          super(t, e),
            (this.type = 0),
            (this.navigationTrigger = i),
            (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class _r extends pi {
        constructor(t, e, i) {
          super(t, e), (this.urlAfterRedirects = i), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class gc extends pi {
        constructor(t, e, i, r) {
          super(t, e), (this.reason = i), (this.code = r), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class uw extends pi {
        constructor(t, e, i, r) {
          super(t, e), (this.error = i), (this.target = r), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class xL extends pi {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RL extends pi {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class kL extends pi {
        constructor(t, e, i, r, o) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class FL extends pi {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class OL extends pi {
        constructor(t, e, i, r) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class PL {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class NL {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class LL {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class VL {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class BL {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class jL {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class dw {
        constructor(t, e, i) {
          (this.routerEvent = t),
            (this.position = e),
            (this.anchor = i),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class hw {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = ep(t, this._root);
          return e ? e.children.map((i) => i.value) : [];
        }
        firstChild(t) {
          const e = ep(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = tp(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((r) => r.value)
                .filter((r) => r !== t);
        }
        pathFromRoot(t) {
          return tp(t, this._root).map((e) => e.value);
        }
      }
      function ep(n, t) {
        if (n === t.value) return t;
        for (const e of t.children) {
          const i = ep(n, e);
          if (i) return i;
        }
        return null;
      }
      function tp(n, t) {
        if (n === t.value) return [t];
        for (const e of t.children) {
          const i = tp(n, e);
          if (i.length) return i.unshift(t), i;
        }
        return [];
      }
      class mi {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Ro(n) {
        const t = {};
        return n && n.children.forEach((e) => (t[e.value.outlet] = e)), t;
      }
      class fw extends hw {
        constructor(t, e) {
          super(t), (this.snapshot = e), np(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function pw(n, t) {
        const e = (function UL(n, t) {
            const s = new _c([], {}, {}, "", {}, ne, t, null, n.root, -1, {});
            return new gw("", new mi(s, []));
          })(n, t),
          i = new dn([new zs("", {})]),
          r = new dn({}),
          o = new dn({}),
          s = new dn({}),
          a = new dn(""),
          l = new ko(i, r, s, a, o, ne, t, e.root);
        return (l.snapshot = e.root), new fw(new mi(l, []), e);
      }
      class ko {
        constructor(t, e, i, r, o, s, a, l) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(P((t) => To(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(P((t) => To(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function mw(n, t = "emptyOnly") {
        const e = n.pathFromRoot;
        let i = 0;
        if ("always" !== t)
          for (i = e.length - 1; i >= 1; ) {
            const r = e[i],
              o = e[i - 1];
            if (r.routeConfig && "" === r.routeConfig.path) i--;
            else {
              if (o.component) break;
              i--;
            }
          }
        return (function $L(n) {
          return n.reduce(
            (t, e) => ({
              params: { ...t.params, ...e.params },
              data: { ...t.data, ...e.data },
              resolve: {
                ...e.data,
                ...t.resolve,
                ...e.routeConfig?.data,
                ...e._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(e.slice(i));
      }
      class _c {
        constructor(t, e, i, r, o, s, a, l, c, u, d, h) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._correctedLastPathIndex = h ?? u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = To(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = To(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((i) => i.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class gw extends hw {
        constructor(t, e) {
          super(e), (this.url = t), np(this, e);
        }
        toString() {
          return _w(this._root);
        }
      }
      function np(n, t) {
        (t.value._routerState = n), t.children.forEach((e) => np(n, e));
      }
      function _w(n) {
        const t =
          n.children.length > 0 ? ` { ${n.children.map(_w).join(", ")} } ` : "";
        return `${n.value}${t}`;
      }
      function ip(n) {
        if (n.snapshot) {
          const t = n.snapshot,
            e = n._futureSnapshot;
          (n.snapshot = e),
            qn(t.queryParams, e.queryParams) ||
              n.queryParams.next(e.queryParams),
            t.fragment !== e.fragment && n.fragment.next(e.fragment),
            qn(t.params, e.params) || n.params.next(e.params),
            (function rL(n, t) {
              if (n.length !== t.length) return !1;
              for (let e = 0; e < n.length; ++e) if (!qn(n[e], t[e])) return !1;
              return !0;
            })(t.url, e.url) || n.url.next(e.url),
            qn(t.data, e.data) || n.data.next(e.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function rp(n, t) {
        const e =
          qn(n.params, t.params) &&
          (function cL(n, t) {
            return (
              mr(n, t) && n.every((e, i) => qn(e.parameters, t[i].parameters))
            );
          })(n.url, t.url);
        return (
          e &&
          !(!n.parent != !t.parent) &&
          (!n.parent || rp(n.parent, t.parent))
        );
      }
      function Ys(n, t, e) {
        if (e && n.shouldReuseRoute(t.value, e.value.snapshot)) {
          const i = e.value;
          i._futureSnapshot = t.value;
          const r = (function GL(n, t, e) {
            return t.children.map((i) => {
              for (const r of e.children)
                if (n.shouldReuseRoute(i.value, r.value.snapshot))
                  return Ys(n, i, r);
              return Ys(n, i);
            });
          })(n, t, e);
          return new mi(i, r);
        }
        {
          if (n.shouldAttach(t.value)) {
            const o = n.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Ys(n, a))),
                s
              );
            }
          }
          const i = (function WL(n) {
              return new ko(
                new dn(n.url),
                new dn(n.params),
                new dn(n.queryParams),
                new dn(n.fragment),
                new dn(n.data),
                n.outlet,
                n.component,
                n
              );
            })(t.value),
            r = t.children.map((o) => Ys(n, o));
          return new mi(i, r);
        }
      }
      const op = "ngNavigationCancelingError";
      function yw(n, t) {
        const { redirectTo: e, navigationBehaviorOptions: i } = gr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          r = vw(!1, 0, t);
        return (r.url = e), (r.navigationBehaviorOptions = i), r;
      }
      function vw(n, t, e) {
        const i = new Error("NavigationCancelingError: " + (n || ""));
        return (i[op] = !0), (i.cancellationCode = t), e && (i.url = e), i;
      }
      function bw(n) {
        return Cw(n) && gr(n.url);
      }
      function Cw(n) {
        return n && n[op];
      }
      class qL {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Zs()),
            (this.attachRef = null);
        }
      }
      class Zs {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const i = this.getOrCreateContext(t);
          (i.outlet = e), this.contexts.set(t, i);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && ((e.outlet = null), (e.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new qL()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      const yc = !1;
      let sp = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this.parentContexts = e),
              (this.location = i),
              (this.changeDetector = o),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Se()),
              (this.deactivateEvents = new Se()),
              (this.attachEvents = new Se()),
              (this.detachEvents = new Se()),
              (this.name = r || ne),
              e.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.getContext(this.name)?.outlet === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const e = this.parentContexts.getContext(this.name);
              e &&
                e.route &&
                (e.attachRef
                  ? this.attach(e.attachRef, e.route)
                  : this.activateWith(e.route, e.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, yc);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, yc);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, yc);
            this.location.detach();
            const e = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(e.instance),
              e
            );
          }
          attach(e, i) {
            (this.activated = e),
              (this._activatedRoute = i),
              this.location.insert(e.hostView),
              this.attachEvents.emit(e.instance);
          }
          deactivate() {
            if (this.activated) {
              const e = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(e);
            }
          }
          activateWith(e, i) {
            if (this.isActivated) throw new C(4013, yc);
            this._activatedRoute = e;
            const r = this.location,
              s = e._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new KL(e, a, r.injector);
            if (
              i &&
              (function YL(n) {
                return !!n.resolveComponentFactory;
              })(i)
            ) {
              const c = i.resolveComponentFactory(s);
              this.activated = r.createComponent(c, r.length, l);
            } else
              this.activated = r.createComponent(s, {
                index: r.length,
                injector: l,
                environmentInjector: i ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(Zs), g(ln), Gr("name"), g(cr), g(Si));
          }),
          (n.ɵdir = F({
            type: n,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          n
        );
      })();
      class KL {
        constructor(t, e, i) {
          (this.route = t), (this.childContexts = e), (this.parent = i);
        }
        get(t, e) {
          return t === ko
            ? this.route
            : t === Zs
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      let Dw = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵcmp = Re({
            type: n,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (e, i) {
              1 & e && Ve(0, "router-outlet");
            },
            dependencies: [sp],
            encapsulation: 2,
          })),
          n
        );
      })();
      function ww(n, t) {
        return (
          n.providers &&
            !n._injector &&
            (n._injector = Rl(n.providers, t, `Route: ${n.path}`)),
          n._injector ?? t
        );
      }
      function lp(n) {
        const t = n.children && n.children.map(lp),
          e = t ? { ...n, children: t } : { ...n };
        return (
          !e.component &&
            !e.loadComponent &&
            (t || e.loadChildren) &&
            e.outlet &&
            e.outlet !== ne &&
            (e.component = Dw),
          e
        );
      }
      function hn(n) {
        return n.outlet || ne;
      }
      function Ew(n, t) {
        const e = n.filter((i) => hn(i) === t);
        return e.push(...n.filter((i) => hn(i) !== t)), e;
      }
      function Mw(n) {
        if (!n) return null;
        if (n.routeConfig?._injector) return n.routeConfig._injector;
        for (let t = n.parent; t; t = t.parent) {
          const e = t.routeConfig;
          if (e?._loadedInjector) return e._loadedInjector;
          if (e?._injector) return e._injector;
        }
        return null;
      }
      class eV {
        constructor(t, e, i, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = i),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            i = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, i, t),
            ip(this.futureState.root),
            this.activateChildRoutes(e, i, t);
        }
        deactivateChildRoutes(t, e, i) {
          const r = Ro(e);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, r[s], i), delete r[s];
          }),
            dt(r, (o, s) => {
              this.deactivateRouteAndItsChildren(o, i);
            });
        }
        deactivateRoutes(t, e, i) {
          const r = t.value,
            o = e ? e.value : null;
          if (r === o)
            if (r.component) {
              const s = i.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, i);
          else o && this.deactivateRouteAndItsChildren(e, i);
        }
        deactivateRouteAndItsChildren(t, e) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            o = Ro(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          if (i && i.outlet) {
            const s = i.outlet.detach(),
              a = i.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            o = Ro(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], r);
          i &&
            i.outlet &&
            (i.outlet.deactivate(),
            i.children.onOutletDeactivated(),
            (i.attachRef = null),
            (i.resolver = null),
            (i.route = null));
        }
        activateChildRoutes(t, e, i) {
          const r = Ro(e);
          t.children.forEach((o) => {
            this.activateRoutes(o, r[o.value.outlet], i),
              this.forwardEvent(new jL(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new VL(t.value.snapshot));
        }
        activateRoutes(t, e, i) {
          const r = t.value,
            o = e ? e.value : null;
          if ((ip(r), r === o))
            if (r.component) {
              const s = i.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, i);
          else if (r.component) {
            const s = i.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                ip(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Mw(r.snapshot),
                l = a?.get(er) ?? null;
              (s.attachRef = null),
                (s.route = r),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(r, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, i);
        }
      }
      class Sw {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class vc {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function tV(n, t, e) {
        const i = n._root;
        return Qs(i, t ? t._root : null, e, [i.value]);
      }
      function bc(n, t, e) {
        return (Mw(t) ?? e).get(n);
      }
      function Qs(
        n,
        t,
        e,
        i,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = Ro(t);
        return (
          n.children.forEach((s) => {
            (function iV(
              n,
              t,
              e,
              i,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = n.value,
                s = t ? t.value : null,
                a = e ? e.getContext(n.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function rV(n, t, e) {
                  if ("function" == typeof e) return e(n, t);
                  switch (e) {
                    case "pathParamsChange":
                      return !mr(n.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !mr(n.url, t.url) || !qn(n.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !rp(n, t) || !qn(n.queryParams, t.queryParams);
                    default:
                      return !rp(n, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new Sw(i))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  Qs(n, t, o.component ? (a ? a.children : null) : e, i, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new vc(a.outlet.component, s));
              } else
                s && Xs(t, a, r),
                  r.canActivateChecks.push(new Sw(i)),
                  Qs(n, null, o.component ? (a ? a.children : null) : e, i, r);
            })(s, o[s.value.outlet], e, i.concat([s.value]), r),
              delete o[s.value.outlet];
          }),
          dt(o, (s, a) => Xs(s, e.getContext(a), r)),
          r
        );
      }
      function Xs(n, t, e) {
        const i = Ro(n),
          r = n.value;
        dt(i, (o, s) => {
          Xs(o, r.component ? (t ? t.children.getContext(s) : null) : t, e);
        }),
          e.canDeactivateChecks.push(
            new vc(
              r.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              r
            )
          );
      }
      function Js(n) {
        return "function" == typeof n;
      }
      const Cc = Symbol("INITIAL_VALUE");
      function Fo() {
        return Wn((n) =>
          zf(n.map((t) => t.pipe(Lt(1), fr(Cc)))).pipe(
            P((t) => {
              for (const e of t)
                if (!0 !== e) {
                  if (e === Cc) return Cc;
                  if (!1 === e || e instanceof pr) return e;
                }
              return !0;
            }),
            It((t) => t !== Cc),
            Lt(1)
          )
        );
      }
      function Aw(n) {
        return (function SS(...n) {
          return Gm(n);
        })(
          tt((t) => {
            if (gr(t)) throw yw(0, t);
          }),
          P((t) => !0 === t)
        );
      }
      const cp = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Tw(n, t, e, i, r) {
        const o = up(n, t, e);
        return o.matched
          ? (function CV(n, t, e, i) {
              const r = t.canMatch;
              return r && 0 !== r.length
                ? O(
                    r.map((s) => {
                      const a = n.get(s),
                        l = (function uV(n) {
                          return n && Js(n.canMatch);
                        })(a)
                          ? a.canMatch(t, e)
                          : a(t, e);
                      return fi(l);
                    })
                  ).pipe(Fo(), Aw())
                : O(!0);
            })((i = ww(t, i)), t, e).pipe(P((s) => (!0 === s ? o : { ...cp })))
          : O(o);
      }
      function up(n, t, e) {
        if ("" === t.path)
          return "full" === t.pathMatch && (n.hasChildren() || e.length > 0)
            ? { ...cp }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: e,
                parameters: {},
                positionalParamSegments: {},
              };
        const r = (t.matcher || iL)(e, n, t);
        if (!r) return { ...cp };
        const o = {};
        dt(r.posParams, (a, l) => {
          o[l] = a.path;
        });
        const s =
          r.consumed.length > 0
            ? { ...o, ...r.consumed[r.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: r.consumed,
          remainingSegments: e.slice(r.consumed.length),
          parameters: s,
          positionalParamSegments: r.posParams ?? {},
        };
      }
      function Dc(n, t, e, i, r = "corrected") {
        if (
          e.length > 0 &&
          (function EV(n, t, e) {
            return e.some((i) => wc(n, t, i) && hn(i) !== ne);
          })(n, e, i)
        ) {
          const s = new re(
            t,
            (function wV(n, t, e, i) {
              const r = {};
              (r[ne] = i),
                (i._sourceSegment = n),
                (i._segmentIndexShift = t.length);
              for (const o of e)
                if ("" === o.path && hn(o) !== ne) {
                  const s = new re([], {});
                  (s._sourceSegment = n),
                    (s._segmentIndexShift = t.length),
                    (r[hn(o)] = s);
                }
              return r;
            })(n, t, i, new re(e, n.children))
          );
          return (
            (s._sourceSegment = n),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === e.length &&
          (function MV(n, t, e) {
            return e.some((i) => wc(n, t, i));
          })(n, e, i)
        ) {
          const s = new re(
            n.segments,
            (function DV(n, t, e, i, r, o) {
              const s = {};
              for (const a of i)
                if (wc(n, e, a) && !r[hn(a)]) {
                  const l = new re([], {});
                  (l._sourceSegment = n),
                    (l._segmentIndexShift =
                      "legacy" === o ? n.segments.length : t.length),
                    (s[hn(a)] = l);
                }
              return { ...r, ...s };
            })(n, t, e, i, n.children, r)
          );
          return (
            (s._sourceSegment = n),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: e }
          );
        }
        const o = new re(n.segments, n.children);
        return (
          (o._sourceSegment = n),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: e }
        );
      }
      function wc(n, t, e) {
        return (
          (!(n.hasChildren() || t.length > 0) || "full" !== e.pathMatch) &&
          "" === e.path
        );
      }
      function Iw(n, t, e, i) {
        return (
          !!(hn(n) === i || (i !== ne && wc(t, e, n))) &&
          ("**" === n.path || up(t, n, e).matched)
        );
      }
      function xw(n, t, e) {
        return 0 === t.length && !n.children[e];
      }
      const Ec = !1;
      class Mc {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Rw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ea(n) {
        return hr(new Mc(n));
      }
      function kw(n) {
        return hr(new Rw(n));
      }
      class IV {
        constructor(t, e, i, r, o) {
          (this.injector = t),
            (this.configLoader = e),
            (this.urlSerializer = i),
            (this.urlTree = r),
            (this.config = o),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Dc(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new re(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, e, ne)
            .pipe(
              P((o) =>
                this.createUrlTree(
                  mc(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              je((o) => {
                if (o instanceof Rw)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof Mc ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, ne)
            .pipe(
              P((r) => this.createUrlTree(mc(r), t.queryParams, t.fragment))
            )
            .pipe(
              je((r) => {
                throw r instanceof Mc ? this.noMatchError(r) : r;
              })
            );
        }
        noMatchError(t) {
          return new C(4002, Ec);
        }
        createUrlTree(t, e, i) {
          const r = Yf(t);
          return new pr(r, e, i);
        }
        expandSegmentGroup(t, e, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.expandChildren(t, e, i).pipe(P((o) => new re([], o)))
            : this.expandSegment(t, i, e, i.segments, r, !0);
        }
        expandChildren(t, e, i) {
          const r = [];
          for (const o of Object.keys(i.children))
            "primary" === o ? r.unshift(o) : r.push(o);
          return $e(r).pipe(
            Fi((o) => {
              const s = i.children[o],
                a = Ew(e, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                P((l) => ({ segment: l, outlet: o }))
              );
            }),
            $D((o, s) => ((o[s.outlet] = s.segment), o), {}),
            zD()
          );
        }
        expandSegment(t, e, i, r, o, s) {
          return $e(i).pipe(
            Fi((a) =>
              this.expandSegmentAgainstRoute(t, e, i, a, r, o, s).pipe(
                je((c) => {
                  if (c instanceof Mc) return O(null);
                  throw c;
                })
              )
            ),
            ki((a) => !!a),
            je((a, l) => {
              if (a instanceof Ao || "EmptyError" === a.name)
                return xw(e, r, o) ? O(new re([], {})) : ea(e);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, i, r, o, s, a) {
          return Iw(r, e, o, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s)
              : ea(e)
            : ea(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, i, r, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                i,
                r,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, i, r) {
          const o = this.applyRedirectCommands([], i.redirectTo, {});
          return i.redirectTo.startsWith("/")
            ? kw(o)
            : this.lineralizeSegments(i, o).pipe(
                it((s) => {
                  const a = new re(s, {});
                  return this.expandSegment(t, a, e, s, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, i, r, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: u,
          } = up(e, r, o);
          if (!a) return ea(e);
          const d = this.applyRedirectCommands(l, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? kw(d)
            : this.lineralizeSegments(r, d).pipe(
                it((h) => this.expandSegment(t, e, i, h.concat(c), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, e, i, r, o) {
          return "**" === i.path
            ? ((t = ww(i, t)),
              i.loadChildren
                ? (i._loadedRoutes
                    ? O({
                        routes: i._loadedRoutes,
                        injector: i._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, i)
                  ).pipe(
                    P(
                      (a) => (
                        (i._loadedRoutes = a.routes),
                        (i._loadedInjector = a.injector),
                        new re(r, {})
                      )
                    )
                  )
                : O(new re(r, {})))
            : Tw(e, i, r, t).pipe(
                Wn(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = i._injector ?? t), i, r).pipe(
                          it((u) => {
                            const d = u.injector ?? t,
                              h = u.routes,
                              { segmentGroup: f, slicedSegments: p } = Dc(
                                e,
                                a,
                                l,
                                h
                              ),
                              m = new re(f.segments, f.children);
                            if (0 === p.length && m.hasChildren())
                              return this.expandChildren(d, h, m).pipe(
                                P((b) => new re(a, b))
                              );
                            if (0 === h.length && 0 === p.length)
                              return O(new re(a, {}));
                            const y = hn(i) === o;
                            return this.expandSegment(
                              d,
                              m,
                              h,
                              p,
                              y ? ne : o,
                              !0
                            ).pipe(
                              P((w) => new re(a.concat(w.segments), w.children))
                            );
                          })
                        )
                      : ea(e)
                )
              );
        }
        getChildConfig(t, e, i) {
          return e.children
            ? O({ routes: e.children, injector: t })
            : e.loadChildren
            ? void 0 !== e._loadedRoutes
              ? O({ routes: e._loadedRoutes, injector: e._loadedInjector })
              : (function bV(n, t, e, i) {
                  const r = t.canLoad;
                  return void 0 === r || 0 === r.length
                    ? O(!0)
                    : O(
                        r.map((s) => {
                          const a = n.get(s),
                            l = (function sV(n) {
                              return n && Js(n.canLoad);
                            })(a)
                              ? a.canLoad(t, e)
                              : a(t, e);
                          return fi(l);
                        })
                      ).pipe(Fo(), Aw());
                })(t, e, i).pipe(
                  it((r) =>
                    r
                      ? this.configLoader.loadChildren(t, e).pipe(
                          tt((o) => {
                            (e._loadedRoutes = o.routes),
                              (e._loadedInjector = o.injector);
                          })
                        )
                      : (function AV(n) {
                          return hr(vw(Ec, 3));
                        })()
                  )
                )
            : O({ routes: [], injector: t });
        }
        lineralizeSegments(t, e) {
          let i = [],
            r = e.root;
          for (;;) {
            if (((i = i.concat(r.segments)), 0 === r.numberOfChildren))
              return O(i);
            if (r.numberOfChildren > 1 || !r.children[ne])
              return hr(new C(4e3, Ec));
            r = r.children[ne];
          }
        }
        applyRedirectCommands(t, e, i) {
          return this.applyRedirectCreateUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            i
          );
        }
        applyRedirectCreateUrlTree(t, e, i, r) {
          const o = this.createSegmentGroup(t, e.root, i, r);
          return new pr(
            o,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const i = {};
          return (
            dt(t, (r, o) => {
              if ("string" == typeof r && r.startsWith(":")) {
                const a = r.substring(1);
                i[o] = e[a];
              } else i[o] = r;
            }),
            i
          );
        }
        createSegmentGroup(t, e, i, r) {
          const o = this.createSegments(t, e.segments, i, r);
          let s = {};
          return (
            dt(e.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, i, r);
            }),
            new re(o, s)
          );
        }
        createSegments(t, e, i, r) {
          return e.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, r)
              : this.findOrReturn(o, i)
          );
        }
        findPosParam(t, e, i) {
          const r = i[e.path.substring(1)];
          if (!r) throw new C(4001, Ec);
          return r;
        }
        findOrReturn(t, e) {
          let i = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(i), r;
            i++;
          }
          return t;
        }
      }
      class RV {}
      class OV {
        constructor(t, e, i, r, o, s, a, l) {
          (this.injector = t),
            (this.rootComponentType = e),
            (this.config = i),
            (this.urlTree = r),
            (this.url = o),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const t = Dc(
            this.urlTree.root,
            [],
            [],
            this.config.filter((e) => void 0 === e.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            ne
          ).pipe(
            P((e) => {
              if (null === e) return null;
              const i = new _c(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  ne,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                r = new mi(i, e),
                o = new gw(this.url, r);
              return this.inheritParamsAndData(o._root), o;
            })
          );
        }
        inheritParamsAndData(t) {
          const e = t.value,
            i = mw(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(i.params)),
            (e.data = Object.freeze(i.data)),
            t.children.forEach((r) => this.inheritParamsAndData(r));
        }
        processSegmentGroup(t, e, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.processChildren(t, e, i)
            : this.processSegment(t, e, i, i.segments, r);
        }
        processChildren(t, e, i) {
          return $e(Object.keys(i.children)).pipe(
            Fi((r) => {
              const o = i.children[r],
                s = Ew(e, r);
              return this.processSegmentGroup(t, s, o, r);
            }),
            $D((r, o) => (r && o ? (r.push(...o), r) : null)),
            (function eL(n, t = !1) {
              return Pe((e, i) => {
                let r = 0;
                e.subscribe(
                  Te(i, (o) => {
                    const s = n(o, r++);
                    (s || t) && i.next(o), !s && i.complete();
                  })
                );
              });
            })((r) => null !== r),
            lc(null),
            zD(),
            P((r) => {
              if (null === r) return null;
              const o = Fw(r);
              return (
                (function PV(n) {
                  n.sort((t, e) =>
                    t.value.outlet === ne
                      ? -1
                      : e.value.outlet === ne
                      ? 1
                      : t.value.outlet.localeCompare(e.value.outlet)
                  );
                })(o),
                o
              );
            })
          );
        }
        processSegment(t, e, i, r, o) {
          return $e(e).pipe(
            Fi((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, i, r, o)
            ),
            ki((s) => !!s),
            je((s) => {
              if (s instanceof Ao) return xw(i, r, o) ? O([]) : O(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, e, i, r, o) {
          if (e.redirectTo || !Iw(e, i, r, o)) return O(null);
          let s;
          if ("**" === e.path) {
            const a = r.length > 0 ? qD(r).parameters : {},
              l = Pw(i) + r.length;
            s = O({
              snapshot: new _c(
                r,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Lw(e),
                hn(e),
                e.component ?? e._loadedComponent ?? null,
                e,
                Ow(i),
                l,
                Vw(e),
                l
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = Tw(i, e, r, t).pipe(
              P(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: u,
                }) => {
                  if (!a) return null;
                  const d = Pw(i) + l.length;
                  return {
                    snapshot: new _c(
                      l,
                      u,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      Lw(e),
                      hn(e),
                      e.component ?? e._loadedComponent ?? null,
                      e,
                      Ow(i),
                      d,
                      Vw(e),
                      d
                    ),
                    consumedSegments: l,
                    remainingSegments: c,
                  };
                }
              )
            );
          return s.pipe(
            Wn((a) => {
              if (null === a) return O(null);
              const {
                snapshot: l,
                consumedSegments: c,
                remainingSegments: u,
              } = a;
              t = e._injector ?? t;
              const d = e._loadedInjector ?? t,
                h = (function NV(n) {
                  return n.children
                    ? n.children
                    : n.loadChildren
                    ? n._loadedRoutes
                    : [];
                })(e),
                { segmentGroup: f, slicedSegments: p } = Dc(
                  i,
                  c,
                  u,
                  h.filter((y) => void 0 === y.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === p.length && f.hasChildren())
                return this.processChildren(d, h, f).pipe(
                  P((y) => (null === y ? null : [new mi(l, y)]))
                );
              if (0 === h.length && 0 === p.length) return O([new mi(l, [])]);
              const m = hn(e) === o;
              return this.processSegment(d, h, f, p, m ? ne : o).pipe(
                P((y) => (null === y ? null : [new mi(l, y)]))
              );
            })
          );
        }
      }
      function LV(n) {
        const t = n.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Fw(n) {
        const t = [],
          e = new Set();
        for (const i of n) {
          if (!LV(i)) {
            t.push(i);
            continue;
          }
          const r = t.find((o) => i.value.routeConfig === o.value.routeConfig);
          void 0 !== r ? (r.children.push(...i.children), e.add(r)) : t.push(i);
        }
        for (const i of e) {
          const r = Fw(i.children);
          t.push(new mi(i.value, r));
        }
        return t.filter((i) => !e.has(i));
      }
      function Ow(n) {
        let t = n;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function Pw(n) {
        let t = n,
          e = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (e += t._segmentIndexShift ?? 0);
        return e - 1;
      }
      function Lw(n) {
        return n.data || {};
      }
      function Vw(n) {
        return n.resolve || {};
      }
      const dp = Symbol("RouteTitle");
      function Bw(n) {
        return "string" == typeof n.title || null === n.title;
      }
      function hp(n) {
        return Wn((t) => {
          const e = n(t);
          return e ? $e(e).pipe(P(() => t)) : O(t);
        });
      }
      class qV extends class WV {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const fp = new E("ROUTES");
      let pp = (() => {
        class n {
          constructor(e, i) {
            (this.injector = e),
              (this.compiler = i),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(e) {
            if (this.componentLoaders.get(e))
              return this.componentLoaders.get(e);
            if (e._loadedComponent) return O(e._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(e);
            const i = fi(e.loadComponent()).pipe(
                tt((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(e),
                    (e._loadedComponent = o);
                }),
                cc(() => {
                  this.componentLoaders.delete(e);
                })
              ),
              r = new HD(i, () => new te()).pipe(Gf());
            return this.componentLoaders.set(e, r), r;
          }
          loadChildren(e, i) {
            if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
            if (i._loadedRoutes)
              return O({
                routes: i._loadedRoutes,
                injector: i._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(i);
            const o = this.loadModuleFactoryOrRoutes(i.loadChildren).pipe(
                P((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(i);
                  let l,
                    c,
                    u = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((l = a.create(e).injector),
                      (c = WD(l.get(fp, [], L.Self | L.Optional))));
                  return { routes: c.map(lp), injector: l };
                }),
                cc(() => {
                  this.childrenLoaders.delete(i);
                })
              ),
              s = new HD(o, () => new te()).pipe(Gf());
            return this.childrenLoaders.set(i, s), s;
          }
          loadModuleFactoryOrRoutes(e) {
            return fi(e()).pipe(
              it((i) =>
                i instanceof Fb || Array.isArray(i)
                  ? O(i)
                  : $e(this.compiler.compileModuleAsync(i))
              )
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(xe), _(af));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class YV {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function ZV(n) {
        throw n;
      }
      function QV(n, t, e) {
        return t.parse("/");
      }
      const XV = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        JV = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Ue = (() => {
        class n {
          constructor(e, i, r, o, s, a, l) {
            (this.rootComponentType = e),
              (this.urlSerializer = i),
              (this.rootContexts = r),
              (this.location = o),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new te()),
              (this.errorHandler = ZV),
              (this.malformedUriErrorHandler = QV),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => O(void 0)),
              (this.urlHandlingStrategy = new YV()),
              (this.routeReuseStrategy = new qV()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.configLoader = s.get(pp)),
              (this.configLoader.onLoadEndListener = (h) =>
                this.triggerEvent(new NL(h))),
              (this.configLoader.onLoadStartListener = (h) =>
                this.triggerEvent(new PL(h))),
              (this.ngModule = s.get(ar)),
              (this.console = s.get(ZO));
            const d = s.get(Q);
            (this.isNgZoneEnabled = d instanceof Q && Q.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function oL() {
                return new pr(new re([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = pw(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new dn({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          setupNavigations(e) {
            const i = this.events;
            return e.pipe(
              It((r) => 0 !== r.id),
              P((r) => ({
                ...r,
                extractedUrl: this.urlHandlingStrategy.extract(r.rawUrl),
              })),
              Wn((r) => {
                let o = !1,
                  s = !1;
                return O(r).pipe(
                  tt((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? {
                            ...this.lastSuccessfulNavigation,
                            previousNavigation: null,
                          }
                        : null,
                    };
                  }),
                  Wn((a) => {
                    const l = this.browserUrlTree.toString(),
                      c =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || c) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Hw(a.source) && (this.browserUrlTree = a.extractedUrl),
                        O(a).pipe(
                          Wn((d) => {
                            const h = this.transitions.getValue();
                            return (
                              i.next(
                                new Jf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              h !== this.transitions.getValue()
                                ? kn
                                : Promise.resolve(d)
                            );
                          }),
                          (function xV(n, t, e, i) {
                            return Wn((r) =>
                              (function TV(n, t, e, i, r) {
                                return new IV(n, t, e, i, r).apply();
                              })(n, t, e, r.extractedUrl, i).pipe(
                                P((o) => ({ ...r, urlAfterRedirects: o }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          tt((d) => {
                            (this.currentNavigation = {
                              ...this.currentNavigation,
                              finalUrl: d.urlAfterRedirects,
                            }),
                              (r.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function BV(n, t, e, i, r, o) {
                            return it((s) =>
                              (function FV(
                                n,
                                t,
                                e,
                                i,
                                r,
                                o,
                                s = "emptyOnly",
                                a = "legacy"
                              ) {
                                return new OV(n, t, e, i, r, s, a, o)
                                  .recognize()
                                  .pipe(
                                    Wn((l) =>
                                      null === l
                                        ? (function kV(n) {
                                            return new De((t) => t.error(n));
                                          })(new RV())
                                        : O(l)
                                    )
                                  );
                              })(
                                n,
                                t,
                                e,
                                s.urlAfterRedirects,
                                i.serialize(s.urlAfterRedirects),
                                i,
                                r,
                                o
                              ).pipe(P((a) => ({ ...s, targetSnapshot: a })))
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          tt((d) => {
                            if (
                              ((r.targetSnapshot = d.targetSnapshot),
                              "eager" === this.urlUpdateStrategy)
                            ) {
                              if (!d.extras.skipLocationChange) {
                                const f = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(f, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const h = new xL(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            i.next(h);
                          })
                        )
                      );
                    if (
                      c &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: h,
                          extractedUrl: f,
                          source: p,
                          restoredState: m,
                          extras: y,
                        } = a,
                        v = new Jf(h, this.serializeUrl(f), p, m);
                      i.next(v);
                      const w = pw(f, this.rootComponentType).snapshot;
                      return O(
                        (r = {
                          ...a,
                          targetSnapshot: w,
                          urlAfterRedirects: f,
                          extras: {
                            ...y,
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          },
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), kn;
                  }),
                  tt((a) => {
                    const l = new RL(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  P(
                    (a) =>
                      (r = {
                        ...a,
                        guards: tV(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                  ),
                  (function hV(n, t) {
                    return it((e) => {
                      const {
                        targetSnapshot: i,
                        currentSnapshot: r,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = e;
                      return 0 === s.length && 0 === o.length
                        ? O({ ...e, guardsResult: !0 })
                        : (function fV(n, t, e, i) {
                            return $e(n).pipe(
                              it((r) =>
                                (function vV(n, t, e, i, r) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return o && 0 !== o.length
                                    ? O(
                                        o.map((a) => {
                                          const l = bc(a, t, r);
                                          return fi(
                                            (function cV(n) {
                                              return n && Js(n.canDeactivate);
                                            })(l)
                                              ? l.canDeactivate(n, t, e, i)
                                              : l(n, t, e, i)
                                          ).pipe(ki());
                                        })
                                      ).pipe(Fo())
                                    : O(!0);
                                })(r.component, r.route, e, t, i)
                              ),
                              ki((r) => !0 !== r, !0)
                            );
                          })(s, i, r, n).pipe(
                            it((a) =>
                              a &&
                              (function oV(n) {
                                return "boolean" == typeof n;
                              })(a)
                                ? (function pV(n, t, e, i) {
                                    return $e(t).pipe(
                                      Fi((r) =>
                                        sc(
                                          (function gV(n, t) {
                                            return (
                                              null !== n && t && t(new LL(n)),
                                              O(!0)
                                            );
                                          })(r.route.parent, i),
                                          (function mV(n, t) {
                                            return (
                                              null !== n && t && t(new BL(n)),
                                              O(!0)
                                            );
                                          })(r.route, i),
                                          (function yV(n, t, e) {
                                            const i = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function nV(n) {
                                                    const t = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: n, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  ac(() =>
                                                    O(
                                                      s.guards.map((l) => {
                                                        const c = bc(
                                                          l,
                                                          s.node,
                                                          e
                                                        );
                                                        return fi(
                                                          (function lV(n) {
                                                            return (
                                                              n &&
                                                              Js(
                                                                n.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                            ? c.canActivateChild(
                                                                i,
                                                                n
                                                              )
                                                            : c(i, n)
                                                        ).pipe(ki());
                                                      })
                                                    ).pipe(Fo())
                                                  )
                                                );
                                            return O(o).pipe(Fo());
                                          })(n, r.path, e),
                                          (function _V(n, t, e) {
                                            const i = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!i || 0 === i.length)
                                              return O(!0);
                                            const r = i.map((o) =>
                                              ac(() => {
                                                const s = bc(o, t, e);
                                                return fi(
                                                  (function aV(n) {
                                                    return (
                                                      n && Js(n.canActivate)
                                                    );
                                                  })(s)
                                                    ? s.canActivate(t, n)
                                                    : s(t, n)
                                                ).pipe(ki());
                                              })
                                            );
                                            return O(r).pipe(Fo());
                                          })(n, r.route, e)
                                        )
                                      ),
                                      ki((r) => !0 !== r, !0)
                                    );
                                  })(i, o, n, t)
                                : O(a)
                            ),
                            P((a) => ({ ...e, guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  tt((a) => {
                    if (((r.guardsResult = a.guardsResult), gr(a.guardsResult)))
                      throw yw(0, a.guardsResult);
                    const l = new kL(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  It(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, "", 3),
                      !1)
                  ),
                  hp((a) => {
                    if (a.guards.canActivateChecks.length)
                      return O(a).pipe(
                        tt((l) => {
                          const c = new FL(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        }),
                        Wn((l) => {
                          let c = !1;
                          return O(l).pipe(
                            (function jV(n, t) {
                              return it((e) => {
                                const {
                                  targetSnapshot: i,
                                  guards: { canActivateChecks: r },
                                } = e;
                                if (!r.length) return O(e);
                                let o = 0;
                                return $e(r).pipe(
                                  Fi((s) =>
                                    (function HV(n, t, e, i) {
                                      const r = n.routeConfig,
                                        o = n._resolve;
                                      return (
                                        void 0 !== r?.title &&
                                          !Bw(r) &&
                                          (o[dp] = r.title),
                                        (function UV(n, t, e, i) {
                                          const r = (function $V(n) {
                                            return [
                                              ...Object.keys(n),
                                              ...Object.getOwnPropertySymbols(
                                                n
                                              ),
                                            ];
                                          })(n);
                                          if (0 === r.length) return O({});
                                          const o = {};
                                          return $e(r).pipe(
                                            it((s) =>
                                              (function zV(n, t, e, i) {
                                                const r = bc(n, t, i);
                                                return fi(
                                                  r.resolve
                                                    ? r.resolve(t, e)
                                                    : r(t, e)
                                                );
                                              })(n[s], t, e, i).pipe(
                                                ki(),
                                                tt((a) => {
                                                  o[s] = a;
                                                })
                                              )
                                            ),
                                            Wf(1),
                                            (function tL(n) {
                                              return P(() => n);
                                            })(o),
                                            je((s) =>
                                              s instanceof Ao ? kn : hr(s)
                                            )
                                          );
                                        })(o, n, t, i).pipe(
                                          P(
                                            (s) => (
                                              (n._resolvedData = s),
                                              (n.data = mw(n, e).resolve),
                                              r &&
                                                Bw(r) &&
                                                (n.data[dp] = r.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, i, n, t)
                                  ),
                                  tt(() => o++),
                                  Wf(1),
                                  it((s) => (o === r.length ? O(e) : kn))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            tt({
                              next: () => (c = !0),
                              complete: () => {
                                c ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(l, "", 2));
                              },
                            })
                          );
                        }),
                        tt((l) => {
                          const c = new OL(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        })
                      );
                  }),
                  hp((a) => {
                    const l = (c) => {
                      const u = [];
                      c.routeConfig?.loadComponent &&
                        !c.routeConfig._loadedComponent &&
                        u.push(
                          this.configLoader.loadComponent(c.routeConfig).pipe(
                            tt((d) => {
                              c.component = d;
                            }),
                            P(() => {})
                          )
                        );
                      for (const d of c.children) u.push(...l(d));
                      return u;
                    };
                    return zf(l(a.targetSnapshot.root)).pipe(lc(), Lt(1));
                  }),
                  hp(() => this.afterPreactivation()),
                  P((a) => {
                    const l = (function zL(n, t, e) {
                      const i = Ys(n, t._root, e ? e._root : void 0);
                      return new fw(i, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return (r = { ...a, targetRouterState: l });
                  }),
                  tt((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((n, t, e) =>
                    P(
                      (i) => (
                        new eV(
                          t,
                          i.targetRouterState,
                          i.currentRouterState,
                          e
                        ).activate(n),
                        i
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  tt({
                    next() {
                      o = !0;
                    },
                    complete() {
                      o = !0;
                    },
                  }),
                  cc(() => {
                    o || s || this.cancelNavigationTransition(r, "", 1),
                      this.currentNavigation?.id === r.id &&
                        (this.currentNavigation = null);
                  }),
                  je((a) => {
                    if (((s = !0), Cw(a))) {
                      bw(a) ||
                        ((this.navigated = !0), this.restoreHistory(r, !0));
                      const l = new gc(
                        r.id,
                        this.serializeUrl(r.extractedUrl),
                        a.message,
                        a.cancellationCode
                      );
                      if ((i.next(l), bw(a))) {
                        const c = this.urlHandlingStrategy.merge(
                            a.url,
                            this.rawUrlTree
                          ),
                          u = {
                            skipLocationChange: r.extras.skipLocationChange,
                            replaceUrl:
                              "eager" === this.urlUpdateStrategy ||
                              Hw(r.source),
                          };
                        this.scheduleNavigation(c, "imperative", null, u, {
                          resolve: r.resolve,
                          reject: r.reject,
                          promise: r.promise,
                        });
                      } else r.resolve(!1);
                    } else {
                      this.restoreHistory(r, !0);
                      const l = new uw(
                        r.id,
                        this.serializeUrl(r.extractedUrl),
                        a,
                        r.targetSnapshot ?? void 0
                      );
                      i.next(l);
                      try {
                        r.resolve(this.errorHandler(a));
                      } catch (c) {
                        r.reject(c);
                      }
                    }
                    return kn;
                  })
                );
              })
            );
          }
          resetRootComponentType(e) {
            (this.rootComponentType = e),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(e) {
            this.transitions.next({ ...this.transitions.value, ...e });
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((e) => {
                const i = "popstate" === e.type ? "popstate" : "hashchange";
                "popstate" === i &&
                  setTimeout(() => {
                    const r = { replaceUrl: !0 },
                      o = e.state?.navigationId ? e.state : null;
                    if (o) {
                      const a = { ...o };
                      delete a.navigationId,
                        delete a.ɵrouterPageId,
                        0 !== Object.keys(a).length && (r.state = a);
                    }
                    const s = this.parseUrl(e.url);
                    this.scheduleNavigation(s, i, o, r);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(e) {
            this.events.next(e);
          }
          resetConfig(e) {
            (this.config = e.map(lp)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(e, i = {}) {
            const {
                relativeTo: r,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = i,
              c = r || this.routerState.root,
              u = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              EL(c, this.currentUrlTree, e, d, u ?? null)
            );
          }
          navigateByUrl(e, i = { skipLocationChange: !1 }) {
            const r = gr(e) ? e : this.parseUrl(e),
              o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
            return this.scheduleNavigation(o, "imperative", null, i);
          }
          navigate(e, i = { skipLocationChange: !1 }) {
            return (
              (function eB(n) {
                for (let t = 0; t < n.length; t++) {
                  if (null == n[t]) throw new C(4008, false);
                }
              })(e),
              this.navigateByUrl(this.createUrlTree(e, i), i)
            );
          }
          serializeUrl(e) {
            return this.urlSerializer.serialize(e);
          }
          parseUrl(e) {
            let i;
            try {
              i = this.urlSerializer.parse(e);
            } catch (r) {
              i = this.malformedUriErrorHandler(r, this.urlSerializer, e);
            }
            return i;
          }
          isActive(e, i) {
            let r;
            if (((r = !0 === i ? { ...XV } : !1 === i ? { ...JV } : i), gr(e)))
              return YD(this.currentUrlTree, e, r);
            const o = this.parseUrl(e);
            return YD(this.currentUrlTree, o, r);
          }
          removeEmptyProps(e) {
            return Object.keys(e).reduce((i, r) => {
              const o = e[r];
              return null != o && (i[r] = o), i;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (e) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = e.id),
                  (this.currentPageId = e.targetPageId),
                  this.events.next(
                    new _r(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  this.titleStrategy?.updateTitle(this.routerState.snapshot),
                  e.resolve(!0);
              },
              (e) => {
                this.console.warn(`Unhandled Navigation Error: ${e}`);
              }
            );
          }
          scheduleNavigation(e, i, r, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, c;
            s
              ? ((a = s.resolve), (l = s.reject), (c = s.promise))
              : (c = new Promise((h, f) => {
                  (a = h), (l = f);
                }));
            const u = ++this.navigationId;
            let d;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (r = this.location.getState()),
                  (d =
                    r && r.ɵrouterPageId
                      ? r.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? this.browserPageId ?? 0
                      : (this.browserPageId ?? 0) + 1))
                : (d = 0),
              this.setTransition({
                id: u,
                targetPageId: d,
                source: i,
                restoredState: r,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: e,
                extras: o,
                resolve: a,
                reject: l,
                promise: c,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              c.catch((h) => Promise.reject(h))
            );
          }
          setBrowserUrl(e, i) {
            const r = this.urlSerializer.serialize(e),
              o = {
                ...i.extras.state,
                ...this.generateNgRouterState(i.id, i.targetPageId),
              };
            this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl
              ? this.location.replaceState(r, "", o)
              : this.location.go(r, "", o);
          }
          restoreHistory(e, i = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const r = this.currentPageId - e.targetPageId;
              ("popstate" !== e.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !== this.currentNavigation?.finalUrl) ||
              0 === r
                ? this.currentUrlTree === this.currentNavigation?.finalUrl &&
                  0 === r &&
                  (this.resetState(e),
                  (this.browserUrlTree = e.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(r);
            } else
              "replace" === this.canceledNavigationResolution &&
                (i && this.resetState(e), this.resetUrlToCurrentUrlTree());
          }
          resetState(e) {
            (this.routerState = e.currentRouterState),
              (this.currentUrlTree = e.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                e.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(e, i, r) {
            const o = new gc(e.id, this.serializeUrl(e.extractedUrl), i, r);
            this.triggerEvent(o), e.resolve(!1);
          }
          generateNgRouterState(e, i) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: e, ɵrouterPageId: i }
              : { navigationId: e };
          }
        }
        return (
          (n.ɵfac = function (e) {
            hl();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Hw(n) {
        return "imperative" !== n;
      }
      let Uw = (() => {
          class n {
            buildTitle(e) {
              let i,
                r = e.root;
              for (; void 0 !== r; )
                (i = this.getResolvedTitleForRoute(r) ?? i),
                  (r = r.children.find((o) => o.outlet === ne));
              return i;
            }
            getResolvedTitleForRoute(e) {
              return e.data[dp];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({
              token: n,
              factory: function () {
                return sn(iB);
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        iB = (() => {
          class n extends Uw {
            constructor(e) {
              super(), (this.title = e);
            }
            updateTitle(e) {
              const i = this.buildTitle(e);
              void 0 !== i && this.title.setTitle(i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(OD));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      class $w {}
      let zw = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this.router = e),
              (this.injector = r),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                It((e) => e instanceof _r),
                Fi(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(e, i) {
            const r = [];
            for (const o of i) {
              o.providers &&
                !o._injector &&
                (o._injector = Rl(o.providers, e, `Route: ${o.path}`));
              const s = o._injector ?? e,
                a = o._loadedInjector ?? s;
              (o.loadChildren && !o._loadedRoutes) ||
              (o.loadComponent && !o._loadedComponent)
                ? r.push(this.preloadConfig(s, o))
                : (o.children || o._loadedRoutes) &&
                  r.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return $e(r).pipe(Or());
          }
          preloadConfig(e, i) {
            return this.preloadingStrategy.preload(i, () => {
              let r;
              r =
                i.loadChildren && void 0 === i.canLoad
                  ? this.loader.loadChildren(e, i)
                  : O(null);
              const o = r.pipe(
                it((s) =>
                  null === s
                    ? O(void 0)
                    : ((i._loadedRoutes = s.routes),
                      (i._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? e, s.routes))
                )
              );
              return i.loadComponent && !i._loadedComponent
                ? $e([o, this.loader.loadComponent(i)]).pipe(Or())
                : o;
            });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Ue), _(af), _(Si), _($w), _(pp));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Gw = new E("");
      let rB = (() => {
        class n {
          constructor(e, i, r = {}) {
            (this.router = e),
              (this.viewportScroller = i),
              (this.options = r),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (r.scrollPositionRestoration =
                r.scrollPositionRestoration || "disabled"),
              (r.anchorScrolling = r.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe((e) => {
              e instanceof Jf
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = e.navigationTrigger),
                  (this.restoredId = e.restoredState
                    ? e.restoredState.navigationId
                    : 0))
                : e instanceof _r &&
                  ((this.lastId = e.id),
                  this.scheduleScrollEvent(
                    e,
                    this.router.parseUrl(e.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe((e) => {
              e instanceof dw &&
                (e.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(e.position)
                  : e.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(e.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(e, i) {
            this.router.triggerEvent(
              new dw(
                e,
                "popstate" === this.lastSource
                  ? this.store[this.restoredId]
                  : null,
                i
              )
            );
          }
          ngOnDestroy() {
            this.routerEventsSubscription &&
              this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription &&
                this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (n.ɵfac = function (e) {
            hl();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const _p = new E("ROUTER_CONFIGURATION", {
          providedIn: "root",
          factory: () => ({}),
        }),
        Ww = new E("ROUTER_FORROOT_GUARD"),
        qw = new E(""),
        oB = [
          Bs,
          { provide: JD, useClass: ew },
          {
            provide: Ue,
            useFactory: function dB(n, t, e, i, r, o, s, a = {}, l, c) {
              const u = new Ue(null, n, t, e, i, r, WD(o));
              return (
                l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                (u.titleStrategy = s),
                (function hB(n, t) {
                  n.errorHandler && (t.errorHandler = n.errorHandler),
                    n.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = n.malformedUriErrorHandler),
                    n.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = n.onSameUrlNavigation),
                    n.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        n.paramsInheritanceStrategy),
                    n.relativeLinkResolution &&
                      (t.relativeLinkResolution = n.relativeLinkResolution),
                    n.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = n.urlUpdateStrategy),
                    n.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        n.canceledNavigationResolution);
                })(a, u),
                u
              );
            },
            deps: [
              JD,
              Zs,
              Bs,
              xe,
              af,
              fp,
              Uw,
              _p,
              [class KV {}, new Ln()],
              [class GV {}, new Ln()],
            ],
          },
          Zs,
          {
            provide: ko,
            useFactory: function fB(n) {
              return n.routerState.root;
            },
            deps: [Ue],
          },
          pp,
        ];
      function sB() {
        return new AC("Router", Ue);
      }
      let yp = (() => {
        class n {
          constructor(e, i) {}
          static forRoot(e, i) {
            return {
              ngModule: n,
              providers: [
                oB,
                [],
                Kw(e),
                {
                  provide: Ww,
                  useFactory: uB,
                  deps: [[Ue, new Ln(), new Xr()]],
                },
                { provide: _p, useValue: i || {} },
                i?.useHash
                  ? { provide: dr, useClass: jP }
                  : { provide: dr, useClass: QC },
                {
                  provide: Gw,
                  useFactory: () => {
                    const n = sn(Ue),
                      t = sn(s1),
                      e = sn(_p);
                    return (
                      e.scrollOffset && t.setOffset(e.scrollOffset),
                      new rB(n, t, e)
                    );
                  },
                },
                i?.preloadingStrategy ? bB(i.preloadingStrategy) : [],
                { provide: AC, multi: !0, useFactory: sB },
                i?.initialNavigation ? mB(i) : [],
                [
                  { provide: Yw, useFactory: pB },
                  { provide: bC, multi: !0, useExisting: Yw },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: n, providers: [Kw(e)] };
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Ww, 8), _(Ue, 8));
          }),
          (n.ɵmod = he({ type: n })),
          (n.ɵinj = ue({})),
          n
        );
      })();
      function uB(n) {
        return "guarded";
      }
      function Kw(n) {
        return [
          { provide: sT, multi: !0, useValue: n },
          { provide: fp, multi: !0, useValue: n },
        ];
      }
      function pB() {
        const n = sn(xe);
        return (t) => {
          const e = n.get(So);
          if (t !== e.components[0]) return;
          const i = n.get(Ue),
            r = n.get(Zw);
          null === n.get(vp, null, L.Optional) && i.initialNavigation(),
            n.get(qw, null, L.Optional)?.setUpPreloading(),
            n.get(Gw, null, L.Optional)?.init(),
            i.resetRootComponentType(e.componentTypes[0]),
            r.next(),
            r.complete();
        };
      }
      const Yw = new E("");
      function mB(n) {
        return [
          "disabled" === n.initialNavigation
            ? [
                {
                  provide: Pl,
                  multi: !0,
                  useFactory: () => {
                    const n = sn(Ue);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: vp, useValue: "disabled" },
              ]
            : [],
          "enabledBlocking" === n.initialNavigation
            ? [
                { provide: vp, useValue: "enabledBlocking" },
                {
                  provide: Pl,
                  multi: !0,
                  deps: [xe],
                  useFactory: (n) => {
                    const t = n.get(LP, Promise.resolve(null));
                    let e = !1;
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const o = n.get(Ue),
                              s = n.get(Zw);
                            (function i(r) {
                              n.get(Ue)
                                .events.pipe(
                                  It(
                                    (s) =>
                                      s instanceof _r ||
                                      s instanceof gc ||
                                      s instanceof uw
                                  ),
                                  P(
                                    (s) =>
                                      s instanceof _r ||
                                      (s instanceof gc &&
                                        (0 === s.code || 1 === s.code) &&
                                        null)
                                  ),
                                  It((s) => null !== s),
                                  Lt(1)
                                )
                                .subscribe(() => {
                                  r();
                                });
                            })(() => {
                              r(!0), (e = !0);
                            }),
                              (o.afterPreactivation = () => (
                                r(!0), e || s.closed ? O(void 0) : s
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]
            : [],
        ];
      }
      const Zw = new E("", { factory: () => new te() }),
        vp = new E("");
      function bB(n) {
        return [
          zw,
          { provide: qw, useExisting: zw },
          { provide: $w, useExisting: n },
        ];
      }
      const CB = [];
      let DB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [yp.forRoot(CB), yp] })),
            n
          );
        })(),
        wB = (() => {
          class n {
            constructor() {
              this.title = "myFlix-Angular-client";
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (e, i) {
                1 & e && Ve(0, "router-outlet");
              },
              dependencies: [sp],
            })),
            n
          );
        })();
      class Qw {}
      class Xw {}
      class nt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((e) => {
                            const i = e.indexOf(":");
                            if (i > 0) {
                              const r = e.slice(0, i),
                                o = r.toLowerCase(),
                                s = e.slice(i + 1).trim();
                              this.maybeSetNormalizedName(r, o),
                                this.headers.has(o)
                                  ? this.headers.get(o).push(s)
                                  : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let i = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof i && (i = [i]),
                              i.length > 0 &&
                                (this.headers.set(r, i),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof nt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new nt();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof nt
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let i = t.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...i), this.headers.set(e, r);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(e);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, s);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class EB {
        encodeKey(t) {
          return Jw(t);
        }
        encodeValue(t) {
          return Jw(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const SB = /%(\d[a-f0-9])/gi,
        AB = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Jw(n) {
        return encodeURIComponent(n).replace(SB, (t, e) => AB[e] ?? t);
      }
      function Tc(n) {
        return `${n}`;
      }
      class Oi {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new EB()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function MB(n, t) {
              const e = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((r) => {
                      const o = r.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(r), ""]
                            : [
                                t.decodeKey(r.slice(0, o)),
                                t.decodeValue(r.slice(o + 1)),
                              ],
                        l = e.get(s) || [];
                      l.push(a), e.set(s, l);
                    }),
                e
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const i = t.fromObject[e],
                    r = Array.isArray(i) ? i.map(Tc) : [Tc(i)];
                  this.map.set(e, r);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((i) => {
              const r = t[i];
              Array.isArray(r)
                ? r.forEach((o) => {
                    e.push({ param: i, value: o, op: "a" });
                  })
                : e.push({ param: i, value: r, op: "a" });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((i) => e + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new Oi({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat(t)),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(Tc(t.value)), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let i = this.map.get(t.param) || [];
                      const r = i.indexOf(Tc(t.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0
                          ? this.map.set(t.param, i)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class TB {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function eE(n) {
        return typeof ArrayBuffer < "u" && n instanceof ArrayBuffer;
      }
      function tE(n) {
        return typeof Blob < "u" && n instanceof Blob;
      }
      function nE(n) {
        return typeof FormData < "u" && n instanceof FormData;
      }
      class ta {
        constructor(t, e, i, r) {
          let o;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function IB(n) {
              switch (n) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (o = r))
              : (o = i),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new nt()),
            this.context || (this.context = new TB()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = e;
            else {
              const a = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === a ? "?" : a < e.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Oi()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : eE(this.body) ||
              tE(this.body) ||
              nE(this.body) ||
              (function xB(n) {
                return (
                  typeof URLSearchParams < "u" && n instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Oi
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || nE(this.body)
            ? null
            : tE(this.body)
            ? this.body.type || null
            : eE(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Oi
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            i = t.url || this.url,
            r = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, h) => d.set(h, t.setHeaders[h]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, h) => d.set(h, t.setParams[h]),
                c
              )),
            new ta(e, i, o, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: r,
              withCredentials: s,
            })
          );
        }
      }
      var qe = (() => (
        ((qe = qe || {})[(qe.Sent = 0)] = "Sent"),
        (qe[(qe.UploadProgress = 1)] = "UploadProgress"),
        (qe[(qe.ResponseHeader = 2)] = "ResponseHeader"),
        (qe[(qe.DownloadProgress = 3)] = "DownloadProgress"),
        (qe[(qe.Response = 4)] = "Response"),
        (qe[(qe.User = 5)] = "User"),
        qe
      ))();
      class bp {
        constructor(t, e = 200, i = "OK") {
          (this.headers = t.headers || new nt()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || i),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Cp extends bp {
        constructor(t = {}) {
          super(t), (this.type = qe.ResponseHeader);
        }
        clone(t = {}) {
          return new Cp({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Ic extends bp {
        constructor(t = {}) {
          super(t),
            (this.type = qe.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Ic({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class iE extends bp {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Dp(n, t) {
        return {
          body: t,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let xc = (() => {
        class n {
          constructor(e) {
            this.handler = e;
          }
          request(e, i, r = {}) {
            let o;
            if (e instanceof ta) o = e;
            else {
              let l, c;
              (l = r.headers instanceof nt ? r.headers : new nt(r.headers)),
                r.params &&
                  (c =
                    r.params instanceof Oi
                      ? r.params
                      : new Oi({ fromObject: r.params })),
                (o = new ta(e, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || "json",
                  withCredentials: r.withCredentials,
                }));
            }
            const s = O(o).pipe(Fi((l) => this.handler.handle(l)));
            if (e instanceof ta || "events" === r.observe) return s;
            const a = s.pipe(It((l) => l instanceof Ic));
            switch (r.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      P((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(P((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${r.observe}}`
                );
            }
          }
          delete(e, i = {}) {
            return this.request("DELETE", e, i);
          }
          get(e, i = {}) {
            return this.request("GET", e, i);
          }
          head(e, i = {}) {
            return this.request("HEAD", e, i);
          }
          jsonp(e, i) {
            return this.request("JSONP", e, {
              params: new Oi().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(e, i = {}) {
            return this.request("OPTIONS", e, i);
          }
          patch(e, i, r = {}) {
            return this.request("PATCH", e, Dp(r, i));
          }
          post(e, i, r = {}) {
            return this.request("POST", e, Dp(r, i));
          }
          put(e, i, r = {}) {
            return this.request("PUT", e, Dp(r, i));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Qw));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class rE {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const oE = new E("HTTP_INTERCEPTORS");
      let RB = (() => {
        class n {
          intercept(e, i) {
            return i.handle(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const kB = /^\)\]\}',?\n/;
      let sE = (() => {
        class n {
          constructor(e) {
            this.xhrFactory = e;
          }
          handle(e) {
            if ("JSONP" === e.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new De((i) => {
              const r = this.xhrFactory.build();
              if (
                (r.open(e.method, e.urlWithParams),
                e.withCredentials && (r.withCredentials = !0),
                e.headers.forEach((f, p) => r.setRequestHeader(f, p.join(","))),
                e.headers.has("Accept") ||
                  r.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !e.headers.has("Content-Type"))
              ) {
                const f = e.detectContentTypeHeader();
                null !== f && r.setRequestHeader("Content-Type", f);
              }
              if (e.responseType) {
                const f = e.responseType.toLowerCase();
                r.responseType = "json" !== f ? f : "text";
              }
              const o = e.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const f = r.statusText || "OK",
                    p = new nt(r.getAllResponseHeaders()),
                    m =
                      (function FB(n) {
                        return "responseURL" in n && n.responseURL
                          ? n.responseURL
                          : /^X-Request-URL:/m.test(n.getAllResponseHeaders())
                          ? n.getResponseHeader("X-Request-URL")
                          : null;
                      })(r) || e.url;
                  return (
                    (s = new Cp({
                      headers: p,
                      status: r.status,
                      statusText: f,
                      url: m,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: f, status: p, statusText: m, url: y } = a(),
                    v = null;
                  204 !== p &&
                    (v = typeof r.response > "u" ? r.responseText : r.response),
                    0 === p && (p = v ? 200 : 0);
                  let w = p >= 200 && p < 300;
                  if ("json" === e.responseType && "string" == typeof v) {
                    const b = v;
                    v = v.replace(kB, "");
                    try {
                      v = "" !== v ? JSON.parse(v) : null;
                    } catch (S) {
                      (v = b), w && ((w = !1), (v = { error: S, text: v }));
                    }
                  }
                  w
                    ? (i.next(
                        new Ic({
                          body: v,
                          headers: f,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      ),
                      i.complete())
                    : i.error(
                        new iE({
                          error: v,
                          headers: f,
                          status: p,
                          statusText: m,
                          url: y || void 0,
                        })
                      );
                },
                c = (f) => {
                  const { url: p } = a(),
                    m = new iE({
                      error: f,
                      status: r.status || 0,
                      statusText: r.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  i.error(m);
                };
              let u = !1;
              const d = (f) => {
                  u || (i.next(a()), (u = !0));
                  let p = { type: qe.DownloadProgress, loaded: f.loaded };
                  f.lengthComputable && (p.total = f.total),
                    "text" === e.responseType &&
                      !!r.responseText &&
                      (p.partialText = r.responseText),
                    i.next(p);
                },
                h = (f) => {
                  let p = { type: qe.UploadProgress, loaded: f.loaded };
                  f.lengthComputable && (p.total = f.total), i.next(p);
                };
              return (
                r.addEventListener("load", l),
                r.addEventListener("error", c),
                r.addEventListener("timeout", c),
                r.addEventListener("abort", c),
                e.reportProgress &&
                  (r.addEventListener("progress", d),
                  null !== o &&
                    r.upload &&
                    r.upload.addEventListener("progress", h)),
                r.send(o),
                i.next({ type: qe.Sent }),
                () => {
                  r.removeEventListener("error", c),
                    r.removeEventListener("abort", c),
                    r.removeEventListener("load", l),
                    r.removeEventListener("timeout", c),
                    e.reportProgress &&
                      (r.removeEventListener("progress", d),
                      null !== o &&
                        r.upload &&
                        r.upload.removeEventListener("progress", h)),
                    r.readyState !== r.DONE && r.abort();
                }
              );
            });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(_D));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const wp = new E("XSRF_COOKIE_NAME"),
        Ep = new E("XSRF_HEADER_NAME");
      class aE {}
      let OB = (() => {
          class n {
            constructor(e, i, r) {
              (this.doc = e),
                (this.platform = i),
                (this.cookieName = r),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const e = this.doc.cookie || "";
              return (
                e !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = aD(e, this.cookieName)),
                  (this.lastCookieString = e)),
                this.lastToken
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K), _(Ll), _(wp));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Mp = (() => {
          class n {
            constructor(e, i) {
              (this.tokenService = e), (this.headerName = i);
            }
            intercept(e, i) {
              const r = e.url.toLowerCase();
              if (
                "GET" === e.method ||
                "HEAD" === e.method ||
                r.startsWith("http://") ||
                r.startsWith("https://")
              )
                return i.handle(e);
              const o = this.tokenService.getToken();
              return (
                null !== o &&
                  !e.headers.has(this.headerName) &&
                  (e = e.clone({ headers: e.headers.set(this.headerName, o) })),
                i.handle(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(aE), _(Ep));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        PB = (() => {
          class n {
            constructor(e, i) {
              (this.backend = e), (this.injector = i), (this.chain = null);
            }
            handle(e) {
              if (null === this.chain) {
                const i = this.injector.get(oE, []);
                this.chain = i.reduceRight(
                  (r, o) => new rE(r, o),
                  this.backend
                );
              }
              return this.chain.handle(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Xw), _(xe));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        NB = (() => {
          class n {
            static disable() {
              return {
                ngModule: n,
                providers: [{ provide: Mp, useClass: RB }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: n,
                providers: [
                  e.cookieName ? { provide: wp, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Ep, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({
              providers: [
                Mp,
                { provide: oE, useExisting: Mp, multi: !0 },
                { provide: aE, useClass: OB },
                { provide: wp, useValue: "XSRF-TOKEN" },
                { provide: Ep, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            n
          );
        })(),
        LB = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({
              providers: [
                xc,
                { provide: Qw, useClass: PB },
                sE,
                { provide: Xw, useExisting: sE },
              ],
              imports: [
                NB.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "X-XSRF-TOKEN",
                }),
              ],
            })),
            n
          );
        })();
      class lE {}
      const _i = "*";
      function Sp(n, t) {
        return { type: 7, name: n, definitions: t, options: {} };
      }
      function na(n, t = null) {
        return { type: 4, styles: t, timings: n };
      }
      function cE(n, t = null) {
        return { type: 3, steps: n, options: t };
      }
      function uE(n, t = null) {
        return { type: 2, steps: n, options: t };
      }
      function xn(n) {
        return { type: 6, styles: n, offset: null };
      }
      function ia(n, t, e) {
        return { type: 0, name: n, styles: t, options: e };
      }
      function ra(n, t, e = null) {
        return { type: 1, expr: n, animation: t, options: e };
      }
      function dE(n = null) {
        return { type: 9, options: n };
      }
      function hE(n, t, e = null) {
        return { type: 11, selector: n, animation: t, options: e };
      }
      function fE(n) {
        Promise.resolve(null).then(n);
      }
      class oa {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          fE(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class pE {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            i = 0,
            r = 0;
          const o = this.players.length;
          0 == o
            ? fE(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++e == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++i == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++r == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, e / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (e, i) => (null === e || i.totalTime > e.totalTime ? i : e),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      function mE(n) {
        return new C(3e3, !1);
      }
      function b2() {
        return typeof window < "u" && typeof window.document < "u";
      }
      function Tp() {
        return (
          typeof process < "u" &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Pi(n) {
        switch (n.length) {
          case 0:
            return new oa();
          case 1:
            return n[0];
          default:
            return new pE(n);
        }
      }
      function gE(n, t, e, i, r = new Map(), o = new Map()) {
        const s = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((u) => {
            const d = u.get("offset"),
              h = d == l,
              f = (h && c) || new Map();
            u.forEach((p, m) => {
              let y = m,
                v = p;
              if ("offset" !== m)
                switch (((y = t.normalizePropertyName(y, s)), v)) {
                  case "!":
                    v = r.get(m);
                    break;
                  case _i:
                    v = o.get(m);
                    break;
                  default:
                    v = t.normalizeStyleValue(m, y, v, s);
                }
              f.set(y, v);
            }),
              h || a.push(f),
              (c = f),
              (l = d);
          }),
          s.length)
        )
          throw (function l2(n) {
            return new C(3502, !1);
          })();
        return a;
      }
      function Ip(n, t, e, i) {
        switch (t) {
          case "start":
            n.onStart(() => i(e && xp(e, "start", n)));
            break;
          case "done":
            n.onDone(() => i(e && xp(e, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(e && xp(e, "destroy", n)));
        }
      }
      function xp(n, t, e) {
        const o = Rp(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            t || n.phaseName,
            e.totalTime ?? n.totalTime,
            !!e.disabled
          ),
          s = n._data;
        return null != s && (o._data = s), o;
      }
      function Rp(n, t, e, i, r = "", o = 0, s) {
        return {
          element: n,
          triggerName: t,
          fromState: e,
          toState: i,
          phaseName: r,
          totalTime: o,
          disabled: !!s,
        };
      }
      function Kt(n, t, e) {
        let i = n.get(t);
        return i || n.set(t, (i = e)), i;
      }
      function _E(n) {
        const t = n.indexOf(":");
        return [n.substring(1, t), n.slice(t + 1)];
      }
      let kp = (n, t) => !1,
        yE = (n, t, e) => [],
        vE = null;
      function Fp(n) {
        const t = n.parentNode || n.host;
        return t === vE ? null : t;
      }
      (Tp() || typeof Element < "u") &&
        (b2()
          ? ((vE = (() => document.documentElement)()),
            (kp = (n, t) => {
              for (; t; ) {
                if (t === n) return !0;
                t = Fp(t);
              }
              return !1;
            }))
          : (kp = (n, t) => n.contains(t)),
        (yE = (n, t, e) => {
          if (e) return Array.from(n.querySelectorAll(t));
          const i = n.querySelector(t);
          return i ? [i] : [];
        }));
      let yr = null,
        bE = !1;
      const CE = kp,
        DE = yE;
      let wE = (() => {
          class n {
            validateStyleProperty(e) {
              return (function D2(n) {
                yr ||
                  ((yr =
                    (function w2() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (bE = !!yr.style && "WebkitAppearance" in yr.style));
                let t = !0;
                return (
                  yr.style &&
                    !(function C2(n) {
                      return "ebkit" == n.substring(1, 6);
                    })(n) &&
                    ((t = n in yr.style),
                    !t &&
                      bE &&
                      (t =
                        "Webkit" + n.charAt(0).toUpperCase() + n.slice(1) in
                        yr.style)),
                  t
                );
              })(e);
            }
            matchesElement(e, i) {
              return !1;
            }
            containsElement(e, i) {
              return CE(e, i);
            }
            getParentElement(e) {
              return Fp(e);
            }
            query(e, i, r) {
              return DE(e, i, r);
            }
            computeStyle(e, i, r) {
              return r || "";
            }
            animate(e, i, r, o, s, a = [], l) {
              return new oa(r, o);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Op = (() => {
          class n {}
          return (n.NOOP = new wE()), n;
        })();
      const Pp = "ng-enter",
        Rc = "ng-leave",
        kc = "ng-trigger",
        Fc = ".ng-trigger",
        ME = "ng-animating",
        Np = ".ng-animating";
      function Ni(n) {
        if ("number" == typeof n) return n;
        const t = n.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : Lp(parseFloat(t[1]), t[2]);
      }
      function Lp(n, t) {
        return "s" === t ? 1e3 * n : n;
      }
      function Oc(n, t, e) {
        return n.hasOwnProperty("duration")
          ? n
          : (function S2(n, t, e) {
              let r,
                o = 0,
                s = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(mE()), { duration: 0, delay: 0, easing: "" };
                r = Lp(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = Lp(parseFloat(l), a[4]));
                const c = a[5];
                c && (s = c);
              } else r = n;
              if (!e) {
                let a = !1,
                  l = t.length;
                r < 0 &&
                  (t.push(
                    (function BB() {
                      return new C(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (t.push(
                      (function jB() {
                        return new C(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(l, 0, mE());
              }
              return { duration: r, delay: o, easing: s };
            })(n, t, e);
      }
      function sa(n, t = {}) {
        return (
          Object.keys(n).forEach((e) => {
            t[e] = n[e];
          }),
          t
        );
      }
      function SE(n) {
        const t = new Map();
        return (
          Object.keys(n).forEach((e) => {
            t.set(e, n[e]);
          }),
          t
        );
      }
      function Li(n, t = new Map(), e) {
        if (e) for (let [i, r] of e) t.set(i, r);
        for (let [i, r] of n) t.set(i, r);
        return t;
      }
      function TE(n, t, e) {
        return e ? t + ":" + e + ";" : "";
      }
      function IE(n) {
        let t = "";
        for (let e = 0; e < n.style.length; e++) {
          const i = n.style.item(e);
          t += TE(0, i, n.style.getPropertyValue(i));
        }
        for (const e in n.style)
          n.style.hasOwnProperty(e) &&
            !e.startsWith("_") &&
            (t += TE(0, x2(e), n.style[e]));
        n.setAttribute("style", t);
      }
      function Kn(n, t, e) {
        n.style &&
          (t.forEach((i, r) => {
            const o = Bp(r);
            e && !e.has(r) && e.set(r, n.style[o]), (n.style[o] = i);
          }),
          Tp() && IE(n));
      }
      function vr(n, t) {
        n.style &&
          (t.forEach((e, i) => {
            const r = Bp(i);
            n.style[r] = "";
          }),
          Tp() && IE(n));
      }
      function aa(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : uE(n)) : n;
      }
      const Vp = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function xE(n) {
        let t = [];
        if ("string" == typeof n) {
          let e;
          for (; (e = Vp.exec(n)); ) t.push(e[1]);
          Vp.lastIndex = 0;
        }
        return t;
      }
      function Pc(n, t, e) {
        const i = n.toString(),
          r = i.replace(Vp, (o, s) => {
            let a = t[s];
            return (
              null == a &&
                (e.push(
                  (function UB(n) {
                    return new C(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function Nc(n) {
        const t = [];
        let e = n.next();
        for (; !e.done; ) t.push(e.value), (e = n.next());
        return t;
      }
      const I2 = /-+([a-z0-9])/g;
      function Bp(n) {
        return n.replace(I2, (...t) => t[1].toUpperCase());
      }
      function x2(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function Yt(n, t, e) {
        switch (t.type) {
          case 7:
            return n.visitTrigger(t, e);
          case 0:
            return n.visitState(t, e);
          case 1:
            return n.visitTransition(t, e);
          case 2:
            return n.visitSequence(t, e);
          case 3:
            return n.visitGroup(t, e);
          case 4:
            return n.visitAnimate(t, e);
          case 5:
            return n.visitKeyframes(t, e);
          case 6:
            return n.visitStyle(t, e);
          case 8:
            return n.visitReference(t, e);
          case 9:
            return n.visitAnimateChild(t, e);
          case 10:
            return n.visitAnimateRef(t, e);
          case 11:
            return n.visitQuery(t, e);
          case 12:
            return n.visitStagger(t, e);
          default:
            throw (function $B(n) {
              return new C(3004, !1);
            })();
        }
      }
      function RE(n, t) {
        return window.getComputedStyle(n)[t];
      }
      function N2(n, t) {
        const e = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function L2(n, t, e) {
                  if (":" == n[0]) {
                    const l = (function V2(n, t) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, i) => parseFloat(i) > parseFloat(e);
                        case ":decrement":
                          return (e, i) => parseFloat(i) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              (function r2(n) {
                                return new C(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(n, e);
                    if ("function" == typeof l) return void t.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      e.push(
                        (function n2(n) {
                          return new C(3015, !1);
                        })()
                      ),
                      t
                    );
                  const r = i[1],
                    o = i[2],
                    s = i[3];
                  t.push(kE(r, s));
                  "<" == o[0] && !("*" == r && "*" == s) && t.push(kE(s, r));
                })(i, e, t)
              )
            : e.push(n),
          e
        );
      }
      const jc = new Set(["true", "1"]),
        Hc = new Set(["false", "0"]);
      function kE(n, t) {
        const e = jc.has(n) || Hc.has(n),
          i = jc.has(t) || Hc.has(t);
        return (r, o) => {
          let s = "*" == n || n == r,
            a = "*" == t || t == o;
          return (
            !s && e && "boolean" == typeof r && (s = r ? jc.has(n) : Hc.has(n)),
            !a && i && "boolean" == typeof o && (a = o ? jc.has(t) : Hc.has(t)),
            s && a
          );
        };
      }
      const B2 = new RegExp("s*:selfs*,?", "g");
      function jp(n, t, e, i) {
        return new j2(n).build(t, e, i);
      }
      class j2 {
        constructor(t) {
          this._driver = t;
        }
        build(t, e, i) {
          const r = new $2(e);
          return this._resetContextStyleTimingState(r), Yt(this, aa(t), r);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set("", new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let i = (e.queryCount = 0),
            r = (e.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                (function GB() {
                  return new C(3006, !1);
                })()
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(e), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (l.name = u), o.push(this.visitState(l, e));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, e);
                (i += l.queryCount), (r += l.depCount), s.push(l);
              } else
                e.errors.push(
                  (function WB() {
                    return new C(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: o,
              transitions: s,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const i = this.visitStyle(t.styles, e),
            r = (t.options && t.options.params) || null;
          if (i.containsDynamicStyles) {
            const o = new Set(),
              s = r || {};
            i.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  xE(l).forEach((c) => {
                    s.hasOwnProperty(c) || o.add(c);
                  });
                });
            }),
              o.size &&
                (Nc(o.values()),
                e.errors.push(
                  (function qB(n, t) {
                    return new C(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const i = Yt(this, aa(t.animation), e);
          return {
            type: 1,
            matchers: N2(t.expr, e.errors),
            animation: i,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: br(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((i) => Yt(this, i, e)),
            options: br(t.options),
          };
        }
        visitGroup(t, e) {
          const i = e.currentTime;
          let r = 0;
          const o = t.steps.map((s) => {
            e.currentTime = i;
            const a = Yt(this, s, e);
            return (r = Math.max(r, e.currentTime)), a;
          });
          return (
            (e.currentTime = r), { type: 3, steps: o, options: br(t.options) }
          );
        }
        visitAnimate(t, e) {
          const i = (function G2(n, t) {
            if (n.hasOwnProperty("duration")) return n;
            if ("number" == typeof n) return Hp(Oc(n, t).duration, 0, "");
            const e = n;
            if (
              e
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = Hp(0, 0, "");
              return (o.dynamic = !0), (o.strValue = e), o;
            }
            const r = Oc(e, t);
            return Hp(r.duration, r.delay, r.easing);
          })(t.timings, e.errors);
          e.currentAnimateTimings = i;
          let r,
            o = t.styles ? t.styles : xn({});
          if (5 == o.type) r = this.visitKeyframes(o, e);
          else {
            let s = t.styles,
              a = !1;
            if (!s) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (s = xn(c));
            }
            e.currentTime += i.duration + i.delay;
            const l = this.visitStyle(s, e);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(t, e) {
          const i = this._makeStyleAst(t, e);
          return this._validateStyleAst(i, e), i;
        }
        _makeStyleAst(t, e) {
          const i = [],
            r = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of r)
            "string" == typeof a
              ? a === _i
                ? i.push(a)
                : e.errors.push(new C(3002, !1))
              : i.push(SE(a));
          let o = !1,
            s = null;
          return (
            i.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const i = e.currentAnimateTimings;
          let r = e.currentTime,
            o = e.currentTime;
          i && o > 0 && (o -= i.duration + i.delay),
            t.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, l) => {
                  const c = e.collectedStyles.get(e.currentQuerySelector),
                    u = c.get(l);
                  let d = !0;
                  u &&
                    (o != r &&
                      o >= u.startTime &&
                      r <= u.endTime &&
                      (e.errors.push(
                        (function YB(n, t, e, i, r) {
                          return new C(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = u.startTime)),
                    d && c.set(l, { startTime: o, endTime: r }),
                    e.options &&
                      (function T2(n, t, e) {
                        const i = t.params || {},
                          r = xE(n);
                        r.length &&
                          r.forEach((o) => {
                            i.hasOwnProperty(o) ||
                              e.push(
                                (function HB(n) {
                                  return new C(3001, !1);
                                })()
                              );
                          });
                      })(a, e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const i = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                (function ZB() {
                  return new C(3011, !1);
                })()
              ),
              i
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = t.steps.map((v) => {
            const w = this._makeStyleAst(v, e);
            let b =
                null != w.offset
                  ? w.offset
                  : (function z2(n) {
                      if ("string" == typeof n) return null;
                      let t = null;
                      if (Array.isArray(n))
                        n.forEach((e) => {
                          if (e instanceof Map && e.has("offset")) {
                            const i = e;
                            (t = parseFloat(i.get("offset"))),
                              i.delete("offset");
                          }
                        });
                      else if (n instanceof Map && n.has("offset")) {
                        const e = n;
                        (t = parseFloat(e.get("offset"))), e.delete("offset");
                      }
                      return t;
                    })(w.styles),
              S = 0;
            return (
              null != b && (o++, (S = w.offset = b)),
              (l = l || S < 0 || S > 1),
              (a = a || S < c),
              (c = S),
              s.push(S),
              w
            );
          });
          l &&
            e.errors.push(
              (function QB() {
                return new C(3012, !1);
              })()
            ),
            a &&
              e.errors.push(
                (function XB() {
                  return new C(3200, !1);
                })()
              );
          const d = t.steps.length;
          let h = 0;
          o > 0 && o < d
            ? e.errors.push(
                (function JB() {
                  return new C(3202, !1);
                })()
              )
            : 0 == o && (h = 1 / (d - 1));
          const f = d - 1,
            p = e.currentTime,
            m = e.currentAnimateTimings,
            y = m.duration;
          return (
            u.forEach((v, w) => {
              const b = h > 0 ? (w == f ? 1 : h * w) : s[w],
                S = b * y;
              (e.currentTime = p + m.delay + S),
                (m.duration = S),
                this._validateStyleAst(v, e),
                (v.offset = b),
                i.styles.push(v);
            }),
            i
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Yt(this, aa(t.animation), e),
            options: br(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: br(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: br(t.options),
          };
        }
        visitQuery(t, e) {
          const i = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [o, s] = (function H2(n) {
            const t = !!n.split(/\s*,\s*/).find((e) => ":self" == e);
            return (
              t && (n = n.replace(B2, "")),
              (n = n
                .replace(/@\*/g, Fc)
                .replace(/@\w+/g, (e) => Fc + "-" + e.slice(1))
                .replace(/:animating/g, Np)),
              [n, t]
            );
          })(t.selector);
          (e.currentQuerySelector = i.length ? i + " " + o : o),
            Kt(e.collectedStyles, e.currentQuerySelector, new Map());
          const a = Yt(this, aa(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = i),
            {
              type: 11,
              selector: o,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: s,
              animation: a,
              originalSelector: t.selector,
              options: br(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push(
              (function e2() {
                return new C(3013, !1);
              })()
            );
          const i =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Oc(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Yt(this, aa(t.animation), e),
            timings: i,
            options: null,
          };
        }
      }
      class $2 {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function br(n) {
        return (
          n
            ? (n = sa(n)).params &&
              (n.params = (function U2(n) {
                return n ? sa(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function Hp(n, t, e) {
        return { duration: n, delay: t, easing: e };
      }
      function Up(n, t, e, i, r, o, s = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: t,
          preStyleProps: e,
          postStyleProps: i,
          duration: r,
          delay: o,
          totalTime: r + o,
          easing: s,
          subTimeline: a,
        };
      }
      class Uc {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, e) {
          let i = this._map.get(t);
          i || this._map.set(t, (i = [])), i.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const K2 = new RegExp(":enter", "g"),
        Z2 = new RegExp(":leave", "g");
      function $p(n, t, e, i, r, o = new Map(), s = new Map(), a, l, c = []) {
        return new Q2().buildKeyframes(n, t, e, i, r, o, s, a, l, c);
      }
      class Q2 {
        buildKeyframes(t, e, i, r, o, s, a, l, c, u = []) {
          c = c || new Uc();
          const d = new zp(t, e, c, r, o, u, []);
          d.options = l;
          const h = l.delay ? Ni(l.delay) : 0;
          d.currentTimeline.delayNextStep(h),
            d.currentTimeline.setStyles([s], null, d.errors, l),
            Yt(this, i, d);
          const f = d.timelines.filter((p) => p.containsAnimation());
          if (f.length && a.size) {
            let p;
            for (let m = f.length - 1; m >= 0; m--) {
              const y = f[m];
              if (y.element === e) {
                p = y;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, l);
          }
          return f.length
            ? f.map((p) => p.buildKeyframes())
            : [Up(e, [], [], [], 0, h, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const i = e.subInstructions.get(e.element);
          if (i) {
            const r = e.createSubContext(t.options),
              o = e.currentTimeline.currentTime,
              s = this._visitSubInstructions(i, r, r.options);
            o != s && e.transformIntoNewTimeline(s);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const i = e.createSubContext(t.options);
          i.transformIntoNewTimeline(),
            this.visitReference(t.animation, i),
            e.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, i) {
          let o = e.currentTimeline.currentTime;
          const s = null != i.duration ? Ni(i.duration) : null,
            a = null != i.delay ? Ni(i.delay) : null;
          return (
            0 !== s &&
              t.forEach((l) => {
                const c = e.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, c.duration + c.delay);
              }),
            o
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            Yt(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const i = e.subContextCount;
          let r = e;
          const o = t.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((r = e.createSubContext(o)),
            r.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = $c));
            const s = Ni(o.delay);
            r.delayNextStep(s);
          }
          t.steps.length &&
            (t.steps.forEach((s) => Yt(this, s, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const i = [];
          let r = e.currentTimeline.currentTime;
          const o = t.options && t.options.delay ? Ni(t.options.delay) : 0;
          t.steps.forEach((s) => {
            const a = e.createSubContext(t.options);
            o && a.delayNextStep(o),
              Yt(this, s, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((s) => e.currentTimeline.mergeTimelineCollectedStyles(s)),
            e.transformIntoNewTimeline(r),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const i = t.strValue;
            return Oc(e.params ? Pc(i, e.params, e.errors) : i, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const i = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            r = e.currentTimeline;
          i.delay && (e.incrementTime(i.delay), r.snapshotCurrentStyles());
          const o = t.style;
          5 == o.type
            ? this.visitKeyframes(o, e)
            : (e.incrementTime(i.duration),
              this.visitStyle(o, e),
              r.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const i = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && i.hasCurrentStyleProperties() && i.forwardFrame();
          const o = (r && r.easing) || t.easing;
          t.isEmptyStep
            ? i.applyEmptyStep(o)
            : i.setStyles(t.styles, o, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const i = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            o = i.duration,
            a = e.createSubContext().currentTimeline;
          (a.easing = i.easing),
            t.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, e.errors, e.options),
                a.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(a),
            e.transformIntoNewTimeline(r + o),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const i = e.currentTimeline.currentTime,
            r = t.options || {},
            o = r.delay ? Ni(r.delay) : 0;
          o &&
            (6 === e.previousNode.type ||
              (0 == i && e.currentTimeline.hasCurrentStyleProperties())) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = $c));
          let s = i;
          const a = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!r.optional,
            e.errors
          );
          e.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            e.currentQueryIndex = u;
            const d = e.createSubContext(t.options, c);
            o && d.delayNextStep(o),
              c === e.element && (l = d.currentTimeline),
              Yt(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(s),
            l &&
              (e.currentTimeline.mergeTimelineCollectedStyles(l),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const i = e.parentContext,
            r = e.currentTimeline,
            o = t.timings,
            s = Math.abs(o.duration),
            a = s * (e.currentQueryTotal - 1);
          let l = s * e.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const u = e.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          Yt(this, t.animation, e),
            (e.previousNode = t),
            (i.currentStaggerTime =
              r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const $c = {};
      class zp {
        constructor(t, e, i, r, o, s, a, l) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = $c),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new zc(this._driver, e, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const i = t;
          let r = this.options;
          null != i.duration && (r.duration = Ni(i.duration)),
            null != i.delay && (r.delay = Ni(i.delay));
          const o = i.params;
          if (o) {
            let s = r.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!e || !s.hasOwnProperty(a)) &&
                  (s[a] = Pc(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const i = (t.params = {});
              Object.keys(e).forEach((r) => {
                i[r] = e[r];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, i) {
          const r = e || this.element,
            o = new zp(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(t),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = $c),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, i) {
          const r = {
              duration: e ?? t.duration,
              delay: this.currentTimeline.currentTime + (i ?? 0) + t.delay,
              easing: "",
            },
            o = new X2(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              r,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(o), r;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, i, r, o, s) {
          let a = [];
          if ((r && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(K2, "." + this._enterClassName)).replace(
              Z2,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, t, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function t2(n) {
                  return new C(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class zc {
        constructor(t, e, i, r) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new zc(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          this._localTimelineStyles.set(t, e),
            this._globalTimelineStyles.set(t, e),
            this._styleSummary.set(t, { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set("easing", t);
          for (let [e, i] of this._globalTimelineStyles)
            this._backFill.set(e, i || _i), this._currentKeyframe.set(e, _i);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, e, i, r) {
          e && this._previousKeyframe.set("easing", e);
          const o = (r && r.params) || {},
            s = (function J2(n, t) {
              const e = new Map();
              let i;
              return (
                n.forEach((r) => {
                  if ("*" === r) {
                    i = i || t.keys();
                    for (let o of i) e.set(o, _i);
                  } else Li(r, e);
                }),
                e
              );
            })(t, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const c = Pc(l, o, i);
            this._pendingStyles.set(a, c),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? _i),
              this._updateStyle(a, c);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, e) => {
              this._currentKeyframe.set(e, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, e) => {
              this._currentKeyframe.has(e) || this._currentKeyframe.set(e, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, e] of this._localTimelineStyles)
            this._pendingStyles.set(t, e), this._updateStyle(t, e);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((e, i) => {
            const r = this._styleSummary.get(i);
            (!r || e.time > r.time) && this._updateStyle(i, e.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = Li(a, new Map(), this._backFill);
            c.forEach((u, d) => {
              "!" === u ? t.add(d) : u === _i && e.add(d);
            }),
              i || c.set("offset", l / this.duration),
              r.push(c);
          });
          const o = t.size ? Nc(t.values()) : [],
            s = e.size ? Nc(e.values()) : [];
          if (i) {
            const a = r[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (r = [a, l]);
          }
          return Up(
            this.element,
            r,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class X2 extends zc {
        constructor(t, e, i, r, o, s, a = !1) {
          super(t, e, s.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const o = [],
              s = i + e,
              a = e / s,
              l = Li(t[0]);
            l.set("offset", 0), o.push(l);
            const c = Li(t[0]);
            c.set("offset", PE(a)), o.push(c);
            const u = t.length - 1;
            for (let d = 1; d <= u; d++) {
              let h = Li(t[d]);
              const f = h.get("offset");
              h.set("offset", PE((e + f * i) / s)), o.push(h);
            }
            (i = s), (e = 0), (r = ""), (t = o);
          }
          return Up(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            i,
            e,
            r,
            !0
          );
        }
      }
      function PE(n, t = 3) {
        const e = Math.pow(10, t - 1);
        return Math.round(n * e) / e;
      }
      class Gp {}
      const ej = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class tj extends Gp {
        normalizePropertyName(t, e) {
          return Bp(t);
        }
        normalizeStyleValue(t, e, i, r) {
          let o = "";
          const s = i.toString().trim();
          if (ej.has(e) && 0 !== i && "0" !== i)
            if ("number" == typeof i) o = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(
                  (function zB(n, t) {
                    return new C(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function NE(n, t, e, i, r, o, s, a, l, c, u, d, h) {
        return {
          type: 0,
          element: n,
          triggerName: t,
          isRemovalTransition: r,
          fromState: e,
          fromStyles: o,
          toState: i,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: d,
          errors: h,
        };
      }
      const Wp = {};
      class LE {
        constructor(t, e, i) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = i);
        }
        match(t, e, i, r) {
          return (function nj(n, t, e, i, r) {
            return n.some((o) => o(t, e, i, r));
          })(this.ast.matchers, t, e, i, r);
        }
        buildStyles(t, e, i) {
          let r = this._stateStyles.get("*");
          return (
            void 0 !== t && (r = this._stateStyles.get(t?.toString()) || r),
            r ? r.buildStyles(e, i) : new Map()
          );
        }
        build(t, e, i, r, o, s, a, l, c, u) {
          const d = [],
            h = (this.ast.options && this.ast.options.params) || Wp,
            p = this.buildStyles(i, (a && a.params) || Wp, d),
            m = (l && l.params) || Wp,
            y = this.buildStyles(r, m, d),
            v = new Set(),
            w = new Map(),
            b = new Map(),
            S = "void" === r,
            U = { params: ij(m, h), delay: this.ast.options?.delay },
            ae = u ? [] : $p(t, e, this.ast.animation, o, s, p, y, U, c, d);
          let Fe = 0;
          if (
            (ae.forEach((Xt) => {
              Fe = Math.max(Xt.duration + Xt.delay, Fe);
            }),
            d.length)
          )
            return NE(e, this._triggerName, i, r, S, p, y, [], [], w, b, Fe, d);
          ae.forEach((Xt) => {
            const Jt = Xt.element,
              $o = Kt(w, Jt, new Set());
            Xt.preStyleProps.forEach((Rn) => $o.add(Rn));
            const bi = Kt(b, Jt, new Set());
            Xt.postStyleProps.forEach((Rn) => bi.add(Rn)),
              Jt !== e && v.add(Jt);
          });
          const Qt = Nc(v.values());
          return NE(e, this._triggerName, i, r, S, p, y, ae, Qt, w, b, Fe);
        }
      }
      function ij(n, t) {
        const e = sa(t);
        for (const i in n) n.hasOwnProperty(i) && null != n[i] && (e[i] = n[i]);
        return e;
      }
      class rj {
        constructor(t, e, i) {
          (this.styles = t), (this.defaultParams = e), (this.normalizer = i);
        }
        buildStyles(t, e) {
          const i = new Map(),
            r = sa(this.defaultParams);
          return (
            Object.keys(t).forEach((o) => {
              const s = t[o];
              null !== s && (r[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = Pc(s, r, e));
                  const l = this.normalizer.normalizePropertyName(a, e);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, e)),
                    i.set(l, s);
                });
            }),
            i
          );
        }
      }
      class sj {
        constructor(t, e, i) {
          (this.name = t),
            (this.ast = e),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = new Map()),
            e.states.forEach((r) => {
              this.states.set(
                r.name,
                new rj(r.style, (r.options && r.options.params) || {}, i)
              );
            }),
            VE(this.states, "true", "1"),
            VE(this.states, "false", "0"),
            e.transitions.forEach((r) => {
              this.transitionFactories.push(new LE(t, r, this.states));
            }),
            (this.fallbackTransition = (function aj(n, t, e) {
              return new LE(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, i, r) {
          return (
            this.transitionFactories.find((s) => s.match(t, e, i, r)) || null
          );
        }
        matchStyles(t, e, i) {
          return this.fallbackTransition.buildStyles(t, e, i);
        }
      }
      function VE(n, t, e) {
        n.has(t)
          ? n.has(e) || n.set(e, n.get(t))
          : n.has(e) && n.set(t, n.get(e));
      }
      const lj = new Uc();
      class cj {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, e) {
          const i = [],
            o = jp(this._driver, e, i, []);
          if (i.length)
            throw (function c2(n) {
              return new C(3503, !1);
            })();
          this._animations.set(t, o);
        }
        _buildPlayer(t, e, i) {
          const r = t.element,
            o = gE(0, this._normalizer, 0, t.keyframes, e, i);
          return this._driver.animate(
            r,
            o,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, i = {}) {
          const r = [],
            o = this._animations.get(t);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = $p(
                  this._driver,
                  e,
                  o,
                  Pp,
                  Rc,
                  new Map(),
                  new Map(),
                  i,
                  lj,
                  r
                )),
                s.forEach((u) => {
                  const d = Kt(a, u.element, new Map());
                  u.postStyleProps.forEach((h) => d.set(h, null));
                }))
              : (r.push(
                  (function u2() {
                    return new C(3300, !1);
                  })()
                ),
                (s = [])),
            r.length)
          )
            throw (function d2(n) {
              return new C(3504, !1);
            })();
          a.forEach((u, d) => {
            u.forEach((h, f) => {
              u.set(f, this._driver.computeStyle(d, f, _i));
            });
          });
          const c = Pi(
            s.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, new Map(), d);
            })
          );
          return (
            this._playersById.set(t, c),
            c.onDestroy(() => this.destroy(t)),
            this.players.push(c),
            c
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), this._playersById.delete(t);
          const i = this.players.indexOf(e);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(t) {
          const e = this._playersById.get(t);
          if (!e)
            throw (function h2(n) {
              return new C(3301, !1);
            })();
          return e;
        }
        listen(t, e, i, r) {
          const o = Rp(e, "", "", "");
          return Ip(this._getPlayer(t), i, o, r), () => {};
        }
        command(t, e, i, r) {
          if ("register" == i) return void this.register(t, r[0]);
          if ("create" == i) return void this.create(t, e, r[0] || {});
          const o = this._getPlayer(t);
          switch (i) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const BE = "ng-animate-queued",
        qp = "ng-animate-disabled",
        pj = [],
        jE = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        mj = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        fn = "__ng_removed";
      class Kp {
        constructor(t, e = "") {
          this.namespaceId = e;
          const i = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function vj(n) {
              return n ?? null;
            })(i ? t.value : t)),
            i)
          ) {
            const o = sa(t);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const i = this.options.params;
            Object.keys(e).forEach((r) => {
              null == i[r] && (i[r] = e[r]);
            });
          }
        }
      }
      const la = "void",
        Yp = new Kp(la);
      class gj {
        constructor(t, e, i) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = i),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            pn(e, this._hostClassName);
        }
        listen(t, e, i, r) {
          if (!this._triggers.has(e))
            throw (function f2(n, t) {
              return new C(3302, !1);
            })();
          if (null == i || 0 == i.length)
            throw (function p2(n) {
              return new C(3303, !1);
            })();
          if (
            !(function bj(n) {
              return "start" == n || "done" == n;
            })(i)
          )
            throw (function m2(n, t) {
              return new C(3400, !1);
            })();
          const o = Kt(this._elementListeners, t, []),
            s = { name: e, phase: i, callback: r };
          o.push(s);
          const a = Kt(this._engine.statesByElement, t, new Map());
          return (
            a.has(e) || (pn(t, kc), pn(t, kc + "-" + e), a.set(e, Yp)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(e) || a.delete(e);
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers.has(t) && (this._triggers.set(t, e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers.get(t);
          if (!e)
            throw (function g2(n) {
              return new C(3401, !1);
            })();
          return e;
        }
        trigger(t, e, i, r = !0) {
          const o = this._getTrigger(e),
            s = new Zp(this.id, e, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (pn(t, kc),
            pn(t, kc + "-" + e),
            this._engine.statesByElement.set(t, (a = new Map())));
          let l = a.get(e);
          const c = new Kp(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            a.set(e, c),
            l || (l = Yp),
            c.value !== la && l.value === c.value)
          ) {
            if (
              !(function wj(n, t) {
                const e = Object.keys(n),
                  i = Object.keys(t);
                if (e.length != i.length) return !1;
                for (let r = 0; r < e.length; r++) {
                  const o = e[r];
                  if (!t.hasOwnProperty(o) || n[o] !== t[o]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const m = [],
                y = o.matchStyles(l.value, l.params, m),
                v = o.matchStyles(c.value, c.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    vr(t, y), Kn(t, v);
                  });
            }
            return;
          }
          const h = Kt(this._engine.playersByElement, t, []);
          h.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == e &&
              m.queued &&
              m.destroy();
          });
          let f = o.matchTransition(l.value, c.value, t, c.params),
            p = !1;
          if (!f) {
            if (!r) return;
            (f = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: f,
              fromState: l,
              toState: c,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (pn(t, BE),
              s.onStart(() => {
                Oo(t, BE);
              })),
            s.onDone(() => {
              let m = this.players.indexOf(s);
              m >= 0 && this.players.splice(m, 1);
              const y = this._engine.playersByElement.get(t);
              if (y) {
                let v = y.indexOf(s);
                v >= 0 && y.splice(v, 1);
              }
            }),
            this.players.push(s),
            h.push(s),
            s
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((e) => e.delete(t)),
            this._elementListeners.forEach((e, i) => {
              this._elementListeners.set(
                i,
                e.filter((r) => r.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const i = this._engine.driver.query(t, Fc, !0);
          i.forEach((r) => {
            if (r[fn]) return;
            const o = this._engine.fetchNamespacesByElement(r);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(r, e, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(t, e, i, r) {
          const o = this._engine.statesByElement.get(t),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, c) => {
                if ((s.set(c, l.value), this._triggers.has(c))) {
                  const u = this.trigger(t, c, la, r);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e, s),
                i && Pi(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            i = this._engine.statesByElement.get(t);
          if (e && i) {
            const r = new Set();
            e.forEach((o) => {
              const s = o.name;
              if (r.has(s)) return;
              r.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                c = i.get(s) || Yp,
                u = new Kp(la),
                d = new Zp(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: l,
                  fromState: c,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const i = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const o = i.players.length ? i.playersByQueriedElement.get(t) : [];
            if (o && o.length) r = !0;
            else {
              let s = t;
              for (; (s = s.parentNode); )
                if (i.statesByElement.get(s)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), r))
            i.markElementAsRemoved(this.id, t, !1, e);
          else {
            const o = t[fn];
            (!o || o === jE) &&
              (i.afterFlush(() => this.clearElementCache(t)),
              i.destroyInnerAnimations(t),
              i._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          pn(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const o = i.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = Rp(
                      o,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = t), Ip(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : e.push(i);
            }),
            (this._queue = []),
            e.sort((i, r) => {
              const o = i.transition.ast.depCount,
                s = r.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((i) => i.element === t) || e),
            e
          );
        }
      }
      class _j {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, o) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((i) => {
                i.queued && t.push(i);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const i = new gj(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(i, e)
              : (this.newHostElements.set(e, i), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = i)
          );
        }
        _balanceNamespaceList(t, e) {
          const i = this._namespaceList,
            r = this.namespacesByHostElement;
          if (i.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(e);
            for (; a; ) {
              const l = r.get(a);
              if (l) {
                const c = i.indexOf(l);
                i.splice(c + 1, 0, t), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || i.unshift(t);
          } else i.push(t);
          return r.set(e, t), t;
        }
        register(t, e) {
          let i = this._namespaceLookup[t];
          return i || (i = this.createNamespace(t, e)), i;
        }
        registerTrigger(t, e, i) {
          let r = this._namespaceLookup[t];
          r && r.register(e, i) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const i = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[t];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            i = this.statesByElement.get(t);
          if (i)
            for (let r of i.values())
              if (r.namespaceId) {
                const o = this._fetchNamespace(r.namespaceId);
                o && e.add(o);
              }
          return e;
        }
        trigger(t, e, i, r) {
          if (Gc(e)) {
            const o = this._fetchNamespace(t);
            if (o) return o.trigger(e, i, r), !0;
          }
          return !1;
        }
        insertNode(t, e, i, r) {
          if (!Gc(e)) return;
          const o = e[fn];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(e);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, i);
          }
          r && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), pn(t, qp))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), Oo(t, qp));
        }
        removeNode(t, e, i, r) {
          if (Gc(e)) {
            const o = t ? this._fetchNamespace(t) : null;
            if (
              (o ? o.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r),
              i)
            ) {
              const s = this.namespacesByHostElement.get(e);
              s && s.id !== t && s.removeNode(e, r);
            }
          } else this._onRemovalComplete(e, r);
        }
        markElementAsRemoved(t, e, i, r, o) {
          this.collectedLeaveElements.push(e),
            (e[fn] = {
              namespaceId: t,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(t, e, i, r, o) {
          return Gc(e) ? this._fetchNamespace(t).listen(e, i, r, o) : () => {};
        }
        _buildInstruction(t, e, i, r, o) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            i,
            r,
            t.fromState.options,
            t.toState.options,
            e,
            o
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, Fc, !0);
          e.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, Np, !0)),
              e.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Pi(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t[fn];
          if (e && e.setForRemoval) {
            if (((t[fn] = jE), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const i = this._fetchNamespace(e.namespaceId);
              i && i.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          t.classList?.contains(qp) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((i) => {
              this.markElementAsDisabled(i, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              pn(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              e = this._flushAnimations(i, t);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((i) => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? Pi(e).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(t) {
          throw (function _2(n) {
            return new C(3402, !1);
          })();
        }
        _flushAnimations(t, e) {
          const i = new Uc(),
            r = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            u = new Set();
          this.disabledNodes.forEach((k) => {
            u.add(k);
            const N = this.driver.query(k, ".ng-animate-queued", !0);
            for (let j = 0; j < N.length; j++) u.add(N[j]);
          });
          const d = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            f = $E(h, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          f.forEach((k, N) => {
            const j = Pp + m++;
            p.set(N, j), k.forEach((de) => pn(de, j));
          });
          const y = [],
            v = new Set(),
            w = new Set();
          for (let k = 0; k < this.collectedLeaveElements.length; k++) {
            const N = this.collectedLeaveElements[k],
              j = N[fn];
            j &&
              j.setForRemoval &&
              (y.push(N),
              v.add(N),
              j.hasAnimation
                ? this.driver
                    .query(N, ".ng-star-inserted", !0)
                    .forEach((de) => v.add(de))
                : w.add(N));
          }
          const b = new Map(),
            S = $E(h, Array.from(v));
          S.forEach((k, N) => {
            const j = Rc + m++;
            b.set(N, j), k.forEach((de) => pn(de, j));
          }),
            t.push(() => {
              f.forEach((k, N) => {
                const j = p.get(N);
                k.forEach((de) => Oo(de, j));
              }),
                S.forEach((k, N) => {
                  const j = b.get(N);
                  k.forEach((de) => Oo(de, j));
                }),
                y.forEach((k) => {
                  this.processLeaveNode(k);
                });
            });
          const U = [],
            ae = [];
          for (let k = this._namespaceList.length - 1; k >= 0; k--)
            this._namespaceList[k].drainQueuedTransitions(e).forEach((j) => {
              const de = j.player,
                lt = j.element;
              if ((U.push(de), this.collectedEnterElements.length)) {
                const vt = lt[fn];
                if (vt && vt.setForMove) {
                  if (
                    vt.previousTriggersValues &&
                    vt.previousTriggersValues.has(j.triggerName)
                  ) {
                    const kr = vt.previousTriggersValues.get(j.triggerName),
                      mn = this.statesByElement.get(j.element);
                    if (mn && mn.has(j.triggerName)) {
                      const Tu = mn.get(j.triggerName);
                      (Tu.value = kr), mn.set(j.triggerName, Tu);
                    }
                  }
                  return void de.destroy();
                }
              }
              const Zn = !d || !this.driver.containsElement(d, lt),
                en = b.get(lt),
                $i = p.get(lt),
                Oe = this._buildInstruction(j, i, $i, en, Zn);
              if (Oe.errors && Oe.errors.length) return void ae.push(Oe);
              if (Zn)
                return (
                  de.onStart(() => vr(lt, Oe.fromStyles)),
                  de.onDestroy(() => Kn(lt, Oe.toStyles)),
                  void r.push(de)
                );
              if (j.isFallbackTransition)
                return (
                  de.onStart(() => vr(lt, Oe.fromStyles)),
                  de.onDestroy(() => Kn(lt, Oe.toStyles)),
                  void r.push(de)
                );
              const _S = [];
              Oe.timelines.forEach((vt) => {
                (vt.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(vt.element) || _S.push(vt);
              }),
                (Oe.timelines = _S),
                i.append(lt, Oe.timelines),
                s.push({ instruction: Oe, player: de, element: lt }),
                Oe.queriedElements.forEach((vt) => Kt(a, vt, []).push(de)),
                Oe.preStyleProps.forEach((vt, kr) => {
                  if (vt.size) {
                    let mn = l.get(kr);
                    mn || l.set(kr, (mn = new Set())),
                      vt.forEach((Tu, jm) => mn.add(jm));
                  }
                }),
                Oe.postStyleProps.forEach((vt, kr) => {
                  let mn = c.get(kr);
                  mn || c.set(kr, (mn = new Set())),
                    vt.forEach((Tu, jm) => mn.add(jm));
                });
            });
          if (ae.length) {
            const k = [];
            ae.forEach((N) => {
              k.push(
                (function y2(n, t) {
                  return new C(3505, !1);
                })()
              );
            }),
              U.forEach((N) => N.destroy()),
              this.reportError(k);
          }
          const Fe = new Map(),
            Qt = new Map();
          s.forEach((k) => {
            const N = k.element;
            i.has(N) &&
              (Qt.set(N, N),
              this._beforeAnimationBuild(
                k.player.namespaceId,
                k.instruction,
                Fe
              ));
          }),
            r.forEach((k) => {
              const N = k.element;
              this._getPreviousPlayers(
                N,
                !1,
                k.namespaceId,
                k.triggerName,
                null
              ).forEach((de) => {
                Kt(Fe, N, []).push(de), de.destroy();
              });
            });
          const Xt = y.filter((k) => GE(k, l, c)),
            Jt = new Map();
          UE(Jt, this.driver, w, c, _i).forEach((k) => {
            GE(k, l, c) && Xt.push(k);
          });
          const bi = new Map();
          f.forEach((k, N) => {
            UE(bi, this.driver, new Set(k), l, "!");
          }),
            Xt.forEach((k) => {
              const N = Jt.get(k),
                j = bi.get(k);
              Jt.set(
                k,
                new Map([
                  ...Array.from(N?.entries() ?? []),
                  ...Array.from(j?.entries() ?? []),
                ])
              );
            });
          const Rn = [],
            zo = [],
            Go = {};
          s.forEach((k) => {
            const { element: N, player: j, instruction: de } = k;
            if (i.has(N)) {
              if (u.has(N))
                return (
                  j.onDestroy(() => Kn(N, de.toStyles)),
                  (j.disabled = !0),
                  j.overrideTotalTime(de.totalTime),
                  void r.push(j)
                );
              let lt = Go;
              if (Qt.size > 1) {
                let en = N;
                const $i = [];
                for (; (en = en.parentNode); ) {
                  const Oe = Qt.get(en);
                  if (Oe) {
                    lt = Oe;
                    break;
                  }
                  $i.push(en);
                }
                $i.forEach((Oe) => Qt.set(Oe, lt));
              }
              const Zn = this._buildAnimation(j.namespaceId, de, Fe, o, bi, Jt);
              if ((j.setRealPlayer(Zn), lt === Go)) Rn.push(j);
              else {
                const en = this.playersByElement.get(lt);
                en && en.length && (j.parentPlayer = Pi(en)), r.push(j);
              }
            } else
              vr(N, de.fromStyles),
                j.onDestroy(() => Kn(N, de.toStyles)),
                zo.push(j),
                u.has(N) && r.push(j);
          }),
            zo.forEach((k) => {
              const N = o.get(k.element);
              if (N && N.length) {
                const j = Pi(N);
                k.setRealPlayer(j);
              }
            }),
            r.forEach((k) => {
              k.parentPlayer ? k.syncPlayerEvents(k.parentPlayer) : k.destroy();
            });
          for (let k = 0; k < y.length; k++) {
            const N = y[k],
              j = N[fn];
            if ((Oo(N, Rc), j && j.hasAnimation)) continue;
            let de = [];
            if (a.size) {
              let Zn = a.get(N);
              Zn && Zn.length && de.push(...Zn);
              let en = this.driver.query(N, Np, !0);
              for (let $i = 0; $i < en.length; $i++) {
                let Oe = a.get(en[$i]);
                Oe && Oe.length && de.push(...Oe);
              }
            }
            const lt = de.filter((Zn) => !Zn.destroyed);
            lt.length ? Cj(this, N, lt) : this.processLeaveNode(N);
          }
          return (
            (y.length = 0),
            Rn.forEach((k) => {
              this.players.push(k),
                k.onDone(() => {
                  k.destroy();
                  const N = this.players.indexOf(k);
                  this.players.splice(N, 1);
                }),
                k.play();
            }),
            Rn
          );
        }
        elementContainsData(t, e) {
          let i = !1;
          const r = e[fn];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(e) && (i = !0),
            this.playersByQueriedElement.has(e) && (i = !0),
            this.statesByElement.has(e) && (i = !0),
            this._fetchNamespace(t).elementContainsData(e) || i
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, i, r, o) {
          let s = [];
          if (e) {
            const a = this.playersByQueriedElement.get(t);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !o || o == la;
              a.forEach((c) => {
                c.queued || (!l && c.triggerName != r) || s.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (s = s.filter(
                (a) => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(t, e, i) {
          const o = e.element,
            s = e.isRemovalTransition ? void 0 : t,
            a = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const l of e.timelines) {
            const c = l.element,
              u = c !== o,
              d = Kt(i, c, []);
            this._getPreviousPlayers(c, u, s, a, e.toState).forEach((f) => {
              const p = f.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), f.destroy(), d.push(f);
            });
          }
          vr(o, e.fromStyles);
        }
        _buildAnimation(t, e, i, r, o, s) {
          const a = e.triggerName,
            l = e.element,
            c = [],
            u = new Set(),
            d = new Set(),
            h = e.timelines.map((p) => {
              const m = p.element;
              u.add(m);
              const y = m[fn];
              if (y && y.removedBeforeQueried)
                return new oa(p.duration, p.delay);
              const v = m !== l,
                w = (function Dj(n) {
                  const t = [];
                  return zE(n, t), t;
                })((i.get(m) || pj).map((Fe) => Fe.getRealPlayer())).filter(
                  (Fe) => !!Fe.element && Fe.element === m
                ),
                b = o.get(m),
                S = s.get(m),
                U = gE(0, this._normalizer, 0, p.keyframes, b, S),
                ae = this._buildPlayer(p, U, w);
              if ((p.subTimeline && r && d.add(m), v)) {
                const Fe = new Zp(t, a, m);
                Fe.setRealPlayer(ae), c.push(Fe);
              }
              return ae;
            });
          c.forEach((p) => {
            Kt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function yj(n, t, e) {
                  let i = n.get(t);
                  if (i) {
                    if (i.length) {
                      const r = i.indexOf(e);
                      i.splice(r, 1);
                    }
                    0 == i.length && n.delete(t);
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => pn(p, ME));
          const f = Pi(h);
          return (
            f.onDestroy(() => {
              u.forEach((p) => Oo(p, ME)), Kn(l, e.toStyles);
            }),
            d.forEach((p) => {
              Kt(r, p, []).push(f);
            }),
            f
          );
        }
        _buildPlayer(t, e, i) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                i
              )
            : new oa(t.duration, t.delay);
        }
      }
      class Zp {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = i),
            (this._player = new oa()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((e, i) => {
              e.forEach((r) => Ip(t, i, void 0, r));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Kt(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Gc(n) {
        return n && 1 === n.nodeType;
      }
      function HE(n, t) {
        const e = n.style.display;
        return (n.style.display = t ?? "none"), e;
      }
      function UE(n, t, e, i, r) {
        const o = [];
        e.forEach((l) => o.push(HE(l)));
        const s = [];
        i.forEach((l, c) => {
          const u = new Map();
          l.forEach((d) => {
            const h = t.computeStyle(c, d, r);
            u.set(d, h), (!h || 0 == h.length) && ((c[fn] = mj), s.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return e.forEach((l) => HE(l, o[a++])), s;
      }
      function $E(n, t) {
        const e = new Map();
        if ((n.forEach((a) => e.set(a, [])), 0 == t.length)) return e;
        const r = new Set(t),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let l = o.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = e.has(c) ? c : r.has(c) ? 1 : s(c)), o.set(a, l), l;
        }
        return (
          t.forEach((a) => {
            const l = s(a);
            1 !== l && e.get(l).push(a);
          }),
          e
        );
      }
      function pn(n, t) {
        n.classList?.add(t);
      }
      function Oo(n, t) {
        n.classList?.remove(t);
      }
      function Cj(n, t, e) {
        Pi(e).onDone(() => n.processLeaveNode(t));
      }
      function zE(n, t) {
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          i instanceof pE ? zE(i.players, t) : t.push(i);
        }
      }
      function GE(n, t, e) {
        const i = e.get(n);
        if (!i) return !1;
        let r = t.get(n);
        return r ? i.forEach((o) => r.add(o)) : t.set(n, i), e.delete(n), !0;
      }
      class Wc {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, o) => {}),
            (this._transitionEngine = new _j(t, e, i)),
            (this._timelineEngine = new cj(t, e, i)),
            (this._transitionEngine.onRemovalComplete = (r, o) =>
              this.onRemovalComplete(r, o));
        }
        registerTrigger(t, e, i, r, o) {
          const s = t + "-" + r;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              u = jp(this._driver, o, l, []);
            if (l.length)
              throw (function a2(n, t) {
                return new C(3404, !1);
              })();
            (a = (function oj(n, t, e) {
              return new sj(n, t, e);
            })(r, u, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(e, r, a);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, i, r) {
          this._transitionEngine.insertNode(t, e, i, r);
        }
        onRemove(t, e, i, r) {
          this._transitionEngine.removeNode(t, e, r || !1, i);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, i, r) {
          if ("@" == i.charAt(0)) {
            const [o, s] = _E(i);
            this._timelineEngine.command(o, e, s, r);
          } else this._transitionEngine.trigger(t, e, i, r);
        }
        listen(t, e, i, r, o) {
          if ("@" == i.charAt(0)) {
            const [s, a] = _E(i);
            return this._timelineEngine.listen(s, e, a, o);
          }
          return this._transitionEngine.listen(t, e, i, r, o);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let Mj = (() => {
        class n {
          constructor(e, i, r) {
            (this._element = e),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let o = n.initialStylesByElement.get(e);
            o || n.initialStylesByElement.set(e, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Kn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Kn(this._element, this._initialStyles),
                this._endStyles &&
                  (Kn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (vr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (vr(this._element, this._endStyles),
                  (this._endStyles = null)),
                Kn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function Qp(n) {
        let t = null;
        return (
          n.forEach((e, i) => {
            (function Sj(n) {
              return "display" === n || "position" === n;
            })(i) && ((t = t || new Map()), t.set(i, e));
          }),
          t
        );
      }
      class WE {
        constructor(t, e, i, r) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const e = [];
          return (
            t.forEach((i) => {
              e.push(Object.fromEntries(i));
            }),
            e
          );
        }
        _triggerWebAnimation(t, e, i) {
          return t.animate(this._convertKeyframesToObject(e), i);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((i, r) => {
              "offset" !== r &&
                t.set(r, this._finished ? i : RE(this.element, r));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" === t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class Aj {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return CE(t, e);
        }
        getParentElement(t) {
          return Fp(t);
        }
        query(t, e, i) {
          return DE(t, e, i);
        }
        computeStyle(t, e, i) {
          return window.getComputedStyle(t)[e];
        }
        animate(t, e, i, r, o, s = []) {
          const l = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          o && (l.easing = o);
          const c = new Map(),
            u = s.filter((f) => f instanceof WE);
          (function R2(n, t) {
            return 0 === n || 0 === t;
          })(i, r) &&
            u.forEach((f) => {
              f.currentSnapshot.forEach((p, m) => c.set(m, p));
            });
          let d = (function A2(n) {
            return n.length
              ? n[0] instanceof Map
                ? n
                : n.map((t) => SE(t))
              : [];
          })(e).map((f) => Li(f));
          d = (function k2(n, t, e) {
            if (e.size && t.length) {
              let i = t[0],
                r = [];
              if (
                (e.forEach((o, s) => {
                  i.has(s) || r.push(s), i.set(s, o);
                }),
                r.length)
              )
                for (let o = 1; o < t.length; o++) {
                  let s = t[o];
                  r.forEach((a) => s.set(a, RE(n, a)));
                }
            }
            return t;
          })(t, d, c);
          const h = (function Ej(n, t) {
            let e = null,
              i = null;
            return (
              Array.isArray(t) && t.length
                ? ((e = Qp(t[0])), t.length > 1 && (i = Qp(t[t.length - 1])))
                : t instanceof Map && (e = Qp(t)),
              e || i ? new Mj(n, e, i) : null
            );
          })(t, d);
          return new WE(t, d, l, h);
        }
      }
      let Tj = (() => {
        class n extends lE {
          constructor(e, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(i.body, {
                id: "0",
                encapsulation: _n.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(e) ? uE(e) : e;
            return (
              qE(this._renderer, null, i, "register", [r]),
              new Ij(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(gs), _(K));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Ij extends class VB {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new xj(this._id, t, e || {}, this._renderer);
        }
      }
      class xj {
        constructor(t, e, i, r) {
          (this.id = t),
            (this.element = e),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return qE(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function qE(n, t, e, i, r) {
        return n.setProperty(t, `@@${e}:${i}`, r);
      }
      const KE = "@.disabled";
      let Rj = (() => {
        class n {
          constructor(e, i, r) {
            (this.delegate = e),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(e, i) {
            const o = this.delegate.createRenderer(e, i);
            if (!(e && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(o);
              return (
                u ||
                  ((u = new YE("", o, this.engine)),
                  this._rendererCache.set(o, u)),
                u
              );
            }
            const s = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, e);
            const l = (u) => {
              Array.isArray(u)
                ? u.forEach(l)
                : this.engine.registerTrigger(s, a, e, u.name, u);
            };
            return i.data.animation.forEach(l), new kj(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, i, r) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(gs), _(Wc), _(Q));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class YE {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (r) => e.destroyNode(r)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, i, r = !0) {
          this.delegate.insertBefore(t, e, i),
            this.engine.onInsert(this.namespaceId, e, t, r);
        }
        removeChild(t, e, i) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, i);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, i, r) {
          this.delegate.setAttribute(t, e, i, r);
        }
        removeAttribute(t, e, i) {
          this.delegate.removeAttribute(t, e, i);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, i, r) {
          this.delegate.setStyle(t, e, i, r);
        }
        removeStyle(t, e, i) {
          this.delegate.removeStyle(t, e, i);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0) && e == KE
            ? this.disableAnimations(t, !!i)
            : this.delegate.setProperty(t, e, i);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, i) {
          return this.delegate.listen(t, e, i);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class kj extends YE {
        constructor(t, e, i, r) {
          super(e, i, r), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0)
            ? "." == e.charAt(1) && e == KE
              ? this.disableAnimations(t, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, t, e.slice(1), i)
            : this.delegate.setProperty(t, e, i);
        }
        listen(t, e, i) {
          if ("@" == e.charAt(0)) {
            const r = (function Fj(n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(t);
            let o = e.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function Oj(n) {
                  const t = n.indexOf(".");
                  return [n.substring(0, t), n.slice(t + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, r, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(t, e, i);
        }
      }
      const ZE = [
          { provide: lE, useClass: Tj },
          {
            provide: Gp,
            useFactory: function Nj() {
              return new tj();
            },
          },
          {
            provide: Wc,
            useClass: (() => {
              class n extends Wc {
                constructor(e, i, r, o) {
                  super(e.body, i, r);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (n.ɵfac = function (e) {
                  return new (e || n)(_(K), _(Op), _(Gp), _(So));
                }),
                (n.ɵprov = M({ token: n, factory: n.ɵfac })),
                n
              );
            })(),
          },
          {
            provide: gs,
            useFactory: function Lj(n, t, e) {
              return new Rj(n, t, e);
            },
            deps: [oc, Wc, Q],
          },
        ],
        Xp = [
          { provide: Op, useFactory: () => new Aj() },
          { provide: Ii, useValue: "BrowserAnimations" },
          ...ZE,
        ],
        QE = [
          { provide: Op, useClass: wE },
          { provide: Ii, useValue: "NoopAnimations" },
          ...ZE,
        ];
      let Jp,
        Vj = (() => {
          class n {
            static withConfig(e) {
              return { ngModule: n, providers: e.disableAnimations ? QE : Xp };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ providers: Xp, imports: [FD] })),
            n
          );
        })();
      try {
        Jp = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        Jp = !1;
      }
      let Po,
        _t = (() => {
          class n {
            constructor(e) {
              (this._platformId = e),
                (this.isBrowser = this._platformId
                  ? (function o1(n) {
                      return n === mD;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Jp) &&
                  typeof CSS < "u" &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Ll));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      const XE = [
        "color",
        "button",
        "checkbox",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ];
      function JE() {
        if (Po) return Po;
        if ("object" != typeof document || !document)
          return (Po = new Set(XE)), Po;
        let n = document.createElement("input");
        return (
          (Po = new Set(
            XE.filter((t) => (n.setAttribute("type", t), n.type === t))
          )),
          Po
        );
      }
      let ca, Cr, em;
      function Kc(n) {
        return (function Bj() {
          if (null == ca && typeof window < "u")
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (ca = !0) })
              );
            } finally {
              ca = ca || !1;
            }
          return ca;
        })()
          ? n
          : !!n.capture;
      }
      function jj() {
        if (null == Cr) {
          if (
            "object" != typeof document ||
            !document ||
            "function" != typeof Element ||
            !Element
          )
            return (Cr = !1), Cr;
          if ("scrollBehavior" in document.documentElement.style) Cr = !0;
          else {
            const n = Element.prototype.scrollTo;
            Cr = !!n && !/\{\s*\[native code\]\s*\}/.test(n.toString());
          }
        }
        return Cr;
      }
      function tm() {
        let n =
          typeof document < "u" && document ? document.activeElement : null;
        for (; n && n.shadowRoot; ) {
          const t = n.shadowRoot.activeElement;
          if (t === n) break;
          n = t;
        }
        return n;
      }
      function Dr(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function nm() {
        return (
          (typeof __karma__ < "u" && !!__karma__) ||
          (typeof jasmine < "u" && !!jasmine) ||
          (typeof jest < "u" && !!jest) ||
          (typeof Mocha < "u" && !!Mocha)
        );
      }
      function tM(n, ...t) {
        return t.length
          ? t.some((e) => n[e])
          : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
      }
      function nM(n) {
        return It((t, e) => n <= e);
      }
      function Yj(n, t) {
        return n === t;
      }
      function wr(n) {
        return Pe((t, e) => {
          Rt(n).subscribe(Te(e, () => e.complete(), Iu)),
            !e.closed && t.subscribe(e);
        });
      }
      function Vi(n) {
        return null != n && "false" != `${n}`;
      }
      function Zc(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Ke(n) {
        return null == n ? "" : "string" == typeof n ? n : `${n}px`;
      }
      function yi(n) {
        return n instanceof ve ? n.nativeElement : n;
      }
      class Xj extends ct {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      const Qc = {
        setInterval(n, t, ...e) {
          const { delegate: i } = Qc;
          return i?.setInterval
            ? i.setInterval(n, t, ...e)
            : setInterval(n, t, ...e);
        },
        clearInterval(n) {
          const { delegate: t } = Qc;
          return (t?.clearInterval || clearInterval)(n);
        },
        delegate: void 0,
      };
      class im extends Xj {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const i = this.id,
            r = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(r, i, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, i = 0) {
          return Qc.setInterval(t.flush.bind(t, this), i);
        }
        recycleAsyncId(t, e, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return e;
          Qc.clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(t, e);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let r,
            i = !1;
          try {
            this.work(t);
          } catch (o) {
            (i = !0),
              (r = o || new Error("Scheduled action threw falsy error"));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: e } = this,
              { actions: i } = e;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              Fr(i, this),
              null != t && (this.id = this.recycleAsyncId(e, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const iM = { now: () => (iM.delegate || Date).now(), delegate: void 0 };
      class ua {
        constructor(t, e = ua.now) {
          (this.schedulerActionCtor = t), (this.now = e);
        }
        schedule(t, e = 0, i) {
          return new this.schedulerActionCtor(this, t).schedule(i, e);
        }
      }
      ua.now = iM.now;
      class rm extends ua {
        constructor(t, e = ua.now) {
          super(t, e),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0);
        }
        flush(t) {
          const { actions: e } = this;
          if (this._active) return void e.push(t);
          let i;
          this._active = !0;
          do {
            if ((i = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this._active = !1), i)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw i;
          }
        }
      }
      const om = new rm(im),
        Jj = om;
      function rM(n, t = om) {
        return Pe((e, i) => {
          let r = null,
            o = null,
            s = null;
          const a = () => {
            if (r) {
              r.unsubscribe(), (r = null);
              const c = o;
              (o = null), i.next(c);
            }
          };
          function l() {
            const c = s + n,
              u = t.now();
            if (u < c) return (r = this.schedule(void 0, c - u)), void i.add(r);
            a();
          }
          e.subscribe(
            Te(
              i,
              (c) => {
                (o = c), (s = t.now()), r || ((r = t.schedule(l, n)), i.add(r));
              },
              () => {
                a(), i.complete();
              },
              void 0,
              () => {
                o = r = null;
              }
            )
          );
        });
      }
      let oM = (() => {
          class n {
            create(e) {
              return typeof MutationObserver > "u"
                ? null
                : new MutationObserver(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        eH = (() => {
          class n {
            constructor(e) {
              (this._mutationObserverFactory = e),
                (this._observedElements = new Map());
            }
            ngOnDestroy() {
              this._observedElements.forEach((e, i) =>
                this._cleanupObserver(i)
              );
            }
            observe(e) {
              const i = yi(e);
              return new De((r) => {
                const s = this._observeElement(i).subscribe(r);
                return () => {
                  s.unsubscribe(), this._unobserveElement(i);
                };
              });
            }
            _observeElement(e) {
              if (this._observedElements.has(e))
                this._observedElements.get(e).count++;
              else {
                const i = new te(),
                  r = this._mutationObserverFactory.create((o) => i.next(o));
                r &&
                  r.observe(e, {
                    characterData: !0,
                    childList: !0,
                    subtree: !0,
                  }),
                  this._observedElements.set(e, {
                    observer: r,
                    stream: i,
                    count: 1,
                  });
              }
              return this._observedElements.get(e).stream;
            }
            _unobserveElement(e) {
              this._observedElements.has(e) &&
                (this._observedElements.get(e).count--,
                this._observedElements.get(e).count ||
                  this._cleanupObserver(e));
            }
            _cleanupObserver(e) {
              if (this._observedElements.has(e)) {
                const { observer: i, stream: r } =
                  this._observedElements.get(e);
                i && i.disconnect(),
                  r.complete(),
                  this._observedElements.delete(e);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(oM));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        tH = (() => {
          class n {
            constructor(e, i, r) {
              (this._contentObserver = e),
                (this._elementRef = i),
                (this._ngZone = r),
                (this.event = new Se()),
                (this._disabled = !1),
                (this._currentSubscription = null);
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              (this._disabled = Vi(e)),
                this._disabled ? this._unsubscribe() : this._subscribe();
            }
            get debounce() {
              return this._debounce;
            }
            set debounce(e) {
              (this._debounce = (function Zj(n, t = 0) {
                return (function Qj(n) {
                  return !isNaN(parseFloat(n)) && !isNaN(Number(n));
                })(n)
                  ? Number(n)
                  : t;
              })(e)),
                this._subscribe();
            }
            ngAfterContentInit() {
              !this._currentSubscription && !this.disabled && this._subscribe();
            }
            ngOnDestroy() {
              this._unsubscribe();
            }
            _subscribe() {
              this._unsubscribe();
              const e = this._contentObserver.observe(this._elementRef);
              this._ngZone.runOutsideAngular(() => {
                this._currentSubscription = (
                  this.debounce ? e.pipe(rM(this.debounce)) : e
                ).subscribe(this.event);
              });
            }
            _unsubscribe() {
              this._currentSubscription?.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(eH), g(ve), g(Q));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["", "cdkObserveContent", ""]],
              inputs: {
                disabled: ["cdkObserveContentDisabled", "disabled"],
                debounce: "debounce",
              },
              outputs: { event: "cdkObserveContent" },
              exportAs: ["cdkObserveContent"],
            })),
            n
          );
        })(),
        sM = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ providers: [oM] })),
            n
          );
        })();
      const aM = new Set();
      let No,
        nH = (() => {
          class n {
            constructor(e) {
              (this._platform = e),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : rH);
            }
            matchMedia(e) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function iH(n) {
                    if (!aM.has(n))
                      try {
                        No ||
                          ((No = document.createElement("style")),
                          No.setAttribute("type", "text/css"),
                          document.head.appendChild(No)),
                          No.sheet &&
                            (No.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                            aM.add(n));
                      } catch (t) {
                        console.error(t);
                      }
                  })(e),
                this._matchMedia(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(_t));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function rH(n) {
        return {
          matches: "all" === n || "" === n,
          media: n,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let sm = (() => {
        class n {
          constructor(e, i) {
            (this._mediaMatcher = e),
              (this._zone = i),
              (this._queries = new Map()),
              (this._destroySubject = new te());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(e) {
            return lM(Zc(e)).some((r) => this._registerQuery(r).mql.matches);
          }
          observe(e) {
            let o = zf(lM(Zc(e)).map((s) => this._registerQuery(s).observable));
            return (
              (o = sc(o.pipe(Lt(1)), o.pipe(nM(1), rM(0)))),
              o.pipe(
                P((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: l, query: c }) => {
                      (a.matches = a.matches || l), (a.breakpoints[c] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(e) {
            if (this._queries.has(e)) return this._queries.get(e);
            const i = this._mediaMatcher.matchMedia(e),
              o = {
                observable: new De((s) => {
                  const a = (l) => this._zone.run(() => s.next(l));
                  return (
                    i.addListener(a),
                    () => {
                      i.removeListener(a);
                    }
                  );
                }).pipe(
                  fr(i),
                  P(({ matches: s }) => ({ query: e, matches: s })),
                  wr(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(e, o), o;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(nH), _(Q));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function lM(n) {
        return n
          .map((t) => t.split(","))
          .reduce((t, e) => t.concat(e))
          .map((t) => t.trim());
      }
      let Xc = (() => {
        class n {
          constructor(e) {
            this._platform = e;
          }
          isDisabled(e) {
            return e.hasAttribute("disabled");
          }
          isVisible(e) {
            return (
              (function cH(n) {
                return !!(
                  n.offsetWidth ||
                  n.offsetHeight ||
                  ("function" == typeof n.getClientRects &&
                    n.getClientRects().length)
                );
              })(e) && "visible" === getComputedStyle(e).visibility
            );
          }
          isTabbable(e) {
            if (!this._platform.isBrowser) return !1;
            const i = (function lH(n) {
              try {
                return n.frameElement;
              } catch {
                return null;
              }
            })(
              (function _H(n) {
                return (
                  (n.ownerDocument && n.ownerDocument.defaultView) || window
                );
              })(e)
            );
            if (i && (-1 === hM(i) || !this.isVisible(i))) return !1;
            let r = e.nodeName.toLowerCase(),
              o = hM(e);
            return e.hasAttribute("contenteditable")
              ? -1 !== o
              : !(
                  "iframe" === r ||
                  "object" === r ||
                  (this._platform.WEBKIT &&
                    this._platform.IOS &&
                    !(function mH(n) {
                      let t = n.nodeName.toLowerCase(),
                        e = "input" === t && n.type;
                      return (
                        "text" === e ||
                        "password" === e ||
                        "select" === t ||
                        "textarea" === t
                      );
                    })(e))
                ) &&
                  ("audio" === r
                    ? !!e.hasAttribute("controls") && -1 !== o
                    : "video" === r
                    ? -1 !== o &&
                      (null !== o ||
                        this._platform.FIREFOX ||
                        e.hasAttribute("controls"))
                    : e.tabIndex >= 0);
          }
          isFocusable(e, i) {
            return (
              (function gH(n) {
                return (
                  !(function dH(n) {
                    return (
                      (function fH(n) {
                        return "input" == n.nodeName.toLowerCase();
                      })(n) && "hidden" == n.type
                    );
                  })(n) &&
                  ((function uH(n) {
                    let t = n.nodeName.toLowerCase();
                    return (
                      "input" === t ||
                      "select" === t ||
                      "button" === t ||
                      "textarea" === t
                    );
                  })(n) ||
                    (function hH(n) {
                      return (
                        (function pH(n) {
                          return "a" == n.nodeName.toLowerCase();
                        })(n) && n.hasAttribute("href")
                      );
                    })(n) ||
                    n.hasAttribute("contenteditable") ||
                    dM(n))
                );
              })(e) &&
              !this.isDisabled(e) &&
              (i?.ignoreVisibility || this.isVisible(e))
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(_t));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function dM(n) {
        if (!n.hasAttribute("tabindex") || void 0 === n.tabIndex) return !1;
        let t = n.getAttribute("tabindex");
        return !(!t || isNaN(parseInt(t, 10)));
      }
      function hM(n) {
        if (!dM(n)) return null;
        const t = parseInt(n.getAttribute("tabindex") || "", 10);
        return isNaN(t) ? -1 : t;
      }
      class yH {
        constructor(t, e, i, r, o = !1) {
          (this._element = t),
            (this._checker = e),
            (this._ngZone = i),
            (this._document = r),
            (this._hasAttached = !1),
            (this.startAnchorListener = () => this.focusLastTabbableElement()),
            (this.endAnchorListener = () => this.focusFirstTabbableElement()),
            (this._enabled = !0),
            o || this.attachAnchors();
        }
        get enabled() {
          return this._enabled;
        }
        set enabled(t) {
          (this._enabled = t),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(t, this._startAnchor),
              this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        destroy() {
          const t = this._startAnchor,
            e = this._endAnchor;
          t &&
            (t.removeEventListener("focus", this.startAnchorListener),
            t.remove()),
            e &&
              (e.removeEventListener("focus", this.endAnchorListener),
              e.remove()),
            (this._startAnchor = this._endAnchor = null),
            (this._hasAttached = !1);
        }
        attachAnchors() {
          return (
            !!this._hasAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._startAnchor ||
                ((this._startAnchor = this._createAnchor()),
                this._startAnchor.addEventListener(
                  "focus",
                  this.startAnchorListener
                )),
                this._endAnchor ||
                  ((this._endAnchor = this._createAnchor()),
                  this._endAnchor.addEventListener(
                    "focus",
                    this.endAnchorListener
                  ));
            }),
            this._element.parentNode &&
              (this._element.parentNode.insertBefore(
                this._startAnchor,
                this._element
              ),
              this._element.parentNode.insertBefore(
                this._endAnchor,
                this._element.nextSibling
              ),
              (this._hasAttached = !0)),
            this._hasAttached)
          );
        }
        focusInitialElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusInitialElement(t)));
          });
        }
        focusFirstTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusFirstTabbableElement(t)));
          });
        }
        focusLastTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusLastTabbableElement(t)));
          });
        }
        _getRegionBoundary(t) {
          const e = this._element.querySelectorAll(
            `[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`
          );
          return "start" == t
            ? e.length
              ? e[0]
              : this._getFirstTabbableElement(this._element)
            : e.length
            ? e[e.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement(t) {
          const e = this._element.querySelector(
            "[cdk-focus-initial], [cdkFocusInitial]"
          );
          if (e) {
            if (!this._checker.isFocusable(e)) {
              const i = this._getFirstTabbableElement(e);
              return i?.focus(t), !!i;
            }
            return e.focus(t), !0;
          }
          return this.focusFirstTabbableElement(t);
        }
        focusFirstTabbableElement(t) {
          const e = this._getRegionBoundary("start");
          return e && e.focus(t), !!e;
        }
        focusLastTabbableElement(t) {
          const e = this._getRegionBoundary("end");
          return e && e.focus(t), !!e;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          const e = t.children;
          for (let i = 0; i < e.length; i++) {
            const r =
              e[i].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(e[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _getLastTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          const e = t.children;
          for (let i = e.length - 1; i >= 0; i--) {
            const r =
              e[i].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(e[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _createAnchor() {
          const t = this._document.createElement("div");
          return (
            this._toggleAnchorTabIndex(this._enabled, t),
            t.classList.add("cdk-visually-hidden"),
            t.classList.add("cdk-focus-trap-anchor"),
            t.setAttribute("aria-hidden", "true"),
            t
          );
        }
        _toggleAnchorTabIndex(t, e) {
          t ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
        }
        toggleAnchors(t) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(t, this._startAnchor),
            this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        _executeOnStable(t) {
          this._ngZone.isStable
            ? t()
            : this._ngZone.onStable.pipe(Lt(1)).subscribe(t);
        }
      }
      let am = (() => {
        class n {
          constructor(e, i, r) {
            (this._checker = e), (this._ngZone = i), (this._document = r);
          }
          create(e, i = !1) {
            return new yH(e, this._checker, this._ngZone, this._document, i);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Xc), _(Q), _(K));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function fM(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function pM(n) {
        const t =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !t ||
          -1 !== t.identifier ||
          (null != t.radiusX && 1 !== t.radiusX) ||
          (null != t.radiusY && 1 !== t.radiusY)
        );
      }
      const vH = new E("cdk-input-modality-detector-options"),
        bH = { ignoreKeys: [18, 17, 224, 91, 16] },
        Lo = Kc({ passive: !0, capture: !0 });
      let CH = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._platform = e),
              (this._mostRecentTarget = null),
              (this._modality = new dn(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (s) => {
                this._options?.ignoreKeys?.some((a) => a === s.keyCode) ||
                  (this._modality.next("keyboard"),
                  (this._mostRecentTarget = Dr(s)));
              }),
              (this._onMousedown = (s) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(fM(s) ? "keyboard" : "mouse"),
                  (this._mostRecentTarget = Dr(s)));
              }),
              (this._onTouchstart = (s) => {
                pM(s)
                  ? this._modality.next("keyboard")
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = Dr(s)));
              }),
              (this._options = { ...bH, ...o }),
              (this.modalityDetected = this._modality.pipe(nM(1))),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function Kj(n, t = Ci) {
                  return (
                    (n = n ?? Yj),
                    Pe((e, i) => {
                      let r,
                        o = !0;
                      e.subscribe(
                        Te(i, (s) => {
                          const a = t(s);
                          (o || !n(r, a)) && ((o = !1), (r = a), i.next(s));
                        })
                      );
                    })
                  );
                })()
              )),
              e.isBrowser &&
                i.runOutsideAngular(() => {
                  r.addEventListener("keydown", this._onKeydown, Lo),
                    r.addEventListener("mousedown", this._onMousedown, Lo),
                    r.addEventListener("touchstart", this._onTouchstart, Lo);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener("keydown", this._onKeydown, Lo),
                document.removeEventListener(
                  "mousedown",
                  this._onMousedown,
                  Lo
                ),
                document.removeEventListener(
                  "touchstart",
                  this._onTouchstart,
                  Lo
                ));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(_t), _(Q), _(K), _(vH, 8));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const DH = new E("liveAnnouncerElement", {
          providedIn: "root",
          factory: function wH() {
            return null;
          },
        }),
        EH = new E("LIVE_ANNOUNCER_DEFAULT_OPTIONS");
      let gM = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._ngZone = i),
              (this._defaultOptions = o),
              (this._document = r),
              (this._liveElement = e || this._createLiveElement());
          }
          announce(e, ...i) {
            const r = this._defaultOptions;
            let o, s;
            return (
              1 === i.length && "number" == typeof i[0]
                ? (s = i[0])
                : ([o, s] = i),
              this.clear(),
              clearTimeout(this._previousTimeout),
              o || (o = r && r.politeness ? r.politeness : "polite"),
              null == s && r && (s = r.duration),
              this._liveElement.setAttribute("aria-live", o),
              this._ngZone.runOutsideAngular(
                () => (
                  this._currentPromise ||
                    (this._currentPromise = new Promise(
                      (a) => (this._currentResolve = a)
                    )),
                  clearTimeout(this._previousTimeout),
                  (this._previousTimeout = setTimeout(() => {
                    (this._liveElement.textContent = e),
                      "number" == typeof s &&
                        (this._previousTimeout = setTimeout(
                          () => this.clear(),
                          s
                        )),
                      this._currentResolve(),
                      (this._currentPromise = this._currentResolve = void 0);
                  }, 100)),
                  this._currentPromise
                )
              )
            );
          }
          clear() {
            this._liveElement && (this._liveElement.textContent = "");
          }
          ngOnDestroy() {
            clearTimeout(this._previousTimeout),
              this._liveElement?.remove(),
              (this._liveElement = null),
              this._currentResolve?.(),
              (this._currentPromise = this._currentResolve = void 0);
          }
          _createLiveElement() {
            const e = "cdk-live-announcer-element",
              i = this._document.getElementsByClassName(e),
              r = this._document.createElement("div");
            for (let o = 0; o < i.length; o++) i[o].remove();
            return (
              r.classList.add(e),
              r.classList.add("cdk-visually-hidden"),
              r.setAttribute("aria-atomic", "true"),
              r.setAttribute("aria-live", "polite"),
              this._document.body.appendChild(r),
              r
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(DH, 8), _(Q), _(K), _(EH, 8));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const MH = new E("cdk-focus-monitor-default-options"),
        Jc = Kc({ passive: !0, capture: !0 });
      let eu = (() => {
        class n {
          constructor(e, i, r, o, s) {
            (this._ngZone = e),
              (this._platform = i),
              (this._inputModalityDetector = r),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new te()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                for (let c = Dr(a); c; c = c.parentElement)
                  "focus" === a.type ? this._onFocus(a, c) : this._onBlur(a, c);
              }),
              (this._document = o),
              (this._detectionMode = s?.detectionMode || 0);
          }
          monitor(e, i = !1) {
            const r = yi(e);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return O(null);
            const o =
                (function Uj(n) {
                  if (
                    (function Hj() {
                      if (null == em) {
                        const n = typeof document < "u" ? document.head : null;
                        em = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return em;
                    })()
                  ) {
                    const t = n.getRootNode ? n.getRootNode() : null;
                    if (
                      typeof ShadowRoot < "u" &&
                      ShadowRoot &&
                      t instanceof ShadowRoot
                    )
                      return t;
                  }
                  return null;
                })(r) || this._getDocument(),
              s = this._elementInfo.get(r);
            if (s) return i && (s.checkChildren = !0), s.subject;
            const a = { checkChildren: i, subject: new te(), rootNode: o };
            return (
              this._elementInfo.set(r, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(e) {
            const i = yi(e),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(),
              this._setClasses(i),
              this._elementInfo.delete(i),
              this._removeGlobalListeners(r));
          }
          focusVia(e, i, r) {
            const o = yi(e);
            o === this._getDocument().activeElement
              ? this._getClosestElementsInfo(o).forEach(([a, l]) =>
                  this._originChanged(a, i, l)
                )
              : (this._setOrigin(i),
                "function" == typeof o.focus && o.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((e, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(e) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(e)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : e && this._isLastInteractionFromInputLabel(e)
              ? "mouse"
              : "program";
          }
          _shouldBeAttributedToTouch(e) {
            return (
              1 === this._detectionMode ||
              !!e?.contains(this._inputModalityDetector._mostRecentTarget)
            );
          }
          _setClasses(e, i) {
            e.classList.toggle("cdk-focused", !!i),
              e.classList.toggle("cdk-touch-focused", "touch" === i),
              e.classList.toggle("cdk-keyboard-focused", "keyboard" === i),
              e.classList.toggle("cdk-mouse-focused", "mouse" === i),
              e.classList.toggle("cdk-program-focused", "program" === i);
          }
          _setOrigin(e, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = e),
                (this._originFromTouchInteraction = "touch" === e && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(e, i) {
            const r = this._elementInfo.get(i),
              o = Dr(e);
            !r ||
              (!r.checkChildren && i !== o) ||
              this._originChanged(i, this._getFocusOrigin(o), r);
          }
          _onBlur(e, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren &&
                e.relatedTarget instanceof Node &&
                i.contains(e.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r, null));
          }
          _emitOrigin(e, i) {
            e.subject.observers.length &&
              this._ngZone.run(() => e.subject.next(i));
          }
          _registerGlobalListeners(e) {
            if (!this._platform.isBrowser) return;
            const i = e.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  Jc
                ),
                  i.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Jc
                  );
              }),
              this._rootNodeFocusListenerCount.set(i, r + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    "focus",
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(wr(this._stopInputModalityDetector))
                  .subscribe((o) => {
                    this._setOrigin(o, !0);
                  }));
          }
          _removeGlobalListeners(e) {
            const i = e.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    Jc
                  ),
                  i.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Jc
                  ),
                  this._rootNodeFocusListenerCount.delete(i));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                "focus",
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(e, i, r) {
            this._setClasses(e, i),
              this._emitOrigin(r, i),
              (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(e) {
            const i = [];
            return (
              this._elementInfo.forEach((r, o) => {
                (o === e || (r.checkChildren && o.contains(e))) &&
                  i.push([o, r]);
              }),
              i
            );
          }
          _isLastInteractionFromInputLabel(e) {
            const { _mostRecentTarget: i, mostRecentModality: r } =
              this._inputModalityDetector;
            if (
              "mouse" !== r ||
              !i ||
              i === e ||
              ("INPUT" !== e.nodeName && "TEXTAREA" !== e.nodeName) ||
              e.disabled
            )
              return !1;
            const o = e.labels;
            if (o)
              for (let s = 0; s < o.length; s++)
                if (o[s].contains(i)) return !0;
            return !1;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(Q), _(_t), _(CH), _(K, 8), _(MH, 8));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const _M = "cdk-high-contrast-black-on-white",
        yM = "cdk-high-contrast-white-on-black",
        lm = "cdk-high-contrast-active";
      let vM = (() => {
          class n {
            constructor(e, i) {
              (this._platform = e),
                (this._document = i),
                (this._breakpointSubscription = sn(sm)
                  .observe("(forced-colors: active)")
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1),
                      this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const e = this._document.createElement("div");
              (e.style.backgroundColor = "rgb(1,2,3)"),
                (e.style.position = "absolute"),
                this._document.body.appendChild(e);
              const i = this._document.defaultView || window,
                r = i && i.getComputedStyle ? i.getComputedStyle(e) : null,
                o = ((r && r.backgroundColor) || "").replace(/ /g, "");
              switch ((e.remove(), o)) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (
                !this._hasCheckedHighContrastMode &&
                this._platform.isBrowser &&
                this._document.body
              ) {
                const e = this._document.body.classList;
                e.remove(lm, _M, yM), (this._hasCheckedHighContrastMode = !0);
                const i = this.getHighContrastMode();
                1 === i ? e.add(lm, _M) : 2 === i && e.add(lm, yM);
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(_t), _(K));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        SH = (() => {
          class n {
            constructor(e) {
              e._applyBodyHighContrastModeCssClasses();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(vM));
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [sM] })),
            n
          );
        })();
      const AH = new E("cdk-dir-doc", {
          providedIn: "root",
          factory: function TH() {
            return sn(K);
          },
        }),
        IH =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let tu = (() => {
          class n {
            constructor(e) {
              if (((this.value = "ltr"), (this.change = new Se()), e)) {
                const r = e.documentElement ? e.documentElement.dir : null;
                this.value = (function xH(n) {
                  const t = n?.toLowerCase() || "";
                  return "auto" === t &&
                    typeof navigator < "u" &&
                    navigator?.language
                    ? IH.test(navigator.language)
                      ? "rtl"
                      : "ltr"
                    : "rtl" === t
                    ? "rtl"
                    : "ltr";
                })((e.body ? e.body.dir : null) || r || "ltr");
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(AH, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        da = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })();
      const kH = new E("mat-sanity-checks", {
        providedIn: "root",
        factory: function RH() {
          return !0;
        },
      });
      let ht = (() => {
        class n {
          constructor(e, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              e._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(e) {
            return (
              !nm() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[e])
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(vM), _(kH, 8), _(K));
          }),
          (n.ɵmod = he({ type: n })),
          (n.ɵinj = ue({ imports: [da, da] })),
          n
        );
      })();
      function FH(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = Vi(t);
          }
        };
      }
      function nu(n, t) {
        return class extends n {
          constructor(...e) {
            super(...e), (this.defaultColor = t), (this.color = t);
          }
          get color() {
            return this._color;
          }
          set color(e) {
            const i = e || this.defaultColor;
            i !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              i && this._elementRef.nativeElement.classList.add(`mat-${i}`),
              (this._color = i));
          }
        };
      }
      function OH(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = Vi(t);
          }
        };
      }
      function PH(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this.errorState = !1);
          }
          updateErrorState() {
            const t = this.errorState,
              o = (
                this.errorStateMatcher || this._defaultErrorStateMatcher
              ).isErrorState(
                this.ngControl ? this.ngControl.control : null,
                this._parentFormGroup || this._parentForm
              );
            o !== t && ((this.errorState = o), this.stateChanges.next());
          }
        };
      }
      let DM = (() => {
        class n {
          isErrorState(e, i) {
            return !!(e && e.invalid && (e.touched || (i && i.submitted)));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class LH {
        constructor(t, e, i, r = !1) {
          (this._renderer = t),
            (this.element = e),
            (this.config = i),
            (this._animationForciblyDisabledThroughCss = r),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const wM = { enterDuration: 225, exitDuration: 150 },
        cm = Kc({ passive: !0 }),
        EM = ["mousedown", "touchstart"],
        MM = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class BH {
        constructor(t, e, i, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = yi(i));
        }
        fadeInRipple(t, e, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            o = { ...wM, ...i.animation };
          i.centered &&
            ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const s =
              i.radius ||
              (function jH(n, t, e) {
                const i = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
                  r = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
                return Math.sqrt(i * i + r * r);
              })(t, e, r),
            a = t - r.left,
            l = e - r.top,
            c = o.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = a - s + "px"),
            (u.style.top = l - s + "px"),
            (u.style.height = 2 * s + "px"),
            (u.style.width = 2 * s + "px"),
            null != i.color && (u.style.backgroundColor = i.color),
            (u.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(u);
          const d = window.getComputedStyle(u),
            f = d.transitionDuration,
            p = "none" === d.transitionProperty || "0s" === f || "0s, 0s" === f,
            m = new LH(this, u, i, p);
          (u.style.transform = "scale3d(1, 1, 1)"),
            (m.state = 0),
            i.persistent || (this._mostRecentTransientRipple = m);
          let y = null;
          return (
            !p &&
              (c || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const v = () => this._finishRippleTransition(m),
                  w = () => this._destroyRipple(m);
                u.addEventListener("transitionend", v),
                  u.addEventListener("transitioncancel", w),
                  (y = { onTransitionEnd: v, onTransitionCancel: w });
              }),
            this._activeRipples.set(m, y),
            (p || !c) && this._finishRippleTransition(m),
            m
          );
        }
        fadeOutRipple(t) {
          if (2 === t.state || 3 === t.state) return;
          const e = t.element,
            i = { ...wM, ...t.config.animation };
          (e.style.transitionDuration = `${i.exitDuration}ms`),
            (e.style.opacity = "0"),
            (t.state = 2),
            (t._animationForciblyDisabledThroughCss || !i.exitDuration) &&
              this._finishRippleTransition(t);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = yi(t);
          !e ||
            e === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(EM));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(MM),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(t) {
          0 === t.state
            ? this._startFadeOutTransition(t)
            : 2 === t.state && this._destroyRipple(t);
        }
        _startFadeOutTransition(t) {
          const e = t === this._mostRecentTransientRipple,
            { persistent: i } = t.config;
          (t.state = 1), !i && (!e || !this._isPointerDown) && t.fadeOut();
        }
        _destroyRipple(t) {
          const e = this._activeRipples.get(t) ?? null;
          this._activeRipples.delete(t),
            this._activeRipples.size || (this._containerRect = null),
            t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (t.state = 3),
            null !== e &&
              (t.element.removeEventListener(
                "transitionend",
                e.onTransitionEnd
              ),
              t.element.removeEventListener(
                "transitioncancel",
                e.onTransitionCancel
              )),
            t.element.remove();
        }
        _onMousedown(t) {
          const e = fM(t),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !e &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !pM(t)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let i = 0; i < e.length; i++)
              this.fadeInRipple(
                e[i].clientX,
                e[i].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((e) => {
              this._triggerElement.addEventListener(e, this, cm);
            });
          });
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (EM.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, cm);
            }),
            this._pointerUpEventsRegistered &&
              MM.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, cm);
              }));
        }
      }
      const HH = new E("mat-ripple-global-options");
      let SM = (() => {
          class n {
            constructor(e, i, r, o, s) {
              (this._elementRef = e),
                (this._animationMode = s),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = o || {}),
                (this._rippleRenderer = new BH(this, i, e, r));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              e && this.fadeOutAllNonPersistent(),
                (this._disabled = e),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(e) {
              (this._trigger = e), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: {
                  ...this._globalOptions.animation,
                  ...("NoopAnimations" === this._animationMode
                    ? { enterDuration: 0, exitDuration: 0 }
                    : {}),
                  ...this.animation,
                },
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(e, i = 0, r) {
              return "number" == typeof e
                ? this._rippleRenderer.fadeInRipple(e, i, {
                    ...this.rippleConfig,
                    ...r,
                  })
                : this._rippleRenderer.fadeInRipple(0, 0, {
                    ...this.rippleConfig,
                    ...e,
                  });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ve), g(Q), g(_t), g(HH, 8), g(Ii, 8));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && St("mat-ripple-unbounded", i.unbounded);
              },
              inputs: {
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                radius: ["matRippleRadius", "radius"],
                animation: ["matRippleAnimation", "animation"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
              },
              exportAs: ["matRipple"],
            })),
            n
          );
        })(),
        UH = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [ht, ht] })),
            n
          );
        })();
      function AM(...n) {
        const t = lg(n),
          { args: e, keys: i } = VD(n),
          r = new De((o) => {
            const { length: s } = e;
            if (!s) return void o.complete();
            const a = new Array(s);
            let l = s,
              c = s;
            for (let u = 0; u < s; u++) {
              let d = !1;
              Rt(e[u]).subscribe(
                Te(
                  o,
                  (h) => {
                    d || ((d = !0), c--), (a[u] = h);
                  },
                  () => l--,
                  void 0,
                  () => {
                    (!l || !d) && (c || o.next(i ? BD(i, a) : a), o.complete());
                  }
                )
              );
            }
          });
        return t ? r.pipe($f(t)) : r;
      }
      const $H = ["*"];
      let iu;
      function fa(n) {
        return (
          (function zH() {
            if (void 0 === iu && ((iu = null), typeof window < "u")) {
              const n = window;
              void 0 !== n.trustedTypes &&
                (iu = n.trustedTypes.createPolicy("angular#components", {
                  createHTML: (t) => t,
                }));
            }
            return iu;
          })()?.createHTML(n) || n
        );
      }
      function TM(n) {
        return Error(`Unable to find icon with the name "${n}"`);
      }
      function IM(n) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`
        );
      }
      function xM(n) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`
        );
      }
      class Er {
        constructor(t, e, i) {
          (this.url = t), (this.svgText = e), (this.options = i);
        }
      }
      let ru = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._httpClient = e),
              (this._sanitizer = i),
              (this._errorHandler = o),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = [
                "material-icons",
                "mat-ligature-font",
              ]),
              (this._document = r);
          }
          addSvgIcon(e, i, r) {
            return this.addSvgIconInNamespace("", e, i, r);
          }
          addSvgIconLiteral(e, i, r) {
            return this.addSvgIconLiteralInNamespace("", e, i, r);
          }
          addSvgIconInNamespace(e, i, r, o) {
            return this._addSvgIconConfig(e, i, new Er(r, null, o));
          }
          addSvgIconResolver(e) {
            return this._resolvers.push(e), this;
          }
          addSvgIconLiteralInNamespace(e, i, r, o) {
            const s = this._sanitizer.sanitize(me.HTML, r);
            if (!s) throw xM(r);
            const a = fa(s);
            return this._addSvgIconConfig(e, i, new Er("", a, o));
          }
          addSvgIconSet(e, i) {
            return this.addSvgIconSetInNamespace("", e, i);
          }
          addSvgIconSetLiteral(e, i) {
            return this.addSvgIconSetLiteralInNamespace("", e, i);
          }
          addSvgIconSetInNamespace(e, i, r) {
            return this._addSvgIconSetConfig(e, new Er(i, null, r));
          }
          addSvgIconSetLiteralInNamespace(e, i, r) {
            const o = this._sanitizer.sanitize(me.HTML, i);
            if (!o) throw xM(i);
            const s = fa(o);
            return this._addSvgIconSetConfig(e, new Er("", s, r));
          }
          registerFontClassAlias(e, i = e) {
            return this._fontCssClassesByAlias.set(e, i), this;
          }
          classNameForFontAlias(e) {
            return this._fontCssClassesByAlias.get(e) || e;
          }
          setDefaultFontSetClass(...e) {
            return (this._defaultFontSetClass = e), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(e) {
            const i = this._sanitizer.sanitize(me.RESOURCE_URL, e);
            if (!i) throw IM(e);
            const r = this._cachedIconsByUrl.get(i);
            return r
              ? O(ou(r))
              : this._loadSvgIconFromConfig(new Er(e, null)).pipe(
                  tt((o) => this._cachedIconsByUrl.set(i, o)),
                  P((o) => ou(o))
                );
          }
          getNamedSvgIcon(e, i = "") {
            const r = RM(i, e);
            let o = this._svgIconConfigs.get(r);
            if (o) return this._getSvgFromConfig(o);
            if (((o = this._getIconConfigFromResolvers(i, e)), o))
              return this._svgIconConfigs.set(r, o), this._getSvgFromConfig(o);
            const s = this._iconSetConfigs.get(i);
            return s ? this._getSvgFromIconSetConfigs(e, s) : hr(TM(r));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(e) {
            return e.svgText
              ? O(ou(this._svgElementFromConfig(e)))
              : this._loadSvgIconFromConfig(e).pipe(P((i) => ou(i)));
          }
          _getSvgFromIconSetConfigs(e, i) {
            const r = this._extractIconWithNameFromAnySet(e, i);
            return r
              ? O(r)
              : AM(
                  i
                    .filter((s) => !s.svgText)
                    .map((s) =>
                      this._loadSvgIconSetFromConfig(s).pipe(
                        je((a) => {
                          const c = `Loading icon set URL: ${this._sanitizer.sanitize(
                            me.RESOURCE_URL,
                            s.url
                          )} failed: ${a.message}`;
                          return (
                            this._errorHandler.handleError(new Error(c)),
                            O(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  P(() => {
                    const s = this._extractIconWithNameFromAnySet(e, i);
                    if (!s) throw TM(e);
                    return s;
                  })
                );
          }
          _extractIconWithNameFromAnySet(e, i) {
            for (let r = i.length - 1; r >= 0; r--) {
              const o = i[r];
              if (o.svgText && o.svgText.toString().indexOf(e) > -1) {
                const s = this._svgElementFromConfig(o),
                  a = this._extractSvgIconFromSet(s, e, o.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(e) {
            return this._fetchIcon(e).pipe(
              tt((i) => (e.svgText = i)),
              P(() => this._svgElementFromConfig(e))
            );
          }
          _loadSvgIconSetFromConfig(e) {
            return e.svgText
              ? O(null)
              : this._fetchIcon(e).pipe(tt((i) => (e.svgText = i)));
          }
          _extractSvgIconFromSet(e, i, r) {
            const o = e.querySelector(`[id="${i}"]`);
            if (!o) return null;
            const s = o.cloneNode(!0);
            if ((s.removeAttribute("id"), "svg" === s.nodeName.toLowerCase()))
              return this._setSvgAttributes(s, r);
            if ("symbol" === s.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(s), r);
            const a = this._svgElementFromString(fa("<svg></svg>"));
            return a.appendChild(s), this._setSvgAttributes(a, r);
          }
          _svgElementFromString(e) {
            const i = this._document.createElement("DIV");
            i.innerHTML = e;
            const r = i.querySelector("svg");
            if (!r) throw Error("<svg> tag not found");
            return r;
          }
          _toSvgElement(e) {
            const i = this._svgElementFromString(fa("<svg></svg>")),
              r = e.attributes;
            for (let o = 0; o < r.length; o++) {
              const { name: s, value: a } = r[o];
              "id" !== s && i.setAttribute(s, a);
            }
            for (let o = 0; o < e.childNodes.length; o++)
              e.childNodes[o].nodeType === this._document.ELEMENT_NODE &&
                i.appendChild(e.childNodes[o].cloneNode(!0));
            return i;
          }
          _setSvgAttributes(e, i) {
            return (
              e.setAttribute("fit", ""),
              e.setAttribute("height", "100%"),
              e.setAttribute("width", "100%"),
              e.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              e.setAttribute("focusable", "false"),
              i && i.viewBox && e.setAttribute("viewBox", i.viewBox),
              e
            );
          }
          _fetchIcon(e) {
            const { url: i, options: r } = e,
              o = r?.withCredentials ?? !1;
            if (!this._httpClient)
              throw (function GH() {
                return Error(
                  "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
                );
              })();
            if (null == i) throw Error(`Cannot fetch icon from URL "${i}".`);
            const s = this._sanitizer.sanitize(me.RESOURCE_URL, i);
            if (!s) throw IM(i);
            const a = this._inProgressUrlFetches.get(s);
            if (a) return a;
            const l = this._httpClient
              .get(s, { responseType: "text", withCredentials: o })
              .pipe(
                P((c) => fa(c)),
                cc(() => this._inProgressUrlFetches.delete(s)),
                hg()
              );
            return this._inProgressUrlFetches.set(s, l), l;
          }
          _addSvgIconConfig(e, i, r) {
            return this._svgIconConfigs.set(RM(e, i), r), this;
          }
          _addSvgIconSetConfig(e, i) {
            const r = this._iconSetConfigs.get(e);
            return r ? r.push(i) : this._iconSetConfigs.set(e, [i]), this;
          }
          _svgElementFromConfig(e) {
            if (!e.svgElement) {
              const i = this._svgElementFromString(e.svgText);
              this._setSvgAttributes(i, e.options), (e.svgElement = i);
            }
            return e.svgElement;
          }
          _getIconConfigFromResolvers(e, i) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const o = this._resolvers[r](i, e);
              if (o)
                return qH(o) ? new Er(o.url, null, o.options) : new Er(o, null);
            }
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(xc, 8), _(Uf), _(K, 8), _(ri));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function ou(n) {
        return n.cloneNode(!0);
      }
      function RM(n, t) {
        return n + ":" + t;
      }
      function qH(n) {
        return !(!n.url || !n.options);
      }
      const KH = nu(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        ),
        YH = new E("MAT_ICON_DEFAULT_OPTIONS"),
        ZH = new E("mat-icon-location", {
          providedIn: "root",
          factory: function QH() {
            const n = sn(K),
              t = n ? n.location : null;
            return { getPathname: () => (t ? t.pathname + t.search : "") };
          },
        }),
        kM = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        XH = kM.map((n) => `[${n}]`).join(", "),
        JH = /^url\(['"]?#(.*?)['"]?\)$/;
      let eU = (() => {
          class n extends KH {
            constructor(e, i, r, o, s, a) {
              super(e),
                (this._iconRegistry = i),
                (this._location = o),
                (this._errorHandler = s),
                (this._inline = !1),
                (this._previousFontSetClass = []),
                (this._currentIconFetch = ct.EMPTY),
                a &&
                  (a.color && (this.color = this.defaultColor = a.color),
                  a.fontSet && (this.fontSet = a.fontSet)),
                r || e.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(e) {
              this._inline = Vi(e);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(e) {
              e !== this._svgIcon &&
                (e
                  ? this._updateSvgIcon(e)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = e));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontSet &&
                ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontIcon &&
                ((this._fontIcon = i), this._updateFontIconClasses());
            }
            _splitIconName(e) {
              if (!e) return ["", ""];
              const i = e.split(":");
              switch (i.length) {
                case 1:
                  return ["", i[0]];
                case 2:
                  return i;
                default:
                  throw Error(`Invalid icon name: "${e}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const e = this._elementsWithExternalReferences;
              if (e && e.size) {
                const i = this._location.getPathname();
                i !== this._previousPath &&
                  ((this._previousPath = i), this._prependPathToReferences(i));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(e) {
              this._clearSvgElement();
              const i = this._location.getPathname();
              (this._previousPath = i),
                this._cacheChildrenWithExternalReferences(e),
                this._prependPathToReferences(i),
                this._elementRef.nativeElement.appendChild(e);
            }
            _clearSvgElement() {
              const e = this._elementRef.nativeElement;
              let i = e.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                i--;

              ) {
                const r = e.childNodes[i];
                (1 !== r.nodeType || "svg" === r.nodeName.toLowerCase()) &&
                  r.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const e = this._elementRef.nativeElement,
                i = (
                  this.fontSet
                    ? this._iconRegistry
                        .classNameForFontAlias(this.fontSet)
                        .split(/ +/)
                    : this._iconRegistry.getDefaultFontSetClass()
                ).filter((r) => r.length > 0);
              this._previousFontSetClass.forEach((r) => e.classList.remove(r)),
                i.forEach((r) => e.classList.add(r)),
                (this._previousFontSetClass = i),
                this.fontIcon !== this._previousFontIconClass &&
                  !i.includes("mat-ligature-font") &&
                  (this._previousFontIconClass &&
                    e.classList.remove(this._previousFontIconClass),
                  this.fontIcon && e.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(e) {
              return "string" == typeof e ? e.trim().split(" ")[0] : e;
            }
            _prependPathToReferences(e) {
              const i = this._elementsWithExternalReferences;
              i &&
                i.forEach((r, o) => {
                  r.forEach((s) => {
                    o.setAttribute(s.name, `url('${e}#${s.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(e) {
              const i = e.querySelectorAll(XH),
                r = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let o = 0; o < i.length; o++)
                kM.forEach((s) => {
                  const a = i[o],
                    l = a.getAttribute(s),
                    c = l ? l.match(JH) : null;
                  if (c) {
                    let u = r.get(a);
                    u || ((u = []), r.set(a, u)),
                      u.push({ name: s, value: c[1] });
                  }
                });
            }
            _updateSvgIcon(e) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                e)
              ) {
                const [i, r] = this._splitIconName(e);
                i && (this._svgNamespace = i),
                  r && (this._svgName = r),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(r, i)
                    .pipe(Lt(1))
                    .subscribe(
                      (o) => this._setSvgElement(o),
                      (o) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${i}:${r}! ${o.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(ve),
                g(ru),
                Gr("aria-hidden"),
                g(ZH),
                g(ri),
                g(YH, 8)
              );
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 7,
              hostBindings: function (e, i) {
                2 & e &&
                  (ot(
                    "data-mat-icon-type",
                    i._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", i._svgName || i.fontIcon)(
                    "data-mat-icon-namespace",
                    i._svgNamespace || i.fontSet
                  ),
                  St("mat-icon-inline", i.inline)(
                    "mat-icon-no-color",
                    "primary" !== i.color &&
                      "accent" !== i.color &&
                      "warn" !== i.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
              },
              exportAs: ["matIcon"],
              features: [ee],
              ngContentSelectors: $H,
              decls: 1,
              vars: 0,
              template: function (e, i) {
                1 & e && (or(), at(0));
              },
              styles: [
                ".mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        tU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [ht, ht] })),
            n
          );
        })();
      const FM = Kc({ passive: !0 });
      let nU = (() => {
          class n {
            constructor(e, i) {
              (this._platform = e),
                (this._ngZone = i),
                (this._monitoredElements = new Map());
            }
            monitor(e) {
              if (!this._platform.isBrowser) return kn;
              const i = yi(e),
                r = this._monitoredElements.get(i);
              if (r) return r.subject;
              const o = new te(),
                s = "cdk-text-field-autofilled",
                a = (l) => {
                  "cdk-text-field-autofill-start" !== l.animationName ||
                  i.classList.contains(s)
                    ? "cdk-text-field-autofill-end" === l.animationName &&
                      i.classList.contains(s) &&
                      (i.classList.remove(s),
                      this._ngZone.run(() =>
                        o.next({ target: l.target, isAutofilled: !1 })
                      ))
                    : (i.classList.add(s),
                      this._ngZone.run(() =>
                        o.next({ target: l.target, isAutofilled: !0 })
                      ));
                };
              return (
                this._ngZone.runOutsideAngular(() => {
                  i.addEventListener("animationstart", a, FM),
                    i.classList.add("cdk-text-field-autofill-monitored");
                }),
                this._monitoredElements.set(i, {
                  subject: o,
                  unlisten: () => {
                    i.removeEventListener("animationstart", a, FM);
                  },
                }),
                o
              );
            }
            stopMonitoring(e) {
              const i = yi(e),
                r = this._monitoredElements.get(i);
              r &&
                (r.unlisten(),
                r.subject.complete(),
                i.classList.remove("cdk-text-field-autofill-monitored"),
                i.classList.remove("cdk-text-field-autofilled"),
                this._monitoredElements.delete(i));
            }
            ngOnDestroy() {
              this._monitoredElements.forEach((e, i) => this.stopMonitoring(i));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(_t), _(Q));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        OM = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })(),
        PM = (() => {
          class n {
            constructor(e, i) {
              (this._renderer = e),
                (this._elementRef = i),
                (this.onChange = (r) => {}),
                (this.onTouched = () => {});
            }
            setProperty(e, i) {
              this._renderer.setProperty(this._elementRef.nativeElement, e, i);
            }
            registerOnTouched(e) {
              this.onTouched = e;
            }
            registerOnChange(e) {
              this.onChange = e;
            }
            setDisabledState(e) {
              this.setProperty("disabled", e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ii), g(ve));
            }),
            (n.ɵdir = F({ type: n })),
            n
          );
        })(),
        Mr = (() => {
          class n extends PM {}
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = ut(n)))(i || n);
              };
            })()),
            (n.ɵdir = F({ type: n, features: [ee] })),
            n
          );
        })();
      const Yn = new E("NgValueAccessor"),
        rU = { provide: Yn, useExisting: we(() => Bi), multi: !0 },
        sU = new E("CompositionEventMode");
      let Bi = (() => {
        class n extends PM {
          constructor(e, i, r) {
            super(e, i),
              (this._compositionMode = r),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function oU() {
                  const n = Gn() ? Gn().getUserAgent() : "";
                  return /android (\d+)/.test(n.toLowerCase());
                })());
          }
          writeValue(e) {
            this.setProperty("value", e ?? "");
          }
          _handleInput(e) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(e);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(e) {
            (this._composing = !1), this._compositionMode && this.onChange(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(ii), g(ve), g(sU, 8));
          }),
          (n.ɵdir = F({
            type: n,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (e, i) {
              1 & e &&
                W("input", function (o) {
                  return i._handleInput(o.target.value);
                })("blur", function () {
                  return i.onTouched();
                })("compositionstart", function () {
                  return i._compositionStart();
                })("compositionend", function (o) {
                  return i._compositionEnd(o.target.value);
                });
            },
            features: [Me([rU]), ee],
          })),
          n
        );
      })();
      function ji(n) {
        return (
          null == n ||
          (("string" == typeof n || Array.isArray(n)) && 0 === n.length)
        );
      }
      function LM(n) {
        return null != n && "number" == typeof n.length;
      }
      const yt = new E("NgValidators"),
        Hi = new E("NgAsyncValidators"),
        lU =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class cU {
        static min(t) {
          return (function VM(n) {
            return (t) => {
              if (ji(t.value) || ji(n)) return null;
              const e = parseFloat(t.value);
              return !isNaN(e) && e < n
                ? { min: { min: n, actual: t.value } }
                : null;
            };
          })(t);
        }
        static max(t) {
          return (function BM(n) {
            return (t) => {
              if (ji(t.value) || ji(n)) return null;
              const e = parseFloat(t.value);
              return !isNaN(e) && e > n
                ? { max: { max: n, actual: t.value } }
                : null;
            };
          })(t);
        }
        static required(t) {
          return jM(t);
        }
        static requiredTrue(t) {
          return (function HM(n) {
            return !0 === n.value ? null : { required: !0 };
          })(t);
        }
        static email(t) {
          return (function UM(n) {
            return ji(n.value) || lU.test(n.value) ? null : { email: !0 };
          })(t);
        }
        static minLength(t) {
          return (function $M(n) {
            return (t) =>
              ji(t.value) || !LM(t.value)
                ? null
                : t.value.length < n
                ? {
                    minlength: {
                      requiredLength: n,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static maxLength(t) {
          return (function zM(n) {
            return (t) =>
              LM(t.value) && t.value.length > n
                ? {
                    maxlength: {
                      requiredLength: n,
                      actualLength: t.value.length,
                    },
                  }
                : null;
          })(t);
        }
        static pattern(t) {
          return (function GM(n) {
            if (!n) return su;
            let t, e;
            return (
              "string" == typeof n
                ? ((e = ""),
                  "^" !== n.charAt(0) && (e += "^"),
                  (e += n),
                  "$" !== n.charAt(n.length - 1) && (e += "$"),
                  (t = new RegExp(e)))
                : ((e = n.toString()), (t = n)),
              (i) => {
                if (ji(i.value)) return null;
                const r = i.value;
                return t.test(r)
                  ? null
                  : { pattern: { requiredPattern: e, actualValue: r } };
              }
            );
          })(t);
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          return QM(t);
        }
        static composeAsync(t) {
          return XM(t);
        }
      }
      function jM(n) {
        return ji(n.value) ? { required: !0 } : null;
      }
      function su(n) {
        return null;
      }
      function WM(n) {
        return null != n;
      }
      function qM(n) {
        return As(n) ? $e(n) : n;
      }
      function KM(n) {
        let t = {};
        return (
          n.forEach((e) => {
            t = null != e ? { ...t, ...e } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function YM(n, t) {
        return t.map((e) => e(n));
      }
      function ZM(n) {
        return n.map((t) =>
          (function uU(n) {
            return !n.validate;
          })(t)
            ? t
            : (e) => t.validate(e)
        );
      }
      function QM(n) {
        if (!n) return null;
        const t = n.filter(WM);
        return 0 == t.length
          ? null
          : function (e) {
              return KM(YM(e, t));
            };
      }
      function um(n) {
        return null != n ? QM(ZM(n)) : null;
      }
      function XM(n) {
        if (!n) return null;
        const t = n.filter(WM);
        return 0 == t.length
          ? null
          : function (e) {
              return AM(YM(e, t).map(qM)).pipe(P(KM));
            };
      }
      function dm(n) {
        return null != n ? XM(ZM(n)) : null;
      }
      function JM(n, t) {
        return null === n ? [t] : Array.isArray(n) ? [...n, t] : [n, t];
      }
      function e0(n) {
        return n._rawValidators;
      }
      function t0(n) {
        return n._rawAsyncValidators;
      }
      function hm(n) {
        return n ? (Array.isArray(n) ? n : [n]) : [];
      }
      function au(n, t) {
        return Array.isArray(n) ? n.includes(t) : n === t;
      }
      function n0(n, t) {
        const e = hm(t);
        return (
          hm(n).forEach((r) => {
            au(e, r) || e.push(r);
          }),
          e
        );
      }
      function r0(n, t) {
        return hm(t).filter((e) => !au(n, e));
      }
      class o0 {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = um(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = dm(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, e) {
          return !!this.control && this.control.hasError(t, e);
        }
        getError(t, e) {
          return this.control ? this.control.getError(t, e) : null;
        }
      }
      class xt extends o0 {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class vi extends o0 {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class s0 {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let Vo = (() => {
          class n extends s0 {
            constructor(e) {
              super(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(vi, 2));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (e, i) {
                2 & e &&
                  St("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
                    "ng-pristine",
                    i.isPristine
                  )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
                    "ng-invalid",
                    i.isInvalid
                  )("ng-pending", i.isPending);
              },
              features: [ee],
            })),
            n
          );
        })(),
        lu = (() => {
          class n extends s0 {
            constructor(e) {
              super(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(xt, 10));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (e, i) {
                2 & e &&
                  St("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
                    "ng-pristine",
                    i.isPristine
                  )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
                    "ng-invalid",
                    i.isInvalid
                  )("ng-pending", i.isPending)("ng-submitted", i.isSubmitted);
              },
              features: [ee],
            })),
            n
          );
        })();
      const pa = "VALID",
        uu = "INVALID",
        Bo = "PENDING",
        ma = "DISABLED";
      function gm(n) {
        return (du(n) ? n.validators : n) || null;
      }
      function l0(n) {
        return Array.isArray(n) ? um(n) : n || null;
      }
      function _m(n, t) {
        return (du(t) ? t.asyncValidators : n) || null;
      }
      function c0(n) {
        return Array.isArray(n) ? dm(n) : n || null;
      }
      function du(n) {
        return null != n && !Array.isArray(n) && "object" == typeof n;
      }
      class h0 {
        constructor(t, e) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = l0(this._rawValidators)),
            (this._composedAsyncValidatorFn = c0(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === pa;
        }
        get invalid() {
          return this.status === uu;
        }
        get pending() {
          return this.status == Bo;
        }
        get disabled() {
          return this.status === ma;
        }
        get enabled() {
          return this.status !== ma;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = l0(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = c0(t));
        }
        addValidators(t) {
          this.setValidators(n0(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(n0(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(r0(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(r0(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return au(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return au(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((e) => {
              e.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((e) => {
              e.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Bo),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = ma),
            (this.errors = null),
            this._forEachChild((i) => {
              i.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach((i) => i(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = pa),
            this._forEachChild((i) => {
              i.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: e }),
            this._onDisabledChange.forEach((i) => i(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === pa || this.status === Bo) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? ma : pa;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Bo), (this._hasOwnPendingAsyncValidator = !0);
            const e = qM(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((i) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(i, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          let e = t;
          return null == e ||
            (Array.isArray(e) || (e = e.split(".")), 0 === e.length)
            ? null
            : e.reduce((i, r) => i && i._find(r), this);
        }
        getError(t, e) {
          const i = e ? this.get(e) : this;
          return i && i.errors ? i.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Se()), (this.statusChanges = new Se());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? ma
            : this.errors
            ? uu
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Bo)
            ? Bo
            : this._anyControlsHaveStatus(uu)
            ? uu
            : pa;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          du(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
      }
      class ym extends h0 {
        constructor(t, e, i) {
          super(gm(e), _m(i, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e, i = {}) {
          this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, e = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: e.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, e, i = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity({ emitEvent: i.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          (function d0(n, t, e) {
            n._forEachChild((i, r) => {
              if (void 0 === e[r]) throw new C(1002, "");
            });
          })(this, 0, t),
            Object.keys(t).forEach((i) => {
              (function u0(n, t, e) {
                const i = n.controls;
                if (!(t ? Object.keys(i) : i).length) throw new C(1e3, "");
                if (!i[e]) throw new C(1001, "");
              })(this, !0, i),
                this.controls[i].setValue(t[i], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          null != t &&
            (Object.keys(t).forEach((i) => {
              const r = this.controls[i];
              r && r.patchValue(t[i], { onlySelf: !0, emitEvent: e.emitEvent });
            }),
            this.updateValueAndValidity(e));
        }
        reset(t = {}, e = {}) {
          this._forEachChild((i, r) => {
            i.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, i) => ((t[i] = e.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (e, i) => !!i._syncPendingControls() || e
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => {
            const i = this.controls[e];
            i && t(i, e);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [e, i] of Object.entries(this.controls))
            if (this.contains(e) && t(i)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (e, i, r) => ((i.enabled || this.disabled) && (e[r] = i.value), e)
          );
        }
        _reduceChildren(t, e) {
          let i = t;
          return (
            this._forEachChild((r, o) => {
              i = e(i, r, o);
            }),
            i
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      function ga(n, t) {
        vm(n, t),
          t.valueAccessor.writeValue(n.value),
          n.disabled && t.valueAccessor.setDisabledState?.(!0),
          (function vU(n, t) {
            t.valueAccessor.registerOnChange((e) => {
              (n._pendingValue = e),
                (n._pendingChange = !0),
                (n._pendingDirty = !0),
                "change" === n.updateOn && f0(n, t);
            });
          })(n, t),
          (function CU(n, t) {
            const e = (i, r) => {
              t.valueAccessor.writeValue(i), r && t.viewToModelUpdate(i);
            };
            n.registerOnChange(e),
              t._registerOnDestroy(() => {
                n._unregisterOnChange(e);
              });
          })(n, t),
          (function bU(n, t) {
            t.valueAccessor.registerOnTouched(() => {
              (n._pendingTouched = !0),
                "blur" === n.updateOn && n._pendingChange && f0(n, t),
                "submit" !== n.updateOn && n.markAsTouched();
            });
          })(n, t),
          (function yU(n, t) {
            if (t.valueAccessor.setDisabledState) {
              const e = (i) => {
                t.valueAccessor.setDisabledState(i);
              };
              n.registerOnDisabledChange(e),
                t._registerOnDestroy(() => {
                  n._unregisterOnDisabledChange(e);
                });
            }
          })(n, t);
      }
      function fu(n, t, e = !0) {
        const i = () => {};
        t.valueAccessor &&
          (t.valueAccessor.registerOnChange(i),
          t.valueAccessor.registerOnTouched(i)),
          mu(n, t),
          n &&
            (t._invokeOnDestroyCallbacks(),
            n._registerOnCollectionChange(() => {}));
      }
      function pu(n, t) {
        n.forEach((e) => {
          e.registerOnValidatorChange && e.registerOnValidatorChange(t);
        });
      }
      function vm(n, t) {
        const e = e0(n);
        null !== t.validator
          ? n.setValidators(JM(e, t.validator))
          : "function" == typeof e && n.setValidators([e]);
        const i = t0(n);
        null !== t.asyncValidator
          ? n.setAsyncValidators(JM(i, t.asyncValidator))
          : "function" == typeof i && n.setAsyncValidators([i]);
        const r = () => n.updateValueAndValidity();
        pu(t._rawValidators, r), pu(t._rawAsyncValidators, r);
      }
      function mu(n, t) {
        let e = !1;
        if (null !== n) {
          if (null !== t.validator) {
            const r = e0(n);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter((s) => s !== t.validator);
              o.length !== r.length && ((e = !0), n.setValidators(o));
            }
          }
          if (null !== t.asyncValidator) {
            const r = t0(n);
            if (Array.isArray(r) && r.length > 0) {
              const o = r.filter((s) => s !== t.asyncValidator);
              o.length !== r.length && ((e = !0), n.setAsyncValidators(o));
            }
          }
        }
        const i = () => {};
        return pu(t._rawValidators, i), pu(t._rawAsyncValidators, i), e;
      }
      function f0(n, t) {
        n._pendingDirty && n.markAsDirty(),
          n.setValue(n._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(n._pendingValue),
          (n._pendingChange = !1);
      }
      function p0(n, t) {
        vm(n, t);
      }
      function g0(n, t) {
        n._syncPendingControls(),
          t.forEach((e) => {
            const i = e.control;
            "submit" === i.updateOn &&
              i._pendingChange &&
              (e.viewToModelUpdate(i._pendingValue), (i._pendingChange = !1));
          });
      }
      const SU = { provide: xt, useExisting: we(() => Sr) },
        _a = (() => Promise.resolve(null))();
      let Sr = (() => {
        class n extends xt {
          constructor(e, i) {
            super(),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new Se()),
              (this.form = new ym({}, um(e), dm(i)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(e) {
            _a.then(() => {
              const i = this._findContainer(e.path);
              (e.control = i.registerControl(e.name, e.control)),
                ga(e.control, e),
                e.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(e);
            });
          }
          getControl(e) {
            return this.form.get(e.path);
          }
          removeControl(e) {
            _a.then(() => {
              const i = this._findContainer(e.path);
              i && i.removeControl(e.name), this._directives.delete(e);
            });
          }
          addFormGroup(e) {
            _a.then(() => {
              const i = this._findContainer(e.path),
                r = new ym({});
              p0(r, e),
                i.registerControl(e.name, r),
                r.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(e) {
            _a.then(() => {
              const i = this._findContainer(e.path);
              i && i.removeControl(e.name);
            });
          }
          getFormGroup(e) {
            return this.form.get(e.path);
          }
          updateModel(e, i) {
            _a.then(() => {
              this.form.get(e.path).setValue(i);
            });
          }
          setValue(e) {
            this.control.setValue(e);
          }
          onSubmit(e) {
            return (
              (this.submitted = !0),
              g0(this.form, this._directives),
              this.ngSubmit.emit(e),
              !1
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(e) {
            this.form.reset(e), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(e) {
            return e.pop(), e.length ? this.form.get(e) : this.form;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(yt, 10), g(Hi, 10));
          }),
          (n.ɵdir = F({
            type: n,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (e, i) {
              1 & e &&
                W("submit", function (o) {
                  return i.onSubmit(o);
                })("reset", function () {
                  return i.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [Me([SU]), ee],
          })),
          n
        );
      })();
      function _0(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      function y0(n) {
        return (
          "object" == typeof n &&
          null !== n &&
          2 === Object.keys(n).length &&
          "value" in n &&
          "disabled" in n
        );
      }
      const v0 = class extends h0 {
          constructor(t = null, e, i) {
            super(gm(e), _m(i, e)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(e),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              du(e) &&
                (e.nonNullable || e.initialValueIsDefault) &&
                (this.defaultValue = y0(t) ? t.value : t);
          }
          setValue(t, e = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== e.emitModelToViewChange &&
                this._onChange.forEach((i) =>
                  i(this.value, !1 !== e.emitViewToModelChange)
                ),
              this.updateValueAndValidity(e);
          }
          patchValue(t, e = {}) {
            this.setValue(t, e);
          }
          reset(t = this.defaultValue, e = {}) {
            this._applyFormState(t),
              this.markAsPristine(e),
              this.markAsUntouched(e),
              this.setValue(this.value, e),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            _0(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            _0(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            y0(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        IU = { provide: vi, useExisting: we(() => Ar) },
        D0 = (() => Promise.resolve(null))();
      let Ar = (() => {
          class n extends vi {
            constructor(e, i, r, o, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new v0()),
                (this._registered = !1),
                (this.update = new Se()),
                (this._parent = e),
                this._setValidators(i),
                this._setAsyncValidators(r),
                (this.valueAccessor = (function Cm(n, t) {
                  if (!t) return null;
                  let e, i, r;
                  return (
                    Array.isArray(t),
                    t.forEach((o) => {
                      o.constructor === Bi
                        ? (e = o)
                        : (function EU(n) {
                            return Object.getPrototypeOf(n.constructor) === Mr;
                          })(o)
                        ? (i = o)
                        : (r = o);
                    }),
                    r || i || e || null
                  );
                })(0, o));
            }
            ngOnChanges(e) {
              if ((this._checkForErrors(), !this._registered || "name" in e)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const i = e.name.previousValue;
                  this.formDirective.removeControl({
                    name: i,
                    path: this._getPath(i),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in e && this._updateDisabled(e),
                (function bm(n, t) {
                  if (!n.hasOwnProperty("model")) return !1;
                  const e = n.model;
                  return !!e.isFirstChange() || !Object.is(t, e.currentValue);
                })(e, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(e) {
              (this.viewModel = e), this.update.emit(e);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              ga(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(e) {
              D0.then(() => {
                this.control.setValue(e, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(e) {
              const i = e.isDisabled.currentValue,
                r = 0 !== i && ui(i);
              D0.then(() => {
                r && !this.control.disabled
                  ? this.control.disable()
                  : !r && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(e) {
              return this._parent
                ? (function hu(n, t) {
                    return [...t.path, n];
                  })(e, this._parent)
                : [e];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(xt, 9),
                g(yt, 10),
                g(Hi, 10),
                g(Yn, 10),
                g(cr, 8)
              );
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [Me([IU]), ee, Ot],
            })),
            n
          );
        })(),
        gu = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            n
          );
        })(),
        E0 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })();
      const PU = { provide: xt, useExisting: we(() => _u) };
      let _u = (() => {
          class n extends xt {
            constructor(e, i) {
              super(),
                (this.validators = e),
                (this.asyncValidators = i),
                (this.submitted = !1),
                (this._onCollectionChange = () => this._updateDomValue()),
                (this.directives = []),
                (this.form = null),
                (this.ngSubmit = new Se()),
                this._setValidators(e),
                this._setAsyncValidators(i);
            }
            ngOnChanges(e) {
              this._checkFormPresent(),
                e.hasOwnProperty("form") &&
                  (this._updateValidators(),
                  this._updateDomValue(),
                  this._updateRegistrations(),
                  (this._oldForm = this.form));
            }
            ngOnDestroy() {
              this.form &&
                (mu(this.form, this),
                this.form._onCollectionChange === this._onCollectionChange &&
                  this.form._registerOnCollectionChange(() => {}));
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            addControl(e) {
              const i = this.form.get(e.path);
              return (
                ga(i, e),
                i.updateValueAndValidity({ emitEvent: !1 }),
                this.directives.push(e),
                i
              );
            }
            getControl(e) {
              return this.form.get(e.path);
            }
            removeControl(e) {
              fu(e.control || null, e, !1),
                (function MU(n, t) {
                  const e = n.indexOf(t);
                  e > -1 && n.splice(e, 1);
                })(this.directives, e);
            }
            addFormGroup(e) {
              this._setUpFormContainer(e);
            }
            removeFormGroup(e) {
              this._cleanUpFormContainer(e);
            }
            getFormGroup(e) {
              return this.form.get(e.path);
            }
            addFormArray(e) {
              this._setUpFormContainer(e);
            }
            removeFormArray(e) {
              this._cleanUpFormContainer(e);
            }
            getFormArray(e) {
              return this.form.get(e.path);
            }
            updateModel(e, i) {
              this.form.get(e.path).setValue(i);
            }
            onSubmit(e) {
              return (
                (this.submitted = !0),
                g0(this.form, this.directives),
                this.ngSubmit.emit(e),
                !1
              );
            }
            onReset() {
              this.resetForm();
            }
            resetForm(e) {
              this.form.reset(e), (this.submitted = !1);
            }
            _updateDomValue() {
              this.directives.forEach((e) => {
                const i = e.control,
                  r = this.form.get(e.path);
                i !== r &&
                  (fu(i || null, e),
                  ((n) => n instanceof v0)(r) && (ga(r, e), (e.control = r)));
              }),
                this.form._updateTreeValidity({ emitEvent: !1 });
            }
            _setUpFormContainer(e) {
              const i = this.form.get(e.path);
              p0(i, e), i.updateValueAndValidity({ emitEvent: !1 });
            }
            _cleanUpFormContainer(e) {
              if (this.form) {
                const i = this.form.get(e.path);
                i &&
                  (function DU(n, t) {
                    return mu(n, t);
                  })(i, e) &&
                  i.updateValueAndValidity({ emitEvent: !1 });
              }
            }
            _updateRegistrations() {
              this.form._registerOnCollectionChange(this._onCollectionChange),
                this._oldForm &&
                  this._oldForm._registerOnCollectionChange(() => {});
            }
            _updateValidators() {
              vm(this.form, this), this._oldForm && mu(this._oldForm, this);
            }
            _checkFormPresent() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(yt, 10), g(Hi, 10));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["", "formGroup", ""]],
              hostBindings: function (e, i) {
                1 & e &&
                  W("submit", function (o) {
                    return i.onSubmit(o);
                  })("reset", function () {
                    return i.onReset();
                  });
              },
              inputs: { form: ["formGroup", "form"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [Me([PU]), ee, Ot],
            })),
            n
          );
        })(),
        Tr = (() => {
          class n {
            constructor() {
              this._validator = su;
            }
            ngOnChanges(e) {
              if (this.inputName in e) {
                const i = this.normalizeInput(e[this.inputName].currentValue);
                (this._enabled = this.enabled(i)),
                  (this._validator = this._enabled
                    ? this.createValidator(i)
                    : su),
                  this._onChange && this._onChange();
              }
            }
            validate(e) {
              return this._validator(e);
            }
            registerOnValidatorChange(e) {
              this._onChange = e;
            }
            enabled(e) {
              return null != e;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({ type: n, features: [Ot] })),
            n
          );
        })();
      const qU = { provide: yt, useExisting: we(() => ya), multi: !0 };
      let ya = (() => {
          class n extends Tr {
            constructor() {
              super(...arguments),
                (this.inputName = "required"),
                (this.normalizeInput = ui),
                (this.createValidator = (e) => jM);
            }
            enabled(e) {
              return e;
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = ut(n)))(i || n);
              };
            })()),
            (n.ɵdir = F({
              type: n,
              selectors: [
                [
                  "",
                  "required",
                  "",
                  "formControlName",
                  "",
                  3,
                  "type",
                  "checkbox",
                ],
                ["", "required", "", "formControl", "", 3, "type", "checkbox"],
                ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
              ],
              hostVars: 1,
              hostBindings: function (e, i) {
                2 & e && ot("required", i._enabled ? "" : null);
              },
              inputs: { required: "required" },
              features: [Me([qU]), ee],
            })),
            n
          );
        })(),
        JU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [E0] })),
            n
          );
        })(),
        e$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [JU] })),
            n
          );
        })();
      const n$ = ["addListener", "removeListener"],
        i$ = ["addEventListener", "removeEventListener"],
        r$ = ["on", "off"];
      function yu(n, t, e, i) {
        if ((ce(e) && ((i = e), (e = void 0)), i))
          return yu(n, t, e).pipe($f(i));
        const [r, o] = (function a$(n) {
          return ce(n.addEventListener) && ce(n.removeEventListener);
        })(n)
          ? i$.map((s) => (a) => n[s](t, a, e))
          : (function o$(n) {
              return ce(n.addListener) && ce(n.removeListener);
            })(n)
          ? n$.map(U0(n, t))
          : (function s$(n) {
              return ce(n.on) && ce(n.off);
            })(n)
          ? r$.map(U0(n, t))
          : [];
        if (!r && Nu(n)) return it((s) => yu(s, t, e))(Rt(n));
        if (!r) throw new TypeError("Invalid event target");
        return new De((s) => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return r(a), () => o(a);
        });
      }
      function U0(n, t) {
        return (e) => (i) => n[e](t, i);
      }
      const l$ = ["connectionContainer"],
        c$ = ["inputContainer"],
        u$ = ["label"];
      function d$(n, t) {
        1 & n &&
          (Ms(0),
          R(1, "div", 14),
          Ve(2, "div", 15)(3, "div", 16)(4, "div", 17),
          x(),
          R(5, "div", 18),
          Ve(6, "div", 15)(7, "div", 16)(8, "div", 17),
          x(),
          Ss());
      }
      function h$(n, t) {
        if (1 & n) {
          const e = yo();
          R(0, "div", 19),
            W("cdkObserveContent", function () {
              return Fn(e), On(Mt().updateOutlineGap());
            }),
            at(1, 1),
            x();
        }
        2 & n && se("cdkObserveContentDisabled", "outline" != Mt().appearance);
      }
      function f$(n, t) {
        if (
          (1 & n && (Ms(0), at(1, 2), R(2, "span"), ie(3), x(), Ss()), 2 & n)
        ) {
          const e = Mt(2);
          q(3), li(e._control.placeholder);
        }
      }
      function p$(n, t) {
        1 & n && at(0, 3, ["*ngSwitchCase", "true"]);
      }
      function m$(n, t) {
        1 & n && (R(0, "span", 23), ie(1, " *"), x());
      }
      function g$(n, t) {
        if (1 & n) {
          const e = yo();
          R(0, "label", 20, 21),
            W("cdkObserveContent", function () {
              return Fn(e), On(Mt().updateOutlineGap());
            }),
            st(2, f$, 4, 1, "ng-container", 12),
            st(3, p$, 1, 0, "ng-content", 12),
            st(4, m$, 2, 0, "span", 22),
            x();
        }
        if (2 & n) {
          const e = Mt();
          St("mat-empty", e._control.empty && !e._shouldAlwaysFloat())(
            "mat-form-field-empty",
            e._control.empty && !e._shouldAlwaysFloat()
          )("mat-accent", "accent" == e.color)("mat-warn", "warn" == e.color),
            se("cdkObserveContentDisabled", "outline" != e.appearance)(
              "id",
              e._labelId
            )("ngSwitch", e._hasLabel()),
            ot("for", e._control.id)("aria-owns", e._control.id),
            q(2),
            se("ngSwitchCase", !1),
            q(1),
            se("ngSwitchCase", !0),
            q(1),
            se(
              "ngIf",
              !e.hideRequiredMarker &&
                e._control.required &&
                !e._control.disabled
            );
        }
      }
      function _$(n, t) {
        1 & n && (R(0, "div", 24), at(1, 4), x());
      }
      function y$(n, t) {
        if ((1 & n && (R(0, "div", 25), Ve(1, "span", 26), x()), 2 & n)) {
          const e = Mt();
          q(1),
            St("mat-accent", "accent" == e.color)(
              "mat-warn",
              "warn" == e.color
            );
        }
      }
      function v$(n, t) {
        1 & n && (R(0, "div"), at(1, 5), x()),
          2 & n && se("@transitionMessages", Mt()._subscriptAnimationState);
      }
      function b$(n, t) {
        if ((1 & n && (R(0, "div", 30), ie(1), x()), 2 & n)) {
          const e = Mt(2);
          se("id", e._hintLabelId), q(1), li(e.hintLabel);
        }
      }
      function C$(n, t) {
        if (
          (1 & n &&
            (R(0, "div", 27),
            st(1, b$, 2, 2, "div", 28),
            at(2, 6),
            Ve(3, "div", 29),
            at(4, 7),
            x()),
          2 & n)
        ) {
          const e = Mt();
          se("@transitionMessages", e._subscriptAnimationState),
            q(1),
            se("ngIf", e.hintLabel);
        }
      }
      const D$ = [
          "*",
          [["", "matPrefix", ""]],
          [["mat-placeholder"]],
          [["mat-label"]],
          [["", "matSuffix", ""]],
          [["mat-error"]],
          [["mat-hint", 3, "align", "end"]],
          [["mat-hint", "align", "end"]],
        ],
        w$ = [
          "*",
          "[matPrefix]",
          "mat-placeholder",
          "mat-label",
          "[matSuffix]",
          "mat-error",
          "mat-hint:not([align='end'])",
          "mat-hint[align='end']",
        ],
        E$ = new E("MatError"),
        M$ = {
          transitionMessages: Sp("transitionMessages", [
            ia("enter", xn({ opacity: 1, transform: "translateY(0%)" })),
            ra("void => enter", [
              xn({ opacity: 0, transform: "translateY(-5px)" }),
              na("300ms cubic-bezier(0.55, 0, 0.55, 0.2)"),
            ]),
          ]),
        };
      let Sm = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵdir = F({ type: n })),
          n
        );
      })();
      const S$ = new E("MatHint");
      let $0 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({ type: n, selectors: [["mat-label"]] })),
            n
          );
        })(),
        A$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({ type: n, selectors: [["mat-placeholder"]] })),
            n
          );
        })();
      const T$ = new E("MatPrefix"),
        I$ = new E("MatSuffix");
      let z0 = 0;
      const R$ = nu(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          },
          "primary"
        ),
        k$ = new E("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
        W0 = new E("MatFormField");
      let q0 = (() => {
          class n extends R$ {
            constructor(e, i, r, o, s, a, l) {
              super(e),
                (this._changeDetectorRef = i),
                (this._dir = r),
                (this._defaults = o),
                (this._platform = s),
                (this._ngZone = a),
                (this._outlineGapCalculationNeededImmediately = !1),
                (this._outlineGapCalculationNeededOnStable = !1),
                (this._destroyed = new te()),
                (this._hideRequiredMarker = !1),
                (this._showAlwaysAnimate = !1),
                (this._subscriptAnimationState = ""),
                (this._hintLabel = ""),
                (this._hintLabelId = "mat-hint-" + z0++),
                (this._labelId = "mat-form-field-label-" + z0++),
                (this.floatLabel = this._getDefaultFloatLabelState()),
                (this._animationsEnabled = "NoopAnimations" !== l),
                (this.appearance = o?.appearance || "legacy"),
                o &&
                  ((this._hideRequiredMarker = Boolean(o.hideRequiredMarker)),
                  o.color && (this.color = this.defaultColor = o.color));
            }
            get appearance() {
              return this._appearance;
            }
            set appearance(e) {
              const i = this._appearance;
              (this._appearance = e || this._defaults?.appearance || "legacy"),
                "outline" === this._appearance &&
                  i !== e &&
                  (this._outlineGapCalculationNeededOnStable = !0);
            }
            get hideRequiredMarker() {
              return this._hideRequiredMarker;
            }
            set hideRequiredMarker(e) {
              this._hideRequiredMarker = Vi(e);
            }
            _shouldAlwaysFloat() {
              return "always" === this.floatLabel && !this._showAlwaysAnimate;
            }
            _canLabelFloat() {
              return "never" !== this.floatLabel;
            }
            get hintLabel() {
              return this._hintLabel;
            }
            set hintLabel(e) {
              (this._hintLabel = e), this._processHints();
            }
            get floatLabel() {
              return "legacy" !== this.appearance &&
                "never" === this._floatLabel
                ? "auto"
                : this._floatLabel;
            }
            set floatLabel(e) {
              e !== this._floatLabel &&
                ((this._floatLabel = e || this._getDefaultFloatLabelState()),
                this._changeDetectorRef.markForCheck());
            }
            get _control() {
              return (
                this._explicitFormFieldControl ||
                this._controlNonStatic ||
                this._controlStatic
              );
            }
            set _control(e) {
              this._explicitFormFieldControl = e;
            }
            getLabelId() {
              return this._hasFloatingLabel() ? this._labelId : null;
            }
            getConnectedOverlayOrigin() {
              return this._connectionContainerRef || this._elementRef;
            }
            ngAfterContentInit() {
              this._validateControlChild();
              const e = this._control;
              e.controlType &&
                this._elementRef.nativeElement.classList.add(
                  `mat-form-field-type-${e.controlType}`
                ),
                e.stateChanges.pipe(fr(null)).subscribe(() => {
                  this._validatePlaceholders(),
                    this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                e.ngControl &&
                  e.ngControl.valueChanges &&
                  e.ngControl.valueChanges
                    .pipe(wr(this._destroyed))
                    .subscribe(() => this._changeDetectorRef.markForCheck()),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable
                    .pipe(wr(this._destroyed))
                    .subscribe(() => {
                      this._outlineGapCalculationNeededOnStable &&
                        this.updateOutlineGap();
                    });
                }),
                Ra(
                  this._prefixChildren.changes,
                  this._suffixChildren.changes
                ).subscribe(() => {
                  (this._outlineGapCalculationNeededOnStable = !0),
                    this._changeDetectorRef.markForCheck();
                }),
                this._hintChildren.changes.pipe(fr(null)).subscribe(() => {
                  this._processHints(), this._changeDetectorRef.markForCheck();
                }),
                this._errorChildren.changes.pipe(fr(null)).subscribe(() => {
                  this._syncDescribedByIds(),
                    this._changeDetectorRef.markForCheck();
                }),
                this._dir &&
                  this._dir.change.pipe(wr(this._destroyed)).subscribe(() => {
                    "function" == typeof requestAnimationFrame
                      ? this._ngZone.runOutsideAngular(() => {
                          requestAnimationFrame(() => this.updateOutlineGap());
                        })
                      : this.updateOutlineGap();
                  });
            }
            ngAfterContentChecked() {
              this._validateControlChild(),
                this._outlineGapCalculationNeededImmediately &&
                  this.updateOutlineGap();
            }
            ngAfterViewInit() {
              (this._subscriptAnimationState = "enter"),
                this._changeDetectorRef.detectChanges();
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            _shouldForward(e) {
              const i = this._control ? this._control.ngControl : null;
              return i && i[e];
            }
            _hasPlaceholder() {
              return !!(
                (this._control && this._control.placeholder) ||
                this._placeholderChild
              );
            }
            _hasLabel() {
              return !(!this._labelChildNonStatic && !this._labelChildStatic);
            }
            _shouldLabelFloat() {
              return (
                this._canLabelFloat() &&
                ((this._control && this._control.shouldLabelFloat) ||
                  this._shouldAlwaysFloat())
              );
            }
            _hideControlPlaceholder() {
              return (
                ("legacy" === this.appearance && !this._hasLabel()) ||
                (this._hasLabel() && !this._shouldLabelFloat())
              );
            }
            _hasFloatingLabel() {
              return (
                this._hasLabel() ||
                ("legacy" === this.appearance && this._hasPlaceholder())
              );
            }
            _getDisplayedMessages() {
              return this._errorChildren &&
                this._errorChildren.length > 0 &&
                this._control.errorState
                ? "error"
                : "hint";
            }
            _animateAndLockLabel() {
              this._hasFloatingLabel() &&
                this._canLabelFloat() &&
                (this._animationsEnabled &&
                  this._label &&
                  ((this._showAlwaysAnimate = !0),
                  yu(this._label.nativeElement, "transitionend")
                    .pipe(Lt(1))
                    .subscribe(() => {
                      this._showAlwaysAnimate = !1;
                    })),
                (this.floatLabel = "always"),
                this._changeDetectorRef.markForCheck());
            }
            _validatePlaceholders() {}
            _processHints() {
              this._validateHints(), this._syncDescribedByIds();
            }
            _validateHints() {}
            _getDefaultFloatLabelState() {
              return (this._defaults && this._defaults.floatLabel) || "auto";
            }
            _syncDescribedByIds() {
              if (this._control) {
                let e = [];
                if (
                  (this._control.userAriaDescribedBy &&
                    "string" == typeof this._control.userAriaDescribedBy &&
                    e.push(...this._control.userAriaDescribedBy.split(" ")),
                  "hint" === this._getDisplayedMessages())
                ) {
                  const i = this._hintChildren
                      ? this._hintChildren.find((o) => "start" === o.align)
                      : null,
                    r = this._hintChildren
                      ? this._hintChildren.find((o) => "end" === o.align)
                      : null;
                  i
                    ? e.push(i.id)
                    : this._hintLabel && e.push(this._hintLabelId),
                    r && e.push(r.id);
                } else
                  this._errorChildren &&
                    e.push(...this._errorChildren.map((i) => i.id));
                this._control.setDescribedByIds(e);
              }
            }
            _validateControlChild() {}
            updateOutlineGap() {
              const e = this._label ? this._label.nativeElement : null,
                i = this._connectionContainerRef.nativeElement,
                r = ".mat-form-field-outline-start",
                o = ".mat-form-field-outline-gap";
              if ("outline" !== this.appearance || !this._platform.isBrowser)
                return;
              if (!e || !e.children.length || !e.textContent.trim()) {
                const u = i.querySelectorAll(`${r}, ${o}`);
                for (let d = 0; d < u.length; d++) u[d].style.width = "0";
                return;
              }
              if (!this._isAttachedToDOM())
                return void (this._outlineGapCalculationNeededImmediately = !0);
              let s = 0,
                a = 0;
              const l = i.querySelectorAll(r),
                c = i.querySelectorAll(o);
              if (this._label && this._label.nativeElement.children.length) {
                const u = i.getBoundingClientRect();
                if (0 === u.width && 0 === u.height)
                  return (
                    (this._outlineGapCalculationNeededOnStable = !0),
                    void (this._outlineGapCalculationNeededImmediately = !1)
                  );
                const d = this._getStartEnd(u),
                  h = e.children,
                  f = this._getStartEnd(h[0].getBoundingClientRect());
                let p = 0;
                for (let m = 0; m < h.length; m++) p += h[m].offsetWidth;
                (s = Math.abs(f - d) - 5), (a = p > 0 ? 0.75 * p + 10 : 0);
              }
              for (let u = 0; u < l.length; u++) l[u].style.width = `${s}px`;
              for (let u = 0; u < c.length; u++) c[u].style.width = `${a}px`;
              this._outlineGapCalculationNeededOnStable =
                this._outlineGapCalculationNeededImmediately = !1;
            }
            _getStartEnd(e) {
              return this._dir && "rtl" === this._dir.value ? e.right : e.left;
            }
            _isAttachedToDOM() {
              const e = this._elementRef.nativeElement;
              if (e.getRootNode) {
                const i = e.getRootNode();
                return i && i !== e;
              }
              return document.documentElement.contains(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(ve),
                g(cr),
                g(tu, 8),
                g(k$, 8),
                g(_t),
                g(Q),
                g(Ii, 8)
              );
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-form-field"]],
              contentQueries: function (e, i, r) {
                if (
                  (1 & e &&
                    (qt(r, Sm, 5),
                    qt(r, Sm, 7),
                    qt(r, $0, 5),
                    qt(r, $0, 7),
                    qt(r, A$, 5),
                    qt(r, E$, 5),
                    qt(r, S$, 5),
                    qt(r, T$, 5),
                    qt(r, I$, 5)),
                  2 & e)
                ) {
                  let o;
                  Xe((o = Je())) && (i._controlNonStatic = o.first),
                    Xe((o = Je())) && (i._controlStatic = o.first),
                    Xe((o = Je())) && (i._labelChildNonStatic = o.first),
                    Xe((o = Je())) && (i._labelChildStatic = o.first),
                    Xe((o = Je())) && (i._placeholderChild = o.first),
                    Xe((o = Je())) && (i._errorChildren = o),
                    Xe((o = Je())) && (i._hintChildren = o),
                    Xe((o = Je())) && (i._prefixChildren = o),
                    Xe((o = Je())) && (i._suffixChildren = o);
                }
              },
              viewQuery: function (e, i) {
                if ((1 & e && (lr(l$, 7), lr(c$, 5), lr(u$, 5)), 2 & e)) {
                  let r;
                  Xe((r = Je())) && (i._connectionContainerRef = r.first),
                    Xe((r = Je())) && (i._inputContainerRef = r.first),
                    Xe((r = Je())) && (i._label = r.first);
                }
              },
              hostAttrs: [1, "mat-form-field"],
              hostVars: 40,
              hostBindings: function (e, i) {
                2 & e &&
                  St(
                    "mat-form-field-appearance-standard",
                    "standard" == i.appearance
                  )("mat-form-field-appearance-fill", "fill" == i.appearance)(
                    "mat-form-field-appearance-outline",
                    "outline" == i.appearance
                  )(
                    "mat-form-field-appearance-legacy",
                    "legacy" == i.appearance
                  )("mat-form-field-invalid", i._control.errorState)(
                    "mat-form-field-can-float",
                    i._canLabelFloat()
                  )("mat-form-field-should-float", i._shouldLabelFloat())(
                    "mat-form-field-has-label",
                    i._hasFloatingLabel()
                  )(
                    "mat-form-field-hide-placeholder",
                    i._hideControlPlaceholder()
                  )("mat-form-field-disabled", i._control.disabled)(
                    "mat-form-field-autofilled",
                    i._control.autofilled
                  )("mat-focused", i._control.focused)(
                    "ng-untouched",
                    i._shouldForward("untouched")
                  )("ng-touched", i._shouldForward("touched"))(
                    "ng-pristine",
                    i._shouldForward("pristine")
                  )("ng-dirty", i._shouldForward("dirty"))(
                    "ng-valid",
                    i._shouldForward("valid")
                  )("ng-invalid", i._shouldForward("invalid"))(
                    "ng-pending",
                    i._shouldForward("pending")
                  )("_mat-animation-noopable", !i._animationsEnabled);
              },
              inputs: {
                color: "color",
                appearance: "appearance",
                hideRequiredMarker: "hideRequiredMarker",
                hintLabel: "hintLabel",
                floatLabel: "floatLabel",
              },
              exportAs: ["matFormField"],
              features: [Me([{ provide: W0, useExisting: n }]), ee],
              ngContentSelectors: w$,
              decls: 15,
              vars: 8,
              consts: [
                [1, "mat-form-field-wrapper"],
                [1, "mat-form-field-flex", 3, "click"],
                ["connectionContainer", ""],
                [4, "ngIf"],
                [
                  "class",
                  "mat-form-field-prefix",
                  3,
                  "cdkObserveContentDisabled",
                  "cdkObserveContent",
                  4,
                  "ngIf",
                ],
                [1, "mat-form-field-infix"],
                ["inputContainer", ""],
                [1, "mat-form-field-label-wrapper"],
                [
                  "class",
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "mat-empty",
                  "mat-form-field-empty",
                  "mat-accent",
                  "mat-warn",
                  "ngSwitch",
                  "cdkObserveContent",
                  4,
                  "ngIf",
                ],
                ["class", "mat-form-field-suffix", 4, "ngIf"],
                ["class", "mat-form-field-underline", 4, "ngIf"],
                [1, "mat-form-field-subscript-wrapper", 3, "ngSwitch"],
                [4, "ngSwitchCase"],
                ["class", "mat-form-field-hint-wrapper", 4, "ngSwitchCase"],
                [1, "mat-form-field-outline"],
                [1, "mat-form-field-outline-start"],
                [1, "mat-form-field-outline-gap"],
                [1, "mat-form-field-outline-end"],
                [1, "mat-form-field-outline", "mat-form-field-outline-thick"],
                [
                  1,
                  "mat-form-field-prefix",
                  3,
                  "cdkObserveContentDisabled",
                  "cdkObserveContent",
                ],
                [
                  1,
                  "mat-form-field-label",
                  3,
                  "cdkObserveContentDisabled",
                  "id",
                  "ngSwitch",
                  "cdkObserveContent",
                ],
                ["label", ""],
                [
                  "class",
                  "mat-placeholder-required mat-form-field-required-marker",
                  "aria-hidden",
                  "true",
                  4,
                  "ngIf",
                ],
                [
                  "aria-hidden",
                  "true",
                  1,
                  "mat-placeholder-required",
                  "mat-form-field-required-marker",
                ],
                [1, "mat-form-field-suffix"],
                [1, "mat-form-field-underline"],
                [1, "mat-form-field-ripple"],
                [1, "mat-form-field-hint-wrapper"],
                ["class", "mat-hint", 3, "id", 4, "ngIf"],
                [1, "mat-form-field-hint-spacer"],
                [1, "mat-hint", 3, "id"],
              ],
              template: function (e, i) {
                1 & e &&
                  (or(D$),
                  R(0, "div", 0)(1, "div", 1, 2),
                  W("click", function (o) {
                    return (
                      i._control.onContainerClick &&
                      i._control.onContainerClick(o)
                    );
                  }),
                  st(3, d$, 9, 0, "ng-container", 3),
                  st(4, h$, 2, 1, "div", 4),
                  R(5, "div", 5, 6),
                  at(7),
                  R(8, "span", 7),
                  st(9, g$, 5, 16, "label", 8),
                  x()(),
                  st(10, _$, 2, 0, "div", 9),
                  x(),
                  st(11, y$, 2, 4, "div", 10),
                  R(12, "div", 11),
                  st(13, v$, 2, 1, "div", 12),
                  st(14, C$, 5, 2, "div", 13),
                  x()()),
                  2 & e &&
                    (q(3),
                    se("ngIf", "outline" == i.appearance),
                    q(1),
                    se("ngIf", i._prefixChildren.length),
                    q(5),
                    se("ngIf", i._hasFloatingLabel()),
                    q(1),
                    se("ngIf", i._suffixChildren.length),
                    q(1),
                    se("ngIf", "outline" != i.appearance),
                    q(1),
                    se("ngSwitch", i._getDisplayedMessages()),
                    q(1),
                    se("ngSwitchCase", "error"),
                    q(1),
                    se("ngSwitchCase", "hint"));
              },
              dependencies: [Rf, ec, hD, tH],
              styles: [
                ".mat-form-field{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-form-field{text-align:right}.mat-form-field-wrapper{position:relative}.mat-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-form-field-prefix,.mat-form-field-suffix{white-space:nowrap;flex:none;position:relative}.mat-form-field-infix{display:block;position:relative;flex:auto;min-width:0;width:180px}.cdk-high-contrast-active .mat-form-field-infix{border-image:linear-gradient(transparent, transparent)}.mat-form-field-label-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;pointer-events:none}[dir=rtl] .mat-form-field-label-wrapper{left:auto;right:0}.mat-form-field-label{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform-origin:0 0;transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1),color 400ms cubic-bezier(0.25, 0.8, 0.25, 1),width 400ms cubic-bezier(0.25, 0.8, 0.25, 1);display:none}[dir=rtl] .mat-form-field-label{transform-origin:100% 0;left:auto;right:0}.cdk-high-contrast-active .mat-form-field-disabled .mat-form-field-label{color:GrayText}.mat-form-field-empty.mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{display:block}.mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{display:block;transition:none}.mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:none}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float .mat-input-server[placeholder]:not(:placeholder-shown)+.mat-form-field-label-wrapper .mat-form-field-label{display:block}.mat-form-field-label:not(.mat-form-field-empty){transition:none}.mat-form-field-underline{position:absolute;width:100%;pointer-events:none;transform:scale3d(1, 1.0001, 1)}.mat-form-field-ripple{position:absolute;left:0;width:100%;transform-origin:50%;transform:scaleX(0.5);opacity:0;transition:background-color 300ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-form-field.mat-focused .mat-form-field-ripple,.mat-form-field.mat-form-field-invalid .mat-form-field-ripple{opacity:1;transform:none;transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1),opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1),background-color 300ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-subscript-wrapper{position:absolute;box-sizing:border-box;width:100%;overflow:hidden}.mat-form-field-subscript-wrapper .mat-icon,.mat-form-field-label-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-form-field-hint-wrapper{display:flex}.mat-form-field-hint-spacer{flex:1 0 1em}.mat-error{display:block}.mat-form-field-control-wrapper{position:relative}.mat-form-field-hint-end{order:1}.mat-form-field._mat-animation-noopable .mat-form-field-label,.mat-form-field._mat-animation-noopable .mat-form-field-ripple{transition:none}",
                '.mat-form-field-appearance-fill .mat-form-field-flex{border-radius:4px 4px 0 0;padding:.75em .75em 0 .75em}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-flex{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-form-field-flex{outline:dashed 3px}.mat-form-field-appearance-fill .mat-form-field-underline::before{content:"";display:block;position:absolute;bottom:0;height:1px;width:100%}.mat-form-field-appearance-fill .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-form-field-ripple{height:0}.mat-form-field-appearance-fill:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-fill._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}.mat-form-field-appearance-fill .mat-form-field-subscript-wrapper{padding:0 1em}',
                '.mat-input-element{font:inherit;background:rgba(0,0,0,0);color:currentColor;border:none;outline:none;padding:0;margin:0;width:100%;max-width:100%;vertical-align:bottom;text-align:inherit;box-sizing:content-box}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element,.mat-input-element::-webkit-search-cancel-button,.mat-input-element::-webkit-search-decoration,.mat-input-element::-webkit-search-results-button,.mat-input-element::-webkit-search-results-decoration{-webkit-appearance:none}.mat-input-element::-webkit-contacts-auto-fill-button,.mat-input-element::-webkit-caps-lock-indicator,.mat-input-element:not([type=password])::-webkit-credentials-auto-fill-button{visibility:hidden}.mat-input-element[type=date],.mat-input-element[type=datetime],.mat-input-element[type=datetime-local],.mat-input-element[type=month],.mat-input-element[type=week],.mat-input-element[type=time]{line-height:1}.mat-input-element[type=date]::after,.mat-input-element[type=datetime]::after,.mat-input-element[type=datetime-local]::after,.mat-input-element[type=month]::after,.mat-input-element[type=week]::after,.mat-input-element[type=time]::after{content:" ";white-space:pre;width:1px}.mat-input-element::-webkit-inner-spin-button,.mat-input-element::-webkit-calendar-picker-indicator,.mat-input-element::-webkit-clear-button{font-size:.75em}.mat-input-element::placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-moz-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element::-webkit-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-input-element:-ms-input-placeholder{-webkit-user-select:none;user-select:none;transition:color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-hide-placeholder .mat-input-element::placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-moz-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element::-webkit-input-placeholder{opacity:0}.mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,0) !important;-webkit-text-fill-color:rgba(0,0,0,0);transition:none}.cdk-high-contrast-active .mat-form-field-hide-placeholder .mat-input-element:-ms-input-placeholder{opacity:0}._mat-animation-noopable .mat-input-element::placeholder{transition:none}._mat-animation-noopable .mat-input-element::-moz-placeholder{transition:none}._mat-animation-noopable .mat-input-element::-webkit-input-placeholder{transition:none}._mat-animation-noopable .mat-input-element:-ms-input-placeholder{transition:none}textarea.mat-input-element{resize:vertical;overflow:auto}textarea.mat-input-element.cdk-textarea-autosize{resize:none}textarea.mat-input-element{padding:2px 0;margin:-2px 0}select.mat-input-element{-moz-appearance:none;-webkit-appearance:none;position:relative;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box;padding-top:1em;top:-1em;margin-bottom:-1em}select.mat-input-element::-moz-focus-inner{border:0}select.mat-input-element:not(:disabled){cursor:pointer}.mat-form-field-type-mat-native-select .mat-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;top:50%;right:0;margin-top:-2.5px;pointer-events:none}[dir=rtl] .mat-form-field-type-mat-native-select .mat-form-field-infix::after{right:auto;left:0}.mat-form-field-type-mat-native-select .mat-input-element{padding-right:15px}[dir=rtl] .mat-form-field-type-mat-native-select .mat-input-element{padding-right:0;padding-left:15px}.mat-form-field-type-mat-native-select .mat-form-field-label-wrapper{max-width:calc(100% - 10px)}.mat-form-field-type-mat-native-select.mat-form-field-appearance-outline .mat-form-field-infix::after{margin-top:-5px}.mat-form-field-type-mat-native-select.mat-form-field-appearance-fill .mat-form-field-infix::after{margin-top:-10px}',
                ".mat-form-field-appearance-legacy .mat-form-field-label{transform:perspective(100px)}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon{width:1em}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-form-field-appearance-legacy .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-appearance-legacy .mat-form-field-suffix .mat-icon-button .mat-icon{font-size:inherit}.mat-form-field-appearance-legacy .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-legacy .mat-form-field-ripple{top:0;height:2px;overflow:hidden}.cdk-high-contrast-active .mat-form-field-appearance-legacy .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px;border-top-color:GrayText}.mat-form-field-appearance-legacy.mat-form-field-invalid:not(.mat-focused) .mat-form-field-ripple{height:1px}",
                ".mat-form-field-appearance-outline .mat-form-field-wrapper{margin:.25em 0}.mat-form-field-appearance-outline .mat-form-field-flex{padding:0 .75em 0 .75em;margin-top:-0.25em;position:relative}.mat-form-field-appearance-outline .mat-form-field-prefix,.mat-form-field-appearance-outline .mat-form-field-suffix{top:.25em}.mat-form-field-appearance-outline .mat-form-field-outline{display:flex;position:absolute;top:.25em;left:0;right:0;bottom:0;pointer-events:none}.mat-form-field-appearance-outline .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-end{border:1px solid currentColor;min-width:5px}.mat-form-field-appearance-outline .mat-form-field-outline-start{border-radius:5px 0 0 5px;border-right-style:none}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-start{border-right-style:solid;border-left-style:none;border-radius:0 5px 5px 0}.mat-form-field-appearance-outline .mat-form-field-outline-end{border-radius:0 5px 5px 0;border-left-style:none;flex-grow:1}[dir=rtl] .mat-form-field-appearance-outline .mat-form-field-outline-end{border-left-style:solid;border-right-style:none;border-radius:5px 0 0 5px}.mat-form-field-appearance-outline .mat-form-field-outline-gap{border-radius:.000001px;border:1px solid currentColor;border-left-style:none;border-right-style:none}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-outline-gap{border-top-color:rgba(0,0,0,0)}.mat-form-field-appearance-outline .mat-form-field-outline-thick{opacity:0}.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-start,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-end,.mat-form-field-appearance-outline .mat-form-field-outline-thick .mat-form-field-outline-gap{border-width:2px}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline{opacity:0;transition:opacity 100ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick,.mat-form-field-appearance-outline.mat-form-field-invalid .mat-form-field-outline-thick{opacity:1}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{border:3px dashed}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline{opacity:0;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-outline:not(.mat-form-field-disabled) .mat-form-field-flex:hover .mat-form-field-outline-thick{opacity:1}.mat-form-field-appearance-outline .mat-form-field-subscript-wrapper{padding:0 1em}.cdk-high-contrast-active .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:GrayText}.mat-form-field-appearance-outline._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-start,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-end,.mat-form-field-appearance-outline._mat-animation-noopable .mat-form-field-outline-gap{transition:none}",
                ".mat-form-field-appearance-standard .mat-form-field-flex{padding-top:.75em}.mat-form-field-appearance-standard .mat-form-field-underline{height:1px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-underline{height:0;border-top:solid 1px}.mat-form-field-appearance-standard .mat-form-field-ripple{bottom:0;height:2px}.cdk-high-contrast-active .mat-form-field-appearance-standard .mat-form-field-ripple{height:0;border-top:solid 2px}.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-position:0;background-color:rgba(0,0,0,0)}.cdk-high-contrast-active .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{border-top-style:dotted;border-top-width:2px}.mat-form-field-appearance-standard:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{opacity:1;transform:none;transition:opacity 600ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-form-field-appearance-standard._mat-animation-noopable:not(.mat-form-field-disabled) .mat-form-field-flex:hover~.mat-form-field-underline .mat-form-field-ripple{transition:none}",
              ],
              encapsulation: 2,
              data: { animation: [M$.transitionMessages] },
              changeDetection: 0,
            })),
            n
          );
        })(),
        Am = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [Pf, ht, sM, ht] })),
            n
          );
        })();
      const F$ = new E("MAT_INPUT_VALUE_ACCESSOR"),
        O$ = [
          "button",
          "checkbox",
          "file",
          "hidden",
          "image",
          "radio",
          "range",
          "reset",
          "submit",
        ];
      let P$ = 0;
      const N$ = PH(
        class {
          constructor(n, t, e, i) {
            (this._defaultErrorStateMatcher = n),
              (this._parentForm = t),
              (this._parentFormGroup = e),
              (this.ngControl = i),
              (this.stateChanges = new te());
          }
        }
      );
      let Tm = (() => {
          class n extends N$ {
            constructor(e, i, r, o, s, a, l, c, u, d) {
              super(a, o, s, r),
                (this._elementRef = e),
                (this._platform = i),
                (this._autofillMonitor = c),
                (this._formField = d),
                (this._uid = "mat-input-" + P$++),
                (this.focused = !1),
                (this.stateChanges = new te()),
                (this.controlType = "mat-input"),
                (this.autofilled = !1),
                (this._disabled = !1),
                (this._type = "text"),
                (this._readonly = !1),
                (this._neverEmptyInputTypes = [
                  "date",
                  "datetime",
                  "datetime-local",
                  "month",
                  "time",
                  "week",
                ].filter((p) => JE().has(p))),
                (this._iOSKeyupListener = (p) => {
                  const m = p.target;
                  !m.value &&
                    0 === m.selectionStart &&
                    0 === m.selectionEnd &&
                    (m.setSelectionRange(1, 1), m.setSelectionRange(0, 0));
                });
              const h = this._elementRef.nativeElement,
                f = h.nodeName.toLowerCase();
              (this._inputValueAccessor = l || h),
                (this._previousNativeValue = this.value),
                (this.id = this.id),
                i.IOS &&
                  u.runOutsideAngular(() => {
                    e.nativeElement.addEventListener(
                      "keyup",
                      this._iOSKeyupListener
                    );
                  }),
                (this._isServer = !this._platform.isBrowser),
                (this._isNativeSelect = "select" === f),
                (this._isTextarea = "textarea" === f),
                (this._isInFormField = !!d),
                this._isNativeSelect &&
                  (this.controlType = h.multiple
                    ? "mat-native-select-multiple"
                    : "mat-native-select");
            }
            get disabled() {
              return this.ngControl && null !== this.ngControl.disabled
                ? this.ngControl.disabled
                : this._disabled;
            }
            set disabled(e) {
              (this._disabled = Vi(e)),
                this.focused && ((this.focused = !1), this.stateChanges.next());
            }
            get id() {
              return this._id;
            }
            set id(e) {
              this._id = e || this._uid;
            }
            get required() {
              return (
                this._required ??
                this.ngControl?.control?.hasValidator(cU.required) ??
                !1
              );
            }
            set required(e) {
              this._required = Vi(e);
            }
            get type() {
              return this._type;
            }
            set type(e) {
              (this._type = e || "text"),
                this._validateType(),
                !this._isTextarea &&
                  JE().has(this._type) &&
                  (this._elementRef.nativeElement.type = this._type);
            }
            get value() {
              return this._inputValueAccessor.value;
            }
            set value(e) {
              e !== this.value &&
                ((this._inputValueAccessor.value = e),
                this.stateChanges.next());
            }
            get readonly() {
              return this._readonly;
            }
            set readonly(e) {
              this._readonly = Vi(e);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                this._autofillMonitor
                  .monitor(this._elementRef.nativeElement)
                  .subscribe((e) => {
                    (this.autofilled = e.isAutofilled),
                      this.stateChanges.next();
                  });
            }
            ngOnChanges() {
              this.stateChanges.next();
            }
            ngOnDestroy() {
              this.stateChanges.complete(),
                this._platform.isBrowser &&
                  this._autofillMonitor.stopMonitoring(
                    this._elementRef.nativeElement
                  ),
                this._platform.IOS &&
                  this._elementRef.nativeElement.removeEventListener(
                    "keyup",
                    this._iOSKeyupListener
                  );
            }
            ngDoCheck() {
              this.ngControl && this.updateErrorState(),
                this._dirtyCheckNativeValue(),
                this._dirtyCheckPlaceholder();
            }
            focus(e) {
              this._elementRef.nativeElement.focus(e);
            }
            _focusChanged(e) {
              e !== this.focused &&
                ((this.focused = e), this.stateChanges.next());
            }
            _onInput() {}
            _dirtyCheckPlaceholder() {
              const e = this._formField,
                i =
                  e && "legacy" === e.appearance && !e._hasLabel?.()
                    ? null
                    : this.placeholder;
              if (i !== this._previousPlaceholder) {
                const r = this._elementRef.nativeElement;
                (this._previousPlaceholder = i),
                  i
                    ? r.setAttribute("placeholder", i)
                    : r.removeAttribute("placeholder");
              }
            }
            _dirtyCheckNativeValue() {
              const e = this._elementRef.nativeElement.value;
              this._previousNativeValue !== e &&
                ((this._previousNativeValue = e), this.stateChanges.next());
            }
            _validateType() {
              O$.indexOf(this._type);
            }
            _isNeverEmpty() {
              return this._neverEmptyInputTypes.indexOf(this._type) > -1;
            }
            _isBadInput() {
              let e = this._elementRef.nativeElement.validity;
              return e && e.badInput;
            }
            get empty() {
              return !(
                this._isNeverEmpty() ||
                this._elementRef.nativeElement.value ||
                this._isBadInput() ||
                this.autofilled
              );
            }
            get shouldLabelFloat() {
              if (this._isNativeSelect) {
                const e = this._elementRef.nativeElement,
                  i = e.options[0];
                return (
                  this.focused ||
                  e.multiple ||
                  !this.empty ||
                  !!(e.selectedIndex > -1 && i && i.label)
                );
              }
              return this.focused || !this.empty;
            }
            setDescribedByIds(e) {
              e.length
                ? this._elementRef.nativeElement.setAttribute(
                    "aria-describedby",
                    e.join(" ")
                  )
                : this._elementRef.nativeElement.removeAttribute(
                    "aria-describedby"
                  );
            }
            onContainerClick() {
              this.focused || this.focus();
            }
            _isInlineSelect() {
              const e = this._elementRef.nativeElement;
              return this._isNativeSelect && (e.multiple || e.size > 1);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(ve),
                g(_t),
                g(vi, 10),
                g(Sr, 8),
                g(_u, 8),
                g(DM),
                g(F$, 10),
                g(nU),
                g(Q),
                g(W0, 8)
              );
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["input", "matInput", ""],
                ["textarea", "matInput", ""],
                ["select", "matNativeControl", ""],
                ["input", "matNativeControl", ""],
                ["textarea", "matNativeControl", ""],
              ],
              hostAttrs: [
                1,
                "mat-input-element",
                "mat-form-field-autofill-control",
              ],
              hostVars: 12,
              hostBindings: function (e, i) {
                1 & e &&
                  W("focus", function () {
                    return i._focusChanged(!0);
                  })("blur", function () {
                    return i._focusChanged(!1);
                  })("input", function () {
                    return i._onInput();
                  }),
                  2 & e &&
                    (Ml("disabled", i.disabled)("required", i.required),
                    ot("id", i.id)("data-placeholder", i.placeholder)(
                      "name",
                      i.name || null
                    )("readonly", (i.readonly && !i._isNativeSelect) || null)(
                      "aria-invalid",
                      i.empty && i.required ? null : i.errorState
                    )("aria-required", i.required),
                    St("mat-input-server", i._isServer)(
                      "mat-native-select-inline",
                      i._isInlineSelect()
                    ));
              },
              inputs: {
                disabled: "disabled",
                id: "id",
                placeholder: "placeholder",
                name: "name",
                required: "required",
                type: "type",
                errorStateMatcher: "errorStateMatcher",
                userAriaDescribedBy: [
                  "aria-describedby",
                  "userAriaDescribedBy",
                ],
                value: "value",
                readonly: "readonly",
              },
              exportAs: ["matInput"],
              features: [Me([{ provide: Sm, useExisting: n }]), ee, Ot],
            })),
            n
          );
        })(),
        L$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ providers: [DM], imports: [OM, Am, ht, OM, Am] })),
            n
          );
        })();
      const V$ = ["mat-button", ""],
        B$ = ["*"],
        H$ = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        U$ = nu(
          FH(
            OH(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let Ir = (() => {
          class n extends U$ {
            constructor(e, i, r) {
              super(e),
                (this._focusMonitor = i),
                (this._animationMode = r),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton =
                  this._hasHostAttributes("mat-icon-button"));
              for (const o of H$)
                this._hasHostAttributes(o) &&
                  this._getHostElement().classList.add(o);
              e.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(e, i) {
              e
                ? this._focusMonitor.focusVia(this._getHostElement(), e, i)
                : this._getHostElement().focus(i);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...e) {
              return e.some((i) => this._getHostElement().hasAttribute(i));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ve), g(eu), g(Ii, 8));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (e, i) {
                if ((1 & e && lr(SM, 5), 2 & e)) {
                  let r;
                  Xe((r = Je())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (e, i) {
                2 & e &&
                  (ot("disabled", i.disabled || null),
                  St(
                    "_mat-animation-noopable",
                    "NoopAnimations" === i._animationMode
                  )("mat-button-disabled", i.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [ee],
              attrs: V$,
              ngContentSelectors: B$,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (e, i) {
                1 & e &&
                  (or(),
                  R(0, "span", 0),
                  at(1),
                  x(),
                  Ve(2, "span", 1)(3, "span", 2)),
                  2 & e &&
                    (q(2),
                    St(
                      "mat-button-ripple-round",
                      i.isRoundButton || i.isIconButton
                    ),
                    se("matRippleDisabled", i._isRippleDisabled())(
                      "matRippleCentered",
                      i.isIconButton
                    )("matRippleTrigger", i._getHostElement()));
              },
              dependencies: [SM],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}.mat-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.mat-flat-button::before,.mat-raised-button::before,.mat-fab::before,.mat-mini-fab::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1)}.mat-stroked-button::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1)}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        K0 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [UH, ht, ht] })),
            n
          );
        })();
      const $$ = ["*", [["mat-card-footer"]]],
        z$ = ["*", "mat-card-footer"],
        G$ = [
          [
            ["", "mat-card-avatar", ""],
            ["", "matCardAvatar", ""],
          ],
          [
            ["mat-card-title"],
            ["mat-card-subtitle"],
            ["", "mat-card-title", ""],
            ["", "mat-card-subtitle", ""],
            ["", "matCardTitle", ""],
            ["", "matCardSubtitle", ""],
          ],
          "*",
        ],
        W$ = [
          "[mat-card-avatar], [matCardAvatar]",
          "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]",
          "*",
        ];
      let Im = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["mat-card-content"],
                ["", "mat-card-content", ""],
                ["", "matCardContent", ""],
              ],
              hostAttrs: [1, "mat-card-content"],
            })),
            n
          );
        })(),
        va = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["mat-card-title"],
                ["", "mat-card-title", ""],
                ["", "matCardTitle", ""],
              ],
              hostAttrs: [1, "mat-card-title"],
            })),
            n
          );
        })(),
        q$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["mat-card-subtitle"],
                ["", "mat-card-subtitle", ""],
                ["", "matCardSubtitle", ""],
              ],
              hostAttrs: [1, "mat-card-subtitle"],
            })),
            n
          );
        })(),
        ba = (() => {
          class n {
            constructor() {
              this.align = "start";
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["mat-card-actions"]],
              hostAttrs: [1, "mat-card-actions"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && St("mat-card-actions-align-end", "end" === i.align);
              },
              inputs: { align: "align" },
              exportAs: ["matCardActions"],
            })),
            n
          );
        })(),
        jo = (() => {
          class n {
            constructor(e) {
              this._animationMode = e;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Ii, 8));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-card"]],
              hostAttrs: [1, "mat-card", "mat-focus-indicator"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e &&
                  St(
                    "_mat-animation-noopable",
                    "NoopAnimations" === i._animationMode
                  );
              },
              exportAs: ["matCard"],
              ngContentSelectors: z$,
              decls: 2,
              vars: 0,
              template: function (e, i) {
                1 & e && (or($$), at(0), at(1, 1));
              },
              styles: [
                ".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card._mat-animation-noopable{transition:none !important;animation:none !important}.mat-card>.mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card>.mat-divider-horizontal{left:auto;right:0}.mat-card>.mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card>.mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px;display:block;overflow:hidden}.mat-card-image img{width:100%}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions:not(.mat-card-actions-align-end) .mat-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-raised-button:first-child,.mat-card-actions:not(.mat-card-actions-align-end) .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-actions-align-end .mat-button:last-child,.mat-card-actions-align-end .mat-raised-button:last-child,.mat-card-actions-align-end .mat-stroked-button:last-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        vu = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-card-header"]],
              hostAttrs: [1, "mat-card-header"],
              ngContentSelectors: W$,
              decls: 4,
              vars: 0,
              consts: [[1, "mat-card-header-text"]],
              template: function (e, i) {
                1 & e &&
                  (or(G$), at(0), R(1, "div", 0), at(2, 1), x(), at(3, 2));
              },
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        K$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [ht, ht] })),
            n
          );
        })();
      const Ca = {
        schedule(n) {
          let t = requestAnimationFrame,
            e = cancelAnimationFrame;
          const { delegate: i } = Ca;
          i && ((t = i.requestAnimationFrame), (e = i.cancelAnimationFrame));
          const r = t((o) => {
            (e = void 0), n(o);
          });
          return new ct(() => e?.(r));
        },
        requestAnimationFrame(...n) {
          const { delegate: t } = Ca;
          return (t?.requestAnimationFrame || requestAnimationFrame)(...n);
        },
        cancelAnimationFrame(...n) {
          const { delegate: t } = Ca;
          return (t?.cancelAnimationFrame || cancelAnimationFrame)(...n);
        },
        delegate: void 0,
      };
      new (class Z$ extends rm {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class Y$ extends im {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled ||
                  (t._scheduled = Ca.requestAnimationFrame(() =>
                    t.flush(void 0)
                  )));
          }
          recycleAsyncId(t, e, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0))
              return super.recycleAsyncId(t, e, i);
            t.actions.some((r) => r.id === e) ||
              (Ca.cancelAnimationFrame(e), (t._scheduled = void 0));
          }
        }
      );
      let xm,
        X$ = 1;
      const bu = {};
      function Y0(n) {
        return n in bu && (delete bu[n], !0);
      }
      const J$ = {
          setImmediate(n) {
            const t = X$++;
            return (
              (bu[t] = !0),
              xm || (xm = Promise.resolve()),
              xm.then(() => Y0(t) && n()),
              t
            );
          },
          clearImmediate(n) {
            Y0(n);
          },
        },
        { setImmediate: ez, clearImmediate: tz } = J$,
        Cu = {
          setImmediate(...n) {
            const { delegate: t } = Cu;
            return (t?.setImmediate || ez)(...n);
          },
          clearImmediate(n) {
            const { delegate: t } = Cu;
            return (t?.clearImmediate || tz)(n);
          },
          delegate: void 0,
        };
      new (class iz extends rm {
        flush(t) {
          this._active = !0;
          const e = this._scheduled;
          this._scheduled = void 0;
          const { actions: i } = this;
          let r;
          t = t || i.shift();
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = i[0]) && t.id === e && i.shift());
          if (((this._active = !1), r)) {
            for (; (t = i[0]) && t.id === e && i.shift(); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class nz extends im {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled ||
                  (t._scheduled = Cu.setImmediate(t.flush.bind(t, void 0))));
          }
          recycleAsyncId(t, e, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0))
              return super.recycleAsyncId(t, e, i);
            t.actions.some((r) => r.id === e) ||
              (Cu.clearImmediate(e), (t._scheduled = void 0));
          }
        }
      );
      function Z0(n, t = om) {
        return (function oz(n) {
          return Pe((t, e) => {
            let i = !1,
              r = null,
              o = null,
              s = !1;
            const a = () => {
                if ((o?.unsubscribe(), (o = null), i)) {
                  i = !1;
                  const c = r;
                  (r = null), e.next(c);
                }
                s && e.complete();
              },
              l = () => {
                (o = null), s && e.complete();
              };
            t.subscribe(
              Te(
                e,
                (c) => {
                  (i = !0), (r = c), o || Rt(n(c)).subscribe((o = Te(e, a, l)));
                },
                () => {
                  (s = !0), (!i || !o || o.closed) && e.complete();
                }
              )
            );
          });
        })(() =>
          (function az(n = 0, t, e = Jj) {
            let i = -1;
            return (
              null != t && (ag(t) ? (e = t) : (i = t)),
              new De((r) => {
                let o = (function sz(n) {
                  return n instanceof Date && !isNaN(n);
                })(n)
                  ? +n - e.now()
                  : n;
                o < 0 && (o = 0);
                let s = 0;
                return e.schedule(function () {
                  r.closed ||
                    (r.next(s++),
                    0 <= i ? this.schedule(void 0, i) : r.complete());
                }, o);
              })
            );
          })(n, t)
        );
      }
      let cz = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this._platform = i),
                (this._scrolled = new te()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = r);
            }
            register(e) {
              this.scrollContainers.has(e) ||
                this.scrollContainers.set(
                  e,
                  e.elementScrolled().subscribe(() => this._scrolled.next(e))
                );
            }
            deregister(e) {
              const i = this.scrollContainers.get(e);
              i && (i.unsubscribe(), this.scrollContainers.delete(e));
            }
            scrolled(e = 20) {
              return this._platform.isBrowser
                ? new De((i) => {
                    this._globalSubscription || this._addGlobalListener();
                    const r =
                      e > 0
                        ? this._scrolled.pipe(Z0(e)).subscribe(i)
                        : this._scrolled.subscribe(i);
                    return (
                      this._scrolledCount++,
                      () => {
                        r.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : O();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((e, i) => this.deregister(i)),
                this._scrolled.complete();
            }
            ancestorScrolled(e, i) {
              const r = this.getAncestorScrollContainers(e);
              return this.scrolled(i).pipe(It((o) => !o || r.indexOf(o) > -1));
            }
            getAncestorScrollContainers(e) {
              const i = [];
              return (
                this.scrollContainers.forEach((r, o) => {
                  this._scrollableContainsElement(o, e) && i.push(o);
                }),
                i
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(e, i) {
              let r = yi(i),
                o = e.getElementRef().nativeElement;
              do {
                if (r == o) return !0;
              } while ((r = r.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                yu(this._getWindow().document, "scroll").subscribe(() =>
                  this._scrolled.next()
                )
              );
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(),
                (this._globalSubscription = null));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Q), _(_t), _(K, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Q0 = (() => {
          class n {
            constructor(e, i, r) {
              (this._platform = e),
                (this._change = new te()),
                (this._changeListener = (o) => {
                  this._change.next(o);
                }),
                (this._document = r),
                i.runOutsideAngular(() => {
                  if (e.isBrowser) {
                    const o = this._getWindow();
                    o.addEventListener("resize", this._changeListener),
                      o.addEventListener(
                        "orientationchange",
                        this._changeListener
                      );
                  }
                  this.change().subscribe(() => (this._viewportSize = null));
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const e = this._getWindow();
                e.removeEventListener("resize", this._changeListener),
                  e.removeEventListener(
                    "orientationchange",
                    this._changeListener
                  );
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const e = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), e;
            }
            getViewportRect() {
              const e = this.getViewportScrollPosition(),
                { width: i, height: r } = this.getViewportSize();
              return {
                top: e.top,
                left: e.left,
                bottom: e.top + r,
                right: e.left + i,
                height: r,
                width: i,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const e = this._document,
                i = this._getWindow(),
                r = e.documentElement,
                o = r.getBoundingClientRect();
              return {
                top:
                  -o.top || e.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left:
                  -o.left ||
                  e.body.scrollLeft ||
                  i.scrollX ||
                  r.scrollLeft ||
                  0,
              };
            }
            change(e = 20) {
              return e > 0 ? this._change.pipe(Z0(e)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const e = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: e.innerWidth, height: e.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(_t), _(Q), _(K, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        X0 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })(),
        J0 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [da, X0, da, X0] })),
            n
          );
        })();
      class Rm {
        attach(t) {
          return (this._attachedHost = t), t.attach(this);
        }
        detach() {
          let t = this._attachedHost;
          null != t && ((this._attachedHost = null), t.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class Da extends Rm {
        constructor(t, e, i, r) {
          super(),
            (this.component = t),
            (this.viewContainerRef = e),
            (this.injector = i),
            (this.componentFactoryResolver = r);
        }
      }
      class km extends Rm {
        constructor(t, e, i, r) {
          super(),
            (this.templateRef = t),
            (this.viewContainerRef = e),
            (this.context = i),
            (this.injector = r);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(t, e = this.context) {
          return (this.context = e), super.attach(t);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class dz extends Rm {
        constructor(t) {
          super(), (this.element = t instanceof ve ? t.nativeElement : t);
        }
      }
      class Du {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(t) {
          return t instanceof Da
            ? ((this._attachedPortal = t), this.attachComponentPortal(t))
            : t instanceof km
            ? ((this._attachedPortal = t), this.attachTemplatePortal(t))
            : this.attachDomPortal && t instanceof dz
            ? ((this._attachedPortal = t), this.attachDomPortal(t))
            : void 0;
        }
        detach() {
          this._attachedPortal &&
            (this._attachedPortal.setAttachedHost(null),
            (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(),
            this._invokeDisposeFn(),
            (this._isDisposed = !0);
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      }
      class hz extends Du {
        constructor(t, e, i, r, o) {
          super(),
            (this.outletElement = t),
            (this._componentFactoryResolver = e),
            (this._appRef = i),
            (this._defaultInjector = r),
            (this.attachDomPortal = (s) => {
              const a = s.element,
                l = this._document.createComment("dom-portal");
              a.parentNode.insertBefore(l, a),
                this.outletElement.appendChild(a),
                (this._attachedPortal = s),
                super.setDisposeFn(() => {
                  l.parentNode && l.parentNode.replaceChild(a, l);
                });
            }),
            (this._document = o);
        }
        attachComponentPortal(t) {
          const i = (
            t.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(t.component);
          let r;
          return (
            t.viewContainerRef
              ? ((r = t.viewContainerRef.createComponent(
                  i,
                  t.viewContainerRef.length,
                  t.injector || t.viewContainerRef.injector
                )),
                this.setDisposeFn(() => r.destroy()))
              : ((r = i.create(t.injector || this._defaultInjector || xe.NULL)),
                this._appRef.attachView(r.hostView),
                this.setDisposeFn(() => {
                  this._appRef.viewCount > 0 &&
                    this._appRef.detachView(r.hostView),
                    r.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(r)),
            (this._attachedPortal = t),
            r
          );
        }
        attachTemplatePortal(t) {
          let e = t.viewContainerRef,
            i = e.createEmbeddedView(t.templateRef, t.context, {
              injector: t.injector,
            });
          return (
            i.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
            i.detectChanges(),
            this.setDisposeFn(() => {
              let r = e.indexOf(i);
              -1 !== r && e.remove(r);
            }),
            (this._attachedPortal = t),
            i
          );
        }
        dispose() {
          super.dispose(), this.outletElement.remove();
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let wa = (() => {
          class n extends Du {
            constructor(e, i, r) {
              super(),
                (this._componentFactoryResolver = e),
                (this._viewContainerRef = i),
                (this._isInitialized = !1),
                (this.attached = new Se()),
                (this.attachDomPortal = (o) => {
                  const s = o.element,
                    a = this._document.createComment("dom-portal");
                  o.setAttachedHost(this),
                    s.parentNode.insertBefore(a, s),
                    this._getRootNode().appendChild(s),
                    (this._attachedPortal = o),
                    super.setDisposeFn(() => {
                      a.parentNode && a.parentNode.replaceChild(s, a);
                    });
                }),
                (this._document = r);
            }
            get portal() {
              return this._attachedPortal;
            }
            set portal(e) {
              (this.hasAttached() && !e && !this._isInitialized) ||
                (this.hasAttached() && super.detach(),
                e && super.attach(e),
                (this._attachedPortal = e || null));
            }
            get attachedRef() {
              return this._attachedRef;
            }
            ngOnInit() {
              this._isInitialized = !0;
            }
            ngOnDestroy() {
              super.dispose(),
                (this._attachedPortal = null),
                (this._attachedRef = null);
            }
            attachComponentPortal(e) {
              e.setAttachedHost(this);
              const i =
                  null != e.viewContainerRef
                    ? e.viewContainerRef
                    : this._viewContainerRef,
                o = (
                  e.componentFactoryResolver || this._componentFactoryResolver
                ).resolveComponentFactory(e.component),
                s = i.createComponent(o, i.length, e.injector || i.injector);
              return (
                i !== this._viewContainerRef &&
                  this._getRootNode().appendChild(s.hostView.rootNodes[0]),
                super.setDisposeFn(() => s.destroy()),
                (this._attachedPortal = e),
                (this._attachedRef = s),
                this.attached.emit(s),
                s
              );
            }
            attachTemplatePortal(e) {
              e.setAttachedHost(this);
              const i = this._viewContainerRef.createEmbeddedView(
                e.templateRef,
                e.context,
                { injector: e.injector }
              );
              return (
                super.setDisposeFn(() => this._viewContainerRef.clear()),
                (this._attachedPortal = e),
                (this._attachedRef = i),
                this.attached.emit(i),
                i
              );
            }
            _getRootNode() {
              const e = this._viewContainerRef.element.nativeElement;
              return e.nodeType === e.ELEMENT_NODE ? e : e.parentNode;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(er), g(ln), g(K));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["", "cdkPortalOutlet", ""]],
              inputs: { portal: ["cdkPortalOutlet", "portal"] },
              outputs: { attached: "attached" },
              exportAs: ["cdkPortalOutlet"],
              features: [ee],
            })),
            n
          );
        })(),
        Ea = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({})),
            n
          );
        })();
      const eS = jj();
      class fz {
        constructor(t, e) {
          (this._viewportRuler = t),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = e);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const t = this._document.documentElement;
            (this._previousScrollPosition =
              this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = t.style.left || ""),
              (this._previousHTMLStyles.top = t.style.top || ""),
              (t.style.left = Ke(-this._previousScrollPosition.left)),
              (t.style.top = Ke(-this._previousScrollPosition.top)),
              t.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const t = this._document.documentElement,
              i = t.style,
              r = this._document.body.style,
              o = i.scrollBehavior || "",
              s = r.scrollBehavior || "";
            (this._isEnabled = !1),
              (i.left = this._previousHTMLStyles.left),
              (i.top = this._previousHTMLStyles.top),
              t.classList.remove("cdk-global-scrollblock"),
              eS && (i.scrollBehavior = r.scrollBehavior = "auto"),
              window.scroll(
                this._previousScrollPosition.left,
                this._previousScrollPosition.top
              ),
              eS && ((i.scrollBehavior = o), (r.scrollBehavior = s));
          }
        }
        _canBeEnabled() {
          if (
            this._document.documentElement.classList.contains(
              "cdk-global-scrollblock"
            ) ||
            this._isEnabled
          )
            return !1;
          const e = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return e.scrollHeight > i.height || e.scrollWidth > i.width;
        }
      }
      class pz {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._ngZone = e),
            (this._viewportRuler = i),
            (this._config = r),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          if (this._scrollSubscription) return;
          const t = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition =
                this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = t.subscribe(() => {
                const e = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(e - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = t.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class tS {
        enable() {}
        disable() {}
        attach() {}
      }
      function Fm(n, t) {
        return t.some(
          (e) =>
            n.bottom < e.top ||
            n.top > e.bottom ||
            n.right < e.left ||
            n.left > e.right
        );
      }
      function nS(n, t) {
        return t.some(
          (e) =>
            n.top < e.top ||
            n.bottom > e.bottom ||
            n.left < e.left ||
            n.right > e.right
        );
      }
      class mz {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._viewportRuler = e),
            (this._ngZone = i),
            (this._config = r),
            (this._scrollSubscription = null);
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if (
                  (this._overlayRef.updatePosition(),
                  this._config && this._config.autoClose)
                ) {
                  const e =
                      this._overlayRef.overlayElement.getBoundingClientRect(),
                    { width: i, height: r } =
                      this._viewportRuler.getViewportSize();
                  Fm(e, [
                    {
                      width: i,
                      height: r,
                      bottom: r,
                      right: i,
                      top: 0,
                      left: 0,
                    },
                  ]) &&
                    (this.disable(),
                    this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let gz = (() => {
        class n {
          constructor(e, i, r, o) {
            (this._scrollDispatcher = e),
              (this._viewportRuler = i),
              (this._ngZone = r),
              (this.noop = () => new tS()),
              (this.close = (s) =>
                new pz(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  s
                )),
              (this.block = () => new fz(this._viewportRuler, this._document)),
              (this.reposition = (s) =>
                new mz(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  s
                )),
              (this._document = o);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(_(cz), _(Q0), _(Q), _(K));
          }),
          (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class Om {
        constructor(t) {
          if (
            ((this.scrollStrategy = new tS()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            t)
          ) {
            const e = Object.keys(t);
            for (const i of e) void 0 !== t[i] && (this[i] = t[i]);
          }
        }
      }
      class _z {
        constructor(t, e) {
          (this.connectionPair = t), (this.scrollableViewProperties = e);
        }
      }
      let iS = (() => {
          class n {
            constructor(e) {
              (this._attachedOverlays = []), (this._document = e);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(e) {
              this.remove(e), this._attachedOverlays.push(e);
            }
            remove(e) {
              const i = this._attachedOverlays.indexOf(e);
              i > -1 && this._attachedOverlays.splice(i, 1),
                0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        yz = (() => {
          class n extends iS {
            constructor(e, i) {
              super(e),
                (this._ngZone = i),
                (this._keydownListener = (r) => {
                  const o = this._attachedOverlays;
                  for (let s = o.length - 1; s > -1; s--)
                    if (o[s]._keydownEvents.observers.length > 0) {
                      const a = o[s]._keydownEvents;
                      this._ngZone
                        ? this._ngZone.run(() => a.next(r))
                        : a.next(r);
                      break;
                    }
                });
            }
            add(e) {
              super.add(e),
                this._isAttached ||
                  (this._ngZone
                    ? this._ngZone.runOutsideAngular(() =>
                        this._document.body.addEventListener(
                          "keydown",
                          this._keydownListener
                        )
                      )
                    : this._document.body.addEventListener(
                        "keydown",
                        this._keydownListener
                      ),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener(
                  "keydown",
                  this._keydownListener
                ),
                (this._isAttached = !1));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K), _(Q, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        vz = (() => {
          class n extends iS {
            constructor(e, i, r) {
              super(e),
                (this._platform = i),
                (this._ngZone = r),
                (this._cursorStyleIsSet = !1),
                (this._pointerDownListener = (o) => {
                  this._pointerDownEventTarget = Dr(o);
                }),
                (this._clickListener = (o) => {
                  const s = Dr(o),
                    a =
                      "click" === o.type && this._pointerDownEventTarget
                        ? this._pointerDownEventTarget
                        : s;
                  this._pointerDownEventTarget = null;
                  const l = this._attachedOverlays.slice();
                  for (let c = l.length - 1; c > -1; c--) {
                    const u = l[c];
                    if (
                      u._outsidePointerEvents.observers.length < 1 ||
                      !u.hasAttached()
                    )
                      continue;
                    if (
                      u.overlayElement.contains(s) ||
                      u.overlayElement.contains(a)
                    )
                      break;
                    const d = u._outsidePointerEvents;
                    this._ngZone
                      ? this._ngZone.run(() => d.next(o))
                      : d.next(o);
                  }
                });
            }
            add(e) {
              if ((super.add(e), !this._isAttached)) {
                const i = this._document.body;
                this._ngZone
                  ? this._ngZone.runOutsideAngular(() =>
                      this._addEventListeners(i)
                    )
                  : this._addEventListeners(i),
                  this._platform.IOS &&
                    !this._cursorStyleIsSet &&
                    ((this._cursorOriginalValue = i.style.cursor),
                    (i.style.cursor = "pointer"),
                    (this._cursorStyleIsSet = !0)),
                  (this._isAttached = !0);
              }
            }
            detach() {
              if (this._isAttached) {
                const e = this._document.body;
                e.removeEventListener(
                  "pointerdown",
                  this._pointerDownListener,
                  !0
                ),
                  e.removeEventListener("click", this._clickListener, !0),
                  e.removeEventListener("auxclick", this._clickListener, !0),
                  e.removeEventListener("contextmenu", this._clickListener, !0),
                  this._platform.IOS &&
                    this._cursorStyleIsSet &&
                    ((e.style.cursor = this._cursorOriginalValue),
                    (this._cursorStyleIsSet = !1)),
                  (this._isAttached = !1);
              }
            }
            _addEventListeners(e) {
              e.addEventListener("pointerdown", this._pointerDownListener, !0),
                e.addEventListener("click", this._clickListener, !0),
                e.addEventListener("auxclick", this._clickListener, !0),
                e.addEventListener("contextmenu", this._clickListener, !0);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K), _(_t), _(Q, 8));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        wu = (() => {
          class n {
            constructor(e, i) {
              (this._platform = i), (this._document = e);
            }
            ngOnDestroy() {
              this._containerElement?.remove();
            }
            getContainerElement() {
              return (
                this._containerElement || this._createContainer(),
                this._containerElement
              );
            }
            _createContainer() {
              const e = "cdk-overlay-container";
              if (this._platform.isBrowser || nm()) {
                const r = this._document.querySelectorAll(
                  `.${e}[platform="server"], .${e}[platform="test"]`
                );
                for (let o = 0; o < r.length; o++) r[o].remove();
              }
              const i = this._document.createElement("div");
              i.classList.add(e),
                nm()
                  ? i.setAttribute("platform", "test")
                  : this._platform.isBrowser ||
                    i.setAttribute("platform", "server"),
                this._document.body.appendChild(i),
                (this._containerElement = i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(K), _(_t));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      class Ma {
        constructor(t, e, i, r, o, s, a, l, c, u = !1) {
          (this._portalOutlet = t),
            (this._host = e),
            (this._pane = i),
            (this._config = r),
            (this._ngZone = o),
            (this._keyboardDispatcher = s),
            (this._document = a),
            (this._location = l),
            (this._outsideClickDispatcher = c),
            (this._animationsDisabled = u),
            (this._backdropElement = null),
            (this._backdropClick = new te()),
            (this._attachments = new te()),
            (this._detachments = new te()),
            (this._locationChanges = ct.EMPTY),
            (this._backdropClickHandler = (d) => this._backdropClick.next(d)),
            (this._backdropTransitionendHandler = (d) => {
              this._disposeBackdrop(d.target);
            }),
            (this._keydownEvents = new te()),
            (this._outsidePointerEvents = new te()),
            r.scrollStrategy &&
              ((this._scrollStrategy = r.scrollStrategy),
              this._scrollStrategy.attach(this)),
            (this._positionStrategy = r.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(t) {
          !this._host.parentElement &&
            this._previousHostParent &&
            this._previousHostParent.appendChild(this._host);
          const e = this._portalOutlet.attach(t);
          return (
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable.pipe(Lt(1)).subscribe(() => {
              this.hasAttached() && this.updatePosition();
            }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass &&
              this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              (this._locationChanges = this._location.subscribe(() =>
                this.dispose()
              )),
            this._outsideClickDispatcher.add(this),
            "function" == typeof e?.onDestroy &&
              e.onDestroy(() => {
                this.hasAttached() &&
                  this._ngZone.runOutsideAngular(() =>
                    Promise.resolve().then(() => this.detach())
                  );
              }),
            e
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy &&
              this._positionStrategy.detach &&
              this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const t = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher.remove(this),
            t
          );
        }
        dispose() {
          const t = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this._disposeBackdrop(this._backdropElement),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._outsidePointerEvents.complete(),
            this._outsideClickDispatcher.remove(this),
            this._host?.remove(),
            (this._previousHostParent = this._pane = this._host = null),
            t && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick;
        }
        attachments() {
          return this._attachments;
        }
        detachments() {
          return this._detachments;
        }
        keydownEvents() {
          return this._keydownEvents;
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents;
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(t) {
          t !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = t),
            this.hasAttached() && (t.attach(this), this.updatePosition()));
        }
        updateSize(t) {
          (this._config = { ...this._config, ...t }), this._updateElementSize();
        }
        setDirection(t) {
          (this._config = { ...this._config, direction: t }),
            this._updateElementDirection();
        }
        addPanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !0);
        }
        removePanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !1);
        }
        getDirection() {
          const t = this._config.direction;
          return t ? ("string" == typeof t ? t : t.value) : "ltr";
        }
        updateScrollStrategy(t) {
          t !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = t),
            this.hasAttached() && (t.attach(this), t.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const t = this._pane.style;
          (t.width = Ke(this._config.width)),
            (t.height = Ke(this._config.height)),
            (t.minWidth = Ke(this._config.minWidth)),
            (t.minHeight = Ke(this._config.minHeight)),
            (t.maxWidth = Ke(this._config.maxWidth)),
            (t.maxHeight = Ke(this._config.maxHeight));
        }
        _togglePointerEvents(t) {
          this._pane.style.pointerEvents = t ? "" : "none";
        }
        _attachBackdrop() {
          const t = "cdk-overlay-backdrop-showing";
          (this._backdropElement = this._document.createElement("div")),
            this._backdropElement.classList.add("cdk-overlay-backdrop"),
            this._animationsDisabled &&
              this._backdropElement.classList.add(
                "cdk-overlay-backdrop-noop-animation"
              ),
            this._config.backdropClass &&
              this._toggleClasses(
                this._backdropElement,
                this._config.backdropClass,
                !0
              ),
            this._host.parentElement.insertBefore(
              this._backdropElement,
              this._host
            ),
            this._backdropElement.addEventListener(
              "click",
              this._backdropClickHandler
            ),
            !this._animationsDisabled && typeof requestAnimationFrame < "u"
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement &&
                      this._backdropElement.classList.add(t);
                  });
                })
              : this._backdropElement.classList.add(t);
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          const t = this._backdropElement;
          if (t) {
            if (this._animationsDisabled) return void this._disposeBackdrop(t);
            t.classList.remove("cdk-overlay-backdrop-showing"),
              this._ngZone.runOutsideAngular(() => {
                t.addEventListener(
                  "transitionend",
                  this._backdropTransitionendHandler
                );
              }),
              (t.style.pointerEvents = "none"),
              (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
                setTimeout(() => {
                  this._disposeBackdrop(t);
                }, 500)
              ));
          }
        }
        _toggleClasses(t, e, i) {
          const r = Zc(e || []).filter((o) => !!o);
          r.length && (i ? t.classList.add(...r) : t.classList.remove(...r));
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const t = this._ngZone.onStable
              .pipe(wr(Ra(this._attachments, this._detachments)))
              .subscribe(() => {
                (!this._pane ||
                  !this._host ||
                  0 === this._pane.children.length) &&
                  (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                      this._pane,
                      this._config.panelClass,
                      !1
                    ),
                  this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._host.remove()),
                  t.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const t = this._scrollStrategy;
          t && (t.disable(), t.detach && t.detach());
        }
        _disposeBackdrop(t) {
          t &&
            (t.removeEventListener("click", this._backdropClickHandler),
            t.removeEventListener(
              "transitionend",
              this._backdropTransitionendHandler
            ),
            t.remove(),
            this._backdropElement === t && (this._backdropElement = null)),
            this._backdropTimeout &&
              (clearTimeout(this._backdropTimeout),
              (this._backdropTimeout = void 0));
        }
      }
      const rS = "cdk-overlay-connected-position-bounding-box",
        bz = /([A-Za-z%]+)$/;
      class Cz {
        constructor(t, e, i, r, o) {
          (this._viewportRuler = e),
            (this._document = i),
            (this._platform = r),
            (this._overlayContainer = o),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new te()),
            (this._resizeSubscription = ct.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges),
            this.setOrigin(t);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          this._validatePositions(),
            t.hostElement.classList.add(rS),
            (this._overlayRef = t),
            (this._boundingBox = t.hostElement),
            (this._pane = t.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
              .change()
              .subscribe(() => {
                (this._isInitialRender = !0), this.apply();
              }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
          )
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect()),
            (this._containerRect = this._overlayContainer
              .getContainerElement()
              .getBoundingClientRect());
          const t = this._originRect,
            e = this._overlayRect,
            i = this._viewportRect,
            r = this._containerRect,
            o = [];
          let s;
          for (let a of this._preferredPositions) {
            let l = this._getOriginPoint(t, r, a),
              c = this._getOverlayPoint(l, e, a),
              u = this._getOverlayFit(c, e, i, a);
            if (u.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(a, l);
            this._canFitWithFlexibleDimensions(u, c, i)
              ? o.push({
                  position: a,
                  origin: l,
                  overlayRect: e,
                  boundingBoxRect: this._calculateBoundingBoxRect(l, a),
                })
              : (!s || s.overlayFit.visibleArea < u.visibleArea) &&
                (s = {
                  overlayFit: u,
                  overlayPoint: c,
                  originPoint: l,
                  position: a,
                  overlayRect: e,
                });
          }
          if (o.length) {
            let a = null,
              l = -1;
            for (const c of o) {
              const u =
                c.boundingBoxRect.width *
                c.boundingBoxRect.height *
                (c.position.weight || 1);
              u > l && ((l = u), (a = c));
            }
            return (
              (this._isPushed = !1),
              void this._applyPosition(a.position, a.origin)
            );
          }
          if (this._canPush)
            return (
              (this._isPushed = !0),
              void this._applyPosition(s.position, s.originPoint)
            );
          this._applyPosition(s.position, s.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              xr(this._boundingBox.style, {
                top: "",
                left: "",
                right: "",
                bottom: "",
                height: "",
                width: "",
                alignItems: "",
                justifyContent: "",
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
              this._overlayRef.hostElement.classList.remove(rS),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          const t = this._lastPosition;
          if (t) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect()),
              (this._containerRect = this._overlayContainer
                .getContainerElement()
                .getBoundingClientRect());
            const e = this._getOriginPoint(
              this._originRect,
              this._containerRect,
              t
            );
            this._applyPosition(t, e);
          } else this.apply();
        }
        withScrollableContainers(t) {
          return (this._scrollables = t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t),
            -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(t) {
          return (this._viewportMargin = t), this;
        }
        withFlexibleDimensions(t = !0) {
          return (this._hasFlexibleDimensions = t), this;
        }
        withGrowAfterOpen(t = !0) {
          return (this._growAfterOpen = t), this;
        }
        withPush(t = !0) {
          return (this._canPush = t), this;
        }
        withLockedPosition(t = !0) {
          return (this._positionLocked = t), this;
        }
        setOrigin(t) {
          return (this._origin = t), this;
        }
        withDefaultOffsetX(t) {
          return (this._offsetX = t), this;
        }
        withDefaultOffsetY(t) {
          return (this._offsetY = t), this;
        }
        withTransformOriginOn(t) {
          return (this._transformOriginSelector = t), this;
        }
        _getOriginPoint(t, e, i) {
          let r, o;
          if ("center" == i.originX) r = t.left + t.width / 2;
          else {
            const s = this._isRtl() ? t.right : t.left,
              a = this._isRtl() ? t.left : t.right;
            r = "start" == i.originX ? s : a;
          }
          return (
            e.left < 0 && (r -= e.left),
            (o =
              "center" == i.originY
                ? t.top + t.height / 2
                : "top" == i.originY
                ? t.top
                : t.bottom),
            e.top < 0 && (o -= e.top),
            { x: r, y: o }
          );
        }
        _getOverlayPoint(t, e, i) {
          let r, o;
          return (
            (r =
              "center" == i.overlayX
                ? -e.width / 2
                : "start" === i.overlayX
                ? this._isRtl()
                  ? -e.width
                  : 0
                : this._isRtl()
                ? 0
                : -e.width),
            (o =
              "center" == i.overlayY
                ? -e.height / 2
                : "top" == i.overlayY
                ? 0
                : -e.height),
            { x: t.x + r, y: t.y + o }
          );
        }
        _getOverlayFit(t, e, i, r) {
          const o = sS(e);
          let { x: s, y: a } = t,
            l = this._getOffset(r, "x"),
            c = this._getOffset(r, "y");
          l && (s += l), c && (a += c);
          let h = 0 - a,
            f = a + o.height - i.height,
            p = this._subtractOverflows(o.width, 0 - s, s + o.width - i.width),
            m = this._subtractOverflows(o.height, h, f),
            y = p * m;
          return {
            visibleArea: y,
            isCompletelyWithinViewport: o.width * o.height === y,
            fitsInViewportVertically: m === o.height,
            fitsInViewportHorizontally: p == o.width,
          };
        }
        _canFitWithFlexibleDimensions(t, e, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - e.y,
              o = i.right - e.x,
              s = oS(this._overlayRef.getConfig().minHeight),
              a = oS(this._overlayRef.getConfig().minWidth),
              c = t.fitsInViewportHorizontally || (null != a && a <= o);
            return (t.fitsInViewportVertically || (null != s && s <= r)) && c;
          }
          return !1;
        }
        _pushOverlayOnScreen(t, e, i) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: t.x + this._previousPushAmount.x,
              y: t.y + this._previousPushAmount.y,
            };
          const r = sS(e),
            o = this._viewportRect,
            s = Math.max(t.x + r.width - o.width, 0),
            a = Math.max(t.y + r.height - o.height, 0),
            l = Math.max(o.top - i.top - t.y, 0),
            c = Math.max(o.left - i.left - t.x, 0);
          let u = 0,
            d = 0;
          return (
            (u =
              r.width <= o.width
                ? c || -s
                : t.x < this._viewportMargin
                ? o.left - i.left - t.x
                : 0),
            (d =
              r.height <= o.height
                ? l || -a
                : t.y < this._viewportMargin
                ? o.top - i.top - t.y
                : 0),
            (this._previousPushAmount = { x: u, y: d }),
            { x: t.x + u, y: t.y + d }
          );
        }
        _applyPosition(t, e) {
          if (
            (this._setTransformOrigin(t),
            this._setOverlayElementStyles(e, t),
            this._setBoundingBoxStyles(e, t),
            t.panelClass && this._addPanelClasses(t.panelClass),
            (this._lastPosition = t),
            this._positionChanges.observers.length)
          ) {
            const i = this._getScrollVisibility(),
              r = new _z(t, i);
            this._positionChanges.next(r);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(t) {
          if (!this._transformOriginSelector) return;
          const e = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let i,
            r = t.overlayY;
          i =
            "center" === t.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === t.overlayX
                ? "right"
                : "left"
              : "start" === t.overlayX
              ? "left"
              : "right";
          for (let o = 0; o < e.length; o++)
            e[o].style.transformOrigin = `${i} ${r}`;
        }
        _calculateBoundingBoxRect(t, e) {
          const i = this._viewportRect,
            r = this._isRtl();
          let o, s, a, u, d, h;
          if ("top" === e.overlayY)
            (s = t.y), (o = i.height - s + this._viewportMargin);
          else if ("bottom" === e.overlayY)
            (a = i.height - t.y + 2 * this._viewportMargin),
              (o = i.height - a + this._viewportMargin);
          else {
            const f = Math.min(i.bottom - t.y + i.top, t.y),
              p = this._lastBoundingBoxSize.height;
            (o = 2 * f),
              (s = t.y - f),
              o > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (s = t.y - p / 2);
          }
          if (("end" === e.overlayX && !r) || ("start" === e.overlayX && r))
            (h = i.width - t.x + this._viewportMargin),
              (u = t.x - this._viewportMargin);
          else if (
            ("start" === e.overlayX && !r) ||
            ("end" === e.overlayX && r)
          )
            (d = t.x), (u = i.right - t.x);
          else {
            const f = Math.min(i.right - t.x + i.left, t.x),
              p = this._lastBoundingBoxSize.width;
            (u = 2 * f),
              (d = t.x - f),
              u > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (d = t.x - p / 2);
          }
          return { top: s, left: d, bottom: a, right: h, width: u, height: o };
        }
        _setBoundingBoxStyles(t, e) {
          const i = this._calculateBoundingBoxRect(t, e);
          !this._isInitialRender &&
            !this._growAfterOpen &&
            ((i.height = Math.min(i.height, this._lastBoundingBoxSize.height)),
            (i.width = Math.min(i.width, this._lastBoundingBoxSize.width)));
          const r = {};
          if (this._hasExactPosition())
            (r.top = r.left = "0"),
              (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
              (r.width = r.height = "100%");
          else {
            const o = this._overlayRef.getConfig().maxHeight,
              s = this._overlayRef.getConfig().maxWidth;
            (r.height = Ke(i.height)),
              (r.top = Ke(i.top)),
              (r.bottom = Ke(i.bottom)),
              (r.width = Ke(i.width)),
              (r.left = Ke(i.left)),
              (r.right = Ke(i.right)),
              (r.alignItems =
                "center" === e.overlayX
                  ? "center"
                  : "end" === e.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (r.justifyContent =
                "center" === e.overlayY
                  ? "center"
                  : "bottom" === e.overlayY
                  ? "flex-end"
                  : "flex-start"),
              o && (r.maxHeight = Ke(o)),
              s && (r.maxWidth = Ke(s));
          }
          (this._lastBoundingBoxSize = i), xr(this._boundingBox.style, r);
        }
        _resetBoundingBoxStyles() {
          xr(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          });
        }
        _resetOverlayElementStyles() {
          xr(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
          });
        }
        _setOverlayElementStyles(t, e) {
          const i = {},
            r = this._hasExactPosition(),
            o = this._hasFlexibleDimensions,
            s = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            xr(i, this._getExactOverlayY(e, t, u)),
              xr(i, this._getExactOverlayX(e, t, u));
          } else i.position = "static";
          let a = "",
            l = this._getOffset(e, "x"),
            c = this._getOffset(e, "y");
          l && (a += `translateX(${l}px) `),
            c && (a += `translateY(${c}px)`),
            (i.transform = a.trim()),
            s.maxHeight &&
              (r ? (i.maxHeight = Ke(s.maxHeight)) : o && (i.maxHeight = "")),
            s.maxWidth &&
              (r ? (i.maxWidth = Ke(s.maxWidth)) : o && (i.maxWidth = "")),
            xr(this._pane.style, i);
        }
        _getExactOverlayY(t, e, i) {
          let r = { top: "", bottom: "" },
            o = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (o = this._pushOverlayOnScreen(o, this._overlayRect, i)),
            "bottom" === t.overlayY
              ? (r.bottom =
                  this._document.documentElement.clientHeight -
                  (o.y + this._overlayRect.height) +
                  "px")
              : (r.top = Ke(o.y)),
            r
          );
        }
        _getExactOverlayX(t, e, i) {
          let s,
            r = { left: "", right: "" },
            o = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (o = this._pushOverlayOnScreen(o, this._overlayRect, i)),
            (s = this._isRtl()
              ? "end" === t.overlayX
                ? "left"
                : "right"
              : "end" === t.overlayX
              ? "right"
              : "left"),
            "right" === s
              ? (r.right =
                  this._document.documentElement.clientWidth -
                  (o.x + this._overlayRect.width) +
                  "px")
              : (r.left = Ke(o.x)),
            r
          );
        }
        _getScrollVisibility() {
          const t = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            i = this._scrollables.map((r) =>
              r.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: nS(t, i),
            isOriginOutsideView: Fm(t, i),
            isOverlayClipped: nS(e, i),
            isOverlayOutsideView: Fm(e, i),
          };
        }
        _subtractOverflows(t, ...e) {
          return e.reduce((i, r) => i - Math.max(r, 0), t);
        }
        _getNarrowedViewportRect() {
          const t = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + t - this._viewportMargin,
            bottom: i.top + e - this._viewportMargin,
            width: t - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(t, e) {
          return "x" === e
            ? t.offsetX ?? this._offsetX
            : t.offsetY ?? this._offsetY;
        }
        _validatePositions() {}
        _addPanelClasses(t) {
          this._pane &&
            Zc(t).forEach((e) => {
              "" !== e &&
                -1 === this._appliedPanelClasses.indexOf(e) &&
                (this._appliedPanelClasses.push(e),
                this._pane.classList.add(e));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((t) => {
              this._pane.classList.remove(t);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const t = this._origin;
          if (t instanceof ve) return t.nativeElement.getBoundingClientRect();
          if (t instanceof Element) return t.getBoundingClientRect();
          const e = t.width || 0,
            i = t.height || 0;
          return {
            top: t.y,
            bottom: t.y + i,
            left: t.x,
            right: t.x + e,
            height: i,
            width: e,
          };
        }
      }
      function xr(n, t) {
        for (let e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
        return n;
      }
      function oS(n) {
        if ("number" != typeof n && null != n) {
          const [t, e] = n.split(bz);
          return e && "px" !== e ? null : parseFloat(t);
        }
        return n || null;
      }
      function sS(n) {
        return {
          top: Math.floor(n.top),
          right: Math.floor(n.right),
          bottom: Math.floor(n.bottom),
          left: Math.floor(n.left),
          width: Math.floor(n.width),
          height: Math.floor(n.height),
        };
      }
      const aS = "cdk-global-overlay-wrapper";
      class Dz {
        constructor() {
          (this._cssPosition = "static"),
            (this._topOffset = ""),
            (this._bottomOffset = ""),
            (this._alignItems = ""),
            (this._xPosition = ""),
            (this._xOffset = ""),
            (this._width = ""),
            (this._height = ""),
            (this._isDisposed = !1);
        }
        attach(t) {
          const e = t.getConfig();
          (this._overlayRef = t),
            this._width && !e.width && t.updateSize({ width: this._width }),
            this._height && !e.height && t.updateSize({ height: this._height }),
            t.hostElement.classList.add(aS),
            (this._isDisposed = !1);
        }
        top(t = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = t),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(t = "") {
          return (this._xOffset = t), (this._xPosition = "left"), this;
        }
        bottom(t = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = t),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(t = "") {
          return (this._xOffset = t), (this._xPosition = "right"), this;
        }
        start(t = "") {
          return (this._xOffset = t), (this._xPosition = "start"), this;
        }
        end(t = "") {
          return (this._xOffset = t), (this._xPosition = "end"), this;
        }
        width(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: t })
              : (this._width = t),
            this
          );
        }
        height(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: t })
              : (this._height = t),
            this
          );
        }
        centerHorizontally(t = "") {
          return this.left(t), (this._xPosition = "center"), this;
        }
        centerVertically(t = "") {
          return this.top(t), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig(),
            { width: r, height: o, maxWidth: s, maxHeight: a } = i,
            l = !(
              ("100%" !== r && "100vw" !== r) ||
              (s && "100%" !== s && "100vw" !== s)
            ),
            c = !(
              ("100%" !== o && "100vh" !== o) ||
              (a && "100%" !== a && "100vh" !== a)
            ),
            u = this._xPosition,
            d = this._xOffset,
            h = "rtl" === this._overlayRef.getConfig().direction;
          let f = "",
            p = "",
            m = "";
          l
            ? (m = "flex-start")
            : "center" === u
            ? ((m = "center"), h ? (p = d) : (f = d))
            : h
            ? "left" === u || "end" === u
              ? ((m = "flex-end"), (f = d))
              : ("right" === u || "start" === u) &&
                ((m = "flex-start"), (p = d))
            : "left" === u || "start" === u
            ? ((m = "flex-start"), (f = d))
            : ("right" === u || "end" === u) && ((m = "flex-end"), (p = d)),
            (t.position = this._cssPosition),
            (t.marginLeft = l ? "0" : f),
            (t.marginTop = c ? "0" : this._topOffset),
            (t.marginBottom = this._bottomOffset),
            (t.marginRight = l ? "0" : p),
            (e.justifyContent = m),
            (e.alignItems = c ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement,
            i = e.style;
          e.classList.remove(aS),
            (i.justifyContent =
              i.alignItems =
              t.marginTop =
              t.marginBottom =
              t.marginLeft =
              t.marginRight =
              t.position =
                ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let wz = (() => {
          class n {
            constructor(e, i, r, o) {
              (this._viewportRuler = e),
                (this._document = i),
                (this._platform = r),
                (this._overlayContainer = o);
            }
            global() {
              return new Dz();
            }
            flexibleConnectedTo(e) {
              return new Cz(
                e,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Q0), _(K), _(_t), _(wu));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Ez = 0,
        Ui = (() => {
          class n {
            constructor(e, i, r, o, s, a, l, c, u, d, h, f) {
              (this.scrollStrategies = e),
                (this._overlayContainer = i),
                (this._componentFactoryResolver = r),
                (this._positionBuilder = o),
                (this._keyboardDispatcher = s),
                (this._injector = a),
                (this._ngZone = l),
                (this._document = c),
                (this._directionality = u),
                (this._location = d),
                (this._outsideClickDispatcher = h),
                (this._animationsModuleType = f);
            }
            create(e) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                o = this._createPortalOutlet(r),
                s = new Om(e);
              return (
                (s.direction = s.direction || this._directionality.value),
                new Ma(
                  o,
                  i,
                  r,
                  s,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location,
                  this._outsideClickDispatcher,
                  "NoopAnimations" === this._animationsModuleType
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(e) {
              const i = this._document.createElement("div");
              return (
                (i.id = "cdk-overlay-" + Ez++),
                i.classList.add("cdk-overlay-pane"),
                e.appendChild(i),
                i
              );
            }
            _createHostElement() {
              const e = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(e), e
              );
            }
            _createPortalOutlet(e) {
              return (
                this._appRef || (this._appRef = this._injector.get(So)),
                new hz(
                  e,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                _(gz),
                _(wu),
                _(er),
                _(wz),
                _(yz),
                _(xe),
                _(Q),
                _(K),
                _(tu),
                _(Bs),
                _(vz),
                _(Ii, 8)
              );
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const Az = {
        provide: new E("cdk-connected-overlay-scroll-strategy"),
        deps: [Ui],
        useFactory: function Sz(n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let Pm = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = he({ type: n })),
          (n.ɵinj = ue({ providers: [Ui, Az], imports: [da, Ea, J0, J0] })),
          n
        );
      })();
      function Tz(n, t) {}
      class Eu {
        constructor() {
          (this.role = "dialog"),
            (this.panelClass = ""),
            (this.hasBackdrop = !0),
            (this.backdropClass = ""),
            (this.disableClose = !1),
            (this.width = ""),
            (this.height = ""),
            (this.data = null),
            (this.ariaDescribedBy = null),
            (this.ariaLabelledBy = null),
            (this.ariaLabel = null),
            (this.ariaModal = !0),
            (this.autoFocus = "first-tabbable"),
            (this.restoreFocus = !0),
            (this.closeOnNavigation = !0),
            (this.closeOnDestroy = !0);
        }
      }
      let lS = (() => {
        class n extends Du {
          constructor(e, i, r, o, s, a, l, c) {
            super(),
              (this._elementRef = e),
              (this._focusTrapFactory = i),
              (this._config = o),
              (this._interactivityChecker = s),
              (this._ngZone = a),
              (this._overlayRef = l),
              (this._focusMonitor = c),
              (this._elementFocusedBeforeDialogWasOpened = null),
              (this._closeInteractionType = null),
              (this.attachDomPortal = (u) => {
                this._portalOutlet.hasAttached();
                const d = this._portalOutlet.attachDomPortal(u);
                return this._contentAttached(), d;
              }),
              (this._ariaLabelledBy = this._config.ariaLabelledBy || null),
              (this._document = r);
          }
          _contentAttached() {
            this._initializeFocusTrap(),
              this._handleBackdropClicks(),
              this._captureInitialFocus();
          }
          _captureInitialFocus() {
            this._trapFocus();
          }
          ngOnDestroy() {
            this._restoreFocus();
          }
          attachComponentPortal(e) {
            this._portalOutlet.hasAttached();
            const i = this._portalOutlet.attachComponentPortal(e);
            return this._contentAttached(), i;
          }
          attachTemplatePortal(e) {
            this._portalOutlet.hasAttached();
            const i = this._portalOutlet.attachTemplatePortal(e);
            return this._contentAttached(), i;
          }
          _recaptureFocus() {
            this._containsFocus() || this._trapFocus();
          }
          _forceFocus(e, i) {
            this._interactivityChecker.isFocusable(e) ||
              ((e.tabIndex = -1),
              this._ngZone.runOutsideAngular(() => {
                const r = () => {
                  e.removeEventListener("blur", r),
                    e.removeEventListener("mousedown", r),
                    e.removeAttribute("tabindex");
                };
                e.addEventListener("blur", r),
                  e.addEventListener("mousedown", r);
              })),
              e.focus(i);
          }
          _focusByCssSelector(e, i) {
            let r = this._elementRef.nativeElement.querySelector(e);
            r && this._forceFocus(r, i);
          }
          _trapFocus() {
            const e = this._elementRef.nativeElement;
            switch (this._config.autoFocus) {
              case !1:
              case "dialog":
                this._containsFocus() || e.focus();
                break;
              case !0:
              case "first-tabbable":
                this._focusTrap.focusInitialElementWhenReady().then((i) => {
                  i || this._focusDialogContainer();
                });
                break;
              case "first-heading":
                this._focusByCssSelector(
                  'h1, h2, h3, h4, h5, h6, [role="heading"]'
                );
                break;
              default:
                this._focusByCssSelector(this._config.autoFocus);
            }
          }
          _restoreFocus() {
            const e = this._config.restoreFocus;
            let i = null;
            if (
              ("string" == typeof e
                ? (i = this._document.querySelector(e))
                : "boolean" == typeof e
                ? (i = e ? this._elementFocusedBeforeDialogWasOpened : null)
                : e && (i = e),
              this._config.restoreFocus && i && "function" == typeof i.focus)
            ) {
              const r = tm(),
                o = this._elementRef.nativeElement;
              (!r || r === this._document.body || r === o || o.contains(r)) &&
                (this._focusMonitor
                  ? (this._focusMonitor.focusVia(i, this._closeInteractionType),
                    (this._closeInteractionType = null))
                  : i.focus());
            }
            this._focusTrap && this._focusTrap.destroy();
          }
          _focusDialogContainer() {
            this._elementRef.nativeElement.focus &&
              this._elementRef.nativeElement.focus();
          }
          _containsFocus() {
            const e = this._elementRef.nativeElement,
              i = tm();
            return e === i || e.contains(i);
          }
          _initializeFocusTrap() {
            (this._focusTrap = this._focusTrapFactory.create(
              this._elementRef.nativeElement
            )),
              this._document &&
                (this._elementFocusedBeforeDialogWasOpened = tm());
          }
          _handleBackdropClicks() {
            this._overlayRef.backdropClick().subscribe(() => {
              this._config.disableClose && this._recaptureFocus();
            });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(
              g(ve),
              g(am),
              g(K, 8),
              g(Eu),
              g(Xc),
              g(Q),
              g(Ma),
              g(eu)
            );
          }),
          (n.ɵcmp = Re({
            type: n,
            selectors: [["cdk-dialog-container"]],
            viewQuery: function (e, i) {
              if ((1 & e && lr(wa, 7), 2 & e)) {
                let r;
                Xe((r = Je())) && (i._portalOutlet = r.first);
              }
            },
            hostAttrs: ["tabindex", "-1", 1, "cdk-dialog-container"],
            hostVars: 6,
            hostBindings: function (e, i) {
              2 & e &&
                ot("id", i._config.id || null)("role", i._config.role)(
                  "aria-modal",
                  i._config.ariaModal
                )(
                  "aria-labelledby",
                  i._config.ariaLabel ? null : i._ariaLabelledBy
                )("aria-label", i._config.ariaLabel)(
                  "aria-describedby",
                  i._config.ariaDescribedBy || null
                );
            },
            features: [ee],
            decls: 1,
            vars: 0,
            consts: [["cdkPortalOutlet", ""]],
            template: function (e, i) {
              1 & e && st(0, Tz, 0, 0, "ng-template", 0);
            },
            dependencies: [wa],
            styles: [
              ".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}",
            ],
            encapsulation: 2,
          })),
          n
        );
      })();
      class Nm {
        constructor(t, e) {
          (this.overlayRef = t),
            (this.config = e),
            (this.closed = new te()),
            (this.disableClose = e.disableClose),
            (this.backdropClick = t.backdropClick()),
            (this.keydownEvents = t.keydownEvents()),
            (this.outsidePointerEvents = t.outsidePointerEvents()),
            (this.id = e.id),
            this.keydownEvents.subscribe((i) => {
              27 === i.keyCode &&
                !this.disableClose &&
                !tM(i) &&
                (i.preventDefault(),
                this.close(void 0, { focusOrigin: "keyboard" }));
            }),
            this.backdropClick.subscribe(() => {
              this.disableClose || this.close(void 0, { focusOrigin: "mouse" });
            });
        }
        close(t, e) {
          if (this.containerInstance) {
            const i = this.closed;
            (this.containerInstance._closeInteractionType =
              e?.focusOrigin || "program"),
              this.overlayRef.dispose(),
              i.next(t),
              i.complete(),
              (this.componentInstance = this.containerInstance = null);
          }
        }
        updatePosition() {
          return this.overlayRef.updatePosition(), this;
        }
        updateSize(t = "", e = "") {
          return this.overlayRef.updateSize({ width: t, height: e }), this;
        }
        addPanelClass(t) {
          return this.overlayRef.addPanelClass(t), this;
        }
        removePanelClass(t) {
          return this.overlayRef.removePanelClass(t), this;
        }
      }
      const cS = new E("DialogScrollStrategy"),
        Iz = new E("DialogData"),
        xz = new E("DefaultDialogConfig"),
        kz = {
          provide: cS,
          deps: [Ui],
          useFactory: function Rz(n) {
            return () => n.scrollStrategies.block();
          },
        };
      let Fz = 0,
        uS = (() => {
          class n {
            constructor(e, i, r, o, s, a) {
              (this._overlay = e),
                (this._injector = i),
                (this._defaultOptions = r),
                (this._parentDialog = o),
                (this._overlayContainer = s),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new te()),
                (this._afterOpenedAtThisLevel = new te()),
                (this._ariaHiddenElements = new Map()),
                (this.afterAllClosed = ac(() =>
                  this.openDialogs.length
                    ? this._getAfterAllClosed()
                    : this._getAfterAllClosed().pipe(fr(void 0))
                )),
                (this._scrollStrategy = a);
            }
            get openDialogs() {
              return this._parentDialog
                ? this._parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
            }
            get afterOpened() {
              return this._parentDialog
                ? this._parentDialog.afterOpened
                : this._afterOpenedAtThisLevel;
            }
            open(e, i) {
              ((i = { ...(this._defaultOptions || new Eu()), ...i }).id =
                i.id || "cdk-dialog-" + Fz++),
                i.id && this.getDialogById(i.id);
              const o = this._getOverlayConfig(i),
                s = this._overlay.create(o),
                a = new Nm(s, i),
                l = this._attachContainer(s, a, i);
              return (
                (a.containerInstance = l),
                this._attachDialogContent(e, a, l, i),
                this.openDialogs.length ||
                  this._hideNonDialogContentFromAssistiveTechnology(),
                this.openDialogs.push(a),
                a.closed.subscribe(() => this._removeOpenDialog(a, !0)),
                this.afterOpened.next(a),
                a
              );
            }
            closeAll() {
              Lm(this.openDialogs, (e) => e.close());
            }
            getDialogById(e) {
              return this.openDialogs.find((i) => i.id === e);
            }
            ngOnDestroy() {
              Lm(this._openDialogsAtThisLevel, (e) => {
                !1 === e.config.closeOnDestroy && this._removeOpenDialog(e, !1);
              }),
                Lm(this._openDialogsAtThisLevel, (e) => e.close()),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete(),
                (this._openDialogsAtThisLevel = []);
            }
            _getOverlayConfig(e) {
              const i = new Om({
                positionStrategy:
                  e.positionStrategy ||
                  this._overlay
                    .position()
                    .global()
                    .centerHorizontally()
                    .centerVertically(),
                scrollStrategy: e.scrollStrategy || this._scrollStrategy(),
                panelClass: e.panelClass,
                hasBackdrop: e.hasBackdrop,
                direction: e.direction,
                minWidth: e.minWidth,
                minHeight: e.minHeight,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                width: e.width,
                height: e.height,
                disposeOnNavigation: e.closeOnNavigation,
              });
              return e.backdropClass && (i.backdropClass = e.backdropClass), i;
            }
            _attachContainer(e, i, r) {
              const o = r.injector || r.viewContainerRef?.injector,
                s = [
                  { provide: Eu, useValue: r },
                  { provide: Nm, useValue: i },
                  { provide: Ma, useValue: e },
                ];
              let a;
              r.container
                ? "function" == typeof r.container
                  ? (a = r.container)
                  : ((a = r.container.type),
                    s.push(...r.container.providers(r)))
                : (a = lS);
              const l = new Da(
                a,
                r.viewContainerRef,
                xe.create({ parent: o || this._injector, providers: s }),
                r.componentFactoryResolver
              );
              return e.attach(l).instance;
            }
            _attachDialogContent(e, i, r, o) {
              if (e instanceof Sn) {
                const s = this._createInjector(o, i, r, void 0);
                let a = { $implicit: o.data, dialogRef: i };
                o.templateContext &&
                  (a = {
                    ...a,
                    ...("function" == typeof o.templateContext
                      ? o.templateContext()
                      : o.templateContext),
                  }),
                  r.attachTemplatePortal(new km(e, null, a, s));
              } else {
                const s = this._createInjector(o, i, r, this._injector),
                  a = r.attachComponentPortal(
                    new Da(e, o.viewContainerRef, s, o.componentFactoryResolver)
                  );
                i.componentInstance = a.instance;
              }
            }
            _createInjector(e, i, r, o) {
              const s = e.injector || e.viewContainerRef?.injector,
                a = [
                  { provide: Iz, useValue: e.data },
                  { provide: Nm, useValue: i },
                ];
              return (
                e.providers &&
                  ("function" == typeof e.providers
                    ? a.push(...e.providers(i, e, r))
                    : a.push(...e.providers)),
                e.direction &&
                  (!s || !s.get(tu, null, L.Optional)) &&
                  a.push({
                    provide: tu,
                    useValue: { value: e.direction, change: O() },
                  }),
                xe.create({ parent: s || o, providers: a })
              );
            }
            _removeOpenDialog(e, i) {
              const r = this.openDialogs.indexOf(e);
              r > -1 &&
                (this.openDialogs.splice(r, 1),
                this.openDialogs.length ||
                  (this._ariaHiddenElements.forEach((o, s) => {
                    o
                      ? s.setAttribute("aria-hidden", o)
                      : s.removeAttribute("aria-hidden");
                  }),
                  this._ariaHiddenElements.clear(),
                  i && this._getAfterAllClosed().next()));
            }
            _hideNonDialogContentFromAssistiveTechnology() {
              const e = this._overlayContainer.getContainerElement();
              if (e.parentElement) {
                const i = e.parentElement.children;
                for (let r = i.length - 1; r > -1; r--) {
                  const o = i[r];
                  o !== e &&
                    "SCRIPT" !== o.nodeName &&
                    "STYLE" !== o.nodeName &&
                    !o.hasAttribute("aria-live") &&
                    (this._ariaHiddenElements.set(
                      o,
                      o.getAttribute("aria-hidden")
                    ),
                    o.setAttribute("aria-hidden", "true"));
                }
              }
            }
            _getAfterAllClosed() {
              const e = this._parentDialog;
              return e
                ? e._getAfterAllClosed()
                : this._afterAllClosedAtThisLevel;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                _(Ui),
                _(xe),
                _(xz, 8),
                _(n, 12),
                _(wu),
                _(cS)
              );
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function Lm(n, t) {
        let e = n.length;
        for (; e--; ) t(n[e]);
      }
      let Oz = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = he({ type: n })),
          (n.ɵinj = ue({ providers: [uS, kz], imports: [Pm, Ea, SH, Ea] })),
          n
        );
      })();
      function Pz(n, t) {}
      const Ho = {
          params: {
            enterAnimationDuration: "150ms",
            exitAnimationDuration: "75ms",
          },
        },
        Nz = {
          dialogContainer: Sp("dialogContainer", [
            ia("void, exit", xn({ opacity: 0, transform: "scale(0.7)" })),
            ia("enter", xn({ transform: "none" })),
            ra(
              "* => enter",
              cE([
                na(
                  "{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)",
                  xn({ transform: "none", opacity: 1 })
                ),
                hE("@*", dE(), { optional: !0 }),
              ]),
              Ho
            ),
            ra(
              "* => void, * => exit",
              cE([
                na(
                  "{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)",
                  xn({ opacity: 0 })
                ),
                hE("@*", dE(), { optional: !0 }),
              ]),
              Ho
            ),
          ]),
        };
      class Mu {
        constructor() {
          (this.role = "dialog"),
            (this.panelClass = ""),
            (this.hasBackdrop = !0),
            (this.backdropClass = ""),
            (this.disableClose = !1),
            (this.width = ""),
            (this.height = ""),
            (this.maxWidth = "80vw"),
            (this.data = null),
            (this.ariaDescribedBy = null),
            (this.ariaLabelledBy = null),
            (this.ariaLabel = null),
            (this.autoFocus = "first-tabbable"),
            (this.restoreFocus = !0),
            (this.delayFocusTrap = !0),
            (this.closeOnNavigation = !0),
            (this.enterAnimationDuration = Ho.params.enterAnimationDuration),
            (this.exitAnimationDuration = Ho.params.exitAnimationDuration);
        }
      }
      let Lz = (() => {
          class n extends lS {
            constructor(e, i, r, o, s, a, l, c) {
              super(e, i, r, o, s, a, l, c),
                (this._animationStateChanged = new Se());
            }
            _captureInitialFocus() {
              this._config.delayFocusTrap || this._trapFocus();
            }
            _openAnimationDone(e) {
              this._config.delayFocusTrap && this._trapFocus(),
                this._animationStateChanged.next({
                  state: "opened",
                  totalTime: e,
                });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(ve),
                g(am),
                g(K, 8),
                g(Mu),
                g(Xc),
                g(Q),
                g(Ma),
                g(eu)
              );
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["ng-component"]],
              features: [ee],
              decls: 0,
              vars: 0,
              template: function (e, i) {},
              encapsulation: 2,
            })),
            n
          );
        })(),
        Vz = (() => {
          class n extends Lz {
            constructor(e, i, r, o, s, a, l, c, u) {
              super(e, i, r, o, s, a, l, u),
                (this._changeDetectorRef = c),
                (this._state = "enter");
            }
            _onAnimationDone({ toState: e, totalTime: i }) {
              "enter" === e
                ? this._openAnimationDone(i)
                : "exit" === e &&
                  this._animationStateChanged.next({
                    state: "closed",
                    totalTime: i,
                  });
            }
            _onAnimationStart({ toState: e, totalTime: i }) {
              "enter" === e
                ? this._animationStateChanged.next({
                    state: "opening",
                    totalTime: i,
                  })
                : ("exit" === e || "void" === e) &&
                  this._animationStateChanged.next({
                    state: "closing",
                    totalTime: i,
                  });
            }
            _startExitAnimation() {
              (this._state = "exit"), this._changeDetectorRef.markForCheck();
            }
            _getAnimationState() {
              return {
                value: this._state,
                params: {
                  enterAnimationDuration:
                    this._config.enterAnimationDuration ||
                    Ho.params.enterAnimationDuration,
                  exitAnimationDuration:
                    this._config.exitAnimationDuration ||
                    Ho.params.exitAnimationDuration,
                },
              };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                g(ve),
                g(am),
                g(K, 8),
                g(Mu),
                g(Xc),
                g(Q),
                g(Ma),
                g(cr),
                g(eu)
              );
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-dialog-container"]],
              hostAttrs: ["tabindex", "-1", 1, "mat-dialog-container"],
              hostVars: 7,
              hostBindings: function (e, i) {
                1 & e &&
                  wl("@dialogContainer.start", function (o) {
                    return i._onAnimationStart(o);
                  })("@dialogContainer.done", function (o) {
                    return i._onAnimationDone(o);
                  }),
                  2 & e &&
                    (Ml("id", i._config.id),
                    ot("aria-modal", i._config.ariaModal)(
                      "role",
                      i._config.role
                    )(
                      "aria-labelledby",
                      i._config.ariaLabel ? null : i._ariaLabelledBy
                    )("aria-label", i._config.ariaLabel)(
                      "aria-describedby",
                      i._config.ariaDescribedBy || null
                    ),
                    Sl("@dialogContainer", i._getAnimationState()));
              },
              features: [ee],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (e, i) {
                1 & e && st(0, Pz, 0, 0, "ng-template", 0);
              },
              dependencies: [wa],
              styles: [
                ".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions.mat-dialog-actions-align-center,.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions.mat-dialog-actions-align-end,.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}",
              ],
              encapsulation: 2,
              data: { animation: [Nz.dialogContainer] },
            })),
            n
          );
        })();
      class Su {
        constructor(t, e, i) {
          (this._ref = t),
            (this._containerInstance = i),
            (this._afterOpened = new te()),
            (this._beforeClosed = new te()),
            (this._state = 0),
            (this.disableClose = e.disableClose),
            (this.id = t.id),
            i._animationStateChanged
              .pipe(
                It((r) => "opened" === r.state),
                Lt(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            i._animationStateChanged
              .pipe(
                It((r) => "closed" === r.state),
                Lt(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout),
                  this._finishDialogClose();
              }),
            t.overlayRef.detachments().subscribe(() => {
              this._beforeClosed.next(this._result),
                this._beforeClosed.complete(),
                this._finishDialogClose();
            }),
            Ra(
              this.backdropClick(),
              this.keydownEvents().pipe(
                It((r) => 27 === r.keyCode && !this.disableClose && !tM(r))
              )
            ).subscribe((r) => {
              this.disableClose ||
                (r.preventDefault(),
                dS(this, "keydown" === r.type ? "keyboard" : "mouse"));
            });
        }
        close(t) {
          (this._result = t),
            this._containerInstance._animationStateChanged
              .pipe(
                It((e) => "closing" === e.state),
                Lt(1)
              )
              .subscribe((e) => {
                this._beforeClosed.next(t),
                  this._beforeClosed.complete(),
                  this._ref.overlayRef.detachBackdrop(),
                  (this._closeFallbackTimeout = setTimeout(
                    () => this._finishDialogClose(),
                    e.totalTime + 100
                  ));
              }),
            (this._state = 1),
            this._containerInstance._startExitAnimation();
        }
        afterOpened() {
          return this._afterOpened;
        }
        afterClosed() {
          return this._ref.closed;
        }
        beforeClosed() {
          return this._beforeClosed;
        }
        backdropClick() {
          return this._ref.backdropClick;
        }
        keydownEvents() {
          return this._ref.keydownEvents;
        }
        updatePosition(t) {
          let e = this._ref.config.positionStrategy;
          return (
            t && (t.left || t.right)
              ? t.left
                ? e.left(t.left)
                : e.right(t.right)
              : e.centerHorizontally(),
            t && (t.top || t.bottom)
              ? t.top
                ? e.top(t.top)
                : e.bottom(t.bottom)
              : e.centerVertically(),
            this._ref.updatePosition(),
            this
          );
        }
        updateSize(t = "", e = "") {
          return this._ref.updateSize(t, e), this;
        }
        addPanelClass(t) {
          return this._ref.addPanelClass(t), this;
        }
        removePanelClass(t) {
          return this._ref.removePanelClass(t), this;
        }
        getState() {
          return this._state;
        }
        _finishDialogClose() {
          (this._state = 2),
            this._ref.close(this._result, {
              focusOrigin: this._closeInteractionType,
            }),
            (this.componentInstance = null);
        }
      }
      function dS(n, t, e) {
        return (n._closeInteractionType = t), n.close(e);
      }
      const hS = new E("MatDialogData"),
        Bz = new E("mat-dialog-default-options"),
        fS = new E("mat-dialog-scroll-strategy"),
        Hz = {
          provide: fS,
          deps: [Ui],
          useFactory: function jz(n) {
            return () => n.scrollStrategies.block();
          },
        };
      let Uz = 0,
        $z = (() => {
          class n {
            constructor(e, i, r, o, s, a, l, c, u, d) {
              (this._overlay = e),
                (this._defaultOptions = r),
                (this._parentDialog = o),
                (this._dialogRefConstructor = l),
                (this._dialogContainerType = c),
                (this._dialogDataToken = u),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new te()),
                (this._afterOpenedAtThisLevel = new te()),
                (this._idPrefix = "mat-dialog-"),
                (this.afterAllClosed = ac(() =>
                  this.openDialogs.length
                    ? this._getAfterAllClosed()
                    : this._getAfterAllClosed().pipe(fr(void 0))
                )),
                (this._scrollStrategy = a),
                (this._dialog = i.get(uS));
            }
            get openDialogs() {
              return this._parentDialog
                ? this._parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
            }
            get afterOpened() {
              return this._parentDialog
                ? this._parentDialog.afterOpened
                : this._afterOpenedAtThisLevel;
            }
            _getAfterAllClosed() {
              const e = this._parentDialog;
              return e
                ? e._getAfterAllClosed()
                : this._afterAllClosedAtThisLevel;
            }
            open(e, i) {
              let r;
              ((i = { ...(this._defaultOptions || new Mu()), ...i }).id =
                i.id || `${this._idPrefix}${Uz++}`),
                (i.scrollStrategy = i.scrollStrategy || this._scrollStrategy());
              const o = this._dialog.open(e, {
                ...i,
                positionStrategy: this._overlay
                  .position()
                  .global()
                  .centerHorizontally()
                  .centerVertically(),
                disableClose: !0,
                closeOnDestroy: !1,
                container: {
                  type: this._dialogContainerType,
                  providers: () => [
                    { provide: Mu, useValue: i },
                    { provide: Eu, useValue: i },
                  ],
                },
                templateContext: () => ({ dialogRef: r }),
                providers: (s, a, l) => (
                  (r = new this._dialogRefConstructor(s, i, l)),
                  r.updatePosition(i?.position),
                  [
                    { provide: this._dialogContainerType, useValue: l },
                    { provide: this._dialogDataToken, useValue: a.data },
                    { provide: this._dialogRefConstructor, useValue: r },
                  ]
                ),
              });
              return (
                (r.componentInstance = o.componentInstance),
                this.openDialogs.push(r),
                this.afterOpened.next(r),
                r.afterClosed().subscribe(() => {
                  const s = this.openDialogs.indexOf(r);
                  s > -1 &&
                    (this.openDialogs.splice(s, 1),
                    this.openDialogs.length ||
                      this._getAfterAllClosed().next());
                }),
                r
              );
            }
            closeAll() {
              this._closeDialogs(this.openDialogs);
            }
            getDialogById(e) {
              return this.openDialogs.find((i) => i.id === e);
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete();
            }
            _closeDialogs(e) {
              let i = e.length;
              for (; i--; ) e[i].close();
            }
          }
          return (
            (n.ɵfac = function (e) {
              hl();
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Sa = (() => {
          class n extends $z {
            constructor(e, i, r, o, s, a, l, c) {
              super(e, i, o, a, l, s, Su, Vz, hS, c);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                _(Ui),
                _(xe),
                _(Bs, 8),
                _(Bz, 8),
                _(fS),
                _(n, 12),
                _(wu),
                _(Ii, 8)
              );
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        zz = (() => {
          class n {
            constructor(e, i, r) {
              (this.dialogRef = e),
                (this._elementRef = i),
                (this._dialog = r),
                (this.type = "button");
            }
            ngOnInit() {
              this.dialogRef ||
                (this.dialogRef = (function Wz(n, t) {
                  let e = n.nativeElement.parentElement;
                  for (; e && !e.classList.contains("mat-dialog-container"); )
                    e = e.parentElement;
                  return e ? t.find((i) => i.id === e.id) : null;
                })(this._elementRef, this._dialog.openDialogs));
            }
            ngOnChanges(e) {
              const i = e._matDialogClose || e._matDialogCloseResult;
              i && (this.dialogResult = i.currentValue);
            }
            _onButtonClick(e) {
              dS(
                this.dialogRef,
                0 === e.screenX && 0 === e.screenY ? "keyboard" : "mouse",
                this.dialogResult
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Su, 8), g(ve), g(Sa));
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["", "mat-dialog-close", ""],
                ["", "matDialogClose", ""],
              ],
              hostVars: 2,
              hostBindings: function (e, i) {
                1 & e &&
                  W("click", function (o) {
                    return i._onButtonClick(o);
                  }),
                  2 & e &&
                    ot("aria-label", i.ariaLabel || null)("type", i.type);
              },
              inputs: {
                ariaLabel: ["aria-label", "ariaLabel"],
                type: "type",
                dialogResult: ["mat-dialog-close", "dialogResult"],
                _matDialogClose: ["matDialogClose", "_matDialogClose"],
              },
              exportAs: ["matDialogClose"],
              features: [Ot],
            })),
            n
          );
        })(),
        Gz = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [
                ["", "mat-dialog-content", ""],
                ["mat-dialog-content"],
                ["", "matDialogContent", ""],
              ],
              hostAttrs: [1, "mat-dialog-content"],
            })),
            n
          );
        })(),
        qz = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({
              providers: [Sa, Hz],
              imports: [Oz, Pm, Ea, ht, ht],
            })),
            n
          );
        })();
      function Kz(n, t) {
        if (1 & n) {
          const e = yo();
          R(0, "div", 2)(1, "button", 3),
            W("click", function () {
              return Fn(e), On(Mt().action());
            }),
            ie(2),
            x()();
        }
        if (2 & n) {
          const e = Mt();
          q(2), li(e.data.action);
        }
      }
      function Yz(n, t) {}
      const pS = new E("MatSnackBarData");
      class Au {
        constructor() {
          (this.politeness = "assertive"),
            (this.announcementMessage = ""),
            (this.duration = 0),
            (this.data = null),
            (this.horizontalPosition = "center"),
            (this.verticalPosition = "bottom");
        }
      }
      const Zz = Math.pow(2, 31) - 1;
      class Vm {
        constructor(t, e) {
          (this._overlayRef = e),
            (this._afterDismissed = new te()),
            (this._afterOpened = new te()),
            (this._onAction = new te()),
            (this._dismissedByAction = !1),
            (this.containerInstance = t),
            t._onExit.subscribe(() => this._finishDismiss());
        }
        dismiss() {
          this._afterDismissed.closed || this.containerInstance.exit(),
            clearTimeout(this._durationTimeoutId);
        }
        dismissWithAction() {
          this._onAction.closed ||
            ((this._dismissedByAction = !0),
            this._onAction.next(),
            this._onAction.complete(),
            this.dismiss()),
            clearTimeout(this._durationTimeoutId);
        }
        closeWithAction() {
          this.dismissWithAction();
        }
        _dismissAfter(t) {
          this._durationTimeoutId = setTimeout(
            () => this.dismiss(),
            Math.min(t, Zz)
          );
        }
        _open() {
          this._afterOpened.closed ||
            (this._afterOpened.next(), this._afterOpened.complete());
        }
        _finishDismiss() {
          this._overlayRef.dispose(),
            this._onAction.closed || this._onAction.complete(),
            this._afterDismissed.next({
              dismissedByAction: this._dismissedByAction,
            }),
            this._afterDismissed.complete(),
            (this._dismissedByAction = !1);
        }
        afterDismissed() {
          return this._afterDismissed;
        }
        afterOpened() {
          return this.containerInstance._onEnter;
        }
        onAction() {
          return this._onAction;
        }
      }
      let Qz = (() => {
        class n {
          constructor(e, i) {
            (this.snackBarRef = e), (this.data = i);
          }
          action() {
            this.snackBarRef.dismissWithAction();
          }
          get hasAction() {
            return !!this.data.action;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(g(Vm), g(pS));
          }),
          (n.ɵcmp = Re({
            type: n,
            selectors: [["simple-snack-bar"]],
            hostAttrs: [1, "mat-simple-snackbar"],
            decls: 3,
            vars: 2,
            consts: [
              [1, "mat-simple-snack-bar-content"],
              ["class", "mat-simple-snackbar-action", 4, "ngIf"],
              [1, "mat-simple-snackbar-action"],
              ["mat-button", "", 3, "click"],
            ],
            template: function (e, i) {
              1 & e && (R(0, "span", 0), ie(1), x(), st(2, Kz, 3, 1, "div", 1)),
                2 & e &&
                  (q(1), li(i.data.message), q(1), se("ngIf", i.hasAction));
            },
            dependencies: [Rf, Ir],
            styles: [
              ".mat-simple-snackbar{display:flex;justify-content:space-between;align-items:center;line-height:20px;opacity:1}.mat-simple-snackbar-action{flex-shrink:0;margin:-8px -8px -8px 8px}.mat-simple-snackbar-action button{max-height:36px;min-width:0}[dir=rtl] .mat-simple-snackbar-action{margin-left:-8px;margin-right:8px}.mat-simple-snack-bar-content{overflow:hidden;text-overflow:ellipsis}",
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          n
        );
      })();
      const Xz = {
        snackBarState: Sp("state", [
          ia("void, hidden", xn({ transform: "scale(0.8)", opacity: 0 })),
          ia("visible", xn({ transform: "scale(1)", opacity: 1 })),
          ra("* => visible", na("150ms cubic-bezier(0, 0, 0.2, 1)")),
          ra(
            "* => void, * => hidden",
            na("75ms cubic-bezier(0.4, 0.0, 1, 1)", xn({ opacity: 0 }))
          ),
        ]),
      };
      let Jz = (() => {
          class n extends Du {
            constructor(e, i, r, o, s) {
              super(),
                (this._ngZone = e),
                (this._elementRef = i),
                (this._changeDetectorRef = r),
                (this._platform = o),
                (this.snackBarConfig = s),
                (this._announceDelay = 150),
                (this._destroyed = !1),
                (this._onAnnounce = new te()),
                (this._onExit = new te()),
                (this._onEnter = new te()),
                (this._animationState = "void"),
                (this.attachDomPortal = (a) => {
                  this._assertNotAttached();
                  const l = this._portalOutlet.attachDomPortal(a);
                  return this._afterPortalAttached(), l;
                }),
                (this._live =
                  "assertive" !== s.politeness || s.announcementMessage
                    ? "off" === s.politeness
                      ? "off"
                      : "polite"
                    : "assertive"),
                this._platform.FIREFOX &&
                  ("polite" === this._live && (this._role = "status"),
                  "assertive" === this._live && (this._role = "alert"));
            }
            attachComponentPortal(e) {
              this._assertNotAttached();
              const i = this._portalOutlet.attachComponentPortal(e);
              return this._afterPortalAttached(), i;
            }
            attachTemplatePortal(e) {
              this._assertNotAttached();
              const i = this._portalOutlet.attachTemplatePortal(e);
              return this._afterPortalAttached(), i;
            }
            onAnimationEnd(e) {
              const { fromState: i, toState: r } = e;
              if (
                ((("void" === r && "void" !== i) || "hidden" === r) &&
                  this._completeExit(),
                "visible" === r)
              ) {
                const o = this._onEnter;
                this._ngZone.run(() => {
                  o.next(), o.complete();
                });
              }
            }
            enter() {
              this._destroyed ||
                ((this._animationState = "visible"),
                this._changeDetectorRef.detectChanges(),
                this._screenReaderAnnounce());
            }
            exit() {
              return (
                this._ngZone.run(() => {
                  (this._animationState = "hidden"),
                    this._elementRef.nativeElement.setAttribute("mat-exit", ""),
                    clearTimeout(this._announceTimeoutId);
                }),
                this._onExit
              );
            }
            ngOnDestroy() {
              (this._destroyed = !0), this._completeExit();
            }
            _completeExit() {
              this._ngZone.onMicrotaskEmpty.pipe(Lt(1)).subscribe(() => {
                this._ngZone.run(() => {
                  this._onExit.next(), this._onExit.complete();
                });
              });
            }
            _afterPortalAttached() {
              const e = this._elementRef.nativeElement,
                i = this.snackBarConfig.panelClass;
              i &&
                (Array.isArray(i)
                  ? i.forEach((r) => e.classList.add(r))
                  : e.classList.add(i));
            }
            _assertNotAttached() {
              this._portalOutlet.hasAttached();
            }
            _screenReaderAnnounce() {
              this._announceTimeoutId ||
                this._ngZone.runOutsideAngular(() => {
                  this._announceTimeoutId = setTimeout(() => {
                    const e =
                        this._elementRef.nativeElement.querySelector(
                          "[aria-hidden]"
                        ),
                      i =
                        this._elementRef.nativeElement.querySelector(
                          "[aria-live]"
                        );
                    if (e && i) {
                      let r = null;
                      this._platform.isBrowser &&
                        document.activeElement instanceof HTMLElement &&
                        e.contains(document.activeElement) &&
                        (r = document.activeElement),
                        e.removeAttribute("aria-hidden"),
                        i.appendChild(e),
                        r?.focus(),
                        this._onAnnounce.next(),
                        this._onAnnounce.complete();
                    }
                  }, this._announceDelay);
                });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Q), g(ve), g(cr), g(_t), g(Au));
            }),
            (n.ɵdir = F({
              type: n,
              viewQuery: function (e, i) {
                if ((1 & e && lr(wa, 7), 2 & e)) {
                  let r;
                  Xe((r = Je())) && (i._portalOutlet = r.first);
                }
              },
              features: [ee],
            })),
            n
          );
        })(),
        e3 = (() => {
          class n extends Jz {
            _afterPortalAttached() {
              super._afterPortalAttached(),
                "center" === this.snackBarConfig.horizontalPosition &&
                  this._elementRef.nativeElement.classList.add(
                    "mat-snack-bar-center"
                  ),
                "top" === this.snackBarConfig.verticalPosition &&
                  this._elementRef.nativeElement.classList.add(
                    "mat-snack-bar-top"
                  );
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = ut(n)))(i || n);
              };
            })()),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["snack-bar-container"]],
              hostAttrs: [1, "mat-snack-bar-container"],
              hostVars: 1,
              hostBindings: function (e, i) {
                1 & e &&
                  wl("@state.done", function (o) {
                    return i.onAnimationEnd(o);
                  }),
                  2 & e && Sl("@state", i._animationState);
              },
              features: [ee],
              decls: 3,
              vars: 2,
              consts: [
                ["aria-hidden", "true"],
                ["cdkPortalOutlet", ""],
              ],
              template: function (e, i) {
                1 & e &&
                  (R(0, "div", 0),
                  st(1, Yz, 0, 0, "ng-template", 1),
                  x(),
                  Ve(2, "div")),
                  2 & e && (q(2), ot("aria-live", i._live)("role", i._role));
              },
              dependencies: [wa],
              styles: [
                ".mat-snack-bar-container{border-radius:4px;box-sizing:border-box;display:block;margin:24px;max-width:33vw;min-width:344px;padding:14px 16px;min-height:48px;transform-origin:center}.cdk-high-contrast-active .mat-snack-bar-container{border:solid 1px}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:8px;max-width:100%;min-width:0;width:100%}",
              ],
              encapsulation: 2,
              data: { animation: [Xz.snackBarState] },
            })),
            n
          );
        })(),
        mS = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [Pm, Ea, Pf, K0, ht, ht] })),
            n
          );
        })();
      const gS = new E("mat-snack-bar-default-options", {
        providedIn: "root",
        factory: function t3() {
          return new Au();
        },
      });
      let n3 = (() => {
          class n {
            constructor(e, i, r, o, s, a) {
              (this._overlay = e),
                (this._live = i),
                (this._injector = r),
                (this._breakpointObserver = o),
                (this._parentSnackBar = s),
                (this._defaultConfig = a),
                (this._snackBarRefAtThisLevel = null);
            }
            get _openedSnackBarRef() {
              const e = this._parentSnackBar;
              return e ? e._openedSnackBarRef : this._snackBarRefAtThisLevel;
            }
            set _openedSnackBarRef(e) {
              this._parentSnackBar
                ? (this._parentSnackBar._openedSnackBarRef = e)
                : (this._snackBarRefAtThisLevel = e);
            }
            openFromComponent(e, i) {
              return this._attach(e, i);
            }
            openFromTemplate(e, i) {
              return this._attach(e, i);
            }
            open(e, i = "", r) {
              const o = { ...this._defaultConfig, ...r };
              return (
                (o.data = { message: e, action: i }),
                o.announcementMessage === e && (o.announcementMessage = void 0),
                this.openFromComponent(this.simpleSnackBarComponent, o)
              );
            }
            dismiss() {
              this._openedSnackBarRef && this._openedSnackBarRef.dismiss();
            }
            ngOnDestroy() {
              this._snackBarRefAtThisLevel &&
                this._snackBarRefAtThisLevel.dismiss();
            }
            _attachSnackBarContainer(e, i) {
              const o = xe.create({
                  parent:
                    (i && i.viewContainerRef && i.viewContainerRef.injector) ||
                    this._injector,
                  providers: [{ provide: Au, useValue: i }],
                }),
                s = new Da(
                  this.snackBarContainerComponent,
                  i.viewContainerRef,
                  o
                ),
                a = e.attach(s);
              return (a.instance.snackBarConfig = i), a.instance;
            }
            _attach(e, i) {
              const r = { ...new Au(), ...this._defaultConfig, ...i },
                o = this._createOverlay(r),
                s = this._attachSnackBarContainer(o, r),
                a = new Vm(s, o);
              if (e instanceof Sn) {
                const l = new km(e, null, {
                  $implicit: r.data,
                  snackBarRef: a,
                });
                a.instance = s.attachTemplatePortal(l);
              } else {
                const l = this._createInjector(r, a),
                  c = new Da(e, void 0, l),
                  u = s.attachComponentPortal(c);
                a.instance = u.instance;
              }
              return (
                this._breakpointObserver
                  .observe("(max-width: 599.98px) and (orientation: portrait)")
                  .pipe(wr(o.detachments()))
                  .subscribe((l) => {
                    o.overlayElement.classList.toggle(
                      this.handsetCssClass,
                      l.matches
                    );
                  }),
                r.announcementMessage &&
                  s._onAnnounce.subscribe(() => {
                    this._live.announce(r.announcementMessage, r.politeness);
                  }),
                this._animateSnackBar(a, r),
                (this._openedSnackBarRef = a),
                this._openedSnackBarRef
              );
            }
            _animateSnackBar(e, i) {
              e.afterDismissed().subscribe(() => {
                this._openedSnackBarRef == e &&
                  (this._openedSnackBarRef = null),
                  i.announcementMessage && this._live.clear();
              }),
                this._openedSnackBarRef
                  ? (this._openedSnackBarRef.afterDismissed().subscribe(() => {
                      e.containerInstance.enter();
                    }),
                    this._openedSnackBarRef.dismiss())
                  : e.containerInstance.enter(),
                i.duration &&
                  i.duration > 0 &&
                  e.afterOpened().subscribe(() => e._dismissAfter(i.duration));
            }
            _createOverlay(e) {
              const i = new Om();
              i.direction = e.direction;
              let r = this._overlay.position().global();
              const o = "rtl" === e.direction,
                s =
                  "left" === e.horizontalPosition ||
                  ("start" === e.horizontalPosition && !o) ||
                  ("end" === e.horizontalPosition && o),
                a = !s && "center" !== e.horizontalPosition;
              return (
                s ? r.left("0") : a ? r.right("0") : r.centerHorizontally(),
                "top" === e.verticalPosition ? r.top("0") : r.bottom("0"),
                (i.positionStrategy = r),
                this._overlay.create(i)
              );
            }
            _createInjector(e, i) {
              return xe.create({
                parent:
                  (e && e.viewContainerRef && e.viewContainerRef.injector) ||
                  this._injector,
                providers: [
                  { provide: Vm, useValue: i },
                  { provide: pS, useValue: e.data },
                ],
              });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Ui), _(gM), _(xe), _(sm), _(n, 12), _(gS));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Rr = (() => {
          class n extends n3 {
            constructor(e, i, r, o, s, a) {
              super(e, i, r, o, s, a),
                (this.simpleSnackBarComponent = Qz),
                (this.snackBarContainerComponent = e3),
                (this.handsetCssClass = "mat-snack-bar-handset");
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(Ui), _(gM), _(xe), _(sm), _(n, 12), _(gS));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: mS })),
            n
          );
        })();
      const Zt = "https://flixfolio.herokuapp.com/";
      let Uo = (() => {
          class n {
            constructor(e) {
              this.http = e;
            }
            userRegistration(e) {
              return (
                console.log(e),
                this.http.post(Zt + "users", e).pipe(je(this.handleError))
              );
            }
            userLogin(e) {
              return (
                console.log(e),
                this.http.post(Zt + "login", e).pipe(je(this.handleError))
              );
            }
            getAllMovies() {
              let e = localStorage.getItem("token");
              return (
                localStorage.getItem("user"),
                this.http
                  .get(Zt + "movies", {
                    headers: new nt({ Authorization: "Bearer " + e }),
                  })
                  .pipe(P(this.extractResponseData), je(this.handleError))
              );
            }
            getOneMovie(e) {
              const i = localStorage.getItem("token");
              return this.http
                .get(`https://flixfolio.herokuapp.com/movies/${e}`, {
                  headers: new nt({ Authorization: "Bearer " + i }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            getDirector(e) {
              const i = localStorage.getItem("token");
              return this.http
                .get(`https://flixfolio.herokuapp.com/directors/${e}`, {
                  headers: new nt({ Authorization: "Bearer " + i }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            getGenre(e) {
              const i = localStorage.getItem("token");
              return this.http
                .get(`https://flixfolio.herokuapp.com/movies/genres/${e}`, {
                  headers: new nt({ Authorization: "Bearer " + i }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            getUser() {
              const e = localStorage.getItem("token"),
                i = localStorage.getItem("user");
              return this.http
                .get(`https://flixfolio.herokuapp.com/users/${i}`, {
                  headers: new nt({ Authorization: "Bearer " + e }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            getFavMovies() {
              const e = localStorage.getItem("token"),
                i = localStorage.getItem("user");
              return this.http
                .get(`https://flixfolio.herokuapp.com/users/${i}`, {
                  headers: new nt({ Authorization: "Bearer " + e }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            addFavMovie(e) {
              const i = localStorage.getItem("token"),
                r = localStorage.getItem("user");
              return this.http
                .post(
                  `https://flixfolio.herokuapp.com/users/${r}/movies/${e}`,
                  null,
                  { headers: new nt({ Authorization: "Bearer " + i }) }
                )
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            editUser(e) {
              const i = localStorage.getItem("token"),
                r = localStorage.getItem("user");
              return this.http
                .put(`https://flixfolio.herokuapp.com/users/${r}`, e, {
                  headers: new nt({ Authorization: "Bearer " + i }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            deleteUser() {
              const e = localStorage.getItem("token"),
                i = localStorage.getItem("user");
              return this.http
                .delete(`https://flixfolio.herokuapp.com/users/${i}`, {
                  headers: new nt({ Authorization: "Bearer " + e }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            deleteFavMovie(e) {
              const i = localStorage.getItem("token"),
                r = localStorage.getItem("user");
              return this.http
                .delete(`https://flixfolio.herokuapp.com/users/${r}/${e}`, {
                  headers: new nt({ Authorization: "Bearer " + i }),
                })
                .pipe(P(this.extractResponseData), je(this.handleError));
            }
            logoutUser(e) {
              return (
                console.log(e),
                localStorage.clear(),
                this.http.post(Zt + "login", e).pipe(je(this.handleError))
              );
            }
            extractResponseData(e) {
              return e || {};
            }
            handleError(e) {
              return (
                e.error instanceof ErrorEvent
                  ? console.error("Some error occured:", e.error.message)
                  : console.error(
                      `Error Status code ${e.status}, Error Body is: ${e.error}`
                    ),
                hr("Something bad happened; please try again later.")
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(_(xc));
            }),
            (n.ɵprov = M({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        r3 = (() => {
          class n {
            constructor(e, i, r, o) {
              (this.data = e),
                (this.fetchApiData = i),
                (this.snackBar = r),
                (this.dialog = o),
                (this.movies = []);
            }
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(hS), g(Uo), g(Rr), g(Sa));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-genre"]],
              decls: 11,
              vars: 2,
              consts: [
                [1, "genre-dialog"],
                [
                  "mat-stroked-button",
                  "",
                  "aria-label",
                  "Close genre details button",
                  "mat-dialog-close",
                  "",
                  "color",
                  "primary",
                  1,
                  "close-btn",
                ],
                [1, "genre-dialog-title"],
                [1, "genre-dialog-content"],
                [1, "genre-actions"],
              ],
              template: function (e, i) {
                1 & e &&
                  (R(0, "mat-card", 0)(1, "button", 1),
                  ie(2, " X "),
                  x(),
                  R(3, "mat-card-title", 2),
                  ie(4),
                  x(),
                  Ve(5, "br"),
                  R(6, "mat-dialog-content", 3)(7, "b"),
                  ie(8, "Description: "),
                  x(),
                  ie(9),
                  x(),
                  Ve(10, "mat-card-actions", 4),
                  x()),
                  2 & e &&
                    (q(4),
                    li(i.data.Name),
                    q(5),
                    Is("", i.data.Description, " "));
              },
              dependencies: [jo, va, ba, Ir, zz, Gz],
              styles: [".close-btn[_ngcontent-%COMP%]{float:right}"],
            })),
            n
          );
        })();
      const o3 = ["*", [["mat-toolbar-row"]]],
        s3 = ["*", "mat-toolbar-row"],
        a3 = nu(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        );
      let l3 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = F({
              type: n,
              selectors: [["mat-toolbar-row"]],
              hostAttrs: [1, "mat-toolbar-row"],
              exportAs: ["matToolbarRow"],
            })),
            n
          );
        })(),
        c3 = (() => {
          class n extends a3 {
            constructor(e, i, r) {
              super(e), (this._platform = i), (this._document = r);
            }
            ngAfterViewInit() {
              this._platform.isBrowser &&
                (this._checkToolbarMixedModes(),
                this._toolbarRows.changes.subscribe(() =>
                  this._checkToolbarMixedModes()
                ));
            }
            _checkToolbarMixedModes() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(ve), g(_t), g(K));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["mat-toolbar"]],
              contentQueries: function (e, i, r) {
                if ((1 & e && qt(r, l3, 5), 2 & e)) {
                  let o;
                  Xe((o = Je())) && (i._toolbarRows = o);
                }
              },
              hostAttrs: [1, "mat-toolbar"],
              hostVars: 4,
              hostBindings: function (e, i) {
                2 & e &&
                  St("mat-toolbar-multiple-rows", i._toolbarRows.length > 0)(
                    "mat-toolbar-single-row",
                    0 === i._toolbarRows.length
                  );
              },
              inputs: { color: "color" },
              exportAs: ["matToolbar"],
              features: [ee],
              ngContentSelectors: s3,
              decls: 2,
              vars: 0,
              template: function (e, i) {
                1 & e && (or(o3), at(0), at(1, 1));
              },
              styles: [
                ".cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        u3 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = he({ type: n })),
            (n.ɵinj = ue({ imports: [ht, ht] })),
            n
          );
        })(),
        Bm = (() => {
          class n {
            constructor(e, i) {
              (this.router = e), (this.snackBar = i);
            }
            ngOnInit() {}
            openMoviesView() {
              this.router.navigate(["movies"]);
            }
            openUserProfile() {
              this.router.navigate(["profile"]);
            }
            logout() {
              this.router.navigate(["welcome"]),
                this.snackBar.open("You have successfully logged out", "OK", {
                  duration: 2e3,
                });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Ue), g(Rr));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-navbar"]],
              decls: 8,
              vars: 0,
              consts: [
                [1, "navbar"],
                [1, "nav-item", 3, "click"],
              ],
              template: function (e, i) {
                1 & e &&
                  (R(0, "div", 0)(1, "mat-toolbar")(2, "span", 1),
                  W("click", function () {
                    return i.openMoviesView();
                  }),
                  ie(3, " Movies "),
                  x(),
                  R(4, "span", 1),
                  W("click", function () {
                    return i.openUserProfile();
                  }),
                  ie(5, "My Profile"),
                  x(),
                  R(6, "span", 1),
                  W("click", function () {
                    return i.logout();
                  }),
                  ie(7, "Logout"),
                  x()()());
              },
              dependencies: [c3],
              styles: [
                ".nav-item[_ngcontent-%COMP%]{margin:28px;font-size:25px;padding:2px 5px}.nav-item[_ngcontent-%COMP%]:hover{cursor:pointer;background-color:#dac3f0;border-radius:7px;border:solid 1px black}",
              ],
            })),
            n
          );
        })();
      function d3(n, t) {
        if (1 & n) {
          const e = yo();
          R(0, "mat-card", 2)(1, "mat-card-header")(2, "mat-card-title"),
            ie(3),
            x(),
            R(4, "mat-card-subtitle"),
            ie(5),
            x()(),
            Ve(6, "img", 3),
            R(7, "mat-card-actions")(8, "button", 4),
            W("click", function () {
              const o = Fn(e).$implicit;
              return On(Mt().getGenre(o.Genre.Name, o.Genre.Description));
            })("ngModelChange", function (r) {
              return On((Fn(e).$implicit.Genre.Name = r));
            }),
            ie(9, " Genre "),
            x(),
            R(10, "button", 5),
            ie(11, "Director"),
            x(),
            R(12, "button", 5),
            ie(13, "Synopsis"),
            x(),
            R(14, "mat-icon", 6),
            W("click", function () {
              const o = Fn(e).$implicit;
              return On(Mt().addFav(o._id));
            })("ngModelChange", function (r) {
              return On((Fn(e).$implicit._id = r));
            }),
            ie(15, "favorite_border"),
            x()()();
        }
        if (2 & n) {
          const e = t.$implicit;
          q(3),
            li(e.Title),
            q(2),
            Is("Directed by: ", e.Director.Name, ""),
            q(1),
            wn("src", e.ImagePath, ps),
            wn("alt", e.Title),
            q(2),
            wn("value", e.Genre.Name),
            se("ngModel", e.Genre.Name),
            q(6),
            se("ngModel", e._id);
        }
      }
      let h3 = (() => {
          class n {
            constructor(e, i, r, o) {
              (this.fetchApiData = e),
                (this.snackBar = i),
                (this.router = r),
                (this.dialog = o),
                (this.userData = { FavoriteMovies: [] }),
                (this.movies = []),
                (this.favsList = []);
            }
            ngOnInit() {
              this.getUser(), this.getMovies();
            }
            getUser() {
              this.fetchApiData
                .getUser()
                .subscribe(
                  (e) => (
                    (this.userData = e),
                    (this.favsList = this.userData.FavoriteMovies),
                    console.log(this.userData.FavoriteMovies),
                    this.userData
                  )
                );
            }
            getMovies() {
              this.fetchApiData
                .getAllMovies()
                .subscribe((e) => ((this.movies = e), this.movies));
            }
            addFav(e) {
              console.log(e),
                this.favsList.map((i) => {
                  console.log(i),
                    i === e
                      ? this.snackBar.open("Movie ALREADY a favorite!", "OK", {
                          duration: 2e3,
                        })
                      : (this.fetchApiData.addFavMovie(e).subscribe((r) => r),
                        this.snackBar.open(
                          "Movie added to favorites successfully!",
                          "OK",
                          { duration: 2e3 }
                        ),
                        this.ngOnInit());
                });
            }
            getGenre(e, i) {
              this.dialog.open(r3, {
                data: { Name: e, Description: i },
                width: "500px",
              });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Uo), g(Rr), g(Ue), g(Sa));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-movie-card"]],
              inputs: { userData: "userData" },
              decls: 3,
              vars: 1,
              consts: [
                [1, "list-movies"],
                ["class", "movies", 4, "ngFor", "ngForOf"],
                [1, "movies"],
                [3, "src", "alt"],
                [
                  "mat-button",
                  "",
                  "color",
                  "primary",
                  "ngDefaultControl",
                  "",
                  3,
                  "ngModel",
                  "value",
                  "click",
                  "ngModelChange",
                ],
                ["mat-button", "", "color", "primary"],
                [
                  "ngDefaultControl",
                  "",
                  3,
                  "ngModel",
                  "click",
                  "ngModelChange",
                ],
              ],
              template: function (e, i) {
                1 & e &&
                  (Ve(0, "app-navbar"),
                  R(1, "div", 0),
                  st(2, d3, 16, 7, "mat-card", 1),
                  x()),
                  2 & e && (q(2), se("ngForOf", i.movies));
              },
              dependencies: [xf, jo, vu, va, q$, ba, Ir, Bi, Vo, Ar, eU, Bm],
              styles: [
                ".list-movies[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center}.movies[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:280px;width:280px;margin:10px;padding:20px 8px}img[_ngcontent-%COMP%]{width:250px;height:350px;object-fit:contain}",
              ],
            })),
            n
          );
        })(),
        f3 = (() => {
          class n {
            constructor(e, i, r) {
              (this.fetchApiData = e),
                (this.dialogRef = i),
                (this.snackBar = r),
                (this.userData = {
                  Username: "",
                  Password: "",
                  Email: "",
                  Birthday: "",
                });
            }
            ngOnInit() {}
            registerUser() {
              this.fetchApiData.userRegistration(this.userData).subscribe(
                (e) => {
                  this.dialogRef.close(),
                    console.log(e),
                    this.snackBar.open("user registered successfully!", "OK", {
                      duration: 2e3,
                    });
                },
                (e) => {
                  console.log(e),
                    this.snackBar.open(e, "OK", { duration: 2e3 });
                }
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Uo), g(Su), g(Rr));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-user-registration-form"]],
              inputs: { userData: "userData" },
              decls: 17,
              vars: 4,
              consts: [
                [
                  "matInput",
                  "",
                  "placeholder",
                  "Username",
                  "type",
                  "text",
                  "name",
                  "Username",
                  "required",
                  "",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "matInput",
                  "",
                  "type",
                  "password",
                  "placeholder",
                  "Password",
                  "name",
                  "Password",
                  "required",
                  "",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "matInput",
                  "",
                  "type",
                  "email",
                  "placeholder",
                  "Email",
                  "name",
                  "Email",
                  "required",
                  "",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "matInput",
                  "",
                  "type",
                  "date",
                  "placeholder",
                  "Birthday",
                  "name",
                  "Birthday",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                ["mat-raised-button", "", "color", "primary", 3, "click"],
              ],
              template: function (e, i) {
                1 & e &&
                  (R(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title"),
                  ie(3, "Sign Up!"),
                  x()(),
                  R(4, "mat-card-content")(5, "form")(6, "mat-form-field")(
                    7,
                    "input",
                    0
                  ),
                  W("ngModelChange", function (o) {
                    return (i.userData.Username = o);
                  }),
                  x()(),
                  R(8, "mat-form-field")(9, "input", 1),
                  W("ngModelChange", function (o) {
                    return (i.userData.Password = o);
                  }),
                  x()(),
                  R(10, "mat-form-field")(11, "input", 2),
                  W("ngModelChange", function (o) {
                    return (i.userData.Email = o);
                  }),
                  x()(),
                  R(12, "mat-form-field")(13, "input", 3),
                  W("ngModelChange", function (o) {
                    return (i.userData.Birthday = o);
                  }),
                  x()()()(),
                  R(14, "mat-card-actions")(15, "button", 4),
                  W("click", function () {
                    return i.registerUser();
                  }),
                  ie(16, " Sign Up "),
                  x()()()),
                  2 & e &&
                    (q(7),
                    se("ngModel", i.userData.Username),
                    q(2),
                    se("ngModel", i.userData.Password),
                    q(2),
                    se("ngModel", i.userData.Email),
                    q(2),
                    se("ngModel", i.userData.Birthday));
              },
              dependencies: [
                jo,
                vu,
                Im,
                va,
                ba,
                q0,
                Tm,
                Ir,
                gu,
                Bi,
                Vo,
                lu,
                ya,
                Ar,
                Sr,
              ],
            })),
            n
          );
        })(),
        p3 = (() => {
          class n {
            constructor(e, i, r, o) {
              (this.fetchApiData = e),
                (this.dialogRef = i),
                (this.snackBar = r),
                (this.router = o),
                (this.userData = { Username: "", Password: "" });
            }
            ngOnInit() {}
            loginUser() {
              this.fetchApiData.userLogin(this.userData).subscribe(
                (e) => {
                  this.dialogRef.close(),
                    console.log(e),
                    localStorage.setItem("token", e.token),
                    localStorage.setItem("user", e.user.Username),
                    this.snackBar.open("User Login Successful", "OK", {
                      duration: 2e3,
                    }),
                    this.router.navigate(["movies"]);
                },
                (e) => {
                  this.snackBar.open("User login failed", "OK", {
                    duration: 2e3,
                  });
                }
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(g(Uo), g(Su), g(Rr), g(Ue));
            }),
            (n.ɵcmp = Re({
              type: n,
              selectors: [["app-user-login-form"]],
              inputs: { userData: "userData" },
              decls: 13,
              vars: 2,
              consts: [
                [
                  "matInput",
                  "",
                  "placeholder",
                  "Username",
                  "type",
                  "text",
                  "name",
                  "Username",
                  "required",
                  "",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [
                  "matInput",
                  "",
                  "type",
                  "password",
                  "placeholder",
                  "Password",
                  "name",
                  "Password",
                  "required",
                  "",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                ["mat-raised-button", "", "color", "primary", 3, "click"],
              ],
              template: function (e, i) {
                1 & e &&
                  (R(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title"),
                  ie(3, "Login"),
                  x()(),
                  R(4, "mat-card-content")(5, "form")(6, "mat-form-field")(
                    7,
                    "input",
                    0
                  ),
                  W("ngModelChange", function (o) {
                    return (i.userData.Username = o);
                  }),
                  x()(),
                  R(8, "mat-form-field")(9, "input", 1),
                  W("ngModelChange", function (o) {
                    return (i.userData.Password = o);
                  }),
                  x()()()(),
                  R(10, "mat-card-actions")(11, "button", 2),
                  W("click", function () {
                    return i.loginUser();
                  }),
                  ie(12, " Login "),
                  x()()()),
                  2 & e &&
                    (q(7),
                    se("ngModel", i.userData.Username),
                    q(2),
                    se("ngModel", i.userData.Password));
              },
              dependencies: [
                jo,
                vu,
                Im,
                va,
                ba,
                q0,
                Tm,
                Ir,
                gu,
                Bi,
                Vo,
                lu,
                ya,
                Ar,
                Sr,
              ],
            })),
            n
          );
        })();
      function _3(n, t) {
        if (1 & n) {
          const e = yo();
          R(0, "mat-card", 5)(1, "mat-card-header")(2, "mat-card-title"),
            ie(3),
            x()(),
            Ve(4, "img", 6),
            R(5, "mat-card-actions")(6, "button", 7),
            W("click", function () {
              const o = Fn(e).$implicit;
              return On(Mt().removeFav(o._id));
            })("ngModelChange", function (r) {
              return On((Fn(e).$implicit._id = r));
            }),
            ie(7, " Remove "),
            x()()();
        }
        if (2 & n) {
          const e = t.$implicit;
          q(3),
            li(e.Title),
            q(1),
            wn("src", e.ImagePath, ps),
            wn("alt", e.Title),
            q(2),
            wn("value", e._id),
            se("ngModel", e._id);
        }
      }
      const y3 = [
        {
          path: "welcome",
          component: (() => {
            class n {
              constructor(e) {
                this.dialog = e;
              }
              ngOnInit() {}
              openUserRegistrationDialog() {
                this.dialog.open(f3, { width: "280px" });
              }
              openUserLoginDialog() {
                this.dialog.open(p3, { width: "280px" });
              }
            }
            return (
              (n.ɵfac = function (e) {
                return new (e || n)(g(Sa));
              }),
              (n.ɵcmp = Re({
                type: n,
                selectors: [["app-welcome-page"]],
                decls: 7,
                vars: 0,
                consts: [
                  [1, "main-page"],
                  [
                    "mat-raised-button",
                    "",
                    "color",
                    "primary",
                    2,
                    "margin-right",
                    "10px",
                    3,
                    "click",
                  ],
                ],
                template: function (e, i) {
                  1 & e &&
                    (R(0, "div", 0)(1, "h1"),
                    ie(2, "Welcome to flixFolio!"),
                    x(),
                    R(3, "button", 1),
                    W("click", function () {
                      return i.openUserRegistrationDialog();
                    }),
                    ie(4, " Sign Up "),
                    x(),
                    R(5, "button", 1),
                    W("click", function () {
                      return i.openUserLoginDialog();
                    }),
                    ie(6, " Login "),
                    x()());
                },
                dependencies: [Ir],
                styles: [
                  ".main-page[_ngcontent-%COMP%]{margin:20px auto;text-align:center;justify-content:center}",
                ],
              })),
              n
            );
          })(),
        },
        { path: "movies", component: h3 },
        {
          path: "profile",
          component: (() => {
            class n {
              constructor(e, i, r) {
                (this.fetchApiData = e),
                  (this.snackBar = i),
                  (this.router = r),
                  (this.userData = {
                    Username: "",
                    Password: "",
                    Email: "",
                    Birthday: "",
                  });
              }
              ngOnInit() {
                this.getUser();
              }
              getUser() {
                this.fetchApiData
                  .getUser()
                  .subscribe(
                    (e) => (
                      (this.userData = e),
                      console.log(this.userData),
                      this.userData
                    )
                  );
              }
              updateUser() {
                this.fetchApiData.editUser(this.userData).subscribe((e) => {
                  (this.userData = e),
                    console.log(e),
                    this.snackBar.open("Updated profile successfully!", "OK", {
                      duration: 2e3,
                    });
                });
              }
              getFavorites() {
                this.router.navigate(["favorites"]);
              }
              getProfile() {
                this.router.navigate(["profile"]);
              }
            }
            return (
              (n.ɵfac = function (e) {
                return new (e || n)(g(Uo), g(Rr), g(Ue));
              }),
              (n.ɵcmp = Re({
                type: n,
                selectors: [["app-user-profile"]],
                inputs: { userData: "userData" },
                decls: 33,
                vars: 7,
                consts: [
                  [1, "profile"],
                  [1, "prof-title", 3, "click"],
                  [1, "fav-title", 3, "click"],
                  [1, "card"],
                  [1, "form-row"],
                  [1, "form-item"],
                  [
                    "matInput",
                    "",
                    "type",
                    "text",
                    "name",
                    "username",
                    1,
                    "form-item",
                    3,
                    "ngModel",
                    "value",
                    "ngModelChange",
                  ],
                  [
                    "matInput",
                    "",
                    "name",
                    "",
                    1,
                    "form-item",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  [
                    "matInput",
                    "",
                    "type",
                    "email",
                    "name",
                    "email",
                    1,
                    "form-item",
                    3,
                    "ngModel",
                    "value",
                    "ngModelChange",
                  ],
                  [
                    "matInput",
                    "",
                    "type",
                    "date",
                    "name",
                    "Birthday",
                    1,
                    "form-item",
                    3,
                    "ngModel",
                    "value",
                    "ngModelChange",
                  ],
                  [1, "btn", 3, "click"],
                ],
                template: function (e, i) {
                  1 & e &&
                    (Ve(0, "app-navbar"),
                    R(1, "mat-card", 0)(2, "span", 1),
                    W("click", function () {
                      return i.getProfile();
                    }),
                    ie(3, "My Profile"),
                    x(),
                    R(4, "span", 2),
                    W("click", function () {
                      return i.getFavorites();
                    }),
                    ie(5, "My Favorites"),
                    x(),
                    R(6, "mat-card-content", 3)(7, "div"),
                    ie(
                      8,
                      " User information is shown below. To make changes, type and press submit. "
                    ),
                    x(),
                    Ve(9, "br"),
                    R(10, "form")(11, "div", 4)(12, "span", 5),
                    ie(13, "Username: "),
                    x(),
                    R(14, "input", 6),
                    W("ngModelChange", function (o) {
                      return (i.userData.Username = o);
                    }),
                    x()(),
                    Ve(15, "br"),
                    R(16, "div", 4)(17, "span", 5),
                    ie(18, "Password: "),
                    x(),
                    R(19, "input", 7),
                    W("ngModelChange", function (o) {
                      return (i.userData.Password = o);
                    }),
                    x()(),
                    Ve(20, "br"),
                    R(21, "div", 4)(22, "span", 5),
                    ie(23, "Email: "),
                    x(),
                    R(24, "input", 8),
                    W("ngModelChange", function (o) {
                      return (i.userData.Email = o);
                    }),
                    x()(),
                    Ve(25, "br"),
                    R(26, "div", 4)(27, "span", 5),
                    ie(28, "Birthday: "),
                    x(),
                    R(29, "input", 9),
                    W("ngModelChange", function (o) {
                      return (i.userData.Birthday = o);
                    }),
                    x()(),
                    Ve(30, "br"),
                    R(31, "button", 10),
                    W("click", function () {
                      return i.updateUser();
                    }),
                    ie(32, "Submit Changes"),
                    x()()()()),
                    2 & e &&
                      (q(14),
                      wn("value", i.userData.Username),
                      se("ngModel", i.userData.Username),
                      q(5),
                      se("ngModel", i.userData.Password),
                      q(5),
                      wn("value", i.userData.Email),
                      se("ngModel", i.userData.Email),
                      q(5),
                      wn("value", i.userData.Birthday),
                      se("ngModel", i.userData.Birthday));
                },
                dependencies: [jo, Im, Tm, gu, Bi, Vo, lu, Ar, Sr, Bm],
                styles: [
                  ".profile[_ngcontent-%COMP%]{width:60%;margin:20px auto;padding-top:25px}.prof-title[_ngcontent-%COMP%], .fav-title[_ngcontent-%COMP%]{font-size:30px;font-weight:700;border:solid rgb(202,200,200) 1px;border-bottom:solid black 3px;padding:10px}.fav-title[_ngcontent-%COMP%]{margin-left:10px}input[_ngcontent-%COMP%], .btn[_ngcontent-%COMP%]{font-size:16px}.form-item[_ngcontent-%COMP%]{font-size:22px;margin:0 10px}.btn[_ngcontent-%COMP%]{float:right;font-size:18px;background-color:#f0f8ff;border:solid 1px black;border-radius:6px;padding:4px}.btn[_ngcontent-%COMP%]:hover, .prof-title[_ngcontent-%COMP%]:hover, .fav-title[_ngcontent-%COMP%]:hover{background-color:#dac3f0;cursor:pointer}.card[_ngcontent-%COMP%]{padding:30px 3px;margin:10px 0}.form-row[_ngcontent-%COMP%]{display:flex;flex-direction:row}",
                ],
              })),
              n
            );
          })(),
        },
        {
          path: "favorites",
          component: (() => {
            class n {
              constructor(e, i, r) {
                (this.fetchApiData = e),
                  (this.snackBar = i),
                  (this.router = r),
                  (this.userData = { FavoriteMovies: [] }),
                  (this.movies = []),
                  (this.favsList = []);
              }
              ngOnInit() {
                this.getUserData(), this.getListFavorites();
              }
              getFavorites() {
                this.router.navigate(["favorites"]);
              }
              getProfile() {
                this.router.navigate(["profile"]);
              }
              getUserData() {
                this.fetchApiData
                  .getFavMovies()
                  .subscribe(
                    (e) => (
                      (this.userData = e),
                      console.log(this.userData),
                      this.userData
                    )
                  );
              }
              getListFavorites() {
                return (
                  this.fetchApiData.getAllMovies().subscribe((e) => {
                    (this.movies = e),
                      this.movies.map((i) => {
                        if (
                          i._id ===
                          this.userData.FavoriteMovies.find((r) => r === i._id)
                        )
                          return this.favsList.push(i), i;
                      });
                  }),
                  console.log(this.favsList),
                  this.favsList
                );
              }
              removeFav(e) {
                this.fetchApiData.getAllMovies().subscribe((i) => {
                  (this.movies = i),
                    this.movies.map((r) => {
                      r._id === e &&
                        this.fetchApiData.deleteFavMovie(e).subscribe((o) => {
                          (e = o), console.log(e);
                        });
                    }),
                    this.snackBar.open(
                      "Movie removed from favorites successfully!",
                      "OK",
                      { duration: 2e3 }
                    ),
                    this.router.navigate(["profile"]);
                });
              }
            }
            return (
              (n.ɵfac = function (e) {
                return new (e || n)(g(Uo), g(Rr), g(Ue));
              }),
              (n.ɵcmp = Re({
                type: n,
                selectors: [["app-favorite-movies"]],
                inputs: { userData: "userData" },
                decls: 8,
                vars: 1,
                consts: [
                  [1, "profile"],
                  [1, "prof-title", 3, "click"],
                  [1, "fav-title", 3, "click"],
                  [1, "list-movies"],
                  ["class", "movies", 4, "ngFor", "ngForOf"],
                  [1, "movies"],
                  [3, "src", "alt"],
                  [
                    "mat-button",
                    "",
                    "color",
                    "primary",
                    "type",
                    "text",
                    "ngDefaultControl",
                    "",
                    3,
                    "ngModel",
                    "value",
                    "click",
                    "ngModelChange",
                  ],
                ],
                template: function (e, i) {
                  1 & e &&
                    (Ve(0, "app-navbar"),
                    R(1, "mat-card", 0)(2, "span", 1),
                    W("click", function () {
                      return i.getProfile();
                    }),
                    ie(3, "My Profile"),
                    x(),
                    R(4, "span", 2),
                    W("click", function () {
                      return i.getFavorites();
                    }),
                    ie(5, "My Favorites"),
                    x(),
                    R(6, "div", 3),
                    st(7, _3, 8, 5, "mat-card", 4),
                    x()()),
                    2 & e && (q(7), se("ngForOf", i.favsList));
                },
                dependencies: [xf, jo, vu, va, ba, Ir, Bi, Vo, Ar, Bm],
                styles: [
                  ".prof-title[_ngcontent-%COMP%], .fav-title[_ngcontent-%COMP%]{font-size:30px;font-weight:700;border:solid rgb(202,200,200) 1px;border-bottom:solid black 3px;padding:10px}@media (max-width: 768px){.prof-title[_ngcontent-%COMP%], .fav-title[_ngcontent-%COMP%]{font-size:15px}}.profile[_ngcontent-%COMP%]{width:60%;margin:20px auto;padding-top:25px}.btn[_ngcontent-%COMP%]:hover, .prof-title[_ngcontent-%COMP%]:hover, .fav-title[_ngcontent-%COMP%]:hover{background-color:#dac3f0;cursor:pointer}.fav-title[_ngcontent-%COMP%]{margin-left:10px}.list-movies[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;margin:15px auto}.movies[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;max-width:280px;width:280px;margin:15px;padding:26px 8px}img[_ngcontent-%COMP%]{width:250px;height:350px;object-fit:contain}",
                ],
              })),
              n
            );
          })(),
        },
        { path: "", redirectTo: "welcome", pathMatch: "prefix" },
      ];
      let v3 = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = he({ type: n, bootstrap: [wB] })),
          (n.ɵinj = ue({
            imports: [
              FD,
              LB,
              DB,
              Vj,
              K$,
              L$,
              K0,
              Am,
              qz,
              mS,
              e$,
              yp.forRoot(y3),
              tU,
              u3,
            ],
          })),
          n
        );
      })();
      (function gP() {
        NC = !1;
      })(),
        k1()
          .bootstrapModule(v3)
          .catch((n) => console.error(n));
    },
  },
  (ce) => {
    ce((ce.s = 873));
  },
]);
