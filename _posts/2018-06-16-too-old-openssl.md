---
layout: post
title: OpenSSLが古すぎてbundle updateできない
updated: 2018-06-16
cover:  "/assets/2018-06-16-gem.jpg"
categories:
 - ruby
---

[Algoliaで全文検索機能を実装](https://haltaro.github.io/2018/06/16/jekyll-algolia)するために`Gemfile`を書き換えて`$ bundle update`したところ，`OpenSSL`が古すぎると叱られた．[How to troubleshoot RubyGems and Bundler TLS/SSL Issues - Bundler Docs](https://bundler.io/guides/rubygems_tls_ssl_troubleshooting_guide.html#the-solutions)を参考に対応したら解決した．

# 症状

`bundle update`したら，次のようなエラーが出た．

<script src="https://gist.github.com/haltaro/659ab18c1adf3992c6d77d017bd7e370.js"></script>

よく見たら，冒頭に以下のような警告が．`OpenSSL`のバージョンが古すぎるのが原因らしい．

<script src="https://gist.github.com/haltaro/553c23ad838f043c81d208afd84b10ab.js"></script>

# 対応記録

ほぼ原因はわかっていたが，念の為[How to troubleshoot RubyGems and Bundler TLS/SSL Issues - Bundler Docs](https://bundler.io/guides/rubygems_tls_ssl_troubleshooting_guide.html#the-solutions)を参考に以下のテストを実行した．

<script src="https://gist.github.com/haltaro/e337be914ab33cde81fb2313f14e382d.js"></script>

すると，案の定，`OpenSSL`のバージョンが古いことがわかった．

<script src="https://gist.github.com/haltaro/a2c798d8d1a2429cb1b42ac81dad3458.js"></script>

[Ruby using wrong version of openssl](https://stackoverflow.com/questions/30741367/ruby-using-wrong-version-of-openssl?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)を参考に以下を実行した．

<script src="https://gist.github.com/haltaro/e9be5079025e1c04f5bd9af81a8cba9b.js"></script>

すると`brew reinstall openssl`しろと怒られた．

<script src="https://gist.github.com/haltaro/ffe682173c1cc3c8ae980157bfd73427.js"></script>

これで再度`$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'`にトライしたが，解決せず．[How to troubleshoot RubyGems and Bundler TLS/SSL Issues - Bundler Docs](https://bundler.io/guides/rubygems_tls_ssl_troubleshooting_guide.html#the-solutions)のThe Solutionsに記載されている他のコマンドを試してみた．

<script src="https://gist.github.com/haltaro/98c4a5495aa8acea2232cfab11af960a.js"></script>

解決した．

# 感想

Ruby力が低いため，具体的にどのコマンドが解決の鍵だったのかよくわからなかった．ただ，この機会に`bundle update`と`bundle install`の違いを理解できたので良かった．
