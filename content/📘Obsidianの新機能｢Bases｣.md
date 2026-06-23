---
date: 2025-05-22
updated: 2025-05-22
aliases: []
tags:
  - note/publish
---

# はじめに

本日Obsidianの新機能｢Bases｣が発表された。プロパティを用いてNotion likeなデータ・ベースを作成する機能だ。本日2025-05-22よりベータ版としてCatalyst licenseを持っているユーザーに公開されている。今まで無課金で使い倒していて申し訳ない気持ちがあったので、これを機にCatalyst licenseを購入し、実際に動かしてみた。

# Basesとは

ざっくりいうと、条件に応じたノートを抽出してプロパティを一覧表示することができる。Basesを用いたデータ・ベースは`.base`の拡張子のテキストファイルに保存され、他のノートと同様にリンクしたりノート内に埋め込んだりできる。また、Dataviewのようにコードブロックとしてノート内に埋め込むことができる。

# 書き方

以下は公式サイトに記載の例

```yaml
filters:
  or:
    - tagged_with(file.file, "tag")
    - and:
        - tagged_with(file.file, "book")
        - links_to(file.file, "Textbook")
    - not:
        - tagged_with(file.file, "book")
        - in_folder(file.file, "Required Reading")
formulas:
  formatted_price: 'concat(price, " dollars")'
  ppu: "price / age"
display:
  status: Status
  formula.formatted_price: "Price"
  "file.ext": Extension
views:
  - type: table
    name: "My table"
    limit: 10
    filters:
      and:
        - 'status != "done"'
        - or:
            - "formula.ppu > 5"
            - "price > 2.1"
    group_by: "status"
    agg: "sum(price)"
    order:
      - file.name
      - file.ext
      - property.age
      - formula.ppu
      - formula.formatted_price
  - type: map
    name: "Example map"
    filters: "has_coords == true"
    lat: lat
    long: long
    title: file.name
```

設定には4項目あることがわかる

- filters: 全てのviewに適応されるフィルター
- formulas: プロパティをそのまま表示するのではなく、計算したりする場合はここで定義する
- display: headerの名称を編集できる
- view: 実際の表示される部分の設定。1ファイルに複数登録できる。

filtersとformulasにはfunctionが適応できる。

> [!quote] [Functions - Obsidian Help](https://help.obsidian.md/bases/functions)

functionはまだ少ないが今後増えていくだろう。

# 作成例

とりあえず作ってみた。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-05-22%2016.08.06.jpg)

```yaml
filters: in_folder(file.file, "Literatures")
formulas:
  author: authors[0]
views:
  - type: table
    name: Literatures
    order:
      - formula.author
      - journal
      - year
      - title
      - description
      - file.name
      - zotero
      - doi
      - file.ctime
    limit: 50
    sort:
      - column: file.ctime
        direction: DESC
  - type: table
    name: test
    limit: 10

```

# 特筆すべき点

- Dataviewとは異なり、直接プロパティを編集することができる。
- コードは全く書かなくてもGUIで全て設定できるようになっている
- 他のノートにリンクしたり埋め込んだりして再利用できる

# 今後の展望

- 今はTableビューだけだが、今後CardsやListなどのビューが増えていく
- Functionの充実
- Obsidian Publish サポート

# おわりに

多くの人に必要な機能が搭載しつつ、コードが全く書けなくても使えるように配慮されているのは素晴らしい。まだまだ機能は充実していくようだが、今の時点でも基本的な動きは実装できる。ヘビー級のコアプラグインだからか今までのコアプラグインと異なり、ベータ版から一般公開まではちょっと時間かかるかもとのことだった。
