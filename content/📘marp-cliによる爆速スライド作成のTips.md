---
date: 2025-08-26
updated: 2025-08-26
aliases: []
tags:
  - note/publish
description: Marp CLIを使った爆速スライド作成のTipsを紹介、Node.js環境構築、サーバーコマンド、Marp特有の記法、CSSテーマ、編集可能なパワポ出力について解説。
---

# はじめに

少し前にスライド作成用にMarp CLIを導入した。

> [!quote] [[📘Marp cliを導入する]]

その後、何種類かスライドを作って、楽な方法がある程度わかってきた。慣れは必要ではあるが、本当に早くスライドを作ることができる。まだ自分の中では発展途上だが、知ってよかったことを書いておく。

詳細な使い方に関しては[GitHub - marp-team/marp-cli](https://github.com/marp-team/marp-cli)を見るのが一番なので本記事では解説しない。また、基本的なマークダウン記法に関しても解説しない。

# Marpとは

マークダウンで記載するだけできれいなスライドを作ることができるツールである。VS Codeの拡張機能も存在するが、CLIの方がエディターを選ばない利点がある。私はマークダウンをObsidianで記載するのでMarp CLIを使用することにした。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-46-49-306Z.webp)

↑スライド例

# 必要な環境

- Node.js
- marp-cli
- ブラウザ（Chrome、Edge、Firefoxのいずれか）
- Libre Office(編集可能なパワポ出力が必要なら)

# ディレクトリ構成

私はスライド用のフォルダを作って以下の通りに配置している（Obsidian内）。

```
slides/
├── attachments/    # 画像ファイル等が保存されるフォルダ
├── themes/         # CSSテーマファイルが格納されるフォルダ
│   ├── academic.css
│   └── academic_custom.css
└── *.md           # Marpスライド用のマークダウンファイル（ルートに配置）
```

# サーバーコマンドだけ知っていればOK

```zsh
marp -s "path/to/slide/folder" --allow-local-files --theme "path/to/theme.css"
```

コマンドラインを使うのは若干面倒に思っていたが、実は固定のサーバーコマンドだけで事足りることを知った。サーバーコマンドを実行すると、[localhost:8080](http://localhost:8080)にサーバーが立ち上がる。`--allow-local-files`はローカル保存された画像を使用する場合に必要で、`--theme`は任意である。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250826130300.webp)

[localhost:8080](http://localhost:8080)を開くと上記ページが表示されて、スライドをリアルタイムで編集しながら確認することができるし、pdfやpptxへの変換も可能となっている。

# Marp特有の記法

基本的なマークダウンで対応できるが、スライド作成のための特有の記法がある。

<iframe src="https://filedn.com/lF97wFVWosQpHEoDAbvva0h/slides/%E2%96%B6%EF%B8%8F2025-08-26_Marp%E7%89%B9%E6%9C%89%E3%81%AE%E8%A8%98%E6%B3%95.html" style="width: 100%; aspect-ratio: 16/9;" frameborder="0"></iframe>

# academic_custom.css特有の記法

[Academic](https://rnd195.github.io/marp-community-themes/theme/academic.html)テーマを若干改変して[academic_custom.css](https://gist.github.com/masaki39/0bf484944b4fe3630f320278d4ef8e58)を作成した。

<iframe src="https://filedn.com/lF97wFVWosQpHEoDAbvva0h/slides/%E2%96%B6%EF%B8%8F2025-08-26_academic_custom.css%E7%89%B9%E6%9C%89%E3%81%AE%E8%A8%98%E6%B3%95.html" style="width: 100%; aspect-ratio: 16/9;" frameborder="0"></iframe>

# 編集可能なパワポ出力

Marpはパワポ出力に対応しているが、出力したスライドは画像として埋め込まれた状態なので、PowerPoint上での微調整はできない。ただし、LibreOfficeをインストールした状態で、変換コマンドに下記のオプションをつけると編集可能なPowerPointファイルに変換できる。

```zsh
--pptx-editable
```

しかし、まだEXPERIMENTALな機能と記載があるように、レイアウトが若干崩れる。そもそもMarpのコンセプトからして、微調整が必要なスライドは最初からパワポで作れば良いような気がする。

# おわりに

パワポで色やフォントを悩む時間があったら、Marpでコンテンツに集中した方が良い。マークダウンの簡潔さが、思考をクリアにしてくれる。

慣れは必要だが、一度慣れてしまえばスライド作成の概念が変わる。LLMとの相性も抜群で、「この内容を5枚のスライドにまとめて」と言えばほぼそのまま使える。ただし、レイアウトを意識したプロンプトは必須だろう。

Marpは、本当に大切なことに時間を使わせてくれるツールだと思う。
