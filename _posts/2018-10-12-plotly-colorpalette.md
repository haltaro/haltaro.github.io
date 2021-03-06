---
layout: post
title: PlotlyでSeabornライクに色指定する
updated: 2018-10-12
cover:  "/assets/2018-10-12-color.jpg"
categories:
 - python
 - visualization
---

[Plotly](https://plot.ly/feed/#/)はとても便利だが，[Seaborn](https://seaborn.pydata.org/)の[color_palette](https://seaborn.pydata.org/generated/seaborn.color_palette.html)のように柔軟に色指定ができない．そこで，Plotlyの`color`引数として使用可能なRGB値を，Seabornの`color_palette`から取得するラッパー関数を作成した．


# Plotly

[Plotly](https://plot.ly/feed/#/)はインタラクティブで美麗なグラフ描画に強みを持つライブラリ．[Python](https://www.python.org/)，[R](https://www.r-project.org/)，あるいは[JavaScript](https://developer.mozilla.org/ja/docs/Web/JavaScript)から呼び出して使える．私は[Jupyter Notebook](http://jupyter.org/)上で作図したグラフをグリグリ動かしてドヤることが多いので，この記事ではPythonからの利用を前提とする[^python]．

[^python]: RやJavaScriptから使ったことがない．

[pip](https://pypi.org/project/pip/)でインストールする場合は`pip install plotly`．[Conda](https://conda.io/docs/)でインストールする場合は`conda install -c plotly plotly`．

# Seaborn

[Seaborn](https://seaborn.pydata.org/)は，[matplotlib](https://matplotlib.org/)をベースとしたグラフ描画ライブラリ．`color_palette(palette, n_colors)`で，特定の`palette`の`n_colors`個の色リストを直感的に取得できる．Plotlyでこれを使いたい．

![seaborn]({{site.baseurl}}/assets/2018-10-14-seaborn.png)

[pip](https://pypi.org/project/pip/)でインストールする場合は`pip install seaborn`．[Conda](https://conda.io/docs/)でインストールする場合は`conda install -c anaconda seaborn`．


# Plotlyにおける色指定

Plotlyでは，非常に色指定をし辛い[^plotly][^tutorial]．[colorlover - GitHub](https://github.com/jackparmer/colorlover)を使ってカラーパレット的なものを使う[チュートリアル](https://plot.ly/ipython-notebooks/color-scales/)が公開されているが，パレットの種類が少ないし，`interp`で任意のスケールに拡張したときにムラが出たり，エラーがでたりする場合がある．あるいは，`marker`の`colorscale`でパレットを指定する[チュートリアル](https://plot.ly/python/line-and-scatter/)も公開されているが，`color`でサンプルごとにスケール値を指定する必要があり，凡例ごとに色を塗り分けるときなど，直感的なコーディングがしづらそう．

[^plotly]: 単純に私のPlotly力が足りないという説もある．「こうすればできるよ」的なTipsがあれば是非ご教授ください．
[^tutorial]: [公式チュートリアル](https://plot.ly/python/ipython-notebook-tutorial/)で，カラーコードを直接指定しているのを見てドン引きした人も多いはず．

![input]({{site.baseurl}}/assets/2018-10-14-input.png)
![output]({{site.baseurl}}/assets/2018-10-14-output.png)

そこで，[Seaborn](https://seaborn.pydata.org/)ライクに色を指定するための関数を作成した．

# 作成した関数

<script src="https://gist.github.com/haltaro/46ae7cf74affbf6fc8dc1b735131e824.js"></script>

関数の内部で`sns.color_palette`を呼び出し，RGB値を取得している．ただし，Plotly用のフォーマット`rgb({}, {}, {})`に変換している．

# 実験

[こちら](https://github.com/haltaro/plotly-with-seaborn-color_palette/blob/master/plotly_colorpalette.ipynb)のJupyter notebookで実験してみた．15パターンの凡例を折れ線グラフで表示する．

## ライブラリのインポート

<script src="https://gist.github.com/haltaro/2d6873cb97e56e6d7766b96355b69db3.js"></script>

## データセット生成

15種類のランダムな100点からなるサンプルを作成する．

<script src="https://gist.github.com/haltaro/a81373e40b135577fb733da9931049e8.js"></script>

## Plotlyで素直にプロット

<script src="https://gist.github.com/haltaro/6ffb22849b80846411c43309dc678dab.js"></script>

{% include /plotly/2018-10-14-default.html %}

11種類以上の判例になると，色が衝突しているのがわかる．

## PlotlyでSeabornライクにプロット

まずは`hls`でプロットしてみる．

<script src="https://gist.github.com/haltaro/a575ab32ad879afc6153b3770e8e997f.js"></script>

{% include /plotly/2018-10-14-hls.html %}

次は`viridis`でプロットしてみる．

<script src="https://gist.github.com/haltaro/df9262d935c5637d7e83c098dde746d8.js"></script>

{% include /plotly/2018-10-14-viridis.html %}

最後に`inferno`でプロットしてみる．

<script src="https://gist.github.com/haltaro/b1419b51006aec59f2746223ac5ae809.js"></script>

{% include /plotly/2018-10-14-inferno.html %}

`jet`以外の[MatplotlibのColormap](https://matplotlib.org/tutorials/colors/colormaps.html)を利用できる．

# 感想

これで，単なる折れ線グラフでもドヤれる．
