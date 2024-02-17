---
date: 2023-12-13
updated: 2024-02-13
aliases:
  - 📘Quartz4で無料でObsidian Publishを代替する
tags:
  - obsidian
  - quartz
  - note/article
cssclasses: 
title: 
description:
---

# はじめに

Obsidian はマークダウン形式でメモをとるので、マークダウンを html に変換したらそのまま web サイトとして使用できる
公式でもに Obsidian Publish という機能を作っているが、有料で結構高い
GitHubPages ならマークダウンファイルから自動的に Web サイトをホスティングできるのでしばらく使っていたのだが、基本的なマークダウン形式しかサポートしておらず、そのままアップロードとまではいかない

調べてみると、無料で Obsidian から記事を公開するための試みを行っている人が結構いるようで、今回は使用者が多くアップデートが頻回にされている Quartz を使用してみることとした
ホスティングサービスは選べるが、以前のまま GitHubPages を使用することにした

最終形はスマートだが設定が大変

基本このページを参考にしたのでこれで分かる人はこの記事を読む必要はない
**これは補足的記事であるので見比べながら読むのを推奨**
[Creating a blog site with Quartz 4 and Obsidian](https://kanpov.github.io/articles/creating-blog-site-with-quartz4-obsidian)
公式ドキュメントはこちら
[Welcome to Quartz 4](https://quartz.jzhao.xyz)

# 必要なもの

- obsidian: 記事を書く用
- git: GitHub のリポジトリからサイト生成するので必須
- node.js: Quartz は javascript のプログラムなので必須

git は最新版じゃないと動かないことがあるので注意
これらを PC にインストールしておく

- GitHub アカウント作成

当然必要
カスタムドメインを設定しない場合、アカウント名が URL になるので慎重に命名すべし

# ブラウザ上での操作

まずは chrome などのブラウザ上での操作

## リポジトリの作成

[GitHub - jackyzha0/quartz: 🌱 a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites](https://github.com/jackyzha0/quartz)
ここの v4 ブランチからフォークして新規リポジトリを作成
リポジトリは設計図のイメージ、ブランチは設計図の種類・分岐のイメージで最新版が v4
フォークは v4 ブランチから自分のリポジトリへコピペすることを指す
設計図もらってきます的なイメージ

後のアップデートを見こして v4 のみのチェック外しておく
リポジトリの名前は自由にできるが必ず下記のルールで記載する

```
masaki39.github.io
```

ユーザーネームは自分のユーザーネームに置き換える
GitHubPages は 1 つのアカウントにつき 1 つのリポジトリが登録できるようになっていて、命名規則が決まっている

## トークンの生成

トークンはパスワードの代わりの位置づけ
下記記事参照
[GitHub – アクセストークンの作成・取得方法とgit操作での使い方](https://howpon.com/5308)
権限はすべて付与しておく

ブラウザからの操作はここで終了

# ターミナルからの操作

以下はターミナルに打ち込んで操作する

## クローンの作成

フォークしたリポジトリをローカルにクローンする
もらってきた設計図を家に持って帰る的なイメージ

```
cd Documents/GitHub
git clone https://github.com/masaki39/masaki39.github.io.git
```

これは元々 GitHub というフォルダがあるとして、そこにクローンを作成する例
cd はターミナルでのフォルダ移動で、記載方法は絶対パスでも相対パスでも良い
初回はユーザー名とパスワードを求められるので、パスワードの際に先程生成したトークンを入力する

これでローカルにもリポジトリが複製された

## npm(パッケージ管理) のインストール

npm(パッケージ管理ソフト) をクローンしたローカルリポジトリにインストールする
パッケージ管理ソフトがないとプログラムが動かせない

```
cd masaki39.github.io
npm install
```

リポジトリ内に移動して npm をインストールする

## Quartz をたちあげる

ここまで準備してようやく Quartz が起動できる
同様にローカルリポジトリ内で初期設定のコマンドを入力する

```
npx quartz create
```

このとき content というフォルダが生成される
content フォルダ内にサイトの中身が入っていれば良い

1. 空の content フォルダを作成する
2. 他の folder をコピーする
3. 他の folder のシンボリックリンクを作成する

この 3 択が表示される
Obsidian からならおすすめは３
シンボリックリンクは別のファイルパスの情報を含んだフォルダのことで、PC にディレクトリの位置を誤認させることができる

つまり、Obsidian 内に適当な Publish フォルダをつくってそこをシンボリックリンクに指定すると Publish フォルダ内のファイルがこのサイトの content として認識される

> [!caution] 
> シンボリックリンクはディレクトリの位置を PC に誤認させるだけで中のファイルは認識できないので、基本的に git で管理することはできない  
> Quartz のようなシンボリックリンクに対応したプログラムのみで使用できる 

私の場合は iCloud で Obsidian を同期しているので iCloudDrive の Vault 内の Publish フォルダを参照している
※iCloud のファイルパスの指定ではスペースにバックスラッシュを入れないといけないという落とし穴があるので別途ぐぐるべし

次にリンク方法について選べるが Obsidian で推奨の最短経路の選択で特に問題ない

これで content フォルダが生成されたので、この中にノートを入れていけば良い
シンボリックリンクで Obsidian 内のフォルダを指定した場合は Obsidian でのフォルダ移動だけで OK

> [!note]
>  **index というタイトルのノートがトップページになるので必須**

# ローカルリポジトリでの操作

## サイトのカスタマイズ

Quartz ではプログラミングがあまり分からなくても
config.ts や layout.ts ファイルを編集したら色々いじれるようになっている

ぱっと見有用そうなものは以下

### ページタイトルを書き換える

config.ts を書き換える

```
pageTitle:"砂の書庫"
```

### 改行を認識する

default では改行が普通の Web サイトの作り方と同様で２回改行でようやく改行と認識されるので、１回の改行で改行と認識されるように設定
config.ts の transformer の欄にこれを追加する

```
Plugin.HardLineBreaks(),
```

### Table of Contents を表示する

layout の好きなところに、例えば before body に

```
Component.TableOfContents(),
```

これを追加すると目次が自動生成される

### Recent note を追加する

最近書いた記事リストを表示する
layout.ts の好きなところに以下を追加する

```
Component.RecentNotes()
```

default では off なので、例えば backlink などの代わりに入れるなど

### その他

かなりいじれるそうだが公式ドキュメントを参照
[Welcome to Quartz 4](https://quartz.jzhao.xyz)

## ローカル環境でテスト

ローカル環境でサイトを構築する

```zsh
cd /Users/masaki/Documents/GitHub/masaki39.github.io
npx quartz build --serve
```

ローカルリポジトリに移動してから local host のコマンドを入力する
cd コマンドでローカルリポジトリへの絶対パスを書いてどっかに保存しておくと次回からコピペで良くなる

サイトを開く

```zsh
open http://localhost:8080
```

ターミナルで開かなくてもブラウザに直接 URL を打ち込んでもいい

# deploy のための設定

deploy とは今回でいうと Web サイトの構築工程のこと

## ローカルリポジトリにて

GitHubPages を使用するためにはデプロイの設定ファイル deploy.yml を作成する必要がある
**最初から作っておけよ**と思うが、Quartz は複数のホスティングサービスに対応しているので種類によって若干設定を変えないといけない様子

作成場所はローカルリポジトリの.github/workflows ディレクトリ
名前は deploy.yml で、中身は公式サイトからのコピペで良くて、下記の通り

```
name: Deploy Quartz site to GitHub Pages
 
on:
  push:
    branches:
      - v4
 
permissions:
  contents: read
  pages: write
  id-token: write
 
concurrency:
  group: "pages"
  cancel-in-progress: false
 
jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Fetch all history for git info
      - uses: actions/setup-node@v3
        with:
          node-version: 18.14
      - name: Install Dependencies
        run: npm ci
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: public
 
  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## リモートリポジトリの設定

次にブラウザから自分のリモートリポジトリへ行き deploy の方法を指定する
設定→Pages→Build and deployment を GitHubActions
に設定する

これで同期コマンドを打つとサイトを deploy できるようになった

設定完了！！

# 同期コマンド

最後にローカルリポジトリのディレクトリからこのコマンドを打ち込んで同期する

```
npx quartz sync
```

これはコピペ用

```
cd /Users/masaki/Documents/GitHub/masaki39.github.io
npx quartz sync
sleep 3
open https://masaki39.github.io
```

ディレクトリ移動とサイト開くのもセットでターミナルで実行できる
若干サイト構築に時間がかかるので、必要に応じて更新して確認する

# おわりに

最終的には

1. Obsidian で作った記事を事前に設定した Publish フォルダに移動する
2. ターミナルで同期コマンドを入力する

これだけで Publish フォルダの中身が Web サイトとして更新できるようになった

非エンジニアでもできるって書いてあるけどね、かなり難しいと思った
