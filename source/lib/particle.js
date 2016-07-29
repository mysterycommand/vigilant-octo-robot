const { PI: π, floor, random } = Math;
const ππ = 2 * π;

export default class Particle {
    constructor(x = 0, y = 0) {
        this.reset(x, y);

        this.spin = (π - random() * ππ) / 500;
        this.drag = 0.98;
        this.grav = 0.025;
        this.scale = 1.025;
        this.fade = 0.01;
    }

    update(ts, dts) {
        this.px += this.vx * dts;
        this.py += this.vy * dts;

        this.rotation += this.spin * dts;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.vy += this.grav;

        this.radius *= this.scale;
        this.alpha -= this.fade;
    }

    reset(x, y) {
        this.px = x;
        this.py = y;

        this.vx = 0.75 - random() * 1.5;
        this.vy = 0.75 - random() * 1.5;

        this.radius = 16;
        this.rotation = 0;
        this.alpha = 1;
        this.hue = 242;
    }
}
