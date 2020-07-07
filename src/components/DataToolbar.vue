<template>


  <div class="trading-vue-data-toolbar" :style="styles">
    <div class="trading-vue-data-toolbar-contaner">
      <div class="trading-vue-data-toolbar-date">
        <div class="trading-vue-data-toolbar-company-name">
          <span
            class="company-name"
            style="color: #6ec8a0;font-size: 20px;font-weight: 500"
            >{{ title_txt }}</span
          >
        </div>
        <div
          class="trading-vue-data-toolbar-compare"
          @click="activeCompare = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            width="28"
            height="28"
          >
            <path
              fill="currentColor"
              d="M13.5 6a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM4 14.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
            />
            <path fill="currentColor" d="M9 14h4v-4h1v4h4v1h-4v4h-1v-4H9v-1z" />
          </svg>
          Compare
        </div>
        <div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: range == '12M' }"
            @click="filterDay(12, 'M')"
          >
            1Y
          </div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: range == '6M' }"
            @click="filterDay(6, 'M')"
          >
            6M
          </div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: range == '3M' }"
            @click="filterDay(3, 'M')"
          >
            3M
          </div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: range == '1M' }"
            @click="filterDay(1, 'M')"
          >
            1M
          </div>
          <!-- <div class="trading-vue-data-toolbar-item" @click="filterDay('','y')">All</div> -->
        </div>
        <div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: interval == '30interval' }"
            @click="filterDay(30, 'interval')"
          >
            M
          </div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: interval == '7interval' }"
            @click="filterDay(7, 'interval')"
          >
            W
          </div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{ active: interval == '1interval' }"
            @click="filterDay(1, 'interval')"
          >
            D
          </div>
          <!-- <div class="trading-vue-data-toolbar-item" @click="filterDay('','')">All</div> -->
        </div>
        <div class="trading-vue-line-type">
          <div
            class="btn-line-type"
            :class="{ active: lineType == 'Candles' }"
            @click="chnLineType('Candles')"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAhklEQVRIS+3WUQqAIBAE0PEEdf9T1gkKg8IkmZEWoW393diht5kmDF5pcB4isBTfgPciPaR+AxcAU/U1P8lIAgpp3ajV2G+gSn5MxYJUJY/AayMwMla/7aiYYeZgZLlerhXA3DpnLUjP3t/+0yhkZm/YRcbuSMoM/xPItKR6D6nUkD3kP3AHLeg2HYuirx0AAAAASUVORK5CYII="
            />
          </div>
          <div
            class="btn-line-type"
            :class="{ active: lineType == 'Spline' }"
            @click="chnLineType('Spline')"
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAA20lEQVRIS+2U0Q3CIBRFTyfQERxBN3EER9BRnECdQDcwbqAT6AiOYK7xGdJKAS18GEiaNAQ4nPteaCg8msI8KnDwxP8u0jFwd2PKaTgFjsAMuBk0F1BmV2AFbHMbCiazdRsmcA7DM6Bv8anFfwXKZgPMncN3PlisoYqvoVu7w6K79AHaliFDwQ6vTbIw6ATYAydgmfI69AENZnEJbP9qik4HxoB9QBdmVjY3+hbmq6FqI4gboV3eV88Yuecan2HnSYo+MbAw1DRDcd7nVGCNNDmB2jTJkYU2FI/0ARgLHh3TLxBjAAAAAElFTkSuQmCC"
            />
          </div>
        </div>
        <div class="trading-vue-line-type"></div>
      </div>
      <div class="trading-vue-legend-group">
        <div
          class="trading-vue-legend-group-title"
          @click="showLegends = !showLegends"
        >
          <span>All Overlays</span>
          <img :src="base64('up.png')" v-if="showLegends" width="30px" />
          <img :src="base64('down.png')" v-else width="30px" />
        </div>
        <ul v-show="showLegends">
          <li
            v-for="(item, index) in regends"
            @click="regend_click(item)"
            :key="index"
          >
            <img
              :src="base64(item.display)"
              width="20px"
              height="20px"
              style="margin-right:3px;"
            />
            {{ item.overlay }}
          </li>
        </ul>
      </div>
    </div>
    <compare-data
      :open="activeCompare"
      @close="activeCompare = false"
      @chnData="filterDay"
    />
  </div>
</template>

<script>
import Icons from '../stuff/icons.json'
//import CompareData from "./CompareData";
export default {
  name: 'DataToolbar',
  components: {
    //CompareData
  },
  props: ['data', 'height', 'colors', 'tv_id', 'config', 'width', 'title_txt'],
  mounted() {},
  methods: {
    regend_click(item) {
      this.showLegends = false
      this.$emit('legend-button-click', item)
    },
    chnLineType(type) {
      this.lineType = type
      this.$emit('chnLineType', type)
    },
    filterDay(val, key) {
      this.activeCompare = false
      var now = new Date()
      var to = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      )
      var from = ''
      if (key == 'M') {
        this.range = val + key

        if (val == '') this.$emit('chnInterval', val)
        else {
          from = new Date(
            now.getFullYear(),
            now.getMonth() - val,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          )
          this.$emit('chnDateFilter', from.getTime(), to.getTime())
        }
      } else if (key == 'interval') {
        this.interval = val + key

        this.$emit('chnInterval', val)
      } else if (key == '') {
        this.range = ''
        this.interval = ''
        this.$emit('chnInterval', val)
      }
    },
  },
  computed: {
    base64() {
      return item => {
        return Icons[item]
      }
    },
    regends() {
      let chartData = this.$props.data
      var regends = []
      var display = false
      if (chartData.onchart !== undefined) {
        chartData.onchart.map((item, index) => {
          if (
            item.settings !== undefined &&
            item.settings.legend !== undefined &&
            item.settings.legend == false
          )
            return
          if (
            item.settings === undefined ||
            item.settings.display === undefined ||
            item.settings.display
          )
            display = true
          else display = false

          regends.push({
            display: display ? 'display_on.png' : 'display_off.png',
            button: 'display',
            dataIndex: index,
            overlay: item.name,
            grid: 0,
            type: 'onchart',
          })
        })
      }
      if (chartData.offchart !== undefined) {
        chartData.offchart.map((item, index) => {
          if (
            item.settings !== undefined &&
            item.settings.legend !== undefined &&
            item.settings.legend == false
          )
            return
          if (
            item.settings === undefined ||
            item.settings.display === undefined ||
            item.settings.display
          )
            display = true
          else display = false

          regends.push({
            display: display ? 'display_on.png' : 'display_off.png',
            button: 'display',
            dataIndex: index,
            overlay: item.name,
            type: 'offchart',
            grid: 0,
          })
        })
      }

      return regends
    },
    styles() {
      let colors = this.$props.colors
      let width = this.$props.width
      let b = this.$props.config.TB_BORDER
      let w = this.$props.config.TOOLBAR - b
      let c = colors.colorGrid
      let cb = colors.colorTbBack || colors.colorBack
      let brd = colors.colorTbBorder || colors.colorrange
      let st = this.$props.config.TB_B_STYLE
      return {
        width: `${width + 1}px`,
        height: `${w}px`,
        'background-color': cb,
        left: `${w}px`,
        'border-bottom': `${b}px ${st} ${brd}`,

        // "border-right": `${b}px ${st} ${brd}`
      }
    },
  },
  watch: {
    data: {
      handler(n) {
        // For some reason Vue.js doesn't want to
        // update 'tools' automatically when new item
        // is pushed/removed. Yo, Vue, I herd you
        // you want more dirty tricks?
        if (n.tools) this.tool_count = n.tools.length
      },
      deep: true,
    },
    range(val) {
      this.$emit('chnRange', val)
    },
  },
  created() {
    this.filterDay(6, 'M')
  },
  data() {
    return {
      interval: '',
      activeCompare: false,
      tool_count: 0,
      range: '',
      lineType: 'Spline',
      showLegends: false,
    }
  },
}
</script>

<style>
.trading-vue-data-toolbar {
  position: absolute;
  /* border-right: 1px solid black; */
  z-index: 100;
  top: 0;
}
.trading-vue-data-toolbar-contaner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-right: 20px;
}
.trading-vue-data-toolbar-date {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.trading-vue-data-toolbar-date > div {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.trading-vue-data-toolbar-compare {
  cursor: pointer;
}
.trading-vue-data-toolbar-item {
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 3px;
  cursor: pointer;
  background: rgb(236, 236, 236);
  transition: all 0.15s;
}
.trading-vue-data-toolbar-item:hover {
  transform: translateY(-2px);
  font-weight: 500;
}
.trading-vue-data-toolbar-item.active {
  background: rgba(149, 249, 137, 0.83);
  font-weight: 500;
}
.btn-line-type {
  background: #ececec;
  border-radius: 3px;
  transition: all 0.15s;
}
.btn-line-type:hover {
  transform: translateY(-2px);
  background: #00ff6645;
}
.btn-line-type.active {
  background: #0aff83;
}
.btn-line-type.active:hover {
  transform: unset;
}
.trading-vue-legend-group {
  position: relative;
}
.trading-vue-legend-group-title {
  background: rgb(236, 236, 236);
  border-radius: 5px;
  cursor: pointer;
}
.trading-vue-legend-group-title > span {
  font-size: 1rem;
  font-weight: 500;
  padding: 5px;
}
.trading-vue-legend-group ul {
  position: absolute;
  min-width: 100px;
  margin: 0;
  padding: 0;
  top: 2.2rem;
  list-style: none;
  border: 1px solid rgb(51, 23, 23);
  border-radius: 3px;
  background: white;
  transition: all 0.25s;
}
.trading-vue-legend-group ul li {
  display: flex;
  justify-items: center;
  font-size: 0.8rem;
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
}
.trading-vue-legend-group ul li:hover {
  background: blue;
  color: white;
}
.trading-vue-legend-group-title {
  display: flex;
  align-items: center;
}
</style>
