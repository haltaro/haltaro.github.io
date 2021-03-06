---
layout: post
title: Brett Slatkin，Effective Python
updated: 2018-02-18 13:00
cover: "/assets/2018-02-17-effective-python.jpg"
categories:
 - python
 - books
---

<i class="fa fa-spinner"></i> **更新中**：[Brett Slatkin，Effective Python ―Pythonプログラムを改良する59項目](http://amzn.asia/gDvdj6b)を読む．[Python](https://www.python.org/)を効率的に書くための59のヒントが紹介されている．

特に心に残った項目を以下にまとめる．Jupyter notebookは[こちら](https://github.com/haltaro/effective-python)．

# 1章．Pythonic thinking

## リスト内包表記には，3つ以上の式を避ける

<script src="https://gist.github.com/haltaro/64f7a37df260ad506cb9be4d7b0ad106.js"></script>

リスト内包表記に毒されすぎて，もとの表記の何がわかりづらいのか，また修正された表記でわかりやすくなったのかピンとこない．気をつけないと．

## 大きな内包表記にはジェネレータ式を考える

<script src="https://gist.github.com/haltaro/9284d0b7762c8d24b0cabf09af1723ef.js"></script>

イテレータとジェネレータについては，[Pythonのイテレータとジェネレータ - Qiita](https://qiita.com/tomotaka_ito/items/35f3eb108f587022fa09)がわかりやすい．

## `try`/`except`/`else`/`finally`の各ブロックを活用する

- `except`：エラーが補足された場合の処理．
- `else`：エラーが捕捉されなかった場合の処理．
- `finally`：エラーの捕捉にかかわらず，最後に実行される処理．

# 2章．関数

## `None`を返すよりは例外を選ぶ

<script src="https://gist.github.com/haltaro/7444e23cfc581fb1f2cb5dc8c8744503.js"></script>

`None`と，`0`や空白文字などの他の値がすべて条件式において`False`と評価されるため，エラーを引き起こしやすい．それはそうと，`raise from`構文がよくわからない．あとで確認しよう．

## クロージャが変数スコープとどう関わるか知っておく

クロージャとは，関数内の変数の名前解決が，その関数が宣言されたときのスコープで行われるもの．[Python Tips： Python でクロージャを使いたい - Life with python](https://www.lifewithpython.com/2014/09/python-use-closures.html)がとてもわかりやすい．

ちなみにここで登場した特殊メソッド`__call__(self)`は，クラスのインスタンスを関数っぽく呼び出したときに動作するもの．[Pythonのクラスにおける__call__メソッドの使い方 - Qiita](https://qiita.com/kyo-bad/items/439d8cc3a0424c45214a)がわかりやすい．

## リストを返さずにジェネレータを返すことを考える

これはやってしまいがち．例えば`text`中の単語のインデックスを返す関数は次のように定義できる．su

<script src="https://gist.github.com/haltaro/f029b65d87b604c8e3996ab9b5633eb6.js"></script>

ジェネレータを使うと，リストで返すよりもコードが明確になる．また，作業メモリに全ての入出力を保持する必要がないので，どのような長さの入力に対しても出力シーケンスを生成できる．

## 引数に対してイテレータを使うときには確実さを尊ぶ

`StopIteration`例外が起きたあとのジェネレータをもう一度反復した場合，難の例外も発生しない．つまり，出力のないイテレータと，出力があったが尽きてしまったイテレータを区別できない．

よって，関数にイテレータを渡した場合，奇妙な振る舞いや欠損値を生む可能性がある．コンテナとイテレータを区別する方法として，組み込み関数`iter()`に二度突っ込んで同じ結果が出るか確認する方法がある．

<script src="https://gist.github.com/haltaro/7a9ee7ed87ec7e13276083f814d91968.js"></script>

イテレータとジェネレータとコンテナの関係については，[Python: ジェネレータをイテレータから理解する - CUBE SUGAR CONTAINER](http://blog.amedama.jp/entry/2017/11/23/213233)がわかりやすい．

## 可変長引数を使って，見た目をすっきりさせる

`def function(*arg)`と定義すると，引数は可変長であり，内部でタプルとして処理される．また`def function(**arg)`と定義すると，やはり引数は可変長であり，内部で辞書型として処理される．[pythonの引数にある*hogeとか**mapとか - When it’s ready.](http://a2c.hatenablog.com/entry/20090301/1235909666)がわかりやすい．

<script src="https://gist.github.com/haltaro/f7f1838ef92bae1325b656cc753493b0.js"></script>

ちなみに，関数に引数を渡すとき，`*list`でリスト（タプル）を展開してくれるし，`**dict`で辞書を展開してくれる．

可変長引数は便利だが，展開時にメモリを大量に消費してしまう可能性がある．引数の入力個数が少ないことがわかっている場合に限って使った方が良い．
