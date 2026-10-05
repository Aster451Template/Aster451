# Aster451

**Accessible Styling & Techniques for Expressive Representation Web-Template - 451 Standard**

Aster451 は、Webページにおける**読みやすさ、親しみやすさ、落ち着いた配色、適切な余白、レスポンシブなレイアウト**をまとめた CSS テーマおよび JavaScript テンプレートです。

特別なデザイン知識がなくても、HTML の標準的な要素と Aster451 のクラスを組み合わせることで、統一されたWebページを構築できます。

## Concept

Aster451 は、紙媒体が持つ読みやすさや親しみやすさを、現代のWebページ向けのスタイルとして再構成することを目的としています。

名称に含まれる **451** は、Ray Bradbury の *Fahrenheit 451* に登場する「紙」というモチーフに由来します。

ただし、Aster451 は紙そのものをWeb上で再現することを目的としていません。

紙媒体から感じられる

* 読みやすい文字組み
* 落ち着いた配色
* 適切な余白
* 情報を追いやすいレイアウト
* 親しみやすい文書構造

といった特徴を、現代的なWebデザインへ置き換えることを目指しています。

---

## Features

Aster451 は、以下のような要素を提供します。

### Typography

標準の見出しや本文に加えて、用途に応じたフォントクラスを用意しています。

* **Zen Old Mincho**: 見出し・本文
* **Noto Sans JP**: ゴシック体
* **IBM Plex Mono**: 等幅フォント

```html
<p class="main-font">
    明朝体のテキスト
</p>

<p class="gothic-font">
    ゴシック体のテキスト
</p>

<p class="monotype-font">
    Monospace text 0123
</p>
```

### Responsive Layout

画面幅に応じてレイアウトが変化する構成を想定しています。

カードや画像ギャラリーなど、複数の要素を並べるコンポーネントもレスポンシブに利用できます。

### Theme Colors

Aster451 では、以下のテーマカラーを CSS カスタムプロパティとして定義しています。

| 名前 | CSS変数 | 値 |
| --------------- | -------------------------------- | --------- |
| Midnight Indigo | `--first-color` | `#29274c` |
| Aster Violet | `--second-color` | `#7e52a0` |
| Dusty Lilac | `--third-color` | `#94849B` |
| Paper White | `--background-color` | `#f1f1f1` |
| Forest Ink | `--text-color` | `#091e05` |
| Mist Blue | `--blockquote-code-color` | `#DBE4EE` |
| Light Ash | `--blockquote-code-border-color` | `#CDCDCD` |
| Moss | `--success-color` | `#2f6b3a` |
| Amber Brown | `--warning-color` | `#8a5a00` |
| Garnet | `--danger-color` | `#9b2c3c` |

テーマカラーを CSS 変数として扱うため、独自の配色へ変更することもできます。

---

## Installation

Aster451 は `aster451.css` と `aster451.js` を読み込んで使用します。

### CSS

```html
<link rel="stylesheet" href="./aster451.css">
```

### JavaScript

```html
<script src="./aster451.js" defer></script>
```

JavaScript を使用しない構成であれば、CSS のみを読み込んで利用することもできます。

---

## Basic Usage

最小構成では、以下のように Aster451 を読み込めます。

```html
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Aster451</title>

    <link rel="stylesheet" href="./aster451.css">
    <script src="./aster451.js" defer></script>
</head>

<body>

    <main>
        <h1>Aster451</h1>

        <p>
            Aster451 を使用したWebページです。
        </p>
    </main>

</body>

</html>
```

CSS は HTML の `<link>` だけでなく、CSS の `@import` から読み込むこともできます。

```css
@import url('./aster451.css');
```

---

# Components

## Headings

HTML 標準の `h1` から `h6` までを利用できます。

```html
<h1>First Title</h1>
<h2>Second Title</h2>
<h3>Third Title</h3>
<h4>Fourth Title</h4>
<h5>Fifth Title</h5>
<h6>Sixth Title</h6>
```

---

## Horizontal Rule

`hr` を使用してセクションを区切れます。

```html
<hr>
```

Aster451 のドキュメントページ自体も、この方法で各セクションを区切っています。

---

## Tabs

タブ表示には以下の構造を使用します。

```html
<div class="tabview-navset">

    <ul class="tabview-nav" role="tablist">

        <li>
            <a>タブ1</a>
        </li>

        <li>
            <a>タブ2</a>
        </li>

        <li>
            <a>タブ3</a>
        </li>

    </ul>

    <div class="tabview-content">

        <div>
            タブ1の内容です。
        </div>

        <div>
            タブ2の内容です。
        </div>

        <div>
            タブ3の内容です。
        </div>

    </div>

</div>
```

`aster451.js` がタブの切り替えを処理します。

---

## Blockquote

引用には `.blockquote` を使用できます。

```html
<blockquote class="blockquote">
    This is a blockquote.
</blockquote>
```

ネストした引用にも対応しています。

```html
<blockquote class="blockquote">

    This is a blockquote.

    <blockquote class="blockquote">
        Nested blockquote.
    </blockquote>

</blockquote>
```

---

## Code

コードや等幅で表示したい内容には `.blockquote-code` を使用できます。

```html
<code class="blockquote-code">
    This is a code block.
</code>
```

複数行のコードには `pre` と `code` を組み合わせます。

```html
<pre class="blockquote-code"><code>
const example = "Aster451";
</code></pre>
```

---

## Tables

テーブルは `.table-wrap` で囲むことで、横幅が限られた環境でも扱いやすくできます。

```html
<div class="table-wrap">

    <table>

        <thead>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Aster</td>
                <td>451</td>
            </tr>
        </tbody>

    </table>

</div>
```

---

## Buttons

基本ボタンには `.button` を使用します。

```html
<button class="button">
    Primary
</button>
```

アウトライン表示には `.button-outline` を追加します。

```html
<button class="button button-outline">
    Outline
</button>
```

通常の HTML の `disabled` 属性にも対応します。

```html
<button class="button" disabled>
    Disabled
</button>
```

---

## Cards

カードは `.card` を使用します。

複数のカードを `.grid` に入れることで、幅に応じて配置できます。

```html
<div class="grid">

    <article class="card">
        <h3>カード1</h3>
        <p>カードの内容です。</p>
    </article>

    <article class="card">
        <h3>カード2</h3>
        <p>カードの内容です。</p>
    </article>

</div>
```

---

## Alerts

通知には `.alert` と状態を表すクラスを組み合わせます。

### Information

```html
<div class="alert alert-info" role="status">
    <strong>お知らせ:</strong>
    情報を伝えます。
</div>
```

### Success

```html
<div class="alert alert-success" role="status">
    <strong>成功:</strong>
    保存しました。
</div>
```

### Warning

```html
<div class="alert alert-warning" role="alert">
    <strong>注意:</strong>
    内容を確認してください。
</div>
```

### Danger

```html
<div class="alert alert-danger" role="alert">
    <strong>エラー:</strong>
    保存に失敗しました。
</div>
```

---

## Details / Accordion

HTML 標準の `<details>` と `<summary>` をそのまま利用できます。

```html
<details>

    <summary>
        開閉できる項目
    </summary>

    <p>
        詳細な内容です。
    </p>

</details>
```

JavaScript に依存せず、HTML の標準機能を利用できます。

---

# Boxes

Aster451 には3種類の囲みボックスがあります。

## Note

補足や注意など、通常の情報を表示するためのボックスです。

```html
<div class="box box-note">

    <div class="box-title">
        ノート
    </div>

    <div class="box-body">
        <p>
            補足や注意を書く囲みです。
        </p>
    </div>

</div>
```

## Memo

短いメモや補足を表示するための破線のボックスです。

```html
<div class="box box-memo">

    <div class="box-title">
        メモ
    </div>

    <div class="box-body">
        <p>
            ひとこと添えるときに使用します。
        </p>
    </div>

</div>
```

## File

資料や記録のような情報を表示するためのボックスです。

```html
<div class="box box-file">

    <div class="box-title">
        FILE No. 451
    </div>

    <div class="box-body">
        <p>
            資料や記録のように表示します。
        </p>
    </div>

</div>
```

---

# Images

## Figure

画像には `figure` と `figcaption` を使用できます。

```html
<figure class="figure">

    <img
        src="./image.jpg"
        alt="画像の説明"
        width="400"
        height="300"
        loading="lazy"
    >

    <figcaption>
        図1: 画像の説明
    </figcaption>

</figure>
```

## Right-aligned Image

`.figure-right` を追加すると、画像を右側に配置し、本文を回り込ませることができます。

```html
<figure class="figure figure-right">

    <img
        src="./image.jpg"
        alt="画像の説明"
        width="400"
        height="300"
    >

    <figcaption>
        右寄せ
    </figcaption>

</figure>
```

## Gallery

複数の画像を `.gallery` にまとめて表示できます。

```html
<div class="gallery">

    <figure class="figure">
        <img src="./image-a.jpg" alt="画像A">
        <figcaption>A</figcaption>
    </figure>

    <figure class="figure">
        <img src="./image-b.jpg" alt="画像B">
        <figcaption>B</figcaption>
    </figure>

    <figure class="figure">
        <img src="./image-c.jpg" alt="画像C">
        <figcaption>C</figcaption>
    </figure>

</div>
```

---

# Local Image Preview

`aster451.js` には、`input type="file"` で選択した画像をブラウザ上でプレビューする機能があります。

```html
<input
    type="file"
    id="img-test"
    accept="image/*"
>

<figure class="figure">

    <img
        id="img-preview"
        alt="プレビュー"
        width="400"
        height="300"
    >

    <figcaption id="img-caption">
        未選択
    </figcaption>

</figure>
```

選択した画像はブラウザ上で表示されます。

このプレビュー処理では、画像ファイルをサーバーへ送信する処理は行いません。

---

# Header and Navigation

Aster451 には、ページ上部のヘッダーとハンバーガーメニューの構成が用意されています。

```html
<header>

    <button
        class="menu-button"
        type="button"
        aria-label="メニューを開く"
        aria-expanded="false"
        aria-controls="drawer"
    >
        <span></span>
        <span></span>
        <span></span>
    </button>

    <h1>
        Aster451
    </h1>

</header>

<div class="backdrop" id="backdrop"></div>

<nav
    class="drawer"
    id="drawer"
    aria-label="メニュー"
>

    <h2 class="drawer-title">
        メニュー
    </h2>

    <ul>
        <li>
            <a href="#about">
                About
            </a>
        </li>

        <li>
            <a href="#components">
                Components
            </a>
        </li>
    </ul>

</nav>
```

メニューの開閉、背景クリック、Escape キーなどの操作は `aster451.js` が処理します。

---

# Accessibility

Aster451 は、可能な範囲で標準的なHTML要素とARIA属性を利用する構成になっています。

例えば、ハンバーガーメニューでは以下の属性を使用しています。

```html
aria-label="メニューを開く"
aria-expanded="false"
aria-controls="drawer"
```

タブでは、

```html
role="tablist"
```

通知では、

```html
role="status"
```

や

```html
role="alert"
```

を使用しています。

また、ページ先頭には本文へ直接移動するためのスキップリンクを配置できます。

```html
<a class="skip-link" href="#content">
    本文へスキップ
</a>
```

Aster451 はアクセシビリティを考慮した構造を提供しますが、実際のアクセシビリティは使用するHTML、文章、画像の `alt` 属性、ARIA属性などにも依存します。

---

# JavaScript

Aster451 の JavaScript は `aster451.js` に分離されています。

主に以下の機能を担当します。

* タブの切り替え
* タブのキーボード操作
* ハンバーガーメニュー
* メニューの開閉状態の管理
* 背景クリックによるメニューの閉鎖
* Escape キーによるメニューの閉鎖
* ローカル画像のプレビュー

CSS と JavaScript を分離することで、HTML 側から必要なファイルを読み込むだけで利用できる構成になっています。

---

# Project Structure

基本的な構成は以下を想定しています。

```text
Aster451/
├── index.html
├── aster451.css
├── aster451.js
└── docs/
    ├── index.html
    └── ...
```

`aster451.css` がスタイル、`aster451.js` がインタラクションを担当します。

---

# Browser Usage

Aster451 は通常の静的HTMLページで利用できます。

そのため、特別なビルドシステムやJavaScriptフレームワークを必要としません。

例えば以下のような環境で利用できます。

* GitHub Pages
* Cloudflare Pages
* その他の静的Webホスティング
* 通常のWebサーバー
* ローカルのHTML環境

ただし、JavaScript の `fetch()` を使用して外部ファイルを読み込む機能などでは、ブラウザのセキュリティ制約により、単純な `file://` での実行とWebサーバー上での実行で挙動が異なる場合があります。

---

# Documentation

Aster451 の実際のコンポーネントや使用例については、Aster451 Template のドキュメントを参照してください。

ドキュメントでは、以下の内容を実際に表示しながら確認できます。

* テーマカラー
* フォント
* 見出し
* タブ
* 引用
* コード
* テーブル
* ボタン
* カード
* 通知
* アコーディオン
* 囲みボックス
* 画像
* ギャラリー
* ローカル画像プレビュー
* ヘッダー
* ハンバーガーメニュー

---

# License

Aster451 は、個人利用・商用利用を問わず無料で使用できます。

ライセンスの詳細については、リポジトリに含まれる `LICENSE` ファイルを確認してください。

---

# Credits

Aster451 は、読みやすく扱いやすいWebページの基礎スタイルを提供することを目的として開発されています。

名称の **Aster** は植物の Aster（シオン属など）の名称にも由来し、テーマカラーの **Aster Violet** にも反映されています。

**451** は *Fahrenheit 451* に由来します。

Aster451 は紙を再現するテーマではありません。

**紙が持つ読みやすさを、Webのために再構成する。**

それが Aster451 の基本的な考え方です。
