---
layout: post
title: あまりに暑いのでProphetで140年分の気温を分析した
updated: 2018-07-22
cover:  "/assets/2018-07-22-summer.jpg"
categories:
 - statistics
---

2018年7月22日，東京の最高気温は36.5度となり，今年最高を更新した．あまりに暑くてムシャクシャしたので，[気象庁](http://www.data.jma.go.jp/gmd/risk/obsdl/index.php)から約140年分（1872年1月1日-2018年7月21日）の東京の気温データを入手し，[Prophet](https://facebook.github.io/prophet/)で分析した．平均・最高・最低気温の全てに関して，1920年付近から上昇し続けており，そのトレンドを考慮してもなお，ここ数日は特に暑いことを確認できた．

なお，分析に用いたNotebookは[こちら](https://github.com/haltaro/summer-prophet)．

# 環境

- macOS Sierra, 10.12.6
- Python, 3.6.6
- Prophet, 0.3

# Prophet

## 特徴

[Prophet](https://facebook.github.io/prophet/)とは，Facebookが開発したオープンソースの時系列解析ライブラリ．Prophetで想定するモデルを以下に示す：

$$
y(t) = g(t) + s(t) + h(t) + \epsilon(t)
$$

ここで，$$y(t)$$は時点$$t$$における予測値，$$g(t)$$は時点$$t$$におけるトレンド成分，$$s(t)$$は時点$$t$$における周期成分，$$h(t)$$は時点$$t$$における週末などのイレギュラーな成分，そして$$\epsilon(t)$$は時点$$t$$における誤差を表す．各成分のパラメータを[Stan](http://mc-stan.org/)で推定し，モデルを学習する．詳細なモデルは，原論文（[Sean J. Taylor and Benjamin Letham, Forecasting at Scale](https://peerj.com/preprints/3190.pdf)）を参照されたい．

Prophetに関する日本語の記事としては，以下のようなものがある．とても参考になる．

- [Prophet: forecasting at scale - Facebook](https://facebook.github.io/prophet/)
- [Prophet入門【Python編】Facebookの時系列予測ツール - SlideShare](https://www.slideshare.net/hoxo_m/prophet-facebook-76285278)
- [Facebookの予測ライブラリProphetを用いたトレンド抽出と変化点検知 - Gunosyデータ分析ブログ](https://data.gunosy.io/entry/change-point-detection-prophet)

Prophetの特徴は，時系列解析の前提知識がなくても，誰でも簡単に一定水準の分析をできること．

## インストール

今回はPythonからProphetを使う．[pip](https://pypi.org/project/pip/)でインストールする場合は，`pip install fbprophet`，[conda](https://conda.readthedocs.io/en/latest/)でインストールする場合は，`conda install -c conda-forge fbprophet`．

# 準備

## データの入手

[過去の気象データ・ダウンロード - 気象庁](https://www.data.jma.go.jp/gmd/risk/obsdl/index.php#)からcsvデータをダウンロードする．

- 地点：東京
- 項目：
  + 日別値
  + 気温（平均気温，最高気温，最低気温）
- 期間：1872年1月1日 - 2018年7月21日（53528日）

まず，以下の画面で都道府県および地区を選択する．

![area]({{site.baseurl}}/assets/2018-07-22-area.png)

次に，以下の画面で項目を選択する．降水量や湿度も興味深いが，一度にダウンロードできるデータ量に制限があるため，今回は気温（平均気温，最高気温，最低気温）のみを選択した．

![item]({{site.baseurl}}/assets/2018-07-22-item.png)

最後に，以下の画面で期間を選択する．1872年1月1日から指定可能だったので，選択する．一度にダウンロードできるデータ量に制限があるため，10年ごとに刻んでダウンロードする．

![period]({{site.baseurl}}/assets/2018-07-22-period.png)

Downloadフォルダの`data.csv`を年代ごとに改名し，`data/raw/`以下に次のように保存する．

- `data_1870.csv`
- `data_1880.csv`
- `data_1890.csv`
- `data_1900.csv`
- `data_1910.csv`
- `data_1920.csv`
- `data_1930.csv`
- `data_1940.csv`
- `data_1950.csv`
- `data_1960.csv`
- `data_1970.csv`
- `data_1980.csv`
- `data_1990.csv`
- `data_2000.csv`
- `data_2010.csv`

## モジュールのインポート

<script src="https://gist.github.com/haltaro/d5a8585a393c0c03a8958c5cb57e88e4.js"></script>

## データの前処理

<script src="https://gist.github.com/haltaro/914eb08e9cfaa0ec4efeb6761329f292.js"></script>

以下で，詳細を補足する．

### `codecs.open`

`Shift-JIS`で作成されているため，普通に`pandas.read_csv()`でファイルを読み込めない．[pandasでread_csv時にUnicodeDecodeErrorが起きた時の対処 (pd.read_table()) - Qiita](https://qiita.com/niwaringo/items/d2a30e04e08da8eaa643)を参考に，`codecs.open()`を利用する．

### 不要な行・列を除外

元データをそのまま読み込むと，以下のように不要な行・列が含まれてしまう．

![data]({{site.baseurl}}/assets/2018-07-22-data.png)

そこで，[`pandas.read_table()`](https://pandas.pydata.org/pandas-docs/version/0.23/generated/pandas.read_table.html)のパラメータ`skiprows`と`usecols`を用いて，分析に必要な部分のみ抽出する．

### すべて`np.nan`の行は削除

気象庁のサイト上では1872年1月1日から指定可能だったが，最初の数年分はデータが含まれていなかった．`pandas.DataFrame.dropna(how='all')`で，すべての値が`np.nan`の行を削除する．これにより全体の約2%にあたる1272日分のデータが除外された．

- 地点：東京
- 項目：
  + 日別値
  + 気温（平均気温，最高気温，最低気温）
- 期間：1875年6月10日 - 2018年7月21日（52266日）

# 分析

平均気温，最高気温，および最低気温の分析を行う．

## 平均気温

まず，すべての点を散布図でプロットしてみる．

<script src="https://gist.github.com/haltaro/cac1b29446a8160a6defcf3be10c5edf.js"></script>

![scatter_ave]({{site.baseurl}}/assets/2018-07-22-scatter_ave.png)

140年間で平均気温がじわじわ上がっていく様子がわかる．Prophetでより詳細に分析する．

<script src="https://gist.github.com/haltaro/8db481c9a3d67d30a03c4d5291f49848.js"></script>

Prophetで時系列解析を行うためには，以下のカラムを持つ`pandas.DataFrame`を生成する必要があるので注意．

- `ds`：日付カラム．
- `y`：予測対象カラム．

また，Prophetではデフォルトで`yearly_seasonality`と`weekly_seasonality`を考慮して学習する．気温が曜日に依存するとは考えづらいため，`weekly_seasonality`を除外する．

以上で学習したモデル`m`を使い，将来30日間の平均気温を予測する．以下のように，`m.make_future_dataframe`で`DataFrame`を生成すると楽．

<script src="https://gist.github.com/haltaro/efab9762d4911e1d6115e960cb1064f4.js"></script>

予測結果を`m.plot()`でプロットする．約140年分プロットするとわけがわからないので，直近1年分のみを表示するようにする．

<script src="https://gist.github.com/haltaro/f1f726cd4f0b2e0013e1cab948cd5029.js"></script>

![forecast_ave]({{site.baseurl}}/assets/2018-07-22-forecast_ave.png)

黒点が実測値，青線の実線が予測値，そして薄い青の塗りつぶしが80%信頼区間[^interval]を示す．ここ数日の平均気温は，信頼区間の上限ギリギリに張り付いていることが確認できる．例年から統計的に予測したとき，いかにここ数日の暑さが異常だったか，見て取れる[^outlier]．また，例年の傾向を考慮すると，気温のピークは8月初旬であるという絶望的な事実がわかる．

[^interval]: デフォルト設定．

[^outlier]: 信頼区間を外れた異常値は他にも結構存在するが，連日，しかも同じ方向に外れることは珍しいように見える．

次に，`m.plot_components(forecast)`で周期性とトレンドを確認する．

<script src="https://gist.github.com/haltaro/4a5a4cb1e3221fb83c658d78460eed42.js"></script>

![components_ave]({{site.baseurl}}/assets/2018-07-22-components_ave.png)

上の図がトレンド，下の図が年内の周期性を表す．東京の平均気温は1920年あたりから上がり続けていることがわかる．また，年内で見ると，気温のピークは7月下旬から8月上旬にあることがわかる．

## 最高気温

同様の分析を行う．詳細は割愛する．

![forecast_max]({{site.baseurl}}/assets/2018-07-22-forecast_max.png)

![components_min]({{site.baseurl}}/assets/2018-07-22-components_max.png)

平均気温と同様の性質が見て取れる．

## 最低気温

同様の分析を行う．詳細は割愛する．

![forecast_min]({{site.baseurl}}/assets/2018-07-22-forecast_min.png)

![components_min]({{site.baseurl}}/assets/2018-07-22-components_min.png)

平均気温と同様の性質が見て取れる．

# 感想

地学の知識が中学理科で止まっている私でも，比較的簡単に地球温暖化の様子を確認することができた[^donbiki]．Prophetすごい．

あと，この記事を書き終わるころ，東洋経済さんの素晴らしい記事を見つけた（[東京の夏が｢昔より断然暑い｣決定的な裏づけ: 過去140年の最高気温をビジュアル化 - 東洋経済オンライン](https://toyokeizai.net/articles/-/229965)）[^trend]．こんなにわかりやすいヒートマップを初めて見た．いつかこんなビジュアライゼーションをしてみたい．

[^donbiki]: あまりに明確にトレンドが出過ぎてちょっと引いた．

[^trend]: 一応，1920年ごろから気温が上がり始めるという分析結果は，本記事と整合している．良かった．
