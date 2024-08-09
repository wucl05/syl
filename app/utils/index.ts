export const loadFont = async ({ url, name }) => {
    return new Promise(resove => {
        const font = new FontFace(name, `url(${url})`);
        font.load().then(() => {
            console.log("font load success")
            document.fonts.add(font);
            resove(true)
        })
    })
}
export const waitForVideoLoad = async (videoUrl) => {
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.addEventListener('canplaythrough', () => {
            console.log('video load success')
            resolve(video);
        });
        video.addEventListener('error', (e) => {
            resolve(false);
        });
    });

}

export const animateCss = async (element, animationName, amimateionDefaultName = 'animate__animated') => {
    return new Promise((resolve) => {
        const node = typeof (element) === "string" ? document.querySelector(element) : element
        node.classList.add(amimateionDefaultName, animationName)
        function handleAnimationEnd() {
            node.classList.remove(amimateionDefaultName, animationName)
            node.removeEventListener("animationend", handleAnimationEnd)
            resolve()
        }
        node.addEventListener("animationend", handleAnimationEnd)
    })
}

export const addAnimate = async ({ element, css, sleep = 0, styles = {}, hide = false, callback }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const node = typeof (element) === "string" ? document.querySelector(element) : element
            if (styles) {
                for (let key in styles) {
                    element.style[key] = styles[key]
                }
            }
            css && node.classList.add(css)
            function handleAnimationEnd() {
                callback && callback(element)
                if (hide) {
                    element.style.display = "none"
                }
                css && node.classList.remove(css)
                node.removeEventListener("animationend", handleAnimationEnd)
                resolve()
            }
            node.addEventListener("animationend", handleAnimationEnd)
        }, sleep)
    })
}

export const getImageInfo = async (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = function () {
            resolve(img)
        }
    })
}