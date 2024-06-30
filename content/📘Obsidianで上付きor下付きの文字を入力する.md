---
date: 2024-06-30
updated: 2024-06-30
aliases: []
tags:
  - note/article
ogp: https://picsum.photos/seed/obsupsub/1200/675
---

# はじめに

Obsidian で文字を入力する際に上付きもしくは下付きの文字を入力する必要が生じたのでやり方を調べてみた。上付きの文字は x<sup>2</sup>、下付きの文字は x<sub>2</sub>みたいな文字のこと。

# 書き方

HTML のタグを使う。具体的には

```html
x<sup>2</sup>
```

と書いたら上付きの文字になるし、

```html
x<sub>2</sub>
```

と書いたら下付きの文字になる。簡単。

ただ、**めんどくさい**

# コミュニティプラグインを検索

[SupSub](https://github.com/wjgoarxiv/obsidian-supsub) というプラグインを発見。

![|600](https://github.com/wjgoarxiv/obsidian-supsub/blob/master/testmovie.gif?raw=true)

ホットキーで切り替えができるようだ。これは Templater で十分可能な内容だ。

# Templater に流用

main.ts からコードを拝借した。選択範囲を正規表現で抽出して置換するだけのよう。

```js
function wrapSelection(tag, editor) {
    const selection = editor.getSelection();
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
    const matches = regex.exec(selection);
    if (matches) {
        const debracketedSelection = matches[1];
        editor.replaceSelection(debracketedSelection);
    } else {
        const wrappedSelection = `<${tag}>${selection}</${tag}>`;
        editor.replaceSelection(wrappedSelection);
    }
}

editor = app.workspace.activeLeaf.view.editor;
wrapSelection('sup', editor);
```

これは上付きの場合のコード。下付きの場合は sup→sub に変更する。

# ホットキーに登録する

Claude3.5 に聞いてみたところ、一般的なエディターの場合は

- 上付き文字:
    - Ctrl + Shift + +（プラス記号）
    - Command + Shift + +（Mac）
- 下付き文字:
    - Ctrl + =（イコール記号）
    - Command + =（Mac）

らしいのでこのボタンを登録しておく。

# Pandoc でワードに出力可能にする

私は Pandoc をよく使用するので、ワード出力も可能にしたいが HTML のタグは読み取ってくれない。ただ、Pandoc には Pandoc で上付きや下付きの記法があるようなので、HTML タグを Pandoc の形式に変換すすれば良い。Pandoc の Documents には、

```
H~2~O is a liquid.  2^10^ is 1024.
```

と書いてあるので、subscript は~で、superscript は^で囲えば良いようだ。ググると Lua Filter で解決する記事を発見した。

[Markdown中の下付き文字をPandocでWord/LaTeX出力する際にLuaフィルターで処理してみる #Markdown - Qiita](https://qiita.com/yi_chemist/items/c4f5f8cc32e5b802a091#fn-pandoc-options)

Lua Filter は.lua で終わるコードが書かれたテキストファイルを作成して、Pandoc の実行コマンドに

```
--lua-filter=ファイルパス.lua
```

と追記すれば良い。Obsidian の Pandoc プラグインに適応する場合は設定の Extra Pandoc arguments の欄に書いておけば実行の度に適応される。

## 上付き文字の Lua filter

```lua
function Inlines(inlines)
    local start = 1
    while start < #inlines do
        if (inlines[start].text == '<sup>') then
            local len = 1
            while (start + len <= #inlines) do
                if (inlines[start + len].text == '</sup>') then
                    local inner = {
                        table.unpack(inlines, start + 1, start + len)
                    }
                    for j = 1, len do inlines:remove(start) end
                    inlines:insert(start, pandoc.Superscript(inner))
                    break
                end
                len = len + 1
            end
        end
        start = start + 1
    end
    return inlines
end
```

## 下付き文字の Lua filter

```lua
function Inlines(inlines)
    local start = 1
    while start < #inlines do
        if (inlines[start].text == '<sub>') then
            local len = 1
            while (start + len <= #inlines) do
                if (inlines[start + len].text == '</sub>') then
                    local inner = {
                        table.unpack(inlines, start + 1, start + len)
                    }
                    for j = 1, len do inlines:remove(start) end
                    inlines:insert(start, pandoc.Subscript(inner))
                    break
                end
                len = len + 1
            end
        end
        start = start + 1
    end
    return inlines
end
```

# おわりに

上付き文字、下付き文字が Obsidian 内で便利に使用でき、かつ出力できるようになった。Lua filterに関してもそのうち書きたい。