---
date: 2024-04-01
updated: 2024-04-01
aliases:
  - 📘Templaterの結果を特定のセクションに出力
tags:
  - note/publish
title: 📘Templaterの結果を特定のセクションに出力
---
# はじめに

2週間前からアウトラインで文章を書くという方法を行っている

> [!note] seealso
> [[アウトラインで英文を書く|📘アウトラインで英文を書く]]

この方法はOutlinerプラグインを併用するとかなり便利であることが分かった


- はじめに
	- 概要
		- 例えばこのような文章を書くとする。
		- アウトラインで書くと、一文ずつ要素として認識できる。
		- さらに下層に英語をいれてみたり、備考をいれてみたりできる。
			- 補足説明をいれたり
		- Outlinerプラグインで順番を入れ替えたりもできる。

このようなアウトラインに前記事のスクリプトを使うと

> [!example]　このように出力される
> 
> はじめに
> 
> 例えばこのような文章を書くとする。 アウトラインで書くと、一文ずつ要素として認識できる。 さらに下層に英語をいれてみたり、備考をいれてみたりできる。 Outlinerプラグインで順番を入れ替えたりもできる。 

今回は、この出力を特定のセクションに行えないかと考えた

理由はBetter Word Countプラグインに｢Display Section Word Count｣という設定項目があり、セクションの文字を自動で数えることができるからだ

例↓↓
![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-04-01%2022.53.16.png)

Outputセクションを探して`replaceRange`で結果を出力するスクリプトを作成する

# スクリプト

```js
// 以下`# Output`セクションに結果を出力するコード
let startLine = null;
let endLine = null;
let endCh = null;

for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim(); // 前後の空白を取り除いて判定する
    if (line === `# Output`) { // 開始行
        startLine = index + 1 ;
    } else if (line.startsWith(`# `) && startLine !== null && endLine === null) { //　終了行
        endLine = index - 1;
        endCh = lines[endLine].length;
        break; 
    }
}

// endLineが見つからなかった場合は最後の行を終了行にする
if (startLine !== null && endLine === null) {
    endLine = lines.length - 1; //　インデックス調整
    endCh = lines[endLine].length;
}

if (startLine !== null && endLine !== null) {
    app.workspace.activeLeaf.view.editor.replaceRange(finalResult, {line: startLine, ch: 0}, {line: endLine, ch: endCh});
    app.workspace.activeLeaf.view.editor.setCursor(startLine, 0) // カーソルを出力部に移動
}
```

`editor.replaceRange`は結果と開始位置、終了位置を指定すると、結果を指定した範囲を更新する形で出力する

1. 各行チェックして、`#Output`セクションを探して、次の`# `までを範囲に指定する
2. 次の`# `がなければ最終行を終了位置に指定する
3. 取得した範囲に結果(`finalResult`)を出力する

これを前回のスクリプトと合体！！

```js
// 本文を行ごとのリストにする
const lines = tp.file.content.split('\n');

// 各行を変換する
let result = [];
lines.forEach(line => {
	if (line.startsWith(`- `)){
	    result.push(`\n\n${line.trim().slice(2)}`); // trimで空白を消して前の２文字`- `を消す
	} else if (line.startsWith(`\t- `)){
		result.push(`\n\n`);
	} else if (line.startsWith(`\t\t- `)) {
		result.push(`${line.trim().slice(2)} `);
	}
});
const finalResult = result.join('').slice(1);
navigator.clipboard.writeText(finalResult) //クリップボードにコピー

// 以下`# Output`セクションに結果を出力するコード
let startLine = null;
let endLine = null;
let endCh = null;

for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim(); // 前後の空白を取り除いて判定する
    if (line === `# Output`) { // 開始行
        startLine = index + 1 ;
    } else if (line.startsWith(`# `) && startLine !== null && endLine === null) { //　終了行
        endLine = index - 1;
        endCh = lines[endLine].length;
        break; 
    }
}

// endLineが見つからなかった場合は最後の行を終了行にする
if (startLine !== null && endLine === null) {
    endLine = lines.length - 1; //　インデックス調整
    endCh = lines[endLine].length;
}

if (startLine !== null && endLine !== null) {
    app.workspace.activeLeaf.view.editor.replaceRange(finalResult, {line: startLine, ch: 0}, {line: endLine, ch: endCh});
    app.workspace.activeLeaf.view.editor.setCursor(startLine, 0) // カーソルを出力部に移動
}
```

結果を`# Outputセクション`に出力することができるようになった
セクションがなくてもクリップボードにコピーはされる
完成した

最後に
このページでこのスクリプトを使ってみる
# Output

はじめに

例えばこのような文章を書くとする。 アウトラインで書くと、一文ずつ要素として認識できる。 さらに下層に英語をいれてみたり、備考をいれてみたりできる。 Outlinerプラグインで順番を入れ替えたりもできる。 

# おわりに

このサイトでは表示されないが、Obsidian上では文字数が表示される
アウトラインを追記して、スクリプトを実行するとセクションが更新される
すぐにアウトライン式の文章を出力して文字数を確認したりコピペできるようになった

この各行チェックするやり方はかなり万能感があっておすすめできる方法だと思う