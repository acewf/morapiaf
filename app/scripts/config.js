/* jshint -W098,-W079 */
var require = {
    baseUrl: '../bower_components',
    paths: {
        main: '../scripts/main',
        app: '../scripts/app',
        appmenu: '../scripts/appmenu',
        eurom: '../scripts/com-euro',
        stepmanager: '../scripts/step-manager',
        appmain: '../scripts/appmain',
        smoothscroll: '../scripts/vendor/smoothscroll',
        component: '../scripts/component',
        library: '../scripts/library',
        jquery: 'jquery/dist/jquery',
        TweenMax: 'gsap/src/uncompressed/TweenMax',
        loglevel: 'loglevel/dist/loglevel.min',
        gsap: 'gsap/src/uncompressed/TweenMax',
        picturefill: 'picturefill/dist/picturefill'
    },
    shim: {
        appmain: {
            deps: [
                'eurom',
                'TweenMax',
                'jquery'
            ],
            exports: 'appmain'
        },
        appmenu: {
            deps: [
                'eurom',
                'TweenMax',
                'jquery'
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