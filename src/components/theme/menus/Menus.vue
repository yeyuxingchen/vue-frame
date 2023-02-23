<template>
  <div class="cas" :style="{width: width, height: height}">
    <div class="cas-content">
      <slot></slot>
      <span style="position: absolute;font-size: 12px;width: 20px" :style="{left: width}">
        <i class="iconfont icon-zhankai- zhankai" @click="openMenus" :style="{color: theme.color}"/>
      </span>
    </div>

    <el-cascader @change="onCasClick" size="mini" id="menus-cas" :style="{width: width, height: height}"
                 :props="{ expandTrigger: 'hover' }" popper-class="menus-cas" v-model="value" :options="list"/>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Menus",
  computed: {
    ...mapState(['theme'])
  },
  props: {
    height: {
      type: String,
      default: '30px'
    },
    width: {
      type: String,
      default: '100px'
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: () => ({
    value: []
  }),
  created() {

  },
  mounted() {
    const input = document.getElementById('menus-cas').getElementsByTagName('input')[0]
    input.style.color = "transparent"
    input.style.height = this.height
    input.setAttribute('placeholder', '')
    input.id = 'cas-input-id'
  },
  methods: {
    openMenus() {
      this.$emit('open')
    },
    onCasClick(value) {
      this.$emit('click', value[value.length - 1])
    }
  }
}
</script>

<style lang="scss">
#cas-input-id {
  position: relative;
  background: #00000000;
  transition: .3s;

  &:hover {
    background: #33333355;
  }
}

.cas {

  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .zhankai {
      &:hover {
        color: deepskyblue;
        cursor: pointer;
      }
    }
  }

  position: relative;

  .el-cascader {
    overflow: hidden;
    border: none;

    .el-input {
      border: none;
      height: 30px !important;

      .el-input__inner {
        border: none;
      }
    }

    .el-input__suffix {
      display: none;
    }
  }
}

.menus-cas {
  margin: 0 !important;
  border-radius: 0;
  background: #F2F6FC;

  .popper__arrow {
    display: none;
  }

  .in-active-path {
    color: #333;
    font-weight: normal;
  }

  .el-cascader-panel {
    border-radius: 0;
  }

  .el-cascader-node__prefix {
    display: none;
  }

  .is-active {
    font-weight: normal !important;
  }

  .el-cascader-node {
    color: #000;
    transition: .1s;
    height: 26px;

    .el-cascader-node__label {
      height: 100%;
      line-height: 26px;
    }

    &:hover {
      background: #409eff55;
      color: #000;
      font-weight: normal;
    }
  }
}
</style>
