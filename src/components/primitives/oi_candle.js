// Candle object for Candles overlay

export default class OICandleExt {
  constructor(overlay, ctx, data) {
      this.ctx = ctx
      this.self = overlay
      this.style = data.raw[6] || this.self
      this.draw(data)
  }

  draw(data) {
      if (data === null || data.o === null || data.c === null) {
          return
      }

      const wickWidth = 1
      const lineWidth = this.style.lineWidth
      const up_hollow = this.style.upCandleHollow

      // body color
      const body_color = data.c <= data.o ? this.style.colorCandleUp : this.style.colorCandleDw

      // wick color
      const wick_color = data.c <= data.o ? this.style.colorWickUp : this.style.colorWickDw

      // what is this?
      //const wick_color_sm = this.style.colorWickSm;

      let top = Math.min(data.o, data.c)
      let bottom = Math.max(data.o, data.c)
      let height = bottom - top
      let high = data.h
      let low = data.l
      let left = ~~data.x
      let width = Math.max(data.w, 1)
      let halfwidth = Math.max(~~(width * 0.5), 1)
      let x = ~~(data.x - halfwidth)
      let w = ~~(halfwidth * 2)

      //wick
      this.ctx.fillStyle = wick_color
      this.ctx.fillRect(data.x - 1, high, wickWidth, top - high)
      this.ctx.fillRect(data.x - 1, bottom, wickWidth, low - bottom)

      if (data.w > 2.5) {
          //drawing is 27% faster with fillrect vs using beginpath with stroke
          let hollow = false
          if (up_hollow && data.c <= data.o) hollow = true

          if (hollow) {
              this.ctx.fillStyle = body_color
              this.ctx.translate(-1, -1)
              //left
              this.ctx.fillRect(x, top, lineWidth, height)
              //right
              this.ctx.fillRect(x + w, top, lineWidth, height)
              //top
              this.ctx.fillRect(x, top, w, lineWidth)
              //bottom
              this.ctx.fillRect(x, top + height, w + 1, lineWidth)
              //
              this.ctx.translate(1, 1)
          } else {
              this.ctx.fillStyle = body_color
              this.ctx.fillRect(x - 1, top, w + 1, height)
          }
      } else {
          // zoom-out lines
          this.ctx.fillStyle = wick_color
          this.ctx.fillRect(left - 1, top, wickWidth, Math.max(bottom - top, 1))
      }
  }
}
