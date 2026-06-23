---
date: 2025-02-24
updated: 2025-06-02
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-24%2011.06.04%20-%20A%20stylish%20and%20modern%20digital%20banner%20for%20an%20article%20titled%20'Obsidian%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EMinimal%E3%82%92Maximize%E3%81%99%E3%82%8B'.%20The%20design%20should%20feature%20a%20sleek%2C%20minimalistic%20aesthetic%20.webp
---

# はじめに

ObsidianのテーマMinimalにはたくさんのテーマが内蔵されている。

> [!quote] [[📘Minimal Theme Settingsのテーマ変更コマンドの作成]]

それぞれにアクセントカラーが設定されているので、それを基にUIに割り振っていけば再利用性の高いCSSスニペットを作れると考えた。

# 作り方

アクセントカラーは

```css
--ax1
```

みたいな変数に格納されておりこの変数は

```css
hsl(var(--accent-h), var(--accent-s), var(--accent-l))
```

という3つの変数から作られている。
こういう変数名は開発者ツールから見ることもできるし、公開されているものは公式のぺージとかからも知ることができる。

> [!quote] [Style Settings - Minimal Documentation](https://minimal.guide/plugins/style-settings)

アクセントカラーを基に濃度の異なる色を作る

```css
body {
    --accent-color-10: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.1);
    --accent-color-20: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.2);
    --accent-color-30: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.3);
    --accent-color-40: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.4);
    --accent-color-50: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.5);
    --accent-color-60: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.6);
    --accent-color-70: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.7);
    --accent-color-80: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.8);
    --accent-color-90: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.9);
}
```

これをUIに割り当てていく。

# 画面の変化

↓Minimal +Minimal Theme SettingsのColorful系のオプションをオンにした状態

![[📘ObsidianのテーマMinimalをMaximizeする-1740361810678.webp]]

↓UIにアクセントカラーを割り振った状態

![[📘ObsidianのテーマMinimalをMaximizeする-1740361999273.webp]]

水平線、アイコン、ドロップダウン、ボタン、インプットテキストの周囲に枠線を追加。インラインタイトル、スタックタブ、タブタイトルバー、カードビューの背景色にアクセントカラーを追加。

ついでにカードビューのセレクタ名も分かったので、マウスをホバーすると背景色が変わり少し大きく表示されるようにした。

↓ホバーついでにテーブルのホバー時のアクションも追加。

![[📘ObsidianのテーマMinimalをMaximizeする-1740362289100.webp]]

わかりにくいが、ccsclassesの`table-nowrap` を適応すると要素がはみ出る際に折返さない→必ず一行で表示されるので一覧性が増す。これをホバー時だけ折り返して表示されるようにした。マウスをホバーした2行目は`file.outlinks`が折り返しているが、3行目は折り返さず省略されていることがわかる。

↓テーマを変更した時のビュー

![[📘ObsidianのテーマMinimalをMaximizeする-1740362485117.webp]]

他のテーマでも有効に働くCSSスニペットを作ることができた。

# 作成したCSSスニペット

```css
/* CSS変数を定義 */

body {
    --accent-color-10: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.1);
    --accent-color-20: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.2);
    --accent-color-30: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.3);
    --accent-color-40: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.4);
    --accent-color-50: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.5);
    --accent-color-60: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.6);
    --accent-color-70: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.7);
    --accent-color-80: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.8);
    --accent-color-90: hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.9);
    --cards-background: var(--accent-color-10); /* カードビューの背景色*/
}

/* ボーダー設定(水平線、アイコン、インプットボタン類) */
.markdown-rendered hr,
.clickable-icon,
.dropdown,
button,
input[type='text'] {
    border-color: var(--accent-color-50);
    border-style: solid;
    border-width: 1px;
    color: var(--text-color);
}

/* インラインタイトル */
.inline-title{
    color: var(--ax1);
}

/* スタックタブ */
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header-inner{
    background-color: var(--accent-color-40);
    border-color: var(--accent-color-50);
    border-style: solid;
    border-width: 1px;
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header.is-active .workspace-tab-header-inner {
    background-color: var(--accent-color-80);
}

/* タブタイトルバー */
.is-focused .workspace-leaf.mod-active .view-header,
.view-header {
    background: linear-gradient(to bottom, var(--accent-color-20), var(--background-primary));
}

/* カードビューのホバー時の設定 */
.cards table.dataview>tbody>tr:hover /*cards*/,
.list-cards.markdown-preview-view div>ul>li:hover /*リストカード*/ { 
    background-color: var(--background-primary);
    transform: scale(1.05);
    transition: transform 0.1s ease-in-out;
}

/* テーブルのセルのホバー時の設定 */
.table-view-table > tbody > tr > td:hover {
    white-space: wrap !important;
}
```

設定→外観→CSSスニペット→📂のフォルダに.cssの拡張子のファイルを作り、記載する。

# おわりに

CSSスニペットの調整は沼な作業だと思っていたが、アクセントカラーをベースにしたCSSスニペットは再利用性が高く有用だろう。
