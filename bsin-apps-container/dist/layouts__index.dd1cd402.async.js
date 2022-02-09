(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [4],
  {
    '+QRC': function (e, t, n) {
      'use strict';
      var a = n('E9nw'),
        r = { 'text/plain': 'Text', 'text/html': 'Url', default: 'Text' },
        o = 'Copy to clipboard: #{key}, Enter';
      function i(e) {
        var t =
          (/mac os x/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl') + '+C';
        return e.replace(/#{\s*key\s*}/g, t);
      }
      function l(e, t) {
        var n,
          l,
          c,
          s,
          u,
          d,
          p = !1;
        t || (t = {}), (n = t.debug || !1);
        try {
          (c = a()),
            (s = document.createRange()),
            (u = document.getSelection()),
            (d = document.createElement('span')),
            (d.textContent = e),
            (d.style.all = 'unset'),
            (d.style.position = 'fixed'),
            (d.style.top = 0),
            (d.style.clip = 'rect(0, 0, 0, 0)'),
            (d.style.whiteSpace = 'pre'),
            (d.style.webkitUserSelect = 'text'),
            (d.style.MozUserSelect = 'text'),
            (d.style.msUserSelect = 'text'),
            (d.style.userSelect = 'text'),
            d.addEventListener('copy', function (a) {
              if ((a.stopPropagation(), t.format))
                if (
                  (a.preventDefault(), 'undefined' === typeof a.clipboardData)
                ) {
                  n && console.warn('unable to use e.clipboardData'),
                    n && console.warn('trying IE specific stuff'),
                    window.clipboardData.clearData();
                  var o = r[t.format] || r['default'];
                  window.clipboardData.setData(o, e);
                } else
                  a.clipboardData.clearData(),
                    a.clipboardData.setData(t.format, e);
              t.onCopy && (a.preventDefault(), t.onCopy(a.clipboardData));
            }),
            document.body.appendChild(d),
            s.selectNodeContents(d),
            u.addRange(s);
          var f = document.execCommand('copy');
          if (!f) throw new Error('copy command was unsuccessful');
          p = !0;
        } catch (h) {
          n && console.error('unable to copy using execCommand: ', h),
            n && console.warn('trying IE specific stuff');
          try {
            window.clipboardData.setData(t.format || 'text', e),
              t.onCopy && t.onCopy(window.clipboardData),
              (p = !0);
          } catch (h) {
            n && console.error('unable to copy using clipboardData: ', h),
              n && console.error('falling back to prompt'),
              (l = i('message' in t ? t.message : o)),
              window.prompt(l, e);
          }
        } finally {
          u &&
            ('function' == typeof u.removeRange
              ? u.removeRange(s)
              : u.removeAllRanges()),
            d && document.body.removeChild(d),
            c();
        }
        return p;
      }
      e.exports = l;
    },
    '+ego': function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, 'default', function () {
          return Gr;
        });
      n('miYZ');
      var a = n('tsqr'),
        r = n('9og8'),
        o = n('tJVT'),
        i = n('WmNS'),
        l = n.n(i),
        c = n('q1tI'),
        s = n.n(c),
        u = (n('EFp3'), n('0XgM'), n('KQm4')),
        d = n('rePB'),
        p = n('ODXe'),
        f = n('wx14'),
        h = n('TSYQ'),
        m = n.n(h),
        v = n('H84U'),
        b = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        g = c['createContext']({
          siderHook: {
            addSider: function () {
              return null;
            },
            removeSider: function () {
              return null;
            },
          },
        });
      function y(e) {
        var t = e.suffixCls,
          n = e.tagName,
          a = e.displayName;
        return function (e) {
          var r = function (a) {
            var r = c['useContext'](v['b']),
              o = r.getPrefixCls,
              i = a.prefixCls,
              l = o(t, i);
            return c['createElement'](
              e,
              Object(f['a'])({ prefixCls: l, tagName: n }, a),
            );
          };
          return (r.displayName = a), r;
        };
      }
      var O = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.children,
            r = e.tagName,
            o = b(e, ['prefixCls', 'className', 'children', 'tagName']),
            i = m()(t, n);
          return c['createElement'](r, Object(f['a'])({ className: i }, o), a);
        },
        j = function (e) {
          var t,
            n = c['useContext'](v['b']),
            a = n.direction,
            r = c['useState']([]),
            o = Object(p['a'])(r, 2),
            i = o[0],
            l = o[1],
            s = e.prefixCls,
            h = e.className,
            y = e.children,
            O = e.hasSider,
            j = e.tagName,
            x = b(e, [
              'prefixCls',
              'className',
              'children',
              'hasSider',
              'tagName',
            ]),
            w = m()(
              s,
              ((t = {}),
              Object(d['a'])(
                t,
                ''.concat(s, '-has-sider'),
                'boolean' === typeof O ? O : i.length > 0,
              ),
              Object(d['a'])(t, ''.concat(s, '-rtl'), 'rtl' === a),
              t),
              h,
            ),
            C = c['useMemo'](function () {
              return {
                siderHook: {
                  addSider: function (e) {
                    l(function (t) {
                      return [].concat(Object(u['a'])(t), [e]);
                    });
                  },
                  removeSider: function (e) {
                    l(function (t) {
                      return t.filter(function (t) {
                        return t !== e;
                      });
                    });
                  },
                },
              };
            }, []);
          return c['createElement'](
            g.Provider,
            { value: C },
            c['createElement'](j, Object(f['a'])({ className: w }, x), y),
          );
        },
        x = y({
          suffixCls: 'layout',
          tagName: 'section',
          displayName: 'Layout',
        })(j),
        w = y({
          suffixCls: 'layout-header',
          tagName: 'header',
          displayName: 'Header',
        })(O),
        C = y({
          suffixCls: 'layout-footer',
          tagName: 'footer',
          displayName: 'Footer',
        })(O),
        S = y({
          suffixCls: 'layout-content',
          tagName: 'main',
          displayName: 'Content',
        })(O),
        k = x,
        E = n('bT9E'),
        T = n('VTBJ'),
        N = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z',
                },
              },
            ],
          },
          name: 'bars',
          theme: 'outlined',
        },
        z = N,
        H = n('6VBw'),
        M = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: z }),
          );
        };
      M.displayName = 'BarsOutlined';
      var D = c['forwardRef'](M),
        P = n('UESt'),
        L = n('5bA4'),
        I = function (e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        },
        A = I,
        R = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        V = {
          xs: '479.98px',
          sm: '575.98px',
          md: '767.98px',
          lg: '991.98px',
          xl: '1199.98px',
          xxl: '1599.98px',
        },
        F = c['createContext']({}),
        W = (function () {
          var e = 0;
          return function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '';
            return (e += 1), ''.concat(t).concat(e);
          };
        })(),
        B = c['forwardRef'](function (e, t) {
          var n = e.prefixCls,
            a = e.className,
            r = e.trigger,
            o = e.children,
            i = e.defaultCollapsed,
            l = void 0 !== i && i,
            s = e.theme,
            u = void 0 === s ? 'dark' : s,
            h = e.style,
            b = void 0 === h ? {} : h,
            y = e.collapsible,
            O = void 0 !== y && y,
            j = e.reverseArrow,
            x = void 0 !== j && j,
            w = e.width,
            C = void 0 === w ? 200 : w,
            S = e.collapsedWidth,
            k = void 0 === S ? 80 : S,
            T = e.zeroWidthTriggerStyle,
            N = e.breakpoint,
            z = e.onCollapse,
            H = e.onBreakpoint,
            M = R(e, [
              'prefixCls',
              'className',
              'trigger',
              'children',
              'defaultCollapsed',
              'theme',
              'style',
              'collapsible',
              'reverseArrow',
              'width',
              'collapsedWidth',
              'zeroWidthTriggerStyle',
              'breakpoint',
              'onCollapse',
              'onBreakpoint',
            ]),
            I = Object(c['useContext'])(g),
            B = I.siderHook,
            U = Object(c['useState'])('collapsed' in M ? M.collapsed : l),
            _ = Object(p['a'])(U, 2),
            K = _[0],
            X = _[1],
            Y = Object(c['useState'])(!1),
            q = Object(p['a'])(Y, 2),
            G = q[0],
            Q = q[1];
          Object(c['useEffect'])(
            function () {
              'collapsed' in M && X(M.collapsed);
            },
            [M.collapsed],
          );
          var Z = function (e, t) {
              'collapsed' in M || X(e), null === z || void 0 === z || z(e, t);
            },
            J = Object(c['useRef'])();
          (J.current = function (e) {
            Q(e.matches),
              null === H || void 0 === H || H(e.matches),
              K !== e.matches && Z(e.matches, 'responsive');
          }),
            Object(c['useEffect'])(function () {
              function e(e) {
                return J.current(e);
              }
              var t;
              if ('undefined' !== typeof window) {
                var n = window,
                  a = n.matchMedia;
                if (a && N && N in V) {
                  t = a('(max-width: '.concat(V[N], ')'));
                  try {
                    t.addEventListener('change', e);
                  } catch (r) {
                    t.addListener(e);
                  }
                  e(t);
                }
              }
              return function () {
                try {
                  null === t ||
                    void 0 === t ||
                    t.removeEventListener('change', e);
                } catch (r) {
                  null === t || void 0 === t || t.removeListener(e);
                }
              };
            }, []),
            Object(c['useEffect'])(function () {
              var e = W('ant-sider-');
              return (
                B.addSider(e),
                function () {
                  return B.removeSider(e);
                }
              );
            }, []);
          var $ = function () {
              Z(!K, 'clickTrigger');
            },
            ee = Object(c['useContext'])(v['b']),
            te = ee.getPrefixCls,
            ne = function () {
              var e,
                i = te('layout-sider', n),
                l = Object(E['a'])(M, ['collapsed']),
                s = K ? k : C,
                p = A(s) ? ''.concat(s, 'px') : String(s),
                h =
                  0 === parseFloat(String(k || 0))
                    ? c['createElement'](
                        'span',
                        {
                          onClick: $,
                          className: m()(
                            ''.concat(i, '-zero-width-trigger'),
                            ''
                              .concat(i, '-zero-width-trigger-')
                              .concat(x ? 'right' : 'left'),
                          ),
                          style: T,
                        },
                        r || c['createElement'](D, null),
                      )
                    : null,
                v = {
                  expanded: x
                    ? c['createElement'](P['a'], null)
                    : c['createElement'](L['a'], null),
                  collapsed: x
                    ? c['createElement'](L['a'], null)
                    : c['createElement'](P['a'], null),
                },
                g = K ? 'collapsed' : 'expanded',
                y = v[g],
                j =
                  null !== r
                    ? h ||
                      c['createElement'](
                        'div',
                        {
                          className: ''.concat(i, '-trigger'),
                          onClick: $,
                          style: { width: p },
                        },
                        r || y,
                      )
                    : null,
                w = Object(f['a'])(Object(f['a'])({}, b), {
                  flex: '0 0 '.concat(p),
                  maxWidth: p,
                  minWidth: p,
                  width: p,
                }),
                S = m()(
                  i,
                  ''.concat(i, '-').concat(u),
                  ((e = {}),
                  Object(d['a'])(e, ''.concat(i, '-collapsed'), !!K),
                  Object(d['a'])(
                    e,
                    ''.concat(i, '-has-trigger'),
                    O && null !== r && !h,
                  ),
                  Object(d['a'])(e, ''.concat(i, '-below'), !!G),
                  Object(d['a'])(
                    e,
                    ''.concat(i, '-zero-width'),
                    0 === parseFloat(p),
                  ),
                  e),
                  a,
                );
              return c['createElement'](
                'aside',
                Object(f['a'])({ className: S }, l, { style: w, ref: t }),
                c['createElement'](
                  'div',
                  { className: ''.concat(i, '-children') },
                  o,
                ),
                O || (G && h) ? j : null,
              );
            },
            ae = c['useMemo'](
              function () {
                return { siderCollapsed: K };
              },
              [K],
            );
          return c['createElement'](F.Provider, { value: ae }, ne());
        });
      B.displayName = 'Sider';
      var U = B,
        _ = k;
      (_.Header = w), (_.Footer = C), (_.Content = S), (_.Sider = U);
      var K = _,
        X = n('YqQA'),
        Y = (n('x54q'), n('5YgA'), n('1OyB')),
        q = n('vuIU'),
        G = n('Ji7U'),
        Q = n('LK+K'),
        Z = n('1j5w'),
        J = n('GZ0F'),
        $ = n('jdIJ'),
        ee = Object(c['createContext'])({
          prefixCls: '',
          firstLevel: !0,
          inlineCollapsed: !1,
        }),
        te = ee,
        ne = n('0n0R');
      function ae(e) {
        var t,
          n,
          a = e.popupClassName,
          r = e.icon,
          o = e.title,
          i = c['useContext'](te),
          l = i.prefixCls,
          s = i.inlineCollapsed,
          u = i.antdMenuTheme,
          d = Object(Z['g'])();
        if (r) {
          var p = Object(ne['b'])(o) && 'span' === o.type;
          n = c['createElement'](
            c['Fragment'],
            null,
            Object(ne['a'])(r, {
              className: m()(
                Object(ne['b'])(r)
                  ? null === (t = r.props) || void 0 === t
                    ? void 0
                    : t.className
                  : '',
                ''.concat(l, '-item-icon'),
              ),
            }),
            p
              ? o
              : c['createElement'](
                  'span',
                  { className: ''.concat(l, '-title-content') },
                  o,
                ),
          );
        } else
          n =
            s && !d.length && o && 'string' === typeof o
              ? c['createElement'](
                  'div',
                  { className: ''.concat(l, '-inline-collapsed-noicon') },
                  o.charAt(0),
                )
              : c['createElement'](
                  'span',
                  { className: ''.concat(l, '-title-content') },
                  o,
                );
        var h = c['useMemo'](
          function () {
            return Object(f['a'])(Object(f['a'])({}, i), { firstLevel: !1 });
          },
          [i],
        );
        return c['createElement'](
          te.Provider,
          { value: h },
          c['createElement'](
            Z['e'],
            Object(f['a'])({}, Object(E['a'])(e, ['icon']), {
              title: n,
              popupClassName: m()(l, ''.concat(l, '-').concat(u), a),
            }),
          ),
        );
      }
      var re = ae,
        oe = n('Zm9Q'),
        ie = n('3S7+'),
        le = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        ce = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n() {
            var e;
            return (
              Object(Y['a'])(this, n),
              (e = t.apply(this, arguments)),
              (e.renderItem = function (t) {
                var n,
                  a,
                  r = t.siderCollapsed,
                  o = e.context,
                  i = o.prefixCls,
                  l = o.firstLevel,
                  s = o.inlineCollapsed,
                  u = o.direction,
                  p = e.props,
                  h = p.className,
                  v = p.children,
                  b = e.props,
                  g = b.title,
                  y = b.icon,
                  O = b.danger,
                  j = le(b, ['title', 'icon', 'danger']),
                  x = g;
                'undefined' === typeof g
                  ? (x = l ? v : '')
                  : !1 === g && (x = '');
                var w = { title: x };
                r || s || ((w.title = null), (w.visible = !1));
                var C = Object(oe['a'])(v).length;
                return c['createElement'](
                  ie['a'],
                  Object(f['a'])({}, w, {
                    placement: 'rtl' === u ? 'left' : 'right',
                    overlayClassName: ''.concat(i, '-inline-collapsed-tooltip'),
                  }),
                  c['createElement'](
                    Z['b'],
                    Object(f['a'])({}, j, {
                      className: m()(
                        ((n = {}),
                        Object(d['a'])(n, ''.concat(i, '-item-danger'), O),
                        Object(d['a'])(
                          n,
                          ''.concat(i, '-item-only-child'),
                          1 === (y ? C + 1 : C),
                        ),
                        n),
                        h,
                      ),
                      title: 'string' === typeof g ? g : void 0,
                    }),
                    Object(ne['a'])(y, {
                      className: m()(
                        Object(ne['b'])(y)
                          ? null === (a = y.props) || void 0 === a
                            ? void 0
                            : a.className
                          : '',
                        ''.concat(i, '-item-icon'),
                      ),
                    }),
                    e.renderItemChildren(s),
                  ),
                );
              }),
              e
            );
          }
          return (
            Object(q['a'])(n, [
              {
                key: 'renderItemChildren',
                value: function (e) {
                  var t = this.context,
                    n = t.prefixCls,
                    a = t.firstLevel,
                    r = this.props,
                    o = r.icon,
                    i = r.children,
                    l = c['createElement'](
                      'span',
                      { className: ''.concat(n, '-title-content') },
                      i,
                    );
                  return (!o || (Object(ne['b'])(i) && 'span' === i.type)) &&
                    i &&
                    e &&
                    a &&
                    'string' === typeof i
                    ? c['createElement'](
                        'div',
                        { className: ''.concat(n, '-inline-collapsed-noicon') },
                        i.charAt(0),
                      )
                    : l;
                },
              },
              {
                key: 'render',
                value: function () {
                  return c['createElement'](F.Consumer, null, this.renderItem);
                },
              },
            ]),
            n
          );
        })(c['Component']);
      ce.contextType = te;
      var se = n('uaoM'),
        ue = n('EXcs'),
        de = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        pe = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.dashed,
            r = de(e, ['prefixCls', 'className', 'dashed']),
            o = c['useContext'](v['b']),
            i = o.getPrefixCls,
            l = i('menu', t),
            s = m()(
              Object(d['a'])({}, ''.concat(l, '-item-divider-dashed'), !!a),
              n,
            );
          return c['createElement'](
            Z['a'],
            Object(f['a'])({ className: s }, r),
          );
        },
        fe = pe,
        he = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        me = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            return (
              Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.renderMenu = function (e) {
                var t = e.getPopupContainer,
                  n = e.getPrefixCls,
                  r = e.direction,
                  o = n(),
                  i = a.props,
                  l = i.prefixCls,
                  s = i.className,
                  u = i.theme,
                  d = i.expandIcon,
                  p = he(i, ['prefixCls', 'className', 'theme', 'expandIcon']),
                  h = Object(E['a'])(p, ['siderCollapsed', 'collapsedWidth']),
                  v = a.getInlineCollapsed(),
                  b = {
                    horizontal: { motionName: ''.concat(o, '-slide-up') },
                    inline: ue['a'],
                    other: { motionName: ''.concat(o, '-zoom-big') },
                  },
                  g = n('menu', l),
                  y = m()(''.concat(g, '-').concat(u), s),
                  O = Object($['a'])(function (e, t, n, a) {
                    return {
                      prefixCls: e,
                      inlineCollapsed: t || !1,
                      antdMenuTheme: n,
                      direction: a,
                      firstLevel: !0,
                    };
                  })(g, v, u, r);
                return c['createElement'](
                  te.Provider,
                  { value: O },
                  c['createElement'](
                    Z['f'],
                    Object(f['a'])(
                      {
                        getPopupContainer: t,
                        overflowedIndicator: c['createElement'](J['a'], null),
                        overflowedIndicatorPopupClassName: ''
                          .concat(g, '-')
                          .concat(u),
                      },
                      h,
                      {
                        inlineCollapsed: v,
                        className: y,
                        prefixCls: g,
                        direction: r,
                        defaultMotions: b,
                        expandIcon: Object(ne['a'])(d, {
                          className: ''.concat(g, '-submenu-expand-icon'),
                        }),
                      },
                    ),
                  ),
                );
              }),
              Object(se['a'])(
                !('inlineCollapsed' in e && 'inline' !== e.mode),
                'Menu',
                '`inlineCollapsed` should only be used when `mode` is inline.',
              ),
              Object(se['a'])(
                !(void 0 !== e.siderCollapsed && 'inlineCollapsed' in e),
                'Menu',
                '`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
              ),
              a
            );
          }
          return (
            Object(q['a'])(n, [
              {
                key: 'getInlineCollapsed',
                value: function () {
                  var e = this.props,
                    t = e.inlineCollapsed,
                    n = e.siderCollapsed;
                  return void 0 !== n ? n : t;
                },
              },
              {
                key: 'render',
                value: function () {
                  return c['createElement'](v['a'], null, this.renderMenu);
                },
              },
            ]),
            n
          );
        })(c['Component']);
      me.defaultProps = { theme: 'light' };
      var ve = (function (e) {
        Object(G['a'])(n, e);
        var t = Object(Q['a'])(n);
        function n() {
          return Object(Y['a'])(this, n), t.apply(this, arguments);
        }
        return (
          Object(q['a'])(n, [
            {
              key: 'render',
              value: function () {
                var e = this;
                return c['createElement'](F.Consumer, null, function (t) {
                  return c['createElement'](me, Object(f['a'])({}, e.props, t));
                });
              },
            },
          ]),
          n
        );
      })(c['Component']);
      (ve.Divider = fe),
        (ve.Item = ce),
        (ve.SubMenu = re),
        (ve.ItemGroup = Z['c']);
      var be = ve,
        ge = n('55Ip'),
        ye = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z',
                },
              },
            ],
          },
          name: 'user',
          theme: 'outlined',
        },
        Oe = ye,
        je = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Oe }),
          );
        };
      je.displayName = 'UserOutlined';
      var xe = c['forwardRef'](je),
        we = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-85.7 127.1A397.61 397.61 0 0072 552a398.46 398.46 0 00117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 00472 952a398.46 398.46 0 00282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 00872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 01470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 00589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 01166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z',
                },
              },
            ],
          },
          name: 'pie-chart',
          theme: 'outlined',
        },
        Ce = we,
        Se = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Ce }),
          );
        };
      Se.displayName = 'PieChartOutlined';
      var ke = c['forwardRef'](Se),
        Ee = n('nKUr'),
        Te = be.SubMenu;
      function Ne(e) {
        var t = e.appMenu,
          n = e.mode,
          a = X['a'].useContainer(),
          r = s.a.useState(
            location.hash.slice(location.hash.lastIndexOf('/') + 1),
          ),
          i = Object(o['a'])(r, 2),
          l = i[0],
          c = i[1],
          u = s.a.useState(['']),
          d = Object(o['a'])(u, 2),
          p = d[0],
          f = d[1],
          h = s.a.useState(['']),
          m = Object(o['a'])(h, 2),
          v = m[0],
          b = m[1];
        s.a.useEffect(() => {
          var e = location.hash.split('#')[1];
          if ((c(e), 'Top' !== a.layouts && 'inline' === a.mode && t)) {
            var n = t.map((e) => (e.children ? e.path : void 0));
            b(n),
              t.forEach((t) => {
                t.children &&
                  t.children.forEach((n) =>
                    n.path === e ? f([t.path]) : null,
                  );
              });
          }
        }, [location.hash]);
        var g = (e) => {
          var t = e.find((e) => -1 === p.indexOf(e));
          v && -1 === v.indexOf(t) ? f(e) : f(t ? [t] : []);
        };
        return Object(Ee['jsx'])(Ee['Fragment'], {
          children: t
            ? Object(Ee['jsx'])(be, {
                openKeys: p,
                onOpenChange: g,
                theme: a.menuTheme,
                selectedKeys: [l],
                mode: n,
                children: t[0].children.map((e) =>
                  e.children[0] && 1 === e.children[0].Type
                    ? Object(Ee['jsx'])(
                        Te,
                        {
                          icon: Object(Ee['jsx'])(xe, {}),
                          title: e.menuName,
                          children: e.children.map((e) =>
                            Object(Ee['jsx'])(
                              be.Item,
                              {
                                icon: Object(Ee['jsx'])(ke, {}),
                                children: Object(Ee['jsx'])(ge['a'], {
                                  to: e.path,
                                  children: e.menuName,
                                }),
                              },
                              e.path,
                            ),
                          ),
                        },
                        e.path,
                      )
                    : Object(Ee['jsx'])(
                        be.Item,
                        {
                          style: { margin: 0 },
                          icon: Object(Ee['jsx'])(ke, {}),
                          children: Object(Ee['jsx'])(ge['a'], {
                            to: e.path,
                            children: e.menuName,
                          }),
                        },
                        e.path,
                      ),
                ),
              })
            : null,
        });
      }
      n('xcNN'), n('14J3');
      var ze = n('BMrR'),
        He = (n('jCWc'), n('kPKH')),
        Me = n('9kvl'),
        De = n('0JIh'),
        Pe = n.n(De);
      n('zk9c');
      function Le() {
        var e = X['a'].useContainer(),
          t = () => {
            Me['e'].push({ pathname: '/workplace' });
          };
        return Object(Ee['jsx'])('a', {
          onClick: t,
          children: Object(Ee['jsx'])('div', {
            className: 'logo',
            style:
              e.siderCollapsed && 'Sider' === e.layouts
                ? { width: 80 }
                : { width: 200 },
            children: Object(Ee['jsxs'])(ze['a'], {
              align: 'middle',
              children: [
                Object(Ee['jsx'])(He['a'], {
                  span: e.siderCollapsed && 'Sider' === e.layouts ? 24 : 6,
                  style: { height: 64, textAlign: 'center' },
                  children: Object(Ee['jsx'])('img', {
                    width: '100%',
                    src: Pe.a,
                  }),
                }),
                'Sider' === e.layouts && e.siderCollapsed
                  ? null
                  : Object(Ee['jsx'])(He['a'], {
                      span: 18,
                      children: Object(Ee['jsx'])('div', {
                        style:
                          'light' === e.menuTheme
                            ? {
                                fontSize: 18,
                                fontWeight: 600,
                                color: e.primaryColor,
                              }
                            : { fontSize: 18, fontWeight: 600, color: '#fff' },
                        children: 'Bsin-PaaS\u5e73\u53f0',
                      }),
                    }),
              ],
            }),
          }),
        });
      }
      var Ie = n('k82f'),
        Ae = K.Sider,
        Re = () => {
          var e = X['a'].useContainer(),
            t = 'calc(100% - 64px)';
          return Object(Ee['jsx'])('div', {
            className: 'sider',
            children: e.layoutSider
              ? Object(Ee['jsxs'])(Ae, {
                  trigger: null,
                  theme: e.menuTheme,
                  style: e.fixedSiderStyle
                    ? {
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                      }
                    : { backgroundColor: '#fff' },
                  collapsible: !0,
                  collapsed: e.siderCollapsed,
                  children: [
                    Object(Ee['jsx'])(Le, {}),
                    Object(Ee['jsx'])(Ie['Scrollbars'], {
                      style: { height: t },
                      children: Object(Ee['jsx'])(Ne, {
                        appMenu: e.appMenu,
                        mode: e.mode,
                      }),
                    }),
                  ],
                })
              : null,
          });
        },
        Ve = Re,
        Fe = (n('KAsB'), n('+L6B'), n('eDIo')),
        We = n('2/Rp'),
        Be = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        Ue = We['a'].Group,
        _e = function (e) {
          var t = c['useContext'](v['b']),
            n = t.getPopupContainer,
            a = t.getPrefixCls,
            r = t.direction,
            o = e.prefixCls,
            i = e.type,
            l = void 0 === i ? 'default' : i,
            s = e.disabled,
            u = e.onClick,
            d = e.htmlType,
            h = e.children,
            b = e.className,
            g = e.overlay,
            y = e.trigger,
            O = e.align,
            j = e.visible,
            x = e.onVisibleChange,
            w = e.placement,
            C = e.getPopupContainer,
            S = e.href,
            k = e.icon,
            E = void 0 === k ? c['createElement'](J['a'], null) : k,
            T = e.title,
            N = e.buttonsRender,
            z =
              void 0 === N
                ? function (e) {
                    return e;
                  }
                : N,
            H = e.mouseEnterDelay,
            M = e.mouseLeaveDelay,
            D = e.overlayClassName,
            P = e.overlayStyle,
            L = Be(e, [
              'prefixCls',
              'type',
              'disabled',
              'onClick',
              'htmlType',
              'children',
              'className',
              'overlay',
              'trigger',
              'align',
              'visible',
              'onVisibleChange',
              'placement',
              'getPopupContainer',
              'href',
              'icon',
              'title',
              'buttonsRender',
              'mouseEnterDelay',
              'mouseLeaveDelay',
              'overlayClassName',
              'overlayStyle',
            ]),
            I = a('dropdown-button', o),
            A = {
              align: O,
              overlay: g,
              disabled: s,
              trigger: s ? [] : y,
              onVisibleChange: x,
              getPopupContainer: C || n,
              mouseEnterDelay: H,
              mouseLeaveDelay: M,
              overlayClassName: D,
              overlayStyle: P,
            };
          'visible' in e && (A.visible = j),
            (A.placement =
              'placement' in e
                ? w
                : 'rtl' === r
                ? 'bottomLeft'
                : 'bottomRight');
          var R = c['createElement'](
              We['a'],
              {
                type: l,
                disabled: s,
                onClick: u,
                htmlType: d,
                href: S,
                title: T,
              },
              h,
            ),
            V = c['createElement'](We['a'], { type: l, icon: E }),
            F = z([R, V]),
            W = Object(p['a'])(F, 2),
            B = W[0],
            U = W[1];
          return c['createElement'](
            Ue,
            Object(f['a'])({}, L, { className: m()(I, b) }),
            B,
            c['createElement'](qe, A, U),
          );
        };
      _e.__ANT_BUTTON = !0;
      var Ke = _e,
        Xe = n('CWQg'),
        Ye =
          (Object(Xe['a'])(
            'topLeft',
            'topCenter',
            'topRight',
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
          ),
          function (e) {
            var t,
              n = c['useContext'](v['b']),
              a = n.getPopupContainer,
              r = n.getPrefixCls,
              o = n.direction,
              i = function () {
                var t = r(),
                  n = e.placement,
                  a = void 0 === n ? '' : n,
                  o = e.transitionName;
                return void 0 !== o
                  ? o
                  : a.indexOf('top') >= 0
                  ? ''.concat(t, '-slide-down')
                  : ''.concat(t, '-slide-up');
              },
              l = function (t) {
                var n,
                  a = e.overlay;
                (n = 'function' === typeof a ? a() : a),
                  (n = c['Children'].only(
                    'string' === typeof n
                      ? c['createElement']('span', null, n)
                      : n,
                  ));
                var r = n.props;
                Object(se['a'])(
                  !r.mode || 'vertical' === r.mode,
                  'Dropdown',
                  'mode="'.concat(
                    r.mode,
                    '" is not supported for Dropdown\'s Menu.',
                  ),
                );
                var o = r.selectable,
                  i = void 0 !== o && o,
                  l = r.expandIcon,
                  s =
                    'undefined' !== typeof l && c['isValidElement'](l)
                      ? l
                      : c['createElement'](
                          'span',
                          { className: ''.concat(t, '-menu-submenu-arrow') },
                          c['createElement'](P['a'], {
                            className: ''.concat(t, '-menu-submenu-arrow-icon'),
                          }),
                        ),
                  u =
                    'string' === typeof n.type
                      ? n
                      : Object(ne['a'])(n, {
                          mode: 'vertical',
                          selectable: i,
                          expandIcon: s,
                        });
                return u;
              },
              s = function () {
                var t = e.placement;
                return void 0 !== t
                  ? t
                  : 'rtl' === o
                  ? 'bottomRight'
                  : 'bottomLeft';
              },
              u = e.arrow,
              p = e.prefixCls,
              h = e.children,
              b = e.trigger,
              g = e.disabled,
              y = e.getPopupContainer,
              O = e.overlayClassName,
              j = r('dropdown', p),
              x = c['Children'].only(h),
              w = Object(ne['a'])(x, {
                className: m()(
                  ''.concat(j, '-trigger'),
                  Object(d['a'])({}, ''.concat(j, '-rtl'), 'rtl' === o),
                  x.props.className,
                ),
                disabled: g,
              }),
              C = m()(O, Object(d['a'])({}, ''.concat(j, '-rtl'), 'rtl' === o)),
              S = g ? [] : b;
            return (
              S && -1 !== S.indexOf('contextMenu') && (t = !0),
              c['createElement'](
                Fe['a'],
                Object(f['a'])({ arrow: u, alignPoint: t }, e, {
                  overlayClassName: C,
                  prefixCls: j,
                  getPopupContainer: y || a,
                  transitionName: i(),
                  trigger: S,
                  overlay: function () {
                    return l(j);
                  },
                  placement: s(),
                }),
                w,
              )
            );
          });
      (Ye.Button = Ke),
        (Ye.defaultProps = { mouseEnterDelay: 0.15, mouseLeaveDelay: 0.1 });
      var qe = Ye,
        Ge = qe,
        Qe = (n('Telt'), n('Tckk')),
        Ze = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z',
                },
              },
            ],
          },
          name: 'setting',
          theme: 'outlined',
        },
        Je = Ze,
        $e = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Je }),
          );
        };
      $e.displayName = 'SettingOutlined';
      var et = c['forwardRef']($e),
        tt = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z',
                },
              },
            ],
          },
          name: 'logout',
          theme: 'outlined',
        },
        nt = tt,
        at = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: nt }),
          );
        };
      at.displayName = 'LogoutOutlined';
      var rt,
        ot = c['forwardRef'](at),
        it = (n('CWI+'), n('Ff2n')),
        lt = n('U8pU'),
        ct = n('wgJM'),
        st = n('QC+M'),
        ut = n('MNnm');
      function dt(e) {
        if ('undefined' === typeof document) return 0;
        if (e || void 0 === rt) {
          var t = document.createElement('div');
          (t.style.width = '100%'), (t.style.height = '200px');
          var n = document.createElement('div'),
            a = n.style;
          (a.position = 'absolute'),
            (a.top = '0'),
            (a.left = '0'),
            (a.pointerEvents = 'none'),
            (a.visibility = 'hidden'),
            (a.width = '200px'),
            (a.height = '150px'),
            (a.overflow = 'hidden'),
            n.appendChild(t),
            document.body.appendChild(n);
          var r = t.offsetWidth;
          n.style.overflow = 'scroll';
          var o = t.offsetWidth;
          r === o && (o = n.clientWidth),
            document.body.removeChild(n),
            (rt = r - o);
        }
        return rt;
      }
      function pt(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!e) return {};
        var n = t.element,
          a = void 0 === n ? document.body : n,
          r = {},
          o = Object.keys(e);
        return (
          o.forEach(function (e) {
            r[e] = a.style[e];
          }),
          o.forEach(function (t) {
            a.style[t] = e[t];
          }),
          r
        );
      }
      var ft = pt;
      function ht() {
        return (
          document.body.scrollHeight >
            (window.innerHeight || document.documentElement.clientHeight) &&
          window.innerWidth > document.body.offsetWidth
        );
      }
      var mt = {},
        vt = function (e) {
          if (ht() || e) {
            var t = 'ant-scrolling-effect',
              n = new RegExp(''.concat(t), 'g'),
              a = document.body.className;
            if (e) {
              if (!n.test(a)) return;
              return (
                ft(mt),
                (mt = {}),
                void (document.body.className = a.replace(n, '').trim())
              );
            }
            var r = dt();
            if (
              r &&
              ((mt = ft({
                position: 'relative',
                width: 'calc(100% - '.concat(r, 'px)'),
              })),
              !n.test(a))
            ) {
              var o = ''.concat(a, ' ').concat(t);
              document.body.className = o.trim();
            }
          }
        },
        bt = [],
        gt = 'ant-scrolling-effect',
        yt = new RegExp(''.concat(gt), 'g'),
        Ot = 0,
        jt = new Map(),
        xt = function e(t) {
          var n = this;
          Object(Y['a'])(this, e),
            (this.lockTarget = void 0),
            (this.options = void 0),
            (this.getContainer = function () {
              var e;
              return null === (e = n.options) || void 0 === e
                ? void 0
                : e.container;
            }),
            (this.reLock = function (e) {
              var t = bt.find(function (e) {
                var t = e.target;
                return t === n.lockTarget;
              });
              t && n.unLock(),
                (n.options = e),
                t && ((t.options = e), n.lock());
            }),
            (this.lock = function () {
              var e;
              if (
                !bt.some(function (e) {
                  var t = e.target;
                  return t === n.lockTarget;
                })
              )
                if (
                  bt.some(function (e) {
                    var t,
                      a = e.options;
                    return (
                      (null === a || void 0 === a ? void 0 : a.container) ===
                      (null === (t = n.options) || void 0 === t
                        ? void 0
                        : t.container)
                    );
                  })
                )
                  bt = [].concat(Object(u['a'])(bt), [
                    { target: n.lockTarget, options: n.options },
                  ]);
                else {
                  var t = 0,
                    a =
                      (null === (e = n.options) || void 0 === e
                        ? void 0
                        : e.container) || document.body;
                  ((a === document.body &&
                    window.innerWidth - document.documentElement.clientWidth >
                      0) ||
                    a.scrollHeight > a.clientHeight) &&
                    (t = dt());
                  var r = a.className;
                  if (
                    (0 ===
                      bt.filter(function (e) {
                        var t,
                          a = e.options;
                        return (
                          (null === a || void 0 === a
                            ? void 0
                            : a.container) ===
                          (null === (t = n.options) || void 0 === t
                            ? void 0
                            : t.container)
                        );
                      }).length &&
                      jt.set(
                        a,
                        ft(
                          {
                            width:
                              0 !== t
                                ? 'calc(100% - '.concat(t, 'px)')
                                : void 0,
                            overflow: 'hidden',
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                          },
                          { element: a },
                        ),
                      ),
                    !yt.test(r))
                  ) {
                    var o = ''.concat(r, ' ').concat(gt);
                    a.className = o.trim();
                  }
                  bt = [].concat(Object(u['a'])(bt), [
                    { target: n.lockTarget, options: n.options },
                  ]);
                }
            }),
            (this.unLock = function () {
              var e,
                t = bt.find(function (e) {
                  var t = e.target;
                  return t === n.lockTarget;
                });
              if (
                ((bt = bt.filter(function (e) {
                  var t = e.target;
                  return t !== n.lockTarget;
                })),
                t &&
                  !bt.some(function (e) {
                    var n,
                      a = e.options;
                    return (
                      (null === a || void 0 === a ? void 0 : a.container) ===
                      (null === (n = t.options) || void 0 === n
                        ? void 0
                        : n.container)
                    );
                  }))
              ) {
                var a =
                    (null === (e = n.options) || void 0 === e
                      ? void 0
                      : e.container) || document.body,
                  r = a.className;
                yt.test(r) &&
                  (ft(jt.get(a), { element: a }),
                  jt.delete(a),
                  (a.className = a.className.replace(yt, '').trim()));
              }
            }),
            (this.lockTarget = Ot++),
            (this.options = t);
        },
        wt = 0,
        Ct = Object(ut['a'])();
      var St = {},
        kt = function (e) {
          if (!Ct) return null;
          if (e) {
            if ('string' === typeof e) return document.querySelectorAll(e)[0];
            if ('function' === typeof e) return e();
            if (
              'object' === Object(lt['a'])(e) &&
              e instanceof window.HTMLElement
            )
              return e;
          }
          return document.body;
        },
        Et = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            return (
              Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.container = void 0),
              (a.componentRef = c['createRef']()),
              (a.rafId = void 0),
              (a.scrollLocker = void 0),
              (a.renderComponent = void 0),
              (a.updateScrollLocker = function (e) {
                var t = e || {},
                  n = t.visible,
                  r = a.props,
                  o = r.getContainer,
                  i = r.visible;
                i &&
                  i !== n &&
                  Ct &&
                  kt(o) !== a.scrollLocker.getContainer() &&
                  a.scrollLocker.reLock({ container: kt(o) });
              }),
              (a.updateOpenCount = function (e) {
                var t = e || {},
                  n = t.visible,
                  r = t.getContainer,
                  o = a.props,
                  i = o.visible,
                  l = o.getContainer;
                i !== n &&
                  Ct &&
                  kt(l) === document.body &&
                  (i && !n ? (wt += 1) : e && (wt -= 1));
                var c = 'function' === typeof l && 'function' === typeof r;
                (c ? l.toString() !== r.toString() : l !== r) &&
                  a.removeCurrentContainer();
              }),
              (a.attachToParent = function () {
                var e =
                  arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0];
                if (e || (a.container && !a.container.parentNode)) {
                  var t = kt(a.props.getContainer);
                  return !!t && (t.appendChild(a.container), !0);
                }
                return !0;
              }),
              (a.getContainer = function () {
                return Ct
                  ? (a.container ||
                      ((a.container = document.createElement('div')),
                      a.attachToParent(!0)),
                    a.setWrapperClassName(),
                    a.container)
                  : null;
              }),
              (a.setWrapperClassName = function () {
                var e = a.props.wrapperClassName;
                a.container &&
                  e &&
                  e !== a.container.className &&
                  (a.container.className = e);
              }),
              (a.removeCurrentContainer = function () {
                var e, t;
                null === (e = a.container) ||
                  void 0 === e ||
                  null === (t = e.parentNode) ||
                  void 0 === t ||
                  t.removeChild(a.container);
              }),
              (a.switchScrollingEffect = function () {
                1 !== wt || Object.keys(St).length
                  ? wt || (ft(St), (St = {}), vt(!0))
                  : (vt(),
                    (St = ft({
                      overflow: 'hidden',
                      overflowX: 'hidden',
                      overflowY: 'hidden',
                    })));
              }),
              (a.scrollLocker = new xt({ container: kt(e.getContainer) })),
              a
            );
          }
          return (
            Object(q['a'])(n, [
              {
                key: 'componentDidMount',
                value: function () {
                  var e = this;
                  this.updateOpenCount(),
                    this.attachToParent() ||
                      (this.rafId = Object(ct['a'])(function () {
                        e.forceUpdate();
                      }));
                },
              },
              {
                key: 'componentDidUpdate',
                value: function (e) {
                  this.updateOpenCount(e),
                    this.updateScrollLocker(e),
                    this.setWrapperClassName(),
                    this.attachToParent();
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  var e = this.props,
                    t = e.visible,
                    n = e.getContainer;
                  Ct && kt(n) === document.body && (wt = t && wt ? wt - 1 : wt),
                    this.removeCurrentContainer(),
                    ct['a'].cancel(this.rafId);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.children,
                    n = e.forceRender,
                    a = e.visible,
                    r = null,
                    o = {
                      getOpenCount: function () {
                        return wt;
                      },
                      getContainer: this.getContainer,
                      switchScrollingEffect: this.switchScrollingEffect,
                      scrollLocker: this.scrollLocker,
                    };
                  return (
                    (n || a || this.componentRef.current) &&
                      (r = c['createElement'](
                        st['a'],
                        {
                          getContainer: this.getContainer,
                          ref: this.componentRef,
                        },
                        t(o),
                      )),
                    r
                  );
                },
              },
            ]),
            n
          );
        })(c['Component']),
        Tt = Et,
        Nt = n('JX7q'),
        zt = n('4IlW');
      function Ht(e) {
        return Array.isArray(e) ? e : [e];
      }
      var Mt = {
          transition: 'transitionend',
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
        },
        Dt = Object.keys(Mt).filter(function (e) {
          if ('undefined' === typeof document) return !1;
          var t = document.getElementsByTagName('html')[0];
          return e in (t ? t.style : {});
        })[0],
        Pt = Mt[Dt];
      function Lt(e, t, n, a) {
        e.addEventListener
          ? e.addEventListener(t, n, a)
          : e.attachEvent && e.attachEvent('on'.concat(t), n);
      }
      function It(e, t, n, a) {
        e.removeEventListener
          ? e.removeEventListener(t, n, a)
          : e.attachEvent && e.detachEvent('on'.concat(t), n);
      }
      function At(e, t) {
        var n = 'function' === typeof e ? e(t) : e;
        return Array.isArray(n) ? (2 === n.length ? n : [n[0], n[1]]) : [n];
      }
      var Rt = function (e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        },
        Vt = !(
          'undefined' !== typeof window &&
          window.document &&
          window.document.createElement
        ),
        Ft = function e(t, n, a, r) {
          if (!n || n === document || n instanceof Document) return !1;
          if (n === t.parentNode) return !0;
          var o = Math.max(Math.abs(a), Math.abs(r)) === Math.abs(r),
            i = Math.max(Math.abs(a), Math.abs(r)) === Math.abs(a),
            l = n.scrollHeight - n.clientHeight,
            c = n.scrollWidth - n.clientWidth,
            s = document.defaultView.getComputedStyle(n),
            u = 'auto' === s.overflowY || 'scroll' === s.overflowY,
            d = 'auto' === s.overflowX || 'scroll' === s.overflowX,
            p = l && u,
            f = c && d;
          return (
            !!(
              (o &&
                (!p ||
                  (p &&
                    ((n.scrollTop >= l && r < 0) ||
                      (n.scrollTop <= 0 && r > 0))))) ||
              (i &&
                (!f ||
                  (f &&
                    ((n.scrollLeft >= c && a < 0) ||
                      (n.scrollLeft <= 0 && a > 0)))))
            ) && e(t, n.parentNode, a, r)
          );
        },
        Wt = [
          'className',
          'children',
          'style',
          'width',
          'height',
          'defaultOpen',
          'open',
          'prefixCls',
          'placement',
          'level',
          'levelMove',
          'ease',
          'duration',
          'getContainer',
          'handler',
          'onChange',
          'afterVisibleChange',
          'showMask',
          'maskClosable',
          'maskStyle',
          'onClose',
          'onHandleClick',
          'keyboard',
          'getOpenCount',
          'scrollLocker',
          'contentWrapperStyle',
        ],
        Bt = {},
        Ut = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            return (
              Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.levelDom = void 0),
              (a.dom = void 0),
              (a.contentWrapper = void 0),
              (a.contentDom = void 0),
              (a.maskDom = void 0),
              (a.handlerDom = void 0),
              (a.drawerId = void 0),
              (a.timeout = void 0),
              (a.passive = void 0),
              (a.startPos = void 0),
              (a.domFocus = function () {
                a.dom && a.dom.focus();
              }),
              (a.removeStartHandler = function (e) {
                e.touches.length > 1
                  ? (a.startPos = null)
                  : (a.startPos = {
                      x: e.touches[0].clientX,
                      y: e.touches[0].clientY,
                    });
              }),
              (a.removeMoveHandler = function (e) {
                if (!(e.changedTouches.length > 1) && a.startPos) {
                  var t = e.currentTarget,
                    n = e.changedTouches[0].clientX - a.startPos.x,
                    r = e.changedTouches[0].clientY - a.startPos.y;
                  (t === a.maskDom ||
                    t === a.handlerDom ||
                    (t === a.contentDom && Ft(t, e.target, n, r))) &&
                    e.cancelable &&
                    e.preventDefault();
                }
              }),
              (a.transitionEnd = function (e) {
                var t = e.target;
                It(t, Pt, a.transitionEnd), (t.style.transition = '');
              }),
              (a.onKeyDown = function (e) {
                if (e.keyCode === zt['a'].ESC) {
                  var t = a.props.onClose;
                  e.stopPropagation(), t && t(e);
                }
              }),
              (a.onWrapperTransitionEnd = function (e) {
                var t = a.props,
                  n = t.open,
                  r = t.afterVisibleChange;
                e.target === a.contentWrapper &&
                  e.propertyName.match(/transform$/) &&
                  ((a.dom.style.transition = ''),
                  !n &&
                    a.getCurrentDrawerSome() &&
                    ((document.body.style.overflowX = ''),
                    a.maskDom &&
                      ((a.maskDom.style.left = ''),
                      (a.maskDom.style.width = ''))),
                  r && r(!!n));
              }),
              (a.openLevelTransition = function () {
                var e = a.props,
                  t = e.open,
                  n = e.width,
                  r = e.height,
                  o = a.getHorizontalBoolAndPlacementName(),
                  i = o.isHorizontal,
                  l = o.placementName,
                  c = a.contentDom
                    ? a.contentDom.getBoundingClientRect()[
                        i ? 'width' : 'height'
                      ]
                    : 0,
                  s = (i ? n : r) || c;
                a.setLevelAndScrolling(t, l, s);
              }),
              (a.setLevelTransform = function (e, t, n, r) {
                var o = a.props,
                  i = o.placement,
                  l = o.levelMove,
                  c = o.duration,
                  s = o.ease,
                  u = o.showMask;
                a.levelDom.forEach(function (o) {
                  (o.style.transition = 'transform '.concat(c, ' ').concat(s)),
                    Lt(o, Pt, a.transitionEnd);
                  var d = e ? n : 0;
                  if (l) {
                    var p = At(l, { target: o, open: e });
                    d = e ? p[0] : p[1] || 0;
                  }
                  var f = 'number' === typeof d ? ''.concat(d, 'px') : d,
                    h = 'left' === i || 'top' === i ? f : '-'.concat(f);
                  (h =
                    u && 'right' === i && r
                      ? 'calc('.concat(h, ' + ').concat(r, 'px)')
                      : h),
                    (o.style.transform = d
                      ? ''.concat(t, '(').concat(h, ')')
                      : '');
                });
              }),
              (a.setLevelAndScrolling = function (e, t, n) {
                var r = a.props.onChange;
                if (!Vt) {
                  var o =
                    document.body.scrollHeight >
                      (window.innerHeight ||
                        document.documentElement.clientHeight) &&
                    window.innerWidth > document.body.offsetWidth
                      ? dt(!0)
                      : 0;
                  a.setLevelTransform(e, t, n, o),
                    a.toggleScrollingToDrawerAndBody(o);
                }
                r && r(e);
              }),
              (a.toggleScrollingToDrawerAndBody = function (e) {
                var t = a.props,
                  n = t.getContainer,
                  r = t.showMask,
                  o = t.open,
                  i = n && n();
                if (i && i.parentNode === document.body && r) {
                  var l = ['touchstart'],
                    c = [document.body, a.maskDom, a.handlerDom, a.contentDom];
                  o && 'hidden' !== document.body.style.overflow
                    ? (e && a.addScrollingEffect(e),
                      (document.body.style.touchAction = 'none'),
                      c.forEach(function (e, t) {
                        e &&
                          Lt(
                            e,
                            l[t] || 'touchmove',
                            t ? a.removeMoveHandler : a.removeStartHandler,
                            a.passive,
                          );
                      }))
                    : a.getCurrentDrawerSome() &&
                      ((document.body.style.touchAction = ''),
                      e && a.remScrollingEffect(e),
                      c.forEach(function (e, t) {
                        e &&
                          It(
                            e,
                            l[t] || 'touchmove',
                            t ? a.removeMoveHandler : a.removeStartHandler,
                            a.passive,
                          );
                      }));
                }
              }),
              (a.addScrollingEffect = function (e) {
                var t = a.props,
                  n = t.placement,
                  r = t.duration,
                  o = t.ease,
                  i = 'width '.concat(r, ' ').concat(o),
                  l = 'transform '.concat(r, ' ').concat(o);
                switch (((a.dom.style.transition = 'none'), n)) {
                  case 'right':
                    a.dom.style.transform = 'translateX(-'.concat(e, 'px)');
                    break;
                  case 'top':
                  case 'bottom':
                    (a.dom.style.width = 'calc(100% - '.concat(e, 'px)')),
                      (a.dom.style.transform = 'translateZ(0)');
                    break;
                  default:
                    break;
                }
                clearTimeout(a.timeout),
                  (a.timeout = setTimeout(function () {
                    a.dom &&
                      ((a.dom.style.transition = ''.concat(l, ',').concat(i)),
                      (a.dom.style.width = ''),
                      (a.dom.style.transform = ''));
                  }));
              }),
              (a.remScrollingEffect = function (e) {
                var t,
                  n = a.props,
                  r = n.placement,
                  o = n.duration,
                  i = n.ease;
                Dt && (document.body.style.overflowX = 'hidden'),
                  (a.dom.style.transition = 'none');
                var l = 'width '.concat(o, ' ').concat(i),
                  c = 'transform '.concat(o, ' ').concat(i);
                switch (r) {
                  case 'left':
                    (a.dom.style.width = '100%'),
                      (l = 'width 0s '.concat(i, ' ').concat(o));
                    break;
                  case 'right':
                    (a.dom.style.transform = 'translateX('.concat(e, 'px)')),
                      (a.dom.style.width = '100%'),
                      (l = 'width 0s '.concat(i, ' ').concat(o)),
                      a.maskDom &&
                        ((a.maskDom.style.left = '-'.concat(e, 'px')),
                        (a.maskDom.style.width = 'calc(100% + '.concat(
                          e,
                          'px)',
                        )));
                    break;
                  case 'top':
                  case 'bottom':
                    (a.dom.style.width = 'calc(100% + '.concat(e, 'px)')),
                      (a.dom.style.height = '100%'),
                      (a.dom.style.transform = 'translateZ(0)'),
                      (t = 'height 0s '.concat(i, ' ').concat(o));
                    break;
                  default:
                    break;
                }
                clearTimeout(a.timeout),
                  (a.timeout = setTimeout(function () {
                    a.dom &&
                      ((a.dom.style.transition = ''
                        .concat(c, ',')
                        .concat(t ? ''.concat(t, ',') : '')
                        .concat(l)),
                      (a.dom.style.transform = ''),
                      (a.dom.style.width = ''),
                      (a.dom.style.height = ''));
                  }));
              }),
              (a.getCurrentDrawerSome = function () {
                return !Object.keys(Bt).some(function (e) {
                  return Bt[e];
                });
              }),
              (a.getLevelDom = function (e) {
                var t = e.level,
                  n = e.getContainer;
                if (!Vt) {
                  var r = n && n(),
                    o = r ? r.parentNode : null;
                  if (((a.levelDom = []), 'all' === t)) {
                    var i = o ? Array.prototype.slice.call(o.children) : [];
                    i.forEach(function (e) {
                      'SCRIPT' !== e.nodeName &&
                        'STYLE' !== e.nodeName &&
                        'LINK' !== e.nodeName &&
                        e !== r &&
                        a.levelDom.push(e);
                    });
                  } else
                    t &&
                      Ht(t).forEach(function (e) {
                        document.querySelectorAll(e).forEach(function (e) {
                          a.levelDom.push(e);
                        });
                      });
                }
              }),
              (a.getHorizontalBoolAndPlacementName = function () {
                var e = a.props.placement,
                  t = 'left' === e || 'right' === e,
                  n = 'translate'.concat(t ? 'X' : 'Y');
                return { isHorizontal: t, placementName: n };
              }),
              (a.state = { _self: Object(Nt['a'])(a) }),
              a
            );
          }
          return (
            Object(q['a'])(
              n,
              [
                {
                  key: 'componentDidMount',
                  value: function () {
                    var e = this;
                    if (!Vt) {
                      var t = !1;
                      try {
                        window.addEventListener(
                          'test',
                          null,
                          Object.defineProperty({}, 'passive', {
                            get: function () {
                              return (t = !0), null;
                            },
                          }),
                        );
                      } catch (s) {}
                      this.passive = !!t && { passive: !1 };
                    }
                    var n,
                      a = this.props,
                      r = a.open,
                      o = a.getContainer,
                      i = a.showMask,
                      l = a.autoFocus,
                      c = o && o();
                    ((this.drawerId = 'drawer_id_'.concat(
                      Number(
                        (Date.now() + Math.random())
                          .toString()
                          .replace(
                            '.',
                            Math.round(9 * Math.random()).toString(),
                          ),
                      ).toString(16),
                    )),
                    this.getLevelDom(this.props),
                    r) &&
                      (c &&
                        c.parentNode === document.body &&
                        (Bt[this.drawerId] = r),
                      this.openLevelTransition(),
                      this.forceUpdate(function () {
                        l && e.domFocus();
                      }),
                      i &&
                        (null === (n = this.props.scrollLocker) ||
                          void 0 === n ||
                          n.lock()));
                  },
                },
                {
                  key: 'componentDidUpdate',
                  value: function (e) {
                    var t = this.props,
                      n = t.open,
                      a = t.getContainer,
                      r = t.scrollLocker,
                      o = t.showMask,
                      i = t.autoFocus,
                      l = a && a();
                    n !== e.open &&
                      (l &&
                        l.parentNode === document.body &&
                        (Bt[this.drawerId] = !!n),
                      this.openLevelTransition(),
                      n
                        ? (i && this.domFocus(),
                          o && (null === r || void 0 === r || r.lock()))
                        : null === r || void 0 === r || r.unLock());
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function () {
                    var e = this.props,
                      t = e.open,
                      n = e.scrollLocker;
                    delete Bt[this.drawerId],
                      t &&
                        (this.setLevelTransform(!1),
                        (document.body.style.touchAction = '')),
                      null === n || void 0 === n || n.unLock();
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var e,
                      t = this,
                      n = this.props,
                      a = n.className,
                      r = n.children,
                      o = n.style,
                      i = n.width,
                      l = n.height,
                      s = (n.defaultOpen, n.open),
                      u = n.prefixCls,
                      p = n.placement,
                      h =
                        (n.level,
                        n.levelMove,
                        n.ease,
                        n.duration,
                        n.getContainer,
                        n.handler),
                      v = (n.onChange, n.afterVisibleChange, n.showMask),
                      b = n.maskClosable,
                      g = n.maskStyle,
                      y = n.onClose,
                      O = n.onHandleClick,
                      j = n.keyboard,
                      x =
                        (n.getOpenCount, n.scrollLocker, n.contentWrapperStyle),
                      w = Object(it['a'])(n, Wt),
                      C = !!this.dom && s,
                      S = m()(
                        u,
                        ((e = {}),
                        Object(d['a'])(e, ''.concat(u, '-').concat(p), !0),
                        Object(d['a'])(e, ''.concat(u, '-open'), C),
                        Object(d['a'])(e, a || '', !!a),
                        Object(d['a'])(e, 'no-mask', !v),
                        e),
                      ),
                      k = this.getHorizontalBoolAndPlacementName(),
                      N = k.placementName,
                      z = 'left' === p || 'top' === p ? '-100%' : '100%',
                      H = C ? '' : ''.concat(N, '(').concat(z, ')'),
                      M =
                        h &&
                        c['cloneElement'](h, {
                          onClick: function (e) {
                            h.props.onClick && h.props.onClick(), O && O(e);
                          },
                          ref: function (e) {
                            t.handlerDom = e;
                          },
                        });
                    return c['createElement'](
                      'div',
                      Object(f['a'])(
                        {},
                        Object(E['a'])(w, [
                          'switchScrollingEffect',
                          'autoFocus',
                        ]),
                        {
                          tabIndex: -1,
                          className: S,
                          style: o,
                          ref: function (e) {
                            t.dom = e;
                          },
                          onKeyDown: C && j ? this.onKeyDown : void 0,
                          onTransitionEnd: this.onWrapperTransitionEnd,
                        },
                      ),
                      v &&
                        c['createElement']('div', {
                          className: ''.concat(u, '-mask'),
                          onClick: b ? y : void 0,
                          style: g,
                          ref: function (e) {
                            t.maskDom = e;
                          },
                        }),
                      c['createElement'](
                        'div',
                        {
                          className: ''.concat(u, '-content-wrapper'),
                          style: Object(T['a'])(
                            {
                              transform: H,
                              msTransform: H,
                              width: Rt(i) ? ''.concat(i, 'px') : i,
                              height: Rt(l) ? ''.concat(l, 'px') : l,
                            },
                            x,
                          ),
                          ref: function (e) {
                            t.contentWrapper = e;
                          },
                        },
                        c['createElement'](
                          'div',
                          {
                            className: ''.concat(u, '-content'),
                            ref: function (e) {
                              t.contentDom = e;
                            },
                          },
                          r,
                        ),
                        M,
                      ),
                    );
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function (e, t) {
                    var n = t.prevProps,
                      a = t._self,
                      r = { prevProps: e };
                    if (void 0 !== n) {
                      var o = e.placement,
                        i = e.level;
                      o !== n.placement && (a.contentDom = null),
                        i !== n.level && a.getLevelDom(e);
                    }
                    return r;
                  },
                },
              ],
            ),
            n
          );
        })(c['Component']),
        _t = Ut,
        Kt = [
          'defaultOpen',
          'getContainer',
          'wrapperClassName',
          'forceRender',
          'handler',
        ],
        Xt = ['visible', 'afterClose'],
        Yt = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.dom = void 0),
              (a.onHandleClick = function (e) {
                var t = a.props,
                  n = t.onHandleClick,
                  r = t.open;
                if ((n && n(e), 'undefined' === typeof r)) {
                  var o = a.state.open;
                  a.setState({ open: !o });
                }
              }),
              (a.onClose = function (e) {
                var t = a.props,
                  n = t.onClose,
                  r = t.open;
                n && n(e), 'undefined' === typeof r && a.setState({ open: !1 });
              });
            var r = 'undefined' !== typeof e.open ? e.open : !!e.defaultOpen;
            return (
              (a.state = { open: r }),
              'onMaskClick' in e &&
                console.warn(
                  '`onMaskClick` are removed, please use `onClose` instead.',
                ),
              a
            );
          }
          return (
            Object(q['a'])(
              n,
              [
                {
                  key: 'render',
                  value: function () {
                    var e = this,
                      t = this.props,
                      n = (t.defaultOpen, t.getContainer),
                      a = t.wrapperClassName,
                      r = t.forceRender,
                      o = t.handler,
                      i = Object(it['a'])(t, Kt),
                      l = this.state.open;
                    if (!n)
                      return c['createElement'](
                        'div',
                        {
                          className: a,
                          ref: function (t) {
                            e.dom = t;
                          },
                        },
                        c['createElement'](
                          _t,
                          Object(f['a'])({}, i, {
                            open: l,
                            handler: o,
                            getContainer: function () {
                              return e.dom;
                            },
                            onClose: this.onClose,
                            onHandleClick: this.onHandleClick,
                          }),
                        ),
                      );
                    var s = !!o || r;
                    return c['createElement'](
                      Tt,
                      {
                        visible: l,
                        forceRender: s,
                        getContainer: n,
                        wrapperClassName: a,
                      },
                      function (t) {
                        var n = t.visible,
                          a = t.afterClose,
                          r = Object(it['a'])(t, Xt);
                        return c['createElement'](
                          _t,
                          Object(f['a'])({}, i, r, {
                            open: void 0 !== n ? n : l,
                            afterVisibleChange:
                              void 0 !== a ? a : i.afterVisibleChange,
                            handler: o,
                            onClose: e.onClose,
                            onHandleClick: e.onHandleClick,
                          }),
                        );
                      },
                    );
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function (e, t) {
                    var n = t.prevProps,
                      a = { prevProps: e };
                    return (
                      'undefined' !== typeof n &&
                        e.open !== n.open &&
                        (a.open = e.open),
                      a
                    );
                  },
                },
              ],
            ),
            n
          );
        })(c['Component']);
      Yt.defaultProps = {
        prefixCls: 'drawer',
        placement: 'left',
        getContainer: 'body',
        defaultOpen: !1,
        level: 'all',
        duration: '.3s',
        ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
        onChange: function () {},
        afterVisibleChange: function () {},
        handler: c['createElement'](
          'div',
          { className: 'drawer-handle' },
          c['createElement']('i', { className: 'drawer-handle-icon' }),
        ),
        showMask: !0,
        maskClosable: !0,
        maskStyle: {},
        wrapperClassName: '',
        className: '',
        keyboard: !0,
        forceRender: !1,
        autoFocus: !0,
      };
      var qt = Yt,
        Gt = qt,
        Qt = n('4i/N');
      function Zt() {
        var e = c['useReducer'](function (e) {
            return e + 1;
          }, 0),
          t = Object(p['a'])(e, 2),
          n = t[1];
        return n;
      }
      var Jt = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        $t = c['createContext'](null),
        en =
          (Object(Xe['a'])('top', 'right', 'bottom', 'left'),
          Object(Xe['a'])('default', 'large'),
          { distance: 180 }),
        tn = c['forwardRef'](function (e, t) {
          var n = e.width,
            a = e.height,
            r = e.size,
            o = void 0 === r ? 'default' : r,
            i = e.closable,
            l = void 0 === i || i,
            s = e.placement,
            u = void 0 === s ? 'right' : s,
            h = e.maskClosable,
            v = void 0 === h || h,
            b = e.mask,
            g = void 0 === b || b,
            y = e.level,
            O = void 0 === y ? null : y,
            j = e.keyboard,
            x = void 0 === j || j,
            w = e.push,
            C = void 0 === w ? en : w,
            S = e.closeIcon,
            k = void 0 === S ? c['createElement'](Qt['a'], null) : S,
            E = e.bodyStyle,
            T = e.drawerStyle,
            N = e.prefixCls,
            z = e.className,
            H = e.direction,
            M = e.visible,
            D = e.children,
            P = e.zIndex,
            L = e.destroyOnClose,
            I = e.style,
            A = e.title,
            R = e.headerStyle,
            V = e.onClose,
            F = e.footer,
            W = e.footerStyle,
            B = e.extra,
            U = Jt(e, [
              'width',
              'height',
              'size',
              'closable',
              'placement',
              'maskClosable',
              'mask',
              'level',
              'keyboard',
              'push',
              'closeIcon',
              'bodyStyle',
              'drawerStyle',
              'prefixCls',
              'className',
              'direction',
              'visible',
              'children',
              'zIndex',
              'destroyOnClose',
              'style',
              'title',
              'headerStyle',
              'onClose',
              'footer',
              'footerStyle',
              'extra',
            ]),
            _ = Zt(),
            K = c['useState'](!1),
            X = Object(p['a'])(K, 2),
            Y = X[0],
            q = X[1],
            G = c['useContext']($t),
            Q = c['useRef'](!1);
          c['useEffect'](function () {
            return (
              M && G && G.push(),
              function () {
                G && G.pull();
              }
            );
          }, []),
            c['useEffect'](
              function () {
                G && (M ? G.push() : G.pull());
              },
              [M],
            );
          var Z = c['useMemo'](
            function () {
              return {
                push: function () {
                  C && q(!0);
                },
                pull: function () {
                  C && q(!1);
                },
              };
            },
            [C],
          );
          c['useImperativeHandle'](
            t,
            function () {
              return Z;
            },
            [Z],
          );
          var J = L && !M,
            $ = function () {
              J && (M || ((Q.current = !0), _()));
            },
            ee = function () {
              if (!M && !g) return {};
              var e = {};
              if ('left' === u || 'right' === u) {
                var t = 'large' === o ? 736 : 378;
                e.width = 'undefined' === typeof n ? t : n;
              } else {
                var r = 'large' === o ? 736 : 378;
                e.height = 'undefined' === typeof a ? r : a;
              }
              return e;
            },
            te = function () {
              var e = function (e) {
                  var t;
                  return (
                    (t =
                      'boolean' === typeof C
                        ? C
                          ? en.distance
                          : 0
                        : C.distance),
                    (t = parseFloat(String(t || 0))),
                    'left' === e || 'right' === e
                      ? 'translateX('.concat('left' === e ? t : -t, 'px)')
                      : 'top' === e || 'bottom' === e
                      ? 'translateY('.concat('top' === e ? t : -t, 'px)')
                      : void 0
                  );
                },
                t = g ? {} : ee();
              return Object(f['a'])(
                Object(f['a'])({ zIndex: P, transform: Y ? e(u) : void 0 }, t),
                I,
              );
            },
            ne =
              l &&
              c['createElement'](
                'button',
                {
                  type: 'button',
                  onClick: V,
                  'aria-label': 'Close',
                  className: ''.concat(N, '-close'),
                },
                k,
              );
          function ae() {
            return A || l
              ? c['createElement'](
                  'div',
                  {
                    className: m()(
                      ''.concat(N, '-header'),
                      Object(d['a'])(
                        {},
                        ''.concat(N, '-header-close-only'),
                        l && !A && !B,
                      ),
                    ),
                    style: R,
                  },
                  c['createElement'](
                    'div',
                    { className: ''.concat(N, '-header-title') },
                    ne,
                    A &&
                      c['createElement'](
                        'div',
                        { className: ''.concat(N, '-title') },
                        A,
                      ),
                  ),
                  B &&
                    c['createElement'](
                      'div',
                      { className: ''.concat(N, '-extra') },
                      B,
                    ),
                )
              : null;
          }
          function re() {
            if (!F) return null;
            var e = ''.concat(N, '-footer');
            return c['createElement']('div', { className: e, style: W }, F);
          }
          var oe = function () {
              if (Q.current && !M) return null;
              Q.current = !1;
              var e = {};
              return (
                J && ((e.opacity = 0), (e.transition = 'opacity .3s')),
                c['createElement'](
                  'div',
                  {
                    className: ''.concat(N, '-wrapper-body'),
                    style: Object(f['a'])(Object(f['a'])({}, e), T),
                    onTransitionEnd: $,
                  },
                  ae(),
                  c['createElement'](
                    'div',
                    { className: ''.concat(N, '-body'), style: E },
                    D,
                  ),
                  re(),
                )
              );
            },
            ie = m()(
              Object(d['a'])(
                { 'no-mask': !g },
                ''.concat(N, '-rtl'),
                'rtl' === H,
              ),
              z,
            ),
            le = g ? ee() : {};
          return c['createElement'](
            $t.Provider,
            { value: Z },
            c['createElement'](
              Gt,
              Object(f['a'])(
                { handler: !1 },
                Object(f['a'])(
                  {
                    placement: u,
                    prefixCls: N,
                    maskClosable: v,
                    level: O,
                    keyboard: x,
                    children: D,
                    onClose: V,
                  },
                  U,
                ),
                le,
                { open: M, showMask: g, style: te(), className: ie },
              ),
              oe(),
            ),
          );
        });
      tn.displayName = 'Drawer';
      var nn = c['forwardRef'](function (e, t) {
        var n = e.prefixCls,
          a = e.getContainer,
          r = c['useContext'](v['b']),
          o = r.getPopupContainer,
          i = r.getPrefixCls,
          l = r.direction,
          s = i('drawer', n),
          u =
            void 0 === a && o
              ? function () {
                  return o(document.body);
                }
              : a;
        return c['createElement'](
          tn,
          Object(f['a'])({}, e, {
            ref: t,
            prefixCls: s,
            getContainer: u,
            direction: l,
          }),
        );
      });
      nn.displayName = 'DrawerWrapper';
      var an = nn,
        rn = (n('czTT'), n('6cGi')),
        on = c['forwardRef'](function (e, t) {
          var n,
            a = e.prefixCls,
            r = void 0 === a ? 'rc-switch' : a,
            o = e.className,
            i = e.checked,
            l = e.defaultChecked,
            s = e.disabled,
            u = e.loadingIcon,
            f = e.checkedChildren,
            h = e.unCheckedChildren,
            v = e.onClick,
            b = e.onChange,
            g = e.onKeyDown,
            y = Object(it['a'])(e, [
              'prefixCls',
              'className',
              'checked',
              'defaultChecked',
              'disabled',
              'loadingIcon',
              'checkedChildren',
              'unCheckedChildren',
              'onClick',
              'onChange',
              'onKeyDown',
            ]),
            O = Object(rn['a'])(!1, { value: i, defaultValue: l }),
            j = Object(p['a'])(O, 2),
            x = j[0],
            w = j[1];
          function C(e, t) {
            var n = x;
            return (
              s || ((n = e), w(n), null === b || void 0 === b || b(n, t)), n
            );
          }
          function S(e) {
            e.which === zt['a'].LEFT
              ? C(!1, e)
              : e.which === zt['a'].RIGHT && C(!0, e),
              null === g || void 0 === g || g(e);
          }
          function k(e) {
            var t = C(!x, e);
            null === v || void 0 === v || v(t, e);
          }
          var E = m()(
            r,
            o,
            ((n = {}),
            Object(d['a'])(n, ''.concat(r, '-checked'), x),
            Object(d['a'])(n, ''.concat(r, '-disabled'), s),
            n),
          );
          return c['createElement'](
            'button',
            Object.assign({}, y, {
              type: 'button',
              role: 'switch',
              'aria-checked': x,
              disabled: s,
              className: E,
              ref: t,
              onKeyDown: S,
              onClick: k,
            }),
            u,
            c['createElement'](
              'span',
              { className: ''.concat(r, '-inner') },
              x ? f : h,
            ),
          );
        });
      on.displayName = 'Switch';
      var ln = on,
        cn = n('ye1Q'),
        sn = n('g0mS'),
        un = n('3Nzz'),
        dn = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        pn = c['forwardRef'](function (e, t) {
          var n,
            a = e.prefixCls,
            r = e.size,
            o = e.loading,
            i = e.className,
            l = void 0 === i ? '' : i,
            s = e.disabled,
            u = dn(e, [
              'prefixCls',
              'size',
              'loading',
              'className',
              'disabled',
            ]);
          Object(se['a'])(
            'checked' in u || !('value' in u),
            'Switch',
            '`value` is not a valid prop, do you mean `checked`?',
          );
          var p = c['useContext'](v['b']),
            h = p.getPrefixCls,
            b = p.direction,
            g = c['useContext'](un['b']),
            y = h('switch', a),
            O = c['createElement'](
              'div',
              { className: ''.concat(y, '-handle') },
              o &&
                c['createElement'](cn['a'], {
                  className: ''.concat(y, '-loading-icon'),
                }),
            ),
            j = m()(
              ((n = {}),
              Object(d['a'])(n, ''.concat(y, '-small'), 'small' === (r || g)),
              Object(d['a'])(n, ''.concat(y, '-loading'), o),
              Object(d['a'])(n, ''.concat(y, '-rtl'), 'rtl' === b),
              n),
              l,
            );
          return c['createElement'](
            sn['a'],
            { insertExtraNode: !0 },
            c['createElement'](
              ln,
              Object(f['a'])({}, u, {
                prefixCls: y,
                className: j,
                disabled: s || o,
                ref: t,
                loadingIcon: O,
              }),
            ),
          );
        });
      (pn.__ANT_SWITCH = !0), (pn.displayName = 'Switch');
      var fn = pn;
      n('OPEp');
      function hn(e) {
        var t = e.className,
          n = e.direction,
          a = e.index,
          r = e.marginDirection,
          o = e.children,
          i = e.split,
          l = e.wrap,
          s = c['useContext'](bn),
          u = s.horizontalSize,
          p = s.verticalSize,
          h = s.latestIndex,
          m = s.supportFlexGap,
          v = {};
        return (
          m ||
            ('vertical' === n
              ? a < h && (v = { marginBottom: u / (i ? 2 : 1) })
              : (v = Object(f['a'])(
                  Object(f['a'])(
                    {},
                    a < h && Object(d['a'])({}, r, u / (i ? 2 : 1)),
                  ),
                  l && { paddingBottom: p },
                ))),
          null === o || void 0 === o
            ? null
            : c['createElement'](
                c['Fragment'],
                null,
                c['createElement']('div', { className: t, style: v }, o),
                a < h &&
                  i &&
                  c['createElement'](
                    'span',
                    { className: ''.concat(t, '-split'), style: v },
                    i,
                  ),
              )
        );
      }
      var mn = n('P80f'),
        vn = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        bn = c['createContext']({
          latestIndex: 0,
          horizontalSize: 0,
          verticalSize: 0,
          supportFlexGap: !1,
        }),
        gn = { small: 8, middle: 16, large: 24 };
      function yn(e) {
        return 'string' === typeof e ? gn[e] : e || 0;
      }
      var On = function (e) {
          var t,
            n = c['useContext'](v['b']),
            a = n.getPrefixCls,
            r = n.space,
            o = n.direction,
            i = e.size,
            l =
              void 0 === i
                ? (null === r || void 0 === r ? void 0 : r.size) || 'small'
                : i,
            s = e.align,
            u = e.className,
            h = e.children,
            b = e.direction,
            g = void 0 === b ? 'horizontal' : b,
            y = e.prefixCls,
            O = e.split,
            j = e.style,
            x = e.wrap,
            w = void 0 !== x && x,
            C = vn(e, [
              'size',
              'align',
              'className',
              'children',
              'direction',
              'prefixCls',
              'split',
              'style',
              'wrap',
            ]),
            S = Object(mn['a'])(),
            k = c['useMemo'](
              function () {
                return (Array.isArray(l) ? l : [l, l]).map(function (e) {
                  return yn(e);
                });
              },
              [l],
            ),
            E = Object(p['a'])(k, 2),
            T = E[0],
            N = E[1],
            z = Object(oe['a'])(h, { keepEmpty: !0 }),
            H = void 0 === s && 'horizontal' === g ? 'center' : s,
            M = a('space', y),
            D = m()(
              M,
              ''.concat(M, '-').concat(g),
              ((t = {}),
              Object(d['a'])(t, ''.concat(M, '-rtl'), 'rtl' === o),
              Object(d['a'])(t, ''.concat(M, '-align-').concat(H), H),
              t),
              u,
            ),
            P = ''.concat(M, '-item'),
            L = 'rtl' === o ? 'marginLeft' : 'marginRight',
            I = 0,
            A = z.map(function (e, t) {
              return (
                null !== e && void 0 !== e && (I = t),
                c['createElement'](
                  hn,
                  {
                    className: P,
                    key: ''.concat(P, '-').concat(t),
                    direction: g,
                    index: t,
                    marginDirection: L,
                    split: O,
                    wrap: w,
                  },
                  e,
                )
              );
            }),
            R = c['useMemo'](
              function () {
                return {
                  horizontalSize: T,
                  verticalSize: N,
                  latestIndex: I,
                  supportFlexGap: S,
                };
              },
              [T, N, I, S],
            );
          if (0 === z.length) return null;
          var V = {};
          return (
            w && ((V.flexWrap = 'wrap'), S || (V.marginBottom = -N)),
            S && ((V.columnGap = T), (V.rowGap = N)),
            c['createElement'](
              'div',
              Object(f['a'])(
                {
                  className: D,
                  style: Object(f['a'])(Object(f['a'])({}, V), j),
                },
                C,
              ),
              c['createElement'](bn.Provider, { value: R }, A),
            )
          );
        },
        jn = On,
        xn = (n('7Kak'), n('9yH6')),
        wn = n('bRQS');
      n('WgDY');
      function Cn() {
        var e = X['a'].useContainer(),
          t = ['pink', 'gray', '#0fb748', '#4e6ef2'],
          n = (t) => {
            e.changeColor({ type: 'primaryColor', color: t });
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'Theme color' }),
            Object(Ee['jsx'])(ze['a'], {
              style: { marginBottom: 30 },
              children: t.map((t) =>
                Object(Ee['jsx'])(
                  He['a'],
                  {
                    onClick: () => n(t),
                    style: {
                      marginRight: 10,
                      backgroundColor: t,
                      width: 20,
                      height: 20,
                      textAlign: 'center',
                      color: '#fff',
                    },
                    children:
                      e.primaryColor === t
                        ? Object(Ee['jsx'])(wn['a'], {})
                        : null,
                  },
                  t,
                ),
              ),
            }),
          ],
        });
      }
      function Sn() {
        var e = X['a'].useContainer(),
          t = ['#024349', '#222', '#563905', '#777'],
          n = (t) => {
            e.changeColor({ type: 'textColor', color: t });
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'Text color' }),
            Object(Ee['jsx'])(ze['a'], {
              style: { marginBottom: 30 },
              children: t.map((t) =>
                Object(Ee['jsx'])(
                  He['a'],
                  {
                    onClick: () => n(t),
                    style: {
                      marginRight: 10,
                      backgroundColor: t,
                      width: 20,
                      height: 20,
                      textAlign: 'center',
                      color: '#fff',
                    },
                    children:
                      e.textColor === t ? Object(Ee['jsx'])(wn['a'], {}) : null,
                  },
                  t,
                ),
              ),
            }),
          ],
        });
      }
      function kn() {
        var e = X['a'].useContainer(),
          t = [
            { layout: 'Sider', name: 'sider' },
            { layout: 'Top', name: 'top' },
            { layout: 'ContentSider', name: 'content-sider' },
          ],
          n = (t) => {
            e.changeLayout(t);
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'layout' }),
            Object(Ee['jsx'])(ze['a'], {
              className: 'set-layout',
              style: { marginBottom: 30 },
              children: t.map((t) =>
                Object(Ee['jsx'])(
                  He['a'],
                  {
                    children: Object(Ee['jsx'])(
                      'div',
                      {
                        onClick: () => n(t.layout),
                        className: t.name,
                        children:
                          e.layouts === t.layout
                            ? Object(Ee['jsx'])(wn['a'], {
                                style: {
                                  position: 'absolute',
                                  bottom: 10,
                                  right: 10,
                                },
                              })
                            : null,
                      },
                      t.name,
                    ),
                  },
                  t.name,
                ),
              ),
            }),
          ],
        });
      }
      function En() {
        var e = X['a'].useContainer(),
          t = ['dark', 'light'],
          n = (t) => {
            e.changeMenuTheme(t);
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'SetMenuTheme' }),
            Object(Ee['jsx'])(ze['a'], {
              className: 'set-menu-theme',
              style: { marginBottom: 30 },
              children: t.map((t) =>
                Object(Ee['jsx'])(
                  He['a'],
                  {
                    children: Object(Ee['jsx'])('div', {
                      onClick: () => n(t),
                      className: t,
                      children:
                        e.menuTheme === t
                          ? Object(Ee['jsx'])(wn['a'], {
                              style: {
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                              },
                            })
                          : null,
                    }),
                  },
                  t,
                ),
              ),
            }),
          ],
        });
      }
      function Tn() {
        var e = X['a'].useContainer(),
          t = Object(c['useState'])(e.mode),
          n = Object(o['a'])(t, 2),
          a = n[0],
          r = n[1],
          i = (t) => {
            r(t.target.value), e.changeMode(t.target.value);
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'mode' }),
            Object(Ee['jsx'])(xn['a'].Group, {
              style: { marginBottom: 30 },
              value: a,
              buttonStyle: 'solid',
              onChange: i,
              children: Object(Ee['jsxs'])(jn, {
                size: 24,
                children: [
                  Object(Ee['jsx'])(xn['a'].Button, {
                    value: 'inline',
                    children: '\u5782\u76f4',
                  }),
                  Object(Ee['jsx'])(xn['a'].Button, {
                    value: 'vertical',
                    children: '\u5185\u5d4c',
                  }),
                ],
              }),
            }),
          ],
        });
      }
      function Nn() {
        var e = X['a'].useContainer(),
          t = (t) => {
            e.changFixedHeaderStyle(t);
          },
          n = (t) => {
            e.changFixedSiderStyle(t);
          };
        return Object(Ee['jsxs'])(Ee['Fragment'], {
          children: [
            Object(Ee['jsx'])('h4', { children: 'SetMenuTheme' }),
            Object(Ee['jsxs'])('ul', {
              style: { listStyle: 'none', padding: 0 },
              children: [
                Object(Ee['jsxs'])('li', {
                  style: { marginBottom: 15 },
                  children: [
                    '\u9876\u90e8\u83dc\u5355\u56fa\u5b9a ',
                    Object(Ee['jsx'])(fn, { defaultChecked: !0, onChange: t }),
                  ],
                }),
                Object(Ee['jsxs'])('li', {
                  children: [
                    '\u4fa7\u8fb9\u680f\u56fa\u5b9a ',
                    Object(Ee['jsx'])(fn, { defaultChecked: !0, onChange: n }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var zn = (e) => {
          var t = e.visible,
            n = e.onClose;
          return Object(Ee['jsx'])('div', {
            className: 'set-btn',
            children: Object(Ee['jsxs'])(an, {
              title: '\u4e3b\u9898\u8bbe\u7f6e',
              placement: 'right',
              width: '350px',
              onClose: n,
              visible: t,
              children: [
                Object(Ee['jsx'])(Cn, {}),
                Object(Ee['jsx'])(Sn, {}),
                Object(Ee['jsx'])(kn, {}),
                Object(Ee['jsx'])(En, {}),
                Object(Ee['jsx'])(Tn, {}),
                Object(Ee['jsx'])(Nn, {}),
              ],
            }),
          });
        },
        Hn = zn,
        Mn = (e) => {
          var t = e.userInfo,
            n = X['a'].useContainer(),
            a = Object(c['useState'])(!1),
            r = Object(o['a'])(a, 2),
            i = r[0],
            l = r[1],
            s = (e) => {
              switch (e.key) {
                case 'center':
                  Me['e'].push('/user');
                  break;
                case 'settings':
                  l(!0);
                  break;
                case 'logout':
                  localStorage.clear(),
                    sessionStorage.clear(),
                    Me['e'].push('/login');
                  break;
              }
            },
            u = () => {
              l(!1);
            },
            d = () =>
              Object(Ee['jsxs'])(be, {
                style: { width: 150 },
                onClick: s,
                children: [
                  Object(Ee['jsxs'])(
                    be.Item,
                    {
                      children: [
                        Object(Ee['jsx'])(xe, {}),
                        ' \u4e2a\u4eba\u4e2d\u5fc3',
                      ],
                    },
                    'center',
                  ),
                  Object(Ee['jsxs'])(
                    be.Item,
                    {
                      children: [
                        Object(Ee['jsx'])(et, {}),
                        ' \u4e3b\u9898\u8bbe\u7f6e',
                      ],
                    },
                    'settings',
                  ),
                  Object(Ee['jsx'])(be.Divider, {}),
                  Object(Ee['jsxs'])(
                    be.Item,
                    {
                      children: [
                        Object(Ee['jsx'])(ot, {}),
                        ' \u9000\u51fa\u767b\u5f55',
                      ],
                    },
                    'logout',
                  ),
                ],
              });
          return Object(Ee['jsxs'])('div', {
            style: { textAlign: 'right', marginRight: 30 },
            children: [
              Object(Ee['jsx'])(Ge, {
                placement: 'bottomRight',
                overlay: d(),
                children: Object(Ee['jsxs'])('a', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                  },
                  children: [
                    Object(Ee['jsxs'])('span', {
                      style:
                        'light' === n.menuTheme
                          ? { color: '#111', marginRight: 10 }
                          : { color: '#fff', marginRight: 10 },
                      children: ['Hi\uff0c', t.nickname],
                    }),
                    Object(Ee['jsx'])(Qe['a'], {
                      src: 'https://joeschmoe.io/api/v1/random',
                    }),
                  ],
                }),
              }),
              Object(Ee['jsx'])(Hn, { visible: i, onClose: u }),
            ],
          });
        },
        Dn = Mn,
        Pn = (n('IzEo'), n('bx4M')),
        Ln = (n('Mwp2'), n('VXEj')),
        In = (n('/qDX'), n('OnYD'), n('c+Xe')),
        An = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        Rn = function (e, t) {
          var n = e.prefixCls,
            a = e.component,
            r = void 0 === a ? 'article' : a,
            o = e.className,
            i = e['aria-label'],
            l = e.setContentRef,
            s = e.children,
            u = An(e, [
              'prefixCls',
              'component',
              'className',
              'aria-label',
              'setContentRef',
              'children',
            ]),
            p = t;
          return (
            l &&
              (Object(se['a'])(
                !1,
                'Typography',
                '`setContentRef` is deprecated. Please use `ref` instead.',
              ),
              (p = Object(In['a'])(t, l))),
            c['createElement'](v['a'], null, function (e) {
              var t = e.getPrefixCls,
                a = e.direction,
                l = r,
                h = t('typography', n),
                v = m()(
                  h,
                  Object(d['a'])({}, ''.concat(h, '-rtl'), 'rtl' === a),
                  o,
                );
              return c['createElement'](
                l,
                Object(f['a'])({ className: v, 'aria-label': i, ref: p }, u),
                s,
              );
            })
          );
        },
        Vn = c['forwardRef'](Rn);
      Vn.displayName = 'Typography';
      var Fn = Vn,
        Wn = Fn,
        Bn = n('+QRC'),
        Un = n.n(Bn),
        _n = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z',
                },
              },
            ],
          },
          name: 'edit',
          theme: 'outlined',
        },
        Kn = _n,
        Xn = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Kn }),
          );
        };
      Xn.displayName = 'EditOutlined';
      var Yn = c['forwardRef'](Xn),
        qn = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z',
                },
              },
            ],
          },
          name: 'copy',
          theme: 'outlined',
        },
        Gn = qn,
        Qn = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Gn }),
          );
        };
      Qn.displayName = 'CopyOutlined';
      var Zn = c['forwardRef'](Qn),
        Jn = n('t23M'),
        $n = n('wEI+'),
        ea = n('YMnH'),
        ta = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        na = {
          border: 0,
          background: 'transparent',
          padding: 0,
          lineHeight: 'inherit',
          display: 'inline-block',
        },
        aa = c['forwardRef'](function (e, t) {
          var n = function (e) {
              var t = e.keyCode;
              t === zt['a'].ENTER && e.preventDefault();
            },
            a = function (t) {
              var n = t.keyCode,
                a = e.onClick;
              n === zt['a'].ENTER && a && a();
            },
            r = e.style,
            o = e.noStyle,
            i = e.disabled,
            l = ta(e, ['style', 'noStyle', 'disabled']),
            s = {};
          return (
            o || (s = Object(f['a'])({}, na)),
            i && (s.pointerEvents = 'none'),
            (s = Object(f['a'])(Object(f['a'])({}, s), r)),
            c['createElement'](
              'div',
              Object(f['a'])({ role: 'button', tabIndex: 0, ref: t }, l, {
                onKeyDown: n,
                onKeyUp: a,
                style: s,
              }),
            )
          );
        }),
        ra = aa,
        oa = n('oHiP'),
        ia = n('tl68'),
        la = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z',
                },
              },
            ],
          },
          name: 'enter',
          theme: 'outlined',
        },
        ca = la,
        sa = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: ca }),
          );
        };
      sa.displayName = 'EnterOutlined';
      var ua,
        da,
        pa = c['forwardRef'](sa),
        fa =
          '\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n',
        ha = [
          'letter-spacing',
          'line-height',
          'padding-top',
          'padding-bottom',
          'font-family',
          'font-weight',
          'font-size',
          'font-variant',
          'text-rendering',
          'text-transform',
          'width',
          'text-indent',
          'padding-left',
          'padding-right',
          'border-width',
          'box-sizing',
          'word-break',
        ],
        ma = {};
      function va(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n =
            e.getAttribute('id') ||
            e.getAttribute('data-reactid') ||
            e.getAttribute('name');
        if (t && ma[n]) return ma[n];
        var a = window.getComputedStyle(e),
          r =
            a.getPropertyValue('box-sizing') ||
            a.getPropertyValue('-moz-box-sizing') ||
            a.getPropertyValue('-webkit-box-sizing'),
          o =
            parseFloat(a.getPropertyValue('padding-bottom')) +
            parseFloat(a.getPropertyValue('padding-top')),
          i =
            parseFloat(a.getPropertyValue('border-bottom-width')) +
            parseFloat(a.getPropertyValue('border-top-width')),
          l = ha
            .map(function (e) {
              return ''.concat(e, ':').concat(a.getPropertyValue(e));
            })
            .join(';'),
          c = { sizingStyle: l, paddingSize: o, borderSize: i, boxSizing: r };
        return t && n && (ma[n] = c), c;
      }
      function ba(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : null,
          a =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : null;
        ua ||
          ((ua = document.createElement('textarea')),
          ua.setAttribute('tab-index', '-1'),
          ua.setAttribute('aria-hidden', 'true'),
          document.body.appendChild(ua)),
          e.getAttribute('wrap')
            ? ua.setAttribute('wrap', e.getAttribute('wrap'))
            : ua.removeAttribute('wrap');
        var r = va(e, t),
          o = r.paddingSize,
          i = r.borderSize,
          l = r.boxSizing,
          c = r.sizingStyle;
        ua.setAttribute('style', ''.concat(c, ';').concat(fa)),
          (ua.value = e.value || e.placeholder || '');
        var s,
          u = Number.MIN_SAFE_INTEGER,
          d = Number.MAX_SAFE_INTEGER,
          p = ua.scrollHeight;
        if (
          ('border-box' === l ? (p += i) : 'content-box' === l && (p -= o),
          null !== n || null !== a)
        ) {
          ua.value = ' ';
          var f = ua.scrollHeight - o;
          null !== n &&
            ((u = f * n),
            'border-box' === l && (u = u + o + i),
            (p = Math.max(u, p))),
            null !== a &&
              ((d = f * a),
              'border-box' === l && (d = d + o + i),
              (s = p > d ? '' : 'hidden'),
              (p = Math.min(d, p)));
        }
        return {
          height: p,
          minHeight: u,
          maxHeight: d,
          overflowY: s,
          resize: 'none',
        };
      }
      (function (e) {
        (e[(e['NONE'] = 0)] = 'NONE'),
          (e[(e['RESIZING'] = 1)] = 'RESIZING'),
          (e[(e['RESIZED'] = 2)] = 'RESIZED');
      })(da || (da = {}));
      var ga = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            return (
              Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.nextFrameActionId = void 0),
              (a.resizeFrameId = void 0),
              (a.textArea = void 0),
              (a.saveTextArea = function (e) {
                a.textArea = e;
              }),
              (a.handleResize = function (e) {
                var t = a.state.resizeStatus,
                  n = a.props,
                  r = n.autoSize,
                  o = n.onResize;
                t === da.NONE &&
                  ('function' === typeof o && o(e), r && a.resizeOnNextFrame());
              }),
              (a.resizeOnNextFrame = function () {
                cancelAnimationFrame(a.nextFrameActionId),
                  (a.nextFrameActionId = requestAnimationFrame(
                    a.resizeTextarea,
                  ));
              }),
              (a.resizeTextarea = function () {
                var e = a.props.autoSize;
                if (e && a.textArea) {
                  var t = e.minRows,
                    n = e.maxRows,
                    r = ba(a.textArea, !1, t, n);
                  a.setState(
                    { textareaStyles: r, resizeStatus: da.RESIZING },
                    function () {
                      cancelAnimationFrame(a.resizeFrameId),
                        (a.resizeFrameId = requestAnimationFrame(function () {
                          a.setState({ resizeStatus: da.RESIZED }, function () {
                            a.resizeFrameId = requestAnimationFrame(
                              function () {
                                a.setState({ resizeStatus: da.NONE }),
                                  a.fixFirefoxAutoScroll();
                              },
                            );
                          });
                        }));
                    },
                  );
                }
              }),
              (a.renderTextArea = function () {
                var e = a.props,
                  t = e.prefixCls,
                  n = void 0 === t ? 'rc-textarea' : t,
                  r = e.autoSize,
                  o = e.onResize,
                  i = e.className,
                  l = e.disabled,
                  s = a.state,
                  u = s.textareaStyles,
                  p = s.resizeStatus,
                  h = Object(E['a'])(a.props, [
                    'prefixCls',
                    'onPressEnter',
                    'autoSize',
                    'defaultValue',
                    'onResize',
                  ]),
                  v = m()(
                    n,
                    i,
                    Object(d['a'])({}, ''.concat(n, '-disabled'), l),
                  );
                'value' in h && (h.value = h.value || '');
                var b = Object(T['a'])(
                  Object(T['a'])(Object(T['a'])({}, a.props.style), u),
                  p === da.RESIZING
                    ? { overflowX: 'hidden', overflowY: 'hidden' }
                    : null,
                );
                return c['createElement'](
                  Jn['a'],
                  { onResize: a.handleResize, disabled: !(r || o) },
                  c['createElement'](
                    'textarea',
                    Object(f['a'])({}, h, {
                      className: v,
                      style: b,
                      ref: a.saveTextArea,
                    }),
                  ),
                );
              }),
              (a.state = { textareaStyles: {}, resizeStatus: da.NONE }),
              a
            );
          }
          return (
            Object(q['a'])(n, [
              {
                key: 'componentDidMount',
                value: function () {
                  this.resizeTextarea();
                },
              },
              {
                key: 'componentDidUpdate',
                value: function (e) {
                  e.value !== this.props.value && this.resizeTextarea();
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  cancelAnimationFrame(this.nextFrameActionId),
                    cancelAnimationFrame(this.resizeFrameId);
                },
              },
              {
                key: 'fixFirefoxAutoScroll',
                value: function () {
                  try {
                    if (document.activeElement === this.textArea) {
                      var e = this.textArea.selectionStart,
                        t = this.textArea.selectionEnd;
                      this.textArea.setSelectionRange(e, t);
                    }
                  } catch (n) {}
                },
              },
              {
                key: 'render',
                value: function () {
                  return this.renderTextArea();
                },
              },
            ]),
            n
          );
        })(c['Component']),
        ya = ga,
        Oa = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n(e) {
            var a;
            Object(Y['a'])(this, n),
              (a = t.call(this, e)),
              (a.resizableTextArea = void 0),
              (a.focus = function () {
                a.resizableTextArea.textArea.focus();
              }),
              (a.saveTextArea = function (e) {
                a.resizableTextArea = e;
              }),
              (a.handleChange = function (e) {
                var t = a.props.onChange;
                a.setValue(e.target.value, function () {
                  a.resizableTextArea.resizeTextarea();
                }),
                  t && t(e);
              }),
              (a.handleKeyDown = function (e) {
                var t = a.props,
                  n = t.onPressEnter,
                  r = t.onKeyDown;
                13 === e.keyCode && n && n(e), r && r(e);
              });
            var r =
              'undefined' === typeof e.value || null === e.value
                ? e.defaultValue
                : e.value;
            return (a.state = { value: r }), a;
          }
          return (
            Object(q['a'])(
              n,
              [
                {
                  key: 'setValue',
                  value: function (e, t) {
                    'value' in this.props || this.setState({ value: e }, t);
                  },
                },
                {
                  key: 'blur',
                  value: function () {
                    this.resizableTextArea.textArea.blur();
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    return c['createElement'](
                      ya,
                      Object(f['a'])({}, this.props, {
                        value: this.state.value,
                        onKeyDown: this.handleKeyDown,
                        onChange: this.handleChange,
                        ref: this.saveTextArea,
                      }),
                    );
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function (e) {
                    return 'value' in e ? { value: e.value } : null;
                  },
                },
              ],
            ),
            n
          );
        })(c['Component']),
        ja = Oa,
        xa = n('jN4g');
      function wa(e, t, n, a, r) {
        var o;
        return m()(
          e,
          ((o = {}),
          Object(d['a'])(o, ''.concat(e, '-sm'), 'small' === n),
          Object(d['a'])(o, ''.concat(e, '-lg'), 'large' === n),
          Object(d['a'])(o, ''.concat(e, '-disabled'), a),
          Object(d['a'])(o, ''.concat(e, '-rtl'), 'rtl' === r),
          Object(d['a'])(o, ''.concat(e, '-borderless'), !t),
          o),
        );
      }
      function Ca(e) {
        return !!(e.prefix || e.suffix || e.allowClear);
      }
      var Sa = Object(Xe['a'])('text', 'input');
      function ka(e) {
        return !(!e.addonBefore && !e.addonAfter);
      }
      var Ea = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n() {
            var e;
            return (
              Object(Y['a'])(this, n),
              (e = t.apply(this, arguments)),
              (e.containerRef = c['createRef']()),
              (e.onInputMouseUp = function (t) {
                var n;
                if (
                  null === (n = e.containerRef.current) || void 0 === n
                    ? void 0
                    : n.contains(t.target)
                ) {
                  var a = e.props.triggerFocus;
                  null === a || void 0 === a || a();
                }
              }),
              e
            );
          }
          return (
            Object(q['a'])(n, [
              {
                key: 'renderClearIcon',
                value: function (e) {
                  var t,
                    n = this.props,
                    a = n.allowClear,
                    r = n.value,
                    o = n.disabled,
                    i = n.readOnly,
                    l = n.handleReset,
                    s = n.suffix;
                  if (!a) return null;
                  var u = !o && !i && r,
                    p = ''.concat(e, '-clear-icon');
                  return c['createElement'](xa['a'], {
                    onClick: l,
                    onMouseDown: function (e) {
                      return e.preventDefault();
                    },
                    className: m()(
                      ((t = {}),
                      Object(d['a'])(t, ''.concat(p, '-hidden'), !u),
                      Object(d['a'])(t, ''.concat(p, '-has-suffix'), !!s),
                      t),
                      p,
                    ),
                    role: 'button',
                  });
                },
              },
              {
                key: 'renderSuffix',
                value: function (e) {
                  var t = this.props,
                    n = t.suffix,
                    a = t.allowClear;
                  return n || a
                    ? c['createElement'](
                        'span',
                        { className: ''.concat(e, '-suffix') },
                        this.renderClearIcon(e),
                        n,
                      )
                    : null;
                },
              },
              {
                key: 'renderLabeledIcon',
                value: function (e, t) {
                  var n,
                    a = this.props,
                    r = a.focused,
                    o = a.value,
                    i = a.prefix,
                    l = a.className,
                    s = a.size,
                    u = a.suffix,
                    p = a.disabled,
                    f = a.allowClear,
                    h = a.direction,
                    v = a.style,
                    b = a.readOnly,
                    g = a.bordered,
                    y = this.renderSuffix(e);
                  if (!Ca(this.props)) return Object(ne['a'])(t, { value: o });
                  var O = i
                      ? c['createElement'](
                          'span',
                          { className: ''.concat(e, '-prefix') },
                          i,
                        )
                      : null,
                    j = m()(
                      ''.concat(e, '-affix-wrapper'),
                      ((n = {}),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-focused'),
                        r,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-disabled'),
                        p,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-sm'),
                        'small' === s,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-lg'),
                        'large' === s,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-input-with-clear-btn'),
                        u && f && o,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-rtl'),
                        'rtl' === h,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-readonly'),
                        b,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-affix-wrapper-borderless'),
                        !g,
                      ),
                      Object(d['a'])(n, ''.concat(l), !ka(this.props) && l),
                      n),
                    );
                  return c['createElement'](
                    'span',
                    {
                      ref: this.containerRef,
                      className: j,
                      style: v,
                      onMouseUp: this.onInputMouseUp,
                    },
                    O,
                    Object(ne['a'])(t, {
                      style: null,
                      value: o,
                      className: wa(e, g, s, p),
                    }),
                    y,
                  );
                },
              },
              {
                key: 'renderInputWithLabel',
                value: function (e, t) {
                  var n,
                    a = this.props,
                    r = a.addonBefore,
                    o = a.addonAfter,
                    i = a.style,
                    l = a.size,
                    s = a.className,
                    u = a.direction;
                  if (!ka(this.props)) return t;
                  var p = ''.concat(e, '-group'),
                    f = ''.concat(p, '-addon'),
                    h = r
                      ? c['createElement']('span', { className: f }, r)
                      : null,
                    v = o
                      ? c['createElement']('span', { className: f }, o)
                      : null,
                    b = m()(
                      ''.concat(e, '-wrapper'),
                      p,
                      Object(d['a'])({}, ''.concat(p, '-rtl'), 'rtl' === u),
                    ),
                    g = m()(
                      ''.concat(e, '-group-wrapper'),
                      ((n = {}),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-group-wrapper-sm'),
                        'small' === l,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-group-wrapper-lg'),
                        'large' === l,
                      ),
                      Object(d['a'])(
                        n,
                        ''.concat(e, '-group-wrapper-rtl'),
                        'rtl' === u,
                      ),
                      n),
                      s,
                    );
                  return c['createElement'](
                    'span',
                    { className: g, style: i },
                    c['createElement'](
                      'span',
                      { className: b },
                      h,
                      Object(ne['a'])(t, { style: null }),
                      v,
                    ),
                  );
                },
              },
              {
                key: 'renderTextAreaWithClearIcon',
                value: function (e, t) {
                  var n,
                    a = this.props,
                    r = a.value,
                    o = a.allowClear,
                    i = a.className,
                    l = a.style,
                    s = a.direction,
                    u = a.bordered;
                  if (!o) return Object(ne['a'])(t, { value: r });
                  var p = m()(
                    ''.concat(e, '-affix-wrapper'),
                    ''.concat(e, '-affix-wrapper-textarea-with-clear-btn'),
                    ((n = {}),
                    Object(d['a'])(
                      n,
                      ''.concat(e, '-affix-wrapper-rtl'),
                      'rtl' === s,
                    ),
                    Object(d['a'])(
                      n,
                      ''.concat(e, '-affix-wrapper-borderless'),
                      !u,
                    ),
                    Object(d['a'])(n, ''.concat(i), !ka(this.props) && i),
                    n),
                  );
                  return c['createElement'](
                    'span',
                    { className: p, style: l },
                    Object(ne['a'])(t, { style: null, value: r }),
                    this.renderClearIcon(e),
                  );
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.prefixCls,
                    n = e.inputType,
                    a = e.element;
                  return n === Sa[0]
                    ? this.renderTextAreaWithClearIcon(t, a)
                    : this.renderInputWithLabel(
                        t,
                        this.renderLabeledIcon(t, a),
                      );
                },
              },
            ]),
            n
          );
        })(c['Component']),
        Ta = Ea;
      function Na(e) {
        return 'undefined' === typeof e || null === e ? '' : e;
      }
      function za(e, t, n, a) {
        if (n) {
          var r = t;
          if ('click' === t.type) {
            r = Object.create(t);
            var o = e.cloneNode(!0);
            return (
              (r.target = o), (r.currentTarget = o), (o.value = ''), void n(r)
            );
          }
          if (void 0 !== a)
            return (
              (r = Object.create(t)),
              (r.target = e),
              (r.currentTarget = e),
              (e.value = a),
              void n(r)
            );
          n(r);
        }
      }
      function Ha(e, t) {
        if (e) {
          e.focus(t);
          var n = t || {},
            a = n.cursor;
          if (a) {
            var r = e.value.length;
            switch (a) {
              case 'start':
                e.setSelectionRange(0, 0);
                break;
              case 'end':
                e.setSelectionRange(r, r);
                break;
              default:
                e.setSelectionRange(0, r);
            }
          }
        }
      }
      var Ma = (function (e) {
        Object(G['a'])(n, e);
        var t = Object(Q['a'])(n);
        function n(e) {
          var a;
          Object(Y['a'])(this, n),
            (a = t.call(this, e)),
            (a.direction = 'ltr'),
            (a.focus = function (e) {
              Ha(a.input, e);
            }),
            (a.saveClearableInput = function (e) {
              a.clearableInput = e;
            }),
            (a.saveInput = function (e) {
              a.input = e;
            }),
            (a.onFocus = function (e) {
              var t = a.props.onFocus;
              a.setState({ focused: !0 }, a.clearPasswordValueAttribute),
                null === t || void 0 === t || t(e);
            }),
            (a.onBlur = function (e) {
              var t = a.props.onBlur;
              a.setState({ focused: !1 }, a.clearPasswordValueAttribute),
                null === t || void 0 === t || t(e);
            }),
            (a.handleReset = function (e) {
              a.setValue('', function () {
                a.focus();
              }),
                za(a.input, e, a.props.onChange);
            }),
            (a.renderInput = function (e, t, n) {
              var r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {},
                o = a.props,
                i = o.className,
                l = o.addonBefore,
                s = o.addonAfter,
                u = o.size,
                p = o.disabled,
                h = o.htmlSize,
                v = Object(E['a'])(a.props, [
                  'prefixCls',
                  'onPressEnter',
                  'addonBefore',
                  'addonAfter',
                  'prefix',
                  'suffix',
                  'allowClear',
                  'defaultValue',
                  'size',
                  'inputType',
                  'bordered',
                  'htmlSize',
                ]);
              return c['createElement'](
                'input',
                Object(f['a'])({ autoComplete: r.autoComplete }, v, {
                  onChange: a.handleChange,
                  onFocus: a.onFocus,
                  onBlur: a.onBlur,
                  onKeyDown: a.handleKeyDown,
                  className: m()(
                    wa(e, n, u || t, p, a.direction),
                    Object(d['a'])({}, i, i && !l && !s),
                  ),
                  ref: a.saveInput,
                  size: h,
                }),
              );
            }),
            (a.clearPasswordValueAttribute = function () {
              a.removePasswordTimeout = setTimeout(function () {
                a.input &&
                  'password' === a.input.getAttribute('type') &&
                  a.input.hasAttribute('value') &&
                  a.input.removeAttribute('value');
              });
            }),
            (a.handleChange = function (e) {
              a.setValue(e.target.value, a.clearPasswordValueAttribute),
                za(a.input, e, a.props.onChange);
            }),
            (a.handleKeyDown = function (e) {
              var t = a.props,
                n = t.onPressEnter,
                r = t.onKeyDown;
              n && 13 === e.keyCode && n(e), null === r || void 0 === r || r(e);
            }),
            (a.renderComponent = function (e) {
              var t = e.getPrefixCls,
                n = e.direction,
                r = e.input,
                o = a.state,
                i = o.value,
                l = o.focused,
                s = a.props,
                u = s.prefixCls,
                d = s.bordered,
                p = void 0 === d || d,
                h = t('input', u);
              return (
                (a.direction = n),
                c['createElement'](un['b'].Consumer, null, function (e) {
                  return c['createElement'](
                    Ta,
                    Object(f['a'])({ size: e }, a.props, {
                      prefixCls: h,
                      inputType: 'input',
                      value: Na(i),
                      element: a.renderInput(h, e, p, r),
                      handleReset: a.handleReset,
                      ref: a.saveClearableInput,
                      direction: n,
                      focused: l,
                      triggerFocus: a.focus,
                      bordered: p,
                    }),
                  );
                })
              );
            });
          var r = 'undefined' === typeof e.value ? e.defaultValue : e.value;
          return (a.state = { value: r, focused: !1, prevValue: e.value }), a;
        }
        return (
          Object(q['a'])(
            n,
            [
              {
                key: 'componentDidMount',
                value: function () {
                  this.clearPasswordValueAttribute();
                },
              },
              { key: 'componentDidUpdate', value: function () {} },
              {
                key: 'getSnapshotBeforeUpdate',
                value: function (e) {
                  return (
                    Ca(e) !== Ca(this.props) &&
                      Object(se['a'])(
                        this.input !== document.activeElement,
                        'Input',
                        'When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ',
                      ),
                    null
                  );
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  this.removePasswordTimeout &&
                    clearTimeout(this.removePasswordTimeout);
                },
              },
              {
                key: 'blur',
                value: function () {
                  this.input.blur();
                },
              },
              {
                key: 'setSelectionRange',
                value: function (e, t, n) {
                  this.input.setSelectionRange(e, t, n);
                },
              },
              {
                key: 'select',
                value: function () {
                  this.input.select();
                },
              },
              {
                key: 'setValue',
                value: function (e, t) {
                  void 0 === this.props.value
                    ? this.setState({ value: e }, t)
                    : null === t || void 0 === t || t();
                },
              },
              {
                key: 'render',
                value: function () {
                  return c['createElement'](v['a'], null, this.renderComponent);
                },
              },
            ],
            [
              {
                key: 'getDerivedStateFromProps',
                value: function (e, t) {
                  var n = t.prevValue,
                    a = { prevValue: e.value };
                  return (
                    (void 0 === e.value && n === e.value) ||
                      (a.value = e.value),
                    e.disabled && (a.focused = !1),
                    a
                  );
                },
              },
            ],
          ),
          n
        );
      })(c['Component']);
      Ma.defaultProps = { type: 'text' };
      var Da = function (e, t) {
        var n = {};
        for (var a in e)
          Object.prototype.hasOwnProperty.call(e, a) &&
            t.indexOf(a) < 0 &&
            (n[a] = e[a]);
        if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
          var r = 0;
          for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
            t.indexOf(a[r]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
              (n[a[r]] = e[a[r]]);
        }
        return n;
      };
      function Pa(e, t) {
        return Object(u['a'])(e || '')
          .slice(0, t)
          .join('');
      }
      var La,
        Ia = c['forwardRef'](function (e, t) {
          var n,
            a = e.prefixCls,
            r = e.bordered,
            o = void 0 === r || r,
            i = e.showCount,
            l = void 0 !== i && i,
            s = e.maxLength,
            h = e.className,
            b = e.style,
            g = e.size,
            y = e.onCompositionStart,
            O = e.onCompositionEnd,
            j = e.onChange,
            x = Da(e, [
              'prefixCls',
              'bordered',
              'showCount',
              'maxLength',
              'className',
              'style',
              'size',
              'onCompositionStart',
              'onCompositionEnd',
              'onChange',
            ]),
            w = c['useContext'](v['b']),
            C = w.getPrefixCls,
            S = w.direction,
            k = c['useContext'](un['b']),
            T = c['useRef'](null),
            N = c['useRef'](null),
            z = c['useState'](!1),
            H = Object(p['a'])(z, 2),
            M = H[0],
            D = H[1],
            P = Object(rn['a'])(x.defaultValue, { value: x.value }),
            L = Object(p['a'])(P, 2),
            I = L[0],
            A = L[1],
            R = function (e, t) {
              void 0 === x.value && (A(e), null === t || void 0 === t || t());
            },
            V = Number(s) > 0,
            F = function (e) {
              D(!0), null === y || void 0 === y || y(e);
            },
            W = function (e) {
              D(!1);
              var t = e.currentTarget.value;
              V && (t = Pa(t, s)),
                t !== I && (R(t), za(e.currentTarget, e, j, t)),
                null === O || void 0 === O || O(e);
            },
            B = function (e) {
              var t = e.target.value;
              !M && V && (t = Pa(t, s)), R(t), za(e.currentTarget, e, j, t);
            },
            U = function (e) {
              var t, n;
              R('', function () {
                var e;
                null === (e = T.current) || void 0 === e || e.focus();
              }),
                za(
                  null ===
                    (n =
                      null === (t = T.current) || void 0 === t
                        ? void 0
                        : t.resizableTextArea) || void 0 === n
                    ? void 0
                    : n.textArea,
                  e,
                  j,
                );
            },
            _ = C('input', a);
          c['useImperativeHandle'](t, function () {
            var e;
            return {
              resizableTextArea:
                null === (e = T.current) || void 0 === e
                  ? void 0
                  : e.resizableTextArea,
              focus: function (e) {
                var t, n;
                Ha(
                  null ===
                    (n =
                      null === (t = T.current) || void 0 === t
                        ? void 0
                        : t.resizableTextArea) || void 0 === n
                    ? void 0
                    : n.textArea,
                  e,
                );
              },
              blur: function () {
                var e;
                return null === (e = T.current) || void 0 === e
                  ? void 0
                  : e.blur();
              },
            };
          });
          var K = c['createElement'](
              ja,
              Object(f['a'])({}, Object(E['a'])(x, ['allowClear']), {
                className: m()(
                  ((n = {}),
                  Object(d['a'])(n, ''.concat(_, '-borderless'), !o),
                  Object(d['a'])(n, h, h && !l),
                  Object(d['a'])(
                    n,
                    ''.concat(_, '-sm'),
                    'small' === k || 'small' === g,
                  ),
                  Object(d['a'])(
                    n,
                    ''.concat(_, '-lg'),
                    'large' === k || 'large' === g,
                  ),
                  n),
                ),
                style: l ? void 0 : b,
                prefixCls: _,
                onCompositionStart: F,
                onChange: B,
                onCompositionEnd: W,
                ref: T,
                maxLength: s,
              }),
            ),
            X = Na(I);
          M || !V || (null !== x.value && void 0 !== x.value) || (X = Pa(X, s));
          var Y = c['createElement'](
            Ta,
            Object(f['a'])({}, x, {
              prefixCls: _,
              direction: S,
              inputType: 'text',
              value: X,
              element: K,
              handleReset: U,
              ref: N,
              bordered: o,
              style: l ? void 0 : b,
            }),
          );
          if (l) {
            var q = Object(u['a'])(X).length,
              G = '';
            return (
              (G =
                'object' === Object(lt['a'])(l)
                  ? l.formatter({ count: q, maxLength: s })
                  : ''.concat(q).concat(V ? ' / '.concat(s) : '')),
              c['createElement'](
                'div',
                {
                  className: m()(
                    ''.concat(_, '-textarea'),
                    Object(d['a'])(
                      {},
                      ''.concat(_, '-textarea-rtl'),
                      'rtl' === S,
                    ),
                    ''.concat(_, '-textarea-show-count'),
                    h,
                  ),
                  style: b,
                  'data-count': G,
                },
                Y,
              )
            );
          }
          return Y;
        }),
        Aa = Ia,
        Ra = function (e) {
          var t = e.prefixCls,
            n = e['aria-label'],
            a = e.className,
            r = e.style,
            o = e.direction,
            i = e.maxLength,
            l = e.autoSize,
            s = void 0 === l || l,
            u = e.value,
            f = e.onSave,
            h = e.onCancel,
            v = e.onEnd,
            b = c['useRef'](),
            g = c['useRef'](!1),
            y = c['useRef'](),
            O = c['useState'](u),
            j = Object(p['a'])(O, 2),
            x = j[0],
            w = j[1];
          c['useEffect'](
            function () {
              w(u);
            },
            [u],
          ),
            c['useEffect'](function () {
              if (b.current && b.current.resizableTextArea) {
                var e = b.current.resizableTextArea.textArea;
                e.focus();
                var t = e.value.length;
                e.setSelectionRange(t, t);
              }
            }, []);
          var C = function (e) {
              var t = e.target;
              w(t.value.replace(/[\n\r]/g, ''));
            },
            S = function () {
              g.current = !0;
            },
            k = function () {
              g.current = !1;
            },
            E = function (e) {
              var t = e.keyCode;
              g.current || (y.current = t);
            },
            T = function () {
              f(x.trim());
            },
            N = function (e) {
              var t = e.keyCode,
                n = e.ctrlKey,
                a = e.altKey,
                r = e.metaKey,
                o = e.shiftKey;
              y.current !== t ||
                g.current ||
                n ||
                a ||
                r ||
                o ||
                (t === zt['a'].ENTER
                  ? (T(), null === v || void 0 === v || v())
                  : t === zt['a'].ESC && h());
            },
            z = function () {
              T();
            },
            H = m()(
              t,
              ''.concat(t, '-edit-content'),
              Object(d['a'])({}, ''.concat(t, '-rtl'), 'rtl' === o),
              a,
            );
          return c['createElement'](
            'div',
            { className: H, style: r },
            c['createElement'](Aa, {
              ref: b,
              maxLength: i,
              value: x,
              onChange: C,
              onKeyDown: E,
              onKeyUp: N,
              onCompositionStart: S,
              onCompositionEnd: k,
              onBlur: z,
              'aria-label': n,
              autoSize: s,
            }),
            c['createElement'](pa, {
              className: ''.concat(t, '-edit-content-confirm'),
            }),
          );
        },
        Va = Ra,
        Fa = n('i8i4'),
        Wa = 1,
        Ba = 3,
        Ua = 8,
        _a = {
          padding: 0,
          margin: 0,
          display: 'inline',
          lineHeight: 'inherit',
        };
      function Ka(e) {
        var t = Array.prototype.slice.apply(e);
        return t
          .map(function (t) {
            return ''.concat(t, ': ').concat(e.getPropertyValue(t), ';');
          })
          .join('');
      }
      function Xa(e) {
        var t = [];
        return (
          e.forEach(function (e) {
            var n = t[t.length - 1];
            'string' === typeof e && 'string' === typeof n
              ? (t[t.length - 1] += e)
              : t.push(e);
          }),
          t
        );
      }
      function Ya(e, t) {
        e.setAttribute('aria-hidden', 'true');
        var n = window.getComputedStyle(t),
          a = Ka(n);
        e.setAttribute('style', a),
          (e.style.position = 'fixed'),
          (e.style.left = '0'),
          (e.style.height = 'auto'),
          (e.style.minHeight = 'auto'),
          (e.style.maxHeight = 'auto'),
          (e.style.paddingTop = '0'),
          (e.style.paddingBottom = '0'),
          (e.style.borderTopWidth = '0'),
          (e.style.borderBottomWidth = '0'),
          (e.style.top = '-999999px'),
          (e.style.zIndex = '-1000'),
          (e.style.textOverflow = 'clip'),
          (e.style.whiteSpace = 'normal'),
          (e.style.webkitLineClamp = 'none');
      }
      function qa(e) {
        var t = document.createElement('div');
        Ya(t, e),
          t.appendChild(document.createTextNode('text')),
          document.body.appendChild(t);
        var n = t.getBoundingClientRect().height;
        return document.body.removeChild(t), n;
      }
      var Ga = function (e, t, n, a, r) {
          La ||
            ((La = document.createElement('div')),
            La.setAttribute('aria-hidden', 'true')),
            La.parentNode || document.body.appendChild(La);
          var o = t.rows,
            i = t.suffix,
            l = void 0 === i ? '' : i,
            s = qa(e),
            u = Math.round(s * o * 100) / 100;
          Ya(La, e);
          var d = Xa(Object(oe['a'])(n));
          function p() {
            var e = Math.round(100 * La.getBoundingClientRect().height) / 100;
            return e - 0.1 <= u;
          }
          if (
            (Object(Fa['render'])(
              c['createElement'](
                'div',
                { style: _a },
                c['createElement']('span', { style: _a }, d, l),
                c['createElement']('span', { style: _a }, a),
              ),
              La,
            ),
            p())
          )
            return (
              Object(Fa['unmountComponentAtNode'])(La),
              { content: n, text: La.innerHTML, ellipsis: !1 }
            );
          var f = Array.prototype.slice
              .apply(La.childNodes[0].childNodes[0].cloneNode(!0).childNodes)
              .filter(function (e) {
                var t = e.nodeType;
                return t !== Ua;
              }),
            h = Array.prototype.slice.apply(
              La.childNodes[0].childNodes[1].cloneNode(!0).childNodes,
            );
          Object(Fa['unmountComponentAtNode'])(La);
          var m = [];
          La.innerHTML = '';
          var v = document.createElement('span');
          La.appendChild(v);
          var b = document.createTextNode(r + l);
          function g(e) {
            v.insertBefore(e, b);
          }
          function y(e, t) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 0,
              a =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : t.length,
              r =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : 0,
              o = Math.floor((n + a) / 2),
              i = t.slice(0, o);
            if (((e.textContent = i), n >= a - 1))
              for (var l = a; l >= n; l -= 1) {
                var c = t.slice(0, l);
                if (((e.textContent = c), p() || !c))
                  return l === t.length
                    ? { finished: !1, reactNode: t }
                    : { finished: !0, reactNode: c };
              }
            return p() ? y(e, t, o, a, o) : y(e, t, n, o, r);
          }
          function O(e, t) {
            var n = e.nodeType;
            if (n === Wa)
              return (
                g(e),
                p()
                  ? { finished: !1, reactNode: d[t] }
                  : (v.removeChild(e), { finished: !0, reactNode: null })
              );
            if (n === Ba) {
              var a = e.textContent || '',
                r = document.createTextNode(a);
              return g(r), y(r, a);
            }
            return { finished: !1, reactNode: null };
          }
          return (
            v.appendChild(b),
            h.forEach(function (e) {
              La.appendChild(e);
            }),
            f.some(function (e, t) {
              var n = O(e, t),
                a = n.finished,
                r = n.reactNode;
              return r && m.push(r), a;
            }),
            { content: m, text: La.innerHTML, ellipsis: !0 }
          );
        },
        Qa = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        Za = Object(ia['a'])('webkitLineClamp'),
        Ja = Object(ia['a'])('textOverflow');
      function $a(e, t) {
        var n = e.mark,
          a = e.code,
          r = e.underline,
          o = e['delete'],
          i = e.strong,
          l = e.keyboard,
          s = e.italic,
          u = t;
        function d(e, t) {
          e && (u = c['createElement'](t, {}, u));
        }
        return (
          d(i, 'strong'),
          d(r, 'u'),
          d(o, 'del'),
          d(a, 'code'),
          d(n, 'mark'),
          d(l, 'kbd'),
          d(s, 'i'),
          u
        );
      }
      function er(e, t, n) {
        return !0 === e || void 0 === e ? t : e || (n && t);
      }
      var tr = '...',
        nr = (function (e) {
          Object(G['a'])(n, e);
          var t = Object(Q['a'])(n);
          function n() {
            var e;
            return (
              Object(Y['a'])(this, n),
              (e = t.apply(this, arguments)),
              (e.contentRef = c['createRef']()),
              (e.state = {
                edit: !1,
                copied: !1,
                ellipsisText: '',
                ellipsisContent: null,
                isEllipsis: !1,
                expanded: !1,
                clientRendered: !1,
              }),
              (e.getPrefixCls = function () {
                var t = e.props.prefixCls,
                  n = e.context.getPrefixCls;
                return n('typography', t);
              }),
              (e.onExpandClick = function (t) {
                var n,
                  a = e.getEllipsis(),
                  r = a.onExpand;
                e.setState({ expanded: !0 }),
                  null === (n = r) || void 0 === n || n(t);
              }),
              (e.onEditClick = function (t) {
                t.preventDefault(), e.triggerEdit(!0);
              }),
              (e.onEditChange = function (t) {
                var n = e.getEditable(),
                  a = n.onChange;
                null === a || void 0 === a || a(t), e.triggerEdit(!1);
              }),
              (e.onEditCancel = function () {
                var t, n;
                null === (n = (t = e.getEditable()).onCancel) ||
                  void 0 === n ||
                  n.call(t),
                  e.triggerEdit(!1);
              }),
              (e.onCopyClick = function (t) {
                t.preventDefault();
                var n = e.props,
                  a = n.children,
                  r = n.copyable,
                  o = Object(f['a'])(
                    {},
                    'object' === Object(lt['a'])(r) ? r : null,
                  );
                void 0 === o.text && (o.text = String(a)),
                  Un()(o.text || ''),
                  e.setState({ copied: !0 }, function () {
                    o.onCopy && o.onCopy(),
                      (e.copyId = window.setTimeout(function () {
                        e.setState({ copied: !1 });
                      }, 3e3));
                  });
              }),
              (e.setEditRef = function (t) {
                e.editIcon = t;
              }),
              (e.triggerEdit = function (t) {
                var n = e.getEditable(),
                  a = n.onStart;
                t && a && a(),
                  e.setState({ edit: t }, function () {
                    !t && e.editIcon && e.editIcon.focus();
                  });
              }),
              (e.resizeOnNextFrame = function () {
                oa['a'].cancel(e.rafId),
                  (e.rafId = Object(oa['a'])(function () {
                    e.syncEllipsis();
                  }));
              }),
              e
            );
          }
          return (
            Object(q['a'])(
              n,
              [
                {
                  key: 'componentDidMount',
                  value: function () {
                    this.setState({ clientRendered: !0 }),
                      this.resizeOnNextFrame();
                  },
                },
                {
                  key: 'componentDidUpdate',
                  value: function (e) {
                    var t = this.props.children,
                      n = this.getEllipsis(),
                      a = this.getEllipsis(e);
                    (t === e.children && n.rows === a.rows) ||
                      this.resizeOnNextFrame();
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function () {
                    window.clearTimeout(this.copyId),
                      oa['a'].cancel(this.rafId);
                  },
                },
                {
                  key: 'getEditable',
                  value: function (e) {
                    var t = this.state.edit,
                      n = e || this.props,
                      a = n.editable;
                    return a
                      ? Object(f['a'])(
                          { editing: t },
                          'object' === Object(lt['a'])(a) ? a : null,
                        )
                      : { editing: t };
                  },
                },
                {
                  key: 'getEllipsis',
                  value: function (e) {
                    var t = e || this.props,
                      n = t.ellipsis;
                    return n
                      ? Object(f['a'])(
                          { rows: 1, expandable: !1 },
                          'object' === Object(lt['a'])(n) ? n : null,
                        )
                      : {};
                  },
                },
                {
                  key: 'canUseCSSEllipsis',
                  value: function () {
                    var e = this.state.clientRendered,
                      t = this.props,
                      n = t.editable,
                      a = t.copyable,
                      r = this.getEllipsis(),
                      o = r.rows,
                      i = r.expandable,
                      l = r.suffix,
                      c = r.onEllipsis,
                      s = r.tooltip;
                    return (
                      !l &&
                      !s &&
                      !(n || a || i || !e || c) &&
                      (1 === o ? Ja : Za)
                    );
                  },
                },
                {
                  key: 'syncEllipsis',
                  value: function () {
                    var e = this.state,
                      t = e.ellipsisText,
                      n = e.isEllipsis,
                      a = e.expanded,
                      r = this.getEllipsis(),
                      o = r.rows,
                      i = r.suffix,
                      l = r.onEllipsis,
                      c = this.props.children;
                    if (
                      o &&
                      !(o < 0) &&
                      this.contentRef.current &&
                      !a &&
                      !this.canUseCSSEllipsis()
                    ) {
                      Object(se['a'])(
                        Object(oe['a'])(c).every(function (e) {
                          return 'string' === typeof e;
                        }),
                        'Typography',
                        '`ellipsis` should use string as children only.',
                      );
                      var s = Ga(
                          this.contentRef.current,
                          { rows: o, suffix: i },
                          c,
                          this.renderOperations(!0),
                          tr,
                        ),
                        u = s.content,
                        d = s.text,
                        p = s.ellipsis;
                      (t === d && n === p) ||
                        (this.setState({
                          ellipsisText: d,
                          ellipsisContent: u,
                          isEllipsis: p,
                        }),
                        n !== p && l && l(p));
                    }
                  },
                },
                {
                  key: 'renderExpand',
                  value: function (e) {
                    var t,
                      n = this.getEllipsis(),
                      a = n.expandable,
                      r = n.symbol,
                      o = this.state,
                      i = o.expanded,
                      l = o.isEllipsis;
                    return a && (e || (!i && l))
                      ? ((t = r || this.expandStr),
                        c['createElement'](
                          'a',
                          {
                            key: 'expand',
                            className: ''.concat(
                              this.getPrefixCls(),
                              '-expand',
                            ),
                            onClick: this.onExpandClick,
                            'aria-label': this.expandStr,
                          },
                          t,
                        ))
                      : null;
                  },
                },
                {
                  key: 'renderEdit',
                  value: function () {
                    var e = this.props.editable;
                    if (e) {
                      var t = e.icon,
                        n = e.tooltip,
                        a = Object(oe['a'])(n)[0] || this.editStr,
                        r = 'string' === typeof a ? a : '';
                      return c['createElement'](
                        ie['a'],
                        { key: 'edit', title: !1 === n ? '' : a },
                        c['createElement'](
                          ra,
                          {
                            ref: this.setEditRef,
                            className: ''.concat(this.getPrefixCls(), '-edit'),
                            onClick: this.onEditClick,
                            'aria-label': r,
                          },
                          t || c['createElement'](Yn, { role: 'button' }),
                        ),
                      );
                    }
                  },
                },
                {
                  key: 'renderCopy',
                  value: function () {
                    var e = this.state.copied,
                      t = this.props.copyable;
                    if (t) {
                      var n = this.getPrefixCls(),
                        a = t.tooltips,
                        r = t.icon,
                        o = Array.isArray(a) ? a : [a],
                        i = Array.isArray(r) ? r : [r],
                        l = e
                          ? er(o[1], this.copiedStr)
                          : er(o[0], this.copyStr),
                        s = e ? this.copiedStr : this.copyStr,
                        u = 'string' === typeof l ? l : s;
                      return c['createElement'](
                        ie['a'],
                        { key: 'copy', title: l },
                        c['createElement'](
                          ra,
                          {
                            className: m()(
                              ''.concat(n, '-copy'),
                              e && ''.concat(n, '-copy-success'),
                            ),
                            onClick: this.onCopyClick,
                            'aria-label': u,
                          },
                          e
                            ? er(i[1], c['createElement'](wn['a'], null), !0)
                            : er(i[0], c['createElement'](Zn, null), !0),
                        ),
                      );
                    }
                  },
                },
                {
                  key: 'renderEditInput',
                  value: function () {
                    var e = this.props,
                      t = e.children,
                      n = e.className,
                      a = e.style,
                      r = this.context.direction,
                      o = this.getEditable(),
                      i = o.maxLength,
                      l = o.autoSize,
                      s = o.onEnd;
                    return c['createElement'](Va, {
                      value: 'string' === typeof t ? t : '',
                      onSave: this.onEditChange,
                      onCancel: this.onEditCancel,
                      onEnd: s,
                      prefixCls: this.getPrefixCls(),
                      className: n,
                      style: a,
                      direction: r,
                      maxLength: i,
                      autoSize: l,
                    });
                  },
                },
                {
                  key: 'renderOperations',
                  value: function (e) {
                    return [
                      this.renderExpand(e),
                      this.renderEdit(),
                      this.renderCopy(),
                    ].filter(function (e) {
                      return e;
                    });
                  },
                },
                {
                  key: 'renderContent',
                  value: function () {
                    var e = this,
                      t = this.state,
                      n = t.ellipsisContent,
                      a = t.isEllipsis,
                      r = t.expanded,
                      o = this.props,
                      i = o.component,
                      l = o.children,
                      s = o.className,
                      p = o.type,
                      h = o.disabled,
                      v = o.style,
                      b = Qa(o, [
                        'component',
                        'children',
                        'className',
                        'type',
                        'disabled',
                        'style',
                      ]),
                      g = this.context.direction,
                      y = this.getEllipsis(),
                      O = y.rows,
                      j = y.suffix,
                      x = y.tooltip,
                      w = this.getPrefixCls(),
                      C = Object(E['a'])(
                        b,
                        [
                          'prefixCls',
                          'editable',
                          'copyable',
                          'ellipsis',
                          'mark',
                          'code',
                          'delete',
                          'underline',
                          'strong',
                          'keyboard',
                          'italic',
                        ].concat(Object(u['a'])($n['a'])),
                      ),
                      S = this.canUseCSSEllipsis(),
                      k = 1 === O && S,
                      T = O && O > 1 && S,
                      N = l;
                    if (O && a && !r && !S) {
                      var z = b.title,
                        H = z || '';
                      z ||
                        ('string' !== typeof l && 'number' !== typeof l) ||
                        (H = String(l)),
                        (H = H.slice(String(n || '').length)),
                        (N = c['createElement'](
                          c['Fragment'],
                          null,
                          n,
                          c['createElement'](
                            'span',
                            { title: H, 'aria-hidden': 'true' },
                            tr,
                          ),
                          j,
                        )),
                        x &&
                          (N = c['createElement'](
                            ie['a'],
                            { title: !0 === x ? l : x },
                            c['createElement']('span', null, N),
                          ));
                    } else N = c['createElement'](c['Fragment'], null, l, j);
                    return (
                      (N = $a(this.props, N)),
                      c['createElement'](
                        ea['a'],
                        { componentName: 'Text' },
                        function (t) {
                          var n,
                            r = t.edit,
                            o = t.copy,
                            l = t.copied,
                            u = t.expand;
                          return (
                            (e.editStr = r),
                            (e.copyStr = o),
                            (e.copiedStr = l),
                            (e.expandStr = u),
                            c['createElement'](
                              Jn['a'],
                              { onResize: e.resizeOnNextFrame, disabled: S },
                              c['createElement'](
                                Wn,
                                Object(f['a'])(
                                  {
                                    className: m()(
                                      ((n = {}),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-').concat(p),
                                        p,
                                      ),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-disabled'),
                                        h,
                                      ),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-ellipsis'),
                                        O,
                                      ),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-single-line'),
                                        1 === O && !a,
                                      ),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-ellipsis-single-line'),
                                        k,
                                      ),
                                      Object(d['a'])(
                                        n,
                                        ''.concat(w, '-ellipsis-multiple-line'),
                                        T,
                                      ),
                                      n),
                                      s,
                                    ),
                                    style: Object(f['a'])(
                                      Object(f['a'])({}, v),
                                      { WebkitLineClamp: T ? O : void 0 },
                                    ),
                                    component: i,
                                    ref: e.contentRef,
                                    direction: g,
                                  },
                                  C,
                                ),
                                N,
                                e.renderOperations(),
                              ),
                            )
                          );
                        },
                      )
                    );
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var e = this.getEditable(),
                      t = e.editing;
                    return t ? this.renderEditInput() : this.renderContent();
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function (e) {
                    var t = e.children,
                      n = e.editable;
                    return (
                      Object(se['a'])(
                        !n || 'string' === typeof t,
                        'Typography',
                        'When `editable` is enabled, the `children` should use string.',
                      ),
                      {}
                    );
                  },
                },
              ],
            ),
            n
          );
        })(c['Component']);
      (nr.contextType = v['b']), (nr.defaultProps = { children: '' });
      var ar = nr,
        rr = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        or = function (e) {
          var t = e.ellipsis,
            n = rr(e, ['ellipsis']),
            a = c['useMemo'](
              function () {
                return t && 'object' === Object(lt['a'])(t)
                  ? Object(E['a'])(t, ['expandable', 'rows'])
                  : t;
              },
              [t],
            );
          return (
            Object(se['a'])(
              'object' !== Object(lt['a'])(t) ||
                !t ||
                (!('expandable' in t) && !('rows' in t)),
              'Typography.Text',
              '`ellipsis` do not support `expandable` or `rows` props.',
            ),
            c['createElement'](
              ar,
              Object(f['a'])({}, n, { ellipsis: a, component: 'span' }),
            )
          );
        },
        ir = or,
        lr = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        cr = function (e, t) {
          var n = e.ellipsis,
            a = e.rel,
            r = lr(e, ['ellipsis', 'rel']);
          Object(se['a'])(
            'object' !== Object(lt['a'])(n),
            'Typography.Link',
            '`ellipsis` only supports boolean value.',
          );
          var o = c['useRef'](null);
          c['useImperativeHandle'](t, function () {
            var e;
            return null === (e = o.current) || void 0 === e
              ? void 0
              : e.contentRef.current;
          });
          var i = Object(f['a'])(Object(f['a'])({}, r), {
            rel:
              void 0 === a && '_blank' === r.target ? 'noopener noreferrer' : a,
          });
          return (
            delete i.navigate,
            c['createElement'](
              ar,
              Object(f['a'])({}, i, { ref: o, ellipsis: !!n, component: 'a' }),
            )
          );
        },
        sr = c['forwardRef'](cr),
        ur = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        dr = Object(Xe['b'])(1, 2, 3, 4, 5),
        pr = function (e) {
          var t,
            n = e.level,
            a = void 0 === n ? 1 : n,
            r = ur(e, ['level']);
          return (
            -1 !== dr.indexOf(a)
              ? (t = 'h'.concat(a))
              : (Object(se['a'])(
                  !1,
                  'Typography.Title',
                  'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.',
                ),
                (t = 'h1')),
            c['createElement'](ar, Object(f['a'])({}, r, { component: t }))
          );
        },
        fr = pr,
        hr = function (e) {
          return c['createElement'](
            ar,
            Object(f['a'])({}, e, { component: 'div' }),
          );
        },
        mr = hr,
        vr = Wn;
      (vr.Text = ir), (vr.Link = sr), (vr.Title = fr), (vr.Paragraph = mr);
      var br = vr,
        gr = (n('Znn+'), n('ZTPi')),
        yr = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z',
                },
              },
            ],
          },
          name: 'bell',
          theme: 'outlined',
        },
        Or = yr,
        jr = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Or }),
          );
        };
      jr.displayName = 'BellOutlined';
      var xr = c['forwardRef'](jr),
        wr = gr['a'].TabPane;
      function Cr() {
        var e = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
          ],
          t = (e) => {
            console.log(e);
          },
          n = () =>
            Object(Ee['jsx'])(Ee['Fragment'], {
              children: Object(Ee['jsx'])(Pn['a'], {
                children: Object(Ee['jsxs'])(gr['a'], {
                  defaultActiveKey: '1',
                  onChange: t,
                  centered: !0,
                  children: [
                    Object(Ee['jsx'])(
                      wr,
                      {
                        tab: '\u6d88\u606f',
                        children: Object(Ee['jsx'])(Ln['b'], {
                          dataSource: e,
                          renderItem: (e) =>
                            Object(Ee['jsxs'])(Ln['b'].Item, {
                              children: [
                                Object(Ee['jsx'])(br.Text, {
                                  mark: !0,
                                  children: '[ITEM]',
                                }),
                                ' ',
                                e,
                              ],
                            }),
                        }),
                      },
                      '1',
                    ),
                    Object(Ee['jsx'])(
                      wr,
                      {
                        tab: '\u5f85\u529e',
                        children: Object(Ee['jsx'])(Ln['b'], {
                          size: 'small',
                          dataSource: e,
                          renderItem: (e) =>
                            Object(Ee['jsx'])(Ln['b'].Item, { children: e }),
                        }),
                      },
                      '2',
                    ),
                    Object(Ee['jsx'])(
                      wr,
                      {
                        tab: '\u901a\u77e5',
                        children: Object(Ee['jsx'])(Ln['b'], {
                          size: 'large',
                          dataSource: e,
                          renderItem: (e) =>
                            Object(Ee['jsx'])(Ln['b'].Item, { children: e }),
                        }),
                      },
                      '3',
                    ),
                  ],
                }),
              }),
            });
        return Object(Ee['jsx'])(Ge, {
          placement: 'bottomRight',
          overlay: n,
          children: Object(Ee['jsx'])('div', {
            style: { width: '100%', height: 64 },
            children: Object(Ee['jsx'])(xr, {
              style: { position: 'absolute', top: 23, right: 10, fontSize: 25 },
            }),
          }),
        });
      }
      var Sr = () => {
          var e = X['a'].useContainer();
          return Object(Ee['jsxs'])(ze['a'], {
            gutter: [16, 16],
            justify: 'end',
            style:
              'light' === e.menuTheme
                ? { textAlign: 'center' }
                : { color: '#fff', textAlign: 'center' },
            children: [
              Object(Ee['jsx'])(He['a'], {
                children: Object(Ee['jsx'])(Cr, {}),
              }),
              Object(Ee['jsx'])(He['a'], {
                children: Object(Ee['jsx'])(Dn, { userInfo: e.userInfo }),
              }),
            ],
          });
        },
        kr = Sr,
        Er =
          (n('SobC'),
          {
            icon: {
              tag: 'svg',
              attrs: { viewBox: '64 64 896 896', focusable: 'false' },
              children: [
                {
                  tag: 'path',
                  attrs: {
                    d: 'M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z',
                  },
                },
              ],
            },
            name: 'menu-unfold',
            theme: 'outlined',
          }),
        Tr = Er,
        Nr = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Tr }),
          );
        };
      Nr.displayName = 'MenuUnfoldOutlined';
      var zr = c['forwardRef'](Nr),
        Hr = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z',
                },
              },
            ],
          },
          name: 'menu-fold',
          theme: 'outlined',
        },
        Mr = Hr,
        Dr = function (e, t) {
          return c['createElement'](
            H['a'],
            Object(T['a'])(Object(T['a'])({}, e), {}, { ref: t, icon: Mr }),
          );
        };
      Dr.displayName = 'MenuFoldOutlined';
      var Pr = c['forwardRef'](Dr),
        Lr = K.Header;
      function Ir() {
        var e,
          t = X['a'].useContainer();
        return (
          (e = t.layoutSider
            ? 'calc(100% - '.concat(t.siderCollapsed ? 80 : 200, 'px)')
            : '100%'),
          Object(Ee['jsxs'])(Lr, {
            className: 'header',
            style:
              'light' === t.menuTheme
                ? t.fixedHeaderStyle
                  ? {
                      backgroundColor: '#fff',
                      padding: 0,
                      position: 'fixed',
                      zIndex: 99,
                      width: e,
                    }
                  : { backgroundColor: '#fff', padding: 0 }
                : t.fixedHeaderStyle
                ? { padding: 0, position: 'fixed', zIndex: 99, width: e }
                : { padding: 0 },
            children: [
              t.layoutSider
                ? s.a.createElement(t.siderCollapsed ? zr : Pr, {
                    style: {
                      color: 'dark' === t.menuTheme ? '#fff' : t.primaryColor,
                    },
                    className: 'trigger',
                    onClick: t.changeSiderCollapsed,
                  })
                : Object(Ee['jsx'])('div', {
                    style: { float: 'left' },
                    children: Object(Ee['jsx'])(Le, {}),
                  }),
              Object(Ee['jsxs'])(ze['a'], {
                justify: 'space-between',
                style: { paddingRight: 2 },
                children: [
                  Object(Ee['jsx'])(He['a'], {
                    xs: 2,
                    sm: 4,
                    md: 8,
                    lg: 12,
                    xl: 16,
                    children:
                      'Top' === t.layouts &&
                      '#/workplace' !== location.hash &&
                      '#/user' !== location.hash
                        ? Object(Ee['jsx'])(Ne, {
                            mode: 'horizontal',
                            appMenu: t.appMenu,
                          })
                        : Object(Ee['jsx'])(be, {
                            theme: t.menuTheme,
                            mode: 'horizontal',
                            defaultSelectedKeys: ['1'],
                            children:
                              '#/workplace' !== location.hash &&
                              '#/user' !== location.hash &&
                              '#/apps' !== location.hash &&
                              t.appMenu
                                ? Object(Ee['jsx'])(
                                    be.Item,
                                    { children: t.appMenu[0].menuName },
                                    '1',
                                  )
                                : '#/user' === location.hash
                                ? Object(Ee['jsx'])(
                                    be.Item,
                                    { children: 'user' },
                                    '1',
                                  )
                                : '#/apps' === location.hash
                                ? Object(Ee['jsx'])(
                                    be.Item,
                                    { children: 'apps' },
                                    '1',
                                  )
                                : null,
                          }),
                  }),
                  Object(Ee['jsx'])(He['a'], {
                    style: { width: 300 },
                    children: Object(Ee['jsx'])(kr, {}),
                  }),
                ],
              }),
            ],
          })
        );
      }
      var Ar = K.Content,
        Rr = K.Sider;
      function Vr(e) {
        var t = X['a'].useContainer(),
          n = s.a.useState(!1),
          a = Object(o['a'])(n, 2),
          r = a[0],
          i = a[1],
          l = s.a.useState({ marginLeft: 200, transition: 'all 0.2s' }),
          c = Object(o['a'])(l, 2),
          u = c[0],
          d = c[1],
          p = (e) => {
            i(e),
              d(
                e
                  ? { transition: 'all 0.2s', marginLeft: 80 }
                  : { marginLeft: 200, transition: 'all 0.2s' },
              );
          };
        return Object(Ee['jsx'])(Ar, {
          style: t.fixedHeaderStyle ? { marginTop: 64 } : void 0,
          children: t.contentSider
            ? Object(Ee['jsxs'])(K, {
                className: 'site-layout-background',
                children: [
                  Object(Ee['jsx'])(Rr, {
                    style: t.fixedSiderStyle
                      ? {
                          overflow: 'auto',
                          height: '100vh',
                          position: 'fixed',
                          left: 0,
                        }
                      : void 0,
                    theme: t.menuTheme,
                    className: 'site-layout-background',
                    collapsible: !0,
                    collapsed: r,
                    onCollapse: p,
                    children: Object(Ee['jsx'])(Ne, {
                      appMenu: t.appMenu,
                      mode: t.mode,
                    }),
                  }),
                  Object(Ee['jsx'])(Ar, {
                    style: t.fixedSiderStyle ? u : void 0,
                    children: Object(Ee['jsx'])('div', {
                      className: 'site-layout-background',
                      style: { margin: '15px 15px 0' },
                      children: e.children,
                    }),
                  }),
                ],
              })
            : Object(Ee['jsx'])('div', {
                className: 'site-layout-background',
                style:
                  '#/workplace' === location.hash
                    ? {}
                    : { margin: '15px 15px 0' },
                children: e.children,
              }),
        });
      }
      function Fr(e) {
        var t = e.children,
          n = X['a'].useContainer();
        return Object(Ee['jsxs'])(K, {
          style:
            n.fixedSiderStyle && n.layoutSider
              ? n.siderCollapsed
                ? { marginLeft: 80 }
                : { marginLeft: 200 }
              : {},
          children: [
            Object(Ee['jsx'])(Ir, {}),
            Object(Ee['jsx'])(Vr, { children: t }),
          ],
        });
      }
      var Wr = () => {
          var e = Object(Me['g'])('@@qiankunStateForSlave') || {},
            t = e.isShowApp2,
            n = e.setIsShowApp2,
            a = () => {
              n(!1);
            };
          return Object(Ee['jsx'])(Ee['Fragment'], {
            children: Object(Ee['jsx'])(an, {
              title: 'Basic Drawer',
              placement: 'right',
              onClose: a,
              visible: t,
              children: Object(Ee['jsx'])(Me['b'], {
                name: 'app2',
                url: '/home',
              }),
            }),
          });
        },
        Br = Wr,
        Ur = (e) => {
          var t = e.appMenu,
            n = e.userInfo,
            a = e.children,
            r = '#4e6ef2',
            o = '#222',
            i = 'Sider',
            l = 'inline',
            c = 'dark';
          if (n.theme) {
            var s = n.theme;
            s.primaryColor ? (r = s.primaryColor) : (s.primaryColor = r),
              s.textColor ? (o = s.textColor) : (s.textColor = o),
              s.layouts ? (i = s.layouts) : (s.layouts = i),
              s.mode ? (l = s.mode) : (s.mode = l),
              s.menuTheme ? (c = s.menuTheme) : (s.menuTheme = c),
              (n.theme = s);
          } else
            n.theme = {
              primaryColor: r,
              textColor: o,
              layouts: i,
              mode: l,
              menuTheme: c,
            };
          return Object(Ee['jsxs'])(X['a'].Provider, {
            initialState: {
              layouts: i,
              primaryColor: r,
              textColor: o,
              userInfo: n,
              mode: l,
              appMenu: t,
              menuTheme: c,
            },
            children: [
              Object(Ee['jsxs'])(K, {
                style: { width: '100vw', height: '100vh', overflow: 'auto' },
                children: [
                  Object(Ee['jsx'])(Ve, {}),
                  Object(Ee['jsx'])(Fr, { children: a }),
                ],
              }),
              Object(Ee['jsx'])(Br, {}),
            ],
          });
        },
        _r = Ur,
        Kr = n('ubNI'),
        Xr = (n('PUTc'), n('k1fw')),
        Yr = n('+SBJ'),
        qr = (e) =>
          Object(Yr['a'])('/getUserMenuTreeByAppCode', {
            serviceName: 'MenuService',
            methodName: 'getUserMenuTreeByAppCode',
            bizParams: Object(Xr['a'])({}, e),
          });
      function Gr(e) {
        var t = s.a.useState(),
          n = Object(o['a'])(t, 2),
          i = n[0],
          u = n[1],
          d = s.a.useState(),
          p = Object(o['a'])(d, 2),
          f = p[0],
          h = p[1],
          m = Object(Kr['a'])('userInformation');
        Object(c['useEffect'])(() => {
          var e = location.hash.split('/')[1];
          'workplace' !== e && 'user' !== e && 'apps' !== e && v(e);
        }, [location.hash]);
        var v = (function () {
          var e = Object(r['a'])(
            l.a.mark(function e(t) {
              var n;
              return l.a.wrap(function (e) {
                while (1)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (t === f) {
                        e.next = 6;
                        break;
                      }
                      return (e.next = 3), qr({ appCode: t });
                    case 3:
                      (n = e.sent),
                        console.log(n),
                        n && n.data[0]
                          ? (u(n.data), h(t))
                          : (a['default'].error(
                              '\u4f60\u6ca1\u6709'.concat(t, '\u6743\u9650'),
                            ),
                            setTimeout(() => {
                              Me['e'].push('/'), location.reload();
                            }, 1e3));
                    case 6:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            }),
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })();
        return Object(Ee['jsx'])(_r, {
          userInfo: m,
          children: e.children,
          appMenu: i,
        });
      }
    },
    '/qDX': function (e, t, n) {},
    '0JIh': function (e, t, n) {
      e.exports = n.p + 'static/logo3.b6efaf76.png';
    },
    '0XgM': function (e, t, n) {},
    '3IO0': function (e, t) {
      e.exports = o;
      var n = /\s/,
        a = /(_|-|\.|:)/,
        r = /([a-z][A-Z]|[A-Z][a-z])/;
      function o(e) {
        return n.test(e)
          ? e.toLowerCase()
          : a.test(e)
          ? (l(e) || e).toLowerCase()
          : r.test(e)
          ? s(e).toLowerCase()
          : e.toLowerCase();
      }
      var i = /[\W_]+(.|$)/g;
      function l(e) {
        return e.replace(i, function (e, t) {
          return t ? ' ' + t : '';
        });
      }
      var c = /(.)([A-Z]+)/g;
      function s(e) {
        return e.replace(c, function (e, t, n) {
          return t + ' ' + n.toLowerCase().split('').join(' ');
        });
      }
    },
    '5YgA': function (e, t, n) {},
    '9yH6': function (e, t, n) {
      'use strict';
      var a = n('oOh1'),
        r = n('SiX+'),
        o = n('KNH7'),
        i = a['a'];
      (i.Button = o['a']), (i.Group = r['a']), (t['a'] = i);
    },
    'CWI+': function (e, t, n) {},
    E9nw: function (e, t) {
      e.exports = function () {
        var e = document.getSelection();
        if (!e.rangeCount) return function () {};
        for (
          var t = document.activeElement, n = [], a = 0;
          a < e.rangeCount;
          a++
        )
          n.push(e.getRangeAt(a));
        switch (t.tagName.toUpperCase()) {
          case 'INPUT':
          case 'TEXTAREA':
            t.blur();
            break;
          default:
            t = null;
            break;
        }
        return (
          e.removeAllRanges(),
          function () {
            'Caret' === e.type && e.removeAllRanges(),
              e.rangeCount ||
                n.forEach(function (t) {
                  e.addRange(t);
                }),
              t && t.focus();
          }
        );
      };
    },
    EiQ3: function (e, t, n) {
      'use strict';
      function a(e) {
        var t = e.clientWidth,
          n = getComputedStyle(e),
          a = n.paddingLeft,
          r = n.paddingRight;
        return t - parseFloat(a) - parseFloat(r);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t['default'] = a);
    },
    F39V: function (e, t, n) {
      var a = n('NtLt');
      function r(e) {
        return a(e).replace(/\s(\w)/g, function (e, t) {
          return t.toUpperCase();
        });
      }
      e.exports = r;
    },
    HF17: function (e, t, n) {
      'use strict';
      function a(e) {
        return 'string' === typeof e;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t['default'] = a);
    },
    J1sY: function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var a in n)
                Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
          },
        r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                'value' in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })(),
        o = n('xEkU'),
        i = C(o),
        l = n('cegH'),
        c = C(l),
        s = n('q1tI'),
        u = n('17x9'),
        d = C(u),
        p = n('HF17'),
        f = C(p),
        h = n('KSAl'),
        m = C(h),
        v = n('ToH2'),
        b = C(v),
        g = n('EiQ3'),
        y = C(g),
        O = n('eYAL'),
        j = C(O),
        x = n('yXmM'),
        w = n('h27F');
      function C(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function S(e, t) {
        var n = {};
        for (var a in e)
          t.indexOf(a) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]));
        return n;
      }
      function k(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function E(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called",
          );
        return !t || ('object' !== typeof t && 'function' !== typeof t) ? e : t;
      }
      function T(e, t) {
        if ('function' !== typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t,
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      var N = (function (e) {
        function t(e) {
          var n;
          k(this, t);
          for (
            var a = arguments.length, r = Array(a > 1 ? a - 1 : 0), o = 1;
            o < a;
            o++
          )
            r[o - 1] = arguments[o];
          var i = E(
            this,
            (n = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
              n,
              [this, e].concat(r),
            ),
          );
          return (
            (i.getScrollLeft = i.getScrollLeft.bind(i)),
            (i.getScrollTop = i.getScrollTop.bind(i)),
            (i.getScrollWidth = i.getScrollWidth.bind(i)),
            (i.getScrollHeight = i.getScrollHeight.bind(i)),
            (i.getClientWidth = i.getClientWidth.bind(i)),
            (i.getClientHeight = i.getClientHeight.bind(i)),
            (i.getValues = i.getValues.bind(i)),
            (i.getThumbHorizontalWidth = i.getThumbHorizontalWidth.bind(i)),
            (i.getThumbVerticalHeight = i.getThumbVerticalHeight.bind(i)),
            (i.getScrollLeftForOffset = i.getScrollLeftForOffset.bind(i)),
            (i.getScrollTopForOffset = i.getScrollTopForOffset.bind(i)),
            (i.scrollLeft = i.scrollLeft.bind(i)),
            (i.scrollTop = i.scrollTop.bind(i)),
            (i.scrollToLeft = i.scrollToLeft.bind(i)),
            (i.scrollToTop = i.scrollToTop.bind(i)),
            (i.scrollToRight = i.scrollToRight.bind(i)),
            (i.scrollToBottom = i.scrollToBottom.bind(i)),
            (i.handleTrackMouseEnter = i.handleTrackMouseEnter.bind(i)),
            (i.handleTrackMouseLeave = i.handleTrackMouseLeave.bind(i)),
            (i.handleHorizontalTrackMouseDown =
              i.handleHorizontalTrackMouseDown.bind(i)),
            (i.handleVerticalTrackMouseDown =
              i.handleVerticalTrackMouseDown.bind(i)),
            (i.handleHorizontalThumbMouseDown =
              i.handleHorizontalThumbMouseDown.bind(i)),
            (i.handleVerticalThumbMouseDown =
              i.handleVerticalThumbMouseDown.bind(i)),
            (i.handleWindowResize = i.handleWindowResize.bind(i)),
            (i.handleScroll = i.handleScroll.bind(i)),
            (i.handleDrag = i.handleDrag.bind(i)),
            (i.handleDragEnd = i.handleDragEnd.bind(i)),
            (i.state = { didMountUniversal: !1 }),
            i
          );
        }
        return (
          T(t, e),
          r(t, [
            {
              key: 'componentDidMount',
              value: function () {
                this.addListeners(),
                  this.update(),
                  this.componentDidMountUniversal();
              },
            },
            {
              key: 'componentDidMountUniversal',
              value: function () {
                var e = this.props.universal;
                e && this.setState({ didMountUniversal: !0 });
              },
            },
            {
              key: 'componentDidUpdate',
              value: function () {
                this.update();
              },
            },
            {
              key: 'componentWillUnmount',
              value: function () {
                this.removeListeners(),
                  (0, o.cancel)(this.requestFrame),
                  clearTimeout(this.hideTracksTimeout),
                  clearInterval(this.detectScrollingInterval);
              },
            },
            {
              key: 'getScrollLeft',
              value: function () {
                return this.view ? this.view.scrollLeft : 0;
              },
            },
            {
              key: 'getScrollTop',
              value: function () {
                return this.view ? this.view.scrollTop : 0;
              },
            },
            {
              key: 'getScrollWidth',
              value: function () {
                return this.view ? this.view.scrollWidth : 0;
              },
            },
            {
              key: 'getScrollHeight',
              value: function () {
                return this.view ? this.view.scrollHeight : 0;
              },
            },
            {
              key: 'getClientWidth',
              value: function () {
                return this.view ? this.view.clientWidth : 0;
              },
            },
            {
              key: 'getClientHeight',
              value: function () {
                return this.view ? this.view.clientHeight : 0;
              },
            },
            {
              key: 'getValues',
              value: function () {
                var e = this.view || {},
                  t = e.scrollLeft,
                  n = void 0 === t ? 0 : t,
                  a = e.scrollTop,
                  r = void 0 === a ? 0 : a,
                  o = e.scrollWidth,
                  i = void 0 === o ? 0 : o,
                  l = e.scrollHeight,
                  c = void 0 === l ? 0 : l,
                  s = e.clientWidth,
                  u = void 0 === s ? 0 : s,
                  d = e.clientHeight,
                  p = void 0 === d ? 0 : d;
                return {
                  left: n / (i - u) || 0,
                  top: r / (c - p) || 0,
                  scrollLeft: n,
                  scrollTop: r,
                  scrollWidth: i,
                  scrollHeight: c,
                  clientWidth: u,
                  clientHeight: p,
                };
              },
            },
            {
              key: 'getThumbHorizontalWidth',
              value: function () {
                var e = this.props,
                  t = e.thumbSize,
                  n = e.thumbMinSize,
                  a = this.view,
                  r = a.scrollWidth,
                  o = a.clientWidth,
                  i = (0, y['default'])(this.trackHorizontal),
                  l = Math.ceil((o / r) * i);
                return i === l ? 0 : t || Math.max(l, n);
              },
            },
            {
              key: 'getThumbVerticalHeight',
              value: function () {
                var e = this.props,
                  t = e.thumbSize,
                  n = e.thumbMinSize,
                  a = this.view,
                  r = a.scrollHeight,
                  o = a.clientHeight,
                  i = (0, j['default'])(this.trackVertical),
                  l = Math.ceil((o / r) * i);
                return i === l ? 0 : t || Math.max(l, n);
              },
            },
            {
              key: 'getScrollLeftForOffset',
              value: function (e) {
                var t = this.view,
                  n = t.scrollWidth,
                  a = t.clientWidth,
                  r = (0, y['default'])(this.trackHorizontal),
                  o = this.getThumbHorizontalWidth();
                return (e / (r - o)) * (n - a);
              },
            },
            {
              key: 'getScrollTopForOffset',
              value: function (e) {
                var t = this.view,
                  n = t.scrollHeight,
                  a = t.clientHeight,
                  r = (0, j['default'])(this.trackVertical),
                  o = this.getThumbVerticalHeight();
                return (e / (r - o)) * (n - a);
              },
            },
            {
              key: 'scrollLeft',
              value: function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0;
                this.view && (this.view.scrollLeft = e);
              },
            },
            {
              key: 'scrollTop',
              value: function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 0;
                this.view && (this.view.scrollTop = e);
              },
            },
            {
              key: 'scrollToLeft',
              value: function () {
                this.view && (this.view.scrollLeft = 0);
              },
            },
            {
              key: 'scrollToTop',
              value: function () {
                this.view && (this.view.scrollTop = 0);
              },
            },
            {
              key: 'scrollToRight',
              value: function () {
                this.view && (this.view.scrollLeft = this.view.scrollWidth);
              },
            },
            {
              key: 'scrollToBottom',
              value: function () {
                this.view && (this.view.scrollTop = this.view.scrollHeight);
              },
            },
            {
              key: 'addListeners',
              value: function () {
                if ('undefined' !== typeof document && this.view) {
                  var e = this.view,
                    t = this.trackHorizontal,
                    n = this.trackVertical,
                    a = this.thumbHorizontal,
                    r = this.thumbVertical;
                  e.addEventListener('scroll', this.handleScroll),
                    (0, m['default'])() &&
                      (t.addEventListener(
                        'mouseenter',
                        this.handleTrackMouseEnter,
                      ),
                      t.addEventListener(
                        'mouseleave',
                        this.handleTrackMouseLeave,
                      ),
                      t.addEventListener(
                        'mousedown',
                        this.handleHorizontalTrackMouseDown,
                      ),
                      n.addEventListener(
                        'mouseenter',
                        this.handleTrackMouseEnter,
                      ),
                      n.addEventListener(
                        'mouseleave',
                        this.handleTrackMouseLeave,
                      ),
                      n.addEventListener(
                        'mousedown',
                        this.handleVerticalTrackMouseDown,
                      ),
                      a.addEventListener(
                        'mousedown',
                        this.handleHorizontalThumbMouseDown,
                      ),
                      r.addEventListener(
                        'mousedown',
                        this.handleVerticalThumbMouseDown,
                      ),
                      window.addEventListener(
                        'resize',
                        this.handleWindowResize,
                      ));
                }
              },
            },
            {
              key: 'removeListeners',
              value: function () {
                if ('undefined' !== typeof document && this.view) {
                  var e = this.view,
                    t = this.trackHorizontal,
                    n = this.trackVertical,
                    a = this.thumbHorizontal,
                    r = this.thumbVertical;
                  e.removeEventListener('scroll', this.handleScroll),
                    (0, m['default'])() &&
                      (t.removeEventListener(
                        'mouseenter',
                        this.handleTrackMouseEnter,
                      ),
                      t.removeEventListener(
                        'mouseleave',
                        this.handleTrackMouseLeave,
                      ),
                      t.removeEventListener(
                        'mousedown',
                        this.handleHorizontalTrackMouseDown,
                      ),
                      n.removeEventListener(
                        'mouseenter',
                        this.handleTrackMouseEnter,
                      ),
                      n.removeEventListener(
                        'mouseleave',
                        this.handleTrackMouseLeave,
                      ),
                      n.removeEventListener(
                        'mousedown',
                        this.handleVerticalTrackMouseDown,
                      ),
                      a.removeEventListener(
                        'mousedown',
                        this.handleHorizontalThumbMouseDown,
                      ),
                      r.removeEventListener(
                        'mousedown',
                        this.handleVerticalThumbMouseDown,
                      ),
                      window.removeEventListener(
                        'resize',
                        this.handleWindowResize,
                      ),
                      this.teardownDragging());
                }
              },
            },
            {
              key: 'handleScroll',
              value: function (e) {
                var t = this,
                  n = this.props,
                  a = n.onScroll,
                  r = n.onScrollFrame;
                a && a(e),
                  this.update(function (e) {
                    var n = e.scrollLeft,
                      a = e.scrollTop;
                    (t.viewScrollLeft = n), (t.viewScrollTop = a), r && r(e);
                  }),
                  this.detectScrolling();
              },
            },
            {
              key: 'handleScrollStart',
              value: function () {
                var e = this.props.onScrollStart;
                e && e(), this.handleScrollStartAutoHide();
              },
            },
            {
              key: 'handleScrollStartAutoHide',
              value: function () {
                var e = this.props.autoHide;
                e && this.showTracks();
              },
            },
            {
              key: 'handleScrollStop',
              value: function () {
                var e = this.props.onScrollStop;
                e && e(), this.handleScrollStopAutoHide();
              },
            },
            {
              key: 'handleScrollStopAutoHide',
              value: function () {
                var e = this.props.autoHide;
                e && this.hideTracks();
              },
            },
            {
              key: 'handleWindowResize',
              value: function () {
                this.update();
              },
            },
            {
              key: 'handleHorizontalTrackMouseDown',
              value: function (e) {
                e.preventDefault();
                var t = e.target,
                  n = e.clientX,
                  a = t.getBoundingClientRect(),
                  r = a.left,
                  o = this.getThumbHorizontalWidth(),
                  i = Math.abs(r - n) - o / 2;
                this.view.scrollLeft = this.getScrollLeftForOffset(i);
              },
            },
            {
              key: 'handleVerticalTrackMouseDown',
              value: function (e) {
                e.preventDefault();
                var t = e.target,
                  n = e.clientY,
                  a = t.getBoundingClientRect(),
                  r = a.top,
                  o = this.getThumbVerticalHeight(),
                  i = Math.abs(r - n) - o / 2;
                this.view.scrollTop = this.getScrollTopForOffset(i);
              },
            },
            {
              key: 'handleHorizontalThumbMouseDown',
              value: function (e) {
                e.preventDefault(), this.handleDragStart(e);
                var t = e.target,
                  n = e.clientX,
                  a = t.offsetWidth,
                  r = t.getBoundingClientRect(),
                  o = r.left;
                this.prevPageX = a - (n - o);
              },
            },
            {
              key: 'handleVerticalThumbMouseDown',
              value: function (e) {
                e.preventDefault(), this.handleDragStart(e);
                var t = e.target,
                  n = e.clientY,
                  a = t.offsetHeight,
                  r = t.getBoundingClientRect(),
                  o = r.top;
                this.prevPageY = a - (n - o);
              },
            },
            {
              key: 'setupDragging',
              value: function () {
                (0, c['default'])(document.body, x.disableSelectStyle),
                  document.addEventListener('mousemove', this.handleDrag),
                  document.addEventListener('mouseup', this.handleDragEnd),
                  (document.onselectstart = b['default']);
              },
            },
            {
              key: 'teardownDragging',
              value: function () {
                (0, c['default'])(document.body, x.disableSelectStyleReset),
                  document.removeEventListener('mousemove', this.handleDrag),
                  document.removeEventListener('mouseup', this.handleDragEnd),
                  (document.onselectstart = void 0);
              },
            },
            {
              key: 'handleDragStart',
              value: function (e) {
                (this.dragging = !0),
                  e.stopImmediatePropagation(),
                  this.setupDragging();
              },
            },
            {
              key: 'handleDrag',
              value: function (e) {
                if (this.prevPageX) {
                  var t = e.clientX,
                    n = this.trackHorizontal.getBoundingClientRect(),
                    a = n.left,
                    r = this.getThumbHorizontalWidth(),
                    o = r - this.prevPageX,
                    i = -a + t - o;
                  this.view.scrollLeft = this.getScrollLeftForOffset(i);
                }
                if (this.prevPageY) {
                  var l = e.clientY,
                    c = this.trackVertical.getBoundingClientRect(),
                    s = c.top,
                    u = this.getThumbVerticalHeight(),
                    d = u - this.prevPageY,
                    p = -s + l - d;
                  this.view.scrollTop = this.getScrollTopForOffset(p);
                }
                return !1;
              },
            },
            {
              key: 'handleDragEnd',
              value: function () {
                (this.dragging = !1),
                  (this.prevPageX = this.prevPageY = 0),
                  this.teardownDragging(),
                  this.handleDragEndAutoHide();
              },
            },
            {
              key: 'handleDragEndAutoHide',
              value: function () {
                var e = this.props.autoHide;
                e && this.hideTracks();
              },
            },
            {
              key: 'handleTrackMouseEnter',
              value: function () {
                (this.trackMouseOver = !0),
                  this.handleTrackMouseEnterAutoHide();
              },
            },
            {
              key: 'handleTrackMouseEnterAutoHide',
              value: function () {
                var e = this.props.autoHide;
                e && this.showTracks();
              },
            },
            {
              key: 'handleTrackMouseLeave',
              value: function () {
                (this.trackMouseOver = !1),
                  this.handleTrackMouseLeaveAutoHide();
              },
            },
            {
              key: 'handleTrackMouseLeaveAutoHide',
              value: function () {
                var e = this.props.autoHide;
                e && this.hideTracks();
              },
            },
            {
              key: 'showTracks',
              value: function () {
                clearTimeout(this.hideTracksTimeout),
                  (0, c['default'])(this.trackHorizontal, { opacity: 1 }),
                  (0, c['default'])(this.trackVertical, { opacity: 1 });
              },
            },
            {
              key: 'hideTracks',
              value: function () {
                var e = this;
                if (!this.dragging && !this.scrolling && !this.trackMouseOver) {
                  var t = this.props.autoHideTimeout;
                  clearTimeout(this.hideTracksTimeout),
                    (this.hideTracksTimeout = setTimeout(function () {
                      (0, c['default'])(e.trackHorizontal, { opacity: 0 }),
                        (0, c['default'])(e.trackVertical, { opacity: 0 });
                    }, t));
                }
              },
            },
            {
              key: 'detectScrolling',
              value: function () {
                var e = this;
                this.scrolling ||
                  ((this.scrolling = !0),
                  this.handleScrollStart(),
                  (this.detectScrollingInterval = setInterval(function () {
                    e.lastViewScrollLeft === e.viewScrollLeft &&
                      e.lastViewScrollTop === e.viewScrollTop &&
                      (clearInterval(e.detectScrollingInterval),
                      (e.scrolling = !1),
                      e.handleScrollStop()),
                      (e.lastViewScrollLeft = e.viewScrollLeft),
                      (e.lastViewScrollTop = e.viewScrollTop);
                  }, 100)));
              },
            },
            {
              key: 'raf',
              value: function (e) {
                var t = this;
                this.requestFrame && i['default'].cancel(this.requestFrame),
                  (this.requestFrame = (0, i['default'])(function () {
                    (t.requestFrame = void 0), e();
                  }));
              },
            },
            {
              key: 'update',
              value: function (e) {
                var t = this;
                this.raf(function () {
                  return t._update(e);
                });
              },
            },
            {
              key: '_update',
              value: function (e) {
                var t = this.props,
                  n = t.onUpdate,
                  a = t.hideTracksWhenNotNeeded,
                  r = this.getValues();
                if ((0, m['default'])()) {
                  var o = r.scrollLeft,
                    i = r.clientWidth,
                    l = r.scrollWidth,
                    s = (0, y['default'])(this.trackHorizontal),
                    u = this.getThumbHorizontalWidth(),
                    d = (o / (l - i)) * (s - u),
                    p = { width: u, transform: 'translateX(' + d + 'px)' },
                    f = r.scrollTop,
                    h = r.clientHeight,
                    v = r.scrollHeight,
                    b = (0, j['default'])(this.trackVertical),
                    g = this.getThumbVerticalHeight(),
                    O = (f / (v - h)) * (b - g),
                    x = { height: g, transform: 'translateY(' + O + 'px)' };
                  if (a) {
                    var w = { visibility: l > i ? 'visible' : 'hidden' },
                      C = { visibility: v > h ? 'visible' : 'hidden' };
                    (0, c['default'])(this.trackHorizontal, w),
                      (0, c['default'])(this.trackVertical, C);
                  }
                  (0, c['default'])(this.thumbHorizontal, p),
                    (0, c['default'])(this.thumbVertical, x);
                }
                n && n(r), 'function' === typeof e && e(r);
              },
            },
            {
              key: 'render',
              value: function () {
                var e = this,
                  t = (0, m['default'])(),
                  n = this.props,
                  r =
                    (n.onScroll,
                    n.onScrollFrame,
                    n.onScrollStart,
                    n.onScrollStop,
                    n.onUpdate,
                    n.renderView),
                  o = n.renderTrackHorizontal,
                  i = n.renderTrackVertical,
                  l = n.renderThumbHorizontal,
                  c = n.renderThumbVertical,
                  u = n.tagName,
                  d = (n.hideTracksWhenNotNeeded, n.autoHide),
                  p = (n.autoHideTimeout, n.autoHideDuration),
                  h = (n.thumbSize, n.thumbMinSize, n.universal),
                  v = n.autoHeight,
                  b = n.autoHeightMin,
                  g = n.autoHeightMax,
                  y = n.style,
                  O = n.children,
                  j = S(n, [
                    'onScroll',
                    'onScrollFrame',
                    'onScrollStart',
                    'onScrollStop',
                    'onUpdate',
                    'renderView',
                    'renderTrackHorizontal',
                    'renderTrackVertical',
                    'renderThumbHorizontal',
                    'renderThumbVertical',
                    'tagName',
                    'hideTracksWhenNotNeeded',
                    'autoHide',
                    'autoHideTimeout',
                    'autoHideDuration',
                    'thumbSize',
                    'thumbMinSize',
                    'universal',
                    'autoHeight',
                    'autoHeightMin',
                    'autoHeightMax',
                    'style',
                    'children',
                  ]),
                  w = this.state.didMountUniversal,
                  C = a(
                    {},
                    x.containerStyleDefault,
                    v &&
                      a({}, x.containerStyleAutoHeight, {
                        minHeight: b,
                        maxHeight: g,
                      }),
                    y,
                  ),
                  k = a(
                    {},
                    x.viewStyleDefault,
                    { marginRight: t ? -t : 0, marginBottom: t ? -t : 0 },
                    v &&
                      a({}, x.viewStyleAutoHeight, {
                        minHeight: (0, f['default'])(b)
                          ? 'calc(' + b + ' + ' + t + 'px)'
                          : b + t,
                        maxHeight: (0, f['default'])(g)
                          ? 'calc(' + g + ' + ' + t + 'px)'
                          : g + t,
                      }),
                    v && h && !w && { minHeight: b, maxHeight: g },
                    h && !w && x.viewStyleUniversalInitial,
                  ),
                  E = { transition: 'opacity ' + p + 'ms', opacity: 0 },
                  T = a(
                    {},
                    x.trackHorizontalStyleDefault,
                    d && E,
                    (!t || (h && !w)) && { display: 'none' },
                  ),
                  N = a(
                    {},
                    x.trackVerticalStyleDefault,
                    d && E,
                    (!t || (h && !w)) && { display: 'none' },
                  );
                return (0, s.createElement)(
                  u,
                  a({}, j, {
                    style: C,
                    ref: function (t) {
                      e.container = t;
                    },
                  }),
                  [
                    (0, s.cloneElement)(
                      r({ style: k }),
                      {
                        key: 'view',
                        ref: function (t) {
                          e.view = t;
                        },
                      },
                      O,
                    ),
                    (0, s.cloneElement)(
                      o({ style: T }),
                      {
                        key: 'trackHorizontal',
                        ref: function (t) {
                          e.trackHorizontal = t;
                        },
                      },
                      (0, s.cloneElement)(
                        l({ style: x.thumbHorizontalStyleDefault }),
                        {
                          ref: function (t) {
                            e.thumbHorizontal = t;
                          },
                        },
                      ),
                    ),
                    (0, s.cloneElement)(
                      i({ style: N }),
                      {
                        key: 'trackVertical',
                        ref: function (t) {
                          e.trackVertical = t;
                        },
                      },
                      (0, s.cloneElement)(
                        c({ style: x.thumbVerticalStyleDefault }),
                        {
                          ref: function (t) {
                            e.thumbVertical = t;
                          },
                        },
                      ),
                    ),
                  ],
                );
              },
            },
          ]),
          t
        );
      })(s.Component);
      (t['default'] = N),
        (N.propTypes = {
          onScroll: d['default'].func,
          onScrollFrame: d['default'].func,
          onScrollStart: d['default'].func,
          onScrollStop: d['default'].func,
          onUpdate: d['default'].func,
          renderView: d['default'].func,
          renderTrackHorizontal: d['default'].func,
          renderTrackVertical: d['default'].func,
          renderThumbHorizontal: d['default'].func,
          renderThumbVertical: d['default'].func,
          tagName: d['default'].string,
          thumbSize: d['default'].number,
          thumbMinSize: d['default'].number,
          hideTracksWhenNotNeeded: d['default'].bool,
          autoHide: d['default'].bool,
          autoHideTimeout: d['default'].number,
          autoHideDuration: d['default'].number,
          autoHeight: d['default'].bool,
          autoHeightMin: d['default'].oneOfType([
            d['default'].number,
            d['default'].string,
          ]),
          autoHeightMax: d['default'].oneOfType([
            d['default'].number,
            d['default'].string,
          ]),
          universal: d['default'].bool,
          style: d['default'].object,
          children: d['default'].node,
        }),
        (N.defaultProps = {
          renderView: w.renderViewDefault,
          renderTrackHorizontal: w.renderTrackHorizontalDefault,
          renderTrackVertical: w.renderTrackVerticalDefault,
          renderThumbHorizontal: w.renderThumbHorizontalDefault,
          renderThumbVertical: w.renderThumbVerticalDefault,
          tagName: 'div',
          thumbMinSize: 30,
          hideTracksWhenNotNeeded: !1,
          autoHide: !1,
          autoHideTimeout: 1e3,
          autoHideDuration: 200,
          autoHeight: !1,
          autoHeightMin: 0,
          autoHeightMax: 200,
          universal: !1,
        });
    },
    KAsB: function (e, t, n) {},
    KSAl: function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t['default'] = l);
      var a = n('cegH'),
        r = o(a);
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i = !1;
      function l() {
        if (!1 !== i) return i;
        if ('undefined' !== typeof document) {
          var e = document.createElement('div');
          (0, r['default'])(e, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar',
          }),
            document.body.appendChild(e),
            (i = e.offsetWidth - e.clientWidth),
            document.body.removeChild(e);
        } else i = 0;
        return i || 0;
      }
    },
    NtLt: function (e, t, n) {
      var a = n('3IO0');
      function r(e) {
        return a(e)
          .replace(/[\W_]+(.|$)/g, function (e, t) {
            return t ? ' ' + t : '';
          })
          .trim();
      }
      e.exports = r;
    },
    OPEp: function (e, t, n) {},
    OnYD: function (e, t, n) {},
    PUTc: function (e, t, n) {},
    SobC: function (e, t, n) {},
    ToH2: function (e, t, n) {
      'use strict';
      function a() {
        return !1;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t['default'] = a);
    },
    WgDY: function (e, t, n) {},
    YqQA: function (e, t, n) {
      'use strict';
      var a = n('tJVT'),
        r = n('zP5H'),
        o = n('q1tI');
      function i(e) {
        var t = e.primaryColor,
          n = e.textColor;
        window.less &&
          window.less.modifyVars({ '@primary-color': t, '@text-color': n });
      }
      var l = !1;
      function c(e) {
        var t = e.primaryColor,
          n = e.textColor;
        if (l) i({ primaryColor: t, textColor: n });
        else {
          var a = document.createElement('link');
          a.setAttribute('rel', 'stylesheet/less'),
            a.setAttribute('href', '/styles/components.less');
          var r = document.createElement('script');
          r.innerHTML =
            "\n      window.less = {\n        env: 'production',\n        async: true,\n        javascriptEnabled: true\n      };\n    ";
          var o = document.createElement('script');
          (o.src = '/less.4x.min.js'),
            (o.async = !0),
            (o.onload = () => {
              i({ primaryColor: t, textColor: n }), (o.onload = null);
            }),
            document.body.appendChild(a),
            document.body.appendChild(r),
            document.body.appendChild(o),
            (l = !0);
        }
      }
      var s = n('ubNI'),
        u = (e) => {
          var t = Object(o['useState'])(e ? e.userInfo : 'admin'),
            n = Object(a['a'])(t, 2),
            r = n[0],
            i = (n[1], Object(o['useState'])(!1)),
            l = Object(a['a'])(i, 2),
            u = l[0],
            d = l[1],
            p = Object(o['useState'])({ width: 200 }),
            f = Object(a['a'])(p, 2),
            h = f[0],
            m = f[1],
            v = Object(o['useState'])(e ? e.layouts : 'Sider'),
            b = Object(a['a'])(v, 2),
            g = b[0],
            y = b[1],
            O = Object(o['useState'])(!1),
            j = Object(a['a'])(O, 2),
            x = j[0],
            w = j[1],
            C = Object(o['useState'])(!1),
            S = Object(a['a'])(C, 2),
            k = S[0],
            E = S[1],
            T = Object(o['useState'])(e ? e.primaryColor : '#4e6ef2'),
            N = Object(a['a'])(T, 2),
            z = N[0],
            H = N[1],
            M = Object(o['useState'])(e ? e.textColor : '#222'),
            D = Object(a['a'])(M, 2),
            P = D[0],
            L = D[1],
            I = Object(o['useState'])(e ? e.mode : 'inline'),
            A = Object(a['a'])(I, 2),
            R = A[0],
            V = A[1],
            F = Object(o['useState'])(e ? e.appMenu : void 0),
            W = Object(a['a'])(F, 2),
            B = W[0],
            U = W[1],
            _ = Object(o['useState'])(e ? e.menuTheme : 'dark'),
            K = Object(a['a'])(_, 2),
            X = K[0],
            Y = K[1],
            q = Object(o['useState'])(!0),
            G = Object(a['a'])(q, 2),
            Q = G[0],
            Z = G[1],
            J = Object(o['useState'])(!0),
            $ = Object(a['a'])(J, 2),
            ee = $[0],
            te = $[1],
            ne = (e) => {
              te(e);
            },
            ae = (e) => {
              Z(e);
            },
            re = () => {
              d(!u), m(u ? { width: 200 } : { width: 80 });
            };
          Object(o['useEffect'])(() => {
            '#/workplace' === location.hash ||
            '#/user' === location.hash ||
            '#/apps' === location.hash
              ? (w(!1), E(!1), d(!1))
              : oe(g);
          }, [location.hash]);
          var oe = (e) => {
              if (
                (y(e),
                '#/workplace' !== location.hash && '#/user' !== location.hash)
              )
                switch (e) {
                  case 'Sider':
                    w(!0), E(!1);
                    break;
                  case 'Top':
                    w(!1), E(!1);
                    break;
                  case 'ContentSider':
                    w(!1), E(!0);
                    break;
                  default:
                    w(!1), E(!1);
                    break;
                }
            },
            ie = function (e) {
              var t = e.color,
                n = e.type;
              'primaryColor' === n ? H(t) : L(t);
            },
            le = (e) => {
              V(e);
            },
            ce = () => {
              var e = {
                  primaryColor: z,
                  textColor: P,
                  layouts: g,
                  mode: R,
                  menuTheme: X,
                },
                t = Object(s['a'])('userInformation');
              (t.theme = e), Object(s['c'])('userInformation', t);
            };
          Object(o['useEffect'])(() => {
            c({ primaryColor: z, textColor: P }), ce();
          }, [z, P]),
            Object(o['useEffect'])(() => {
              ce();
            }, [g, R, X]);
          var se = (e) => {
            Y(e);
          };
          return (
            Object(o['useEffect'])(() => {
              U(null === e || void 0 === e ? void 0 : e.appMenu);
            }, [null === e || void 0 === e ? void 0 : e.appMenu]),
            {
              layoutSider: x,
              contentSider: k,
              primaryColor: z,
              textColor: P,
              layouts: g,
              mode: R,
              appMenu: B,
              menuTheme: X,
              siderCollapsed: u,
              logoStyle: h,
              fixedHeaderStyle: Q,
              fixedSiderStyle: ee,
              userInfo: r,
              changeLayout: oe,
              changeColor: ie,
              changeMode: le,
              changeMenuTheme: se,
              changeSiderCollapsed: re,
              changFixedHeaderStyle: ae,
              changFixedSiderStyle: ne,
            }
          );
        },
        d = Object(r['a'])(u);
      t['a'] = d;
    },
    amwb: function (e, t) {
      var n = null,
        a = ['Webkit', 'Moz', 'O', 'ms'];
      e.exports = function (e) {
        n || (n = document.createElement('div'));
        var t = n.style;
        if (e in t) return e;
        for (
          var r = e.charAt(0).toUpperCase() + e.slice(1), o = a.length;
          o >= 0;
          o--
        ) {
          var i = a[o] + r;
          if (i in t) return i;
        }
        return !1;
      };
    },
    bQgK: function (e, t, n) {
      (function (t) {
        (function () {
          var n, a, r, o, i, l;
          'undefined' !== typeof performance &&
          null !== performance &&
          performance.now
            ? (e.exports = function () {
                return performance.now();
              })
            : 'undefined' !== typeof t && null !== t && t.hrtime
            ? ((e.exports = function () {
                return (n() - i) / 1e6;
              }),
              (a = t.hrtime),
              (n = function () {
                var e;
                return (e = a()), 1e9 * e[0] + e[1];
              }),
              (o = n()),
              (l = 1e9 * t.uptime()),
              (i = o - l))
            : Date.now
            ? ((e.exports = function () {
                return Date.now() - r;
              }),
              (r = Date.now()))
            : ((e.exports = function () {
                return new Date().getTime() - r;
              }),
              (r = new Date().getTime()));
        }.call(this));
      }.call(this, n('Q2Ig')));
    },
    cegH: function (e, t, n) {
      var a = n('amwb'),
        r = n('F39V'),
        o = { float: 'cssFloat' },
        i = n('z/Nc');
      function l(e, t, n) {
        var a = o[t];
        if (('undefined' === typeof a && (a = s(t)), a)) {
          if (void 0 === n) return e.style[a];
          e.style[a] = i(a, n);
        }
      }
      function c(e, t) {
        for (var n in t) t.hasOwnProperty(n) && l(e, n, t[n]);
      }
      function s(e) {
        var t = r(e),
          n = a(t);
        return (o[t] = o[e] = o[n] = n), n;
      }
      function u() {
        2 === arguments.length
          ? 'string' === typeof arguments[1]
            ? (arguments[0].style.cssText = arguments[1])
            : c(arguments[0], arguments[1])
          : l(arguments[0], arguments[1], arguments[2]);
      }
      (e.exports = u),
        (e.exports.set = u),
        (e.exports.get = function (e, t) {
          return Array.isArray(t)
            ? t.reduce(function (t, n) {
                return (t[n] = l(e, n || '')), t;
              }, {})
            : l(e, t || '');
        });
    },
    czTT: function (e, t, n) {},
    eYAL: function (e, t, n) {
      'use strict';
      function a(e) {
        var t = e.clientHeight,
          n = getComputedStyle(e),
          a = n.paddingTop,
          r = n.paddingBottom;
        return t - parseFloat(a) - parseFloat(r);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t['default'] = a);
    },
    h27F: function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var a in n)
              Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
          }
          return e;
        };
      (t.renderViewDefault = c),
        (t.renderTrackHorizontalDefault = s),
        (t.renderTrackVerticalDefault = u),
        (t.renderThumbHorizontalDefault = d),
        (t.renderThumbVerticalDefault = p);
      var r = n('q1tI'),
        o = i(r);
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l(e, t) {
        var n = {};
        for (var a in e)
          t.indexOf(a) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]));
        return n;
      }
      function c(e) {
        return o['default'].createElement('div', e);
      }
      function s(e) {
        var t = e.style,
          n = l(e, ['style']),
          r = a({}, t, { right: 2, bottom: 2, left: 2, borderRadius: 3 });
        return o['default'].createElement('div', a({ style: r }, n));
      }
      function u(e) {
        var t = e.style,
          n = l(e, ['style']),
          r = a({}, t, { right: 2, bottom: 2, top: 2, borderRadius: 3 });
        return o['default'].createElement('div', a({ style: r }, n));
      }
      function d(e) {
        var t = e.style,
          n = l(e, ['style']),
          r = a({}, t, {
            cursor: 'pointer',
            borderRadius: 'inherit',
            backgroundColor: 'rgba(0,0,0,.2)',
          });
        return o['default'].createElement('div', a({ style: r }, n));
      }
      function p(e) {
        var t = e.style,
          n = l(e, ['style']),
          r = a({}, t, {
            cursor: 'pointer',
            borderRadius: 'inherit',
            backgroundColor: 'rgba(0,0,0,.2)',
          });
        return o['default'].createElement('div', a({ style: r }, n));
      }
    },
    k82f: function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Scrollbars = void 0);
      var a = n('J1sY'),
        r = o(a);
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (t['default'] = r['default']), (t.Scrollbars = r['default']);
    },
    x54q: function (e, t, n) {},
    xEkU: function (e, t, n) {
      (function (t) {
        for (
          var a = n('bQgK'),
            r = 'undefined' === typeof window ? t : window,
            o = ['moz', 'webkit'],
            i = 'AnimationFrame',
            l = r['request' + i],
            c = r['cancel' + i] || r['cancelRequest' + i],
            s = 0;
          !l && s < o.length;
          s++
        )
          (l = r[o[s] + 'Request' + i]),
            (c = r[o[s] + 'Cancel' + i] || r[o[s] + 'CancelRequest' + i]);
        if (!l || !c) {
          var u = 0,
            d = 0,
            p = [],
            f = 1e3 / 60;
          (l = function (e) {
            if (0 === p.length) {
              var t = a(),
                n = Math.max(0, f - (t - u));
              (u = n + t),
                setTimeout(function () {
                  var e = p.slice(0);
                  p.length = 0;
                  for (var t = 0; t < e.length; t++)
                    if (!e[t].cancelled)
                      try {
                        e[t].callback(u);
                      } catch (n) {
                        setTimeout(function () {
                          throw n;
                        }, 0);
                      }
                }, Math.round(n));
            }
            return p.push({ handle: ++d, callback: e, cancelled: !1 }), d;
          }),
            (c = function (e) {
              for (var t = 0; t < p.length; t++)
                p[t].handle === e && (p[t].cancelled = !0);
            });
        }
        (e.exports = function (e) {
          return l.call(r, e);
        }),
          (e.exports.cancel = function () {
            c.apply(r, arguments);
          }),
          (e.exports.polyfill = function (e) {
            e || (e = r),
              (e.requestAnimationFrame = l),
              (e.cancelAnimationFrame = c);
          });
      }.call(this, n('IyRk')));
    },
    xcNN: function (e, t, n) {},
    yXmM: function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      (t.containerStyleDefault = {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }),
        (t.containerStyleAutoHeight = { height: 'auto' }),
        (t.viewStyleDefault = {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'scroll',
          WebkitOverflowScrolling: 'touch',
        }),
        (t.viewStyleAutoHeight = {
          position: 'relative',
          top: void 0,
          left: void 0,
          right: void 0,
          bottom: void 0,
        }),
        (t.viewStyleUniversalInitial = {
          overflow: 'hidden',
          marginRight: 0,
          marginBottom: 0,
        }),
        (t.trackHorizontalStyleDefault = { position: 'absolute', height: 6 }),
        (t.trackVerticalStyleDefault = { position: 'absolute', width: 6 }),
        (t.thumbHorizontalStyleDefault = {
          position: 'relative',
          display: 'block',
          height: '100%',
        }),
        (t.thumbVerticalStyleDefault = {
          position: 'relative',
          display: 'block',
          width: '100%',
        }),
        (t.disableSelectStyle = { userSelect: 'none' }),
        (t.disableSelectStyleReset = { userSelect: '' });
    },
    'z/Nc': function (e, t) {
      var n = {
        animationIterationCount: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridRow: !0,
        gridColumn: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        stopOpacity: !0,
        strokeDashoffset: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      };
      e.exports = function (e, t) {
        return 'number' !== typeof t || n[e] ? t : t + 'px';
      };
    },
    zk9c: function (e, t, n) {},
  },
]);
