import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';

import * as create from './lib/create';
import * as update from './lib/update';
import * as remove from './lib/remove';

import renderBall from './lib/render/ball';
import renderSpark from './lib/render/spark';

import status from './lib/status';

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    const field = new ParticleField();
    field.init();

    field.addCreateFns([
        create.alphaAndFade,
        create.drag,
        create.gravity,
        create.position,
        create.radiusAndScale,
        create.rotationAndSpin,
        create.velocity,
    ]);

    field.addUpdateFns([
        update.alphaByFade,
        update.positionByHeight,
        update.positionByVelocity,
        update.radiusByScale,
        update.rotationBySpin,
        update.velocityByDrag,
        update.velocityByAntigravity,
    ]);

    field.addRemoveFns([
        remove.isOutsideBottom,
        remove.isOutsideLeftRight,
        remove.isTransparent,
    ]);

    const renderers = [];
    for (let i = 0, l = 20; i < l; ++i) {
        renderers.push(renderBall(360 / l * i));
    }

    let i = -1;
    field.addRenderFns((state, particle) => {
        particle.render || (particle.render = renderers[++i % renderers.length]);
        particle.render(state, particle);
    });

    init((state) => {
        field.draw(state);
        status(state);
    });
});
