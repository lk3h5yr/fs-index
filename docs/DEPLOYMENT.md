# FS_INDEX 部署方案建議

本專案為 monorepo，包含：
- **apps/public-web**：Next.js 14 官網（ForestSoft）
- **services/api**：NestJS + Prisma 後端 API
- **services/worker**：背景任務（可選）
- **infra**：Redis、MailHog（開發用）

以下方案從「只上線官網」到「全系統上線」依序說明。

---

## 方案一：只上線官網（最簡單，推薦起步）

**適用**：對外只需要官網，API 僅內部或暫不對外。

### 1. Vercel（推薦）

- **優點**：與 Next.js 同廠、零設定、免費額度、自動 HTTPS、全球 CDN。
- **步驟**：
  1. 將程式碼推到 GitHub/GitLab/Bitbucket。
  2. 到 [vercel.com](https://vercel.com) 用 Git 匯入專案。
  3. **Root Directory** 設為 `apps/public-web`。
  4. Build 指令：`npm run build`（或 `cd apps/public-web && npm run build`，依 Vercel 偵測）。
  5. 若 monorepo 需在根目錄建置：在根目錄新增 `vercel.json`，指定 `apps/public-web` 為輸出，或使用 Vercel 的 monorepo 設定。
- **自訂網域**：在 Vercel 專案設定綁定自己的網域（如 `www.forestsoft.jp`）。

### 2. Netlify

- 類似 Vercel，支援 Next.js。匯入 Git 後：
  - Base directory：`apps/public-web`
  - Build command：`npm run build`
  - Publish directory：`apps/public-web/.next`（若用 SSG）或依 Netlify Next.js 說明。
- 可綁自訂網域、免費 HTTPS。

### 3. 自有主機 / VPS（如 Linux 伺服器）

- 在伺服器上安裝 Node.js 18+。
- 建置與執行：
  ```bash
  cd /path/to/FS_INDEX
  npm install
  npm run build
  cd apps/public-web && npm run start
  ```
- 用 **PM2** 或 **systemd** 做常駐與重開機自啟。
- 用 **Nginx** 做反向代理、綁網域、HTTPS（建議用 Let's Encrypt）。

---

## 方案二：官網 + API 一起上線（前後端分離）

**適用**：官網要呼叫 `services/api`（表單、登入等）。

### 架構概念

- **官網**：部署在 Vercel / Netlify / 靜態主機。
- **API**：部署在可跑 Node 的環境（PaaS 或 VPS）。
- 官網的「API 基底網址」設為 API 的對外網址（例如 `https://api.forestsoft.jp`）。

### A. API 部署選項

| 平台 | 說明 | 適合 |
|------|------|------|
| **Railway** | 連 GitHub 自動部署，內建 PostgreSQL/Redis，免費額度 | 小流量、快速上線 |
| **Render** | 免費/付費方案，支援 Docker、背景服務 | 小～中流量 |
| **Fly.io** | 全球節點、Docker 部署 | 需要低延遲、多區域 |
| **自有 VPS** | 完全自控（Ubuntu + Node + PM2 + Nginx） | 已有主機或需完全掌控 |

### B. 環境變數與資料庫

- **API** 需要：
  - `DATABASE_URL`（Prisma，例如 PostgreSQL）。
  - 若用 Redis：`REDIS_URL`（可先用 Railway/Render 內建或雲端 Redis）。
  - JWT、Mail 等密鑰（勿提交到 Git）。
- **官網** 需要：
  - `NEXT_PUBLIC_API_URL` 或類似變數，指向對外 API 網址（例如 `https://api.forestsoft.jp`）。

### C. 建置與啟動指令（API）

```bash
cd services/api
npm install
npx prisma generate
npx prisma migrate deploy   # 正式環境 DB
npm run build
node dist/main.js           # 或透過 PM2
```

---

## 方案三：全系統上線（官網 + API + Redis + Worker）

**適用**：需要佇列、背景任務、完整後端。

### 架構概念

- 官網、API 部署方式同方案二。
- **Redis**：用雲端 Redis（Upstash、Redis Cloud、或 PaaS 內建）。
- **Worker**：與 API 同主機用 PM2 跑兩個 process，或單獨一台小機跑 Worker。

### Docker 部署（自建主機時可選）

若要在單機用 Docker 跑「API + Redis + 官網（Node 版）」：

1. 在專案根目錄或 `infra` 撰寫：
   - `Dockerfile`：建置 Next.js（或只建置 API，官網仍用 Vercel）。
   - `docker-compose.yml`：定義 `api`、`redis`、必要時 `worker`。
2. 正式環境的 `docker-compose` 不要帶 MailHog，改用真實 SMTP 或送信服務。

---

## 建議流程（實作順序）

1. **先讓官網能被訪問**
   - 用 **Vercel** 部署 `apps/public-web`，綁定自訂網域。
   - 確認首頁、about、news 等都能正常開啟。

2. **若需要表單/API**
   - 將 **services/api** 部署到 Railway / Render / VPS。
   - 設定正式環境的 `DATABASE_URL`、Prisma migrate。
   - 官網設定 `NEXT_PUBLIC_API_URL` 指向該 API。

3. **需要佇列與背景任務時**
   - 啟用 Redis（雲端或自建），API 與 Worker 都指到同一 Redis。
   - 部署 Worker（與 API 同機或分機）。

4. **安全與效能**
   - 所有對外服務一律 **HTTPS**（Vercel/Netlify 內建，自建用 Nginx + Let's Encrypt）。
   - API 設 CORS 只允許官網網域。
   - 敏感資訊只用環境變數，不寫進程式碼。

---

## 快速檢查清單

- [ ] 程式碼已推送到 Git（GitHub/GitLab 等）。
- [ ] 官網建置成功：`npm run build`（或從 monorepo 根目錄建置 public-web）。
- [ ] 若用 API：正式 DB 已建立、Prisma migrate 已跑、環境變數已設。
- [ ] 官網的 API 網址指向正式 API。
- [ ] 網域 DNS 已指向部署平台（或 Nginx）。
- [ ] HTTPS 已啟用。

若你告訴我「只有官網」或「官網+API」或「要 Docker」，我可以再幫你寫出對應的具體設定檔（如 `vercel.json`、`Dockerfile`、`docker-compose.prod.yml` 範例）。
