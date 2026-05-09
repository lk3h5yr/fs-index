import type { ReactNode } from 'react';

/** 一覧・ISO / 公開ニュースページのドット形式の日付どちらも想定 */
export function formatNewsDateForPopup(dateInput: string): string {
  const trimmed = dateInput.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const d = new Date(trimmed);
    if (!Number.isNaN(d.getTime())) {
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
  }
  const parts = trimmed.split(/[.\-/]/).map(Number);
  const [y, m, d] = parts;
  if (!y || !m) return trimmed;
  if (d) return `${y}年${m}月${d}日`;
  return `${y}年${m}月`;
}

/** ニュース詳細ポップアップ本文（ /news と管理画面レビューで共用） */
export function renderNewsPopupBody(body: string): ReactNode {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  return blocks.map((block, i) => {
    const lines = block.split('\n').filter(Boolean);
    const isNote = block.startsWith('※');
    if (isNote) {
      return (
        <p key={i} className="news-popup-note">
          {lines.map((line, j) => (
            <span key={j}>
              {line}
              {j < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
    }
    const hasKeyValue = lines.some((l) => /[：:]/.test(l) && l.trim().length > 0);
    if (hasKeyValue && lines.length >= 1) {
      return (
        <div key={i} className="news-popup-kv">
          {lines.map((line, j) => {
            const match = line.match(/^(.+?)[\s]*[：:][\s]*(.*)$/);
            if (match) {
              return (
                <div key={j} className="news-popup-kv-row">
                  <span className="news-popup-kv-key">{match[1].trim()}</span>
                  <span className="news-popup-kv-val">{match[2].trim()}</span>
                </div>
              );
            }
            if (line.trim()) {
              return (
                <p key={j} className="news-popup-p news-popup-p-sm">
                  {line}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return (
      <p key={i} className="news-popup-p">
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}
