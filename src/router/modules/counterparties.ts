import { $t } from "@/plugins/i18n";

export default {
  path: "/counterparties",
  redirect: "/counterparties/index",
  meta: {
    icon: "ep:switch-filled",
    title: $t("menus.pureCounterparties"),
    rank: 2
  },
  children: [
    {
      path: "/counterparties/index",
      name: "Counterparties",
      component: () => import("@/views/counterparties/index.vue"),
      meta: {
        title: $t("menus.pureCounterparties")
      }
    }
  ]
} satisfies RouteConfigsTable;
