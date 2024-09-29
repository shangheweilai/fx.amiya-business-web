<template>
    <div class="content">
        
        <div class="item" @click="$router.push('/orderList')">
            <i class="iconfont icon-dingdanliebiao icon_order"></i>
            <span class="title2">订单列表</span>
        </div>
        <div class="item" @click="$router.push('/noDispatch')">
            <i class="iconfont icon-weiwanchengpaidan icon_dispatch"></i>
            <span class="title">未派单列表</span>
        </div>
        <div class="item" @click="$router.push('/dispatched')">
            <i class="iconfont icon-wanchengpaidan icon_dispatch"></i>
            <span class="title">已派单列表</span>
        </div>
    </div>
</template>
<style scoped lang="less">
.content{
    width: 100%;
    height: 100vh;
    background: linear-gradient(#8ab4fe,#fff);
    padding-top: 30px;
    box-sizing: border-box;
    .item{
        width: 80%;
        height: 45px;
        line-height: 45px;
        background: #fff;
        border-radius: 30px;
       
        margin: 0 auto 30px;
        display: flex;
        align-items: center;
        color: #5492FE;
        .icon_dispatch{
            font-size: 32px;
            margin-left: -12px;
        }
        .title{
            font-size: 16px;
            margin-left: -34px;
        }
        .icon_order{
            font-size: 30px;
            margin-left: 30px;
        }
        .title2{
            font-size: 16px;
            margin-left: 10px;
        }
    }
}
</style>
