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
    name: $t("status.marketDynamics"),
    list: [
      {
        avatar: "",
        title: "生态环境部发布CCER交易新规",
        description:
          "2024年起CCER项目备案将采用新审核标准，新增海上风电、红树林修复等合格项目类型，预计将释放2000万吨碳汇量",
        datetime: "2小时前",
        type: "1"
      },
      {
        avatar: "",
        title: "CCER-12M合约价格创新高",
        description:
          "受配额清缴季影响，CCER-12M合约最新成交价达328CNY，单日涨幅4.5%，成交量突破50万手",
        datetime: "3小时前",
        type: "1"
      },
      {
        avatar: "",
        title: "粤港澳大湾区首笔蓝碳交易达成",
        description:
          "珠海某海洋牧场完成10万吨蓝碳交易，成交价285CNY，通过本平台CCER-24M合约完成结算",
        datetime: "5小时前",
        type: "1"
      },
      {
        avatar: "",
        title: "中欧碳市场互联互通启动",
        description:
          "本平台EUA合约与欧洲能源交易所(EEX)实现跨市场交易，支持EUA/CCER互换套期保值",
        datetime: "1天前",
        type: "1"
      }
    ],
    emptyText: $t("status.pureNoNotify")
  },
  {
    key: "2",
    name: $t("status.tradeAlert"),
    list: [
      {
        avatar: "",
        title: "CCER-12M-03挂单成交",
        description:
          "您的CCER-12M-03卖出挂单已部分成交，成交价格318CNY，成交数量15手，剩余10手",
        datetime: "刚刚",
        type: "2"
      },
      {
        avatar: "",
        title: "价格波动提醒",
        description:
          "CCER-24M-05合约价格突破260CNY，较您持仓成本上涨12%，建议关注止盈机会",
        datetime: "15分钟前",
        type: "2"
      },
      {
        avatar: "",
        title: "大宗交易撮合成功",
        description:
          "您发起的CCER-36M-08 50手买入意向已匹配卖方报价，可成交价295CNY，请及时确认",
        datetime: "30分钟前",
        type: "2"
      }
    ],
    emptyText: $t("status.pureNoMessage")
  },
  {
    key: "3",
    name: $t("status.eventNotice"),
    list: [
      {
        avatar: "",
        title: "碳交易培训研讨会",
        description:
          "3月25日14:00线上举办CCER期货套保策略讲座，报名截止3月20日",
        datetime: "",
        extra: "剩余5天",
        status: "info",
        type: "3"
      },
      {
        avatar: "",
        title: "年度配额预分配",
        description:
          "2025年度碳排放配额预分配将于4月1日启动，请确保账户资金充足",
        datetime: "",
        extra: "剩余12天",
        status: "warning",
        type: "3"
      }
    ],
    emptyText: $t("status.pureNoTodo")
  }
];
