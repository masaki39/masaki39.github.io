---
date: 2025-02-22
updated: 2025-02-22
aliases: []
tags:
  - note/publish
  - obsidian
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-22%2022.53.12%20-%20A%20modern%2C%20stylish%20OGP%20image%20for%20an%20article%20titled%20'Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84'.%20The%20design%20should%20be%20clean%20and%20professional%2C%20with%20a%20tech-focused%20aestheti.webp
---

# はじめに

スタックタブ機能、ご存知だろうか。ペインを横並びに配置できる機能で、古くはSliding paneプラグインとして知られていた。私も存在は知っていたのだが、最近タブの移動をトラックパッドの横スクロールでできることに気がついた。出先でPCを触る機会の多い私にとって慢性的なワーキングスペース不足問題を解決できるものかもしれない。専用のUIを作ってみよう。

テーマは｢ワーキングスペースの最大化｣である。

# 導入

Sandbox保管庫を使用する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740228492241.webp)

タブバー右上からスタックタブに表示変更できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740228744671.webp)

こうなる。ここで気づくことは

- 一番上のタブバーはほぼ何も表示されていない
- スタックタブにページタイトルが表示される

という2点だ。

# タブバーは必要なのか

こうなるとタブバーの中で必要な機能は、サイドバーの閉開とウィンドウ自体のドラッグくらいだろう。この内サイドバーの閉開はホットキーの設定で対応することとする。それぞれ`⌥+←`と`⌥+→`と設定した。

ウィンドウ自体のドラッグ&ドロップに関しては、やはり必要な機能である。そのためタブタイトルバーをタブバーとして認識させることとした。

# CSSスニペットを追加

下記の場所にアクセスする。

設定→外観→CSSスニペット→📂マーク

このフォルダに`.css`のファイルを追加して、有効化することで見た目を調整できる。CSSスニペットは最初は難しいと思っていたが結構単純で、要素を指定して属性を追加するだけである。タブバーを透明化してタブタイトルバーにかぶせるように表示するというロジックを考える。`.css`のファイルに下記のように記載する。

```css
/* タブをタブタイトルバーの裏に透明表示する */
.mod-root .workspace-tabs .workspace-tab-header-container {
  width: 100%;
  height:var(--header-height)!important;
  opacity: 0;
  position: fixed;
}
/* 内部の要素を非表示 */
.mod-root .workspace-tabs .workspace-tab-header-container * {
  display: none;
}
```

`.mod-root.workspace-tabs.workspace-tab-header-container`でタブバーを指定して、サイズや位置、透明度などを設定する。このCSSスニペットを有効化すると、タブタイトルバーの余白でドラッグできるようになる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740229934091.webp)

だいぶスッキリした。問題点としては、透明なタブバーを被せているので、ボタンは押せるがタイトルの編集はできない。ただしこれは、インラインタイトルだったりデフォルト`F2`のホットキーだったり、Templaterのコマンドで対応可能だ。

# Commanderの導入

どうせタブタイトルバーを表示するなら、そちらにリボンの機能を移行してしまう。コミュニティプラグインのCommanderはタブタイトルバーにコマンドを追加することができる。リボンを非表示にする。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740230327186.webp)

取り敢えず登録おすすめはコマンダー自体の設定画面を開くボタンと、｢スタックタブをトグル｣のボタンだ。他にステータスバーの非表示や、複数のコマンドを同時実行するマクロを組むことができる。

よく見るとここで新たな問題が発生している。OSのウィンドウのボタン(閉じるボタンや最大化ボタン)と干渉している。CSSスニペットに下記の様に追加する。

```css
/*タブタイトルバーに余白*/
.is-focused .workspace-leaf.mod-active .view-header, .view-header{
  padding-left: 75px;
}
/*スタックタブを下に移動*/
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner {
  padding-top: 40px;
}
/*スタックタブのアイコンを非表示*/
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner-icon {
  display: none;
}
```

表示をずらしているだけ。ともあれこれで干渉は回避された。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740230646233.webp)

随分すっきりした。あと気になる部分は、スタックタブの幅が広いことと、タブタイトルバーにタイトルが表示されている点だ(スタックタブにも表示されているので不要な上にタブとしての機能も使いにくくなる)。こういう一般的なありそうな問題に対してはコミュニティテーマ+Style Settingsで対応できることが多い。

# Style Settingsを使う

コミュニティプラグインのStyle Settingsはテーマやプラグインの見た目を調整するためのプラグインだ。見た目の調整までやる気のあるプラグインは対応している。

とりあえず例えばということでテーマMinimalをインストールして、Style Settingsをインストールする。Style Settings対応のテーマやコミュニティプラグインをインストールするとStyle Settingsの設定画面に、設定項目が追加される。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740231376715.webp)

設定で上記問題を解決できる。設定した項目はJSONでエクスポートしたり、インポートすることができる。

```json
{
  "minimal-style@@tab-stacked-header-width": 20,
  "minimal-style@@file-header-visibility": "minimal-tab-title-hidden"
}
```

# 最終形

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740232016858.webp)

めちゃくちゃスッキリした。｢スタックタブをトグル｣のボタンを押すと、

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%F0%9F%93%98Obsidian%E3%81%AE%E3%82%B9%E3%82%BF%E3%83%83%E3%82%AF%E3%82%BF%E3%83%95%E3%82%99%E3%82%92%E4%BD%BF%E3%81%84%E3%81%93%E3%81%AA%E3%81%97%E3%81%9F%E3%81%84-1740232094211.webp)

集中モード的に使える。

# おわりに

だいぶいいんじゃないでしょうか。
しばらくこれをベースに使ってみることとします。
