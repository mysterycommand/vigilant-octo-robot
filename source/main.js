import init from './app/init';

init((ctx, { ts, dts }, { w, h, hw, hh }) => {
    ctx.fillStyle = '#f0f';
    ctx.fillRect(hw - 50, hh - 50, 100, 100);
});
