var CONST = require("./const");

module.exports = {
  title: `Python 101`,
  description: `대학원생을 위한 파이썬 기초`,
  base: "/python101/",
  plugins: {
    "vuepress-plugin-disqus-comment":
    {
      /* options */
      'shortname': 'python-101' 
    },
    '@vuepress/google-analytics': {
      'ga': 'UA-97091494-1' // UA-00000000-0
    },
    '@vuepress/back-to-top': {},
    '@vuepress/last-updated': {}
  },
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.png'
    }]
  ],
  themeConfig: {
    sidebar: [
      {
        title: '강의자료',
        children: CONST.Lecture
      },{
        title: 'A. 부록',
        children: CONST.Appendix
      }
    ],
    nav: [{
        text: 'GitHub',
        link: 'https://github.com/taegon/'
      }, {
        text: 'Blog',
        link: 'https://code.taegon.kr/'
      }
    ]
  }
}