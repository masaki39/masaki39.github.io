---
date: 2026-01-03
updated: 2026-01-03
aliases: []
tags:
  - note/publish
description: Obsidianのデイリーノートをタイムライン形式で俯瞰・検索できるプラグイン「daily-notes-timeline」の紹介と作成経緯。
---

# はじめに

年末にこんな記事を見た。

> [!quote] [「考えなくていいUI」を考える｜ritar](https://note.com/ritar/n/n9e960988c8c8)

何も考えなくても良いタイムライン的なUIと、構造を正確に提示するトポグラフィ型のUIがあるという話であった。私は基本的にはトポグラフィ型のUIを好む傾向にあるなと思ったが、タイムライン型のUIも良い点があるなとも思った。どっちも必要、つまり適材適所が望ましいのでは？と考えた。

# デイリーノートはタイムライン型UIが向いている？

私はメモアプリのObsidianを使っている。Obsidianユーザーの少なくない割合がデイリーノートを使っているだろう。とりあえずメモ、ログ、タスクなど色々あるだろう。そのまま使ってもまぁ問題ないのだが、俯瞰という要素があるとなお嬉しい。その点、デイリーノートは作成した段階でノートのうち時間軸でalignしているので、タイムライン的なUIの良い適応だろう。

# 作成したプラグイン

作成にはCodexの補助を多分に使用した。コアプラグインのデイリーノートの設定を引き継ぐので、何の設定もいらないシンプルかつ軽量なプラグインになった。代表的な機能を列挙してみる。

![](https://github.com/masaki39/daily-notes-timeline/raw/main/assets/scroll.gif)

無限スクロールで必要な分だけ描画

![](https://github.com/masaki39/daily-notes-timeline/raw/main/assets/filter.gif)

特定のランドマークでフィルタリング

![](https://github.com/masaki39/daily-notes-timeline/raw/main/assets/search.gif)

検索語句で更に絞り込み

> [!quote] リポジトリはこちら
> [GitHub - masaki39/daily-notes-timeline: Timeline view for Obsidian daily notes.](https://github.com/masaki39/daily-notes-timeline)

# おわりに

年末年始休みを活かして小機能をもつプラグインをまとめることができた。私の用途で考えると、タスクとかの振り返りかな。ランダムノート×タイムラインとかも相性いいかもしれない。
