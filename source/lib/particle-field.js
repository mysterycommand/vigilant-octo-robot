import Particle from './particle';

const { random, round } = Math;

export default class ParticleField {
    constructor(size = 1000) {
        this.size = size;
        this.active = [];
        this.pooled = [];
    }

    init(images) {
        const { active, pooled, size } = this;
        while (pooled.length < size) {
            pooled.push(new Particle(-1, -1, (round(random()) ? images : null)));
        }
    }

    draw(ctx, { ts, dts }, { w, h, hw, hh, x, y, down }) {
        const { active, pooled } = this;

        this.create(x, y, down);

        this.active = active.reduce((accumulator, particle) => {
            this.update(ts, dts, h, particle);

            if (this.remove(w, particle)) {
                return accumulator;
            }

            // render each particle
            particle.render(ctx);
            accumulator.push(particle);
            return accumulator;
        }, []);
    }

    create(x, y, down) {
        const { active, pooled } = this;

        // "depool" a particle (or 10) per frame
        for (let i = down ? 10 : 1; i; --i) {
            if (pooled.length === 0) {
                return;
            }

            const particle = pooled.shift();
            particle.reset(x, y);
            active.push(particle);
        }
    }

    update(ts, dts, h, particle) {
        // update each particle
        particle.update(ts, dts);

        if (particle.py > h - 50) {
            particle.py = h - 50;
            particle.vy = -particle.vy * 0.8;
        }
    }

    remove(w, particle) {
        const { pooled } = this;

        // pool "dead" particles, and bail early
        const isTransparent = particle.alpha <= 0;
        const isOutside = particle.px < 0 || w < particle.px;
        if (isTransparent || isOutside) {
            pooled.push(particle);
            return true;
        }

        return false;
    }
}
