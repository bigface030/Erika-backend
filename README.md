# Erika-backend

#### ERiKA 電商服飾平台 後端原始碼
> ### [ERiKA API 文件](https://hackmd.io/@bigface030/HklAXkguF)

## 專案簡介
採用 [Node.js](https://nodejs.org/en/) 的 web 框架 [Express](https://expressjs.com/) 建置 server，搭配 ORM 框架 [Sequelize](https://sequelize.org/) 操作 [MySQL](https://www.mysql.com/) 資料庫以建立 controllers 及 models，同時生成 API 與前端串連。

## 專案建置
1. `npm install`：安裝專案所需套件。
2. 在根目錄下新建 `config/config.json` ，格式參考 [Sequelize 官方文件](https://sequelize.org/master/manual/migrations.html#configuration)。
    #### 時間格式設定
    ```json=
    // 在 development / test / production 模式底下新增以下的屬性：

    // 設定 model 讀取資料庫時不轉換 mysql 的 datetime 格式
        "dialectOptions": {
          "dateStrings": true,
          "typeCast": true
        }, 

    // 設定 model 寫入資料庫時採用的時區
        "timezone": "+08:00"
    ```
3. `npm run migrate`：執行 sequelize-cli migrations，在 MySQL 資料庫中建立 table 並設定 table 之間的關聯。
4. `npm run seed`：執行 sequelize-cli seeders 以在資料庫中建立初始 demo 資料。
5. `npm run start`：在 http://localhost:5000 啟動專案 development 版本

## 使用套件

- [express](https://expressjs.com/)：web server 框架
- [mysql2](https://www.npmjs.com/package/mysql2)：連線 MySQL 資料庫
- [sequelize](https://sequelize.org/)：透過 ORM 框架操作資料庫來對應 models ，不用寫 SQL query 即可撰寫 controller
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)：利用 migrations 建立資料庫 table、seeds 設定資料庫 data
- [dotenv](https://www.npmjs.com/package/dotenv)：透過 `.env` 集中管理環境變數
- [cors](https://www.npmjs.com/package/cors)：解決跨來源資源共用
- [body-parser](https://www.npmjs.com/package/body-parser)：解析 request body ( JSON, urlencoded ) 讓 controller 得以使用

## 專案架構

```
|   app.js                 // App 伺服器入口點
|   package.json
|   package-lock.json
|   README.md
|
+---config
|     config.json            // Sequelize 設定檔
|
+---controllers              // 處理 API 邏輯
|     productController.js
|
+---models                   // 透過 Sequelize 和資料庫溝通
|     index.js
|     product.js
|     category.js
|     image.js
|     color.js
|     size_top.js
|     size_bottom.js
|     size_skirt.js
|     size_general.js
|     pattern.js
|
+---node_modules
|
+---migrations                // Sequelize migrations
|       
\---seeders                   // Sequelize seeders
```

## 資料庫設計
> https://dbdiagram.io/d/6167add7940c4c4eec94966b
> 
![](https://i.imgur.com/FbU9TZ3.png)


## 專案前端

透過 [Create React App](https://create-react-app.dev/) 建立開發環境，使用 [React](https://zh-hant.reactjs.org/) 開發 SPA (Single Page Application)，完成後將專案部署至 [GitHub Pages](https://pages.github.com/)。

> #### 專案連結：https://github.com/bigface030/Erika

## 專案授權

[MIT License](https://choosealicense.com/licenses/mit/)
