import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';
import renderSpark from './lib/renderables/render-spark';
import renderBall from './lib/renderables/render-ball';

const { random, round } = Math;

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    const field = new ParticleField(500);
    const spark = renderSpark(images);
    const ball = renderBall();

    field.init(images);

    function create(ctx, time, { x, y, down }, field) {
        const { pooled, active } = field;

        const created = pooled
            .splice(0, (down ? 10 : 0))
            .map(particle => {
                particle.reset(x, y);
                return particle;
            });

        field.active = active.concat(created);
    }

    function update(ctx, { ts, dts }, { h }, field) {
        field.active.forEach(particle => {
            particle.update(ts, dts);

            if (particle.py > h - 50) {
                particle.py = h - 50;
                particle.vy = -particle.vy * 0.8;
            }
        });
    }

    function remove(ctx, time, { w }, field) {
        const { pooled, active } = field;

        field.active = active.reduce((accumulator, particle) => {
            const isTransparent = particle.alpha <= 0;
            const isOutside = particle.px < 0 || w < particle.px;

            if (isTransparent || isOutside) {
                pooled.push(particle);
                return accumulator;
            }

            accumulator.push(particle);
            return accumulator;
        }, []);
    }

    function render(ctx, time, stage, { active }) {
        active.forEach(particle => {
            ball(ctx, time, stage, particle);
            // spark(ctx, time, stage, particle);
        });
    }

    function counter(ctx, field) {
        const { pooled, active } = field;

        // a simple particle counter
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#0ff';
        ctx.font = '24px monospace';
        ctx.fillText('pooled: ' + pooled.length.toLocaleString(), 8, 56);
        ctx.fillText('active: ' + active.length.toLocaleString(), 8, 84);
    }

    init((ctx, time, stage) => {
        create(ctx, time, stage, field);
        update(ctx, time, stage, field);
        remove(ctx, time, stage, field);
        render(ctx, time, stage, field);
        counter(ctx, field);
    });
});
