<template>
  <div style="float:left;width: calc(100% - 30px);height: calc(100% - 30px);padding: 15px 15px">
    <div style="width: 100%;height: 100%">
      <div style="width: 100%;height: 30px;display: flex;flex-direction: row;justify-content: flex-end">
        <el-select clearable v-model="printerSelected" placeholder="请选择打印机" size="mini" style="margin-right: 20px;width: 220px">
          <el-option v-for="(printer, index) in printers" :key="index" :value="printer.name" :label="printer.name" />
        </el-select>
        <el-button size="mini" v-text="'打印'" type="primary" @click="getData"/>
        <el-button size="mini" style="background: #a6a59d;color: white" type="info" v-text="'保存'"
                   @click="saveData"/>
        <el-button size="mini" type="danger" v-text="'清空'"
                   @click="urls = []"/>
      </div>
      <div v-if="urls.length > 0">
        <el-image v-for="(url, index) in urls" :src="url" :key="index" style="width: calc(630px / 2);height: calc(790px / 2)"/>
      </div>
    </div>
  </div>
</template>

<script>

import mixin from "@/mixins/ztoky";

export default {
  name: "index",
  mixins: [mixin],
  data: () => ({
    value1: '',
    urls: [],
    printers: [],
    printerSelected: ''
  }),
  created() {
    this.onWebSocket()
  },
  methods: {
    onPreviewImg(data) {
      if (data && data.previewURL) {
        this.urls.push(data.previewURL);
      } else if (data && data.previewImage) {
        this.urls = data.previewImage;
      }
      console.log('on preview img', this.urls, data)
    },
    onGetPrinters(data) {
      if (data.status === "success") {
        this.printers = data.printers
        this.printers.forEach(item => {
          if (item.name === 'Fax') {
            this.printerSelected = item.name
          }
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/reset.scss";
</style>
