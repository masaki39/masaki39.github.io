---
date: 2024-03-11
updated: 2024-03-11
aliases:
  - 📘Templaterでブックマークメニューを作成
tags:
  - note/article
title: 📘Templaterでブックマークメニューを作成
---

# はじめに

Templater で新たな自動化スクリプトを作りたくて検索していたら、とあるページが目にとまった

[Obsidianにコマンドメニューを作る方法 - Jazzと読書の日々](https://wineroses.hatenablog.com/entry/2023/02/21/125347)

このブログ、Dataview や Templater の検索すると頻繁にヒットするのだが、筆者様はかなり JavaScript に精通されていて難しめのスクリプトが多いので、いつもはスルーしていた (すみません)

ただ今回のページ簡単なスクリプトだけどなんか有用そうだぞ？という謎センサーが働いた
Dataview で command ID を取得して Templater で実行する...なるほど
ブログの方はリンク切れしていたが検索すると以下のページを見つけた

[DataviewJS Snippet Showcase - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847/37)

Dataviewjs で下記のコードブロックを書くと Obsidian の全てのコマンドパレットの command ID を取得できるとのこと
これは...凄いんじゃないか？

# Dataview で command ID を取得する

↓まずはデフォルトでホットキーが割り当てられたコマンド＆新規でホットキーを割り当てたコマンド一覧を Dataview で表示させる

```js
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function hilite(keys, how) {
    // need to check if existing key combo is overridden by undefining it
    if (keys && keys[1][0] !== undefined) {
        return how + keys.flat(2).join('+').replace('Mod', 'Ctrl') + how;
    } else {
        return how + '–' + how;
    }
}

function getHotkey(arr, highlight=true) {
    let hi = highlight ? '**' : '';
    let defkeys = arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]] : undefined;
    let ck = app.hotkeyManager.customKeys[arr.id];
    var hotkeys = ck ? [[getNestedObject(ck, [0, 'modifiers'])], [getNestedObject(ck, [0, 'key'])]] : undefined;
    return hotkeys ? hilite(hotkeys, hi) : hilite(defkeys, '');
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .where(v => getHotkey(v[1]) != '–')
    .sort(v => v[1].id, 'asc')
    .sort(v => getHotkey(v[1], false), 'asc');

dv.paragraph(cmds.length + " commands with assigned hotkeys; " +
    "non-default hotkeys <strong>bolded</strong>.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
  cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
  );
```

![](https://forum.obsidian.md/uploads/default/original/3X/6/5/65d882b69e30e45e5715c3da75e95a7bb570f4b1.png)

↓全てのコマンド一覧

```js
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function hilite(keys, how) {
    // need to check if existing key combo is overridden by undefining it
    if (keys && keys[1][0] !== undefined) {
        return how + keys.flat(2).join('+').replace('Mod', 'Ctrl') + how;
    } else {
        return how + '–' + how;
    }
}

function getHotkey(arr, highlight=true) {
    let hi = highlight ? '**' : '';
    let defkeys = arr.hotkeys ? [[getNestedObject(arr.hotkeys, [0, 'modifiers'])],
    [getNestedObject(arr.hotkeys, [0, 'key'])]] : undefined;
    let ck = app.hotkeyManager.customKeys[arr.id];
    var hotkeys = ck ? [[getNestedObject(ck, [0, 'modifiers'])], [getNestedObject(ck, [0, 'key'])]] : undefined;
    return hotkeys ? hilite(hotkeys, hi) : hilite(defkeys, '');
}

let cmds = dv.array(Object.entries(app.commands.commands))
    .sort(v => v[1].id, 'asc');

dv.paragraph(cmds.length + " commands currently enabled; " +
    "non-default hotkeys <strong>bolded</strong>.<br><br>");

dv.table(["Command ID", "Name in current locale", "Hotkeys"],
  cmds.map(v => [
    v[1].id,
    v[1].name,
    getHotkey(v[1]),
    ])
  );
```

![](https://forum.obsidian.md/uploads/default/original/3X/4/0/40344b9e24238d7dec2a65fbc1c1a7600f697012.png)

# Templater で実行する

```js
app.commands.executeCommandById("command ID")
```

Templater のスクリプト内で、このスクリプトの `command ID` に Dataview で抽出した ID を入力するだけで、そのコマンドが実行できる

元記事は要するに、このコードを Templater の標準機能である `tp.system.suggester` に突っ込んで選択式にしたという内容のようだ
自分でも書けるレベルだが、折角載っているので丸パクリする

```js
list = {
"表記名1" : "command ID1",
"表記名2" : "command ID2",
"表記名3" : "command ID3"
};
k = Object.keys(list);

x = await tp.system.suggester(k, k);
if(x) app.commands.executeCommandById(list[x]);
```

# ブックマークとして活用

色々活用はできそうだが、簡単な例を試してみる
URL を開くスクリプトを一覧にしてブックマークリストとしてみる

Web ブラウザで特定のページを開くスクリプトは凄くシンプル

```js
open ("URL")
```

このスクリプトを下記の手順で使えるようにしていく

1. Templater でコマンドパレットに登録
2. Dataview で command ID を確認
3. 先程のスクリプトに投入
4. Commander プラグインでボタン化

とりあえず Obsidian からよく行く Bluesky と pCloud のスクリプトを登録してみた
ボタンをクリックしてみると suggester が表示される

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-03-11%2021.09.24.png)

Bluesky をクリックすると...

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-03-11%2021.13.57.png)

完成！

# おわりに

Templater を利用してブックマークリストを作成したが、ブックマークリストくらいだったらあえて別々に登録して呼び出す必要はないかもしれない
本来ここにはコマンドパレットの全てが登録できるので、元記事の用に Command menu として使うこともできる
また、コマンドパレットを連続して起動するマクロのような使用もできるだろう (Commander にも同じ機能があるけど)
Templater が更に便利になりました
