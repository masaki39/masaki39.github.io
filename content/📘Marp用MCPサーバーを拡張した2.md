---
date: 2026-02-07
updated: 2026-02-09
aliases: []
tags:
  - note/publish
description: Marpスライド作成支援ツールMCPサーバーの拡張版として、LLM連携時のレイアウト崩れを防ぐため、引数制御でCSS/HTMLを活用したリッチな固定レイアウトテンプレート（例：カードレイアウト）を追加した開発記録。
---

# はじめに

本記事は[[📘Marp用MCPサーバーを拡張した]]の続編記事になる。Marpというのはマークダウンでテキストを記載するとそれだけでスライドになるという便利ツールである。

> [!quote] 過去記事
> - [[📘Marp cliを導入する]]
> - [[📘marp-cliによる爆速スライド作成のTips]]
> - [[📘MarpスライドをMCPでコントロールしてみる]]

![Marp スライド例](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/clipboard-image-2025-06-06T11-46-49-306Z.webp)

このMarp、素早くスライドを作るのに便利でよく使っている。テキストベースなので最近流行りのLLMスライド作成にも向いている。ただしLLMにスライドを作らせるとレイアウトを認識できないのでとにかく枠からはみ出るという問題が存在し、それを解決するためにレイアウトの型をガチガチに固めるMCPサーバーを作ったりしていた。LLMには｢layout=title, header=発表タイトル, subtitle=サブタイトル｣みたいなコンテンツの中身だけ出力させて、それを基にプログラムでマークダウンを書くというMCPサーバーだ。文字数上限や要素が決まるのでレイアウトが固定される。

前回の記事ではテーマごとのレイアウトを追加した。

![marpのテーマ比較画像](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20251117221105.webp)

# 更新のMotivation

これで基本的なレイアウトに関してはまぁ問題なくなっていたのだが、最近このような記事を見かけた。

[![marp記事](https://ogpf.vercel.app/c?url=https://qiita.com/hirokidaichi/items/243bd176b84900f4cc0d&layout=vertical)](https://qiita.com/hirokidaichi/items/243bd176b84900f4cc0d)

やりこみがすごい。

ただ、Skillsみたいなプロンプトベースで作り込んだりレイアウトのフォールバックを組むならコードベースで作り込むほうが効率と再現性が良いと思うので、既存のMarp-MCPでもう少しなんとかならないか考えた(もちろん前者の方が自由度は高い)。

# できる条件が整っている

幸い、テーマに対応した時にサーバー起動コマンドのargumentsを変更すると使用できるlayoutの種類が切り替わる仕組みができていた。さらに今月はClaudeのOpus4.6の無料クレジットが$50プレゼントされているので、これを利用してCSSとHTMLでリッチにしたスライドをLLMに書かせて固定レイアウトとして登録する。

新規のargumentは`-s`もしくは`--style`で、今回追加したstyle名は`rich`とした。例えば下記の用にMCPサーバーとして登録する。

```json
{
  "command": "npx",
  "args": [
    "-y",
    "@masaki39/marp-mcp@latest",
    "-s",
    "rich"]
}
```

![カードレイアウト](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260207234337.webp)

例えばカードレイアウトだと上記の画像の様になる。その他、[README](https://github.com/masaki39/marp-mcp)からレイアウト例集が見れる。

# メリット･デメリット

今回の対応のメリット

- 今後実質無制限にスライドのパターン集を増やせる
- 複雑なレイアウトのテンプレートが使える
- CSS依存がない(defaultテーマで動く想定のarguments)

デメリット

- マークダウンファイルに直接CSSやHTMLが書かれる
- 人力編集難易度が上がる
- 複雑なレイアウトの出力は賢いモデルじゃないと上手くできないかも？

# 作成例(2026-02-09追記)

｢適当にWeb検索してスライド作って｣と頼んででてきたスライドがこちら。

<iframe 
    src="https://docs.google.com/viewer?url=https%3A%2F%2Ffiledn.com%2FlF97wFVWosQpHEoDAbvva0h%2Fslides%2F%25E2%2596%25B6%25EF%25B8%258F2026-02-06_marp-mcp%25E3%2583%2586%25E3%2582%2599%25E3%2583%25A2.pdf&embedded=true" 
    width="100%" 
    height="400px" 
    style="border: none;">
</iframe>

埋め込み画像もSVGで書かせれば勝手に書いてくれる。強い。

# おわりに

後方互換性はあるので、とりあえず使っていこう。
