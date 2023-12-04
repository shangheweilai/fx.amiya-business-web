<template>
  <div class="container">
    <div class="adddetail" @click="detailModel = true">添加明细</div>
    <!-- 派单弹出层 -->
    <van-popup
      v-model="detailModel"
      position="bottom"
      class="dispatch_content"
      round
      :close-on-click-overlay="false"
    >
      <van-field
        v-model="form.goodsName"
        label="项目名称"
        placeholder="请输入项目名称"
        class="customer_content"
        type="textarea"
        :rows="2"
      />
      <van-field
        v-model="form.goodsSpec"
        label="项目规格"
        placeholder="请输入项目规格"
        class="customer_content"
      />
      <van-field
        v-model="form.quantity"
        label="数量"
        placeholder="请输入数量(最小是0)"
        class="customer_content"
        type="number"
        number
      />
      <van-field
        v-model="form.price"
        label="金额"
        placeholder="请输入金额(最小是0)"
        class="customer_content"
        type="number"
        number
      />
      <div class="bottom">
        <van-button round block type="default" class="button" @click="cancel"
          >取消</van-button
        >
        <van-button round block type="info" class="button" @click="submite"
          >确认</van-button
        >
      </div>
    </van-popup>

    <!-- 列表 -->
    <!-- <div class="list">
      <div class="item">
        <div class="name_list">
          <div class="text">项目名称：项目1</div>
          <div class="text">项目规则：项目2</div>
        </div>
        <div class="name_list">
          <div class="text">数量：项目1</div>
          <div class="text">金额：项目2</div>
        </div>
      </div>
    </div> -->
    <van-swipe-cell v-for="(item, index) in list" :key="index">
        <div class="list">
           <div class="item">
                <div class="name_list">
                <div class="text2">项目名称：{{item.goodsName}}</div>
                <div class="text2">项目规则：{{item.goodsSpec}}</div>
                </div>
                <div class="name_list">
                <div class="text">数量：{{item.quantity}}</div>
                <div class="text">金额：{{item.price}}</div>
                </div>
            </div>
            </div>
            <template #right>
              <van-button
                type="danger"
                text="删除"
                @click="detelt(item)"
                style="height:30px;margin-top:10px"
              />
            </template>
          </van-swipe-cell>


  </div>
</template>
<script>
export default {
  props: {
    orderId: String,
  },
  data() {
    return {
        index:0,
      // 派单model
      detailModel: false,

      form: {
        //    项目名称
        goodsName:'',
        // 项目规则
        goodsSpec:'',
        // 数量
        quantity:null,
        // 金额
        price:null
      },
    //   list:[{
    //     name:'项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1',
    //     name2:'项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1',
    //     name3:'项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1项目1',
    //     name4:'',

    //   }]
    list:[]
    };
  },
  methods: {
    // 删除
    detelt(value){
        const findIndex = this.list.findIndex(item=> item.index === value.index);
        this.list.splice(findIndex,1)
    },
    // 派单留言
    remarkInput(value) {
      this.form.remark = value;
    },
    cancel() {
      this.form = {};
      this.detailModel = false;
    },
    submite() {
      const { goodsName, goodsSpec, quantity, price } = this.form;
      if (!goodsName) {
        this.$toast("请输入项目名称");
        return;
      }
      if (!goodsSpec) {
        this.$toast("请输入项目规则");
        return;
      }
      if((quantity) == ''){
        this.$toast('请输入数量(最小是0)')
        return
      }else{
        if((quantity)<0){
          this.$toast('数量(最小是0)')
          return
        }
      }
      if(price == ''){
        this.$toast('请输入金额最小是0')
        return
      }else{
        if(price<0){
          this.$toast('金额最小是0')
          return
        }
      }
      const data = {
        goodsName,
        goodsSpec,
        quantity:Number(quantity),
        price:Number(price),
        contentPlatFormOrderId:this.orderId,
        createBy:Number(sessionStorage.getItem('employeeId'))
      };
      this.list.push({
        goodsName,
        goodsSpec,
        quantity:Number(quantity),
        price:Number(price),
        contentPlatFormOrderId:this.orderId,
        index:this.index++,
        createBy:Number(sessionStorage.getItem('employeeId'))
      })
      this.$emit('handle',this.list)
      this.detailModel = false
      this.form.goodsName = ''
      this.form.goodsSpec = ''
      this.form.quantity = null
      this.form.price = null
      this.form.quantity = ''
      this.form.price = ''
      this.form.contentPlatFormOrderId = ''
    },
  },
};
</script>
<style scoped lang="less">
.container {
  font-size: 12px;
  .adddetail {
    width: 60px;
    height: 30px;
    line-height: 30px;
    background: #5492fe;
    text-align: center;
    color: #fff;
    border-radius: 5px;
  }
  .dispatch_content {
    height: 45;
    color: #5492fe;
    padding: 20px 0;
  }
  .bottom {
    display: flex;
    margin-top: 20px;
    .button {
      width: 40%;
      height: 42px;
      margin: 0 auto;
    }
  }
  .list{
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    .item{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #c7dbff;
        border-radius: 5px;
        margin-top: 10px;
        .name_list{
            width: 50%;
            padding: 8px;
            box-sizing: border-box;
           
            .text{
                text-align: end;
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis; /*隐藏后添加省略号*/
                white-space: nowrap; /*强制不换行*/
                color: #5492fe;
            }
            .text2{
                overflow: hidden; /*超出隐藏*/
                text-overflow: ellipsis; /*隐藏后添加省略号*/
                white-space: nowrap; /*强制不换行*/
                color: #5492fe;
            }
        }
    }
  }
}
</style>
