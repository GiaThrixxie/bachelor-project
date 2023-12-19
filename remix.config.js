/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [/^react-icons/],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: {
    modules: {
      fs: true,
      os: true,
      path: true,
      url: true,
      http: true,
      https: true,
      events: true,
      zlib: true,
      stream: true,
      util: true, 
      buffer: true,
      crypto: true,
      querystring: true,
      child_process: true,
      net: true,
      tls: true,
      assert: true,
    } 
  }
};