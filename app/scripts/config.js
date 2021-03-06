/* jshint -W098,-W079 */
var require = {
    baseUrl: '/bower_components',
    paths: {
        main: '../scripts/main',
        app: '../scripts/app',
        appmain: '../scripts/appmain',
        appmenu: '../scripts/appmenu',
        appgames: '../scripts/appgames',
        comeuro: '../scripts/comeuro',
        contentloader: '../scripts/contentloader',
        textloader: '../scripts/textloader',
        stepmanager: '../scripts/step-manager',
        smoothscroll: '../scripts/vendor/smoothscroll',
        component: '../scripts/component',
        library: '../scripts/library',
        mixitup: 'mixitup/build/jquery.mixitup.min',
        jquery: 'jquery/dist/jquery',
        TweenMax: 'gsap/src/uncompressed/TweenMax',
        loglevel: 'loglevel/dist/loglevel.min',
        gsap: 'gsap/src/uncompressed/TweenMax',
        picturefill: 'picturefill/dist/picturefill'
    },
    shim: {
        appmain: {
            deps: [
                'TweenMax',
                'jquery',
                'textloader',
                'smoothscroll',
                'contentloader'
            ],
            exports: 'appmain'
        },
        appgames: {
            deps: [
                'TweenMax',
                'mixitup',
                'jquery'
            ],
            exports: 'appgames'
        },
        appmenu: {
            deps: [
                'TweenMax',
                'comeuro',
                'stepmanager',
                'jquery',
                'textloader',
                'contentloader'
            ],
            exports: 'appmenu'
        }
    },
    packages: [
        {
            name: 'picturefill',
            main: 'dist/picturefill.js',
            location: 'picturefill'
        }
    ]
};