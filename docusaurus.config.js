// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DNote",
  tagline: "free note",
  url: "https://dnote.vercel.app",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/boding_icon.jpg",
  organizationName: "dingbo8128", // Usually your GitHub org/user name.
  projectName: "dingbo.wozai.fun", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/dingbo8128/dnote/edit/main/",
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl: "https://github.com/dingbo8128/dnote/edit/main/",
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
            href: "https://github.com/dingbo8128/dnote",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} dnote.vercel.app. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "QDT7D94ACN",

        // Public API key: it is safe to commit it
        apiKey: "af703a2bf95628015a53349951d32350",

        indexName: "dnote_love_god",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    }),
};

module.exports = config;
