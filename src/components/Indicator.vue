<template>
  <div class="t-vue-ind-view">
    <div class="t-vue-ind-view-container">
      <div class="t-vue-ind-view-ind" @click="show = !show" style="cursor:pointer">View</div>
      <div class="t-vue-ind-view-ind-items" v-if="show">
        <div
          v-for="ind in this.indicator"
          style="cursor:pointer"
          @click="$emit('chnIndicator', ind)"
        >
          <span class="ind-item" :class="{'active': ind.disp}">{{ind.name}}</span>
        </div>
      </div>
    </div>
    <div class="t-vue-line-type-container">
      <div class="t-vue-line-type-item" @click="$emit('chnType' , 'Candles')">Candle</div>
      <div class="t-vue-line-type-item" @click="$emit('chnType' , 'Spline')">Spline</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { show: false };
  },
  props: {
    indicator: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped>
.t-vue-ind-view {
  position: absolute;
  right: 0;
  z-index: 100;
  padding-right: 80px;
  padding-top: 16px;
}
.t-vue-ind-view-ind {
  font-size: 1.2em;
  padding: 5px 50px;
  background: #cfd8d9;
}
.t-vue-ind-view-ind-items {
  padding: 5px;
  min-width: 124px;
  background: #cfd8d9;
  margin-left: 7px;
  position: relative;
  top: 1px;
}
.ind-item.active::before {
  content: "\2611";
  margin-right: 5px;
  color: #000000;
}
.ind-item::before {
  content: "\2610";
  margin-right: 5px;
  color: #000000;
  font-size: 1.2em;
}
.ind-item:hover {
  color: red;
}
.t-vue-ind-view-container,
.t-vue-line-type-item,
.t-vue-line-type-container {
  float: left;
}
.t-vue-line-type-item {
  margin-left: 5px;
  cursor: pointer;
}
</style>