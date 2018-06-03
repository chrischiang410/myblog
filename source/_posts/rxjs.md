---
title: RxJS - Observable 初探
date: 2017-04-10 00:00:00
tags:
---

## 大綱

* RxJS 介紹
* Observable 範例 
* 比較 Observable 與 Promise
* 結論
<!--more-->
---

## RxJS 介紹

* Reactive Programming
* Reactive Extensions (Rx)

----

## Reactive Programming

"Programming with asynchronous data streams."


----

## 什麼是 stream?
~~好像是買遊戲的那個平台耶?~~

<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/263775/images/1763829/687474703a2f2f692e696d6775722e636f6d2f4149696d5138432e6a7067.jpeg"></img>

----

## 什麼是 stream?

* 一段時間內的集合、序列、流
* 可觀察的集合 ( Observable collections )

----

## Reactive Extensions

* LinQ 的一種擴展 (lib)
* 相依性低
* 概念上 Rx = LinQ + Observable + Schedulers


----

## LinQ

* Language Integrated Query
* .Net 的一種擴展 (lib)
* 透過一般程式語言撰寫類似SQL語法求得SQL結果

----

## Observable

* 可觀察的對象
* 對象可為異步事件/數據流 ( asynchronous event/data stream )

----

## Schedulers

* thread controller
-Schedulers.immediate (default)
-Schedulers.newThread
-AndroidSchedulers.mainThread

----

## Reactive Extensions 其實是

“透過 LinQ operator 針對 Observable 在 Schedulers 指定的線程做處理”


---

## Observable 解說

* Rx Operator
	* Chaining Operators
	* 包含create、tramsfer、filter....等

* 冷熱 Observable
	* 冷：subscribe( ) 
	* 熱：connect( )


----

## Observable 範例
<a href="http://jsbin.com/xoxileyalu/1/edit?html,js,console">範例連結一</a>
<a href="http://jsfiddle.net/4gGgs/589/">範例連結二</a>


登登！！Observable is lazy！


---

## 回顧 Promise

* 三種狀態：pending、fulfill與 reject
* 調用函數來處理"結果"
* Promise 本質上就是個 Observable


----

## Promise 圖解
<img src="http://i.imgur.com/R5GhToH.jpg"></img>


---

## 比較 Observable 與 Promise
<a href="https://jsbin.com/satazomowi/1/edit?js,console">範例連結</a>
* Promise 創建時即執行, Observable 則否
* Promise 回傳單一結果, Observable 可回傳多個
* Observable 可拆解或組成非同步行為
* Observable 可被取消、重試, Promise 則否


----

## 比較表

<table>
	<thead>
	<tr>
		<th></th>
		<th>Observable</th>
		<th>Promise</th>
	</tr>
    </thead>
	<tbody>
		<tr>
			<td>
			Lazy
			</td>
			<td align="center">
			是
			</td>
			<td align="center">
			否
			</td>
		</tr>
		<tr>
			<td>
			回傳結果
			</td>
			<td align="center">
			單一/多個
			</td>
			<td align="center">
			單一
			</td>
		</tr>
		<tr>
			<td>
			能否取消
			</td>
			<td align="center">
			能
			</td>
			<td align="center">
			不能
			</td>
		</tr>
		<tr>
			<td>
			能否重試
			</td>
			<td align="center">
			能
			</td>
			<td align="center">
			不能
			</td>
		</tr>
		<tr>
			<td>
			可讀性
			</td>
			<td align="center">
			較佳
			</td>
			<td align="center">
			稍差
			</td>
		</tr>
	</tbody>
</table>
---

## 結論

* 有什麼是 Promise 可以但 Observable 做不到的嗎 ?
-- 沒有。
-- 如果你願意, 甚至可將 Observable <a href="https://angular.io/docs/ts/latest/guide/server-communication.html">轉成 Promise</a>
* 為何 Angular2 捨棄 Promise 採用 Observable ?
-- ~~因為豆漿濃..~~ 因為 Rx 功能太強大啦！
* 那什麼時候適合用 Promise / Observable 呢?
-- 視需求決定
