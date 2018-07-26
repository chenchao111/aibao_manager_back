export function initMarker(options) {
  var _default = {
    position: [116.38, 39.90], // 初始值天安门
    title: '',
    draggable: false,
    visible: true,
    events: {
      dragend: (MapsEvent) => { // 拖拽结束改变marker定位点
        MapsEvent.target.position = [MapsEvent.lnglat.lng, MapsEvent.lnglat.lat]
      },
      click: (marker) => { // 点击marker能够触发路线
        if (options.driving && options.currentLocationMarker) { // 如果需要触发路线  并且 有起始marker
          const startLngLat = options.currentLocationMarker.position
          const endLngLat = [marker.lnglat.lng, marker.lnglat.lat]
          options.driving.search(startLngLat, endLngLat, (status, result) => {
            // 未出错时，result即是对应的路线规划方案
          })
        }
      }
    }
  }
  if (options) {
    for (const attr in options) {
      if (options.hasOwnProperty(attr)) {
        _default[attr] = options[attr]
      }
    }
  }
  return _default
}
export function addMarker(options, markers) {
  return markers.push(initMarker(options))
}
export function initGeolocationPlugin(map) {
  return new Promise((resolve) => {
    // 定位插件, 用来获取当前定位点位置
    map.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      })
      map.addControl(geolocation)
      resolve(geolocation)
      // geolocation.getCurrentPosition((status, result) => { // 获取精确定位点，将marker定位到此处
      //   self.currentLocationMarker.position = [result.position.lng, result.position.lat]
      // })
    })
  })
}
export function initDrivingPlugin(map, AMap) {
  return new Promise((resolve) => {
    // 初始化驾驶路线
    AMap.plugin('AMap.Driving', () => {
      const driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        // map 指定将路线规划方案绘制到对应的AMap.Map对象上
        map: map,
        // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
        panel: 'panel'
      })
      resolve(driving)
    })
  })
}
