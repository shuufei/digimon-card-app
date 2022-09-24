# Spotted Seal

## Setup

1. node v12
1. npm install

## Deck Construction App

## 起動方法

1. apps/deck-construction-desktop-app/src/assets 配下に下記を展開。  
   ※assets ファイルは data-fetch を利用して取得する
   - cardInfo
   - images
1. 下記コマンドを実行
   ```
   npx nx run deck-construction-desktop-app:serve
   ```

## VS App

1. apps/vs-desktop-app/.env ファイルを作成
   ```
   NX_PEER_SERVER_KEY=${値は別途共有}
   ```
1. apps/vs-desktop-app/src/assets 配下に下記を展開。  
   ※assets ファイルは data-fetch を利用して取得する
   - cardInfo
   - images
1. apps/vs-desktop-app/src/app/services/peer.service.ts の peer key を指定。
   ※指定する値は別途確認
1. 下記コマンドを実行
   ```
   npx nx run vs-desktop-app:serve
   ```

## ホスティング画像取得用 Credential 取得方法

下記コマンドを実行する

```
npx nx run api-get-credentials:serve
```

## カテゴリ追加方法

### 1. カード情報と画像を取得

1. digimon-card-data-fetch リポジトリの src/constants.ts に新しいカテゴリを追加
1. 新しいカテゴリのカード情報を取得する
   - `$ npx ts-node ./src/colectCardInfo.ts ${CATEGORY}`
1. 新しいカテゴリの画像を取得する
   - `$ npx ts-node ./src/downloadCardImages.ts ${CATEGORY}`

### 2. 画像を S3 にアップロード

1. 手順 1 で取得した画像を S3 にアップロードする。アップロード先は下記
   - https://s3.console.aws.amazon.com/s3/buckets/digimon-card-app?region=ap-northeast-1&prefix=images/

### 3. カード情報をモバイルアプリの assets に追加

1. 手順 1 で取得したカード情報を下記に配置する
   - apps/mobile-app/assets/cardInfo

### 3. モバイルアプリの設定ファイルに追加

1. カードリストデータに新しいカテゴリのカードリストを追加する
   - spotted-seal/apps/mobile-app/src/app/configs/all-card-list.ts
1. カテゴリの定義に新しいカテゴリを追加する
   - apps/mobile-app/src/app/domains/card.ts
     - 定数 CATEGORY に追加
     - convertToDisplayCategoryFromCategory 関数の switch 文に新しい category の case を追加
