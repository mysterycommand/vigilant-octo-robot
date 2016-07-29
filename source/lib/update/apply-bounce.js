export default function applyBounce(time, { h }, particle) {
    if (particle.py > h - 50) {
        particle.py = h - 50;
        particle.vy = -particle.vy * 0.8;
    }
}
