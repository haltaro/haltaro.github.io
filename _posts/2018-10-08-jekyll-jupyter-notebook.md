---
layout: post
title: JekyllにJupyter notebookを埋め込む
updated: 2018-10-08
cover:  "/assets/2018-10-03-blocks.jpg"
categories:
 - jekyll
 - python
published: false
---

[red-data-tools/jekyll-jupyter-notebook - GitHub](https://github.com/red-data-tools/jekyll-jupyter-notebook)を使って，[Jekyll](https://jekyllrb-ja.github.io/)サイトに[Jupyter notebook](http://jupyter.org/)を埋め込んだ．[Gist](https://gist.github.com/)を使った方法と違い，埋め込みサイズが固定でないし，ローカルで作業が完結するのでとても良い．

> 追記
> GitHub Pagesがこのプラグインに対応して無かった…．

# 環境

- Ruby 2.5.1p57
- Jekyll 3.7.3
- Jupyter 4.4.0

# 従来手法と課題

これまで私は，[Gist](https://gist.github.com/)を使って，[Jupyter notebook](http://jupyter.org/)を[Jekyll](https://jekyllrb-ja.github.io/)サイトに貼り付けてきた．具体的な手順は以下．

1. [Gist](https://gist.github.com/)の`New gist`で，アップロードしたいNotebookをドロップする．
2. `Embed`から埋め込みスクリプトをコピーして，貼り付ける．

<script src="https://gist.github.com/haltaro/9f2093d3f213a405a2d24e8db05bf408.js"></script>

簡単にそれっぽく実装できるが，以下の二点が不満だった．

- 埋め込みサイズが固定されているため，長めのNotebookになるとウインドウ内でスクロールが必要になる．
- ローカルマシンで作業を完結できず，更新のたびにGistにアップロードしないといけない．

いろいろ探した結果，[red-data-tools/jekyll-jupyter-notebook - GitHub](https://github.com/red-data-tools/jekyll-jupyter-notebook)なるものを発見した．

# jekyll-jupyter-notebook

そもそも，Notebookの`Download as`から`HTML`を選択すればHTMLファイルに変換できるが，更新のたびにポチポチ作業するのは面倒くさい．そこで，[red-data-tools/jekyll-jupyter-notebook - GitHub](https://github.com/red-data-tools/jekyll-jupyter-notebook)[^thanks]を使い，`jekyll s`を実行する度，自動でNotebookをHTMLに変換し，記事中の任意の場所に埋め込めるようにした．

[^thanks]: 素晴らしいツールです！ありがとうございます！

## インストール

[本家](https://github.com/red-data-tools/jekyll-jupyter-notebook)を参考にすれば，問題なくインストールできた．まず，`Gemfile`に以下を追記し，`bundle install`する．

<script src="https://gist.github.com/haltaro/7fb5ae681a1a6eca95b967286182f675.js"></script>

次に，`_config.yml`に以下を追記すれば完了．

<script src="https://gist.github.com/haltaro/8968f9c2ffe72742ab613d9ea7b4749d.js"></script>

## 埋め込み

例えば，`/notebooks/`に保管してある`2018-10-08-sample.ipynb`を埋め込みたい場合，以下のスクリプトを記事中に書き込めば良い．

<script src="https://gist.github.com/haltaro/bfd122c19df18831440ddddda113e9f7.js"></script>

{::nomarkdown}
{% jupyter_notebook "/notebooks/2018-10-08-sample.ipynb" %}
{:/nomarkdown}

# 感想

業務でも趣味でもNotebookを使うことが多いため，簡単にJekyllに埋め込めるようになるとかなり助かる．
