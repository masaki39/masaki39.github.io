---
date: 2026-09-18
updated: 2026-09-18
aliases: []
tags:
  - note/publish
description: 9月登場の低コスト・高速AI「Jev」を実機で試し、自然言語をCLIコマンドに即時変換する仕組み（Structured Output前提・Open Router使用）や自然言語インターフェース（nli）、候補選択にfzf、信頼性スコア付きの出力と超低コスト運用を解説する入門記事。
---

# はじめに

9月15日にJevというのが出たらしい。Structured Outputしかできない代わりに非常に安価で速度が速いAIということだった。せっかくなので少し触ってみた。

[![](https://ogpf.vercel.app/c?url=https://docs.typesafe.ai/introduction&layout=vertical)](https://docs.typesafe.ai/introduction)

# 何が向いてそうか

曖昧な定義なものを厳格な型つきのものに変換する。ということ「自然言語をCLIコマンドに即時変換する」というツールをとりあえず作ってみる。「natural-language-interface」と銘打ってみる。

[![](https://ogpf.vercel.app/c?url=https://github.com/masaki39/natural-language-interface)](https://github.com/masaki39/natural-language-interface)

仕組みは非常にシンプルで特に解説するほどのこともない。APIは汎用性を考えてOpen Routerのものを使うことにする。

# 自然言語でコマンドを出力させる。

例えば、

```zsh
nli gh リポジトリを開く
```

と打ってEnterを押すか、

```zsh
gh リポジトリを開く
```

と打って設定可能なキーを押すと、コマンドがJevに変換されるようにした。

```zsh
gh browse
```

と返ってくる。少し試したが良い感じだ。信頼性が低く、複数の候補がある場合はfzfから選べるようにした。

# おわりに

とにかく速い。OpenRouter経由で日本からの接続なので若干ラグはあるはずだがすぐに回答が得られる。次に、安い。500回以上リクエストしても0.1ドルもかからない。また、回答に信頼性の数値が付随してくるのが良い。

コマンドが分からないだけのことでいちいちLLMに聞く必要がなくなった。次々にbreakthroughが出てきて怖い。
