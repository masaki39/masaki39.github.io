---
date: 2024-06-25
updated: 2024-06-25
aliases: []
tags:
  - note/article
---

Obsidianでローカルファイルへのパスを貼る方法です。

# 先に結論

- Macの場合は`⌥`を押しながらファイルorフォルダをドラッグ&ドロップ
- Windowsの場合は`ctrl`を押しながらファイルorフォルダをドラッグ&ドロップ

# 背景

ローカルファイルリンクはMacの場合は下記の形式で書く必要があります。

```
[ファイル・フォルダ名](<file:///フルパス>)
```

[作業ログ｜Obsidianで便利なローカルファイルへのリンクを、Automatorに作成してもらうと楽ちんだなあ #MacOSX - Qiita](https://qiita.com/hann-solo/items/5537e54704db48696f80)

今まで私は上記ページを参考にTemplaterでローカルファイルパスを作っていました。今日、プラグインもあるなぁとREADMEをみてみたら、｢ドラッグ&ドロップでできるようになったのでこのプラグインはもう必要ない｣と書いてあるのを発見しました...

[MichalBures/obsidian-file-path-to-uri: Convert file path to uri for easier use of links to local files outside of Obsidian](https://github.com/MichalBures/obsidian-file-path-to-uri)

２年前からドラッグ&ドロップで良かったのか...知らなかった...