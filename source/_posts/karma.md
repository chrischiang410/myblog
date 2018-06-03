---
title: Karma 測試框架
date: 2017-12-08 00:00:00
tags:
---

## Angular 測試三劍客

* Jasmine: 提供撰寫測試所需的工具, 搭配測試運行框架在瀏覽器上執行測試。

* Karma : 測試運行框架，為開發中執行 unit test 的好選擇。(紅燈、綠燈、重構)

* Protractor: End to End Test專用。模擬使用者的操作，來判斷程式在瀏覽器上正常與否。
<!--more-->
----

## Jasmine 

#### 簡介

* 專門用來撰寫 Javascript 測試的框架

* 完全不依賴於其他的 Javascript 框架

* 語法輕巧且明確,撰寫容易

#### 測試範例撰寫重點

* describe: 描述整份測試之名稱
* beforeEach: 執行每個spec前要先執行的部分
* afterEach: 執行每個spec後要再執行的部分
* it: 即 spec, 測試案例
* expect: 期望結果

```javascript
    describe('單元測試一',()=>{
    
        beforeEach(()=>{ ... });
        
        it('案例一',()=>{ ... });
                      
        it('案例二',()=>{ ... });
                   
        afterEach(()=>{ ... });
                        
    });
```

---

## Karma 簡介

Karma 是個既簡單又快速的測試框架, 旨在幫助開發人員能夠迅速的進行自動化單元測試。

#### 優點

1. 執行速度快
2. 可在真實環境中執行,且跨平台
3. 擴充性高
4. 可遠端控制
5. 支援CI

#### 缺點

1. 無 no serve 指令
2. (待補充)

---

## Karma 環境設定

### karma.conf.js
```javascript 
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    file:[ 'src/app/**/**.spec.ts'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
```

----

### 重點參數說明

* frameworks: 所使用的框架
* files: 要測試的目錄
* plugins: 依賴的第三方套件
* reporters: 
  1. progress 紀錄著執行或略過幾項測試以及測試總數
  2. kjhtml 表示動態生成karma-jasmine-html-reporter

* browser: 想測試的瀏覽器, 需搭配plugins
* coverageIstanbulReporter: 覆蓋率測試報告
* autoWatch: 自動監測檔案是否變更
* singleRun: 預設為false, 若為true則會在測試完成時關閉瀏覽器

---

## 單元測試 

#### TestBed

1. TestBed在Angular test 當中扮演著最基礎也是重要的角色。
2. 透過configureTestingModule方法，即可建立測試環境。
3. 當環境設置完成後,compileComponents 會以非同步方式進行編譯。
注意，編譯後config即不可再更動！

```javascript
TestBed.configureTestingModule({
  declarations: [
    AppComponent
  ]
});
```

將TestBed設定放到beforeEach內,
即可確保每次測試執行前環境都回到最初預設的狀態

```javascript
BeforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]
    });    
});
```

#### async

當我們要測試AppComponent時,
Angular會根據Component是否採用templateUrl與styleUrls來決定要不要發XHR。若有,則需採用async的方式來進行編譯。

```javascript
BeforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();    
}));
```

---

## 單元測試 - Html

* 創建測試用component，返回ComponentFixture，其中包含了可以操作DOM元素的DebugElement。
* DebugElement其實就是元件的實例，而nativeElement則是針對Dom元素操作用。可以看下方例子：

```
fixture.componentInstance == fixture.debugElement.componentInstance;
fixture.nativeElement == fixture.debugElement.nativeElement;
```
* 測試範例如下：
```javascript
 it('should render title in a h1 tag', async(() => {
    
    const fixture = TestBed.createComponent(AppComponent);
                                                    
    fixture.detectChanges();
                                                    
    const compiled = fixture.debugElement.nativeElement;
                                                    
    expect(compiled.querySelectorAll('h1')[0].textContent)
      .toContain('Chris\' Book Store');
  }));
```

---

## 單元測試 - Component

* 若constructor 內有注入service,
則測試模組環境的providers就必須要有該service

```javascript
    TestBed.configureTestingModule({
      declarations: [ NovelComponent ],
      providers: [{ provide: ExampleService, useValue: fakeService }]
    })
```

* 需自行建立假的service, 取代真實的request

```javascript
  const fakeService = {
    getNovel: () => {
      return Observable.of({
        "returnCode": 200,
        "data": [
          {
            "bookname": "Titanic",
            "price": 900
          },
          {
            "bookname": "Once",
            "price": 550
          },
          {
            "bookname": "Harry Potter",
            "price": 1380
          }
        ]
      })
    }
  };

```
* 若template中含有 router-outlet tag, 
則測試模組環境需匯入 RouterTestingModule

```javascript
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
```

---

## 單元測試 - Service

* 測試 Service前, 需import HttpClientModule到 TestBed config中
* 透過 Jasmine的createSpy來幫我們模擬service method

```javascript
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExampleService]
    });
```
* 可以依照測試情境來決定, 什麼時候要注入service

```javascript
  //方法1  注入service同時也catch它
  beforeEach(inject([ExampleService], (eService) => {
    fakeExampleService = eService;
  }));

  //方法2  測試時再注入service
  it('should get the right response, too', inject([ExampleService], (service: ExampleService) => {
    let fakeResponse = null;
    service.getNovel().subscribe(res=>{
      fakeResponse = res.data;
      expect(fakeResponse[0].bookname).toBe('Titanic');
    });
  }));
```


---

## 單元測試 - Router

* 測試Router前, 需import fakeAsync、RouterTestingModule、Router與Location

```javascript
import { TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
```
* 接著進行TestBed的環境建置：將自訂的router隨著RouterTestingModule一起import到config。配置如下：
```javascript
  const routes = [
    {
      path: '', component: null,
      children: [
        { path: '', redirectTo: 'novel', pathMatch: 'full' },
        { path: 'novel', component: NovelComponent },
        { path: 'comic', component: ComicComponent },
        { path: 'magazine', component: MagazineComponent },
        { path: '**', redirectTo: 'novel' }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        NovelComponent,
        ComicComponent,
        MagazineComponent,
        AppComponent
      ]
    });

    //取得注入的Router與Location                
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });
```
* 利用router.navigate來測試
* 因返回promise、故可直接用then來進行後續操作(與官方的tick有些出入)

```javascript
  it('should go to Comic book page', fakeAsync(() => {
    router.navigate(['comic']).then(()=>{
      expect(location.path()).toBe('/comic');
    });
  }));
```
---

## Debug Mode

1. 點擊右上角 Debug
2. 跳出新分頁後, 開啟Chrome DevTool
3. 在 Sources 標籤開啟檔案
4. 下中斷點開始除錯

---

## Coverage Report

輸入以下指令
```
ng test --code-coverage
```

Angular將會在專案目錄下生成 coverage資料夾

----

# Thanks!

