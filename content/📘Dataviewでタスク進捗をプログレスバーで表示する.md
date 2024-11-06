---
tags:
  - note/article
ogp: https://picsum.photos/id/60/1200/675
---
# はじめに

気がついたら前回の投稿からだいぶ時間が空いていた。
このサイトには主にObsidianについて投稿してきたのだが、運用1年位から自分の中で新規性のある話題はなくなってきて、ある意味安定期に入っている。
ただ、色んな方のブログやnoteに助けられたことも多いので、ちょくちょく何かしら投稿したいとは思っている(多分、そこそこ詳しくなってきているので)。

今回は、[Obsidianのタスク進捗をプログレスバーで一覧する｜⿶⿵⿷⿴⿳](https://note.com/unco3/n/n49b6afaef623)で紹介されているタスク進捗バーの作り方を解説する。というのも、こちらの解説記事ではMetadata Menuを使用しているが、Dataviewだけで可能だからだ。

Dataviewjsは今回は使用せず、Dataviewの基本的な使い方は知っているものとする。
複数の知識を組み合わせるので、順番に説明する。

# プログレスバーの書き方

下記の通り

```html
<progress value="50" max="100"></progress>
```

数字に進捗率を記入する。

# タスクの情報を取得する

Dataviewでアクセス可能なノートのメタデータは、実はDocumentを読まなくても自分で確認できる。

例えば、Playgroundというタイトルのノートを作ってみて、Dataview tableで下記の様に書いてみる。

```js
table
file
from "Playground"
```

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-11-06%2020.50.10.png)

ここに表示された一覧は全て、Dataviewでアクセス可能なメタデータとなる。

```js
table
file.path, file.frontmatter.date
```

みたいな感じで使用できる(フロントマターはそのまま書いても使用できるようになっているが)。ここにtasksという項目があり、これがタスクへのアクセスとなる。

更に、このノートに実際にタスクを追加すると、更に下位の項目が表示されるようになる。

# ノートのタスクの総数を取得する

```js
length(file.tasks)
```

file.tasksで、ノート内のタスクのarrayが返ってくるのでlengthで長さを出す。
lengthなどのfunctionは色々使えるが公式documentに解説がある。

# 完了したタスクの数

```js
length(filter(file.tasks, (t) => t.completed = false))
```

tasksの更に下位のcompletedがチェックの有無を判別している。ここでフィルターをかけると完了タスク数を表示できる。

# プログレスバーと合体してDataview Tableに表示する

```js
table
"<progress value='" + length(filter(file.tasks.completed, (t) => t = true)) + "' max='" + length(file.tasks) + "'></progress>"
```

プログレスバーを文字列で書いて、数字の部分にタスク数を入れ込む。
これでタスク進捗率のプログレスバーを表示できる。

# 更に%の表記を追加する

```js
table
"<progress value='" + length(filter(file.tasks.completed, (t) => t = true)) + "' max='" + length(file.tasks) + "'></progress>" + choice(length(file.tasks), round(length(filter(file.tasks.completed, (t) => t = true))/length(file.tasks)*100), 0) + "%"  AS Progress
```

こんな感じ？

# デイリーノートに注力する

更にデイリーノートに注力したバージョンを考えてみる。
インラインで書く用。

## 本日のデイリーノートへのリンクを取得する

```js
`=link(dateformat(date(today), "yyyy-MM-dd"))`
```

データフォーマットは自由に変えれる。

## 本日のデイリーノートのタスク数を取得する

```js
`=length(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks)`
```

先程の取得方法にファイルリンクを先頭に付け加える。

## 本日のデイリーノートのタスク進捗プログレスバーを取得する

```js
`="<progress value='" + length(filter(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks.completed, (t) => t = true)) + "' max='" + length(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks) + "'></progress>" + choice(length(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks), round(length(filter(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks.completed, (t) => t = true))/length(link(dateformat(date(today), "yyyy-MM-dd")).file.tasks)*100), 0) + "%"`
```

合せ技。

# おわりに

ホームページの一番上に追加してみた。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-11-06%2021.11.52.png)

一応DataviewのrefreshボタンもMeta Bindで作って、完了。
そんなことより今日まだ38%なのやばい。
あくまでタスクの数の計算で重み付けはされてないので...