---
date: 2024-11-15
updated: 2024-11-15
aliases: []
tags:
  - note/article
ogp: https://picsum.photos/id/91/1200/675
---

# はじめに

最近Obsidian界隈で話題のObsidian Web Clipperを自分好みにして導入してみた。
あくまでメモを取る機能とは別であるので、全く別のブロックとして機能させることとした。

# Chrome拡張機能の設定

titleを`🔗{{date}}`と変更した。
こうすることで、既存のノートの競合を回避しdataviewで表示できない特殊文字がタイトルに入ることを回避できる。
どうせtitleを取得するので、dataviewで抽出する時にtitleを使用すれば特に不便もないだろう。
プロパティにはimageの項目を追加し{{image}}を設定した。
その他はdefault設定とした。

# 専用ページを作成

既知の小技を組み合わせて作成した。下記は適当に履歴から登録してみたもの。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-11-15%2021.23.17.png)

タイトルタグをCSSでサイズ･位置調整、Bannerプラグインでランダム画像表示、Force note view modeでリーティングビュー強制、Meta Bindで検索バー設置、Modular CSS Layoutでwide-page化&検索ボックスの右寄せ、minimalのcssclassesでcards化を行っている。(これらはUIの調整だけである。)

dataview自体のコードは下記で、imageがない場合にダミー画像を取得するのと、プロパティのsearchという項目で検索をかけれるようにした。

```js
table without id
dateformat(file.ctime,"yyyy-MM-dd HH:mm:ss") as time,
choice(image, "!" + elink(image,""), "!" + elink("https://picsum.photos/seed/" + file.name + "/160/90","")) as image,
link(file.link, title) as link
from "Clippings"
where
choice(this.search, icontains(list(title, description, author), this.search), true)
sort file.ctime desc
```

別部署、ということでトップページにこの専用ページへのリンクを追加して終了。

# おわりに

たしかにとりあえず登録しておくには便利かも？