---
date: 2024-05-04
updated: 2024-05-04
aliases: 
tags:
  - note/article
ogp: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/Resized_Software_Engineer_Obsidian_Dataview.png
---

# はじめに

久しぶりに Dataview でのノート抽出方法を見直す。目的は、抽出方法自体を動的に変更して、データベース検索ページが作ることだ。それと、今回は自作プラグイン Outline Converter で文章を書いてみることにする。

# 以前のコード

以下の通り。

```sql
table without id
authors[0] as FirstAuthor, journal, year, title, description, "[Note](" + file.name + ")" as Note, "[Zotero](" + zotero + ")" as Zotero, "[DOI](" + doi + ")" as DOI
from #タグ名  and "Literatures"
sort year desc
```

タグで文献ノートを収集する様になっている。決まった形で抽出する場合は十分なのだけれども、もう少しスマートな感じにしたい。

# 作り直したコード

以下の通り。

```sql
table
without id 
authors[0] as FirstAuthor, journal, year, title, description,
link(file.name, "Note") as Note,
elink(zotero,"Zotero") as Zotero,
elink(doi,"DOI") as DOI
// フォルダ名を入力
from "Literatures"
where
choice(this.search, icontains(list(title,journal, authors[0]), this.search), true)
and choice(this.tags[0], econtains(tags, this.tags[0]), true)
sort file.ctime desc
limit this.limit
```

Dataview の基本が色々詰まっているので簡単に解説。読み飛ばして OK。

## table

まずは型の宣言でテーブル型にする。`without id` はノートへのリンクを含まないという意味。`authors[0]` はリスト型の著者名リストの 1 つ目=First Author を表示する。`as` でテーブルのヘッダーの表示方法を設定できる。`link()` は vault 内へのリンクを任意の文字列で表示できる。`elink()` は URL や URI へのリンクを任意の文字列で表示できる。

## from

これはフォルダ指定。私の場合は `Luteratures` のフォルダになる。因みに機能の境目みたいな部分には//でエスケープしたらコメントをいれることができる。

## where

絞り込みを行うところ。ちょっと複雑だが、true か false かを判定するような式を入れて、true の場合のみを表示するような感じ。

### icontains()

これは 1 つ目の引数に文字列やリストを指定して、2 つ目の引数に指定した文字列が含まれているかどうかを判定する。`contains()` が大文字と小文字を厳密に区別するが、`icontains()` は大文字と小文字を区別しないので雑な検索に向いている。検索ワードには `this.search` を採用した。このノートの search プロパティを参照するという意味。今回の場合は、search 欄に検索語句を入力すると `title` や `journal` や `authors[0]` に検索語句が含まれる場合のみに true を返す。

### choice()

これは分岐ができる。第一引数に where みたいな感じで true か false を判定して、true の場合は第二引数、false の場合は第三引数を返す。if 構文みたいな感じで使えると思えば良さそう。`choice(this.search, ~, true)` の場合は、検索語句の `this.search` の存在をチェックして、存在する (true) の場合は~の部分の処理を行い、そうでない場合は、true を返す。つまり、検索語句がある場合のみ処理をさせることができる。

### econtains()

これは、`contains()` の仲間。厳密に同じ値を含む場合のみに true を返す。なのでタグなどの、全く同じ値を求められる場合に向いている。検索語句は `this.tags` を参照したので、`tags` の 1 つ目に入れた値を検索する。

## sort

並べ替え。なんとなくファイル作成順。

## limit

表示上限数。これも任意で変えれるように `this.limit` を参照するように。

# 抽出結果

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-05-04%2020.49.03.png)

プロパティの search という項目に検索ワードを入力し、limit に表示上限数を入力、tags に収集する tags を入力する。search の検索は、`title` と `journal` と `FirstAuthor` から検索される。因みに cssclasses はテーマ Minimal の Dataview テーブルの見た目編集用のもの。完成。

# おわりに

今回作成したのは全体から検索できるデータベースで、1 つ作っておくと便利そう。Dataviewjs を使わなくても基本機能だけでこういうことができるのは、Dataview の凄いところだと思った。
