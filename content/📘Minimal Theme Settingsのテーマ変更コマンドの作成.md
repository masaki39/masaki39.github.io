---
date: 2025-02-23
updated: 2025-02-23
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-23%2022.37.48%20-%20A%20stylish%20and%20modern%20Open%20Graph%20(OGP)%20image%20for%20an%20article%20titled%20'%F0%9F%93%98Minimal%20Theme%20Settings%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9E%E5%A4%89%E6%9B%B4%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%88%E3%82%99%E3%81%AE%E4%BD%9C%E6%88%90'.%20The%20design%20should%20be%20sleek%2C%20using%20a%20minimal.webp
---

# はじめに

Obsidianの一番人気テーマのMinimalにはMinimal Theme Settingsという専用プラグインが存在し、テーマを変更することで飽きずに使用することができる。ライトテーマが14種類存在し、ダークテーマが15種類存在する。このテーマを順繰りに変更するコマンドをTemplaterで考えてみた。

# ロジックを考える

幸い個々のテーマに変更するコマンドはMinimal Theme Settingsに付属しているので、現在のテーマが分かれば順繰りにコマンドを回せば良いだろう。Settingsという名称のファイルをつくり、プロパティに現在のテーマのIndexを保存するという手法を考える。

# Templaterについて

詳細は割愛する。テンプレートを挿入するプラグインだが、`<%*` と `%>`で囲まれた領域をJavascriptのコードとして実行する事ができる。つまり空のテンプレートとコードを書いたテンプレートを作ることでコマンドを作成することができる。

# コード

こんな感じで。

```js
// ダークテーマ判定
const isDarkMode = document.body.classList.contains('theme-dark');
const themeType = isDarkMode ? "Dark" : "Light";

let themes = [];
if (themeType === "Dark") {
    themes = [
        "toggle-minimal-default-dark",
        "toggle-minimal-atom-dark",
        "toggle-minimal-ayu-dark",
        "toggle-minimal-catppuccin-dark",
        "toggle-minimal-dracula-dark",
        "toggle-minimal-eink-dark",
        "toggle-minimal-everforest-dark",
        "toggle-minimal-flexoki-dark",
        "toggle-minimal-gruvbox-dark",
        "toggle-minimal-macos-dark",
        "toggle-minimal-nord-dark",
        "toggle-minimal-rose-pine-dark",
        "toggle-minimal-notion-dark",
        "toggle-minimal-solarized-dark",
        "toggle-minimal-things-dark"
    ];
} else {
    themes = [
        "toggle-minimal-default-light",
        "toggle-minimal-atom-light",
        "toggle-minimal-ayu-light",
        "toggle-minimal-catppuccin-light",
        "toggle-minimal-eink-light",
        "toggle-minimal-everforest-light",
        "toggle-minimal-flexoki-light",
        "toggle-minimal-gruvbox-light",
        "toggle-minimal-macos-light",
        "toggle-minimal-nord-light",
        "toggle-minimal-rose-pine-light",
        "toggle-minimal-notion-light",
        "toggle-minimal-solarized-light",
        "toggle-minimal-things-light"
    ];
}
// themeにインデックスを割り当て
const list = Object.fromEntries(
    themes.map((theme, index) => [index, `obsidian-minimal-settings:${theme}`])
);

// Settingsのフロントマターから現在のindex(presentTheme)を取得
const presentThemeKey = `minimal${themeType}Theme`;
const file = await tp.file.find_tfile("Settings"); // Settingsファイルを探す
await app.fileManager.processFrontMatter(file, (fm) => {
    presentTheme = fm[presentThemeKey];
});
// presentThemeが正しくない場合は0を渡す
if (presentTheme === undefined || !(presentTheme in list)) {
    presentTheme = 0;
};

// テーマ変更コマンドを実行
app.commands.executeCommandById(list[presentTheme]);

// presentThemeを1増やす
await app.fileManager.processFrontMatter(file, (fm) => {
    fm[presentThemeKey] = (presentTheme + 1) % Object.keys(list).length;
});
```

# Sandbox保管庫に実装してみる

テーマMinimalをインストールして、｢Settings｣というタイトルのノートと、｢ToggleMinimalTheme｣というタイトルのノートを作成する。後者は名称は何でも良く、先程のコードをコピペする。

![[📘Minimal Theme Settingsのテーマ変更コマンドの作成-1740317094916.webp]]

コミュニティプラグインのTemplaterをインストールし、設定画面にこのノートを登録する。すると、コマンドパレットに登録される。実際はTemplatesフォルダとか作るのだろうが、今回は作っていない。

![[📘Minimal Theme Settingsのテーマ変更コマンドの作成-1740317257897.webp]]

コマンドパレットに｢Insert ToggleMinimalTheme.md｣みたいなコマンドが出現するので、何回か実行する。MinimalTheme Settingsもインストールしておく。

![[📘Minimal Theme Settingsのテーマ変更コマンドの作成-1740317351024.webp]]

テーマが順番に変更され、｢Settings｣のプロパティにIndexが登録されている。一応ライトモードとダークモードはその時のモードに応じて別々で認識するはずだ。

# おわりに

コマンド化することで、ボタンにしたりホットキーに登録したりできるので、気軽にテーマ変更ができるようになった。羅列したテーマを消すことで不要なものは除外するもできる。個人的にはMinimalにはまだ強化の余地があると思うので、後日挑戦する。
