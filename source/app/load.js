export default function load(urls, callback) {
    Promise.all(urls.map(url => new Promise((resolve, reject) => {

        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', reject);
        img.src = url;

    }))).then(callback);
}
