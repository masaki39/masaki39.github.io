---
date: 2026-09-16
updated: 2026-09-16
aliases: []
tags:
  - note/publish
---

# はじめに

本日2026年9月16日、Catalystメンバー向けにObsidian1.14.2が公開された。

[![](https://i.gyazo.com/5fae5061375094346d638138bb965a40.webp)](https://obsidian.md/changelog/2026-09-15-desktop-v1.14.2/)

今回革新的なのは、Vault以外のマークダウンファイルをObsidianで開くことができるようになった点だ。これまではVault外のマークダウンファイルを編集しようと思うと、コーディング用のエディター(VSCodeやNeoVimなど)を使用するしかなかったが、今後はどこでも使い慣れたObsidianを使用することができる。

# コマンドから起動する

![](https://i.gyazo.com/7a0939d5f5ce8cdec137caa1f0aa08e9.webp)

`Open file from outside the vault`というコマンド名となっている。

![](https://i.gyazo.com/a661b7e49176261f38d0db878f9e2c55.webp)

実行するとFinderが立ち上がり、開くファイルを選択することができる。

![](https://i.gyazo.com/db18406d86d35c6491df88d12a24c502.webp)

ファイルを選択すると、Obsidianで開くことが できる。(画像は他のリポジトリから適当にコピーしてきたREADME.md)

# Obsidian CLIから実行する

設定でObsidian CLIを有効にしている場合は、

![](https://i.gyazo.com/1e61c8398fea16bd6314e116ae3015a8.webp)

```zsh
obsidian command id=app:open-file
```

で実行できる。ただし、pathを引数に渡しても直接開かれるわけではなく、一旦Finderを経由するようになっている。また、Finderから右クリックでObsidianから開くこともできるようだ。

![](https://i.gyazo.com/5e796a77ff93961d7d99a5b239fa7279.webp)

# openコマンドで開く

単純に、Obsidianで開くだけなので

```zsh
open -a Obsidian "path/to/markdown/file"
```

でももちろん開くことができる。私にはこれがしっくりきた。

## Yaziに設定する。

私はFilerにYaziを使用している。

> [!quote] [[📘PC内をYaziで飛び回ろう]]

`keymap.toml`に下記のように記載する。

```toml
[[mgr.prepend_keymap]]
on = ["o", "o"]
run = 'shell -- open -a Obsidian %h'
desc = "Open with Obsidian"
```

これで、Yaziからooと押すだけでObsidian上で編集できるようになる。

![](https://i.gyazo.com/787bc8b914090e76c5573381b9e39934.webp)

やはりLive Previewは良い。

## Aliasに設定する

`.zshrc`に追加する。

```zsh
alias oo='open -a Obsidian'
```

だいぶお手軽感が増した。

# おわりに

個人的にはテキストだけの編集はNeoVimで問題ないと思っているが、プレビューのためにブラウザを開く手間がある場合はLive PreviewのあるObsidianを使っていきたい。
