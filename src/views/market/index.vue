<script setup lang="ts">
import { ref } from "vue";
import MarketDetail from "./marketDetail.vue";
import MarketTable from "./components/MarketTable.vue";
import type { MarketData } from "./components/MarketTable.vue";

defineOptions({
  name: "Market"
});

const drawerVisible = ref(false);
const currentRow = ref<MarketData | null>(null);

// 处理行点击事件
const handleRowClick = (row: MarketData) => {
  currentRow.value = row;
  drawerVisible.value = true;
};

// EUA数据
const euaTableData = ref<MarketData[]>([
  {
    projectName: "国家核证自愿减排量",
    date: "2025-01-10",
    bidQty: 50,
    bidPrice: 248,
    lastTraded: 249,
    offer: 250,
    offerQty: 50,
    trend: "up"
  },
  {
    projectName: "林业碳汇项目",
    date: "2025-02-11",
    bidQty: 50,
    bidPrice: 247,
    lastTraded: 349,
    offer: 250,
    offerQty: 100,
    trend: "up"
  },
  {
    projectName: "可再生能源项目",
    date: "2025-03-12",
    bidQty: 100,
    bidPrice: 233,
    lastTraded: 240,
    offer: 235,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "甲烷利用项目",
    date: "2025-04-13",
    bidQty: 50,
    bidPrice: 240,
    lastTraded: 245,
    offer: 243,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "工业节能减排项目",
    date: "2025-05-14",
    bidQty: 75,
    bidPrice: 255,
    lastTraded: 258,
    offer: 260,
    offerQty: 75,
    trend: "up"
  },
  {
    projectName: "清洁交通项目",
    date: "2025-06-15",
    bidQty: 60,
    bidPrice: 262,
    lastTraded: 265,
    offer: 268,
    offerQty: 60,
    trend: "up"
  },
  {
    projectName: "建筑能效提升项目",
    date: "2025-07-16",
    bidQty: 45,
    bidPrice: 270,
    lastTraded: 272,
    offer: 275,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "农业减排项目",
    date: "2025-08-17",
    bidQty: 55,
    bidPrice: 268,
    lastTraded: 265,
    offer: 263,
    offerQty: 55,
    trend: "down"
  },
  {
    projectName: "垃圾处理项目",
    date: "2025-09-18",
    bidQty: 40,
    bidPrice: 258,
    lastTraded: 255,
    offer: 253,
    offerQty: 40,
    trend: "down"
  },
  {
    projectName: "工业废气利用项目",
    date: "2025-10-19",
    bidQty: 65,
    bidPrice: 252,
    lastTraded: 254,
    offer: 256,
    offerQty: 65,
    trend: "up"
  }
]);

// CCER-12数据
const ccer12TableData = ref<MarketData[]>([
  {
    projectName: "工业燃料替代项目",
    date: "2025-01-16",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 310,
    offer: 314,
    offerQty: 50,
    trend: "up"
  },
  {
    projectName: "节能技术改造项目",
    date: "2025-02-23",
    bidQty: 50,
    bidPrice: 315,
    lastTraded: 316,
    offer: 318,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "交通运输项目",
    date: "2025-03-30",
    bidQty: 25,
    bidPrice: 308,
    lastTraded: 310,
    offer: 320,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "太阳能光伏项目",
    date: "2025-04-07",
    bidQty: 35,
    bidPrice: 322,
    lastTraded: 325,
    offer: 328,
    offerQty: 35,
    trend: "up"
  },
  {
    projectName: "风力发电项目",
    date: "2025-05-14",
    bidQty: 40,
    bidPrice: 318,
    lastTraded: 315,
    offer: 313,
    offerQty: 40,
    trend: "down"
  },
  {
    projectName: "生物质能项目",
    date: "2025-06-21",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    trend: "up"
  },
  {
    projectName: "水电站项目",
    date: "2025-07-28",
    bidQty: 45,
    bidPrice: 312,
    lastTraded: 314,
    offer: 316,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "地热能利用项目",
    date: "2025-08-04",
    bidQty: 20,
    bidPrice: 300,
    lastTraded: 298,
    offer: 295,
    offerQty: 20,
    trend: "down"
  },
  {
    projectName: "工业余热利用项目",
    date: "2025-09-11",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 290,
    offer: 288,
    offerQty: 55,
    trend: "down"
  },
  {
    projectName: "煤层气利用项目",
    date: "2025-10-18",
    bidQty: 60,
    bidPrice: 285,
    lastTraded: 288,
    offer: 290,
    offerQty: 60,
    trend: "up"
  }
]);

// CCER-21数据
const ccer21TableData = ref<MarketData[]>([
  {
    projectName: "建筑节能项目",
    date: "2025-01-19",
    bidQty: 50,
    bidPrice: 290,
    lastTraded: 292,
    offer: 294,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "农业温室气体减排",
    date: "2025-02-19",
    bidQty: 25,
    bidPrice: 271,
    lastTraded: 276,
    offer: 275,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "垃圾填埋气体利用",
    date: "2025-03-19",
    bidQty: 50,
    bidPrice: 240,
    lastTraded: 240,
    offer: 242,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "工业废水处理项目",
    date: "2025-04-19",
    bidQty: 35,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 35,
    trend: "up"
  },
  {
    projectName: "热电联产项目",
    date: "2025-05-19",
    bidQty: 45,
    bidPrice: 255,
    lastTraded: 258,
    offer: 260,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "工业锅炉改造项目",
    date: "2025-06-19",
    bidQty: 40,
    bidPrice: 262,
    lastTraded: 260,
    offer: 258,
    offerQty: 40,
    trend: "down"
  },
  {
    projectName: "建筑材料节能项目",
    date: "2025-07-19",
    bidQty: 30,
    bidPrice: 252,
    lastTraded: 250,
    offer: 248,
    offerQty: 30,
    trend: "down"
  },
  {
    projectName: "工业电机系统优化",
    date: "2025-08-19",
    bidQty: 55,
    bidPrice: 245,
    lastTraded: 248,
    offer: 250,
    offerQty: 55,
    trend: "up"
  },
  {
    projectName: "能源管理系统项目",
    date: "2025-09-19",
    bidQty: 60,
    bidPrice: 252,
    lastTraded: 255,
    offer: 258,
    offerQty: 60,
    trend: "up"
  },
  {
    projectName: "清洁能源替代项目",
    date: "2025-10-19",
    bidQty: 50,
    bidPrice: 260,
    lastTraded: 262,
    offer: 265,
    offerQty: 50,
    trend: "up"
  }
]);

// CCER-36数据
const ccer36TableData = ref<MarketData[]>([
  {
    projectName: "水电项目",
    date: "2025-01-10",
    bidQty: 25,
    bidPrice: 265,
    lastTraded: 266,
    offer: 266,
    offerQty: 25,
    trend: "stable"
  },
  {
    projectName: "风电项目",
    date: "2025-02-10",
    bidQty: 25,
    bidPrice: 234,
    lastTraded: 232,
    offer: 238,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "光伏发电项目",
    date: "2025-03-10",
    bidQty: 25,
    bidPrice: 310,
    lastTraded: 312,
    offer: 318,
    offerQty: 25,
    trend: "up"
  },
  {
    projectName: "生物质能发电",
    date: "2025-04-10",
    bidQty: 30,
    bidPrice: 305,
    lastTraded: 308,
    offer: 310,
    offerQty: 30,
    trend: "up"
  },
  {
    projectName: "地热能开发",
    date: "2025-05-10",
    bidQty: 35,
    bidPrice: 298,
    lastTraded: 295,
    offer: 293,
    offerQty: 35,
    trend: "down"
  },
  {
    projectName: "海洋能利用",
    date: "2025-06-10",
    bidQty: 40,
    bidPrice: 288,
    lastTraded: 290,
    offer: 292,
    offerQty: 40,
    trend: "up"
  },
  {
    projectName: "氢能利用项目",
    date: "2025-07-10",
    bidQty: 45,
    bidPrice: 295,
    lastTraded: 298,
    offer: 300,
    offerQty: 45,
    trend: "up"
  },
  {
    projectName: "储能项目",
    date: "2025-08-10",
    bidQty: 50,
    bidPrice: 302,
    lastTraded: 300,
    offer: 298,
    offerQty: 50,
    trend: "down"
  },
  {
    projectName: "智能电网项目",
    date: "2025-09-10",
    bidQty: 55,
    bidPrice: 292,
    lastTraded: 295,
    offer: 297,
    offerQty: 55,
    trend: "up"
  },
  {
    projectName: "分布式能源项目",
    date: "2025-10-10",
    bidQty: 60,
    bidPrice: 300,
    lastTraded: 302,
    offer: 305,
    offerQty: 60,
    trend: "up"
  }
]);
</script>

<template>
  <div class="market-container">
    <el-tabs type="border-card">
      <el-tab-pane label="EUA">
        <market-table :data="euaTableData" @row-click="handleRowClick" />
      </el-tab-pane>
      <el-tab-pane label="CCER-12">
        <market-table :data="ccer12TableData" @row-click="handleRowClick" />
      </el-tab-pane>
      <el-tab-pane label="CCER-21">
        <market-table :data="ccer21TableData" @row-click="handleRowClick" />
      </el-tab-pane>
      <el-tab-pane label="CCER-36">
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
      <market-detail v-if="currentRow" :row="currentRow" column-name="市场" />
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
