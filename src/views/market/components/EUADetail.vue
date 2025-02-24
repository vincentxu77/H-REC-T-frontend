<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, h } from "vue";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import type { EUAData } from "../types";
import dayjs from "dayjs";
import { ElMessageBox, ElMessage } from "element-plus";
import { ElInputNumber } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

defineOptions({
  name: "EUADetail"
});

const props = defineProps<{
  row: EUAData;
}>();

const emit = defineEmits<{
  (e: "update:row", row: EUAData): void;
}>();

const chartRef = ref();
let priceChart: echarts.ECharts | null = null;

interface TradeRecord {
  time: string;
  price: number;
  volume: number;
  direction: "买入" | "卖出";
}

// 交易表单数据
interface TradeForm {
  volume: number | undefined;
  price: number | undefined;
}

// 从localStorage获取存储的交易记录
const getStoredTradeForm = () => {
  const stored = localStorage.getItem("euaTradeFormData");
  if (stored) {
    try {
      const parsedData = JSON.parse(stored);
      // 查找当前项目的最新记录
      const latestRecord = parsedData.find(
        (item: any) => item.productName === props.row.productName
      );
      if (latestRecord) {
        return {
          volume: latestRecord.volume,
          price: latestRecord.price
        };
      }
    } catch (e) {
      console.error("解析本地存储数据失败", e);
    }
  }
  return {
    volume: undefined,
    price: undefined
  };
};

const tradeForm = ref<TradeForm>(getStoredTradeForm());

// 生成模拟的交易记录
const generateTradeRecords = () => {
  const records: TradeRecord[] = [];
  const now = dayjs();
  const basePrice = props.row.lastPrice;
  const times = [];
  const prices = [];

  let lastPrice = basePrice;

  for (let i = 9; i >= 0; i--) {
    const time = now.subtract(i * 15, "minute");
    const direction = Math.random() > 0.5 ? 1 : -1;
    const change = direction * (Math.random() * 0.5); // 最大变化0.5欧元
    const price = Number((lastPrice + change).toFixed(2));
    lastPrice = price;

    const volume = Math.floor(Math.random() * 1000) + 100;
    const tradeDirection = Math.random() > 0.5 ? "买入" : "卖出";

    records.push({
      time: time.format("YYYY-MM-DD HH:mm"),
      price,
      volume,
      direction: tradeDirection
    });

    times.push(time.format("HH:mm"));
    prices.push(price);
  }

  return { records, times, prices };
};

const { records, times, prices } = generateTradeRecords();
const historyData = ref(records);

const initPriceChart = async () => {
  await nextTick();
  if (!chartRef.value) return;

  if (priceChart) {
    priceChart.dispose();
  }

  // 等待容器渲染完成
  await new Promise(resolve => setTimeout(resolve, 100));

  priceChart = echarts.init(chartRef.value);
  window.addEventListener("resize", handleResize);

  const option: EChartsOption = {
    backgroundColor: "#1a2332",
    title: {
      text: props.row.productName,
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "normal"
      }
    },
    grid: {
      left: "10%",
      right: "5%",
      top: "15%",
      bottom: "12%",
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(26, 35, 50, 0.9)",
      borderColor: "#4c5a75",
      textStyle: {
        color: "#fff"
      },
      formatter: (params: any) => {
        const [param] = params;
        return `${param.name}<br/>价格：${param.value}€`;
      }
    },
    xAxis: {
      type: "category",
      data: times,
      axisLine: {
        lineStyle: {
          color: "#4c5a75"
        }
      },
      axisLabel: {
        color: "#7a8baa",
        rotate: 45
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      name: "价格(CNY)",
      nameTextStyle: {
        color: "#fff",
        padding: [0, 30, 0, 0]
      },
      position: "left",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff"
        }
      },
      axisLabel: {
        color: "#fff",
        formatter: (value: number) => value.toFixed(2)
      },
      splitLine: {
        lineStyle: {
          color: "#2a3446",
          type: "dashed"
        }
      }
    },
    series: [
      {
        data: prices,
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#32c5ff",
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(50,197,255,0.3)"
            },
            {
              offset: 1,
              color: "rgba(50,197,255,0.1)"
            }
          ])
        }
      }
    ]
  };

  priceChart.setOption(option);
  priceChart.resize();
};

// 格式化数字
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// 格式化成交量
const formatVolume = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

// 窗口大小改变时重新调整图表大小
const handleResize = () => {
  priceChart?.resize();
};

// 定时刷新数据
let refreshTimer: number | null = null;
const refreshData = () => {
  const { records, times, prices } = generateTradeRecords();
  historyData.value = records;
  priceChart?.setOption({
    xAxis: {
      data: times
    },
    series: [
      {
        data: prices
      }
    ]
  });
};

const dialogVisible = ref(false);
const formRef = ref<FormInstance>();
const currentDirection = ref<"买入" | "卖出">("买入");

const rules: FormRules = {
  volume: [
    { required: true, message: "请输入数量", trigger: "blur" },
    { type: "number", min: 1, message: "数量必须大于0", trigger: "blur" }
  ],
  price: [
    { required: true, message: "请输入价格", trigger: "blur" },
    { type: "number", min: 0.01, message: "价格必须大于0", trigger: "blur" }
  ]
};

// 处理交易按钮点击
const handleTrade = (direction: "买入" | "卖出") => {
  currentDirection.value = direction;
  dialogVisible.value = true;
  tradeForm.value = getStoredTradeForm();
};

// 处理表单提交
const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    const now = dayjs();
    const newRecord: TradeRecord = {
      time: now.format("YYYY-MM-DD HH:mm"),
      price: tradeForm.value.price!,
      volume: tradeForm.value.volume!,
      direction: currentDirection.value
    };

    // 更新表格数据
    historyData.value.unshift(newRecord);

    // 更新图表数据
    const newTimes = [...times];
    const newPrices = [...prices];
    newTimes.push(now.format("HH:mm"));
    newPrices.push(newRecord.price);
    if (newTimes.length > 10) {
      newTimes.shift();
      newPrices.shift();
    }
    priceChart?.setOption({
      xAxis: { data: newTimes },
      series: [{ data: newPrices }]
    });

    // 计算涨跌幅
    const change =
      ((newRecord.price - props.row.openPrice) / props.row.openPrice) * 100;

    // 更新父组件数据
    const updatedRow: EUAData = {
      ...props.row,
      lastPrice: newRecord.price,
      volume: props.row.volume + newRecord.volume,
      change,
      highPrice: Math.max(props.row.highPrice, newRecord.price),
      lowPrice: Math.min(props.row.lowPrice, newRecord.price)
    };

    // 发送更新事件到父组件
    emit("update:row", updatedRow);

    // 重置表单
    tradeForm.value = {
      volume: undefined,
      price: undefined
    };

    dialogVisible.value = false;
    ElMessage.success(`${currentDirection.value}交易提交成功`);
  } catch (error) {
    console.error("表单验证失败:", error);
  }
};

// 处理取消
const handleCancel = () => {
  dialogVisible.value = false;
  formRef.value?.resetFields();
};

onMounted(async () => {
  await initPriceChart();
  window.addEventListener("resize", handleResize);
  refreshTimer = window.setInterval(refreshData, 600000);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
  }
  if (priceChart) {
    priceChart.dispose();
    priceChart = null;
  }
});
</script>

<template>
  <div class="market-detail">
    <div class="chart-container">
      <div ref="chartRef" class="price-chart" />
    </div>
    <div class="action-buttons">
      <el-button
        type="success"
        size="large"
        class="trade-button"
        @click="handleTrade('买入')"
        >买入</el-button
      >
      <el-button
        type="danger"
        size="large"
        class="trade-button"
        @click="handleTrade('卖出')"
        >卖出</el-button
      >
    </div>

    <!-- 交易弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentDirection + '交易'"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :show-close="false"
      destroy-on-close
      class="trade-dialog"
    >
      <el-form
        ref="formRef"
        :model="tradeForm"
        :rules="rules"
        label-width="120px"
        class="trade-form"
      >
        <el-form-item label="产品" class="form-item">
          <span class="form-text">{{ props.row.productName }}</span>
        </el-form-item>
        <el-form-item label="到期时间" class="form-item">
          <span class="form-text">{{ props.row.date }}</span>
        </el-form-item>
        <el-form-item label="买/卖" class="form-item">
          <span
            class="form-text"
            :class="currentDirection === '买入' ? 'buy-color' : 'sell-color'"
            >{{ currentDirection }}</span
          >
        </el-form-item>
        <el-form-item label="数量" prop="volume" class="form-item">
          <el-input-number
            v-model="tradeForm.volume"
            :min="1"
            controls-position="right"
            placeholder="请输入数量"
            class="trade-input"
          />
          <span class="form-text">&nbsp;&nbsp;手</span>
          <el-tooltip
            content="1手 = 100吨二氧化碳当量"
            placement="top"
            :show-after="100"
          >
            <span class="ep--info-filled info-icon" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="价格" prop="price" class="form-item">
          <el-input-number
            v-model="tradeForm.price"
            :min="0.01"
            :precision="2"
            controls-position="right"
            placeholder="请输入价格"
            class="trade-input"
          />
          <span class="form-text">&nbsp;&nbsp;CNY</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button
            class="submit-button"
            :type="currentDirection === '买入' ? 'danger' : 'success'"
            @click="handleSubmit"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <div class="history-table">
      <el-table
        :data="historyData"
        style="width: 100%"
        :header-cell-style="{
          background: '#2a3446',
          color: '#7a8baa',
          borderColor: '#1f2937'
        }"
        :cell-style="{
          background: '#1f2937',
          color: '#fff',
          borderColor: '#2a3446'
        }"
      >
        <el-table-column prop="time" label="成交时间" width="180" />
        <el-table-column prop="price" label="价格" align="right">
          <template #default="{ row }">
            <span
              :class="[
                'price-text',
                row.direction === '买入' ? 'buy-direction' : 'sell-direction'
              ]"
            >
              {{ formatNumber(row.price) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" label="数量" align="right">
          <template #default="{ row }">
            {{ formatVolume(row.volume) }}
          </template>
        </el-table-column>
        <el-table-column prop="direction" label="方向" align="center">
          <template #default="{ row }">
            <span
              :class="
                row.direction === '买入' ? 'buy-direction' : 'sell-direction'
              "
            >
              {{ row.direction }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.market-detail {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: auto;
  color: #fff;
  background: #1a2332;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin-bottom: 16px;
  overflow: hidden;
  background: #1f2937;
  border-radius: 8px;
}

.price-chart {
  width: 100%;
  height: 100%;
}

.history-table {
  padding: 16px;
  margin-top: 16px;
  background: #1f2937;
  border-radius: 8px;
}

:deep(.el-table) {
  background: transparent !important;
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-table__row:hover > td) {
  background-color: #2a3446 !important;
}

.buy-direction {
  font-weight: 500;
  color: #67c23a;
}

.sell-direction {
  font-weight: 500;
  color: #f56c6c;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 5px 0 20px;
}

.trade-button {
  width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
}

:deep(.trade-button.el-button--danger) {
  --el-button-bg-color: #f56c6c;
  --el-button-border-color: #f56c6c;
  --el-button-hover-bg-color: #db5c5c;
  --el-button-hover-border-color: #db5c5c;
  --el-button-active-bg-color: #c45151;
  --el-button-active-border-color: #c45151;
}

:deep(.trade-button.el-button--success) {
  --el-button-bg-color: #67c23a;
  --el-button-border-color: #67c23a;
  --el-button-hover-bg-color: #5daf34;
  --el-button-hover-border-color: #5daf34;
  --el-button-active-bg-color: #529a2e;
  --el-button-active-border-color: #529a2e;
}

.trade-dialog {
  :deep(.el-dialog) {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);

    .el-dialog__header {
      padding: 20px 24px;
      margin: 0;
      background: #f5f7fa;
      border-bottom: 1px solid #e4e7ed;

      .el-dialog__title {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }

    .el-dialog__body {
      padding: 24px;
    }

    .el-dialog__footer {
      padding: 12px 24px;
      border-top: 1px solid #e4e7ed;
    }
  }
}

.trade-form {
  .form-item {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #606266;
    }

    .form-text {
      font-size: 14px;
      font-weight: 500;
      color: #303133;

      &.buy-color {
        font-weight: 600;
        color: #67c23a;
      }

      &.sell-color {
        font-weight: 600;
        color: #f56c6c;
      }
    }

    :deep(.el-input-number) {
      width: 200px;

      .el-input__wrapper {
        padding: 1px 11px;
        border-radius: 4px;
        box-shadow: 0 0 0 1px #dcdfe6 inset;
        transition: all 0.2s;

        &:hover {
          box-shadow: 0 0 0 1px #c0c4cc inset;
        }

        &.is-focus {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
      }

      .el-input-number__decrease,
      .el-input-number__increase {
        background: #f5f7fa;
        border-color: #dcdfe6;
        transition: all 0.2s;

        &:hover {
          color: var(--el-color-primary);
          background: #e4e7ed;
        }
      }

      .el-input__inner {
        height: 36px;
        font-size: 14px;
        line-height: 36px;
      }
    }
  }
}

.price-text {
  font-weight: 500;

  &.buy-direction {
    color: #67c23a;
  }

  &.sell-direction {
    color: #f56c6c;
  }
}

.dialog-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  :deep(.el-button) {
    min-width: 120px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;

    &.submit-button {
      --el-button-bg-color: #32c5ff;
      --el-button-border-color: #32c5ff;
      --el-button-hover-bg-color: #2db7e5;
      --el-button-hover-border-color: #2db7e5;
      --el-button-active-bg-color: #2aa6d0;
      --el-button-active-border-color: #2aa6d0;
      --el-button-text-color: #fff;
    }

    &--danger {
      --el-button-bg-color: #f56c6c;
      --el-button-border-color: #f56c6c;
      --el-button-hover-bg-color: #db5c5c;
      --el-button-hover-border-color: #db5c5c;
      --el-button-active-bg-color: #c45151;
      --el-button-active-border-color: #c45151;
    }

    &--success {
      --el-button-bg-color: #67c23a;
      --el-button-border-color: #67c23a;
      --el-button-hover-bg-color: #5daf34;
      --el-button-hover-border-color: #5daf34;
      --el-button-active-bg-color: #529a2e;
      --el-button-active-border-color: #529a2e;
    }
  }
}

.info-icon {
  margin-left: 4px;
  color: #909399;
  vertical-align: middle;
  cursor: help;
}

.ep--info-filled {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.99 12.99 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296c-44.096 0-108.992 44.736-148.48 101.504c0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04c67.84 0 107.904-43.648 147.456-100.416z'/%3E%3C/svg%3E");

  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
