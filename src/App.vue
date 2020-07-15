<template>
  <div id="app">
    <h3 id="time" @click="outputDate">{{new Date().toLocaleString()}}</h3>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/cookie">Cookie</router-link> |
      <router-link to="/screenshot">ScreenShot</router-link>|
      <router-link to="/tree">Tree</router-link>|
      <router-link to="/map/search">BmapSearch</router-link>|
      <router-link to="/map/draw">BmapDraw</router-link>|
      <router-link to="/map/draw1">BmapDraw</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    console.log('beforeCreate:组件创建之前', document.querySelector('#nav'))
    // 此状态下不可以操作方法  ，执行以下方法控制台会报错
    // console.log('beforeCreate',this.outputDate())
  },
  created () {
    console.log('created：组件创建之后（dom还没渲染，但是课可以操作方法）', document.querySelector('#nav'))
    this.outputDate()
  },
  mounted () {
    console.log('mounted：组件创建之后，dom渲染之后', document.querySelector('#nav'))
  },
  methods: {
    outputDate () {
      console.log(new Date().toLocaleString())
    }
  }
}
</script>

<style lang="scss">
// 注意这里没有使用@import
// 全局font-size: 20px;
// 变量$text-color、$theme-color
// 和button()的mixin是借助sass-resources-loader实现的
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $text-color;
    &.router-link-exact-active {
      color: $theme-color;
    }
  }
}
#time{
  @include button();
}
</style>
