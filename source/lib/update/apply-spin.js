export default function applySpin({ dts }, stage, particle) {
    particle.rotation += particle.spin * dts;
}
