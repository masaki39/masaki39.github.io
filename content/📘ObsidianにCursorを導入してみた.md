---
date: 2025-02-13
updated: 2025-07-05
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-13%2019.47.08%20-%20A%20modern%2C%20minimalistic%20OGP%20image%20for%20a%20blog%20post%20about%20integrating%20Cursor%20with%20Obsidian.%20The%20design%20features%20a%20laptop%20screen%20displaying%20Obsidian's%20int.webp
---

# はじめに

Obsidian界隈で、CursorというAIコードエディターがObsidianと相性抜群という情報を見つけました。Vault全体を読み込んで使用することも可能ですが、今回はシンプルにノート単位での活用方法をご紹介します。この記事の作成も手伝ってもらいました。

# Cursorの導入手順

## 1. インストール

[Cursor - The AI Code Editor](https://www.cursor.com/ja)ここからインストールします。
macOSの場合、Homebrewを使用して簡単にインストールできます：

```zsh
brew install --cask cursor
```

## 2. Obsidianの設定

1. Shell commandsプラグインをインストールします
   - Obsidianの設定から「コミュニティプラグイン」を開き、「Shell commands」で検索
   - インストール後、プラグインを有効化
2. 以下のコマンドを新規作成します(Macの場合)：

```
cursor {{file_path:absolute}}
```

   - Shell commandsの設定画面から新規コマンドを追加できます。
   - コマンド名は「open in Cursor」などわかりやすい名前を設定
   - ホットキーを設定しておくと便利です

![[📘ObsidianにCursorを導入してみた-1739440035052.webp]]

このようなコマンドが作成されました。ノート内で実行するとノートがCursorで開かれます。

# Cursorの基本的な使い方

Cursorでノートを開くと、ノートに記載の内容を踏まえた機能が使用できるようになります。
ちょっと触ってみた感じ、基本的な機能は

- suggest: 続く文章を保管して提案
- chat: AIと会話(チャットボックス)
- generate: ノート内にプロンプトを打つとテキストがノートに追加される
- composer: プロンプトに則ってノート内を作り変える

# 活用例

## 振り返り記録の効率化

- generate機能を使用
- ノート内で「まとめ」と入力するだけで、AIが内容を分析して要約を生成
- 記録の重要なポイントを自動的に抽出

![[📘ObsidianにCursorを導入してみた-1739440574903.webp]]

## 複数ノートの統合

- 関連する複数のノートをCursorで開く
- composerにドラッグしてAIに統合を指示

![[📘ObsidianにCursorを導入してみた-1739440697718.webp]]

# まとめ

私の場合はAIは完全に監視下で使用したいという気持ちがあり、必要なノートだけ開くというスタイルで導入してみました。作業感の強い部分をAIに委託できると良さそうです。個人のノートにAIを導入することに対しては否定的でしたが、十分有用だと感じます。
