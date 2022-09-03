# Vite + Vue.js + TypeScript アプリ開発

## 環境構築

1. Node.js のインストール  
   https://nodejs.org/ja/

   ```
   node --version
   npm install -g npm
   npm --version
   ```

1. Yarn のインストール
   ```
   npm install -g yarn
   yarn --version
   ```

## プロジェクト作成

1. ソース生成

   ```
   yarn create vite vue-ts-minesweeper --template vue-ts
   cd vue-ts-minesweeper
   ```

1. Git リポジトリも作っておく
   ```
   git init
   git add .
   git commit -m "initial import"
   ```

## 開発の流れ

1. アプリ起動

   ```
   yarn dev
   ```

   サーバが起動して  
   http://localhost:5173/  
   といった URL が表示されるのでブラウザから開くとアプリが動かせる

1. 起動した状態のままソースを追加・変更すると自動でブラウザに反映される

1. 停止  
   Ctrl+C

1. ビルド

   ```
   yarn build
   ```

   `dist`フォルダにビルド結果の index.html などが生成される

1. Github Pages にデプロイ
   ```
   yarn deploy
   ```

## VSCode の設定

※詳細は README.md を参照

### Volar (.vue の型チェック)

1. VSCode の拡張機能で「Volar」をインストール

1. Take Over Mode の有効化  
   VSCode の拡張機能で 「@builtin typescript」と検索し、  
   「TypeScript and JavaScript Languate Features」を右クリックして  
   「Disable(Workspace)」を選択

### eslint (JavaScript コードチェッカー)

※コードが最新の TypeScript や Vue のお作法に沿って書かれているかチェックしてくれる

1. `eslint` を開発用パッケージに追加

   ```
   > yarn add --dev eslint
   > yarn eslint --version
   v8.21.0
   ```

1. `.eslintrc.yml` を生成

   ```
   > yarn eslint --init
   ✔ How would you like to use ESLint? · style
   ✔ What type of modules does your project use? · esm
   ✔ Which framework does your project use? · vue
   ✔ Does your project use TypeScript? · Yes
   ✔ Where does your code run? · browser
   ✔ How would you like to define a style for your project? · guide
   ✔ Which style guide do you want to follow? · airbnb
   ✔ What format do you want your config file to be in? · YAML
   Checking peerDependencies of eslint-config-airbnb-base@latest
   The config that you've selected requires the following dependencies:

   eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
   ✔ Would you like to install them now? · Yes
   ✔ Which package manager do you want to use? · yarn
   ```

   - Vue CLI でプロジェクトを生成すると`.eslintrc.js`ができるそうなので  
     Vue の開発では`.eslintrc.js`が使われていることが多いが  
     TypeScript と JavaScript を両方扱う設定がややこしいので今回は YAML にした  
     JavaScript にすると中にロジックを書いて複雑な設定ができる

1. `.eslintrc.yml` 内のチェックに使用するルールセットを変更

   ```
   parser: 'vue-eslint-parser' # 書かなくても勝手に組み込まれるようだが、明示的に入れておく
   parserOptions:
     parser: '@typescript-eslint/parser' # 上と似たような設定で混乱するが、こちらはvue-eslint-parserの設定という扱い
   extends:
     - eslint:recommended
     - plugin:@typescript-eslint/recommended
     - airbnb-base
     - airbnb-typescript/base
     - plugin:vue/vue3-recommended
     - '@vue/typescript/recommended'
   ```

1. ここで `yarn eslint .` を実行するといくつかエラーが出るので対応していく

   1. 足りないパッケージを追加

      ```
      yarn add --dev eslint-config-airbnb-typescript
      yarn add --dev @vue/eslint-config-typescript @rushstack/eslint-patch
      ```

   1. `.eslintrc.yml` に `parserOptions.project` を追加

      ```
      parserOptions:
        ... ,
        project: './tsconfig.json'
      ```

   1. `tsconfig.json` の `include` に `./vite.config.ts` を追加
      ```
      "include": [
        ... ,
        "./vite.config.ts"
      ],
      ```

1. `package.json` の `scripts` にコマンド追加

   ```
   "lint": "yarn eslint --ext .ts,.tsx,.vue --ignore-path .gitignore ."
   ```

   - デフォルトでは `.vue` がチェック対象にならないので拡張子の指定が必要
   - `dist` フォルダなどをチェック対象から除外

1. `yarn lint` でコードチェック、  
   　　`yarn lint --fix` でコード修正が行われるようになる

1. VSCode の拡張機能で「ESLint」をインストール

   1. エディタでソースを開くとコードチェックエラーが「問題」タブに出てくるようになる

   1. `.vscode/settings.json` に以下の設定をするとソース保存時に自動で修正される
      ```
      {
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true,
        }
      }
      ```

### Prettier （コードフォーマッター） の導入

コードをいい感じに整形してくれる

1. パッケージ追加

   ```
   yarn add --dev prettier eslint-plugin-prettier @vue/eslint-config-prettier
   ```

   - prettier 本体
   - eslint のルールで prettier と競合するものを無効化

   ```
   yarn add --dev stylelint-config-prettier
   ```

   - stylelint のルールで prettier と競合するものを無効化

1. `.prettierrc.yml` を作成

   ```
   singleQuote: true
   semi: false
   vueIndentScriptAndStyle: true
   ```

1. `.eslintrc.yml` の設定追加

   ```
   extends:
     ...
     - prettier
   ```

1. `.stylelintrc.yml` の設定追加

   ```
   extends:
     ...
     - stylelint-config-prettier
   ```

1. 一括フォーマットするコマンド

   ```
   yarn prettier --write --ignore-path .gitignore .
   ```

1. VSCode の拡張機能で「Prettier」をインストール

1. `.vscode/settings.json` の設定追加

   ```
   // ESLint拡張機能のフォーマットを無効化
   "eslint.format.enable": false,
   // 保存時にPrettierによる整形を行う
   "editor.formatOnSave": true,
   "[javascript]": {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
   },
   "[typescript]": {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
   },
   "[vue]": {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
   },
   ```

## CSS 環境

### Tailwind CSS (CSS ライブラリ) の導入

https://tailwindcss.com/docs/guides/vite

1. パッケージ追加〜初期化

   ```
   yarn add --dev tailwindcss@latest postcss@latest autoprefixer@latest
   npx tailwindcss init -p
   ```

   - `tailwind.config.cjs` と `postcss.config.cjs` が生成される

1. 追加された `*.cjs` が eslint の対象となっておらずエラーが出るので対応

   - `tsconfig.eslint.json` を追加

   ```
   {
    　"extends": "./tsconfig.json",
    　"include": [
    　   "./*.cjs"
    　]
   }
   ```

   - `.eslintrc.yml` のプロジェクトを修正

   ```
   parserOptions:
     ...
     project: './tsconfig.eslint.json'
   ```

1. `tailwind.config.cjs` にパスを追加

   ```
   module.exports = {
     content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
     ],
     ...
   }
   ```

1. tailwind の読込み設定

   - `src/index.css` を作成

   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   - `src/main.ts` から `src/index.css`の読み込み

   ```src/main.ts
   ...
   import './index.css'
   ...
   ```

1. css を適用してみる

   - とりあえず `index.html` にダークモード用のスタイルを適用

   ```
   <body class="dark:bg-black dark:text-white">
   ```

1. VSCode の拡張機能「Tailwind CSS IntelliSense」を入れておくと便利

1. prettier-plugin-tailwindcss の導入
   - class の並び順をソートしてくれる  
     ずらずら並ぶのはそのまま
   ```
   yarn add --dev prettier-plugin-tailwindcss
   ```

### srylelint (CSS コードチェッカー) の導入

1. パッケージ追加

   ```
   yarn add --dev stylelint stylelint-config-standard
   yarn add --dev postcss-html stylelint-config-recommended-vue
   yarn stylelint --version
   ```

1. `.stylelintrc.yml` を作成

   ```
   extends:
     - stylelint-config-recommended-vue
     - stylelint-config-standard
   ```

1. `package.json` にコマンド追加

   ```
   "scripts": {
     ...
     "lint:style": "yarn stylelint src/**/*.{css,vue}"
   },
   ```

1. 動作確認

   ```
   yarn lint:style
   ```

1. VSCode の拡張機能で「Stylelint」をインストール

1. `.vscode/settings.json` を変更
   ```
   {
     "editor.codeActionsOnSave": {
         "source.fixAll.eslint": true,
         "source.fixAll.stylelint": true,
     },
     "css.validate": false,
     "stylelint.validate": [
       "css",
       "vue"
     ],
   }
   ```
   - エディタで保存時に eslint と style のエラーを自動修正
   - VSCode 本体の css チェックは内容がかぶるので無効化
   - デフォルトでは`.vue`がチェックされないのでチェク対象に追加

### Font Awesome (アイコンライブラリ) の導入

https://fontawesome.com/docs/web/use-with/vue/

```
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/vue-fontawesome@latest-3
```

## デプロイの設定

1. GitHub にリポジトリを作りソースを登録

1. GitHub Pages の設定

   - ※public リポジトリは無料で使えるが、private リポジトリは有料
   - リポジトリの 「Settings > Pages」
     - Source: Deploy from a branch
     - Branch: gh-pages を選んで Save
   - 一度抜けて戻ってくると公開先の URL が表示されている

1. プロジェクトの設定
   - `gh-pages` パッケージを追加
     ```
     yarn add --dev gh-pages
     ```
   - `vite.config.ts` の修正  
     アセットへのリンクを相対パスにする
     ```
     export default defineConfig({
       ...,
       base: '',
     })
     ```
   - `package.json` にコマンド追加
     ```
     "scripts": {
       ...
       "deploy": "gh-pages -d dist"
     },
     ```
1. ビルドしてからデプロイする
   ```
   yarn build
   yarn deploy
   ```
