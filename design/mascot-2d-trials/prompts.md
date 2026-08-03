# マスコット2D刷新 試作プロンプト

> 【2026-08-03 更新】§Aの「手描きラフ線」プロンプトは試したが良い結果が出ず。
> **現行LPの平たい2D(`web/public/mascot/mascot-flat.png`)のタッチを正とし、それを参照画像にしてポーズ展開する方針に変更。**
> ポーズ展開プロンプトは§Bを使う。
>
> 【2026-08-03 再更新】9ポーズ生成完了。生成物は `mascot-flat.png` より輪郭線がやや太く、
> 微かな陰影が入ったタッチに落ち着いた。**以降の参照画像は `mascot-flat.png` ではなく
> 新セットの1枚(`web/public/mascot/mascot-wave.png` 推奨)を使うこと。** flat を参照に
> 戻すと今のセットから外れる。

## 書き出しの注意(生成側への指示)

- **背景は「純白」または透過を明示する。** 初回バッチはグリーンバックで返ってきた上に
  抜きが未完(半透明の緑が残留)で、白背景に置くと緑グレーの靄が出た。
- **影を焼き込ませない。** `Mascot.tsx` 側で `drop-shadow()` を当てているので二重になる。
- 正方形で出せばよい。トリム・縮小・圧縮は `clean_mascot.py` が行う。
- 緑背景・白背景どちらで返ってきても `clean_mascot.py` が処理できる
  (`WHITE_BG` セットに pose を足すと白背景ルートに入る)。

## B. ポーズ展開(新セットの1枚を参照画像に添付して使う)【現行方針】

毎回プロンプトの頭に付ける共通文:

```
Use the attached meerkat character exactly as-is: same flat 2D style, same proportions, same colors, same line treatment, same face. Only change the pose and expression as described below. Full body, plain white background, single character, no text.
```

1リクエスト1ポーズ。毎回同じ元画像(mascot-flat.png)を参照に付ける(生成結果を参照にしない)。

> 【2026-08-03 改訂】マスコットは**常に可愛い**。無表情・冷たい表情は使わない(撮影中に無表情で見つめられると怖いため)。
> 冷たさはUIの色だけが担う。ポーズプロンプトに瞳の冷/暖の色指定(#7C93A8 / #FFB02E)は入れない。

| # | ポーズ | 指定文 |
|---|---|---|
| 1 | **watch**(双眼鏡案・**不採用**) | 双眼鏡を両手で目に当てて覗く構図。目が隠れるため不採用。このポーズはLPの「How it works」吹き出し(`Reach for it and I'll notice.`)で使われ、`Mascot.tsx` でも watch は "direct-eye-contact pose — the character noticing you" と定義されている。目が隠れると「見てるよ」が成立しない。手の破綻リスクも高い |
| 1b | **watch = 庇(ひさし)** | ✅ **生成済み・採用**(2026-08-03、`mascot-watch.png`)。Pose: standing upright, one hand raised flat to its brow like a visor, shading its eyes while looking straight ahead at the viewer. Alert lookout posture, other arm relaxed at its side. Expression: calm and gently focused — eyes open and making direct eye contact, small closed-mouth smile. Attentive, not grinning. |
| 2 | **cheer**(讃え) | Pose: jumping mid-air with both arms thrown straight up, whole body loose and joyful. Expression: eyes squeezed shut into happy arcs, big open smile. |
| 3 | **proud** | Pose: standing calmly, one hand giving a small quiet thumbs-up at chest height, other arm relaxed at the side. Expression: soft, slightly narrowed eyes and a small closed-mouth smile — quiet approval, not excitement. |
| 4 | **slump** | Pose: sitting at a plain desk, slumped forward, cheek resting on one hand, other arm flat on the desk. A closed notebook and a pencil on the desk. Expression: tired half-closed eyes, flat mouth. |
| 5 | **desk**(シーン絵) | Pose: sitting at a desk writing in an open notebook, while a smartphone propped upright on a small stand at the edge of the desk faces the meerkat. Wide horizontal composition. The meerkat is focused on the notebook, not the phone. |
| 6 | **wave** | Pose: standing, one arm raised in a friendly open-palm wave at head height, other arm at the side. Expression: neutral-friendly, small closed-mouth smile, eyes open. |
| 7 | **think** | Pose: standing, one hand raised to the chin in a thinking gesture, head tilted slightly, eyes looking up and to the side. Small flat mouth. |

注意: watch が満面の笑みに化けたら `calm and focused, small neutral mouth` を繰り返し強調する。ただし**無表情に振りすぎないこと**(それが今回避けたい「怖さ」)。双眼鏡は手の形が破綻しやすいので、崩れたら 1b の庇(ひさし)ポーズに逃がす。

---

## A. 手描きラフ線タッチ(2026-08-03試作 → 不採用)

方向性: 手描きラフ線(ゆらぎのあるペン線・人が描いた感)。個性はタッチ+瞳の冷→暖+デフォルト真顔で出す。
色仕様は design.md §6 の確定値を継承。生成後の評価ポイントは末尾。

## 1. 見張り(セッション中・真顔・青灰の瞳)

```
A mascot character illustration of a meerkat, drawn in a loose hand-drawn indie style with a wobbly, imperfect ink pen outline — like a zine artist drew it by hand with a fineliner pen. NOT a clean vector illustration, NOT 3D. Flat colors, no gradients, no shading, organic line weight variation, small charming line imperfections.

Character: a meerkat standing perfectly upright and stiff like a guard on watch duty, arms hanging straight down, completely motionless. Totally deadpan expression: small flat straight-line mouth, unblinking wide-open round eyes staring straight at the viewer. Eye irises are cool blue-gray (#7C93A8) — the only cool-colored element in the image. Fur flat sandy tan (#C9A574), cream belly and chin (#EDE0C8), dark brown patches around the eyes (#3D2C22), dark brown hands, feet and tail tip (#4A3527), small dark nose. Chibi proportions: big head, small body. Cute but dead serious.

Plain white background, full body, single character, no text, no watermark.
```

## 2. 讃え(セッション終了後・全身で喜ぶ・琥珀の瞳)

```
A mascot character illustration of a meerkat, drawn in a loose hand-drawn indie style with a wobbly, imperfect ink pen outline — like a zine artist drew it by hand with a fineliner pen. NOT a clean vector illustration, NOT 3D. Flat colors, no gradients, no shading, organic line weight variation, small charming line imperfections.

Character: a meerkat celebrating with its whole body — jumping mid-air, arms thrown up, posture completely loose and joyful, the total opposite of a stiff guard. Eyes squeezed shut into happy arcs OR wide open with warm amber (#FFB02E) irises glowing, big open smiling mouth. Fur flat sandy tan (#C9A574), cream belly and chin (#EDE0C8), dark brown patches around the eyes (#3D2C22), dark brown hands, feet and tail tip (#4A3527), small dark nose. Chibi proportions: big head, small body. A few tiny hand-drawn sparkle/confetti doodles in warm amber around it.

Plain white background, full body, single character, no text, no watermark.
```

## 生成後の評価ポイント

1. **線に「人が描いた感」があるか** — 均一な太さのベクター線に戻っていたら失敗(それが今回捨てたいAI感)
2. **真顔が成立しているか** — 見張り版が「かわいい笑顔」に寄っていたらプロンプトのdeadpan部分を強調して再生成
3. **瞳の色が読めるか** — 縮小しても青灰/琥珀の差が分かるか(識別性の核)
4. **二態を並べて同一キャラに見えるか** — シルエット・毛色・アイパッチが一致しているか
5. 気に入った1枚が出たら、それを**参照画像にして残りのポーズ展開**(双眼鏡・スランプ等)をするのが安定
