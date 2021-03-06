---
layout: post
title: JekyllにAlgoliaで全文検索機能を実装する
updated: 2018-06-16
cover:  "/assets/2018-06-16-algolia.jpg"
categories:
 - jekyll
---

本サイトに待望の[全文検索機能を実装](https://haltaro.github.io/search/)した．Algolia社の[DocSearch](https://community.algolia.com/docsearch/)の審査に通らなかったので，同社の[Free hacker plan](https://www.algolia.com/pricing)を利用した．

<iframe width="100%" height="480" src="https://www.youtube.com/embed/iBIoajzYWGE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# Algolia

Algoliaは，リアルタイム検索をSaaSで提供するサービス群．今回は，[DocSearch](https://community.algolia.com/docsearch/)および[Free hacker plan](https://www.algolia.com/pricing)の利用を検討した．

## DocSearch

[DocSearch申請用ページ](https://community.algolia.com/docsearch/)で登録したURLが審査に通ると，Algoliaのクローラが自動でインデックスファイルを構築し，検索用APIを公開してくれるという，ゆとりには嬉しいサービス．何を隠そう[Jekyll](https://jekyllrb.com/)の検索システムもこれで実装されている．今回は残念ながら審査に通らなかった[^japanese]ので，[Free hacker plan](https://www.algolia.com/pricing)を利用することにした．

![docsearch]({{site.baseurl}}/assets/2018-06-16-docsearch.png)

[^japanese]: Algolia社が定める"technical documentation site"ではないと，丁寧なお祈りメールが来た．そもそも日本語だと通りづらいんじゃないか．

## Free hacker plan

自力で作成したインデックスファイルをAlgoliaにアップロードし，検索用APIを利用するプラン．マスターデータは1万件まで登録でき，APIを月10万回まで利用できる．[Algoliaを利用してサイト内検索機能を実装する - WEB EGG](https://blog.leko.jp/post/implement-site-search-with-algolia/)によると，上限をオーバーすると検索もコンテンツの追加もできなくなるみたい．月1万PV程度のブログでギリギリ足りない感じらしいので，本ウェブサイトなら余裕である[^sad]．

![hacker]({{site.baseurl}}/assets/2018-06-16-hacker.png)

幸い，[Jekyll向けのプラグイン](https://community.algolia.com/jekyll-algolia/)があるため，私でも簡単に実装できた．以下に手順を示す．

[^sad]: 月1000PVくらい．

# 手順

以下は基本的に[Algolia for Jekyll - Algolia](https://community.algolia.com/jekyll-algolia/)および[Blog search -  Algolia for Jekyll](https://community.algolia.com/jekyll-algolia/blog.html)に則っているが，ウェブサイトの一貫性を保つために一部のコードを修正している．

## Algoliaのユーザ登録

[Algolia](https://www.algolia.com/)からサインアップする．以降の処理で，ダッシュボードの`Application ID`，`Search-Only API Key`，および`Admin API Key`が必要なのでメモしておく．

## `jekyll-alglia`の設定

`Gemfile`に以下を追記し，`$ bundle update`する．

<script src="https://gist.github.com/haltaro/bc3a34adff021f762373f452f2aad4e7.js"></script>

`_config.yml`に`jekyll-algolia`の設定を追加する．

<script src="https://gist.github.com/haltaro/af5b24ac877c78a8d2230f903f429b8c.js"></script>

## インデックスの作成とアップロード

シェルで以下を実行する．

<script src="https://gist.github.com/haltaro/7602fed4d47e0062ed2779fc5070e4f9.js"></script>

ここで，`Admin API Key`はローカルで保管する必要がある．間違ってGitHub等にアップしないように注意．以降は，検索窓の実装に入る．

## `_layouts/search.html`

[Blog search -  Algolia for Jekyll](https://community.algolia.com/jekyll-algolia/blog.html)の`search.html`を参考にした．ただし，本ウェブサイトのベーステーマである[Centrarium](https://github.com/bencentra/centrarium)と整合するよう，一部に手を加えた．

<script src="https://gist.github.com/haltaro/1c1f54a75dff0ce897373d2d6450310c.js"></script>

## `_includes/algolia.html`

[Blog search -  Algolia for Jekyll](https://community.algolia.com/jekyll-algolia/blog.html)の`algolia.html`を参考にした．

<script src="https://gist.github.com/haltaro/17c7d07fdd56f07c80735e0328ecfbe0.js"></script>

## `search.md`

全文検索用の[Search](https://haltaro.github.io/search/)ページを作成するために，以下の`search.md`ファイルを作成した．

<script src="https://gist.github.com/haltaro/c30ebf72374a701767ebc55fe33a898a.js"></script>

# 感想

これで，本ウェブサイトに欲しかった機能はあらかた実装してしまった．結構書きたい（書かないと忘れてしまいそうな）ことが溜まってきたので，しばらくは統計・機械学習のノウハウや理論を書いていきたい．

# 参考

- [Algolia - Algolia](https://www.algolia.com/)
- [DocSearch - Algolia](https://community.algolia.com/docsearch/)
- [Algolia for Jekyll - Algolia](https://community.algolia.com/jekyll-algolia/)
- [Algoliaを利用してサイト内検索機能を実装する - WEB EGG](https://blog.leko.jp/post/implement-site-search-with-algolia/)
- [Hugo に全文検索を取り付けた - the Right Stuff](http://rs.luminousspice.com/hugo-site-search/)
