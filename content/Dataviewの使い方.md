---
date: 2023-12-12
updated: 2024-05-28
aliases:
  - 📘Dataviewの使い方
tags:
  - dataview
  - note/article
  - obsidian
  - obsidian/plugin
cssclasses: 
title: 📘Dataviewの使い方
---

# はじめに

dataview は Obsidian のコミュニティプラグインの人気プラグインの 1 つである
ノートから様々な情報を抽出することが出来る
他のプラグインの前提になっていることも多い
使いこなせると Obsidian の使用用途がぐっと広がるが、日本語でまとめているページが殆どないので、使用法を記録しておく

# Example Usage

機能が多すぎるのでテンプレ運用を推奨
以下は一例である

## タスクテンプレ

```
task
from "デイリーノートのフォルダ"
where !completed
```

未完了のタスクを抽出する
デイリーノートにこれを入れておくとリマインダーとして機能して便利

## 表テンプレ

```
table without ID
authors[0] as "First Author", journal, year, tags, comment,
"[Go To Note]("+file.name+".md)" as note, zotero, doi
from outgoing([[]])
sort tags asc, year desc
```

これは私が現在使用している文献管理用のテンプレ
文献管理については別記事にて解説→[[Zotero×Obsidian 文献管理のすゝめ]]
First Author の抽出についても別記事にて解説→[[Templaterでフロントマターを書き換える]]
tags でなんとなく分類して、comment に一言コメントを追加するようにしている

# 抽出できる項目

## ノートに記載した項目

1. フロントマターに記載したメタデータ
2. タグ
3. タスク
4. inline field

inline field とは

```
key:: 内容
```

ノートの任意のところにこの形式で記載した内容もフロントマターに記載したメタデータと同様に抽出できる

## 元々使用可能な項目

| Property | 説明 | type |
| ---- | ---- | ---- |
| file.path | ファイルのパス | string |
| file.folder | ファイルのあるフォルダ | string |
| file.name | ファイルのタイトル | string |
| file.link | ファイルへのリンク | link |
| file.outlinks | ファイルから出ているリンク | link |
| file.inlinks | ファイルに入るリンク | link |
| file.tags | ファイルに設定したタグ | list |
| file.aliases | ファイルのエイリアス | string |
| file.size | ファイルのサイズ | number |
| file.ctime | ファイルの作成日時 | date |
| file.cday | ファイルの作成日 | date |
| file.mtime | ファイルの最終更新日時 | date |
| file.mday | ファイルの最終更新日 | date |
| file.day | ファイル名に含まれる日付 | date |

最初に this をつけると現在のノートの情報を指定できる

```
this.file.day
```

## 階層化した key を使用するには

フロントマターでは key を階層化して登録することができる

```
key:
  key1:
  key2:
  key3:
```

と登録し
dataview で呼び出す際には

```
key.key1
```

などとして指定することができる

# 最初に抽出したい形式と key を宣言する

## list

```
list　file.name
```

後ろにリストアップしたいものを記載

## table

```
table　file.name, file.path
```

後ろに表にしたいものをコンマ区切りで羅列する

```
table without ID
```

ファイルへのリンクが必ず入るが without ID の記載で消せる

## task

```
task
```

タスクを抽出できる

ちなみに

```
- [ ] task1
- [ ] task2 [key::]
```

タスクの後ろに上記の形式で inline field を設定できる

## 組み合わせる

```
list "File.name" + "=" + file.name　as "ファイル名"
```

"" で囲むと文字列を追加できる
+ を使って組み合わせることができる
数字や日付を取得する場合、**計算式を作ることも可能**
as をつけると表示名を変更できる

## 複数ある値の 1 つを指定する

例えば 1 つ目に登録されたタグだけ表示したい場合は

```
tags[0]
```

数字で何番目かを指定することができる
0 から始まる点に注意が必要

## 特定のノートの情報を使用する

現在のノートの情報は this.を最初につける
例えば

```
this.file.frontmatter.key
```

コードを記載したノートのフロントマターから情報を入手する

```
this.フィールド名
```

現在のノートのインラインフィールドを取得する

さらに、**この this の部分を別のノートのリンクにすると別のノートのフロントマターやインラインフィールドから情報を入手できる**

```
[[他のノート名]].file.frontmatter.key
```

別のノートの特定の値を計算式に入れたい場合に有効

## 現在の時刻を取得する

```
date(now)
```

日付だけで良い場合は

```
date(today)
```

# from

ノートから

```
from "ノート名"
```

ノートに記載のリンク

```
from outgoing([[link]])
```

この時、link に**なにも記載しないと dataview のコードを記載したノートが対象**になる

タグから

```
from #タグ名
```

除外するときは - をつける

```
from -"ノート名"
```

組み合わせ

```
from "ノート名" and #タグ名
```

や

```
from -"ノート名" or #タグ名
```

# where

## key の有無で絞る

key が登録されているノートだけに絞る

```
where keyの名前
```

## 計算式を作る

絞り込みができる

```
>, >=, <, <=, =, !=
```

!=はノットイコール

例

```
where file.size >30
```

や

```
where file.name = "ファイル名"
```

など文字列の場合はダブルクォーテーションで囲む

number や date に関しては四則演算を用いた計算式を作ることができる

# sort

昇順

```
sort "項目名"　asc
```

asc はなくても自動で昇順

降順

```
sort "項目名"　desc
```

複数の場合

```
sort "項目名" asc, "項目名" desc
```

# group by

表をグループ分けできる

```
group by file.ctime
```

# flatten

1 つの key に複数のデータを登録した場合に別々の項目として扱う
group by の逆と考えれば良い
["Group by" Woes - Help - Obsidian Forum](https://forum.obsidian.md/t/group-by-woes/51418/11)

# limit

表示件数に制限を加える

```
limit 10
```

# Functions

dataview ではかなり多くの機能を搭載している
以下は一例

## contains

```
where contains(file.name, "Daily Note")
```

特定の文字列を含む

## length

```
where length(file.name) > 10
```

文字数で指定

## sum

```
sum(rows.file.size)
group by ""
```

列の合計の場合は rows.を用いてから group by でまとめる

他にも色々ある様子
[Functions - Dataview](https://blacksmithgu.github.io/obsidian-dataview/reference/functions/)

# Advanced Usage

ちょっと複雑だが有用そうな使用例を別記事にまとめた→[[Dataviewを使い込む]]

また、設定で dataviewjs を on にすると javascript を組み込めるようになるのでプログラミングに精通している場合は大体なんでもできるようになりそう

私は学習コストを考慮して js までは使用しない方針

# 注意点

> [!warning] エンコード
> dataview では**リンクを認識すると自動的にエンコード**してしまう
> （※エンコードとは URL に使用できない日本語などの文字を使用できる文字に変換すること）
> Web サイトへのリンクの場合は問題ないはずだが、ローカルフォルダへのリンクを表示する際に問題になることがある
> M1Mac の場合はエンコードされたローカルリンクも有効だが、windows や他の環境では有効ではない事がある
> 対策として、リンクに日本語などのエンコードの対象になる文字を入れないようにする

# 参考

[An Introduction to Dataview - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/Guides/An+Introduction+to+Dataview)
[Data Types - Dataview](https://blacksmithgu.github.io/obsidian-dataview/annotation/types-of-metadata/)

# おわりに

dataview はカスタマイズ性が非常に高いツールである
基本的な使用法はマスターしたい
この記事は備忘録をかなり兼ねているので、適宜情報を追加しておこうと思う
