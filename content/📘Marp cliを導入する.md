---
date: 2025-06-06
updated: 2025-06-06
aliases: []
tags:
  - note/publish
description: Marp CLIを導入し、Obsidianでマークダウンからスライドを作成する方法、特に相対パス変換とコマンド実行の効率化について解説します。
---

# はじめに

ちょうどスライドを作ろう、だるいなと思っていたときにmarp-cliなるものの存在を知った。CLIで操作できるMarpとのこと。マークダウンファイルからスライドが作れるようになる。

# なぜ導入したか

すでにコアプラグインにスライドプラグインが存在し、コミュニティプラグインにAdvanced SlidesやMarpなどのプラグインが存在するが、導入する気になれなかった。理由は、

- 開発が止まっている
- Obsidianでしか使えない
- 使い方覚えるのが面倒

などだったが、marp-cliでObsidian内でコマンドを叩けばmarpの機能をつねにフルで使うことができるし、Obsidianから最悪離脱しても大丈夫なはずである。

# 実験

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-46-49-306Z.webp)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-47-04-494Z.webp)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-47-18-112Z.webp)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-47-29-324Z.webp)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-47-40-093Z.webp)

# Obsidianで使う際の注意点

- 画像の埋め込みは相対パスで行う必要がある
	- →wikilinkを相対パスに変換するコマンドを作成
- コマンドがめんどくさい
	- →相対パス変換+プレビューコマンドをコピーするコマンドを作成

つまり、相対パス変換だけしたら、コマンドをコピーするコマンドを作って、ターミナルで実行するだけでOK。Templaterでもできそうなレベルで、ハードルは低い。

```zsh
marp -p "slide.md" -o "marp-preview.html"
```

みたいな感じで。プレビュー用のファイルは固定にしてgitignoreしておいた。

# おわりに

進捗スライドはこれで時短していこう。
