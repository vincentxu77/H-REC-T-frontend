<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import MarketDetail from "./marketDetail.vue";
import MarketTable from "./components/MarketTable.vue";
import type { MarketData } from "./components/MarketTable.vue";

defineOptions({
  name: "Market"
});

const drawerVisible = ref(false);
const currentRow = ref<MarketData | null>(null);

// CCER-12M数据
const ccer12TableData = ref<MarketData[]>([
  {
    projectName: "CCER-12M-01",
    date: "2025-01-16",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 310,
    offer: 314,
    offerQty: 50,
    trend: "up"
  },
  {
    projectName: "CCER-12M-02",
    date: "2025-02-23",
    bidQty: 50,
    bidPrice: 315,
    lastTraded: 316,
    offer: 318,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "CCER-12M-03",
    date: "2025-03-30",
    bidQty: 25,
    bidPrice: 308,
    lastTraded: 310,
    offer: 320,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "CCER-12M-04",
    date: "2025-04-07",
    bidQty: 35,
    bidPrice: 322,
    lastTraded: 325,
    offer: 328,
    offerQty: 35,
    trend: "up"
  },
  {
    projectName: "CCER-12M-05",
    date: "2025-05-14",
    bidQty: 40,
    bidPrice: 318,
    lastTraded: 315,
    offer: 313,
    offerQty: 40,
    trend: "down"
  },
  {
    projectName: "CCER-12M-06",
    date: "2025-06-21",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    trend: "up"
  },
  {
    projectName: "CCER-12M-07",
    date: "2025-07-28",
    bidQty: 45,
    bidPrice: 312,
    lastTraded: 314,
    offer: 316,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "CCER-12M-08",
    date: "2025-08-04",
    bidQty: 20,
    bidPrice: 300,
    lastTraded: 298,
    offer: 295,
    offerQty: 20,
    trend: "down"
  },
  {
    projectName: "CCER-12M-09",
    date: "2025-09-11",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 290,
    offer: 288,
    offerQty: 55,
    trend: "down"
  },
  {
    projectName: "CCER-12M-10",
    date: "2025-10-18",
    bidQty: 60,
    bidPrice: 285,
    lastTraded: 288,
    offer: 290,
    offerQty: 60,
    trend: "up"
  }
]);

// CCER-24M数据
const ccer24TableData = ref<MarketData[]>([
  {
    projectName: "CCER-24M-01",
    date: "2025-01-19",
    bidQty: 50,
    bidPrice: 290,
    lastTraded: 292,
    offer: 294,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "CCER-24M-02",
    date: "2025-02-19",
    bidQty: 25,
    bidPrice: 271,
    lastTraded: 276,
    offer: 275,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "CCER-24M-03",
    date: "2025-03-19",
    bidQty: 50,
    bidPrice: 240,
    lastTraded: 240,
    offer: 242,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "CCER-24M-04",
    date: "2025-04-19",
    bidQty: 35,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 35,
    trend: "up"
  },
  {
    projectName: "CCER-24M-05",
    date: "2025-05-19",
    bidQty: 45,
    bidPrice: 255,
    lastTraded: 258,
    offer: 260,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "CCER-24M-06",
    date: "2025-06-19",
    bidQty: 40,
    bidPrice: 262,
    lastTraded: 260,
    offer: 258,
    offerQty: 40,
    trend: "down"
  },
  {
    projectName: "CCER-24M-07",
    date: "2025-07-19",
    bidQty: 30,
    bidPrice: 252,
    lastTraded: 250,
    offer: 248,
    offerQty: 30,
    trend: "down"
  },
  {
    projectName: "CCER-24M-08",
    date: "2025-08-19",
    bidQty: 55,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 55,
    trend: "up"
  },
  {
    projectName: "CCER-24M-09",
    date: "2025-09-19",
    bidQty: 60,
    bidPrice: 252,
    lastTraded: 255,
    offer: 258,
    offerQty: 60,
    trend: "up"
  },
  {
    projectName: "CCER-24M-10",
    date: "2025-10-19",
    bidQty: 50,
    bidPrice: 260,
    lastTraded: 262,
    offer: 265,
    offerQty: 50,
    trend: "up"
  }
]);

// CCER-36M数据
const ccer36TableData = ref<MarketData[]>([
  {
    projectName: "CCER-36M-01",
    date: "2025-01-10",
    bidQty: 25,
    bidPrice: 265,
    lastTraded: 266,
    offer: 266,
    offerQty: 25,
    trend: "stable"
  },
  {
    projectName: "CCER-36M-02",
    date: "2025-02-10",
    bidQty: 25,
    bidPrice: 234,
    lastTraded: 232,
    offer: 238,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "CCER-36M-03",
    date: "2025-03-10",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 312,
    offer: 318,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "CCER-36M-04",
    date: "2025-04-10",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    trend: "up"
  },
  {
    projectName: "CCER-36M-05",
    date: "2025-05-10",
    bidQty: 35,
    bidPrice: 298,
    lastTraded: 295,
    offer: 293,
    offerQty: 35,
    trend: "down"
  },
  {
    projectName: "CCER-36M-06",
    date: "2025-06-10",
    bidQty: 40,
    bidPrice: 288,
    lastTraded: 290,
    offer: 292,
    offerQty: 40,
    trend: "up"
  },
  {
    projectName: "CCER-36M-07",
    date: "2025-07-10",
    bidQty: 45,
    bidPrice: 295,
    lastTraded: 298,
    offer: 300,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "CCER-36M-08",
    date: "2025-08-10",
    bidQty: 50,
    bidPrice: 302,
    lastTraded: 300,
    offer: 298,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "CCER-36M-09",
    date: "2025-09-10",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 295,
    offer: 297,
    offerQty: 55,
    trend: "up"
  },
  {
    projectName: "CCER-36M-10",
    date: "2025-10-10",
    bidQty: 60,
    bidPrice: 300,
    lastTraded: 302,
    offer: 305,
    offerQty: 60,
    trend: "up"
  }
]);

// 从localStorage获取表格数据
const getTableDataFromStorage = () => {
  const stored = localStorage.getItem("marketTableData");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("解析本地存储数据失败", e);
      return null;
    }
  }
  return null;
};

// 保存表格数据到localStorage
const saveTableDataToStorage = () => {
  try {
    const data = {
      "CCER-12M": ccer12TableData.value,
      "CCER-24M": ccer24TableData.value,
      "CCER-36M": ccer36TableData.value
    };
    localStorage.setItem("marketTableData", JSON.stringify(data));
  } catch (e) {
    console.error("保存表格数据失败", e);
  }
};

// 处理行点击事件
const handleRowClick = (row: MarketData) => {
  currentRow.value = row;
  drawerVisible.value = true;
};

// 处理数据更新
const handleDataUpdate = (updatedRow: MarketData) => {
  // 根据projectName前缀判断属于哪个表格
  const prefix =
    updatedRow.projectName.split("-")[0] +
    "-" +
    updatedRow.projectName.split("-")[1];

  let targetData;
  switch (prefix) {
    case "CCER-12M":
      targetData = ccer12TableData;
      break;
    case "CCER-24M":
      targetData = ccer24TableData;
      break;
    case "CCER-36M":
      targetData = ccer36TableData;
      break;
    default:
      return;
  }

  // 更新对应表格中的数据
  const index = targetData.value.findIndex(
    item => item.projectName === updatedRow.projectName
  );
  if (index !== -1) {
    targetData.value[index] = updatedRow;
    // 保存更新后的数据到localStorage
    saveTableDataToStorage();
  }
};

// 初始化数据
onMounted(() => {
  const storedData = getTableDataFromStorage();
  if (storedData) {
    ccer12TableData.value = storedData["CCER-12M"] || ccer12TableData.value;
    ccer24TableData.value = storedData["CCER-24M"] || ccer24TableData.value;
    ccer36TableData.value = storedData["CCER-36M"] || ccer36TableData.value;
  } else {
    // 如果没有存储的数据，保存初始数据
    saveTableDataToStorage();
  }
});

// 监听表格数据变化
watch(
  [ccer12TableData, ccer24TableData, ccer36TableData],
  () => {
    saveTableDataToStorage();
  },
  { deep: true }
);
</script>

<template>
  <div class="market-container">
    <el-tabs type="border-card">
      <el-tab-pane label="CCER-12M">
        <market-table :data="ccer12TableData" @row-click="handleRowClick" />
      </el-tab-pane>
      <el-tab-pane label="CCER-24M">
        <market-table :data="ccer24TableData" @row-click="handleRowClick" />
      </el-tab-pane>
      <el-tab-pane label="CCER-36M">
        <market-table :data="ccer36TableData" @row-click="handleRowClick" />
      </el-tab-pane>
    </el-tabs>

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
      class="market-detail-drawer"
    >
      <market-detail
        v-if="currentRow"
        :row="currentRow"
        column-name="市场"
        @update:row="handleDataUpdate"
      />
    </el-drawer>
  </div>
</template>

<style scoped>
.market-container {
  min-height: calc(100vh - 150px);
  padding: 20px;
  background: #fff;
}

:deep(.el-tabs--border-card) {
  background: #fff;
  border: none; /* 移除边框 */
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

:deep(.el-tabs__header) {
  margin: 0;
  background-color: #f8fafc;
  border-bottom: 1px solid #e4e7ed;
}

:deep(.el-tabs__nav) {
  border: none !important;
}

:deep(.el-tabs__item) {
  height: 50px;
  padding: 0 25px;
  font-size: 15px;
  line-height: 50px;
  border: none !important;
  transition: all 0.3s;
}

:deep(.el-tabs__item.is-active) {
  font-weight: 600;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
}

:deep(.el-tabs__content) {
  padding: 0; /* 移除内容区域的内边距 */
}

.market-detail-drawer {
  :deep(.el-drawer__body) {
    height: 100%;
    padding: 0 !important;
    overflow: hidden;
  }
}
</style>
