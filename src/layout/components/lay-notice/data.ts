import { $t } from "@/plugins/i18n";

export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  emptyText: string;
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: $t("status.pureNotify"),
    list: [],
    emptyText: $t("status.pureNoNotify")
  },
  {
    key: "2",
    name: $t("status.pureMessage"),
    list: [
      {
        avatar: "",
        title: "交易成功通知",
        description:
          "您的EUA Dec-24期货交易已成功，成交价格65.23欧元/吨，成交数量100手。",
        datetime: "刚刚",
        type: "2"
      },
      {
        avatar: "",
        title: "CCER交易提醒",
        description:
          "您的CCER-12M-01挂单已成交，成交价格310元/吨，成交数量25手。",
        datetime: "10分钟前",
        type: "2"
      },
      {
        avatar: "",
        title: "系统维护通知",
        description:
          "系统将于2024-03-20 22:00-次日02:00进行例行维护，维护期间暂停交易服务，请做好相关安排。",
        datetime: "30分钟前",
        type: "2"
      }
    ],
    emptyText: $t("status.pureNoMessage")
  },
  {
    key: "3",
    name: $t("status.pureTodo"),
    list: [
      {
        avatar: "",
        title: "碳排放核查提醒",
        description: "请及时提交2023年度碳排放数据核查报告",
        datetime: "",
        extra: "剩余3天",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "配额清缴通知",
        description: "2023年度碳排放配额清缴截止日期：2024-06-30",
        datetime: "",
        extra: "剩余90天",
        status: "warning",
        type: "3"
      },
      {
        avatar: "",
        title: "交易资格审核",
        description: "您的交易资格申请正在审核中",
        datetime: "",
        extra: "处理中",
        type: "3"
      },
      {
        avatar: "",
        title: "开户确认",
        description: "请补充提交企业营业执照等开户所需材料",
        datetime: "",
        extra: "待处理",
        status: "info",
        type: "3"
      }
    ],
    emptyText: $t("status.pureNoTodo")
  }
];
