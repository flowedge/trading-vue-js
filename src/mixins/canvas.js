// Interactive canvas-based component
// Should implement: mousemove, mouseout, mouseup, mousedown, click
import Utils from '../stuff/utils.js'


export default {
    methods: {
        setup() {
            const id = `${this.$props.tv_id}-${this._id}-canvas`
            const canvas = document.getElementById(id)
            let dpr = window.devicePixelRatio || 1
            canvas.style.width = `${this._attrs.width}px`
            canvas.style.height = `${this._attrs.height}px`
            if (dpr < 1) dpr = 1 // Realy ? That's it? Issue #63
            this.$nextTick(() => {
                var rect = canvas.getBoundingClientRect()
                canvas.width = rect.width * dpr
                canvas.height = rect.height * dpr
                const ctx = canvas.getContext('2d');
                //dont scale if not UHD/retina
                if (dpr > 1) ctx.scale(dpr, dpr)
                ctx.imageSmoothingEnabled = false
                ctx.webkitImageSmoothingEnabled = false
                ctx.mozImageSmoothingEnabled = false
                ctx.msImageSmoothingEnabled = false
                ctx.oImageSmoothingEnabled = false
                //console.log(ctx)
                this.redraw()
            })
        },
        create_canvas(h, id, props) {
            this._id = id
            this._attrs = props.attrs
            return h('div', {
                class: `trading-vue-${id}`,
                style: {
                    left: props.position.x + 'px',
                    top: props.position.y + 'px',
                    position: 'absolute',
                }
            }, [
                h('canvas', {
                    on: {
                        mousemove: e => this.renderer.mousemove(e),
                        mouseout: e => this.renderer.mouseout(e),
                        mouseup: e => this.renderer.mouseup(e),
                        mousedown: e => this.renderer.mousedown(e)
                    },
                    attrs: Object.assign({
                        id: `${this.$props.tv_id}-${id}-canvas`
                    }, props.attrs),
                    ref: 'canvas',
                    style: props.style,
                })
            ].concat(props.hs || []))
        },
        redraw() {
            if (!this.renderer) return
                Utils.doubleRaf(() => {                    
                    this.renderer.update() //sidebar , botbar, grid                                                
                })
            }        
    },
    watch: {
        width(val) {
            this._attrs.width = val
            this.setup()
        },
        height(val) {
            this._attrs.height = val
            this.setup()
        }
    }
}
