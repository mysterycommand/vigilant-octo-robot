import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';

import applyVelocity from './lib/update/apply-velocity';
import applySpin from './lib/update/apply-spin';
import applyDrag from './lib/update/apply-drag';
import applyGravity from './lib/update/apply-gravity';
import applyScale from './lib/update/apply-scale';
import applyFade from './lib/update/apply-fade';
import applyBounce from './lib/update/apply-bounce';

import renderBall from './lib/render/ball';
import renderSpark from './lib/render/spark';

import status from './lib/status';

const { floor, random, round } = Math;

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    const field = new ParticleField();
    field.init();

    field.addCreateFns(({ x, y }, particle) => {
        particle.reset(x, y);
    })

    field.addUpdateFns([
        applyVelocity,
        applySpin,
        applyDrag,
        applyGravity,
        applyScale,
        applyFade,
        applyBounce,
    ]);

    field.addRemoveFns([(stage, particle) => {
        return particle.alpha <= 0;
    }, ({ w }, particle) => {
        return particle.px < 0 || w < particle.px;
    }, ({ h }, particle) => {
        return particle.py > h;
    }]);

    field.addRenderFns((ctx, time, stage, particle) => {
        particle.render || (particle.render = round(random())
            ? renderBall(floor(random() * 360))
            : renderSpark(images, 600));

        particle.render(ctx, time, stage, particle);
    });

    init((ctx, time, stage) => {
        field.create(stage);
        field.update(time, stage);
        field.remove(stage);
        field.render(ctx, time, stage);

        status(ctx, time, stage, field);
    });
});
