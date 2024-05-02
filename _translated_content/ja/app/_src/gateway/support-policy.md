---
title: バージョンサポートポリシー
badge: enterprise
content-type: reference
---


## {{site.base_gateway}} のバージョンサポート（エンタープライズ）

| バージョン | リリース日 | フルサポート終了日 | サポート終了日 |
|:--------:|:-------------:|:-------------------:|:---------------------:|
|  3.1.x.x |  2022-12-06   |     2024-08-30      |      2025-08-30       |
|  3.0.x.x |  2022-08-31   |     2024-08-30      |      2025-08-30       |
|  2.8.x.x |  2022-03-02   |     2023-08-24      |      2024-08-24       |
|  2.7.x.x |  2021-12-16   |     2023-02-24      |      2023-08-24       |
|  2.6.x.x |  2021-10-14   |     2023-02-24      |      2023-08-24       |
|  2.5.x.x |  2021-08-03   |     2022-08-24      |      2023-08-24       |
|  2.4.x.x |  2021-05-18   |     2022-08-24      |      2023-08-24       |  
|  2.3.x.x |  2021-02-11   |     2022-08-24      |      2023-08-24       |
|  2.2.x.x |  2020-11-17   |     2022-08-24      |      2023-08-24       |
|  2.1.x.x |  2020-08-25   |     2022-08-24      |      2023-08-24       |
|  1.5.x.x |  2020-04-10   |     2021-04-09      |      2022-04-09       |
|  1.3.x.x |  2019-11-05   |     2020-11-04      |      2021-11-04       |
|   0.36   |  2019-08-05   |     2020-08-04      |      2021-08-04       |
|   0.35   |  2019-05-16   |     2020-05-15      |      2020-11-15       |
|   0.34   |  2018-11-19   |     2019-11-18      |      2020-11-18       |
|   0.33   |  2018-07-11   |     2019-06-10      |      2020-06-10       |
|   0.32   |  2018-05-22   |     2019-05-21      |      2020-05-21       |
|   0.31   |  2018-03-13   |     2019-03-12      |      2020-03-12       |
|   0.30   |  2018-01-22   |     2019-01-21      |      2020-01-21       |

> *表1: {{site.ee_product_name}} のバージョンサポート*

## リリースの種類
Kong は製品のバージョン管理に構造化されたアプローチを採用しています。
製品は `{MAJOR}.{MINOR}.{PATCH}.{ENTERPRISE_PATCH}` のパターンに従います。
`ENTERPRISE_PATCH` セグメントは {{site.ce_product_name}} をベースにした {{site.ee_product_name}} のサブパッチを識別します。

このサポートドキュメントの目的のために:

* **メジャーバージョン** は、最も左の小数点の左側の数値によって識別される {{site.ee_product_name}} のバージョンを指します。例えば、2.1.3.0 の場合、メジャーバージョンは 2 であり、1.3.0.0 の場合、メジャーバージョンは 1 です。

* **マイナーバージョン** は、二番目の小数点とその間の数値によって識別されるソフトウェアのバージョンを指します（x.X.x）。例えば、2.1.3.0 の場合、マイナーバージョンは 1 であり、1.3.0.0 の場合、マイナーバージョンは 3 です。

* **最初のメジャーバージョンリリース** は、与えられたメジャーバージョンの最初のリリースのクロノロジカルに利用可能なリリースです。{{site.ee_product_name}} のメジャーバージョン 2 の最初のリリースは 2.1.3.0 であり、メジャーバージョン 1 の最初のリリースは 1.3.0.0 です。

* **最新のメジャー/マイナーバージョンリリース** は、与えられたメジャーバージョンの最も最近のクロノロジカルに利用可能なマイナーバージョンリリースです。

アクティブなエンタープライズサポート契約を持つ顧客に対して、{{site.ee_product_name}} リリースバージョン 2.1.3.x<sup>*</sup> 以降、{{site.ee_product_name}} の各メジャーバージョンリリースについて、最初のメジャーバージョンリリースのリリース日から24ヶ月間のサポートを提供します。

サポート内容は以下の通りです:
* ドキュメント化されたソフトウェアの使用に関する技術サポート
  * ソフトウェアの設定のアシスト
  * パフォーマンスチューニングのガイドライン
* Kong ソフトウェアの後続バージョンへのアップグレードの支援
* 以下のバグ修正ガイドラインに基づくバグ修正リリースおよび/またはワークアラウンドへのアクセス

**<sup>*</sup>** 24ヶ月間のサポートは {{site.ee_product_name}} 2.1.3.x から適用されます。以前のリリースについては、最初のマイナーバージョンリリースからのサポート期間が12ヶ月間継続されます。 {{site.kic_product_name}} および {{site.mesh_product_name}} のサポートは引き続き12ヶ月間です。24ヶ月間のサポートは {{site.ee_product_name}} の標準リリースに適用されます。

## サポート終了
サポート期間の終了後、Kong は顧客が {{site.ee_product_name}} の完全にサポートされたバージョンにアップグレードするのを支援するために、最大12ヶ月間のサンセット期間にわたって限定的なサポートを提供します。このサンセット期間にカバーされるソフトウェアに対するパッチは提供されません。この期間中にパッチが必要な問題が発生した場合、顧客はより新しい {{site.ee_product_name}} バージョンにアップグレードする必要があります。

{% include_cached /md/support-policy.md %}

## 関連項目

* [{{site.mesh_product_name}} のバージョンサポートポリシー](/mesh/latest/support-policy/)
* [{{site.kic_product_name}} のバージョンサポートポリシー](/kubernetes-ingress-controller/latest/support-policy/)
