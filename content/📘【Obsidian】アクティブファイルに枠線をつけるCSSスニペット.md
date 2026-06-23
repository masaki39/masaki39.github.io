---
date: 2025-09-25
updated: 2025-09-25
aliases: []
tags:
  - note/publish
description: Obsidianでアクティブなファイルを視覚的に強調し、タブ切り替え時の視認性を向上させるCSSスニペットの設定方法を紹介します。
---

# はじめに

Obsidianで複数のタブを開いて作業していると、どのノートが現在アクティブなのかわからなくなることがある。[Limelight](https://github.com/smikula/obsidian-limelight)というコミュニティプラグインを使えば非アクティブなノートを薄く表示することができるが、プラグインに頼らずCSSスニペットだけでアクティブなファイルに視覚的な強調を加える方法を紹介する。

# CSSスニペット

下記のCSSスニペットをObsidianの設定 > 外観 > CSSスニペットに追加する。

```css
.workspace-leaf-content{
    box-sizing: border-box;
    border: 4px solid transparent;
}
.workspace-leaf.mod-active .workspace-leaf-content {
    border-color: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
}
```

4pxは枠線の太さ、border-colorは色を指定している。色にはObsidianのアクセントカラー設定を自動的に参照するCSS変数を使用しているため、テーマに合わせて自動調整される。

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250925163020.webp)

↑これが

![](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20250925163032.webp)

↑こうなる

# おわりに

このCSSスニペットは、わずか数行のコードで視認性を大幅に向上させる。プラグインを追加する必要がなく、軽量で動作も安定している。複数のタブを頻繁に切り替える作業では特に威力を発揮するだろう。
