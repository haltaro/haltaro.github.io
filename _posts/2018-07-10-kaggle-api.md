---
layout: post
title: MacでKaggle-apiを使う
updated: 2018-07-10
cover:  "/assets/2018-07-10-kaggle.jpg"
#published: false
categories:
 - kaggle
---

ものすごく今更ながら，[kaggle-api](https://github.com/Kaggle/kaggle-api)をMacBookで使ってみた．簡単だった．

# 環境

- macOS Sierra, 10.12.6

# 手順

[kaggle-apiというKaggle公式のapiの使い方をまとめます - kaggleを全力でやります](http://www.currypurin.com/entry/2018/kaggle-api)を参考にさせて頂いた．

<script src="https://gist.github.com/haltaro/0d2cef54e6117e58f9dc978aac5c6fbc.js"></script>

Kaggleの`user profile`に移動し，`Create API Token`をクリック．取得した`kaggle.json`を，`~/.kaggle/kaggle.json`に移動．ここで，`kaggle.json`の権限を変更する．

<script src="https://gist.github.com/haltaro/8db084788f6eebac7f91ab0e7696a16a.js"></script>

# 使い方

[Kaggle/kaggle-api - GitHub](https://github.com/Kaggle/kaggle-api)を見るのが手っ取り早い．

## ヘルプ

<script src="https://gist.github.com/haltaro/0f20c2bdee7017c09c72aecda941c86f.js"></script>

## コンペティション一覧を取得

2018年7月10日現在，次のような結果が出た．

<script src="https://gist.github.com/haltaro/093d9f86000f25a0bbc7fb914ac83ba1.js"></script>

## コンペティションのデータを一括ダウンロード

例えば，[Santander Value Prediction Challenge](https://www.kaggle.com/c/santander-value-prediction-challenge/data)のデータを一括ダウンロードしたい場合は，次のようにコマンドを打つ．

<script src="https://gist.github.com/haltaro/4f78d053465087ec99d73d378daaaef6.js"></script>

- `-c`：コンペティション名．`kaggle competitions list`の`ref`列のものを使う．
- `-p`：ダウンロード先のパス．デフォルトだと，`~/.kaggle/competitions/`．

他にもいろいろオプションがある．`kaggle competitions download -help`で確認できる．

## コンペティションに予測結果をアップロード

例えば，[Santander Value Prediction Challenge](https://www.kaggle.com/c/santander-value-prediction-challenge/data)に予測結果をアップロードしたい場合は，次のようにコマンドを打つ．

<script src="https://gist.github.com/haltaro/ef6bbd733c1ffe1bda6ffb7c46026d2a.js"></script>

- `-c`：コンペティション名．`kaggle competitions list`の`ref`列のものを使う．
- `-f`：アップロードしたいファイル名．
- `-m`：アップロード時のメッセージ．
