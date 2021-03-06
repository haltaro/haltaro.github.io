---
layout: post
title: Kaggle，Zillow Prize概要
updated: 2017-08-07 18:00
cover: "/assets/2017-08-07-retech.jpg"
categories:
 - kaggle
 - machine learning
---

[KaggleのZillow Prize](https://www.kaggle.com/c/zillow-prize-1)は，[Zillow](https://www.zillow.com/)が2017年5月に開始したコンペティション．課題は不動産価格の予測であり，賞金は総額1億円以上（$1,200,000）．

誤訳があるかもしれないのでご注意．

# 1. 背景

## 1.a Kaggle

[Kaggle](https://www.kaggle.com/)は，データサイエンティストのプラットフォームである．様々なコンペティションを開催しており，データサイエンティストの腕試しの場として広く認知されている．Kaggleへの参加方法については，[Kaggle事始め](http://qiita.com/taka4sato/items/802c494fdebeaa7f43b7)が詳しい．

## 1.b Zillow

[Zillow](https://www.zillow.com/)は，オンライン不動産データベースを運営するアメリカの企業である．アメリカ全土の1億件以上の物件情報を有し，Zestimateと呼ばれる価格見積もりサービスを持つ．

# 2. Zillow Prize

## 2.a 概要

[Zillow Prize](https://www.kaggle.com/c/zillow-prize-1)は，Zillowが2017年5月に開始したコンペティションである．課題は不動産価格の予測で，賞金は総額1億円以上（$1,200,000）．本コンペティションは，Qualifying round（第1ラウンド）とPrivate round（第2ラウンド）からなる．Private roundは，Qualifying roundの上位100チームのみに対し2018年1月1日から実施される．

[Data](https://www.kaggle.com/c/zillow-prize-1/data)や[Rules](https://www.kaggle.com/c/zillow-prize-1/rules)等の詳細は以下．


## 2.b Data

本コンペティションの目的は，Zestimate（$$z$$）と実際の売値（$$s$$）の対数誤差を予測すること．対数誤差は以下で定義される．


$$
\begin{align*}
logerror = log(z) - log(s) \tag{1}
\end{align*}
$$

具体的には，2017年秋における$$logerror$$を予測する．不動産価格は公開情報なので，取引が始まる前に，モデルの提出を打ち切る．

訓練データとして，2016年の三箇所（Los Angeles，Orange and Ventura，California）の全ての不動産データが提供される．訓練データは2016年10月15日以前の全ての取引と，それ以降のいくつかの取引を含む．public leaderboardのテストデータは，2016年10月15日から同年12月31日までのものである．private leader boardのテストデータは，2017年10月15日から同年12月15日まで（この期間をsales tracking periodと呼ぶ）のものである．つまり，参加者は次の６時点における全ての不動産に対して予測を行う必要がある．

* October 2016 (201610)
* November 2016 (201611)
* December 2016 (201612)
* October 2017 (201710)
* November 2017 (201711)
* December 2017 (201712)

当該期間において取引が行われなかった不動産は，scoreの計算に利用されない．31日間のうち，複数回の取引があった場合は，最初の適切な取引をscoreの計算に用いる．

以下は各ファイルの概要．

* `properties_2016.csv`：2016年の全ての不動産情報．
* `properties_2017.csv`：2017年の全ての不動産情報．2017年10月2日に公開予定．
* `train_2016.csv`：2016年1月1日から2016年12月31日までの取引情報．
* `train_2017.csv`：2017年1月1日から2017年9月15日までの取引情報．2017年10月2日に公開予定．
* `sample_submission.csv`：提出用のサンプルファイル．

## 2.c Rules
重要そうなものだけ抜粋．

* チーム外に，コードを共有してはならない．ただし，全参加者に共有するのはOK．
* 1チーム最大3人まで．
* 1日5回まで提出可能．最終的に，最大2つの予測結果を投稿可能．
* 賞金総額：$1,200,000
  * 第1ラウンド総額：$50,000
    * 1位：$25,000
    * 2位：$15,000
    * 3位：$10,000
  * 第2ラウンド総額：$1,150,000
    * 1位：$1,000,000
    * 2位：$100,000
    * 3位：$50,000
* 第1ラウンドでは，Kernel上でのみ，ソースコードを公開できる[^1]．これは，MITライセンスのもとでの譲渡とみなされる．
* 第2ラウンドでは，いかなる形でもソースコードを公開できない

# 参考

* [Kaggle，Zillow Prize](https://www.kaggle.com/c/zillow-prize-1)
* [Qiita，Kaggle事始め](http://qiita.com/taka4sato/items/802c494fdebeaa7f43b7)：丁寧なKaggle入門記事．
* [Qiita，Kaggleのコンペティションリスト](http://qiita.com/TomHortons/items/54b2121a4c5eb0908920)：Kaggleのコンペティションを，データのタイプで分類．
* [Real estate tech news](http://realestatetechnews.com/)：不動産関連xテクノロジーに関するニュースサイト．
* [No Free Hunch](http://blog.kaggle.com/)：Kaggle公式ブログ．コンテスト優勝者のモデルが公開されている．

[^1]: ここで検討過程を公開しようと思っていたが，どうやらルール違反っぽい．一旦Kernelで公開したものを，日本語訳して自分のサイトで公開するのはOKか？
