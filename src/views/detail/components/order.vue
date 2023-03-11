<template>
    <div class="content">
        
    </div>
</template>
<script>
import * as api from "@/api/order.js";

export default {
    props:{
        active:Number,
        // orderIfon:Object
    },
    data(){
        return{
          
        }

    },
    methods:{
       
    },
    created(){
    }
}
</script>

<style scoped lang="less">
.content{
    width: 92%;
    background: #fff;
    // height: 350px;
    margin: 20px auto 0;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgba(0, 0.5);
    padding: 10px;
    box-sizing: border-box;
    .anchor {
        border-left: 3px solid #eacebf;
        font-size: 16px;
        font-weight: bold;
        padding-left: 5px;
        box-sizing: border-box;
        height: 17px;
        line-height: 17px;
        color: #5492fe;
        margin-bottom: 10px;
    }
    .item_f{
        font-size: 13px;
        color: #5492fe;
        display: flex;
        justify-content: space-between;
        span{
            width: 50%;
            margin: 1px 0;
        }
    }
}
</style>