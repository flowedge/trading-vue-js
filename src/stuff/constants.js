
const SECOND = 1000
const MINUTE = SECOND * 60
const MINUTE3 = MINUTE * 3
const MINUTE5 = MINUTE * 5
const MINUTE15 = MINUTE * 15
const MINUTE30 = MINUTE * 30
const HOUR = MINUTE * 60
const HOUR4 = HOUR * 4
const HOUR12 = HOUR * 12
const DAY = HOUR * 24
const DAY3 = DAY * 3
const DAY6 = DAY * 6
const DAY12 = DAY * 12
const DAY300 = DAY * 300
const DAY950 = DAY * 950
const WEEK = DAY * 7
const WEEK7 = WEEK * 7
const MONTH = WEEK * 4
const YEAR = MONTH * 12

const MONTHMAP = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun","Jul", "Aug",
    "Sep", "Oct","Nov", "Dec"
]

// Grid time steps
const TIMESCALES = [
    YEAR * 10, YEAR * 5, YEAR * 3, YEAR * 2, YEAR,
    MONTH * 6, MONTH * 4, MONTH * 3, MONTH * 2, MONTH,
    DAY * 15, DAY * 10, DAY * 7, DAY * 5, DAY * 3, DAY * 2, DAY,
    HOUR * 12, HOUR * 6, HOUR * 3, HOUR * 1.5, HOUR,
    MINUTE30, MINUTE15, MINUTE * 10, MINUTE5, MINUTE * 2, MINUTE
]

// Grid $ steps
const $SCALES = [0.05, 0.1, 0.2, 0.25, 0.5, 0.8, 1, 2, 5]

const ChartConfig = {
    SBMIN: 60,      // Minimal sidebar px
    TOOLBAR: 57,    // Toolbar width px
    TB_ICON: 25,    // Toolbar icon size px
    TB_ITEM_M: 6,   // Toolbar item margin px
    TB_ICON_BRI: 1.9, // Toolbar icon brightness
    TB_BORDER: 1,   // Toolbar border px
    TB_B_STYLE: 'dotted', // Toolbar border style
    TOOL_COLL: 7,   // Tool collision threshold
    EXPAND: 0.15,   // %/100 of range
    CANDLEW: 0.6,   // %/100 of step
    GRIDX: 100,     // px
    GRIDY: 47,      // px
    BOTBAR: 28,     // px
    PANHEIGHT: 22,  // px
    DEFAULT_LEN: 50,// candles
    MINIMUM_LEN: 5, // candles,
    MIN_ZOOM: 25,   // candles
    MAX_ZOOM: 1000, // candles,
    VOLSCALE: 0.15, // %/100 of height
    UX_OPACITY: 0.9 // Ux background opacity
}

ChartConfig.FONT =
    `11px -apple-system,BlinkMacSystemFont,
    Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
    Fira Sans,Droid Sans,Helvetica Neue,
    sans-serif`

const MAP_UNIT = {
  "1s": SECOND,
  "5s": SECOND * 5,
  "10s": SECOND * 10,
  "20s": SECOND * 20,
  "30s": SECOND * 30,
  "1m": MINUTE,
  "3m": MINUTE3,
  "5m": MINUTE5,
  "15m": MINUTE15,
  "30m": MINUTE30,
  "1H": HOUR,
  "2H": HOUR * 2,
  "3H": HOUR * 3,
  "4H": HOUR4,
  "12H": HOUR12,
  "1D": DAY,
  "1W": WEEK,
  "1M": MONTH,
  "1Y": YEAR
}

export default {
    SECOND: SECOND,
    MINUTE: MINUTE,
    MINUTE5: MINUTE5,
    MINUTE15: MINUTE15,
    MINUTE30: MINUTE30,
    HOUR: HOUR,
    HOUR4: HOUR4,
    HOUR12: HOUR12,
    DAY: DAY,
    DAY3: DAY3,
    DAY6: DAY6,
    DAY12: DAY12,
    DAY300: DAY300,
    DAY950: DAY950,
    WEEK: WEEK,
    WEEK7: WEEK7,
    MONTH: MONTH,
    YEAR: YEAR,
    MONTHMAP: MONTHMAP,
    TIMESCALES: TIMESCALES,
    $SCALES: $SCALES,
    ChartConfig: ChartConfig,
    map_unit: MAP_UNIT
}
