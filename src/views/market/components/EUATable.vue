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

// 为每行数据生成标的物代码
const generateCode = (row: EUAData): string => {
  // 如果已有code则使用，否则生成新的
  if (row.code) return row.code;
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 生成5位随机数字
  return `EUA${randomDigits}`;
};

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
    <el-table-column type="index" label="序号" width="70" align="center" />
    <el-table-column label="标的物代码" min-width="150">
      <template #default="{ row }">
        <span class="code-color">{{ generateCode(row) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="productName" label="标的物名称" min-width="150">
      <template #default="{ row }">
        <span class="product-name-color">{{ row.productName }}</span>
      </template>
    </el-table-column>
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
      min-width="140"
    >
      <template #default="{ row }">
        <span :class="getChangeClass(row.change)">{{
          formatNumber(row.lastPrice)
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="change" label="涨跌幅" align="right" min-width="140">
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
      min-width="140"
    >
      <template #default="{ row }">
        {{ formatNumber(row.highPrice) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="lowPrice"
      label="最低价(CNY)"
      align="right"
      min-width="140"
    >
      <template #default="{ row }">
        {{ formatNumber(row.lowPrice) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="volume"
      label="成交量(手)"
      align="right"
      min-width="140"
    >
      <template #default="{ row }">
        {{ formatVolume(row.volume) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
:deep(.el-table) {
  /* 修改表格基础变量 */
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-bg-color: var(--el-bg-color);
  --el-table-tr-bg-color: var(--el-bg-color);
  --el-table-header-bg-color: var(--el-bg-color-overlay);
  --el-table-row-hover-bg-color: var(--el-fill-color-light);
}

:deep(.el-table__header) {
  background-color: var(--el-bg-color-overlay);

  /* 修改表头文字颜色 */
  th {
    color: var(--el-text-color-regular) !important;
    background-color: var(--el-bg-color-overlay) !important;
  }
}

:deep(.el-table__row) {
  /* 修改单元格文字颜色 */
  td {
    color: var(--el-text-color-primary);
    background-color: var(--el-bg-color);
  }
}

/* 保持原有的涨跌颜色样式 */
.up {
  color: #67c23a;
}

.down {
  color: #f56c6c;
}

.stable {
  color: var(--el-text-color-regular);
}

.normal-price {
  color: var(--el-text-color-regular);
}

/* 标的物代码颜色 - 浅蓝绿色 */
.code-color {
  color: #5abeb7; /* 浅蓝绿色，清新耐看 */
}

/* 产品名称颜色 - 浅黄棕色 */
.product-name-color {
  color: #d4a76a; /* 浅黄棕色，温暖耐看 */
}
</style>
