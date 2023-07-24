<!--
 * @FileDescription: 线路轨迹回放组件
 *
 * props.initMarkerPosition 不传入时，不可调用
   startAnimation,
   pauseAnimation,
   resumeAnimation,
   stopAnimation
 *
 * props.containerId 最好传入全局唯一id，否则有风险
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
  linePoints: number[][]; // 线路轨迹点位坐标合集
  initCenter: number[]; // 地图中心点位坐标
  initMarkerPosition?: number[]; // 车辆icon点位坐标
  containerId?: string; // 容器id
}

const props = withDefaults(defineProps<IProps>(), {
  containerId: 'container',
});

const settingStore = useSettingStore();

const map = shallowRef(null);
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
    plugins: ['AMap.MoveAnimation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      //设置地图容器id
      map.value = new AMap.Map(props.containerId, {
        resizeEnable: true,
        center: props.initCenter, //初始化地图中心点位置
        zoom: 17, //初始化地图级别
        mapStyle: `amap://styles/${settingStore.displayMode === 'light' ? 'normal' : 'grey'}`,
      });

      // 绘制轨迹
      const polyline = new AMap.Polyline({
        map: map.value,
        path: props.linePoints,
        showDir: true,
        strokeColor: '#28F', //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6, //线宽
        // strokeStyle: "solid"  //线样式
      });

      const passedPolyline = new AMap.Polyline({
        map: map.value,
        strokeColor: '#AF5', //线颜色
        strokeWeight: 6, //线宽
      });

      if (props.initMarkerPosition) {
        marker.value = new AMap.Marker({
          map: map.value,
          position: props.initMarkerPosition,
          icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
          offset: new AMap.Pixel(-13, -26),
        });

        marker.value.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
          map.value.setCenter(e.target.getPosition(), true);
        });
      }

      map.value.setFitView();
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

// 传入props.initMarkerPosition时才可调用以下方法
// 开始动画
const startAnimation = () => {
  marker.value.moveAlong(props.linePoints, {
    // 每一段的时长
    duration: 500, //可根据实际采集时间间隔设置
    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
    autoRotation: true,
  });
};

// 暂停动画
const pauseAnimation = () => {
  marker.value.pauseMove();
};

// 继续动画
const resumeAnimation = () => {
  marker.value.resumeMove();
};

// 停止动画
const stopAnimation = () => {
  marker.value.stopMove();
};

defineExpose({
  startAnimation,
  pauseAnimation,
  resumeAnimation,
  stopAnimation,
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
