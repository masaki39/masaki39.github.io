---
date: 2024-02-25
updated: 2024-02-25
aliases: []
tags:
  - note/article
---

# はじめに

最近この記事↓を読んで、ノートの分類や作り方を真似てみることにしました

> [!quote]
> [📘丸3年Obsidianを利用して培ったノート戦略を体系化してみた - Minerva](https://minerva.mamansoft.net/%F0%9F%93%98Articles/%F0%9F%93%98%E4%B8%B83%E5%B9%B4Obsidian%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%A6%E5%9F%B9%E3%81%A3%E3%81%9F%E3%83%8E%E3%83%BC%E3%83%88%E6%88%A6%E7%95%A5%E3%82%92%E4%BD%93%E7%B3%BB%E5%8C%96%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F)

ノートの種類が 9 種類、概ねこれでノートをきれいに分類できるようになったのですが、いちいちプレフィックスの絵文字を入力したりタグ入れたりするのが結構面倒くさい

折角コミュニティプラグインの Templater をいれているので、これを活用することに
Javascript はド素人なので、公式ドキュメントをみながら作りました

> [!quote]
> 
> [Introduction - Templater](https://silentvoid13.github.io/Templater/)

基本的には書いてあることを組み合わせただけ

# 作成したテンプレートの挙動

ホットキーには `⌘` + `Shift` + `N` を設定
起動するとまず下記のようなプロンプトボックスが出現しファイル名を入れれる
single line のプロンプトボックスだと日本語の変換後の確定の Enter で誤爆するので multi line にした

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-02-25%2017.59.54.png)

入力すると次にノートの種類を選べる

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-02-25%2017.55.30.png)

ノートが生成されます
Glossary note や Hub note の時は MOC を作るためのノートなので専用のテンプレートが読み取られます
ここは悩んだけど、直接コンテンツに繋がっていない｢関連｣と、変更して育成していくノートが入る｢ダッシュボード｣と、変更しない記録として｢アーカイブ｣の 3 カテゴリに分類しました

同時に tags と cssclasses も自動入力されます
cssclasses の list-cards はテーマ minimal で使用できるクラスで、バレットリストがリーディングビューでカードタイプになるので MOC 作りに非常におすすめ

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-02-25%2017.55.44.png)

他の属性のノートの場合はテンプレートは読み込まれず、何も記載されない
プレフィックスの絵文字も自動でタイトルに追加されるようにしました↓↓
Troubleshooting note の📝はしっくりこなかったので🛠に変更

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/Publish/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202024-02-25%2017.56.02.png)

これで新規ノート入力が楽になるはず
いい感じだと思う

# テンプレート

```js
<%*
// ファイル名を入力する
const basefilename = await tp.system.prompt("Enter filename", "無題のファイル", false, true);
if (!basefilename) {
	return;
}
//　タグを選択する
const tags = await tp.system.suggester(
["Glossary note", "Hub note", "Procedure note", "Brain note", "Activity note", "Report note", "Article note", "Troubleshooting note"],
["note/glossary", "note/hub", "note/procedure", "note/brain", "note/activity", "note/report", "note/article", "note/troubleshooting"]
);
if (!tags) {
	return;
}
// MOCのノートはテンプレートから作成
if (tags === "note/glossary" || tags === "note/hub") {
	await tp.file.create_new(tp.file.find_tfile("MOCのノートテンプレート"), basefilename, true);
	const file = await tp.file.find_tfile(tp.file.path(true));
	await app.fileManager.processFrontMatter(file, (fm) => {
		fm.tags = tags;
		fm.cssclasses = "list-cards";
		});
} else {
	await tp.file.create_new("", basefilename, true);
	const file = await tp.file.find_tfile(tp.file.path(true));
	await app.fileManager.processFrontMatter(file, (fm) => {
		fm.tags = tags;
		});
}
// tagsに基づいてファイル名を変更する
let newfilename;
switch (tags) {
	case "note/hub":
		newfilename = `📒${basefilename}`;
		break;
	case "note/brain":
		newfilename = `🧠${basefilename}`;
		break;
	case "note/activity":
		newfilename = `📜${basefilename}`;
		break;
	case "note/report":
		newfilename = `📰${basefilename}`;
		break;
	case "note/article":
		newfilename = `📘${basefilename}`;
		break;
	case "note/troubleshooting":
		newfilename = `🛠${basefilename}`;
		break;
	default: newfilename = basefilename;
}  
await tp.file.rename(newfilename);
%>
```

テンプレートはこんな感じ
ほぼ Templater の公式の機能しか使ってない
素人なので改善の余地はあるかも
でも公式ドキュメントが優秀なのでそんなに苦労せず作れた

# おわりに

余談だが普段使いのクラウドストレージの pCloud に画像の URL 発行機能があったので、Vault 内に画像を入れなくても画像を挿入することができるようになった
という事情がありスクショをたくさん載せてみた
今回はかなり Personalized されたテンプレートだけど、Templater は便利でしたという話
