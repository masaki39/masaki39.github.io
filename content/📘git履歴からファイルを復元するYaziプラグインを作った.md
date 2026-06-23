---
date: 2026-03-13
updated: 2026-03-13
aliases: []
tags:
  - note/publish
description: git-time-machine.yaziは、Yaziのファイルマネージャー上でfzfとdeltaを使ってgit履歴からファイルを復元できるプラグインです。
---

# はじめに

Yaziでファイルを眺めていると、「あれ、このファイル前はどんな内容だったっけ？」と思うことがある。`git log`でコミット履歴を見てもいいが、ターミナルを行ったり来たりするのは面倒だ。そこで、Yazi上でgit履歴を辿ってファイルを復元できるプラグイン `git-time-machine.yazi` を作った。

# git-time-machine.yaziとは

[git-time-machine.yazi](https://github.com/masaki39/git-time-machine.yazi)は、Yaziのファイルマネージャー上でgit履歴からファイルを復元するプラグインである。ホバーしているファイルに対してキーバインドを押すと、fzfによるコミット一覧が表示され、deltaによるdiffプレビューを確認しながら復元するバージョンを選択できる。

![](https://github.com/masaki39/git-time-machine.yazi/releases/download/v0.1.0/demo.gif)

主な機能は以下のとおり。

- fzfによるインタラクティブなコミット選択
- deltaによるシンタックスハイライト付きdiffプレビュー（deltaがない場合は`git diff --color=always`にフォールバック）
- `git log --follow`によるリネーム追跡
- 上書き前の確認ダイアログ
- macOS・Linux・Windows対応

# インストール

## 必要なツール

| ツール名 | 用途 |
|:--------|:----|
| `git` | git操作全般 |
| `fzf` | コミット一覧のインタラクティブ選択 |
| `delta` | シンタックスハイライト付きdiffプレビュー（任意） |

## プラグインのインストール

```sh
ya pkg add masaki39/git-time-machine
```

## キーバインドの設定

`~/.config/yazi/keymap.toml`に以下を追記する。

```toml
[[mgr.prepend_keymap]]
on  = ["g", "t"]
run = "plugin git-time-machine"
desc = "Git time machine (restore file from history)"
```

ここでは`g` → `t`（git time-machineの略）をキーバインドとして設定しているが、好みで変更して構わない。

# 使い方

gitリポジトリ内のファイルにホバーした状態でキーバインドを押すと、そのファイルに関するコミット一覧がfzfで表示される。コミットを選択するとdeltaによるdiffプレビューが表示され、Enterを押すと確認ダイアログの後にファイルが復元される。

| キー | 操作 |
|:----|:----|
| `Enter` | 選択したコミットのバージョンにファイルを復元 |
| `Esc` | キャンセル |
| `ctrl-j` / `ctrl-k` | 下 / 上に移動 |
| `ctrl-r` | 検索クエリをクリア |

# おわりに

ターミナルを離れることなく、Yazi上でgit履歴を辿ってファイルを復元できるようになった。「ちょっと前のバージョンに戻したい」という場面で気軽に使えるので、ぜひ試してみてほしい。
