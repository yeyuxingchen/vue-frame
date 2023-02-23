<template>
  <el-dialog :visible.sync="show" width="450px" :close-on-click-modal="false" :show-close="false" class="setting">
    <div class="rd">
      <div class="rd-header">绑定注册码</div>
      <div class="rd-close" @click="close" v-if="system.registerKey">
        <el-icon style="color: white;font-size: 12px" class="el-icon-close"/>
      </div>
      <div class="rd-code">
        <span style="color: #333;font-weight: bold;font-size: 13px;margin-bottom: 5px">原编码</span>
        <span class="rd-code__code" title="点击复制" @click="copy">{{ mac }}</span>
      </div>
      <div class="rd-register">
        <div class="rd-register__title">注册码{{system.registerKey ? '(已绑定)' : ''}}</div>
        <div class="rd-register__input">
          <el-input v-model="register" type="textarea" :rows="9" :spellcheck="false"/>
        </div>
        <div style="width: calc(100% - 50px);margin-top: 20px">
          <el-button @click="onSubmit" v-text="'绑定'" size="mini" style="border-radius: 0;background: #3c3f41;color: white;width: 80px" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {getMacString, registerCheck} from "@/utils/tools";
import {mapState} from "vuex";

export default {
  name: "RegisterDialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['system'])
  },
  data: () => ({
    mac: '',
    register: ''
  }),
  mounted() {
    if (this.$store.state.system.registerKey) {
      this.register = this.$store.state.system.registerKey
    }
    this.mac = getMacString()
  },
  methods: {
    onSubmit(){
      if (!this.register) {
        this.$message.warning('注册码不能为空！'); return
      }
      if (!registerCheck(this.register)) {
        this.$message.warning('注册码有误！'); return
      }
      this.$store.state.system.registerKey = this.register
      this.$appStore.set('system.registerKey', this.register)
      this.$notify.success({title: '绑定成功', duration: 2000})
      this.close()
    },
    close(){
      this.$emit('close')
    },
    copy(){
      const clipboard = require('electron').clipboard
      clipboard.writeText(this.mac)
      this.$message.success('复制到剪贴板成功！')
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/theme/default.scss";
.rd{
  height: 400px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;

  &-header{
    width: 100%;
    text-align: center;
    height: 37px;
    line-height: 35px;
    background: #0f1922;
    color: white;
  }

  &-close{
    position: absolute;
    top: 9px;
    right: 7px;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &-code{
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__code{
      font-size: 13px;
      font-weight: bold;
      text-decoration: underline;
      color: #409EFF;

      &:hover{
        cursor: pointer;
      }
    }

  }

  &-register{
    width: 100%;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title{
      font-size: 13px;
      color: #333;
      margin-bottom: 10px;
      font-weight: bold;
    }

    &__input{
      width: calc(100% - 80px);

      ::v-deep textarea{
        resize: none;
      }
    }
  }
}
</style>
