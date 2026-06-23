---
date: 2026-04-01
updated: 2026-04-01
aliases: []
tags:
  - note/publish
description: pnpmのminimumReleaseAgeとuvのexclude-newerを使って、最新版パッケージのインストールに24時間のクールダウンを設けるサプライチェーン攻撃対策の方法。
---

# はじめに

3月24日にLiteLLMに対するサプライチェーン攻撃があった。自分もLiteLLMを使っているので少しヒヤッとしたが、しばらくinstallやupdateをしていなかったので問題なかった。偶然助かっただけだった。

> [!quote] [Security Update: Suspected Supply Chain Incident | liteLLM](https://docs.litellm.ai/blog/security-update-march-2026)

その後、3月31日にはaxiosに対するサプライチェーン攻撃も話題になった。

> [!quote] [Axios Supply Chain Attack Pushes Cross-Platform RAT via Compromised npm Account](https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html)

axiosのケースは、インストール後に実行されるpost scriptを悪用したものらしい。pnpmはデフォルトでpost scriptを無効にしているため、pnpmユーザーは被害を受けにくいという特徴がある。自分はnpxはほぼ使わないが、信頼できそうなパッケージのnpm installはそれなりにやる。対策を考えておきたい。

# サプライチェーン攻撃への現実的な対策

CI環境でのインストール強制、[Socket](https://socket.dev/)による監視、バージョンの厳格なロックなど様々な対策があるが、根本的な完全防御は難しい。

注目したいのは、上記の2つのインシデントがいずれも**数時間以内に削除・対応された**という点だ。であれば、最新版のインストールに24時間程度のクールダウンを設けるだけで、多くの攻撃を回避できる可能性がある。コスパの良い対策だろう。

pnpmとuvにはこの考え方を実現する機能が備わっている。

# pnpm の minimumReleaseAge

pnpmのminimumReleaseAge — pnpm v10.16以降で使える設定。新しく公開されたバージョンのインストールを一定時間遅延させる。

**グローバル設定**（`~/.config/pnpm/rc`、XDG未設定のmacOSでは `~/Library/Preferences/pnpm/rc`）：

```ini
minimum-release-age=1440
minimum-release-age-exclude[]=@myorg/*
```

**プロジェクト設定**（`pnpm-workspace.yaml`）：

```yaml
minimumReleaseAge: 1440  # 24時間（分単位）
minimumReleaseAgeExclude:
  - '@myorg/*'
```

`minimumReleaseAgeExclude` で自分の開発パッケージを除外できる。グローバル設定は `pnpm dlx`（npx相当）にも適用される。npxのaliasをpnpm dlxに向けておくと、npxコマンドがそのまま保護対象になる。

```sh
alias npx="pnpm dlx"
```

# uv の exclude-newer

uvのexclude-newer — uvのresolverレベルで適用される設定。指定した期間より前に公開されたバージョンのみを依存関係の解決対象にする。

**グローバル設定**（`~/.config/uv/uv.toml`）：

```toml
exclude-newer = "24 hours"
```

**プロジェクト設定**（`pyproject.toml` または `uv.toml`）：

```toml
[tool.uv]
exclude-newer = "24 hours"
exclude-newer-package = { mypackage = false }
```

恐らく、`uvx`にもグローバル設定が適用される。

# おわりに

両ツールともグローバル設定に追加してdotfilesにも反映した。インストールやupdateの頻度が低いとはいえ、常時有効にしておくに越したことはない。

# 参考

- [Security Update: Suspected Supply Chain Incident | liteLLM](https://docs.litellm.ai/blog/security-update-march-2026)
- [Axios Supply Chain Attack Pushes Cross-Platform RAT via Compromised npm Account](https://thehackernews.com/2026/03/axios-supply-chain-attack-pushes-cross.html)
- [Mitigating supply chain attacks | pnpm](https://pnpm.io/supply-chain-security)
- [Settings (pnpm-workspace.yaml) | pnpm](https://pnpm.io/settings)
- [pnpm 10.16 Adds New Setting for Delayed Dependency Updates | Socket](https://socket.dev/blog/pnpm-10-16-adds-new-setting-for-delayed-dependency-updates)
- [Settings | uv](https://docs.astral.sh/uv/reference/settings/#exclude-newer)
- [How to Protect Against Python Supply Chain Attacks with uv | PyDevTools](https://pydevtools.com/handbook/how-to/how-to-protect-against-python-supply-chain-attacks-with-uv/)