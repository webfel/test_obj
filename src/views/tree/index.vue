<template>
    <div>
        <p>
            原始的：{{source}}
        </p>
        <p>
            处理之后的：{{toTree(this.source)}}
        </p>
        <p class="tool">
            注：可百度搜索json解析，将这两个解析后查看效果
        </p>
    </div>
</template>
<script>
    export  default  {
        name: 'tree',
        data(){
            return {
                source: [{
                    id: 1,
                    pid: 0,
                    name: 'body'
                }, {
                    id: 2,
                    pid: 1,
                    name: 'title'
                }, {
                    id: 3,
                    pid: 1,
                    name: 'div'
                }, {
                    id: 4,
                    pid: 3,
                    name: 'span'
                }, {
                    id: 5,
                    pid: 3,
                    name: 'icon'
                }, {
                    id: 6,
                    pid: 4,
                    name: 'subspan'
                }],
            }
        },
        methods:{
            toTree(val) {
                let result = []
                if(!Array.isArray(val)) {
                    return result
                }
                val.forEach(item => {
                    delete item.children;
                });
                let map = {};
                val.forEach(item => {
                    map[item.id] = item;
                });
                val.forEach(item => {
                    let parent = map[item.pid];
                    if(parent) {
                        (parent.children || (parent.children = [])).push(item);
                    } else {
                        result.push(item);
                    }
                });
                return result;
            }
        }
    }
</script>
<style>
    .tool {
        color: red;
        font-size: 14px;
    }
</style>