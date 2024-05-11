---
date: 2024-05-11
updated: 2024-05-11
aliases: 
tags:
  - note/article
  - quartz
---
%%
- はじめに
	- このサイトは Obsidian で作成したページを Quartz で公開している。
	- 私は面倒くさがりやなので、ほとんど設定は変更せずにそのまま使用していて、サイトの構成も追加したページを羅列するだけみたいになっている。
	- 今回はちょっとだけ設定変更して OGP を変更してみる。
- OGP の変更方法
	- `/quartz/static` に favicon と OGP が保存されているので、これを変更する。
	- `/quartz/static/icon.png` を変更するだけで favicon の変更は完了する。
	- `/quartz/static/og-image.png` を変更すると OGP が変更される...と思いきや変更されない。
	- 実は favicon はかなり初期に変更していたのだが、OGP はよくわからなかったので放置していた。
	- 原因を探してみる
		- `quartz` ディレクトリ内を適当に検索してみると `Head.tsx` 内にこのような記述がある。
		- {{i:code1}}
		- つまり、favicon と違って baseUrl という設定項目を参照しているということのようだ。
		- 次に `quartz.config.ts` を参照する。はい、設定箇所ありました。
	- 方法まとめ
		- 1. `/quartz/static/og-image.png` に OGP を入れる保存する。
		- {{break}}
		- 2. `quartz.config.ts` にサイトのホームページの Url を入力する。
- おわりに
	- OGP が変更できた。
	- 

{{s:code1}}

```ts
const iconPath = joinSegments(baseDir, "static/icon.png")
const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`
```

{{e:code1}}

# Output
%%

## はじめに

このサイトは Obsidian で作成したページを Quartz で公開している。私は面倒くさがりやなので、ほとんど設定は変更せずにそのまま使用していて、サイトの構成も追加したページを羅列するだけみたいになっている。今回はちょっとだけ設定変更して OGP を変更してみる。

## OGP の変更方法

`/quartz/static` に favicon と OGP が保存されているので、これを変更する。`/quartz/static/icon.png` を変更するだけで favicon の変更は完了する。`/quartz/static/og-image.png` を変更すると OGP が変更される...と思いきや変更されない。実は favicon はかなり初期に変更していたのだが、OGP はよくわからなかったので放置していた。

### 原因を探してみる

`quartz` ディレクトリ内を適当に検索してみると `Head.tsx` 内にこのような記述がある。

```ts
const iconPath = joinSegments(baseDir, "static/icon.png")
const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`
```

つまり、favicon と違って baseUrl という設定項目を参照しているということのようだ。次に `quartz.config.ts` を参照する。はい、設定箇所ありました。

### 方法まとめ

1. `/quartz/static/og-image.png` に OGP を入れる保存する。

2. `quartz.config.ts` にサイトのホームページの Url を入力する。

## おわりに

OGP が変更できた。