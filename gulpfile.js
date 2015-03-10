var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    stylish = require('jshint-stylish'),
    karma = require('karma').server;

var srcFiles = ['app/js/*.js', 'app/controllers/*.js', 'app/**/*.js', '!app/finalConcat.js', '!app/tests/*.js'];

gulp.task('lint', function() {
    return gulp.src(srcFiles)
        .pipe(jshint({
            curly: true,
            immed: true,
            newcap: true,
            noarg: true,
            sub: true,
            boss: true,
            eqnull: true,
            node: true,
            undef: true,
            globals: {
                _: false,
                jQuery: false,
                angular: false,
                moment: false,
                console: false,
                $: false,
                evalApp: true
            }
        }))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
});

gulp.task('wrap', function() {
    return gulp.src(srcFiles)
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(concat('finalConcat.js'))
        .pipe(gulp.dest('app'))
});

/**
 * Run test once and exit
 */
gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default',['lint', 'wrap', 'test'], function() {

});