---
date: 2025-02-09
updated: 2025-07-22
aliases: []
tags:
  - note/publish
socialImage: https://filedn.com/lF97wFVWosQpHEoDAbvva0h/ogp/DALL%C2%B7E%202025-02-09%2021.19.58%20-%20A%20wide%20Open%20Graph%20Protocol%20(OGP)%20image%20for%20an%20article%20about%20adding%20a%20comment%20feature%20to%20Quartz.%20The%20image%20should%20have%20a%20clean%2C%20modern%20design%20with%20a%20su.webp
---

# はじめに

Quartzにコメント機能がつきました。
[公式サイト](https://quartz.jzhao.xyz/features/comments)に則って実装していきます。

# 手順

1. repositoryがpublicであること
2. [GitHub Apps - giscus](https://github.com/apps/giscus)がインストールされていること
3. repositoryのDiscussion機能がオンであること→[Enabling or disabling GitHub Discussions for a repository - GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository)

まずはこの３つを確認します。
それぞれリンク先に沿って行うだけです。

次に[giscus](https://giscus.app/ja)のサイトに行き、上記３条件が満たされているかチェックします。

![[📘Quartzにコメント機能を追加した-1739102787410.webp]]

カテゴリにAnnouncementsを指定します。
すると下の方にこれをサイトに埋め込んでね、と出ますが、Quartzが自動でやってくれるらしいので、`repoId`と`categoryId`のみをチェックします。

![](https://quartz.jzhao.xyz/images/giscus-results.png)
(公式ドキュメントより)

ローカルリポジトリの`quartz.layout.ts`に下記の様に追加します。
先ほどチェックした内容を埋めていきます。

```ts
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'jackyzha0/quartz',
      // from data-repo-id
      repoId: 'MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOFxRnmM4B-Xg6',
    }
  }),
],
```

(公式ドキュメントより)

以上です！簡単！

# コメントが書ける！

![[📘Quartzにコメント機能を追加した-1739103405664.webp]]

# 地味に手こずった点

Quartzをアップデートしないといけなかったのですが、１年半以上upstreamとmergeしてなかったのでそこに手こずりました(慣れてない)。

# おわりに

進化を見守る楽しみ、みたいな楽しみ方をしています。
