const { PI: π } = Math;
const ππ = 2 * π;

export default class Particle {
    constructor(x = 0, y = 0) {
        this.px = x;
        this.py = y;

        this.vx = 0.5 - Math.random();
        this.vy = 0.5 - Math.random();

        this.drag = 0.98;
        this.grav = 0.0125;
    }

    update(dts) {
        this.px += this.vx * dts;
        this.py += this.vy * dts;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.vy += this.grav;
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
