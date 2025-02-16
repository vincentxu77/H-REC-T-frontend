import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/market",
  meta: {
    icon: "ep:trend-charts",
    title: $t("menus.pureMarket"),
    rank: 0
  },
  children: [
    {
      path: "/market",
      name: "Market",
      component: () => import("@/views/market/index.vue"),
      meta: {
        title: $t("menus.pureMarket")
      }
    }
  ]
} satisfies RouteConfigsTable;
