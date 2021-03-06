---
layout: post
title: Windows7でJekyll+GitHub Pages
updated: 2017-10-15 17:00
cover: "/assets/2017-08-06-blog.jpg"
categories:
 - jekyll
 - windows
---

船便でアメリカから送ったため，2ヶ月ほどLinuxが使えなくなった．そこで，手元のWindowsノートPC（Windows 7 Professional, Service Pack 1, 64 bit）に[Jekyll](https://jekyllrb-ja.github.io/)+[GitHub Pages](https://pages.github.com/)環境を構築した．

> **2018/02/11追記**：このあと，本サイトの[Jekyll theme](http://jekyllthemes.org/)を[EasyBook](https://github.com/laobubu/jekyll-theme-EasyBook)から[Centrarium](https://github.com/bencentra/centrarium)に変更した．詳細は[Jekyll themeをCentrariumに変更する - Memotaro](https://haltaro.github.io/2018/02/11/theme-change)を参照されたい．

![env]({{site.baseurl}}/assets/2017-10-15-env.png)

# 環境

* Windows 7 Professional, Serice Pack 1, 64 bit
* PowerShell 5.0.10586.117
* ATOM 1.21.1

# 参考

* [OPC Diary，私家版Git For Windowsのインストール手順](http://opcdiary.net/?page_id=27065)：WindowsにおけるGit環境構築．
* [Git for Windows](https://git-for-windows.github.io/)：Windows用Git環境．
* [posh-git](https://github.com/dahlbyk/posh-git)：PowerShellでgitコマンド補完を可能にするツール．
* [KaoriYa，Windowsでjekyll 3.0（github-pages）を使う](https://www.kaoriya.net/blog/2016/02/07/)：WindowsにおけるJekyll環境構築方法．
* [RubyInstaller](https://rubyinstaller.org/downloads/)：RubyおよびDevKitのインストール．
[Qiita，bundle execとかdb:createとかが何をしているのか](https://qiita.com/windhorn/items/0f58866291f8273f18fb)：`bundle exec`の使い方について．
* [ATOM](https://atom.io/)：GitHubが開発したテキストエディタ．
* [ATOM，Line ending converter](https://atom.io/packages/line-ending-converter)：ATOMの改行コードを一括変換するパッケージ．
* [Qiita，Atomエディタ上からファイルを新規作成する際のデフォルトの改行コードを設定する（Windows環境）](https://qiita.com/nyoro_712/items/8c80e32aa49f7a2d2eaf)：ATOMのデフォルト改行コード設定方法．

# 手順

## 1. Gitのインストール

 [OPC Diary，私家版Git For Windowsのインストール手順](http://opcdiary.net/?page_id=27065)を参考にした．
 1. [Git for Windows](https://git-for-windows.github.io/)をダウンロード．
 2. インストーラを起動し，基本的にデフォルト設定を選択．ただし，改行設定（`Configuring the line ending conversions`）では，上記サイトのおすすめに従い，`Checkout as-is, commit as-is`を選択．

## 2. Gitのグローバル設定

`Git bash`を起動し，上記サイトを参考にグローバル設定した．

```bash
$ git config --global user.name "haltaro"
$ git config --global user.email "***@gmail.com"
$ git config --global core.quotepath false
```

## 3. GitのSSHキー作成

引き続き上記サイトを参考に，SSHキーを作成した．

1. スタートメニューから`Git GUI`を起動．
2. `Help > Show SSH Key`を選択．
3. `Generate Key`をクリックし，適当にpassphraseを入力．
4. 公開鍵をコピーして，`GitHub`のアカウントに登録．

## 4. posh-gitのインストール

[posh-git](https://github.com/dahlbyk/posh-git)を使うと，PowerShellでgitコマンド補完してくれて便利なので，インストールした． [OPC Diary，私家版Git For Windowsのインストール手順](http://opcdiary.net/?page_id=27065)のPsGetを使った方法だと上手くいかなかったので，[公式GitHub](https://github.com/dahlbyk/posh-git)から直接クローンした．以下はその詳細である．

まずは，PowerShellで以下のコマンドを打ち，[公式GitHub](https://github.com/dahlbyk/posh-git)からクローンする．ディレクトリはどこでも良い．

```
> git clone git@github.com:dahlbyk/posh-git.git
```

PowerShellのセキュリティ設定を変更した．

```
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Confirm
```

上記ディレクトリに移動して，`install.ps1`を実行した．

```
> .\install.ps1
```

## 5. Rubyのインストール

[RubyInstaller](https://rubyinstaller.org/downloads/)から2017年10月15日現在の最新版である`Ruby 2.4.2-2(x64)`をダウンロードした．

## 6. DevKitのインストール

Rubyのパッケージ管理システム`RubyGems`のインストールに必要な`DevKit`をインストールした．以下はその詳細である．

まず，[RubyInstaller](https://rubyinstaller.org/downloads/)から，`DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exee`をダウンロードした．以下では`C:\DevKit`に解凍したと想定する．

次に，PowerShellから以下のコマンドを実行した．

```
> cd C:\DevKit
> ruby dk.rb init
> ruby dk.rb install
```

## 7. 関連パッケージのインストール

`RubyGems`を使い，`github-pages`と`wdm`をインストールした．

```
> gem install github-pages wdm
```

`> jekyll serve`したらと，次のようなエラーが出た．

```
WARN: Unresolved specs during Gem::Specification.reset:
      rouge (< 3, >= 1.7)
WARN: Clearing out unresolved specs.
Please report a bug if this causes problems.
C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/bundler-1.16.0.pre.3/lib/bundler/runtime.rb:315:in `check_for_activated_spec!': Y
ou have already activated public_suffix 3.0.0, but your Gemfile requires public_suffix 2.0.5. Prepending `bundle exec` t
o your command may solve this. (Gem::LoadError)
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/bundler-1.16.0.pre.3/lib/bundler/runtime.rb:33:in `block in setup'
        from C:/Ruby24-x64/lib/ruby/2.4.0/forwardable.rb:229:in `each'
        from C:/Ruby24-x64/lib/ruby/2.4.0/forwardable.rb:229:in `each'
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/bundler-1.16.0.pre.3/lib/bundler/runtime.rb:28:in `map'
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/bundler-1.16.0.pre.3/lib/bundler/runtime.rb:28:in `setup'
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/bundler-1.16.0.pre.3/lib/bundler.rb:107:in `setup'
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/jekyll-3.6.2/lib/jekyll/plugin_manager.rb:50:in `require_from_bundle
r'
        from C:/Ruby24-x64/lib/ruby/gems/2.4.0/gems/jekyll-3.6.2/exe/jekyll:11:in `<top (required)>'
        from C:/Ruby24-x64/bin/jekyll:23:in `load'
        from C:/Ruby24-x64/bin/jekyll:23:in `<main>'
```

指示通り，`> bundle exec jekyll serve`とコマンドを打ったらうまく行った．[Qiita，bundle execとかdb:createとかが何をしているのか](https://qiita.com/windhorn/items/0f58866291f8273f18fb)によると，`bundle exec`を頭につけると，当該プロジェクトの`Gemfile`で指定された環境でコマンドを実行するらしい．

## 8. ATOMのインストール
マークダウンエディタが欲しかったので，[ATOM](https://atom.io/)をインストールした．[公式ページ](https://atom.io/)からインストーラをダウンロードすれば簡単にできた．しかし…

![outline]({{site.baseurl}}/assets/2017-10-15-outline.png)

サマリ部分に全文表示されてしまう問題が発生した．これはUnixの改行コード（`LF`）とWindowsの改行コード（`CRLF`）が混在していることが原因らしい．

## 9. line-ending-converterで改行コードを一括変換

ATOMの設定画面から，`line-ending-converter`をインストール．`Packages`>`Convert Line Endings To`で，`Unix Format`を選択すると，現在選択中のファイルの改行コードが一括変換される．

詳細は[こちら](https://atom.io/packages/line-ending-converter)．

## 10. line-ending-selectorで改行コード設定

[Qiita，Atomエディタ上からファイルを新規作成する際のデフォルトの改行コードを設定する（Windows環境）](https://qiita.com/nyoro_712/items/8c80e32aa49f7a2d2eaf)を参考に，デフォルト設定を変更．
1. ATOMの設定画面から`line-ending-selector`を検索．
2. `line-ending-selector`の`Setting`ボタンを押下．
3. `Default line ending`から，`LF`を選択．

## 11. まとめ

下図のような環境が完成した．

![env]({{site.baseurl}}/assets/2017-10-15-env.png)

PowerShellで`> bundle exec jekyll serve`して，ブラウザで`http://127.0.0.1:4000`から出来栄えを確認しながら，ATOMでマークダウンを編集できる．

# 感想
ATOMは本当に便利．Linuxが届いたらインストールしようと思う．
