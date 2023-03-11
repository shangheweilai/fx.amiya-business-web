<template>
  <div>
    <van-empty image="error" description="404" />
    <van-button plain hairline type="info" class="btn" @click="backPrev"
      >返回上一页({{ second }}s)</van-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 6,
      timer: null,
    };
  },
  methods: {
    backPrev() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.btn {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
