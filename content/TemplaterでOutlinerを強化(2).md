---
date: 2024-04-24
updated: 2024-04-24
aliases:
  - 📘TemplaterでOutlinerを強化(2)
tags:
  - note/article
title: 📘TemplaterでOutlinerを強化(2)
ogp: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202024-05-11%2019.09.25%20-%20A%20digital%20workspace%20enhanced%20by%20templater%20software%20for%20outliners%2C%20featuring%20a%20large%20computer%20monitor%20at%20the%20center%20displaying%20a%20complex%20outline%20projec.webp
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
