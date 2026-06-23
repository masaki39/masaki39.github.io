---
date: 2025-04-11
updated: 2025-04-11
aliases: []
tags:
  - note/publish
---

# はじめに

最近にわかに流行ってきているMCPにキャッチアップしようと考えている。

# ObsidianのMCPサーバーをClaudeデスクトップに追加する

ObsidianとClaude Desktopを連携させると、これまで書きためたノートをもとに、Claude AIがより深く文脈を理解した回答や提案ができるようになる。自分の知識やアイデアの蓄積をAIが活用できるようになるのは非常に便利である。

また、ノートの整理や編集もスムーズになる。AIが関連情報をつなげたり、新しい視点を提示してくれるので、思考が深まり、より創造的な活用が可能となる。

このセクションは完全に[Obsidian と Claude Desktop を MCP で連携させる](https://takeyamasaaki.hatenablog.com/entry/2025/03/12/214426)の受け売りである。

## 1. 必要なソフトウェアのインストール

まず、以下のソフトウェアをインストールする必要がある：

- [Obsidian](https://obsidian.md/)
- [Claude Desktop](https://claude.ai/download)

## 2. Obsidianプラグインのインストール

Obsidianで以下のプラグインをインストールする：

### MCP Toolsプラグイン

1. Obsidianの設定 → コミュニティプラグイン → 閲覧
2. 「mcp」で検索
3. 「インストール」→「有効化」→「オプション」を選択
   ※この時点では「Install server」ボタンを押さないこと

### Local REST APIプラグイン

1. 設定 → コミュニティプラグイン → 閲覧
2. 「Local REST API」で検索
3. インストールして有効化

### MCPサーバーのインストール

1. MCP Toolsプラグインのオプションに戻る
2. 「Install server」をクリック
3. 「MCP Server v0.x.xx is installed」というメッセージが表示されれば成功

必要に応じて、Smart ConnectionsとTempleterプラグインもインストールするとよい。

## 3. Claude Desktopとの連携設定

1. Claude Desktopを起動し、アプリの設定を開く
   - Macの場合：アプリメニューから「Settings...」
   - Windowsの場合：アプリウィンドウ左上の横三本線メニューから「Settings...」
2. 「Developer」セクションに移動し、「obsidian-mcp-tools」が「running」と表示されていることを確認
3. Settings画面下部の「Edit Config」をクリック
4. 表示されるclaude_desktop_config.jsonファイルをエディタで開く
5. 以下のように編集：

```json
{
  "mcpServers": {
    "obsidian-mcp-tools": {
      "command": "MCPサーバーの実行ファイルのパス",
      "env": {
        "OBSIDIAN_API_KEY": "API キー",
        "vaultPath": "保管庫(Vault)のパス"
      }
    }
  }
}
```

※ `"OBSIDIAN_API_KEY"` の行末にカンマをつけることを忘れてはならない。JSONの構文エラーの原因となる。

## 4. 動作確認

1. ObsidianとClaude Desktopをいったん完全に終了する（メニューバーやタスクトレイに残っている場合も含む）
2. 両方のアプリを再起動
3. Claude Desktopで「現在開いているノートを編集して」と入力
4. 「Allow for this Chat」をクリックして許可
5. Obsidianのノートが編集されたことを確認する

これにてObsidianとClaude Desktopの連携が完了した。

# filesystemサーバーの追加によるファイルアクセスの拡張

MCPを活用する次のステップとして、Claude Desktopがローカルファイルシステムにアクセスできるよう「filesystem」サーバーを追加した。これにより、デスクトップやダウンロードフォルダなどのディレクトリに存在するファイルを、Claude AIに参照・操作させることが可能となる。

## 1. filesystemサーバーの概要

filesystemサーバーは、Model Context Protocol (MCP)を実装したNode.jsサーバーである。このサーバーを使用することで、以下の操作が可能となる：

- ファイルの読み取り/書き込み
- ディレクトリの作成/一覧表示/削除
- ファイル/ディレクトリの移動
- ファイルの検索
- ファイルメタデータの取得

セキュリティを考慮し、このサーバーは設定で明示的に指定されたディレクトリ内のみでの操作を許可する。

## 2. Claude Desktopへのfilesystemサーバーの追加

Docker方式もあるが、今回はNPX方式を使用した。
Claude Desktopの設定ファイル（claude_desktop_config.json）に以下の設定を追加する：

### NPXを使用する方法

```json
{
  "mcpServers": {
    "obsidian-mcp-tools": {
      // 既存の設定...
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/ユーザー名/Desktop",
        "/Users/ユーザー名/Downloads"
      ]
    }
  }
}
```

※ NPX方式を使用する場合は、Node.jsが事前にインストールされている必要がある。Node.jsをインストールしていない場合は、[公式サイト](https://nodejs.org/)からダウンロードしてインストールすること。

※ 環境に応じてパスを適切に変更すること。Windowsの場合は、`/Users/ユーザー名/...`を`C:\Users\ユーザー名\...`のように変更する必要がある。

## 3. セキュリティ上の考慮事項

filesystemサーバーを追加する際は、以下のセキュリティ上の考慮事項に留意する必要がある：

1. アクセスを許可するディレクトリは必要最小限に制限する
2. 機密情報を含むディレクトリへのアクセスは避ける
3. 必要に応じて読み取り専用設定を検討する

## 4. 動作確認

設定を追加した後、Claude Desktopを再起動し、以下のようなプロンプトでファイルシステムへのアクセスをテストできる：

1. 「デスクトップ上のファイル一覧を表示して」
2. 「ダウンロードフォルダにあるPDFファイルを検索して」
3. 「デスクトップ上の特定のテキストファイルの内容を読み取って」

Claude AIが指定されたディレクトリ内のファイルやフォルダにアクセスできることを確認する。

これにより、Claude DesktopはObsidianのノートだけでなく、ローカルファイルシステム上の多様なファイルを参照・活用できるようになり、より多くの情報源に基づいた高度な支援が可能となる。

# Brave SearchサーバーによるWeb検索機能の追加

Claude Desktopの能力をさらに拡張するため、Brave Search APIを利用したWeb検索機能を追加した。これにより、Claude AIがリアルタイムのインターネット情報にアクセスし、最新の情報に基づいた回答や提案を行うことが可能となる。

## 1. Brave Search APIキーの取得

Brave SearchサーバーをClaudeで利用するためには、まずBrave Search APIのキーを取得する必要がある：

1. [Brave Search API](https://brave.com/search/api/)にアクセスしてアカウントを作成
2. プランを選択（無料プランでは月間2,000クエリまで利用可能）
3. [開発者ダッシュボード](https://api.search.brave.com/app/keys)からAPIキーを生成

## 2. Claude DesktopへのBrave Searchサーバーの追加

Claude Desktopの設定ファイル（claude_desktop_config.json）に以下の設定を追加する：

```json
{
  "mcpServers": {
    "obsidian-mcp-tools": {
      // 既存の設定...
    },
    "filesystem": {
      // 既存の設定...
    },
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

※ `"YOUR_API_KEY_HERE"`の部分に、先ほど取得したBrave Search APIキーを入力すること。また、NPX方式を使用するためにはNode.jsが必要である。

## 3. Brave Searchサーバーの機能

このサーバーは主に以下の二つの検索機能を提供する：

### Web検索（brave_web_search）

一般的なインターネット検索で、ニュース、記事、ウェブページなど幅広い情報を検索できる。

### ローカル検索（brave_local_search）

飲食店、ビジネス、サービスなど、地域に根ざした情報を検索できる。検索結果がない場合は自動的にWeb検索にフォールバックする。

## 4. 動作確認

Claude Desktopを再起動した後、以下のようなプロンプトで検索機能をテストできる：

1. 「最新の気候変動に関するニュースを教えて」
2. 「東京都内の評価の高いイタリアンレストランを探して」
3. 「人工知能の最新研究動向について調べて」

Claude AIがインターネットから情報を取得し、質問に対する回答を提供することを確認する。

# PubMed MCPサーバーによる医学論文検索の追加

医学・生物学分野の研究や情報収集を強化するため、PubMed検索機能をClaude Desktopに追加した。これにより、3,500万件以上の医学論文や生命科学ジャーナルの引用情報にアクセスすることが可能となる。
公式のサーバーはまだ存在せず、コミュニティサーバーから良さそうのを選んだ。セキュリティが気になる場合は公式の登場を待つほうが良いだろう。

## 1. 前提条件

PubMed MCPサーバーを使用するには、uvというPythonパッケージマネージャが必要である。まだインストールしていない場合は、以下の手順でインストールする：

1. ターミナル（またはコマンドプロンプト）を開く
2. 以下のコマンドを実行：

```
curl -sSf https://astral.sh/uv/install.sh | bash
```

または

```
pip install uv
```

Homebrewなら

```
brew install uv
```

## 2. Claude DesktopへのPubMed MCPサーバーの追加

Claude Desktopの設定ファイル（claude_desktop_config.json）に以下の設定を追加する：

```json
{
  "mcpServers": {
    "obsidian-mcp-tools": {
      // 既存の設定...
    },
    "filesystem": {
      // 既存の設定...
    },
    "brave-search": {
      // 既存の設定...
    },
    "pubmedmcp": {
      "command": "uvx",
      "args": ["pubmedmcp@latest"],
      "env": {
        "UV_PRERELEASE": "allow",
        "UV_PYTHON": "3.12"
      },
      "PATH": "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin"  // uvコマンドのパスがある場所を指定
    }
  }
}
```

※ `"PATH"`の値は環境によって異なるため、動作しない場合はuvコマンドが存在するディレクトリパスを指定すること。Windowsの場合は適宜パスを変更する必要がある。

## 3. PubMed MCPサーバーの機能

このサーバーは主に以下の機能を提供する：

- PubMedデータベースからの論文検索
- 論文のアブストラクト（要約）の取得
- 著者、ジャーナル名、発行日などのメタデータへのアクセス
- 特定のキーワードやフィルタに基づいた検索

## 4. 動作確認

Claude Desktopを再起動した後、以下のようなプロンプトでPubMed検索機能をテストできる：

1. 「新型コロナウイルスに関する最新の研究論文を検索して」
2. 「癌免疫療法の最新動向について調べて」
3. 「糖尿病と認知症の関係に関する研究を探して」

Claude AIがPubMedデータベースから医学・生物学の論文情報を取得し、専門的な質問に対する回答を提供することを確認する。

これにより、医療従事者、研究者、あるいは健康や医学に関心のある一般ユーザーが、最新の医学知見にアクセスし、より根拠に基づいた情報を得ることが可能となる。

# その他のMCPサーバーの探し方

Obsidianだけでなく、様々なアプリケーションやサービスとAIを連携させるためのMCPサーバーが開発されている。以下の場所から必要なMCPサーバーを探すことができる：

## 1. GitHub公式リポジトリ

[modelcontextprotocol/servers: Model Context Protocol Servers](https://github.com/modelcontextprotocol/servers)

このGitHubリポジトリには、公式にサポートされているMCPサーバーが一覧化されている。リポジトリにはサーバーのソースコードとインストール手順が含まれており、技術的な知識がある者であれば、自らビルドしてカスタマイズすることも可能である。

## 2. MCP公式ウェブサイト

[MCP Servers](https://mcp.so/)

MCP公式ウェブサイトでは、利用可能なMCPサーバーの一覧を閲覧できる。ここでは各サーバーの機能や互換性、インストール方法などの情報が提供されている。ユーザーフレンドリーな検索機能も備わっているため、特定のアプリケーションやサービスと連携するためのサーバーを容易に見つけることができる。

MCPエコシステムは急速に成長しており、新しいサーバーが定期的に追加されている。最新の情報や更新については、これらの公式リソースを定期的に確認することを推奨する。

## 参考資料

- [Obsidian と Claude Desktop を MCP で連携させる](https://takeyamasaaki.hatenablog.com/entry/2025/03/12/214426)
- [Model Context Protocol (MCP) 公式サイト](https://mcp.so/)
- [MCP GitHub リポジトリ](https://github.com/modelcontextprotocol/servers)
- [filesystem MCP サーバー](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- [Brave Search MCP サーバー](https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search)
- [PubMed MCP サーバー](https://github.com/grll/pubmedmcp)

# Claudeの整備

とりあえず３つのプロジェクトを作ってみた。

![[📘Claude+MCPを使ってみた-1744380234157.webp]]

Obsidian上にプロンプトをかいて、それを読み込むという形式にして柔軟に変更可能とした。

## PubMed検索

カスタムプロンプトで、常にObsidianのプロンプトを読み込む

![[📘Claude+MCPを使ってみた-1744380524253.webp]]

検索して

![[📘Claude+MCPを使ってみた-1744380446694.webp]]

文献をまとめて出力する。

![[📘Claude+MCPを使ってみた-1744380467249.webp]]

## ニュースチェック

同様にカスタムプロンプトに登録した用に動いてもらう。

![[📘Claude+MCPを使ってみた-1744380588819.webp]]

# おわりに

まだMCPサーバーの向上で進化の余地がある。
とりあえず今月はClaude課金して使ってみることにする。
