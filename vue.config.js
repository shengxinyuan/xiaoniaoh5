module.exports = {
  devServer: {
    open: false,
    // 跨域
    proxy: {
      '/api/': {
        target: 'http://localhost:3004',
        changeOrigin: true
      }
    }
  }
}