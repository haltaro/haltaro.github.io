---
layout: post
title: Jekyllで下書き記事管理
updated: 2017-10-25 20:00
cover: "/assets/2017-08-06-blog.jpg"
categories:
 - jekyll
---

これまでは下書き記事を`（作成中）`と注意書きして公開していたが，見栄えが良くないので，[Jekyllのdrafts機能](http://jekyllrb-ja.github.io/docs/drafts/)で一旦非公開[^1]にすることにした．ただし，途中経過を公開する意味がありそうな，読書メモや受講メモはそのまま残す．

> **2018/02/11追記**：このあと，本サイトの[Jekyll theme](http://jekyllthemes.org/)を[EasyBook](https://github.com/laobubu/jekyll-theme-EasyBook)から[Centrarium](https://github.com/bencentra/centrarium)に変更した．詳細は[Jekyll themeをCentrariumに変更する - Memotaro](https://haltaro.github.io/2018/02/11/theme-change)を参照されたい．

[^1]: 万が一リンクを保存していた方がいたらごめんなさい．

# Jekyllのdrafts機能

[Jekyll，ドラフトを使う](http://jekyllrb-ja.github.io/docs/drafts/)を参考にした．

下書き記事は`title.md`形式[^2]で，ルートディレクトリに作成した`_drafts`フォルダに保存する．このまま`$ jekyll serve`すると，`_drafts`以下の記事を無視してサイトが構築される．

[^2]: `yyyy-mm-dd-title.md`形式で保存すると，エラーが出た．

![before]({{site.baseurl}}/assets/2017-10-25-jekyll-before.png)

一方，`$ jekyll serve --drafts`とすると，`_drafts`以下の記事も含めてサイトが構築される．ここで，最終更新日が，各ドラフト記事の投稿日として処理されることに注意．

![after]({{site.baseurl}}/assets/2017-10-25-jekyll-after.png)

以下のように記事を整理した．

## 公開のままにした記事

未完成の読書メモや受講メモは，栞として役に立つ．`随時更新`と注意書きをつけて公開することにした．

* [Udacity, Intro to Relational Databases](https://haltaro.github.io/2017/08/10/udacity-rdb)
* [Udacity, Intro to Hadoop and MapReduce](https://haltaro.github.io/2017/08/13/udacity-hadoop)
* [コトラー，アームストロング，恩藏のマーケティング原理](https://haltaro.github.io/2017/10/15/marketing)

## \_draftsに退避した記事

その他の下書き記事は一旦`_drafts`に対比した．完成し次第，再度公開する予定．

* Support vector machineの理論と実装
* 時系列分析技術まとめ

# 感想

Jekyllには，まだまだ理解していない機能がたくさんある．いつかドキュメントをちゃんと読まないと．

# お礼とお詫び

[Google analyticsでアクセス解析](https://haltaro.github.io/2017/08/04/set-google-analytics)してみると，ごくわずかですが，本ウェブサイトを訪問してくださる方がいるみたいです．感謝です．

今回のように，当方の勝手な都合で記事を削除させていただく場合もございます．何卒ご理解よろしくお願い致します．これに懲りず，たまに覗きに来ていただけると嬉しいです．
