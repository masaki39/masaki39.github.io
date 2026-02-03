---
date: 2026-02-03
updated: 2026-02-03
aliases: []
tags:
  - note/publish
description: ObsidianのMinimalテーマ上で、CSSスニペットを活用してNeovimで人気のTokyo Nightカラーパレットを正確に再現・適用するカスタマイズ手順を解説。
---

# はじめに

最近Neovimというエディターを使い始めた。設定が難しいので、Lazyvimという既設定のものを使用している。このNeovimというエディター、機能はともかく、Lazyvimのデフォルトテーマである Tokyo Nightというテーマの色合いがとても格好良い。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203172245.webp)

この深い紫色、パッと見では実感が湧きにくいかもしれないが、長時間見ていると良さが実感できる。本記事は、この色合いをObsidianで再現することを目的とする。

# Obsidianへの実装方法を検討する

主に下記の選択肢があると思われる。

## 1. コミュニティテーマを使用する

一番簡単。インストールするだけで使用可能だ。

[![obsidian-tokyonight](https://ogpf.vercel.app/c?url=https://github.com/tcmmichaelb139/obsidian-tokyonight)](https://github.com/tcmmichaelb139/obsidian-tokyonight)

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203175222.webp)

メリットは手軽さに尽きる。ただしデメリットがあることも許容しないといけない。

- コミュニティテーマであること自体
	- コミュニティプラグインなどとの干渉の可能性
- カスタマイズ性が低い

## 2. Style Settingsを使用する

コミュニティテーマのなかにはStyle Settingsというコミュニティプラグインに対応しているものがある。先程のTokyo NightテーマもStyle Settingsで色合いを上書きできる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203180201.webp)

これでカスタマイズ性の問題は多少改善するが、やはりデメリットが気になる。

- コミュニティテーマやプラグインへの依存の強さ
- 設定の煩雑さ、再現性

個人的に、Style Settingsを使用するならテーマを基本として気になるところだけ少し変える程度が良いだろう。

## 3. CSSスニペットを使用する

CSSスニペットを手書きするという方法がある。これは一からやると結構労力がかかるのだが、実はある程度簡単にできるようになっている。

> [!quote] [CSS variables - Developer Documentation](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables)

公式がCSS変数というのを多数用意している。CSS変数に色コードなどを当てはめるだけである程度見た目をコントロールできる。テーマを作りやすくしてくれているのだ。CSS変数のうち、色合いの変更のみを対象にすればレイアウトの崩れのリスクはほぼなく、実装の難易度も低い。

公式の安心感とカスタマイズ性の高さから、色を対象としたCSS変数を主軸にCSSスニペットを作成することにした。

## ベーステーマはMinimalにする

いやいや、コミュニティテーマへの依存は避けたいと言ったばかりではないかと思われるかもしれないが、コミュニティテーマのMinimalを使用する。理由は下記のとおりだ。

- ダウンロード数一位なのでどのプラグインも基本的に対応している
- ObsidianのCEOが作者で準公式感がある
- 使えるCSS変数が増える

> [!quote] [Style Settings - Minimal Documentation](https://minimal.guide/plugins/style-settings)

公式のCSS変数に加えMinimalのCSS変数も多少使うことにする。

## 方針まとめ

- CSSスニペットを自作する
- CSS変数に色を割り当てるだけ
- ベーステーマはMinimalにする

# カラーコードを調査する

Tokyo Nightのカラーコードは公開されている。

[![tokyonight.nvim](https://ogpf.vercel.app/c?url=https://github.com/folke/tokyonight.nvim/tree/main/extras/lua)](https://github.com/folke/tokyonight.nvim/tree/main/extras/lua)

ここから欲しい色のコードを取得する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203174847.webp)
  
  - bg: `#1a1b26`
  - bg-alt: `#16161e`
  - red: `#f7768e`
  - green: `#9ece6a`
  - yellow: `#e0af68`
  - blue: `#7aa2f7`
  - magenta: `#bb9af7`
  - cyan: `#7dcfff`
  - gray: `#a9b1d6`

以上の色を使用する。

# CSSスニペットを書く

公式のテーマ作成のガイドに従って作成する。

> [!quote] [Build a theme - Developer Documentation](https://docs.obsidian.md/Themes/App+themes/Build+a+theme)

色を変えるだけの場合は、`.theme-dark`や`.theme-light`の配下でCSS変数を定義すればよいとのこと。

```css
.theme-dark {
  --background-primary: #18004F;
  --background-secondary: #220070;
}

.theme-light {
  --background-primary: #ECE4FF;
  --background-secondary: #D9C9FF;
}
```

レイアウトの変更は`body`の配下で行い、プラグインのレイアウトなどは`:root`から行うのが推奨と書いてあるが、今回は色の変更のみなので`.theme-dark`のみを編集する。

## カラーパレットを定義する

使う色が固定であるので、最初に色をCSS変数として定義してしまってそれを使い回す。これができるのが自作CSSスニペットの利点だ。

```css
.theme-dark {
  --palette-bg: #1a1b26;
  --palette-bg-alt: #16161e;
  --palette-red: #f7768e; /* active status */
  --palette-green: #9ece6a; /* structure */
  --palette-yellow: #e0af68; /* strong */
  --palette-blue: #7aa2f7; /* link */
  --palette-magenta: #bb9af7; /* accent color */
  --palette-cyan: #7dcfff; /* external link */
  --palette-gray: #a9b1d6; /* text color */
}
```

## アクセントカラーを上書きする

Obsidianにはアクセントカラーが設定画面に存在し、その色がボタンの色などに使われるようになっている。このアクセントカラーはHSLの要素に分解されてCSS変数に割り当てられている。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203184617.webp)

magentaをアクセントカラーにしたいので、アクセントカラーの3変数を上書きする。

```css
.theme-dark {
  --accent-h: 261;
  --accent-s: 85%;
  --accent-l: 79%;
}
```

## CSS変数に色を当てはめる

ここまで準備できたらあとは、定義した色をCSS変数に割り当てていくだけだ。

> [!note]- 作成したスニペット
>
> ```css
> .theme-dark {
>   /* ===== カラーパレット ===== */
>   --palette-bg: #1a1b26;
>   --palette-bg-alt: #16161e;
>   --palette-red: #f7768e; /* active status */
>   --palette-green: #9ece6a; /* structure */
>   --palette-yellow: #e0af68; /* strong */
>   --palette-blue: #7aa2f7; /* link */
>   --palette-magenta: #bb9af7; /* accent color */
>   --palette-cyan: #7dcfff; /* external link */
>   --palette-gray: #a9b1d6; /* text color */
> 
>   /* magentaをhslに分解しアクセントカラーをoverride */
>   --accent-h: 261;
>   --accent-s: 85%;
>   --accent-l: 79%;
> 
>   /* ===== 用途 ===== */
>   --background-primary: var(--palette-bg);
>   --background-secondary: var(--palette-bg-alt);
>   --link-color: var(--palette-blue);
>   --link-color-hover: var(--palette-red);
>   --link-external-color: var(--palette-cyan);
>   --link-external-color-hover: var(--palette-red);
>   --list-marker-color: var(--palette-yellow);
>   --list-marker-color-collapsed: var(--palette-red);
>   --indentation-guide-color: var(--palette-green);
>   --indentation-guide-color-active: var(--palette-red);
>   --checkbox-color: var(--palette-green);
>   --text-accent: var(--palette-yellow);
>   --text-muted: var(--palette-gray);
>   --text-faint: var(--palette-gray);
>   --bold-color: var(--palette-yellow);
>   --h1-color: var(--palette-magenta);
>   --h2-color: var(--palette-magenta);
>   --h3-color: var(--palette-magenta);
>   --h4-color: var(--palette-magenta);
>   --h5-color: var(--palette-magenta);
>   --h6-color: var(--palette-magenta);
>   --tag-color: var(--palette-yellow) !important;
>   --tag-color-hover: var(--palette-red) !important;
>   --code-background: var(--palette-bg-alt);
>   --code-comment: var(--palette-gray);
>   --blockquote-border-color: var(--palette-green);
> 
>   /* minimalでのみ適応 */
>   --text-formatting: var(--palette-yellow);
>   --line-number-color-active: var(--palette-red);
>   --minimal-tab-text-color-active: var(--palette-red); 
> }
> ```

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260203185437.webp)

結構いい感じにみえる。個人的には、アクティブな状態やホバー状態を赤で示すことにしたところと、外部リンクと内部リンクで色合いを変えているところが気に入っている。

なお、私のCSSスニペットは順次更新してGitHubにアップロードしているので、久しぶりに見たら全然違うことになっているかもしれない。

> [!quote] [GitHub - masaki39/snippets: Backup of Obsidian CSS snippets](https://github.com/masaki39/snippets)

# おわりに

カラーパレットとして自前のCSS変数を定義して、それを公式のCSS変数に割り当てていくやり方は、レイアウト崩れのリスクがなく、かつ簡便な良いやり方だろう。
