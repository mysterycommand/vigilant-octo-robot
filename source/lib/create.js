const { PI: π, random } = Math;
const ππ = 2 * π;

export function alphaAndFade(state, particle) {
    particle.alpha = 1;
    particle.fade = 0.01;
}

export function drag(state, particle) {
    particle.drag = 0.98;
}

export function gravity(state, particle) {
    particle.gravity = 0.025;
}

export function position({ x, y }, particle) {
    particle.px = x;
    particle.py = y;
}

export function radiusAndScale(state, particle) {
    particle.radius = 16;
    particle.scale = 1.025;
}

export function rotationAndSpin(state, particle) {
    particle.rotation = 0;
    particle.spin = (π - random() * ππ) / 500;
}

export function velocity(state, particle) {
    particle.vx = 0.75 - random() * 1.5;
    particle.vy = 0.75 - random() * 1.5;
}
