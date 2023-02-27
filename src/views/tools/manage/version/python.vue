<template>
  <div
      style="margin: 20px;float: left;width: calc(100% - 40px);display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start">
    <h3>访问链接 - Windows</h3>
    <el-alert @click.native="goLink" class="alert" :title="link" :closable="false" type="success"/>
    <el-button size="mini" @click="down" v-text="'下载'" type="success"/>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";

export default {
  name: "python",
  data: () => ({
    link: 'https://github.com/pyenv-win/pyenv-win#readme'
  }),
  mounted() {
    ipcRenderer.on("download progress", (event, progress) => {
      console.log(progress.percent); // Progress in fraction, between 0 and 1
      this.$store.state.system.percentage = Math.floor(progress.percent * 100)
      if (progress.percent === 1) {
        setTimeout(() => {
          this.$store.state.system.percentage = 0
        }, 1000)
      }
    });
  },
  methods: {
    goLink() {
      require('electron').shell.openPath(this.link)
    },
    down() {
      ipcRenderer.send('download', {
        downloadPath: 'https://github.com/pyenv-win/pyenv-win/archive/refs/heads/master.zip', // 下载链接（以下载vue文件为例）
        properties: {
          onProgress: ''
        },
        fileName: 'master.zip' // 下载文件名，需要包含后缀名
      })
    }
  }
}
</script>

<style scoped lang="scss">
.alert {

  &:hover {
    cursor: pointer;
  }
}
</style>
