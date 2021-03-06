---
layout: post
title: Deepfakes/FaceSwapで自分だけのVtuberを作る
updated: 2018-04-14
cover: "/assets/2018-04-14-deepfake.jpg"
published: false
categories:
 - deep learning
---

今Virtual YouTuber（Vtuber）が熱い．かと言って3Dモデルを使うのはハードルが高いので，昨年話題になったDeepfakes/FaceSwapを使って顔を挿げ替え，自分だけのVtuberを作る．

# 注意

本記事は，Vtuberを作ることを目的にした記事です．本記事で紹介した技術を利用して著作権，特許権等の知的財産権を侵害する行為や，名誉毀損等，侮辱行為や他者の業務妨害となる行為には絶対に使わないでください．

# Deepfakes/FaceSwap

# 素材

動画素材は，人気YouTuber[ぷらんくとん深琴さん](https://www.youtube.com/channel/UCyJ7mecsfDK2dV1xs4NYwHw)のCC BYライセンス動画[【主に学生の】腐女子あるある](https://www.youtube.com/watch?v=Ly8jXumx1D0&t=13s)を使う．表情豊かな方なので，学習しやすそうというのも選定理由の一つ．

<iframe width="100%" height="480" src="https://www.youtube.com/embed/Ly8jXumx1D0?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


画像素材は，商用フリー素材サイト[ぱくたそ](https://www.pakutaso.com/)の人気モデル[河村友歌さん](https://www.pakutaso.com/kawamurayuka.html)の画像を使う．

![kawamura-san]({{site.baseurl}}/assets/2018-04-14-kawamura-san.jpg)

# 環境

# 参考

- [Deepfakes/FaceSwapの作り方 実施編 （Mac OSX） - KEINOSの日記](https://blog.keinos.com/20180207_3332)
