---
layout: post
title: JekyllとGitHub Pagesでウェブサイト自作
updated: 2017-08-06 10:00
cover: "/assets/2017-08-06-blog.jpg"
categories:
 - jekyll
---


それなりに技術的なメモが溜まってきたが，[Qiita](http://qiita.com/)に投稿するほどではない．これまでは[evernote](https://evernote.com/intl/jp/)で管理していたが，数式やソースコードを書きづらい．[はてなブログ](http://hatenablog.com/)等で[Markdown](https://ja.wikipedia.org/wiki/Markdown)を書いても良いが，手元にコンテンツが残らないのが嫌だし，`haltaro`ドメインが取れなかった．そこで，[Jekyll](https://jekyllrb-ja.github.io/)と[GitHub Pages](https://pages.github.com/)で，ウェブサイトを立ち上げた．

> **2018/02/11追記**：このあと，本サイトの[Jekyll theme](http://jekyllthemes.org/)を[EasyBook](https://github.com/laobubu/jekyll-theme-EasyBook)から[Centrarium](https://github.com/bencentra/centrarium)に変更した．詳細は[Jekyll themeをCentrariumに変更する - Memotaro](https://haltaro.github.io/2018/02/11/theme-change)を参照されたい．

# 参考

`jekyll github pages`等でググると素晴らしい記事がたくさん出てきた．今回は，特に，以下を参考にした．

* [Jekyll](https://jekyllrb-ja.github.io/docs/home/)：公式ドキュメント．
* [DigitalOcean，How to Set Up a Jekyll Development Site on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)：Ubuntu 16.04を使ってJekyllでウェブサイトを立ち上げる全般について．
* [unitopi，もう迷わない、「@font-familyはこれでOK！」を色々考えてみた。](http://unitopi.com/font-family-css/)：`*-font-family`の設定について．
* [FukkaFuka TRADING POST，HTMLやCSSのソースコードをそのままページに貼り付ける方法](http://fukafuka295.jp/hp/hp_no9.html)：Gistを使ってソースコードをページに埋め込む方法について．
* [joism，アバター画像を設定！Gravatar(グラバター)の登録方法と使い方](http://zaitaku-hukugyo-net.com/1132.html)：Gravatarの登録方法について．
* [Jekyll，パーマリンク](http://jekyllrb-ja.github.io/docs/permalinks/)：パーマリンクの設定方法について．
* [SKKTM Lab Blog，Nestaでkramdownを使って数式を表示してみる](http://blog.skktmlab.info/blog/2015_02_13_2)：MathJaxの設定について．

gitやGitHubの使い方は，もともと知っていたので割愛．

# 手順

なお，Ubuntu 16.04を想定する．

## 1. GitHubアカウント取得

[GitHub](https://github.com/)に登録し，アカウントを取得．もともと持ってた．

## 2. haltaro.github.ioレポジトリ作成

`<アカウント名>.github.io`レポジトリを作成．これも，もともと持ってた．

## 3. Jekyllインストール

[How to Set Up a Jekyll Development Site on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04)を参考に，以下のコマンドを実行．

```bash
$ sudo apt-get install ruby ruby-dev make gcc
$ sudo gem install jekyll bundler
```

ついでに，ローカル保存用のディレクトリを作成して移動．

```bash
$ mkdir haltaro.github.io
$ cd haltaro.github.io
```

## 4. Jekyllテーマ選定

[Jekyll themes](http://jekyllthemes.org/)から，テーマを選んだ．シンプルさと，カテゴリ分類機能という条件を満たす[laobubu](https://github.com/laobubu)さんの[EasyBook](http://jekyllthemes.org/themes/easybook/)を使わせてもらうことにした．

ダウンロードするなりクローンしたファイル一式を，先程のローカルディレクトリに保存．

## 5. カスタマイズ

### 5.1 フォントの変更

デフォルトだと日本語フォントが気持ち悪いので，`/css/main.scss`を次のように変更した．

<script src="https://gist.github.com/haltaro/e33a9c4992e80ac8c0c1f8ae946efa57.js"></script>

流行りの[游ゴシック](http://www.jiyu-kobo.co.jp/library/ygf/)を使おうとしたが，[windowsで線が細くなる問題](http://mandel59.hateblo.jp/entry/2016/11/11/012654)の闇が深く，初心者の手に負えない．[もう迷わない、「@font-familyはこれでOK！」を色々考えてみた。](http://unitopi.com/font-family-css/)を参考に，無難に設定した．

### 5.2 連絡先の追加

連絡先に，`Qiita`と`Kaggle`を追加した．まず，`/_includes/sidebar.html`に`Qiita`ボタンと`Kaggle`ボタンの設定を追記．

<script src="https://gist.github.com/haltaro/acaa8d617ea4fb598f6781ed1a8b916b.js"></script>


次に，`/_config.yml`に`qitta_username`と`kaggle_username`を追加した．

<script src="https://gist.github.com/haltaro/dbbefa944f0072eda07c405e0fdb9762.js"></script>

### 5.3 Projectsページの追加

業績をまとめたページを作りたかったので，`/projects.md`を追加した．フロントマターは，`/about.md`を参考に作った．

<script src="https://gist.github.com/haltaro/ace85ef28accfb567b00fc2ca3f80d81.js"></script>

### 5.4 Gravatarの取得

丸窓にアイコンを表示するためには，[Gravatar](https://en.gravatar.com/)を設定して，ハッシュ値を`/_config.yml`に追記する必要がある．[アバター画像を設定！Gravatar(グラバター)の登録方法と使い方](http://zaitaku-hukugyo-net.com/1132.html)を参考にした．

### 5.5 アイコンの設定

ブラウザのタブ部分と，iPhone/iPadのホーム画面用にアイコンを表示したかったので，`/_includes/head.html`に`icon`および`apple-touch-icon`設定を追記．アイコン自体は，[いらすとや](http://www.irasutoya.com/)さんから調達し，`/images`に格納．

<script src="https://gist.github.com/haltaro/368a39e2956695d01a9728fb87b0e33d.js"></script>

### 5.6 パーマリンクの設定

デフォルトだと，`/archives/:title`形式だったので，`:title`の重複を避ける必要があり，大変．そこで，`/:year/:month/:day/:title`形式に変更した．

<script src="https://gist.github.com/haltaro/6d4bb9c829a7198826cd400a70f9e67b.js"></script>

なお，組み込みパーマリンクスタイル`date`を指定すれば簡単に`/:categories/:year/:month/:day/:title.html`形式になるが，`:categories`に空白文字が入ると嫌なので使わなかった．

### 5.7 MathJaxの設定

[MathJax](https://www.mathjax.org/)を使った数式表示を設定．`_includes/head.html`に以下を追記．

<script src="https://gist.github.com/haltaro/ab0a07373a387bd1b83966d1db9e0a07.js"></script>

## 6. ローカルテスト

下記コマンドで動作確認．いくつかエラーが出たので，その都度ググって解決した．
```
$ jekyll serve
```
ブラウザで`localhost:4000`にアクセスして，出来栄えを確認．

## 7. アップロード

```bash
$ git remote add origin git@github.com:haltaro/haltaro.github.io # アカウント名等は適宜変更のこと．
$ git add . -A
$ git commit -m "First commit"
$ git push origin master
```

しばらく経ってから，`https://haltaro.github.io`にアクセスすると，サイトが出来上がっていた．

# 感想

htmlとかcssとか全然わからんが，なんとか形になった．次回は，[Google Analyticsでトラッキング機能を実装](https://haltaro.github.io/2017/08/04/set-google-analytics)する．
