<template>
    <div class="content">
        <div class="left">
            <div class="list_con">
                <div>
                    <div @click="menuClick('抖音')" class="nav">
                         <span style="font-weight:bold">抖音</span>
                        <span  class="iconfont" :class=" tiktok == true ? 'icon-xiangxia' : 'icon-xiangshang'" ></span>
                    </div>
                    <div class="item" :style="{display: tiktok == true  ? 'block' :'none'}" >
                        <div v-for="(item,index) in navList" :key="index">
                            <div class="item_text"  :style="{background: item.id == params.active ? '#85a8ed' : '',}" @click="tiktokClick(item.id)">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div >
                    <div @click="menuClick('视频号')" class="nav">
                        <span style="font-weight:bold">视频号</span>
                        <span  class="iconfont" :class=" vedio == true ? 'icon-xiangxia' : 'icon-xiangshang'" ></span>
                    </div>
                    <div class="item" :style="{display: vedio == true  ? 'block' :'none'}" >
                        <div v-for="(item,index) in navList2" :key="index">
                            <div class="item_text"  :style="{background: item.id == params.active ? '#85a8ed' : '',}" @click="tiktokClick(item.id)">{{item.name}}</div>
                        </div>
                    </div>
                </div>

                
            </div>   
        </div>
        <!-- 右侧内容 -->
        <div class="right">
            <whole :params="params" ref="whole"/>
        </div>
        
    </div>
</template>
<script>
import  * as api from "@/api/order.js";

import whole from "./whole.vue"
export default{
    components:{
        whole
    },
    data(){
        return{
            // 抖音
            tiktok:true,
            // 视频号
            vedio:true,
            navList:[
                {
                    id:0,
                    name:'整体'
                },
                {
                    id:1,
                    name:'刀刀组'
                },
                {
                    id:2,
                    name:'吉娜组'
                },
            ],
            navList2:[
                {
                    id:3,
                    name:'整体'
                },
                {
                    id:4,
                    name:'刀刀组'
                },
                {
                    id:5,
                    name:'吉娜组'
                },
            ],
            params:{
                // 默认选中
                active:0,
                // 平台
                contentPalteForms:[],
                // 主播
                liveAnchorBaseInfos:[]
                
            },
            
        }
    },
    methods:{
        // 左边菜单折叠
        menuClick(value){
            if(value =='抖音'){
                this.tiktok= !this.tiktok
            }else{
                this.vedio= !this.vedio
            }
        },
        // 当前点击参数
        tiktokClick(id){
            this.params.active = id
            this.$nextTick(()=>{
                this.$refs.whole.gmvData()
                this.$refs.whole.gmvDataBrokenLineData()
            })
        },
        // 平台
        getcontentPlatFormValidList(){
            api.contentPlatFormValidList().then(res=>{
                if(res.code ===0){
                    const {contentPalteForms} = res.data
                    this.params.contentPalteForms = contentPalteForms
                }
            })
        },
        // 获取基础主播
        getLiveAnchorBaseInfoValid() {
            api.LiveAnchorBaseInfo().then((res) => {
                if (res.code === 0) {
                    const {liveAnchorBaseInfos} = res.data
                    this.params.liveAnchorBaseInfos = liveAnchorBaseInfos;
                }
            });
        },
        
       
       
    },
    created(){
        this.getcontentPlatFormValidList()
        this.getLiveAnchorBaseInfoValid()
        
    }
}
</script>

<style scoped lang="less">

.content{
    display: flex;
    width: 100%;
    overflow-x: hidden;
    .left{
        width: 90px;
        height: 100vh;
        background: linear-gradient(#5492FE,#f5f5f5);
        // border-radius: 10px;
        position: fixed;
        left: 0;
        top: 0;
        color: #fff;
        padding:10px 10px 0;
        font-size: 14px;
       
        .list_con{
            .nav{
                display: flex;
                justify-content: space-between;
            }
            .item{
                font-size: 12px;
                text-align: center;
                // padding: 5px 0;
                .item_text{
                    margin: 10px 0 ;
                    padding: 4px 0;
                    border-radius: 5px;
                }
            }
        }
    }
    .right{
        flex:1;
    }
}
</style>