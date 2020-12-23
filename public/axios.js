/* axios v0.1.0 | (c) 2014 by Matt Zabriskie */
var axios = (function(t) {
  function e(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { exports: {}, id: r, loaded: !1 });
    return t[r].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
  }
  var n = {};
  return (e.m = t), (e.c = n), (e.p = ""), e(0);
})([
  function(t, e, n) {
    t.exports = n(1);
  },
  function(t, e, n) {
    function r() {
      p.forEach(arguments, function(t) {
        h[t] = function(e, n) {
          return h(p.merge(n || {}, { method: t, url: e }));
        };
      });
    }
    function o() {
      p.forEach(arguments, function(t) {
        h[t] = function(e, n, r) {
          return h(p.merge(r || {}, { method: t, url: e, data: n }));
        };
      });
    }
    var i = n(9).Promise,
      s = n(2),
      c = n(3),
      u = n(4),
      a = n(5),
      f = n(6),
      l = n(7),
      p = n(8),
      h = (t.exports = function(t) {
        (t = p.merge(
          {
            method: "get",
            transformRequest: u.transformRequest,
            transformResponse: u.transformResponse,
          },
          t
        )),
          (t.withCredentials = t.withCredentials || u.withCredentials);
        var e = new i(function(e, n) {
          var r = new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP"),
            o = f(t.data, t.headers, t.transformRequest);
          r.open(t.method, s(t.url, t.params), !0),
            (r.onreadystatechange = function() {
              if (r && 4 === r.readyState) {
                var o = a(r.getAllResponseHeaders()),
                  i = {
                    data: f(r.responseText, o, t.transformResponse),
                    status: r.status,
                    headers: o,
                    config: t,
                  };
                (r.status >= 200 && r.status < 300 ? e : n)(
                  i.data,
                  i.status,
                  i.headers,
                  i.config
                ),
                  (r = null);
              }
            });
          var i = p.merge(
              u.headers.common,
              u.headers[t.method] || {},
              t.headers || {}
            ),
            h = l(t.url)
              ? c.read(t.xsrfCookieName || u.xsrfCookieName)
              : void 0;
          if (
            (h && (i[t.xsrfHeaderName || u.xsrfHeaderName] = h),
            p.forEach(i, function(t, e) {
              o || "content-type" !== e.toLowerCase()
                ? r.setRequestHeader(e, t)
                : delete i[e];
            }),
            t.withCredentials && (r.withCredentials = !0),
            t.responseType)
          )
            try {
              r.responseType = t.responseType;
            } catch (d) {
              if ("json" !== r.responseType) throw d;
            }
          r.send(o);
        });
        return (
          (e.success = function(t) {
            return (
              e.then(function(e) {
                t(e);
              }),
              e
            );
          }),
          (e.error = function(t) {
            return (
              e.then(null, function(e) {
                t(e);
              }),
              e
            );
          }),
          e
        );
      });
    (h.defaults = u), r("delete", "get", "head"), o("post", "put", "patch");
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      return encodeURIComponent(t)
        .replace(/%40/gi, "@")
        .replace(/%3A/gi, ":")
        .replace(/%24/g, "$")
        .replace(/%2C/gi, ",")
        .replace(/%20/g, "+");
    }
    var o = n(8);
    t.exports = function(t, e) {
      if (!e) return t;
      var n = [];
      return (
        o.forEach(e, function(t, e) {
          null !== t &&
            "undefined" != typeof t &&
            (o.isArray(t) || (t = [t]),
            o.forEach(t, function(t) {
              o.isDate(t)
                ? (t = t.toISOString())
                : o.isObject(t) && (t = JSON.stringify(t)),
                n.push(r(e) + "=" + r(t));
            }));
        }),
        n.length > 0 &&
          (t += (-1 === t.indexOf("?") ? "?" : "&") + n.join("&")),
        t
      );
    };
  },
  function(t, e, n) {
    "use strict";
    var r = n(8);
    t.exports = {
      write: function(t, e, n, o, i, s) {
        var c = [];
        c.push(t + "=" + encodeURIComponent(e)),
          r.isNumber(n) && c.push("expires=" + new Date(n).toGMTString()),
          r.isString(o) && c.push("path=" + o),
          r.isString(i) && c.push("domain=" + i),
          s === !0 && c.push("secure"),
          (document.cookie = c.join("; "));
      },
      read: function(t) {
        var e = document.cookie.match(
          new RegExp("(^|;\\s*)(" + t + ")=([^;]*)")
        );
        return e ? decodeURIComponent(e[3]) : null;
      },
      remove: function(t) {
        this.write(t, "", Date.now() - 864e5);
      },
    };
  },
  function(t, e, n) {
    "use strict";
    var r = n(8),
      o = /^\s*(\[|\{[^\{])/,
      i = /[\}\]]\s*$/,
      s = /^\)\]\}',?\n/,
      c = { "Content-Type": "application/json;charset=utf-8" };
    t.exports = {
      transformRequest: [
        function(t) {
          return !r.isObject(t) || r.isFile(t) || r.isBlob(t)
            ? null
            : JSON.stringify(t);
        },
      ],
      transformResponse: [
        function(t) {
          return (
            "string" == typeof t &&
              ((t = t.replace(s, "")),
              o.test(t) && i.test(t) && (t = JSON.parse(t))),
            t
          );
        },
      ],
      headers: {
        common: { Accept: "application/json, text/plain, */*" },
        patch: r.merge(c),
        post: r.merge(c),
        put: r.merge(c),
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    };
  },
  function(t, e, n) {
    "use strict";
    var r = n(8);
    t.exports = function(t) {
      var e,
        n,
        o,
        i = {};
      return t
        ? (r.forEach(t.split("\n"), function(t) {
            (o = t.indexOf(":")),
              (e = r.trim(t.substr(0, o)).toLowerCase()),
              (n = r.trim(t.substr(o + 1))),
              e && (i[e] = i[e] ? i[e] + ", " + n : n);
          }),
          i)
        : i;
    };
  },
  function(t, e, n) {
    "use strict";
    var r = n(8);
    t.exports = function(t, e, n) {
      return (
        r.forEach(n, function(n) {
          t = n(t, e);
        }),
        t
      );
    };
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      var e = t;
      return (
        o && (s.setAttribute("href", e), (e = s.href)),
        s.setAttribute("href", e),
        {
          href: s.href,
          protocol: s.protocol ? s.protocol.replace(/:$/, "") : "",
          host: s.host,
          search: s.search ? s.search.replace(/^\?/, "") : "",
          hash: s.hash ? s.hash.replace(/^#/, "") : "",
          hostname: s.hostname,
          port: s.port,
          pathname:
            "/" === s.pathname.charAt(0) ? s.pathname : "/" + s.pathname,
        }
      );
    }
    var o = /(msie|trident)/i.test(navigator.userAgent),
      i = n(8),
      s = document.createElement("a"),
      c = r(window.location.href);
    t.exports = function(t) {
      var e = i.isString(t) ? r(t) : t;
      return e.protocol === c.protocol && e.host === c.host;
    };
  },
  function(t) {
    function e(t) {
      return "[object Array]" === l.call(t);
    }
    function n(t) {
      return "string" == typeof t;
    }
    function r(t) {
      return "number" == typeof t;
    }
    function o(t) {
      return null !== t && "object" == typeof t;
    }
    function i(t) {
      return "[object Date]" === l.call(t);
    }
    function s(t) {
      return "[object File]" === l.call(t);
    }
    function c(t) {
      return "[object Blob]" === l.call(t);
    }
    function u(t) {
      return t.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function a(t, e) {
      if (null !== t && "undefined" != typeof t) {
        var n = t.constructor === Array || "function" == typeof t.callee;
        if (("object" == typeof t || n || (t = [t]), n))
          for (var r = 0, o = t.length; o > r; r++) e.call(null, t[r], r, t);
        else for (var i in t) t.hasOwnProperty(i) && e.call(null, t[i], i, t);
      }
    }
    function f() {
      var t = {};
      return (
        a(arguments, function(e) {
          a(e, function(e, n) {
            t[n] = e;
          });
        }),
        t
      );
    }
    var l = Object.prototype.toString;
    t.exports = {
      isArray: e,
      isString: n,
      isNumber: r,
      isObject: o,
      isDate: i,
      isFile: s,
      isBlob: c,
      forEach: a,
      merge: f,
      trim: u,
    };
  },
  function(t, e, n) {
    "use strict";
    var r = n(10).Promise,
      o = n(11).polyfill;
    (e.Promise = r), (e.polyfill = o);
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      if (!v(t))
        throw new TypeError(
          "You must pass a resolver function as the first argument to the promise constructor"
        );
      if (!(this instanceof r))
        throw new TypeError(
          "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
        );
      (this._subscribers = []), o(t, this);
    }
    function o(t, e) {
      function n(t) {
        a(e, t);
      }
      function r(t) {
        l(e, t);
      }
      try {
        t(n, r);
      } catch (o) {
        r(o);
      }
    }
    function i(t, e, n, r) {
      var o,
        i,
        s,
        c,
        f = v(n);
      if (f)
        try {
          (o = n(r)), (s = !0);
        } catch (p) {
          (c = !0), (i = p);
        }
      else (o = r), (s = !0);
      u(e, o) ||
        (f && s
          ? a(e, o)
          : c
          ? l(e, i)
          : t === E
          ? a(e, o)
          : t === _ && l(e, o));
    }
    function s(t, e, n, r) {
      var o = t._subscribers,
        i = o.length;
      (o[i] = e), (o[i + E] = n), (o[i + _] = r);
    }
    function c(t, e) {
      for (
        var n, r, o = t._subscribers, s = t._detail, c = 0;
        c < o.length;
        c += 3
      )
        (n = o[c]), (r = o[c + e]), i(e, n, r, s);
      t._subscribers = null;
    }
    function u(t, e) {
      var n,
        r = null;
      try {
        if (t === e)
          throw new TypeError(
            "A promises callback cannot return that same promise."
          );
        if (m(e) && ((r = e.then), v(r)))
          return (
            r.call(
              e,
              function(r) {
                return n ? !0 : ((n = !0), void (e !== r ? a(t, r) : f(t, r)));
              },
              function(e) {
                return n ? !0 : ((n = !0), void l(t, e));
              }
            ),
            !0
          );
      } catch (o) {
        return n ? !0 : (l(t, o), !0);
      }
      return !1;
    }
    function a(t, e) {
      t === e ? f(t, e) : u(t, e) || f(t, e);
    }
    function f(t, e) {
      t._state === j && ((t._state = T), (t._detail = e), d.async(p, t));
    }
    function l(t, e) {
      t._state === j && ((t._state = T), (t._detail = e), d.async(h, t));
    }
    function p(t) {
      c(t, (t._state = E));
    }
    function h(t) {
      c(t, (t._state = _));
    }
    var d = n(12).config,
      m = (n(12).configure, n(13).objectOrFunction),
      v = n(13).isFunction,
      w = (n(13).now, n(14).all),
      g = n(15).race,
      y = n(16).resolve,
      b = n(17).reject,
      x = n(18).asap;
    d.async = x;
    var j = void 0,
      T = 0,
      E = 1,
      _ = 2;
    (r.prototype = {
      constructor: r,
      _state: void 0,
      _detail: void 0,
      _subscribers: void 0,
      then: function(t, e) {
        var n = this,
          r = new this.constructor(function() {});
        if (this._state) {
          var o = arguments;
          d.async(function() {
            i(n._state, r, o[n._state - 1], n._detail);
          });
        } else s(this, r, t, e);
        return r;
      },
      catch: function(t) {
        return this.then(null, t);
      },
    }),
      (r.all = w),
      (r.race = g),
      (r.resolve = y),
      (r.reject = b),
      (e.Promise = r);
  },
  function(t, e, n) {
    (function(t) {
      "use strict";
      function r() {
        var e;
        e =
          "undefined" != typeof t
            ? t
            : "undefined" != typeof window && window.document
            ? window
            : self;
        var n =
          "Promise" in e &&
          "resolve" in e.Promise &&
          "reject" in e.Promise &&
          "all" in e.Promise &&
          "race" in e.Promise &&
          (function() {
            var t;
            return (
              new e.Promise(function(e) {
                t = e;
              }),
              i(t)
            );
          })();
        n || (e.Promise = o);
      }
      var o = n(10).Promise,
        i = n(13).isFunction;
      e.polyfill = r;
    }.call(
      e,
      (function() {
        return this;
      })()
    ));
  },
  function(t, e) {
    "use strict";
    function n(t, e) {
      return 2 !== arguments.length ? r[t] : void (r[t] = e);
    }
    var r = { instrument: !1 };
    (e.config = r), (e.configure = n);
  },
  function(t, e) {
    "use strict";
    function n(t) {
      return r(t) || ("object" == typeof t && null !== t);
    }
    function r(t) {
      return "function" == typeof t;
    }
    function o(t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    }
    var i =
      Date.now ||
      function() {
        return new Date().getTime();
      };
    (e.objectOrFunction = n), (e.isFunction = r), (e.isArray = o), (e.now = i);
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      var e = this;
      if (!o(t)) throw new TypeError("You must pass an array to all.");
      return new e(function(e, n) {
        function r(t) {
          return function(e) {
            o(t, e);
          };
        }
        function o(t, n) {
          (c[t] = n), 0 === --u && e(c);
        }
        var s,
          c = [],
          u = t.length;
        0 === u && e([]);
        for (var a = 0; a < t.length; a++)
          (s = t[a]), s && i(s.then) ? s.then(r(a), n) : o(a, s);
      });
    }
    var o = n(13).isArray,
      i = n(13).isFunction;
    e.all = r;
  },
  function(t, e, n) {
    "use strict";
    function r(t) {
      var e = this;
      if (!o(t)) throw new TypeError("You must pass an array to race.");
      return new e(function(e, n) {
        for (var r, o = 0; o < t.length; o++)
          (r = t[o]), r && "function" == typeof r.then ? r.then(e, n) : e(r);
      });
    }
    var o = n(13).isArray;
    e.race = r;
  },
  function(t, e) {
    "use strict";
    function n(t) {
      if (t && "object" == typeof t && t.constructor === this) return t;
      var e = this;
      return new e(function(e) {
        e(t);
      });
    }
    e.resolve = n;
  },
  function(t, e) {
    "use strict";
    function n(t) {
      var e = this;
      return new e(function(e, n) {
        n(t);
      });
    }
    e.reject = n;
  },
  function(t, e, n) {
    (function(t, n) {
      "use strict";
      function r() {
        return function() {
          n.nextTick(s);
        };
      }
      function o() {
        var t = 0,
          e = new f(s),
          n = document.createTextNode("");
        return (
          e.observe(n, { characterData: !0 }),
          function() {
            n.data = t = ++t % 2;
          }
        );
      }
      function i() {
        return function() {
          l.setTimeout(s, 1);
        };
      }
      function s() {
        for (var t = 0; t < p.length; t++) {
          var e = p[t],
            n = e[0],
            r = e[1];
          n(r);
        }
        p = [];
      }
      function c(t, e) {
        var n = p.push([t, e]);
        1 === n && u();
      }
      var u,
        a = "undefined" != typeof window ? window : {},
        f = a.MutationObserver || a.WebKitMutationObserver,
        l = "undefined" != typeof t ? t : void 0 === this ? window : this,
        p = [];
      (u =
        "undefined" != typeof n && "[object process]" === {}.toString.call(n)
          ? r()
          : f
          ? o()
          : i()),
        (e.asap = c);
    }.call(
      e,
      (function() {
        return this;
      })(),
      n(19)
    ));
  },
  function(t) {
    function e() {}
    var n = (t.exports = {});
    (n.nextTick = (function() {
      var t = "undefined" != typeof window && window.setImmediate,
        e =
          "undefined" != typeof window &&
          window.postMessage &&
          window.addEventListener;
      if (t)
        return function(t) {
          return window.setImmediate(t);
        };
      if (e) {
        var n = [];
        return (
          window.addEventListener(
            "message",
            function(t) {
              var e = t.source;
              if (
                (e === window || null === e) &&
                "process-tick" === t.data &&
                (t.stopPropagation(), n.length > 0)
              ) {
                var r = n.shift();
                r();
              }
            },
            !0
          ),
          function(t) {
            n.push(t), window.postMessage("process-tick", "*");
          }
        );
      }
      return function(t) {
        setTimeout(t, 0);
      };
    })()),
      (n.title = "browser"),
      (n.browser = !0),
      (n.env = {}),
      (n.argv = []),
      (n.on = e),
      (n.addListener = e),
      (n.once = e),
      (n.off = e),
      (n.removeListener = e),
      (n.removeAllListeners = e),
      (n.emit = e),
      (n.binding = function() {
        throw new Error("process.binding is not supported");
      }),
      (n.cwd = function() {
        return "/";
      }),
      (n.chdir = function() {
        throw new Error("process.chdir is not supported");
      });
  },
]);
//# sourceMappingURL=axios.min.map