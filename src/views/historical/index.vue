<script setup lang="ts">
import { ref, computed } from "vue";
import TradeTable from "./components/TradeTable.vue";
import MarketDetail from "../market/marketDetail.vue";
import type { MarketData } from "../market/components/MarketTable.vue";

defineOptions({
  name: "Historical"
});

interface TradeData {
  projectName: string;
  date: string;
  product: string;
  bs: "买入" | "卖出";
  quantity: number;
  price: number;
  settleDate: string;
  time: string;
  counterparty: string;
  status: "挂单中" | "已成交" | "已撤单";
  lastTraded: number;
  trend: "up" | "down" | "stable";
}

// 将历史数据转换为MarketData类型
const convertToMarketData = (data: TradeData): MarketData => {
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
const handleRowClick = (row: TradeData) => {
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

// 模拟交易数据
const tradeData = ref<TradeData[]>([
  // 当前挂单数据
  {
    projectName: "CCER-12M-09",
    date: "2025-09-15",
    product: "CCER-12M",
    bs: "买入",
    quantity: 30,
    price: 315,
    settleDate: "2024-03-15",
    time: "09:30",
    counterparty: "华能新能源",
    status: "挂单中",
    lastTraded: 315,
    trend: "up"
  },
  {
    projectName: "CCER-24M-10",
    date: "2025-10-20",
    product: "CCER-24M",
    bs: "卖出",
    quantity: 25,
    price: 280,
    settleDate: "2024-03-15",
    time: "10:15",
    counterparty: "国电投清洁能源",
    status: "挂单中",
    lastTraded: 280,
    trend: "down"
  },
  // CCER-12M 历史数据
  {
    projectName: "CCER-12M-01",
    date: "2025-01-16",
    product: "CCER-12M",
    bs: "买入",
    quantity: 25,
    price: 310,
    settleDate: "2024-03-15",
    time: "10:30",
    counterparty: "华能新能源",
    status: "已成交",
    lastTraded: 310,
    trend: "up"
  },
  {
    projectName: "CCER-12M-03",
    date: "2025-03-30",
    product: "CCER-12M",
    bs: "卖出",
    quantity: 35,
    price: 308,
    settleDate: "2024-03-15",
    time: "11:45",
    counterparty: "国电投清洁能源",
    status: "已成交",
    lastTraded: 308,
    trend: "down"
  },
  {
    projectName: "CCER-12M-05",
    date: "2025-05-14",
    product: "CCER-12M",
    bs: "买入",
    quantity: 40,
    price: 318,
    settleDate: "2024-03-14",
    time: "14:20",
    counterparty: "大唐新能源",
    status: "已撤单",
    lastTraded: 318,
    trend: "up"
  },
  // CCER-24M 历史数据
  {
    projectName: "CCER-24M-02",
    date: "2025-02-19",
    product: "CCER-24M",
    bs: "买入",
    quantity: 30,
    price: 271,
    settleDate: "2024-03-15",
    time: "09:45",
    counterparty: "三峡新能源",
    status: "已成交",
    lastTraded: 271,
    trend: "up"
  },
  {
    projectName: "CCER-24M-04",
    date: "2025-04-19",
    product: "CCER-24M",
    bs: "卖出",
    quantity: 35,
    price: 245,
    settleDate: "2024-03-15",
    time: "10:15",
    counterparty: "中节能环保",
    status: "已撤单",
    lastTraded: 245,
    trend: "down"
  },
  // CCER-36M 历史数据
  {
    projectName: "CCER-36M-01",
    date: "2025-01-10",
    product: "CCER-36M",
    bs: "买入",
    quantity: 25,
    price: 265,
    settleDate: "2024-03-15",
    time: "09:30",
    counterparty: "明阳智能",
    status: "已成交",
    lastTraded: 265,
    trend: "up"
  },
  {
    projectName: "CCER-36M-03",
    date: "2025-03-10",
    product: "CCER-36M",
    bs: "卖出",
    quantity: 25,
    price: 310,
    settleDate: "2024-03-15",
    time: "11:20",
    counterparty: "金风科技",
    status: "已撤单",
    lastTraded: 310,
    trend: "down"
  }
]);

// 分离当前挂单和历史记录
const currentOrders = computed(() =>
  tradeData.value.filter(item => item.status === "挂单中")
);

const historicalOrders = computed(() =>
  tradeData.value.filter(item => item.status !== "挂单中")
);
</script>

<template>
  <div class="historical-view">
    <!-- 搜索栏 -->
    <el-card class="mb-4">
      <div class="flex items-center space-x-4">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="w-80"
        />
        <el-select
          v-model="selectedProduct"
          placeholder="选择产品"
          clearable
          class="w-40"
        >
          <el-option label="CCER-12M" value="CCER-12M" />
          <el-option label="CCER-24M" value="CCER-24M" />
          <el-option label="CCER-36M" value="CCER-36M" />
        </el-select>
        <el-select
          v-model="selectedBS"
          placeholder="买卖方向"
          clearable
          class="w-32"
        >
          <el-option label="买入" value="买入" />
          <el-option label="卖出" value="卖出" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-card>

    <!-- 当前挂牌表格 -->
    <el-card class="mb-4">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-semibold">当前挂牌</span>
        </div>
      </template>
      <TradeTable
        :data="currentOrders"
        type="current"
        @row-click="handleRowClick"
      />
    </el-card>

    <!-- 历史记录表格 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span class="text-lg font-semibold">历史记录</span>
        </div>
      </template>
      <TradeTable
        :data="historicalOrders"
        type="history"
        @row-click="handleRowClick"
      />
    </el-card>

    <!-- 市场详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="市场详情"
      size="50%"
      destroy-on-close
    >
      <MarketDetail v-if="currentRow" :data="currentRow" />
    </el-drawer>
  </div>
</template>

<style scoped>
.historical-view {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
