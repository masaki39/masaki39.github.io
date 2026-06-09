---
date: 2026-06-09
updated: 2026-06-09
aliases: []
tags:
  - note/publish
description: ObsidianでTwitter風のタイムラインUIを実現するCSSスニペットの紹介と使い方
---

# はじめに

少し前にデイリーノートをタイムライン状に閲覧できるプラグイン [Daily Notes Timeline View](https://community.obsidian.md/plugins/daily-notes-timeline-view) を作った。

> [!note] 参考
> [[📘【Obsidian】デイリーノートを俯瞰するプラグインを作ってみた]]

このプラグインでデイリーノートを時系列に流し見できるようになると、短い投稿を気軽に残しておきたくなる。そこにTwitter風のCSSを組み合わせると、見た目も体験も一人Twitterとして完成する。

[デイリーノートをタイムライン状にしてObsidianを1人Twitterにする - 0番線デルタ](https://kinkamome.hatenablog.com/entry/2026/06/06/224849) でも紹介いただいたコールアウトを用いた見た目の調整は、以前の [[📘【Obsidian】特殊コールアウト3選]] でも取り上げたやり方に近い。今回はこれをこねくり回して、一人Twitter風CSSとして仕上げたので公開する。

# 使い方

コードはGistにアップロードした。

> [!note] [Obsidian CSS snippet: SNS Post callout (Twitter/X style timeline) · GitHub](https://gist.github.com/masaki39/dbf19b19333ae9b7b687b93b0c4ac346)

ダウンロード→`.obsidian/snippets/`に配置し、設定で有効化する。アバター画像URLやYour Nameの記載は書き換える必要がある。

```markdown
> [!timeline] 20:12
> ここになにか書きます。
```

CSSを有効にして、上記のように時刻を添えて記載すると

![](https://i.gyazo.com/9a92c548f40ad4654716db10ef4dda52.webp)

上記のように表示される(ボタンには特に機能はない)。さらに、コールアウトにはメタデータ付与方法がありCSSで区別することができる。例えば、

```markdown
> [!timeline|blue] 20:12
> ここになにか書きます。
```

上記のように記載すると、メタデータblueが付与されて左に青の目印が追加される。

![](https://i.gyazo.com/3384244ed45db02e22495639e41ed094.webp)

区別をつけることも可能ということだ。[紹介いただいたブログ](https://kinkamome.hatenablog.com/entry/2026/06/06/224849) にあるように、QuickAddやTemplaterで手軽に挿入できるようにしておくと捗る。

プラグインには無限スクロール機能とフィルタリング機能がついているので、完全に一人Twitterになる。

![](https://github.com/masaki39/daily-notes-timeline/raw/main/assets/scroll.gif)

↑プラグイン紹介画像(無限スクロール)

# おわりに

私は一人Twitter投稿として使用しており、Blueskyへの同時投稿にBlueのメタデータを付与している。CSSを調整することで過去の全ての投稿の見た目がTwitter風になって良い。
