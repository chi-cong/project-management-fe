module.exports = {
  parser: "",
  map: false,
  plugins: [
    require("postcss-mixins"),
    require("autoprefixer"),
    require("postcss-nested"),
    require("postcss-simple-vars"),
    require("postcss-import"),
  ],
};
