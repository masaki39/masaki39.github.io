---
date: 2025-06-04
updated: 2025-06-04
aliases: []
tags:
  - note/publish
description: Obsidianにターミナルプラグインを導入し、PATH設定やCSSスニペットによる見た目の調整を行い、ターミナル統合による作業効率化と連携機能強化を図る方法を紹介。
---

# はじめに

Anthropicが出しているClaude Codeの先見の明に感銘を受けた。今はCursorなどのIDE統合AIが注目を浴びているけども、ターミナル統合ならIDEに依らない。そうなると、Obsidianにもターミナルがあってもいいなと思った。

では、Obsidianにターミナルプラグインを導入する。下記記事を参考にした。

> [!quote] [ObsidianをCursorに改造しよう(?)｜Naoki \|電電猫猫](https://note.com/electrical_cat/n/n15c2a1a6e97f)

# インストール

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T00-34-07-972Z.webp)

コミュニティプラグインからインストールして有効にする

# ウィンドウを開く

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T00-34-55-676Z.webp)

`Open current directory in terminal: Integrated`というコマンドを実行する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T00-36-01-306Z.webp)

下に分割されたターミナルウィンドウが出現し、操作可能になった。

# PATHを通す

PATHが通ってないと使い物にならないのでログインシェルと同じPATHを通す用に設定する。Geminiに聞いてみたらAugumentに`-l`と追記すればいいと言われた。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T01-42-50-570Z.webp)

設定画面でIntegratedDefaultの設定を開く。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T01-43-49-268Z.webp)

謎に縦長の設定画面に`-l`と追記する。
これでPATHが普段使いのシェルと同じになった。

# CSSの調整

見た目がゴツいのでCSSスニペットでスッキリさせる

- ターミナルタブの余白を削除
- ターミナルのタブのみタブタイトルバーを削除
- タブバーは最上部のもの以外は折りたたみ、hoverで開く
	- 最上部のタブバー以外はアイコンも削除
- 一番下に分割したウィンドウの高さを制限

> [!note]- 成果物
>
> ```css
> /* タブバーを自動で折りたたむ */
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-container {
>     background:
>         repeating-linear-gradient(
>             135deg, 
>             var(--background-modifier-border) 0px, 
>             transparent 1px,
>             transparent 10px,
>             var(--background-modifier-border) 11px, 
>             transparent 11px
>         ) !important;
>     height:8px;
>     transition:.2s all ease-in;
>     border-bottom-color:transparent;
> }
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-container::before{
>     content:'';
>     background:linear-gradient(to top, var(--background-primary), transparent);
>     display:block;
>     position:absolute;
>     left:0;
>     width:100%;
>     height:100%;
>     top: 0;
> }
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-container:hover,
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-container:focus-within,
> body.is-grabbing .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-container {
>     /* is-grabbing visibility is to make dragging panels around usable */
>     height:var(--header-height);
>     background:var(--background-primary) !important;
> }
> 
> /* 余白を削除 */
> .workspace-leaf-content[data-type="terminal:terminal"],
> .workspace-leaf-content[data-type="terminal:terminal"] .view-content {
>     padding: 0;
> }
> /* ターミナルのタブヘッダーを非表示 */
> .workspace-leaf-content[data-type="terminal:terminal"] .view-header{
>     display:none;
> }
> /* 高さを削減 */
> .mod-root .workspace-tabs:not(.mod-top):last-of-type{
>     max-height: 220px;
> }
> /* タブのアイコンを削除 */
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-new-tab,
> .mod-root .workspace-tabs:not(.mod-top) .workspace-tab-header-tab-list{
>     display:none !important;
> }
> ```

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-04T00-42-44-497Z.webp)

サイズも自動で調整されていいんじゃないでしょうか。

`.mod-root.workspace-tabs:not(.mod-top)`というセレクターは下に分割したタブだけに有効なので、他にも便利かもしれない。

# おわりに

コーディング特化だろうし価格も高いのでClaude Codeの導入予定はまだない。Obsidian自体の作業にもターミナルはそんなに使用しないが、他のアプリとの連携起点にはなるし、｢作業場のハブ｣としての機能は強化されただろう。
