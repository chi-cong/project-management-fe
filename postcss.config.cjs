module.exports = {
  parser: "",
  map: false,
  plugins: [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
};
