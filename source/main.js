import init from './app/init';
import load from './app/load';
import Particle from './lib/particle';

const { random, round } = Math;
const particles = [];

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    init((ctx, { ts, dts }, { w, h, hw, hh, x, y, down }) => {
        // update and render each particle
        particles.forEach(particle => {
            particle.update(ts, dts);

            if (particle.py > h - 50) {
                particle.py = h - 50;
                particle.vy = -particle.vy * 0.8;
            }

            particle.render(ctx);
        });

        // if we go above a limit, start removing particles
        while (particles.length > 1000) {
            particles.shift();
        }

        // create a new particle (or 10) per frame
        for (let i = down ? 10 : 1; i; --i) {
            particles.push(new Particle(x, y, (round(random()) ? images : null)));
        }

        // a simple particle counter
        ctx.fillStyle = '#0ff';
        ctx.fillText(particles.length.toLocaleString(), 8, 56);
    });
});
