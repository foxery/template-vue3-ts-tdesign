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
import { onMounted, ref, watch } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';
import { useSettingStore } from '@/store';

interface IProps {
  initCenter: number[]; // 地图中心点位坐标
  containerId?: string; // 容器id
  path?: number[][]; // 路线点位坐标合集
  polygonConfig?: any; //面的样式设置
}

const props = withDefaults(defineProps<IProps>(), {
  containerId: 'container',
  polygonConfig: {
    strokeColor: '#FF33FF',
    strokeWeight: 6,
    strokeOpacity: 0.2,
    fillColor: '#1791fc',
    fillOpacity: 0.4,
    // 线样式还支持 'dashed'
    strokeStyle: 'solid',
    // strokeStyle是dashed时有效
    // strokeDasharray: [30,10],
  },
});

const emits = defineEmits(['onDraw', 'loaded']);

const settingStore = useSettingStore();

const map = shallowRef(null);
const mouseTool = ref();
const polyline = ref();
const polyEditor = ref();
const clearMap = ref(false);
const marker = ref();

watch(
  () => settingStore.displayMode,
  () => {
    setMapStyle();
  },
);

onMounted(() => {
  initMap();
});

const initMap = () => {
  AMapLoader.load({
    key: import.meta.env.VITE_MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.MouseTool', 'AMap.PolylineEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      //设置地图容器id
      map.value = new AMap.Map(props.containerId, {
        resizeEnable: true,
        center: props.initCenter, //初始化地图中心点位置
        zoom: 17, //初始化地图级别
        mapStyle: `amap://styles/${settingStore.displayMode === 'light' ? 'normal' : 'grey'}`,
      });

      // 绘制工具
      mouseTool.value = new AMap.MouseTool(map.value);

      // 绘制事件
      mouseTool.value.on('draw', function (event) {
        // event.obj 为绘制出来的覆盖物对象
        console.log(event, event.obj);
        emits('onDraw', event.obj);
      });

      emits('loaded');
    })
    .catch((e) => {
      console.log(e);
    });
};

// 设置地图主题色
const setMapStyle = () => {
  let styleName = `amap://styles/${settingStore.displayMode === 'light' ? 'normal' : 'grey'}`;
  map.value.setMapStyle(styleName);
};

// 绘制多边形
const drawPolygon = () => {
  mouseTool.value.polygon(props.polygonConfig);
};

// 设置多边形数组
const setPolygonGroup = (data: { points: [number, number][]; config }[], force = false) => {
  if (force) {
    map.value.clearMap();
  }
  let polygonArr = [];
  data.forEach((v) => {
    let polygon = new AMap.Polygon({ path: v.points, ...v.config });
    polygonArr.push(polygon);
  });
  map.value.add(polygonArr);
};

// 设置地图中心点位
const setCenter = (center: number[]) => {
  map.value.setCenter(center);
};

// 缩放地图到合适的视野级别
const setFitView = () => {
  map.value.setFitView();
};

// 生成marker
const setMarkerListener = (e) => {
  if (clearMap.value) {
    map.value.clearMap();
  }
  new AMap.Marker({
    position: e.lnglat,
    map: map.value,
  });
  emits('onDraw', e);
};

// 点击生成marker
const setMarkerBind = (flag) => {
  if (flag) clearMap.value = true;
  map.value.on('click', setMarkerListener);
};

// 解绑生成marker事件
const setMarkerUnBind = () => {
  map.value.off('click', setMarkerListener);
};

// 生成自定义点标记内容
const setCustomMarker = (point: number[], markerContent: any, offset = [0, 0]) => {
  var marker = new AMap.Marker({
    position: point,
    // 将 html 传给 content
    content: markerContent,
    // 以 icon 的 [center bottom] 为原点
    offset: new AMap.Pixel(offset[0], offset[1]),
  });

  // 将 markers 添加到地图
  map.value.add(marker);
};

defineExpose({
  drawPolygon,
  setMarkerBind,
  setMarkerUnBind,
  setPolygonGroup,
  setCenter,
  setFitView,
  setCustomMarker,
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
