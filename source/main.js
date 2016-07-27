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
    './images/sparkle-2-0.png',
    './images/sparkle-2-1.png',
    './images/sparkle-2-2.png',
    './images/sparkle-2-1.png',
], images => {
    init((ctx, { ts, dts }, { w, h, hw, hh, x, y, down }) => {
        // create a new particle per frame
        const frames = round(random()) ? images.slice(0, 4) : images.slice(4);
        particles.push(new Particle(x, y, (round(random()) ? frames : null)));

        // update and render each particle
        particles.forEach(particle => {
            particle.update(ts, dts);
            particle.hue = down ? 53 : 242;
            particle.render(ctx);
        });

        // if we go above a limit, start removing particles
        while (particles.length > 500) {
            particles.shift();
        }

        // a simple particle counter
        ctx.fillStyle = '#0ff';
        ctx.fillText(particles.length.toLocaleString(), 8, 56);
    });
});
