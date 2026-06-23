---
date: 2026-02-09
updated: 2026-02-09
aliases: []
tags:
  - note/publish
description: ターミナルエミュレーターGhosttyにglsl形式のCustom shaderを設定し、カーソルエフェクトなど見た目をカスタマイズする手順と設定例を紹介。
---

# はじめに

ターミナルエミュレーターの[Ghostty](https://ghostty.org/)には[Custom shader](https://ghostty.org/docs/config/reference#custom-shader)という機能があるらしい。

[![参考記事１](https://ogpf.vercel.app/c?url=https://techblog.spiderplus.co.jp/entry/2026/02/05/120000&layout=vertical)](https://techblog.spiderplus.co.jp/entry/2026/02/05/120000)

glslという拡張子のファイルを設定ファイル(`.config/ghostty/config`)に読み込むだけで見た目がかっこよくなるらしい。せっかくGhosttyを使っているのだから設定してみよう。

# 参考リポジトリ

人気リポジトリが３個くらいあるようだった。

> [!quote] 
> 1. [GitHub - 0xhckr/ghostty-shaders: A repository containing many free shaders to use with ghostty (the terminal)](https://github.com/0xhckr/ghostty-shaders)
> 2. [GitHub - sahaj-b/ghostty-cursor-shaders: Custom cursor shaders for ghostty (trails and ripple/pulse effects)](https://github.com/sahaj-b/ghostty-cursor-shaders)
> 3. [GitHub - KroneCorylus/ghostty-shader-playground: Personal space for learn and develop shaders](https://github.com/KroneCorylus/ghostty-shader-playground)

[３番人気のリポジトリ](https://github.com/KroneCorylus/ghostty-shader-playground)はローカルにcloneするとプレビューを見ながら比較できるようになっていたのでここから選ぶことにする。

![プレビュー例](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/shader_example.gif)

このリポジトリのうち、[WIP.glsl](https://github.com/KroneCorylus/ghostty-shader-playground/blob/main/public/shaders/WIP.glsl)を使用することにした。このglslのファイルを設定ファイルの何処かに保存しておく。

# 設定する

設定ファイルに下記のように一行加える(pathは一例)。

```
custom-shader = ~/dotfiles/ghostty/shader/WIP.glsl
```

すると、下のようになる。

![demo](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/demo-of-custom-shader.gif)

shaderは複数重ねがけすることもできるようだが、重くなりそうなのでこれだけにしておく。

# おわりに

Ghosttyのcustom shader機能を使うことで、ターミナルの見た目を手軽にカスタマイズできた。カーソル追従のエフェクトは視覚的にも面白く、作業中のカーソル位置が分かりやすくなるという実用的な効果もある。

shaderファイルは自分で作成することもできるようなので、glslを学んでオリジナルのエフェクトを作ってみるのも良いかもしれない。
