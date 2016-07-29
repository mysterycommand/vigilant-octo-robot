export default function onScroll(target, callback) {
    function scrollListener(/*event*/) {
        const {
            scrollTop,
            offsetHeight,
        } = target;

        callback({ scrollTop, offsetHeight });
    }

    target.addEventListener('scroll', scrollListener);
    scrollListener();
}
