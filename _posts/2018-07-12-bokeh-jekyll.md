---
layout: post
title: JekyllにBokehのグラフを埋め込む
updated: 2018-07-12
cover:  "/assets/2018-06-24-berries.jpg"
categories:
 - jekyll
 - visualization
---

[Bokeh](https://bokeh.pydata.org/en/latest/)で作成したインタラクティブなグラフを，[Jekyll](https://jekyllrb-ja.github.io/)に埋め込みたくなった．[Embedding Bokeh Plots with Github Pages -
Paige McKenzie](https://p-mckenzie.github.io/python/2017/12/01/embedding-bokeh-with-github-pages/)を参考にしたら，簡単にできた．日本語もちゃんと表示されている．

{% include /bokeh/2018-07-12-flowers.html %}

# 環境

- macOS Sierra, 10.12.6
- Ruby 2.5.1p57
- Jekyll 3.7.3
- Python 3.6.5
- Bokeh 0.12.15

# 手順

[Embedding Bokeh Plots with Github Pages -
Paige McKenzie](https://p-mckenzie.github.io/python/2017/12/01/embedding-bokeh-with-github-pages/)を参考にすれば良い．

## `html`ファイルの生成

以下を実行して，`2018-07-12-flowers.html`を生成する．

<script src="https://gist.github.com/haltaro/45eed6ed78d3ebec38d167cb92eda519.js"></script>

ポイントは`output_file()`で出力すること．この直後に`show(p)`するとグラフを確認できる．

## `html`ファイルの配置

上記で生成した`2018-07-12-flowers.html`を，`_includes`以下の任意の場所に保存する．本ウェブサイトでは，`_includes/bokeh/`ディレクトリ配下に保存した．ただし，`2018-07-12-flowers.html`冒頭の`<!DOCTYPE html>`を削除しないと，そのまま表示されてしまうので注意．

## Markdownからの呼び出し

以下を記載すれば，任意の場所にグラフを配置できる．

<script src="https://gist.github.com/haltaro/7234b4192a1ccf8df6d64907ef9f7200.js"></script>

{% include /bokeh/2018-07-12-flowers.html %}

# 感想

思ったよりずっと簡単にできた．これで，[Projects](https://haltaro.github.io/projects/)ページのグラフをいい感じにできる．

将来的には，週間少年ジャンプの掲載順を定期的に[文化庁メディア情報データベース](https://mediaarts-db.bunka.go.jp/?locale=ja&display_view=sp)から取得して，インタラクティブにグラフ表示するようにしたい．無料で実現するためには，Herokuとか使えばいいのかしら．
