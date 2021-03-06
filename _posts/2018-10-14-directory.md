---
layout: post
title: Pythonでディレクトリの有無を確認して自動作成する
updated: 2018-10-14
cover:  "/assets/2018-10-03-blocks.jpg"
categories:
 - python
---

Pythonでディレクトリの有無を確認して，自動生成するスクリプトをメモしておく．例えばCross validationでフォールドごとにデータを分けるときなどに使う．

<script src="https://gist.github.com/haltaro/0af917fa66c2f07a7375829b43e66bee.js"></script>

`os.path.exists(path)`で`path`の有無を確認し，無い場合は`os.mkdir(path)`で作成する．
