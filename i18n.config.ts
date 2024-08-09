export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'cn',
    messages: {
        cn: {
            welcome: '欢迎',
            home: {
            }
        },
        en: {
            welcome: 'Welcome',
            home: {
                nav:[
                    {
                        label:"关于我们",
                        to:"/about"
                    },
                    {
                        label:"工商业储能",
                        to:"/about"
                    },
                    {
                        label:"源网侧储能",
                        to:"/about"
                    }
                ]
            }
        },
        fr: {
            welcome: 'Bienvenue'
        }
    }
}))
