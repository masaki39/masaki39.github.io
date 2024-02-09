---
date: 2023-12-16
updated: 2024-02-09
aliases: 
tags:
  - obsidian
  - obsidian/plugin
  - dataview
  - publish
title: 
description:
---

# はじめに

Dataviewは本当に沼
調べると高度な使い方がどんどん出てくる
設定でdataviewjsをonにするとjavascriptも組み込めるので、本当になんでもできそう
学習コストもあるので、基本的には誰かをパクる方針で良い使用方法を探してみた
一応DailyNoteに組み込む想定

# Progress Checker

参考元は以下

```
"<progress value='" + (length(filter(file.tasks.completed, (t) => t = true)) / length(file.tasks.text)) + "' max='1'></progress>" AS Progress
```

[Possible to count number of completed and uncompleted tasks without JS? · blacksmithgu/obsidian-dataview · Discussion #773 · GitHub](https://github.com/blacksmithgu/obsidian-dataview/discussions/773)

これを自分用に改良

```
TABLE
(deadline - this.file.day).day AS Countdown,
"<progress value='" + (length(filter(file.tasks.completed, (t) => t = true)) / length(file.tasks.text)) + "' max='1'></progress>" AS Progress
WHERE deadline >= this.file.day and deadline
SORT deadline
```

![Pasted image 20231216175642.png](Pasted%20image%2020231216175642.png)

> [!warning] 日付の計算について
> おそらくdataviewは日付の計算を想定していない
> 1ヶ月の定義が曖昧になっているようにみえる
> 4週で1ヶ月とカウントするくせに、1ヶ月を日数に直すと30日になる
> 28日未満は正確だが、1ヶ月以上の場合のCountDownは数日の誤差が生じるので目安程度に思っておくと良い

## 使い方

1. 重要なイベントごとにノートを作成してイベントまでのToDoリストを作成
2. フロントマターにdeadlineというkeyを作成して締め切り日を記載する

Countdownで締め切りまでの日数を表示し、
Progressに完了済みのTaskの割合をバーで表示するので、進捗が一目で確認できる

これはイベントごとに作成したToDoリストの例

```
---
deadline: 2023-12-18
---
# Dataviewの使用方法調べる
- [ ] google検索
- [ ] Youtube
- [ ] 公式Documents
- [ ] Obsidian Forum

## 他のプラグインの併用を調べる
- [ ] Tracker
- [ ] Obsidian Charts

# 実践してみる
- [ ] 自分のVaultに適応
- [ ] 洗練作業

# 記事の作成
- [ ] とりあえずアウトラインを書く
- [ ] 記事をPublishする
```

適当に書いてみたが、こんな感じでイベントごとにTaskを書きだしてみる
マークダウン形式でTaskを列挙すると全体のアウトラインが分かりやすく、途中に見出しや文章を挟むことができる
Task管理の際は**Taskは軽すぎず重すぎずに分割すること**が重要らしい

# Habit Tracker

参考元は以下

```
TABLE WITHOUT ID  
file.link as Date,  
choice(Sleep > 7, "🟩", "🟥") as 🛌,  
choice(Exercise > 30, "🟩", "🟥") as 🏃,  
choice(Reading > 30, "🟩", "🟥") as 📚,  
choice(Meditation > 10, "🟩", "🟥") as 🧘,  
choice(Writing > 750, "🟩", "🟥") as ✍️  
FROM #dailies  
WHERE file.day <= date(now) AND file.day >= date(now) - dur(7days)  
SORT file.day ASC
```

[Habit Tracker Template For Obsidian – Obsidian Ninja](https://obsidianninja.com/habit-tracker-obsidian/)

別途Daily Noteに下記のようにinline fields追加して毎日記録していくことが必要

```
Sleep:: 0  
Reading:: 0  
Exercise:: 0  
Meditation:: 0  
Writing:: 0
```

こんな感じになるらしい
![Pasted image 20231216184610.png](Pasted%20image%2020231216184610.png)

要するにfunction keyのchoice()を用いて**目標を達成したらマークが変わる**

これはコピペで使用できるので微修正のみ

- fromをDailyNoteフォルダ参照にしたのと
- ascをdescにして降順にしたのと
- date(now)をthis.file.dayにした方がノートに固定されて良いってくらい

後は目標設定をどうするかだけども、これは使いながら考えるしかない
自分のMotivationが高めれるような目標設定を考えなければ

# おわりに

Dataviewの活用法に関して調査し、simpleかつ有用と思った使用法を紹介した
使用方法は無限にありそうだけども、複雑すぎるのは結局使わなくなると思う
自分にあった使い方を探そう
