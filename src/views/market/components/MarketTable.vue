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
</script>

<template>
  <el-table
    :data="data"
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
    <el-table-column label="合约名称" min-width="200">
      <template #default="{ row }">
        <div class="type-cell">
          <span class="type-text">{{ row.projectName }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="到期时间" min-width="120" />
    <el-table-column
      prop="bidQty"
      label="买入数量"
      min-width="120"
      align="right"
    />
    <el-table-column
      label="买入价格"
      min-width="120"
      align="right"
      property="bidPrice"
    >
      <template #default="{ row }">
        <span>{{ row.bidPrice }}</span>
      </template>
    </el-table-column>
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
      label="卖出价格"
      min-width="120"
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
      label="卖出数量"
      min-width="120"
      align="right"
    />
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
  margin-bottom: 0;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table__row) {
  transition: all 0.3s ease;
}

:deep(.el-table__row:hover) {
  background-color: #f5f7fa !important;
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
  min-height: 40px;
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
  color: #67c23a;
}

.traded-price.down {
  color: #f56c6c;
}

.traded-price.stable {
  color: #909399;
}

.trend-icon {
  margin-left: 2px;
  font-size: 12px;
}

.trend-icon.up {
  color: #67c23a;
}

.trend-icon.down {
  color: #f56c6c;
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
  color: #67c23a;
}

.price-change.down {
  color: #f56c6c;
}

.up {
  color: #67c23a;
}

.down {
  color: #f56c6c;
}

.stable {
  color: #909399;
}
</style>
