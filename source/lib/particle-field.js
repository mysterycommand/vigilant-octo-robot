import Particle from './particle';

export default class ParticleField {
    constructor(size = 1000) {
        this.size = size;
        this.active = [];
        this.pooled = [];

        this.updateFns = [];
    }

    init() {
        const { active, pooled, size } = this;
        while (pooled.length < size) {
            pooled.push(new Particle());
        }
    }

    addUpdateFns(fns) {
        this.updateFns = this.updateFns.concat(fns);
    }

    update(time, stage) {
        const { active, updateFns } = this;
        active.forEach(particle => {
            updateFns.forEach(fn => {
                fn(time, stage, particle);
            });
        });
    }
}
