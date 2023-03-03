<template>
  <div style="width: calc(100% - 40px); padding: 20px">
    <el-input v-model="cookie" size="mini" placeholder="cookie" style="margin-bottom: 10px" />
    <div style="width: 100%;display:flex;justify-content: space-between">
      <div style="display: flex;flex-direction: column">
        <el-input v-model="target" size="mini" placeholder="端口" style="margin-bottom: 10px;width: 500px" />
        <el-input v-model="cmd" size="mini" placeholder="命令" style="margin-bottom: 10px;width: 500px" />
        <el-input readonly v-model="webUrl" size="mini" placeholder="命令" style="margin-bottom: 10px;width: 500px" />
      </div>
      <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
          <el-button @click="changePort" type="success" style="width: 100px" size="small">修改端口</el-button>
          <el-button @click="start" style="width: 100px" size="small" type="primary">开启</el-button>
        </div>
        <div style="margin-top: 10px">
          <el-checkbox v-model="showCmd" label="开启控制台" style="margin-right: 16px" />
          <el-button type="danger" @click="close" style="width: 100px" size="small">关闭</el-button>
        </div>
        <div>
          <el-button :loading="openWebAddressLoading" @click="openWeb" style="width: 100px;margin-top: 10px" type="warning" size="small">打开网站</el-button>
        </div>
      </div>
    </div>
    <el-alert v-if="exist" title="服务正在运行..." type="success" style="margin-top: 0;width: 150px;margin-bottom: 10px" :closable="false" />

    <div class="out-console" v-if="data.feige.cmdResult.length > 0">
      <span :style="{color: typeof item === 'string' ? '' : item.color}" v-for="(item, index) in data.feige.cmdResult" :key="index">
        {{ typeof item === 'string' ? item : item.text }}
      </span>
    </div>
  </div>
</template>

<script>
import {fgRequest} from "@/utils/crawlar/fgRequest";
import {FGCrawler} from "@/utils/crawlar/feige";
import {mapState} from "vuex";

export default {
  name: "index",
  computed: {
    ...mapState(['data'])
  },
  data: () => ({
    workerProcess: null,
    tableData: [],
    cookie: '',
    port: '',
    showCmd: false,
    cmd: '-server=freehk.svipss.top:8024 -vkey=ed67ec7eee',
    body: 'flag=0&vkey=ed67ec7eee&diff=freehk&protocol=http(s)&name=%E6%B5%8B%E8%AF%95%E4%BD%BF%E7%94%A8&domainType=0&domain=xc&customDomain=&target=127.0.0.1%3A{port}&localIP=127.0.0.1&localPort=&pemText=&pemKey=',
    webUrl: '',
    target: '',
    openWebAddressLoading: false,
    exist: false
  }),
  mounted() {
    this.headers = FGCrawler.headers
    this.cookie = this.headers.cookie
    this.getList()
    this.serverExist().then(exist => {
      this.exist = exist
    })
  },
  methods: {
    serverExist(){
      return new Promise(resolve => {
        const ex = require('child_process').exec('tasklist | findstr "npc.exe"')
        let exist = false
        ex.stdout.on('data', () => (exist = true));
        setTimeout(() => resolve(exist), 500)
      })
    },
    openWeb(){
      if (!this.webUrl) {
        this.$message.warning('网址不能为空！')
        return
      }
      this.openWebAddressLoading = true
      this.serverExist().then(exist => {
        this.openWebAddressLoading = false
        exist ? require('child_process').exec('start http://' + this.webUrl) : this.$message.warning('穿透进程未运行！')
      })
    },
    getList(){
      fgRequest(FGCrawler.getList, FGCrawler.getListBody, null, 'get').then(res => {
        if (res.rows.length > 0) {
          this.tableData = res.rows
          this.webUrl = this.tableData[0].domain[0]
          this.target = this.tableData[0].target
        }
      })
    },
    close(){
      if (!this.exist) {
        this.$message.warning('服务不存在，不需要关闭！')
        return
      }
      const kill = require('child_process').exec('taskkill /f /im npc.exe')
      const that = this
      kill.stdout.on('data', function (data) {
        if (that.data.feige.cmdResult.length > 15) {
          that.data.feige.cmdResult.splice(0, 1)
        }
        that.exist = false
        that.data.feige.cmdResult.push({text: '已成功终止穿透服务！', color: '#F56C6C'})
      });
    },
    changePort(){
      if (!this.target) {
        this.$message.warning('本地地址不能为空！')
        return
      }
      if (this.target === this.tableData[0].target) {
        this.$message.warning('本地地址没有变动！')
        return
      }
      FGCrawler.editAddressBody.target = this.target
      fgRequest(FGCrawler.editAddress, FGCrawler.editAddressBody, '', 'post').then(res => {
        if (res.success) {
            this.$message.success('端口更改成功！')
        }
      })
    },
    start(){
      if (this.exist) {
        this.$message.warning('服务已存在！')
        return
      }
      const exec = require('child_process').exec
      this.workerProcess = exec((this.showCmd ? 'start .\\exec\\npc.exe ' : '.\\exec\\npc.exe ') + this.cmd)
      // 打印正常的后台可执行程序输出
      const that = this
      this.workerProcess.stdout.on('data', function (data) {
        that.exist = true
        if (that.data.feige.cmdResult.length > 15) {
          that.data.feige.cmdResult.splice(0, 1)
        }
        that.data.feige.cmdResult.push('stdout:' + data)
      });

      // 打印错误的后台可执行程序输出
      this.workerProcess.stderr.on('data', function (data) {
        if (that.data.feige.cmdResult.length > 15) {
          that.data.feige.cmdResult.splice(0, 1)
        }
        that.data.feige.cmdResult.push('stderr: ' + data)
      });

      // 退出之后的输出
      this.workerProcess.on('close', function (code) {
        if (that.data.feige.cmdResult.length > 15) {
          that.data.feige.cmdResult.splice(0, 1)
        }
        that.data.feige.cmdResult.push({text: 'out code：服务已关闭', color: '#F56C6C'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/reset.scss";
.out-console{
  width: calc(100% - 20px);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #2c3e50;
  color: antiquewhite;
  padding: 15px 10px;
  border-radius: 5px;
  max-height: calc(100vh - 350px);
  overflow: auto;

  span{
    width: 100%;
    overflow: hidden;
    text-align: left;
  }
}
</style>
