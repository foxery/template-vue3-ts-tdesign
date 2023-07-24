import { MessagePlugin } from 'tdesign-vue-next';
import BaseMap from '@/utils/three/BaseMap';

export default class OverlayDrawBindRoad extends BaseMap {
  private lineList: any;

  private allLineList: any;

  private mouseTool: {
    [x: string]: any;
    on: (arg0: string, arg1: (event: any) => void) => void;
    close: (arg0: boolean) => void;
  };

  // 线的经纬度集合
  get getPolyline() {
    const list = [];
    if (this.allLineList.length === 0) {
      return [];
    }
    this.allLineList.forEach((el) => {
      const res = el.map((el) => [el.lng, el.lat]);
      list.push(res);
    });
    return list;
  }

  constructor(options) {
    super(options);
    this.init();
  }

  init() {
    this.allLineList = [];
    this.lineList = [];
    this.mouseTool = null;
  }

  initPolyline(path) {
    return new AMap.Polyline({
      path,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.9,
      zIndex: 50,
      bubble: true,
      map: BaseMap.map,
    });
  }

  resetPolyline() {
    BaseMap.map.remove(this.mouseTool);
    BaseMap.map.clearMap();
    this.init();
  }

  drawPolyline() {
    if (this.mouseTool) {
      this.mouseTool.polyline();
      return this;
    }
    this.initMouseTool().drawPolyline();
    return this;
  }

  initMouseTool() {
    this.mouseTool = new AMap.MouseTool(BaseMap.map);
    this.mouseTool.on('draw', (event) => {
      const paths: any[] = event.obj.getPath();

      // TODO: 超过18个点之后的轮询处理
      if (paths.length >= 2) {
        let first = this.filterLngLatToArray(paths[0]); // 第一个元素
        const last = this.filterLngLatToArray(paths[paths.length - 1]); // 最后一个元素
        const rest = this.filterListToArray(paths.slice(1, paths.length - 1)); // 去除第一个和最后一个元素后的新数组

        const lastPosition = this.getLastLinePosition();
        if (lastPosition) {
          first = lastPosition;
        }
        this.bindRoadApi(first, last, rest.join(';'));
        this.mouseTool.close(true);
      }
    });
    return this;
  }

  bindRoadApi(origin, destination, waypoints?: string) {
    const url = `https://restapi.amap.com/v5/direction/driving?key=14fa50f0af6139363dab2277b1dac122&origin=${origin}&destination=${destination}&extensions=all&output=json&strategy=2&show_fields=polyline&waypoints=${waypoints}`;
    fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === '0') {
          MessagePlugin.error('绑路调用失败！');
        } else if (result.route?.paths) {
          this.distanceHandle(result.route.paths[0].steps);
        }
      })
      .catch((error) => console.log('error', error));
  }

  distanceHandle(paths) {
    const allLine = [];
    paths.forEach((el) => {
      const polyline = el.polyline.split(';').map((el) => el.split(',').map((el) => Number(el)));
      console.log(el);
      polyline.forEach((ele) => {
        allLine.push(new AMap.LngLat(ele[0], ele[1]));
      });
      const position = this.getCenterPoint(polyline);
      const marker = new AMap.Marker({
        position,
        content: `${el.step_distance}m`,
      });
      BaseMap.map.add(marker);
    });
    this.initPolyline(allLine);
    this.allLineList.push(allLine);
    console.log(this.allLineList);
  }

  getCenterPoint(points: [number, number][]): [number, number] {
    let sumLng = 0;
    let sumLat = 0;
    for (let i = 0; i < points.length; i++) {
      sumLng += points[i][0];
      sumLat += points[i][1];
    }
    const avgLng = sumLng / points.length;
    const avgLat = sumLat / points.length;
    return [avgLng, avgLat];
  }

  getLastLinePosition() {
    if (this.allLineList.length === 0) {
      return false;
    }
    const lastList = this.allLineList[this.allLineList.length - 1];
    const lastPosition = lastList[lastList.length - 1];
    return `${lastPosition.lng},${lastPosition.lat}`;
  }

  filterLngLatToArray(item) {
    return `${item.lng},${item.lat}`;
  }

  filterListToArray(list) {
    const tmp = [];
    list.forEach((el) => {
      tmp.push(this.filterLngLatToArray(el));
    });
    return tmp;
  }

  clear() {
    // eslint-disable-next-line no-unused-expressions
    this.mouseTool && BaseMap.map.remove(this.mouseTool);
    this.allLineList = [];
    this.lineList = [];
    this.mouseTool = null;
    super.destroy();
  }
}
