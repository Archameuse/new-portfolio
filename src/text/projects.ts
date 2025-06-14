export type projectType = {
  title: string
  src: string
  descr: number
  url: string
  git: string
  tags: string[]
  year: number
}

export const projects: projectType[] = [
  {
    title: 'Watchalong',
    src: 'watchalong',
    descr: 7,
    url: 'http://193.58.120.110:3000/',
    git: 'https://github.com/Archameuse/watchalong',
    tags: ['vue', 'websockets', 'node', 'tailwind'],
    year: 2025,
  },
  {
    title: 'Task Board',
    src: 'taskboard',
    descr: 6,
    url: 'https://taskboard-eight-wheat.vercel.app/',
    git: 'https://github.com/Archameuse/taskboard',
    tags: ['vue', 'node', 'Firebase', 'tailwind'],
    year: 2025,
  },
  {
    title: 'Tweeter',
    src: 'tweeter',
    descr: 1,
    url: 'https://tweeterlast.vercel.app/',
    git: 'https://github.com/Archameuse/tweeterlast',
    tags: ['vue', 'nuxt', 'Postgresql', 'tailwind'],
    year: 2024,
  },
  {
    title: 'Magic Football',
    src: 'mf',
    descr: 2,
    url: 'https://magicfootballsite.vercel.app/',
    git: 'https://github.com/Archameuse/mflast',
    tags: ['vue', 'nuxt', 'firebase', 'Google Sheets api'],
    year: 2024,
  },
  {
    title: 'Unsplash Collection',
    src: 'unsplashcol',
    descr: 3,
    url: 'https://unsplashcollectionfern.vercel.app/',
    git: 'https://github.com/Archameuse/unsplashnuxt',
    tags: ['react', 'node', 'express', 'firebase'],
    year: 2024,
  },
  {
    title: 'Code sharing app',
    src: 'codeshare',
    descr: 4,
    url: 'https://codesharefean.vercel.app/',
    git: 'https://github.com/Archameuse/codesharefean',
    tags: ['angular', 'node', 'express', 'firebase'],
    year: 2024,
  },
  {
    title: 'My Unsplash (Image uploader)',
    src: 'myunsplash',
    descr: 8,
    url: 'https://unsplashsvelte.vercel.app/',
    git: 'https://github.com/Archameuse/unsplashsvelte',
    tags: ['svelte', 'firebase', 'tailwind'],
    year: 2023,
  },
  // {
  //   title: 'Rock paper scissors',
  //   src: '/rockpaper.png',
  //   descr: 5,
  //   url: 'https://rockpaperchallenge.vercel.app/',
  //   git: 'https://github.com/Archameuse/rockpaper',
  //   tags: ['react', 'next'],
  //   year: 2022,
  // },
  // + tbc maybe
]
