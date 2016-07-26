import onResize from '../util/on-resize';
import onTick from '../util/on-tick';

export default function init(draw) {
    const cvs = document.getElementById('js-canvas');
    const ctx = cvs.getContext('2d');

    // start these off to the default sizes for the canvas element
    let w = 300, h = 150, hw = 150, hh = 75;

    onResize(window, ({ width, height }) => {
        cvs.width = w = width;
        cvs.height = h = height;

        hw = width / 2;
        hh = height / 2;
    });

    onTick(({ ts, dts }) => {
        // clean up the previous frame
        ctx.clearRect(0, 0, w, h);
        ctx.imageSmoothingEnabled = false;

        // do work with ts or dts here
        draw(ctx, { ts, dts }, { w, h, hw, hh });

        // a super simple fps display
        ctx.fillStyle = '#fff';
        ctx.font = '24px monospace';
        ctx.fillText(`${Math.round(1000 / dts)}fps`, 8, 28);
    });
}
