import { ref, Ref, onUnmounted, onMounted } from 'vue';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { AntiShake } from '@/utils/common';

/**
 * eChart hook
 * @param domId
 * @param chart
 */
export const useChart = (domId: string): Ref<echarts.ECharts> => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = ref<echarts.ECharts | any>();
  const updateContainer = () => {
    // TODO resize 报错，响应式的问题，待处理
    selfChart.value.resize({
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });
  };

  onMounted(() => {
    if (!chartContainer) {
      chartContainer = document.getElementById(domId) as HTMLCanvasElement;
    }
    selfChart.value = echarts.init(chartContainer);
  });

  window.addEventListener('resize', updateContainer, false);

  onUnmounted(() => {
    window.removeEventListener('resize', updateContainer);
  });

  return selfChart;
};

/**
 * counter utils
 * @param duration
 * @returns
 */
export const useCounter = (duration = 60): [Ref<number>, () => void] => {
  let intervalTimer;
  onUnmounted(() => {
    clearInterval(intervalTimer);
  });
  const countDown = ref(0);

  return [
    countDown,
    () => {
      countDown.value = duration;
      intervalTimer = setInterval(() => {
        if (countDown.value > 0) {
          countDown.value -= 1;
        } else {
          clearInterval(intervalTimer);
          countDown.value = 0;
        }
      }, 1000);
    },
  ];
};

/**
 * 更新当前日期时间
 * @param format 日期时间格式
 * @returns
 */
export const useCurrentTime = (format = 'HH:mm:ss') => {
  const currentTime = ref(dayjs().format(format));
  const updateCurrentTime = () => {
    currentTime.value = dayjs().format(format);
  };
  const updateTimeInterval = setInterval(updateCurrentTime, 1000);
  onUnmounted(() => {
    clearInterval(updateTimeInterval);
  });
  return {
    currentTime,
  };
};

/**
 * 按比例缩放元素
 * @param w 宽度
 * @param h 高度
 */
export const useScale = (w = 1920, h = 1080) => {
  const style = ref({
    width: w + 'px',
    height: h + 'px',
    transform: 'scale(1) translate(-50%, -50%)',
  });

  onMounted(() => {
    setScale();
    window.onresize = AntiShake(setScale, 100);
  });

  // 获取放大缩小比例
  const getScale = () => {
    const { clientWidth, clientHeight } = document.body;
    const width = clientWidth / w;
    const height = clientHeight / h;
    return width < height ? width : height;
  };

  // 设置比例
  const setScale = () => {
    style.value.transform = 'scale(' + getScale() + ') translate(-50%, -50%)';
  };

  return { style };
};
