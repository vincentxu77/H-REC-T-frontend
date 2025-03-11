<script setup lang="ts">
import { computed } from "vue";
import type { MarketData } from "../types";

defineOptions({
  name: "MarketTable"
});

const props = defineProps<{
  data: MarketData[];
}>();

const emit = defineEmits<{
  (e: "row-click", row: MarketData): void;
}>();

// 计算涨跌幅的函数
const calculatePriceChange = (bidPrice: number, offer: number): string => {
  if (!bidPrice || !offer) return "-";
  const change = ((offer - bidPrice) / bidPrice) * 100;
  return change.toFixed(2);
};

// 处理行点击事件
const handleRowClick = (row: MarketData) => {
  emit("row-click", row);
};

// 为每行数据生成标的物代码
const generateCode = (): string => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 生成5位随机数字
  return `A1${randomDigits}`;
};

// 为每行数据添加代码属性
const tableData = computed(() => {
  return props.data.map(item => ({
    ...item,
    code: item.code || generateCode() // 如果已有code则使用，否则生成新的
  }));
});
</script>

<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :cell-style="{
      padding: '12px 8px',
      cursor: 'pointer'
    }"
    :header-cell-style="{
      background: '#f5f7fa',
      color: '#909399',
      height: '48px',
      padding: '12px 8px'
    }"
    @row-click="handleRowClick"
  >
    <el-table-column type="index" label="序号" width="70" align="center" />
    <el-table-column
      prop="code"
      label="标的物代码"
      min-width="150"
      align="center"
    >
      <template #default="{ row }">
        <span class="code-color">{{ row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标的物名称" min-width="180">
      <template #default="{ row }">
        <div class="type-cell">
          <span class="type-text product-name-color">{{
            row.projectName
          }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="到期时间" min-width="120" />
    <el-table-column
      label="最新成交"
      min-width="140"
      align="right"
      property="lastTraded"
    >
      <template #default="{ row }">
        <div class="traded-cell">
          <span
            :class="[
              'traded-price',
              row.trend === 'up'
                ? 'up'
                : row.trend === 'down'
                  ? 'down'
                  : 'stable'
            ]"
          >
            {{ row.lastTraded || "-" }}
          </span>
          <span v-if="row.trend" class="trend-icon" :class="row.trend">
            {{ row.trend === "up" ? "↑" : row.trend === "down" ? "↓" : "→" }}
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="买入价格(CNY)"
      min-width="140"
      align="right"
      property="bidPrice"
    >
      <template #default="{ row }">
        <span>{{ row.bidPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="bidQty"
      label="买入数量(手)"
      min-width="140"
      align="right"
    />
    <el-table-column
      label="卖出价格(CNY)"
      min-width="140"
      align="right"
      property="offer"
    >
      <template #default="{ row }">
        <div class="offer-cell">
          <span>{{ row.offer || "-" }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="offerQty"
      label="卖出数量(手)"
      min-width="140"
      align="right"
    />
    <el-table-column
      label="最高价(CNY)"
      min-width="140"
      align="right"
      property="highPrice"
    >
      <template #default="{ row }">
        <span>{{ row.highPrice || "-" }}</span>
      </template>
    </el-table-column>
    <el-table-column label="涨跌幅" min-width="120" align="right">
      <template #default="{ row }">
        <span
          :class="[
            'price-change',
            Number(calculatePriceChange(row.bidPrice, row.offer)) > 0
              ? 'up'
              : Number(calculatePriceChange(row.bidPrice, row.offer)) < 0
                ? 'down'
                : ''
          ]"
        >
          {{ calculatePriceChange(row.bidPrice, row.offer) }}%
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
/* 表格样式美化 */
:deep(.el-table) {
  /* 修改表格基础变量 */
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-bg-color: var(--el-bg-color);
  --el-table-tr-bg-color: var(--el-bg-color);
  --el-table-header-bg-color: var(--el-bg-color-overlay);
  --el-table-row-hover-bg-color: var(--el-fill-color-light);

  margin-bottom: 0;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;
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
  transition: all 0.3s ease;

  /* 修改单元格文字颜色 */
  td {
    color: var(--el-text-color-primary);
    background-color: var(--el-bg-color);
  }
}

:deep(.el-table__row:hover) {
  background-color: var(--el-fill-color-light) !important;
}

:deep(.el-table td) {
  padding: 12px 8px;
}

:deep(.el-table th) {
  padding: 12px 8px;
  background-color: #f8fafc !important;
}

.type-cell {
  display: flex;
  align-items: flex-start;
}

.type-text {
  display: -webkit-box;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  color: #606266;
  -webkit-line-clamp: 2;
  word-break: break-all;
  -webkit-box-orient: vertical;
}

.traded-cell {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
}

.traded-price {
  font-weight: 500;
}

.traded-price.up {
  color: #67d231;
}

.traded-price.down {
  color: #ff4242;
}

.traded-price.stable {
  color: #909399;
}

.trend-icon {
  margin-left: 2px;
  font-size: 12px;
}

.trend-icon.up {
  color: #67d231;
}

.trend-icon.down {
  color: #ff4242;
}

.trend-icon.stable {
  color: #909399;
}

.offer-cell {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: flex-end;
}

.refresh-icon {
  font-size: 14px;
  color: #909399;
}

.price-change {
  font-weight: 500;
}

.price-change.up {
  color: #67d231;
}

.price-change.down {
  color: #ff4242;
}

.up {
  color: #67d231;
}

.down {
  color: #ff4242;
}

.stable {
  color: #909399;
}

/* 标的物代码颜色 - 浅蓝绿色 */
.code-color {
  color: #38f2e5; /* 浅蓝绿色，清新耐看 */
}

/* 产品名称颜色 - 浅黄棕色 */
.product-name-color {
  color: #f0b90b; /* 浅黄棕色，温暖耐看 */
}
</style>
