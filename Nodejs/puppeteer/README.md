> 掘金：https://juejin.im/post/5c5d4b9c51882562d17d7a36

### install
```bash
# 带Chromium
$ yarn add peppeteer
# 不带Chromium
$ yarn add peppeteer-core 
```

### base use
```js
const puppeteer = require('puppeteer-core');

(async () => {
    const launchParams = {
         headless: false,
        defaultViewport: {
            width: 1000,
            height: 800
        }
    }
  const browser = await puppeteer.launch(launchParams);
  const page = await browser.newPage();
  await page.goto('https://so.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
```

### launchParams
#### executablePath
chrome执行路径可见`chrome://version`
```js
const launchParams = {
      executablePath: ''
  }
```

#### userDataDir
设置存储空间，cookie、localStorage、blob
```js
const launchParams = {
      userDataDir: 'test-profile-dir',
  } 
```

### handle DOM
```js
await page.goto('https://example.com/path');
await page.waitFor(3000);
await page.click('.target-selector'); // 点击指定元素
```

