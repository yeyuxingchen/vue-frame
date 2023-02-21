<template>
  <div style="float:left">
    <div style="width: 100px;height: 100px">
      <el-button v-text="'打印'" type="success" @click="getData" />
      <el-image :src="'https://localhost:13531/20230221_170519_011_10.jpg'" style="width: calc(630px / 2);height: calc(790px / 2)"  />
      <image style="width: 100px;height: 100px" href="https://localhost:13531/20230221_170519_011_10.jpg" />
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data: () => ({
    value1: '',
    socket: '',
    url: ''
  }),
  created() {
    // setInterval(() => {
    //   this.$notify.success({})
    // }, 500)
    this.onWebSocket()
  },
  methods: {
    onWebSocket(){
        const url = "ws://localhost:13528";
        if (this.socket) {
          return
        }
        const that = this
        that.socket = new WebSocket('wss://localhost:13529');        // url = url.replace("localhost",ipAddr);

        //如果是https的话，端口是13529
        //socket = new WebSocket('wss://localhost:13529');
        // 打开Socket
        that.socket.onopen = function(event)
        {
          console.log('socket 链接成功')
          // 监听消息
          that.socket.onmessage = function(event)
          {
            var data = JSON.parse(event.data);
            //预览使用
            if (data && (data.previewURL || data.previewImage))
            {

              let url;
              if (data && data.previewURL) {
                url = data.previewURL;
              } else if (data && data.previewImage) {
                url = data.previewImage[0];
              }
              console.log('获取到链接 --- ', url)
              this.url = url
            }
          };
          // 监听Socket的关闭
          that.socket.onclose = function(event)
          {
            console.log('Client notified socket has closed',event);
          };
        };
    },
    dateChange(){
      new Date().toUTCString()
      console.log(this.value1.toISOString())
    },
    getData(){
      const data = {
        "requestID": "0A601423",
        "version": "1.0",
        "cmd": "print",
        "task": {
          "taskID": "78698509",
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
                }
              ]
            }
          ]
        }
      }
      this.socket.send(JSON.stringify(data))
    }
  }
}
</script>

<style scoped>

</style>
