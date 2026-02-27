---
date: 2026-02-28
updated: 2026-02-28
aliases: []
tags:
  - note/publish
description: Marpスライド作成ツール「Marp MCP」を、LLMエージェント向けの汎用的なMCPサーバーと、手軽なSkillの両方に対応させ、Claude Codeプラグインとしても利用可能にした開発について解説しています。
---

# はじめに

私はLLMでMarpをうまく使うためにMarp MCPというものを作っている。

> [!quote] [GitHub - masaki39/marp-mcp: MCP server that lets AI agents build and edit Marp slide decks via structured tools.](https://github.com/masaki39/marp-mcp)

登録するとLLMがいい感じにMarpスライドを作ってくれるサーバーだ。ただし、最近はLLMに何かさせるための手段として、MCPサーバーだけでなくSkillという選択肢もある。

一般的に、MCPサーバーはツールとして構造化された入出力を持ち、複数のクライアントから利用できる汎用性がある。一方Skillはプロンプトベースで、セットアップが簡単かつプロンプトエンジニアリングの自由度が高い。それぞれに良い点・悪い点があり一概にどちらが良いとは言えないが、Skillにも対応することにした。

# できるようになったこと

![claude-code-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260228082635.webp)

Claude CodeのUIからプラグインシステムにmarp-mcpのリポジトリを登録するだけで使えるようになる。さらに、Skillのauto-updateもできる。

# 仕組み

MCPサーバーは実質サーバー起動専用のCLIであるため、MCPツールを引数にしてCLIとしても使えるようにした。CLIがインストールされていなくてもnpxで動かせるように指示を書いてある。MCPサーバーとロジックのコードは共通なので、できることに変わりはない。

SKILL.mdの中身はCLIの使い方が書いてあるだけで、スライド作成のベストプラクティスは書いていない。ただし、これはSkillの追加で今後拡張できる可能性がある。能力という点では変わらないが、プロンプトエンジニアリングの拡張性が若干上がるという感じだ。

# おわりに

MCPサーバー自体がガチガチに構造化されたものであるので、CLIやSkillへの変換は容易である。実際このリポジトリではREADMEやSkillですらスクリプト生成で行っている。Skillから作り始めるよりも定義がしっかりする点で良い方法かもしれない。
