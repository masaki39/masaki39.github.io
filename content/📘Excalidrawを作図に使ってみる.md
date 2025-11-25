---
date: 2025-06-08
updated: 2025-06-08
aliases: []
tags:
  - note/publish
description: Marpで作成したスライドのカスタマイズ性を高めるため、ExcalidrawプラグインでSVG形式の図を埋め込み、編集可能な作図を再利用する方法と設定、ファイル名変更の注意点を解説。
---

# はじめに

Markdownでスライドを作るMarpを最近導入した。

> [!quote] [[📘Marp cliを導入する]]

簡便かつ高速にスライドができて殆どの場合でいい感じではあるものの、高度なカスタマイズ性は欠ける。ここをコミュニティプラグインのExcalidrawで補えるのではと考えた。

# Excalidrawの設定

設定画面が多くて階層構造になっているが下記の3つを設定する。

- Embed Excalidraw into your Notes and Exporting
	- Type of file to insert into the documents
		- SVGに変更
	- Export Settings
		- Auto-export Settinigs
			- Keep the.SVG and/or.PNG filenames in sync with the drawing fileにチェック
			- Auto-export SVGにチェック

# 仕組み

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-08T11-32-19-079Z.webp)

Excalidrawは通常`.excalidraw.md`のファイルを用いて作図するが、今回の設定で変更が加わるたびに同名のSVGファイルが生成されるようになる。`.excalidraw.md`のファイルはExcalidrawでしか使えないが、SVGファイルならmarp含め他プログラムからも使用できる。

`Create new drawing - IN A NEW TAB -and embed into active document`とかのコマンドを実行するとアクティブファイルにリンクを埋め込みつつ、作図画面を開く。このとき、SVGファイルのリンクを埋め込むようになる。

このリンクはSVGファイルへのリンクになるが、編集するときはSVGファイルのリンクにカーソルを合わせて`Open Excalidraw drawing`のコマンドを実行すれば`.excalidraw.md`のファイルをExcalidrawで開いて編集できる。

編集用ファイルと成果物ファイルに分けられるというイメージ。

- メリット
	- 汎用性のあるSVGファイルとして出力される
	- 再編集、再利用可能な作図
- デメリット
	- Excalidrawプラグイン固有の能力(図へのリンク埋め込み)が使えない

# ファイル名も替えたほうがいいかも

デフォルトのファイル名は無駄に埋め込んだノートのタイトル名やスペースが挟まる仕様なので、他プログラムでの再利用を考える場合は替えたほうがいいかも(相対パスのマークダウンリンクに変換するのがちょっと面倒かも)、と思い下記のようにした。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-08T11-50-18-616Z.webp)

# おわりに

手書き風が売りだけどカッチリしたフォントにもできるし、ほぼほぼ何でもできるのでは。Excalildrawはどうしても文で表現できない位置関係を含む表現に限定的に使用するのみであったが、いざ使うとなると非常によくできたプラグインだと思った。
