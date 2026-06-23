---
date: 2026-01-27
updated: 2026-01-30
aliases: []
tags:
  - note/publish
description: ObsidianとLLM（大規模言語モデル）の連携方法として、コミュニティプラグイン、IDE、CLIの3つの主要なアプローチを、具体的な運用例と長所・短所を比較解説した技術まとめ。
---

# はじめに

2025年以降、ObsidianとLLMを連携させる記事を定期的に目にするようになった。Obsidian自体は本来LLMと連携するためのツールではないが、

- ローカル管理である
- マークダウンファイルである

という２点でLLMと連携しやすい特性をたまたま持つ。私はあまりLLMに全任せの運用は好みではないが、要約や校正などLLMを介すと便利な運用があることは確かだ。既存の記事の多くは特定のツールの使用方法に傾倒しているような気がするので、本記事では一般論を記載しようと思う。

1. コミュニティプラグイン
2. IDE
3. CLI

主にこの３種類があると思われる。

# 1. コミュニティプラグイン

Obsidianにはコミュニティプラグインというシステムがある。コミュニティ主導の拡張機能である。｢私の考える最強のLLM連携｣を色んな人が開発しているので、好みのプラグインを選ぶと良い。ここでは、2026年1月現在で最もダウンロード数の多いCopilotを例に説明する。

[![Copilot](https://ogpf.vercel.app/c?url=https://www.obsidiancopilot.com/en)](https://www.obsidiancopilot.com/en)

コミュニティプラグインでLLMを使用する場合、コミュニティプラグインが提供するのはLLMのモデル自体ではない。モデルは大手のプロバイダーと契約しなければならない。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260130195610.webp)

どのコミュニティプラグインを使用するにしても設定にAPI keyの項目があるだろう。このAPI keyを介して、モデルを呼び出すことになる。呼び出したいモデルの契約をしてAPI keyを発行する必要がある。大手三社の現時点での契約ページを下記に示す。

- [OpenAI](https://platform.openai.com/api-keys)
- [Google](https://aistudio.google.com/api-keys)
- [Anthropic](https://platform.claude.com/settings/keys)

API keyを設定すると、コミュニティプラグイン独自の機能が使用できるようになる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260130200523.webp)

↑右側にchat画面が表示されている。

> [!caution]
> API keyでモデルを呼び出す場合は従量課金制になる。
> ただし、下位モデルでサブスクを超えるほど使用するのはかなり難しいので、お試しで下位モデルで運用すると良いだろう。
> 2026年1月現在では、Googleは多少の無料枠を用意している。

まとめると、コミュニティプラグインはLLMとObsidianを統合する機能を提供しており、モデル自体は各自契約する必要がある。活発に開発されているので、選択肢は多く機能は多岐にわたる。

# 2. IDE

IDEというのは統合開発環境の略で、簡単に言うとコーディングの際に必要な機能を提供するテキストエディタである。コーディングはLLMとの統合が最も進んでいる分野であるので、AI機能を使用するときだけAI機能をもつIDEを開くというやり方がある。例としてVScodeで説明する。

[![VS code](https://ogpf.vercel.app/c?url=https://code.visualstudio.com/)](https://code.visualstudio.com/)

ObsidianのVaultをVScodeで開くと下記のような画面になる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260130201529.webp)

大抵、左にファイルエクスプローラーがあり、中央にエディターがあり、右にチャット画面があることが多い。コーディングをするのと同様にLLMがファイル内容を書き換えたり、ファイルを検索することができる。

運用は至ってシンプルである。Obsidianで開いたファイルをIDEでも開く。多くの場合人力作業はObsidianの方が利用しやすいことが多いので、LLMを使用したいときにのみIDE経由で作業する。

2026年1月現在ではVScodeから派生したAI機能を持つIDEが多種存在する(Cursor, Windsurf, Antigravityなど)ので、どれかと契約して使用することになる。このやり方は2つのアプリを往復する手間はあるが、運用が分かりやすいのがメリットだろう。

# 3. CLI

CLIとはコマンドラインインターフェースの略であり、ターミナルで動作するツールのことである。例としてClaude Codeで説明する。

[![Claude Code](https://ogpf.vercel.app/c?url=https://claude.com/ja-jp/product/claude-code)](https://claude.com/ja-jp/product/claude-code)

ターミナルでVaultのディレクトリに移動して、`claude`と打つとClaude Codeが起動する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260130202719.webp)

CLI型のLLMは、起動したディレクトリ配下へのアクセス権を持つので、後は自然言語で指示するのみである。CLI型は開いたファイルを自動で読み取ってくれるわけではないので、何らかの形でファイルを渡す必要がある。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260130203428.webp)

MCPサーバーなどが無設定であれば`@ファイル名`で手動で渡す事になる。

2026年1月現在の選択肢としてはClaude Code、Codex CLI、Gemini CLIなどだろう。CLI型はターミナルでできることは何でもできるといっても過言ではなく、PC内の操作のあらゆる箇所に利用できるという点で汎用性に優れる。ターミナルへの理解が多少必要ではあるが、現時点では最もコストパフォーマンスと自律性に優れているように思える。

# まとめ

まとめるとこのような感じだろうか

|             | 長所              | 短所                    |
| ----------- | --------------- | --------------------- |
| コミュニティプラグイン | Obsidianの機能との統合 | APIの契約が必須<br>コミュニティ主導 |
| IDE         | 運用の分かりやすさ       | 2アプリの往復               |
| CLI         | 汎用性             | ターミナルへの理解             |

# おわりに

かなりざっくりとしているが、新ツールが出るたびに並列的な重み付けで考えるとついていけないので、カテゴライズは重要だと思われる。定期的に｢神ツール！｣みたいな煽りは登場するので、どのような位置づけのものなのかは理解しておきたい。
