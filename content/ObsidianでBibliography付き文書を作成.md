---
date: 2024-04-06
updated: 2024-04-06
aliases:
  - 📘ObsidianでBibliography付き文書を作成
tags:
  - note/article
title: 📘ObsidianでBibliography付き文書を作成
---

# はじめに

アウトライナーで文章を書くということにはまっている

> [!NOTE] seealso
> 
> [[アウトラインで英文を書く|📘アウトラインで英文を書く]]
> [[Templaterでoutlinerを強化|📘Templaterでoutlinerを強化]]
> [[Templaterの結果を特定のセクションに出力|📘Templaterの結果を特定のセクションに出力]]

かなり便利に文章を書けるが、1 つだけ問題点が･･･

それは、引用や Bibliography が入れれないということだ
引用や Bibliography の挿入は基本的には Word のプラグインで行われることが多い

ただ、Obsidian 上には文献のデータは十分にあり、Obsidian 上で自動で行うことも可能なのではないか？と考えた

# 情報収集

コミュニティプラグインで `reference` と検索すると Obsidian Pandoc Reference List というのが出てくる
![](https://raw.githubusercontent.com/mgmeyers/obsidian-pandoc-reference-list/main/Screen%20Shot.png)

どうやら Pandoc を使用して文章に `[@citation]` と打つと引用として判断して、Bibliography を自動作成してくれるとのこと

**？？？**

Pandoc ってマークダウンファイルをワードとか色んな形式に変換するツールだと思っていたけど、Bibliography を作成する機能がついている？？？
ということは、Pandoc でマークダウンファイルを直接引用や Bibliography 付きの Word ファイルに変換することも可能なはずだ
Pandoc で出力するプラグインを探すと Pandoc Plugin というコミュニティプラグインをみつけた

Pandoc Plugin のドキュメントを確認→[Citations (work in progress) · OliverBalfour/obsidian-pandoc Wiki · GitHub](https://github.com/OliverBalfour/obsidian-pandoc/wiki/Citations-(work-in-progress))

やはり引用に関する方法が書いてある
これを読んでみることにした

# 必要なもの

1. Pandoc
2. CSL-JSON 
3. CSL ファイル
4. Pandoc Style で引用が記述されたマークダウンファイル

# Pandoc 

まず、Pandoc のコマンドを呼び出して使用するので Pandoc Plugin に加えて、Pandoc をインストール→[Pandoc - Installing pandoc](https://pandoc.org/installing.html)

# CSL-JSON　

文献情報を記した辞書ファイル
これは Citations プラグインを使用している場合はすでに存在するはず

> [!NOTE] seealso
> [[Zotero×Obsidian 文献管理のすゝめ|📘Zotero×Obsidian 文献管理のすゝめ]] 

以下が Citations プラグインを使用した文献管理概要図だ
![[Diagram 23.svg]]

このマイ･ライブラリ.json は CSL-JSON であるので、この絶対パスを設定画面で指定しておく

# CSL ファイル

Journal 毎の引用形式を記したファイル
**ローカルでファイルのパスを指定してもいいのだが、公開 URL でもいい**
さらに、プロパティに書いておくということも可能

なので、出力するマークダウンファイルのプロパティに

```
csl: URL
```

このようにを追加しておく
csl ファイルは [Zotero Style Repository](https://www.zotero.org/styles)
ここで検索して、URL をコピーしてくる

例えば脊椎の Journal の Spine の引用形式にしたければ下記の用に記載する

```
csl: https://www.zotero.org/styles/spine
```

# Pandoc style で記載したマークダウンファイル

例えば

```
This is a pen[@citekey1;@citekey2].
```

このように引用を記載すると Pandoc で出力する時に

```
This is a pen[1-2].
```

みたいな感じで引用になり、文末に Bibliography も自動作成されるという

> [!important] ！！！
> [@citekey] という形式は Citations で作った文献ノートへのリンクとほぼ一緒
> つまり、文献ノートへのリンクを貼ったマークダウンファイルに少し手を加えれば Pandoc style になるということだ

アウトラインで文章を書く際に文献ノートをちょくちょく貼っていたので、これを Pandoc style に変換しよう
Templater の出番である

# Templater のロジック

- Section 
	- Paragraph
		- content(日本語)
			- content(英語)
				- 文献ノートへのリンク
				- 備考など

このルールでアウトラインが書いてあるとする

- インデントレベル 4 から文献ノートへのリンクを抽出して、Pandoc style へと変換する
- 複数ある場合は連結して、前の content のピリオドの前に挿入する

要するにアウトラインを Pandoc Style に変換して、Output セクションに出力する

> [!NOTE] seealso
> 
> [[Templaterの結果を特定のセクションに出力|📘Templaterの結果を特定のセクションに出力]] 

今回はかなり私に特異的なロジックなのでスクリプトは省略

# 特定のセクションのみを Pandoc で出力 

これは lua filter というのを使うのがいいと書いてあった
ちょっと分からないが、簡単なロジックなので GPT 先生にお願いする

```lua
-- filename: extract_section.lua
local extracting = false
function Header(elem)
  if elem.level == 1 then
    if elem.content[1].text == "Output" then
      extracting = true
    else
      extracting = false
    end
    return {}
  end
end

function Block(elem)
  if extracting then
    return elem
  else
    return {}
  end
end
```

何となく合ってそうな構造
Output セクションのみを Pandoc で出力するように記載してもらった
スクリプトを適当に保存しておき、Pandoc Plugin に実行時にこの lua スクリプトを呼び出すようにパスを記載

# 完成したロジック

![[Diagram 24.svg]]

こういうことですね (分かりにくい)

1. アウトラインで文章を書いて、適当に文献ノートへのリンクとかをメモしておく
2. Templater で Pandoc style に変換する
3. Pandoc Plugin で Word ファイルに変換する

この作業で出力された Word ファイルには、任意の Journal の引用形式で引用が付加され、Bibliography もついてくる
つまり、もう提出するだけでいい状態で出力される

# おわりに

Pandoc plugin の公式ドキュメントには、Obsidian のリンクと引用のための表記のどちらかを選ばないといけないのがかなりの問題で、Citations プラグインとどう連携すればいいか考えていると書いてあった

今回の方法はそれを独自に解決していると言えるかもしれない
Outline である程度ルールを決めて記載しておけば Pandoc style への変換はそれほど難しくないし、記載自体も便利である

Obsidian のアウトライナーは高度にカスタマイズすることで最高の論文エディタへと変貌しつつある
