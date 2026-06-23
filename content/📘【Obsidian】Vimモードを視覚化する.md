---
date: 2026-01-13
updated: 2026-01-13
aliases: []
tags:
  - note/publish
description: Obsidian VimモードにおけるNormal/Insertモードの視覚化を実現するため、アクティブな編集リーフの枠線色をCSSスニペットで変更し、モード切り替えを分かりやすくする方法。
---

# はじめに

ObsidianにはVimモードというのがある。Vimはちょっと難しそうで敬遠していたのだが、よく考えたらトラックパッド操作やGUI的操作と併用してもいいわけで、ずっとInsertモードで使用した場合は今までと同じような入力操作で使える。Normalモードにしたら無限に便利コマンドが使える。そう考えると導入するデメリットが殆どないことに気がついた。便利だと思う操作だけを取り入れていけば良いのではという発想に至った。

導入にあたり、差し障り問題になるのはモード切り替えである。慣れていないとモード迷子になりそう。ここを視覚的に訴えるようにCSSを当てることにする。

# CSSスニペット

 > [!quote] [[📘【Obsidian】アクティブファイルに枠線をつけるCSSスニペット]]

これを改変する。VimのInsertモードには`.cm-vimMode`がつくことを利用する。

```css
.workspace-leaf-content{
    box-sizing: border-box;
    border: 4px solid transparent;
}
.workspace-leaf.mod-active .workspace-leaf-content {
    border-color: var(--ax1);
}
.workspace-leaf.mod-active .workspace-leaf-content:has(.markdown-source-view):not(:has(.cm-vimMode)) {
    border-color: red;
}
```

# 結果どうなるか

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260113145420.webp)
↑Normalモード：アクティブなリーフに枠線がつく

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260113145454.webp)
↑Insertモード：枠線が赤になる

# おわりに

よさそう。Vimはエディターでやりたいことが大体できるっぽいので、徐々に手持ち技を増やしていきたい。
