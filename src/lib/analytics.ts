/** Analytics facade. Configure via VITE_YANDEX_METRIKA_ID and VITE_GA_MEASUREMENT_ID. */
export type AnalyticsEvent =
  | "hero_cta_click"
  | "case_open"
  | "service_click"
  | "form_start"
  | "form_submit"
  | "telegram_click"
  | "phone_click"
  | "final_cta_click";

type Params = Record<string, string | number | boolean | undefined>;
const METRIKA_ID = import.meta.env["VITE_YANDEX_METRIKA_ID"] as string | undefined;
const GA_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    ym?: (id: string | number, action: string, event: string, params?: Params) => void;
    gtag?: (command: string, event: string, params?: Params) => void;
    dataLayer?: Params[];
  };
  if (METRIKA_ID && typeof w.ym === "function") w.ym(METRIKA_ID, "reachGoal", event, params);
  if (GA_ID && typeof w.gtag === "function") w.gtag("event", event, params);
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
  if (import.meta.env.DEV) console.debug("[analytics]", event, params);
}