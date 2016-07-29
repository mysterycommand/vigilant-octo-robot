import init from './app/init';
import load from './app/load';

import ParticleField from './lib/particle-field';
const field = new ParticleField();

load([
    './images/sparkle-1-0.png',
    './images/sparkle-1-1.png',
    './images/sparkle-1-2.png',
    './images/sparkle-1-1.png',
], images => {
    field.init(images);
    init((ctx, time, stage) => {
        const { pooled, active } = field;
        field.draw(ctx, time, stage);

        // a simple particle counter
        ctx.fillStyle = '#0ff';
        ctx.fillText('pooled: ' + pooled.length.toLocaleString(), 8, 56);
        ctx.fillText('active: ' + active.length.toLocaleString(), 8, 84);
    });
});
