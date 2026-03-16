---
date: 2026-03-16
updated: 2026-03-16
aliases: []
tags:
  - note/publish
description: PDF画像抽出、不要画像選別、保存を自動化するAgent Skill。
---

# はじめに

PDFから画像を抽出する時にいちいちスクショするのは面倒くさいので、以前からpopplerというCLIを使っている。poppler搭載のpdfimagesというコマンドを使えば、PDFに埋め込まれた画像が一気に取得できる。全部一括で抽出して、いらない画像は捨てて、必要な画像をスライドやら何やらにコピペする。

この作業はCLIで完結するが、不要な画像の選別だけはLLMに任せたい。そこでAgent Skillsにすることにした。

# pdf-extract

pdf-extractというskillを作った。手順はシンプル。

1. popplerのinstallの確認
2. pdfimagesコマンドで一時フォルダに画像を一括抽出
3. readツールでロゴなどの不要な画像を選別
4. 任意のディレクトリに保存

PDFを指定すると画像を抽出しつつ、必要な画像を選別してくれる。

# Skills専用のリポジトリを作った

> [!quote] [GitHub - masaki39/agent-skills: A collection of agent skills for Claude Code · GitHub](https://github.com/masaki39/agent-skills)

SkillsをGitHubで管理するとメリットがいくつかある。

- Git管理下になる
- バックアップになる
- Claude Codeのプラグインとして使える

プラグイン管理用のjsonをリポジトリ内に設置すると、Claude Codeの`/plugin`コマンドからマーケットプレースとして登録できるようになる。例えば`masaki39/agent-skills`を登録すると、そのリポジトリ内のSkillsがClaude Code内部のUIから追加、削除できるようになる。更にはUpdateやAuto Updateも設定可能になる。

どちらかというと配布向けかもしれないが個人利用でもメリットはありそう。私はCLIやObsidianプラグインを作っているので、専用リポジトリがあっても良いだろう。

# Agent SkillsはCLIと相性が良い

これはよく言われていることだ。私はCLIをよく使うので、ワークフローをSkillsでトレースするのは容易い。一方で、単純なコマンド実行だけで完結する動作はSkillにせず、パイプラインを組んでもらえば十分だと思っている。今回は、画像の選別にLLMの目が必要だったのでSkillにした。

# おわりに

開発しているmarp-mcpのSkillと組み合わせると、PDFから画像を抽出してそのままスライドに埋め込む、という一連の流れをClaude Codeだけで完結できる。こういった小さなSkillを積み重ねてワークフローを自動化していくのが、Agent Skillsの面白いところだろう。
