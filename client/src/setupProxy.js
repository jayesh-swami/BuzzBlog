const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/image",
    createProxyMiddleware({
      target: "https://api.cloudinary.com/v1_1/dr7paxhu5",
      changeOrigin: true,
    })
  );
};
