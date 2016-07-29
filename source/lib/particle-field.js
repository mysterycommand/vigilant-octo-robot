import Particle from './particle';

export default class ParticleField {
    constructor(size = 1000) {
        this.size = size;
        this.active = [];
        this.pooled = [];
    }

    init() {
        const { active, pooled, size } = this;
        while (pooled.length < size) {
            pooled.push(new Particle(-1, -1));
        }
    }
}
