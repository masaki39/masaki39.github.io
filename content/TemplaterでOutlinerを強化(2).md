---
date: 2024-04-24
updated: 2024-04-24
aliases:
  - 📘TemplaterでOutlinerを強化(2)
tags:
  - note/article
title: 📘TemplaterでOutlinerを強化(2)
ogp:
---

# はじめに 

Outliner プラグインの上下入れ替えコマンド、便利なんですがリスト以外の行でも入れ替えしたい
Templater でサクッと作成

# スクリプト

上に移動

```js
editor = app.workspace.activeLeaf.view.editor;
cursor = editor.getCursor();
line = editor.getLine(cursor.line);
if (line.trim().startsWith(`- `)){
	app.commands.executeCommandById("obsidian-outliner:move-list-item-up");
} else {
	editor.exec("swapLineUp");
}
```

下に移動

```js
editor = app.workspace.activeLeaf.view.editor;
cursor = editor.getCursor();
line = editor.getLine(cursor.line);
if (line.trim().startsWith(`- `)){
	app.commands.executeCommandById("obsidian-outliner:move-list-item-down");
} else {
	editor.exec("swapLineDown");
}
```

# おわりに

これ簡単だけど便利だから、[Outline Converter](https://github.com/masaki39/outline-converter) に実装しようかな
でも Outliner プラグインがあるときだけコマンド追加みたいな
