---
layout: post
title: アドテク入門
updated: 2017-08-07 18:00
cover:  "/assets/2017-11-18-marketing.jpg"
categories:
 - marketing
 - machine learning
---

アドテク（Advertising Technology）とは，広告配信の高度化に関する技術を指す．目的は，広告に関わる全プレーヤー（広告主，メディア，消費者）をwin-winの関係にすること．特にReal time bidding（RTB）市場は成長中であり，例えば機械学習で入札額を最適化する技術などが研究されている．

# 1. 目的

[CyberAgent，日本一やさしいアドテク教室](https://www.cyberagent.co.jp/ir/personal/adtech/)より抜粋．

> 1：広告主が求める高い広告効果を出すために，より適切な場所／人に広告を出すこと \\
> 2：メディアの広告枠販売や広告配信の効率化を実現し，収益最大化の支援をすること

# 2. 種類

対象や目的に応じて，三種類に分類できる．

## 2.a メディアの広告選択最適化

広告効果が大きい広告をいかに選択するか，という技術．

* [**Ad Network**](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%89%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF)：Webやアプリメディアなどの広告配信可能な媒体を多数束ねて広告を配信するネットワーク．
* [**Ad Exchange**](https://satori.marketing/marketing-blog/ad-technology/ad-exchange/)：広告枠を１インプレッション単位で売買するプラットフォーム．各媒体やAd Networkが持つ広告掲載枠を交換できる仕組み．**Ad Networkより大きな仕組み**．Ad Exchangeでは，広告出稿数と広告枠のバランスで，リアルタイムで広告枠の入札単価が変動する．Ad Exchangeには，様々なプラットフォームがある．
    * **Double Click AdExchange**：Googleが運営．世界最大のAd Exchange．2009年からサービス開始．
    * **Open X Market Japan**：Open X Japanとcciが提携して運営．2009年からサービス開始．
    * **Microsoft Advertixing Exchange**：Microsoftが運営．2013年からサービス開始．配信枠はMSNとSkype．
    * **Facebook AdExchange**：Facebookが運営．
    * **Yild One**：プラットフォーム・ワンが運営するSSPプラットフォーム．厳密にはAd Exchangeと異なるが，Ad Exchange的に利用することも可能．
* [**SSP**](https://smmlab.jp/?p=30268)：Supply Side Platform．オンライン広告において，広告枠を提供しているメディアの広告枠販売や広告収益最大化などを支援するツール．具体的な提供内容はサービスによって異なるが，主に，Ad NetworkやAd Exchangeの管理，リアルタイム入札（RTB）への対応などがある．

## 2.b 広告主の広告表現最適化

消費者一人ひとりにあった広告表現をいかに実現するか，という技術．

* [**DSP**](https://webbu.jp/dsp_mechanism-276)：Demand Side Platform．広告主はターゲットや予算を設定し，バナーを入稿するだけで，DSPが自動で最適な広告配信を行う．DSPを使うことで，複数のAd Network，Ad Exchange，SSPを管理可能になる．SSPのリクエストに応じて，どのような広告をいくらで入札するか決定する．つまり，広告枠のオークションが行われる．
* [**RTB**](https://satori.marketing/marketing-blog/ad-technology/rtb/)：１インプレッションに対してリアルタイムで入札を行う仕組み．広告主はDSPを，媒体はSSPを使って広告枠を取引する．RTBにおける広告掲載の流れは以下のようになる．
    1. ターゲットユーザが媒体ページを訪問．
    2. 媒体はインプレッション発生情報をSSPに発信．
    3. SSPは媒体情報やオーディエンス情報をデータ化．
    4. SSPは接続先DSPにビットリクエストを送信．
    5. DSPはビットリクエストを受信し，解析．
    6. DSPは，DSP内での入札勝者情報をSSPに返信．
    7. SSPは複数DSPからの返答を解析し，一番入札価格が高いDSPの広告タグを媒体に送信．
    8. SSPは，勝者DSPに広告リクエストを送信．
    9. 勝者DSPは，クリエイティブ情報を送信．
    10. 媒体は広告を表示．
* [**(Static) Retargeting**](https://webkikaku.co.jp/blog/ppc/retargeting/)：特定のWebサイトに訪問したユーザを追跡し，広告を表示する仕組み．DSPが提供することもある．
* [**Dynamic Retargeting**](https://blog.nex8.net/full-description-of-dynamic-retargeting/)：ユーザが見た商品に合わせて，動的に広告を表示するRetargeting手法．特に，アパレルEC，旅行，人材，不動産商材に強いと言われている．

## 2.c ターゲット分析

広告に対するユーザの行動等のデータを，いかにマーケティングに活かすか，という技術．

* [**広告効果計測ツール**](http://liskul.com/measure-advertising6-14994)：Web広告やSEO施策を総合的に測定，評価するツール．[Google Analytics](https://analytics.google.com/analytics/)等のアクセス解析ツールと異なり，広告効果の分析を補助する機能を備えている．
* [**Tracking**](http://www.okuramkt.com/dic/mkt/tracking.html)：特定のユーザのサイト内での行動を追跡・分析すること．
* [**DMP**](https://dmlab.jp/adtech/dmp.html)：Data Management Platform．インターネットに蓄積された情報を管理し，分析結果を広告配信に利用するためのプラットフォーム．現実的には，データの蓄積は進んでいるが，データの活用については敷居が高い模様．下記の二種類がある．
    * Open DMP：データ提供会社が保有している行動履歴や属性情報．
    * Private DMP：自社独自で保有している購買履歴，興味関心情報．
* [**SDK**](https://www.ever-rise.co.jp/adtech-blog/how-to-use-ad-sdk.html)：Software Development Toolkit．アドテクの文脈では，スマホアプリに組み込んで使う，広告配信に必要な機能をひとまとめにしたツールキットを指す．

# 3. 略語

[広告と機械学習](http://qiita.com/fukkyy/items/b2d37b4797516d72225a)を参考にさせて頂いた．

* **CPM**：Cost Per Mile．1000PVあたりの単価．
* **CPC**：Cost Per Click．1クリックあたりの単価．
* **CPI**：Cost Per Install．1インストールあたりの単価．
* **LTV**：Life Time Value．1ユーザがもたらす収益．
* **CTR**：Click Through Rate．クリック率．
* **CVR**：ConVersion Rate．コンバージョン率．ちなみにコンバージョンとは，Webサイトにおける目標の達成を指す．

# 4. 研究動向

最近はRTB関連がホットトピックらしい．[Paper Collection of Real-Time Bidding](https://github.com/wnzhang/rtb-papers)を参考に分類した．また，DSPについては[人工知能学会誌 Vol.32 No.4](https://www.ai-gakkai.or.jp/vol32_no4/)を参考にした．

## 4.a DSP Techniques

最も盛んに研究されている分野．

* **CTR/CVR Estimation**：CTRあるいはCVRを予測する．端的に言えば，広告をクリックするか否かを予測する二値識別問題．最も基本的な手法はロジスティック回帰．
* **Bid Landscape**：RTBに参加している広告主が，他の参加者の入札状況を予測する．既存研究は主にヒューリスティックな手法に集中している．
* **Bidding Strategies**：CTR/CVR Estimationから得られたインプレッション期待利得とBid Landscapeから得られた落札可能額をもとにオンラインナップサック問題を解く．インプレッションが到着する度に入札するか否かを決めなければならず，決定は覆せないという特徴から，オンラインと呼ばれる．オフラインナップサック問題ですらNP困難であり，近似解法が必要．オンラインナップサック問題に至っては入力（インプレッション）に仮定を行わなければ近似アルゴリズムすら設計できない．
* **Budget Pacing & Frequency/Recency Capping**：広告主が設定した任意の予算をもとに，任意の期間中まんべんなく広告を配信するための戦略．
* **Fraud Detection**：広告詐欺（Ad Fraud）検知．例えば，金銭的な報酬を受け取ったユーザによる意図的なクリック，マルウェア，ボットなどを検知する．
* **Market Segmentation**：顧客集団分類．

また，日本語の資料として以下のようなものを見つけた．二つとも，CTR/CVR Estimationに大別される．

<iframe src="//www.slideshare.net/slideshow/embed_code/key/K2EnIQpqVgHKCh" width="100%" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/ttpooh/tokyo-data-night-tokyodn" title="アドテクにおける機械学習技術 @Tokyo Data Night #tokyodn" target="_blank">アドテクにおける機械学習技術 @Tokyo Data Night #tokyodn</a> </strong> from <strong><a href="https://www.slideshare.net/ttpooh" target="_blank">Kei Tateno</a></strong> </div>

<script async class="speakerdeck-embed" data-id="188589d1de6e4650a857d4f3c02070eb" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>


## 4.b SSP Techniques

主に，Second-Price Auctionのパラメータ設定最適化．

## 4.c DMP Techniques

LinkedInにおけるAudience Expansionなど．

## 4.d Conversion Attribution

コンバージョンに対する要因分析を如何に行うか．

# 5. コンペティション

* [Kaggle, Display Advertising Challenge](https://www.kaggle.com/c/criteo-display-ad-challenge)でCTR予測コンペティションが開催された模様．


# 参考

* [CyberAgent，日本一やさしいアドテク教室](https://www.cyberagent.co.jp/ir/personal/adtech/)：アドテク入門にうってつけ．用語まとめもある．
* [SATORI, Ad Network（アドネットワーク）とは？を初心者にも分かりやすく解説します](https://satori.marketing/marketing-blog/ad-technology/ad-network/)：Ad Networkについて．
* [SATORI，Ad Exchange（アドエクスチェンジ）とは？を初心者にも分かりやすく解説します](https://satori.marketing/marketing-blog/ad-technology/ad-exchange/)：Ad Exchangeについて．
* [ウェブ部，【2017年6月更新】5分で完璧に理解できる！DSPの仕組みと新しい手法](https://webbu.jp/dsp_mechanism-276)：DSPについて．
* [SATORI，RTB（Real-Time Bidding）とは？を初心者にも分かりやすく解説します](https://satori.marketing/marketing-blog/ad-technology/rtb/)：RTBについて．
* [WEB企画LABO，初心者でもわかるリターゲティング広告の永久保存版！初期設定から活用まで全て紹介](https://webkikaku.co.jp/blog/ppc/retargeting/)：(Static) Retargetingについて．
* [nex8ブログ，「よくぞ出してくれた！」と思わず言ってしまう広告とは！？ダイナミックリターゲティング完全解説決定版！](https://blog.nex8.net/full-description-of-dynamic-retargeting/)：Dynamic Retargetingについて．
* [LISKUL，広告効果測定ツールの選び方とは？プロが選ぶおすすめツール8種比較](http://liskul.com/measure-advertising6-14994)：広告効果計測ツールについて．
* [OKURA，トラッキング](http://www.okuramkt.com/dic/mkt/tracking.html)：Trackingについて．
* [Digital Marketing Lab，DMP（データマネジメントプラットフォーム）の仕組みと特徴](https://dmlab.jp/adtech/dmp.html)：DMPについて．
* [EVERRISEアドテクブログ，アプリの挙動と連携が可能！広告配信SDKの使い方](https://www.ever-rise.co.jp/adtech-blog/how-to-use-ad-sdk.html)：広告配信SDKについて．
* [wnzhang, Paper Collection of Real-Time Bidding](https://github.com/wnzhang/rtb-papers)：RTB関連論文まとめ．
* [人工知能学会，人工知能学会誌 Vol.32 No.4](https://www.ai-gakkai.or.jp/vol32_no4/)：DSP関連の最新技術動向について．
* [GlobalAdtech，日本にも上陸間近？米国で白熱するAd Fraud（広告詐欺）対策状況を見てみよう](http://global-adtech.jp/blog/1066)：広告詐欺について．
* [Qiita，広告と機械学習](http://qiita.com/fukkyy/items/b2d37b4797516d72225a)：2013年の記事だが，わかりやすい．
* [舘野啓，アドテクにおける機械学習技術](https://www.slideshare.net/ttpooh/tokyo-data-night-tokyodn)：機械学習を用いたRTB入札最適化について．
* [Takayuki Sakai，アドテク企業の本番環境からTD使ってみた](https://speakerdeck.com/kaky0922/treasure-data-tech-talk-20160425)：機械学習を用いたCTR予測について．
* [Kaggle, Display Advertising Challenge](https://www.kaggle.com/c/criteo-display-ad-challenge)：三年前に開催された，CTR予測コンペティション．
* [TechCrunch，Advertising Tech](https://techcrunch.com/advertising-tech/)：アドテク関連の最新ニュース．
