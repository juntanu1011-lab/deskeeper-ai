/**
 * CV Lab — トレーサーバレット画面
 *
 * 目的: 実機で「カメラ → 顔検出 → 状態判定 + 持ち上げ検出」を貫通させ、
 * lab/cv-smoke/RESULTS.md の状態機械が現実に動くかを確かめる。
 * 製品UIではない。数値をそのまま出す計測画面。
 *
 * 状態機械(RESULTS.md 準拠・MLKit版):
 *   FACE      … 顔あり(pitchで「正面」/「手元見(勉強)」を表示)
 *   NO_FACE   … 顔なし(猶予つき)→ 深い下向き or 離席(区別は将来: 人体検出)
 *   PICKED_UP … 加速度センサーが動きを検知(立てかけスマホを手に取った)
 */
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useCameraPermission } from 'react-native-vision-camera'
import { Camera, type Face } from 'react-native-vision-camera-face-detector'
import { Accelerometer } from 'expo-sensors'

// ⚠️ カメラに渡す props はすべて「不変」にすること。
// プラグインは props が変わるたびに検出出力を作り直す(=カメラセッション再構成)ため、
// 200ms ごとの telemetry 再描画に巻き込むと検出が一度も走らない・画面が暗転する。
const CAMERA_CONSTRAINTS = [{ fps: 15 }]

type FacesCallback = (faces: Face[]) => void
type ErrorCallback = (e: Error) => void

/** 再描画から隔離したカメラ。props(コールバック)が安定なら一切再レンダーされない */
const LabCamera = memo(function LabCamera({
  onFacesDetected,
  onError,
  onLog,
}: {
  onFacesDetected: FacesCallback
  onError: ErrorCallback
  onLog: (msg: string) => void
}) {
  return (
    <Camera
      style={styles.camera}
      device="front"
      isActive={true}
      onFacesDetected={onFacesDetected}
      onError={onError}
      onPreviewStarted={() => {
        console.log('[LabCamera] preview started')
        onLog('camera: preview started')
      }}
      onPreviewStopped={() => {
        console.log('[LabCamera] preview stopped')
        onLog('camera: preview stopped')
      }}
      performanceMode="fast"
      trackingEnabled={true}
      exposure={2}
      constraints={CAMERA_CONSTRAINTS}
    />
  )
})

const C = {
  base: '#0A0C10',
  panel: '#14171D',
  line: '#232833',
  ink: '#EDEFF3',
  sub: '#7A828F',
  cold: '#7C93A8',
  warm: '#FFB02E',
  warn: '#D8654E',
}

const NO_FACE_GRACE_MS = 3000 // 顔が消えてから「NO_FACE」判定までの猶予
const MOVE_THRESHOLD_G = 0.15 // |加速度-1g| がこれを超えたら「動いた」
const MOVE_LATCH_MS = 2000 // 動いた表示を保持する時間

type Telemetry = {
  faces: number
  pitch: number
  yaw: number
  roll: number
  fps: number
}

type LogEntry = { at: string; msg: string }

export default function CvLab() {
  const { hasPermission, requestPermission } = useCameraPermission()

  // 生データは ref に貯めて、200ms ごとに UI へ反映(再レンダー抑制)
  const latest = useRef<Telemetry>({ faces: 0, pitch: 0, yaw: 0, roll: 0, fps: 0 })
  const frameCount = useRef(0)
  const lastFaceAt = useRef<number>(Date.now())
  const movedAt = useRef<number>(0)
  const accelMag = useRef<number>(1)

  const [telemetry, setTelemetry] = useState<Telemetry>(latest.current)
  const [noFaceMs, setNoFaceMs] = useState(0)
  const [moved, setMoved] = useState(false)
  const [accel, setAccel] = useState(1)
  const [log, setLog] = useState<LogEntry[]>([])
  const prevState = useRef<string>('')

  const pushLog = useCallback((msg: string) => {
    const at = new Date().toLocaleTimeString('en-GB')
    setLog((l) => [{ at, msg }, ...l].slice(0, 6))
  }, [])

  // 顔検出コールバック(フレームごと)— ref のみ操作。identity を不変に保つ(LabCamera参照)
  const onFacesDetected = useCallback<FacesCallback>((faces) => {
    frameCount.current += 1
    const f = faces[0]
    latest.current = {
      faces: faces.length,
      pitch: f?.pitchAngle ?? 0,
      yaw: f?.yawAngle ?? 0,
      roll: f?.rollAngle ?? 0,
      fps: latest.current.fps,
    }
    if (faces.length > 0) lastFaceAt.current = Date.now()
  }, [])

  const onDetectError = useCallback<ErrorCallback>((e) => pushLog(`ERROR: ${e.message}`), [pushLog])

  // 加速度(持ち上げ検出)
  useEffect(() => {
    Accelerometer.setUpdateInterval(100)
    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const mag = Math.sqrt(x * x + y * y + z * z)
      accelMag.current = mag
      if (Math.abs(mag - 1) > MOVE_THRESHOLD_G) movedAt.current = Date.now()
    })
    return () => sub.remove()
  }, [])

  // UI 反映ループ(200ms)+ fps 計測(1s)
  useEffect(() => {
    const ui = setInterval(() => {
      const now = Date.now()
      setTelemetry({ ...latest.current })
      setNoFaceMs(now - lastFaceAt.current)
      setMoved(now - movedAt.current < MOVE_LATCH_MS)
      setAccel(accelMag.current)
    }, 200)
    const fpsTimer = setInterval(() => {
      latest.current.fps = frameCount.current
      frameCount.current = 0
    }, 1000)
    return () => {
      clearInterval(ui)
      clearInterval(fpsTimer)
    }
  }, [])

  // 状態判定
  const state: 'FACE' | 'NO_FACE' | 'PICKED_UP' = moved
    ? 'PICKED_UP'
    : telemetry.faces > 0 || noFaceMs < NO_FACE_GRACE_MS
      ? 'FACE'
      : 'NO_FACE'

  // 状態遷移をログ
  useEffect(() => {
    if (prevState.current !== state) {
      if (prevState.current !== '') pushLog(`${prevState.current} → ${state}`)
      prevState.current = state
    }
  }, [state])

  if (!hasPermission) {
    return (
      <View style={[styles.root, styles.center]}>
        <Text style={styles.h1}>CV Lab</Text>
        <Text style={styles.sub}>前面カメラで顔検出テストを行います。{'\n'}映像は端末の外に出ません。</Text>
        <Pressable style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnLabel}>カメラを許可</Text>
        </Pressable>
      </View>
    )
  }

  const stateColor = state === 'FACE' ? C.cold : state === 'PICKED_UP' ? C.warn : C.warm

  return (
    <View style={styles.root}>
      <LabCamera onFacesDetected={onFacesDetected} onError={onDetectError} onLog={pushLog} />

      <View style={[styles.stateCard, { borderColor: stateColor }]}>
        <Text style={[styles.stateLabel, { color: stateColor }]}>{state}</Text>
        <Text style={styles.sub}>
          {state === 'FACE' &&
            (Math.abs(telemetry.pitch) > 15 ? '在席 — 手元を見ている(勉強姿勢?)' : '在席 — 正面')}
          {state === 'NO_FACE' && `顔が消えて ${(noFaceMs / 1000).toFixed(1)}s — 深い下向き or 離席`}
          {state === 'PICKED_UP' && '端末が動いた!'}
        </Text>
      </View>

      <View style={styles.grid}>
        <Metric label="faces" value={String(telemetry.faces)} />
        <Metric
          label="pitch"
          value={telemetry.faces > 0 ? `${telemetry.pitch.toFixed(1)}°` : '—'}
          highlight={telemetry.faces > 0 && Math.abs(telemetry.pitch) > 15}
        />
        <Metric label="yaw" value={`${telemetry.yaw.toFixed(1)}°`} />
        <Metric label="roll" value={`${telemetry.roll.toFixed(1)}°`} />
        <Metric label="det/s" value={String(telemetry.fps)} />
        <Metric label="accel" value={`${accel.toFixed(2)}g`} highlight={moved} />
      </View>

      <View style={styles.logBox}>
        {log.length === 0 && <Text style={styles.sub}>状態遷移ログ(まだなし)</Text>}
        {log.map((e, i) => (
          <Text key={i} style={styles.logLine}>
            <Text style={styles.sub}>{e.at} </Text>
            {e.msg}
          </Text>
        ))}
      </View>
    </View>
  )
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, highlight && { color: C.warm }]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.base, padding: 16, paddingTop: 64, gap: 12 },
  center: { alignItems: 'center', justifyContent: 'center' },
  h1: { color: C.ink, fontSize: 28, fontWeight: '800' },
  sub: { color: C.sub, fontSize: 13, textAlign: 'center' },
  btn: {
    marginTop: 20,
    backgroundColor: C.warm,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 28,
  },
  btnLabel: { color: '#1A1206', fontWeight: '700', fontSize: 16 },
  camera: { height: 260, borderRadius: 20, overflow: 'hidden', backgroundColor: C.panel },
  stateCard: {
    backgroundColor: C.panel,
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  stateLabel: { fontSize: 34, fontWeight: '900', letterSpacing: -1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metric: {
    backgroundColor: C.panel,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: 104,
    flexGrow: 1,
  },
  metricLabel: { color: C.sub, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { color: C.ink, fontSize: 22, fontWeight: '800', fontVariant: ['tabular-nums'] },
  logBox: {
    backgroundColor: C.panel,
    borderRadius: 14,
    padding: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: C.line,
  },
  logLine: { color: C.ink, fontSize: 13, fontVariant: ['tabular-nums'] },
})
