---
date: 2025-11-17
updated: 2025-11-17
aliases: []
tags:
  - note/publish
description: MarpでAI連携を強化するMCPサーバーを拡張し、テーマ選択オプション、フロントマター生成ツール、ノート生成オプションを追加、テスト自動化でGitHub Pagesにサンプルスライドを公開し、スライド作成ワークフローを効率化。
---

# はじめに

2025年6月頃からMarpを用いてスライドを作成している。Marpはマークダウンファイルをスライドに変換するツールである。非常に高速にスライドを作ることができるので使用開始から半年足らずだが既に多大なメリットを実感している。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20251117215102.webp)
↑これまでMarpで作成したスライドたち

AIとの連携にも興味があり、少し前に[Marp用のMCPサーバー](https://github.com/masaki39/marp-mcp)を自作した。事前定義したレイアウトの型にはめることでAIの出力を安定させるサーバーだ。これが非常に使いやすく、ヘビーユーズしている。

> [!quote] [[📘MarpスライドをMCPでコントロールしてみる]]

今回、このMarp用のMCPサーバーにテーマ選択オプションを追加した。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20251117221105.webp)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20251117221114.webp)

テーマが変わるとサイズ感が変わるので、各要素の文字数上限や画像サイズを変更する必要がある。

# 使い方

基本的には[README](https://github.com/masaki39/marp-mcp)を参照。MCPサーバーは対応するAIクライアントのMCP設定ファイルにコマンドを書き込むことで使用できるようになる。

```json
{
  "mcpServers": {
    "marp-mcp": {
      "command": "npx",
      "args": ["-y", "@masaki39/marp-mcp"]
    }
  }
}
```

このとき`-t`もしくは`--theme`オプションを入れると、そのテーマ用のレイアウトが使用できるようになる。`--theme default`を省略した場合は`default`が使われる。

```json
{
  "command": "npx",
  "args": [
    "-y",
    "@masaki39/marp-mcp",
    "-t",
    "uncover"]
}
```

# その他で便利にしたこと

- フロントマター生成ツール: Marp特有のフロントマターを記入するMCPツールを作った。
- ノート生成オプション: スライドごとにコメント記法でノートを記入できる(AIに頼めばオプションでやってくれる)
- `npm test`で視覚的な確認: テスト時にサンプルmdを生成→`marp-cli`でHTML化という流れを自動化。生成したHTMLはそのままGitHub Pagesにデプロイされ、READMEのサンプルスライドに流用される。

# おわりに

今回テーマやレイアウトをあとからどんどん追加できる枠組みを作ったので、今後の拡張性は非常に高い。AIが事前定義されたレイアウトを基にMCPでスライド作成→直接編集し微調整(手動orAI)→複雑なスライドはパワポであとから組み込む。これが最速のスライド作成ワークフローだろう。
