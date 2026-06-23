---
date: 2026-02-04
updated: 2026-02-04
aliases: []
tags:
  - note/publish
description: manifest.jsonとRGB色コードを用いたGoogle Chromeカスタムテーマの自作手順、デベロッパーモードでの導入方法、及びTokyo Nightテーマの適用解説。
---

# はじめに

前回こんな記事を書いた。

> [!quote] [[📘ObsidianをTokyo Nightにする]]

色コードを指定するだけというやり方は簡単だったので、他のアプリでもできないか試してみた。具体的にはコミュニティテーマが豊富なGoogle Chromeで自作テーマを作成する。

# 要件を調査

[公式ドキュメント](https://developer.chrome.com/docs/extensions/mv2/themes)によると、`manifest.json`というファイルのみがあれば良いようだ。

## manifest.jsonの構成

manifest.jsonには以下のセクションが含まれる:

- **基本情報**: `manifest_version`, `version`, `name`, `description`, `author`
- **colors**: UI要素の色をRGB配列で指定
- **images**: 背景画像などのパスを指定(オプション)
- **tints**: UI要素に適用する色調をHSL形式で指定(オプション)
- **properties**: 背景の配置やロゴの種類などの表示プロパティ(オプション)

## 主要な色項目

テーマ作成に必要な主要な色項目は以下の通り:

| 項目 | 説明 | 設定箇所 |
|------|------|----------|
| `frame` | メインブラウザフレームの背景色 | ウィンドウの外枠 |
| `toolbar` | ツールバーの背景色 | アドレスバー周辺 |
| `tab_text` | アクティブタブのテキスト色 | 選択中のタブ |
| `tab_background_text` | 非アクティブタブのテキスト色 | 未選択のタブ |
| `background_tab` | 非アクティブタブの背景色 | 未選択のタブ背景 |
| `toolbar_button_icon` | ツールバーボタンのアイコン色 | 各種ボタンアイコン |
| `bookmark_text` | ブックマークバーのテキスト色 | ブックマーク項目 |
| `ntp_background` | 新規タブページの背景色 | 新しいタブを開いたとき |
| `ntp_text` | 新規タブページのメインテキスト色 | 新規タブのテキスト |
| `ntp_link` | 新規タブページのリンク色 | 新規タブのリンク |
| `omnibox_background` | アドレスバーの背景色 | URLバー |
| `omnibox_text` | アドレスバーのテキスト色 | URL入力テキスト |
| `button_background` | ボタンの背景色 | 各種ボタン |
| `frame_incognito` | シークレットモードのフレーム色 | シークレットウィンドウ |

色コードはRGB形式で指定するため、前回収集した色コードをClaude Codeに渡して埋めてもらった。

# 設定方法

Google Chromeの`設定`→`拡張機能`からデベロッパーモードをオンにすると、`パッケージ化されていない拡張機能を読み込む`というボタンが出現する。

![Chromeの設定画面](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260204201739.webp)

ここに`manifest.json`を含むディレクトリを選択する。

![ディレクトリ選択](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260204201900.webp)

なんとこれだけでテーマになる。

![Tokyo Nightテーマ適用後のChrome](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260204202914.webp)

今後の拡張性を考慮してリポジトリ化した。

> [!quote] [GitHub - masaki39/chrome-themes: Custom themes for Google Chrome](https://github.com/masaki39/chrome-themes)

# おわりに

`manifest.json`だけでGoogle Chromeのテーマを自作できることがわかった。色コードをRGB形式で指定するだけなので、お気に入りのカラーパレットがあれば簡単にオリジナルテーマを作成できる。Tokyo Nightのような既存のカラースキームを他のアプリと統一できるのも嬉しい点だ。
