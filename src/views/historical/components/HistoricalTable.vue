<script setup lang="ts">
import { computed } from "vue";

interface HistoricalData {
  name: string;
  product: string;
  productExpiry: string;
  bs: "Buy" | "Sell";
  quantity: number;
  price: number;
  time: string;
  status: string;
  counterparty?: string;
  settleDate?: string;
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
      :stripe="true"
      highlight-current-row
      @row-click="handleRowClick"
    >
      <el-table-column prop="name" label="交易员" min-width="120" />
      <el-table-column prop="product" label="产品" min-width="150" />
      <el-table-column prop="productExpiry" label="到期日" min-width="120" />
      <el-table-column prop="bs" label="买卖" min-width="80">
        <template #default="{ row }">
          <span
            :class="{
              'text-red-500': row.bs === 'Buy',
              'text-green-500': row.bs === 'Sell'
            }"
          >
            {{ row.bs }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" min-width="100" />
      <el-table-column prop="price" label="价格" min-width="100" />
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
