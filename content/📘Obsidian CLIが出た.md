---
date: 2026-02-11
updated: 2026-02-11
aliases: []
tags:
  - note/publish
description: Obsidian CLIの導入方法や、LLM連携・自動化に役立つターミナル操作、詳細なコマンド一覧など、Obsidianをコマンドラインから活用する手法を解説します。
---

# はじめに

本日2026年2月11日に、[Obsidian CLI](https://help.obsidian.md/cli)がCatalystメンバー向けに公開された。なんとObsidianがターミナルで操作できるようになる。まだベータ版ではあるが、少し触ってみた。

# 使い方

設定で有効化してターミナルで`obsidian`と打つと起動する。

![起動画面](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260211101448.webp)

起動するといってもobsidianコマンドが打ちやすくなるだけで、ターミナルで直接`obsidian <command> [options]`と打つのと特に変わりはない。

# LLM連携

今までObsidianとLLMを連携するにはMCPサーバーを介する必要があったのだが、

```
Run `obsidian file && obsidian read` to get the active file from Obsidian.
```

のようにプロンプトに書いておくだけでLLMが現在のアクティブファイルを確認できるようになる。`obsidian daily:read`だとデイリーノートを確認できるし、`tasks daily`でデイリーノートのタスクを確認できる。可能性は無限大だ。

# スラッシュコマンドにする

Claude Codeのスラッシュコマンドにする。
`~/.claude/commands`に`obsidian_read.md`を作成する。

```
---
description: Read Obsidian active file
---
# Metadata
!`obsidian file`
# Content
!`obsidian read`
```

`~/.claude/settings.json`に`obsidian read`コマンドへの権限を付与する

```json
{
  "permissions": {
    "allow": [
      "Bash(obsidian file)",
      "Bash(obsidian read)"      
    ],
    "ask": [],
    "deny": []
  }
}
```

すると

![example of slash command](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260211112143.webp)

手動でもObsidianのアクティブファイルがClaude Codeに渡せるようになる。

# シェルスクリプト

`obsidian command id=<command-id>`でコマンドが実行できるので、シェルスクリプトでも実行できる。Raycastで実行する用のシェルスクリプトを作ってみる。

```sh
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Obsidian Leader Command
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 🤖

# Documentation:
# @raycast.author masaki39
# @raycast.authorURL https://github.com/masaki39

/Applications/Obsidian.app/Contents/MacOS/obsidian command id=<command-id>
```

パスは環境によって異なる。

![command selection modal](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260211113905.webp)

これをRaycastから実行する。
![leader command](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260211114026.webp)

Obsidian内部でコマンドが実行された(コマンド例は自作プラグインのもの)。
バックグラウンドで実行されるようなので、Obsidian画面に移動したい場合はURIスキームの方が良いかもしれない。

今後、コミュニティプラグインのコマンドへの引数の追加が期待される。

# Basesの連携強化

恐らくkepano氏がやりたかったのはこれだろう。

`obsidian base:query file="General.base"`

のように、baseのファイル名を指定したりすると、内部が`json`形式で出力できる。これが何を意味するかというと、これまではObsidian内でのみ使用可能だったBasesのデータベースが外部に出力して使用可能になるということだ。Basesのローカルデータベースとしての役割が強化されることになる。

# 使用可能なコマンド

`obsidian help`で確認できる。既にものすごく多い。今後もっと増えるのだろう。

> [!note]- ファイル・フォルダ操作
>
> | コマンド | 説明 |
> |---------|------|
> | `create [name=<name>] [path=<path>] [content=<text>] [template=<name>] [overwrite] [silent] [newtab]` | 新しいファイルを作成 |
> | `read [file=<name>] [path=<path>]` | ファイルの内容を読み取り |
> | `open [file=<name>] [path=<path>] [newtab]` | ファイルを開く |
> | `delete [file=<name>] [path=<path>] [permanent]` | ファイルを削除 |
> | `move [file=<name>] [path=<path>] to=<path>` | ファイルの移動または名前変更 |
> | `file [file=<name>] [path=<path>]` | ファイル情報を表示 |
> | `files [folder=<path>] [ext=<extension>] [total]` | Vault内のファイル一覧 |
> | `folder path=<path> [info=files\|folders\|size]` | フォルダ情報を表示 |
> | `folders [folder=<path>] [total]` | Vault内のフォルダ一覧 |
> | `append [file=<name>] [path=<path>] content=<text> [inline]` | ファイルの末尾にコンテンツを追加 |
> | `prepend [file=<name>] [path=<path>] content=<text> [inline]` | ファイルの先頭にコンテンツを追加 |

> [!note]- デイリーノート
>
> | コマンド | 説明 |
> |---------|------|
> | `daily [paneType=tab\|split\|window] [silent]` | デイリーノートを開く |
> | `daily:read` | デイリーノートの内容を読み取り |
> | `daily:append content=<text> [inline] [silent] [paneType=tab\|split\|window]` | デイリーノートの末尾にコンテンツを追加 |
> | `daily:prepend content=<text> [inline] [silent] [paneType=tab\|split\|window]` | デイリーノートの先頭にコンテンツを追加 |

> [!note]- リンク・参照
>
> | コマンド | 説明 |
> |---------|------|
> | `backlinks [file=<name>] [path=<path>] [counts] [total]` | ファイルへのバックリンク一覧 |
> | `orphans [total] [all]` | 被リンクのないファイル一覧 |
> | `deadends [total] [all]` | 発リンクのないファイル一覧 |
> | `unresolved [total] [counts] [verbose]` | Vault内の未解決リンク一覧 |

> [!note]- タグ・エイリアス
>
> | コマンド | 説明 |
> |---------|------|
> | `tags [all] [file=<name>] [path=<path>] [total] [counts] [sort=count]` | Vaultまたはファイルのタグ一覧 |
> | `tag name=<tag> [total] [verbose]` | タグ情報を取得 |
> | `aliases [all] [file=<name>] [path=<path>] [total] [verbose]` | Vaultまたはファイルのエイリアス一覧 |

> [!note]- プロパティ
>
> | コマンド | 説明 |
> |---------|------|
> | `properties [all] [file=<name>] [path=<path>] [name=<name>] [total] [sort=count] [counts] [format=yaml\|tsv]` | Vaultまたはファイルのプロパティ一覧 |
> | `property:read name=<name> [file=<name>] [path=<path>]` | ファイルからプロパティ値を読み取り |
> | `property:set name=<name> value=<value> [type=text\|list\|number\|checkbox\|date\|datetime] [file=<name>] [path=<path>]` | ファイルにプロパティを設定 |
> | `property:remove name=<name> [file=<name>] [path=<path>]` | ファイルからプロパティを削除 |

> [!note]- タスク管理
>
> | コマンド | 説明 |
> |---------|------|
> | `tasks [all] [daily] [file=<name>] [path=<path>] [total] [done] [todo] [status="<char>"] [verbose]` | Vaultまたはファイルのタスク一覧 |
> | `task [ref=<path:line>] [file=<name>] [path=<path>] [line=<n>] [toggle] [done] [todo] [daily] [status="<char>"]` | タスクの表示または更新 |

> [!note]- Base（データベース）
>
> | コマンド | 説明 |
> |---------|------|
> | `bases` | Vault内の全Baseファイル一覧 |
> | `base:views` | 現在のBaseファイル内のビュー一覧 |
> | `base:query [file=<name>] [path=<path>] [view=<name>] [format=json\|csv\|tsv\|md\|paths]` | Baseをクエリして結果を返す |
> | `base:create [name=<name>] [content=<text>] [silent] [newtab]` | 現在のBaseビューに新しいアイテムを作成 |

> [!note]- 履歴・バージョン管理
>
> | コマンド | 説明 |
> |---------|------|
> | `history [file=<name>] [path=<path>]` | ファイルの履歴バージョン一覧 |
> | `history:list` | 履歴のあるファイル一覧 |
> | `history:read [file=<name>] [path=<path>] [version=<n>]` | ファイル履歴バージョンを読み取り |
> | `history:restore [file=<name>] [path=<path>] version=<n>` | ファイル履歴バージョンを復元 |
> | `history:open [file=<name>] [path=<path>]` | ファイルリカバリを開く |
> | `diff [file=<name>] [path=<path>] [from=<n>] [to=<n>] [filter=local\|sync]` | ローカル/同期バージョンの一覧または差分表示 |

> [!note]- プラグイン
>
> | コマンド | 説明 |
> |---------|------|
> | `plugins [filter=core\|community] [versions]` | インストール済みプラグイン一覧 |
> | `plugins:enabled [filter=core\|community] [versions]` | 有効化されているプラグイン一覧 |
> | `plugins:restrict [on] [off]` | 制限モードの切り替えまたは確認 |
> | `plugin id=<plugin-id>` | プラグイン情報を取得 |
> | `plugin:enable id=<id> [filter=core\|community]` | プラグインを有効化 |
> | `plugin:disable id=<id> [filter=core\|community]` | プラグインを無効化 |
> | `plugin:install id=<id> [enable]` | コミュニティプラグインをインストール |
> | `plugin:uninstall id=<id>` | コミュニティプラグインをアンインストール |
> | `plugin:reload id=<id>` | プラグインをリロード（開発者向け） |

> [!note]- テーマ
>
> | コマンド | 説明 |
> |---------|------|
> | `themes [versions]` | インストール済みテーマ一覧 |
> | `theme [name=<name>]` | アクティブなテーマを表示または情報取得 |
> | `theme:set name=<name>` | アクティブなテーマを設定 |
> | `theme:install name=<name> [enable]` | コミュニティテーマをインストール |
> | `theme:uninstall name=<name>` | テーマをアンインストール |

> [!note]- CSSスニペット
>
> | コマンド | 説明 |
> |---------|------|
> | `snippets` | インストール済みCSSスニペット一覧 |
> | `snippets:enabled` | 有効化されているCSSスニペット一覧 |
> | `snippet:enable name=<name>` | CSSスニペットを有効化 |
> | `snippet:disable name=<name>` | CSSスニペットを無効化 |

> [!note]- ワークスペース・UI
>
> | コマンド | 説明 |
> |---------|------|
> | `workspace [ids]` | ワークスペースツリーを表示 |
> | `tabs [ids]` | 開いているタブ一覧 |
> | `tab:open [group=<id>] [file=<path>] [view=<type>]` | 新しいタブを開く |
> | `recents [total]` | 最近開いたファイル一覧 |
> | `random [folder=<path>] [newtab] [silent]` | ランダムなノートを開く |
> | `random:read [folder=<path>]` | ランダムなノートを読み取り |

> [!note]- コマンド・ホットキー
>
> | コマンド | 説明 |
> |---------|------|
> | `commands [filter=<prefix>]` | 利用可能なコマンドID一覧 |
> | `command id=<command-id>` | Obsidianコマンドを実行 |
> | `hotkeys [total] [all] [verbose]` | ホットキー一覧 |
> | `hotkey id=<command-id> [verbose]` | コマンドのホットキーを取得 |

> [!note]- Vault管理
>
> | コマンド | 説明 |
> |---------|------|
> | `vault [info=name\|path\|files\|folders\|size]` | Vault情報を表示 |
> | `vaults [total] [verbose]` | 既知のVault一覧 |
> | `reload` | Vaultをリロード |
> | `restart` | アプリを再起動 |
> | `version` | Obsidianバージョンを表示 |

> [!note]- その他
>
> | コマンド                     | 説明               |
> | ------------------------ | ---------------- |
> | `help`                   | 利用可能な全コマンドの一覧を表示 |
> | `web url=<url> [newtab]` | WebビューアーでURLを開く  |
>
> [!note]- 開発者向けコマンド
>
> | コマンド | 説明 |
> |---------|------|
> | `devtools` | Electron開発ツールを切り替え |
> | `eval code=<javascript>` | JavaScriptを実行して結果を返す |
> | `dev:debug [on] [off]` | Chrome DevTools Protocolデバッガーのアタッチ/デタッチ |
> | `dev:cdp method=<CDP.method> [params=<json>]` | Chrome DevTools Protocolコマンドを実行 |
> | `dev:console [clear] [limit=<n>] [level=log\|warn\|error\|info\|debug]` | キャプチャされたコンソールメッセージを表示 |
> | `dev:errors [clear]` | キャプチャされたエラーを表示 |
> | `dev:css selector=<css> [prop=<name>]` | ソースロケーション付きでCSSを検査 |
> | `dev:dom selector=<css> [total] [text] [inner] [all] [attr=<name>] [css=<prop>]` | DOM要素をクエリ |
> | `dev:mobile [on] [off]` | モバイルエミュレーションを切り替え |
> | `dev:screenshot [path=<filename>]` | スクリーンショットを撮影 |

# おわりに

Obsidian CLIの登場により、Obsidianはエディタの枠を超えてシステム全体に統合可能なツールへと進化した(?)。まだベータ版なので、今後に期待したい。
