import { $t } from "@/plugins/i18n";

export default {
  path: "/historical",
  redirect: "/historical/index",
  meta: {
    icon: "ep:calendar",
    title: $t("menus.pureHistorical"),
    rank: 1
  },
  children: [
    {
      path: "/historical/index",
      name: "Historical",
      component: () => import("@/views/historical/index.vue"),
      meta: {
        title: $t("menus.pureHistorical")
      }
    }
  ]
} satisfies RouteConfigsTable;
