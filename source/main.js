import init from './app/init';
import ParticleField from './lib/particle-field';

const SCROLL_RUNWAY_TOP = 200;
const SCROLL_RUNWAY = 2000;

const stats = document.getElementById('js-stats');

const particleField = new ParticleField(5000);
particleField.init();

particleField.addCreateFns([(state, particle) => {
    const { index } = particle.dataset;

    particle.dataset.translateTop = index * (100 + 20);
    particle.dataset.translateBottom = index * (100 + 20) + 100;

    particle.style.backgroundColor = `hsl(${(index * (360 / 9)) % 360},50%,50%)`;
    particle.style.position = 'absolute';
    particle.style.transform = `translateY(${index * (100 + 20)}px)`;
}]);

particleField.addUpdateFns([(state, particle) => {
}]);

particleField.addRemoveFns([({ st, oh }, particle) => {
    const { translateTop, translateBottom } = particle.dataset;
    const viewTop = st - SCROLL_RUNWAY_TOP;
    const viewBottom = st + oh + SCROLL_RUNWAY;

    return parseInt(translateBottom, 10) < viewTop || viewBottom < parseInt(translateTop, 10);
}]);

particleField.addRenderFns([({ main }, particle) => {
    main.appendChild(particle);
}]);

init((state) => {
    const { main } = state;
    const nodes = main.getElementsByTagName('*');
    stats.innerHTML = `<code><pre>nodes: ${nodes.length}</pre></code>`;
    particleField.draw(state);
});
