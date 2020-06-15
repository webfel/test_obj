<!--cookie存储-->
<template>
    <div>
        <h4 class="btn" @click="setCookie()">存储cookie</h4>
        <h4 class="btn" @click="getCookie()">获取cookie</h4>
        <h4 class="btn" @click="delCookie()">删除cookie</h4>
        <div class="cookie-inp">
            <el-input v-model="name" placeholder="请输入要存储的cookie值" ></el-input>
        </div>
        <p class="cookies">cookie的值为：{{ cookie?cookie:'空' }}</p>
    </div>
</template>
<script>
import Cookies from '@/pligins/cookies.js'
export default {
    name:'Cookie',
    data() {
        return {
            cookie:'',
            name:''
        }
    },
    created() {
        // 获取cookie
        this.cookie = Cookies.getCookie('name')
    },
    methods: {
        //设置cookie
        setCookie:function(){
            if (!this.name) return this.$message.warning('请先输入要存储的值')
            Cookies.setCookie('name', this.name,15);
            this.$message.success('cookie存储成功')
            this.name = ''
        },
        //读取cookie
        getCookie:function(){
            this.cookie = Cookies.getCookie('name');
        },
        //删除cookie
        delCookie:function(){
            Cookies.delCookie('name');
           this.cookie = Cookies.getCookie('name');
        }
    },
}
</script>
<style lang="scss">
    .btn {
        margin-right: 15px;
        @include button();
    }
    .cookie-inp {
        width: 200px;
        margin: 0 auto;
    }
</style>