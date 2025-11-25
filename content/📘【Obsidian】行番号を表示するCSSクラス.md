---
date: 2025-07-22
updated: 2025-07-22
aliases: []
tags:
  - note/publish
cssclasses:
  - line-number
description: Obsidianで行番号を必要な時だけ表示させるためのCSSスニペット設定方法と、ノートのプロパティに`line-number`クラスを追加して行番号を制御するテクニックを紹介。
---

# はじめに

Obsidianは設定で行番号を表示することができる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250722160930.webp)

これは便利ではあるけど、毎回必要な訳では無い。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250722161039.webp)

こんな感じで左側に表示されるが、左側のスペースを若干圧迫する。必要なときだけ表示するようにCSSクラスにしてみよう。

# CSSスニペットを登録

設定→外観→CSSスニペットからCSSスニペットを登録する。フォルダを開いて適当に`[class] line-number.css`という名前の拡張子のテキストファイルを作成する(名前は何でも良い)。中には下記のように記載する。

```css
.markdown-source-view.mod-cm6:not(.line-number) .cm-gutters-before {
    display: none !important;
}
```

`line-number`クラスがない場合は行番号を非表示にするよという意味。
次に、CSSスニペットに作成したファイルが追加されたので有効にする。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250722161449.webp)

# CSSクラスに登録する

ノートのプロパティに`line-number`を追加する

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250722161807.webp)

このクラスが記載されたノートだけに、行番号が表示されるようになる。

# おわりに

行番号、基本いらないけどたまにほしいというニッチな要望に答えることができた。
