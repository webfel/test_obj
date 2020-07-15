<template>
    <div v-loading="loading">
        <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            :scroll-wheel-zoom="true"
            @click="mapClick"
            @ready="handler" ak="rIv2CMtCyMC5brlW2mmzw5SiKI1BkDAH">
                <bm-polygon :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false" @lineupdate="updatePolygonPath" />
        </baidu-map>
        <el-button>开始绘制</el-button>
    </div>
</template>
<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import BmPolygon from 'vue-baidu-map/components/overlays/Polygon'

    export default {
        name: 'Draw1',
        components: {
            BaiduMap,
            BmPolygon
        },
        data() {
            return {
                isDraw: true,
                loading: true,
                center: '郑州',
                zoom: 15,
                polygonPath: []
            }
        },
        methods: {
            // 初始化百度地图
            handler ({BMap, map}){
                this.map = map;
                this.BMap = BMap;
                this.loading = false;
            },
            updatePolygonPath (e) {
                this.polygonPath = e.target.getPath()
            },
            mapClick(data){
                if(!this.isDraw){
                    return;
                }
                this.polygonPath.push(data.point)
            }
        }
    }
</script>
<style>
    .bm-view {
        height: 600px;
    }
</style>
