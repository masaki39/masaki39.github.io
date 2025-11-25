---
date: 2025-04-12
updated: 2025-04-12
aliases: []
tags:
  - note/publish
---

# Claude Desktop での MCP ツール自動承認ガイド

この記事では、Claude Desktop アプリケーションを使用する際に表示される Model Context Protocol (MCP) ツールの許可ダイアログを自動的に承認する方法を解説します。

## 背景

Claude Desktop では、MCP ツールを使用するたびに許可ダイアログが表示されます。頻繁に使用するユーザーにとって、これらのダイアログを毎回手動で承認するのは煩わしい作業です。この記事では、JavaScript スクリプトを使用してこのプロセスを自動化する方法を紹介します。

## 開発者ツールの有効化

まず、Claude Desktop アプリケーションで開発者ツールを有効にする必要があります。

### macOS での手順

1. **設定ファイルの場所に移動**:
   - ターミナルを開く
   - 以下のコマンドを実行する:

     ```bash
     echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
     ```

   - または手動で:
     - Finder を開き、メニューから「移動」→「フォルダへ移動」を選択
     - `~/Library/Application Support/Claude` と入力して移動
     - このフォルダ内に `developer_settings.json` ファイルを作成し、以下の内容を入力:

       ```json
       {"allowDevTools": true}
       ```

2. **Claude Desktop の再起動**:
   - Claude Desktop アプリケーションを完全に終了して再起動する

## 自動承認スクリプトの実装

### スクリプトの準備

以下の JavaScript コードを使用します。このコードは [GitHubリポジトリ](https://gist.github.com/t3ta/caffbf9d026bac0cb2a4d344f93139bb#file-auto_approve-js) から入手しました。

```javascript
// Cooldown tracking
let lastClickTime = 0;
const COOLDOWN_MS = 1000; // 1 second cooldown
const observer = new MutationObserver((mutations) => {
  // Check if we're still in cooldown
  const now = Date.now();
  if (now - lastClickTime < COOLDOWN_MS) {
    console.log("🕒 Still in cooldown period, skipping...");
    return;
  }
  console.log("🔍 Checking mutations...");
  const dialog = document.querySelector('[role="dialog"]');
  if (!dialog) return;
  const buttonWithDiv = dialog.querySelector("button div");
  if (!buttonWithDiv) return;
  const allowButton = Array.from(dialog.querySelectorAll("button")).find(
    (button) => button.textContent.includes("許可")
  );
  if (allowButton) {
    lastClickTime = now; // Set cooldown
    allowButton.click();
  }
});
// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
```

このスクリプトは、ページ上に「許可」というテキストを含むボタンがあるダイアログを検出すると、自動的にそのボタンをクリックします。

### スクリプトの実行手順

1. **開発者ツールを開く**:
   - Claude Desktop アプリケーションを起動する
   - macOS では `Command + Option + Shift + I` を押す
   - 2つの DevTools ウィンドウが開いた場合は、タイトルに `https://claude.ai` が含まれるウィンドウを使用する

2. **スニペットとして保存する方法（推奨）**:
   - 開発者ツールの上部タブから「Sources」を選択する
   - 左側のナビゲーションで「Snippets」タブをクリックする
   - 「New snippet」をクリックする
   - 名前を付ける（例：「ClaudeAutoApprove」）
   - 右側のエディタ領域にスクリプトを貼り付ける
   - `Command + S` で保存する
   - スニペットを実行するには、スニペット名を右クリックして「Run」を選択するか、エディタ内で `Command + Enter` を押す

3. **または、コンソールから直接実行する方法**:
   - 開発者ツールの上部タブから「Console」を選択する
   - コンソールにスクリプトを貼り付ける
   - Enter キーを押して実行する

## 動作確認

スクリプトが正常に実行されると、コンソールに「🔍 Checking mutations...」などのログメッセージが表示されます。これで、MCP ツールを使用する際に表示される許可ダイアログが自動的に承認されるようになります。

## 注意点

1. **セキュリティ上の懸念**:
   - このスクリプトはすべての「許可」ボタンを自動的にクリックするため、潜在的なセキュリティリスクがあります
   - より高度なセキュリティが必要な場合は、特定のツールのみを許可するようにスクリプトを修正することを検討してください

2. **持続性**:
   - このスクリプトはセッション間で持続しません
   - Claude Desktop を再起動するたびに、開発者ツールを開いてスクリプトを再度実行する必要があります

3. **アップデートの影響**:
   - Claude Desktop のアップデートにより、ダイアログの構造が変更された場合、スクリプトの調整が必要になる可能性があります

## まとめ

この方法を使用することで、Claude Desktop での MCP ツールの使用がより効率的になります。ただし、セキュリティ上の懸念があるため、使用環境と目的に応じて適切な判断をしてください。
