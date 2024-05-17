---
date: 2024-05-15
updated: 2024-05-18
aliases: []
tags:
  - note/article
ogp: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202024-05-18%2000.02.16%20-%20A%20horizontal%20OGP%20image%20with%20an%20illustration%20style.%20The%20scene%20shows%20a%20vibrant%2C%20modern%20workspace%20where%20a%20character%20is%20creating%20an%20attractive%20homepage%20on.jpg
---

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202024-05-18%2000.02.16%20-%20A%20horizontal%20OGP%20image%20with%20an%20illustration%20style.%20The%20scene%20shows%20a%20vibrant%2C%20modern%20workspace%20where%20a%20character%20is%20creating%20an%20attractive%20homepage%20on.jpg)

# はじめに

今回は完全に趣味回です。Obsidian 盆栽。目的は、Obsidian のホームページをしっかり作ること。起点となるノートがやっぱり欲しいですよね。今までも Home という名前のページを作ったりしていたのですが、適当に作っても使えるものにはなりません。今回は本腰を入れて見た目も機能性も優れるホームページを作成します。

使用するのは、[Dashboard++](https://medium.com/obsidian-observer/dashboard-a-simple-organization-and-navigation-method-for-obsidian-vaults-2b1982d023a0)。これは 2023 年の Template のアワードに入っていましたね。ずっと気になっていました。作者様のオススメの使用方法がかいてあるので、それに則って構成していきます。意識するのは、既存の構造には影響を及ぼさないようにすること。あくまでホームページづくりなので、独立性は保ちます。完成品はこちらです。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/2024-05-17%2023.49%E3%81%AE%E7%94%BB%E5%83%8F.jpg)

# Dashboard++ の CSS スニペットを追加

Dashboard++ はただの CSS スニペットなので、導入は滅茶苦茶簡単です。[dashboard.css](https://github.com/TfTHacker/DashboardPlusPlus/blob/master/.obsidian/snippets/dashboard.css) をダウンロードして CSS スニペットのフォルダに追加、有効化するだけで OK。プロパティに `cssclasses: dashboard` と入力すると有効になります。幅を最大にしたい場合は [dashboard-ReadLineLength.css](https://github.com/TfTHacker/DashboardPlusPlus/blob/master/.obsidian/snippets/dashboard-ReadLineLength.css) も追加します。バレットリストがリーディングビューで自動的にダッシュボード様の見た目に変化します。

# リーディングビューにする

リーディングビューでしか見た目は変化しないので、デフォルト設定で Reading view にするか Force note view mode というプラグインを使えとのこと。デフォルト表示は Live preview が良いのでプラグインを導入します。

```yaml
obsidianEditingMode: source
obsidianUIMode: preview
```

プロパティで上記入力すると開くたびに Reading view にできます。編集モードも指定できますが、コードブロックが多くなりそうなので source が良いでしょう。ホームページ以外では使用しない予定。

# Banners

バナー表示するプラグイン。プロパティに `banner: 画像url or 内部リンク` を入力するとバナー表示できます。面倒なので全てデフォルト設定のままです。指定した画像サイズが合わないときはズームしたりスクロールできるようになります。

## ランダム画像を取得する

そういうサービス、あるだろと思って検索するとやはりありました。[Lorem Picsum](https://picsum.photos/) を使用します。`https://picsum.photos/200/300` みたいに画像サイズを指定するだけでランダムで画像を取得できます。

![](https://picsum.photos/200/300)

他に id 指定、seed 値指定、グレースケール、ぼかし表示、拡張子指定などのオプションがあります。今回は、ノート PC の解像度に合わせて 1440×250 のサイズで指定しました。これで毎回開くたびに違う画像が表示されるようになります。

## タイトルとプロパティが透ける問題

これは issue にも挙がってます。タブバーを非表示にしたインラインタイトルとプロパティが裏に透けてしまう問題がある様子。プロパティをソース表示にすると大丈夫ですが、プロパティ表示は比較的新しいですしね。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-05-16%208.05.27.jpg)

タイトルは設定で非表示にできます。編集は F2 キーで行うように。個人的にはこっちの方がマウス操作不要で好み。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-05-16%208.17.14.jpg)

プロパティは CSS で対応しましょう。[reddit](https://www.reddit.com/r/ObsidianMD/comments/167wry4/properties_and_banner_plugin/) に書いてあるのを発見しました。さらに [jazzさん](https://wineroses.hatenablog.com/entry/2024/03/09/113656) のサイトに `プロパティ` っていう文字を消すスニペットを発見。ついでに加えておきます。

```css
/* Hide properties */
body {
  --metadata-display-reading: none;
  }

.metadata-properties-title {
    visibility: hidden;
  }
```

とりあえずの対応が完了しました。

# さらに CSS を追加

CSS で非表示にするの、もっとあるでしょ。具体的には、リボンとサイドバー消せないか。あるはずと思って探すとすぐ見つかります。Hider プラグイン。テーマ Minimal の作者様ですね。設定から CSS のオンオフを行うだけのプラグインなので、`style.css` から該当箇所を抜いてきます。

```css
/* Hide ribbon */
.mod-macos.is-hidden-frameless:not(.is-fullscreen):not(.is-popout-window) .workspace-tabs.mod-top-left-space .workspace-tab-header-container {
  padding-left: calc(var(--frame-left-space) + var(--ribbon-width));
}

.workspace-ribbon.mod-left {
  display:none;
}
.workspace-ribbon.mod-right {
  visibility:hidden;
  position:absolute;
}
.workspace-split.mod-right-split {
  margin-right:0;
}
.workspace-split.mod-left-split {
  margin-left:0;
}

/* Hide sidebar buttons */
.sidebar-toggle-button.mod-right,
.sidebar-toggle-button.mod-left {
  display: none;
}
.mod-macos.is-hidden-frameless:not(.is-popout-window) .workspace .workspace-tabs.mod-top-right-space .workspace-tab-header-container {
  padding-right: 4px;
}
```

CSS スニペットに追加して、さぁ、ついに完成か。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-05-16%206.32.21.jpg)

いい感じじゃないでしょうか。リボンを消した分右が余ったので、この後 `dashboard.css` の幅を 250px→300px に拡大しました。

# Dataview のインラインクエリ

項目を追加していきます。何と Dashboard++ は Dataviewjs のインラインクエリ対応とのことです。余りよく分からないので、Example をパクります。使用したのは 2 種類。

1 つはリンクをフォルダやタグから抜いてくるインラインクエリ。`dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(4).file.link)`←この pages の後にフォルダやタグをいれて、並べ順を変えたりしてカスタマイズします。

もう 1 つは集計で `dv.pages().length` でページ数をカウントします。これも少しだけ条件加えて `dv.pages().where(f=>f.file.cday.ts==dv.date('today').ts).length` で今日作成したファイル数にするとかできます。

# 構成

私の PC では 4 列できるので、PARA method の 4 分類を参考に短期目線、長期目線、役に立つ者、(アーカイブは要らないので)stats の 4 列にしました。

# オススメされていたけど不採用

## Emoji Toolbar

絵文字入力補助プラグイン。英語圏だと便利かもしれないが、日本語入力だと変換で絵文字出せるので重要度は下がる。見送り。

## Customizable Page Header and Title Bar

タブバーにボタンを設置できる。ブラウザみたいに戻るボタンや進むボタンやホームボタンを作ると良いって書いてあるけど、全部ホットキーに設定しているので見送り。そもそもタブバー非表示だし。今なら Commander プラグインの方が性能は良さそう。

# Minimal をの card を利用する

まだ終わりません。この間 [[📘QuartzのOGPを変更]] してからやりたいことがありました。テーマ Minimal の cssclass の card に OGP を反映させたら映えるだろうと。Dataview ですね。

```js
table without id 
dateformat(file.ctime,"yy年MM月dd日 HH時mm分") as Date,
choice(ogp, "![](" + ogp + ")", "![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/og-image.png)") as OGP,
"<progress value='" + file.size + "' max='20000'></progress>" + round(file.size/2) + "文字" as Count,
file.link as Note
from #note/article and -#draft
sort file.ctime desc
limit 7
```

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/2024-05-17%2023.19%E3%81%AE%E7%94%BB%E5%83%8F.jpg)

いいですねー。実はプログレスバーは [[Dataviewを使い込む]] で履修済みなんですよね。文字数はファイルサイズで概算なので滅茶苦茶誤差大きいです。日本語 1 文字が 2B なので。あくまで目安で、映え重視です。まだデフォルト表示のものが多いですね。今後、追加していきたいところ。

# image-grids でボタンを作る

Minimal にはまだ秘密兵器があります。その名も cssclasses、image-grids！画像を横並びにします。画像リンクを並べていきます。もしかしたら公式の技ではないかもしれないけど、`[![](画像URL)](URL or リンク or URI)` でリーティングビューだけで有効な画像リンクが作れます。できへんかなと思ったらできたやつ。例えば [![|32](http://www.google.com/s2/favicons?domain=https://masaki39.github.io)](https://masaki39.github.io) これは私のサイトへのリンクになります。

ただこれ、難点があります。リンクの更新に耐えれません。恐らくマークリンクの更新は `\[.*!\]\(.*\)` でマッチしてるので、重ねがけで書くと更新時に壊れます。内部リンクには向かないでしょう。Dataview で作るのはありですが、ノート名にスペースが入ると有効にならないので、やはり内部リンクには向かなそうです。

image-grids で画像が横並びになるのでどんどん並べます [![|32](http://www.google.com/s2/favicons?domain=https://www.youtube.com)](https://www.youtube.com)。画像の取得が面倒なので favicon を取得するようにしましょう。

## favicon 画像を使う Templater スクリプト

URL をコピーして `[![|32](http://www.google.com/s2/favicons?domain= tp.system.clipboard())](tp.system.clipboard())` という Templater スクリプトで favicon の URL を使った画像リンクを貼り付けます。コードの囲いは記事内での誤動作防止に省略。どうでもいいですが、テンプレートのプレフィックスを🍤(てんぷら) にし始めました。

# Meta Bind

ここまで来ると極めたくなってきました。コマンドを追加するボタンを追加します。考えたのは先程の画像リンクに Advanced URI を使用してコマンド実行するか、Button プラグインですね。Button プラグインのページに行くと｢まだこれ使ってるの？www｣と煽り文句が書いてあります。まんまと Meta Bind へ誘導されます。

## Meta Bind とは

Button の後継プラグインらしい。読んでみると多種多様の入力ブロックと出力ブロックを作れる、また、色んな機能を持たせたボタンを作れるとのこと。フロントマターと紐づけることで保存したり連動させたりすることができる。ただ、**フロントマター連動のボタンは作れない**んですよね。残念。

## Dataviewjs でコードブロックを作る

[天才](https://github.com/mProjectsCode/obsidian-meta-bind-plugin/discussions/149) がいました。[天才](https://github.com/mProjectsCode/obsidian-meta-bind-plugin/discussions/149)！Dataviewjs で Meta Binds のコードブロックを書けば良いじゃんという話のよう。フロントマターの search の値を参照した Another Quick Switcher の Recent Search ボタンを作ります。

```js
const str = dv.current().file.frontmatter.search;

dv.paragraph('```meta-bind-button' + `
label: Search
icon: ""
hidden: true
class: ""
tooltip: ""
id: rsearch
style: default
actions:
  - type: command
    command: obsidian-another-quick-switcher:search-command_recent-search
  - type: input
    str: "${str}"
`+'```')
```

Dataview から読み取るので、refresh の interval を狭くする必要があります。設定で 100ms に変更します。連動するインプットと Landmark Search も作成しました。

完成！！![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/2024-05-17%2023.49%E3%81%AE%E7%94%BB%E5%83%8F.jpg)

# おわりに

いかがだったでしょうか。ゴリゴリのホームページが完成しましたね。このページのためだけに Homepage、Banner、Force note view mode、Meta Bind の 4 つを投入するというゴリラっぷり。他には全く影響していないので独立した機能となります。そこそこ使えそうだし、盆栽ページとしても有能です。
