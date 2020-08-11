export const config = {
  HOST: process.env.HOST,
  api: process.env.API_BASE_URL,
  PROXY_HOST: process.env.PROXY_HOST,
  JWToken: "JWToken",
  JWTokenRefreshKey: "JWTokenRefreshKey",
  pageTitle: {
    login: "Login",
    events: "Events",
    eventTickets: "Tickets",
  },
  routePath: {
    login: "/",
    events: "/events",
    eventTickets: "/event-tickets"
  },
  resources: {
    getToken: "token/",
    refreshToken: "token/refresh/",
    eventsList: "events/",
    createEvent: "events/",
    eventTickets: "tickets/event/{}/",
    redeemTicket: "tickets/redeem/{}/",
    downloadNonRedeemedTickets: "filehandler/export/non-redeemed-tickets/",
    bulkCreateTickets: "tickets/bulk-create/",
  }
}