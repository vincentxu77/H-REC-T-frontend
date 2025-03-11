<script setup lang="ts">
import { computed } from "vue";

// 为每行数据生成标的物代码
const generateCode = (row: HistoricalData): string => {
  // 如果已有code则使用，否则生成新的
  if (row.code) return row.code;
  const randomDigits = Math.floor(10000 + Math.random() * 90000); // 生成5位随机数字
  return `A1${randomDigits}`;
};

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
  code?: string;
}

const props = defineProps<{
  data: HistoricalData[];
}>();

const emit = defineEmits<{
  (e: "row-click", row: HistoricalData): void;
}>();

const handleRowClick = (row: HistoricalData) => {
  emit("row-click", row);
};

const tableData = computed(() => props.data);
</script>

<template>
  <div class="historical-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      :border="true"
      highlight-current-row
      @row-click="handleRowClick"
    >
      <el-table-column prop="trader" label="交易员" min-width="120" />
      <el-table-column prop="product" label="产品" min-width="150">
        <template #default="{ row }">
          <span class="product-name-color">{{ row.product }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标的物代码" min-width="150">
        <template #default="{ row }">
          <span class="code-color">{{ generateCode(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" label="标的物名称" min-width="120">
        <template #default="{ row }">
          <span class="product-name-color">{{ row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="到期日" min-width="120" />
      <el-table-column prop="bs" label="买卖" min-width="80">
        <template #default="{ row }">
          <span
            :class="{
              'text-green-500': row.bs === '买入',
              'text-red-500': row.bs === '卖出'
            }"
          >
            {{ row.bs }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量(手)" min-width="100" />
      <el-table-column prop="price" label="价格(CNY)" min-width="100" />
      <el-table-column prop="settleDate" label="成交日期" min-width="120" />
      <el-table-column prop="time" label="时间" min-width="100" />
      <el-table-column prop="counterparty" label="对手方" min-width="120" />
      <el-table-column prop="status" label="状态" min-width="100">
        <template #default="{ row }">
          <el-tag
            :type="row.status === '撤销' ? 'danger' : 'success'"
            size="small"
          >
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
/* 标的物代码颜色 - 浅蓝绿色 */
.code-color {
  color: #38f2e5; /* 浅蓝绿色，清新耐看 */
}

/* 产品名称颜色 - 浅黄棕色 */
.product-name-color {
  color: #f0b90b; /* 浅黄棕色，温暖耐看 */
}

.historical-table {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

:deep(.el-table) {
  --el-table-border-color: #ebeef5;
  --el-table-header-background-color: #f8fafc;
  --el-table-row-hover-background-color: #f5f7fa;
}

:deep(.el-table__header) {
  font-weight: 600;
}

:deep(.el-table__row) {
  cursor: pointer;
}
</style>
