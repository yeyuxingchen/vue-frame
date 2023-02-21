<template>
  <el-dialog :visible.sync="show" width="500px" :before-close="bClose" class="setting">
    <div style="border-radius: 5px;width: 100%;height: 400px" :style="{background: theme.bg}">
    </div>
  </el-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "ThemeSetting",
  computed:{
    ...mapState(['theme'])
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    bClose(){
      this.$emit('close')
      return false
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/theme/default.scss";
</style>
