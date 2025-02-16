<script setup lang="ts">
import { ref } from "vue";
import HistoricalTable from "./components/HistoricalTable.vue";
import MarketDetail from "../market/marketDetail.vue";
import type { MarketData } from "../market/components/MarketTable.vue";

defineOptions({
  name: "Historical"
});

const drawerVisible = ref(false);
const currentRow = ref<MarketData | null>(null);
const dateRange = ref<[Date, Date] | null>(null);
const selectedProduct = ref("");
const selectedBS = ref("");

// 处理行点击事件
const handleRowClick = (row: MarketData) => {
  currentRow.value = row;
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
const historicalData = ref([
  {
    name: "黄杰夫",
    product: "广东地区碳配额",
    productExpiry: "Mon 16 Sep",
    bs: "Buy",
    quantity: 25,
    price: 173,
    settleDate: "2019-09-13",
    time: "21:49",
    counterparty: "东山电力",
    status: "成交"
  },
  {
    name: "黄杰夫",
    product: "广东地区碳配额",
    productExpiry: "W39 23 Sep",
    bs: "Buy",
    quantity: 5,
    price: 221,
    settleDate: "2019-09-13",
    time: "21:49",
    counterparty: "川投能源",
    status: "成交"
  },
  {
    name: "黄杰夫",
    product: "广东地区碳配额",
    productExpiry: "Tue 10 Sep",
    bs: "Buy",
    quantity: 25,
    price: 233,
    settleDate: "2019-09-08",
    time: "23:14",
    counterparty: "东山电力",
    status: "成交"
  },
  {
    name: "黄杰夫",
    product: "广东地区碳配额",
    productExpiry: "Tue 10 Sep",
    bs: "Buy",
    quantity: 25,
    price: 234,
    settleDate: "2019-09-08",
    time: "23:14",
    counterparty: "东山电力",
    status: "成交"
  },
  {
    name: "黄杰夫",
    product: "广东地区碳配额",
    productExpiry: "Tue 10 Sep",
    bs: "Sell",
    quantity: 25,
    price: 251,
    settleDate: "2019-09-08",
    time: "23:13",
    counterparty: "川投能源",
    status: "成交"
  }
]);
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
          <el-option label="广东地区碳配额" value="广东地区碳配额" />
          <el-option label="CCER-12" value="CCER-12" />
          <el-option label="CCER-21" value="CCER-21" />
          <el-option label="CCER-36" value="CCER-36" />
        </el-select>
        <el-select
          v-model="selectedBS"
          placeholder="买卖方向"
          clearable
          class="mr-4"
        >
          <el-option label="买入" value="Buy" />
          <el-option label="卖出" value="Sell" />
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
