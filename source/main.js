import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';

import * as create from './lib/create';
import * as update from './lib/update';
import * as remove from './lib/remove';

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
        update.velocityByGravity,
    ]);

    field.addRemoveFns([
        remove.isOutsideBottom,
        remove.isOutsideLeftRight,
        remove.isTransparent,
    ]);

    field.addRenderFns((state, particle) => {
        particle.render || (particle.render = round(random())
            ? renderBall(floor(random() * 360))
            : renderSpark(images, 600, floor(random() * 600)));

        particle.render(state, particle);
    });

    init((state) => {
        field.draw(state);
        status(state);
    });
});
