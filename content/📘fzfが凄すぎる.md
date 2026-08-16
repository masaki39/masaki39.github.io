---
date: 2026-02-24
updated: 2026-02-24
aliases: []
tags:
  - note/publish
description: fzfは、高速なリアルタイム検索ツールであり、ターミナルでのファイル検索、コマンド履歴検索、パイプライン処理、外部ツールとの連携など、様々な用途で利用でき、Yaziやzoxideなどのツールとの統合も強力。
---

# はじめに

[fzf](https://github.com/junegunn/fzf)というツールを知っているだろうか。fzfは高性能なリアルタイム検索ツールである。

![fzf-official-screenshot](https://raw.githubusercontent.com/junegunn/i/master/fzf-preview.png)

私は[Yazi](https://yazi-rs.github.io)というターミナルファイルマネージャーを使用しており、Yaziにはデフォルトでfzfのプラグインがついている。

> [!quote] [[📘PC内をYaziで飛び回ろう]]

Yaziも手に馴染んできて、使うと使うほどこのfzfが凄すぎるということに気がついてきた。これはYazi上からだけでなく、ターミナル単体で使う場合でも同様だ。

何が凄いか。私はマークダウンについてはObsidianで管理しておりここに一切の不満はないが、生きているとその他諸々のファイルが溜まってきて膨大になってくる。ある程度は時系列のディレクトリ構成で整理されているが、いかんせん量が多すぎるので過去の資料はほぼほぼ死蔵状態になっている。fzfはここを解決しうるツールである。

例えば私はpCloudというクラウドストレージを使っているが、ここには過去の大量のバイナリデータが保存されている。現在およそ4万弱のファイルがあるが、fzfを使うとこの4万ファイルからリアルタイムで検索結果を表示しつつ絞り込むことができる。曖昧検索なので多少タイプミスがあってもOKで、**とにかく速い**。異様に速く目的地に到達できるので、ディレクトリ構成などは全く考慮しなくてよくなる。

さらに、パイプラインを組める。他のツールで取得した情報をfzfに流し込んで検索した情報を基に次のツールに渡せる。最近はfzfに情報を流す方法について考えていたので、ツール名の羅列が脳内に並び、｢[パルスのファルシのルシがパージでコクーン](https://dic.nicovideo.jp/a/%E3%83%91%E3%83%AB%E3%82%B9%E3%81%AE%E3%83%95%E3%82%A1%E3%83%AB%E3%82%B7%E3%81%AE%E3%83%AB%E3%82%B7%E3%81%8C%E3%83%91%E3%83%BC%E3%82%B8%E3%81%A7%E3%82%B3%E3%82%AF%E3%83%BC%E3%83%B3)｣状態となっていた。

本記事では、暫く考えた末の現時点での使い方(仮)を記録する。

# インストール

Macの場合はHomebrewでインストールできる。

```zsh
brew install fzf
```

# ターミナル統合

これは[公式のREADME](https://github.com/junegunn/fzf?tab=readme-ov-file#setting-up-shell-integration)に記載の方法である。MacのデフォルトのシェルであるZshellの場合、.zshrcに下記のように記載する。

```zsh
# Set up fzf key bindings and fuzzy completion
source <(fzf --zsh)
```

3つのコマンドが使用できるようになる

- ctrl + r: コマンド履歴検索
- ctrl + t: ファイル名検索→コピー
- alt + c: ディレクトリ検索→移動

インストールするだけで十分実用的だ。

# zoxide統合

ディレクトリ移動の際に、移動する頻度の高いディレクトリを覚えて移動できるツール[zoxide](https://github.com/ajeetdsouza/zoxide)、これもfzfと統合する機能がついている。ちなみにzoxideのプラグインもYaziにデフォルトでついてくる。

Zshellの場合は、.zshrcに下記を記載する。

```zsh
eval "$(zoxide init zsh)"
```

zコマンドが使用できるようになる。例えば、よくDownloadフォルダに移動するとしたら、

```zsh
z down
```

と打てば、downっぽい一番頻度の高いディレクトリに移動する。DownloadフォルダによくいくならDownloadフォルダに移動する。

fzfがインストールされている場合は、

```
zi
```

と打つとfzfの検索画面から高頻度ディレクトリ一覧が表示されてそこから検索→移動できるようになる。

ディレクトリ移動はzoxide→fzfだけでほぼほぼ十分と言えるくらい強力な組み合わせである。

# パイプラインを作る

zoxide→fzfのように、fzfに流し込む情報を変えれば独自のパイプラインを組める。複雑そうに見えて仕組みは割とシンプルで、

1. fzfにどの情報を流し込むか
2. 検索結果から何をさせるか

ということだけ考えれば良い。ということで、.zshrcに記載する関数をいくつか作った。

## ghq連携

GitHubやGitに慣れてくるとGitリポジトリが増えてくる。ghqはローカルにあるGitリポジトリを綺麗に整理するツールだ。ghq listでghqが管理するリポジトリ一覧が取得できるので、それをfzfで検索して移動する。

1. fzfに流し込む: ghq list
2. 実行: cd

> [!note] 依存
> - [ghq](https://github.com/x-motemen/ghq)

```zsh
function gq() {
  local target=$(ghq list | fzf)
  if [ -n "$target" ]; then
    cd "$(ghq root)/$target"
  fi
}
```

![ghq-fzf-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260224124619.webp)

ローカル管理のリポジトリにfzfで移動できるようになる。

## gh連携

GitHubのリポジトリをブラウザで開くのは地味に面倒くさい。GitHubのCLIでうまく解決する。

1. fzfに流し込む: gh repo list
2. 実行: gh repo view -w

> [!note] 依存
> - [gh](https://cli.github.com/)
> - [bat](https://github.com/sharkdp/bat)(プレビュー用)

```zsh
function ghb() {
  local selected=$(gh repo list --limit 100 --json nameWithOwner --jq '.[].nameWithOwner' | \
    fzf --prompt "gh repo: " \
        --preview "gh repo view {} | bat --color=always --style=plain --language=markdown" \
        --preview-window=right:60%:wrap)

  [ -n "$selected" ] && gh repo view -w "$selected"
}
```

![gh-fzf-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260224125136.webp)

READMEのプレビューを見ながらGitHubのリポジトリを検索して、ブラウザで開くことができる。

## Zellij連携

Zellijはターミナルマルチプレキサである。ターミナルマルチプレキサを使っていない場合はこのセクションは飛ばしてもらって構わない。以前[[📘Zellijでターミナルは進化する]]という記事で記載した、レイアウトをsession名=Git repository名で起動する自作関数をfzfで起動する。

1. fzfに流し込む: zellijのlayout一覧(設定ディレクトリから取得)
2. 実行: 自作関数

> [!note] 依存
> - [Zellij](https://zellij.dev/documentation/)

```zsh
# git_root: get git root directory, fallback to current directory if not in a git repo
function git_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

# zellij attach template (session name = git root dir)
function _zellij_attach() {
  cd "$(git_root)"
  local session_name=$(basename "$(pwd)")
  zellij delete-session "$session_name" 2>/dev/null # delete-session command doesn't delete active session
  zellij --layout "$1" attach --create "$session_name"
}

# zellij fzf layout launcher
function zz() {
  local layout_dir="${ZELLIJ_CONFIG_DIR:-$HOME/.config/zellij}/layouts"
  local selected=$(ls "$layout_dir" | sed 's/\.kdl$//' | { cat; echo "welcome"; } | fzf --prompt="zellij layout: ")
  [ -z "$selected" ] && return
  if [ "$selected" = "welcome" ]; then
    zellij delete-session welcome 2>/dev/null
    zellij --layout welcome attach --create welcome
  else
    _zellij_attach "$selected"
  fi
}
```

ターミナルでのレイアウト起動が1コマンドにまとまる。

# Yazi統合

Yazi上で同様にfzfを使うこともできる。というか私はここから入った。fzfのディレクトリ移動機能とzoxide統合機能は元々プラグインが入っている。Yaziに抵抗がなければ、ここから入るのが一番fzfが使えるように思う。なんせ、インストールしてYazi上でzやZを押すだけである。

なお、Yazi上でもghq連携をしたくてマイクロプラグインを作った。

> [!quote] [[📘ghq用のyaziプラグインを作った]]

さらに、fzfでディレクトリ検索をしたくて、fd -t dをfzfに流し込むプラグインも作った(fdもYaziについてくる検索系ツール)。

> [!quote] [GitHub - masaki39/fd-fzf.yazi: a Yazi plugin to jump to directories using fd and fzf.](https://github.com/masaki39/fd-fzf.yazi)

# curl→jq→fzf→pbcopy

これは詳しくない人には暗号にしか見えないかもしれない。一連の流れを日本語で言うと「ネット上のJSONデータをダウンロードして、fzfで選択肢として表示し、選んだ結果をクリップボードにコピーする」ということだ。ネット上にはjson形式でデータベースを保存してあることがよくあり、これをfzfでいい感じに取得してくるCLIツールを作る。

ツール名を明示して言うと、ネット上のjsonデータベースをcurlコマンドでダウンロード、jqというjson編集ツールでfzfに流し込める形に整形して、必要な情報をクリップボードにコピーする(pbcopy)という流れだ。

Mac想定で作成した。割と独立した機能であるしjqやfzfなどの依存もあるのでHomebrewのTapという機能で管理することにした(Homebrewは依存を自動で解決するので)。

## emoji

これは実験的に作成したCLIだ。

```zsh
brew tap masaki39/tap
brew install emoji
```

でインストールできる。

![emoji-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260224132358.webp)

絵文字データベースをダウンロードして、fzfで検索、選んだ絵文字をコピーする。

## csl

Zoteroのstyle repositoryからcitation-style-languageという引用形式を指定するファイルのurlをコピーする。

```zsh
brew tap masaki39/tap
brew install csl
```

でインストールできる。

![csl-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260224132557.webp)

# おわりに

最後の方は趣味的かもしれないが、fzfには無限の可能性がある。｢curlしたjsonをjqでfzfに渡してpbcopy｣のは狂言のようで十分に意味の通った言葉なのだ。
