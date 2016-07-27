import init from './app/init';
import Particle from './lib/particle';

const particles = [];

init((ctx, { ts, dts }, { w, h, hw, hh }) => {
    // create a new particle per frame
    particles.push(new Particle(hw, hh));

    // update and render each particle
    particles.forEach(particle => {
        particle.update(dts);
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
