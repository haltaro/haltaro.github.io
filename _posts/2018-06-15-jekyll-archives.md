---
layout: post
title: Centrariumのjekyll-archives問題を回避する
updated: 2018-06-15
cover:  "/assets/2018-06-15-jekyll.jpg"
categories:
 - jekyll
---

このウェブサイトのベーステーマである[Centrarium](https://github.com/bencentra/centrarium)は，非常に完成度が高く，使い勝手が良いテーマである．しかし，私の力不足のため，[内部で利用されているjekyll-archivesがまともに動作せず](https://haltaro.github.io/2018/02/11/theme-change)，各ポストのカテゴリリンク先が正しく貼れていなかった．いろいろ試した結果，`_config.yml`で`jekyll-archives`を無効化したら，すべての問題が解決したのでメモしておく．

# 環境

`Gemfile`は以下のような感じ．

<script src="https://gist.github.com/haltaro/cb98944347875e62bdb072503bf9a0a5.js"></script>

# 手順

`_config.yml`における，`jekyll-archives`関連のすべての設定をコメントアウトする．

<script src="https://gist.github.com/haltaro/43b5d125344d139b15eb51c1177e21ed.js"></script>

これだけでOK．各ポストのカテゴリリンク先は，`{{ site.baseurl }}/posts/#{{ cat }}`に向けて貼られるようになる．これは，`index.html`や`_layouts/post.html`において次のようにリンク先を指定しているため．

<script src="https://gist.github.com/haltaro/78b00c5d648473f1546f6ca677ec7135.js"></script>

# 感想

カテゴリごとに独立したページを作成したいわけではないので，この対応で十分．
