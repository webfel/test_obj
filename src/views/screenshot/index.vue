<!--屏幕截图-->
<template>
  <div id="nodeBox">
    <img src="https://store.cdn.xu5g.com/avatar.png" />
    <div>
      <div class="btn" @click="setImage()">截取屏幕</div>
    </div>
    <img v-if="dataurl" :src="dataurl" alt="" srcset="">
  </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
  name: "ScreenShot",
  data() {
    return {
        dataurl:''
    };
  },
  methods: {
    setImage() {
      let that = this;
      var canvas2 = document.createElement("canvas");
      // let _canvas = document.getElementById('child');
      let _canvas = document.getElementById("nodeBox");
      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);
      //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w;
      canvas2.height = h;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      //可以按照自己的需求，对context的参数修改,translate指的是偏移量
      var context = canvas2.getContext("2d");
      context.scale(1, 1);
      html2canvas(document.getElementById("nodeBox"), {
        canvas: canvas2,
        // allowTaint:true, //是否图片跨域
      }).then(function(canvas) {
        var blob = that.getBlob(canvas);
        var oMyForm = new FormData();
        var fileName = "mobile" + ".jpg";
        oMyForm.append("file", blob, fileName);
        //              oMyForm.append("fileName", fileName);
        oMyForm.append("fileType", "image");
        oMyForm.append("user_id", that);
      });
    },
    getBlob(canvas) {
      //获取blob对象
      var data = canvas.toDataURL("image/jpeg", 1);
      this.dataurl = data;
      console.log(this.dataurl);
      data = data.split(",")[1];
      data = window.atob(data);
      var ia = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
      }
      return new Blob([ia], {
        type: "image/jpeg"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  @include button();
}
</style>