const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const es = require("event-stream");

exports.default = function() {
  return es.merge(
    src("src/x.js")
      .pipe(uglify())
      .pipe(rename({ extname: ".min.js" })),
    src("src/x.js")
  ).pipe(dest("dist/"));
}