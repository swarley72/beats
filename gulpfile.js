const {src, dest, task, series, watch, parallel} = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');


const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');


task('clean', () => {
  console.log(env);
  return src('dist/**/*.*', {read: false}).pipe(clean());
});

task("copy:html", () => {
  return src("src/*.html").pipe(dest("dist")).pipe(reload({stream: true}))
});

task("copy:img", () => {
  return src("src/img/**/*").pipe(dest("dist/img")).pipe(reload({stream: true}))
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/style/main.scss"
];

task('styles', () => {
  return src(styles)
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(env == "dev", autoprefixer({
      cascade: false
    })))
    .pipe(gulpif(env == "prod", gcmq()))
    .pipe(gulpif(env == "prod", cleanCSS()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest("dist/style"))
    .pipe(reload({stream: true}));
})

const libs = [
  "node_modules/jquery/dist/jquery.js"
]

task("libs", () => {
  return src(libs)
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat("libs.min.js", {newLine: ";"}))
    .pipe(gulpif(env == "prod", babel({
        presets: ['@babel/env']
    })))
    .pipe(gulpif(env == "prod",uglify()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest("dist/js"))
    .pipe(reload({stream: true}));
})

task("scripts", () => {
  return src("src/js/*.js")
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", {newLine: ";"}))
    .pipe(gulpif(env == "prod", babel({
        presets: ['@babel/env']
    })))
    .pipe(gulpif(env == "prod",uglify()))
    .pipe(gulpif(env == "dev", sourcemaps.write()))
    .pipe(dest("dist/js"))
    .pipe(reload({stream: true}));
})

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});
task("watch", () => {
  watch('./src/style/**/*.scss', series("styles"));
  watch('./src/*.html', series("copy:html"));
  watch('./src/js/*.js', series("scripts"));
  watch('./src/img/**/*', series("copy:img"));

})

task(
  "default", 
  series(
    "clean",
    parallel(
      "copy:html", 
      "copy:img", 
      "styles", 
      "scripts",
      "libs"
    ),
    parallel("watch", "server")
  )
);

task(
  "build", 
  series(
    "clean",
    parallel(
      "copy:html", 
      "copy:img", 
      "styles", 
      "scripts",
      "libs"
    ),
  )
);
