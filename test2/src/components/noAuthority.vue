<template>
  <a-card class="card" :bordered="false">
    <p>No Authority</p>
  </a-card>
</template>
<style lang="less">
.card {
  height: 100%;

  & > div {
    padding: 290px 0 0 14px;
    height: 100%;
    background: url("http://cdn.matrix.co/manage/noAuthority.png") no-repeat;
    background-position: center 150px;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    font-family: DINPro;
    color: #666;
  }
}
</style>
