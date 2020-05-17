//from https://github.com/hn4002/xcharts/blob/master/src/components/primitives/xcandle.js

// Candle object for Candles overlay

export default class CandleExt {
  constructor(overlay, ctx, data) {
    this.ctx = ctx;
    this.self = overlay;
    this.style = data.raw[6] || this.self;
    this.draw(data);
  }

  draw(data) {
    // Line width = 1 or 2?
    const line_width = this.style.lineWidth;
    const up_hollow = this.style.upCandleHollow;

    // body color
    const body_color =
      data.c <= data.o ? this.style.colorCandleUp : this.style.colorCandleDw;

    // wick color
    const wick_color =
      data.c <= data.o ? this.style.colorWickUp : this.style.colorWickDw;

    // what is this?
    const wick_color_sm = this.style.colorWickSm;

    let width = Math.max(data.w, 1);
    let halfwidth = Math.max(Math.floor(width * 0.5), 1);
    let height = Math.abs(data.o - data.c);
    let max_h = data.c === data.o ? 1 : 2;

    // Draw the wick from low to high of 1px wide as a line
    this.ctx.strokeStyle = width > 1.5 ? wick_color : wick_color_sm;
    this.ctx.lineWidth = line_width;

    this.ctx.beginPath();
    // Higher wick
    this.ctx.moveTo(Math.floor(data.x) - 0.5, Math.floor(data.h));
    this.ctx.lineTo(
      Math.floor(data.x) - 0.5,
      Math.floor(Math.min(data.o, data.c))
    );
    // Lower wick
    this.ctx.moveTo(
      Math.floor(data.x) - 0.5,
      Math.floor(Math.max(data.o, data.c))
    );
    this.ctx.lineTo(Math.floor(data.x) - 0.5, Math.floor(data.l));
    this.ctx.stroke();

    // Draw the body
    if (data.w > 1.5) {
      // Draw a body as a rectangle if it is thick (>1.5).

      let hollow = false;
      if (up_hollow && data.c <= data.o) hollow = true;

      if (hollow) {
        this.ctx.strokeStyle = body_color;
        this.ctx.lineWidth = line_width;
        let s = data.c >= data.o ? 1 : -1;
        this.ctx.translate(0.5, 0.5);
        this.ctx.beginPath();
        this.ctx.rect(
          Math.floor(data.x - halfwidth - line_width),
          Math.floor(data.o),
          Math.floor(halfwidth * 2 + line_width),
          Math.floor(s * Math.max(height, max_h))
        );

        this.ctx.stroke();
        this.ctx.translate(-0.5, -0.5);
      } else {
        this.ctx.fillStyle = body_color;
        let s = data.c >= data.o ? 1 : -1;
        this.ctx.fillRect(
          Math.floor(data.x - halfwidth - line_width),
          Math.floor(data.o),
          Math.floor(halfwidth * 2 + line_width),
          Math.floor(s * Math.max(height, max_h))
        );
      }
    } else {
      // Draw a body as a line if it is too thin.
      // The line will be drawn of wick_width.

      this.ctx.strokeStyle = body_color;

      this.ctx.beginPath();
      this.ctx.moveTo(Math.floor(data.x) - 0.5, Math.floor(data.h));
      this.ctx.lineTo(Math.floor(data.x) - 0.5, Math.floor(data.l));

      this.ctx.stroke();
    }
  }
}
