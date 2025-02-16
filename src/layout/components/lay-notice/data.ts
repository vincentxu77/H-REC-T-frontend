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
        title: "交易完成",
        description: "诚在于心，信在于行，诚信在于心行合一。",
        datetime: "今天",
        type: "2"
      },
      {
        avatar: "",
        title: "REC已生成",
        description: "长风破浪会有时，直挂云帆济沧海。",
        datetime: "昨天",
        type: "2"
      },
      {
        avatar: "",
        title: "标题",
        description:
          "请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容",
        datetime: "时间",
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
        title: "监管通知",
        description: "请及时确认数据准确性",
        datetime: "",
        extra: "马上到期",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "版本发布",
        description: "指派XX于 2025-05-20 前完成更新并发布",
        datetime: "",
        extra: "已耗时 8 天",
        status: "warning",
        type: "3"
      },
      {
        avatar: "",
        title: "新功能开发",
        description: "开发多租户管理",
        datetime: "",
        extra: "进行中",
        type: "3"
      },
      {
        avatar: "",
        title: "任务名称",
        description: "任务需要在 2030-10-30 10:00 前启动",
        datetime: "",
        extra: "未开始",
        status: "info",
        type: "3"
      }
    ],
    emptyText: $t("status.pureNoTodo")
  }
];
