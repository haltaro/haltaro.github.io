---
layout: post
title: Udacity, Intro to Relational Databases
updated: 2017-08-10 18:00
cover: "/assets/2017-08-13-data.jpg"
categories:
 - data science
 - moocs
---

<i class="fa fa-spinner"></i> **更新中**：[Udacity, Intro to Relational Databases](https://www.udacity.com/course/intro-to-relational-databases--ud197)の受講メモ．5部構成の無料講座．

<iframe width="100%" height="460" src="https://www.youtube.com/embed/jyju2P-7hPA?rel=0" frameborder="0" allowfullscreen></iframe>

# 1. Data and Tables

* Databaseは，同時に複数の人が編集可能．これが，普通のファイルと異なる点．
* Tableは，headerとbodyからなる．headerは，table nameと，column nameと，column typeからなる．bodyは，rowsとcolumnsからなる．
* 複数の行に跨る演算をaggregationと呼ぶ．SQLで使えるaggregationの代表的なものとして，count，avg，max，min，sumなどがある．
* codeからdatabaseに`query`を出すと，`result`を返される．`result`は，原則的にTable形式．
* Database中でデータの唯一性を担保するために，idを与えることがある．このように識別に用いられるcolumnを`primary key`と呼ぶ．
* 複数の情報を持つオブジェクトを定義するよりは，複数のTableで管理したほうが効率的．

# 2. Elements of SQL

* SQLのtypeとして，`text`，`integer`，`date`などがある．`text`および`date`は，`'2017-08-10'`のようにシングルクォートで囲む．主なSQLのtypeは以下．
* Text and string types
    * `text`：長さに制限のない文字列．Pythonの`str`に相当．
    * `char(n)`：長さが`n`の文字列．
    * `varchar(n)`：長さが最大`n`の文字列．
* Numeric types
    * `integer`：整数型．Pythonの`int`に相当．
    * `real`：浮動小数点型．Pythonの`float`に相当．精度は小数第6位．
    * `double precision`：倍精度小数点．精度は小数第15位．
    * `decimal`：正確な小数型（？）．
* Date and time types
    * `date`：日付型．年，月，日．
    * `time`：時刻型．
    * `timestamp`：`date`および`time`．
* 基本構文：**select** *columns* **from** *tables* **where** *condition*;
* 出力数に制限を設けるとき：**limit** *count* [**offset** *skip*]
* 並び替えるとき：**order by** *columns* [**desc**]
* 結果をまとめるとき：**group by** *columns*
    * 例えば，同じ名前の動物の数を数えるとき：`select name, count(*) as num from animals group by name;`
* Pythonでも同様のことはできる．違いはスピードとメモリ．Databaseは格段に高速に，かつメモリ消費を抑えて実行できる．
* 新たに要素を追加するとき：**insert into** *table* **values (** *val1, val2, ...* **)**;
* ただし，特定の列を指定して追加するときは：**insert into** *table*(*column1, column2, ...*) **values (** *val1, val2, ...* **)**;
* Databaseを結合するとき：*T* **join** *S* **on** *T.color = S.paint*
    * 例えば，`fish`を食べる動物の名前を抽出したとき：`select name from animals join diet on animals.species=diet.species where food='fish';`
* `where`は`group by`の前に適用されるが，`having`は`group by`の後に適用される．
* Lesson 3に向けて，[VirtualBox](https://www.virtualbox.org/wiki/Downloads)と[Vagrant](https://www.vagrantup.com/)で環境を構築．Vagrantってこんな便利だったのか．
    * 仮想環境構築：`$ vagrant up`
    * ログイン：`$ vagrant ssh`
    * ファイル共有は`/vagrant`ディレクトリ．
    * PostgreSQLの起動：`$ psql`
    * ログアウト：`$ exit`あるいは`Ctrl-D`
* VagrantとDockerの違いについては，以下が参考になった．
    * [VagrantとDockerについて名前しか知らなかったので試した](http://qiita.com/hidekuro/items/fc12344d36d996198e96)
    * [dockerとvagrantの違い言える？新人エンジニアでも分かった気になれる俺流まとめ](http://acchi-muite-hoi.hatenablog.com/entry/2016/05/30/041618)


# 3. Python DB-API

* PythonからDatabaseを叩く際，DB-APIを用いる．DB-APIはPythonの組み込みモジュール．Databaseに応じて，DB-APIモジュールは異なる：SQLiteは`sqlite3`，PostgreSQLは`psycopg2`，ODBCは`pyodbc`，MySQLは`mysql.connector`など．
* 例えば，次のようなPythonコードを書く．

<script src="https://gist.github.com/haltaro/92a4506f6b0f3461b217934860490173.js"></script>

* Databaseにおける追加や削除を行った後は，必ず`Connection.commit()`する．
* PostgreSQLを使って，簡易なForumサイトを作成する．実験環境を確認．
    * `$ vagrant up`で仮想環境を立ち上げ．
    * `$ vagrant ssh`で仮想環境にログイン．
    * `$ cd /vagrant/forum`で当該ディレクトリに移動．
    * `$ python form.py`でForumサーバを起動．ブラウザで`http://localhost:8000`にアクセス．適当にMessageを投稿してみる．
    * `Ctrl+C`と`$ python form.py`で再起動すると，先ほど投稿したMessageが消えていることがわかる．以降では，Messageを保存する機能をPostgreSQLで実装する．

# 4. Deeper into SQL

# 5. Tournament Database
