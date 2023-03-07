<template>
  <div style="width: calc(100% - 40px);padding: 20px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="表单转JSON" name="first">
        <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
          <div style="width: 45vw">
            <el-input v-model="vin" type="textarea" style="height: calc(100vh - 160px)" />
          </div>
          <span class="span-trans" @click="trans"> ▶ </span>
          <div style="width: 45vw">
            <el-input v-model="vout" type="textarea" style="height: calc(100vh - 160px)" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="HEADER转JSON" name="fourth">
        <div  style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
          <div style="width: 45vw">
            <el-input v-model="hin" type="textarea" style="height: calc(100vh - 160px)" />
          </div>
          <span class="span-trans" @click="transH"> ▶ </span>
          <div style="width: 45vw">
            <el-input v-model="hout" type="textarea" style="height: calc(100vh - 160px)" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from "request";

export default {
  name: "Utils",
  data: () => ({
    activeName: 'first',
    vin: '',
    vout: '',
    hin: '',
    hout: ''
  }),
  created() {
  },
  methods: {
    trans() {
      const voutDict = {}
      const vinSplit = this.vin.split('\n')
      vinSplit.forEach((item, index) => {
        item = item.trim()
        if (item[item.length - 1] === ':'){
          item = item.trim().replace(':', '')
          if (index + 1 < vinSplit.length) {
            const nextItem = vinSplit[index + 1].trim()
            if (nextItem[nextItem.length -1] !== ':') {
              voutDict[item] = nextItem.trim()
            } else {
              voutDict[item] = ''
            }
          } else {
            voutDict[item] = ''
          }
        }
      })
      this.vout = JSON.stringify(voutDict,"","\t")
    },
    transH(){
      const houtDict = {}
      const hinSplit = this.hin.split('\n')
      hinSplit.forEach((item, index) => {
        item = item.trim()
        const itemSplit = item.split(':')
        houtDict[itemSplit[0].trim()] = item.replace(itemSplit[0] + ':', '').trim()
      })
      this.hout = JSON.stringify(houtDict,"","\t")
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped lang="scss">
.span-trans{
  &:hover{
    cursor: pointer;
    color: #1890ff;
    font-weight: bold;
    transform: scale(1.5);
    transition: .15s;
  }
  &:active{
    cursor: pointer;
    font-weight: bold;
    transform: scale(.9);
  }
}
::v-deep .el-textarea__inner{
  font-size: 12px;
  height: 100%;
}

</style>
