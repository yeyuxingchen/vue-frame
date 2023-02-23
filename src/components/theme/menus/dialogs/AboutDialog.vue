<template>
  <el-dialog :visible.sync="show" top="20%" width="350px" class="setting" :close-on-click-modal="false">
    <div style="height: 200px;background: white;">
      <div class="ad-header">关于</div>
      <div class="ad-close" @click="close">
        <el-icon style="color: white;font-size: 12px" class="el-icon-close"/>
      </div>
      <div style="line-height: 150px">
        内部使用请勿传播
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AboutDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/theme/default.scss";

.ad {

  &-header {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #0f1922;
    color: white;
    font-weight: bold;
  }

  &-close {
    position: absolute;
    top: 8px;
    right: 5px;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
