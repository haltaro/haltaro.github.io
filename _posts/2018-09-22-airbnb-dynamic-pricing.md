---
layout: post
title: Customized Regression Model for Airbnb Dynamic Pricingを読んだ
updated: 2018-10-13
cover:  "/assets/2018-09-22-room.jpg"
categories:
 - machine learning
 - paper
published: false
---

[Peng Ye, et al., Customized Regression Model for Airbnb Dynamic Pricing, KDD2018](http://www.kdd.org/kdd2018/accepted-papers/view/customized-regression-model-for-airbnb-dynamic-pricing)を読んだ．

# Abstract

- Airbnbの製品は基本的に過去にない唯一のもの．よって，過去の実績をもとに需要曲線を予測するのが非常に難しい．
- Airbnbが提案するシステムは３つのモデルで構成される．
    + 特定の日にちの予約確率を予測するモデル．
    + 特定の日にちの最適な売値を予測するモデル．
    + 二番目の予測値を，さらにパーソナライズして売値をサジェストするモデル．
- 本論文では，二番目の売値予測モデルについて述べる．このモデルは，Price TipsとSmart Pricing toolとして実際にAirbnbのシステムに組み込まれている．A/Bテストでこのモデルの効果を確認した．

# Introduction

- プラットフォーマーとして，Airbnbは，ホストが設定する価格を直接的に制御していないが，ツールを使って適正値をアドバイスしている．
    - Price Tips：暦情報をもとに，適正価格をサジェストする機能．
    - Smart Pricing：ユーザが設定した希望価格の下限と上限をもとに，自動的に適正価格を計算する機能．
- 適正価格は機械学習で算出されており，モデルは日々更新されている．

## Related works

- Airbnbの値付けに関して，いくつかの論文が公開されている[8, 9, 11, 16]．

## Dynamic pricing at airbnb

- AirbnbでDynamic Pricingするにあたり，大きく２つの課題がある．
- Demand Estimation
    - 従来は，大量生産品に対するDemand estimationが研究されてきた．この領域では，需要曲線$$F(P)$$を予測することが最大の目的である．ここで，$$P$$は価格．近年では，機械学習を用いて$$F(P)$$を予測するモデルも提案されている[2, 15]．一方で，Airbnbにおける需要曲線は価格$$P$$だけでなく，時間$$t$$や個別の物件$$id$$に依存すると考えられる．
    - 需要曲線が時間に依存する原因として，季節性とリードタイムがある．
    - 需要曲線が物件に依存する原因として，Airbnbが扱う物件の特殊性と，人気の格差がある．
- 以上から，需要曲線$$F(P, t, id)$$を予測するのは非常に難しい．
- また，我々が提示した価格を，ホストが必ずしも採用しないことも，問題の複雑さを一層増す原因となっている．

## Our approach

- $$F(P, t, id)$$を適正価格にマッピングするPricing strategy modelを提案する．このモデルは，独自に設定した損失関数を最小化するよう学習したモデルである．
- 従来手法では，製品の特徴に対して線形な価値関数を想定していた[1, 4, 5]が，我々のモデルは非線形である．
    - 需要関数をGradient boosting machine (GBM)で予測する．
    - 損失関数はSupport vector regression (SVR)で利用されている$$\epsilon$$-incentive loss functionをもとにしているが，正確な目的変数を持たず，$$\epsilon$$の値をtraining sampleごとに変えている．
- 本論文の貢献は以下の二点：
    - 適正価格の効率を放火する指標を提案する．
    - 上記の指標をもとに，適正な価格戦略を学習する回帰モデルを提案する．

# Pricing system overview

- Airbnbの価格推奨モデルは，以下の３つから成る．
  + Booking probability model
  + Strategy model
  + Personalization
- 以下では，それぞれの特徴について述べる[^configuration]．

[^configuration]: 論文の章構成を一部変更している．

## Booking probability model

- 特定日に予約されるかどうかを，二値の識別問題として解く．
- 特徴量として，部屋の特徴，季節性，周辺地域の繁忙度などを用いる．
- Grandient boosting machine（GBM）で学習する．地理情報を考慮してサンプリングレートを調整したら，精度があがった．

## Strategy model

- 特定日の適正価格を推薦するために，回帰問題を解く．
- 通常の回帰問題と異なり，適正価格が教師データとして与えられないところに難しさがある．加えて，ホストはAirbnbが推奨する価格をそのまま採用するわけではない．
- 教師データは，以下の4パターンに分類できる．
  + ホストが推奨価格より小さい価格を設定し，予約された（a）
  + ホストが推奨価格より小さい価格を設定し，予約されなかった（b）
  + ホストが推奨価格以上の価格を設定し，予約された（c）
  + ホストが推奨価格以上の価格を設定し，予約されなかった（d）
- 以下のような評価指標を導入した[^precision-recall][^complicated]．
  + **Price Decrease Recall (PDR)** ：実際に予約されなかったデータのうち，予約されないと予測された（設定価格が推奨価格より大きい）データの割合．
  $$PDR = \frac{d}{b+d}$$
  + **Price Decrease Precision (PDP)** ：予約されないと予測された（設定価格が推奨価格より大きい）データのうち，実際に予約されなかったデータの割合．$$PDR = \frac{d}{c+d}$$
  + **Price Increase Recall (PIR)** ：実際に予約されたデータのうち，予約されると予測された（設定価格が推奨価格より小さい）データの割合．
  $$PDR = \frac{a}{a+c}$$
  + **Price Increase Precision (PIP)** ：予約されると予測された（設定価格が推奨価格より小さい）データのうち，実際に予約されたデータの割合．$$PDR = \frac{a}{a+b}$$
  + **Booking Regret (BR)**：$$BR = median_{bookings}(max(0, \frac{P-P_{sug}}{P}))$$[^br]
- ビジネス的な指標と相関が高かったのは，PDRとBRだった．
  + PDRが高いほど，ホストはより市場競争力の高い値付けをしていることになるため，成約率が高まると考えられる．
  + BRが小さいほど，成約価格と推奨価格が近いことになるため，ホストからより大きな信頼を勝ち取るれると考えられる．
  + 両者はトレードオフの関係にあるため，同時に最適化する必要がある．一般に推奨価格を下げれば下げるほど，PDRが改善するが，BRが悪化する．

# Strategy model

続きはここから．

[^precision-recall]: いつもPrecision（精度）とRecall（再現率）を忘れてしまう．Precisionは，正と予測したデータのうち，実際に正であるデータの割合．一方Recallは，実際に正であるデータのうち，正と予測したデータの割合．[F値 (F-measure) - 朱鷺の杜Wiki](http://ibisforest.org/index.php?F%E5%80%A4)を参考にさせて頂いた．
[^complicated]: ややこしい．推奨価格は，予約されうる最大の価格と考えると理解できる．設定価格が推奨価格より大きい場合，Airbnbの予測としては「予約されない」となる．逆に，設定価格が推奨価格より小さい場合，Airbnbの予測としては「予約される」となる．
[^br]: BRについては，何を表しているかよくわからなかった．

# References

業務上，チェックしたいと思ったもののみ抜粋．

- [1]
- [2]
- [4]
- [5]
- [8]
- [9]
- [11]
- [15]
- [16]
