---
date: 2025-06-03
updated: 2025-06-03
aliases: []
tags:
  - note/publish
description: Obsidian Basesで、関数を用いて1週間以内のデイリーノートを抽出する方法。
---

Obsidian Basesでデイリーノートを抽出するにはちょっと一癖必要そう。
条件式にfunctionを直で書かないと上手いこといかないように見える。

> [!quote] [Introduction to Bases - Obsidian Help](https://help.obsidian.md/bases)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-03T07-17-08-623Z.webp)

2行目は

```js
dateOnOrBefore(file.name, date(now()))
```

3行目は

```js
dateAfter(file.name, date(dateModify(now(), "-7d")))
```

使うかはともかく、とりあえず1週間前までのデイリーノートを抽出できるようになった。
