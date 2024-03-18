---
date: 2024-03-18
updated: 2024-03-18
aliases:
  - 📘Templaterでoutlinerを強化
tags:
  - note/article
  - outliner
  - templater
title: 📘Templaterでoutlinerを強化
---

# はじめに

今日も昨日に引き続き Templater の記事

>[!seealso]+ seealso
> [[アウトラインで英文を書く|📘アウトラインで英文を書く]]

Outliner がとても便利なので、Templater で強化するスクリプトを書いてみた
今回はサクッと既知の項目の組み合わせでできる範囲内で

# Fold the list

特定のインデントを一気に折りたたむ

```js
const lines = tp.file.content.split(`\n`);
const text = await tp.system.suggester(
["Indent Level of 0", "Indent Level of 1", "Indent Level of 2", "Indent Level of 3"],
["- ", "\t- ", "\t\t- ", "\t\t\t- "]
);
if (!text) {
	return;
}
lines.forEach((line, index) => {
	if (line.startsWith(text)){
		app.workspace.activeLeaf.view.editor.setCursor(index, 0);
		app.commands.executeCommandById(`editor:fold-more`);
	}
});
```

例えば下記のバレットリストがあるノートでスクリプトを起動

- PPAP
	- A メロ
		- ペンを持っている
			- I have a pen.
		- リンゴを持っている
			- I have an apple.
		- リンゴペン！
			- Apple pen!
		- ペンを持っている
			- I have a pen.
		- パイナップルを持っている
			- I have a pineapple.
		- パイナップルペン！
			- Pineapple pen!
	- サビ
		- リンゴペン...パイナップルペン...
			- Apple pen... pineapple pen...
		- ペンパイナップルアップルペン！
			- Pen-Pineapple-Apple-Pen!
				- 繋げただけ
	- 締め
		- ペンパイナップルアップルペン
			- Pen-Pineapple-Apple-Pen!
				- 繋げただけ
- PPAP(２回目)
	- A メロ
		- ペンを持っている
			- I have a pen.
		- リンゴを持っている
			- I have an apple.
		- リンゴペン！
			- Apple pen!
		- ペンを持っている
			- I have a pen.
		- パイナップルを持っている
			- I have a pineapple.
		- パイナップルペン！
			- Pineapple pen!
	- サビ
		- リンゴペン...パイナップルペン...
			- Apple pen... pineapple pen...
		- ペンパイナップルアップルペン！
			- Pen-Pineapple-Apple-Pen!
				- 繋げただけ
	- 締め
		- ペンパイナップルアップルペン
			- Pen-Pineapple-Apple-Pen!
				- 繋げただけ

suggester が起動↓↓
![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-03-18%2020.29.59.png)

Indent Level of 2 を選択すると↓↓
![|400](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-03-18%2020.30.48.png)

２回インデントされたところだけ一気に畳まれる

# Unfold the list

全てのバレットリストを展開する

```js
const lines = tp.file.content.split(`\n`);
lines.forEach((line, index) => {
	app.workspace.activeLeaf.view.editor.setCursor(index, 0);
	app.commands.executeCommandById(`obsidian-outliner:unfold`);
});
```

これは全ての行で outliner の `unfold the list` コマンドを実行する脳筋スクリプト
畳まれたバレットリストが全て一気に展開される

これ書いてから思ったけど普通にコマンドパレットに `すべての見出しとリストのフォールドを解除` っていう項目があった
全ての行に同じ処理をするテンプレートにはなりそう

# おわりに

改行で分割してリスト化→繰り返し処理という構造はかなり自由度高い
`app.workspace.activeLeaf.view.editor` でノートを直接操作できるのも良い感じ
`app.commands.executeCommandById` からコマンドパレットを実行するのも便利

今回は最近仕入れた知識を組み合わせた集合体みたいなスクリプトで、新規で調査する必要はなかった
条件を少しいじれば header の fold もできるし、on/off のボタンを作ることも可能である
もし必要性を感じたら今日のスクリプトをベースに作ってみよう

ちょっと Obsidian ガチ勢に片足突っ込んでいるかもしれない
