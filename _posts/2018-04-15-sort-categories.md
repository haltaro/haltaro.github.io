---
layout: post
title: JekyllのCategories一覧をアルファベット順にする
updated: 2018-04-15
cover: "/assets/2017-08-06-blog.jpg"
categories:
 - jekyll
---

[Posts](https://haltaro.github.io/posts/)ページのCategoriesが出現順で使いづらかったので，アルファベット順になるようコードをを修正した．

こちらは修正前．
![before]({{site.baseurl}}/assets/2018-04-15-before.png)

そしてこちらが修正後．
![after]({{site.baseurl}}/assets/2018-04-15-after.png)

アルファベット順になった．

# 参考

- [Phlow/jekyll-sorted-category-for-loop-alphabetical-date.liquid - Gist](https://gist.github.com/Phlow/57eb457898e4ac4c4a20)

# 手順

`./posts.md`の`category`ループを

<script src="https://gist.github.com/haltaro/f0d3f4848103c64296919acef3b2e228.js"></script>

以下のように修正した．

<script src="https://gist.github.com/haltaro/260563d870c5663bd2dae1179aabcac2.js"></script>

# 感想

そろそろ真面目にRubyを勉強するべきかもしれない．
