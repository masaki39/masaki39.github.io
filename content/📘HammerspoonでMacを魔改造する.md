---
date: 2026-05-23
updated: 2026-05-23
aliases: []
tags:
  - note/publish
description: HammerspoonでMacをカスタマイズする方法とSpoonの使い方を紹介する。
---

# はじめに

ここ数ヶ月、[Hammerspoon](https://www.hammerspoon.org/)というツールに傾倒している。HammerspoonはMacのシステムレベルに干渉できるツールで、Lua言語でMacの操作が色々自動化できる。色々と記載したのは、**何でもできる**と言って良いレベルでできることが多岐にわたるからだ。

具体的には、以下のようなことができる。

- ホットキーの定義
- ウィンドウの操作・レイアウト管理
- アプリケーションの制御
- クリップボード操作
- メニューバーのカスタマイズ
- IME制御
- 外部APIとの連携

Lua言語という比較的単純な言語で書かれていることがポイントだ。最近ではAgent Codingがかなり発展しているので、「こういうことがしたい」と頼むだけでかなりの精度でやりたいことができてしまう。

# 導入方法

[Homebrew](https://brew.sh/)の場合は、以下のコマンドでインストールできる。

```zsh
brew install --cask hammerspoon
```

インストール後、設定ファイルを `~/.hammerspoon/init.lua` に置くことになる。このファイルにLuaコードを書き込んでいく。

ホットキーの例：

```lua
-- Ctrl+Alt+H でアラートを表示
hs.hotkey.bind({"ctrl", "alt"}, "h", function()
    hs.alert.show("Hello, Hammerspoon!")
end)
```

# Spoonの導入

Hammerspoonにはプラグインシステムが存在し、プラグインのことを **Spoon** と呼ぶ。Spoonの導入方法は主に2つある。

1. `.spoon` ファイルを[公式サイト](https://www.hammerspoon.org/Spoons/)やGitHubのリポジトリから直接ダウンロードして `~/.hammerspoon/Spoons/` に配置する方法(開くだけで自動配置)
2. **SpoonInstall**というSpoon管理用のSpoonを使う方法

可能であればSpoonInstallを使ったほうが楽だ。どのような使い方をするにせよ、SpoonInstallを含めた2つのSpoonを導入しておくと利便性が大きく向上する。

## SpoonInstall

[SpoonInstall](https://www.hammerspoon.org/Spoons/SpoonInstall.html)は、他のSpoonをコードから自動インストール・設定するためのSpoon管理ツールだ。公式サイトのSpoonはもちろん、GitHubのリポジトリを直接指定してインストールすることもできる。

SpoonInstall自体は[公式サイト](https://www.hammerspoon.org/Spoons/SpoonInstall.html)からダウンロードして `~/.hammerspoon/Spoons/` に配置する。その後、`init.lua` の先頭で読み込む。

```lua
hs.loadSpoon("SpoonInstall")
```

これだけで `spoon.SpoonInstall` が使えるようになる。

## ReloadConfiguration

[ReloadConfiguration](https://www.hammerspoon.org/Spoons/ReloadConfiguration.html)は、 `~/.hammerspoon/` 内のファイルの変更を監視して自動リロードしてくれるSpoonだ。編集のたびに手動でリロードする手間がなくなる。

```lua
hs.loadSpoon("SpoonInstall")
spoon.SpoonInstall:andUse("ReloadConfiguration", { start = true })
```

こうしておくと、`init.lua` を保存するたびに自動でリロードされる。

# 使っているSpoon

本記事では各Spoonの詳細な使い方には踏み込まないが、現在使っているSpoonを紹介する。といってもJinrai以外は自作で、自分が欲しいものを作っているだけだ。

- [Jinrai](https://github.com/tadashi-aikawa/jinrai) — ウィンドウヒント・フォーカス操作
	- 画面上のウィンドウにアルファベットのヒントを表示し、キー入力でフォーカスを切り替えるSpoon
- [Ryoiki](https://github.com/masaki39/ryoiki) — ウィンドウレイアウト管理（自作）
	- 複数のウィンドウ配置パターンを名前付きで保存しておき、瞬時に適用できるSpoon
- [Hanten](https://github.com/masaki39/hanten) — IME自動切り替え（自作）
	- アプリごとにIMEの状態を自動で切り替えるSpoon
- [Tomonari](https://github.com/masaki39/tomonari) — キーボード入力音（自作）
	- キーボード入力に効果音を付けるSpoon
- [Muryokusho](https://github.com/masaki39/muryokusho) — テキスト入力→Ankiカード作成（自作）
	- 入力したテキストをOpenAI APIで翻訳し、Ankiカードとして自動追加するSpoon

# おわりに

Macを触るのがもっと楽しくなるツールである。Coding Agentとの相性という意味で、Hammerspoonや類似するLua言語で定義する系のツールは今後伸びるのではと思っている。