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
      </div>
      <div class="operate" :style="{width: operateWidth}">
        <div class="el-icon-minus" @click="min" :style="{color: theme.color}"></div>
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
    this.menusWidth = this.system.menuIsOpen ? '500px' : '150px'
    this.menusData = [...menusDate ]
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
          menuBg: '#3d434955',
          menuColor: 'white'
        }
      }
      if(value === 'theme-white') {
        this.$store.state.theme = {
          bg: 'white',
          color: "#333",
          menuBg: '#78909C88',
          menuColor: 'white'
        }
      }
      if(value === 'custom-theme') {
        this.current = 'ThemeSetting'
        this.dialogShow = true
      }
    },
    onMinus(){
      console.log('on minus')
    },
    onOpenMenus(){
      this.system.menuIsOpen = true
      this.$appStore.set('system.menuIsOpen', this.system.menuIsOpen)
      this.menusWidth = this.menusData.length * 50 + 30 + 'px'
    },
    onCloseMenus(){
      this.system.menuIsOpen = false
      this.$appStore.set('system.menuIsOpen', this.system.menuIsOpen)
      this.menusWidth = '150px'
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/theme/default.scss";
</style>
