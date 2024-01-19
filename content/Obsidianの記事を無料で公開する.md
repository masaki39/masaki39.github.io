---
created: 2023-12-13
updated: 2023-12-15
---
# はじめに

Obsidianはマークダウン形式でメモをとるので、マークダウンをhtmlに変換したらそのままwebサイトとして使用できる
公式でもにObsidian Publishという機能を作っているが、有料で結構高い
GitHubPagesならマークダウンファイルから自動的にWebサイトをホスティングできるのでしばらく使っていたのだが、基本的なマークダウン形式しかサポートしておらず、そのままアップロードとまではいかない

調べてみると、無料でObsidianから記事を公開するための試みを行っている人が結構いるようで、今回は使用者が多くアップデートが頻回にされているQuartzを使用してみることとした
ホスティングサービスは選べるが、以前のままGitHubPagesを使用することにした

最終形はスマートだが設定が大変

基本このページを参考にしたのでこれで分かる人はこの記事を読む必要はない
**これは補足的記事であるので見比べながら読むのを推奨**
[Creating a blog site with Quartz 4 and Obsidian](https://kanpov.github.io/articles/creating-blog-site-with-quartz4-obsidian)
公式ドキュメントはこちら
[Welcome to Quartz 4](https://quartz.jzhao.xyz)
# 必要なもの

- obsidian: 記事を書く用
- git: GitHubのリポジトリからサイト生成するので必須
- node.js: Quartzはjavascriptのプログラムなので必須

gitは最新版じゃないと動かないことがあるので注意
これらをPCにインストールしておく

- GitHubアカウント作成

当然必要
カスタムドメインを設定しない場合、アカウント名がURLになるので慎重に命名すべし

# ブラウザ上での操作

まずはchromeなどのブラウザ上での操作

## リポジトリの作成

[GitHub - jackyzha0/quartz: 🌱 a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites](https://github.com/jackyzha0/quartz)
ここのv4ブランチからフォークして新規リポジトリを作成
リポジトリは設計図のイメージ、ブランチは設計図の種類・分岐のイメージで最新版がv4
フォークはv4ブランチから自分のリポジトリへコピペすることを指す
設計図もらってきます的なイメージ

後のアップデートを見こしてv4のみのチェック外しておく
リポジトリの名前は自由にできるが必ず下記のルールで記載する
```
masaki39.github.io
```
ユーザーネームは自分のユーザーネームに置き換える
GitHubPagesは1つのアカウントにつき1つのリポジトリが登録できるようになっていて、命名規則が決まっている

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
これは元々GitHubというフォルダがあるとして、そこにクローンを作成する例
cdはターミナルでのフォルダ移動で、記載方法は絶対パスでも相対パスでも良い
初回はユーザー名とパスワードを求められるので、パスワードの際に先程生成したトークンを入力する

これでローカルにもリポジトリが複製された
## npm(パッケージ管理)のインストール

npm(パッケージ管理ソフト)をクローンしたローカルリポジトリにインストールする
パッケージ管理ソフトがないとプログラムが動かせない
```
cd masaki39.github.io
npm install
```
リポジトリ内に移動してnpmをインストールする
## Quartzをたちあげる

ここまで準備してようやくQuartzが起動できる
同様にローカルリポジトリ内で初期設定のコマンドを入力する
```
npx quartz create
```
このときcontentというフォルダが生成される
contentフォルダ内にサイトの中身が入っていれば良い

1. 空のcontentフォルダを作成する
2. 他のfolderをコピーする
3. 他のfolderのシンボリックリンクを作成する

この3択が表示される
Obsidianからならおすすめは３
シンボリックリンクは別のファイルパスの情報を含んだフォルダのことで、PCにディレクトリの位置を誤認させることができる

つまり、Obsidian内に適当なPublishフォルダをつくってそこをシンボリックリンクに指定するとPublishフォルダ内のファイルがこのサイトのcontentとして認識される

> [!caution] 
> シンボリックリンクはディレクトリの位置をPCに誤認させるだけで中のファイルは認識できないので、基本的にgitで管理することはできない  
> Quartzのようなシンボリックリンクに対応したプログラムのみで使用できる 


私の場合はiCloudでObsidianを同期しているのでiCloudDriveのVault内のPublishフォルダを参照している
※iCloudのファイルパスの指定ではスペースにバックスラッシュを入れないといけないという落とし穴があるので別途ぐぐるべし

次にリンク方法について選べるがObsidianで推奨の最短経路の選択で特に問題ない

これでcontentフォルダが生成されたので、この中にノートを入れていけば良い
シンボリックリンクでObsidian内のフォルダを指定した場合はObsidianでのフォルダ移動だけでOK

> [!note]
>  **indexというタイトルのノートがトップページになるので必須**

# ローカルリポジトリでの操作

## サイトのカスタマイズ
Quartzではプログラミングがあまり分からなくても
config.tsやlayout.tsファイルを編集したら色々いじれるようになっている

ぱっと見有用そうなものは以下
### ページタイトルを書き換える
config.tsを書き換える
```
pageTitle:"砂の書庫"
```

### 改行を認識する
defaultでは改行が普通のWebサイトの作り方と同様で２回改行でようやく改行と認識されるので、１回の改行で改行と認識されるように設定
config.tsのtransformerの欄にこれを追加する
```
Plugin.HardLineBreaks(),
```

### Table of Contentsを表示する
layoutの好きなところに、例えばbefore bodyに
```
Component.TableOfContents(),
```
これを追加すると目次が自動生成される

### Recent noteを追加する

最近書いた記事リストを表示する
layout.tsの好きなところに以下を追加する
```
Component.RecentNotes()
```
defaultではoffなので、例えばbacklinkなどの代わりに入れるなど
### その他
かなりいじれるそうだが公式ドキュメントを参照
[Welcome to Quartz 4](https://quartz.jzhao.xyz)

## ローカル環境でテスト

ローカル環境でサイトを構築する
```
cd /Users/masaki/Documents/GitHub/masaki39.github.io
npx quartz build --serve
```
ローカルリポジトリに移動してからlocal hostのコマンドを入力する
cdコマンドでローカルリポジトリへの絶対パスを書いてどっかに保存しておくと次回からコピペで良くなる

サイトを開く
```
open http://localhost:8080
```

ターミナルで開かなくてもブラウザに直接URLを打ち込んでもいい

# deployのための設定

deployとは今回でいうとWebサイトの構築工程のこと

## ローカルリポジトリにて

GitHubPagesを使用するためにはデプロイの設定ファイルdeploy.ymlを作成する必要がある
**最初から作っておけよ**と思うが、Quartzは複数のホスティングサービスに対応しているので種類によって若干設定を変えないといけない様子

作成場所はローカルリポジトリの.github/workflowsディレクトリ
名前はdeploy.ymlで、中身は公式サイトからのコピペで良くて、下記の通り
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

次にブラウザから自分のリモートリポジトリへ行きdeployの方法を指定する
設定→Pages→Build and deploymentをGitHubActions
に設定する

これで同期コマンドを打つとサイトをdeployできるようになった

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

1. Obsidianで作った記事を事前に設定したPublishフォルダに移動する
2. ターミナルで同期コマンドを入力する

これだけでPublishフォルダの中身がWebサイトとして更新できるようになった

非エンジニアでもできるって書いてあるけどね、かなり難しいと思った