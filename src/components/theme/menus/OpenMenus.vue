<template>
  <div class="open-menu">
    <div class="header">
      <div v-for="(item, index) in list" :key="index" @click="onMenuClick(index)" @mouseenter="onMenuClick(index)">
        <span :style="{color: theme.color}">{{ item.label }}</span>
      </div>
      <i class="iconfont icon-xiangzuoshouqi shouqi" :style="{color: theme.color}" @click="closeMenus" />
    </div>
    <div v-show="show" id="menu-card" class="menu-card" :style="{left: left, background: theme.menuBg}" v-click-outside.notouch="clickOutside">
      <div style="padding: 5px 0">
        <div v-for="(item, index) in subList" :key="index" class="menu-card__item" @click="itemClick(item)" :style="{color: theme.menuColor}">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "OpenMenus",
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  data: () => ({
    left: '0',
    show: false,
    subList: []
  }),
  mounted() {
  },
  methods: {
    itemClick(item){
      if (item.func) {
        item.func()
      } else {
        this.$emit('click', item.value)
      }
      this.show = false
    },
    closeMenus(){
      this.$emit('close')
    },
    onMenuClick(index){
      this.left = index * 50 + 'px'
      this.show = true
      this.subList = this.list[index].children
    },
    clickOutside(e){
      if (e.y > 40) {
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.open-menu {
  width: 100%;
  height: 100%;
  position: relative;

  .menu-card{
    background: #F2F6FC;
    box-shadow: 1px 1px 2px #DCDFE6;
    border: 1px solid #d7d9e0;
    position: absolute;
    top: 30px;
    left: 50px;
    width: 150px;
    transition: .2s;
    z-index: 2;

    &__item{
      height: 25px;
      font-size: 13px;
      line-height: 25px;

      &:hover{
        background: rgba(139, 181, 250, 0.5);
        cursor: pointer;
      }
    }
  }

  .header{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    div {
      width: 50px;
      line-height: 30px;
      text-align: center;
      position: relative;
      z-index: 1;

      &:hover{
        cursor: pointer;
        &:before{
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 50px;
          height: 30px;
          background: #88888833;
          z-index: -1;
        }
      }
    }
  }

  .shouqi{
    width: 30px;
    height: 30px;
    line-height: 30px;
    &:hover{
      cursor: pointer;
      color: #67C23A;
    }
  }


}
</style>
