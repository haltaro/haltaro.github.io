---
layout: post
title: PythonとLight GBMで遊ぶNotebookを作った
updated: 2018-06-17
cover:  "/assets/2017-10-22-python.jpg"
categories:
 - machine learning
 - python
---

知り合いから「プログラミングしたことないけどLight GBMを使ってみたい．2時間くらいで教えてくれ」と言われた．2時間だと理論面をカバーするのは難しいので，とりあえず触ってみることを目標に，Pythonおよび関連ライブラリの基礎（のさらにごく一部）でさくっと遊ぶ[Notebook](https://github.com/haltaro/intro-to-lightgbm)を作った．勉強会当日は一緒に動かしながらレクチャーする予定．

# 対象者

- 統計的な専門用語（平均，分散，相関係数，平均二乗誤差，等々）に馴染みがある．
- Excelでデータ分析をしたことがある．
- Pythonどころか，プログラミング自体の経験がない．

初学者を対象とするため，用語の厳密さよりもわかりやすさを重視した．

# レポジトリ

[haltaro/intro-to-lightgbm - GitHub](https://github.com/haltaro/intro-to-lightgbm)

# [make_data.ipynb](https://github.com/haltaro/intro-to-lightgbm/blob/master/20180616.make_data.ipynb)

データ加工を行う自分用のNotebook．Bostonデータは，`sklearn`から直接ダウンロードできるが，より実務に近い使い方をしてもらうため，一旦csvファイルに加工した．また，回帰問題だけでなく識別問題にも触れてもらいたいということで`seaborn`から`titanic`をcsvファイルとして保存した．カテゴリカル変数は，その対応方法も体験して欲しかったので敢えてそのまま残している[^1]．

[^1]: 結局，時間切れで`titanic`データで遊ぶ部分は作れなかった．

# [intro_to_python.ipynb](https://github.com/haltaro/intro-to-lightgbm/blob/master/20180617.intro_to_python.ipynb)

Pythonの基本の基本から，`numpy`，`matplotlib`，`pandas`，`sklearn`，そして`lightgbm`で遊べる構成にした．以下はその詳細である．

## Jupyter notebook

そもそもJupyter notebookに馴染みがないと思うので，簡単に操作方法を記載した．

## Python：基本の基本

時間に限りがあるので，データ分析に特化して，四則演算，変数への代入，リスト操作，ループ，条件分岐について記載した．これでなんとなくわかった気になってほしい．

## `numpy`

ベクトル，行列，および統計量の計算方法を記載した．

## `matplotlib`

折れ線グラフ，散布図，棒グラフ，ヒストグラムの表示方法を記載した．

## `pandas`

データの読み込み，統計量の計算，ソート，フィルタリング，`numpy.array`への変換方法等を記載した．

## `sklearn`

線形回帰モデル`LinearRegressor`や平均絶対誤差の計算方法を記載した．

## `lightgbm`

学習方法，ハイパーパラメータのチューニング方法などを記載した．

# 感想

これで十分だとは全く思っていないが，なんとなく雰囲気を掴む程度のものはできたと思う．これをきっかけに興味を持ってくれたら嬉しい．勉強会でフィードバックがあったらNotebookを修正したい．
