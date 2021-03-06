---
layout: post
title: UCOMにAirMacを接続してWifi環境を構築する
updated: 2018-06-10
cover:  "/assets/2018-06-02-web.jpg"
categories:
 - network
---

引越し先のマンションがUcomに契約していたので，壁付けのコンセントにLANケーブルを繋げばインターネットに接続できる．手持ちのAirMac Time Capsuleで無線LAN環境を構築したかったが，ネット上に情報が少なく，めちゃくちゃ苦戦した．試行錯誤の記録を残しておく．

> **2018年6月19日追記**：接続がめちゃくちゃ不安定で，Skype英会話がまともにできない．おそらくNAT設定が原因だと思う．

> **2018年7月7日追記**：`AirMacユーティリティ`>`ネットワーク`>`ルーターモード`で`切（ブリッジモード`に変更したら，すべての問題が解決した．ややこしいのは，最初にブリッジモードにしたときは複数台のデバイスを接続できなかったこと．

# 環境

- UCOM光レジデンス LAN配線方式
- AirMac Time Capsule 7.6.9
- MacBook Pro，macOS Sierra（10.12.6）

![lan]({{site.baseurl}}/assets/2018-06-10-lan.png)

# 設定

`AirMacユーティリティ > AirMac Time Capsule > 編集`を押す．

![utility]({{site.baseurl}}/assets/2018-06-10-utility.png)


`インターネット`タブを選択して，[インターネット接続の設定 - UCOM](https://help.ucom.ne.jp/type002/internet/dnsip/index.html)をもとに最寄りのDNSサーバアドレスを設定する．

![internet]({{site.baseurl}}/assets/2018-06-10-internet.png)


`ワイヤレス`タブを選択して，設定を確認する．私の場合は，特に設定を変更する必要は無かった．

![wireless]({{site.baseurl}}/assets/2018-06-10-wireless.png)


`ネットワーク`タブを選択して，`ルーターモード`として`DHCPとNAT`を選択する．

- [UCOM 光 レジデンス ご利用の手引き- UCOM](https://support.ucom.ne.jp/downloads/manual/100tebiki.pdf)等によると，ブリッジモードでないとうまく接続できないとのことだったが，これだと設定用のMacBookと他の端末（iPhone）を同時に接続できなかった．
- [一台しか接続できない - Apple コミュニティ](https://discussionsjapan.apple.com/thread/10170959)によると，MacBookがグローバルIPアドレスを専有してるのが原因っぽい．ネットワークが不安定なるリスクがあった[^stable]が，今回は`DHCPとNAT`を選択した．

[^stable]: 実際昼間は何回か途切れているみたい

![network]({{site.baseurl}}/assets/2018-06-10-network.png)

これで`アップデート`を押す．`システム環境設定 > ネットワーク`では，「Wi-Fiに自己割り当てIPアドレス$$\blacksquare$$.$$\blacksquare$$.$$\blacksquare$$.$$\blacksquare$$が設定されているためインターネットに接続できません。」と叱られるが，MacBookもiPhoneも同時に接続できている．もう疲れたので無視することにした．

![warning]({{site.baseurl}}/assets/2018-06-10-warning.png)


# それでも繋がらないときは

実際，以上の設定を行っても一発では繋がらなかった．以下をいろいろ試すうちにいつの間にか繋がったので，ご参考までに．

- AirMacを再起動する．
- LANの接続口を変更する．どうやら，口ごとにIPアドレスが割り振られているっぽい．上位NW装置でどのような制御が行われているか不明だが，口を変えると一発で認証が通ることがあった．

# 参考

- [一台しか接続できない - Apple コミュニティ](https://discussionsjapan.apple.com/thread/10170959)
- [“Wi-Fi”に自己割り当てのIP アドレスが設定されており、インターネットに接続できない可能性がありましたら - Jaì³üÉ>L(î)](http://fmmzk.hateblo.jp/entry/2014/07/10/120654)
- [UCOM光 レジデンス【シンプルタイプ】ご利用の手引き -UCOM ](https://support.ucom.ne.jp/downloads/manual/simple_tebiki.pdf)
- [UCOM 光 レジデンス ご利用の手引き- UCOM](https://support.ucom.ne.jp/downloads/manual/100tebiki.pdf)
- [インターネット接続の設定 - UCOM](https://help.ucom.ne.jp/type002/internet/dnsip/index.html)
