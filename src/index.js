import TradingVue from './TradingVue.vue'
import DataCube from './helpers/datacube.js'
import Overlay from './mixins/overlay.js'
import Tool from './mixins/tool.js'
import Interface from './mixins/interface.js'
import Utils from './stuff/utils.js'
import Constants from './stuff/constants.js'
import OIPrice from './components/primitives/oi_price.js'
import OICandle from './components/primitives/oi_candle.js'
import Candle from './components/primitives/candle.js'
import Volbar from './components/primitives/volbar.js'

import Liqbar from './components/primitives/liqbar.js'
import Line from './components/primitives/line.js'
import Pin from './components/primitives/pin.js'
import Price from './components/primitives/price.js'
import Ray from './components/primitives/ray.js'
import Seg from './components/primitives/seg.js'
import { layout_cnv, layout_vol, layout_liq_bar } from './components/js/layout_cnv.js'

const primitives = {
    Candle, Volbar, Line, Pin, Price, Ray, Seg, Liqbar
}

TradingVue.install = function (Vue) {
    Vue.component(TradingVue.name, TradingVue)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TradingVue)
    window.TradingVueLib = {
        TradingVue, Overlay, Utils, Constants,
        Candle, Volbar, layout_cnv, layout_vol, layout_liq_bar,
        DataCube, Tool, Interface, primitives, OICandle, OIPrice, Liqbar
    }
}

export default TradingVue

export {
    TradingVue, Overlay, Utils, Constants,
    Candle, Volbar, layout_cnv, layout_vol, layout_liq_bar,
    DataCube, Tool, Interface, primitives,  OICandle, OIPrice, Liqbar
}
