/* jshint -W098,-W079 */
var require = {
    baseUrl: '../bower_components',
    paths: {
        main: '../scripts/main',
        app: '../scripts/app',
        eurom: '../scripts/com-euro',
        stepmanager: '../scripts/step-manager',
        mainapp: '../scripts/appmain',
        smoothscroll: '../scripts/vendor/smoothscroll',
        component: '../scripts/component',
        library: '../scripts/library',
        jquery: 'jquery/dist/jquery',
        TweenMax: 'gsap/src/uncompressed/TweenMax',
        loglevel: 'loglevel/dist/loglevel.min'
    },
    shim: {
        'mainapp': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['eurom','jquery'],
            //Once loaded, use the global 'mainapp' as the
            //module value.
            exports: 'mainapp'
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