import init from './app/init';
import Particle from './lib/particle';

const particle = new Particle();

init((ctx, { ts, dts }, { w, h, hw, hh }) => {
    particle.px = hw;
    particle.py = hh;

    particle.render(ctx);
});
