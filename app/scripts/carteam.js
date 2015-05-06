function foo() {
    carMove(carObj, 1);
    var e = -161,
        t = 0,
        i = 55,
        n = Math.floor(carObj.pos.x) + e,
        o = Math.floor(carObj.pos.y) + t,
        s = n - i,
        a = o - i,
        r = scoutDom.style;
    if (r.left = s + "px", r.top = a + "px", $(dbg).html(r.left + " " + a + " "), scoutDomsh.style.left = s - 5 + "px", scoutDomsh.style.top = a - 1 + "px", scoutDomsh2.style.left = s - 28 + "px", scoutDomsh2.style.top = a - 8 + "px", carObj.lights) {
        var s = n - 47,
            a = o - 140;
        scoutDomLights.style.left = s + "px", scoutDomLights.style.top = a + "px"
    }
    dbg && $(dbg).html(carObj.moveIndex), setTimeout("foo()", 1)
}

function beginAll() {
    carInit(carObj), foo(), window.onscroll = function() {
        carCheckWindowPos(carObj)
    }, carCheckWindowPos(carObj)
}

function carInit(e) {
    scoutDom = document.getElementById("car"), scoutDomsh = document.getElementById("carshadow"), scoutDomsh2 = document.getElementById("carshadow2"), scoutDomLights = document.getElementById("carlights"), e.dom = $("#car"), e.domLand = $("#land"), e.movePoints = window.rallyMovePoints, e.movePointsCount = e.movePoints.length, e.moveIndex = 0, carCheckWindowPos(e), scoutIEDetected && (e.dom.ieBeginSw = e.dom.width(), e.dom.ieBeginSh = e.dom.height())
}

function carLights(e, t) {
    e.lights != t && (e.lights = t, t || (scoutDomLights.style.top = "-500px"))
}

function carCheckLights(e) {
    e.moveIndex >= 32 && e.moveIndex <= 39 ? carLights(e, 1) : e.moveIndex >= 55 && e.moveIndex <= 62 ? carLights(e, 1) : carLights(e, 0)
}

function carMoveTo(e) {
    var t = Math.round(e.scrollTop - e.pos.y),
        i = Math.round(e.scrollTop + e.scrollWh - e.pos.y),
        n = 0;
    if (t > 150 && (n = 1), -250 > i && (n = -1), n) {
        e.moveIndex += n;
        var o = e.movePoints[e.moveIndex],
            s = e.movePoints[e.moveIndex + n];
        e.pos.x = o.x, e.pos.y = o.y;
        var a = s.x - o.x,
            r = s.y - o.y,
            l = vecSize(a, r),
            c = {
                x: a / l,
                y: r / l
            };
        e.vec.x = c.x, e.vec.y = c.y, e.vec = vecNorm(e.vec.x, e.vec.y)
    }
}

function carMove(e, t) {
    carUpdateAffinity(e), carMoveTo(e, e.aimIndex);
    var i = e.movePoints[e.moveIndex];
    e.stopSignal && (i = e.movePoints[e.moveIndex + e.moveCourse]), i || (i = e.movePoints[e.moveIndex]);
    var n = i.x - e.pos.x,
        o = i.y - e.pos.y,
        s = vecSize(n, o),
        a = {
            x: n / s,
            y: o / s
        };
    if (e.stopSignal || (e.vel += .1, e.vel > 6 && (e.vel = 6)), e.stopSignal && (e.vel *= .9, e.vel < 0 && (e.vel = 0)), s > 2) {
        var r = 0,
            l = .021;
        if (e.stopSignal) r = l * Math.max(0, e.vel);
        else {
            var c = e.vec.x - a.x,
                d = e.vec.y - a.y,
                u = vecSize(c, d);
            1 > u && (u = 1), Math.max(u, e.vel), r = l * Math.max(1, e.vel), r > 1 && (r = 1), 0 > r && (r = 0)
        }
        e.vec.x = e.vec.x * (1 - r) + a.x * r, e.vec.y = e.vec.y * (1 - r) + a.y * r, e.vec = vecNorm(e.vec.x, e.vec.y), e.angle = computeAngle(e.vec.x, e.vec.y), cssRotate($(scoutDomsh2), -e.angle), cssRotate($(scoutDomsh), -e.angle), cssRotate(e.dom, -e.angle), e.lights && cssRotate($(scoutDomLights), -e.angle)
    }
    e.pos.x += e.vec.x * e.vel * t, e.pos.y += e.vec.y * e.vel * t
}

function carAffinityLen(e) {
    var t = e.movePoints[e.moveIndex],
        i = t.x - e.pos.x,
        n = t.y - e.pos.y,
        o = vecSize(i, n);
    return o
}

function carAffinitySwitchLen(e) {
    var t = e.rad * e.vel;
    return t < e.rad && (t = e.rad), t > 2 * e.rad && (t = 2 * e.rad), t
}

function carSetOut(e) {
    e.stopSignal = 0;
    var t = carAffinityLen(e),
        i = carAffinitySwitchLen(e);
    i > t && carAffinitySwitch(e)
}

function carAffinitySwitch(e) {
    e.aimIndex == e.moveIndex ? e.stopSignal = 1 : (carCheckMarkDetect(e), carCheckLights(e), e.moveIndex += e.moveCourse, $("#scoutDbg").html("c.moveIndex " + e.moveIndex)), e.moveIndex < 0 && e.moveIndex < 0, e.moveIndex >= e.movePointsCount && (e.moveIndex = e.movePointsCount - 1)
}

function carUpdateAffinity(e) {
    var t = carAffinityLen(e),
        i = carAffinitySwitchLen(e);
    i > t && carAffinitySwitch(e)
}

function carApplyNewAim(e, t) {
    e.moveCourse = t >= e.moveIndex ? 1 : -1;
    var i = e.aimIndex;
    e.aimIndex = t, e.moveCourse > 0 && e.aimIndex >= e.movePointsCount - 7 && (e.aimIndex = e.movePointsCount - 1), e.moveCourse < 0 && e.aimIndex <= 9 && (e.aimIndex = 0), i != t && carSetOut(e)
}

function getScrollTop() {
    if ("undefined" != typeof pageYOffset) return pageYOffset;
    var e = document.body,
        t = document.documentElement;
    return t = t.clientHeight ? t : e, t.scrollTop
}

function carCheckWindowPos(e) {
    var t = getScrollTop();
    t || (t = 0);
    var i = window.innerHeight;
    i || (i = document.documentElement.clientHeight), i || (i = 500), e.scrollTop = t, e.scrollBot = t + i, e.scrollWh = i, e.windowSh = i, t += i / 2, e.aimIndex;
    for (var n = e.aimIndex, o = 0, s = 0; s < e.movePoints.length - 1; s++) {
        var a = e.movePoints[s].y,
            r = e.movePoints[s + 1].y;
        if (t >= a && r >= t) {
            n = s, o = t;
            break
        }
    }
    var l = o - e.prevScrollTop,
        c = n - e.aimIndex;
    1 != e.aimIndex && 0 != e.aimIndex && 0 >= l * c || (e.prevScrollTop = o, carApplyNewAim(e, n, o))
}

function computeAngle(e, t) {
    var i = 180 * Math.atan2(e, t) / Math.PI;
    return i
}

function cssRotate(e, t) {
    scoutIEDetected || e.css({
        "-webkit-transform": "rotate(" + t + "deg)",
        "-moz-transform": "rotate(" + t + "deg)",
        "-ms-transform": "rotate(" + t + "deg)",
        "-o-transform": "rotate(" + t + "deg)",
        transform: "rotate(" + t + "deg)"
    }), scoutIEDetected && ieCssRotation(e, t)
}

function getInternetExplorerVersion() {
    var e = 111;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var t = navigator.userAgent,
            i = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        null != i.exec(t) && (e = parseFloat(RegExp.$1))
    }
    return e
}

function ieCssRotation(e, t) {
    var i = Math.PI / 180,
        n = t * i,
        o = Math.sin(n),
        s = Math.cos(n);
    e.css({
        filter: "progid:DXImageTransform.Microsoft.Matrix(M11=" + s + ", M12=" + -o + ", M21=" + o + ", M22=" + s + ', SizingMethod="auto expand")'
    });
    var a = e.ieBeginSw,
        r = e.ieBeginSh,
        l = e.width(),
        c = e.height();
    e.css({
        "margin-left": -Math.round((l - a) / 2),
        "margin-top": -Math.round((c - r) / 2)
    })
}

function vecNorm(e, t) {
    var i = 1 / Math.sqrt(e * e + t * t);
    return {
        x: e * i,
        y: t * i
    }
}

function vecSize(e, t) {
    return Math.sqrt(e * e + t * t)
}

function interpolate(e, t, i, n, o) {
    return (e * ((2 - e) * e - 1) * t + (e * e * (3 * e - 5) + 2) * i + e * ((4 - 3 * e) * e + 1) * n + (e - 1) * e * e * o) / 2
}

function carCheckMarkDetect(e) {
    for (var t = 0; 2 >= t; t++) {
        var i = e.moveIndex + t * e.moveCourse;
        if (!(0 > i)) {
            var n = window.scoutCheckPoints[i];
            if (n) {
                if (i == checkmarkOpenedIndex) break;
                $(n).mousedown(), checkmarkOpenedIndex = i;
                break
            }
        }
    }
}

function scoutParseCheckMarks() {
    window.scoutCheckPoints = [];
    var e = $(".checkmark"),
        t = window.rallyMovePoints;
    e.each(function() {
        var e = $(this).offset().left,
            i = $(this).offset().top,
            n = 0;
        for (var o in t) {
            var s = vecSize(t[o].x - e, t[o].y - i);
            if (n || (n = s + 1), s >= n && 400 > s) {
                window.scoutCheckPoints[o - 1] = this;
                break
            }
            n = s
        }
    })
}

function pop(e) {
    var t = $(e).closest(".pop").find(".pop"),
        i = t.data("pop-sw"),
        n = t.data("pop-sh");
    i || (i = 400), n || (n = 400), t.modal({
        overlayClose: !0,
        minWidth: i,
        maxWidth: i,
        minHeight: n,
        maxHeight: n
    })
}

function getScrollTop2() {
    if ("undefined" != typeof pageYOffset) return pageYOffset;
    var e = document.body,
        t = document.documentElement;
    return t = t.clientHeight ? t : e, t.scrollTop
}

function pop2(e) {
    var t = $("<div class='popOverlay' style='z-index: 26; cursor: pointer; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.0);'> </div>");
    t.click(function() {
        pop2close()
    }), $("body").append(t);
    var i = $(e).closest(".pop").find(".pop");
    i = i.clone(), i.appendTo("body"), pop2view = i;
    var n = i.innerWidth();
    n || (n = 400);
    var o = i.innerHeight();
    o || (o = 300), $(document).height();
    var s = $(window).width(),
        a = $(window).height(),
        r = s / 2 - n / 2,
        l = a / 2 - o / 2,
        c = getScrollTop2() + 90;
    o + 90 > a ? i.css({
        "z-index": 17,
        position: "absolute",
        top: c + "px",
        left: r + "px",
        "background-color": "#fff",
        "box-shadow": "0px 0px 207px 0px rgba(0, 0, 0, 0.75)"
    }) : i.css({
        "z-index": 17,
        position: "fixed",
        top: l + "px",
        left: r + "px",
        zIndex: 31,
        "background-color": "#fff",
        "box-shadow": "0px 0px 207px 0px rgba(0, 0, 0, 0.75)"
    }), i.show()
}

function pop2close() {
    $(".popOverlay").remove(), pop2view && pop2view.remove(), pop2view = 0
}

function mainTimerUpdate(e) {
    var t = $("#mainTimer"),
        i = t.find(".day"),
        n = t.find(".hour"),
        o = t.find(".min"),
        s = t.find(".sec"),
        a = t.find(".days_name");
    if (e) {
        if (!e.foundItem) return a.html(""), i.html("<br/> Сезон завершён"), n.html(""), o.html(""), s.html(""), t.find(".name").html(""), t.find(".league").html(""), t.find(".flag").hide(), t.find(".cherez").hide(), void 0;
        var r = e.day - 10 * Math.floor(e.day / 10);
        "10" == e.day || "11" == e.day || "12" == e.day || "13" == e.day || "14" == e.day ? a.html("дней") : 1 == r ? a.html("день") : 2 == r || 3 == r || 4 == r ? a.html("дня") : a.html("дней"), i.html(e.day), n.html(mainTimerNumToStr(e.hour)), o.html(mainTimerNumToStr(e.min)), s.html(mainTimerNumToStr(e.sec)), t.find(".name").html(e.name), t.find(".league").html(e.league), t.find(".flag").attr("src", e.foundItem.icon)
    }
    var l = i.html() || 0,
        c = n.html() || 0,
        d = o.html() || 0,
        u = s.html() || 0;
    --u < 0 && (u = 59, --d < 0 && (d = 59, --c < 0 && (c = 23, --l < 0 && (l = 0, c = 0, d = 0, u = 0), i.html(l)), n.html(mainTimerNumToStr(c))), o.html(mainTimerNumToStr(d))), s.html(mainTimerNumToStr(u))
}

function mainTimerParseTime(e) {
    var t = e.match(/^\s*(\d+)[^A-zА-я]*([A-zА-я]+).*(\d\d)\s*$/);
    if (!t) return 0;
    var i = 1 * t[1],
        n = t[2],
        o = 1 * t[3] + 2e3;
    return n = mainTimerMonthNameToIndex(n), new Date(o, n, i)
}

function mainTimerReadLaunchTime() {
    $dataEl = $("#mainTimer");
    var e;
    return $dataEl.data("min-icon") && (e = {
        icon: $dataEl.data("min-icon")
    }), {
        days: 1e3 * $dataEl.data("min-days"),
        league: $dataEl.data("min-league"),
        name: $dataEl.data("min-name"),
        foundItem: e
    }
}

function mainTimerNumToStr(e) {
    return e > 9 ? e : "0" + e
}

function mainTimerMonthNameToIndex(e) {
    if (e) {
        e = e.substr(0, 3).toLowerCase();
        var t = [];
        return t.jan = 0, t.feb = 1, t.mar = 2, t.apr = 3, t.may = 4, t.jun = 5, t.jul = 6, t.aug = 7, t.sep = 8, t.oct = 9, t.nov = 10, t.dec = 11, t.янв = 0, t.фев = 1, t.мар = 2, t.апр = 3, t.май = 4, t.июн = 5, t.июл = 6, t.авг = 7, t.сен = 8, t.окт = 9, t.ноя = 10, t.дек = 11, t[e]
    }
}

function j7sliderInit(e) {
    var t = {};
    t.dom = e, t.files = [], t.index = 0, t.place = e.data("j7slider-place"), t.slidesInfo = window.a1fotos, t.domFillBar = 0, t.domSlideBar = 0, window.mainSlider = t;
    var i = [];
    for (var n in t.slidesInfo.index) {
        t.slidesInfo.index[n].f;
        for (var o in t.slidesInfo.index[n].index) {
            var s = t.slidesInfo.index[n].index[o].f,
                a = t.slidesInfo.index[n].index[o].thumb,
                r = t.slidesInfo.index[n].index[o].youtube,
                l = t.slidesInfo.index[n].index[o].comment;
            i.push(s), r && (r = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + r + '" frameborder="0" allowfullscreen></iframe>'), t.files.push({
                file: s,
                comment: l,
                youtube: r,
                thumb: a
            })
        }
    }
    t.count = t.files.length, t.end = t.files.length - 1, e.height() || e.height(200);
    var c = .8 * e.height();
    e.append("<table width='100%' height='89%' border=0>     <td width='15%' align=center            > <a> <img class='1' alt='' /> </a>         <td width='70%' align=center            > <a> <img class='2' alt='' /> </a> <br/> <div class='4'></div> <div class='2' style='max-height: 52px; overflow: hidden'></div>             <td width='15%' align=center            > <a> <img class='3' alt='' /> </a>             </table>");
    var d = [],
        u = [];
    t.slidesInfo.index.length - 1;
    var h = 0;
    for (var f in t.slidesInfo.index) {
        var p = t.slidesInfo.index[f].f;
        h = p;
        var m = t.slidesInfo.index[f].index;
        m = m ? 90 * m.length / t.count : 5, 5 > m && (m = 5), m += "%", d.push("<td width='" + m + "'>" + p + "</td>"), u.push("<td>&nbsp; l</td>")
    }
    h--, d.push("<td width='30px' align=right>" + h + "&nbsp;</td>"), u.push("<td align=right>l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"), d = d.join(""), u = u.join(""), e.append("<table class='_beacons w100' style='margin-bottom:0px; margin-left:1px;'>" + d + "<tr>" + u + "</table>"), e.append("<div id='_sensbar2'><div id='_fill2'></div></div>"), t.domFillBar = e.find("._fill").eq(0), t.domSlideBar = e.find("._sensbar").eq(0), t.domSensBar = e.find("._slidebar").eq(0);
    var g = e.find("img.1").attr("src", "/assets/ajax-loader-ef510dbe646a8a91be55f3f6dfb79efc.gif"),
        v = e.find("img.2").attr("src", "/assets/ajax-loader-ef510dbe646a8a91be55f3f6dfb79efc.gif"),
        E = e.find("img.3").attr("src", "/assets/ajax-loader-ef510dbe646a8a91be55f3f6dfb79efc.gif");
    return v.css({
        "max-height": c
    }), t.dom.find("td.1"), t.dom.find("td.2"), t.dom.find("td.3"), g.click(function() {
        j7sliderShowNext(t, -1)
    }), v.click(function() {
        j7sliderShowNext(t, 1)
    }), E.click(function() {
        j7sliderShowNext(t, 1)
    }), $.each(i, function(e, t) {
        var i = $("<img />").data("src", t).hide();
        animpics.append(i)
    }), j7sliderShowNext(t, 0), t
}

function j7sliderShowNext(e, t, i, n) {
    function o() {
        h.hide(0, function() {}), f.hide(0, function() {}), l.youtube ? m.attr("src", "") : m.attr("src", l.file), t > 0 && p.attr("src", r.file), g.attr("src", c.file), l.youtube ? m.hide() : m.show(), i || (j7sliderShowNextRecursion = 1, j7sliderSliderUpdate(e), j7sliderShowNextRecursion = 0)
    }
    if (!j7sliderShowNextRecursion) {
        if (e.index, i) {
            if (Math.ceil(e.index) == Math.ceil(n)) return;
            e.index = n
        } else e.index += t;
        e.index < 0 && (e.index = e.end), e.index > e.end && (e.index = 0);
        var s = e.index - 1,
            a = e.index + 1;
        0 > s && (s = e.end), a > e.end && (a = 0);
        var r = e.files[s],
            l = e.files[e.index],
            c = e.files[a];
        r = r || {
            file: "",
            html: ""
        }, l = l || {
            file: "",
            html: ""
        }, c = c || {
            file: "",
            html: ""
        };
        var d = e.dom.find("div.2"),
            u = e.dom.find("div.4");
        d.html(""), u.html(""), l.youtube && u.append(l.youtube), l.comment && d.append(l.comment);
        var h, f, p = e.dom.find("img.1"),
            m = e.dom.find("img.2"),
            g = e.dom.find("img.3");
        f = animpics.find("img:eq(" + (t > 0 ? s : a) + ")").css({
            "z-index": 21 + parseInt(100 * ((t > 0 ? s : e.end - a) / e.end))
        }).hide(), h = animpics.find("img:eq(" + e.index + ")").css({
            "z-index": 21 + parseInt(100 * ((0 > t ? s : e.end - a) / e.end))
        }).hide(), h.attr("src", h.data("src")), f.attr("src", f.data("src"));
        var v = new Image;
        v.onload = function() {
            var e = 1;
            v.height > 387 && (e = 387 / v.height), v.width * e > 557 && (e = 557 / v.width);
            var i = (v.width - 6) * e,
                n = (v.height - 6) * e,
                s = null,
                s = m.offset(),
                a = (m.position(), (m.height() - n) / 2),
                l = 557 > i ? (557 - i) / 2 : m.width() < 557 ? (m.width() - 557) / 2 : 0,
                d = null,
                u = null,
                E = null,
                T = null,
                C = null,
                b = null;
            if (0 >= t ? (T = p, C = g, p.attr("src", r.file)) : (T = g, C = p, g.attr("src", c.file)), d = T.width(), b = C.width(), u = T.height(), E = T.offset(), !(E.top && E.left && s.top && s.left && C)) return o(), void 0;
            m.hide();
            var I = !1;
            h.show().css({
                border: "3px solid #fff",
                position: "absolute",
                top: E.top,
                left: E.left,
                width: d,
                height: u
            }).animate({
                top: s.top + a,
                left: s.left + l,
                width: i,
                height: n,
                avoidTransforms: !0
            }, 500, function() {
                $(this).hide(), I && o(), I = !0
            }), f.show().css({
                border: "3px solid #fff",
                position: "absolute",
                top: s.top,
                left: s.left,
                width: m.width(),
                height: m.height()
            }).animate({
                top: C.offset().top + (C.height() - m.height() * (b / m.width())) / 2,
                left: C.offset().left,
                width: b,
                height: m.height() * (b / m.width()),
                avoidTransforms: !0
            }, 500, function() {
                $(this).hide(), I && o(), I = !0
            })
        }, v.src = l.file
    }
}

function j7sliderSliderUpdate(e, t, i) {
    var n = e.index / e.end;
    t && (n = i), window.jquery_slider || (window.jquery_slider = $("#_fill2")), window.jquery_slider.slider({
        range: "min",
        value: 100 * n
    })
}

function j7sliderSliderOnClick(e, t) {
    t -= e.domSlideBar.offset().left, 0 > t && (t = 0);
    var i = t / e.domSlideBar.width();
    i > 1 && (i = 1), e.domFillBar.width(t), i = Math.ceil(i * e.end), j7sliderShowNext(e, 0, 1, i)
}
var carObj = {
        pos: {
            x: 457,
            y: 40
        },
        vec: {
            x: 0,
            y: 1
        },
        vel: 2,
        rad: 40,
        dom: 0,
        domsh: 0,
        domlights: 0,
        lights: 0,
        movePoints: 0,
        movePointsCount: 0,
        moveIndex: 1,
        moveCourse: 0,
        aimIndex: 1,
        stopSignal: 0,
        prevScrollTop: 0,
        domLand: 0,
        windowSh: 1111
    },
    counter = 0,
    scoutDom = 0,
    scoutDomsh = 0,
    scoutDomsh2 = 0,
    scoutDomLights = 0,
    scoutIEDetected = getInternetExplorerVersion() < 9;
$(document).on("click11", ".land", function(e) {
    carObj.aim.x = e.pageX, carObj.aim.y = e.pageY, trackAddPoint(e.pageX, e.pageY), trackSave("../../trajectory-new.js")
});
var checkmarkOpenedIndex = -1;
window.rallyMovePoints = [{
    x: 457,
    y: 126
}, {
    x: 457,
    y: 146
}, {
    x: 489,
    y: 196
}, {
    x: 559,
    y: 221
}, {
    x: 652,
    y: 231
}, {
    x: 763,
    y: 234
}, {
    x: 885,
    y: 230
}, {
    x: 1033,
    y: 242
}, {
    x: 1062,
    y: 289
}, {
    x: 1083,
    y: 371
}, {
    x: 1091,
    y: 455
}, {
    x: 1069,
    y: 569
}, {
    x: 1019,
    y: 641
}, {
    x: 954,
    y: 675
}, {
    x: 876,
    y: 687
}, {
    x: 773,
    y: 690
}, {
    x: 683,
    y: 693
}, {
    x: 614,
    y: 706
}, {
    x: 569,
    y: 733
}, {
    x: 524,
    y: 786
}, {
    x: 497,
    y: 849
}, {
    x: 479,
    y: 922
}, {
    x: 479,
    y: 998
}, {
    x: 493,
    y: 1071
}, {
    x: 535,
    y: 1132
}, {
    x: 604,
    y: 1188
}, {
    x: 682,
    y: 1218
}, {
    x: 774,
    y: 1226
}, {
    x: 870,
    y: 1220
}, {
    x: 973,
    y: 1207
}, {
    x: 1071,
    y: 1239
}, {
    x: 1071,
    y: 1306
}, {
    x: 1082,
    y: 1411
}, {
    x: 1091,
    y: 1526
}, {
    x: 1088,
    y: 1607
}, {
    x: 1063,
    y: 1689
}, {
    x: 1014,
    y: 1745
}, {
    x: 960,
    y: 1781
}, {
    x: 873,
    y: 1821
}, {
    x: 779,
    y: 1852
}, {
    x: 685,
    y: 1871
}, {
    x: 622,
    y: 1907
}, {
    x: 584,
    y: 1967
}, {
    x: 556,
    y: 2055
}, {
    x: 570,
    y: 2134
}, {
    x: 604,
    y: 2217
}, {
    x: 681,
    y: 2269
}, {
    x: 783,
    y: 2290
}, {
    x: 879,
    y: 2289
}, {
    x: 997,
    y: 2298
}, {
    x: 1065,
    y: 2324
}, {
    x: 1130,
    y: 2360
}, {
    x: 1143,
    y: 2421
}, {
    x: 1150,
    y: 2493
}, {
    x: 1148,
    y: 2574
}, {
    x: 1125,
    y: 2646
}, {
    x: 1090,
    y: 2699
}, {
    x: 1030,
    y: 2739
}, {
    x: 967,
    y: 2754
}, {
    x: 859,
    y: 2760
}, {
    x: 760,
    y: 2762
}, {
    x: 685,
    y: 2766
}, {
    x: 613,
    y: 2800
}, {
    x: 568,
    y: 2842
}, {
    x: 523,
    y: 2907
}, {
    x: 517,
    y: 3013
}, {
    x: 515,
    y: 3113
}, {
    x: 518,
    y: 3233
}, {
    x: 516,
    y: 3345
}, {
    x: 519,
    y: 3435
}, {
    x: 514,
    y: 3537
}, {
    x: 510,
    y: 3605
}, {
    x: 507,
    y: 3684
}, {
    x: 506,
    y: 3770
}, {
    x: 510,
    y: 3879
}, {
    x: 510,
    y: 3930
}, {
    x: 510,
    y: 3960
}, {
    x: 510,
    y: 3979
}, {
    x: 510,
    y: 4010
}], $(function() {
    $(document).on("click", '#cap a[href^="#"]', function(e) {
        e.preventDefault();
        var t = $(this.hash),
            i = parseInt(t.css("top")) - 140;
        return 0 > i && (i = 0), i || (i = 0), jQuery("html, body").animate({
            scrollTop: i
        }, "slow"), !1
    })
}), close = new Image, close.src = "/assets/close-f8313956418b37cd3bd996897b3f17df.png";
var pop2view = 0;
window.mainTimer = {}, window.mainTimer.launchTime = {}, $(document).ready(function() {
    var e = new Date,
        t = mainTimerReadLaunchTime(),
        i = Math.round((t.days - e) / 864e5);
    mainTimerUpdate({
        day: i,
        hour: 24 - e.getHours(),
        min: 60 - e.getMinutes(),
        sec: 60 - e.getSeconds(),
        name: t.name,
        league: t.league,
        foundItem: t.foundItem
    }), t.foundItem && setInterval("mainTimerUpdate()", 1e3)
}), $(document).ready(function() {
    j7sliderInit($(".j7slider").eq(0));
    var e = 0;
    $("#_fill2").slider({
        range: "min",
        value: 0,
        change: function(t, i) {
            var n = i.value,
                o = e > n ? -1 : 1;
            e = n, n /= 100;
            var s = Math.ceil(n * window.mainSlider.end);
            j7sliderShowNext(window.mainSlider, o, 1, s)
        },
        stop: function() {}
    })
});
var animpics = $("<div />");
$("body").append(animpics);
var j7sliderShowNextRecursion = 0;
$(document).on("mousedown", ".checkmark", function() {
    window.mainCheckmarkShowIndex || (window.mainCheckmarkShowIndex = 0);
    var e = window.mainSlider;
    if (e && e.files && e.files[0]) {
        for (window.mainCheckmarkShowIndex++, window.mainCheckmarkShowIndex < 0 && (window.mainCheckmarkShowIndex = 0), window.mainCheckmarkShowIndex > e.end && (window.mainCheckmarkShowIndex = 0); !e.files[window.mainCheckmarkShowIndex].file;)
            if (window.mainCheckmarkShowIndex++, !e.files[window.mainCheckmarkShowIndex]) {
                window.mainCheckmarkShowIndex = 0;
                break
            }
        var t = $(this).parent("s").find("img.checkpic");
        if (e.files[window.mainCheckmarkShowIndex]) {
            var i = e.files[window.mainCheckmarkShowIndex].thumb,
                n = i;
            t.attr("src", n)
        }
        var o = $(this).parent("s").find(".fade"),
            s = o.data("mainFadeoutCountdown");
        return s && clearTimeout(s), o.fadeIn(200), s = setTimeout(function() {
            o.fadeOut(600)
        }, 3e3), o.data("mainFadeoutCountdown", s), !1
    }
}), $(document).ready(function() {
    navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || $("#land").css("background", "#fff url('/assets/land-265460d88aad6104a2d8186e282de606.jpg') no-repeat"), $(".scroll_wrap").each(function() {
        initscroll($(this))
    }), $("#sched ul.tabBar").each(function() {
        $(this).find("li").each(function() {
            $(this).click(function() {
                $(".scroll_wrap").each(function() {
                    initscroll($(this), {
                        reloadType: "resize"
                    })
                })
            })
        })
    }), $("ul.tabBar").each(function() {
        $(this).find("li").each(function(e) {
            $(this).click(function() {
                $(this).addClass("tabShow").siblings().removeClass("tabShow").parents(".tabArea").find(".tabView").eq(e).fadeIn(150).siblings(".tabView").hide()
            })
        }), $(this).find("li:first").click()
    }), $("#footer a.pixel").mouseover(function() {
        $(this).parents("#footer").find("a.icon").fadeIn(200)
    }), $("#footer").mouseleave(function() {
        $(this).find("a.icon").fadeOut(200)
    }), scoutParseCheckMarks(), setTimeout("beginAll()", 400)
});