export default function onResize(target, callback) {
    function resizeListener(/*event*/) {
        const {
            innerWidth: width,
            innerHeight: height,
        } = target;

        callback({ width, height });
    }

    target.addEventListener('resize', resizeListener);
    resizeListener();
}
