export default function applyDrag(time, stage, particle) {
    particle.vx *= particle.drag;
    particle.vy *= particle.drag;
}
