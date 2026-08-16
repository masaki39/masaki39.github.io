---
date: 2025-11-11
updated: 2025-11-11
aliases: []
tags:
  - note/publish
description: oh-my-logoは、ターミナルでカラフルなグラデーション付き巨大ASCIIアートロゴを生成するNode.jsツールで、テキストバナー作成にも利用可能です。
---

# はじめに

アスキーアートのロゴ作成ツールoh-my-logoを使ってみた。
半年くらい前？Claude Codeが流行り始めた時に話題になったツールである。

> [!quote] [GitHub - shinshin86/oh-my-logo: Display giant ASCII-art logos with colorful gradients in your terminal — like Claude Code or Gemini CLI.](https://github.com/shinshin86/oh-my-logo)

# 使い方

Node.jsがインストールされていれば、ターミナルで下記の用に打つだけ。

```zsh
npx oh-my-logo "OBSIDIAN" sunset --filled

  ██████╗  ██████╗  ███████╗ ██╗ ██████╗  ██╗  █████╗  ███╗   ██╗
 ██╔═══██╗ ██╔══██╗ ██╔════╝ ██║ ██╔══██╗ ██║ ██╔══██╗ ████╗  ██║
 ██║   ██║ ██████╔╝ ███████╗ ██║ ██║  ██║ ██║ ███████║ ██╔██╗ ██║
 ██║   ██║ ██╔══██╗ ╚════██║ ██║ ██║  ██║ ██║ ██╔══██║ ██║╚██╗██║
 ╚██████╔╝ ██████╔╝ ███████║ ██║ ██████╔╝ ██║ ██║  ██║ ██║ ╚████║
  ╚═════╝  ╚═════╝  ╚══════╝ ╚═╝ ╚═════╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═══╝

```

オプションも色々あるっぽい。

# バナー代わりに貼る

ただのテキストなのでコピペできる。
ObsidianのホームMOCの一番上にバナー代わりに貼る。
コードブロック内に入れるとレイアウトが崩れない。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20251111215551.webp)

tsやjsのコードブロックにすると文字列扱いのhighlightが適応されて水色になる。

# おわりに

ターミナル感がでて良い感じ。
超軽量テキストバナーとして、どうだろうか。
