<template>
  <div style="float:left">
    <div style="width: 100px;height: 100px"></div>
  </div>
</template>

<script>

export default {
  name: "index",
  data: () => ({
    value1: ''
  }),
  created() {
    // setInterval(() => {
    //   this.$notify.success({})
    // }, 500)
  },
  methods: {
    dateChange(){
      new Date().toUTCString()
      console.log(this.value1.toISOString())
    }
  }
}
</script>

<style scoped>

</style>
