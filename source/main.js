import onResize from './lib/on-resize';

const cvs = document.getElementById('js-canvas');
const ctx = cvs.getContext('2d');

let w, h, hw, hh;

onResize(window, ({ width, height }) => {
    cvs.width = w = width;
    cvs.height = h = height;

    hw = width / 2;
    hh = height / 2;
});
