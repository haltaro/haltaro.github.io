---
layout: post
title: Jupyter notebookのフォントを変更する
updated: 2018-03-05
cover: "/assets/2018-03-05-cover.jpg"
#published: false
categories:
 - python
---

[Jupyter notebook](http://jupyter.org/)のコードブロックを等幅フォントにしたい．[Jupytertheme](https://github.com/dunovank/jupyter-themes)を使っても良いが，拡張機能のボタンが消えてしまうことがあり不便．`~/.jupyter/custom/custom.css`をいじって変更した．

# 参考
- [Jupyter notebookを等幅フォントにする - 元文学部統計学専攻学生の備忘録](http://shu87.hateblo.jp/entry/2017/08/30/003224)
- [Jupyter Notebookを自分仕様に：背景，アイコンの変更 - Qiita](https://qiita.com/hiropignis/items/f2192d86971746b849e8)

# 手順

`~/.jupyter/custom/custom.css`に，`.CodeMirror pre, .output pre { font-family: Monaco, monospace; }`を追記して，Jupyterを再起動する．
