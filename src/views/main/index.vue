<template>
  <div style="float:left;width: calc(100% - 30px);height: calc(100% - 30px);padding: 15px 15px">
    <div style="width: 100%;height: 100%">
      <div style="width: 100%;height: 30px;display: flex;flex-direction: row;justify-content: flex-end">
        <el-button size="mini" style="border-radius: 0" v-text="'打印'" type="primary" @click="getData"/>
        <el-button size="mini" style="border-radius: 0;background: #a6a59d;color: white" type="info" v-text="'保存'"
                   @click="saveData"/>
      </div>
      <el-image v-if="url" :src="url" style="width: calc(630px / 2);height: calc(790px / 2)"/>
    </div>
  </div>
</template>

<script>

import path_ from "@/utils/path_";

export default {
  name: "index",
  data: () => ({
    value1: '',
    socket: '',
    url: '',
    name: '',
    bill_code: ''
  }),
  created() {
    this.onWebSocket()
  },
  methods: {
    getUniqueDate() {
      return (Math.ceil(new Date().getTime() / 10) / 100000000).toString().split('.')[1]
    },
    onWebSocket() {
      if (this.socket) {
        return
      }
      const that = this
      that.socket = new WebSocket('wss://localhost:13529');

      // 打开Socket
      that.socket.onopen = function (event) {
        // console.log('socket 链接成功 获取打印机列表 --- ')
        that.getPrinters()
        // 监听消息
        that.socket.onmessage = function (event) {
          const data = JSON.parse(event.data);
          //预览使用
          if (data && (data.previewURL || data.previewImage)) {
            let url;
            if (data && data.previewURL) {
              url = data.previewURL;
            } else if (data && data.previewImage) {
              url = data.previewImage[0];
            }
            console.log('获取到链接 --- ', data)
            that.url = url
          }
          if (data.cmd === 'getPrinters') {
            console.log(data)
          }
        };
        // 监听Socket的关闭
        that.socket.onclose = function (event) {
          console.log('Client notified socket has closed', event)
        }
      };
    },
    getPrinters() {
      const request = {};
      request.requestID = this.getUUID(8, 16);
      request.version = "1.0";
      request.cmd = 'getPrinters';
      this.socket.send(JSON.stringify(request))
    },
    saveData() {
      const fs = require("fs")
      const path = require("path")
      const request = require("request")
      const {shell} = require("electron");
      const savePath = path_.cachePath + '\\' + this.name
      path_.createPath(savePath, () => {
        let stream = fs.createWriteStream(path.join(savePath, this.bill_code + '.jpg'));
        request(this.url, {strictSSL: false}).pipe(stream).on('close', e => {
          if (!e) {
            shell.openPath(savePath);
          }
        })
      })
    },
    getData() {
      const data = {
        "requestID": "0A601423",
        "version": "1.0",
        "cmd": "print",
        "task": {
          "taskID": this.getUniqueDate(),
          "preview": true,
          "previewType": "image",
          "printer": "Fax",
          "documents": [
            {
              "documentID": "390006638107",
              "contents": [
                {
                  "templateURL": "https://cloudprint.cainiao.com/template/standard/466229/6",
                  "data": {
                    "ewbBarCode": "390006638107",
                    "receiveCustomerName": "张春兰花花胡",
                    "receivePhoneSms": "130****9260",
                    "receiveAddress": "广东省肇庆市怀集县城东中学新路口芯管家1厂",
                    "sendCustomerName": "夜管家何海燕",
                    "sendPhoneSms": "188****8616",
                    "sendAddress": "广东省佛山市南海区南海区狮山镇桃园西路大涡塘工业区夜管家何海燕",
                    "goodsName": "服装服饰",
                    "packageType": "纤袋",
                    "weight": "304.0",
                    "calcWeight": "800.0",
                    "vol": 4,
                    "piece": "17",
                    "servicesTypeName": "派送",
                    "shippingMethodName": "派送不上下楼",
                    "payModeName": "现金",
                    "insuredAmount": "2000.0",
                    "rewbNo": "",
                    "customerVipFlag": "否",
                    "goodsCategory": "否",
                    "arriveAmount": "0.0",
                    "codCharge": "0.0",
                    "siteName": "佛山狮山狮北",
                    "qryProblemPhone": "075763551953",
                    "siteAddress": "广东省佛山市南海区狮山镇桃园西路大涡塘工业区综合楼一楼",
                    "ewbDate": "2023-02-21 00:17:01",
                    "remark": ""
                  }
                },
                {
                  "templateURL": "https://cloudprint.cainiao.com/template/standard/466229/6",
                  "data": {
                    "ewbBarCode": "390006638107",
                    "receiveCustomerName": "张春兰花花胡",
                    "receivePhoneSms": "130****9260",
                    "receiveAddress": "广东省肇庆市怀集县城东中学新路口芯管家1厂",
                    "sendCustomerName": "夜管家何海燕",
                    "sendPhoneSms": "188****8616",
                    "sendAddress": "广东省佛山市南海区南海区狮山镇桃园西路大涡塘工业区夜管家何海燕",
                    "goodsName": "服装服饰",
                    "packageType": "纤袋",
                    "weight": "304.0",
                    "calcWeight": "800.0",
                    "vol": 4,
                    "piece": "17",
                    "servicesTypeName": "派送",
                    "shippingMethodName": "派送不上下楼",
                    "payModeName": "现金",
                    "insuredAmount": "2000.0",
                    "rewbNo": "",
                    "customerVipFlag": "否",
                    "goodsCategory": "否",
                    "arriveAmount": "0.0",
                    "codCharge": "0.0",
                    "siteName": "佛山狮山狮北",
                    "qryProblemPhone": "075763551953",
                    "siteAddress": "广东省佛山市南海区狮山镇桃园西路大涡塘工业区综合楼一楼",
                    "ewbDate": "2023-02-21 00:17:01",
                    "remark": ""
                  }
                }
              ]
            }
          ]
        }
      }
      this.name = data.task.documents[0].contents[0].data.receiveCustomerName
      this.bill_code = data.task.documents[0].contents[0].data.ewbBarCode
      this.socket.send(JSON.stringify(data))
    },
    /***
     *
     * 获取请求的UUID，指定长度和进制,如
     * getUUID(8, 2)   //"01001010" 8 character (base=2)
     * getUUID(8, 10) // "47473046" 8 character ID (base=10)
     * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
     *
     */
    getUUID(len, radix) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      let uuid = [], i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
        let r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join('');
    }
  }
}
</script>

<style scoped>

</style>
