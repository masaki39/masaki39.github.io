---
date: 2025-09-23
updated: 2025-09-23
aliases: []
tags:
  - note/publish
description: RaycastとObsidian Advanced URIプラグインを活用し、MacのランチャーアプリからObsidianのコマンドを呼び出し、タスク管理やノート作成を効率化する方法を紹介します。
---

# はじめに

Mac用のランチャーアプリ、[Raycast](https://www.raycast.com)を使用している。MacのランチャーアプリにはデフォルトでSpotlightが内蔵されているが、基本的なアプリ間の移動程度にしか使えない。Raycastは無料で使えるランチャーアプリで、Spotlightのようなアプリ間移動機能に加え、ウィンドウの配置調整（Macの人気有料アプリMagnetと同等）、クリップボード保存機能（Clipyと同等）、特定の入力で登録したテキストを挿入するスニペット機能などを搭載し、高いカスタマイズ性を併せ持っている。さらに高度な機能を提供するアプリにAlfredが存在するが、Alfredは機能をフルに使うには課金が必要な上、ほとんどのユーザーにはRaycastで十分だと思っている。

今回はこのRaycastとObsidianのAdvanced URIプラグインを用いて、Mac上のどこからでもObsidianのコマンドを使用できる方法を思いついたので、紹介する。

# Advanced URIとは

URIとは外部からアプリを操作する仕組みである。ObsidianのAdvanced URIプラグインを使用することで、URLスキーム`obsidian://`を通じてObsidianの様々な機能を外部から呼び出すことができる。

# 手順

## 1. Advanced URIプラグインのインストール

設定画面のコミュニティプラグインから「Advanced URI」を検索してインストール・有効化する。

## 2. コマンドのURIを取得

1. コマンドパレット(`Cmd+P`)を開く
2. `Copy URI for command`を実行
3. 実行したいコマンドを選択
4. URIがクリップボードにコピーされる

例：`obsidian://advanced-uri?vault=VaultName&commandid=workspace%3Aclose`

## 3. Raycastでクイックリンクを作成

1. Raycastを開き(`Cmd+Space`)
2. `Create Quicklink`を検索・実行
3. 以下を設定：
   - Name: コマンドの名前（例：「Obsidian: Close Workspace」）
   - Link: コピーしたURI

## 4. 実行

Raycastでコマンド名を入力して実行すると、Obsidianのコマンドが即座に実行される。

# 活用例

TemplaterやQuick Addプラグインで作成したカスタムコマンドも同様に登録できる。

- デイリーノートへの追記
- タスクリストへの追記

などが最も分かりやすい使用例かと思われる。

# おわりに

この方法により、Obsidianが非アクティブな状態でも瞬時にObsidianの機能を呼び出せるようになる。思考が途切れることなく、アイデアを素早くObsidianに記録できる環境こそが、真の知識管理システムと言えるだろう。
