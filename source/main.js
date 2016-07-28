import init from './app/init';
import load from './app/load';
import Particle from './lib/particle';

const { random, round } = Math;
const particles = {
    active: [],
    pooled: [],
    size: 1000,
};

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    let { active, pooled, size } = particles;
    while (pooled.length < size) {
        pooled.push(new Particle(-1, -1, (round(random()) ? images : null)));
    }

    init((ctx, { ts, dts }, { w, h, hw, hh, x, y, down }) => {
        active = active.reduce((accumulator, particle) => {
            // update each particle
            particle.update(ts, dts);

            if (particle.py > h - 50) {
                particle.py = h - 50;
                particle.vy = -particle.vy * 0.8;
            }

            // pool "dead" particles
            const isTransparent = particle.alpha <= 0;
            const isOutside = particle.px < 0 || w < particle.px;
            if (isTransparent || isOutside) {
                pooled.push(particle);
                return accumulator;
            }

            // render each particle
            particle.render(ctx);
            accumulator.push(particle);
            return accumulator;
        }, []);

        // "depool" a particle (or 10) per frame
        for (let i = down ? 10 : 1; i; --i) {
            if (pooled.length === 0) {
                return;
            }

            const particle = pooled.shift();
            particle.reset(x, y);
            active.push(particle);
        }

        // a simple particle counter
        ctx.fillStyle = '#0ff';
        ctx.fillText('pooled: ' + pooled.length.toLocaleString(), 8, 56);
        ctx.fillText('active: ' + active.length.toLocaleString(), 8, 84);
    });
});
