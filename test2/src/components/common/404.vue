<template>
  <div>
    <div class="imgCon"></div>
    <h1 class="tip">404 Not Found</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}

</script>
<style lang="scss" scoped>
.imgCon {
  margin: 200px auto 10px;
  display: block;
  width: 256px;
  height: 256px;
  background: transparent url('../../assets/404.png') left top no-repeat;
}

h1 {
  text-align: center;
  color: #3CD9EF;
}

</style>
