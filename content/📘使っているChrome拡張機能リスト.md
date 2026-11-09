---
date: 2026-11-09
updated: 2026-11-09
aliases: []
tags:
  - note/publish
description: 使用しているGoogle Chromeの拡張機能をまとめたリスト。
---

- [Ad Guard 広告ブロッカー](https://chromewebstore.google.com/detail/adguard-adblocker/bgnkhhnnamicmpeenaelnjfhikgbkllg)
	- 色々試したが一番良い感じに広告をブロックしてくれる
- [Bitwarden](https://bitwarden.com/)
	- 昔から使っているパスワード管理アプリの拡張機能
	- 無料
- [Google 翻訳](https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb)
- [Obsidian Web Clipper](https://obsidian.md/)
	- 後で見るのかわりに
- [Video Speed Controller](https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk)
	- あらゆるビデオの速度をキーボードで変えることができる
	- 長らく一軍にいる神拡張機能
- [Show Youtube comment while watching](https://chromewebstore.google.com/detail/show-youtube-comments-whi/gonknbphdaoahjnamfjpaincammofgae)
	- Youtubeのコメントを右に移動する
- [Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb)
	- ブラウザの操作を全てキーボードで完結する
	- iでinsert modeにすると他の拡張機能やブラウザのキーと競合しなくなる
	- 慣れると非常に快適
- [Zotero Connector](https://www.zotero.org/)
	- 論文をワンコマンドでZoteroに保存する
	- 一応入れているがpdfから取得した方が正確な気がしてあまり使用していない
- [Don't Close Window With Last Tab](https://chromewebstore.google.com/detail/dont-close-window-with-la/dlnpfhfhmkiebpnlllpehlmklgdggbhn)
	- 最後のタブを閉じても自動で新規タブが残る
	- Chromeは開きっぱなしにしたいので
- [Vim Home](https://github.com/masaki39/vim-home)
	- 自作拡張機能
	- 新規タブページに表示されるブックマークランチャー
	- Vim操作でブックマークとかサイトを開くために作成

> [!note]- Obsidian Web Clipperの設定
> 
> 🔗の絵文字のプレフィックスと日付、OGP画像が入るようになっている。その他はデフォルトからあまり変えていない。
>
> ```json
> {
> 	"schemaVersion": "0.1.0",
> 	"name": "デフォルト",
> 	"behavior": "create",
> 	"noteContentFormat": "{{content}}",
> 	"properties": [
> 		{
> 			"name": "date",
> 			"value": "{{date}}",
> 			"type": "date"
> 		},
> 		{
> 			"name": "published",
> 			"value": "{{published}}",
> 			"type": "date"
> 		},
> 		{
> 			"name": "tags",
> 			"value": "clippings",
> 			"type": "multitext"
> 		},
> 		{
> 			"name": "title",
> 			"value": "{{title}}",
> 			"type": "text"
> 		},
> 		{
> 			"name": "description",
> 			"value": "{{description}}",
> 			"type": "text"
> 		},
> 		{
> 			"name": "source",
> 			"value": "{{url}}",
> 			"type": "text"
> 		},
> 		{
> 			"name": "author",
> 			"value": "{{author|split:\\\", \\\"|wikilink|join}}",
> 			"type": "multitext"
> 		},
> 		{
> 			"name": "image",
> 			"value": "{{image}}",
> 			"type": "text"
> 		}
> 	],
> 	"triggers": [],
> 	"noteNameFormat": "🔗{{date|date:\"YYYY-MM-DD\"}}_{{title}}",
> 	"path": "Clippings"
> }
> ```

テーマも自作している→[Chrome Themes](https://github.com/masaki39/chrome-themes)
Tokyo Nightカラーを使用している。自作にしたメリットとしてアクティブタブの色を変更して明確にわかるようになった。

> [!quote] [[📘Google Chromeのテーマを自作する]]
