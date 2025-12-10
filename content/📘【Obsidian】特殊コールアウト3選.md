---
date: 2025-12-10
updated: 2025-12-10
aliases: []
tags:
  - note/publish
description: Obsidianのコールアウトを活用するためのCSSスニペット3選（Modular CSS Layout、sidenote-callout、Timeline）を紹介し、カスタマイズによる表現力向上を解説しています。
---

# はじめに

Obsidianにはコールアウトという記法が存在する。

> [!quote] [Callouts - Obsidian Help](https://help.obsidian.md/callouts)

この書き方は標準的なマークダウンの記法ではないが、マークダウンの表現に彩りを与える非常に便利な書き方である。元々はAdmonitionというコミュニティプラグインが搭載して、Obsidianの公式に輸入されたらしい。GitHubのマークダウンでも一部は対応している。

このコールアウトには特筆すべき点がある。

- マークダウン表現を崩さずに内包できる
- 入れ子構造にできる
- 任意のHTMLタグをもたせることができる

これらの利点とCSSを組み合わせて多様な表現をマークダウンで行う取り組みが(ニッチな層の中で)活発に行われている。本記事では、その中でこれはと思ったCSSを3つ紹介する。どれも単なるCSSスニペットなので、`.css`のファイルをVault内のスニペットフォルダに配置して有効化するだけで使用可能になる。

# Modular CSS Layout

> [!quote] 公式ドキュメント
>  - [GitHub - efemkay/obsidian-modular-css-layout: CSS Layout hack for Obsidian.md](https://github.com/efemkay/obsidian-modular-css-layout)
> - [Getting Started \| Modular CSS Layout](https://efemkay.github.io/obsidian-modular-css-layout/) 

何種類かのCSSスニペットを提供している。ドキュメントも充実し、オプションも多彩である。Style Settingsプラグインにも対応している。例えば下記のように記載すると、コールアウトが横並びになる。

```markdown
> [!multi-column]
>
>> [!note]+ Work
>> your notes or lists here. using markdown formatting
>
>> [!warning]+ Personal
>> your notes or lists here. using markdown formatting
>
>> [!summary]+ Charity
>> your notes or lists here. using markdown formatting

```

詳細は公式ドキュメント参照だが、比率変更やバレットリストのマルチコラム化など、かなり多種多様な要望に答えるように設計されている。

![](https://raw.githubusercontent.com/efemkay/obsidian-modular-css-layout/main/docs/assets/hero-mc-callout.png)
※マルチコラムの例

![](https://raw.githubusercontent.com/efemkay/obsidian-modular-css-layout/main/docs/assets/mc-float-callout.png)
※右側に浮かせるような配置(Float)

その他、ワイドビューやイメージギャラリー用のCSSスニペットも同リポジトリ内で配布されている。

# sidenote-callout

> [!quote] [GitHub - xhuajin/obsidian-sidenote-callout: By leveraging only CSS and callout, elegantly implement marginal notes](https://github.com/xhuajin/obsidian-sidenote-callout)

これはサイドノートを記入するためのCSSスニペットだ。

![](https://github.com/xhuajin/obsidian-sidenote-callout/raw/main/images/sidenote-in-obsidian-nord-1.png)

下記のように、コールアウトに`aside-r`か`aside-l`を追記することで使用できる。

```markdown
> [!NOTE|aside-l] annotation
> annotation on the left side
```

# Time Line

Discordに落ちていた→[Discord](https://discord.com/channels/686053708261228577/702656734631821413/1156868388249935883)

![](https://cdn.discordapp.com/attachments/702656734631821413/1156868957014347816/image.png?ex=693a7fac&is=69392e2c&hm=56d3ef145a71445230d5b30dd13f3564f786ef2b83780799a19c796619aa28e6)

タイムライン上に表記できる。記入例は下記のとおりである。

```markdown
> [!timeline] title
> content

> [!timeline|blue] title
> 色を記入しておくと点の色を変更できる
```

使用可能な色は

- red
- orange
- yellow
- green
- cyan
- blue
- purple
- pink

の8種類となっている。

> [!note]- 念の為ここに転記保存しておく
>
> ```css
> /* Timeline Callout settings */
> body {
>     --timeline-title-color: var(--text-normal);
>     --timeline-title-size: var(--h2-size);
>     --timeline-title-width: 150px;
> 
>     --timeline-line-color: var(--color-base-35);
>     --timeline-line-margin: 16px;
>     --timeline-line-width: 4px;
>     --timeline-line-style: solid;
> 
>     --timeline-dot-color: var(--color-base-70);
>     --timeline-dot-size: 32px;
>     --timeline-dot-radius: 100%;
>     --timeline-dot-border-color: var(--background-primary);
>     --timeline-dot-border-size: 6px;
>     --timeline-dot-offset-x: -18px;
>     --timeline-dot-offset-y: -2px;
> 
>     --timeline-card-margin: 16px;
>     --timeline-card-background-color: var(--color-base-30);
>     --timeline-card-padding-x: 10px;
>     --timeline-card-padding-y: 16px;
> }
> 
> /* Timeline styling */
> [data-callout="timeline"] {
>     order: 1;
>     padding: 0;
>     margin: 0;
>     display: grid;
>     mix-blend-mode: normal;
>     background-color: unset;
>     grid-template-columns: var(--timeline-title-width, 150px) auto;
>     --dot-offset: calc(
>         var(--timeline-dot-offset-y) + var(--timeline-card-padding-y)
>     );
> 
>     .callout-title-inner {
>         width: 100%;
>         text-align: right;
>         color: var(--timeline-title-color);
>         font-size: var(--timeline-title-size);
>         margin-top: var(--dot-offset);
>     }
>     .callout-icon {
>         order: 2;
>         margin-inline: var(--timeline-line-margin);
>         border-left: var(--timeline-line-width) var(--timeline-line-style)
>             var(--timeline-line-color);
>         height: 100%;
>         position: relative;
> 
>         &::after {
>             content: "";
>             box-sizing: border-box;
>             background-color: var(--timeline-dot-color);
>             position: absolute;
>             border: var(--timeline-dot-border-size) solid
>                 var(--timeline-dot-border-color);
>             border-radius: var(--timeline-dot-radius);
>             width: var(--timeline-dot-size);
>             height: var(--timeline-dot-size);
>             top: var(--dot-offset);
>             left: var(--timeline-dot-offset-x);
>         }
>     }
>     .svg-icon {
>         display: none;
>     }
> 
>     .callout-content {
>         order: 3;
>         --p-spacing: 0.5rem;
>         background-color: var(--timeline-card-background-color);
>         border-radius: 1rem;
>         margin-bottom: var(--timeline-card-margin);
>         padding: var(--timeline-card-padding-x) var(--timeline-card-padding-y);
> 
>         & > h2:first-child {
>             margin-top: 0;
>         }
>     }
> }
> 
> /* Stacking multiple timelines */
> div:not(:has(> [data-callout="timeline"])) + div > [data-callout="timeline"] {
>     margin-top: var(--p-spacing);
> }
> div:has(> [data-callout="timeline"]) + div:not(> [data-callout="timeline"]) {
>     margin-bottom: 1rem;
> }
> 
> /* Timeline dot colors */
> [data-callout-metadata="red"] {
>     --timeline-dot-color: var(--color-red);
> }
> [data-callout-metadata="orange"] {
>     --timeline-dot-color: var(--color-orange);
> }
> [data-callout-metadata="yellow"] {
>     --timeline-dot-color: var(--color-yellow);
> }
> [data-callout-metadata="green"] {
>     --timeline-dot-color: var(--color-green);
> }
> [data-callout-metadata="cyan"] {
>     --timeline-dot-color: var(--color-cyan);
> }
> [data-callout-metadata="blue"] {
>     --timeline-dot-color: var(--color-blue);
> }
> [data-callout-metadata="purple"] {
>     --timeline-dot-color: var(--color-purple);
> }
> [data-callout-metadata="pink"] {
>     --timeline-dot-color: var(--color-pink);
> }
> ```

# おわりに

入れ子構造にもできるし、組み合わせることもできる。コールアウト×CSSには無限の可能性があるだろう。
