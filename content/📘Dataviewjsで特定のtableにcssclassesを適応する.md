---
date: 2025-02-06
updated: 2025-02-06
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-06%2008.16.37%20-%20A%20futuristic%20digital%20interface%20displaying%20a%20coding%20environment%20with%20JavaScript%20syntax%20highlighting.%20The%20theme%20is%20'Applying%20CSS%20classes%20to%20a%20specific%20t.webp
---

# はじめに

ObsidianでMinimalテーマを使用している。
このテーマの目玉機能であるカード表示はcssclassesで設定するが、ページ全体に適応されてしまい、個別の設定は難しい。
と思っていたが、可能と書いてあるところを見つけた。

[Frequently Asked Questions - Dataview](https://blacksmithgu.github.io/obsidian-dataview/resources/faq/#how-can-i-style-my-queries)

# 方法

複数書いてあるが、多分これが一番簡単

```js
dv.container.className += 'cards'
```

Dataviewjsでテーブルを書いて、どこかにこの一行を追加するだけ。
複数の適応はスペース区切りで記入する。

```js
dv.container.className += 'cards cards-cols-4'
```

４列カード表示にする。

# 一例

このサイトの記事一覧はCardsを適応し、

![[Pasted image 20250206080600.webp]]

文献はテーブル表示とする。

![[Pasted image 20250206080546.webp]]

同時にカード表示と普通のテーブル表示が両立できた。
詳細な書き方は割愛。簡易データベースとして作ってみた。

# おわりに

かゆいところには大体手が届く。これがObsidian。
