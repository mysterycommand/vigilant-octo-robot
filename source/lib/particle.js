const { PI: π } = Math;
const ππ = 2 * π;

export default class Particle {
    constructor(x = 0, y = 0) {
        this.px = x;
        this.py = y;
    }

    render(ctx) {
        const { px, py } = this;

        ctx.fillStyle = '#fff';

        ctx.beginPath();
        ctx.arc(px, py, 10, 0, ππ);
        ctx.closePath();

        ctx.fill();
    }
}
