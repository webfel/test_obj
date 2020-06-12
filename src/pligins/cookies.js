export default {
    //设置cookies
    setCookie:function(name, value,Days) {
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
        /* 
        如果使用域名存储，可以加上domain  例如：
        document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/;domain=.xu5g.com";
        */
    },

    //读取cookies
    getCookie:function(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return arr[2];
        }
        else {
            return null;
        }

    },

    //删除cookies
    delCookie:function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}