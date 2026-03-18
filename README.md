# FS Index Monorepo

全 JS/TS monorepo 專案，包含公司官網、後台管理系統、API 服務和背景工作處理。

## 📦 專案結構

```
/
├── apps/
│   ├── public-web/    # Next.js 公司官網
│   └── admin/         # Vite + React + Mantine 後台
├── services/
│   ├── api/           # NestJS API 服務
│   └── worker/        # BullMQ 背景工作處理
├── packages/
│   └── shared/        # 共享的 Zod schemas 和 types
├── infra/
│   └── docker-compose.yml  # Redis + MailHog
└── scripts/
    └── dev.mjs        # 開發環境啟動腳本
```

## 🚀 快速開始

### 前置需求

- Node.js >= 18.0.0
- Docker & Docker Compose
- npm

### 安裝與啟動

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動開發環境**
   ```bash
   npm run dev
   ```

   此命令會：
   - 啟動 Docker 服務（Redis + MailHog）
   - 啟動所有應用程式（public-web, admin, api, worker）

3. **停止 Docker 服務**
   ```bash
   npm run dev:down
   ```

## 🌐 服務端口

| 服務 | URL | 說明 |
|------|-----|------|
| Public Web | http://localhost:3000 | 公司官網 |
| Admin | http://localhost:3001 | 後台管理系統 |
| API | http://localhost:3002 | NestJS API |
| MailHog UI | http://localhost:8025 | 郵件測試 UI |
| Redis | localhost:6379 | Redis 服務 |

## 🔐 預設帳號

**管理員帳號：**
- Email: `admin@example.com`
- Password: `Passw0rd!`

> 首次啟動時會自動建立此帳號（透過 Prisma seed）

## 📧 郵件測試（MailHog）

開發環境使用 MailHog 作為 SMTP 伺服器，所有寄出的郵件都會被 MailHog 攔截。

### 查看郵件

1. 訪問 http://localhost:8025
2. 在 MailHog UI 中可以看到所有寄出的郵件
3. 包括：
   - 註冊驗證信
   - 密碼重置信

### 測試流程

1. **註冊新帳號**
   - 訪問 http://localhost:3000
   - 註冊新帳號
   - 檢查 MailHog UI 中的驗證郵件

2. **忘記密碼**
   - 在登入頁面點擊「忘記密碼」
   - 輸入 email
   - 檢查 MailHog UI 中的重置密碼郵件

## 🏗️ 技術棧

### Public Web (Next.js)
- Next.js 14
- React 18
- Framer Motion（動畫效果）
- TypeScript

### Admin (Vite + React)
- Vite
- React 18
- Mantine UI
- React Router
- TanStack Query
- TypeScript

### API (NestJS)
- NestJS
- Prisma + SQLite
- Passport JWT（認證）
- Argon2（密碼雜湊）
- BullMQ（背景任務）
- Zod（驗證）

### Worker (BullMQ)
- BullMQ
- Nodemailer
- TypeScript

### Infrastructure
- Docker Compose
- Redis 7
- MailHog
- SQLite

## 📝 API 端點

### 認證 (Auth)

- `POST /api/auth/register` - 註冊
- `POST /api/auth/login` - 登入
- `POST /api/auth/refresh` - 刷新 token
- `POST /api/auth/logout` - 登出
- `GET /api/auth/verify-email?token=...` - 驗證 email
- `POST /api/auth/forgot-password` - 忘記密碼
- `POST /api/auth/reset-password` - 重置密碼

### 後台 (Admin)

- `GET /api/admin/me` - 取得當前使用者（需要 STAFF/ADMIN）
- `GET /api/admin/users` - 取得使用者列表（需要 ADMIN）

### 工單 (Tickets)

- `POST /api/tickets` - 建立聯絡表單

## 🔧 開發指令

### Root 層級

```bash
npm run dev          # 啟動所有服務
npm run dev:down     # 停止 Docker 服務
npm run build        # 建置所有專案
npm run lint         # 執行 lint
```

### 個別服務

```bash
# API
cd services/api
npm run dev          # 開發模式（含 Prisma migrate）
npm run prisma:seed  # 執行 seed

# Worker
cd services/worker
npm run dev          # 開發模式

# Admin
cd apps/admin
npm run dev          # 開發模式

# Public Web
cd apps/public-web
npm run dev          # 開發模式
```

## 📁 資料庫

- **位置**: `services/api/prisma/dev.db`
- **ORM**: Prisma
- **類型**: SQLite

### Prisma 指令

```bash
cd services/api

# 產生 Prisma Client
npm run prisma:generate

# 執行 migration
npm run prisma:migrate

# 查看資料庫
npx prisma studio
```

## 🔒 角色權限 (RBAC)

- **USER**: 一般使用者
- **STAFF**: 員工（可進入後台）
- **ADMIN**: 管理員（完整權限）

## 🐛 疑難排解

### Docker 服務無法啟動

```bash
# 檢查 Docker 是否運行
docker ps

# 重啟 Docker 服務
npm run dev:down
npm run dev
```

### 資料庫錯誤

```bash
# 刪除舊資料庫並重新 migrate
cd services/api
rm prisma/dev.db
npm run dev
```

### 端口被佔用

修改各服務的配置檔案中的端口設定。

## 📄 授權

Private project
