---
date: 2025-07-08
updated: 2025-07-08
aliases: []
tags:
  - note/publish
description: ObsidianでターミナルAIのClaude Codeを活用し、Terminalプラグインと自作プラグインを使ってアクティブファイルを`CLAUDE.md`に記録、連携させる方法について解説します。
---

# はじめに

ターミナルAIのClaude Codeを導入してみている。コーディングに関しても明らかに強いのだが、Obsidianでも使用できると嬉しいので連携を考えてみた。

起動はTerminalプラグインで行えば、Obsidian上で完結できる。

> [!quote] [[📘Terminalプラグインの導入]]

Claude Codeは起動したディレクトリに対する読み取り、編集権限があるので、現在Obsidian上でアクティブなファイルがコンテキストとしてわかれば十分ということになる。そして、Claude Codeは`CLAUDE.md`を必ず読んで作業を開始するようになっている。つまり`CLAUDE.md`にアクティブファイルパスが記載してあればそれだけでOKということになる。

# アクティブファイルを明示するClass

自作プラグインにイベントを追加するClassを追加した。

```ts
import { App, Plugin } from "obsidian";

export class ClaudeService {
    private app: App;
    private plugin: Plugin;

    constructor(app: App, plugin: Plugin) {
        this.app = app;
        this.plugin = plugin;
    }

    async updateActiveFile() {
        const activeFilePath = this.app.workspace.getActiveFile()?.path;
        if (!activeFilePath) {
            return;
        }

        const claude = this.app.vault.getFileByPath("CLAUDE.md");
        if (!claude) {
            return;
        }
            
        await this.app.fileManager.processFrontMatter(claude, (fm) => {
            fm.activeFile = activeFilePath;
        });
    }
    async onload(){

        this.plugin.registerEvent(this.app.workspace.on("active-leaf-change", () => {
            this.updateActiveFile();
        }));
    }

}
```

これにより、`CLAUDE.md`には下記のようにアクティブファイルパスが常に記載・更新されるので、常に編集中のファイルがコンテキストとして含まれるようになる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250708093127.webp)

# MCPサーバーの追加

ルートディレクトリに`.mcp.json`を追加して普段通り記載する。たとえば、自作サーバーで下記のように記載。

```json
{
  "mcpServers": {
    "zotero-mcp": {
      "command": "uvx",
      "args": [
        "git+https://github.com/masaki39/zotero-mcp.git"
      ]
    }
  }
}
```

コマンドで追加する方法もあるよう。個別のツールオンオフはできるのか不明だった。

# おわりに

Obsidian内部で強いAIが使用できるようになった。強い。
