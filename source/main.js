import onResize from './lib/on-resize';

let w, h, hw, hh;

onResize(window, ({w, h}) => {
    w = w;
    h = h;
    hw = w / 2;
    hh = h / 2;
});
