<script setup lang="ts">
import { computed } from "vue";
import { ElMessage } from "element-plus";

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

const props = defineProps<{
  data: TradeData[];
  type: "current" | "history";
}>();

const emit = defineEmits<{
  (e: "row-click", row: TradeData): void;
}>();

const handleRowClick = (row: TradeData) => {
  emit("row-click", row);
};

const handleEdit = (e: Event) => {
  e.stopPropagation();
  ElMessage.warning("功能暂未开放");
};

const getStatusType = (status: string) => {
  switch (status) {
    case "挂单中":
      return "warning";
    case "已成交":
      return "success";
    case "已撤单":
      return "danger";
    default:
      return "info";
  }
};

const tableData = computed(() => props.data);
</script>

<template>
  <div class="trade-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      :border="true"
      :stripe="true"
      highlight-current-row
      @row-click="handleRowClick"
    >
      <el-table-column prop="product" label="产品" min-width="150" />
      <el-table-column prop="projectName" label="合约名称" min-width="120" />
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
      <template v-if="type === 'history'">
        <el-table-column prop="settleDate" label="成交日期" min-width="120" />
        <el-table-column prop="time" label="时间" min-width="100" />
        <el-table-column prop="counterparty" label="对手方" min-width="120" />
      </template>
      <el-table-column prop="status" label="成交状态" min-width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <template v-if="type === 'current'">
        <el-table-column label="操作" width="120" fixed="right">
          <template #default>
            <el-button type="primary" link class="edit-btn" @click="handleEdit">
              修改
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<style scoped>
.trade-table {
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

.edit-btn {
  font-size: 14px;
  color: #409eff !important;
}
</style>
