export function alphaByFade(state, particle) {
    particle.alpha -= particle.fade;
}

export function positionByHeight({ h }, particle) {
    if (particle.py > h - 50) {
        particle.py = h - 50;
        particle.vy = -particle.vy * 0.8;
    }
}

export function positionByVelocity({ dts }, particle) {
    particle.px += particle.vx * dts;
    particle.py += particle.vy * dts;
}

export function radiusByScale(state, particle) {
    particle.radius *= particle.scale;
}

export function rotationBySpin({ dts }, particle) {
    particle.rotation += particle.spin * dts;
}

export function velocityByDrag(state, particle) {
    particle.vx *= particle.drag;
    particle.vy *= particle.drag;
}

export function velocityByGravity(state, particle) {
    particle.vy += particle.gravity;
}
