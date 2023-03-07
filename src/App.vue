<template>
  <div id="app":style="{background: system.isMax ? theme.bg : '#00000000'}">
    <component :is="current">
      <router-view/>
    </component>
  </div>
</template>

<script>


import {mapState} from "vuex";

const allComponents = require.context("./components/theme", true, /\.vue$/);
let components = {}
allComponents.keys().forEach(key=>{
  const component = allComponents(key).default;
  components[component.name] = component;
})
export default {
  name: 'App',
  components: {...components},
  data: () => ({
    current: 'Default'
  }),
  computed: {
    ...mapState(['system', 'theme'])
  },
  mounted() {
    this.$router.push('/')
  },
  created() {
    document.title = '工具箱'
  }
}

</script>

<style lang="scss">
@import "@/assets/app.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: calc(100vw);
  height: calc(100vh);
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
