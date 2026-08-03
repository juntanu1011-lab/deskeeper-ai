# LP改善プラン(kept.study)— 2026-08-04

> 対象: `web/` の待機リストLP。公開中の kept.study。
> 前提: プライバシーページ/フッターリンクは別途対応中。**課金・価格・ペイウォール文言は別セッション所管のため本プランでは触らない**。
> 顔ぼかしはv1から入る方針が確定したため、LPの「Faces covered by default」は**修正不要**(2026-08-04 確認済み)。

---

## 0. 吟味の結果 — やらないことを先に決める

先に挙げた候補のうち、以下は**費用対効果が立たないので落とす**。理由を残しておかないと、後で誰かが「やり忘れ」として拾い直すため。

| 落とすもの | 落とす理由 |
|---|---|
| FAQPage の JSON-LD | 流入はTikTok / Reels / X / Reddit。検索流入は想定していないし、ドメインの被リンクもゼロ。ローンチまで2週間で検索評価が育つ余地もない。**リターンが実質ゼロ** |
| `robots.txt` / `sitemap.xml` | 2ページのサイト。robots.txt が無い = 全許可なので現状と何も変わらない。sitemap も同様に意味がない |
| `canonical` タグ | 重複ホストの実害は `www → apex` の308が既に潰している(動作確認済み)。UTM付きURLの重複インデックスは、検索を集客チャネルにしていない以上、実害にならない |
| JSなしで白紙になる件 | `Reveal` には2.5秒の強制表示フォールバックが既にある。残る「JSが一切実行されない」ケースは稀で、対策コストに見合わない。**既知リスクとして受容** |
| 利用規約ページ | 自動更新サブスクとセットの話。**課金セッション側の所管**に移す |
| スコア算出方法のFAQ | まだ誰もスコアを持っていない。ローンチ後のFAQであって、待機リストLPのFAQではない |
| バッテリー消費のFAQ | 「2時間充電しながら」以上の良い答えが今は無い。**答えの弱い反論を自分から提示するのは純粋にマイナス** |

---

## 1. やること

### A. モバイルでメール入力欄が潰れる ★最優先 — ✅ 実装済み(2026-08-04)

**現象(実測ベースの算出)**

`lp/design.md` は「Input + Primary を1つのpillに横並び、**520px未満ではstacked**」と規定している。
`WaitlistForm` には `stacked` prop があるが、**`LandingPage` からは一度も渡されておらず、既定値 `false` のまま**。ブレークポイントを実装したコードがどこにも無い。

公開中のデスクトップ描画から実寸を較正して算出:

| ビューポート | 使える幅 | CTAボタン | gap | **input実幅** | テキスト領域 |
|---|---|---|---|---|---|
| 390px (iPhone 14) | 342px | 164px | 8px | 170px | 130px |
| **360px (Androidの多数派)** | 312px | 164px | 8px | **140px** | **100px** |
| 320px (SE初代) | 272px | 164px | 8px | 100px | 60px |

`--page-margin:24px`、`--space-2:8px`、ボタンは `whiteSpace:nowrap` + `padding:13px 24px` で縮まない。
360pxでは placeholder `your@email.com`(≒105px)が**見切れる**、入力中に見える文字数は約10文字。

対象は下部CTAセクション(ラベル "Join the Waitlist" = 長い方)。ヒーロー("Notify me")は多少マシだが同じ構造。

**なぜ最優先か**: 流入の大半がスマホで、これはLPの唯一のコンバージョン要素。しかも設計書どおりに作られていないという**明確な実装漏れ**であって、好みの問題ではない。

**直し方**

`stacked` を prop で渡すのではなく CSS に寄せる(JSではメディアクエリに追随できないため)。

- `app/styles/landing.css` に `.dk-waitlist-row` を追加
  ```css
  .dk-waitlist-row { display:flex; gap:var(--space-2); align-items:center; }
  @media (max-width: 520px) {
    .dk-waitlist-row { flex-direction:column; align-items:stretch; gap:var(--space-3); }
    .dk-waitlist-row > button { width:100%; }
  }
  ```
- `WaitlistForm.tsx` の `<form>` に `className="dk-waitlist-row"` を付け、インラインの `display/gap` を外す
- `stacked` prop は使われなくなるので削除(残すと「効かないprop」が残骸になる)

**検証**: ビルド成果物を360 / 390 / 560px幅で描画して確認済み — 360・390で縦積み、560で横並び維持。実機(iOS Safari)での最終確認は残っている。

---

### B. ダークUIの取りこぼし(1ファイル)— ✅ 実装済み(2026-08-04)

> 実装メモ: Next 14以降 `themeColor` / `colorScheme` は `metadata` ではなく **`viewport` export** に置く必要がある。`metadata` に書くとビルド時に警告が出て無視される。

`app/layout.tsx` の `metadata` に2行足すだけ。

- **`colorScheme: "dark"`** — これが無いと Chrome / Safari のオートフィルがメール入力欄を**白背景・青枠**で塗る。黒×アンバーの中で1箇所だけ壊れるうえ、**壊れる場所がAと同じ「唯一のコンバージョン要素」**。効果に対してコストが不釣り合いに小さいので入れる。デスクトップのスクロールバーが明色になる問題も同時に解消する
- **`themeColor: "#0A0C10"`** — Android Chrome のトップバーが黒に揃う。Safariは元々ページ背景を拾うので効果は限定的。**純粋に見た目の話**で、ついでに入れる程度の優先度

---

### C. FAQ を 4問 → 7問に(§2に詳細)

---

### D. ついでに直す(コード1行ずつ、単独ではやらない)

- `LandingPage.tsx` ヒーローの `minHeight: calc(100svh - 62px)` — 実測でNavは約68px(Wordmarkを `m→l` に上げた時の取り残し)。常に6pxだけスクロールが出る。**純粋に美観**
- `FaqAccordion.tsx` の `<button>` に `aria-expanded` / `aria-controls`、`Input.tsx` に `aria-label="Email address"`(現状はplaceholder頼み)。Cを実装するとき同じファイルを触るので、そのついでに

---

## 2. FAQ 改訂プラン

### 方針

現状4問。**7問**にする。増やしすぎるとFAQ自体が読まれなくなるので、「これが解消されないとメールを入れない」ものだけを足す。

### 足す3問

#### ① Is there an Android version?

- **なぜ**: 今は「When does it launch?」の答えの中に "iOS first — Android after that" が埋まっている。Q1を開かないとAndroidユーザーは自分が対象外だと気づけず、気づいた時にはもうページを閉じている。TikTok / Reels 流入はAndroid比率が高い以上、**独立させてメールだけは獲る**のが正しい
- **草案**:
  > Not at launch — iOS first, Android after. Join the list anyway: we'll email you the day Android lands, and not before then.

#### ② Can I still use my phone while I study?

- **なぜ**: **今のLPで唯一、答えが用意されていない致命的な反論**。多くの学生はスマホで音楽・辞書・タイマーを使う。LPは「Prop it up, facing you」としか書いていないので、「じゃあ音楽は?」が読者の頭に残ったまま離脱する。こちらから先に言語化して答えを出す
- **確定稿**(§2.1参照):
  > Not while the camera's watching — your phone is the camera, propped up and facing you. Music through headphones still works; the screen is what you give up. If your phone is your textbook, use Simple Mode instead: it's just a timer, so use your phone however you like.

### 2.1 シンプルモードの設計(2026-08-04 決定)

FAQ②を書くために製品側を先に決めた。記録を残す。

**需要は2種類ある**

| | 状況 | 扱い |
|---|---|---|
| ① 立てかけられない | 電車・図書館・スタンドがない。スマホは使わなくていい | モーションで持ち上げを検知。カメラモードと同じ行動を測る |
| ② スマホが教材 | 辞書・PDF・ノート。画面を見ないと勉強にならない | **採点は原理的に不可**(下記)。辞書引きボタンで救う |

**技術的な天井(調査済み)**

- 他アプリが前面にいるかを知るAPIはiOSに無い。辞書を引いているのかSNSを見ているのかは区別できない
- バックグラウンドではカメラが止まるので、カメラで補うこともできない
- 唯一の正攻法は Screen Time API(FamilyControls)による**妨害アプリの遮断**。ただし `com.apple.developer.family-controls` はAppleへの申請と承認が必要で、**数週間待ちの報告**がある。8/18には乗らない

**決定:シンプルモードは採点しない。時間だけ。**

これが設計の中心。**スコアを出さないと決めた瞬間に、守るべきものが無くなる**ので、以下が全部不要になった:

- ~~辞書引きボタン(宣告制・3分・記録)~~ → **不要**。あの機構はスコアの正直さを守るためだけに存在していた
- ~~`scenePhase` による他アプリ切り替えの検知~~ → **不要**
- ~~`isIdleTimerDisabled`(自動ロックの誤検知対策)~~ → **不要**
- ~~伏せる / 上向きの議論~~ → **不要**。スマホは自由に使ってよい

結果、シンプルモードは**本当にただのタイマー**になり、名前どおりになった。②「スマホが教材」の層も追加実装ゼロで救える。

**なぜスコアを捏造してはいけなかったか**(この判断の根拠なので残す): 信号ゼロでスコアを出すと、誰でも偽の証拠動画を作れるようになり、**カメラモードで撮った本物の動画まで信用を失う**。視聴者はどちらのモードで撮ったか判別できない。Keptの価値は全部「その証拠は本物だ」に乗っている。
そして「スコアはカメラがある時にだけ出る」と明言することは、弱点の告白ではなく**カメラモードの87点の信憑性を上げる**言明になる。LPのFAQはその形に書き直した。

**LP側の必須修正(実施済み)**

「a focus graph instead」と書いていた**2箇所**は、信号が無い以上グラフも出せないので破棄した:

- FAQ「What if I can't prop my phone up somewhere?」→ "it shows your time, not a focus score. The score is the part that needs the camera."
- Showcaseの箇条書き「No camera? Simple Mode」→ "Just a timer. You still get a video — your time, without the score."

**下流への影響(未対応)**

- [ ] `lp/design.md` §14.7 のFAQ表が古い文面のまま
- [ ] `design/design.md` §7 のスコアカード仕様は**スコアがある前提**。時間のみの派生レイアウトが要る(「2h 14m · Math」だけのカード)

**未決**

- [ ] **シンプルモードをv1に入れるか。** `plan/2026-08-growth-plan.md` §2「入れる」に**載っていない**(顔ぼかしと同じ構図)。ただの時間タイマーになったので実装コストは大幅に下がった。LPは既に約束しているので、入れるかLPを直すかの二択
- [ ] **FamilyControlsの申請を今日出すか。** 承認待ちが数週間なので、v1.1で遮断機能をやるなら早いほど良い。申請自体は無料でクリティカルパスの外

#### ③ Do I have to post the video?

- **なぜ**: LPは Step 04 が「Post it」、ヒーローも「a video worth posting」で、投稿の押しが強い。その結果「投稿が必須なのでは」「自動で上がるのでは」という誤解が生まれるし、**そもそも投稿したくない層が自分を対象外だと判断する**。答えるコストはゼロ
- **草案**:
  > No. Nothing leaves your phone unless you tap share. Plenty of people just keep them — the video is proof for you first, and a post second.

### 並び替え(不安の大きい順)

1. When does it launch? *(現状のまま)*
2. **Is there an Android version?** ← 新規。対象外の人を早く帰し、メールは獲る
3. Do I have to show my face? *(現状のまま)*
4. **Can I still use my phone while I study?** ← 新規
5. What if I can't prop my phone up somewhere? *(現状のまま)*
6. Is it free? *(**課金セッション所管**。本プランでは一切触らない)*
7. **Do I have to post the video?** ← 新規

---

## 3. コードを触らない確認事項

- [ ] **`hello@kept.study` が実際に受信できるか**。プライバシーポリシー上の削除依頼の宛先であり、Apple審査の連絡先にもなりうる。**死んでいると法的にもまずい**
- [ ] **本番の待機リストフォームを自分で1回通す**。Supabaseに行が入ることを目視確認。ここが黙って壊れているのが最悪ケース(調査時点では未検証 — 本番リストに行を作りたくなかったため)
- [ ] 「Launching soon — iOS first」バッジと FAQ の "mid-August 2026" が**ローンチ後に嘘になる**。差し替えのタイミングをリリース手順に入れておく

---

## 4. 判断が要るもの(プラン外)

- **待機リスト人数の表示**。「◯人が登録済み」は待機リストLPで最も効く社会的証明だが、**数字が小さいと逆効果**(「12人」は載せない方がまし)。Supabaseの実数を見てから決める話なので、本プランには入れない
- **出力動画の実物**。LPは「動画を返す」と言い切っているのに見せているのは静止カード1枚で、これが構造的に最大の穴。ただし素材ができるのが先なので、本プランの範囲外(別途スケジュール)

---

## 5. 実装順

1. **A**(モバイルのフォーム)+ **B**(colorScheme)— 1コミット。両方とも同じ「入力欄」の話
2. **C**(FAQ 7問)+ **D**(aria / Nav高さ)— 1コミット。②の答えが確定してから
3. 3章のチェックは並行
