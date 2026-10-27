# tatsumura-sa-fc

Senior Experience Network / シニア・アドバイザー紹介サイト。

## 技術構成

- HTML5
- Tailwind CSS 3
- Vanilla JavaScript
- 静的JSONデータ（アドバイザー情報）
- Vercel Static Hosting

Next.js / TypeScript / 独自バックエンドは使用しません。予約・決済は各アドバイザーのSelectType予約ページへ接続する想定です。

## 開発環境

Node.js 20以上を推奨します。

```bash
npm install
npm run build
```

Tailwind CSSの生成結果は `public/assets/css/style.css` です。

ローカル確認には、ビルド後に `public` ディレクトリを静的サーバーで配信してください。

## Vercel

- Framework Preset: Other
- Build Command: `npm run build`
- Output Directory: `public`
- Install Command: `npm install`

## 公開前に要確認

- 仮の画像を正式なロゴ・写真へ差し替える
- 各アドバイザーのプロフィール、メニュー、料金、予約URLを本部確認後に登録する
- お問い合わせ先、運営者情報、プライバシーポリシー等の正式情報を反映する
- Vercelの利用プラン・商用利用条件を確認する
