<template>
  <div style="width: calc(100% - 40px);padding: 20px">
    <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between">
      <div class="flex-column" style="width: calc(100% - 230px)">
        <el-input size="mini" v-model="cookie" style="margin-bottom: 7px"/>
        <el-input placeholder="本地映射地址" size="mini" v-model="address" style="margin-bottom: 7px"/>
        <el-input readonly placeholder="网址" size="mini" v-model="webAddress" />
      </div>
      <div style="width: 210px;" class="flex-column">
        <div class="flex-row" style="margin-bottom: 7px">
          <el-button @click="getMyList" type="primary" size="small" style="width: 100px">获取列表</el-button>
          <el-button @click="start" type="success" size="small" style="width: 100px">开启穿透</el-button>
        </div>
        <div class="flex-row" style="margin-bottom: 7px">
          <el-button @click="editAddress" type="danger" size="small" style="width: 100px">修改地址</el-button>
          <el-button :loading="openWebAddressLoading" @click="openWebAddress" type="info" size="small" style="width: 100px">打开网站</el-button>
        </div>
        <div class="flex-row" style="align-items: center">
          <el-button @click="closeServer" type="warning" size="small" style="width: 100px">关闭穿透</el-button>
          <el-checkbox v-model="hideCmd" label="隐藏控制台"/>
        </div>
      </div>
    </div>
    <el-alert v-if="exist" title="服务正在运行..." type="success" style="margin-top: 15px;width: 150px" :closable="false" />
    <div>
      <el-table :header-cell-style="{background: '#f5f7fa'}" style="margin-top: 15px" v-if="tableData.length > 0" :data="tableData" border>
        <el-table-column prop="localAddress" label="本地服务地址"/>
        <el-table-column prop="subdomain" label="域名前缀"/>
        <el-table-column prop="createTime" label="创建时间"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import {XMQCrawler} from "@/utils/crawlar/xiaomiqiu";
import {xmqRequest} from "@/utils/crawlar/xmqRequest";
import iconv from 'iconv-lite'

export default {
  name: "index",
  data: () => ({
    cmdResult: [],
    workerProcess: null,
    cookie: '',
    tableData: [],
    address: '',
    webAddress: '',
    openWebAddressLoading: false,
    hideCmd: true,
    exist: false,
  }),
  mounted() {
    this.cookie = XMQCrawler.headers.cookie
    this.getMyList()
    this.serverExist().then(exist => {
      this.exist = exist
    })
  },
  methods: {
    serverExist(){
      return new Promise(resolve => {
        const ex = require('child_process').exec('tasklist | findstr "xiaomiqiu.exe"')
        let exist = false
        ex.stdout.on('data', () => (exist = true));
        setTimeout(() => resolve(exist), 500)
      })
    },
    closeServer(){
      if (!this.exist) {
        this.$message.warning('服务不存在，不需要关闭！')
        return
      }
      const ex = require('child_process').exec('taskkill /f /im xiaomiqiu.exe')
      const that = this
      ex.stdout.on('data', data => {
        that.exist = false
        that.$message.success('关闭穿透服务成功！')
      })
      ex.stderr.on('data', function (data) {
        that.$message.warning('不存在穿透服务，不需要关闭进程！')
      });
    },
    openWebAddress(){
      if (!this.webAddress) {
        this.$message.warning('网址不能为空！')
        return
      }
      this.openWebAddressLoading = true
      this.serverExist().then(exist => {
        if (exist) {
          require('child_process').exec('start ' + this.webAddress)
        } else {
          this.$message.warning('穿透进程未运行！')
        }
        this.openWebAddressLoading = false
      })
    },
    start(){
      if (this.exist) {
        this.$message.warning('服务正在运行！')
        return
      }
      const exec = require('child_process').exec
      this.workerProcess = exec(`${this.hideCmd ? '' : 'start' }.\\exec\\xiaomiqiu.exe -config .\\exec\\xiaomiqiu.conf  start-all`)
      this.serverExist().then(exist => {
        if (exist) {
          this.exist = true
          this.$message.success('穿透开启成功！')
        } else {
          this.$message.warning('穿透开启失败！')
        }
      })
    },
    getMyList(){
      xmqRequest(XMQCrawler.getMyList, XMQCrawler.getMyListBody, this.cookie).then(res => {
        this.tableData = res.rows
        this.address = this.tableData[0].localAddress
        this.webAddress = 'http://' + this.tableData[0].subdomain + '.ngrok.xiaomiqiu123.top'
      })
    },
    editAddress(){
      if (!this.address) {
        this.$message.warning('请输入地址！')
        return
      }
      if (this.address === this.tableData[0].localAddress) {
        this.$message.warning('地址未改变！')
        return
      }
      XMQCrawler.editAddressBody.localAddress = this.address
      xmqRequest(XMQCrawler.editAddress, XMQCrawler.editAddressBody, this.cookie).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/reset.scss";
.flex-column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.flex-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
