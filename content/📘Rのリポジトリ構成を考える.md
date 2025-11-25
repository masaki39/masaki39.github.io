---
date: 2025-04-17
updated: 2025-04-17
aliases: []
tags:
  - note/publish
---

Rのリポジトリ構成を考えてみる。
プロジェクトでリポジトリを作り、renvでパッケージ管理し、gitでバージョン管理する。実行環境はDockerを使用し、srcをCursorで改変していくこととする。

```.
├── .git/
├── data/
│   ├── processed/
│   │   └── processed_data.csv
│   └── raw/
│       └── raw_data.xlsx
├── renv/
├── results/
│   ├── main/
│   │   ├── figures/
│   │   └── tables/
│   └── test/
│       ├── YYYYMMDD.png
│       └── YYYYMMDD.pdf
├── src/
│   ├── analysis/
│   │   ├── test/
│   │   │   ├── test1.Rmd
│   │   │   └── test2.Rmd
│   │   └── main.Rmd
│   └── utils/
│       ├── helpers/
│       ├── stat/
│       ├── function1.r
│       └── function2.r
├── .gitignore
├── dependencies.r
├── project.Rproj
├── README.md
└── renv.lock
```

- パッケージの読み込みはdependencies.r
- dataは生データと処理後データに分ける
- 結果と解析はmainとtestで分ける
- utilsをモジュラー化して組み合わせて、実行すれば必要な解析が終わるくらいのfunctionをつくる。
- Rmdはutilsを並べるだけとし、レポート要素を重視する。

こうすると、一切の無駄がない...はず。しばらくやってみる。
