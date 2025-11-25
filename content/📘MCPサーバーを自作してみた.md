---
date: 2025-05-04
updated: 2025-05-04
aliases: []
tags:
  - note/publish
---

# はじめに

 Model Context Protocol、通称MCPは2024年11月26日にAnthropic社が発表したオープンプロトコルである。

> [!quote] [Introducing the Model Context Protocol \ Anthropic](https://www.anthropic.com/news/model-context-protocol)

AIにMCPサーバーを通してAPIを使用する権限を与えることができる。例えば、検索機能のないAIにBrave検索のAPIを提供するMCPサーバーを登録すると、Brave検索ができるようになる。このように、AIのCapacityを大きく上げることができる画期的な機能である。

# MCPサーバーを自作しようと思い至るまで

私がMCPに触り始めたのは約1ヶ月前のこと。なぜか急にMCPの話題をよくみるようになり流行り始めた。MCPを発表したAnthropic社のClaude Desktopが最もMCPに適している状況であったので、お試しでClaude DesktopのProプランに契約してみた。MCPに対応しているClientはまだ少なく、現時点で対応しているClientはキャッチアップ力が高いと言える。

> [!quote] [Example Clients - Model Context Protocol](https://modelcontextprotocol.io/clients)

2025年3月にOpenAIもMCP対応することを発表しており、今後MCPないしは類似の規格によるAPI連携の流れは持続するだろう。

実際使ってみると、明らかにAIができる作業が増加することがわかる。そうなると過度な期待をしてしまいがちだが、実際はタスクをやらせてもその間見てないといけない上に正しいか確認しないといけないので、マニュアル作業に集中したほうが結局早いということは多々ある。一方で明らかに効率が高くなる分野があり、それは検索、翻訳、要約などの自然言語を処理する場面だ。

MCPサーバーの開発はすでにかなり活発で、現時点でも相当数が使用でき、検索やPDFデータへのアクセスができるものも当然のように多数含まれる。

- [modelcontextprotocol/servers: Model Context Protocol Servers](https://github.com/modelcontextprotocol/servers)
- [punkpeye/awesome-mcp-servers: A collection of MCP servers.](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP Servers](https://mcp.so/)
- [Smithery - Model Context Protocol Registry](https://smithery.ai/)

しかし中にはダウンロード即実行のnpxで起動するサーバーも多く、セキュリティリスクは完全に作者次第という危ない側面もある。公式のMCPサーバー以外はまだ使用しないほうがいいかもしれない。

また、Claude Desktop以外では何故か動かないMCPサーバーもちらほらある。私が頻用するCursorに入れてみても何故か動かなかったりエラーが出るサーバーによくでくわした。

色々書いたがまとめると、

- まだまだMCPの流れは続きそう
- 明らかにあると便利な場面がある
- 公式以外はセキュリティに若干の不安がある
- Cursorでも動いてほしい

という理由で自作するか...となったのであった。

# MCPサーバー作成手順

基本的には公式ドキュメント通りに進める。私はMacユーザーなのでWindowsとは若干のコマンドの違いがあることに注意が必要。

> [!quote] [For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart/server)

今回作るのはZoteroのローカルAPIを利用するサーバーである。

## 事前準備

- Python (3.10以上が推奨)
- uv
- Zotero
	- 設定からローカルAPIを有効にする項目にチェックしておく
	- Zotero起動中はローカルAPIが使用可能になる

## 環境設定

サーバーを置くディレクトリに移動しておいてからターミナルで下記を実行する。`zotero-mcp`は作成するサーバー名でOK

```python
# ディレクトリを作成
uv init zotero-mcp
cd zotero-mcp

# 仮想環境を立ち上げる
uv venv
source .venv/bin/activate

# 必要な依存関係を追加
uv add "mcp[cli]" httpx

# サーバーファイルを作成
touch zotero-mcp.py
```

これだけで環境準備が整う

## サーバーのビルド

`zotero-mcp.py`に色々書いて行く。最初に下記を記載する。

```python
# 必要なパッケージがあれば追加
from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("zotero-mcp")

# APIキーのベースを記載
ZOTERO_API_BASE = "http://localhost:23119/api/users/0/"
USER_AGENT = "zotero-mcp/1.0"
```

ここはテンプレみたいな感じ。上記の最低限必要なパッケージと他に必要なパッケージがあれば追加して`pyproject.toml`(依存関係を各場所っぽい)に記載。APIのベースとなるキーを書く。

次にMCPツールを定義する。書き方は下記の用に`@mcp.tool()`からはじめて関数定義して、下に自然言語で役目を記載する。こうして文脈情報を渡すようだ。

```python
@mcp.tool()
async def name_of_mcp_tool () -> Any;
	"""ツールの役目を自然言語で書く"""
	# 以下関数定義
	return result
```

最後に下記を記載する。

```python
if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport='stdio')
```

終わり。必要に応じてヘルパー関数を書いたり、mcpツールを増やしたりする。

## MCPサーバーの登録

```json
{
    "mcpServers": {
        "zotero-mcp": {
            "command": "uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/zotero-mcp",
                "run",
                "zotero-mcp.py"
            ]
        }
    }
}
```

これをClientのMCPの設定ファイルに追記する。

# 完成

いや、簡単すぎませんか。mcpツール作るだけとはいえ難易度に関しては拍子抜けであった。完成品はこちら。

> [!quote] [masaki39/zotero-mcp](https://github.com/masaki39/zotero-mcp/tree/main)

何時間かかかったけど、ほとんどZotero APIの使い方が初見だったうえに癖強かったからで、MCPサーバー自体にはほぼかかっていない。その後、Pubmed検索もつくってみたが、こちらは30分くらいでおわった。

私はほとんどObsidianくらいでしかコード書かないのでPython使えないし、APIも普段使うような人間ではないので、慣れた人なら10分くらいで終わりそうな気がする。

個人的Tipsは、関数の結果を解釈するのはAIなので結果が生データでもあまり問題ないという点、MCPツールを増やすとツール選択に難がでやすいので厳選するという点。

自分でMCPで機能構成できるならClientはほんとになんでもいいですね。
