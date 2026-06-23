---
date: 2025-02-04
updated: 2025-02-04
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-04%2013.49.55%20-%20A%20wide%20OGP-style%20image%20with%20the%20title%20'%F0%9F%93%98Templater%E3%81%A6%E3%82%99%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E3%83%95%E3%82%9A%E3%83%A9%E3%82%AF%E3%82%99%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%AA%E3%83%B3%E3%82%AA%E3%83%95%E3%82%B9%E3%82%A4%E3%83%83%E3%83%81%E3%82%92%E4%BD%9C%E3%82%8B'.%20The%20background%20is%20a%20sleek%2C%20modern%20interface%20design%20with%20elements%20represen.webp
---

# はじめに

最近Image Converterというプラグインを導入したのだが、このプラグインをオンにしておくとObsidianが非常に重くなってしまう。この問題はIssueにも上がっている。
便利ではあるがずっと使うプラグインではないので、ON/OFFスイッチを作ることにした。

# 予想と調査

TemplaterでObsidianAPIを使用することができるので、これを利用できるだろうと考えた。まずはappの下層にプラグインを有効化したりするコマンドがあるかどうかを確認する。Dataviewjsでappの下層を表示させる。

```js
let list = [];
for (const key in app) {
	list.push(`${key}: ${typeof app[key]}`);
}
dv.list(list);
```

するとpluginsというobjectがあるので、さらにその下層をDataviewjsで表示させる。

```js
let list = [];
for (const key in app.plugins) {
	list.push(`${key}: ${typeof app.plugins[key]}`);
}
dv.list(list);
```

するとこの様に表示される。
![[Pasted image 20250204133548.webp]]

enabledPluginsが今有効なコミュニティプラグインのリストで、enablePluginAndSaveとdisablePluginAndSaveが有効無効を切り替えるのに使えるfunctionだろうと予想する。
プラグインの内部での名称はIDだと思われるので、DataviewかMeta Bindで知ることができる。今回は`image-converter`がプラグインのIDとなる。

# Templaterのコマンドを作る

```js
const pluginName = "image-converter";
const enabledPlugins = app.plugins.enabledPlugins;

if (enabledPlugins.has(pluginName)) {
    await app.plugins.disablePluginAndSave(pluginName);
    new Notice(`❌ ${pluginName} has been disabled.\n`);
} else {
    await app.plugins.enablePluginAndSave(pluginName);
	new Notice(`✅ ${pluginName} has been enabled.\n`);
}
```

こんな感じで作ってみる。

![[Pasted image 20250204134016.webp]]

できた。ちゃんと動くことを確認しました。作ったコマンドはホットキーに設定するなりCommanderでボタン化するなり、アクセスしやすくする。

# おわりに

これが正しい手法なのかは不明だが、DataviewとTemplaterの組み合わせであらゆる機能をコマンドに変換することができそう。
