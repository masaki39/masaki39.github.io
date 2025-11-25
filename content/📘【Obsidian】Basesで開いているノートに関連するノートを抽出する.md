---
date: 2025-08-28
updated: 2025-08-28
aliases: []
tags:
  - note/publish
---

# はじめに

Obsidianの新コアプラグインBasesには現在開いているノートのプロパティを利用するやり方がある。これの活用法を考える。

Basesとは→[[📘【Obsidian】Basesの使い方]]

# 書き方

thisから始めると現在開いているファイルやそのプロパティを参照できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250828161708.webp)

たとえば、現在開いているノートにリンクされたノートを抽出する場合は以下の通りになる。

````yaml
```base
views:
  - type: table
    name: Table
    filters:
      and:
        - file.hasLink(this.file)
```
````

条件は変幻自在なので、タグが共通するものを抽出したり、日付が近いものを抽出したり、様々な活用が考えられる。

# 活用例

自作プラグインの[Simple Citations](https://github.com/masaki39/simple-citations)で活用してみる。これはZoteroから文献ノートを自動インポートするプラグインだ。

オプションにTemplate機能があり、ノートに任意の固定textを挿入できるようにしている。テンプレート用のノートに下記のように記述することで、First Authorが共通の文献ノートを抽出できるようにする。

````yaml
```base
filters:
  and:
    - file.inFolder("Literatures")
formulas:
  FirstAuthor: authors[0]
  link: link(file, "Link")
views:
  - type: table
    name: First Author
    filters:
      and:
        - authors[0].contains(this.authors[0])
        - file.name != this.file.name
    order:
      - formula.link
      - formula.FirstAuthor
      - journal
      - year
      - title
    sort:
      - property: year
        direction: DESC
      - property: authors
        direction: ASC
    limit: 10

```
````

文献ノートは下記のようになる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250828163019.webp)

共通のFirst Authorの文献ノートがリストアップされた。

# おわりに

最終的なYAMLだけ見ると複雑そうに見えるが、実際はGUI操作で直感的に設定できるため心配は要らない。従来のwikiリンクによる静的な関連付けに加えて、データベース的な動的な関連付けが可能になり、知識管理の幅が大きく広がるだろう。
