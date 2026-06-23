---
date: 2025-02-09
updated: 2025-02-09
aliases:
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-09%2022.15.31%20-%20A%20stylized%20illustration%20representing%20the%20concept%20of%20navigating%20between%20daily%20notes%20using%20Templater.%20The%20image%20features%20a%20futuristic%20and%20minimalist%20des.webp
---

小ネタ。
デフォルトの翌日or前日のデイリーノートに移動するコマンドは、作成されていないノートをskipする。毎日ノートをつくる人には無用の気遣いだろう。
Templaterで翌日or前日のノートがなければ作成するようにする。

# 翌日のデイリーノートに移動

```js
const today = tp.file.title; 
const tomorrow = moment(today, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD");
if (!tp.file.find_tfile(tomorrow)){
tp.file.create_new("", tomorrow, true, "DailyNotes");
} else {
await app.commands.executeCommandById("daily-notes:goto-next");
};
```

# 前日のデイリーノートに移動

```js
const today = tp.file.title; 
const yesterday = moment(today, "YYYY-MM-DD").add(-1, "days").format("YYYY-MM-DD");
if (!tp.file.find_tfile(yesterday)){
tp.file.create_new("", yesterday, true, "DailyNotes");
} else {
await app.commands.executeCommandById("daily-notes:goto-prev");
};
```

# メリット

![[📘Templaterで翌日or前日のデイリーノートへ移動するコマンドを作成する-1739106801395.webp]]

デイリーノート内にNote Toolbarなどのプラグインでボタンを置くと連打するだけでノートを作成しながらカレンダーを移動できるようになる。
