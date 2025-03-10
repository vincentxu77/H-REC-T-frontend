<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "Counterparties"
});

interface CounterpartyData {
  name: string;
  contact: string;
  location: string;
  isda: boolean;
  limit: number | string;
}

const drawerVisible = ref(false);
const currentRow = ref<CounterpartyData | null>(null);
const searchQuery = ref("");

// 处理行点击事件
const handleRowClick = (row: CounterpartyData) => {
  currentRow.value = row;
  drawerVisible.value = true;
};

// 表格数据
const tableData = ref<CounterpartyData[]>([
  {
    name: "China Everbright",
    contact: "Jim Jones",
    location: "China",
    isda: true,
    limit: "50,000,000"
  },
  {
    name: "Frontier Forests",
    contact: "Tony Wong",
    location: "Hong Kong",
    isda: true,
    limit: "10,000,000"
  },
  {
    name: "ACBC Bank",
    contact: "Jason Smith",
    location: "US",
    isda: false,
    limit: "N/A"
  },
  {
    name: "Votal Energie",
    contact: "Marc Varres",
    location: "France",
    isda: false,
    limit: "N/A"
  },
  {
    name: "Sumens Industries",
    contact: "Thomas Muller",
    location: "Germany",
    isda: true,
    limit: "20,000,000"
  }
]);

// 处理搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  console.log("搜索条件:", searchQuery.value);
};

// 处理重置
const handleReset = () => {
  searchQuery.value = "";
};
</script>

<template>
  <div class="counterparties-container">
    <div class="header">
      <h2 class="title">对手方管理</h2>
      <div class="filters">
        <el-input
          v-model="searchQuery"
          placeholder="搜索对手方"
          class="search-input mr-4"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      class="counterparties-table"
      @row-click="handleRowClick"
    >
      <el-table-column prop="name" label="对手方" min-width="180" />
      <el-table-column prop="contact" label="联系人" min-width="150" />
      <el-table-column prop="location" label="地区" min-width="120" />
      <el-table-column label="ISDA Y/N" min-width="120">
        <template #default="{ row }">
          <div class="isda-status">
            <el-radio-group v-model="row.isda" disabled>
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="limit" label="额度" min-width="150" align="right">
        <template #default="{ row }">
          <span>{{ row.limit }}</span>
        </template>
      </el-table-column>
    </el-table>

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
      title="对手方详情"
      class="counterparty-detail-drawer"
    >
      <template v-if="currentRow">
        <div class="drawer-content">
          <div class="detail-item">
            <span class="label">对手方名称：</span>
            <span class="value">{{ currentRow.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">联系人：</span>
            <span class="value">{{ currentRow.contact }}</span>
          </div>
          <div class="detail-item">
            <span class="label">地区：</span>
            <span class="value">{{ currentRow.location }}</span>
          </div>
          <div class="detail-item">
            <span class="label">ISDA状态：</span>
            <span class="value">{{ currentRow.isda ? "是" : "否" }}</span>
          </div>
          <div class="detail-item">
            <span class="label">交易额度：</span>
            <span class="value">{{ currentRow.limit }}</span>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.counterparties-container {
  min-height: calc(100vh - 150px);
  padding: 20px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}

.header {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.counterparties-table {
  margin-top: 20px;

  :deep(.el-table) {
    --el-table-border-color: var(--el-border-color-lighter);
    --el-table-header-bg-color: var(--el-bg-color-overlay);
    --el-table-row-hover-bg-color: var(--el-fill-color-light);

    th {
      color: var(--el-text-color-regular);
      background-color: var(--el-bg-color-overlay) !important;
    }

    td {
      color: var(--el-text-color-primary);
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }
}

.isda-status {
  :deep(.el-radio__input.is-disabled .el-radio__inner) {
    background-color: var(--el-color-primary) !important;
    border-color: var(--el-color-primary) !important;
  }

  :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner::after) {
    background-color: #fff;
  }

  :deep(.el-radio__input.is-disabled + .el-radio__label) {
    color: var(--el-text-color-regular);
  }
}

.drawer-content {
  padding: 20px;
}

.detail-item {
  margin-bottom: 20px;

  .label {
    margin-right: 10px;
    font-weight: 600;
    color: var(--el-text-color-regular);
  }

  .value {
    color: var(--el-text-color-primary);
  }
}

.counterparty-detail-drawer {
  :deep(.el-drawer__header) {
    padding: 20px;
    margin-bottom: 0;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-drawer__body) {
    height: calc(100% - 72px);
    padding: 0;
    overflow-y: auto;
    background: var(--el-bg-color);
  }
}
</style>
