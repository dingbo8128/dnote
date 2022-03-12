// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "BoDing 的技术笔记",
  tagline: "永不熄灭的技术热情， 源于对上帝的信仰",
  url: "https://boding.bezalelit.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/boding_icon.jpg",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/dingbo8128/boding.bezalelit.com/edit/main/",
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            "https://github.com/dingbo8128/boding.bezalelit.com/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "BoDing",
        logo: {
          alt: "BoDing",
          src: "img/boding512.jpg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Note",
          },
          { to: "blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/dingbo8128/boding.bezalelit.com",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} boding.bezalelit.com. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
