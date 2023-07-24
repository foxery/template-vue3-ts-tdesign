<!--
 * @FileDescription: 绘制 多线段、点组件 - 计算线的距离
 *
 * props.containerId 最好传入全局唯一id，否则有风险
 *
 * setMarkerBind事件调用后，记得手动再调用setMarkerUnBind事件解绑
 -->
<template>
  <div class="w-full h-full relative">
    <div v-if="!readonly" class="absolute map-tip">鼠标单击右键呼出菜单，单击鼠标左键新增，双击鼠标左键结束绘制。</div>
    <div class="absolute map-card">
      <t-button v-if="config.showSaveButton" @click="mapSaveEditor">保存修改</t-button>
    </div>
    <div :id="props.containerId" ref="map" class="map-container"></div>
  </div>
</template>
<script setup lang="ts">
import { onUnmounted, reactive, watch } from 'vue';
import { useSettingStore } from '@/store';
import OverlayDraws from '@/utils/three/OverlayDraws';

/**
 * MultiLineAndMile 计算里程的多线段
 * OnlyMarker       单marker点
 */
type TypeEnum = 'MultiLineAndMile' | 'OnlyMarker';

interface IProps {
  initCenter: number[]|null; // 地图中心点位坐标
  polyline?: any[][]; // 线
  marker?: [number, number]; // 点
  containerId?: string; // 容器id
  type?: TypeEnum; // 组件需要展示的种类
  zoom?: number;
  immediate?: boolean; // 是否直接画点/线，不需要右键菜单选择
  polylineConfig?: any; // 线的自定义样式
  markerConfig?: any; // 点的自定义样式
  readonly?: boolean; // 是否只读
}

const props = withDefaults(defineProps<IProps>(), {
  containerId: 'container',
  type: 'MultiLineAndMile',
  readonly: false,
  immediate: false,
});

const settingStore = useSettingStore();

let overlayDraw = null;

const initMap = () => {
  overlayDraw = new OverlayDraws({
    props,
    container: `#${props.containerId}`,
    resizeEnable: true,
    doubleClickZoom: false,
    center: props.initCenter, // 初始化地图中心点位置
    plugins: ['AMap.MouseTool', 'AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    zoom: props.zoom || 17, // 初始化地图级别
    mapStyle: `amap://styles/${settingStore.displayMode === 'light' ? 'normal' : 'grey'}`,
  });
  overlayDraw.on('onLoad', () => {
    overlayDraw.initMap().initMouseTool().initContextMenu();
    overlayDraw.isOnload = true;
  });
  overlayDraw.on('watchIsEditor', (val: boolean) => {
    config.showSaveButton = val;
  });
};

initMap();
onUnmounted(() => {
  overlayDraw.clear();
});

const config = reactive({
  showSaveButton: false,
});

const getMarker = () => {
  return overlayDraw.overlays_marker;
};
const setMarker = (path: [number, number]) => {
  if (overlayDraw.isOnload) {
    overlayDraw.setMarker(path);
    return;
  }
  overlayDraw.on('onLoad', () => {
    overlayDraw.setMarker(path);
  });
};
const getPolyline = () => {
  return overlayDraw.overlays_polyline;
};
// 设置是否可以编辑线段 默认为 true
const setEditorLineStatus = (flag: boolean) => {
  overlayDraw.setEditorLineStatus(flag);
};
// 设置点的样式
const setMarkerConfig = (opt: any) => {
  overlayDraw.setMarkerConfig(opt);
};
// 设置线的样式
const setPolylineConfig = (opt: any) => {
  overlayDraw.setPolylineConfig(opt);
};
const setPolyline = (polyline: any[][]) => {
  if (overlayDraw.isOnload) {
    overlayDraw.setPolyline(polyline);
    return;
  }
  overlayDraw.on('onLoad', () => {
    overlayDraw.setPolyline(polyline);
  });
};

const mapSaveEditor = () => {
  overlayDraw.saveEditor();
};

const setCenter = (center) => {
  overlayDraw.setCenter(center, true);
};

watch(
  () => props.polyline,
  () => {
    if (props.type === 'MultiLineAndMile') {
      setPolyline(props.polyline);
    }
    if (props.type === 'OnlyMarker') {
      setMarker(props.marker);
    }
  },
  {
    immediate: true,
  },
);
defineExpose({
  getMarker,
  setMarkerConfig,
  setPolylineConfig,
  setEditorLineStatus,
  getPolyline,
  setMarker,
  setPolyline,
  setCenter,
});
</script>
<style lang="less" scoped>
.map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 700px;
}
.map-card {
  top: 30px;
  left: 0px;
  padding: 4px 15px;
  z-index: 999;
}
.map-tip {
  left: 0;
  top: 0;
  width: 100%;
  padding: 4px 15px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  z-index: 990;
}
</style>
