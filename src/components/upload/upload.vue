<template>
  <van-uploader
    v-model="uploadData"
    :multiple="multiple"
    :after-read="afterRead"
    :max-count="maxCount"
    :max-size="1024 * 1024 * 10"
    :before-read="beforeRead"
    @oversize="onOversize"
  />
</template>
<script>
export default {
  props: {
    // 文件列表
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 上传数量
    maxCount: {
      type: Number,
      default: 9
    },
    // 是否开启多图选择
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploadData: this.fileList
    };
  },
  methods: {
    // 上传后的回调，获取到对应的file对象
    afterRead (file) {
        this.$emit('handleUploadChange', file);
    },
    // 上传前
    beforeRead (file) {
      // 多图上传时file为一个数组
      // 多图上传的流程
      if (Array.isArray(file)) {
        for (let i = file.length - 1; i >= 0; i--) {
          const imageType = /^image\/(jpeg|png|jpg)$/.test(file[i].type);
          if (!imageType) {
            file.splice(i, 1);
            this.$toast('上传图片格式只能是 JPEG|PBG|JPG 格式!');
          }
        }
        return true;
      } else {
        // 单图上传流程
        const imageType = /^image\/(jpeg|png|jpg)$/.test(file.type);
        if (!imageType) {
          this.$toast('上传图片格式只能是 JPEG|PBG|JPG 格式!');
          return false;
        }
        return true;
      }
    },
    // 监听上传图片的大小
    onOversize (file) {
      this.$toast('上传图片不能超过10M');
    }
  }
};
</script>

