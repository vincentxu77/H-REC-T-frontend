<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from "vue";

interface PositionData {
  "CCER-12M": number;
  "CCER-24M": number;
  "CCER-36M": number;
  EUA: number;
  SAF: number;
}

// 生成随机初始持仓数据
const generateRandomPositions = (): PositionData => {
  return {
    "CCER-12M": Math.floor(Math.random() * 300) + 800, // 800-1100手
    "CCER-24M": Math.floor(Math.random() * 200) + 500, // 500-700手
    "CCER-36M": Math.floor(Math.random() * 150) + 200, // 200-350手
    EUA: Math.floor(Math.random() * 200) + 400, // 400-600手
    SAF: Math.floor(Math.random() * 300) + 900 // 900-1200手
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

// 添加时间相关的逻辑
const currentTime = ref({
  hkt: "",
  cet: ""
});

const updateTime = () => {
  const now = new Date();

  // 格式化香港时间 (UTC+8)
  currentTime.value.hkt = now.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Hong_Kong"
  });

  // 格式化中欧时间 (UTC+1 冬令时/UTC+2 夏令时)
  currentTime.value.cet = now.toLocaleTimeString("zh-CN", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Paris"
  });
};

// 每秒更新时间
let timer: number;

// 移除滚动相关的响应式数据中的动画状态
const scrollContainerRef = ref<HTMLElement | null>(null);
const scrollContentRef = ref<HTMLElement | null>(null);
const isAnimationPaused = ref(false);
const currentPosition = ref(0);

// 添加空白块宽度的响应式数据
const spacerWidth = ref(0);

// 修改初始化滚动动画的逻辑
const initScrollAnimation = () => {
  const container = scrollContainerRef.value;
  const content = scrollContentRef.value;
  if (!container || !content) return;

  const itemsWrapper = content.querySelector(".position-items") as HTMLElement;
  if (!itemsWrapper) return;

  // 保存第一份内容的克隆并转换类型
  const originalContent = itemsWrapper.cloneNode(true) as HTMLElement;

  // 清空容器
  content.innerHTML = "";

  // 添加原始内容
  content.appendChild(originalContent);

  // 计算空白块宽度
  const containerWidth = container.offsetWidth;
  const contentWidth = originalContent.offsetWidth;
  // 计算从第一份内容右边界到容器右边界的距离
  const remainingSpace = containerWidth - contentWidth;
  // 空白块宽度取剩余空间和24px的较大值
  spacerWidth.value = Math.max(24, remainingSpace);

  // 添加空白块
  const spacer = document.createElement("div");
  spacer.className = "spacer";
  // 使用内联样式设置宽度和显示方式
  spacer.style.cssText = `
    width: ${spacerWidth.value}px;
    display: inline-block;
    flex-shrink: 0;
  `;
  content.appendChild(spacer);

  // 添加克隆的内容
  const clone = originalContent.cloneNode(true);
  content.appendChild(clone);

  // 重置位置
  currentPosition.value = 0;
  content.style.transform = `translateX(0)`;
};

// 修改动画帧处理逻辑
const handleAnimationFrame = () => {
  const container = scrollContainerRef.value;
  const content = scrollContentRef.value;
  if (!container || !content || isAnimationPaused.value) return;

  const itemsWrapper = content.querySelector(".position-items") as HTMLElement;
  if (!itemsWrapper) return;

  const contentWidth = itemsWrapper.offsetWidth;
  const speed = 0.5; // 增加速度以便测试效果

  // 更新位置
  currentPosition.value -= speed;

  // 当第一份内容完全移出视野时重置
  if (Math.abs(currentPosition.value) >= contentWidth + spacerWidth.value) {
    currentPosition.value = 0;
  }

  // 应用位置
  content.style.transform = `translateX(${currentPosition.value}px)`;

  requestAnimationFrame(handleAnimationFrame);
};

// 修改鼠标悬停处理
const handleMouseEnter = () => {
  isAnimationPaused.value = true;
};

const handleMouseLeave = () => {
  isAnimationPaused.value = false;
  // 恢复动画
  requestAnimationFrame(handleAnimationFrame);
};

// 修改窗口可见性变化处理
const handleVisibilityChange = () => {
  if (document.hidden) {
    isAnimationPaused.value = true;
  } else {
    isAnimationPaused.value = false;
    // 恢复动画
    requestAnimationFrame(handleAnimationFrame);
  }
};

// 监听容器尺寸变化
let resizeObserver: ResizeObserver;
const observeContainerSize = () => {
  const container = scrollContainerRef.value;
  if (!container) return;

  resizeObserver = new ResizeObserver(() => {
    initScrollAnimation();
  });
  resizeObserver.observe(container);
};

onMounted(() => {
  getPositionsFromStorage();
  updateTime();
  timer = window.setInterval(updateTime, 1000);

  // 初始化滚动动画
  initScrollAnimation();
  observeContainerSize();

  // 添加可见性变化监听
  document.addEventListener("visibilitychange", handleVisibilityChange);
  requestAnimationFrame(handleAnimationFrame);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  document.removeEventListener("visibilitychange", handleVisibilityChange);
});

defineExpose({
  updatePosition
});
</script>

<template>
  <div class="position-summary">
    <div class="summary-content">
      <!-- 左侧标题区域 -->
      <div class="left-section">
        <div class="position-item total">
          <span class="label">当前总持仓数</span>
        </div>
      </div>

      <!-- 中间持仓数据区域 -->
      <div
        ref="scrollContainerRef"
        class="middle-section"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div ref="scrollContentRef" class="scroll-content">
          <div class="position-items">
            <div class="position-item">
              <span class="label">CCER-12M</span>
              <span class="value">{{
                formatNumber(positions["CCER-12M"])
              }}</span>
              <span class="unit">手</span>
            </div>
            <div class="position-item">
              <span class="label">CCER-24M</span>
              <span class="value">{{
                formatNumber(positions["CCER-24M"])
              }}</span>
              <span class="unit">手</span>
            </div>
            <div class="position-item">
              <span class="label">CCER-36M</span>
              <span class="value">{{
                formatNumber(positions["CCER-36M"])
              }}</span>
              <span class="unit">手</span>
            </div>
            <div class="position-item">
              <span class="label">EUA</span>
              <span class="value">{{ formatNumber(positions["EUA"]) }}</span>
              <span class="unit">手</span>
            </div>
            <div class="position-item">
              <span class="label">SAF</span>
              <span class="value">{{ formatNumber(positions["SAF"]) }}</span>
              <span class="unit">手</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧时间区域 -->
      <div class="right-section">
        <div class="time-item">
          <span class="time-label">HKT</span>
          <span class="time-value">{{ currentTime.hkt }}</span>
        </div>
        <div class="time-item">
          <span class="time-label">CET</span>
          <span class="time-value">{{ currentTime.cet }}</span>
        </div>
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
  background: linear-gradient(
    to right,
    var(--el-bg-color),
    var(--el-bg-color-overlay)
  );
  box-shadow: 0 2px 12px 0 var(--el-box-shadow);
  transition: top 0.3s ease-in-out;
}

.summary-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}

.left-section {
  min-width: 104px;
  border-right: 1px solid var(--el-border-color);
}

.middle-section {
  position: relative;
  flex-grow: 1;
  padding: 0 24px;
  overflow: hidden;
}

.right-section {
  display: flex;
  gap: 24px;
  min-width: 240px;
  padding-left: 24px;
  border-left: 1px solid var(--el-border-color);
}

.position-item {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
  line-height: 24px;
}

.time-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.time-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.time-value {
  font-family: "Helvetica Neue", Helvetica, monospace;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.value {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.unit {
  margin-left: 2px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.total .unit {
  font-size: 14px;
}

.scroll-content {
  display: flex;
  align-items: center;
}

.position-items {
  display: flex;
  flex-shrink: 0;
  gap: 24px;
}

.spacer {
  flex-shrink: 0;
  height: 100%;
}
</style>
