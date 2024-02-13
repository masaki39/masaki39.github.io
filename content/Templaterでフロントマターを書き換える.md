---
date: 2023-12-12
updated: 2024-02-13
aliases: []
tags:
  - obsidian
  - obsidian/plugin
  - templater
  - article
cssclasses: 
---

# Templater プラグインについて

Templater は Obsidian のコミュニティプラグインの 1 つで
大きな利点は、

**①テンプレートをホットキー(ショートカット) で呼び出せるようになる**
**②テンプレートに javascript を組み込める**

ということ
簡単に解説する

# テンプレートをホットキーで呼び出す

テンプレートのノートを作成し、適当なテンプレートフォルダに保存、
その後 Templater の設定からホットキーを追加したいテンプレートを選べる

![Pasted image 20231206080931.png](Pasted%20image%2020231206080931.png)

選んだら、Obsidian のデフォルトの設定から任意のホットキーを設定できる

![Pasted image 20231206081504.png](Pasted%20image%2020231206081504.png)

私はシンプルに Template1 から番号をふっておきホットキーも数字であてがっている
このようにホットキーでテンプレートをすぐに呼び出すことができる

# テンプレートに javascript を組み込む

これが本命の機能で

```
<%* ここにコードを書く　%>
```

このように囲った部分に javascript を書くことができる
Templater に備え付けの tp.から始まる module のみを使用する場合は `*` はいらない
例えば昨日の日付や明日の日付のリンクを入れたい場合、

```
<< [[<% tp.date.now("YYYY-MM-DD",-1) %>]] | [[<% tp.date.now("YYYY-MM-DD",+1) %>]] >>
```

このコードをテンプレートに記載しておくと Templater で呼び出すと

```
<< [[2023-12-05]] | [[2023-12-07]] >>
```

この様になる
つまりテンプレートに**tp.module や javascript で取得可能な動的な情報を含めることができる**
色々出来そうだが日付関係の情報を取得するのが Daily Note 作成に便利だと思う

# フロントマターを書き換える

さらになんと javascript でフロントマターを好きな様に書き換えることができる
以下が作成例である

```
<%*
  const file = tp.file.find_tfile(tp.file.path(true));
  await app.fileManager.processFrontMatter(file, (fm) => {
	 fm.created = tp.file.creation_date("YYYY-MM-DD");
	 fm.updated = tp.date.now("YYYY-MM-DD");
  });
%>
```

created というフロントマターを file の作成日、updated というフロントマターを本日の日付に設定するように記載してみた

これを実行するとフロントマターに

```
---
created: 2023-12-05
updated: 2023-12-06
---
```

これが記入される
key がなければ追加され、あっても更新される
好きな様にいじれるので、ホットキーを押すだけでフロントマターを追加・更新できるようになった

# Citations の authors を分割する

これが今回の調査の目的である
以前の記事で Citations プラグインを用いた Zotero と Obsidian での文献管理についてまとめた

> [!seealso] Seealso
> [[📘Zotero×Obsidian 文献管理のすゝめ]]

Citations プラグインは文献のメタデータをフロントマターに自動取得するプラグインであるが著者名が分割されずに取得されるという問題がある

```
---
authors: tanaka, satou, saitou
---
```

このようにコンマ区切りで authors がズラッとひとまとまりに並んでしまうので、筆頭著者の情報だけを抜き出したりすることが難しかった

```
<%*
  const file = tp.file.find_tfile(tp.file.path(true));
  await app.fileManager.processFrontMatter(file, (fm) => {
  // `authors`キーが存在するか確認
    if (fm.authors) {
      // `authors`キーの値をコンマで分割して配列に変換
      const authorsArray = fm.authors.split(", ");
      // 分割した著者リストをフロントマターに更新
      fm.authors = authorsArray;
    }
  });
%>
```

フロントマターから authors の情報を取得し、コンマ区切りで分割してリストにしてから再度更新するというコードをつくってみた
これを実行すると

```
---
authors:
  - tanaka
  - satou
  - saitou
---
```

無事分割できた
分割できると、個別に指定することができるので dataview で扱える
詳細な使い方は別記事→　[[📘Dataviewの使い方]]

例えば

```
table authors[0] as "First Author"
where authors[0] = "tanaka" 
```

dataview でこう指定しておくと、筆頭著者が "tanaka" のノートのみを抽出できる

# 終わりに

今後は citations で文献を取り込む直後にホットキーで authors を分割しておくと少し便利かもしれない
以前に取り込んだ文献も Python を用いれば一気に編集できると思うが、失敗したら悲しいのと、そこまでまだ需要が無いので今回は行わないことにした

# 参考サイト

[Introduction - Templater](https://silentvoid13.github.io/Templater/introduction.html)
[Issue using app.fileManager.processFrontmatter - Developers & API - Obsidian Forum](https://forum.obsidian.md/t/issue-using-app-filemanager-processfrontmatter/51233/6)
