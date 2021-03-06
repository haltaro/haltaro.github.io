---
layout: post
title: Light GBMを使うとOMPエラーでカーネルが死ぬ
updated: 2018-06-22
cover:  "/assets/2018-06-22-forest.jpg"
categories:
 - machine learning
---

業務でも趣味でもよく[Light GBM](https://github.com/Microsoft/LightGBM)にお世話になっているが，この前手元のMacで使おうとしたら`Dead kernel`エラーが発生した．`conda`で入れたLight GBMを一旦アンインストールして，[Installation Guide - LightGBM](https://lightgbm.readthedocs.io/en/latest/Installation-Guide.html)に従って再インストールしたら解決した．

# 環境

- macOS Sierra：10.12.6
- Python：3.6.5
- lightgbm：2.1.0

# 症状

<script src="https://gist.github.com/haltaro/9ac6d0e11a96deed56cb8b57a0543838.js"></script>

# 解決策

公式のインストールガイドに従わず，`$ conda install -c conda-forge lightgbm`で落としたのが原因っぽい．一旦`$ conda uninstall lightgbm`して，[Installation Guide - LightGBM](https://lightgbm.readthedocs.io/en/latest/Installation-Guide.html)に従ってインストールした．

<script src="https://gist.github.com/haltaro/f2d55efbd91a731c31cdf910b2a6b854.js"></script>

なお，[Installation Guide - LightGBM](https://lightgbm.readthedocs.io/en/latest/Installation-Guide.html)では`export CXX=g++-7 CC=gcc-7`だが，手元の環境に合わせてバージョンを変更する必要があることに注意．

# 参考

- [OMP: Error #15: Initializing libiomp5.dylib, but found libiomp5.dylib already initialized. #1715 - GitHub](https://github.com/dmlc/xgboost/issues/1715)
- [Installation Guide - LightGBM](https://lightgbm.readthedocs.io/en/latest/Installation-Guide.html)
