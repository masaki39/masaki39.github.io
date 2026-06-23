---
date: 2026-04-19
updated: 2026-04-19
aliases: []
tags:
  - note/publish
description: Claude Codeを使いこなすためのTips集：`CLAUDE.md`の活用、`AGENTS.md`との連携、コマンド許可設定、プランモード、Bypass permissionモード、会話履歴管理、思考度調整、フルスクリーン表示、途中経過省略、外部エディター連携、ステータスライン表示などの機能を紹介。
---

# はじめに

Claude Codeが正式リリースから1年近く経過した。最近では、非エンジニアの人にも広く認知されるようになってきている(私も職業エンジニアではないが)。Claude Code自体の使い方も複雑化してきており、LLMを使うこと自体に知識が必要な時代が到来しつつある。多くの人がClaude CodeのTipsを発信しており、情報もあっという間に古くなる。

コーディングの面では[Everything Claude Code](https://github.com/affaan-m/everything-claude-code)というClaude Codeをコントロールするためのリポジトリ(plugin)がClaude Code自体のStar数を大幅に超えており、**コントロール可能なLLM**というのが最近のトピックだと思われる。

本記事はご多分に漏れずClaude CodeのTipsなのだが、**私が｢最初から知っとけばよかったな｣と思った機能**を紹介する。こういうTipsもClaude Codeに聞けばよいのだが、そもそも知らないとなんともならない。

> [!caution]
> 本記事では機能の紹介はするが設定方法は解説しない。
> 記事公開時点での情報であるため、その後変化しうる。

# user scopeのCLAUDE.md

CLAUDE.mdはClaude Codeを起動する時に読み込まれるファイルであるが、`~/.claude/CLAUDE.md`に配置するとuser scopeのCLAUDE.mdとなり、どこで起動しても同時に読み込まれるようになる。

私はこの2行のみ↓↓

```markdown
常に文字数を最小にするような簡潔さで返答すること(例：｢完了｣｢理解｣｢返答求む｣)
ユーザーの入力が曖昧な場合はAskUserQuestionを積極的に使ってください。
```

返答を簡潔にするとトークンの節約になる。AskUserQuestionはClaude Code組み込みの機能で、Claude Code側から確認や質問をするための機能だ。

![AskUserQuestion](https://i.gyazo.com/1ff13664fde0151ca0d0b02369c8232a.webp)

# AGENTS.mdにシンボリックリンク

Claude Code以外のAIエージェントはCLAUDE.mdの代わりにAGENTS.mdを使っている。Claude Codeだけが傲慢にも名称を合わせていない。この場合、内容を同一にするためにシンボリックリンクを貼るという方法がある。

```zsh
ln -s CLAUDE.md AGENTS.md
```

# user scopeのコマンド許可

`~/.claude/settings.json`で設定できる。読み取りだけのコマンドはあらかじめ許可すると良い。ワイルドカードも使用でき、allow、ask、denyの3種類を登録できる。とりあえず

- WebSearch
- WebFetch

をallowしておくと調査で許可を求められることがなくなりかなり快適。

# 通知を設定する

[[📘Claude Codeに通知を設定する]]を参照。

スマホ通知なら[ntfy.sh](https://ntfy.sh/)もおすすめ。

# Planモード

Shift+Tabでモード切り替えができる。最初にプランモードで入念に計画を立ててから実行するようにすると、スムーズにいく事が多い。

![plan mode](https://i.gyazo.com/8b230ee6da85a04f22f9861e25895d1e.webp)

# Bypass permissionモード

全ての許可をスキップする危険なモード。許可を求められても全然分からない領域ではとりあえず全部任せてみて後から調べたほうが効率が良いことが多い。下記コマンドで起動できる。

```zsh
claude --allow-dangerously-skip-permissions
```

危険なので最低限プランモード併用が推奨。

```zsh
claude --permission-mode plan --allow-dangerously-skip-permissions
```

さらにはDockerコンテナ環境で起動するとより安全。[公式のdevcontainerの設定](https://github.com/anthropics/claude-code/tree/main/.devcontainer)は公開されている。

> [!note]
> --enable-auto-modeというClaude Codeが許可が必要かどうかを判断するモードがあるが、まだProプランでは使用できない。

# /clearと/compact

LLMと長く会話をしていると頭が悪くなるというのはよく知られている。

- /clearは会話を初期化するコマンド
- /compactは会話を圧縮するコマンド

/clearは新しいタスクを始める時に、/compactはタスクが一区切りになったら使用する。

# /effort

Claude Codeが回答の際にどれくらい考えるかの設定。

- low
- medium
- high
- xhigh(一部モデル)
- max

の順になっている。前はhighがdefaultだったが、最近mediumになったので明示的にhigh以上にしておいたほうが良い(結構回答の質が違う)。

# /tui fullscreen

最近追加された機能。ターミナル内でClaude Codeがフルスクリーンで表示されて、マウスで選択した文字がコピーできる。見やすいし使いやすい。

![tui-fullscreen](https://i.gyazo.com/b1d473d7317e673de17667276d9ad067.webp)

# /focus

途中経過のコマンドや差分の表示が省略される。どうせ全て認識するのは無理なので推奨。

# 外部エディターで入力

ctrl + GでEDITOR変数に設定した外部エディターを起動し、プロンプトを書くことができる。プロンプトの誤送信がなくなる。

![external-editor](https://i.gyazo.com/3092810845f7728db57fc3a29d25d5e6.webp)

# ステータスライン

最近Claude Codeの使用量がAPIを使用せずとも確認できるようになった。これをステータスラインに組み込むというのが話題になり、検索すると自作のものが何種類も出てくる。Claude Codeにステータスラインを作らせる/statuslineというコマンドも実装された。

私はこの機能が実装されるずっと前からAPI経由のステータスラインを作っていた人気リポジトリを表示順だけ改変して使用している(現在はAPIなしでの取得を優先するようにアップデートしている。老舗の安心感)。→[リポジトリ](https://github.com/masaki39/ClaudeCodeStatusLine)

![status-line](https://i.gyazo.com/c9afb4a5df92e14abb929be858b55a4e.webp)

# おわりに

とりあえず、Claude Codeの正式リリースからまだ1年経っていないというのが衝撃的だ。既に何年も使用してきたような気分になっている。来年、再来年にはこの分野はどうなっていくのだろうか。
