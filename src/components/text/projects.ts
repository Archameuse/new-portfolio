export type projectType = {
  title: string,
  src: string,
  descr: number,
  url: string,
  git: string,
  tags: string[],
  year: number
}

export const projects:projectType[] = [
  {
    title: "Placeholder",
    src: "/3.jpg",
    descr: 1,
    url: "https://tweeterlast.vercel.app/",
    git: "https://github.com/Archameuse/tweeterlast",
    tags: [
      'vue', 'nuxt', 'Postgresql', 'tailwind'
    ],
    year: 2025
  },
  {
    title: "Task Board",
    src: "/tasksboard.jpg",
    descr: 1,
    url: "https://taskboard-eight-wheat.vercel.app/",
    git: "https://github.com/Archameuse/taskboard",
    tags: [
      'vue', 'node', 'Firebase', 'tailwind'
    ],
    year: 2025
  },
  {
    title: "Tweeter",
    src: "/tweeter.webp",
    descr: 1,
    url: "https://tweeterlast.vercel.app/",
    git: "https://github.com/Archameuse/tweeterlast",
    tags: [
      'vue', 'nuxt', 'Postgresql', 'tailwind'
    ],
    year: 2024
  },
  // {
  //   title: "Magic Football",
  //   src: "/mf.png",
  //   descr: 2,
  //   url: "https://magicfootballsite.vercel.app/",
  //   git: "https://github.com/Archameuse/mflast",
  //   tags: [
  //     'vue', 'nuxt', 'firebase', 'Google Sheets api'
  //   ],
  //   year: 2024
  // },
  {
    title: "Unsplash Collection",
    src: "/unsplashcol.jpg",
    descr: 3,
    url: "https://unsplashcollectionfern.vercel.app/",
    git: "https://github.com/Archameuse/unsplashnuxt",
    tags: [
      'react', 'node', 'express', 'firebase'
    ],
    year: 2024
  },
  {
    title: "Code sharing app",
    src: "/codeshare.jpg",
    descr: 4,
    url: "https://codesharefean.vercel.app/",
    git: "https://github.com/Archameuse/codesharefean",
    tags: [
      'angular', 'node', 'express', 'firebase'
    ],
    year: 2024
  },
  {
    title: "Rock paper scissors",
    src: "/rockpaper.png",
    descr: 5,
    url: "https://rockpaperchallenge.vercel.app/",
    git: "https://github.com/Archameuse/rockpaper",
    tags: [
      'react', 'next'
    ],
    year: 2022
  },
  // + астероидс, мейби еще что-то сделать
]
