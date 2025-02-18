<script setup lang="ts">
import { ref } from "vue";
import HistoricalTable from "./components/HistoricalTable.vue";
import MarketDetail from "../market/marketDetail.vue";
import type { MarketData } from "../market/components/MarketTable.vue";

defineOptions({
  name: "Historical"
});

interface HistoricalData {
  projectName: string;
  date: string;
  trader: string;
  product: string;
  bs: "买入" | "卖出";
  quantity: number;
  price: number;
  settleDate: string;
  time: string;
  counterparty: string;
  status: string;
  lastTraded: number;
  trend: "up" | "down" | "stable";
}

// 将历史数据转换为MarketData类型
const convertToMarketData = (data: HistoricalData): MarketData => {
  return {
    projectName: data.projectName,
    date: data.date,
    bidQty: data.bs === "买入" ? data.quantity : 0,
    bidPrice: data.bs === "买入" ? data.price : 0,
    lastTraded: data.lastTraded,
    offer: data.bs === "卖出" ? data.price : 0,
    offerQty: data.bs === "卖出" ? data.quantity : 0,
    trend: data.trend
  };
};

const drawerVisible = ref(false);
const currentRow = ref<MarketData | null>(null);
const dateRange = ref<[Date, Date] | null>(null);
const selectedProduct = ref("");
const selectedBS = ref("");

// 处理行点击事件
const handleRowClick = (row: HistoricalData) => {
  currentRow.value = convertToMarketData(row);
  drawerVisible.value = true;
};

// 处理搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log("搜索条件:", {
    dateRange: dateRange.value,
    product: selectedProduct.value,
    bs: selectedBS.value
  });
};

// 处理重置
const handleReset = () => {
  dateRange.value = null;
  selectedProduct.value = "";
  selectedBS.value = "";
};

// 模拟历史交易数据
const historicalData = ref<HistoricalData[]>([
  // CCER-12M 交易数据
  {
    projectName: "CCER-12M-01",
    date: "2025-01-16",
    trader: "张明",
    product: "CCER-12M",
    bs: "买入",
    quantity: 25,
    price: 310,
    settleDate: "2024-03-15",
    time: "10:30",
    counterparty: "华能新能源",
    status: "成交",
    lastTraded: 310,
    trend: "up"
  },
  {
    projectName: "CCER-12M-03",
    date: "2025-03-30",
    trader: "李华",
    product: "CCER-12M",
    bs: "卖出",
    quantity: 35,
    price: 308,
    settleDate: "2024-03-15",
    time: "11:45",
    counterparty: "国电投清洁能源",
    status: "成交",
    lastTraded: 308,
    trend: "down"
  },
  {
    projectName: "CCER-12M-05",
    date: "2025-05-14",
    trader: "王芳",
    product: "CCER-12M",
    bs: "买入",
    quantity: 40,
    price: 318,
    settleDate: "2024-03-14",
    time: "14:20",
    counterparty: "大唐新能源",
    status: "成交",
    lastTraded: 318,
    trend: "up"
  },
  {
    projectName: "CCER-12M-07",
    date: "2025-07-28",
    trader: "赵强",
    product: "CCER-12M",
    bs: "卖出",
    quantity: 45,
    price: 312,
    settleDate: "2024-03-14",
    time: "15:30",
    counterparty: "中广核能源",
    status: "成交",
    lastTraded: 312,
    trend: "down"
  },

  // CCER-24M 交易数据
  {
    projectName: "CCER-24M-02",
    date: "2025-02-19",
    trader: "陈静",
    product: "CCER-24M",
    bs: "买入",
    quantity: 30,
    price: 271,
    settleDate: "2024-03-15",
    time: "09:45",
    counterparty: "三峡新能源",
    status: "成交",
    lastTraded: 271,
    trend: "up"
  },
  {
    projectName: "CCER-24M-04",
    date: "2025-04-19",
    trader: "吴伟",
    product: "CCER-24M",
    bs: "卖出",
    quantity: 35,
    price: 245,
    settleDate: "2024-03-15",
    time: "10:15",
    counterparty: "中节能环保",
    status: "成交",
    lastTraded: 245,
    trend: "down"
  },
  {
    projectName: "CCER-24M-06",
    date: "2025-06-19",
    trader: "刘洋",
    product: "CCER-24M",
    bs: "买入",
    quantity: 40,
    price: 262,
    settleDate: "2024-03-14",
    time: "13:50",
    counterparty: "协鑫新能源",
    status: "成交",
    lastTraded: 262,
    trend: "up"
  },
  {
    projectName: "CCER-24M-08",
    date: "2025-08-19",
    trader: "孙萍",
    product: "CCER-24M",
    bs: "卖出",
    quantity: 55,
    price: 245,
    settleDate: "2024-03-14",
    time: "14:30",
    counterparty: "远景能源",
    status: "成交",
    lastTraded: 245,
    trend: "down"
  },

  // CCER-36M 交易数据
  {
    projectName: "CCER-36M-01",
    date: "2025-01-10",
    trader: "周明",
    product: "CCER-36M",
    bs: "买入",
    quantity: 25,
    price: 265,
    settleDate: "2024-03-15",
    time: "09:30",
    counterparty: "明阳智能",
    status: "成交",
    lastTraded: 265,
    trend: "up"
  },
  {
    projectName: "CCER-36M-03",
    date: "2025-03-10",
    trader: "郑华",
    product: "CCER-36M",
    bs: "卖出",
    quantity: 25,
    price: 310,
    settleDate: "2024-03-15",
    time: "11:20",
    counterparty: "金风科技",
    status: "成交",
    lastTraded: 310,
    trend: "down"
  },
  {
    projectName: "CCER-36M-05",
    date: "2025-05-10",
    trader: "黄婷",
    product: "CCER-36M",
    bs: "买入",
    quantity: 35,
    price: 298,
    settleDate: "2024-03-14",
    time: "13:45",
    counterparty: "天合光能",
    status: "成交",
    lastTraded: 298,
    trend: "up"
  },
  {
    projectName: "CCER-36M-07",
    date: "2025-07-10",
    trader: "马超",
    product: "CCER-36M",
    bs: "卖出",
    quantity: 45,
    price: 295,
    settleDate: "2024-03-14",
    time: "15:15",
    counterparty: "隆基绿能",
    status: "成交",
    lastTraded: 295,
    trend: "down"
  }
]);

// 更新下拉选项
const productOptions = [
  { label: "CCER-12M", value: "CCER-12M" },
  { label: "CCER-24M", value: "CCER-24M" },
  { label: "CCER-36M", value: "CCER-36M" }
];
</script>

<template>
  <div class="historical-container">
    <div class="header">
      <h2 class="title">历史交易记录</h2>
      <div class="filters">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="default"
          class="mr-4"
          value-format="YYYY-MM-DD"
        />
        <el-select
          v-model="selectedProduct"
          placeholder="选择产品"
          clearable
          class="mr-4"
        >
          <el-option
            v-for="option in productOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-select
          v-model="selectedBS"
          placeholder="买卖方向"
          clearable
          class="mr-4"
        >
          <el-option label="买入" value="买入" />
          <el-option label="卖出" value="卖出" />
        </el-select>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>

    <historical-table :data="historicalData" @row-click="handleRowClick" />

    <el-drawer
      v-model="drawerVisible"
      size="50%"
      :destroy-on-close="true"
      :append-to-body="true"
      :modal="true"
      direction="rtl"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="true"
      :with-header="false"
      class="historical-detail-drawer"
    >
      <market-detail
        v-if="currentRow"
        :row="currentRow"
        column-name="历史交易"
      />
    </el-drawer>
  </div>
</template>

<style scoped>
.historical-container {
  min-height: calc(100vh - 150px);
  padding: 20px;
  background: #fff;
}

.header {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.historical-detail-drawer {
  :deep(.el-drawer__body) {
    height: 100%;
    padding: 0 !important;
    overflow: hidden;
  }
}

:deep(.el-select) {
  width: 160px;
}

:deep(.el-date-picker) {
  width: 320px;
}
</style>
