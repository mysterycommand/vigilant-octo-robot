const { PI: π, floor, random } = Math;
const ππ = 2 * π;

export default class Particle {
    constructor() {
        this.reset(-1, -1);

        this.spin = (π - random() * ππ) / 500;
        this.drag = 0.98;
        this.gravity = 0.025;
        this.scale = 1.025;
        this.fade = 0.01;
    }

    reset(x, y, render = () => {}) {
        this.px = x;
        this.py = y;
        this.render = render;

        this.vx = 0.75 - random() * 1.5;
        this.vy = 0.75 - random() * 1.5;

        this.radius = 16;
        this.rotation = 0;
        this.alpha = 1;
    }
}
