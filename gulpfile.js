var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/*
 * Builds the Jekyll site by running the `jekyll build` command in a child process.
 * This task is the foundation for rebuilding the site in subsequent tasks.
 */
gulp.task('jekyll-build', function (done) {
  return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/*
 * Rebuilds the Jekyll site and reloads the browser using BrowserSync.
 * This task depends on the 'jekyll-build' task to ensure the site is rebuilt before reloading.
 */
gulp.task('jekyll-rebuild', gulp.series(['jekyll-build'], function (done) {
  browserSync.reload();
  done();
}));

/*
 * Builds the Jekyll site and launches BrowserSync for live-reloading during development.
 * After the site is built, the server is started at the '_site' directory, which contains
 * the output of the Jekyll build.
 */
gulp.task('browser-sync', gulp.series(['jekyll-build'], function(done) {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
  done();
}));

/*
 * Compiles Sass files into CSS, minifies the resulting CSS using csso,
 * and outputs the final file to the 'assets/css/' directory. Error handling
 * is provided by plumber.
 */
gulp.task('sass', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(plumber()) // Prevents pipe breaking on errors
    .pipe(sass()) // Compile Sass to CSS
    .pipe(csso()) // Minify CSS
    .pipe(gulp.dest('assets/css/')); // Output to assets/css/
});

/*
 * Copies font files (ttf, woff, woff2) from 'src/fonts/' to the 'assets/fonts/'
 * directory. This task ensures that fonts are available in the correct directory
 * for use in the site.
 */
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
    .pipe(plumber()) // Prevents pipe breaking on errors
    .pipe(gulp.dest('assets/fonts/')); // Output to assets/fonts/
});

/*
 * Minifies image files (jpg, png, gif) in the 'src/img/' directory, optimizing
 * them for faster loading. The optimized images are saved to the 'assets/img/'
 * directory.
 */
gulp.task('imagemin', function() {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(plumber()) // Prevents pipe breaking on errors
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })) // Optimize images
    .pipe(gulp.dest('assets/img/')); // Output to assets/img/
});

/*
 * Concatenates and minifies JavaScript files from the 'src/js/' directory into a
 * single 'main.js' file. This is then placed in the 'assets/js/' directory.
 * Errors are handled with plumber.
 */
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber()) // Prevents pipe breaking on errors
    .pipe(concat('main.js')) // Concatenate JS files into 'main.js'
    .pipe(uglify()) // Minify the concatenated JS
    .pipe(gulp.dest('assets/js/')); // Output to assets/js/
});

/*
 * Watches for changes in source files and triggers appropriate tasks when changes
 * occur. It watches for Sass, JavaScript, font, image, and HTML changes, triggering
 * the relevant tasks to recompile or optimize.
 */
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', gulp.series(['sass', 'jekyll-rebuild'])); // Watch Sass files
  gulp.watch('src/js/**/*.js', gulp.series(['js', 'jekyll-rebuild'])); // Watch JavaScript files
  gulp.watch('src/fonts/**/*.{tff,woff,woff2}', gulp.series(['fonts'])); // Watch font files
  gulp.watch('src/img/**/*.{jpg,png,gif}', gulp.series(['imagemin'])); // Watch image files
  gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], gulp.series(['jekyll-rebuild'])); // Watch HTML files
});

/*
 * The default task, which runs when `gulp` is executed without any specific task.
 * This runs JavaScript and Sass tasks, followed by the fonts, image optimization,
 * browser-sync, and watch tasks.
 */
gulp.task('default', gulp.series(['js', 'sass', 'fonts', 'browser-sync', 'watch']));
