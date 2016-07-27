import init from './app/init';
import load from './app/load';
import Particle from './lib/particle';

const particles = [];

load(images => {
    init((ctx, { ts, dts }, { w, h, hw, hh, x, y, down }) => {
        // create a new particle per frame
        particles.push(new Particle(x, y));

        // update and render each particle
        particles.forEach(particle => {
            particle.update(dts);
            particle.hue = down ? 62 : 242;
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
