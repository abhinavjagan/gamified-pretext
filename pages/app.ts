import { layoutNextLine, prepareWithSegments, type LayoutCursor } from '../src/layout.ts'

import jersey10Url from './fonts/Jersey10-Regular.ttf'
import bodoniRomanUrl from './fonts/BodoniModa-VariableFont_opsz,wght.ttf'
import bodoniItalicUrl from './fonts/BodoniModa-Italic-VariableFont_opsz,wght.ttf'

let runnerSpriteHrefCache: string | null = null
function runnerSpriteHref(): string {
  if (runnerSpriteHrefCache === null) {
    runnerSpriteHrefCache = new URL('/sprites/flame-runner.png', document.baseURI).href
  }
  return runnerSpriteHrefCache
}

function injectFontFaces(): void {
  const css = `
@font-face {
  font-family: 'Jersey 10';
  src: url(${JSON.stringify(jersey10Url)}) format('truetype');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Bodoni Moda';
  src: url(${JSON.stringify(bodoniRomanUrl)}) format('truetype');
  font-weight: 100 900;
  font-stretch: 100% 100%;
  font-display: swap;
}
@font-face {
  font-family: 'Bodoni Moda';
  src: url(${JSON.stringify(bodoniItalicUrl)}) format('truetype');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`
  const el = document.createElement('style')
  el.setAttribute('data-game-fonts', '')
  el.textContent = css
  document.head.appendChild(el)
}

async function safeFontLoad(desc: string): Promise<void> {
  try {
    await document.fonts.load(desc)
  } catch {
    /* ignore */
  }
}

const FONT_DESK = '500 17px "Bodoni Moda", serif'
const LH_DESK = 29
const FONT_NARROW = '500 14px "Bodoni Moda", serif'
const LH_NARROW = 24
const POINTER_HALF = 56
const PIN_HALF = 34
const MAX_PINS = 3

const RUNNER_SHEET_W = 682
const RUNNER_SHEET_H = 1024
const RUNNER_COLS = 5
const RUNNER_ROW_COUNT = 6
const RUNNER_FRAME_W = RUNNER_SHEET_W / RUNNER_COLS
const RUNNER_FRAME_H = RUNNER_SHEET_H / RUNNER_ROW_COUNT
const RUNNER_RUN_ROW = 0
const RUNNER_RUN_FRAMES = 5
const RUNNER_TICK_MS = 78

const BEST_STORAGE_KEY = 'pretext-runner-best'
const RUNNER_EDGE_MARGIN = 72
/** Spring toward cursor while pointer is in the arena (higher = snappier). */
const CURSOR_FOLLOW_SPRING = 4.6
const CURSOR_FOLLOW_DAMP = 0.82
/** Score += speed(px/s) * dt * this * gear. */
const RUN_SCORE_PER_SPEED = 0.046
const SPRINT_SPEED_PX_S = 205
const DRIFT_SPEED_PX_S = 88
const MS_TO_SHIFT_GEAR_UP = 2800
const MS_TO_SHIFT_GEAR_DOWN = 2600
const TYPE_CHAR_POINTS = 12
const TYPE_LINE_BONUS = 95
const POINTER_ENGAGE_MS = 520
const POINTER_MOVE_THRESH = 6
const SNAKE_CELL_PX = 17
const SNAKE_TICK_MS = 90
const SNAKE_FOOD_SCORE = 28
/** Runner body overlaps cycling gold Bodoni row this long → score burst. */
const GOLD_LINE_RESONANCE_MS = 2000
const GOLD_LINE_BURST_SCORE = 42
/** Runner near a pin this long → smaller burst (pin orbit). */
const DUET_ORBIT_PX = 96
const DUET_RESONANCE_MS = 2400
const DUET_BURST_SCORE = 24

const LORE = `炎の頭を持つ侍の長き物語

昔々、戦乱の時代が続いていた頃、日本の北方にある霧深い山村に、不思議な侍の伝説が語り継がれていました。その侍は名を持たず、人々からはただ「炎の侍」と呼ばれていました。彼の頭は常に青白く揺らめく炎に包まれており、その光は夜の闇を切り裂くように輝いていました。しかし、その炎は決して周囲の木々や人を焼くことはなく、まるで彼の魂そのものが形を成したかのようでした。

村人たちはその存在を恐れつつも、どこかで敬っていました。なぜなら、炎の侍は決して無意味に現れることはなく、必ず誰かが深い困難に直面したときに姿を見せると信じられていたからです。

ある年、村は大きな試練に見舞われました。長い干ばつが続き、田畑はひび割れ、川は細く枯れかけていました。食べ物は尽き、人々の顔から笑顔が消え、不安と絶望が村全体を覆っていました。村の長老たちは山の神に祈りを捧げましたが、雨は一向に降りませんでした。

その村に、勇敢ではあるがまだ若い剣士、蓮（れん）が住んでいました。彼は幼い頃に両親を戦で失い、孤独の中で剣の道を歩んできました。蓮は村を救いたいという強い思いを抱き、山の奥にあるとされる「水の精霊の祠」を探しに行く決意をしました。そこには古くから、雨を呼ぶ力が眠っていると言い伝えられていたのです。

村人たちは彼を止めました。山は深く、霧が濃く、数多くの者が迷い、帰らなかった場所でした。しかし蓮の決意は固く、彼はただ一人で山へと向かいました。

山の中は静まり返り、不気味なほどの静寂に包まれていました。昼であっても霧は濃く、視界はほとんどありません。道なき道を進むうちに、蓮は次第に方向感覚を失い、ついには完全に迷ってしまいました。夜が訪れ、冷たい風が吹き抜ける中、彼の心には恐怖が忍び寄りました。

そのときでした。遠くの闇の中に、ゆらりと揺れる光が現れました。

最初は幻かと思いましたが、その光はゆっくりとこちらへ近づいてきます。やがてその姿がはっきりと見えたとき、蓮は息を呑みました。それは伝説に聞いていた炎の侍だったのです。

炎の侍は何も言わず、ただ蓮の前に立っていました。その炎は激しく燃えているようでありながら、不思議と静けさを感じさせました。蓮は恐怖を押し殺し、深く頭を下げました。

「どうか、道をお示しください。村を救いたいのです。」

しばらくの沈黙の後、炎の侍はゆっくりと振り返り、森の奥へと歩き出しました。蓮は迷うことなく、その後を追いました。

炎の光は暗闇をやさしく照らし、足元の危険を知らせるかのように揺れていました。険しい崖や深い谷も、不思議と安全に越えることができました。まるで炎そのものが導いているかのようでした。

やがて二人は、古びた祠の前にたどり着きました。それが水の精霊の祠でした。しかし、その姿は荒れ果て、長い間誰にも顧みられていなかったことが一目で分かりました。

蓮が祠に近づいたそのとき、地面が震え、不気味な声が響きました。祠を守る存在――長い間忘れられ、怒りに満ちた精霊が現れたのです。その姿は水のようでありながらも黒く濁り、怒りと悲しみに満ちていました。

「なぜ今さら来た。人間は我らを忘れ、祈りも捧げなかったではないか。」

蓮は剣を握りましたが、その手は震えていました。しかし彼は剣を収め、深く頭を下げました。

「確かに我々は忘れていました。しかし、だからこそ今ここに来ました。どうか、もう一度力を貸してください。」

精霊は怒りに満ちたまま、蓮を試すように襲いかかりました。そのとき、炎の侍が一歩前に出ました。燃え上がる炎が静かに強く輝き、精霊の動きを止めました。

炎の光は激しさではなく、温かさを帯びていました。それは破壊の炎ではなく、浄化と再生の炎でした。やがて精霊の黒い濁りは少しずつ晴れていき、本来の澄んだ姿へと戻っていきました。

「…思い出した。人と共にあった日々を。」

精霊は静かにそう言うと、空へと消えていきました。その瞬間、空に雲が集まり始め、やがて大粒の雨が降り始めました。

蓮は涙を流しながら空を見上げました。村は救われる――そう確信しました。

振り返ると、炎の侍の姿はすでに消えかけていました。

「待ってください。あなたは一体…」

蓮の問いに、侍は初めて微かに声を発しました。

「我は、失われた誓いの残り火。人の心が道を失わぬ限り、消えることはない。」

その言葉を残し、炎は夜の中へと溶けるように消えていきました。

村に戻った蓮は英雄として迎えられましたが、彼はただ静かに語りました。

「我々を救ったのは、炎の侍だ。そしてあの炎は、恐れるべきものではない。あれは、我々の中にある希望そのものだ。」

それ以来、村ではどれほど困難な時でも、夜の闇に小さな光を探すようになりました。そして人々は語り継ぎました――炎は破壊するだけではない。道を照らし、心を導くものでもあるのだと。
`

type Rect = { left: number; top: number; right: number; bottom: number }
type Pin = { id: number; x: number; y: number }

let arena!: HTMLDivElement
let linesEl!: HTMLDivElement
let pinsEl!: HTMLDivElement
let orbEl!: HTMLDivElement
let pinCountEl!: HTMLSpanElement
let toastEl!: HTMLDivElement
let runnerAEl!: HTMLDivElement
let gameScoreEl!: HTMLSpanElement
let gameSpeedEl!: HTMLSpanElement
let gameGearEl!: HTMLSpanElement
let gameBestEl!: HTMLSpanElement
let gameTypeEl!: HTMLSpanElement
let gameLayerEl!: HTMLSpanElement
let snakeCanvasEl!: HTMLCanvasElement
let snakeCtx!: CanvasRenderingContext2D

function grabDom(): boolean {
  const a = document.getElementById('arena')
  const lines = document.getElementById('lines')
  const pins = document.getElementById('pins')
  const orb = document.getElementById('orb')
  const pinCount = document.getElementById('pinCount')
  const toast = document.getElementById('toast')
  const ra = document.getElementById('runner-a')
  const gs = document.getElementById('gameScore')
  const gsp = document.getElementById('gameSpeed')
  const gg = document.getElementById('gameGear')
  const gb = document.getElementById('gameBest')
  const gt = document.getElementById('gameType')
  const gl = document.getElementById('gameLayer')
  const sc = document.getElementById('snake-canvas')
  if (
    !a ||
    !lines ||
    !pins ||
    !orb ||
    !pinCount ||
    !toast ||
    !ra ||
    !gs ||
    !gsp ||
    !gg ||
    !gb ||
    !gt ||
    !gl ||
    !sc ||
    !(sc instanceof HTMLCanvasElement)
  ) {
    console.error('[pretext] Missing DOM nodes (need #arena, #lines, …). Script may run before <body>.')
    return false
  }
  arena = a
  linesEl = lines
  pinsEl = pins
  orbEl = orb
  pinCountEl = pinCount
  toastEl = toast
  runnerAEl = ra
  gameScoreEl = gs
  gameSpeedEl = gsp
  gameGearEl = gg
  gameBestEl = gb
  gameTypeEl = gt
  gameLayerEl = gl
  const sctx = sc.getContext('2d')
  if (!sctx) {
    console.error('[pretext] snake canvas 2d context unavailable')
    return false
  }
  snakeCanvasEl = sc
  snakeCtx = sctx
  return true
}

let prepared = prepareWithSegments(LORE, FONT_DESK)
let pointerStage: { x: number; y: number } | null = null
/** Screen X from last move; used to flip the mini cursor sprite. */
let pointerPrevClientX: number | null = null
let cursorFacingLeft = false
let pins: Pin[] = []
let nextPinId = 0
let toastTimer = 0

const GAME_STEER_CODES = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])

let gameScore = 0
let gameGear = 1
let bestScore = 0
let displaySpeedPxS = 0
let sprintStreakMs = 0
let driftStreakMs = 0
let lastStepDt = 0

let runnerPx = 0
let runnerPy = 0
let runnerVx = 0
let runnerVy = 0
let runnerPhysicsInited = false
let runnerFacingLeft = false
let lastPhysicsMs = 0

let lastPointerArenaX = 0
let lastPointerArenaY = 0
let lastPointerActivityMs = 0
let pointerActivityPrimed = false

/** Letters & digits from live Bodoni line, lowercased (Unicode-aware). */
let typingTargetNorm = ''
let typingProgress = 0
let typingLineClear = false
let typingChallengeSig = ''

/** Vertical span of the gold-highlighted Bodoni line (stage px), updated each layout. */
let goldLineBand: { top: number; bottom: number } | null = null
let goldLineResonMs = 0
let duetResonMs = 0
let runnerOnGoldLine = false
let pinDuetZone = false

let snakeMode = false
let snakeCols = 0
let snakeRows = 0
let snakeOx = 0
let snakeOy = 0
let snakeBody: { x: number; y: number }[] = []
let snakeDir = { x: 1, y: 0 }
let snakePendingDir: { x: number; y: number } | null = null
let snakeFood = { x: 0, y: 0 }
let snakeLastTick = 0
let snakeDimSig = ''

function loadBestScore() {
  try {
    const v = localStorage.getItem(BEST_STORAGE_KEY)
    if (v !== null) bestScore = Math.max(0, parseInt(v, 10) || 0)
  } catch {
    /* ignore */
  }
}

function lettersAndDigitsNorm(s: string): string {
  return Array.from(s.normalize('NFKC'))
    .filter(ch => /\p{L}|\p{N}/u.test(ch))
    .join('')
    .toLowerCase()
}

function maybeBumpBest() {
  const shown = Math.floor(gameScore)
  if (shown > bestScore) {
    bestScore = shown
    try {
      localStorage.setItem(BEST_STORAGE_KEY, String(bestScore))
    } catch {
      /* ignore */
    }
  }
}

function isPlayerEngaged(now: number): boolean {
  if (pointerStage !== null) return true
  return now - lastPointerActivityMs < POINTER_ENGAGE_MS
}

function steerCodeToDir(code: string): { x: number; y: number } | null {
  if (code === 'ArrowRight' || code === 'KeyD') return { x: 1, y: 0 }
  if (code === 'ArrowLeft' || code === 'KeyA') return { x: -1, y: 0 }
  if (code === 'ArrowDown' || code === 'KeyS') return { x: 0, y: 1 }
  if (code === 'ArrowUp' || code === 'KeyW') return { x: 0, y: -1 }
  return null
}

function syncSnakeGridMetrics(W: number, H: number) {
  snakeCols = Math.max(10, Math.floor(W / SNAKE_CELL_PX))
  snakeRows = Math.max(10, Math.floor(H / SNAKE_CELL_PX))
  snakeOx = Math.floor((W - snakeCols * SNAKE_CELL_PX) / 2)
  snakeOy = Math.floor((H - snakeRows * SNAKE_CELL_PX) / 2)
}

function initSnakeBody() {
  const cx = Math.floor(snakeCols / 2)
  const cy = Math.floor(snakeRows / 2)
  snakeBody = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ]
  snakeDir = { x: 1, y: 0 }
  snakePendingDir = null
}

function spawnSnakeFood() {
  const taken = new Set(snakeBody.map(s => `${s.x},${s.y}`))
  for (let attempt = 0; attempt < 400; attempt++) {
    const x = Math.floor(Math.random() * snakeCols)
    const y = Math.floor(Math.random() * snakeRows)
    if (!taken.has(`${x},${y}`)) {
      snakeFood = { x, y }
      return
    }
  }
  snakeFood = { x: 0, y: 0 }
}

function resetSnakeAfterDeath(msg: string) {
  initSnakeBody()
  spawnSnakeFood()
  snakeLastTick = performance.now()
  flashToast(msg)
}

function setSnakeMode(on: boolean) {
  snakeMode = on
  arena.classList.toggle('snake-on', on)
  snakePendingDir = null
  if (on) {
    const W = arena.clientWidth
    const H = arena.clientHeight
    syncSnakeGridMetrics(W, H)
    initSnakeBody()
    spawnSnakeFood()
    snakeLastTick = performance.now()
    snakeDimSig = `${W}:${H}`
    flashToast('Snake — WASD/arrows, ` or Esc to exit')
  } else {
    snakeDimSig = ''
    flashToast('Runner / type mode')
  }
  scheduleRender()
}

function drawSnakeOverlay(W: number, H: number) {
  const ctx = snakeCtx
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const bw = Math.floor(W * dpr)
  const bh = Math.floor(H * dpr)
  if (snakeCanvasEl.width !== bw || snakeCanvasEl.height !== bh) {
    snakeCanvasEl.width = bw
    snakeCanvasEl.height = bh
    snakeCanvasEl.style.width = `${W}px`
    snakeCanvasEl.style.height = `${H}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(6, 8, 10, 0.2)'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgba(197, 242, 90, 0.14)'
  ctx.lineWidth = 1
  ctx.strokeRect(snakeOx + 0.5, snakeOy + 0.5, snakeCols * SNAKE_CELL_PX - 1, snakeRows * SNAKE_CELL_PX - 1)

  const fx = snakeOx + snakeFood.x * SNAKE_CELL_PX + SNAKE_CELL_PX / 2
  const fy = snakeOy + snakeFood.y * SNAKE_CELL_PX + SNAKE_CELL_PX / 2
  const rg = ctx.createRadialGradient(fx - 2, fy - 2, 0, fx, fy, SNAKE_CELL_PX * 0.7)
  rg.addColorStop(0, 'rgba(255, 248, 200, 0.95)')
  rg.addColorStop(0.55, 'rgba(255, 190, 90, 0.55)')
  rg.addColorStop(1, 'rgba(255, 120, 40, 0.2)')
  ctx.fillStyle = rg
  ctx.beginPath()
  ctx.arc(fx, fy, SNAKE_CELL_PX * 0.36, 0, Math.PI * 2)
  ctx.fill()

  for (let i = snakeBody.length - 1; i >= 0; i--) {
    const s = snakeBody[i]!
    const px = snakeOx + s.x * SNAKE_CELL_PX
    const py = snakeOy + s.y * SNAKE_CELL_PX
    const inset = i === 0 ? 2 : 3.5
    const w = SNAKE_CELL_PX - inset * 2
    ctx.fillStyle =
      i === 0 ? 'rgba(130, 235, 255, 0.95)' : `rgba(70, 200, 255, ${0.4 + (i / Math.max(8, snakeBody.length)) * 0.45})`
    ctx.fillRect(px + inset, py + inset, w, w)
  }
}

function tickSnake(now: number, W: number, H: number) {
  const dim = `${W}:${H}`
  if (dim !== snakeDimSig) {
    snakeDimSig = dim
    syncSnakeGridMetrics(W, H)
    initSnakeBody()
    spawnSnakeFood()
    snakeLastTick = now
  }

  if (now - snakeLastTick < SNAKE_TICK_MS) {
    drawSnakeOverlay(W, H)
    return
  }
  snakeLastTick = now

  if (snakePendingDir !== null) {
    const d = snakePendingDir
    if (!(d.x === -snakeDir.x && d.y === -snakeDir.y)) {
      snakeDir = d
    }
    snakePendingDir = null
  }

  const head = snakeBody[0]!
  const nx = head.x + snakeDir.x
  const ny = head.y + snakeDir.y

  if (nx < 0 || ny < 0 || nx >= snakeCols || ny >= snakeRows) {
    resetSnakeAfterDeath('Snake — wall!')
    drawSnakeOverlay(W, H)
    return
  }

  if (snakeBody.some((s, i) => i > 0 && s.x === nx && s.y === ny)) {
    resetSnakeAfterDeath('Snake — tail!')
    drawSnakeOverlay(W, H)
    return
  }

  snakeBody.unshift({ x: nx, y: ny })
  if (nx === snakeFood.x && ny === snakeFood.y) {
    gameScore += SNAKE_FOOD_SCORE * gameGear
    maybeBumpBest()
    spawnSnakeFood()
  } else {
    snakeBody.pop()
  }
  drawSnakeOverlay(W, H)
}

function stepRunnerPhysics(now: number, W: number, H: number) {
  const idle = runnerKinematics(now, W, H)
  const m = RUNNER_EDGE_MARGIN
  const tx = pointerStage !== null ? pointerStage.x : idle.cx
  const ty = pointerStage !== null ? pointerStage.y : idle.cy
  if (!runnerPhysicsInited) {
    runnerPx = tx
    runnerPy = ty
    runnerPhysicsInited = true
    lastPhysicsMs = now
    lastStepDt = 0
    runnerVx = 0
    runnerVy = 0
    return
  }
  const dt = Math.min(0.034, Math.max(0.008, (now - lastPhysicsMs) / 1000))
  lastPhysicsMs = now
  lastStepDt = dt

  const spring = pointerStage !== null ? CURSOR_FOLLOW_SPRING : 0.42
  const damp = pointerStage !== null ? CURSOR_FOLLOW_DAMP : 0.38
  const ax = (tx - runnerPx) * spring - runnerVx * damp
  const ay = (ty - runnerPy) * spring - runnerVy * damp
  runnerVx += ax * dt
  runnerVy += ay * dt
  if (pointerStage !== null) {
    runnerVx *= 0.992
    runnerVy *= 0.992
  } else {
    runnerVx *= 0.987
    runnerVy *= 0.987
  }
  runnerPx += runnerVx * dt
  runnerPy += runnerVy * dt
  runnerPx = Math.max(m, Math.min(W - m, runnerPx))
  runnerPy = Math.max(m, Math.min(H - m, runnerPy))

  if (pointerStage !== null) {
    if (runnerVx > 18) runnerFacingLeft = false
    else if (runnerVx < -18) runnerFacingLeft = true
  } else if (runnerVx > 28) {
    runnerFacingLeft = false
  } else if (runnerVx < -28) {
    runnerFacingLeft = true
  }
}

function tickRunGame(speedPxS: number, dt: number, now: number) {
  if (dt <= 0) return

  displaySpeedPxS += (speedPxS - displaySpeedPxS) * 0.18

  if (!isPlayerEngaged(now)) {
    return
  }

  gameScore += speedPxS * dt * RUN_SCORE_PER_SPEED * gameGear
  maybeBumpBest()

  const dtMs = dt * 1000
  if (speedPxS >= SPRINT_SPEED_PX_S) {
    sprintStreakMs += dtMs
    driftStreakMs = 0
    if (sprintStreakMs >= MS_TO_SHIFT_GEAR_UP) {
      sprintStreakMs = 0
      if (gameGear < 12) {
        gameGear += 1
        flashToast(`Gear up ×${gameGear}`)
      }
    }
  } else if (speedPxS <= DRIFT_SPEED_PX_S) {
    driftStreakMs += dtMs
    sprintStreakMs = Math.max(0, sprintStreakMs - dtMs * 0.35)
    if (driftStreakMs >= MS_TO_SHIFT_GEAR_DOWN) {
      driftStreakMs = 0
      if (gameGear > 1) {
        gameGear -= 1
      }
    }
  } else {
    driftStreakMs = Math.max(0, driftStreakMs - dtMs * 0.5)
    sprintStreakMs = Math.max(0, sprintStreakMs - dtMs * 0.45)
  }
}

function rectOverlapsHorizontalBandY(r: Rect, top: number, bottom: number): boolean {
  return r.bottom > top && r.top < bottom
}

/** Score bursts tied to Pretext layout: gold row + pointer orbit. */
function tickBodoniLayerSynergy(dt: number) {
  if (dt <= 0) return
  const { dispW, dispH } = runnerDisplayScale()
  const rr = runnerHitRect(runnerPx, runnerPy, dispW, dispH)
  const dtMs = dt * 1000

  runnerOnGoldLine = false
  if (goldLineBand !== null) {
    runnerOnGoldLine = rectOverlapsHorizontalBandY(rr, goldLineBand.top, goldLineBand.bottom)
    if (runnerOnGoldLine) {
      goldLineResonMs += dtMs
      if (goldLineResonMs >= GOLD_LINE_RESONANCE_MS) {
        goldLineResonMs = 0
        gameScore += GOLD_LINE_BURST_SCORE * gameGear
        maybeBumpBest()
      }
    } else {
      goldLineResonMs = Math.max(0, goldLineResonMs - dtMs * 0.65)
    }
  } else {
    goldLineResonMs = 0
  }

  pinDuetZone = false
  let bestD = Infinity
  for (const p of pins) {
    const d = Math.hypot(runnerPx - p.x, runnerPy - p.y)
    if (d < bestD) bestD = d
  }
  if (bestD < DUET_ORBIT_PX) {
    pinDuetZone = true
    duetResonMs += dtMs
    if (duetResonMs >= DUET_RESONANCE_MS) {
      duetResonMs = 0
      gameScore += DUET_BURST_SCORE * gameGear
      maybeBumpBest()
    }
  } else {
    duetResonMs = Math.max(0, duetResonMs - dtMs * 0.5)
  }
}

function stepGame(now: number, W: number, H: number) {
  if (snakeMode) return
  stepRunnerPhysics(now, W, H)
  if (lastStepDt <= 0) return
  const speedPxS = Math.hypot(runnerVx, runnerVy)
  tickRunGame(speedPxS, lastStepDt, now)
  tickBodoniLayerSynergy(lastStepDt)
}

function typo() {
  const narrow = matchMedia('(max-width: 720px)').matches
  if (narrow) {
    return { font: FONT_NARROW, lh: LH_NARROW }
  }
  return { font: FONT_DESK, lh: LH_DESK }
}

function baseHalf(): number {
  return matchMedia('(max-width: 720px)').matches ? 44 : POINTER_HALF
}

function half(): number {
  return baseHalf()
}

function syncPrepare() {
  const { font } = typo()
  prepared = prepareWithSegments(LORE, font)
}

function pointerRect(): Rect | null {
  if (pointerStage === null) return null
  const h = half()
  return {
    left: pointerStage.x - h,
    top: pointerStage.y - h,
    right: pointerStage.x + h,
    bottom: pointerStage.y + h,
  }
}

function pinRects(): Rect[] {
  return pins.map(p => ({
    left: p.x - PIN_HALF,
    top: p.y - PIN_HALF,
    right: p.x + PIN_HALF,
    bottom: p.y + PIN_HALF,
  }))
}

function runnerDisplayScale(): { dispH: number; scale: number; dispW: number } {
  const narrow = matchMedia('(max-width: 720px)').matches
  const dispH = narrow ? 200 : 270
  const scale = dispH / RUNNER_FRAME_H
  const dispW = RUNNER_FRAME_W * scale
  return { dispH, scale, dispW }
}

function runnerKinematics(now: number, W: number, H: number): { cx: number; cy: number; facingLeft: boolean } {
  const t = now * 0.00051
  const cx = W * (0.5 + 0.37 * Math.sin(t))
  const cy = H * (0.56 + 0.24 * Math.cos(t * 1.05))
  const dcx = 0.37 * W * 0.00051 * Math.cos(t)
  return { cx, cy, facingLeft: dcx < 0 }
}

function runnerHitRect(cx: number, cy: number, dispW: number, dispH: number): Rect {
  const w = dispW * 0.44
  const h = dispH * 0.52
  const tcx = cx
  const tcy = cy - dispH * 0.44
  return {
    left: tcx - w / 2,
    right: tcx + w / 2,
    top: tcy - h / 2,
    bottom: tcy + h / 2,
  }
}

function runnerRects(_now: number, W: number, H: number): Rect[] {
  if (W < 120 || H < 120) return []
  const { dispW, dispH } = runnerDisplayScale()
  return [runnerHitRect(runnerPx, runnerPy, dispW, dispH)]
}

/** Pins + flame runner body + pointer halo (each reflows Bodoni as it moves; runner lags cursor on a spring). */
function allObstacleRects(now: number, W: number, H: number): Rect[] {
  const out: Rect[] = [...pinRects()]
  if (!snakeMode) {
    out.push(...runnerRects(now, W, H))
  }
  const pr = pointerRect()
  if (pr) out.push(pr)
  return out
}

function syncRunnersDom(now: number, _W: number, _H: number) {
  const { scale, dispW, dispH } = runnerDisplayScale()
  const bw = RUNNER_SHEET_W * scale
  const bh = RUNNER_SHEET_H * scale
  const url = `url(${JSON.stringify(runnerSpriteHref())})`
  const col = Math.floor(now / RUNNER_TICK_MS) % RUNNER_RUN_FRAMES
  const el = runnerAEl
  el.style.width = `${dispW}px`
  el.style.height = `${dispH}px`
  el.style.left = `${runnerPx}px`
  el.style.top = `${runnerPy}px`
  el.style.backgroundImage = url
  el.style.backgroundSize = `${bw}px ${bh}px`
  el.style.backgroundPosition = `${-col * RUNNER_FRAME_W * scale}px ${-RUNNER_RUN_ROW * RUNNER_FRAME_H * scale}px`
  const faceLeft = pointerStage !== null ? cursorFacingLeft : runnerFacingLeft
  const flip = faceLeft ? -1 : 1
  el.style.transform = `translate(-50%, -82%) scaleX(${flip})`
  el.classList.toggle('runner--on-gold', runnerOnGoldLine && !snakeMode)
}

type Interval = { lo: number; hi: number }

function subtractInterval(iv: Interval, blo: number, bhi: number): Interval[] {
  if (bhi <= iv.lo || blo >= iv.hi) return [iv]
  const out: Interval[] = []
  if (blo > iv.lo) out.push({ lo: iv.lo, hi: Math.min(blo, iv.hi) })
  if (bhi < iv.hi) out.push({ lo: Math.max(bhi, iv.lo), hi: iv.hi })
  return out
}

function slotMulti(
  bandTop: number,
  bandBottom: number,
  cL: number,
  cR: number,
  gap: number,
  rects: Rect[],
  minW: number,
): { x: number; width: number } {
  let intervals: Interval[] = [{ lo: cL, hi: cR }]
  for (const r of rects) {
    if (r.bottom <= bandTop || r.top >= bandBottom) continue
    const blo = r.left - gap
    const bhi = r.right + gap
    const next: Interval[] = []
    for (const iv of intervals) {
      next.push(...subtractInterval(iv, blo, bhi))
    }
    intervals = next.filter(iv => iv.hi - iv.lo >= minW)
  }
  if (intervals.length === 0) return { x: cL, width: cR - cL }
  let best = intervals[0]!
  for (const iv of intervals) {
    if (iv.hi - iv.lo > best.hi - best.lo) best = iv
  }
  return { x: best.lo, width: best.hi - best.lo }
}

function toStage(cx: number, cy: number) {
  const r = arena.getBoundingClientRect()
  return { x: cx - r.left, y: cy - r.top }
}

function syncOrbSize() {
  const h = half()
  orbEl.style.width = `${h * 2}px`
  orbEl.style.height = `${h * 2}px`
  orbEl.style.marginLeft = `${-h}px`
  orbEl.style.marginTop = `${-h}px`
}

function syncOrb() {
  if (pointerStage === null) {
    arena.classList.remove('on')
    return
  }
  arena.classList.add('on')
  syncOrbSize()
  orbEl.style.left = `${pointerStage.x}px`
  orbEl.style.top = `${pointerStage.y}px`
}

function syncHud() {
  pinCountEl.textContent = String(pins.length)
  gameScoreEl.textContent = String(Math.floor(gameScore))
  gameSpeedEl.textContent = String(Math.round(displaySpeedPxS))
  gameGearEl.textContent = `×${gameGear}`
  gameBestEl.textContent = String(bestScore)
  if (typingTargetNorm.length === 0) {
    gameTypeEl.textContent = '—'
  } else if (typingLineClear) {
    gameTypeEl.textContent = 'OK'
  } else {
    gameTypeEl.textContent = `${typingProgress}/${typingTargetNorm.length}`
  }

  if (snakeMode) {
    gameLayerEl.textContent = '…'
  } else {
    const bits: string[] = []
    if (goldLineBand !== null) {
      if (runnerOnGoldLine) {
        bits.push(`${Math.min(100, Math.round((100 * goldLineResonMs) / GOLD_LINE_RESONANCE_MS))}%`)
      } else if (goldLineResonMs > 100) {
        bits.push(`·${Math.min(99, Math.round((100 * goldLineResonMs) / GOLD_LINE_RESONANCE_MS))}`)
      }
    }
    if (pinDuetZone) {
      bits.push(`⌖${Math.min(100, Math.round((100 * duetResonMs) / DUET_RESONANCE_MS))}%`)
    } else if (duetResonMs > 100) {
      bits.push('⌖·')
    }
    gameLayerEl.textContent = bits.length > 0 ? bits.join(' ') : '—'
  }
}

function handleTypingKeydown(e: KeyboardEvent) {
  if (snakeMode) return
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (typingLineClear || typingTargetNorm.length === 0) return

  let keyChar: string | null = null
  if (e.code === 'Space') keyChar = ' '
  else if (e.key.length === 1) keyChar = e.key
  if (keyChar === null) return

  const normKey = keyChar.normalize('NFKC').toLowerCase()
  const chars = Array.from(typingTargetNorm)
  if (typingProgress >= chars.length) return
  const expect = chars[typingProgress]
  if (expect === undefined) return

  if (normKey === expect) {
    e.preventDefault()
    typingProgress += 1
    gameScore += TYPE_CHAR_POINTS * gameGear
    maybeBumpBest()
    if (typingProgress >= chars.length) {
      gameScore += TYPE_LINE_BONUS * gameGear
      maybeBumpBest()
      typingLineClear = true
      typingProgress = 0
      flashToast('Gold line typed!')
    }
    scheduleRender()
  } else if (/[\p{L}\p{N}]/u.test(keyChar)) {
    typingProgress = 0
    scheduleRender()
  }
}

function flashToast(msg: string) {
  toastEl.textContent = msg
  toastEl.classList.add('on')
  if (toastTimer) window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove('on')
    toastTimer = 0
  }, 2200)
}

function syncPinsDom() {
  pinsEl.replaceChildren(
    ...pins.map(pin => {
      const d = document.createElement('div')
      d.className = 'pin'
      d.style.left = `${pin.x}px`
      d.style.top = `${pin.y}px`
      return d
    }),
  )
}

function render() {
  linesEl.replaceChildren()
  const pad = 20
  const topPad = 2
  const bottomPad = 3
  const H = arena.clientHeight
  const W = arena.clientWidth
  const now = performance.now()
  stepGame(now, W, H)
  const cL = pad
  const cR = W - pad
  const rects = allObstacleRects(now, W, H)
  const gap = 14
  const minW = 68
  let cur: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let y = topPad
  const frag = document.createDocumentFragment()
  const { font, lh } = typo()
  let lineCount = 0
  let lineGuard = 0
  const lineTexts: string[] = []
  const lineBands: { top: number; bottom: number }[] = []

  while (y + lh <= H - bottomPad && lineGuard < 800) {
    lineGuard++
    const { x, width: maxW } = slotMulti(y, y + lh, cL, cR, gap, rects, minW)
    let line = layoutNextLine(prepared, cur, maxW)
    if (line === null) {
      cur = { segmentIndex: 0, graphemeIndex: 0 }
      line = layoutNextLine(prepared, cur, maxW)
      if (line === null) break
    }
    const el = document.createElement('p')
    el.className = 'line'
    el.textContent = line.text
    lineTexts.push(line.text)
    lineBands.push({ top: y, bottom: y + lh })
    el.style.left = `${Math.round(x)}px`
    el.style.top = `${Math.round(y)}px`
    el.style.maxWidth = `${Math.round(maxW)}px`
    el.style.font = font
    el.style.lineHeight = `${lh}px`
    lineCount++
    frag.appendChild(el)
    cur = line.end
    y += lh
  }

  const hotLine = Math.floor(now / 2800) % Math.max(1, lineCount)
  const hotRaw = lineCount > 0 ? (lineTexts[hotLine] ?? '') : ''
  const norm = lettersAndDigitsNorm(hotRaw)
  const sig = `${hotLine}:${norm}`
  if (sig !== typingChallengeSig) {
    typingChallengeSig = sig
    typingProgress = 0
    typingLineClear = false
  }
  typingTargetNorm = norm
  if (lineCount > 0 && hotLine >= 0 && hotLine < lineBands.length) {
    goldLineBand = lineBands[hotLine]!
  } else {
    goldLineBand = null
  }
  const children = frag.children
  for (let i = 0; i < children.length; i++) {
    const el = children[i] as HTMLElement
    if (i === hotLine) el.classList.add('line--hot')
  }

  linesEl.appendChild(frag)
  syncRunnersDom(now, W, H)
  syncOrb()
  syncPinsDom()
  syncHud()
  if (snakeMode) {
    tickSnake(now, W, H)
  }
}

let renderRaf = 0
function scheduleRender() {
  if (renderRaf) return
  renderRaf = requestAnimationFrame(() => {
    renderRaf = 0
    render()
  })
}

function gameLoop() {
  scheduleRender()
  requestAnimationFrame(gameLoop)
}

/** First layout can see 0×0 arena before the fixed box is measured. */
function startGameLoopWhenArenaReady() {
  const w = arena.clientWidth
  const h = arena.clientHeight
  if (w < 48 || h < 48) {
    requestAnimationFrame(startGameLoopWhenArenaReady)
    return
  }
  requestAnimationFrame(gameLoop)
}

function wireKeyboard() {
  window.addEventListener(
    'keydown',
    e => {
      const t = e.target as HTMLElement
      const inField = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable

      if (!inField) {
        if (e.code === 'Escape' && snakeMode) {
          e.preventDefault()
          setSnakeMode(false)
          return
        }
        if (e.code === 'KeyBackquote') {
          e.preventDefault()
          setSnakeMode(!snakeMode)
          return
        }
      }

      if (GAME_STEER_CODES.has(e.code)) {
        if (inField) return
        e.preventDefault()
        if (!snakeMode) return
        const d = steerCodeToDir(e.code)
        if (d !== null) {
          snakePendingDir = d
        }
        scheduleRender()
        return
      }

      if (!inField) handleTypingKeydown(e)
    },
    { passive: false },
  )
}

function wireArenaEvents() {
  arena.addEventListener('pointerenter', e => {
    pointerPrevClientX = e.clientX
    pointerStage = toStage(e.clientX, e.clientY)
    lastPointerArenaX = pointerStage.x
    lastPointerArenaY = pointerStage.y
    pointerActivityPrimed = true
    scheduleRender()
  })
  arena.addEventListener('pointermove', e => {
    const t = performance.now()
    const st = toStage(e.clientX, e.clientY)
    if (pointerPrevClientX !== null) {
      const dx = e.clientX - pointerPrevClientX
      if (Math.abs(dx) > 0.35) cursorFacingLeft = dx < 0
    }
    pointerPrevClientX = e.clientX
    if (!pointerActivityPrimed) {
      lastPointerArenaX = st.x
      lastPointerArenaY = st.y
      pointerActivityPrimed = true
    } else if (Math.hypot(st.x - lastPointerArenaX, st.y - lastPointerArenaY) > POINTER_MOVE_THRESH) {
      lastPointerActivityMs = t
      lastPointerArenaX = st.x
      lastPointerArenaY = st.y
    }
    pointerStage = st
    scheduleRender()
  })
  arena.addEventListener('pointerleave', () => {
    pointerStage = null
    pointerPrevClientX = null
    pointerActivityPrimed = false
    lastPointerActivityMs = Number.NEGATIVE_INFINITY
    scheduleRender()
  })
  arena.addEventListener('contextmenu', e => {
    e.preventDefault()
    const { x, y } = toStage(e.clientX, e.clientY)
    pins.push({ id: nextPinId++, x, y })
    if (pins.length > MAX_PINS) pins.shift()
    flashToast('Pin placed')
    scheduleRender()
  })
  window.addEventListener('resize', () => {
    syncPrepare()
    scheduleRender()
  })
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms))
}

async function boot() {
  injectFontFaces()
  loadBestScore()
  if (document.fonts) {
    await Promise.race([document.fonts.ready, sleep(4000)])
  }
  await safeFontLoad('28px "Jersey 10"')
  await safeFontLoad(FONT_DESK)
  await safeFontLoad(FONT_NARROW)
  syncHud()
  syncPrepare()
  startGameLoopWhenArenaReady()
}

function startApp() {
  if (!grabDom()) return
  wireKeyboard()
  wireArenaEvents()
  void boot().catch(() => {
    syncPrepare()
    syncHud()
    startGameLoopWhenArenaReady()
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp, { once: true })
} else {
  startApp()
}
