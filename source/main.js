import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';
import renderBall from './lib/render/ball';
import renderSpark from './lib/render/spark';

import applyVelocity from './lib/update/apply-velocity';
import applySpin from './lib/update/apply-spin';
import applyDrag from './lib/update/apply-drag';
import applyGravity from './lib/update/apply-gravity';
import applyScale from './lib/update/apply-scale';
import applyFade from './lib/update/apply-fade';
import applyBounce from './lib/update/apply-bounce';

const { floor, random, round } = Math;

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    const field = new ParticleField();
    field.init();

    field.addUpdateFns([
        applyVelocity,
        applySpin,
        applyDrag,
        applyGravity,
        applyScale,
        applyFade,
        applyBounce,
    ]);

    function create(ctx, time, { x, y, down }, field) {
        const { pooled, active } = field;

        const created = pooled
            .splice(0, (down ? 10 : 0))
            .map(particle => {
                const render = round(random())
                    ? renderBall(floor(random() * 360))
                    : renderSpark(images, 600);

                particle.reset(x, y, render);
                return particle;
            });

        field.active = active.concat(created);
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
            particle.render(ctx, time, stage, particle);
        });
    }

    function status(ctx, { dts }, stage, { pooled, active }) {
        // a simple status display
        ctx.globalAlpha = 1;
        ctx.font = '24px monospace';

        [{
            msg: `${Math.round(1000 / dts)}fps`,
            col: '#0ff',
        },{
            msg: `pooled: ${pooled.length.toLocaleString()}`,
            col: '#f0f',
        },{
            msg: `active: ${active.length.toLocaleString()}`,
            col: '#ff0',
        }].forEach(({ msg, col }, i) => {
            ctx.fillStyle = col;
            ctx.fillText(msg, 8, (i + 1) * 28);
        })
    }

    init((ctx, time, stage) => {
        create(ctx, time, stage, field);
        field.update(time, stage);
        remove(ctx, time, stage, field);
        render(ctx, time, stage, field);
        status(ctx, time, stage, field);
    });
});
