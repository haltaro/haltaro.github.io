---
layout: post
title: Windows 7でAnaconda 5.0.0
updated: 2017-10-22 21:30
cover: "/assets/2017-10-22-python.jpg"
categories:
 - python
 - windows
---

[Anaconda](https://anaconda.org/)とは，[Python](https://www.python.org/)のライブラリパッケージである．普段はUbuntuでコーディングしているが，[以前の記事](https://haltaro.github.io/2017/10/15/jekyll-windows)で述べたように，しばらくWindowsで作業する必要が出てきた．そこで，Windows 7に[Anaconda 5.0.0](https://anaconda.org/)環境を構築した．仮想環境のactivateにハマったのでメモしておく．

# 前提

* Windows 7 Professional, Serice Pack 1, 64 bit
* Anaconda 5.0.0
* PowerShell 5.0.10586.117

# 手順

## 1. Anacondaインストール

[Anaconda cloud](https://www.anaconda.com/download/#windows)から，Python 3.6対応の64 bit Windows向けインストーラをダウンロード．デフォルト設定でインストール．

## 2. 環境変数の設定

[Qiita，Anaconda4.4.0 最初の設定 for Windows](https://qiita.com/dddmm/items/2ccfe13d04ba30238bf3)を参考に，環境変数`Path`にAnacondaのパスを追加．自分の場合は，`C:\Users\haltaro\Anaconda3\Scripts`だった．

## 3. 設定ファイルの作成

PowerShellから設定ファイルを作成．

```
> jupyter notebook --generate-config
```

## 4. activate，deactivateパッチ

このままだと，PowerShellから仮想環境をactivateできない．[Qiita - PowerShellでAnacondaの仮想環境をactivateするメモ](https://qiita.com/ihlbbfbtr/items/097553ccd51543ee31fb)を参考に，[Liquidmantis - PSCondaEnvs](https://github.com/Liquidmantis/PSCondaEnvs)から`activate.ps1`と`deactivate.ps1`をダウンロードし，`activate.bat`と`deactivate.bat`があるフォルダにコピー．自分の場合は，`C:\Users\haltaro\Anaconda3\Scripts`だった．

# 感想

PowerShellは便利だけど，割とハマることが多い．早くLinux届かないかしら．
