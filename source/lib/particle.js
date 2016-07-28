import ball from './ball';

const { PI: π, floor, max, random } = Math;
const ππ = 2 * π;

function saw(radians) {
    return ((radians % ππ) / π) - 1;
}

function getWaveFn(fn, p, min, max, o = 0) {
    const amp = (max - min) / 2;
    const rpp = ππ / p;
    return (ts) => amp * (1 + fn((o + ts) * rpp)) + min;
}

export default class Particle {
    constructor(x = 0, y = 0, frames) {
        this.reset(x, y);

        this.frames = frames;
        this.frame = -1;

        const p = 400 + floor(random() * 400), o = floor(random() * p);
        const waveFn = getWaveFn(saw, p, 0, 4, o);
        this.frameFn = function(ts) {
            return floor(waveFn(ts));
        }

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

        if (this.frames) {
            this.frame = this.frameFn(ts);
        }
    }

    render(ctx) {
        const { alpha, frames } = this;
        ctx.globalAlpha = max(0, alpha);

        (frames)
            ? this.renderFrame(ctx)
            : this.renderBall(ctx);
    }

    renderBall(ctx) {
        const { px, py, radius } = this;
        const x = px - radius;
        const y = py - radius;

        ctx.drawImage(ball, x, y, radius * 2, radius * 2);
    }

    renderFrame(ctx) {
        const { px, py, frames, frame, rotation } = this;
        const img = frames[frame], { width, height } = img;
        const x = -width / 2;
        const y = -height / 2;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rotation);
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
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
