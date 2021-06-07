<template>
  <a-table
    :pagination="false"
    :columns="columns"
    :data-source="data"
    :scroll="{ x: '100%' }"
  >
    <template #name="{text}">
      <a>{{ text }}</a>
    </template>
    <template #action>
      <slot name="children"></slot>
    </template>
  </a-table>
  <div style="text-align: right;margin-top: 10px">
    <a-pagination
      :current="currentPage"
      :pageSize="pageSize"
      :total="total"
      @change="onSizeChange"
    >
    </a-pagination>
  </div>
</template>
<script>
import { toRefs } from "vue";

export default {
  name: "CustomTable",
  props: {
    data: Array,
    columns: Array,
    total: Number,
    currentPage: Number,
    pageSize: Number,
    pagination: Boolean,
    children: Object,
    handleSizeChange: Function
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    // const { data, columns, total, currentPage, pageSize } = toRefs(props);
    // return {
    //   data,
    //   columns,
    //   total: total || 0,
    //   currentPage: currentPage || 1,
    //   pageSize: pageSize || 10,
    //   slots: context.slots
    // };
    // // Attribute (非响应式对象)
    // console.log(context.attrs)
    //
    // // 插槽 (非响应式对象)
    // console.log(context.slots)
    //
    // // 触发事件 (方法)
    // console.log(context.emit)
  },
  mounted() {
    // console.log("$parent", this.$parent,  this.$slots);
  },
  methods: {
    onSizeChange(page, pageSize) {
      if (typeof this.handleSizeChange === "function") {
        this.$emit("size-change", page, pageSize);
      }
    }
  }
};
</script>

<style scoped></style>
