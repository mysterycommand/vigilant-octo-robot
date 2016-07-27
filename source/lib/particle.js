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

        this.radius = 16;
        this.scale = 1.025;

        this.hue = 242;
        this.alpha = 1;
        this.fade = 0.01;
    }

    update(dts) {
        this.px += this.vx * dts;
        this.py += this.vy * dts;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.vy += this.grav;

        this.radius *= this.scale;
        this.alpha -= this.fade;
    }

    render(ctx) {
        const { px, py, radius, alpha, hue } = this;

        ctx.globalAlpha = Math.max(0, alpha);

        ctx.fillStyle = `hsla(${hue},100%,50%,0.4)`;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, ππ);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `hsla(${hue},100%,75%,0.75)`;
        ctx.beginPath();
        ctx.arc(px, py, radius / 2, 0, ππ);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `hsla(${hue},0%,100%,1)`;
        ctx.beginPath();
        ctx.arc(px, py, radius / 4, 0, ππ);
        ctx.closePath();
        ctx.fill();
    }
}
