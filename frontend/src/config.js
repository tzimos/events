export const config = {
  HOST: process.env.HOST,
  api: process.env.API_BASE_URL,
  JWToken: "JWToken",
  JWTokenRefreshKey: "JWTokenRefreshKey",
  pageTitle: {
    login: "Login",
  },
  routePath: {
    login: "/",
    events: "/events"
  },
  resources: {
    getToken: "token/",
    refreshToken: "token/refresh/",
  }
}