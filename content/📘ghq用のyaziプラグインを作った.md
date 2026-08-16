---
date: 2026-02-21
updated: 2026-02-21
aliases: []
tags:
  - note/publish
description: ghqとfzf連携によるYaziプラグインの作成と、GitHubリポジトリの整理・管理を効率化するツールに関する記事。
---

# はじめに

GitHubのリポジトリが徐々にふえてきて、PCが散らかってきた。Privateのリポジトリも含めたら30個以上になっている。ちゃんと整理してクローンすればよいのだが、いかんせん整理整頓は適当なのでしょうがない。と思っていたら、ローカルリポジトリをきれいに並べるツールがあるようだった。

[![リポジトリ多すぎてとっ散らかる問題をghqで解決！](https://ogpf.vercel.app/c?url=https://qiita.com/suin/items/52fa8bfd6e56f024cb9f&layout=vertical)](https://qiita.com/suin/items/52fa8bfd6e56f024cb9f)

こんなドンピシャな記事があるものだろうか。単純にgit cloneの代わりにghq getを使えばディレクトリを勝手に整理整頓して管理してくれるらしい。

# fzfとの連携

記事にも書いてあるが、fzfと連携すると非常に便利。

```zsh
gq() {
  local target=$(ghq list -p | fzf)
  if [ -n "$target" ]; then
    cd "$target"
  fi
}
```

これは単純なロジックの割に便利なので、Yazi上でもやりたいところ。しかし先行プラグインは検索しても見つからない。

# プラグインを自作する

luaは全然わからないが、ロジックが滅茶苦茶単純な上にbunny、zoxideなどのfzf連携プラグインのソースコードが公開されているので、それをもとにClaude Codeと相談しながら作った。

[![repository](https://ogpf.vercel.app/c?url=https://github.com/masaki39/ghq.yazi)](https://github.com/masaki39/ghq.yazi)

できた。いかんせんやりたいことがシンプルなので、すぐにできた。

# おわりに

ghqはあるとちょっと嬉しいツール。サブモジュールまでは上手くできないっぽい。
