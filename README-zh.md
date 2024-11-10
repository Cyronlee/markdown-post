<h1 style="display: flex; align-items: center;"><img src="https://raw.githubusercontent.com/Cyronlee/markdown-post/refs/heads/master/public/logo.svg" width="48" height="48" > MarkdownPost</h1>

👋 欢迎来到`MarkdownPost`！很高兴见到你！

你只需要专注于内容创作，MarkdownPost 帮助你转换为`邮件`、`图片`、`PDF`等格式。

在线使用：[https://mdpost.vercel.app](https://mdpost.vercel.app)

![](https://raw.githubusercontent.com/Cyronlee/markdown-post/refs/heads/master/docs/demo-zh.gif)

## 功能亮点

- 💡 **简洁易用:** 实时预览效果，所见即所得。
- 🏞️ **图片上传:** 粘贴图片，自动生成图片链接。
- 🧮 **数学公式:** 支持 $\LaTeX$ 数学公式。
- 🎨 **多种主题:** 不断更新多种主题以满足不同排版需求。
- 📧 **快速分享:** 一键复制，即可发布在多种平台。
- 📄 **自动适应:** 在邮件中可以自适应窗口宽度，更美观的展示内容。
- 🔒 **数据安全:** 文本和图片完全在浏览器中处理，不会上传到服务器。
- 🌟 **免费开源:** 完全免费使用，欢迎社区贡献。

# 本地开发

```bash
yarn install

yarn run dev
```

## 贡献文章样式

在`src/styles/`下添加css文件，然后在`src/config/post-styles.ts`中添加样式：

> Gmail会移除不支持的CSS，请参考<https://developers.google.com/gmail/design/css>

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

## 许可

[MIT许可证](https://github.com/Cyronlee/markdown-post/blob/master/LICENSE)
