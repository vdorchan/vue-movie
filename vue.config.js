module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/movie/'
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