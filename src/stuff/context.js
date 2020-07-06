// Canvas context for text measurments

function Context($p) {

    let el = document.createElement('canvas')
    let ctx = el.getContext('2d')
    ctx.mozImageSmoothingEnabled = false
    ctx.oImageSmoothingEnabled = false
    ctx.webkitImageSmoothingEnabled = false
    ctx.msImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false
    ctx.font = $p.font

    return ctx

}

export default Context
