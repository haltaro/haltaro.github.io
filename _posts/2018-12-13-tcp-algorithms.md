---
layout: post
title: ns-3.27で使えるTCP輻輳制御アルゴリズム
updated: 2018-12-15
cover:  "/assets/2018-12-14-leaves.jpg"
published: False
categories:
 - network
 - ns3
---

[Network engineering Advent Calendar 2018](https://qiita.com/advent-calendar/2018/network-engineering)の4日目の記事[^apology]．諸事情によりns-3.27でTCPの輻輳制御アルゴリズムを調査する必要があったので，調査結果をまとめておく．

[^apology]: 言い出しっぺの癖にめちゃくちゃ遅れてしまって申し訳ありません．

ご興味のある方は，以下の記事を参考に実験すると楽しいかもしれない．

- 環境構築：[VirtualBox+Vagrantでns-3.27環境を構築する - Memotaro](https://haltaro.github.io/2018/11/30/ns3-vagrant#undefined)
- 比較実験（ns-3.26）：[ns-3でTCPの輻輳制御を観察する - Memotaro](https://haltaro.github.io/2018/07/13/tcp-ns3#ns-3-network-simulator-3)

# 前提

## ns-3

[ns-3](https://www.nsnam.org/)は，オープンソースの離散事象ネットワークシミュレータ．前職ではこれを使って独自のプロトコルを実装し，実験結果を論文化する仕事をしていた．基本的にLinux上でしか動かず，また環境構築がやや煩雑なので，一般ユーザにとっては敷居が高い[^me]．環境構築については，[VirtualBox+Vagrantでns-3.27環境を構築する - Memotaro](https://haltaro.github.io/2018/11/30/ns3-vagrant#undefined)を，ns-3で何ができるかについては，[ns-3でTCPの輻輳制御を観察する - Memotaro](https://haltaro.github.io/2018/07/13/tcp-ns3)を参照されたい．

[^me]: 少なくとも私はそうだった．

## TCP

TCP（Transmission Control Protocol）は，OSI参照モデルのトランスポート層（つまり，IPの一つ上の層）に該当するプロトコル．同じくトランスポート層のプロトコルであるUDP（User Datagram Protocol）と比較されることが多い．ざっくり言うと，TCPは通信の信頼性を重視しているのに対し，UDPは高速性やリアルタイム性を重視している．例えば，動画のストリーミングではUDPを利用することが多いが，動画のダウンロードではTCPを利用することが多い．インターネット全体における割合で言うと，TCPを使った通信の方が圧倒的に多い．

TCPの特徴の一つは，輻輳制御である．ここで，輻輳とは，コンピュータネットワークにおける渋滞を表す．輻輳時は，ルータやハブでバッファ溢れが発生し，ネットワーク中のパケットが廃棄されてしまう．当該パケットの送受信ノードが大きな損失を被るのは言うまでもないが，他のノードも従来どおりネットワークを利用できなくなる場合があるため，輻輳が起きないよう制御する必要がある．TCPの輻輳制御では，下式で送信データ量を調整する．

$$swnd = \mathrm{min}(cwnd, rwnd) - acked$$

ここで，$$swnd$$は送信データ量，$$cwnd$$は送信ノードが内部で保持する変数である輻輳窓（Congestion window），$$rwnd$$は受信ノードから告知された受信窓（Receive window），$$acked$$は確認応答を受信したデータ量を表す．上式の単位はバイトである[^unit]．

受信ノードの最大受信量$$rwnd$$と，受信ノードに到着したデータ量を表す$$acked$$は，送信ノード側で制御できない所与の値である．つまり，TCPの送信ノードは，ネットワークの混み具合に応じて輻輳窓$$cwnd$$を調整することで，輻輳制御を行う．これまで，非常に多くの輻輳制御アルゴリズムが提案されてきた．その全てを網羅することはできないので，ns-3.27で実装されている主要なものにしぼり，その特徴をまとめる．

![model.png](https://qiita-image-store.s3.amazonaws.com/0/151195/ea523d49-c229-2d46-a3c5-7290b3f82dff.png)

[^unit]: TCPの輻輳制御アルゴリズムでは，単位としてセグメントを使うときとバイトを使うときがあり，混乱しないよう注意が必要．間違うのは私だけかもしれないが．

## 輻輳制御における状態遷移

ns-3やLinuxの実装（`include/net/tcp.h`）に則り，本記事では以下の状態遷移を想定する．

- `Open`：通常状態．
- `Disorder`：SACKや，二度同じACKを受信した状態．
- `Recovery`：三度同じACKを受信した状態．
- `Loss`：タイムアウトや，SACK renegingが発生した状態．
- `CWR`：ECNなど，他のノードから明示的に輻輳が通知された状態．

状態遷移図は，[Kurose, James; Ross, Keith (2008). Computer Networking – A Top-Down Approach (6th ed.). Addison Wesley](https://www.bau.edu.jo/UserPortal/UserProfile/PostsAttach/10617_1870_1.pdf)のp.275で掲載されていたFigure 3.52がわかりやすい．ただし，`Open`を`Slow start`と`Congestion avoidance`に分割しており，`Disorder`を状態ではなく`duplicate ACK`として遷移条件で表現しており，また`Loss`も状態ではなく`timeout`として遷移条件として表現しており，かつ`CWR`と`Loss`を無視していることに注意が必要である．

![tcp-fsm]({{site.baseurl}}/assets/2018-12-12-tcp-fsm.png)

詳細は以下を参照されたい．

- [Somaya Arianfar, TCP’s Congestion Control Implementation in Linux Kernel](https://wiki.aalto.fi/download/attachments/69901948/TCP-CongestionControlFinal.pdf)
- [Kurose, James; Ross, Keith (2008). Computer Networking – A Top-Down Approach (6th ed.). Addison Wesley](https://www.bau.edu.jo/UserPortal/UserProfile/PostsAttach/10617_1870_1.pdf)


## 輻輳制御アルゴリズム

輻輳制御アルゴリズムとは，TCPの$$cwnd$$を更新するアルゴリズムである．基本的なアイデアは，TCPの受信ノードから返ってくる確認応答（ACK：Acknowledgement）をもとに，往復時間（RTT：Round Trip Time）やパケットロスを計測し，これをもとに推定したネットワークの混み具合に応じて，$$cwnd$$を調整する，というものである．

# アルゴリズム一覧

[Congestion Control Algorithms - ns-3](https://www.nsnam.org/docs/models/html/tcp.html#congestion-control-algorithms)を参考に，ns-3.27で使用可能な輻輳制御アルゴリズムをまとめた．

[^future]: 時間ができたら，独自のTCPアルゴリズムを実装する方法もまとめておきたい．いつになるかわからないが．

- [NewReno](https://haltaro.github.io/2018/12/06/tcp-algorithms#newreno)
- [HighSpeed](https://haltaro.github.io/2018/12/06/tcp-algorithms#highspeed)
- [Westwood](https://haltaro.github.io/2018/12/06/tcp-algorithms#westwood)
- [Vegas](https://haltaro.github.io/2018/12/06/tcp-algorithms#vegas)
- [Scalable](https://haltaro.github.io/2018/12/06/tcp-algorithms#scalable)
- [Veno](https://haltaro.github.io/2018/12/06/tcp-algorithms#veno)
- [Bic](https://haltaro.github.io/2018/12/06/tcp-algorithms#bic)
- [YeAH](https://haltaro.github.io/2018/12/06/tcp-algorithms#yeah)
- [Illinois](https://haltaro.github.io/2018/12/06/tcp-algorithms#illinois)
- [H-TCP](https://haltaro.github.io/2018/12/06/tcp-algorithms#h-tcp)
- [LEDBAT](https://haltaro.github.io/2018/12/06/tcp-algorithms#ledbat)

ここでは，ns-3.27でデフォルト実装されているものに絞っているが，`ns-3.27/src/internet/model`にソースコードを格納すれば，自由にアルゴリズムを追加可能である[^future]．例えば，Linux2.6.19以降で標準搭載されている[CUBIC](http://www4.ncsu.edu/~rhee/export/bitcp/cubic-paper.pdf)は，[こちら](http://web.cs.wpi.edu/~claypool/papers/tcp-cubic/)からソースコードを入手できる．

## NewReno

最もメジャーなアルゴリズムの一つ．Loss-based．`Open`状態においては，$$cwnd$$が$$ssthresh$$より小さい場合はSlow startフェイズ，大きい場合はCongestion avoidanceフェイズに移り，それぞれ以下の更新式を用いる．

$$
\begin{align}
&\mathbf{If}~ cwnd \leq ssthresh\\
&~~~~\mathbf{then}~ cwnd \leftarrow cwnd + mss \\
&~~~~\mathbf{else}~ cwnd \leftarrow cwnd + \frac{mss}{cwnd}
\end{align}
$$

ここで，上式は**ACKを受信するたび**に更新されることに注意されたい．また，上式の単位はバイトである．Slow startフェイズ（二行目）においては，ACKを受信するたびに$$cwnd$$が$$mss$$ずつ増加し，その結果受信することになるACKも一つ増えるため，$$cwnd$$は指数的に増加する．一方でCongestion avoidanceフェイズ（三行目）においては，$$cwnd$$は線形に増加する．

`Recovery`状態に遷移したとき，すなわち三度同じACKを受信したとき，以下のように$$cwnd$$と$$ssthresh$$を更新する．

$$
\begin{align}
&ssthresh \leftarrow \frac{cwnd}{2} \\
&cwnd \leftarrow ssthresh + mss
\end{align}
$$

`Recovery`状態で新しいACKを受信すると`Open`状態（Congestion avoidance）に遷移し，$$ssthresh$$および$$cwnd$$を以下のように更新する．これをFast recoveryと呼ぶ．

$$
\begin{align}
&cwnd \leftarrow ssthresh
\end{align}
$$

また，`Recovery`状態で更に重複ACKを受信した場合，$$cwnd$$を以下のように更新する．

$$
cwnd \leftarrow cwnd + mss
$$

`Loss`状態や`CWR`状態に遷移したとき，すなわちECNを受信したりタイムアウトしたとき，以下のように$$cwnd$$と$$ssthresh$$を更新する．このとき，重複ACKのカウントはリセットする．

$$
\begin{align}
&ssthresh \leftarrow \frac{cwnd}{2} \\
&cwnd \leftarrow mss
\end{align}
$$

`Loss`状態や`CWR`状態でACKを受信したとき，`Open`状態（Slow startフェイズ）に遷移する．

多くの輻輳制御アルゴリズムは，NewRenoの`Open`状態の挙動を改良したものとなっている．そこで以降では，特に断らない限り，`CWR`，`Recovery`，`Loss`状態における更新式はNewRenoと同様とする．

詳細は以下を参照されたい．

- [Floyd, Sally, Tom Henderson, and Andrei Gurtov. The NewReno modification to TCP's fast recovery algorithm. No. RFC 3782. 2004.](https://tools.ietf.org/html/rfc6582)
- [Kurose, James; Ross, Keith (2008). Computer Networking – A Top-Down Approach (6th ed.). Addison Wesley](https://www.bau.edu.jo/UserPortal/UserProfile/PostsAttach/10617_1870_1.pdf)
- [K. Ramakrishnan, The Addition of Explicit Congestion Notification (ECN) to IP, RFC 3168, 2001](https://tools.ietf.org/pdf/rfc3168.pdf)

## HighSpeed

大容量のネットワーク向けに提案されたLoss-basedの輻輳制御アルゴリズム．このアルゴリズムは，Congestion avoidanceフェイズにおける$$cwnd$$の増加が大きく，また`Recovery`フェイズにおける$$cwnd$$の回復が早い．このような特殊な動作は，$$cwnd$$が一定値$$W$$より大きいか，パケットロス率$$p$$が一定値$$P$$より小さいときのみ実行されるため，HighSpeedとNewRenoが共存するネットワークで輻輳が発生したときに，HighSpeedが帯域を一方的に専有することはない（このような性質をTCP friendlyと呼ぶ）．

$$
\begin{align}
&\mathbf{If}~ cwnd \leq ssthresh\\
&~~~~\mathbf{then}~ cwnd \leftarrow cwnd + mss \\
&~~~~\mathbf{else}~ cwnd \leftarrow cwnd + \frac{\alpha(cwnd)}{cwnd}
\end{align}
$$

`Recovery`状態においては，以下のように$$cwnd$$を更新する．

$$
\begin{align}
cwnd \leftarrow cwnd - \beta(cwnd) \cdot cwnd
\end{align}
$$

ここで，$$\alpha(cwnd)$$および$$\beta(cwnd)$$は下式で計算する．

$$
\begin{align}
\beta(cwnd) &= (\beta(W_1)-0.5) \frac
  {\mathrm{log}(cwnd) - \mathrm{log}(W)}
  {\mathrm{log}(W_1) - \mathrm{log}(W)} + 0.5 \\
\alpha(cwnd) &= \frac{2 \cdot cwnd^2 \cdot \beta(cwnd) \cdot p(cwnd)}
  {2 - \beta(cwnd)}
\end{align}
$$

なお$$p(cwnd)$$は下式を満たす．

$$
\mathrm{log}(p(cwnd)) = \left(\mathrm{log}(P_1) - \mathrm{log}(P) \right)
  \frac{\mathrm{log}(cwnd) - \mathrm{log}(W)}
    {\mathrm(log(W_1) - \mathrm{log}(W)} + \mathrm{log}(P)
$$

各パラメータの定義は以下である．

- $$P$$：パケットロス率の閾値．
- $$W$$：$$cwnd$$の閾値．
- $$P_1$$：パケットロス率の目標値．通常，$$P_1 < P$$を満たす．
- $$W_1$$：$$cwnd$$の目標値．通常，$$W_1 > W$$を満たす．

詳細は以下を参照されたい．
- [Floyd, Sally. HighSpeed TCP for large congestion windows. No. RFC 3649. 2003.](https://tools.ietf.org/html/rfc3649)
- [Floyd, Sally. Modifying TCP's congestion control for high speeds, 2002.](https://www.icir.org/floyd/papers/hstcp.pdf)

## Westwood

Westwoodは，AIAD（Additive Increase/ Adaptive Decrease）方式を採用している．輻輳イベントが発生したとき，$$cwnd$$を半分にする代わりに，ネットワークの帯域を予測し，それをもとに$$cwnd$$を更新する．

詳細は以下を参照されたい．

- [Mascolo, Saverio, et al. "TCP westwood: Bandwidth estimation for enhanced transport over wireless links." Proceedings of the 7th annual international conference on Mobile computing and networking. ACM, 2001.](https://dl.acm.org/citation.cfm?id=381704)

## Vegas

VegasはDelay-basedの輻輳制御アルゴリズムである．Vegasは継続的に取得したRTTから計算したスループットと，理想状態のスループットの差から，ボトルネックにスタックされているパケット量を推測する．輻輳を避けるため，上記のパケット量が$$\alpha$$と$$\beta$$の間になるよう$$cwnd$$を調整する．Slow startフェイズから，上記の$$cwnd$$調整フェイズに変更する閾値$$\gamma$$も，別途設定する必要がある．なお，Linuxにおける実装では，$$\alpha=2$$，$$\beta=4$$，$$\gamma=1$$が採用されている．

**論文の3章を読めば良い**

詳細は以下を参照されたい．

- [Brakmo, Lawrence S., and Larry L. Peterson. "TCP Vegas: End to end congestion avoidance on a global Internet." IEEE Journal on selected Areas in communications 13.8 (1995): 1465-1480.](https://ieeexplore.ieee.org/abstract/document/464716)

## Scalable

Scalableは，大容量のネットワークにおいて，より多くのデータを送信できるようNewRenoを改良した輻輳制御アルゴリズムである．輻輳イベントが検知しないとき，ACKを受信するたびに下式で$$cwnd$$を更新する．

$$ cwnd \leftarrow cwnd + 0.01 $$

輻輳イベントを検知したとき，Vegasは下式で$$cwnd$$を更新する．

$$ cwnd \leftarrow cwnd - \mathrm{ceil}\left(0.125 \cdot cwnd \right) $$

詳細は以下を参照されたい．

- [Kelly, Tom. "Scalable TCP: Improving performance in highspeed wide area networks." ACM SIGCOMM computer communication Review 33.2 (2003): 83-91.](https://dl.acm.org/citation.cfm?id=956989)

## Veno

Venoは，無線通信におけるランダムなパケットロスに対応できるよう，NewRenoを改良した輻輳制御アルゴリズムである．ボトルネックにスタックされているパケット量（Backlogと呼ぶ）を推定し，輻輳しているか否かを判別する．

Backlog量$$N$$は下式で計算される．

$$ N = Actual \cdot (RTT - BaseRTT) $$

Venoは，$$N$$が閾値$$\beta$$より大きいか否かで，更新式を変更する．例えば，$$N$$が$$\beta$$より小さい時，

詳細は以下を参照されたい．

- [Fu, Cheng Peng, and Soung C. Liew. "TCP Veno: TCP enhancement for transmission over wireless access networks." IEEE Journal on selected areas in communications 21.2 (2003): 216-228.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.2.1469&rep=rep1&type=pdf)

## Bic

Bicは，輻輳制御を$$cwnd$$の探索問題（Search problem）として捉え直した．具体的には，現在の$$cwnd$$と$$cwnd_{max}$$を入力としたバイナリサーチにより，輻輳が発生しないギリギリの$$cwnd$$を探索する．パケットロスが発生しなければ，$$cwnd$$は対数的に目標値に近づく．$$cwnd$$が目標値に達したあとは，BicはSlow startフェイズに遷移し，新たな$$cwnd_{max}$$を探索する．パケットロスが発生した場合は，現在の$$cwnd$$を$$cwnd_{max}$$として採用する．

詳細は以下を参照されたい．

- [Xu, Lisong, Khaled Harfoush, and Injong Rhee. "Binary increase congestion control (BIC) for fast long-distance networks." INFOCOM 2004. Twenty-third AnnualJoint Conference of the IEEE Computer and Communications Societies. Vol. 4. IEEE, 2004.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.91.1019&rep=rep1&type=pdf)

## YeAH

YeAHは，モダンな輻輳制御アルゴリズムに要求される以下の条件を全て満足する，ヒューリスティックなアルゴリズムである．

- BDP（Bandwidth-Delay Product）が大きい，つまり大容量遠距離通信路において，少々の輻輳イベントが発生しても，帯域利用効率を落とさないこと．
- Renoと公平に帯域を分け合えること．
- RTTが大きく異なるフロー同士でも公平に帯域を分け合えること．
- ランダムなパケットロスに対してロバストであること．
- バッファサイズによらず，高い性能を誇ること．

YeAHは二つの動作モードを持つ．一つ目はFastモードで，ネットワークが混雑していないときに，アグレッシブに$$cwnd$$を増加させる．２つ目はSlowモードで，ネットワークが混雑しているときに，Renoのような動作する．YeAHは，Vegasで採用されているBacklogの計算式を用いて，ネットワークの混雑度を計算する．

Renoと公平に帯域を分け合うために，Renoフローが存在するかどうか検知するアルゴリズムを実装している．三重複ACKを受信したとき，Renoフローが存在しない場合は()式に基づいて$$ssthresh$$を更新するが，存在する場合は()式に基づいて更新する．

詳細は以下を参照されたい．

- [Baiocchi, Andrea, Angelo P. Castellani, and Francesco Vacirca. "YeAH-TCP: yet another highspeed TCP." Proc. PFLDnet. Vol. 7. 2007.](https://www.researchgate.net/profile/Andrea_Baiocchi/publication/228561173_YeAH-TCP_Yet_another_highspeed_TCP/links/00b7d51ac57e095e39000000/YeAH-TCP-Yet-another-highspeed-TCP.pdf)

## Illinois

Illinoisは，大容量のネットワーク向けに提案された，Loss-basedとDelay-basedのハイブリッドな輻輳制御アルゴリズム．AIMDのパラメータ$$\alpha$$および$$\beta$$を，LossではなくDelayの関数として計算することに特徴がある．

原論文では，従来のAIMDの課題は$$cwnd$$の推移が下に凸になることだと指摘し，上に凸なAIMD（Concave-AIMD）になるよう$$\alpha$$および$$\beta$$を選べば良いとしている．具体的には，平均待ち行列遅延$$d_a$$に対して$$\alpha(d_a)$$が減少関数であり，$$\beta(d_a)$$が増加関数であれば良い．その一例として，以下のような関数を提案している．

`Open`状態において，以下のように$$cwnd$$を更新する．

$$
\begin{align}
&\mathbf{If}~ cwnd \leq ssthresh\\
&~~~~\mathbf{then}~ cwnd \leftarrow cwnd + 1 \\
&~~~~\mathbf{else}~ cwnd \leftarrow cwnd + \frac{\alpha(d_a)}{cwnd}
\end{align}
$$

`Recovery`状態に遷移したとき，以下のように$$cwnd$$を更新する．

$$
\begin{align}
cwnd \leftarrow cwnd - \beta(d_a) \cdot cwnd
\end{align}
$$

ここで，$$\alpha(d_a)$$および$$\beta(d_a)$$は以下で計算される．

$$
\begin{align}
\alpha(d_a) &=
  \begin{cases}
    \alpha_{max},~~&\mathbf{if}~d_a \leq d_1\\
    \frac{\kappa_1}{\kappa_2 + d_a}, ~~&\mathbf{otherwise}
  \end{cases}\\
\beta(d_a) &=
  \begin{cases}
    \beta_{min}~~&\mathbf{if}~d_a \leq d_2 \\
    \kappa_3 + \kappa_4 d_a ~~&\mathbf{if}~d_2 \leq d_a \leq d_3 \\
    \beta_{max}~~&\mathbf{otherwise}
  \end{cases}
\end{align}
$$

パラメータ$$\kappa_1$$，$$\kappa_2$$，$$\kappa_3$$および$$\kappa_4$$は，下式で計算される．

$$
\begin{align}
\kappa_1 &=
  \frac{(d_m - d_1) \alpha_{min}\alpha_{max}}
       {\alpha_{max} - \alpha_{min}} \\
\kappa_2 &=
  \frac{(d_m - d_1) \alpha_{min}}
       {\alpha_{max} - \alpha_{min}} - d_1 \\
\kappa_3 &=
  \frac{\beta_{min}d_3 - \beta_{min}d_2}
       {d_3 - d_2} \\
\kappa_4 &=
  \frac{\beta_{max} - \beta_{min}}
       {d_3 - d_2}
\end{align}
$$

ここで，各パラメータの定義は以下である．

- $$d_1$$：関数$$\alpha(d_a)$$における閾値．
- $$d_2$$：関数$$\beta(d_a)$$における閾値．
- $$d_3$$：関数$$\beta(d_a)$$における閾値．
- $$d_a$$：平均待ち行列遅延．
- $$d_m$$：平均待ち行列遅延の最大値．
- $$\alpha_{min}$$：関数$$\alpha(d_a)$$の最大値．
- $$\alpha_{max}$$：関数$$\alpha(d_a)$$の最小値．
- $$\beta_{min}$$：関数$$\beta(d_a)$$の最大値．
- $$\beta_{max}$$：関数$$\beta(d_a)$$の最小値．．

詳細は以下を参照されたい．

- [Liu, Shao, Tamer Başar, and Ravi Srikant. "TCP-Illinois: A loss-and delay-based congestion control algorithm for high-speed networks." Performance Evaluation 65.6-7 (2008): 417-440.](http://tamerbasar.csl.illinois.edu/LiuBasarSrikantPerfEvalArtJun2008.pdf)

## H-TCP

H-TCPは，BDPの大きい，つまり大容量遠距離パス向けに提案された輻輳制御アルゴリズム．H-TCPは二つの動作モードを持ち，通常状態ではNewRenoのように振る舞うが，$$\delta_l$$秒間輻輳イベントが検知されなかったときは，下式の$$\alpha$$に基づいて$$cwnd$$を更新する．

ここで，$$\delta_l$$は動作モードの遷移を決定づける閾値であり，$$\delta$$は最後の輻輳イベントからの経過時間である．輻輳時は，H-TCPは$$cwnd$$を下式に基づいて減少させる．

なお，輻輳間のスループットの理論値は，$$\beta$$の関数になる．

詳細は以下を参照されたい．

- [Leith, Douglas, and Robert Shorten. "H-TCP: TCP for high-speed and long-distance networks." Proceedings of PFLDnet. Vol. 2004. 2004.](https://www.scss.tcd.ie/Doug.Leith/pubs/htcp3.pdf)

## LEDBAT

Low Extra Delay Background Transport（LEDBAT）は，End-to-endで，待ち行列遅延が大きくならないよう配慮しつつ，帯域利用効率を高めることを目的とした，実験的な輻輳制御アルゴリズム．LEDBATが特徴的なのは，RTTではなく，片道遅延をもとに$$cwnd$$を計算する点である．

RFC 6817によると，

- 送信ノードと受信ノード間の時刻同期を想定している．
- Linuxの実装に従って，送信ノードにおける片道遅延の計測にはTCPヘッダのTimestamps optionを用いる．
- ノイズ除去のために，``MIN``関数を用いる．

詳細は以下を参照されたい．

- [Shalunov, Sea, et al. Low extra delay background transport (LEDBAT). No. RFC 6817. 2012.](https://tools.ietf.org/html/rfc6817)

# 感想

思いの外大変だった．当初は[TCP models in ns-3 - ns3](https://www.nsnam.org/docs/models/html/tcp.html)を和訳すればいいやと甘く見ていたが，具体的な更新式が記載されていないことが多く，結局元論文を読むしかなかった．皆様の参考になれば幸い．誤りがあればどしどしご指摘いただきたい．
