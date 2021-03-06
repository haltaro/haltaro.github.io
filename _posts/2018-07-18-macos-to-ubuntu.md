---
layout: post
title: 7年もののMacBook ProがUbuntu 16.04に生まれ変わった
updated: 2018-07-18
cover:  "/assets/2018-07-15-penguin.jpg"
categories:
 - mac
 - linux
---

MacBook Pro（13-inch Early 2011）の動作が怪しくなってきた．かれこれ7年以上使っているので，そろそろ寿命なのかもしれない．[Ubuntu 16.04](https://www.ubuntu.com/)をインストールして，第二の人生を歩んでもらうことにした．

[MacでubuntuのインストールUSBを作成する方法と手順 - virtualiment](https://www.virment.com/making-installusb-ubuntu-mac/)で作成したところ，おそらくフォーマッティングに問題があったため，私の環境ではUSBメモリでブートできなかった．結局，[Ubuntu公式チュートリアル](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0)を参考に作業したらうまくいった．

# 環境

- MacBook Pro（13-inch Early 2011）
  - プロセッサ：2.7 GHz Intel Core i7
  - メモリ：8 GB 1333 MHz DDR3
  - グラフィックス：Intel HD Graphics 3000 512 MB
- USBメモリ：2GB

# 手順

## USBメモリの準備

`ディスクユーティリティ`で，当該USBメモリを初期化する．

- フォーマット：MS-DOS (FAT)
- 方式：GUIDパーティションマップ

![disk-utility]({{site.baseurl}}/assets/2018-07-15-disk-utility.png)

## `iso`ファイルのダウンロード

[Ubuntu 16.04 LTS 日本語 Remix リリース - ubuntu japanese team](https://www.ubuntulinux.jp/News/ubuntu1604-ja-remix)[^lts]より，`ubuntu-ja-16.04-desktop-amd64.iso`をダウンロード．

[^lts]: 2018年7月15日時点で，[Ubuntu 18.04 LTS](https://www.ubuntulinux.jp/News/ubuntu1804-ja-remix)がリリースされているが，[まだ結構不具合がある](https://linuxfan.info/ubuntu-18-04-issues)みたいなので，使い慣れている16.04にした．

## `Etcher`による書き込み

[Etcher](https://etcher.io/)をインストールして，起動する．

![etcher]({{site.baseurl}}/assets/2018-07-15-etcher.png)

`Select image`で`ubuntu-ja-16.04-desktop-amd64.iso`を，`Select drive`で当該USBメモリを選択肢，`Flash!`を押下．

![etcher-config]({{site.baseurl}}/assets/2018-07-15-etcher-config.png)

## ブート

`option`キーを押しながらMacを起動するが，なぜかUSBメモリが表示されなかった．[別の起動ディスクを選択する方法 - Apple support](https://support.apple.com/ja-jp/ht202796)を参考に，以下を実行すて再起動すると，無事表示された．

<script src="https://gist.github.com/haltaro/3a9637266e9105c5302d88bd99a1e7c8.js"></script>

あとは，当該USBメモリを選択し，画面上の指示に従えばUbuntuのインストールが完了した．

# 感想

なんだかんだで，[公式チュートリアル](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0)を見るのが一番早かった．

実は，無線LANに繋がらないという重大な問題が残っているが，これは以前投稿した[UCOMとAirMacの問題](https://haltaro.github.io/2018/06/10/ucom-airmac)と絡んでおり根が深い．解決したら改めて記事にする．

# 参考

- [MacでubuntuのインストールUSBを作成する方法と手順 - virtualiment](https://www.virment.com/making-installusb-ubuntu-mac/)
- [Create a bootable USB stick on macOS - Ubuntu tutorials](https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos#0)
