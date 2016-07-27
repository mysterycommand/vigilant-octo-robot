const { PI: π, floor } = Math;
const ππ = 2 * π;

function saw(radians) {
    return ((radians % ππ) / π) - 1;
}

function getWaveFn(fn, p, min, max) {
    const amp = (max - min) / 2;
    const rpp = ππ / p;

    return (ts) => amp * (1 + fn(ts * rpp)) + min;
}

function frameFn(ts) {
    const waveFn = getWaveFn(saw, 500, 0, 4);
    return floor(waveFn(ts));
}

export default class Particle {
    constructor(x = 0, y = 0, frames) {
        this.px = x;
        this.py = y;

        this.frames = frames;
        this.frame = -1;

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

    update(ts, dts) {
        this.px += this.vx * dts;
        this.py += this.vy * dts;

        this.vx *= this.drag;
        this.vy *= this.drag;

        this.vy += this.grav;

        this.radius *= this.scale;
        this.alpha -= this.fade;

        this.frame = frameFn(ts);
    }

    render(ctx) {
        const { alpha, frames } = this;
        ctx.globalAlpha = Math.max(0, alpha);

        (frames)
            ? this.renderFrame(ctx)
            : this.renderBall(ctx);
    }

    renderBall(ctx) {
        const { px, py, radius, hue } = this;

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

    renderFrame(ctx) {
        const { px, py, frames, frame } = this;
        const img = frames[frame], { width, height } = img;
        const x = px - width / 2;
        const y = py - height / 2;

        ctx.drawImage(img, x, y, width, height);
    }
}
