export default function onResize(eventTarget, callback) {
    function resizeListener(/*event*/) {
        const {
            innerHeight: h,
            innerWidth: w,
        } = eventTarget;

        callback({ w, h });
    }

    eventTarget.addEventListener('resize', resizeListener);
    resizeListener();
}
