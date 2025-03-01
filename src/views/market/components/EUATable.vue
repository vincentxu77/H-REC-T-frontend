<script setup lang="ts">
import { computed } from "vue";
import type { EUAData } from "../types";

defineOptions({
  name: "EUATable"
});

const props = defineProps<{
  data: EUAData[];
}>();

const emit = defineEmits<{
  (e: "row-click", row: EUAData): void;
}>();

// 格式化数字
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// 格式化成交量
const formatVolume = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

// 格式化涨跌幅
const formatChange = (change: number) => {
  return `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
};

// 计算涨跌样式
const getChangeClass = (change: number) => {
  return change > 0 ? "up" : change < 0 ? "down" : "stable";
};

const handleRowClick = (row: EUAData) => {
  emit("row-click", row);
};
</script>

<template>
  <el-table
    :data="data"
    style="width: 100%"
    :header-cell-style="{
      height: '50px',
      lineHeight: '50px'
    }"
    :cell-style="{
      height: '50px',
      lineHeight: '50px',
      cursor: 'pointer'
    }"
    @row-click="handleRowClick"
  >
    <el-table-column prop="productName" label="产品名称" min-width="120" />
    <el-table-column
      prop="openPrice"
      label="开盘价(CNY)"
      align="right"
      min-width="100"
    >
      <template #default="{ row }">
        <span class="normal-price">{{ formatNumber(row.openPrice) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="lastPrice"
      label="最新价(CNY)"
      align="right"
      min-width="100"
    >
      <template #default="{ row }">
        <span :class="getChangeClass(row.change)">{{
          formatNumber(row.lastPrice)
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="change" label="涨跌幅" align="right" min-width="100">
      <template #default="{ row }">
        <span :class="getChangeClass(row.change)">
          {{ formatChange(row.change) }}
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="highPrice"
      label="最高价(CNY)"
      align="right"
      min-width="100"
    >
      <template #default="{ row }">
        {{ formatNumber(row.highPrice) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="lowPrice"
      label="最低价(CNY)"
      align="right"
      min-width="100"
    >
      <template #default="{ row }">
        {{ formatNumber(row.lowPrice) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="volume"
      label="成交量(手)"
      align="right"
      min-width="100"
    >
      <template #default="{ row }">
        {{ formatVolume(row.volume) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.up {
  color: #67c23a; /* 绿色 */
}

.down {
  color: #f56c6c; /* 红色 */
}

.stable {
  color: #909399;
}

.normal-price {
  color: #606266;
}

:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-row-hover-bg-color: var(--el-fill-color);
}

:deep(.el-table__header) th {
  background-color: #f5f7fa !important;
}
</style>
