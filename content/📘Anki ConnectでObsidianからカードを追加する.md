---
date: 2025-06-12
updated: 2025-06-12
aliases: []
tags:
  - note/publish
description: ObsidianからAnki Connect経由で、Ankiに英単語カードを効率的に追加する方法（API連携、自動翻訳Gemini活用）について解説します。
---

# はじめに

英単語を覚えるのにAnkiを使っている。単語の暗記には便利な一方で、単語を追加するのが結構面倒くさい。Obsidianからプラグイン経由で追加するようにしてみる。

# Anki Connectを導入

> [!quote] [\~foosoft/anki-connect - Anki plugin to expose a remote API for creating flash cards - sourcehut git](https://git.sr.ht/~foosoft/anki-connect)

Anki Connectはデスクトップ版のAnkiアプリにAPI経由でアクセスできるようになる神アドオン。Export to Ankiなどの既存のプラグインもこれを利用している。これをAnkiアプリの設定画面にインストールする。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-12T12-08-39-535Z.webp)

このとき、上記の様に`app://obsidian.md`を追加しておかないとObsidianからのアクセスが拒否されるので追記する。

# 実装する

Document通りに実装する。invokeというfunctionを定義さえしておけば、あとはDocumentに記載のアクションが使いたい放題となる。

```js
function invoke(action, version, params={}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to issue request'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (Object.getOwnPropertyNames(response).length != 2) {
                    throw 'response has an unexpected number of fields';
                }
                if (!response.hasOwnProperty('error')) {
                    throw 'response is missing required error field';
                }
                if (!response.hasOwnProperty('result')) {
                    throw 'response is missing required result field';
                }
                if (response.error) {
                    throw response.error;
                }
                resolve(response.result);
            } catch (e) {
                reject(e);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
    });
}
```

invokeにアクション名とバージョン(現在は基本的に6)、あとは必要なパラメータを渡せば機能する仕組みだ。

例えばノートを追加する場合は

```js
function addNote(front: string, back: string) {
        return this.invoke("addNote", 6, {
            "note": {
                "deckName": "Default",
                "modelName": "基本",
                "fields": {
                    "表面": front,
                    "裏面": back
                },
                "options": {
                    "allowDuplicate": false
                }
            }
        });
    }
```

みたいな感じ。デッキ名やモデル名、fields名とかは正確に入力しないといけない。Documentは英語で書いてあるが、アプリを日本語化している場合は日本語に直さないといけない(1敗)。`alloDuplicate`は重複を許すかどうかで、基本falseでよさそう。

あとは無限にありそうなアクションをどう使うか。今回はシンプルにカードを追加したいだけなので、これだけを使うことにする。

# 使用例

詳細な実装は省略。すでに作ってあるプロンプトボックスやGeminiとの統合をしてみた。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-12T12-18-08-935Z.webp)

コマンドを2種類作った。Geminiの方はたとえば、

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-12T12-20-46-346Z.webp)

英単語を表面に打ち込む。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-12T12-21-05-782Z.webp)

次に裏面が表示されて、自動でGeminiが生成した日本語訳が表示される。ここでEnterを押すとAnkiに登録される。Geminiじゃない方はGeminiの自動翻訳が出ないだけでほぼ同じ動きをする。

# おわりに

Anki Connect、Documentが充実していてかつかなり簡便に使えるように工夫されている。Geminiを噛ませることで色々な使い方が考えられそう。このくらいの単純作業はgemini-2.0-flashで十分なので1日1500回は無料。素晴らしい。
