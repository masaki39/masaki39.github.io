---
date: 2024-07-20
updated: 2024-07-20
aliases: []
tags:
  - note/article
ogp: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-07-20%2020.44.08.png
---

# はじめに

ObsidianのDataviewは簡単な条件式でファイルを自動で検索･結果を表示するプラグインだ。ただ、基本的には表示のみを行うので表示した結果からデータを操作することはできない。

例えば、DataviewのTableを使用して

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-07-20%2020.32.05.png)

このようにプログレスバーを表示したり、チェックボックスを表示することは可能だが、この状態を変化させようと思うと、そのページから編集する必要がある。

この欠点をMeta Bindを使用して解消してみる。

# Meta Bindとは

簡単にいうとプロパティの入力UIを作ることができる。右クリックで多様なUIから選択できる。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-07-20%2020.34.43.png)

例えば

```
`INPUT[date:exampleProperty]`
```

このように入力するとexamplePropertyというプロパティに日付を入力するUIが出現する。さらに、ファイルパスを指定すると別のファイルのプロパティの入力もできる。

```
`INPUT[date:file.path#exampleProperty]`
```

これを利用する。

# チェックボックスを作ってみる

例えばcheckというプロパティにtoggleのUIを作る。
Dataviewの表示項目を羅列するところに、

```
"`INPUT[toggle:" + file.path + "#check]`" as check 
```

と書くと、

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-07-20%2020.41.31.png)

チェックボックスのUIが出現し、ここで操作できるようになる。

# 文献検索ページにも取り入れてみる

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-07-20%2020.44.08.png)

できた。いちいちそのページに飛ばなくても一行要約として使っているプロパティの
descriptionを編集できるようになったし、新規で読んだかチェックするreadというプロパティを追加してみた。

# おわりに

Dataviewのfile.path表示でいけるじゃんと急に思いついた。
私の場合、文献検索ページを少なくとも週２回は更新するので少し楽になった。
