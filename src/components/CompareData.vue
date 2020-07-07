<template>
  <div class="trad-vue-chart-compare-data" v-if="activeCompare">
    <div class="trad-vue-chart-compare-data-header">
      <svg
        @click="$emit('close')"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x-square"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    </div>
    <div class="trad-vue-chart-compare-data-content">
      <multiselect
        v-model="compareDatas"
        :options="datas"
        track-by="isin"
        label="name"
        :multiple="true"
        :show-labels="false"
        placeholder="Jämför"
      >
        <!-- :placeholder="$t('Add_watchlistRapportkollen')" -->

        <template slot="selection" slot-scope="{ values }">
          <div v-if="values.length>0">{{values.length}} Selected</div>
        </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import ApiStocks from "@/Services/ApiStocks.js";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    ApiStocks.fetchStocks().then(response => {
      response.data
        .sort((a, b) => ~~(a.ticker < b.ticker))
        .map(item => {
          this.datas.push({
            isin: item.isin,
            ticker: item.ticker,
            name: item.name
          });
        });
    });
  },
  data() {
    return {
      datas: []
    };
  },
  components: {
    Multiselect
  },
  computed: {
    compareDatas: {
      get() {
        return this.$store.getters["compareDatas"];
      },
      set(val) {
        this.$store.commit("setCompareDatas", val);
        this.$emit("chnData", "", "interval");
      }
    },
    activeCompare: {
      get() {
        return this.open;
      },
      set() {
        this.$emit("close");
      }
    }
  }
};
</script>
<style scoped>
.trad-vue-chart-compare-data {
  position: fixed;
  top: 30%;
  left: 50%;
  background: #383838bd;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
}
.trad-vue-chart-compare-data-content {
  width: 400px;
  padding: 10px 10px;
}
.trad-vue-chart-compare-data-header {
  text-align: right;
}
.trad-vue-chart-compare-data-header > svg {
  cursor: pointer;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

