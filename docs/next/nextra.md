---
title: Nextra
date: 2021-08-19 17:05:18

categories: next
---

{% blockquote %}
{% endblockquote %}

## 什么是 Nextra

Nextra works like a Next.js plugin, and it accepts a theme config (layout) to render the page.
Nextra 像是 Next.js 的一个插件，它接受一个用于渲染页面的主题。

## MDX

## SSG

在 mdx 文件中使用静态生产功能

```jsx
import { useSSG } from 'nextra/ssg'
export const getStaticProps = ({ params }) => {
  return fetch(`https://api.github.com/repos/shuding/nextra`)
    .then((res) => res.json())
    .then((repo) => ({
      props: {
        // We add an `ssg` field to the page props,
        // which will be provided to the Nextra `useSSG` hook.
        ssg: {
          stars: repo.stargazers_count,
        },
      },
      // The page will be considered as stale and regenerated every 60 seconds.
      revalidate: 60,
    }))
}
export const Stars = () => {
  // Get the data from SSG, and render it as a component.
  const { stars } = useSSG()
  return <strong>{stars}</strong>
}
Nextra has <Stars /> stars on GitHub!
```
