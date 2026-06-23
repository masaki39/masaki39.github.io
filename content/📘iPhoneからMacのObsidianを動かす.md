---
date: 2026-02-14
updated: 2026-02-14
aliases: []
tags:
  - note/publish
description: iPhoneからSSH接続やショートカットアプリを活用し、Obsidian CLIを用いてMac上のObsidianを遠隔操作・連携する方法を解説します。
---

# はじめに

最近Obsidian CLIが発表された。

> [!quote] [[📘Obsidian CLIが出た]]

CLIでObsidianが操作できるのならば、SSH接続でiPhoneからコマンドを送ればiPhoneからMacのObsidianを操作できるのでは、と考えた。

# Macの設定

![setting-remote-login](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214202316.webp)

Macには設定画面にリモートログインという項目があり、これをオンにするとネットワーク経由でのログインが可能になる。下にローカルホスト名`macbookair.local`と表示されているが、同一ネットワークであれば、この名前で探せば接続できるということのようだ。

# ショートカットアプリ

つぎに、iPhoneからショートカットアプリを使ってコマンドを送信する。｢SSH経由でスクリプトを実行｣というショートカットを使用する。

![shortcut-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214204331.webp)

`obsidian tasks daily`というコマンドを送信する。パスが通っていないので`which obsidian`でobsidianコマンドのフルパスを取得して入力する。ホスト名は先程のローカルホスト名、ポートはデフォルトの22、Macにログインするときのユーザー名とパスワードを入力する。

これを実行すると、

![shortcut-result-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214204849.webp)

のように今日のデイリーノートからタスクが抽出されて返ってくる。
Obsidian CLIに限らずコマンドは何でも実行可能だ。デイリーノートに何かを追加したり、検索したり可能性は無限大だ。

# Terminus

ローカルネットワーク内に限る場合、iPhoneからMacのSSH接続は非常に容易であることが分かった。では、iPhoneからMacのターミナルを操作するようなアプリもあるのではないか。App Storeで検索する。

｢ssh terminal｣

すると、Terminusというアプリが最もダウンロードが多そうだったので使用してみる。アカウントを適当に作ってConnectionを繋いでみる。

![terminus-connection](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214210900.webp)

Discover local devicesを選び、ユーザー名とパスワードでMacにログインする。

![terminal](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214211011.webp)

なんと無設定でMacのターミナルにログインできてしまった。

![zellij-session](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260214211054.webp)

当然の如く、ターミナルマルチプレクサのZellijのセッションにattachできる。

Terminusを使えば、ターミナルからObsidianを直接操作することもできるし、ObsidianのディレクトリのClaude Codeを操作することもできる。ZellijでMacでの作業を引き継ぐ事もできる。軽い気持ちで入れてみたら本稿の趣旨以上のことができるようになってしまった。

# ローカルネットワークの制約

ローカルネットワーク内でのSSH接続であるので制約はある。

- 同一ネットワークにiPhoneとMacが存在すること
- Macが閉じていないこと(システムスリープ)

前者に関してはテザリングでもいけるし、後者に対してはシステムスリープを防ぐコマンド`caffeinate -i`で対策できる。

# おわりに

iPhoneでMacを操作できるようになった。Obsidian CLIの発表は天啓であったと言わざるを得ない。