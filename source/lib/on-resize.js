export default function onResize(eventTarget, callback) {
    function resizeListener(/*event*/) {
        const {
            innerWidth: width,
            innerHeight: height,
        } = eventTarget;

        callback({ width, height });
    }

    eventTarget.addEventListener('resize', resizeListener);
    resizeListener();
}
