<template>
  <div id="trading-vue-date-filter">
    <div class="trading-vue-btn-group-container">
      <div class="trading-vue-btn-group">
        <button type="button" class="btn-item" @click="filterDay(10,'y')">10Y</button>
        <button type="button" class="btn-item" @click="filterDay(5,'y')">5Y</button>
        <button type="button" class="btn-item" @click="filterDay(3,'y')">3Y</button>
        <button type="button" class="btn-item" @click="filterDay(1,'y')">1Y</button>
      </div>
      <div class="trading-vue-btn-group" style="margin-left:30px;">
        <button type="button" class="btn-item" @click="filterDay(30,'interval')">M</button>
        <button type="button" class="btn-item" @click="filterDay(7,'interval')">W</button>
        <button type="button" class="btn-item" @click="filterDay(1,'interval')">D</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    filterDay(val, key) {
      var now = new Date();
      var to = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      );
      var from = "";
      if (key == "y") {
        from = new Date(
          now.getFullYear() - val,
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes()
        );
        this.$emit("chnDateFilter", from.getTime(), to.getTime());
      } else if (key == "interval") {
        this.$emit("chnInterval", val);
      }
    }
  }
};
</script>

<style scoped>
#trading-vue-date-filter {
  position: fixed;
  width: calc(100vw);
  left: 50%;
  margin-top: 10px; /* Negative half of height. */
  margin-left: -250px; /* Negative half of width. */
  z-index: 100;
}
.trading-vue-btn-group-container {
  text-align: center;
}
.trading-vue-btn-group {
  float: left;
}
.trading-vue-btn-group .btn-item {
  width: 65px;
  height: 40px;
  margin-left: -2px;
  border: none;
  background-color: #cfd8d9;
}
.trading-vue-btn-group .btn-item:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.trading-vue-btn-group .btn-item:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.trading-vue-btn-group .btn-item:hover {
  transform: translateY(-1px) translateX(-1px);
  transition: all 0.3s ease-in-out;
}
</style>

