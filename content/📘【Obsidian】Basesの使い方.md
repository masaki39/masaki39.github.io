---
date: 2025-08-19
updated: 2025-08-19
aliases: []
tags:
  - note/publish
description: ObsidianのコアプラグインBasesの使い方を解説し、Notionライクなデータベース構築、Table/Card表示、フィルター、プロパティ設定、Functions、Bases syntaxについて、Dataviewとの比較を交えながら紹介します。
---

# はじめに

本日、Obsidian 1.9.10でコアプラグインBasesが一般向けに公開された。公式サイトに則って現時点での使用方法をまとめておく。

> [!quote] β版のときの記事
> [[📘Obsidianの新機能｢Bases｣]]
> [[📘Basesでデイリーノートを抽出]]

# Basesとは

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819092015.webp)

既存のコミュニティプラグインDataviewに近い感覚だ。マークダウンファイルからプロパティを抽出しTableやCard表示する。Notion likeのデータベースを作成することができる。

# Baseの作り方

## baseファイルを作成する

**コマンドパレット：**

1. **コマンドパレット**を開く。
2. どちらかを選択
    - **Bases：Create new base**：アクティブファイルと同じフォルダーにbaseを作成する。
    - **Bases：Insert new base**：baseを作成し、現在のファイルに埋め込む。

**ファイルエクスプローラー：**

1. ファイルエクスプローラーで、baseを作成したいフォルダーを右クリック
2. **New base**を選択

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819093521.webp)

作成したbaseを開くとこのような見た目になる。

## ファイルに埋め込む場合

### baseファイルを埋め込む

`![[File.base]]`で他のファイルにbaseファイルを埋め込むことができる。デフォルトのビューを指定するには、`![[File.base#View]]`を使用する。

### baseをコードブロックとして埋め込む

`base`コードブロックとbases構文を使って、ノートに直接埋め込むこともできる。

````yaml
```base
filters:
  and:
    - file.hasTag("example")
views:
  - type: table
    name: Table
```
````

# Views

1つのbaseファイル内に複数のviewを作成することができる。

## Viewの追加

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819093736.webp)

左上からViewを追加できる。

## Table view

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819093702.webp)

table viewは行の高さだけ設定できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819101056.webp)

table viewでは表示したプロパティを直接編集することができる。

## Card view

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819094322.webp)

Card viewは画像のプロパティを指定してカード状の表示になる。指定できるプロパティの書き方は下記のとおりだ。

- ローカルファイルへのリンク `"[[link/to/attachment.jpg]]"`
- 外部リンク（URL）
- カラーコード（`#000000`）

その他アスペクト比や画像のfitのさせ方のオプションがある。

## Filters

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819094754.webp)

右上のFilterボタンからフィルターを書けることができる。baseファイルの全てのviewに適応するフィルターか、現在開いているviewのみに適応するフィルターか選ぶことができる。

種類は多種多様で、and/or/notに対応。組み合わせたFilter groupを作ることもできる。基本クリックと簡単な入力でできるようになっているが、`</>`を押して複雑なfunctionを直接記載することもできる。

> [!important] 
> `New`のボタンでフィルター条件に合致する新規ファイルを作成することができる！

## Properties

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819100704.webp)

チェックをいれることで表示させるプロパティを変更することができる。`Add formula`でプロパティの組み合わせやfunctionを使用した表示が可能。

先程のカードビューで使用したimageというformulaは下記の通りだ。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819100926.webp)

## Limit

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250819095153.webp)

表示数を制限したり、コピー、CSV出力ができる。

# Functions

フィルターやforumulaを作る際に活用する。正確には[Functions - Obsidian Help](https://help.obsidian.md/bases/functions)に記載がある。下記はClaude Codeにまとめてもらったものになる。おそらく今後も追加される。

> [!note]- Global Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `date()` | `date(date: string): date` | 文字列を解析してdateオブジェクトを返す | `date("2025-08-19")` |
> | `file()` | `file(path: string \| file \| url): file` | 指定されたファイルまたはパスのfileオブジェクトを返す | `file("path/to/file")` |
> | `if()` | `if(condition: any, trueResult: any, falseResult?: any): any` | 条件に基づいて結果を返す | `if(isModified, "Modified", "Unmodified")` |
> | `image()` | `image(path: string \| file \| url): image` | ビューに画像を表示するimageオブジェクトを返す | `image("image.jpg")` |
> | `icon()` | `icon(name: string): icon` | Lucideアイコンをレンダリングする値を返す | `icon("arrow-right")` |
> | `max()` | `max(value1: number, value2: number...): number` | 提供された数値の最大値を返す | `max(1, 5, 3)` |
> | `min()` | `min(value1: number, value2: number...): number` | 提供された数値の最小値を返す | `min(1, 5, 3)` |
> | `link()` | `link(path: string \| file, display?: value): Link` | 指定されたパスへのリンクオブジェクトを返す | `link("[[filename]]")` |
> | `list()` | `list(element: any): List` | 要素をリストでラップする | `list("value")` |
> | `now()` | `now(): date` | 現在の日時を表すdateオブジェクトを返す | `now()` |
> | `number()` | `number(input: any): number` | 値を数値として返す | `number("3.4")` |
> | `duration()` | `duration(value: string): duration` | 文字列を期間として解析する | `duration("1d")` |
> | `today()` | `today(): date` | 現在の日付（時刻は0）を返す | `today()` |

> [!note]- Any Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `toString()` | `any.toString(): string` | 任意の値の文字列表現を返す | `123.toString()` |
> | `isTruthy()` | `any.isTruthy(): boolean` | 値をブール値に変換する | `1.isTruthy()` |

> [!note]- Date Functions
> 
> ### Dateフィールド
>
> | フィールド | 型 | 説明 |
> |------------|-----|------|
> | `date.year` | number | 年 |
> | `date.month` | number | 月（1-12） |
> | `date.day` | number | 日 |
> | `date.hour` | number | 時間（0-23） |
> | `date.minute` | number | 分（0-59） |
> | `date.second` | number | 秒（0-59） |
> | `date.millisecond` | number | ミリ秒（0-999） |
>
> ### Date関数
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `date()` | `date.date(): date` | 時刻を除いたdateオブジェクトを返す | `now().date()` |
> | `format()` | `date.format(format: string): string` | Moment.js形式でフォーマットした日付を返す | `date.format("YYYY-MM-DD")` |
> | `time()` | `date.time(): string` | 時刻を返す | `now().time()` |
> | `relative()` | `date.relative(): string` | 現在時刻との相対的な表現を返す | `file.mtime.relative()` |
> | `isEmpty()` | `date.isEmpty(): boolean` | 常にfalseを返す | `date.isEmpty()` |

> [!note]- String Functions
> 
> ### Stringフィールド
>
> | フィールド | 型 | 説明 |
> |------------|-----|------|
> | `string.length` | number | 文字列の文字数 |
>
> ### String関数
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `contains()` | `string.contains(value: string): boolean` | 文字列が指定された値を含むかチェック | `"hello".contains("ell")` |
> | `containsAll()` | `string.containsAll(...values: string): boolean` | 文字列がすべての値を含むかチェック | `"hello".containsAll("h", "e")` |
> | `containsAny()` | `string.containsAny(...values: string): boolean` | 文字列がいずれかの値を含むかチェック | `"hello".containsAny("x", "y", "e")` |
> | `endsWith()` | `string.endsWith(query: string): boolean` | 文字列が指定された文字列で終わるかチェック | `"hello".endsWith("lo")` |
> | `isEmpty()` | `string.isEmpty(): boolean` | 文字列が空かチェック | `"".isEmpty()` |
> | `replace()` | `string.replace(pattern: string \| Regexp, replacement: string): string` | パターンを置換する | `"a,b,c,d".replace(/,/g, "-")` |
> | `lower()` | `string.lower(): string` | 小文字に変換 | `"HELLO".lower()` |
> | `reverse()` | `string.reverse(): string` | 文字列を逆順にする | `"hello".reverse()` |
> | `slice()` | `string.slice(start: number, end?: number): string` | 部分文字列を取得 | `"hello".slice(1, 4)` |
> | `split()` | `string.split(separator: string \| Regexp, n?: number): list` | 文字列を分割してリストにする | `"a,b,c,d".split(",", 3)` |
> | `startsWith()` | `string.startsWith(query: string): boolean` | 文字列が指定された文字列で始まるかチェック | `"hello".startsWith("he")` |
> | `title()` | `string.title(): string` | タイトルケースに変換 | `"hello world".title()` |
> | `trim()` | `string.trim(): string` | 両端の空白を削除 | `" hi ".trim()` |

> [!note]- Number Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `abs()` | `number.abs(): number` | 絶対値を返す | `(-5).abs()` |
> | `ceil()` | `number.ceil(): number` | 切り上げる | `(2.1).ceil()` |
> | `floor()` | `number.floor(): number` | 切り下げる | `(2.9).floor()` |
> | `round()` | `number.round(digits?: number): number` | 四捨五入する | `(2.5).round()` |
> | `toFixed()` | `number.toFixed(precision: number): string` | 固定小数点表記で文字列として返す | `(3.14159).toFixed(2)` |
> | `isEmpty()` | `number.isEmpty(): boolean` | 数値が存在しないかチェック | `5.isEmpty()` |

> [!note]- List Functions
> 
> ### Listフィールド
>
> | フィールド | 型 | 説明 |
> |------------|-----|------|
> | `list.length` | number | リストの要素数 |
>
> ### List関数
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `contains()` | `list.contains(value: any): boolean` | リストが指定された値を含むかチェック | `[1,2,3].contains(2)` |
> | `containsAll()` | `list.containsAll(...values: any): boolean` | リストがすべての値を含むかチェック | `[1,2,3].containsAll(2,3)` |
> | `containsAny()` | `list.containsAny(...values: any): boolean` | リストがいずれかの値を含むかチェック | `[1,2,3].containsAny(3,4)` |
> | `isEmpty()` | `list.isEmpty(): boolean` | リストが空かチェック | `[].isEmpty()` |
> | `join()` | `list.join(separator: string): string` | リストの要素を文字列として結合 | `[1,2,3].join(",")` |
> | `reverse()` | `list.reverse(): list` | リストを逆順にする | `[1,2,3].reverse()` |
> | `sort()` | `list.sort(): list` | リストをソートする | `[3,1,2].sort()` |
> | `flat()` | `list.flat(): list` | ネストしたリストを平坦化する | `[1,[2,3]].flat()` |
> | `unique()` | `list.unique(): list` | 重複要素を削除 | `[1,2,2,3].unique()` |
> | `slice()` | `list.slice(start: number, end?: number): list` | リストの一部を取得 | `[1,2,3,4].slice(1,3)` |
> | `map()` | `list.map(value: Any): list` | 各要素を変換した新しいリストを作成 | `[1,2,3,4].map(value + 1)` |
> | `filter()` | `list.filter(value: Boolean): list` | 条件に合致する要素のみのリストを作成 | `[1,2,3,4].filter(value > 2)` |

> [!note]- Link Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `linksTo()` | `link.linksTo(file): boolean` | リンクが指定されたファイルにリンクしているかチェック | `link.linksTo(file)` |
> | `asFile()` | `link.asFile(): file` | リンクが有効なローカルファイルの場合、fileオブジェクトを返す | `link("[[filename]]").asFile()` |

> [!note]- File Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `asLink()` | `file.asLink(display?: string): Link` | ファイルのリンクオブジェクトを返す | `file.asLink()` |
> | `hasLink()` | `file.hasLink(otherFile: file \| string): boolean` | ファイルが他のファイルにリンクしているかチェック | `file.hasLink(otherFile)` |
> | `hasProperty()` | `file.hasProperty(name: string): boolean` | ファイルが指定されたプロパティを持つかチェック | `file.hasProperty("tags")` |
> | `hasTag()` | `file.hasTag(...values: string): boolean` | ファイルが指定されたタグを持つかチェック | `file.hasTag("tag1", "tag2")` |
> | `inFolder()` | `file.inFolder(folder: string): boolean` | ファイルが指定されたフォルダーにあるかチェック | `file.inFolder("notes")` |

> [!note]- Object Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `isEmpty()` | `object.isEmpty(): boolean` | オブジェクトが空かチェック | `{}.isEmpty()` |
> | `keys()` | `object.keys(): list` | オブジェクトのキーのリストを返す | `object.keys()` |
> | `values()` | `object.values(): list` | オブジェクトの値のリストを返す | `object.values()` |

> [!note]- Regular Expression Functions
>
> | 関数名 | 構文 | 説明 | 例 |
> |--------|------|------|-----|
> | `matches()` | `regexp.matches(value: string): boolean` | 正規表現が文字列にマッチするかチェック | `/abc/.matches("abcde")` |

## Bases syntax

baseの中身はYAML形式のテキストとなっているので直接編集することも可能だ。[Bases syntax - Obsidian Help](https://help.obsidian.md/bases/syntax)に構文のルールが記載してある。

ただ、基本的には構文を知らなくてもクリックと簡単な入力で動かすことができるようになっている。構文を知らないといけない時は、複雑なフィルターやプロパティの組み合わせを作りたい場合に限るだろう。もしくは構文ルールをLLMに読ませて書かせることもできるかもしれない。

# おわりに

Basesの登場により、ObsidianでもNotionライクなデータベース機能が使えるようになった。これまでDataviewプラグインでやっていたことが、よりシンプルかつ直感的に操作できるのは大きな魅力だ。

特に`New`ボタンでフィルター条件に合致するファイルを瞬時に作成できる機能は、ノート管理のワークフローを大きく変える可能性がある。

Functionの数も今後増えていくだろうし、コミュニティプラグインとの連携も期待したい。BasesはObsidianの１つの転換点だろう。
