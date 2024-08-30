import { options } from "@/.nuxt/eslint.config.mjs";

export const loadFont = async ({ url, name, callback }) => {
    return new Promise(resove => {
        const font = new FontFace(name, `url(${url})`);
        font.load().then(() => {
            console.log("font load success")
            document.fonts.add(font);
            if (callback) callback()
            resove(true)
        })
    })
}
export const waitForVideoLoad = async (videoUrl, callback) => {
    return new Promise(resolve => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.addEventListener('canplaythrough', () => {
            console.log('video load success')
            if (callback) callback()
            resolve(video);
        });
        video.addEventListener('error', (e) => {
            resolve(false);
        });
    });

}

export const animateCss = async ({ element, animationName, sleep = 0, amimateionDefaultName = 'animate__animated', callback }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const node = typeof (element) === "string" ? document.querySelector(element) : element
            node.classList.add(amimateionDefaultName, animationName)
            function handleAnimationEnd() {
                callback && callback(element)
                node.classList.remove(amimateionDefaultName, animationName)
                node.removeEventListener("animationend", handleAnimationEnd)
                resolve()
            }
            node.addEventListener("animationend", handleAnimationEnd)
        }, sleep)
    })
}

export const addAnimate = async ({ element, css, sleep = 0, styles = {}, hide = false, callback }) => {
    return new Promise((resolve) => {
        element && setTimeout(() => {
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
export const resultFieldsFormat = (obj, keys) => {
    keys.forEach(key => {
        const field = obj[key]
        if (field && typeof (field) === "string") {
            try {
                obj[key] = JSON.parse(field)
            } catch (error) {
            }
        }
    })
    return obj
}

export const redirectToBaiduMap = (address) => {
    // 使用 encodeURIComponent 对地址进行编码
    const encodedAddress = encodeURIComponent(address);
    // 百度地图搜索地址的 URL
    const baiduMapUrl = `https://map.baidu.com/search/${address}/@13522980.245,3402538.08,19z?querytype=s&da_src=shareurl&wd=${address}=180&src=0&pn=0&sug=0&l=19&b=(13522532.245,3402288.33;13523428.245,3402787.83)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&device_ratio=2`;
    // 跳转到百度地图
    window.open(baiduMapUrl)
}

export const parseJsonStrings = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'string') {
                    try {
                        let parsed = JSON.parse(obj[key]);
                        obj[key] = parseJsonStrings(parsed);
                    } catch (e) {
                    }
                } else if (typeof obj[key] === 'object') {
                    obj[key] = parseJsonStrings(obj[key]);
                }
            }
        }
    }
    return obj;
}

export const downloadFile = (url, filename) => {
    // if (!url || url === "") return
    if (!Array.isArray(url)) {
        useGet({
            url: `/api/open/common/downLoadFile`,
            params: {
                url,
                name: url.split('/').pop()
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // const {
        //     public: { apiBase, lang },
        // } = useRuntimeConfig()
        // const params = {
        //     url,
        //     name: url.split('/').pop(),
        //     lang
        // }
        // const allParams = []
        // for (let key in params) {
        //     const value = params[key]
        //     if ((value !== "" && value) || value === 0) {
        //         allParams.push(`${key}=${encodeURIComponent(value)}`)
        //     }
        // }
        // window.open(`${apiBase}/api/open/common/downLoadFile?${allParams.join("&")}`)
    }
    // const downloadName = filename || url.split('/').pop();  // 默认使用 URL 中的文件名
    // const a = document.createElement('a');
    // a.href = url;
    // a.target = "_blank"
    // a.download = downloadName
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
}
const httpHandler = async ({ url, params = {}, options = {}, headers = {} }, handler = "get") => {
    return new Promise(resolve => {
        const message = useState("message")
        try {
            useHttp()[handler](url, params, headers, false, options).then(res => {
                const { code, msg } = res
                if (!code) {
                    resolve(res)
                } else {
                    if (process.client) {
                        message.value = {
                            type: "error",
                            message: msg || "操作失败！"
                        }
                    } else {
                        console.log('服务错误', res)
                    }
                }
            }).catch(error => {
                if (process.client) {
                    message.value = {
                        type: "error",
                        message: error.message || "操作失败！"
                    }
                } else {
                    console.log('服务错误', error)
                }
                resolve(false)
            })
        } catch (error) {
            resolve(false)
            throw createError({
                statusCode: 502,
                statusMessage: url,
                message: 'server error',
            });
        }
    })
}
export const useGet = async (params) => {
    return await httpHandler(params, "get")
}
export const usePost = async (params) => {
    return await httpHandler(params, "post")
}

export const msgSuccess = async (text) => {
    const message = useState("message")
    message.value = {
        type: "success",
        message: text
    }
}

export const getDeviceType = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
        return 'pc';
    } else {
        return false;
    }
}

export const convertBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
