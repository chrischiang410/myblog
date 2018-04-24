---
title: Model-Driven
date: 2016-11-13 11:12:39
tags:

---

## Model-Driven

### 實作 Model-Driven , 必須要：

* 先 import `ReactiveFormModule` 到 `app.module.ts`
* 開啟 html, 在 Form 元素加上 `[formGroup]="form"` 
```htmlembedded=
<form [formGroup]="form">
 	...
</form>
```
<!--more-->
----

* 回到 ts, import `FormGroup` 與 `FormControl`兩個類別, 並建立名為 `form` 的 form model 
```javascript
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form;
  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      age: new FormControl(),
      interest: new FormGroup({
        movie: new FormControl(),
        music: new FormControl(),
		shopping: new FormControl()
      }),
      sex: new FormControl()
    });
  }
}
```

----

### 讓我們簡化一下

* 透過 Angular 提供的 FormBuilder, 可以取代每次都要 new FormGroup 與 FormControl 類別的步驟
```javascript
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form;
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      username: 'Chris',
      age: '',
      interest: this._fb.group({
        movie: '',
        music: '',
		shopping: ''
      }),
      sex: ''
    });
  }
}
```

----

### 綁定表單控制項

* 在控制項的地方, 以 Directive `formControlName` 取代 `name` 屬性 
* 由於 form Model 的 interest 也建立了 formGroup 區塊, 因此記得在 html 綁上 `formGroupName`：
```html
<form [formGroup]="form">
    <div class="form-group">
	<label class="control-label">姓名</label>
	<input type="text" class="form-control" formControlName="username"/>
    </div>
    <div class="form-group">
	<label class="control-label">年齡</label>
	<input type="number" class="form-control" formControlName="age"/>
    </div>
    <div class="form-group" formGroupName="interest">
	<label class="control-label">興趣</label>
	<label>
	    <input type="checkbox" formControlName="movie" value="movie"> 看電影
        </label>
	<label>
	    <input type="checkbox" formControlName="music" value="music"> 聽音樂
        </label>
		<label>
	    <input type="checkbox" formControlName="shopping" value="shopping"> 購物
        </label>
    </div>
    <div class="form-group">
	<label class="control-label">性別</label>
	<label>
	    <input type="radio" formControlName="sex" value="male"/> 男
	</label>
	<label>
	    <input type="radio" formControlName="sex" value="female"/> 女
	</label>
    </div>
</form>
```

----

