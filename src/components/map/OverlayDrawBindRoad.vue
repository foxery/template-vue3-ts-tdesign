<!--
 * @FileDescription: 绘制矢量图形组件
 *
 * props.containerId 最好传入全局唯一id，否则有风险
 *
 * setMarkerBind事件调用后，记得手动再调用setMarkerUnBind事件解绑
 -->
<template>
  <div :id="props.containerId" ref="map" class="map-container"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useSettingStore } from '@/store';
import OverlayDrawBindRoad from '@/components/map/OverlayDrawBindRoad';

interface IProps {
  initCenter: number[]; // 地图中心点位坐标
  containerId?: string; // 容器id
  path?: number[][]; // 路线点位坐标合集
}

const props = withDefaults(defineProps<IProps>(), {
  containerId: 'container',
});

const settingStore = useSettingStore();

let map = null;

onMounted(() => {
  initMap();
});

const drawPolyline = () => {
  map.drawPolyline();
};
const resetPolyline = () => {
  map.resetPolyline();
};
const getPolyline = () => {
  console.log(map.getPolyline);
  return map.getPolyline;
};
const initMap = () => {
  map = new OverlayDrawBindRoad({
    container: `#${props.containerId}`,
    resizeEnable: true,
    center: [120.234844, 30.212123], // 初始化地图中心点位置
    plugins: ['AMap.MouseTool', 'AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    zoom: 17, // 初始化地图级别
    mapStyle: `amap://styles/${settingStore.displayMode === 'light' ? 'normal' : 'grey'}`,
  });
  map.on('onLoad', () => {
    map.initMap().initMouseTool();
    console.log(map);
  });
};
defineExpose({
  drawPolyline,
  resetPolyline,
  getPolyline,
});
</script>
<style lang="less" scoped>
.map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 700px;
}
</style>
