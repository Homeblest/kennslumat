var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    stylish = require('jshint-stylish');

gulp.task('default', function() {
    return gulp.src(['app/js/*.js','app/controllers/*.js','app/**/*.js', '!app/finalConcat.js'])
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
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('finalConcat.js'))
        .pipe(gulp.dest('app'))
});