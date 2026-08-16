---
date: 2025-07-04
updated: 2025-07-04
aliases: []
tags:
  - note/publish
description: VS CodeとDocker Dev ContainerでRocker環境を構築し、renvでパッケージ管理を自動化、Claude Codeを統合してAIによる対話型データ解析を可能にする環境構築手順と、再現性・共同開発に優れた解析基盤のメリットを解説します。
---

# はじめに

私はそこまで難しい解析をすることはないが、データを集めて解析するような作業をしないといけない期間が定期的に訪れる。この時の解析環境は再現可能性が最も重要であると考えて、Dockerとrenvを使用した方法を考えて行ってきた。

> [!quote] [[📘Dockerとrenvを使用したR解析環境構築]]

この方法だと、毎回完全に環境を再現したRStudioを高速で起動して使用することができるので非常に便利なのだが、環境が独立しているがゆえにAIとの統合に難がある。具体的には、コードそのものはAIに書かせることができるのだが、コードの実行はDocker内でしか行えない。実行結果は出力ファイルから推察してもらうか、こちらから教えるしかない。非効率である。

流石にしょうがないかと思っていたのだが、最近になってClaude codeやGemini CLIなどのターミナル統合AIが出現してきたため、AIとDocker環境との統合が技術的に容易になってきたはずだと考えた。

調べると、かなり簡単に要望を実現できそうだった。VS codeのDev Containerという拡張機能を使用する。

# 必要なアプリ

- [Visual Studio Code](https://code.visualstudio.com)(VS code)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

※Claude codeの使用には[Claude](https://claude.ai/new) のProプラン以上への課金が必要

# VS codeの設定

VS codeはコーディング用のテキストエディターである。まず今から解析を行うフォルダを開く。適当に`test`フォルダを作り、開いてみる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704201428.webp)

拡張機能のDev Containerをインストールする。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704201608.webp)

コマンドパレット(⌘+⇧+P)で`Dev Containers: Add Dev Container Configuration Files`を実行する(WindowsだとCtrl+Shift+P？)。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704201649.webp)

`Add configuration to workspace`を選択

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704201753.webp)

rockerと検索し`R(rocker/r-ver base)`を選択

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704201831.webp)

バージョンは何でもいいが、defaultだとlatestで更新とともに随時変更される。コンセプト的には固定した方が良さそうなので4.4で。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704202027.webp)

若干imageのサイズが大きくなるが色々できそうなtidyverseを選択

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704202206.webp)

feature(追加機能)にrenv cacheを追加。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704202633.webp)

これはRには関係ないので無視。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704203312.webp)

`.devcontainer/devcontainer.json`が作成される。さらにfeaturesにClaude codeの機能を追加するために、

```json
"features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
}
```

と追記する([公式リポジトリ参照](https://github.com/anthropics/devcontainer-features))。
するとこうなる。

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the
// README at: https://github.com/rocker-org/devcontainer-templates/tree/main/src/r-ver
{
	"name": "R (rocker/r-ver base)",
	// Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile
	"image": "ghcr.io/rocker-org/devcontainer/tidyverse:4.4",
	"features": {
		"ghcr.io/rocker-org/devcontainer-features/renv-cache:0": {},
		"ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
	},

	// Features to add to the dev container. More info: https://containers.dev/features.
	// "features": {},

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "R -q -e 'renv::install()'",

	// Configure tool-specific properties.
	// "customizations": {},

	// Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.
	// "remoteUser": "root"
}

```

今作成された`devcontainer.json`に基づいた解析環境のDocker imageが生成(Build)できるようになる。

# 起動方法

コマンドパレットでBuildする。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704204150.webp)

もしくは左サイドバーにDev Container用のタブが出るので、そこからBuildする。初回は数分かかる。Docker Desktopを開くとimagesに設定通りのDocker imageが構築され、

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704204332.webp)

Containersが起動している。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704204427.webp)

Github Copilotは勝手についてくるので、下記のような状態で環境構築が完成する。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250704204619.webp)

# renvの起動方法

さらに追加したRパッケージを記録してくれるrenvを導入する。renv自体は最初からimageに含まれているのでインストールは不要となっている。

ターミナルでRを起動

```zsh
R
```

renv開始

```r
renv::init()
```

するとrenv関連のファイルが作成される。renvで最低限覚えておくべきコマンドは、現在使用中のパッケージを`renv.lock`に記録する

```r
renv::snapshot()
```

と、`renv.lock`を基にパッケージを復元する

```r
renv::restore()
```

だけである。通常はコンテナを閉じるたびに追加インストールしたパッケージは消滅するので、コンテナを開くたびに再インストールが必要だが、今回はfeaturesにrenv cacheを追加してインストールしたパッケージをDockerのVolumeというところに隔離して保存しているので、毎回の再インストールの必要はない(起動の高速化)。

# Claude codeの導入

ターミナルで

```zsh
claude
```

と打つとClaude codeが起動する。アカウント認証と初期設定が始まるので進める。Claude code自体の使い方は巷にあふれているので今回は割愛する。

最低限知っておくべきはClaude.mdというファイルに動作の要件を書くということで(これも書いてもらえる)、あとは対話を進めるだけとなる。

# 所感

Claude codeはシステム内のCLIの全てを使えるので、コードの改変から実行、結果の解釈までをすべて自動で進めてくれる。コードの実行や権限の付与などを逐次聞いてくれるのでyes or noを繰り返しているだけで意思どおりに動かしやすくなっている。この点Cursorは勝手に突っ走っていくような感覚があるので体験は大きく異なっている。万が一破壊的な変更をされたとしてもDocker内部の話なので問題ないこともポイント。

一方で、VS codeにはRstudioやJupyterなどのようにコードチャンクをhtmlでレンダリングするような機能はないので、コードの実行結果はターミナルでRを起動してそこに表示されるのを見るか、結果として出力されるファイルを別途開くかしかない(逆にClaude code側は全ての結果を把握できている)。一手間感はあるが不便というほどではない。

またこのRockerの解析環境のimageにはGitがもともと入っているようなので、Gitによるバージョン管理や差分管理、遠隔での共同開発も可能となっている。Dev containerやrenvと組み合わせることで、考えうる限りの堅牢な作りになっていると思われる。

こちらがやるべきことは、データを渡して仮説を立てて解析を依頼、あとはClaude codeの提案に対する意思決定となっている。コードを書く必要はほぼないが、成果物のクオリティはかなり高い印象だった。

# おわりに

Dev Containerは素晴らしく、仕組みの複雑さの割にセットアップの難易度がかなり低くなっている。使用感は完全に対話型の解析環境と言える。
