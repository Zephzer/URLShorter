#  短網址產生器
## 專案簡介
本專案網站可以將使用者輸入的過長網址，轉成短網址。
## 使用技術
1. Node.js version 18.16.0
2. Express version 4.18.2
3. Express-Handlebars version 4.0.2
4. Mongoose version 5.9.7
5. Dotenv version 16.3.1

## 安裝流程
## 本地電腦執行
1.打開終端機，cd 移動到預定放置本專案的資料夾，執行以下指令以複製本專案：
- git clone https://github.com/Zephzer/URLShorter.git

2.在該專案資料夾中，以終端機方式執行安裝 npm：
- npm install

3.安裝完成後，請建立「.env」檔案，依照以下格式設定連到您自己 MongoDB 的連結：
- MONGODB_URI=mongodb+srv://<您的 MongoDB 帳號>:<您的 MongoDB 密碼>@xxx.xxx.xxx.net/short-url?retryWrites=true&w=majority

4.執行以下指令，匯入本專案的種子資料到 MongoDB 資料庫：
- npm run seed

5.看到以下訊息代表資料已經匯入 MongoDB：
- done

6.最後執行以下指令啟動網站：
- npm run dev

7.看到以下指令代表網站載入完成，可以使用瀏覽器打開 http://localhost:3000 即可進入網站。
- The website http://localhost:3000 is online.
