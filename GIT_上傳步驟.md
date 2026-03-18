# 上傳到 GitHub 步驟

你的 GitHub：<https://github.com/lk3h5yr>

目前專案已做完：
- ✅ `git init`（已初始化）
- ✅ `git add .`（檔案已暫存）
- ✅ 遠端已設定：`origin` → `https://github.com/lk3h5yr/fs-index.git`

---

## 一、在 GitHub 建立新倉庫（若還沒建立）

1. 打開 **https://github.com/new**
2. **Repository name** 填：`fs-index`（或你想用的名稱）
3. 選擇 **Public**
4. **不要**勾選 "Add a README file"（保持空倉庫）
5. 點 **Create repository**

若你改用其他倉庫名稱，請把下面指令裡的 `fs-index` 改成你的倉庫名，並重新設定遠端：

```powershell
cd e:\FS_INDEX
git remote remove origin
git remote add origin https://github.com/lk3h5yr/你的倉庫名.git
```

---

## 二、完成第一次 commit（請在本機終端機執行）

目前 `git commit` 在 Cursor 環境會出現 `unknown option 'trailer'`，請**用本機的 PowerShell 或 CMD** 在專案目錄執行：

```powershell
cd e:\FS_INDEX
git commit -m "Initial commit"
```

若仍出現錯誤，可改用（不用 -m，會開編輯器）：

```powershell
git commit
```

儲存並關閉編輯器後即完成 commit。

---

## 三、推送到 GitHub

```powershell
cd e:\FS_INDEX
git branch -M main
git push -u origin main
```

第一次推送時，可能會跳出瀏覽器或視窗要你登入 GitHub；登入完成後再執行一次 `git push -u origin main` 即可。

---

## 四、之後要更新程式時

```powershell
cd e:\FS_INDEX
git add .
git commit -m "說明這次改了什麼"
git push
```

---

## 遠端倉庫網址

- 若倉庫名是 **fs-index**：  
  **https://github.com/lk3h5yr/fs-index**

建立好倉庫並完成上述 commit + push 後，就可以在 Vercel 用「Import Git Repository」選這個 repo 部署。
