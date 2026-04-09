---
date: 2025-02-10
updated: 2025-03-11
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-10%2023.16.18%20-%20A%20wide%20Open%20Graph%20Protocol%20(OGP)%20image%20with%20the%20title%20'%F0%9F%93%98Templater%E3%81%A6%E3%82%99QuickAdd%E3%81%99%E3%82%8B'.%20The%20design%20is%20clean%20and%20modern%2C%20featuring%20a%20blue-themed%20background%20wit.webp
---

# はじめに

QuickAddを使いたくなってきた。特にCapture機能。
しかし、Templater信者なのでまずはTemplaterで試してみる。
QuickAddでできてTemplaterにできないことはない(盲信)。

# 一例目：デイリーノートにタスクを追加する

## 全体のコード

```js
const task = await tp.system.prompt("タスクを入力してください", null, true, false);
if (!task || task.trim() === "") { return; }
const today = moment().format("YYYY-MM-DD");
let file = tp.file.find_tfile(today);
if (!file) {
	tp.file.create_new(`- [ ] ${task}`, today, false, "DailyNotes");
} else{
	const content = await app.vault.read(file);
	await app.vault.modify(file, `- [ ] ${task}\n${content}`);
}
```

デイリーノートの最上段にタスクを追加する。
各行解説する。

## 入力部分

```js
const task = await tp.system.prompt("タスクを入力してください", null, true, false);
if (!task || task.trim() === "") { return; }
```

`tp.system.prompt`は4変数で

1. メッセージ
2. デフォルト値
3. 入力しなかったときにキャンセルするか
4. 入力ボックスをマルチラインにするか

2行目でnullやスペースが返ったときに中断

## Tfileをみつける

```js
const today = moment().format("YYYY-MM-DD");
let file = tp.file.find_tfile(today);
```

一行目で今日のデイリーノート名を取得する。
`tp.file.find_tfile`はファイル名からTfileを探してきてくれる。
Tfileを取得できるとファイルの直接編集ができる。

## デイリーノートがなければ新規作成

```js
if (!file) {
	tp.file.create_new(`- [ ] ${task}`, today, false, "DailyNotes");
} 
```

`tp.file.create_new`は4変数で

1. 本文の内容 or テンプレートになるTfile
2. ファイル名
3. 作ったあとに開くかどうか
4. どのフォルダに作るか

## デイリーノートがあれば編集

```js
else{
	const content = await app.vault.read(file);
	await app.vault.modify(file, `- [ ] ${task}\n${content}`);
}
```

`app.vault.read`はTfileの本文を取得する。取得だけならcachを取得するコマンドのほうが軽いが、編集する場合はこっちじゃないとだめとDeveloperページに書いてある。

`app.vault.modify`で内容を編集して、入力したタスクを冒頭に追加する。

# 二例目：特定のノートの特定の部分に追加

ToDoという名称のファイルにタスクを羅列しているという仮定とする。

- Inbox
	- タスク１
	- タスク２

## 全体のコード

```js
const task = await tp.system.prompt("タスクを入力してください", null, true, false);
if (!task || task.trim() === "") { return; }

let file = tp.file.find_tfile("ToDo");
if ( !file ) { return; }

const content = await app.vault.read(file);
if (!content.includes("- Inbox")) { return; }

const updatedContent = content.replace("- Inbox", `- Inbox\n\t- ${task}`); 
await app.vault.modify(file, updatedContent);
```

最後の所以外はほぼ流用できている。
ノートの内容をincludeでチェックし、replaceで置換しているだけ。

# まとめ

1. `tp.file.find_tfile`でTfileを取得
2. `app.vault.read`で本文を取得→好きなだけ編集する
3. `app.vault.modify`で編集した本文を返す

# おわりに

QuickAddでいいじゃんと思うかもしれないが、`\t`とか特殊文字は対応してないし、今後の拡張性を考慮するとやはりTemplaterがベターに思える。
