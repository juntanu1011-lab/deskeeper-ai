# design.md — Kept ランディングページ(ウェイトリスト)

> **このファイルの使い方:** Claude Design(claude.ai)で新規デザインシステムを作り、このファイルをそのまま投入する。
> 併せて `lp/tokens.json`(数値トークン)とマスコット画像を Brand Assets として追加する。
> 目的は **ウェイトリスト獲得のための1ページLP** を、一貫したデザインシステム付きで組み上げること。
>
> ⚠️ このファイルは `../design/design.md`(アプリ本体・D. Keeper方向)とは **別のデザインシステム**。
> アプリ本体は「冷(青灰)→暖(琥珀)」の二態が核だが、**LPは二態と無関係な独立したマーケティングカラー**を使う
> (2026-07-31 本人指定)。

- 確定日: 2026-07-31
- 実装スタック: **Next.js on Vercel**
- ウェイトリストの保存先: **Supabase**(Route Handler から直接 insert。外部ウェイトリストツール・メール配信サービスは使わない)
- 言語: **英語**(ターゲットが英語圏の学生のため)

---

## 1. 何のプロダクトか(30秒で伝わる説明)

スマホを机に立てかけて自分に向ける → 前面カメラのオンデバイス判定(顔の有無・視線・下向き・持ち上げ)で集中率を測る
→ 終了後に**スコアと勉強時間を焼き込んだ15秒のタイムラプス動画が自動生成され、そのまま TikTok / Instagram に投稿できる。**

**核となる構造:** ユーザーを机に縛りつけたカメラが、そのまま誇りの証拠を吐き出す。
強制の記録と、承認の素材が、物理的に同じ映像である。これが他の集中アプリが持っていないもの。

## 2. LPの読み手

「やらなきゃいけないのにできない」が慢性化している英語圏の学生。
同時に、**その苦しさを"見せる"ことで乗り越えようとする側の人間**(study with me 文化圏に片足を置いている)。

⚠️ **重要:「痛みを抱えている層」と「投稿する層」は別人ではない。同じ人の別の瞬間。**

**狙わない層(コピーを尖らせるために捨てる):** 試験直前の独学者(投稿しない) / 純粋な生産性オタク・社会人(感情が動かない) /
「勉強する人みんな」(最悪の答え。解像度が下がって誰の心にも引っかからなくなる)。

## 3. このLPのゴール

**メールアドレスを1件もらうこと。** それ以外の全ての要素は、この1点への通り道として存在する。

- 訪問者の感情の道筋: 「え、これ何のアプリ?」→「自分の勉強も、こうやって残したい」→「リリースされたら知りたい」
- ⚠️ **「自分の努力が誰にも見えないまま消えていること」への物足りなさ**に触れさせるのがコピーのゴール。好奇心だけでは登録まで至らない。

---

## 4. デザインプリンシプル(判断に迷ったらここから答えを出す)

スローガンではなく**意思決定の道具**。全て「どちらが勝つか」を明記してある。

| # | 優先する | 犠牲にする | 理由 |
|---|---|---|---|
| 1 | **出力動画が主役に見えること** | 機能の網羅的な説明 | 製品の価値は映像。文章で説明するより1枚見せた方が速い |
| 2 | **恥を誇りに変えるトーン** | 危機感を煽ること | 読み手はすでに十分自分を責めている。責めた瞬間に離脱する |
| 3 | **1スクロールで登録できること** | 情報の完全性 | ゴールはメール1件。読み切らせることではない |
| 4 | **正直であること** | 数字による説得力 | まだ実績ゼロ。偽の登録者数・偽レビューは置かない |

### プリンシプルから自動的に出る判断の例

- 「登録者数カウンター(1,247人が登録済み!)を置く?」→ **#4により却下。** 実際まだ0人。「Be one of the first」で誘う
- 「"Stop wasting your life scrolling" みたいな強いコピーは?」→ **#2により却下。** 責める方向のコピーは使わない
- 「全機能を表で比較する?」→ **#3により却下。** LPで説明しきる必要はない
- 「アプリのスクショを10枚並べる?」→ **#1により却下。** 出力動画1つに集中させる

### 絶対にやらないこと

- ❌ **失敗を煽る配色・コピー**(赤の警告色を多用しない)
- ❌ **偽の社会的証明**(登録者数・レビュー・「◯◯で話題」等、実在しないもの)
- ❌ **作者の年齢に触れる**(発信レール(X等)では武器にするが、**LPでは一切触れない**。2026-07-31 決定)
- ❌ ゲーミフィケーションのチープさ(既存の集中アプリが陥っている見た目)
- ❌ 説教くさい・お堅い学習アプリの見た目

---

## 5. カラーシステム

### 5.1 セマンティックトークン

**LPとアプリは同一パレットを共有する(2026-08-02 決定)。** 色相は「ほぼ黒」と「琥珀」の2つだけで、
それ以外はすべてクリームとグレーの間の無彩色。この抑制自体がブランドなので、色を足さないこと。

| トークン | 値 | 名前 | 用途 |
|---|---|---|---|
| `base` | `#0A0C10` | — | ページ全体の下地(アプリ本体と同じ) |
| `panel` | `#12151C` | — | カード・セクションの一段明るい面 |
| `panel2` | `#1A1E27` | — | ネストした面・ホバー時の面 |
| `divider` | `#333944` | — | **装飾的な区切り線のみ**(意味を持たない罫線) |
| `border` | `#5A6473` | — | **意味を持つ境界**(フォーム入力枠・押せるカードの枠) |
| `ink` | `#EDEFF3` | — | 本文の白(完全な白でなくわずかに青寄りのクリーム) |
| `sub` | `#8E96A4` | — | 補助テキスト・ラベル |
| `bright` | `#FFB02E` | Amber | スコアの数字・強調 |
| `cta` | `#FFB02E` | Amber | 主要CTAボタンの塗り |
| `ctaInk` | `#1A1206` | — | **CTAボタンの文字色**(下記5.3の理由により必須) |
| `ctaBorder` | `#FFC661` | — | CTAボタンの枠線(ホバーグローとの境目を保つ) |
| `ctaHover` | `#E08A12` | — | CTAボタンのホバー/押下 |
| `warm` | `#FFB02E` | Amber | `bright` と同一。琥珀は1色しかない |
| `deviceBezel` | `#31353F` → `#1C2028` | — | 端末フレーム(§12) |

### 5.2 コントラスト実測値(WCAG 2.1・実測)

| 組み合わせ | 比 | 判定 |
|---|---|---|
| `ink` on `base` | 17.00 | AAA |
| `bright` on `base` | 10.72 | AAA |
| `sub` on `base` | 6.57 | AA |
| `sub` on `panel` | 6.13 | AA |
| `ctaInk` on `cta`(ボタン文字) | 10.15 | AAA |
| `cta` 塗り vs `base`(UI境界) | 10.72 | 3.0 を大きく上回る |
| `border` vs `base`(UI境界) | 3.27 | 3.0 を満たす |
| `divider` vs `base` | 1.69 | 装飾用途のみ・意図的に低い |

### 5.3 ⚠️ CTAの文字色の制約(必ず守ること)

**明るい琥珀の上にクリーム(`ink`)の文字を置いてはいけない。実測 1.59 で、ほぼ読めない。**

エバーグリーン時代の CTA(Tomato Jam)は「塗りが背景に沈む」のが問題だったが、琥珀では逆転している。
塗りは `base` に対して 10.72 で嫌でも浮くので枠線に頼る必要はない。代わりに**文字側が破綻する。**

**→ 解決策:CTAのラベルには必ず `ctaInk` `#1A1206` を使う(10.15 で AAA)。**
`Button.tsx` の primary は `var(--cta-ink)` を参照している。`--ink` に戻さないこと。

### 5.4 使い方の指針

- **琥珀は2つの用途にだけ使う。**「ユーザーの成果(フォーカススコア)」と「押せるもの」。それ以外の強調は
  クリームの明度差で作る。琥珀をアクセントとして撒くと、CTAが埋もれてスコアの特別さも消える
- **`divider` と `border` を混同しない。** フォーム入力の枠に `divider`(1.69)を使うと入力欄がどこか分からなくなる。
  意味のある境界には必ず `border`(3.27)を使う
- 警告色としての赤は使わない。そもそもパレットに赤が無い
- 背景が黒一色なので、面を重ねるときは `panel` → `panel2` の明度差か、光(§9)で分ける

---

## 6. タイポグラフィ

### 6.1 フォント

| 役割 | フォント | 備考 |
|---|---|---|
| **見出し** | **Bricolage Grotesque**(variable, opsz 12–96) | 個性のある字形で"打ち上げ感"を出す。Google Fonts |
| **本文・UI** | **Inter** | 可読性優先。アプリ本体と共通 |
| **数字** | **Inter Tight**(`tabular-nums`) | **あえて見出しと揃えない。** Bricolage Grotesque は装飾的で桁幅が不揃いになるため、数字だけは実用フォントに残す |

すべて `next/font/google` で読み込む。

### 6.2 タイプスケール

| 名前 | フォント | サイズ(PC / SP) | ウェイト | 行間 | 字間 | 用途 |
|---|---|---|---|---|---|---|
| `display-xl` | Bricolage | 56 / 36 | 900 | 1.05 | -0.02em | Heroの見出し |
| `display-l` | Bricolage | 36 / 28 | 800 | 1.1 | -0.015em | 最終CTAの見出し |
| `display-m` | Bricolage | 34 / 26 | 800 | 1.15 | -0.01em | 各セクションの見出し |
| `display-s` | Bricolage | 18 / 18 | 800 | 1.3 | 0 | カード内の小見出し |
| `body-l` | Inter | 18 / 16 | 500 | 1.6 | 0 | Heroのサブコピー |
| `body-m` | Inter | 16 / 15 | 500 | 1.7 | 0 | セクション本文 |
| `body-s` | Inter | 14.5 / 14 | 500 | 1.65 | 0 | カード内本文・FAQ回答 |
| `body-xs` | Inter | 12.5 / 12 | 500 | 1.5 | 0 | マイクロコピー・注釈 |
| `label` | Inter Tight | 13 / 12 | 900 | 1.2 | 0.08em | セクションのeyebrow(大文字) |
| `badge` | Inter | 12.5 / 12 | 700 | 1.2 | 0.06em | バッジ内(大文字) |

---

## 7. スペーシング

4の倍数を基本に、縦長のスクロールページ用に大きい値を追加:

```
4, 8, 12, 16, 24, 32, 48, 64, 96, 128
```

| 用途 | 値 |
|---|---|
| セクション間の余白(上下) | 96(PC) / 64(SP) |
| Hero上部の余白 | 96 |
| セクション内のブロック間 | 32〜48 |
| カード内パディング | 24(PC) / 20(SP) |
| ページ左右マージン | 24 |
| コンテンツ最大幅 | 1080px |

---

## 8. ボーダー・角丸

| トークン | 値 | 用途 |
|---|---|---|
| `radius.s` | 12px | 小バッジ・タグ |
| `radius.m` | 20px | 小カード |
| `radius.l` | 28px | 主要カード・動画プレビュー枠 |
| `radius.x` | 40px | Hero内の大きい図形 |
| `radius.pill` | 999px | ボタン・フォーム入力・バッジ |

アプリ本体(8/14/20/28)よりひと回り丸みを強くする。ビビッドな配色に合わせて親しみやすさを出す方向。

---

## 9. 影・グロー

暗い下地なので、通常のドロップシャドウはほとんど効かない。**影ではなく「光」で立体感を作る。**

| 名前 | 値 | 用途 |
|---|---|---|
| `glow.hover` | `0 0 0 1px #FFB02E, 0 0 24px -6px rgba(255,176,46,.45)` | ボタン・カードのホバー |
| `glow.focus` | `0 0 0 3px rgba(255,176,46,.35)` | フォーカスリング(キーボード操作時) |
| `shadow.card` | `0 30px 70px -30px rgba(0,0,0,.7)` | 浮かせたい要素のみ |
| `glow.hero` | 中心 `#FFB02E` から透明への放射グラデーション、`opacity .10` | Hero背景の淡い光(装飾) |
| `shadow.device` | `0 40px 90px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.05)` | 端末フレーム(§12)。地と画面が同色なので、細いハイライトで縁を作る |

---

## 10. モーション

| 用途 | 時間 | イージング | 備考 |
|---|---|---|---|
| スクロールで要素が現れる | 500ms | `cubic-bezier(.16,1,.3,1)` | `translateY(16px)→0` + `opacity 0→1`。同一セクション内の要素は70msずつ遅らせる |
| ボタン・カードのホバー | 200ms | `ease-out` | |
| ボタン押下 | 120ms | `ease-out` | |
| FAQアコーディオン開閉 | 300ms | `ease` | |

⚠️ `prefers-reduced-motion: reduce` の場合はスクロール演出を無効化し、要素は最初から表示する。

---

## 11. コンポーネント仕様

### Button / Primary(CTA)
塗り `cta` + **枠線 1px `ctaBorder`**(5.3の理由により必須) + 文字 `ink` / `body-s` 700 / `radius.pill` /
パディング 13px 24px。ホバー: 塗り `ctaHover` + `glow.hover`。

### Button / Ghost
背景透明 + 枠線 1px `border` + 文字 `ink`。ホバー: 枠線と文字が `bright` に。

### Input(メールアドレス)
背景 `panel` + 枠線 1px **`border`**(`divider` ではない) + 文字 `ink` / プレースホルダ `sub` / `radius.pill` /
パディング 14px 20px。フォーカス: `glow.focus`。

### Waitlist Form
`Input` + `Button/Primary` を横並びで1つの pill 型コンテナに収める(PC)。SPでは縦積み。
最大幅 440px。送信後はフォームを差し替えて成功メッセージを表示する(ページ遷移しない)。

### Card / Step
背景 `panel` + 枠線 1px `divider` + `radius.l` + パディング 24px。
中身: 連番(`label`・`warm`)→ 見出し(`display-s`)→ 本文(`body-s`・`sub`)。

### Badge
背景 `rgba(243,223,162,.08)` + 枠線 1px `rgba(243,223,162,.25)` + 文字 `warm` / `badge` / `radius.pill`。

### FAQ Accordion
区切り線 `divider`。質問は `display-s`。開閉アイコンは `+` が45度回転して `×` になる。開いた回答は `body-s` / `sub`。

### Nav
`position: sticky` + `backdrop-filter: blur(10px)` + 背景 `rgba(4,42,43,.75)` + 下線 `divider`。
左にマスコット+ワードマーク、右に `Button/Primary`。

---

## 12. ⚠️ 最重要ルール:アプリ画面には必ず端末フレームを付ける

以前ここには「プロダクト画像だけはLPパレットで塗り替えず、アプリ本体の色を使う」というルールがあった。
**LPとアプリが同一パレットになった今、その心配は消えたが、代わりに別の問題が生まれている。**

**ページの地とアプリ画面が同じ `#0A0C10` なので、素のカードとして置くと画面が背景に溶けて消える。**
実際に検証したところ、スコアの数字がページ上に浮いているだけに見え、「これはアプリの画面だ」という
情報が完全に失われた。エバーグリーン時代は地が緑だったので、黒い端末が勝手に輪郭を持っていただけだった。

**→ 解決策:`ScoreCard` は必ず以下を持つこと。**

| 要素 | 役割 |
|---|---|
| チタン風リム(`deviceBezel` のグラデーション+インセットハイライト)+黒いガラス縁 | 輪郭そのもの。これが無いと成立しない |
| サイドボタン(左: アクション+音量2つ / 右: 電源) | 「本物の端末」に見せる記号 |
| ステータスバー(9:41 / Dynamic Island+カメラレンズ / 電波・バッテリー) | 「スマホの画面」だと一目で分かる記号 |
| ホームインジケーター | 同上 |
| `shadow.device` | 地から浮かせる |
| スコア背後の琥珀のラジアル(上部18%あたりが中心) | 一灯光源。影を使わずに奥行きを作る |

画面は **iPhone の論理解像度 390×844(19.5:9)で組んで transform で縮小**する。
9:16 で直接組むと寸詰まりの古い端末に見える(2026-08-03 に修正済み)。

**掃除のつもりでベゼルを剥がさないこと。** 地が暗いうちは、これがプロダクトの見せ場を成立させている唯一の仕掛け。

キャプションは "Actual app colors"(実際のアプリの色です)から
**"This card gets burned into your video."** に変更済み。ページ全体がアプリと同じ色になった以上、
前者は何も言っていない。

---

## 13. マスコット(ミーアキャット)

LPでも**アプリ本体と完全に同じ配色**を使う(LPパレットで塗り替えない)。

| 部位 | 値 |
|---|---|
| 体毛 | `#C9A574` サンディタン |
| お腹・あご | `#EDE0C8` クリーム |
| アイパッチ | `#3D2C22` |
| 鼻 | `#1A1512` |
| 手足・尻尾の先 | `#4A3527` |

- 絵柄: 立体(ソフトな3Dレンダー調)を主役に、極小サイズ(ナビ・フッターの約20px)ではフラットのシルエット版
- 登場箇所: ナビの左端 / Heroのバッジ内 / フッター。**ページ内で多用しない**(3〜4箇所まで)
- 性格: 「見下さない厳しさ」。LPのコピーでもこのトーンを守る(責めない・皮肉を言わない)

---

## 14. ページ構成とコピー(英語・確定ドラフト)

### 14.1 Nav
- 左: マスコット + `Kept`
- 右: `Join the Waitlist`(Button/Primary)

### 14.2 Hero
- Badge: `Launching soon — iOS first`
- 見出し(`display-xl`): **Put your phone down. Get watched. Get proof.**
  - 「watched」だけ `bright` で色を変える
- サブ(`body-l`・`sub`): Kept turns your phone into a camera that watches you study — then hands you back a video worth posting.
- Waitlist Form(プレースホルダ `your@email.com` / ボタン `Notify me`)
- マイクロコピー(`body-xs`・`sub`): No spam. One email when we launch. That's it.

### 14.3 The problem
- Eyebrow: `THE PROBLEM`
- 見出し(`display-m`): **You know the feeling.**
- 本文(`body-m`): You sit down to study. Ten minutes later you're back on your phone. Not because you don't care — you just... slip. Every focus app tells you a number. None of them give you something you'd actually want to show someone.
- ⚠️ **この段落がプリンシプル#2の試金石。** 責めずに、読み手が自分で思い当たる形にする

### 14.4 How it works(4ステップ)
戦略ドキュメントのゴールライン **「立てかける → 縛られる → 証拠が残る → 投稿する」** をそのまま4枚のカードにする。

| # | 見出し | 本文 |
|---|---|---|
| 01 | Prop it up | Lean your phone against something on your desk, facing you. |
| 02 | Get locked in | The camera watches. Reach for your phone and it notices — you can't hide it from yourself anymore. |
| 03 | Get proof | When you're done, a video appears: your focus score, your time, stitched into 15 seconds. |
| 04 | Post it | Share it like any other study-with-me video. Except this one's real. |

### 14.5 What comes out(出力動画ショーケース)
- Eyebrow: `WHAT COMES OUT`
- 見出し(`display-m`): **See what you get at the end.**
- 本文(`body-m`): Everything runs on your device — nothing is ever uploaded. Faces are blurred or replaced with an emoji by default. What's left is a score, a time, and proof you sat there and did it.
- 右側に **実機フレーム付きのスコア画面**(§12の通り)。中身は `/score-lab` の有力案 D2c を反映:
  マスコット+`Kept` / `Focus score 87` / 折れ線の集中トレース(`4 breaks`) / `2h 14m · Math` / proud マスコット / `Make it a video →`
- 注釈(`body-xs`): This card gets burned into your video.

### 14.6 Waitlist(メインCTA)
- 背景を `panel` → `base` のグラデーションにして、上下に `divider` の線を入れてセクションを際立たせる
- Eyebrow: `GET IN EARLY`
- 見出し(`display-l`): **Be one of the first to try it.**
- 本文(`body-m`): We're finishing up before launch. Join the waitlist and we'll email you the moment it's ready.
- Waitlist Form(ボタン `Join the Waitlist`)
- ⚠️ **登録者数カウンターは置かない**(プリンシプル#4)

### 14.7 FAQ
| 質問 | 回答 |
|---|---|
| When does it launch? | We're targeting mid-August 2026. iOS first — Android after that. |
| Do I have to show my face? | No. By default, faces are blurred or replaced with an emoji in every video. All detection happens on your device — nothing is ever uploaded anywhere. |
| Is it free? | Yes — one session a day, with a watermark on the video. Pro removes the daily limit and shrinks the watermark. |
| What if I can't prop my phone up somewhere? | There's a Simple Mode — no camera, just a timer. You still get a video, just without the footage: a focus graph instead. |

### 14.8 Footer
マスコット + `Kept` / リンク: `X / Twitter`・`Privacy`

---

## 15. レスポンシブ

| ブレークポイント | 挙動 |
|---|---|
| ≥ 900px | 4ステップは横4列。ショーケースは左右2カラム |
| 520–900px | 4ステップは2×2。ショーケースは縦積み |
| < 560px | Heroの見出しの文単位の強制改行を解除し、自然に流す(下記) |
| < 520px | 全て1カラム。Waitlist Form は縦積み。`display-xl` は 36px |

**Heroの見出しについて。** コピーは3つの短い文なので、ブラウザ任せの折り返しにすると
`Get` が行末に取り残されて不揃いになる。`.dk-hero-line` で文単位のブロックに分け、

```
Put your phone down.
Get watched. Get proof.
```

の2行に固定している(20文字と23文字でほぼ釣り合う)。
560px 未満では1文が1行に収まらず、今度は `down.` `proof.` が単独行に残るので、
メディアクエリで `display: inline` に戻して自然な折り返しに委ねている。

`display-xl` は `clamp(36px, 6.2vw, 88px)`。以前は最大132pxだったが、コンテナ幅に対して大きすぎて
**1行に14文字しか入らず、文の途中で折り返す以外に選択肢が無い状態**だった。88pxが上限なのは、
最も広い画面でも `Get watched. Get proof.` が1行に収まる余裕を残すため。

---

## 16. Claude Design への依頼文(このまま貼ってよい)

> 上記の design.md をもとに、Kept というアプリのウェイトリスト獲得用ランディングページを1ページで作ってください。
> ほぼ黒(#0A0C10)の地に、琥珀(#FFB02E)だけが色として効く2色構成です。琥珀は「フォーカススコア」と
> 「押せるもの」にだけ使い、それ以外の強調はクリームの明度差で作ってください。
> §5.3 の制約(CTAボタンの文字は #1A1206。クリームだとコントラスト1.59で読めない)と、
> §12 のルール(アプリ画面には必ず端末フレーム・ステータスバー・ホームインジケーターを付ける。
> 地と画面が同色なので、これが無いと画面が背景に溶ける)は必ず守ってください。
> §14 のセクション順とコピーをそのまま使い、§11 のコンポーネント仕様に沿ってボタン・フォーム・カード・アコーディオンを作ってください。
> 見出しは Bricolage Grotesque、本文は Inter、数字は Inter Tight です。
> 偽の登録者数や偽のレビューは絶対に置かないでください(まだ実績がゼロのため)。

---

## 17. 未確定 / 次のステップ

- [x] 配色の決定(黒 + 琥珀。2026-08-02)
- [x] Next.js プロジェクト初期化(`web/`)
- [x] Heroの折り返しの修正
- [ ] スコア画面のレイアウト比較(数字ドーン / 円形ゲージ / ランク / 波形)→ コメントの置き場所が未決。
      LPの `ScoreCard` は有力案 **D2c(折れ線トレース+マスコット・コメント無し)** を先行反映済み(2026-08-03)。
      最終決定が変わったら `ScoreCard` を追従させる
- [ ] `mascot-proud.png` を `web/public/mascot/` に配置(送信成功ステートが現状404)
- [x] Supabase プロジェクトの新規作成 + `waitlist` テーブル(2026-08-02。ref `bwjhqbmoljnwpbbwmhut`、東京。
      RLS有効・ポリシー無しで、書き込みは service role 経由の `/api/waitlist` のみ。マイグレーションは `supabase/migrations/`)
- [x] Supabase接続 → フォーム送信の実装(登録200 / 不正メール400 / 重複200 をE2Eで確認済み)
- [ ] OG画像(SNSシェア時のプレビュー)
- [x] 独自ドメイン(2026-08-03。`kept.study` を Vercel で取得 → Vercelプロジェクト `kept`(旧 `deskeeper`)に接続。
      更新 $55/年・2027-08-03 期限。`www.kept.study` も同プロジェクトに紐付け済みで、
      apexへの308リダイレクトは `web/next.config.mjs` の host マッチで持つ。
      本番環境変数 `NEXT_PUBLIC_SITE_URL=https://kept.study` を設定済み — `app/layout.tsx` の
      `metadataBase` がこれを見るので、**消すと og:image が localhost 絶対URLに落ちる**)
- [x] デプロイの自動化(2026-08-03。GitHub `juntanu1011-lab/deskeeper-ai` を Vercel プロジェクト `kept` に接続。
      **`main` への push = 本番公開**、それ以外のブランチは push でプレビューURLが出る)

### デプロイの構成(触る前に読むこと)

Next.jsアプリは `web/` にあり、リポジトリ直下に `package.json` は無い。
そのため Vercel 側の **Root Directory は `web`** に設定してある。ここが噛み合っていないとビルドが落ちる:

- `.vercel/`(プロジェクトリンク)は**リポジトリ直下**に置く。`web/` 側には置かない
- 手動デプロイする場合も**リポジトリ直下**で `vercel --prod`。`web/` から叩くと Root Directory が二重に適用されて `web/web` を探しに行く
- Vercelの環境変数は **Production にしか登録していない**。`vercel env pull` で `.env.local` を上書きすると
  Supabaseのキーが消えてローカルのフォーム送信が壊れる(2026-08-03 に踏みかけた)

**実装の正は `web/` のコード。** このドキュメントは意図と制約を残すためのもので、
値が食い違ったらコードを信じること(§5の実測値は 2026-08-02 に `web/app/styles/tokens/` から測り直した)。

**参考:** `lp/mock/index.html` に手組みのラフがあるが、配色が旧パレット(エバーグリーン)のままなので、
色の参考にはしないこと。
