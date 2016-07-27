export default function load(callback) {
    Promise.all([

        './images/sparkle-1-0.png',
        './images/sparkle-1-1.png',
        './images/sparkle-1-2.png',
        './images/sparkle-2-0.png',
        './images/sparkle-2-1.png',
        './images/sparkle-2-2.png',

    ].map(url => new Promise((resolve, reject) => {

        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', reject);
        img.src = url;

    }))).then(callback);
}
