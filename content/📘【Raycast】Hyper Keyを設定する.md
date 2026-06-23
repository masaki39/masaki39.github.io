---
date: 2026-01-19
updated: 2026-01-19
aliases: []
tags:
  - note/publish
description: RaycastにおけるCaps LockキーのHyper Key設定を通じて、ショートカットの競合を回避し、各種コマンドを割り当ててMacのキーボード操作効率を向上させる方法を解説。
---

# はじめに

Mac使い万人におすすめできるアプリRaycast。Mac上のどこからでも多彩なPC操作を行うことができる。

> [!quote] [[📘Mac必須級アプリRaycastとは]]

最近Vimに脳を焼かれて全てをキーボード起点にしたくなった私は、RaycastでHyper Keyを設定することにした。

# Hyper Keyとは

Raycastなどのランチャーアプリのコマンドをショートカットに設定する時、１つ問題が発生する。それは｢他のアプリとの競合｣である。そして、この問題を解決するためにHyper Keyを設定するという方法があるらしい。

要するに、`^⌥⇧⌘`の全ての修飾キーを同時押しするキーを１つ設定するということらしい。流石に４つの修飾キーを同時押しするショートカットを採用するアプリはないので、今回のような場合には最適である。

# 設定方法

キーバインディング系のツールを使わないといけないかと思ったが、Raycast自体にそのような機能があるようだ。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260119184422.webp)

設定からCaps LockキーをHyper Keyに設定する項目がある。さらに単押しでEscapeキーと認識させるオプションもある。Mac内で最も使わないのに押しやすくて邪魔なCaps Lockを最大限有効活用できるようになる。

# キーを考える

ここからはどういうショートカットを設定したかという私の一例である。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260119185152.webp)

- Clipboard History
	- 過去のコピー履歴を遡り検索できる
	- これは流石に必要
- Obsidianのコマンド
	- [[📘RaycastでObsidianのコマンドを実行する]]方法を使用する
	- 私は[Command Group](https://github.com/masaki39/obsidian-command-group)という自作プラグインでコマンドをまとめているので１個登録できたら十分
- Search Browser Bookmarks
	- 推しの拡張機能
	- ブラウザのブックマーク内を検索して開くことができる
	- これも入れておきたい
- ディスクを取り出す
	- ショートカットアプリ製
	- Time Machine用のHDDに毎日つなげるのであるとちょっと嬉しい
- Sleep
	- よく使うので必要

とりあえずこれくらいで。

## Window Management

Raycastの目玉機能の１つWindow Managementは`^⌥`で慣れきっているし、干渉したこともないし、キー設定も全て手に馴染みすぎているので、このままでいく。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260119185909.webp)

# おわりに

こういうのは設定を考えているときが一番楽しい。
