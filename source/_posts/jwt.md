---
title: Json Web Token
date: 2017-03-06 00:00:00
tags:
---

<style>
.left{
	display:block ;
	text-align:left ;
}

.right{
	display:block ;
	text-align:right ;
}

</style>

## Agenda
  * 了解 Json Web Token 
  * 運作原理 
  * Angular2 Router實作概述

<!--more-->

---

## 了解 Json Web Token 
JWT 是一個用於安全性傳輸資訊的公開規範 (RFC 7519), 
<span class="left">特點有 ：</span>
 * 輕巧性：採 json 格式與 Base 64編碼, size 極小, 可透過URL傳輸、post parameter 或放在 Http header
 * 獨立性：可將所需的 User資訊存入 JWT Payload中, 一次搞定 

----

## 了解 Json Web Token 
JWT 由三串編碼所組成,分別為：

 * Header
 * Payload
 * Signature

----

## Header 
<span class="left">編譯前：</span>
```<div>
{
    "typ": "JWT",
    "alg": "HS256"
}
``` 
<span class="left">透過 Base64 編譯後：</span>
```<div>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

----

## Payload
<span class="left">編譯前：</span>
```javascript
 {
  "iss": "andyyou.github.io",
  "exp": 1465700328092,
  "name": "andyyou",
  "admin": true
 }
```
<span class="left">透過 Base64 編譯後：</span>
```<div>
eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9
```

----

## Payload
<span class="left">既有格式說明：</span>
 * `iss` ：簽發 JWT 者
 * `sub` ：訂閱 JWT 的用戶
 * `aud` ：接收 JWT 者
 * `exp` ：JWT 到期日 ( 採 timestamp 格式 )
 * `iat` ：何時簽發 JWT


----

## Signature
<span class="left">由server提供一個密鑰,以`secret`為例：</span>
```<javascript>
var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);
var signature = HMACSHA256(encodedString, 'secret');
```

<span class="left">透過 Base64 編譯後：</span>
```<div>
6srTK4rBbOqlWj7le2hrwFP-iayHblLdhgVFIYU3gVg
```

----

## JWT
由上方三組編碼,以`.`的方式將其串接起來,便得到：
```<div>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhbmR5eW91LmdpdGh1Yi5pbyIsImV4cCI6MTQ2NTcwMDMyODA5MiwibmFtZSI6ImFuZHl5b3UiLCJhZG1pbiI6dHJ1ZX0.6srTK4rBbOqlWj7le2hrwFP-iayHblLdhgVFIYU3gVg
```
<br></br>
此串編碼即 Json Web Token

---

## JWT 運作原理


----

* 說好的 JWT 何去何從

	<img src="http://i.imgur.com/kC5c7wS.jpg?1"></img>

----

* User 進行登入 (http post) 請求, 將帳號密碼送至 Server

* Server驗證帳密成功後, 可將一些敏感性較低的屬性 ( 使用者id, 有效期限 ) 加入至 Payload作為其一屬性, 並結合 header 與 secret , 編譯出JWT

* Server 返回 JWT 給 Brower, 並存放在 local 端 (一般放置於localstorage)

----

* 之後 User 的每次請求, 其 Http Authorization Header 皆須附帶 JWT, Server 將依據 JWT 是否驗證成功來接受請求與否

在 Authorization header 中, 採Bearer schema：

```<div>
Authorization: Bearer <token>
```

---

## 安全性討論

 * JWT 與 XSS
 * JWT 與 CSRF

----

## 以存放位置來檢視 JWT

 * 將 JWT 存放在 HTML5 Web storage？
 -- 若 JWT 存放於 localstorage 中, 需提防 Token 遭受 XSS 竊取
 -- 由於並無觸及 Cookie, 較不必擔心 CSRF 問題 
 

----

## 以存放位置來檢視 JWT

 * 將 JWT 存放在 Cookie？
 -- 若 JWT 存放於 Cookie 中,可藉由 `HttpOnly` 與 `Secure` 兩種flag 強制使用 Https,能有效防範 XSS 之影響
 -- 然而,較容易遭受 CSRF 攻擊, 需透過其他 framework 來防範



---

## JWT in Angular2

 * 如何使用
 * 如何與 Router 搭配


----

## How to use in Angular2?

 * 安裝 angular2-jwt
 ```javascript
 npm install angular2-jwt
 ```
 * 若採用SystemJS, 記得 map angular2-jwt
 ```<javascript>
 <script>
  System.config({
    defaultJSExtensions: true,
    map: {
      "angular2-jwt": "node_modules/angular2-jwt"
    }
  });
  </script>
 ```

----

## How to use in Angular2?

 * 使用AuthHttp 取代 Http
 AuthHttp 可傳送各種含驗證的 Http request
 
 ```<div>
 import {AuthHttp} from 'angular2-jwt/angular2-jwt';
 
 ...
 
 export class AppComponent {
 
 this.AuthHttp.get(...)
 
 }
 ```

----

## with Angular2 Router 

 * 透過lifecycle hooks來實現 router：`CanActivate`
 * 藉由原生 method, 在route導引前以及component實體化前先檢查JWT
 ```<div>
 @CanActivate(() => tokenNotExpired())
 ```


----

## 實例 

```div
import {Component} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {RouteConfig, ROUTER_DIRECTIVES,
	ROUTER_PROVIDERS, CanActivate} from 'angular2/router'

@Component({
  selector: 'secret-route',
  template: `<h1>是誰住在深海的大鳳梨裡??</h1>`
})

@CanActivate(() => tokenNotExpired())

export class SecretRoute { }
 ```

---

## 補充- Angular2 內建防護

 * 防範 XSS 攻擊
 * XSRF (CSRF)

----

## 防範 XSS 攻擊

* Angular 為了系統性的防範 XSS, 預設所有的 value 皆為不信任的
* 當 value 從 template 插入到 DOM 之中時, Angular將會針對特定環境的 value 進行無害化處理 (Sanitize)
* 特定環境
-- HTML
-- Style
-- URL
-- Resource URL

----

## 無害化處理 (Sanitize)

假定我們有個 Html檔如下：
```<div>
<p>綁定值:</p>
<p class="e2e-inner-html-interpolated">{{htmlSnippet}}</p><br/>
<p>綁定至 innerHTML:</p>
<p class="e2e-inner-html-bound" [innerHTML]="htmlSnippet"></p>
```
而 Component 如下：
```javascript=
export class InnerHtmlBindingComponent {
  htmlSnippet = 'Template <script>alert("HeyYo")</ script>' ; 
}
```

----

## 無害化處理 (Sanitize)

其輸出結果
```
綁定值: 
Template <script>alert("HeyYo")</ script>

綁定至 innerHTML:
Template alert("HeyYo")

```
script tag 將自動被濾掉!!

----

## 信任值
<span class="left">有時後, 應用程式還是需要包含可執行的程式碼(ex: iframe)。為了避免被無害化處理,需要透過一些手段讓 Angular明白。
注入 DomSanitizationService 後, 調用以下所提供的method便可略過無害化處理：
 -- bypassSecurityTrustHtml
 -- bypassSecurityTrustScript
 -- bypassSecurityTrustStyle
 -- bypassSecurityTrustUrl
 -- bypassSecurityTrustResourceUrlDF</span>
 

----

## 信任值

<span class="left">範例：</span>
```javascript=
constructor(private sanitizer: DomSanitizationService) {
  // 透過 service 將 URL 轉成信任的值
  this.dangerousUrl = 'javascript:alert("Hi there")';
  this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
}
```

----

## 防範 CSRF 攻擊

 * Angular 的 http client端內建的 CookieXSRFStrategy 會自動尋找叫做 XSFR-TOKEN 的 cookie
 * 在每個 request header中,設定一個叫做 X-XSRF-TOKEN 的 HTTP request header,並且 assign value 給該 cookie。 Server必須設定 XSRF-TOKEN cookie,並驗證每個 request header



----

## 防範 CSRF 攻擊

 * Angular app 可透過 CookieXSRFStrategy 值來自訂 cookie 和 HTTP header , 也可以依照自訂class 來使用 XSRFStrategy ， 只要把以下程式加入 provider 啟動即可：

```div
{ provide: XSRFStrategy, useValue: new CookieXSRFStrategy('myCookieName', 'My-Header-Name')}
{ provide: XSRFStrategy, useClass: MyXSRFStrategy}
```

---

## 結論

 * JWT 遵循網際網路協定規範 (RFC 7519) 
 * 與現有 Access Token 並無衝突
 * 較敏感的資訊可考慮夾帶在JWT Payload中
 * 各語言如 .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript, and Haskell ...等皆support
 * 與Angular2 搭配來實現 Router功能相當好上手 
 * 視需求決定採用與否
