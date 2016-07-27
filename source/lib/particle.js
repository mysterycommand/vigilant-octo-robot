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
        const { px, py, radius, alpha } = this;

        ctx.globalAlpha = Math.max(0, alpha);

        ctx.fillStyle = 'rgba(13,1,248,0.41)';
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, ππ);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(134,129,254,0.73)';
        ctx.beginPath();
        ctx.arc(px, py, radius / 2, 0, ππ);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.beginPath();
        ctx.arc(px, py, radius / 4, 0, ππ);
        ctx.closePath();
        ctx.fill();
    }
}
