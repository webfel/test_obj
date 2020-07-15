<template>
    <div>
        <div id="my-map" style="height: 600px"></div>
        <el-button @click="initDrawing">开始绘制</el-button>
        <el-button @click="clearAll">重新绘制</el-button>
    </div>
</template>
<script>
    import { loadBaiDuDrawMap } from '@/pligins/bmap.js'
    export default {
        name: 'Draw',
        data(){
            return {
                cityName:'郑州',
                cityZoom: 17,
                bmap: null,
                drawingManager: null,
                overlays: [],
                styleOptions: {
                    strokeColor:"red",    //边线颜色。
                    fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
                    strokeWeight: 1,       //边线的宽度，以像素为单位。
                    strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
                    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
                    strokeStyle: 'solid' //边线的样式，solid或dashed。
                }
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
            initMap () { // 初始化地图
                let _this = this
                loadBaiDuDrawMap().then(BMap => {
                    _this.bmap = new BMap.Map('my-map', {enableMapClick: false})            // 创建Map实例
                    _this.bmap.centerAndZoom(_this.cityName, _this.cityZoom) //设置地图中心点以及缩放比例
                    _this.bmap.enableScrollWheelZoom()
                    _this.bmap.clearOverlays()
                    _this.bmap.addControl(new BMap.NavigationControl({anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT', type: 'BMAP_NAVIGATION_CONTROL_ZOOM'}))
                })
            },
            //鼠标绘制完成回调方法   获取各个点的经纬度
            overlaycomplete(e){
                this.overlays.push(e.overlay);
                let path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
                for(let i=0;i<path.length;i++){
                    console.log("lng:"+path[i].lng+"\n lat:"+path[i].lat);
                }
                this.drawingManager.close();
            },
            initDrawing(){
                if(this.drawingManager){
                    this.drawingManager.open();
                }else {
                    let _this = this
                    //实例化鼠标绘制工具
                    this.drawingManager = new BMapLib.DrawingManager(_this.bmap, {
                        isOpen: false, //是否开启绘制模式
                        enableDrawingTool: false, //是否显示工具栏
                        drawingMode:BMAP_DRAWING_POLYGON,//绘制模式  多边形
                        polygonOptions: this.styleOptions //多边形的样式
                    });
                    //添加鼠标绘制工具监听事件，用于获取绘制结果
                    this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
                    this.drawingManager.open();
                }
            },
            clearAll() {
                for(var i = 0; i < this.overlays.length; i++){
                    this.bmap.removeOverlay(this.overlays[i]);
                }
                this.overlays.length = 0;
                this.initDrawing();
            }
        },
        beforeDestroy() {
            if(this.drawingManager){
                this.drawingManager.removeEventListener('overlaycomplete', this.overlaycomplete);
                this.drawingManager = null;
            }
        }
    }
</script>
