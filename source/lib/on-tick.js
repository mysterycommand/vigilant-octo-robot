export default function onTick(callback) {
    let fts = -1, pts = -1, dts;

    function tick(ts) {
        requestAnimationFrame(tick);

        // if there is no 'first timestamp' use the current one
        if (fts === -1) { fts = ts; }

        // make this 'timestamp' relative to the 'first timestamp'
        ts -= fts;

        // if there is no 'previous timestamp' use the current one
        if (pts === -1) { pts = ts; }

        // make the 'delta timestamp' the difference between this 'timestamp'
        // and the 'previous timestamp' (will be 0 on the first frame)
        dts = ts - pts;

        callback({ ts, dts });

        // update the 'previous timestamp'
        pts = ts;
    }

    requestAnimationFrame(tick);
}
