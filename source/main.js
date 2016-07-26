import init from './app/init';
import Particle from './lib/particle';

const particles = [];

init((ctx, { ts, dts }, { w, h, hw, hh }) => {
    particles.push(new Particle(hw, hh));
    particles.forEach(particle => {
        particle.update(dts);
        particle.render(ctx);
    });

    while (particles.length > 40) {
        particles.shift();
    }

    ctx.fillStyle = '#0ff';
    ctx.fillText(particles.length.toLocaleString(), 8, 56);
});
