export function isOutsideBottom({ h }, particle) {
    return particle.py > h;
}

export function isOutsideLeftRight({ w }, particle) {
    return particle.px < 0 || w < particle.px;
}

export function isTransparent(state, particle) {
    return particle.alpha <= 0;
}
