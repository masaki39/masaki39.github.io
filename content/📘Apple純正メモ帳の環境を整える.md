---
date: 2024-06-02
updated: 2024-06-19
aliases: []
tags:
  - note/article
ogp: "https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202024-06-02%2020.00.43%20-%20A%20clean%20and%20organized%20workspace%20featuring%20a%20physical%20notebook%20styled%20like%20Apple's%20default%20Notes%20app%2C%20with%20handwritten%20notes%20that%20mimic%20the%20app's%20struc.jpg"
---

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202024-06-02%2020.00.43%20-%20A%20clean%20and%20organized%20workspace%20featuring%20a%20physical%20notebook%20styled%20like%20Apple's%20default%20Notes%20app%2C%20with%20handwritten%20notes%20that%20mimic%20the%20app's%20struc.jpg)

# はじめに

Apple 純正のメモアプリって実はかなり使いやすい。私はまとまった情報は Obsidian に保存しているが、ちょっとしたスマホでのメモはメモアプリを使っている。先日少しだけメモアプリ周りをいじったのでいじった内容をまとめてみる。Apple ユーザー限定の部分も多いし、時間もないのでスクショが多め。

# フォーマットされたメモを取る

iPhone や Mac で使用できるショートカットアプリを使用する。ショートカットアプリはビジュアルプログラミングみたいな、素人でもプログラミングみたいな動きを作れる。シンプルに、入力した内容と時間をタグを付けてメモするだけのショートカット。ショートカットアプリのレシピは共有可能だが、OS のアップデートで変更されることも多いのでスクショのみ置いておく。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2018.57.30.png)

作成したショートカットは iPhone のホーム画面やロック画面において起動できる。作成したメモはこんな感じ。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/IMG_3645.jpg)

時間を記録できるので、行動ログのような使い方を想定。Twitter や Bluesky みたいなノリ。

# スマートフォルダを活用する

メモアプリにはスマートフォルダという機能がある。自動でフィルタリングする機能だ。これで post タグのもののみをフィルタリングなどができる。かなりフィルタリングの自由度は高い。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/IMG_3646.PNG)

他にも例えば、｢URL を含む｣っていうフィルタでスマートフォルダを作っておくと、Web サイトを保存しておいて後で見返すためのフォルダになる。

# PC で Web サイトをメモアプリに保存する

いわゆる｢後で読む｣的な使用方法をするとして、スマホだとメモアプリに共有するボタンがすぐ出てくるが、Mac だと Safari 以外出てきにくい。ただ、メニューバーには必ず出てくるので、`設定→キーボード→キーボードショートカット→アプリのショートカット` でショートカットキーを当てることができる。これで PC からも Web サイトをメモアプリに楽に保存できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.13.24.png)

# BlueSky へ同時投稿する

[このサイト](https://t-m-log.blogspot.com/2023/12/iphonebluesky.html) を丸パクリ。メモ投稿のショートカットに追加する形で同時投稿パターンを作っておくと便利。注意点は、このサイトで配布しているショートカットには言語の選択がないので、日本語であるということを入れておくこと。多くのフィードは言語フィルターを通すので、言語は入れておいたほうがいい。ちなみに X は元々投稿するアクションが用意されているのでもっとシンプルにできる。そのうち BlueSky も対応してくれる？

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.20.43.png)

# Obsidian への統合

ショートカットアプリはメモから抽出することも、テキストの正規表現や編集、シェルスクリプトを実行することもできるので、メモから内容を抽出してマークダウンファイルに書き込むことは容易。以下は直近 5 つのメモを抽出して Obsidian の Vault 内のマークダウンファイルに書き込む (毎回更新) ショートカット。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.23.48.png)

Dataview で使いやすいようにプロパティに入れてみた。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.27.08.png)

## Dataview で表示させる

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.33.34.png)

コードは省略。ホームページに追加した。

# URL スキームで実行

上の開くボタンや更新ボタン、これは URL スキームを使用している。URL を開く様に、ショートカットを実行できる。使い方は [Appleの公式ページ](https://support.apple.com/ja-jp/guide/shortcuts/apd624386f42/7.0/ios/17.0) に書いてあるが、`shortcuts://run-shortcut?name=[名前]&input=[入力]&text=[テキスト]` とのこと。リンクを貼るようにショートカット実行ボタンを作れる。あらかじめ入力するテキストを指定することもできるのがポイント。注意点はエンコードしないといけないこと。

# Templater でコマンド化

URL スキームは開くだけで実行できるので、Templater で扱うこともできる。例えば、プロパティに memo という項目があり、それを入力としてメモアプリに投稿したい場合。

```js
open("shortcuts://run-shortcut?name=Memo&input=" + encodeURI(tp.frontmatter.memo));
new Notice("投稿しました");
await new Promise(resolve => setTimeout(resolve, 1000));
open("shortcuts://run-shortcut?name=exportMemos");
```

投稿後にメモアプリから Obsidian に出力することで Dataview で拾えるようにする。あくまで一例で自由度は高く作成できる。

# Meta Bind などで UI を作る

コマンド化すると、Meta Bind を使ってボタン化したり UI に取り込んだりできる。メモアプリを統合することで Obsidian のホームページはこうなりました。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-06-02%2019.48.23.png)

# おわりに

画像貼って終わり感が凄いけど、Apple ユーザー限定で Obsidian そこそこ触れる人向けでかなりコアな感じがする。刺さる人には刺さる？
