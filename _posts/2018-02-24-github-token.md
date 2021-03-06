---
layout: post
title: HTTPS+トークンで複数のGitHubアカウントを制御する
updated: 2018-02-24
cover: "/assets/2018-02-24-woods.jpg"
categories:
 - github
---

複数のGitHubアカウントを制御したい．[SSHの秘密鍵を複数管理する方法](https://dev.classmethod.jp/tool/github-ssh-sub-account-setting/)もあるが，設定が結構大変で私には荷が重い．いろいろ調べた結果，[HTTPSとトークンを使用する方法](https://qiita.com/tq_jappy/items/6e2f81f372e4abaa5139)が手軽で良さそう．毎回検索するのが面倒なので，メモしておく．

# 手順

全面的に[https+アクセストークンを使ってGitHubのアカウントを使い分ける - Qiita](https://qiita.com/tq_jappy/items/6e2f81f372e4abaa5139)に従う．

## GitHubアクセストークンの作成

所望のGitHubアカウントにログインし，[`Settings > Developer settings`](https://github.com/settings/developers)から`Personal access tokens`を選択する．

![github]({{site.baseurl}}/assets/2018-02-24-github-token.png)

`Generate new token`を押す．

![github]({{site.baseurl}}/assets/2018-02-24-github-options.png)

`Token description`に，用途がわかるような名前をつける．`Select scopes`で，アクセス権を指定できる．とりあえず`repo`にチェックしとけば良さそう[^1]．私の場合，Gistをウェブサイトに埋め込むことがあるので，`gist`にもチェックを入れる．これでページ下部の`Generate token`を押す．表示されるトークンをクリップボードにコピーする．

## リポジトリをクローン

次のフォーマットで，リポジトリをクローンする．

<script src="https://gist.github.com/haltaro/82a7e2f6628df832e0ba78aca62a9865.js"></script>

アカウント名を使い分ける場合は，以下の設定を忘れずに．

<script src="https://gist.github.com/haltaro/b23267dfbd159ace2178f805380e48ad.js"></script>

あとは，何も考えずに`git`を使えば良い．

[^1]: 他のはよくわからない．

# 参考

- [【メモ】githubの複数アカウントにSSH接続するための設定手順 - Developers.IO](https://dev.classmethod.jp/tool/github-ssh-sub-account-setting/)：SSHを使った方法
- [https+アクセストークンを使ってGitHubのアカウントを使い分ける - Qiita](https://qiita.com/tq_jappy/items/6e2f81f372e4abaa5139)：HTTPS＋トークンを使った方法
