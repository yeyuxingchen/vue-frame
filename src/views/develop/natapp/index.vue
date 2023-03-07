<template>
  <div style="width: calc(100% - 40px);padding: 20px">
    <div style="width: 100%;display: flex;flex-direction: row;justify-content: space-between">
      <div class="flex-column" style="width: calc(100% - 230px)">
        <el-input size="mini" v-model="cookie" style="margin-bottom: 7px"/>
        <el-input placeholder="本地映射地址" size="mini" v-model="address" style="margin-bottom: 7px"/>
      </div>
      <div style="width: 210px;" class="flex-column">
        <div class="flex-row" style="margin-bottom: 7px">
          <el-button @click="getMyList" type="primary" size="small" style="width: 100px">获取列表</el-button>
          <el-button @click="start" type="success" size="small" style="width: 100px">开启穿透</el-button>
        </div>
        <div class="flex-row" style="margin-bottom: 7px">
          <el-button @click="editAddress" type="danger" size="small" style="width: 100px">修改地址</el-button>
          <el-button :loading="openWebAddressLoading" @click="login" type="info" size="small" style="width: 100px">登录</el-button>
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
import {NATCrawler} from "@/utils/crawlar/natapp";
import {natLogin, natRequest} from "@/utils/crawlar/natRequest";
import CheerioAPI from 'cheerio'
import {ipcRenderer} from "electron";

export default {
  name: "index",
  data: () => ({
    cmdResult: [],
    workerProcess: null,
    cookie: '',
    tableData: [],
    address: '',
    beforeAddress: '',
    webAddress: '',
    openWebAddressLoading: false,
    hideCmd: true,
    exist: false,
  }),
  mounted() {
    ipcRenderer.on('afterLogin', async (event, result) => {
      this.afterLogin(result)
    })
    if (!NATCrawler.headers.cookie) {
      this.login()
    }
    this.cookie = this.$store.state.nwct.natapp.cookie
    this.getMyList().then(res => {
      if (!res) {
          this.login()
      }
    })
    this.serverExist().then(exist => {
      this.exist = exist
    })
  },
  methods: {
    afterLogin(result) {
      console.log(result)
      this.cookie = result
      NATCrawler.headers.cookie = this.cookie
      this.$store.state.nwct.natapp.cookie = result
      this.$appStore.set('nwct.natapp.cookie', result)
      this.getMyList()
    },
    login(){
      ipcRenderer.send('login')
    },
    serverExist(){
      return new Promise(resolve => {
        const ex = require('child_process').exec('tasklist | findstr "natapp.exe"')
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
      const ex = require('child_process').exec('taskkill /f /im natapp.exe')
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
      this.workerProcess = exec(`${'start '}.\\exec\\natapp.exe --authtoken=dfcdea0af3d9c31c`)
      this.workerProcess.on('close', code => {
        this.exist = false
        this.$message.warning('已关闭穿透服务')
      })
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
      const that = this
      return new Promise(resolve => {
        natRequest(NATCrawler.editAddress, '', that.cookie, 'get').then(res => {
          const $ = CheerioAPI.load(res)
          if ($('#container').text().indexOf('登录') > 0) {
            resolve(false)
          } else {
            const buy_form = $('#buy_form').find('input')
            that.address = buy_form.get(3).attribs.value + ':' + buy_form.get(4).attribs.value
            that.beforeAddress = that.address
            resolve(true)
          }
        })
      })
    },
    editAddress(){
      if (!this.address) {
        this.$message.warning('请输入地址！')
        return
      }
      if (this.address === this.beforeAddress) {
        this.$message.warning('地址未改变！')
        return
      }

      ipcRenderer.send('changeAddress', this.cookie)
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
