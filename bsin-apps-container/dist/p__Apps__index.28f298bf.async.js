(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [5],
  {
    '83Z/': function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, 'default', function () {
          return u;
        });
      t('14J3');
      var c = t('BMrR'),
        a = (t('jCWc'), t('kPKH')),
        s = (t('IzEo'), t('bx4M')),
        j = t('tJVT'),
        r = t('q1tI'),
        i = t.n(r),
        l = t('9kvl'),
        b = t('nKUr');
      function u() {
        var e = i.a.useState(!0),
          n = Object(j['a'])(e, 2),
          t = n[0],
          r = (n[1], i.a.useState(!0)),
          u = Object(j['a'])(r, 2),
          h = u[0];
        u[1];
        return Object(b['jsx'])('div', {
          children: Object(b['jsxs'])(c['a'], {
            children: [
              Object(b['jsx'])(a['a'], {
                span: 12,
                children: Object(b['jsx'])(s['a'], {
                  style: { minHeight: '88vh' },
                  children: t
                    ? Object(b['jsx'])(l['b'], { name: 'app2', url: '/home' })
                    : null,
                }),
              }),
              Object(b['jsx'])(a['a'], {
                span: 12,
                children: Object(b['jsx'])(s['a'], {
                  style: { minHeight: '88vh' },
                  children: h
                    ? Object(b['jsx'])(l['b'], { name: 'app1', url: '/home' })
                    : null,
                }),
              }),
            ],
          }),
        });
      }
    },
  },
]);
