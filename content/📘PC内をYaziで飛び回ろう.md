---
date: 2025-10-15
updated: 2025-10-15
aliases: []
tags:
  - note/publish
description: Yaziは、ターミナル上で動作する高速でカスタマイズ可能なファイルマネージャーであり、Zoxideによるディレクトリ高速移動、プレビュー機能、キーボード操作による効率的なファイル管理を実現し、Finderやエクスプローラーの代替として活用できます。
---

# はじめに

長らく仕事でPCを使用していると、膨大な数のディレクトリやファイルを管理しないといけなくなる。エイリアスやショートカットを駆使しても徐々に煩雑さは増していく。しかし、ターミナル上で動作するYaziを使えば、非常に軽快にPC内を移動し、素早く目的のファイルまでたどり着くことができる。本稿ではそんな神ツールYaziを紹介する。

# Yaziとは

[Yazi](https://github.com/sxyazi/yazi)とは、ターミナル上で動作するファイルマネージャーである。簡単に言うと、Macで言うところのFinder、Windowsでいうところのエクスプローラーである。ちなみに中国語でアヒルを意味するらしい。

![](https://i.gyazo.com/46e6caf891235b3e0bad9f4d9eb94057.webp)
↑Yaziの画面例

- プレビュー画像を表示できる
- 通常エンジニアが使うような高機能な検索が使える
- キーボードで様々な操作ができる(ファイル作成、コマンド、コピペなど)

と言う点で非常に優秀だ。キーボード操作はすぐに慣れる。`:`でコマンドを打つことができるので、`:open .`でFinderで開いたり、`:code .`でVSCodeで開いたり、様々な動きができて柔軟性が確保されている。

更にMacの場合、デフォルトのFinderには`.DS_Store`という隠しファイルが量産されたり、NFD問題と呼ばれるファイル名の問題があったりするので、それを回避できるメリットが大きい(本記事では触れないので興味があれば調べるべし)。

# 特に便利な機能：Zoxide

`Z`で起動できる。最近訪れたディレクトリから検索して移動できる。95%くらいの率でこれで事足りる。

![](https://i.gyazo.com/2f0fd71002a3cb5eb9793ca699e71f89.webp)

# Yaziのセットアップ

私の環境はMacであるので、Macのセットアップの手順を記載する(Homebrew使用)。Windowsでも大筋は同じと思われる。

## インストール

下記コマンドでYaziと他の依存関係をまとめてインストールする。

```zsh
brew install yazi ffmpeg sevenzip jq poppler fd ripgrep fzf zoxide resvg imagemagick
```

Yaziは単独でも使用可能だが、プレビュー機能や検索機能は他のCLIツールに依存する。逆に言うと、CLIに不慣れでも強力なCLIツールの恩恵を受けることができるということでもある。

| ツール名          | Yaziでの主な機能                     |
|:------------ |:----------------------------- |
| `ffmpeg`      | 動画・音声ファイルのプレビュー                |
| `sevenzip`    | 7z形式のファイル圧縮・解凍･プレビュー           |
| `jq`          | JSONファイルのプレビュー                 |
| `poppler`     | PDFファイルのプレビュー                  |
| `fd`          | ファイル検索機能の強化                    |
| `ripgrep`     | ファイル内容の高速検索                    |
| `fzf`         | 高速なファイル・ディレクトリジャンプ、履歴検索        |
| `zoxide`      | 頻繁にアクセスするディレクトリへの高速移動(fzfが必要)  |
| `resvg`       | SVGファイルのプレビュー                  |
| `imagemagick` | 各種画像フォーマットのプレビュー (特に大きい・複雑なもの) |

不要なものは入れなくても構わないが、とりあえず全部入れておいて損はない。

## Ghosttyを使用する

さらに、[nerd-fonts](https://www.nerdfonts.com)というフォント＆アイコンパッチの使用が推奨されている。インストールしてターミナルに設定をするときれいなアイコンが表示される。しかし、Mac/Linuxユーザーであればターミナルの代わりに[Ghostty](https://ghostty.org/download)を使用すればデフォルトでnerd-fontsに対応しているので、特に設定は不要である。

![](https://i.gyazo.com/d4f4e832c86362653e161bc3621ab6fc.webp)
↑デフォルトのターミナル(左)とGhostty(右)の比較
※[Starship](https://github.com/starship/starship)というシェルプロンプトを併用している

## 起動時の設定

ターミナルで下記を実行すると起動できる。

```zsh
yazi
```

ただし、シェルの設定にシェルラッパーを設定することで、`y`だけで起動できてかつYaziを終了した際にその位置にターミナルのディレクトリを移動することができる。Zshの場合は`.zshrc`に下記の様にシェルラッパーを定義する。

```zsh
function y() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
	yazi "$@" --cwd-file="$tmp"
	IFS= read -r -d '' cwd < "$tmp"
	[ -n "$cwd" ] && [ "$cwd" != "$PWD" ] && builtin cd -- "$cwd"
	rm -f -- "$tmp"
}
```

この方法は公式が推奨している。詳細は[Quick Start \| Yazi](https://yazi-rs.github.io/docs/quick-start)を参照。

# その他の設定

## tiffのプレビューをする

私は職業上tiffファイルを使用しないといけないことがある。tiffファイルのプレビューを有効化しようと思うと`.config/yazi/yazi.toml`に下記のように記載する必要がある(imagemagickが必要)。

```toml
[plugin]
prepend_previewers = [
	{ mime = "image/tiff", run = "magick" },
]
```

> [!quote] 参考
> [TIF Image Preview · sxyazi/yazi · Discussion #2087 · GitHub](https://github.com/sxyazi/yazi/discussions/2087)

## デフォルトのエディターをmicroに変更する

Yaziの中ではVimというエディターを使用してその場でテキストファイルを作成したり編集することができる。これも非常に便利な機能の1つである。ただVimは若干エンジニア向けなので、直感的操作ができるターミナルエディターの[micro](https://micro-editor.github.io)をインストールして使用できるようにしてみる。

インストール

```zsh
brew install micro
```

`.config/yazi/yazi.toml`に下記の様に追記する。

```toml
[opener]
edit = [
        { run = 'micro "$@"', block = true, for = "unix" },
]
```

## プラグイン

[Yazi用のプラグイン](https://github.com/yazi-rs/plugins?tab=readme-ov-file)が色々あるようだ。今後必要であれば追加していこう。

> [!note] 2026-04-15追記
> 
> 自作プラグインも割と作りやすい。
> 
> [[📘ghq用のyaziプラグインを作った]]
> [[📘git履歴からファイルを復元するYaziプラグインを作った]]
> 
> [→その他](https://github.com/masaki39?tab=repositories&q=yazi&type=&language=&sort=)

# おわりに

Yaziは高いカスタマイズ性を持ちながらもそのままの設定でも便利に使用できる。Zoxideによる高速移動、強力な検索機能、そして豊富なプレビュー機能により、日々のファイル操作が劇的に改善される。これを機にFinderからは卒業し、キーボード中心の快適なファイル管理を行っていこう。
