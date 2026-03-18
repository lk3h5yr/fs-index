# 部署到 Vercel（前端官網）

本專案僅部署 **Next.js 14 官網**（`apps/public-web`）到 Vercel。

---

## 一、部署前準備

### 1. 手動刪除用不到的資料夾（可選）

若你希望專案只保留前端，可關閉 Cursor/VS Code 後，手動刪除以下資料夾：

- `apps/admin`（後台）
- `services`（API + Worker）
- `packages`（shared 已內聯到 public-web，不再需要）
- `infra`（Docker 設定）

刪除後不影響 Vercel 部署，因為 Vercel 只會 build `apps/public-web`。

### 2. 確認本地可建置

在專案根目錄執行：

```bash
npm install
npm run build
```

若建置成功，即可部署。

---

## 二、在 Vercel 上部署

### 方式 A：透過 Vercel 網站（推薦）

1. **登入 [vercel.com](https://vercel.com)**，用 GitHub/GitLab/Bitbucket 登入。

2. **Import 專案**
   - 點「Add New」→「Project」
   - 選擇此專案的 Git 倉庫（若尚未連線，先完成 Git 連線）

3. **設定專案（重要）**
   - **Framework Preset**：選 **Next.js**（通常會自動偵測）
   - **Root Directory**：點「Edit」，填 **`apps/public-web`**
   - **Build Command**：留空或填 `npm run build`（在 Root 為 `apps/public-web` 時，Vercel 會用 `next build`）
   - **Output Directory**：留空（Next.js 預設）
   - **Install Command**：留空（預設 `npm install`）

4. **環境變數（選填）**
   - 若官網的「お問い合わせ」表單要送到後端 API，在 Vercel 專案 **Settings → Environment Variables** 新增：
     - **Name**：`API_URL`
     - **Value**：你的後端 API 網址，例如 `https://your-api.example.com`
   - 未設定時，表單會轉發到 `http://localhost:3002`（僅適合本地開發）。

5. 點 **Deploy**，等待建置與部署完成。

### 方式 B：用 Vercel CLI

1. 安裝 CLI：
   ```bash
   npm i -g vercel
   ```

2. 在專案根目錄登入並部署：
   ```bash
   cd e:\FS_INDEX
   vercel login
   vercel
   ```
   第一次會問你專案設定，**Root Directory 請填 `apps/public-web`**。

3. 若要設定環境變數：
   ```bash
   vercel env add API_URL
   ```
   依提示輸入後端 API 網址。

---

## 三、部署後檢查

- 開啟 Vercel 給的網址，確認首頁、關於、案例、新聞等頁面正常。
- 若你有設 `API_URL`，到官網的「お問い合わせ」頁送一筆測試，確認是否會送到後端。

---

## 四、注意事項

| 項目 | 說明 |
|------|------|
| **Root Directory** | 一定要設成 **`apps/public-web`**，否則會當成 monorepo 根目錄建置而失敗。 |
| **表單 /api** | 官網的 `/api/*` 會依 `API_URL` 轉發到後端；沒設則僅本地開發用。 |
| **Node 版本** | Vercel 預設 Node 18+，符合專案 `engines`。 |

完成以上步驟後，前端官網就會在 Vercel 上線。
