function MtrDatepicker(a) {
    function b(a) {
        return document.getElementById(a);
    }
    function c(a, b) {
        return a ? a.querySelector(b) : null;
    }
    function d(a, b) {
        return a && b ? b.offsetTop - a.offsetTop : 0;
    }
    function e(a) {
        var b;
        if (null == a || 'object' != typeof a) return a;
        if (a instanceof Array) {
            b = [];
            for (var c = 0, d = a.length; d > c; c++) b[c] = e(a[c]);
            return b;
        }
        if (a instanceof Object) {
            b = {};
            for (var f in a) a.hasOwnProperty(f) && (b[f] = e(a[f]));
            return b;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
    function f(a, b) {
        a && (a.className.indexOf(b) > -1 || (a.className += ' ' + b));
    }
    function g(a, b) {
        a && -1 !== a.className.indexOf(b) && (a.className = a.className.replace(new RegExp(b, 'g'), ''));
    }
    function h(a) {
        return Number(a) === a && a % 1 === 0;
    }
    function i(a) {
        for (var b = a.min, c = a.max, d = a.step, e = [], f = b; c >= f; f += d) e.push(f);
        return e;
    }
    function j(a, b) {
        for (
            var c,
                d = new Date(b, a, 1),
                e = new Date(b, a + 1, 0),
                f = {
                    values: [],
                    names: [],
                    min: d.getDate(),
                    max: e.getDate(),
                    step: 1
                },
                g = d.getDate();
            g <= e.getDate();
            g++
        )
            (c = new Date(b, a, g)), f.values.push(g), (f.names[g] = o.daysNames[c.getDay()]);
        return f;
    }
    function k(a) {
        (ea = a.touches[0].clientX), (fa = a.touches[0].clientY);
    }
    function l(a, b) {
        if (ea && fa) {
            var c = a.touches[0].clientX,
                d = a.touches[0].clientY,
                e = ea - c,
                f = fa - d;
            Math.abs(e) > Math.abs(f) || b(f > 0 ? 1 : -1), (ea = null), (fa = null);
        }
    }
    function m() {
        var a = {
            isChrome: !1,
            isSafari: !1,
            isFirefox: !1
        };
        return navigator.userAgent.search('Safari') >= 0 &&
            navigator.userAgent.search('Chrome') < 0 &&
            (a.isSafari = !0), a;
    }
    var n,
        o = {
            targetElement: null,
            defaultValues: {
                hours: [],
                minutes: [],
                dates: [],
                datesNames: [],
                months: [],
                years: []
            },
            hours: {
                min: 1,
                max: 12,
                step: 1,
                maxlength: 2
            },
            minutes: {
                min: 0,
                max: 50,
                step: 10,
                maxlength: 2
            },
            months: {
                min: 0,
                max: 11,
                step: 1,
                maxlength: 2
            },
            years: {
                min: 2e3,
                max: 2030,
                step: 1,
                maxlength: 4
            },
            animations: !0,
            smartHours: !1,
            future: !1,
            validateAfter: !0,
            transitionDelay: 100,
            transitionValidationDelay: 500,
            references: {
                hours: null
            },
            monthsNames: {
                0: 'Jan',
                1: 'Feb',
                2: 'Mar',
                3: 'Apr',
                4: 'May',
                5: 'Jun',
                6: 'Jul',
                7: 'Aug',
                8: 'Sep',
                9: 'Oct',
                10: 'Nov',
                11: 'Dec'
            },
            daysNames: {
                0: 'Sun',
                1: 'Mon',
                2: 'Tue',
                3: 'Wed',
                4: 'Thu',
                5: 'Fri',
                6: 'Sat'
            }
        },
        p = {
            date: null,
            timestamp: null,
            ampm: !0
        },
        q = null,
        r = {
            all: [],
            time: [],
            date: [],
            hour: [],
            minute: [],
            ampm: [],
            day: [],
            month: [],
            year: []
        },
        s = {
            onChange: e(r),
            beforeChange: e(r),
            afterChange: e(r)
        },
        t = null,
        u = {},
        v = function(a) {
            return (q = m()), x(a)
                ? (w(a), (n = b(o.targetElement)), z(), A(), void y())
                : void console.error('Initialization of the datepicker is blocked because of erros in the config.');
        },
        w = function(a) {
            (o.targetElement = a.target), (p.date = a.timestamp
                ? new Date(a.timestamp)
                : new Date()), p.date.setSeconds(0), (p.timestamp = p.date.getTime()), (o.animations =
                void 0 !== a.animations ? a.animations : o.animations), (o.future =
                void 0 !== a.future ? a.future : o.future), (o.validateAfter =
                void 0 !== a.validateAfter ? a.validateAfter : o.validateAfter), (o.smartHours =
                void 0 !== a.smartHours ? a.smartHours : o.smartHours), (o.minutes.min =
                void 0 !== a.minutes && void 0 !== a.minutes.min
                    ? parseInt(a.minutes.min)
                    : o.minutes.min), (o.minutes.max =
                void 0 !== a.minutes && void 0 !== a.minutes.max
                    ? parseInt(a.minutes.max)
                    : o.minutes.max), (o.minutes.step =
                void 0 !== a.minutes && void 0 !== a.minutes.step
                    ? parseInt(a.minutes.step)
                    : o.minutes.step), (o.months.min =
                void 0 !== a.months && void 0 !== a.months.min ? parseInt(a.months.min) : o.months.min), (o.months.max =
                void 0 !== a.months && void 0 !== a.months.max
                    ? parseInt(a.months.max)
                    : o.months.max), (o.months.step =
                void 0 !== a.months && void 0 !== a.months.step
                    ? parseInt(a.months.step)
                    : o.months.step), (o.years.min =
                void 0 !== a.years && void 0 !== a.years.min ? parseInt(a.years.min) : o.years.min), (o.years.max =
                void 0 !== a.years && void 0 !== a.years.max ? parseInt(a.years.max) : o.years.max), (o.years.step =
                void 0 !== a.years && void 0 !== a.years.step
                    ? parseInt(a.years.step)
                    : o.years.step), (o.defaultValues.hours = i(o.hours)), (o.defaultValues.minutes = i(
                o.minutes
            )), (o.defaultValues.months = i(o.months)), (o.defaultValues.years = i(o.years));
        },
        x = function(a) {
            var c = !0;
            if (
                (
                    a.minutes &&
                        (
                            void 0 === a.minutes.min ||
                                h(a.minutes.min) ||
                                (console.error('Invalid argument: minutes.min should be a number.'), (c = !1)),
                            void 0 === a.minutes.max ||
                                h(a.minutes.max) ||
                                (console.error('Invalid argument: minutes.max should be a number.'), (c = !1)),
                            void 0 === a.minutes.step ||
                                h(a.minutes.step) ||
                                (console.error('Invalid argument: minutes.step should be a number.'), (c = !1)),
                            void 0 !== a.minutes.min &&
                                void 0 !== a.minutes.max &&
                                a.minutes.max < a.minutes.min &&
                                (
                                    console.error('Invalid argument: minutes.max should be larger than minutes.min.'),
                                    (c = !1)
                                ),
                            void 0 !== a.minutes.min &&
                                void 0 !== a.minutes.max &&
                                void 0 !== a.minutes.step &&
                                a.minutes.step > a.minutes.max - a.minutes.min &&
                                (
                                    console.error(
                                        'Invalid argument: minutes.step should be less than minutes.max-minutes.min.'
                                    ),
                                    (c = !1)
                                )
                        ),
                    !c
                )
            ) {
                for (n = b(a.target); n.firstChild; ) n.removeChild(n.firstChild);
                var d = document.createElement('div');
                f(d, 'mtr-error-message'), d.appendChild(
                    document.createTextNode('An error has occured during the initialization of the datepicker.')
                ), n.appendChild(d);
            }
            return c;
        },
        y = function() {},
        z = function(a, b) {
            (a = void 0 !== a ? a : U()), (b = void 0 !== b ? b : W());
            var c = j(a, b);
            (o.dates = {
                min: c.min,
                max: c.max,
                step: c.step,
                maxlength: 2
            }), (o.defaultValues.dates = c.values), (o.defaultValues.datesNames = c.names);
        },
        A = function() {
            for (g(n, 'mtr-datepicker'), f(n, 'mtr-datepicker'); n.firstChild; ) n.removeChild(n.firstChild);
            var a = B({
                    name: 'hours',
                    values: o.defaultValues.hours,
                    value: K()
                }),
                b = B({
                    name: 'minutes',
                    values: o.defaultValues.minutes,
                    value: M()
                }),
                c = C({
                    name: 'ampm'
                }),
                d = document.createElement('div');
            d.className = 'mtr-row';
            var e = document.createElement('div');
            (e.className = 'mtr-clearfix'), d.appendChild(a), d.appendChild(b), d.appendChild(c), n.appendChild(
                d
            ), n.appendChild(e);
            var h = B({
                    name: 'months',
                    values: o.defaultValues.months,
                    valuesNames: o.monthsNames,
                    value: U()
                }),
                i = B({
                    name: 'dates',
                    values: o.defaultValues.dates,
                    valuesNames: o.defaultValues.datesNames,
                    value: S()
                }),
                j = B({
                    name: 'years',
                    values: o.defaultValues.years,
                    value: W()
                }),
                k = document.createElement('div');
            k.className = 'mtr-row';
            var l = document.createElement('div');
            (l.className = 'mtr-clearfix'), k.appendChild(h), k.appendChild(i), k.appendChild(j), n.appendChild(
                k
            ), n.appendChild(l), Y(p.timestamp);
        },
        B = function(a) {
            function b() {
                var b = document.createElement('div');
                return (b.className = 'mtr-arrow up'), b.appendChild(
                    document.createElement('span')
                ), b.addEventListener(
                    'click',
                    function() {
                        c(q, '.mtr-input');
                        f(q, 'arrow-click'), f(p, 'mtr-active'), u[a.name] && window.clearTimeout(u[a.name]), (u[
                            a.name
                        ] = setTimeout(function() {
                            g(q, 'arrow-click'), g(p, 'mtr-active');
                        }, 1e3));
                        var b,
                            d = a.name;
                        switch (d) {
                            case 'hours':
                                b = K();
                                break;

                            case 'minutes':
                                b = M();
                                break;

                            case 'dates':
                                b = S();
                                break;

                            case 'months':
                                b = U();
                                break;

                            case 'years':
                                b = W();
                        }
                        var e = o.defaultValues[d].indexOf(b);
                        switch ((e++, e >= o.defaultValues[d].length && (e = 0), d)) {
                            case 'hours':
                                var h = o.defaultValues[d][e];
                                Q() && 12 !== h && (h += 12), J(h);
                                break;

                            case 'minutes':
                                L(o.defaultValues[d][e]);
                                break;

                            case 'dates':
                                R(o.defaultValues[d][e]);
                                break;

                            case 'months':
                                T(o.defaultValues[d][e]);
                                break;

                            case 'years':
                                V(o.defaultValues[d][e]);
                        }
                    },
                    !1
                ), b;
            }
            function d() {
                var b = document.createElement('div');
                return (b.className = 'mtr-arrow down'), b.appendChild(
                    document.createElement('span')
                ), b.addEventListener(
                    'click',
                    function(b) {
                        c(q, '.mtr-input');
                        f(q, 'arrow-click'), f(p, 'mtr-active'), u[a.name] && window.clearTimeout(u[a.name]), (u[
                            a.name
                        ] = setTimeout(function() {
                            g(q, 'arrow-click'), g(p, 'mtr-active');
                        }, 1e3));
                        var d,
                            e = a.name;
                        switch (e) {
                            case 'hours':
                                d = K();
                                break;

                            case 'minutes':
                                d = M();
                                break;

                            case 'dates':
                                d = S();
                                break;

                            case 'months':
                                d = U();
                                break;

                            case 'years':
                                d = W();
                        }
                        var h = o.defaultValues[e].indexOf(d);
                        switch ((h--, 0 > h && (h = o.defaultValues[e].length - 1), e)) {
                            case 'hours':
                                var i = o.defaultValues[e][h];
                                Q() && 12 !== i && (i += 12), J(i);
                                break;

                            case 'minutes':
                                L(o.defaultValues[e][h]);
                                break;

                            case 'dates':
                                R(o.defaultValues[e][h]);
                                break;

                            case 'months':
                                T(o.defaultValues[e][h]);
                                break;

                            case 'years':
                                V(o.defaultValues[e][h]);
                        }
                    },
                    !1
                ), b;
            }
            function e() {
                var b = document.createElement('input');
                return (b.value = a.value), (b.type = 'text'), (b.className = 'mtr-input ' + a.name), (b.style.display =
                    'none'), b.addEventListener(
                    'blur',
                    function(c) {
                        function d() {
                            if (n) {
                                var d = b.value,
                                    e = b.getAttribute('data-old-value');
                                if (c.target.className.indexOf('arrow-click') > -1)
                                    return void g(c.target, 'arrow-click');
                                if ((b.className.indexOf('months') > -1 && d--, G(a.name, d) === !1))
                                    return (b.value = e), void b.focus();
                                var f = a.name.substring(0, a.name.length - 1);
                                if (('dates' === a.name && (f = 'day'), o.future && !H(f, d, e)))
                                    return 'months' === a.name && e++, (b.value = e), void b.focus();
                                switch (((b.style.display = 'none'), a.name)) {
                                    case 'hours':
                                        J(d);
                                        break;

                                    case 'minutes':
                                        L(d);
                                        break;

                                    case 'dates':
                                        R(d);
                                        break;

                                    case 'months':
                                        T(d);
                                        break;

                                    case 'years':
                                        V(d);
                                }
                            }
                        }
                        setTimeout(function() {
                            d();
                        }, 500);
                    },
                    !1
                ), b.addEventListener(
                    'wheel ',
                    function(c) {
                        c.preventDefault(), c.stopPropagation();
                        var d,
                            e = (c.target, c.wheelDeltaY ? c.wheelDeltaY : -1 * c.deltaY, parseInt(b.value)),
                            f = o[a.name].min,
                            g = o[a.name].max,
                            h = o[a.name].step;
                        return 'months' === a.name && (f++, g++), (d =
                            direction > 0 ? (g > e ? e + h : f) : e > f ? e - h : g), (b.value = d), !1;
                    },
                    !1
                ), b;
            }
            function h(b) {
                var d = D(a);
                return d.addEventListener(
                    'touchstart',
                    function(a) {
                        k(a);
                    },
                    !1
                ), d.addEventListener(
                    'touchmove',
                    function(a) {
                        l(a, function(a) {
                            var b,
                                e = d.parentElement.parentElement;
                            (b = a > 0 ? c(e, '.mtr-arrow.up') : c(e, '.mtr-arrow.down')), b.click();
                        });
                    },
                    !1
                ), d;
            }
            var i = document.createElement('div');
            (i.className = 'mtr-input-slider'), (o.references[a.name] = o.targetElement + '-input-' + a.name), (i.id =
                o.references[a.name]);
            var j = b(),
                m = d(),
                p = document.createElement('div');
            p.className = 'mtr-content';
            var q = e(),
                r = h(q);
            return i.appendChild(j), p.appendChild(q), p.appendChild(r), i.appendChild(p), i.appendChild(m), i;
        },
        C = function(a) {
            function b(a, b, c) {
                var d = document.createElement('div'),
                    e = document.createElement('label'),
                    f = document.createElement('input'),
                    g = o.targetElement + '-radio-' + a + '-' + c,
                    h = document.createElement('span');
                (h.className = 'value'), h.appendChild(document.createTextNode(c));
                var i = document.createElement('span');
                return (i.className = 'radio'), e.setAttribute('for', g), e.appendChild(h), e.appendChild(
                    i
                ), (f.className = 'mtr-input '), (f.type =
                    'radio'), (f.name = a), (f.id = g), (f.value = b), d.appendChild(f), d.appendChild(
                    e
                ), f.addEventListener(
                    'change',
                    function(a) {
                        var c = N(b);
                        return !c && o.future ? (N(!b), a.preventDefault(), a.stopPropagation(), !1) : void 0;
                    },
                    !1
                ), d;
            }
            var c = document.createElement('div');
            (c.className = 'mtr-input-radio'), (o.references[a.name] = o.targetElement + '-input-' + a.name), (c.id =
                o.references[a.name]);
            var d = document.createElement('form');
            d.name = o.references[a.name];
            var e = b('ampm', 1, 'AM'),
                f = b('ampm', 0, 'PM');
            return d.appendChild(e), d.appendChild(f), (d.ampm.value = P() ? '1' : '0'), c.appendChild(d), c;
        },
        D = function(a) {
            var b = document.createElement('div');
            return (b.className = 'mtr-values'), a.values.forEach(function(c) {
                var d = 'months' === a.name ? c + 1 : c,
                    e = document.createElement('div');
                (e.className = 'mtr-default-value-holder'), e.setAttribute('data-value', c);
                var f = document.createElement('div');
                if (
                    (
                        (f.className = 'mtr-default-value'),
                        f.setAttribute('data-value', c),
                        'minutes' === a.name && 0 === c
                            ? f.appendChild(document.createTextNode('00'))
                            : f.appendChild(document.createTextNode(d)),
                        e.appendChild(f),
                        a.valuesNames
                    )
                ) {
                    var g = document.createElement('div');
                    (g.className = 'mtr-default-value-name'), g.appendChild(
                        document.createTextNode(a.valuesNames[c])
                    ), (f.className += ' has-name'), e.appendChild(g);
                }
                b.appendChild(e);
            }), b.addEventListener(
                'click',
                function() {
                    var a = b.parentElement,
                        d = c(a, '.mtr-input');
                    d.className.indexOf('months') > -1 && (d.value = parseInt(d.value) + 1), (d.style.display =
                        'block'), d.focus();
                },
                !1
            ), b.addEventListener(
                'wheel',
                function(a) {
                    if ((a.preventDefault(), a.stopPropagation(), t)) return !1;
                    var b,
                        d = a.target,
                        e = d.parentElement.parentElement.parentElement.parentElement,
                        f = (c(e, '.mtr-values'), c(e, '.mtr-input'), a.wheelDeltaY ? a.wheelDeltaY : -1 * a.deltaY);
                    return (b = f > 0 ? c(e, '.mtr-arrow.up') : c(e, '.mtr-arrow.down')), (t = setTimeout(function() {
                        I();
                    }, 100)), b.click(), !1;
                },
                !1
            ), b.addEventListener(
                'touchstart',
                function(a) {
                    return a.preventDefault(), a.stopPropagation(), !1;
                },
                !1
            ), b.addEventListener(
                'touchmove',
                function(a) {
                    return a.preventDefault(), a.stopPropagation(), !1;
                },
                !1
            ), b;
        },
        E = function(a, d) {
            var e = b(a),
                f = c(e, '.mtr-content'),
                g = c(f, '.mtr-values');
            g.parentNode.removeChild(g);
            var h = D({
                name: d.name,
                values: d.values,
                valuesNames: d.valuesNames
            });
            f.appendChild(h);
        },
        F = function(a, b) {
            (a = void 0 !== a ? a : U()), (b = void 0 !== b ? b : W()), z(a, b), E(o.references.dates, {
                name: 'dates',
                values: o.defaultValues.dates,
                valuesNames: o.defaultValues.datesNames
            });
            var c = o.defaultValues.dates[o.defaultValues.dates.length - 1],
                d = S();
            d > c && R(c);
        },
        G = function(a, b) {
            return (b = parseInt(b)), o.defaultValues[a].indexOf(b) > -1 ? !0 : !1;
        },
        H = function(a, b, c) {
            if (o.future === !1) return !0;
            var d = new Date(),
                e = new Date(p.date.getTime());
            switch (a) {
                case 'hour':
                    var f = P();
                    f && 12 === b && (b = 0), e.setHours(b);
                    break;

                case 'minute':
                    e.setMinutes(b);
                    break;

                case 'ampm':
                    var g = e.getHours(),
                        h = g;
                    b != c &&
                        (1 == b && g > 12
                            ? (h = g - 12)
                            : 1 == b && 12 == g
                              ? (h = 0)
                              : 0 == b && 12 > g ? (h = g + 12) : 0 == b && 12 == g && (h = 12)), e.setHours(h);
                    break;

                case 'day':
                    e.setDate(b);
                    break;

                case 'month':
                    e.setMonth(b);
                    break;

                case 'year':
                    e.setFullYear(b);
            }
            return d.setSeconds(0), d.setMilliseconds(0), e.setSeconds(0), e.setMilliseconds(0), e.getTime() <
            d.getTime()
                ? !1
                : !0;
        },
        I = function() {
            t = null;
        },
        J = function(a, b) {
            var c = p.date.getHours(),
                d = H('hour', a, c),
                e = P();
            if ((o.smartHours && 12 === a && e && (d = !0), !o.validateAfter && !d)) return void _(o.references.hours);
            ba('hour', 'beforeChange', a, c);
            var f = a;
            a > 12 && (a -= 12), $(o.references.hours, a, b), o.validateAfter && !d
                ? (
                      _(o.references.hours),
                      setTimeout(function() {
                          c > 12 &&
                              (c -= 12), $(o.references.hours, c, b), ba('hour', 'onChange', a, c), ba('hour', 'afterChange', a, c);
                      }, o.transitionValidationDelay)
                  )
                : (
                      (p.timestamp = p.date.setHours(f)),
                      o.smartHours && 12 === f && e
                          ? ((p.timestamp = p.date.setHours(12)), N(!1))
                          : !o.smartHours && 12 === f && e
                            ? (p.timestamp = p.date.setHours(0))
                            : (p.timestamp = p.date.setHours(f)),
                      f > 12 && ((f -= 12), N(!1)),
                      ba('hour', 'onChange', a, c),
                      ba('hour', 'afterChange', a, c)
                  );
        },
        K = function() {
            var a = p.date.getHours(),
                b = P();
            return 12 === a || 0 === a ? 12 : 12 > a && b ? a : a - 12;
        },
        L = function(a, b) {
            var c = p.date.getMinutes(),
                d = H('minute', a, c);
            if (!o.validateAfter && !d) return void _(o.references.minutes);
            ba('minute', 'beforeChange', a, c);
            o.defaultValues.minutes;
            $(o.references.minutes, a, b), o.validateAfter && !d
                ? (
                      _(o.references.minutes),
                      setTimeout(function() {
                          $(
                              o.references.minutes,
                              c,
                              b
                          ), ba('minute', 'onChange', a, c), ba('minute', 'afterChange', a, c);
                      }, o.transitionValidationDelay)
                  )
                : (
                      (p.timestamp = p.date.setMinutes(a)),
                      ba('minute', 'onChange', a, c),
                      ba('minute', 'afterChange', a, c)
                  );
        },
        M = function() {
            return p.date.getMinutes();
        },
        N = function(a) {
            var b = P();
            if (!H('ampm', a, b))
                return aa(o.references.ampm, a), q.isSafari &&
                    setTimeout(function() {
                        O(o.references.ampm, b);
                    }, 10), !1;
            ba('ampm', 'beforeChange', a, b);
            var c = p.date.getHours(),
                d = (K(), P());
            return d !== a &&
                (1 == a && c >= 12
                    ? ((c -= 12), (p.timestamp = p.date.setHours(c)))
                    : 0 == a && 12 > c && ((c += 12), (p.timestamp = p.date.setHours(c)))), (p.ampm = a), O(
                o.references.ampm,
                a
            ), ba('ampm', 'onChange', a, b), ba('ampm', 'afterChange', a, b), !0;
        },
        O = function(a, d) {
            var e = b(a),
                f = c(e, 'form');
            f.ampm.value = d ? '1' : '0';
            var g = d ? 'AM' : 'PM',
                h = c(f, 'input.mtr-input[type="radio"][value="1"]'),
                i = c(f, 'input.mtr-input[type="radio"][value="0"]'),
                j = c(f, 'label[for="' + o.targetElement + '-radio-ampm-' + g + '"]');
            c(j, 'checkbox');
            d
                ? (h.setAttribute('checked', ''), (h.checked = !0), i.removeAttribute('checked'))
                : (i.setAttribute('checked', ''), (i.checked = !0), h.removeAttribute('checked'));
        },
        P = function() {
            var a = p.date.getHours();
            return a >= 0 && 11 >= a ? !0 : !1;
        },
        Q = function() {
            return !P();
        },
        R = function(a, b) {
            var c = p.date.getDate(),
                d = H('day', a, c);
            return o.validateAfter || d
                ? (
                      ba('day', 'beforeChange', a, c),
                      $(o.references.dates, a, b),
                      void (o.validateAfter && !d
                          ? (
                                _(o.references.dates),
                                setTimeout(function() {
                                    $(
                                        o.references.dates,
                                        c,
                                        b
                                    ), ba('day', 'onChange', a, c), ba('day', 'afterChange', a, c);
                                }, o.transitionValidationDelay)
                            )
                          : (
                                (p.timestamp = p.date.setDate(a)),
                                ba('day', 'onChange', a, c),
                                ba('day', 'afterChange', a, c)
                            ))
                  )
                : void _(o.references.dates);
        },
        S = function() {
            return p.date.getDate();
        },
        T = function(a, b) {
            var c = p.date.getMonth(),
                d = H('month', a, c);
            return o.validateAfter || d
                ? (
                      ba('month', 'beforeChange', a, c),
                      $(o.references.months, a, b),
                      void (o.validateAfter && !d
                          ? (
                                _(o.references.months),
                                setTimeout(function() {
                                    $(
                                        o.references.months,
                                        c,
                                        b
                                    ), ba('month', 'onChange', a, c), ba('month', 'afterChange', a, c);
                                }, o.transitionValidationDelay)
                            )
                          : (
                                (p.timestamp = p.date.setMonth(a)),
                                F(a),
                                ba('month', 'onChange', a, c),
                                ba('month', 'afterChange', a, c)
                            ))
                  )
                : void _(o.references.months);
        },
        U = function() {
            return p.date.getMonth();
        },
        V = function(a, b) {
            var c = p.date.getFullYear(),
                d = H('year', a, c);
            return o.validateAfter || d
                ? (
                      ba('year', 'beforeChange', a, c),
                      F(void 0, a),
                      $(o.references.years, a, b),
                      void (o.validateAfter && !d
                          ? (
                                _(o.references.years),
                                setTimeout(function() {
                                    $(
                                        o.references.years,
                                        c,
                                        b
                                    ), ba('year', 'onChange', a, c), ba('year', 'afterChange', a, c);
                                }, o.transitionValidationDelay)
                            )
                          : (
                                (p.timestamp = p.date.setFullYear(a)),
                                ba('year', 'onChange', a, c),
                                ba('year', 'afterChange', a, c)
                            ))
                  )
                : void _(o.references.years);
        },
        W = function() {
            return p.date.getFullYear();
        },
        X = function() {
            return K() + ':' + M() + ' ' + (P() ? 'AM' : 'PM');
        },
        Y = function(a) {
            var b = da(a);
            (p.date = new Date(b)), (p.timestamp = b);
            var c = p.date.getHours(),
                d = M(),
                e = c >= 0 && 12 > c ? !0 : !1,
                f = S(),
                g = U(),
                h = W();
            (c = 0 === c ? 12 : c), J(c), L(d), T(g), V(h), R(f), N(e);
        },
        Z = function() {
            return p.date.getTime();
        },
        $ = function(a, e, f) {
            var g = b(a);
            if (((f = f || !1), g)) {
                var h = c(g, '.mtr-content'),
                    i = c(g, '.mtr-values .mtr-default-value[data-value="' + e + '"]'),
                    j = c(g, '.mtr-arrow.up'),
                    k = c(g, '.mtr-input');
                (scrollTo = d(h, i) + j.clientHeight), (k.value = e), k.setAttribute(
                    'data-old-value',
                    e
                ), o.animations === !1 || f ? i.scrollIntoView() : ca(h, scrollTo, o.transitionDelay);
            }
        },
        _ = function(a) {
            var d = b(a),
                e = c(d, '.mtr-content');
            f(e, 'mtr-error'), setTimeout(function() {
                g(e, 'mtr-error');
            }, o.transitionValidationDelay + 300);
        },
        aa = function(a, d) {
            'boolean' == typeof d && (d = d === !0 ? 1 : 0);
            var e = b(a),
                h = c(e, '.mtr-input[value="' + d + '"]');
            f(h, 'mtr-error'), setTimeout(function() {
                g(h, 'mtr-error');
            }, o.transitionValidationDelay + 300);
        },
        ba = function(a, b, c, d) {
            var e = function(b) {
                b(a, c, d);
            };
            switch ((
                s[b][a].forEach(function(a) {
                    e(a);
                }),
                s[b].all.forEach(function(a) {
                    e(a);
                }),
                a
            )) {
                case 'hour':
                case 'minute':
                case 'ampm':
                    s[b].time.forEach(function(a) {
                        e(a);
                    });
                    break;

                case 'day':
                case 'month':
                case 'year':
                    s[b].date.forEach(function(a) {
                        e(a);
                    });
            }
        },
        ca = function(a, b, c) {
            if (((b = Math.round(b)), (c = Math.round(c)), !(0 > c))) {
                if (0 === c) return void (a.scrollTop = b);
                var d = Date.now(),
                    e = d + c,
                    f = a.scrollTop,
                    g = b - f,
                    h = function(a, b, c) {
                        if (a >= c) return 0;
                        if (c >= b) return 1;
                        var d = (c - a) / (b - a);
                        return d * d * (3 - 2 * d);
                    },
                    i = a.scrollTop,
                    j = function() {
                        if (a.scrollTop == i) {
                            var b = Date.now(),
                                c = h(d, e, b),
                                k = Math.round(f + g * c);
                            (a.scrollTop = k), b >= e ||
                                ((a.scrollTop !== i || a.scrollTop === k) &&
                                    (
                                        (i = a.scrollTop),
                                        setTimeout(function() {
                                            j();
                                        }, 0)
                                    ));
                        }
                    };
                setTimeout(function() {
                    j();
                }, 0);
            }
        },
        da = function(a) {
            var b = 60 * o.minutes.step * 1e3,
                c = 0;
            return o.minutes.step > 1 && (c = (b - a % b) % a), a + c;
        },
        ea = null,
        fa = null,
        ga = function() {
            return p.date.toDateString();
        },
        ha = function() {
            return p.date.toGMTString();
        },
        ia = function() {
            return p.date.toISOString();
        },
        ja = function() {
            return p.date.toLocaleDateString();
        },
        ka = function() {
            return p.date.toLocaleString();
        },
        la = function() {
            return p.date.toLocaleTimeString();
        },
        ma = function() {
            return p.date.toString();
        },
        na = function() {
            return p.date.toTimeString();
        },
        oa = function() {
            return p.date.toUTCString();
        },
        pa = function(a) {
            function b(a, b, c) {
                var d = '#%#',
                    e = new RegExp(b + '(?!' + d + ')', 'g');
                return (a = a.replace(e, c + d));
            }
            function c(a) {
                return 9 >= a ? '0' + a : a;
            }
            function d(a, b) {
                return 12 === a ? (b ? 0 : 12) : b ? a : a + 12;
            }
            var e = K(),
                f = M(),
                g = P(),
                h = S(),
                i = U() + 1,
                j = W();
            return (a = b(a, 'DD', c(h))), (a = b(a, 'D', h)), (a = b(a, 'YYYY', j)), (a = b(
                a,
                'YY',
                j.toString().substr(2)
            )), (a = b(a, 'Y', j)), (a = b(a, 'HH', c(d(e, g)))), (a = b(a, 'hh', c(e))), (a = b(
                a,
                'H',
                d(e, g)
            )), (a = b(a, 'h', e)), (a = b(a, 'mm', c(f))), (a = b(a, 'm', M())), (a = b(
                a,
                'a',
                g ? 'am' : 'pm'
            )), (a = b(a, 'A', g ? 'AM' : 'PM')), (a = b(a, 'MMM', o.monthsNames[i - 1])), (a = b(
                a,
                'MM',
                c(i)
            )), (a = b(a, 'M', i)), (a = a.split('#%#').join(''));
        },
        qa = function(a, b) {
            s.onChange[a].push(b);
        },
        ra = function(a, b) {
            s.beforeChange[a].push(b);
        },
        sa = function(a, b) {
            s.afterChange[a].push(b);
        };
    (this.init = v), (this.setConfig = w), (this.getFullTime = X), (this.getTimestamp = Z), (this.setHours = J), (this.setMinutes = L), (this.setAmPm = N), (this.setDate = R), (this.setMonth = T), (this.setYear = V), (this.setTimestamp = Y), (this.values = p), (this.toDateString = ga), (this.toGMTString = ha), (this.toISOString = ia), (this.toLocaleDateString = ja), (this.toLocaleString = ka), (this.toLocaleTimeString = la), (this.toString = ma), (this.toTimeString = na), (this.toUTCString = oa), (this.format = pa), (this.onChange = qa), (this.beforeChange = ra), (this.afterChange = sa), v(
        a
    );
}
