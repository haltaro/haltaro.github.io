---
layout: post
title: Jekyll themeをCentrariumに変更する
updated: 2018-02-11 10:00
cover: "/assets/2017-11-18-vis.jpg"
categories:
 - jekyll
---

3連休を利用して，本サイトの[Jekyll theme](http://jekyllthemes.org/)を[EasyBook](https://github.com/laobubu/jekyll-theme-EasyBook)から[Centrarium](https://github.com/bencentra/centrarium)に変更した．意識高めのアフィブログみたいになってしまったが，個人的には気に入っている．特にロゴがかわいい．

# 環境

以下の記事で構築した環境を想定する．

- [JekyllとGitHub Pagesでウェブサイト自作 - Memotaro](https://haltaro.github.io/2017/07/30/first-post)
- [JekyllでGoogle Analytics - Memotaro](https://haltaro.github.io/2017/08/04/set-google-analytics)
- [Windows7でJekyll+GitHub Pages - Memotaro](https://haltaro.github.io/2017/10/15/jekyll-windows)
- [Jekyllで下書き記事管理 - Memotaro](https://haltaro.github.io/2017/10/25/jekyll-drafts)

つまり：

- [Ruby](https://www.ruby-lang.org/ja/)
- [Bundler](http://bundler.io/)
- [Jekyll](https://jekyllrb-ja.github.io/)：インストールについては[JekyllとGitHub Pagesでウェブサイト自作 - Memotaro](https://haltaro.github.io/2017/07/30/first-post)を参照されたい．
- [GitHub](https://github.com/)：`haltaro.github.io`レポジトリを作成済み．
- [Google Analytics](https://www.google.com/intl/ja_jp/analytics)：トラッキングコードを取得済み．詳細は[JekyllでGoogle Analytics - Memotaro](https://haltaro.github.io/2017/08/04/set-google-analytics)を参照されたい．
- [BotUI](https://github.com/botui/botui)：`botui.min.css`，`botui-theme-default.css`，`botui.min.css`，`botui.min.js`をダウンロードし，`botui.min.css`を修正済み．詳細は[チャットボットを作ろう：3．CSS修正 - Memotaro](https://haltaro.github.io/2018/02/04/chatbot)を参照されたい．

# 手順

## [Centrarium](https://github.com/bencentra/centrarium)をダウンロード

[レポジトリ](https://github.com/bencentra/centrarium)から任意のディレクトリにダウンロードする．

## Bundlerで環境構築

以下のコマンドで環境を整える．エラーが出た場合はその都度対処する．

{% highlight shell %}
$ cd centrarium
$ bundle install
{% endhighlight %}

## `_config.yml`の設定変更

個人設定（`title`，`subtitle`，`email`，`name`，`description`，`url`，`cover`，`logo`）を変更する．本ウェブサイトは`https://haltaro.github.io`直下に展開されるため，`baseurl`を`""`に変更する．また，これまでと一貫したURL構成にするため，`permalink: "/:year/:month/:day/:title"`を追記する．

<script src="https://gist.github.com/haltaro/1029f646107109a94fb4c43ee2f146b2.js"></script>

`highlightjs_theme`を`zenburn`に変更する．テーマの詳細は[こちら](https://highlightjs.org/static/demo/)．

<script src="https://gist.github.com/haltaro/b958eb3bd1c7516158c41da09648e2bf.js"></script>

`descriptions`に，各カテゴリの説明文を追加することもできる[^desc]．

[^desc]: キリがないのでやめた．

`social`に`GitHub`と`Qiita`と`Kaggle`を設定．`icon`では[Font awesomeのicon](https://fontawesome.com/icons?d=gallery)を指定できる．残念ながらQiitaとKaggleは無かったため，それっぽいもので代用する．

<script src="https://gist.github.com/haltaro/d456ac11f4f1cb2f88a52b2b9fef32cb.js"></script>

## `_posts/`に記事を移動

これまで作成した全ての記事を`_posts/`に保存する．

## `assets`に画像を移動

これまでは`images/`に配置していた画像を，`assets/`に保存する．これに伴い，全記事中の画像参照を，`{{site.baseurl}}/images/*`から`{{site.baseurl}}/assets/*`に変更する．また，`cover_image.jpg`として，自分で撮影したこちらを利用する．

![cover]({{site.baseurl}}/assets/cover_image.jpg)

サイト左上に表示されるロゴとして，[ICOON MONO](http://icooon-mono.com/)から柴犬感のあるものをダウンロードして，`logo.png`として保存する．

![logo]({{site.baseurl}}/assets/logo_small.png)

オリジナルでは，解像度に合わせて複数の`icon`，`favicon`，`apple-touch-icon`を用意しているが，面倒なので`logo.png`を使いまわす．`_includes/head.html`を次のように修正する．

<script src="https://gist.github.com/haltaro/b9faabdc247ff1af3b57702f3a14bba3.js"></script>

`about`のプロフィール画像`profile.jpg`[^2]を保存する．

![cover]({{site.baseurl}}/assets/profile.jpg)

各記事のヘッダー画像として，[Pixabay](https://pixabay.com/ja/)から意識高めの写真をダウンロードして保存する[^1]．フロントマタ―で，`cover: "assets/*.jpg"`のように指定できる．

[^1]: ヘッダー画像がつくと，一気に胡散臭くなる不思議．
[^2]: キュート．

![image]({{site.baseurl}}/assets/2017-11-18-vis.jpg)

## フォントサイズを調整

本ウェブサイトでは，書籍名など，タイトルが長くなる場合がある．デフォルトのフォントサイズだと，モバイル表示で非常に見づらいため，`_sass/_layout.scss`を変更する．

<script src="https://gist.github.com/haltaro/b5c37a771f8b2fb64f1c5217bccb7cec.js"></script>

見出しのフォントも大きい気がするので，`_sass/base/_typography.scss`を変更する．

<script src="https://gist.github.com/haltaro/8b0eb9a74a1aebf9aaf8bcf640670cf5.js"></script>

## `_layouts/post.html`を変更

どうせ自分しか書かないので，著者表示をコメントアウトする．

<script src="https://gist.github.com/haltaro/ee88390b901c5aabc58e48abea6062b3.js"></script>

SNS共有もコメントアウトする．

<script src="https://gist.github.com/haltaro/a7c0169e575a970ded4bc5ed5da35fe3.js"></script>

## MathJaxを導入

記事中に数式を表示するため，[MathJax](https://www.mathjax.org/)を導入する．`_includes/head.html`に`<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>`を追記する．

## `index.html`のサマリ表示を変更

日本語で記事を書くと，`index.html`のサマリ部分に全文表示されてしまう．おそらく`<ul class="post-list">`部分の`truncatewords: 50`が[英語以外で動作しない](https://github.com/Shopify/liquid/issues/166)せいだと考えられる．無難に`post.excerpt`で一行目だけ抽出する設定に変更する．

<script src="https://gist.github.com/haltaro/5918a210a41127356a2a71abba316fe9.js"></script>

## `Projects`ページを追加

[JekyllとGitHub Pagesでウェブサイト自作 - Memotaro](https://haltaro.github.io/2017/07/30/first-post)と同様，自分の成果をまとめた`Projects`ページを作成したい．以下のフロントマターを持つ`projects.md`を配置するだけでOK．

<script src="https://gist.github.com/haltaro/d5b09a3e5648ad6e8bb8d91ebc46af13.js"></script>

## Google analyticsを導入

[JekyllでGoogle Analytics - Memotaro](https://haltaro.github.io/2017/08/04/set-google-analytics)で作成した`analytics.html`を`_includes/`に格納する．なお，`'UA-*********-*'`は各自取得したトラッキングコード．

<script src="https://gist.github.com/haltaro/45500c3c134f5c48b549408b02c312c3.js"></script>

`_layouts/default.html`に以下を追記．

<script src="https://gist.github.com/haltaro/c9d454635b5304cdb2163c5f38490f3b.js"></script>

ここで，`jekyll.environment == 'production'`は，ローカル環境での動作テスト（`$ bundle exec jekyll serve`）をトラッキング対象から除外するためのもの．

## AboutにBotUIを導入

[チャットボットを作ろう：3．CSS修正 - Memotaro](https://haltaro.github.io/2018/02/04/chatbot)で用意した`botui.min.css`と`botui-theme-default.css`を`css/`に保存する．同様に，`bot.js`と`bot.min.js`を`js/`に保存する．

以下の`bot.html`を作成し，`_layouts/`に保存する．

<script src="https://gist.github.com/haltaro/e7ea6215b2518f94df935e055de54b77.js"></script>

`about.md`のフロントマターの`layout`を`bot`に変更する．

## ローカルテスト

{% highlight shell %}
$ bundle exec jekyll serve
{% endhighlight %}

ブラウザで`localhost:4000`にアクセスして動作を確認する．

# 感想

思っていたより時間はかからなかった．実は[Jekyll-archivesがまともに動作していない](https://github.com/bencentra/centrarium)し，`highlight.js`がうまく動作していないので，追って修正しようと思う．
