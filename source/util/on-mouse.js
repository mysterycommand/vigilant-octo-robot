export default function onMouse(target, callback) {
    let mouseX, mouseY, mouseDown;

    function update(event) {
        const source = event.touches
            ? event.touches[0]
            : event, {
                clientX,
                clientY,
            } = source;

        mouseX = clientX;
        mouseY = clientY;

        callback({ mouseX, mouseY, mouseDown });
    }

    function downListener(event) {
        mouseDown = true;
        update(event);
    }

    function moveListener(event) {
        update(event);
    }

    function upListener(event) {
        mouseDown = false;
        update(event);
    }

    target.addEventListener('mousedown', downListener);
    target.addEventListener('mousemove', moveListener);
    target.addEventListener('mouseup', upListener);
}
