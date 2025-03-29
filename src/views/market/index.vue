<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import MarketDetail from "./marketDetail.vue";
import EUADetail from "./components/EUADetail.vue";
import SAFDetail from "./components/SAFDetail.vue";
import MarketTable from "./components/MarketTable.vue";
import EUATable from "./components/EUATable.vue";
import SAFTable from "./components/SAFTable.vue";
import type { MarketData, EUAData, SAFData } from "./types";
import { hasPerms } from "@/utils/auth";

defineOptions({
  name: "Market"
});

const drawerVisible = ref(false);
const currentRow = ref<MarketData | EUAData | SAFData | null>(null);
const activeMarket = ref("CCER-12M");

// 获取父组件的 PositionSummary 引用，并指定类型
const positionSummaryRef = inject<
  | { value: { updatePosition: (type: string, volume: number) => void } }
  | undefined
>("positionSummaryRef");

// CCER-12M数据
const ccer12TableData = ref<MarketData[]>([
  {
    projectName: "CCER-12M-01",
    date: "2026-01-16",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 310,
    offer: 314,
    offerQty: 50,
    highPrice: 316,
    trend: "up"
  },
  {
    projectName: "CCER-12M-02",
    date: "2026-02-23",
    bidQty: 50,
    bidPrice: 315,
    lastTraded: 316,
    offer: 318,
    offerQty: 25,
    highPrice: 320,
    trend: "up"
  },
  {
    projectName: "CCER-12M-03",
    date: "2026-03-30",
    bidQty: 25,
    bidPrice: 308,
    lastTraded: 310,
    offer: 320,
    offerQty: 25,
    highPrice: 322,
    trend: "up"
  },
  {
    projectName: "CCER-12M-04",
    date: "2026-04-07",
    bidQty: 35,
    bidPrice: 322,
    lastTraded: 325,
    offer: 328,
    offerQty: 35,
    highPrice: 330,
    trend: "up"
  },
  {
    projectName: "CCER-12M-05",
    date: "2026-05-14",
    bidQty: 40,
    bidPrice: 318,
    lastTraded: 315,
    offer: 313,
    offerQty: 40,
    highPrice: 320,
    trend: "down"
  },
  {
    projectName: "CCER-12M-06",
    date: "2026-06-21",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    highPrice: 312,
    trend: "up"
  },
  {
    projectName: "CCER-12M-07",
    date: "2026-07-28",
    bidQty: 45,
    bidPrice: 312,
    lastTraded: 314,
    offer: 316,
    offerQty: 45,
    highPrice: 318,
    trend: "up"
  },
  {
    projectName: "CCER-12M-08",
    date: "2026-08-04",
    bidQty: 20,
    bidPrice: 300,
    lastTraded: 298,
    offer: 295,
    offerQty: 20,
    highPrice: 302,
    trend: "down"
  },
  {
    projectName: "CCER-12M-09",
    date: "2026-09-11",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 290,
    offer: 288,
    offerQty: 55,
    highPrice: 294,
    trend: "down"
  },
  {
    projectName: "CCER-12M-10",
    date: "2026-10-18",
    bidQty: 60,
    bidPrice: 285,
    lastTraded: 288,
    offer: 290,
    offerQty: 60,
    highPrice: 292,
    trend: "up"
  }
]);

// CCER-24M数据
const ccer24TableData = ref<MarketData[]>([
  {
    projectName: "CCER-24M-01",
    date: "2027-01-19",
    bidQty: 50,
    bidPrice: 290,
    lastTraded: 292,
    offer: 294,
    offerQty: 50,
    highPrice: 296,
    trend: "down"
  },
  {
    projectName: "CCER-24M-02",
    date: "2027-02-19",
    bidQty: 25,
    bidPrice: 271,
    lastTraded: 276,
    offer: 275,
    offerQty: 25,
    highPrice: 278,
    trend: "up"
  },
  {
    projectName: "CCER-24M-03",
    date: "2027-03-19",
    bidQty: 50,
    bidPrice: 240,
    lastTraded: 240,
    offer: 242,
    offerQty: 50,
    highPrice: 245,
    trend: "down"
  },
  {
    projectName: "CCER-24M-04",
    date: "2027-04-19",
    bidQty: 35,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 35,
    highPrice: 252,
    trend: "up"
  },
  {
    projectName: "CCER-24M-05",
    date: "2027-05-19",
    bidQty: 45,
    bidPrice: 255,
    lastTraded: 258,
    offer: 260,
    offerQty: 45,
    highPrice: 262,
    trend: "up"
  },
  {
    projectName: "CCER-24M-06",
    date: "2027-06-19",
    bidQty: 40,
    bidPrice: 262,
    lastTraded: 260,
    offer: 258,
    offerQty: 40,
    highPrice: 264,
    trend: "down"
  },
  {
    projectName: "CCER-24M-07",
    date: "2027-07-19",
    bidQty: 30,
    bidPrice: 252,
    lastTraded: 250,
    offer: 248,
    offerQty: 30,
    highPrice: 254,
    trend: "down"
  },
  {
    projectName: "CCER-24M-08",
    date: "2027-08-19",
    bidQty: 55,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 55,
    highPrice: 252,
    trend: "up"
  },
  {
    projectName: "CCER-24M-09",
    date: "2027-09-19",
    bidQty: 60,
    bidPrice: 252,
    lastTraded: 255,
    offer: 258,
    offerQty: 60,
    highPrice: 260,
    trend: "up"
  },
  {
    projectName: "CCER-24M-10",
    date: "2027-10-19",
    bidQty: 50,
    bidPrice: 260,
    lastTraded: 262,
    offer: 265,
    offerQty: 50,
    highPrice: 268,
    trend: "up"
  }
]);

// CCER-36M数据
const ccer36TableData = ref<MarketData[]>([
  {
    projectName: "CCER-36M-01",
    date: "2028-01-10",
    bidQty: 25,
    bidPrice: 265,
    lastTraded: 266,
    offer: 266,
    offerQty: 25,
    highPrice: 268,
    trend: "stable"
  },
  {
    projectName: "CCER-36M-02",
    date: "2028-02-10",
    bidQty: 25,
    bidPrice: 234,
    lastTraded: 232,
    offer: 238,
    offerQty: 25,
    highPrice: 240,
    trend: "up"
  },
  {
    projectName: "CCER-36M-03",
    date: "2028-03-10",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 312,
    offer: 318,
    offerQty: 25,
    highPrice: 320,
    trend: "up"
  },
  {
    projectName: "CCER-36M-04",
    date: "2028-04-10",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    highPrice: 312,
    trend: "up"
  },
  {
    projectName: "CCER-36M-05",
    date: "2028-05-10",
    bidQty: 35,
    bidPrice: 298,
    lastTraded: 295,
    offer: 293,
    offerQty: 35,
    highPrice: 300,
    trend: "down"
  },
  {
    projectName: "CCER-36M-06",
    date: "2028-06-10",
    bidQty: 40,
    bidPrice: 288,
    lastTraded: 290,
    offer: 292,
    offerQty: 40,
    highPrice: 294,
    trend: "up"
  },
  {
    projectName: "CCER-36M-07",
    date: "2028-07-10",
    bidQty: 45,
    bidPrice: 295,
    lastTraded: 298,
    offer: 300,
    offerQty: 45,
    highPrice: 302,
    trend: "up"
  },
  {
    projectName: "CCER-36M-08",
    date: "2028-08-10",
    bidQty: 50,
    bidPrice: 302,
    lastTraded: 300,
    offer: 298,
    offerQty: 50,
    highPrice: 304,
    trend: "down"
  },
  {
    projectName: "CCER-36M-09",
    date: "2028-09-10",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 295,
    offer: 297,
    offerQty: 55,
    highPrice: 299,
    trend: "up"
  },
  {
    projectName: "CCER-36M-10",
    date: "2028-10-10",
    bidQty: 60,
    bidPrice: 300,
    lastTraded: 302,
    offer: 305,
    offerQty: 60,
    highPrice: 308,
    trend: "up"
  }
]);

// EUA数据
const euaTableData = ref<EUAData[]>([
  {
    productName: "EUA Dec-24",
    date: "2024-12-31",
    openPrice: 65.23,
    lastPrice: 66.45,
    highPrice: 66.89,
    lowPrice: 65.12,
    volume: 15234,
    change: 1.87
  },
  {
    productName: "EUA Dec-25",
    date: "2025-12-31",
    openPrice: 68.45,
    lastPrice: 67.89,
    highPrice: 68.92,
    lowPrice: 67.34,
    volume: 12456,
    change: -0.82
  },
  {
    productName: "EUA Dec-26",
    date: "2026-12-31",
    openPrice: 70.12,
    lastPrice: 71.34,
    highPrice: 71.56,
    lowPrice: 70.01,
    volume: 9876,
    change: 1.74
  },
  {
    productName: "EUA Mar-24",
    date: "2024-03-31",
    openPrice: 63.45,
    lastPrice: 64.23,
    highPrice: 64.67,
    lowPrice: 63.21,
    volume: 8765,
    change: 1.23
  },
  {
    productName: "EUA Jun-24",
    date: "2024-06-30",
    openPrice: 64.78,
    lastPrice: 63.98,
    highPrice: 64.89,
    lowPrice: 63.67,
    volume: 7654,
    change: -1.24
  }
]);

// SAF数据
const safTableData = ref<SAFData[]>([
  {
    code: "SAF-C-2025Q1",
    productName: "SAF-C-Q",
    date: "2025-03-31",
    openPrice: 58.2,
    lastPrice: 58.2,
    highPrice: 58.5,
    lowPrice: 57.9,
    volume: 280,
    change: 0.0,
    feedstock: "废弃食用油",
    carbonIntensity: 20.5,
    certification: "CORSIA"
  },
  {
    code: "SAF-C-2025Q2",
    productName: "SAF-C-Q",
    date: "2025-06-30",
    openPrice: 60.0,
    lastPrice: 61.2,
    highPrice: 61.5,
    lowPrice: 59.8,
    volume: 300,
    change: 2.0,
    feedstock: "藻类",
    carbonIntensity: 18.7,
    certification: "ISCC"
  },
  {
    code: "SAF-C-2025Q3",
    productName: "SAF-C-Q",
    date: "2025-09-30",
    openPrice: 61.5,
    lastPrice: 60.9,
    highPrice: 61.8,
    lowPrice: 60.5,
    volume: 320,
    change: -1.0,
    feedstock: "木质纤维素",
    carbonIntensity: 22.3,
    certification: "RSB"
  },
  {
    code: "SAF-C-2025Q4",
    productName: "SAF-C-Q",
    date: "2025-12-31",
    openPrice: 62.3,
    lastPrice: 62.3,
    highPrice: 62.5,
    lowPrice: 62.1,
    volume: 250,
    change: 0.0,
    feedstock: "农业残余物",
    carbonIntensity: 24.8,
    certification: "ISCC"
  },
  {
    code: "SAF-C-2025H1",
    productName: "SAF-C-H",
    date: "2025-06-30",
    openPrice: 59.0,
    lastPrice: 60.5,
    highPrice: 60.8,
    lowPrice: 58.8,
    volume: 350,
    change: 2.5,
    feedstock: "废弃食用油",
    carbonIntensity: 20.9,
    certification: "RSB"
  },
  {
    code: "SAF-C-2025H2",
    productName: "SAF-C-H",
    date: "2025-12-31",
    openPrice: 62.0,
    lastPrice: 61.4,
    highPrice: 62.3,
    lowPrice: 61.0,
    volume: 300,
    change: -1.0,
    feedstock: "藻类",
    carbonIntensity: 19.2,
    certification: "CORSIA"
  },
  {
    code: "SAF-C-2025",
    productName: "SAF-C-Y",
    date: "2025-12-31",
    openPrice: 60.5,
    lastPrice: 60.5,
    highPrice: 60.8,
    lowPrice: 60.3,
    volume: 200,
    change: 0.0,
    feedstock: "木质纤维素",
    carbonIntensity: 22.8,
    certification: "ISCC"
  },
  {
    code: "SAF-C-2026",
    productName: "SAF-C-Y",
    date: "2026-12-31",
    openPrice: 63.5,
    lastPrice: 65.1,
    highPrice: 65.4,
    lowPrice: 63.2,
    volume: 400,
    change: 2.5,
    feedstock: "农业残余物",
    carbonIntensity: 24.5,
    certification: "RSB"
  },
  {
    code: "SAF-C-2027",
    productName: "SAF-C-Y",
    date: "2027-12-31",
    openPrice: 64.8,
    lastPrice: 62.8,
    highPrice: 65.0,
    lowPrice: 62.5,
    volume: 380,
    change: -3.1,
    feedstock: "能源作物",
    carbonIntensity: 27.3,
    certification: "CORSIA"
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
      "CCER-36M": ccer36TableData.value,
      EUA: euaTableData.value,
      SAF: safTableData.value
    };
    localStorage.setItem("marketTableData", JSON.stringify(data));
  } catch (e) {
    console.error("保存表格数据失败", e);
  }
};

// 处理行点击事件
const handleRowClick = (row: MarketData | EUAData | SAFData) => {
  if ("projectName" in row) {
    // 处理 CCER 数据
    currentRow.value = row as MarketData;
  } else if ("feedstock" in row) {
    // 处理 SAF 数据
    currentRow.value = row as SAFData;
  } else {
    // 处理 EUA 数据
    currentRow.value = row as EUAData;
  }
  drawerVisible.value = true;
};

// 处理数据更新
const handleDataUpdate = (updatedRow: MarketData | EUAData | SAFData) => {
  if ("projectName" in updatedRow) {
    // 处理 CCER 数据
    const prefix =
      (updatedRow as MarketData).projectName.split("-")[0] +
      "-" +
      (updatedRow as MarketData).projectName.split("-")[1];

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
      item => item.projectName === (updatedRow as MarketData).projectName
    );
    if (index !== -1) {
      const oldRow = targetData.value[index];
      targetData.value[index] = updatedRow as MarketData;

      // 计算持仓变化
      const volumeChange = (updatedRow as MarketData).bidQty - oldRow.bidQty;
      if (volumeChange !== 0) {
        positionSummaryRef.value?.updatePosition(prefix, volumeChange);
      }
    }
  } else if ("feedstock" in updatedRow) {
    // 处理 SAF 数据
    const index = safTableData.value.findIndex(
      item => item.productName === (updatedRow as SAFData).productName
    );
    if (index !== -1) {
      const oldRow = safTableData.value[index];
      safTableData.value[index] = updatedRow as SAFData;

      // 计算持仓变化
      const volumeChange =
        Math.floor((updatedRow as SAFData).volume / 100) -
        Math.floor(oldRow.volume / 100);
      if (volumeChange !== 0) {
        positionSummaryRef.value?.updatePosition("SAF", volumeChange);
      }
    }
  } else {
    // 处理 EUA 数据
    const index = euaTableData.value.findIndex(
      item => item.productName === (updatedRow as EUAData).productName
    );
    if (index !== -1) {
      const oldRow = euaTableData.value[index];
      euaTableData.value[index] = updatedRow as EUAData;

      // 计算持仓变化
      const volumeChange =
        Math.floor((updatedRow as EUAData).volume / 100) -
        Math.floor(oldRow.volume / 100);
      if (volumeChange !== 0) {
        positionSummaryRef.value?.updatePosition("EUA", volumeChange);
      }
    }
  }
  // 保存更新后的数据到localStorage
  saveTableDataToStorage();
};

// 在 onMounted 之前先清除旧数据
localStorage.removeItem("marketTableData");

// 初始化数据
onMounted(() => {
  const storedData = getTableDataFromStorage();
  if (!storedData) {
    // 如果没有存储的数据，保存初始数据
    saveTableDataToStorage();
  }
  // 注意：这里移除了从 localStorage 读取数据的逻辑，保证使用代码中的新数据
});

// 监听表格数据变化
watch(
  [
    ccer12TableData,
    ccer24TableData,
    ccer36TableData,
    euaTableData,
    safTableData
  ],
  () => {
    saveTableDataToStorage();
  },
  { deep: true }
);
</script>

<template>
  <div class="market-container">
    <div class="market-header">
      <span class="market-title">交易品种</span>
      <el-radio-group v-model="activeMarket" fill="#336cfb">
        <el-radio-button label="CCER-12M">CCER-12M</el-radio-button>
        <el-radio-button label="CCER-24M">CCER-24M</el-radio-button>
        <el-radio-button label="CCER-36M">CCER-36M</el-radio-button>
        <el-radio-button label="EUA">EUA</el-radio-button>
        <el-radio-button label="SAF">SAF</el-radio-button>
      </el-radio-group>
    </div>

    <div class="market-content">
      <market-table
        v-if="activeMarket === 'CCER-12M'"
        :data="ccer12TableData"
        @row-click="handleRowClick"
      />
      <market-table
        v-if="activeMarket === 'CCER-24M'"
        :data="ccer24TableData"
        @row-click="handleRowClick"
      />
      <market-table
        v-if="activeMarket === 'CCER-36M'"
        :data="ccer36TableData"
        @row-click="handleRowClick"
      />
      <EUATable
        v-if="activeMarket === 'EUA'"
        :data="euaTableData"
        @row-click="handleRowClick"
      />
      <SAFTable
        v-if="activeMarket === 'SAF'"
        :data="safTableData"
        @row-click="handleRowClick"
      />
    </div>

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
        v-if="currentRow && 'projectName' in currentRow"
        :row="currentRow"
        column-name="市场"
        @update:row="handleDataUpdate"
      />
      <EUADetail
        v-if="
          currentRow &&
          'productName' in currentRow &&
          !('feedstock' in currentRow)
        "
        :row="currentRow"
        @update:row="handleDataUpdate"
      />
      <SAFDetail
        v-if="currentRow && 'feedstock' in currentRow"
        :row="currentRow"
        @update:row="handleDataUpdate"
      />
    </el-drawer>
  </div>
</template>

<style scoped>
.market-container {
  min-height: calc(100vh - 150px);
  padding: 20px;
  margin: 50px 24px 0 !important;
  background: var(--el-bg-color);
  border-radius: 4px;
}

.market-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.market-title {
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.market-content {
  margin-bottom: 20px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}

.market-detail-drawer {
  :deep(.el-drawer__body) {
    height: 100%;
    padding: 0 !important;
    overflow: hidden;
  }
}

:deep(.el-radio-button__inner) {
  min-width: 108px;
  color: var(--el-text-color-regular);
  background: var(--el-bg-color);
  border-color: var(--el-border-color);
}

:deep(.el-radio-button__inner:hover) {
  color: #fff;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  color: #fff;
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner:hover) {
  color: #fff;
}

:deep(.market-detail-drawer) {
  .el-drawer {
    background: #1a2332;
  }

  .el-drawer__body {
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}
</style>
