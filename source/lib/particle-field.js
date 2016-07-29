export default class ParticleField {
    constructor(size = 1000) {
        this.size = size;
        this.active = [];
        this.pooled = [];

        this.createFns = [];
        this.updateFns = [];
        this.removeFns = [];
        this.renderFns = [];
    }

    init() {
        const { active, pooled, size } = this;
        while (pooled.length < size) {
            pooled.push({});
        }
    }

    draw(state) {
        this.create(state);
        this.update(state);
        this.remove(state);
        this.render(state);
    }

    addCreateFns(fns) { this.createFns = this.createFns.concat(fns); }
    addUpdateFns(fns) { this.updateFns = this.updateFns.concat(fns); }
    addRemoveFns(fns) { this.removeFns = this.removeFns.concat(fns); }
    addRenderFns(fns) { this.renderFns = this.renderFns.concat(fns); }

    create(state) {
        const { pooled, active, createFns } = this;
        const { down } = state;

        const created = pooled
            .splice(0, (down ? 10 : 0))
            .map(particle => {
                createFns.forEach(fn => {
                    fn(state, particle);
                });
                return particle;
            });

        this.active = active.concat(created);
    }

    update(state) {
        const { active, updateFns } = this;

        active.forEach(particle => {
            updateFns.forEach(fn => {
                fn(state, particle);
            });
        });
    }

    remove(state) {
        const { pooled, active, removeFns } = this;

        this.active = active.reduce((accumulator, particle) => {
            if (removeFns.some(fn => fn(state, particle))) {
                pooled.push(particle);
                return accumulator;
            }

            accumulator.push(particle);
            return accumulator;
        }, []);
    }

    render(state) {
        const { active, renderFns } = this;

        active.forEach(particle => {
            renderFns.forEach(fn => {
                fn(state, particle);
            });
        });
    }
}
