import * as Hammer from 'hammerjs'
import Utils from '../../stuff/utils.js'
import math from '../../stuff/math.js'

var PANHEIGHT

export default class Sidebar {

    constructor(canvas, comp, side = 'right') {

        PANHEIGHT = comp.config.PANHEIGHT

        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.oImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;        
        //console.log(this.ctx)		
        this.comp = comp
        this.$p = comp.$props
        this.data = this.$p.sub
        this.range = this.$p.range
        this.id = this.$p.grid_id
        this.layout = this.$p.layout.grids[this.id]

        this.side = side
        this.listeners()

    }

    listeners() {
        var mc = new Hammer.Manager(this.canvas)
        mc.add(new Hammer.Pan({
            direction: Hammer.DIRECTION_VERTICAL,
            threshold: 1
        }))

        mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));

        mc.on('panstart', event => {
            if (this.$p.y_transform) {
                this.zoom = this.$p.y_transform.zoom
            } else {
                this.zoom = 1.0
            }
            this.y_range = [
                this.layout.$_hi,
                this.layout.$_lo
            ]
            this.drug = {
                y: event.center.y,
                z: this.zoom,
                mid: math.log_mid(this.y_range, this.layout.height),
                A: this.layout.A,
                B: this.layout.B
            }
        })

        mc.on('panmove', event => {
            if (this.drug) {
                this.zoom = this.calc_zoom(event)
                this.comp.$emit('sidebar-transform', {
                    grid_id: this.id,
                    zoom: this.zoom,
                    auto: false,
                    range: this.calc_range(),
                    drugging: true
                })
                this.update()
            }
        })

        mc.on('panend', () => {
            this.drug = null
            this.comp.$emit('sidebar-transform', {
                grid_id: this.id,
                drugging: false
            })
        })

        mc.on('doubletap', () => {
            this.comp.$emit('sidebar-transform', {
                grid_id: this.id,
                zoom: 1.0,
                auto: true
            })
            this.zoom = 1.0
            this.update()
        })

        // TODO: Do later for mobile version

    }

    update() {
        //Utils.doubleRaf(() => {

        // Update reference to the grid
        this.layout = this.$p.layout.grids[this.id]

        var points = this.layout.ys
        var x, y, w, h, side = this.side
        var sb = this.layout.sb

        this.ctx.fillStyle = this.$p.colors.colorBackSidebar
        this.ctx.font = "13px -apple-system,BlinkMacSystemFont, Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell, Fira Sans,Droid Sans,Helvetica Neue, sans-serif"

        switch (side) {
            case 'left':
                x = 0
                y = 0
                w = Math.floor(sb)
                h = this.layout.height

                this.ctx.fillRect(x, y, w, h)

                this.ctx.strokeStyle = this.$p.colors.colorScale

                this.ctx.beginPath()
                this.ctx.moveTo(x + 0.5, 0)
                this.ctx.lineTo(x + 0.5, h)
                this.ctx.stroke()

                break
            case 'right':
                x = 0
                y = 0
                w = Math.floor(sb)
                h = this.layout.height
                this.ctx.fillRect(x, y, w, h)

                this.ctx.strokeStyle = this.$p.colors.colorScale

                this.ctx.beginPath()
                this.ctx.moveTo(x + 0.5, 0)
                this.ctx.lineTo(x + 0.5, h)
                this.ctx.stroke()
                break
        }

        this.ctx.fillStyle = this.$p.colors.colorText
        this.ctx.beginPath()

        for (var p of points) {

            if (p[0] > this.layout.height - 20 || p[0] < 20) continue

            var x1 = side === 'left' ? w - 0.5 : x - 0.5
            var x2 = side === 'left' ? x1 - 4.5 : x1 + 4.5

            this.ctx.moveTo(x1, p[0] - 0.5)
            this.ctx.lineTo(x2, p[0] - 0.5)

            var offst = side === 'left' ? - 10 : 10
            this.ctx.textAlign = side === 'left' ? 'end' : 'start'
            //let d = this.layout.prec
            let d = this.layout.prec >= 3 ? 3 : this.layout.prec // Limit to 3 decimal places at most
            const yValue = Math.abs(p[1]) >= 1.0e+6 ? Utils.changeNumberFormat(p[1], d) : p[1].toFixed(d)
            this.ctx.fillText(yValue, x1 + offst, p[0] + 4)
        }

        this.ctx.stroke()

        if (this.$p.grid_id) this.upper_border()

        this.apply_shaders()

        if (this.$p.cursor.y && this.$p.cursor.y$) this.panel()
        //})

    }

    apply_shaders() {
            for (var s of this.$p.shaders) {
                this.ctx.save()
                s.draw(this.ctx)
                this.ctx.restore()
            }
    }

    upper_border() {
        this.ctx.strokeStyle = this.$p.colors.colorScale
        this.ctx.beginPath()
        this.ctx.moveTo(0, 0.5)
        this.ctx.lineTo(this.layout.width, 0.5)
        this.ctx.stroke()
    }

    // A gray bar behind the current price
    panel() {

        if (this.$p.cursor.grid_id !== this.layout.id) {
            return
        }
        
        let d = this.layout.prec >= 3 ? 3 : this.layout.prec // Limit to 3 decimal places at most

        //let lbl = this.$p.cursor.y$.toFixed(this.layout.prec)
        let lbl = Math.abs(this.$p.cursor.y$) >= 1.0e+6 ? Utils.changeNumberFormat(this.$p.cursor.y$, d) : this.$p.cursor.y$.toFixed(d)
        this.ctx.fillStyle = this.$p.colors.colorPanel

        let panwidth = this.layout.sb + 1

        let x = - 0.5
        let y = this.$p.cursor.y - PANHEIGHT * 0.5 - 0.5
        let a = 7
        this.ctx.fillRect(x - 0.5, y, panwidth, PANHEIGHT)
        this.ctx.fillStyle = this.$p.colors.colorTextHL
        this.ctx.textAlign = 'left'
        this.ctx.fillText(lbl, a, y + 15)

    }

    calc_zoom(event) {
        let d = this.drug.y - event.center.y
        let speed = d > 0 ? 3 : 1
        let k = 1 + speed * d / this.layout.height
        return Utils.clamp(this.drug.z * k, 0.005, 100)
    }

    // Not the best place to calculate y-range but
    // this is the simplest solution I found up to
    // date
    calc_range() {
        let z = this.zoom / this.drug.z
        let zk = (1 / z - 1) / 2

        let range = this.y_range.slice()
        let delta = range[0] - range[1]

        if (!this.layout.grid.logScale) {
            range[0] = range[0] + delta * zk
            range[1] = range[1] - delta * zk
        } else {

            let px_mid = this.layout.height / 2
            let new_hi = px_mid - px_mid * (1/z)
            let new_lo = px_mid + px_mid * (1/z)

            // Use old mapping to get a new range
            let f = y => math.exp((y - this.drug.B) / this.drug.A)

            let copy = range.slice()
            range[0] = f(new_hi)
            range[1] = f(new_lo)

        }

        return range
    }

    mousemove() { }
    mouseout() { }
    mouseup() { }
    mousedown() { }

}
