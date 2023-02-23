<template>
  <div class="default" :style="{background: theme.bg}">
    <div class="default-menu">
      <div class="menus" :style="{width: menusWidth}">
        <open-menus v-show="system.menuIsOpen" :list="menusData" @close="onCloseMenus" style="transition: .5s" @click="onMenuItemClick"/>
        <menus @open="onOpenMenus" @click="onMenuItemClick" v-show="!system.menuIsOpen" style="margin-left: 10px;line-height: 30px;transition: .5s" width="60px" :list="menusData">
            <span style="font-size: 13px;font-weight: bold" :style="{color: theme.color}">菜单</span>
        </menus>
      </div>
      <div class="drags" :style="{width: `calc(100% - ${operateWidth} - ${menusWidth})`, '-webkit-app-region': system.draggable ? 'drag' : ''}">
        <el-progress v-if="system.percentage > 0" class="process" :percentage="system.percentage" color="#08b127"/>
      </div>
      <div class="operate" :style="{width: operateWidth}">
        <div class="el-icon-minus" @click="min" :style="{color: theme.color}" title="123"></div>
        <div :class="system.isMax ? 'el-icon-copy-document' : 'el-icon-full-screen'" @click="restore" style="font-size: 13px" :style="{color: theme.color}"></div>
        <div class="el-icon-close" @click="close" :style="{color: theme.color}"></div>
      </div>
    </div>
    <component :is="current" v-if="current != null" :show="dialogShow" @close="dialogShow = false"/>
    <slot></slot>
  </div>
</template>

<script>
import Menus from "@/components/theme/menus/Menus.vue";
import OpenMenus from "@/components/theme/menus/OpenMenus.vue";
import {mapState} from "vuex";
import {ipcRenderer} from "electron";
import {menusDate} from "@/assets/data/menus";
import {registerCheck} from "@/utils/tools";

const allComponents = require.context("@/components/theme/menus/dialogs", true, /\.vue$/);
let components = {}
allComponents.keys().forEach(key=>{
  const component = allComponents(key).default;
  components[component.name] = component;
})

export default {
  name: "Default",
  components: {OpenMenus, Menus, ...components},
  data: () => ({
    isOpen: false,
    menusWidth: '500px',
    operateWidth: '120px',
    menusData: [],
    current: null,
    dialogShow: false
  }),
  computed: {
    ...mapState(['theme', 'system'])
  },
  created() {
    ipcRenderer.send('windows-resize-event')
    ipcRenderer.on('windows-resize', (event, params)=>{
      this.system.isMax = params
    })

    this.menusData = [...menusDate]
    this.menusWidth = this.system.menuIsOpen ? `${this.menusData.length * 50 + 30}px` : '100px'

    if (!registerCheck(this.system.registerKey)) {
      this.current = 'RegisterDialog'
      this.dialogShow = true
    }
  },
  mounted() {
  },
  methods: {
    min(){
      this.system.maxTimes = 0
      ipcRenderer.send('windows-min')
    },
    close(){
      this.system.maxTimes = 0
      ipcRenderer.send('windows-close')
    },
    restore(){
      this.system.maxTimes = 0
      ipcRenderer.send('windows-middle')
    },
    onMenuItemClick(value){
      if (value === 'file-create') {
        this.$router.push({path: '/file-create'})
      }
      if (value === 'theme-black') {
        this.$store.state.theme = {
          bg: '#333',
          color: "white",
          menuBg: '#000000aa',
          menuColor: 'white'
        }
        this.$appStore.set('theme', this.theme)
      }
      if(value === 'theme-white') {
        this.$store.state.theme = {
          bg: 'white',
          color: "#333",
          menuBg: '#333333aa',
          menuColor: 'white'
        }
        this.$appStore.set('theme', this.theme)
      }
      if(value === 'custom-theme') {
        this.current = 'ThemeSetting'
        this.dialogShow = true
      }
      // 注册
      if (value === 'help-register') {
        this.current = 'RegisterDialog'
        this.dialogShow = true
      }
      // 关于
      if (value === 'help-about') {
        this.current = 'AboutDialog'
        this.dialogShow = true
      }
    },
    onOpenMenus(){
      this.system.menuIsOpen = true
      this.$appStore.set('system.menuIsOpen', this.system.menuIsOpen)
      this.menusWidth = this.menusData.length * 50 + 30 + 'px'
    },
    onCloseMenus(){
      this.system.menuIsOpen = false
      this.$appStore.set('system.menuIsOpen', this.system.menuIsOpen)
      this.menusWidth = '100px'
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/theme/default.scss";
.process{
  width: calc(100% - 20px);
  max-width: 700px;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 20px 0 20px;

  ::v-deep .el-progress-bar, ::v-deep .el-progress-bar__outer{
    height: 10px !important;
    border-radius: 0 !important;
  }

  ::v-deep .el-progress-bar__inner{
    border-radius: 0 !important;
  }
}
</style>
