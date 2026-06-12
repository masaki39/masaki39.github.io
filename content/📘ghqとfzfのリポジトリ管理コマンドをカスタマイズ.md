---
date: 2026-06-12
updated: 2026-06-12
aliases: []
tags:
  - note/publish
description: ghqとfzfを組み合わせたリポジトリ管理UIの構築。yaziプラグイン、Homebrew tapによる配布、FZF_DEFAULT_OPTSを使ったUIの統一設定について解説する。
---

# はじめに

[ghq](https://github.com/x-motemen/ghq) はローカルにおいてあるgitリポジトリを自動で整理してくれるツールで、数カ月前から滅茶苦茶愛用している。

何が便利かというと、git cloneの代わりにghq getコマンドを使用すると自動的に`ghq/github.com(host)/user名/repository名`みたいな構成に配置してくれる。

さらに、[[📘fzfが凄すぎる]]でも述べたがfzfとの相性が抜群で、例えば

```zsh
cd $(ghq list -p | fzf)
```

というコマンドを打つと、

![](https://i.gyazo.com/29f3a7edd67f8d89e3fc59511dec961c.webp)

のようにローカルリポジトリを検索しつつ移動みたいなことができてしまう。この時に対象になるのが、**`ghq/github.com(host)/user名/repository名`のディレクトリ構成をもつ全てのgitリポジトリ**であるということがポイントで、ローカルのみの解析リポジトリや実験的リポジトリも全て管理することができる。コードだけでなくgit管理しているObsidianのvaultなどももちろん対象になる。

# yaziのマイクロプラグイン

[[📘ghq用のyaziプラグインを作った]]で紹介したが、この機能は非常に便利なのでYaziからも使えるようにした。

> [!quote] [GitHub - masaki39/ghq.yazi: A Yazi plugin to navigate to ghq-managed repositories using fzf · GitHub](https://github.com/masaki39/ghq.yazi)

# Homebrew tap

そのまま使用してももちろん十分なのだが、[公式ドキュメント](https://junegunn.github.io/fzf/reference/#options)をみてみると非常に豊富なオプションが用意されている。せっかくなので、ドキュメントを読んでこれはと思ったオプション達を盛り盛りにしてみた。

このオプション盛り盛りバージョンはHomebrewで管理することにした。

> [!quote] [homebrew-tap/docs/ghq-fzf.md at main · masaki39/homebrew-tap · GitHub](https://github.com/masaki39/homebrew-tap/blob/main/docs/ghq-fzf.md)

![](https://i.gyazo.com/bc4ab685b4d143107e82f10ddc8eff1f.webp)

理由は

- 依存関係が増えた(fzf ghq eza gh)のをhomebrewが勝手にインストールしてくれる
- 一定以上複雑になったものは切り出さないと発展しない(と思っている)

という点である。特に配布目的ではないので設定は変更できないテンプレートでしかないが、fzfのカスタマイズを手軽に体験できると思うので、興味があれば見てみてほしいところだ。

## install

```zsh
brew tap masaki39/tap
brew install masaki39/tap/ghq-fzf
ghq-fzf install
```

.zshrcに設定読み込みのコードを書かないといけないが、折角シェルスクリプトを読み込むわけなので、ghq-fzf installのコマンドで自動でやってくれるようにした。

```zsh
export GHQ_FZF_FUNC='gv'
source "$(brew --prefix)/share/ghq-fzf/init.zsh"
```

のような感じで.zshrcに書き込まれ、この場合はgvと打つと起動するようになる。

# 環境変数の設定

今回ドキュメントを読んで知ったこととして、環境変数を.zshrcに設定すると**全てのfzfコマンド**に設定が反映されるということだ。

今回作成したHomebrew tapの設定の一部は.zshrcにも移植した。

```zsh
export FZF_DEFAULT_OPTS="
  --prompt='🔍️'
  --ghost='search...'
  --layout=reverse
  --style full:double
  --border
  --highlight-line
  --cycle
  --tiebreak=index
  --info=right
  --info-command=''
  --separator='―'
  --border-label ' FZF ' --list-label ' Result ' --preview-label ' Preview '
  --color 'bg:#1a1b26,bg+:#24283b,fg:#c0caf5,fg+:#c0caf5,hl:#7aa2f7,hl+:#7dcfff,border:#7aa2f7,label:#7aa2f7,list-border:#9ece6a,list-label:#9ece6a,preview-border:#bb9af7,preview-label:#bb9af7,input-border:#7dcfff,input-label:#7dcfff,header-border:#e0af68,header-label:#e0af68,footer:#f7768e,footer-border:#f7768e,footer-label:#f7768e,pointer:#ff9e64,marker:#9ece6a,gutter:#1a1b26,prompt:#7aa2f7,query:#c0caf5,info:#c0caf5,spinner:#ff9e64'
"
```

こうしておくことで、yaziやzoxideからのfzf系のコマンドのUIが統一されて変更される。

# おわりに

ここまで紹介した設定を組み合わせると、ターミナル操作でのリポジトリ管理が大幅に効率化される。どんなプロジェクトにもすばやくアクセスできる。

Homebrew tapで配布しているghq-fzfは設定変更不可のテンプレートだが、fzfのカスタマイズを手軽に体験する入口として活用してもらえると嬉しい。
