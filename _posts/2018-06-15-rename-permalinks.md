---
layout: post
title: CentrariumのPostsをCategoriesにリネームする
updated: 2018-06-15
cover:  "/assets/2018-06-15-jekyll.jpg"
categories:
 - jekyll
---

近々，全文検索機能を実装し，現在の`Posts`ページに配置しようと考えている．とは言え，現在の`Posts`ページの`categories`一覧は便利なので，できれば残したい．そこで，一旦`Posts`ページを`Categories`ページとしてリネームして退避することにした．

# 手順

## `posts.html`

まず，`posts.html`を`categories.html`にリネームする．フロントマターを次のように変更する．

<script src="https://gist.github.com/haltaro/e2141c3a1062d73eb53588fba394ac8d.js"></script>

## `index.html`

`index.html`で列挙される，各ポストのカテゴリへのリンク先を，`{{ site.baseurl }}/posts/#{{ cat }}`から`{{ site.baseurl }}/categories/#{{ cat }}`に変更する．


<script src="https://gist.github.com/haltaro/59920969396317c8f64d86bbdf020105.js"></script>


## `_layouts/post.html`

`_layouts/post.html`
の各カテゴリへのリンク先を，`{{ site.baseurl }}/posts/#{{ cat }}`から`{{ site.baseurl }}/categories/#{{ cat }}`に変更する．

<script src="https://gist.github.com/haltaro/9d53778f905f71f938592957a3efaae8.js"></script>
