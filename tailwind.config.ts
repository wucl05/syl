import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors:{
        primary: '#1DA1F2',
        'light-gray-1': '#f1f1f1'
      },
      maxWidth:{
        'main':'1124px'
      }
    }
  }
}
