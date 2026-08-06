import { onRequestPost as __api_advisory_ts_onRequestPost } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/advisory.ts"
import { onRequestPost as __api_contact_ts_onRequestPost } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/contact.ts"
import { onRequestGet as __api_health_ts_onRequestGet } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/health.ts"
import { onRequestPost as __api_office_hours_ts_onRequestPost } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/office-hours.ts"
import { onRequestPost as __api_subscribe_ts_onRequestPost } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/subscribe.ts"
import { onRequestGet as __api_unsubscribe_ts_onRequestGet } from "/Users/soniasarao/Desktop/FAI/FAI-Website/functions/api/unsubscribe.ts"

export const routes = [
    {
      routePath: "/api/advisory",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_advisory_ts_onRequestPost],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  {
      routePath: "/api/health",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_health_ts_onRequestGet],
    },
  {
      routePath: "/api/office-hours",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_office_hours_ts_onRequestPost],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_subscribe_ts_onRequestPost],
    },
  {
      routePath: "/api/unsubscribe",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_unsubscribe_ts_onRequestGet],
    },
  ]