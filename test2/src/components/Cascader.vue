<template>
  <div class="cascaderOuter">
    <a-tag
      v-for="slectedItem of slectedItems"
      :key="slectedItem.value"
      :closable="clearable"
      @close="removeItem(slectedItem.value)"
    >
      {{ slectedItem.label }}
    </a-tag>
    <a-cascader
      v-model:value="selectVal"
      :options="data"
      :placeholder="placeholder"
      :show-search="filterable ? { filter } : false"
      @change="onChange"
    />
  </div>
</template>
<script>
export default {
  props: ["data", "value", "placeholder", "clearable", "filterable"],
  data() {
    return {
      slectedItems: [],
      selectVal: []
    };
  },
  methods: {
    removeItem(val) {
      const { remove } = this.$lodash;
      const arr = this.slectedItems;
      remove(arr, item => item.value === val);
      this.slectedItems = arr;
      const slectedVals = this.getVals();
      this.$emit("update:value", slectedVals);
    },
    getVals() {
      let arr = [];
      const { forEach, split, concat } = this.$lodash;
      forEach(this.slectedItems, item => {
        arr = concat(arr, split(item.value, ","));
      });
      return arr;
    },
    filter(inputValue, path) {
      const { includes, lowerCase } = this.$lodash;
      return path.some(option =>
        includes(lowerCase(option.label), lowerCase(inputValue))
      );
    },
    onChange(value, selectedOptions) {
      const { forEach, join, find, size, includes } = this.$lodash;
      const labelArr = [];
      const valueArr = [];
      forEach(selectedOptions, item => {
        labelArr.push(item.label);
        if (!includes(item.value, "index")) {
          valueArr.push(item.value);
        }
      });
      const thisVal = join(valueArr, ",");
      const hasVal =
        !size(this.slectedItems) ||
        find(this.slectedItems, item => item.value !== thisVal);
      if (hasVal) {
        this.slectedItems.push({
          label: join(labelArr, "/"),
          value: thisVal
        });
      }
      this.selectVal = [];
      const slectedVals = this.getVals();
      this.$emit("update:value", slectedVals);
    }
  }
};
</script>
<style lang="less">
.cascaderOuter {
  padding: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  .ant-tag {
    display: table;
    margin-bottom: 6px;
    font-size: 14px;
  }
  .ant-input {
    &,
    &:focus,
    &:hover {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
}
</style>
