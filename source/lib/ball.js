const { PI: π } = Math;
const ππ = 2 * π;

const cvs = document.createElement('canvas');
const ctx = cvs.getContext('2d');
const r = 256, hue = 242, x = r / 2, y = r / 2;

cvs.width = cvs.height = r;
ctx.clearRect(0, 0, r, r);

ctx.fillStyle = `hsla(${hue},100%,50%,0.4)`;
ctx.beginPath();
ctx.arc(x, y, r / 2, 0, ππ);
ctx.closePath();
ctx.fill();

ctx.fillStyle = `hsla(${hue},100%,75%,0.75)`;
ctx.beginPath();
ctx.arc(x, y, r / 4, 0, ππ);
ctx.closePath();
ctx.fill();

ctx.fillStyle = `hsla(${hue},0%,100%,1)`;
ctx.beginPath();
ctx.arc(x, y, r / 8, 0, ππ);
ctx.closePath();
ctx.fill();

const ball = new Image();
ball.src = cvs.toDataURL('image/png');

export default ball;
