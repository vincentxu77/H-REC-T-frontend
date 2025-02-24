<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

interface PositionData {
  "CCER-12M": number;
  "CCER-24M": number;
  "CCER-36M": number;
  EUA: number;
}

// 生成随机初始持仓数据
const generateRandomPositions = (): PositionData => {
  return {
    "CCER-12M": Math.floor(Math.random() * 300) + 800, // 800-1100手
    "CCER-24M": Math.floor(Math.random() * 200) + 500, // 500-700手
    "CCER-36M": Math.floor(Math.random() * 150) + 200, // 200-350手
    EUA: Math.floor(Math.random() * 200) + 400 // 400-600手
  };
};

const positions = ref<PositionData>(generateRandomPositions());

// 从localStorage获取持仓数据
const getPositionsFromStorage = () => {
  const stored = localStorage.getItem("marketPositions");
  if (stored) {
    try {
      positions.value = JSON.parse(stored);
    } catch (e) {
      console.error("解析持仓数据失败", e);
      positions.value = generateRandomPositions();
    }
  }
};

// 保存持仓数据到localStorage
const savePositionsToStorage = () => {
  localStorage.setItem("marketPositions", JSON.stringify(positions.value));
};

// 更新持仓数据
const updatePosition = (type: keyof PositionData, volume: number) => {
  positions.value[type] += volume;
  savePositionsToStorage();
};

// 格式化数字
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("zh-CN").format(num);
};

// 监听持仓数据变化
watch(
  positions,
  () => {
    savePositionsToStorage();
  },
  { deep: true }
);

// 组件挂载时获取数据
onMounted(() => {
  getPositionsFromStorage();
});

defineExpose({
  updatePosition
});
</script>

<template>
  <div class="position-summary">
    <div class="summary-content">
      <div class="position-item total">
        <span class="label">总持仓数</span>
      </div>
      <div class="divider" />
      <div class="position-item">
        <span class="label">CCER-12M</span>
        <span class="value">{{ formatNumber(positions["CCER-12M"]) }}</span>
        <span class="unit">手</span>
      </div>
      <div class="position-item">
        <span class="label">CCER-24M</span>
        <span class="value">{{ formatNumber(positions["CCER-24M"]) }}</span>
        <span class="unit">手</span>
      </div>
      <div class="position-item">
        <span class="label">CCER-36M</span>
        <span class="value">{{ formatNumber(positions["CCER-36M"]) }}</span>
        <span class="unit">手</span>
      </div>
      <div class="position-item">
        <span class="label">EUA</span>
        <span class="value">{{ formatNumber(positions["EUA"]) }}</span>
        <span class="unit">手</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.position-summary {
  position: fixed;
  top: var(--header-height, 48px);
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 0 24px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fff, #f8fafc);
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 5%);
  transition: top 0.3s ease-in-out;
}

.summary-content {
  display: flex;
  gap: 24px;
  align-items: center;
  height: 36px;
}

.position-item {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
  line-height: 24px;
}

.position-item.total {
  padding-right: 24px;
}

.divider {
  width: 1px;
  height: 24px;
  margin: 0 8px;
  background: #dcdfe6;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.value {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.value.highlight {
  font-size: 18px;
  color: #336cfb;
}

.unit {
  margin-left: 2px;
  font-size: 12px;
  color: #909399;
}

.total .unit {
  font-size: 14px;
}
</style>
