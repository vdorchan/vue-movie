module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-movie/'
    : '/',
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/sass/var.scss";`
      }
    }
  }
}