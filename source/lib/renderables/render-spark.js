const { PI: π, floor, random } = Math;
const ππ = 2 * π;

function saw(radians) {
    return ((radians % ππ) / π) - 1;
}

function getWaveFn(fn, p, min, max, o = 0) {
    const amp = (max - min) / 2;
    const rpp = ππ / p;
    return (ts) => amp * (1 + fn((o + ts) * rpp)) + min;
}

export default function renderSpark(frames) {
    const p = 400 + floor(random() * 400), o = floor(random() * p);
    const waveFn = getWaveFn(saw, p, 0, 4, o);

    const frameFn = (ts) => {
        return floor(waveFn(ts));
    }

    return (ctx, { ts }, stage, { px, py, rotation, alpha }) => {
        const img = frames[frameFn(ts)], { width, height } = img;
        const x = -width / 2;
        const y = -height / 2;

        ctx.globalAlpha = alpha;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rotation);
        ctx.drawImage(img, x, y, width, height);
        ctx.restore();
    }
}
