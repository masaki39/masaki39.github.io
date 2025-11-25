---
date: 2025-09-07
updated: 2025-09-07
aliases: []
tags:
  - note/publish
description: ObsidianのBasesプラグインとBook Searchプラグインを使って、読了日などを記録し、美しいカード形式で読書記録を管理・表示する方法を紹介。
---

# はじめに

Obsidianの新プラグインBasesで読書記録をつけよう。
必要ないといえばないのだが、ちょっとした満足感を得たい。

# Book Searchプラグイン

読書ノートを作成するためにコミュニティプラグインのBook Searchを使用する。
↓まずはインストールして有効化する

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907225400.webp)

↓設定は最低限、保存フォルダや命名方法などを記載すればOK。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907230131.webp)

↓コマンドパレットで`Create new book note`を実行

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907230218.webp)

↓検索ボックスで本を検索できる

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907230525.webp)

↓テンプレートを設定しなくてもデフォルトでこんな感じのノートが作成される

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907230959.webp)

プロパティを多数含んだノートであるので、Basesと相性が抜群である。

# Basesをつくる

一例として、読了日を`date`プロパティに記録するルールとしてみる。

````yaml
```base
filters:
  and:
    - file.inFolder("books")
views:
  - type: cards
    name: Cards
    order:
      - file.name
      - date
    sort:
      - property: date
        direction: DESC
    image: note.coverUrl
    imageAspectRatio: 1.5
    cardSize: 150

```
````

↓これの結果はこの様になる

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250907231902.webp)

もちろん、読了日以外に感想や評価などを書いて一覧表示にすることも可能だ。
ただ私は面倒じゃないことが一番だと思うので、読了日のみでしばらく運用しようと思っている。
今現在で4冊が追加され、少し嬉しさが出はじめているところだ。

# おわりに

シンプルな仕組みほど長続きするもの。
美しいカードレイアウトで自分だけの本棚を育てていこう。
