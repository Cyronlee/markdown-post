<h1 style="display: flex; align-items: center;"><img src="https://raw.githubusercontent.com/Cyronlee/markdown-post/refs/heads/master/public/logo.svg" width="48" height="48" > MarkdownPost</h1>

> English | [中文](https://github.com/Cyronlee/markdown-post/blob/master/README-zh.md)

👋 Welcome to `MarkdownPost`! Nice to meet you!

Just focus on creating your content, **MarkdownPost** will handle the conversion to formats like `email`, `image`,
`PDF`, and more.

Website：[https://mdpost.vercel.app](https://mdpost.vercel.app)

![](https://raw.githubusercontent.com/Cyronlee/markdown-post/refs/heads/master/docs/demo-en.gif)

## Features

- 💡 **Simple to Use:** Real-time preview, what you see is what you get.
- 🏞️ **Image Upload:** Paste images, automatically generate image links.
- 🧮 **Math Formula:** Support for $\LaTeX$ math formula.
- 🎨 **Multiple Themes:** Continuously updated to meet different layout needs.
- 📧 **Quick Sharing:** One-click copy, ready to publish on multiple platforms.
- 📄 **Auto-Adapt:** Adapts to email window widths for a more attractive display.
- 🔒 **Data Security:** Text and images are processed entirely in the browser, not uploaded to servers.
- 🌟 **Free & Open Source:** Completely free to use, community contributions welcome.

# Local Development

```bash
yarn install

yarn run dev
```

## Contributing Styles

Add a css file in `src/styles/`, then add the style in `src/config/post-styles.ts`:

> Unsupported CSS may be ignored by Gmail, please refer to <https://developers.google.com/gmail/design/css>

```ts
import githubStyle from "@/styles/github.css?raw";
import newspaperStyle from "@/styles/newspaper.css?raw";
import posterStyle from "@/styles/poster.css?raw";

export const markdownStyles = [
  { name: "github", css: githubStyle },
  { name: "newspaper", css: newspaperStyle },
  { name: "poster", css: posterStyle },
];
```

## License

[MIT License](https://github.com/Cyronlee/markdown-post/blob/master/LICENSE)
