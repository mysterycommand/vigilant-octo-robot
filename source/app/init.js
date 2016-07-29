import onScroll from '../util/on-scroll';
import onResize from '../util/on-resize';
import onTick from '../util/on-tick';

export default function init(draw) {
    const main = document.getElementById('js-main');

    let w, h, st, oh;

    onResize(window, ({ width, height }) => {
        w = width;
        h = height;
    });

    onScroll(main, ({ scrollTop, offsetHeight }) => {
        st = scrollTop;
        oh = offsetHeight;
    });

    onTick(({ ts, dts }) => {
        draw({ main, ts, dts, w, h, st, oh });
    });
}
