---
date: 2026-01-25
updated: 2026-01-25
aliases: []
tags:
  - note/publish
description: Vercel APIとcheerioによるウェブスクレイピングを活用し、URLからOGP情報を取得して画像形式のリンクカードを生成し、Markdownで汎用的な表示を実現する開発解説。
---

# はじめに

リンクカード、使いたいなと思っていた。リンクカードとはリンクをカード形式で表示したものだ(そのまま)。ただ、例えばObsidian上で表示させるだけならプラグインで何とかなるのだが、汎用性を持たせるのはなかなか難しい。

![](https://github.com/nekoshita/obsidian-auto-card-link/raw/main/demo.gif)
↑Auto Card Linkプラグイン

私の場合、Quartzで作成したサイト上でリンクカードを作ろうと思うとCustom componentを作らないといけないだろうし、基になるObsidian上でも同様に表示させるのはかなり難しい。

# Vercel使えないか

少し前にGitHubでプロフィール画面的なのを作った。[GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)というのを他の人が使っているのをみて、かっこよいなと思ったからである。

[![](https://ogpf.vercel.app/c?url=https://github.com/masaki39)](https://github.com/masaki39)
この時に、Vercelというサービスを使用するのだが、これが結構強いサービスだと感じた。無料でJavaScriptまたはTypeScriptでAPIを構築できるのだ。

# こんなのがほしい

URLをエンドポイントに持ち、OGPやリンクカードを画像として返す。ウェブスクレイピングのライブラリさえあれば、恐らくHTMLから必要なデータを抜いて作れるはずだ。画像を返すAPIであれば、マークダウン記法でどのプラットフォームでも動くはずなのだ。

Claude Codeさんお願いします！

98%くらいClaude Codeに作ってもらったリポジトリがこちら。

> [!quote] [GitHub - masaki39/ogp-fetcher: OGP Fetcher API - Extract OG metadata from URLs with SSRF protection](https://github.com/masaki39/ogp-fetcher)

たとえば、下記のようにマークダウンで書くとする(ドメインは各自)。

```markdown
[![GitHub](https://your-deployment.vercel.app/c?url=https://github.com)](https://github.com)
```

これが、

[![](https://ogpf.vercel.app/c?url=https://github.com)](https://github.com)

こうなる。

ウェブスクレイピングはcheerioというライブラリを使っているようだ。cheerioでurlからtitleとdescriptionとog:imageを取得して、SVGで配置して返す。

# メリット・デメリット

良い点は

- 常に最新の情報を取得できること
- APIの仕様を変更したら全てが反映されること
- エンドポイントを好みで追加できること
- どのプラットフォームでも使えること

悪い点は

- APIの処理としては若干重い
- 記法を知る第3者に使われてしまう(Vercelの無料枠を使われてしまう)

前者はキャッシュを長めに取れば初回以外マシだろう。後者は、仕様が不安定なAPIを第3者が使うメリットがないことと、どうせ無料であるということで許容する。

# おわりに

Vercel、いいですね。

[![](https://ogpf.vercel.app/c?url=https://vercel.com/)](https://vercel.com/)
