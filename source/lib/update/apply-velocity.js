export default function applyVelocity({ dts }, stage, particle) {
    particle.px += particle.vx * dts;
    particle.py += particle.vy * dts;
}
