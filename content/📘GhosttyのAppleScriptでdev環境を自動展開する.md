---
date: 2026-03-27
updated: 2026-03-27
aliases: []
tags:
  - note/publish
description: Ghostty 1.3.0以降で使えるAppleScript APIを活用し、osascriptでyazi・Claude Code・lazygitの3ペインレイアウトをコマンド一発で自動展開する方法を解説します。
---

# はじめに

以前、[Zellijでターミナルは進化する](https://masaki39.github.io/Zellijでターミナルは進化する)という記事を書いた。ターミナルマルチプレクサのZellijを使えば、レイアウトファイルを定義することで複数ペインの開発環境を一発で起動できるというものだ。

Zellijはセッション管理やキーjjkkバインドなど多くの優位点を持つツールだが、Ghostty 1.3.0以降ではAppleScript APIが利用可能になり、追加ツールなしでもレイアウト展開については同様のことができるようになった。本稿ではその実装を紹介する。

> [!quote] 参考
> [AppleScript - Ghostty](https://ghostty.org/docs/features/applescript)

# 実現するレイアウト(例)

```
┌─────────┬─────────┐
│         │ claude  │
│  yazi   ├─────────┤
│         │lazygit  │
└─────────┴─────────┘
```

左ペインにはファイルマネージャーの[Yazi](https://github.com/sxyazi/yazi)、右上にはClaude Code、右下には[lazygit](https://github.com/jesseduffield/lazygit)を配置する。

# GhosttyのAppleScript API

Ghosttyのオブジェクト階層は `application → windows → tabs → terminals` となっている。

ペインの分割は `split` コマンドで行い、方向を `right / left / down / up` で指定する。

```applescript
set newTerm to split sourceTerm direction right
```

テキスト送信は `input text` で行う。

```applescript
input text "command\n" to term
```

フォーカスの移動は `focus` で行う。

```applescript
tell term to focus
```

# dev関数の実装

`.zshrc` に以下の関数を追加する。

```zsh
function dev() {
  osascript << 'EOF'
tell application "Ghostty"
  set mainTerm to focused terminal of selected tab of front window
  set cmdTerm to split mainTerm direction right
  set gitTerm to split cmdTerm direction down
  input text "yazi\n" to mainTerm
  input text "claude\n" to cmdTerm
  input text "lazygit\n" to gitTerm
  tell mainTerm to focus
end tell
EOF
}
```

# 使い方

作業したいディレクトリで `dev` と打つだけでよい。

```zsh
dev
```

現在のペインを起点に3分割して各ツールが起動する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260327231405.webp)

# おわりに

ターミナル環境の展開にはいろいろなやり方が出てきているが、Ghosttyを使っているなら追加ツール不要でこれだけシンプルに書くのが一番楽な気がしている。定義の仕方も簡単なので、自分の用途に合わせてペイン構成やコマンドを気軽にカスタマイズできるのも嬉しいポイントだろう。
