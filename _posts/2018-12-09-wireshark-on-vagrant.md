---
layout: post
title: Vagrantで立てたUbuntu 16.04上のWireSharkで遊ぶ
updated: 2018-12-09
cover:  "/assets/2018-07-13-flow.jpg"
categories:
 - network
 - vagrant
---

[Network engineering Advent Calendar 2018](https://qiita.com/advent-calendar/2018/network-engineering)の8日目の記事．諸事情により[Vagrant](https://www.vagrantup.com/)で立てたUbuntu 16.04上で[WireShark](https://www.wireshark.org/)を操作する必要があったため，環境設定をまとめておく．

# 前提

## Virtualbox

[Oracle VM VirtualBox](https://www.virtualbox.org/)は，言わずと知れたx86仮想化ソフトウェア・パッケージ．ホストOSとして，Windows，Linux，Mac OS X，そしてSolarisに対応している．ホストOS上で実行できるゲストOSとして，Windows，Linux，OpenSolaris，OS/2，そしてOpenBSDに対応している．Webエンジニアがサーバ/クライアントの検証環境として使っていたり，ネットワークエンジニアが検証用ネットワークの構築に使っていたりする．

今回は，ゲストOSとしてUbuntu 16.04を立ち上げ，そこにWireShark環境を構築する．

## Vagrant

[Vagrant](https://www.vagrantup.com/)は仮想環境の設定自動化ツール．Rubyで実装されており，Debian，Windows，Centos，Linux，macOS，Arch Linux上で動作する．Vagrantを使うと，超簡単に仮想マシンを構築できるようになるし，検証環境を統一化できる．詳細は[Vagrant + VirtualBoxでWindows上に開発環境をサクッと構築する - Qiita](https://qiita.com/ozawan/items/160728f7c6b10c73b97e)が参考になる．

## WireShark

[WireShark](https://www.wireshark.org/)は，最もメジャーなプロトコル・アナライザの一つ．プロトコル・アナライザとは，ネットワークに流れるデータを解析する装置やプログラムのこと．ノートパソコン上で動作する軽量かつ無料なものから，専用装置上で動作するプロ向けの高価なものまで様々なものが存在するが，WireSharkは前者に属する．無料であるにもかかわらず，多様な機能を提供していることから，多くの企業・非営利団体・政府組織・学術機関でデファクトスタンダードとして利用されている．

WireSharkを`apt install`すると対話画面に遷移するため，プロビジョニングを完全に自動化するには`Vagrantfile`に工夫が必要．

# 事前準備

[VirtualBox](https://www.virtualbox.org/)と[Vagrant](https://www.vagrantup.com/)のインストールが必要．それぞれ，公式ページの指示に従ってインストーラーをダウンロードすれば簡単にインストールできる．

- [VirtualBox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)

また，今回はX Window Systemを使ってゲストOS上で動作するWireSharkの画面をホストOSで表示するため，ホストOSにXサーバ環境を構築する必要がある．10.6以降のmacOS Xについては，[XQuartz](https://www.xquartz.org/)プロジェクトからX11をインストールすれば良いらしい．他のOSについては，各自ご対応願いたい．以下，参考記事．

- [Mac 用の X11 について - Apple](https://support.apple.com/ja-jp/HT201341)
- [Vagrantの環境でGUIを立ち上げるための環境構築 - FPGA開発日記](http://msyksphinz.hatenablog.com/entry/2015/11/24/020000)

# 実験

## 環境構築

[私のGitHubレポジトリ](https://github.com/haltaro/wireshark-vagrant)からVagrantfileを任意のディレクトリにダウンロードして，以下のコマンドを入力する．

{% highlight bash %}
$ vagrant up
{% endhighlight %}

## WireShark

ホストOSでXサーバが起動していることを確認し，ゲストOSにSSH接続する．

{% highlight bash %}
$ vagrant ssh
> Welcome to Ubuntu 16.04.5 LTS (GNU/Linux 4.4.0-139-generic x86_64)
>
>  * Documentation:  https://help.ubuntu.com
>  * Management:     https://landscape.canonical.com
>  * Support:        https://ubuntu.com/advantage
>
>   Get cloud support with Ubuntu Advantage Cloud Guest:
>     http://www.ubuntu.com/business/services/cloud
>
> 13 packages can be updated.
> 6 updates are security updates.
>
> New release '18.04.1 LTS' available.
> Run 'do-release-upgrade' to upgrade to it.
>
>
vagrant@ubuntu-xenial:~$
{% endhighlight %}

この状態で，WireSharkを起動する．

{% highlight bash %}
vagrant@ubuntu-xenial:~$ wireshark
{% endhighlight %}

すると，以下のような画面が立ち上がる．

![wireshark]({{site.baseurl}}/assets/2018-12-09-wireshark.png)

できた．

# 感想

正直，このままだと使いようがないが，例えば複数の仮想マシンを起動して，ゲストOS間でやりとりされるパケットをキャプチャするときなどに使える．時間が見つかれば書く．
