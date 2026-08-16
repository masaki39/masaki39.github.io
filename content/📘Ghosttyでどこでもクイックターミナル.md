---
date: 2026-04-15
updated: 2026-04-15
aliases: []
tags:
  - note/publish
description: Ghosttyのクイックターミナル機能を使えば、グローバルキーバインド一発でどのアプリからでもターミナルを呼び出せる。単発作業をさっと片付けたいときに便利な設定を紹介する。
---

# はじめに

以前の記事([[📘GhosttyのAppleScriptでdev環境を自動展開する]])では、Ghosttyで複数ペインの開発環境を一発展開する方法を紹介した。がっつり作業するための環境構築の話だ。

[![](https://ogpf.vercel.app/c?url=https://ghostty.org/&layout=vertical)](https://ghostty.org/)

一方で、「ちょっとコマンドを一本打ちたいだけ」という場面も多い。そのたびにGhosttyをDockからクリックしたりCmd+Tabで探したりするのは面倒だ。そこで使えるのがクイックターミナル機能である。

# クイックターミナルとは

クイックターミナルは、キーバインド一発でターミナルをオーバーレイ表示・非表示できる機能だ。

最大の特徴は**グローバルキーバインド**に対応していること。Ghosttyがフォーカスされていなくても、他のアプリを操作中でも、キーを押すだけでターミナルが前面に現れる。

![](https://i.gyazo.com/529a4a8d87f4ac8edc0f2d341c4de12d.webp)

ぱっとターミナルを召喚してぱっと消すことができる。

# 設定する

> [!quote] 参考
> [Configuration Reference - Ghostty](https://ghostty.org/docs/config/reference#quick-terminal-position)

設定ファイル(`.config/ghostty/config`)に以下を追記する。
下記の用にしてみた。

```
keybind = global:alt+space=toggle_quick_terminal
quick-terminal-position = center
quick-terminal-animation-duration = 0
quick-terminal-size = 90%,90%
quick-terminal-screen = macos-menu-bar
quick-terminal-autohide = false
```

⌥+Spaceで起動できる。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=opt%2Cspace)

各オプションの説明は以下の通り。

| オプション                               | 説明                                                        |
| ----------------------------------- | --------------------------------------------------------- |
| `keybind`                           | `global:` プレフィックスを付けるとGhostty非フォーカス時でも動作するグローバルキーバインドになる  |
| `quick-terminal-position`           | 表示位置。`top` / `bottom` / `left` / `right` / `center` から選べる |
| `quick-terminal-size`               | 幅・高さをそれぞれ画面に対する%で指定する                                     |
| `quick-terminal-screen`             | 表示するモニターを指定。`macos-menu-bar` はメニューバーがあるモニター（メインモニター）に表示する |
| `quick-terminal-animation-duration` | ポップアップ時のアニメーション時間(秒)。`0` で即時表示になる                         |
| `quick-terminal-autohide`           | `true` にするとフォーカスが外れたとき自動で非表示になる                           |

# おわりに

[[📘GhosttyのAppleScriptでdev環境を自動展開する|開発環境を展開する用途]]には複数ペインを使うが、クイックターミナルはその逆で「とにかく素早く単発の作業をする」ための機能である。グローバルキーバインドのおかげでどのアプリを使っていても一瞬でアクセスできるのが快適で、今ではかなり頻繁に使っている。
