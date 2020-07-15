<template>
    <div class="hello" v-loading="loading">
        <el-input style="width: 300px" v-model="keyword"></el-input>
        <el-button @click="searchAddress()">检索</el-button>
        <div class="map-wrap">
            <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler" ak="rIv2CMtCyMC5brlW2mmzw5SiKI1BkDAH"></baidu-map>
            <div class="search-data">
                <ul>
                    <li v-for="(item,index) in searchData" :key="index" class="add-list">
                        <p>{{ item.title }}</p>
                        <p>{{ item.address }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    export default {
        name: 'HelloWorld',
        components: {
            BaiduMap,
        },
        data() {
            return {
                BMapLib: '',
                searchData:[],
                loading: true,
                keyword: '',
                BMap:null,
                map: null,
                zoom: 17,
                center: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        methods: {
            // 初始化百度地图
            handler ({BMap, map}){
                this.map = map;
                this.BMap = BMap;
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 16;
                this.loading = false;
            },
            // 检索按钮
            searchAddress(){
                if(!this.keyword){
                    this.$message.warning('请先输入关键词')
                    return
                }
                this.loading = true;
                var _this = this;
                console.log(this.BMap)
                let local = new _this.BMap.LocalSearch(_this.map, {
                    renderOptions:{map: _this.map},
                    onMarkersSet: function (arr) {
                        console.log(arr)
                        _this.searchData = arr
                        _this.loading = false
                    }
                });
                local.search(_this.keyword,{ forceLocal: false })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .map-wrap {
        margin-top: 10px;
        display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
        display: -moz-box; /* Firefox 17- */
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: -ms-flexbox; /* IE 10 */
        display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
    }
    .bm-view {
        width: 30%;
        height: 400px;
    }
    .add-list {
        list-style-type: none;
        font-size: 14px;
        padding: 10px;
    }
    .add-list:not(:first-child) {
        border-top: 1px solid #dddddd;
    }
    .add-list > p {
        margin-bottom: 0;
        text-align: left;
    }
</style>
