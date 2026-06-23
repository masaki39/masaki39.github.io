---
date: 2025-07-28
updated: 2025-07-28
aliases: []
tags:
  - note/publish
description: Claude Codeの作業終了時などに通知を受け取るためのHooks機能の設定方法（スラッシュコマンド、設定ファイル）と、Macでの通知コマンド(osascript)利用時の注意点（通知許可）について解説します。
---

# はじめに

Claude Codeはかなり自律的に動いてくれるので、作業終了時やこちらが操作できるまでは放置したい。そのために通知設定をしておく。

# Hooks機能

Hooks機能を使用する。Hooks機能は特定の条件でコマンドを自動的に実行してくれる機能だ。設定すべきは、NotificationとStopの2種類。

Claude Codeのスラッシュコマンドから設定できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250728101923.webp)

また、`~/.claude/settings.json`の設定ファイルに直接記載してもOK。下記の`command`のところに実行したいコマンドを記入する。

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"許可を求めます。\" with title \"Claude Code\" sound name \"Glass\"'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"作業が完了しました。\" with title \"Claude Code\" sound name \"Glass\"'"
          }
        ]
      }
    ]
  }
}
```

# コマンドをどうするか

通知や音を出すようなコマンドなら何でもいい。Macの場合はosascriptという専用コマンドでできると記載があったので、これを利用した。注意点は初期設定ではターミナルで実行したosascriptの通知が許可されていないということ。スクリプトエディタというアプリで適当に通知のコードを作って

例：

```zsh
display notification "テスト通知" with title "Claude Code" sound name "Glass"
```

みたいな通知コードをアプリで実行し、通知許可をしないといけない。

# おわりに

Claude Codeが放置可能になり、更に便利になりました。
