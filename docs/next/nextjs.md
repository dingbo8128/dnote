---
title: NextJs
date: 2021-07-28 16:10:39

  - next.js
  - web
categories: next
---

{% blockquote %}
{% endblockquote %}

## 服务器端渲染原理

增加中间层，组装好页面数据，再返回给浏览器。

## 命令行

### 常用命令

- 创建 ts 项目
  `npx create-next-app --ts`

- 开发模式启动
  `yarn dev`

## Link

```jsx
import Link from "next/link";
<Link href="/posts/first-post">
  <a>this page!</a>
</Link>;
```

## 路由

```jsx
import { useRouter } from "next/router";
const router = useRouter();
<span onClick={() => router.push("/about")}>Click here to read more</span>;
```

## 预渲染

### 编译时渲染（静态生成）(SSR)

#### 不带数据

```js
function About() {
  return <div> About </div>;
}

export default About;
```

#### 带初始化数据

```js
function Blog({ posts }) {
  // Render posts...
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Blog;
```

#### 动态路由页面静态渲染

```js
function Post({ post }) {
  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      post,
    },
  };
}

export default Post;
```

### 增量静态重生成（Incremental Static Regeneration)（ISR）

### 运行时服务端渲染（SSR）

If a page uses Server-side Rendering, the page HTML is generated on each request。
每次请求都会重新生成页面。

```js
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data,
    },
  };
}

export default Page;
```

### 总结

1. 静态生成(SG)
   1. getStaticProps
   2. getStaticPaths
2. 服务端渲染(SSR)
   1. getServerSideProps

## 布局

类似的页面布局是类似的，下面的示例展示了如何让每个页面都有相同的导航栏和 Footer.

```js
// components/layout.js

import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main> {children} </main> <Footer />
    </>
  );
}
```

如果只用一种布局，那就这样用。**即使切换页面 layout 的状态也会保持**

```js
// pages/_app.js

import Layout from "../components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />{" "}
    </Layout>
  );
}
```

如果每个页面都有自己独特的布局，那就这样写：

```js
// pages/index.js

import Layout from "../components/layout";
import NestedLayout from "../components/nested-layout";

export default function Page() {
  return {
    /** Your content */
  };
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout> {page} </NestedLayout>{" "}
    </Layout>
  );
};
```

```js
// pages/_app.js

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

## 静态文件

### 图片

放在 public 目录下

```js
import Image from "next/image";
function Avatar() {
  return <Image src="/me.png" alt="me" width="64" height="64" />;
}
export default Avatar;
```

## 环境变量

```sh
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
```

暴露环境变量到浏览器环境,以 NEXT*PUBLIC*开头。

```sh
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

环境变量分类

1. .env.local 本地，不提交
2. .env 所有环境都适用
3. .env.development 开发环境
4. .env.production 生成环境

读取环境变量

```js
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from "@next/env";

export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
```

## 路由规则

| 文件路径                             | URL 路径                       |
| ------------------------------------ | ------------------------------ |
| pages/index.js                       | /                              |
| pages/blog/index.js                  | /blog                          |
| pages/blog/first-post.js             | /blog/first-post               |
| pages/dashboard/settings/username.js | /dashboard/settings/username   |
| pages/blog/[slug].js                 | /blog/:slug(/blog/hello-world) |
| pages/[username]/setting.js          | /:username/settings            |
| pages/post/[...all].js               | /post/\* (/post/2020/id/title) |
