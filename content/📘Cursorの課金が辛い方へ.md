---
date: 2025-05-16
updated: 2025-05-16
aliases: []
tags:
  - note/publish
---

# はじめに

これはCursorに限った話ではないのだが、AIを実用的なレベルで使いたいと思うと課金も結構馬鹿にならない金額になる。基本サブスクや従量課金制なので、依存すると辞め時も分からなくなるのではと課金に二の足を踏む場合も多いだろう。

そういうとき、Google AI StudioやGemini APIを使えば、常識的な使用の範囲内では基本的に無料で使用することができる。このことはかなり広く認知されていると思っていたが、SNSで私が見ている層がかなり偏っているのか、意外とリアルでは知らない人が多いように思う。

# Google AI Studio

マルチモーダルなチャットボックスを使用する場合はGoogle AI StudioにGoogleアカウントでログインするだけで普通に使い切れないくらいのレートのトークンが使用できる。スマホからでも利用できる。

> [!quote] [Google AI Studio](https://aistudio.google.com/)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-05-16%2019.40.05.jpg)

# Gemini APIキーを取得

画面右上の`Get API key`をクリックするとAPI取得画面に移行する

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-05-16%2019.45.27.jpg)

特にクレカ登録とかもいらず、無料プランで簡単に発行できる。

# CursorにAPI Keyを登録する

設定画面から画像のように登録する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-05-16%2019.21.22.jpg)

これだけで課金しなくてもCursorでGeminiの使用ができるようになった。

# どれくらい使えるのか

> [!quote] [レート制限  |  Gemini API  |  Google AI for Developers](https://ai.google.dev/gemini-api/docs/rate-limits?hl=ja#free-tier)

公式サイトを見ると、Gemini2.5 Flashだと500回/日、10回/分のレート制限が設けられている。CursorのProプランでも500回/月であることを考えると、ライトユーザーが使う分には全く気にしなくて良さそう。

# 注意点

- GeminiのAPIで補えるCursorの機能はチャットボックスのみ
	- タブ補完やエージェント機能(ファイル操作)は使えないのでAskモードのみ
	- MCPサーバーは使えない
- GeminiのAPIは無料で使用できるが、やりとりは学習される

# おわりに

以前から無料ユーザーはGemini API使っとけばいい風潮はあったが、Gemini 2.5になって性能的に人におすすめしやすくなった。私がAPIキーを発行したのは2024年4月2日のようだが、正直Gemini 1.5時代は使おうと思えるレベルではなかった。私はCursorに課金をしているが、逃げ道をしっておいても損はない。
