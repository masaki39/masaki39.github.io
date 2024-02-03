# はじめに

TemplaterはTemplateにJavaScriptのcodeを埋め込めるコミュニティプラグインである
日付関係の動的な情報を取得したり、ファイルやフロントマターの情報を取得・編集することができ、更にこれを**ホットキーに登録できる**
つまり、ファイルやフロントマターの編集さえをもホットキーで行えるようになるので、使いこなせばかなり広範囲に活躍できる

汎用性が高い一面、JavaScriptの記述方法に乗っ取らないといけないので、難しい一面もある
Templaterに備え付けのtp.系のmoduleを使用するのは割りと簡単で、使い方は結局公式ドキュメントが強い
> [!cite] 公式ドキュメント
> [Introduction - Templater](https://silentvoid13.github.io/Templater/)
> 

# tp.date系

これは日付情報を取得するコードの系統のよう
Daily Noteとの親和性が高そう

公式ドキュメントに記載のExample↓↓
```
// Date now
<% tp.date.now() %>
// Date now with format
<% tp.date.now("Do MMMM YYYY") %>
// Last week
<% tp.date.now("YYYY-MM-DD", -7) %>
// Next week
<% tp.date.now("YYYY-MM-DD", 7) %>
// Last month
<% tp.date.now("YYYY-MM-DD", "P-1M") %>
// Next year
<% tp.date.now("YYYY-MM-DD", "P1Y") %>
// File's title date + 1 day (tomorrow)
<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>
// File's title date - 1 day (yesterday)
<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>

// Date tomorrow
<% tp.date.tomorrow() %>
// Date tomorrow with format
<% tp.date.tomorrow("Do MMMM YYYY") %>

// This week's Monday
<% tp.date.weekday("YYYY-MM-DD", 0) %>
// Next Monday
<% tp.date.weekday("YYYY-MM-DD", 7) %>
// File's title Monday
<% tp.date.weekday("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
// File's title previous Monday
<% tp.date.weekday("YYYY-MM-DD", -7, tp.file.title, "YYYY-MM-DD") %>

// Date yesterday
<% tp.date.yesterday() %>
// Date yesterday with format
<% tp.date.yesterday("Do MMMM YYYY") %>
```

割りとシンプルなルール
tp.date.nowの場合
```
<% tp.date.now("出力する日付のフォーマット", リファレンスの日付との差, リファレンス, "リファレンスの日付のフォーマット") %>
```
ということの様子

日付のフォーマットはここを参照→[Moment.js | Docs](https://momentjs.com/docs/#/displaying/format/)

このルールに従いDaily NoteからCalendar PluginのWeekly Noteへのリンクを書いてみる
```
[[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>]]
```
このコードはDaily Noteのタイトルから`YYYY-MM-DD`形式で日付情報を取得し、その日付情報から`YYYY-[W]ww`形式で日付を出力する

Daily Noteのタイトルから曜日を取得する
```
<% tp.date.now("ddd", 0, tp.file.title, "YYYY-MM-DD") %>
```
曜日情報を基にWeekly NoteからDaily Noteへの紐づけなどができそう

# tp.file系

公式ドキュメントに記載のExample↓↓
```
// Retrieve file content
<% tp.file.content %>

// File creation
<%* await tp.file.create_new("MyFileContent", "MyFilename") %>
// File creation with template
<%* await tp.file.create_new(tp.file.find_tfile("MyTemplate"), "MyFilename") %>
// File creation and open created note
<%* await tp.file.create_new("MyFileContent", "MyFilename", true) %>
// File creation in current folder
<%* await tp.file.create_new("MyFileContent", "MyFilename", false, tp.file.folder()) %>
// File creation in specified folder
<%* await tp.file.create_new("MyFileContent", "MyFilename", false, app.vault.getAbstractFileByPath("MyFolder")) %>
// File creation and append link to current note
[[<% (await tp.file.create_new("MyFileContent", "MyFilename")).basename %>]]

// File creation date
<% tp.file.creation_date() %>
// File creation date with format
<% tp.file.creation_date("dddd Do MMMM YYYY HH:mm") %>

// File cursor
<% tp.file.cursor() %>
// File multi-cursor
<% tp.file.cursor(1) %>Content<% tp.file.cursor(1) %>

// File cursor append
<% tp.file.cursor_append("Some text") %>

// File existence
<% await tp.file.exists("MyFolder/MyFile.md") %>
// File existence of current file
<% await tp.file.exists(tp.file.folder(true) + "/" + tp.file.title + ".md") %>

// File find TFile
<% tp.file.find_tfile("MyFile").basename %>

// File folder (Folder)
<% tp.file.folder() %>
// File folder with relative path (Path/To/Folder)
<% tp.file.folder(true) %>

// File include
<% tp.file.include("[[Template1]]") %>
// File include TFile
<% tp.file.include(tp.file.find_tfile("MyFile")) %>
// File include section
<% tp.file.include("[[MyFile#Section1]]") %>
// File include block
<% tp.file.include("[[MyFile#^block1]]") %>

// File last modified date
<% tp.file.last_modified_date() %>
// File last modified date with format
<% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm") %>

// File move
<% await tp.file.move("/A/B/" + tp.file.title) %>
// File move and rename
<% await tp.file.move("/A/B/NewTitle") %>

// File path
<% tp.file.path() %>
// File relative path (relative to vault root)
<% tp.file.path(true) %>

// File rename
<% await tp.file.rename("MyNewName") %>
// File append a 2 to the file name
<% await tp.file.rename(tp.file.title + "2") %>

// File selection
<% tp.file.selection() %>

// File tags
<% tp.file.tags %>

// File title
<% tp.file.title %>
// Strip the Zettelkasten ID of title (if space separated)
<% tp.file.title.split(" ")[1] %>
```

これは結構レベル高い
ファイルから情報を抜いたり、新規に作ったり、編集したりできるっぽいが、今の所有効な使い方は思いつかない

Daily Noteで
```
<% tp.file.title %>
```
が日付情報になるので使えるというくらいか

Monthly Noteや四半期のNoteを作る場合はtp.dateとの組み合わせで実現できそう
Periodic Noteでいい話かもしれないが、多分こっちのほうがカスタマイズ性は高い

# tp.frontmatter系

これは公式ドキュメントにはちょっとしか書いてない

フロントマターのkey名から情報を取得する
↓はkey名が`alias`と`note type`の場合
```
<% tp.frontmatter.alias %>
<% tp.frontmatter["note type"] %>
```

↓はkey名が`categories`で中に複数の情報がリスト表示されている場合
```
<% tp.frontmatter.categories.map(prop => `  - "${prop}"`).join("\n") %>
```

# その他のtp.系

tp.hooksは指定した作業を後に遅らせることができるので、例えばTemplaterでフロントマターを記入して、その取得した情報を基にノートを記載するなど、2段階の作業を1個のコードでまとめられる

tp.systemはクリップボードの情報を取得したり、プロンプトボックスを出現させたりする　Templateを使用する際に入力画面を一回挟みたいときに有用

tp.obsidianはobsidianAPIが使える
ちょっと何が使えるかは把握していないが、沼の予感がする

tp.webはweb上のサービスと連携
exampleにはランダムの画像を表示するコードが書いてある

# JavaScript

tp.から始まるコードはTemplaterの機能として搭載されたmoduleであるが、`*`を足すことで一般的なJavaScriptのコードを自在に実行できる

```
<%* JavaScriptのコード  %>
```

これはちょっと専門知識が必要そう

調べた範囲ではフロントマターの書き換えが便利そう↓
```
<%*
  const file = tp.file.find_tfile(tp.file.path(true));
  await app.fileManager.processFrontMatter(file, (fm) => {
	 fm.keyの名前 = 好きに設定;
  });
%>
```
tp.系と組み合わせて最強のTemplateを作ろう(かなり高難易度...)

フロントマターの書き換えに関しては以前の記事を参照
> [!seealso] seealso
> 
> [[Templaterでフロントマターを書き換える]]
