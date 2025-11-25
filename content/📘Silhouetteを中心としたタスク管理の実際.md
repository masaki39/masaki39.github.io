---
date: 2025-02-14
updated: 2025-02-14
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-14%2020.37.24%20-%20%E6%A8%AA%E9%95%B7%E3%81%AEOGP%E7%94%BB%E5%83%8F%E3%83%86%E3%82%99%E3%82%B5%E3%82%99%E3%82%A4%E3%83%B3%E3%80%82%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%80%8CSilhouette%E3%82%92%E4%B8%AD%E5%BF%83%E3%81%A8%E3%81%97%E3%81%9F%E3%82%BF%E3%82%B9%E3%82%AF%E7%AE%A1%E7%90%86%E3%81%AE%E5%AE%9F%E9%9A%9B%E3%80%8D%E3%81%8B%E3%82%99%E4%B8%AD%E5%A4%AE%E3%81%AB%E5%A4%A7%E3%81%8D%E3%81%8F%E9%85%8D%E7%BD%AE%E3%81%95%E3%82%8C%E3%80%81%E8%83%8C%E6%99%AF%E3%81%AF%E6%B4%97%E7%B7%B4%E3%81%95%E3%82%8C%E3%81%9F%E3%83%8D%E3%82%A4%E3%83%92%E3%82%99%E3%83%BC%E3%81%AE%E3%82%AF%E3%82%99%E3%83%A9%E3%83%86%E3%82%99%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%80%82%E5%B7%A6%E5%81%B4.webp
---

# はじめに

Obsidianのプラグイン「Silhouette」を中心としたタスク管理を実践して半年程度が経過しました。この記事では、私の現在の運用方法と、それを支える各種プラグインの活用方法について詳しく解説します。

# タスク管理の基本的な考え方

私のタスク管理は、GTD（Getting Things Done）の手法をベースにしています。具体的には以下の流れで運用しています：

1. 全てのタスクを最初にInboxに集める
2. 定期的に整理・分類する
3. 日々のタスクとして割り振る

# Inboxの運用

## 移行の経緯

以前はiPhoneのリマインダーアプリを使用していましたが、現在はObsidian上でタスク管理を完結させています。移行の主な理由は：

- タスク管理の一元化が可能
- Outliner機能による階層的な整理がしやすい
- 様々なプラグインの補助を受けられ

## タスクの分類

GTDの考え方に基づき、以下のように分類しています：

- Inbox：未整理のタスク置き場
- Projects：プロジェクト単位でまとめたタスク
- Waiting：他者の作業待ちタスク
- Someday：いつか取り組みたいタスク

※通常のGTDにある「すぐやる」項目は、デイリーノートで管理しています。

![[📘Silhouetteを中心としたタスク管理の実際-1739531625716.webp]]

Outlinerを使うことで分類やタスクの親子関係が明確になります。このタスクリストを"ToDo"という名称のノートに記載しています。

## List Calloutプラグインの活用

タスクリストの視認性を高めるために、List Calloutプラグインを使用しています。`!`などのプレフィックスを付けるだけでリストに色付けができ、元の記述を損なわないため重宝しています。

# デイリーノートの活用

## Silhouetteによる自動化

Silhouetteの主な利点：
- 繰り返しタスクを設定ファイルで管理
- ワンコマンドでデイリーノートにタスク追加
- 習慣化タスクの管理が容易
- 週次のタスク整理も自動化可能

実際の設定画面：

![[📘Silhouetteを中心としたタスク管理の実際-1739531985783.webp]]

Silhouetteの最も良い点は設定に`タスクを整理する,sun`と入れるだけでGTDの素地が完成することです。詳細な記法は[公式ドキュメント](https://github.com/tadashi-aikawa/silhouette)に掲載されています。

## 補完的なプラグイン群

1. Calendar
   - カレンダーUIによる日付管理、デイリーノート管理

![[📘Silhouetteを中心としたタスク管理の実際-1739532061031.webp]]

2. Note toolbar
   - デイリーノート専用のコマンドバーを設置可能

3. Hover editor
   - ノートのプレビューと編集を同時に実現
   - Note toolbarと組み合わせて効率的な編集環境を構築できる

![[📘Silhouetteを中心としたタスク管理の実際-1739532177543.webp]]

4. Templater
   - JavaScriptによるカスタムコマンドの作成
   - 日付間の移動などの機能を実装可能

> [!quote] [[📘Templaterで翌日or前日のデイリーノートへ移動するコマンドを作成する]]

5. Google Calendar
   - グーグルカレンダーと連携できる
   - グーグルカレンダーから予定を取り込むことができる

# 発展的な活用方法

## Dataviewによるタスク管理の拡張

DataviewJSを使用することで、カスタマイズされたタスクインターフェースを作成できます。

![[📘Silhouetteを中心としたタスク管理の実際-1739532486549.webp]]

Datavisjsのコード例：

```js
> [!tip]+ `$=dv.span("[[DailyNotes/" + moment().format("YYYY-MM-DD")+ "|" + moment().format("YYYY-MM-DD") + "]]")`: `$=dv.page(moment().format("YYYY-MM-DD"))? "<progress value='" + dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t => t.completed).length/dv.page(moment().format("YYYY-MM-DD")).file.tasks.length*100 + "' max='100'></progress> " + (dv.page(moment().format("YYYY-MM-DD")).file.tasks.length > 0? Math.round((dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t => t.completed).length / dv.page(moment().format("YYYY-MM-DD")).file.tasks.length) * 100): 0) + "%": "No daily note found for today"`
>
> >[!warning]+ Remaining: `$=dv.page(moment().format("YYYY-MM-DD"))? dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t =>!t.completed).length: ""`
> > `$=dv.page(moment().format("YYYY-MM-DD"))? dv.taskList(dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t =>!t.completed), false): ""`
> 
> >[!success]- Finished: `$=dv.page(moment().format("YYYY-MM-DD"))? dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t => t.completed).length: ""`
> > `$=dv.page(moment().format("YYYY-MM-DD"))? dv.taskList(dv.page(moment().format("YYYY-MM-DD")).file.tasks.where(t => t.completed), false): ""`
```

※デイリーノートがDailyNotesフォルダに入っており、YYYY-MM-DDのフォーマットになっていることを想定しています。

## Minimalテーマの活用

- リストのカードビュー表示が可能
- プロパティに`cssclasses: list-cards`を追加するだけで実現

## 効率化のためのプラグイン

TemplaterやQuickAddを使用することで：
- ワンコマンドでのタスク追加
- Inboxへの素早いタスク登録
が可能になります。

ホットキーで呼び出して、すぐにInboxやデイリーノートにタスクを追記することができます。

![[📘Silhouetteを中心としたタスク管理の実際-1739532786504.webp]]

> [!quote] [[📘TemplaterでQuickAddする]]

# まとめ

このようなプラグインの組み合わせにより、効率的かつ柔軟なタスク管理システムを構築することができます。特にSilhouetteを中心とした自動化により、日々のタスク管理の負担を大きく軽減することができます。
