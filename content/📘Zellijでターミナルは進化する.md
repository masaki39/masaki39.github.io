---
date: 2026-02-13
updated: 2026-02-13
aliases: []
tags:
  - note/publish
description: ターミナルマルチプレクサZellijのレイアウト設定やセッション管理、Claude Code連携を通じて、CLIでの開発環境をIDEのように効率化する活用術を解説します。
---

# はじめに

ターミナルが身近な世界になってきたように思う。実際、ターミナルの大衆化の主因はLLMの発展といえるだろう。LLMが操作しやすいのはCLIであるので、今後CLIの進化はますます加速していくはずだ。そうなるとターミナル内の操作性やUIが重要になってくる。

先日こんな記事を見た。

[![tmux使いが全員Zellijに乗り換える日が来た](https://ogpf.vercel.app/c?url=https://zenn.dev/hirokitakamura/articles/zellij-complete-guide&layout=vertical)](https://zenn.dev/hirokitakamura/articles/zellij-complete-guide)

Zellijというツールを使えば、ターミナルのレイアウトやセッションを管理することができるらしい。たしかにターミナルは複数開いて動かすことが多く、共同で一単位を成すのにも関わらず全てのpaneが同一の重み付けになるのは不自然だ。そもそもtmuxも知らなかったターミナルにわかなのだが、Zellijはどうやら初心者向けのツールのようなので導入してみる。

# レイアウトを定義する

> [!quote] [Layouts - Zellij User Guide](https://zellij.dev/documentation/layouts.html)

作り方は公式ドキュメント参照。`.config/zellij/layout`ディレクトリ内部にレイアウトファイルを保存して`zellij --layout <layout-name>`で起動する。とりあえず4種類作った。

私の場合はYaziとClaude CodeとTerminalがあれば良いので、この3つを適切に配置していく(EditorとLazygitはYazi経由で起動するため)。

また、レイアウトの中からレイアウトを起動することもできるのだが、この時Yaziの起動がBashコマンド経由でないと動かなかった（Yaziが対話的シェルを必要とするため）ので、そういう記載にしている。

## dev

基本レイアウト。

![dev-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213173033.webp)

```json
// 開発用レイアウト
// 使い方: cd ~/project/xxx && zellij --layout dev
layout {
    default_tab_template {
        pane size=1 borderless=true {
            plugin location="zellij:tab-bar"
        }
        children
        pane size=1 borderless=true {
            plugin location="zellij:status-bar"
        }
    }

    tab name="DEV" {
        pane split_direction="vertical" {
            // 左: Yazi (50%)
            pane size="50%" {
                command "bash"
                args "-c" "exec yazi"
            }
            // 右: Claude Code + Terminal (50%)
            pane size="50%" split_direction="horizontal" {
                // 右上: Claude Code (60%)
                pane size="60%" {
                    command "claude"
                }
                // 右下: Terminal (40%)
                pane size="40%" {
                    name "Terminal"
                }
            }
        }
    }
}

```

## quad

4つ分割レイアウト。Claude Code×4。複数タスクの並行作業用。

![quad-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213173413.webp)

```json
// 4分割レイアウト
// 使い方: cd ~/project/xxx && zellij --layout quad
layout {
    default_tab_template {
        pane size=1 borderless=true {
            plugin location="zellij:tab-bar"
        }
        children
        pane size=1 borderless=true {
            plugin location="zellij:status-bar"
        }
    }

    tab name="QUAD" {
        pane split_direction="horizontal" {
            // 上段: Claude 1 + Claude 2 (50%)
            pane size="50%" split_direction="vertical" {
                pane size="50%" {
                    command "claude"
                }
                pane size="50%" {
                    command "claude"
                }
            }
            // 下段: Claude 3 + Claude 4 (50%)
            pane size="50%" split_direction="vertical" {
                pane size="50%" {
                    command "claude"
                }
                pane size="50%" {
                    command "claude"
                }
            }
        }
    }
}

```

## code

VScode風レイアウト。プラグイン開発とかターミナルが複数必要な時に使えそう。

![code-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213190510.webp)

```json
// VSCode風レイアウト
// 使い方: cd ~/project/xxx && zellij --layout code
layout {
    default_tab_template {
        pane size=1 borderless=true {
            plugin location="zellij:tab-bar"
        }
        children
        pane size=1 borderless=true {
            plugin location="zellij:status-bar"
        }
    }

    tab name="CODE" {
        pane split_direction="vertical" {
            // 左側: yazi + terminal (70%)
            pane size="70%" split_direction="horizontal" {
                // 上: yazi (70%)
                pane size="70%" {
                    command "bash"
                    args "-c" "exec yazi"
                }
                // 下: terminal 2つ (30%)
                pane size="30%" split_direction="vertical" {
                    pane {
                        name "Terminal 1"
                    }
                    pane {
                        name "Terminal 2"
                    }
                }
            }
            // 右: Claude Code (30%)
            pane size="30%" {
                command "claude"
            }
        }
    }
}

```

## vertical

縦3個並びのレイアウト。左右分割ウィンドウや端に寄せる時に使いやすい。

![vertical-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213190640.webp)

```json
// 開発用レイアウト
// 使い方: cd ~/project/xxx && zellij --layout vertical 
layout {
    default_tab_template {
        pane size=1 borderless=true {
            plugin location="zellij:tab-bar"
        }
        children
        pane size=1 borderless=true {
            plugin location="zellij:status-bar"
        }
    }

    tab name="VERTICAL" {
        pane split_direction="horizontal" {
            // 上: Yazi (30%)
            pane size="30%" {
                command "bash"
                args "-c" "exec yazi"
            }
            // 中: Claude Code (40%, focus)
            pane size="40%" focus=true {
                command "claude"
            }
            // 下: Terminal (30%)
            pane size="30%" {
                name "Terminal"
            }
        }
    }
}


```

# Default Layout

## welcome

welcomeレイアウトは元々入っている。 Zellijのロゴと組み込みプラグインのsession-managerのみが起動する。このsesion-managerが優秀で、ここからレイアウトの起動やsessionの管理ができるようになっている。

![welcome-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213200922.webp)

つまり、このwelcomeレイアウトの起動方法だけ知っておけば最悪他のコマンドを知る必要はない。ただし、このwelcomeレイアウトも1つのセッションとして保存されてしまうので、session名を固定する工夫が必要だ。

```zsh
zellij --layout welcome attach --create welcome
```

これで、welcomeという名称のsessionに接続し、存在しない場合はwelcomeレイアウトでwelcomeセッションを作成するという意味になる。やや分かりにくい構文だが、**本当に最悪これだけ覚えるかaliasに登録しておけば良い**。

> [!quote] 参考
> [Allow specifying layout when using \`zellij attach --create\` · Issue #4463 · zellij-org/zellij](https://github.com/zellij-org/zellij/issues/4463)

## strider

私はYaziというTUIのファイラーを使用しているので不要だが、Zellijの組み込みのプラグインにstriderというものがある。striderもTUIファイラーで簡単なファイル操作ができる。ZellijだけでターミナルがIDE風にカスタマイズできるということだ。

![strider-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213201830.webp)

# Key Bindを考える

なぜZellijが初心者向けなのかというと、Key Bindが全て下に書いてあるからである。操作を覚えなくても良い。そもそもレイアウトを定義できるということは丁度よいpaneやtab構成で起動できるということなので、そもそもKeyを押す頻度も少ない。ただし、他のターミナルツールとの競合は考える必要がある。特にCtrlを使用するKey Bindは頻回に他ツールと競合するリスクがある。

解決法は主に2通りある。

## Unlock-first modeを使用する

Unlock firstというモードが存在するらしい。Zellijのコマンドはロック解除キーを押してからしか使えなくなる。この方法は、確実だが押す回数が増えるというデメリットがある。

> [!quote] [Keybinding Presets - Zellij User Guide](https://zellij.dev/documentation/keybinding-presets.html?highlight=unlock#the-unlock-first-non-colliding-preset)

## Altキーを起点とする

Ctrl起点のキーをAlt起点とする。これは良さそうだ。私のショートカットキーの使い方は

1. システム層(Raycast): `^⇧⌥⌘` (ハイパーキー)
2. アプリ層: `⌘`
3. ターミナル層: `^` (Ctrl)

となっており、`⇧` (Shift)はmodifierとしてはたらいている。`⌥`は完全に浮いていた。Zellijはアプリ層とターミナル層の中間層なので別キー起点がわかりやすいように感じる。ただし、ターミナルエミュレーターに`⌥`をAltとして認識するような設定を追加する必要がある。わたしの使っているGhosttyの場合は

```
macos-option-as-alt = true
```

と設定ファイルに書く必要がある。`⌥`にはåß∂ƒΩ≈çなどの特殊文字を打つ機能が備わっており、それが使えなくなるが困ることはないだろう。

下記のようにKey Bindを変更した。

- Lock: Ctrl g => Alt g
- Resize: Ctrl n => Alt r
- Pane: Ctrl p => Alt p
- Move: Ctrl h => Alt m
- Tab: Ctrl t => Alt t
- Search: Ctrl s => Alt s
- Session: Ctrl o => Alt o
- Quit: Ctrl q => Alt q

また、頻用の操作はネストせずに直接起動のKey Bindを設定した。

- fullscreen => Alt z
- session manageer => Alt a
- detach => Alt d

# リポジトリ単位でセッション化

セッションの名前は指定しなければランダムに生成される。これをリポジトリ名で固定する方法を考える。上述のwelcomeレイアウトの

```zsh
zellij --layout welcome attach --create welcome
```

の構文だと、quitしたsessionにも繋がってしまうので、EXITしたセッションは削除しないといけない。考えた末に、`.zshrc`に下記のようなfunctionを書くことで解決した。

```zsh
function git_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

function _zellij_attach() {
  cd "$(git_root)"
  local session_name=$(basename "$(pwd)")
  zellij delete-session "$session_name" 2>/dev/null
  zellij --layout "$1" attach --create "$session_name"
}
```

1. gitリポジトリのrootに移動
2. ディレクトリ名を取得
3. ディレクトリ名のEXITしたsessionを削除する（EXITしたsessionを復活させようとしてしまうため）
4. アクティブなsessionにはattachして、なければレイアウトでディレクトリ名のsessionを起動する

このようにして、gitリポジトリ名でsessionを作れるようになる。

![sessions-screenshot](https://filedn.com/lF97wFVWosQpHEoDAbvva0h/image_20260213210339.webp)

各レイアウトはaliasに登録することとする。

```zsh
alias za='zellij --layout welcome attach --create welcome'
alias zz='_zellij_attach dev'
alias zx='_zellij_attach quad'
alias zc='_zellij_attach code'
alias zv='_zellij_attach vertical'
```

ここまですると、レイアウトをすぐに起動できる上に、リポジトリごとのセッションを自由自在に切り替えれる。さらにはセッションの中断再開、終了と再起動ができる。

# 問題点

便利なツールだが、まだ至らない部分もある。

- Yaziのプレビューが表示されない
	- コードベースやドキュメントの管理時しか使えない
	- ただ、Yaziをファイル閲覧に使うときはsingle paneで使うのでZellijは必要ない
- Claude Codeの日本語入力時に表示が狂う
	- これはターミナルツールあるあるだが、[[📘Neovimでプロンプトを書く]]という方法でひとまず対応する

# おわりに

ターミナルは複数で一機能を提供すると考えると、Zellijで管理されたsessionはまるでアプリのようだ。ターミナル内にアプリを何個か飼っているような感覚になる。
