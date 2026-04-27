---
date: 2026-04-27
updated: 2026-04-27
aliases:
tags:
  - note/publish
description: MacのキーカスタマイズツールKarabiner-Elementsの導入記録。Escで英数を同時送信する設定、Hyperkey、疑似テンキー、hjkl矢印キー割り当てなど実践的な設定を紹介。
---

# はじめに

[Karabiner-Elements](https://karabiner-elements.pqrs.org/)はMacのキー配置をカスタマイズできるツールである。少し前にVimを始めてからいつかは導入しないといけないと思っていたが、億劫でやっていなかった。

[![](https://ogpf.vercel.app/c?url=https://karabiner-elements.pqrs.org/&layout=vertical)](https://karabiner-elements.pqrs.org/)

[[📘【Raycast】Hyper Keyを設定する]]でCaps LockをEscに変更し、[Google日本語入力の設定でEscでIMEを無効化](https://zenn.dev/vim_jp/articles/e038e42b0e78d5#esc-%E9%80%A3%E6%89%93%E3%81%A7-normal-mode-%2B-ime-%E3%82%AA%E3%83%95%E3%82%92%E4%BF%9D%E8%A8%BC%E3%81%99%E3%82%8B)して凌いでいた。しかしこれはあくまで付け焼き刃に過ぎず、Karabiner-Elementsを使えば全て解決できる問題が山積してきたので、重い腰をあげて導入してみた。

結論から言うと、｢早めに導入すればよかった｣。

# セットアップ

```zsh
brew install --cask karabiner-elements
```

幾つか権限の設定を案内どおりに行えば完了する。`~/.config/karabiner/karabiner.json`に設定を書き込めば良い。今の時代LLM任せが一番楽だと思われる。

> [!caution] 
> dotfilesなどにシンボリックリンクを送っている状態でGUIで設定を追加するとシンボリックリンクが上書きされるので注意。

# Escで英数を送る

Google日本語入力の設定でEscでIMEを無効化する場合、一度に送られるキーは1個ずつなので、insert modeでEscを押すとまずIMEが無効化され、もう一度Escを押して初めてinsert modeを抜けられる。つまり**2回叩かないといけない**という問題がある。

ここでKarabiner-Elementsを使用して、CapsLockを｢japanese_eisuu→esc｣と2つのキーを送るようにすると**1回で済む**ようになる。これは非常に快適である。

> [!note] アプリ切り替え時
> アプリ切り替え時のIMEの制御はHammerspoonの自作Spoon(プラグイン)の[Hanten](https://github.com/masaki39/hanten)を使用しているので、隙がなくなった。

# Hyperkeyの位置

Caps Lockを長押しでHyperkeyにする場合、ちょっと遠い。単押しEscはまぁ良いとして、modifierとしてはちょっと小指がきつい。そこで長押しHyperkeyにjapanese_eisuuも追加した。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=caps%2Ceisu)

# 10キーみたいなものを作る

ノートパソコン疑似テンキーを作ることにした。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=p%2C%40%2C%5B%2C%3B%2C%3A%2C%5D%2C.%2C%2F%2C_%2Ccmd-r)

- Ctrl + L-Shiftをmodifierにして0~9を入力する。
- R-ShiftをmodifierにしてShift+0~9を入力する。
- fnをmodifierにしてfn+Fキーを入力する(-^¥が10~12)。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=ctrl%2Cshift-l%2Cfn%2Cshift-r)

これを追加することで、10キー配置ではないキーボードでも電卓のように使えるようになり、地味によく使う「"」や「!」などの特殊文字も打ちやすくなった。

# 矢印キーをhjklに割り当てる

hjklに慣れると矢印キーがすごく遠く感じる。個別設定しても良いが、常にhjklが使えてほしいのでCtrl+hjklを矢印キーの代わりにした。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=ctrl%2Ch%2Cj%2Ck%2Cl)

# Fn→F10

Fnは単押しすることのないキーなので、比較的よく使うF10を配置する。

![Keyboard keybindings](https://keymap-fetcher.vercel.app/api/keymap?keys=fn)

# おわりに

ざっくりだが、とりあえずこれだけ設定してみた。Fキーと数字キー、矢印キーを押す必要がなくなりだいぶ快適度が増した。ザクがシャア専用ザクになってきたような感じだ。こういう｢絶対便利だけど設定が面倒くさそう｣な所にLLMを使うのが最近のマイブームである。
