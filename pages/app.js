// src/bidi.ts
var baseTypes = [
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "S",
  "B",
  "S",
  "WS",
  "B",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "B",
  "B",
  "B",
  "S",
  "WS",
  "ON",
  "ON",
  "ET",
  "ET",
  "ET",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "CS",
  "ON",
  "CS",
  "ON",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "B",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "CS",
  "ON",
  "ET",
  "ET",
  "ET",
  "ET",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ET",
  "ET",
  "EN",
  "EN",
  "ON",
  "L",
  "ON",
  "ON",
  "ON",
  "EN",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L"
];
var arabicTypes = [
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "CS",
  "AL",
  "ON",
  "ON",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "AN",
  "ET",
  "AN",
  "AN",
  "AL",
  "AL",
  "AL",
  "NSM",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "ON",
  "NSM",
  "NSM",
  "NSM",
  "NSM",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL",
  "AL"
];
function classifyChar(charCode) {
  if (charCode <= 255)
    return baseTypes[charCode];
  if (1424 <= charCode && charCode <= 1524)
    return "R";
  if (1536 <= charCode && charCode <= 1791)
    return arabicTypes[charCode & 255];
  if (1792 <= charCode && charCode <= 2220)
    return "AL";
  return "L";
}
function computeBidiLevels(str) {
  const len = str.length;
  if (len === 0)
    return null;
  const types = new Array(len);
  let numBidi = 0;
  for (let i = 0;i < len; i++) {
    const t = classifyChar(str.charCodeAt(i));
    if (t === "R" || t === "AL" || t === "AN")
      numBidi++;
    types[i] = t;
  }
  if (numBidi === 0)
    return null;
  const startLevel = len / numBidi < 0.3 ? 0 : 1;
  const levels = new Int8Array(len);
  for (let i = 0;i < len; i++)
    levels[i] = startLevel;
  const e = startLevel & 1 ? "R" : "L";
  const sor = e;
  let lastType = sor;
  for (let i = 0;i < len; i++) {
    if (types[i] === "NSM")
      types[i] = lastType;
    else
      lastType = types[i];
  }
  lastType = sor;
  for (let i = 0;i < len; i++) {
    const t = types[i];
    if (t === "EN")
      types[i] = lastType === "AL" ? "AN" : "EN";
    else if (t === "R" || t === "L" || t === "AL")
      lastType = t;
  }
  for (let i = 0;i < len; i++) {
    if (types[i] === "AL")
      types[i] = "R";
  }
  for (let i = 1;i < len - 1; i++) {
    if (types[i] === "ES" && types[i - 1] === "EN" && types[i + 1] === "EN") {
      types[i] = "EN";
    }
    if (types[i] === "CS" && (types[i - 1] === "EN" || types[i - 1] === "AN") && types[i + 1] === types[i - 1]) {
      types[i] = types[i - 1];
    }
  }
  for (let i = 0;i < len; i++) {
    if (types[i] !== "EN")
      continue;
    let j;
    for (j = i - 1;j >= 0 && types[j] === "ET"; j--)
      types[j] = "EN";
    for (j = i + 1;j < len && types[j] === "ET"; j++)
      types[j] = "EN";
  }
  for (let i = 0;i < len; i++) {
    const t = types[i];
    if (t === "WS" || t === "ES" || t === "ET" || t === "CS")
      types[i] = "ON";
  }
  lastType = sor;
  for (let i = 0;i < len; i++) {
    const t = types[i];
    if (t === "EN")
      types[i] = lastType === "L" ? "L" : "EN";
    else if (t === "R" || t === "L")
      lastType = t;
  }
  for (let i = 0;i < len; i++) {
    if (types[i] !== "ON")
      continue;
    let end = i + 1;
    while (end < len && types[end] === "ON")
      end++;
    const before = i > 0 ? types[i - 1] : sor;
    const after = end < len ? types[end] : sor;
    const bDir = before !== "L" ? "R" : "L";
    const aDir = after !== "L" ? "R" : "L";
    if (bDir === aDir) {
      for (let j = i;j < end; j++)
        types[j] = bDir;
    }
    i = end - 1;
  }
  for (let i = 0;i < len; i++) {
    if (types[i] === "ON")
      types[i] = e;
  }
  for (let i = 0;i < len; i++) {
    const t = types[i];
    if ((levels[i] & 1) === 0) {
      if (t === "R")
        levels[i]++;
      else if (t === "AN" || t === "EN")
        levels[i] += 2;
    } else if (t === "L" || t === "AN" || t === "EN") {
      levels[i]++;
    }
  }
  return levels;
}
function computeSegmentLevels(normalized, segStarts) {
  const bidiLevels = computeBidiLevels(normalized);
  if (bidiLevels === null)
    return null;
  const segLevels = new Int8Array(segStarts.length);
  for (let i = 0;i < segStarts.length; i++) {
    segLevels[i] = bidiLevels[segStarts[i]];
  }
  return segLevels;
}

// src/analysis.ts
var collapsibleWhitespaceRunRe = /[ \t\n\r\f]+/g;
var needsWhitespaceNormalizationRe = /[\t\n\r\f]| {2,}|^ | $/;
function getWhiteSpaceProfile(whiteSpace) {
  const mode = whiteSpace ?? "normal";
  return mode === "pre-wrap" ? { mode, preserveOrdinarySpaces: true, preserveHardBreaks: true } : { mode, preserveOrdinarySpaces: false, preserveHardBreaks: false };
}
function normalizeWhitespaceNormal(text) {
  if (!needsWhitespaceNormalizationRe.test(text))
    return text;
  let normalized = text.replace(collapsibleWhitespaceRunRe, " ");
  if (normalized.charCodeAt(0) === 32) {
    normalized = normalized.slice(1);
  }
  if (normalized.length > 0 && normalized.charCodeAt(normalized.length - 1) === 32) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}
function normalizeWhitespacePreWrap(text) {
  if (!/[\r\f]/.test(text))
    return text.replace(/\r\n/g, `
`);
  return text.replace(/\r\n/g, `
`).replace(/[\r\f]/g, `
`);
}
var sharedWordSegmenter = null;
var segmenterLocale;
function getSharedWordSegmenter() {
  if (sharedWordSegmenter === null) {
    sharedWordSegmenter = new Intl.Segmenter(segmenterLocale, { granularity: "word" });
  }
  return sharedWordSegmenter;
}
var arabicScriptRe = /\p{Script=Arabic}/u;
var combiningMarkRe = /\p{M}/u;
var decimalDigitRe = /\p{Nd}/u;
function containsArabicScript(text) {
  return arabicScriptRe.test(text);
}
function isCJK(s) {
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c >= 19968 && c <= 40959 || c >= 13312 && c <= 19903 || c >= 131072 && c <= 173791 || c >= 173824 && c <= 177983 || c >= 177984 && c <= 178207 || c >= 178208 && c <= 183983 || c >= 183984 && c <= 191471 || c >= 196608 && c <= 201551 || c >= 63744 && c <= 64255 || c >= 194560 && c <= 195103 || c >= 12288 && c <= 12351 || c >= 12352 && c <= 12447 || c >= 12448 && c <= 12543 || c >= 44032 && c <= 55215 || c >= 65280 && c <= 65519) {
      return true;
    }
  }
  return false;
}
var kinsokuStart = new Set([
  "，",
  "．",
  "！",
  "：",
  "；",
  "？",
  "、",
  "。",
  "・",
  "）",
  "〕",
  "〉",
  "》",
  "」",
  "』",
  "】",
  "〗",
  "〙",
  "〛",
  "ー",
  "々",
  "〻",
  "ゝ",
  "ゞ",
  "ヽ",
  "ヾ"
]);
var kinsokuEnd = new Set([
  '"',
  "(",
  "[",
  "{",
  "“",
  "‘",
  "«",
  "‹",
  "（",
  "〔",
  "〈",
  "《",
  "「",
  "『",
  "【",
  "〖",
  "〘",
  "〚"
]);
var forwardStickyGlue = new Set([
  "'",
  "’"
]);
var leftStickyPunctuation = new Set([
  ".",
  ",",
  "!",
  "?",
  ":",
  ";",
  "،",
  "؛",
  "؟",
  "।",
  "॥",
  "၊",
  "။",
  "၌",
  "၍",
  "၏",
  ")",
  "]",
  "}",
  "%",
  '"',
  "”",
  "’",
  "»",
  "›",
  "…"
]);
var arabicNoSpaceTrailingPunctuation = new Set([
  ":",
  ".",
  "،",
  "؛"
]);
var myanmarMedialGlue = new Set([
  "၏"
]);
var closingQuoteChars = new Set([
  "”",
  "’",
  "»",
  "›",
  "」",
  "』",
  "】",
  "》",
  "〉",
  "〕",
  "）"
]);
function isLeftStickyPunctuationSegment(segment) {
  if (isEscapedQuoteClusterSegment(segment))
    return true;
  let sawPunctuation = false;
  for (const ch of segment) {
    if (leftStickyPunctuation.has(ch)) {
      sawPunctuation = true;
      continue;
    }
    if (sawPunctuation && combiningMarkRe.test(ch))
      continue;
    return false;
  }
  return sawPunctuation;
}
function isCJKLineStartProhibitedSegment(segment) {
  for (const ch of segment) {
    if (!kinsokuStart.has(ch) && !leftStickyPunctuation.has(ch))
      return false;
  }
  return segment.length > 0;
}
function isForwardStickyClusterSegment(segment) {
  if (isEscapedQuoteClusterSegment(segment))
    return true;
  for (const ch of segment) {
    if (!kinsokuEnd.has(ch) && !forwardStickyGlue.has(ch) && !combiningMarkRe.test(ch))
      return false;
  }
  return segment.length > 0;
}
function isEscapedQuoteClusterSegment(segment) {
  let sawQuote = false;
  for (const ch of segment) {
    if (ch === "\\" || combiningMarkRe.test(ch))
      continue;
    if (kinsokuEnd.has(ch) || leftStickyPunctuation.has(ch) || forwardStickyGlue.has(ch)) {
      sawQuote = true;
      continue;
    }
    return false;
  }
  return sawQuote;
}
function splitTrailingForwardStickyCluster(text) {
  const chars = Array.from(text);
  let splitIndex = chars.length;
  while (splitIndex > 0) {
    const ch = chars[splitIndex - 1];
    if (combiningMarkRe.test(ch)) {
      splitIndex--;
      continue;
    }
    if (kinsokuEnd.has(ch) || forwardStickyGlue.has(ch)) {
      splitIndex--;
      continue;
    }
    break;
  }
  if (splitIndex <= 0 || splitIndex === chars.length)
    return null;
  return {
    head: chars.slice(0, splitIndex).join(""),
    tail: chars.slice(splitIndex).join("")
  };
}
function isRepeatedSingleCharRun(segment, ch) {
  if (segment.length === 0)
    return false;
  for (const part of segment) {
    if (part !== ch)
      return false;
  }
  return true;
}
function endsWithArabicNoSpacePunctuation(segment) {
  if (!containsArabicScript(segment) || segment.length === 0)
    return false;
  return arabicNoSpaceTrailingPunctuation.has(segment[segment.length - 1]);
}
function endsWithMyanmarMedialGlue(segment) {
  if (segment.length === 0)
    return false;
  return myanmarMedialGlue.has(segment[segment.length - 1]);
}
function splitLeadingSpaceAndMarks(segment) {
  if (segment.length < 2 || segment[0] !== " ")
    return null;
  const marks = segment.slice(1);
  if (/^\p{M}+$/u.test(marks)) {
    return { space: " ", marks };
  }
  return null;
}
function endsWithClosingQuote(text) {
  for (let i = text.length - 1;i >= 0; i--) {
    const ch = text[i];
    if (closingQuoteChars.has(ch))
      return true;
    if (!leftStickyPunctuation.has(ch))
      return false;
  }
  return false;
}
function classifySegmentBreakChar(ch, whiteSpaceProfile) {
  if (whiteSpaceProfile.preserveOrdinarySpaces || whiteSpaceProfile.preserveHardBreaks) {
    if (ch === " ")
      return "preserved-space";
    if (ch === "\t")
      return "tab";
    if (whiteSpaceProfile.preserveHardBreaks && ch === `
`)
      return "hard-break";
  }
  if (ch === " ")
    return "space";
  if (ch === " " || ch === " " || ch === "⁠" || ch === "\uFEFF") {
    return "glue";
  }
  if (ch === "​")
    return "zero-width-break";
  if (ch === "­")
    return "soft-hyphen";
  return "text";
}
function joinTextParts(parts) {
  return parts.length === 1 ? parts[0] : parts.join("");
}
function splitSegmentByBreakKind(segment, isWordLike, start, whiteSpaceProfile) {
  const pieces = [];
  let currentKind = null;
  let currentTextParts = [];
  let currentStart = start;
  let currentWordLike = false;
  let offset = 0;
  for (const ch of segment) {
    const kind = classifySegmentBreakChar(ch, whiteSpaceProfile);
    const wordLike = kind === "text" && isWordLike;
    if (currentKind !== null && kind === currentKind && wordLike === currentWordLike) {
      currentTextParts.push(ch);
      offset += ch.length;
      continue;
    }
    if (currentKind !== null) {
      pieces.push({
        text: joinTextParts(currentTextParts),
        isWordLike: currentWordLike,
        kind: currentKind,
        start: currentStart
      });
    }
    currentKind = kind;
    currentTextParts = [ch];
    currentStart = start + offset;
    currentWordLike = wordLike;
    offset += ch.length;
  }
  if (currentKind !== null) {
    pieces.push({
      text: joinTextParts(currentTextParts),
      isWordLike: currentWordLike,
      kind: currentKind,
      start: currentStart
    });
  }
  return pieces;
}
function isTextRunBoundary(kind) {
  return kind === "space" || kind === "preserved-space" || kind === "zero-width-break" || kind === "hard-break";
}
var urlSchemeSegmentRe = /^[A-Za-z][A-Za-z0-9+.-]*:$/;
function isUrlLikeRunStart(segmentation, index) {
  const text = segmentation.texts[index];
  if (text.startsWith("www."))
    return true;
  return urlSchemeSegmentRe.test(text) && index + 1 < segmentation.len && segmentation.kinds[index + 1] === "text" && segmentation.texts[index + 1] === "//";
}
function isUrlQueryBoundarySegment(text) {
  return text.includes("?") && (text.includes("://") || text.startsWith("www."));
}
function mergeUrlLikeRuns(segmentation) {
  const texts = segmentation.texts.slice();
  const isWordLike = segmentation.isWordLike.slice();
  const kinds = segmentation.kinds.slice();
  const starts = segmentation.starts.slice();
  for (let i = 0;i < segmentation.len; i++) {
    if (kinds[i] !== "text" || !isUrlLikeRunStart(segmentation, i))
      continue;
    const mergedParts = [texts[i]];
    let j = i + 1;
    while (j < segmentation.len && !isTextRunBoundary(kinds[j])) {
      mergedParts.push(texts[j]);
      isWordLike[i] = true;
      const endsQueryPrefix = texts[j].includes("?");
      kinds[j] = "text";
      texts[j] = "";
      j++;
      if (endsQueryPrefix)
        break;
    }
    texts[i] = joinTextParts(mergedParts);
  }
  let compactLen = 0;
  for (let read = 0;read < texts.length; read++) {
    const text = texts[read];
    if (text.length === 0)
      continue;
    if (compactLen !== read) {
      texts[compactLen] = text;
      isWordLike[compactLen] = isWordLike[read];
      kinds[compactLen] = kinds[read];
      starts[compactLen] = starts[read];
    }
    compactLen++;
  }
  texts.length = compactLen;
  isWordLike.length = compactLen;
  kinds.length = compactLen;
  starts.length = compactLen;
  return {
    len: compactLen,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeUrlQueryRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0;i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(segmentation.kinds[i]);
    starts.push(segmentation.starts[i]);
    if (!isUrlQueryBoundarySegment(text))
      continue;
    const nextIndex = i + 1;
    if (nextIndex >= segmentation.len || isTextRunBoundary(segmentation.kinds[nextIndex])) {
      continue;
    }
    const queryParts = [];
    const queryStart = segmentation.starts[nextIndex];
    let j = nextIndex;
    while (j < segmentation.len && !isTextRunBoundary(segmentation.kinds[j])) {
      queryParts.push(segmentation.texts[j]);
      j++;
    }
    if (queryParts.length > 0) {
      texts.push(joinTextParts(queryParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(queryStart);
      i = j - 1;
    }
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
var numericJoinerChars = new Set([
  ":",
  "-",
  "/",
  "×",
  ",",
  ".",
  "+",
  "–",
  "—"
]);
var asciiPunctuationChainSegmentRe = /^[A-Za-z0-9_]+[,:;]*$/;
var asciiPunctuationChainTrailingJoinersRe = /[,:;]+$/;
function segmentContainsDecimalDigit(text) {
  for (const ch of text) {
    if (decimalDigitRe.test(ch))
      return true;
  }
  return false;
}
function isNumericRunSegment(text) {
  if (text.length === 0)
    return false;
  for (const ch of text) {
    if (decimalDigitRe.test(ch) || numericJoinerChars.has(ch))
      continue;
    return false;
  }
  return true;
}
function mergeNumericRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0;i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    const kind = segmentation.kinds[i];
    if (kind === "text" && isNumericRunSegment(text) && segmentContainsDecimalDigit(text)) {
      const mergedParts = [text];
      let j = i + 1;
      while (j < segmentation.len && segmentation.kinds[j] === "text" && isNumericRunSegment(segmentation.texts[j])) {
        mergedParts.push(segmentation.texts[j]);
        j++;
      }
      texts.push(joinTextParts(mergedParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(segmentation.starts[i]);
      i = j - 1;
      continue;
    }
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(kind);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeAsciiPunctuationChains(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0;i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    const kind = segmentation.kinds[i];
    const wordLike = segmentation.isWordLike[i];
    if (kind === "text" && wordLike && asciiPunctuationChainSegmentRe.test(text)) {
      const mergedParts = [text];
      let endsWithJoiners = asciiPunctuationChainTrailingJoinersRe.test(text);
      let j = i + 1;
      while (endsWithJoiners && j < segmentation.len && segmentation.kinds[j] === "text" && segmentation.isWordLike[j] && asciiPunctuationChainSegmentRe.test(segmentation.texts[j])) {
        const nextText = segmentation.texts[j];
        mergedParts.push(nextText);
        endsWithJoiners = asciiPunctuationChainTrailingJoinersRe.test(nextText);
        j++;
      }
      texts.push(joinTextParts(mergedParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(segmentation.starts[i]);
      i = j - 1;
      continue;
    }
    texts.push(text);
    isWordLike.push(wordLike);
    kinds.push(kind);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function splitHyphenatedNumericRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0;i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    if (segmentation.kinds[i] === "text" && text.includes("-")) {
      const parts = text.split("-");
      let shouldSplit = parts.length > 1;
      for (let j = 0;j < parts.length; j++) {
        const part = parts[j];
        if (!shouldSplit)
          break;
        if (part.length === 0 || !segmentContainsDecimalDigit(part) || !isNumericRunSegment(part)) {
          shouldSplit = false;
        }
      }
      if (shouldSplit) {
        let offset = 0;
        for (let j = 0;j < parts.length; j++) {
          const part = parts[j];
          const splitText = j < parts.length - 1 ? `${part}-` : part;
          texts.push(splitText);
          isWordLike.push(true);
          kinds.push("text");
          starts.push(segmentation.starts[i] + offset);
          offset += splitText.length;
        }
        continue;
      }
    }
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(segmentation.kinds[i]);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeGlueConnectedTextRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  let read = 0;
  while (read < segmentation.len) {
    const textParts = [segmentation.texts[read]];
    let wordLike = segmentation.isWordLike[read];
    let kind = segmentation.kinds[read];
    let start = segmentation.starts[read];
    if (kind === "glue") {
      const glueParts = [textParts[0]];
      const glueStart = start;
      read++;
      while (read < segmentation.len && segmentation.kinds[read] === "glue") {
        glueParts.push(segmentation.texts[read]);
        read++;
      }
      const glueText = joinTextParts(glueParts);
      if (read < segmentation.len && segmentation.kinds[read] === "text") {
        textParts[0] = glueText;
        textParts.push(segmentation.texts[read]);
        wordLike = segmentation.isWordLike[read];
        kind = "text";
        start = glueStart;
        read++;
      } else {
        texts.push(glueText);
        isWordLike.push(false);
        kinds.push("glue");
        starts.push(glueStart);
        continue;
      }
    } else {
      read++;
    }
    if (kind === "text") {
      while (read < segmentation.len && segmentation.kinds[read] === "glue") {
        const glueParts = [];
        while (read < segmentation.len && segmentation.kinds[read] === "glue") {
          glueParts.push(segmentation.texts[read]);
          read++;
        }
        const glueText = joinTextParts(glueParts);
        if (read < segmentation.len && segmentation.kinds[read] === "text") {
          textParts.push(glueText, segmentation.texts[read]);
          wordLike = wordLike || segmentation.isWordLike[read];
          read++;
          continue;
        }
        textParts.push(glueText);
      }
    }
    texts.push(joinTextParts(textParts));
    isWordLike.push(wordLike);
    kinds.push(kind);
    starts.push(start);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function carryTrailingForwardStickyAcrossCJKBoundary(segmentation) {
  const texts = segmentation.texts.slice();
  const isWordLike = segmentation.isWordLike.slice();
  const kinds = segmentation.kinds.slice();
  const starts = segmentation.starts.slice();
  for (let i = 0;i < texts.length - 1; i++) {
    if (kinds[i] !== "text" || kinds[i + 1] !== "text")
      continue;
    if (!isCJK(texts[i]) || !isCJK(texts[i + 1]))
      continue;
    const split = splitTrailingForwardStickyCluster(texts[i]);
    if (split === null)
      continue;
    texts[i] = split.head;
    texts[i + 1] = split.tail + texts[i + 1];
    starts[i + 1] = starts[i] + split.head.length;
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function buildMergedSegmentation(normalized, profile, whiteSpaceProfile) {
  const wordSegmenter = getSharedWordSegmenter();
  let mergedLen = 0;
  const mergedTexts = [];
  const mergedWordLike = [];
  const mergedKinds = [];
  const mergedStarts = [];
  for (const s of wordSegmenter.segment(normalized)) {
    for (const piece of splitSegmentByBreakKind(s.segment, s.isWordLike ?? false, s.index, whiteSpaceProfile)) {
      const isText = piece.kind === "text";
      if (profile.carryCJKAfterClosingQuote && isText && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && isCJK(piece.text) && isCJK(mergedTexts[mergedLen - 1]) && endsWithClosingQuote(mergedTexts[mergedLen - 1])) {
        mergedTexts[mergedLen - 1] += piece.text;
        mergedWordLike[mergedLen - 1] = mergedWordLike[mergedLen - 1] || piece.isWordLike;
      } else if (isText && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && isCJKLineStartProhibitedSegment(piece.text) && isCJK(mergedTexts[mergedLen - 1])) {
        mergedTexts[mergedLen - 1] += piece.text;
        mergedWordLike[mergedLen - 1] = mergedWordLike[mergedLen - 1] || piece.isWordLike;
      } else if (isText && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && endsWithMyanmarMedialGlue(mergedTexts[mergedLen - 1])) {
        mergedTexts[mergedLen - 1] += piece.text;
        mergedWordLike[mergedLen - 1] = mergedWordLike[mergedLen - 1] || piece.isWordLike;
      } else if (isText && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && piece.isWordLike && containsArabicScript(piece.text) && endsWithArabicNoSpacePunctuation(mergedTexts[mergedLen - 1])) {
        mergedTexts[mergedLen - 1] += piece.text;
        mergedWordLike[mergedLen - 1] = true;
      } else if (isText && !piece.isWordLike && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && piece.text.length === 1 && piece.text !== "-" && piece.text !== "—" && isRepeatedSingleCharRun(mergedTexts[mergedLen - 1], piece.text)) {
        mergedTexts[mergedLen - 1] += piece.text;
      } else if (isText && !piece.isWordLike && mergedLen > 0 && mergedKinds[mergedLen - 1] === "text" && (isLeftStickyPunctuationSegment(piece.text) || piece.text === "-" && mergedWordLike[mergedLen - 1])) {
        mergedTexts[mergedLen - 1] += piece.text;
      } else {
        mergedTexts[mergedLen] = piece.text;
        mergedWordLike[mergedLen] = piece.isWordLike;
        mergedKinds[mergedLen] = piece.kind;
        mergedStarts[mergedLen] = piece.start;
        mergedLen++;
      }
    }
  }
  for (let i = 1;i < mergedLen; i++) {
    if (mergedKinds[i] === "text" && !mergedWordLike[i] && isEscapedQuoteClusterSegment(mergedTexts[i]) && mergedKinds[i - 1] === "text") {
      mergedTexts[i - 1] += mergedTexts[i];
      mergedWordLike[i - 1] = mergedWordLike[i - 1] || mergedWordLike[i];
      mergedTexts[i] = "";
    }
  }
  for (let i = mergedLen - 2;i >= 0; i--) {
    if (mergedKinds[i] === "text" && !mergedWordLike[i] && isForwardStickyClusterSegment(mergedTexts[i])) {
      let j = i + 1;
      while (j < mergedLen && mergedTexts[j] === "")
        j++;
      if (j < mergedLen && mergedKinds[j] === "text") {
        mergedTexts[j] = mergedTexts[i] + mergedTexts[j];
        mergedStarts[j] = mergedStarts[i];
        mergedTexts[i] = "";
      }
    }
  }
  let compactLen = 0;
  for (let read = 0;read < mergedLen; read++) {
    const text = mergedTexts[read];
    if (text.length === 0)
      continue;
    if (compactLen !== read) {
      mergedTexts[compactLen] = text;
      mergedWordLike[compactLen] = mergedWordLike[read];
      mergedKinds[compactLen] = mergedKinds[read];
      mergedStarts[compactLen] = mergedStarts[read];
    }
    compactLen++;
  }
  mergedTexts.length = compactLen;
  mergedWordLike.length = compactLen;
  mergedKinds.length = compactLen;
  mergedStarts.length = compactLen;
  const compacted = mergeGlueConnectedTextRuns({
    len: compactLen,
    texts: mergedTexts,
    isWordLike: mergedWordLike,
    kinds: mergedKinds,
    starts: mergedStarts
  });
  const withMergedUrls = carryTrailingForwardStickyAcrossCJKBoundary(mergeAsciiPunctuationChains(splitHyphenatedNumericRuns(mergeNumericRuns(mergeUrlQueryRuns(mergeUrlLikeRuns(compacted))))));
  for (let i = 0;i < withMergedUrls.len - 1; i++) {
    const split = splitLeadingSpaceAndMarks(withMergedUrls.texts[i]);
    if (split === null)
      continue;
    if (withMergedUrls.kinds[i] !== "space" && withMergedUrls.kinds[i] !== "preserved-space" || withMergedUrls.kinds[i + 1] !== "text" || !containsArabicScript(withMergedUrls.texts[i + 1])) {
      continue;
    }
    withMergedUrls.texts[i] = split.space;
    withMergedUrls.isWordLike[i] = false;
    withMergedUrls.kinds[i] = withMergedUrls.kinds[i] === "preserved-space" ? "preserved-space" : "space";
    withMergedUrls.texts[i + 1] = split.marks + withMergedUrls.texts[i + 1];
    withMergedUrls.starts[i + 1] = withMergedUrls.starts[i] + split.space.length;
  }
  return withMergedUrls;
}
function compileAnalysisChunks(segmentation, whiteSpaceProfile) {
  if (segmentation.len === 0)
    return [];
  if (!whiteSpaceProfile.preserveHardBreaks) {
    return [{
      startSegmentIndex: 0,
      endSegmentIndex: segmentation.len,
      consumedEndSegmentIndex: segmentation.len
    }];
  }
  const chunks = [];
  let startSegmentIndex = 0;
  for (let i = 0;i < segmentation.len; i++) {
    if (segmentation.kinds[i] !== "hard-break")
      continue;
    chunks.push({
      startSegmentIndex,
      endSegmentIndex: i,
      consumedEndSegmentIndex: i + 1
    });
    startSegmentIndex = i + 1;
  }
  if (startSegmentIndex < segmentation.len) {
    chunks.push({
      startSegmentIndex,
      endSegmentIndex: segmentation.len,
      consumedEndSegmentIndex: segmentation.len
    });
  }
  return chunks;
}
function analyzeText(text, profile, whiteSpace = "normal") {
  const whiteSpaceProfile = getWhiteSpaceProfile(whiteSpace);
  const normalized = whiteSpaceProfile.mode === "pre-wrap" ? normalizeWhitespacePreWrap(text) : normalizeWhitespaceNormal(text);
  if (normalized.length === 0) {
    return {
      normalized,
      chunks: [],
      len: 0,
      texts: [],
      isWordLike: [],
      kinds: [],
      starts: []
    };
  }
  const segmentation = buildMergedSegmentation(normalized, profile, whiteSpaceProfile);
  return {
    normalized,
    chunks: compileAnalysisChunks(segmentation, whiteSpaceProfile),
    ...segmentation
  };
}

// src/measurement.ts
var measureContext = null;
var segmentMetricCaches = new Map;
var cachedEngineProfile = null;
var emojiPresentationRe = /\p{Emoji_Presentation}/u;
var maybeEmojiRe = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u;
var sharedGraphemeSegmenter = null;
var emojiCorrectionCache = new Map;
function getMeasureContext() {
  if (measureContext !== null)
    return measureContext;
  if (typeof OffscreenCanvas !== "undefined") {
    measureContext = new OffscreenCanvas(1, 1).getContext("2d");
    return measureContext;
  }
  if (typeof document !== "undefined") {
    measureContext = document.createElement("canvas").getContext("2d");
    return measureContext;
  }
  throw new Error("Text measurement requires OffscreenCanvas or a DOM canvas context.");
}
function getSegmentMetricCache(font) {
  let cache = segmentMetricCaches.get(font);
  if (!cache) {
    cache = new Map;
    segmentMetricCaches.set(font, cache);
  }
  return cache;
}
function getSegmentMetrics(seg, cache) {
  let metrics = cache.get(seg);
  if (metrics === undefined) {
    const ctx = getMeasureContext();
    metrics = {
      width: ctx.measureText(seg).width,
      containsCJK: isCJK(seg)
    };
    cache.set(seg, metrics);
  }
  return metrics;
}
function getEngineProfile() {
  if (cachedEngineProfile !== null)
    return cachedEngineProfile;
  if (typeof navigator === "undefined") {
    cachedEngineProfile = {
      lineFitEpsilon: 0.005,
      carryCJKAfterClosingQuote: false,
      preferPrefixWidthsForBreakableRuns: false,
      preferEarlySoftHyphenBreak: false
    };
    return cachedEngineProfile;
  }
  const ua = navigator.userAgent;
  const vendor = navigator.vendor;
  const isSafari = vendor === "Apple Computer, Inc." && ua.includes("Safari/") && !ua.includes("Chrome/") && !ua.includes("Chromium/") && !ua.includes("CriOS/") && !ua.includes("FxiOS/") && !ua.includes("EdgiOS/");
  const isChromium = ua.includes("Chrome/") || ua.includes("Chromium/") || ua.includes("CriOS/") || ua.includes("Edg/");
  cachedEngineProfile = {
    lineFitEpsilon: isSafari ? 1 / 64 : 0.005,
    carryCJKAfterClosingQuote: isChromium,
    preferPrefixWidthsForBreakableRuns: isSafari,
    preferEarlySoftHyphenBreak: isSafari
  };
  return cachedEngineProfile;
}
function parseFontSize(font) {
  const m = font.match(/(\d+(?:\.\d+)?)\s*px/);
  return m ? parseFloat(m[1]) : 16;
}
function getSharedGraphemeSegmenter() {
  if (sharedGraphemeSegmenter === null) {
    sharedGraphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  }
  return sharedGraphemeSegmenter;
}
function isEmojiGrapheme(g) {
  return emojiPresentationRe.test(g) || g.includes("️");
}
function textMayContainEmoji(text) {
  return maybeEmojiRe.test(text);
}
function getEmojiCorrection(font, fontSize) {
  let correction = emojiCorrectionCache.get(font);
  if (correction !== undefined)
    return correction;
  const ctx = getMeasureContext();
  ctx.font = font;
  const canvasW = ctx.measureText("\uD83D\uDE00").width;
  correction = 0;
  if (canvasW > fontSize + 0.5 && typeof document !== "undefined" && document.body !== null) {
    const span = document.createElement("span");
    span.style.font = font;
    span.style.display = "inline-block";
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.textContent = "\uD83D\uDE00";
    document.body.appendChild(span);
    const domW = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    if (canvasW - domW > 0.5) {
      correction = canvasW - domW;
    }
  }
  emojiCorrectionCache.set(font, correction);
  return correction;
}
function countEmojiGraphemes(text) {
  let count = 0;
  const graphemeSegmenter = getSharedGraphemeSegmenter();
  for (const g of graphemeSegmenter.segment(text)) {
    if (isEmojiGrapheme(g.segment))
      count++;
  }
  return count;
}
function getEmojiCount(seg, metrics) {
  if (metrics.emojiCount === undefined) {
    metrics.emojiCount = countEmojiGraphemes(seg);
  }
  return metrics.emojiCount;
}
function getCorrectedSegmentWidth(seg, metrics, emojiCorrection) {
  if (emojiCorrection === 0)
    return metrics.width;
  return metrics.width - getEmojiCount(seg, metrics) * emojiCorrection;
}
function getSegmentGraphemeWidths(seg, metrics, cache, emojiCorrection) {
  if (metrics.graphemeWidths !== undefined)
    return metrics.graphemeWidths;
  const widths = [];
  const graphemeSegmenter = getSharedGraphemeSegmenter();
  for (const gs of graphemeSegmenter.segment(seg)) {
    const graphemeMetrics = getSegmentMetrics(gs.segment, cache);
    widths.push(getCorrectedSegmentWidth(gs.segment, graphemeMetrics, emojiCorrection));
  }
  metrics.graphemeWidths = widths.length > 1 ? widths : null;
  return metrics.graphemeWidths;
}
function getSegmentGraphemePrefixWidths(seg, metrics, cache, emojiCorrection) {
  if (metrics.graphemePrefixWidths !== undefined)
    return metrics.graphemePrefixWidths;
  const prefixWidths = [];
  const graphemeSegmenter = getSharedGraphemeSegmenter();
  let prefix = "";
  for (const gs of graphemeSegmenter.segment(seg)) {
    prefix += gs.segment;
    const prefixMetrics = getSegmentMetrics(prefix, cache);
    prefixWidths.push(getCorrectedSegmentWidth(prefix, prefixMetrics, emojiCorrection));
  }
  metrics.graphemePrefixWidths = prefixWidths.length > 1 ? prefixWidths : null;
  return metrics.graphemePrefixWidths;
}
function getFontMeasurementState(font, needsEmojiCorrection) {
  const ctx = getMeasureContext();
  ctx.font = font;
  const cache = getSegmentMetricCache(font);
  const fontSize = parseFontSize(font);
  const emojiCorrection = needsEmojiCorrection ? getEmojiCorrection(font, fontSize) : 0;
  return { cache, fontSize, emojiCorrection };
}

// src/line-break.ts
function canBreakAfter(kind) {
  return kind === "space" || kind === "preserved-space" || kind === "tab" || kind === "zero-width-break" || kind === "soft-hyphen";
}
function getTabAdvance(lineWidth, tabStopAdvance) {
  if (tabStopAdvance <= 0)
    return 0;
  const remainder = lineWidth % tabStopAdvance;
  if (Math.abs(remainder) <= 0.000001)
    return tabStopAdvance;
  return tabStopAdvance - remainder;
}
function getBreakableAdvance(graphemeWidths, graphemePrefixWidths, graphemeIndex, preferPrefixWidths) {
  if (!preferPrefixWidths || graphemePrefixWidths === null) {
    return graphemeWidths[graphemeIndex];
  }
  return graphemePrefixWidths[graphemeIndex] - (graphemeIndex > 0 ? graphemePrefixWidths[graphemeIndex - 1] : 0);
}
function fitSoftHyphenBreak(graphemeWidths, initialWidth, maxWidth, lineFitEpsilon, discretionaryHyphenWidth, cumulativeWidths) {
  let fitCount = 0;
  let fittedWidth = initialWidth;
  while (fitCount < graphemeWidths.length) {
    const nextWidth = cumulativeWidths ? initialWidth + graphemeWidths[fitCount] : fittedWidth + graphemeWidths[fitCount];
    const nextLineWidth = fitCount + 1 < graphemeWidths.length ? nextWidth + discretionaryHyphenWidth : nextWidth;
    if (nextLineWidth > maxWidth + lineFitEpsilon)
      break;
    fittedWidth = nextWidth;
    fitCount++;
  }
  return { fitCount, fittedWidth };
}
function findChunkIndexForStart(prepared, segmentIndex) {
  let lo = 0;
  let hi = prepared.chunks.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (segmentIndex < prepared.chunks[mid].consumedEndSegmentIndex) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo < prepared.chunks.length ? lo : -1;
}
function normalizeLineStartWithChunk(prepared, start) {
  let segmentIndex = start.segmentIndex;
  const graphemeIndex = start.graphemeIndex;
  if (segmentIndex >= prepared.widths.length)
    return null;
  const chunkIndex = findChunkIndexForStart(prepared, segmentIndex);
  if (chunkIndex < 0)
    return null;
  if (graphemeIndex > 0) {
    return { cursor: start, chunkIndex };
  }
  const chunk = prepared.chunks[chunkIndex];
  if (chunk.startSegmentIndex === chunk.endSegmentIndex && segmentIndex === chunk.startSegmentIndex) {
    return { cursor: { segmentIndex, graphemeIndex: 0 }, chunkIndex };
  }
  if (segmentIndex < chunk.startSegmentIndex)
    segmentIndex = chunk.startSegmentIndex;
  while (segmentIndex < chunk.endSegmentIndex) {
    const kind = prepared.kinds[segmentIndex];
    if (kind !== "space" && kind !== "zero-width-break" && kind !== "soft-hyphen") {
      return { cursor: { segmentIndex, graphemeIndex: 0 }, chunkIndex };
    }
    segmentIndex++;
  }
  if (chunk.consumedEndSegmentIndex >= prepared.widths.length)
    return null;
  return {
    cursor: { segmentIndex: chunk.consumedEndSegmentIndex, graphemeIndex: 0 },
    chunkIndex: chunkIndex + 1
  };
}
function layoutNextLineRange(prepared, start, maxWidth) {
  const normalized = normalizeLineStartWithChunk(prepared, start);
  if (normalized === null)
    return null;
  if (prepared.simpleLineWalkFastPath) {
    return layoutNextLineRangeSimple(prepared, normalized.cursor, maxWidth);
  }
  const chunk = prepared.chunks[normalized.chunkIndex];
  if (chunk.startSegmentIndex === chunk.endSegmentIndex) {
    return {
      startSegmentIndex: chunk.startSegmentIndex,
      startGraphemeIndex: 0,
      endSegmentIndex: chunk.consumedEndSegmentIndex,
      endGraphemeIndex: 0,
      width: 0
    };
  }
  const {
    widths,
    lineEndFitAdvances,
    lineEndPaintAdvances,
    kinds,
    breakableWidths,
    breakablePrefixWidths,
    discretionaryHyphenWidth,
    tabStopAdvance
  } = prepared;
  const engineProfile = getEngineProfile();
  const lineFitEpsilon = engineProfile.lineFitEpsilon;
  let lineW = 0;
  let hasContent = false;
  const lineStartSegmentIndex = normalized.cursor.segmentIndex;
  const lineStartGraphemeIndex = normalized.cursor.graphemeIndex;
  let lineEndSegmentIndex = lineStartSegmentIndex;
  let lineEndGraphemeIndex = lineStartGraphemeIndex;
  let pendingBreakSegmentIndex = -1;
  let pendingBreakFitWidth = 0;
  let pendingBreakPaintWidth = 0;
  let pendingBreakKind = null;
  function clearPendingBreak() {
    pendingBreakSegmentIndex = -1;
    pendingBreakFitWidth = 0;
    pendingBreakPaintWidth = 0;
    pendingBreakKind = null;
  }
  function finishLine(endSegmentIndex = lineEndSegmentIndex, endGraphemeIndex = lineEndGraphemeIndex, width = lineW) {
    if (!hasContent)
      return null;
    return {
      startSegmentIndex: lineStartSegmentIndex,
      startGraphemeIndex: lineStartGraphemeIndex,
      endSegmentIndex,
      endGraphemeIndex,
      width
    };
  }
  function startLineAtSegment(segmentIndex, width) {
    hasContent = true;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
    lineW = width;
  }
  function startLineAtGrapheme(segmentIndex, graphemeIndex, width) {
    hasContent = true;
    lineEndSegmentIndex = segmentIndex;
    lineEndGraphemeIndex = graphemeIndex + 1;
    lineW = width;
  }
  function appendWholeSegment(segmentIndex, width) {
    if (!hasContent) {
      startLineAtSegment(segmentIndex, width);
      return;
    }
    lineW += width;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
  }
  function updatePendingBreakForWholeSegment(segmentIndex, segmentWidth) {
    if (!canBreakAfter(kinds[segmentIndex]))
      return;
    const fitAdvance = kinds[segmentIndex] === "tab" ? 0 : lineEndFitAdvances[segmentIndex];
    const paintAdvance = kinds[segmentIndex] === "tab" ? segmentWidth : lineEndPaintAdvances[segmentIndex];
    pendingBreakSegmentIndex = segmentIndex + 1;
    pendingBreakFitWidth = lineW - segmentWidth + fitAdvance;
    pendingBreakPaintWidth = lineW - segmentWidth + paintAdvance;
    pendingBreakKind = kinds[segmentIndex];
  }
  function appendBreakableSegmentFrom(segmentIndex, startGraphemeIndex) {
    const gWidths = breakableWidths[segmentIndex];
    const gPrefixWidths = breakablePrefixWidths[segmentIndex] ?? null;
    for (let g = startGraphemeIndex;g < gWidths.length; g++) {
      const gw = getBreakableAdvance(gWidths, gPrefixWidths, g, engineProfile.preferPrefixWidthsForBreakableRuns);
      if (!hasContent) {
        startLineAtGrapheme(segmentIndex, g, gw);
        continue;
      }
      if (lineW + gw > maxWidth + lineFitEpsilon) {
        return finishLine();
      }
      lineW += gw;
      lineEndSegmentIndex = segmentIndex;
      lineEndGraphemeIndex = g + 1;
    }
    if (hasContent && lineEndSegmentIndex === segmentIndex && lineEndGraphemeIndex === gWidths.length) {
      lineEndSegmentIndex = segmentIndex + 1;
      lineEndGraphemeIndex = 0;
    }
    return null;
  }
  function maybeFinishAtSoftHyphen(segmentIndex) {
    if (pendingBreakKind !== "soft-hyphen" || pendingBreakSegmentIndex < 0)
      return null;
    const gWidths = breakableWidths[segmentIndex] ?? null;
    if (gWidths !== null) {
      const fitWidths = engineProfile.preferPrefixWidthsForBreakableRuns ? breakablePrefixWidths[segmentIndex] ?? gWidths : gWidths;
      const usesPrefixWidths = fitWidths !== gWidths;
      const { fitCount, fittedWidth } = fitSoftHyphenBreak(fitWidths, lineW, maxWidth, lineFitEpsilon, discretionaryHyphenWidth, usesPrefixWidths);
      if (fitCount === gWidths.length) {
        lineW = fittedWidth;
        lineEndSegmentIndex = segmentIndex + 1;
        lineEndGraphemeIndex = 0;
        clearPendingBreak();
        return null;
      }
      if (fitCount > 0) {
        return finishLine(segmentIndex, fitCount, fittedWidth + discretionaryHyphenWidth);
      }
    }
    if (pendingBreakFitWidth <= maxWidth + lineFitEpsilon) {
      return finishLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
    }
    return null;
  }
  for (let i = normalized.cursor.segmentIndex;i < chunk.endSegmentIndex; i++) {
    const kind = kinds[i];
    const startGraphemeIndex = i === normalized.cursor.segmentIndex ? normalized.cursor.graphemeIndex : 0;
    const w = kind === "tab" ? getTabAdvance(lineW, tabStopAdvance) : widths[i];
    if (kind === "soft-hyphen" && startGraphemeIndex === 0) {
      if (hasContent) {
        lineEndSegmentIndex = i + 1;
        lineEndGraphemeIndex = 0;
        pendingBreakSegmentIndex = i + 1;
        pendingBreakFitWidth = lineW + discretionaryHyphenWidth;
        pendingBreakPaintWidth = lineW + discretionaryHyphenWidth;
        pendingBreakKind = kind;
      }
      continue;
    }
    if (!hasContent) {
      if (startGraphemeIndex > 0) {
        const line = appendBreakableSegmentFrom(i, startGraphemeIndex);
        if (line !== null)
          return line;
      } else if (w > maxWidth && breakableWidths[i] !== null) {
        const line = appendBreakableSegmentFrom(i, 0);
        if (line !== null)
          return line;
      } else {
        startLineAtSegment(i, w);
      }
      updatePendingBreakForWholeSegment(i, w);
      continue;
    }
    const newW = lineW + w;
    if (newW > maxWidth + lineFitEpsilon) {
      const currentBreakFitWidth = lineW + (kind === "tab" ? 0 : lineEndFitAdvances[i]);
      const currentBreakPaintWidth = lineW + (kind === "tab" ? w : lineEndPaintAdvances[i]);
      if (pendingBreakKind === "soft-hyphen" && engineProfile.preferEarlySoftHyphenBreak && pendingBreakFitWidth <= maxWidth + lineFitEpsilon) {
        return finishLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
      }
      const softBreakLine = maybeFinishAtSoftHyphen(i);
      if (softBreakLine !== null)
        return softBreakLine;
      if (canBreakAfter(kind) && currentBreakFitWidth <= maxWidth + lineFitEpsilon) {
        appendWholeSegment(i, w);
        return finishLine(i + 1, 0, currentBreakPaintWidth);
      }
      if (pendingBreakSegmentIndex >= 0 && pendingBreakFitWidth <= maxWidth + lineFitEpsilon) {
        if (lineEndSegmentIndex > pendingBreakSegmentIndex || lineEndSegmentIndex === pendingBreakSegmentIndex && lineEndGraphemeIndex > 0) {
          return finishLine();
        }
        return finishLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
      }
      if (w > maxWidth && breakableWidths[i] !== null) {
        const currentLine = finishLine();
        if (currentLine !== null)
          return currentLine;
        const line = appendBreakableSegmentFrom(i, 0);
        if (line !== null)
          return line;
      }
      return finishLine();
    }
    appendWholeSegment(i, w);
    updatePendingBreakForWholeSegment(i, w);
  }
  if (pendingBreakSegmentIndex === chunk.consumedEndSegmentIndex && lineEndGraphemeIndex === 0) {
    return finishLine(chunk.consumedEndSegmentIndex, 0, pendingBreakPaintWidth);
  }
  return finishLine(chunk.consumedEndSegmentIndex, 0, lineW);
}
function layoutNextLineRangeSimple(prepared, normalizedStart, maxWidth) {
  const { widths, kinds, breakableWidths, breakablePrefixWidths } = prepared;
  const engineProfile = getEngineProfile();
  const lineFitEpsilon = engineProfile.lineFitEpsilon;
  let lineW = 0;
  let hasContent = false;
  const lineStartSegmentIndex = normalizedStart.segmentIndex;
  const lineStartGraphemeIndex = normalizedStart.graphemeIndex;
  let lineEndSegmentIndex = lineStartSegmentIndex;
  let lineEndGraphemeIndex = lineStartGraphemeIndex;
  let pendingBreakSegmentIndex = -1;
  let pendingBreakPaintWidth = 0;
  function finishLine(endSegmentIndex = lineEndSegmentIndex, endGraphemeIndex = lineEndGraphemeIndex, width = lineW) {
    if (!hasContent)
      return null;
    return {
      startSegmentIndex: lineStartSegmentIndex,
      startGraphemeIndex: lineStartGraphemeIndex,
      endSegmentIndex,
      endGraphemeIndex,
      width
    };
  }
  function startLineAtSegment(segmentIndex, width) {
    hasContent = true;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
    lineW = width;
  }
  function startLineAtGrapheme(segmentIndex, graphemeIndex, width) {
    hasContent = true;
    lineEndSegmentIndex = segmentIndex;
    lineEndGraphemeIndex = graphemeIndex + 1;
    lineW = width;
  }
  function appendWholeSegment(segmentIndex, width) {
    if (!hasContent) {
      startLineAtSegment(segmentIndex, width);
      return;
    }
    lineW += width;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
  }
  function updatePendingBreak(segmentIndex, segmentWidth) {
    if (!canBreakAfter(kinds[segmentIndex]))
      return;
    pendingBreakSegmentIndex = segmentIndex + 1;
    pendingBreakPaintWidth = lineW - segmentWidth;
  }
  function appendBreakableSegmentFrom(segmentIndex, startGraphemeIndex) {
    const gWidths = breakableWidths[segmentIndex];
    const gPrefixWidths = breakablePrefixWidths[segmentIndex] ?? null;
    for (let g = startGraphemeIndex;g < gWidths.length; g++) {
      const gw = getBreakableAdvance(gWidths, gPrefixWidths, g, engineProfile.preferPrefixWidthsForBreakableRuns);
      if (!hasContent) {
        startLineAtGrapheme(segmentIndex, g, gw);
        continue;
      }
      if (lineW + gw > maxWidth + lineFitEpsilon) {
        return finishLine();
      }
      lineW += gw;
      lineEndSegmentIndex = segmentIndex;
      lineEndGraphemeIndex = g + 1;
    }
    if (hasContent && lineEndSegmentIndex === segmentIndex && lineEndGraphemeIndex === gWidths.length) {
      lineEndSegmentIndex = segmentIndex + 1;
      lineEndGraphemeIndex = 0;
    }
    return null;
  }
  for (let i = normalizedStart.segmentIndex;i < widths.length; i++) {
    const w = widths[i];
    const kind = kinds[i];
    const startGraphemeIndex = i === normalizedStart.segmentIndex ? normalizedStart.graphemeIndex : 0;
    if (!hasContent) {
      if (startGraphemeIndex > 0) {
        const line = appendBreakableSegmentFrom(i, startGraphemeIndex);
        if (line !== null)
          return line;
      } else if (w > maxWidth && breakableWidths[i] !== null) {
        const line = appendBreakableSegmentFrom(i, 0);
        if (line !== null)
          return line;
      } else {
        startLineAtSegment(i, w);
      }
      updatePendingBreak(i, w);
      continue;
    }
    const newW = lineW + w;
    if (newW > maxWidth + lineFitEpsilon) {
      if (canBreakAfter(kind)) {
        appendWholeSegment(i, w);
        return finishLine(i + 1, 0, lineW - w);
      }
      if (pendingBreakSegmentIndex >= 0) {
        if (lineEndSegmentIndex > pendingBreakSegmentIndex || lineEndSegmentIndex === pendingBreakSegmentIndex && lineEndGraphemeIndex > 0) {
          return finishLine();
        }
        return finishLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
      }
      if (w > maxWidth && breakableWidths[i] !== null) {
        const currentLine = finishLine();
        if (currentLine !== null)
          return currentLine;
        const line = appendBreakableSegmentFrom(i, 0);
        if (line !== null)
          return line;
      }
      return finishLine();
    }
    appendWholeSegment(i, w);
    updatePendingBreak(i, w);
  }
  return finishLine();
}

// src/layout.ts
var sharedGraphemeSegmenter2 = null;
var sharedLineTextCaches = new WeakMap;
function getSharedGraphemeSegmenter2() {
  if (sharedGraphemeSegmenter2 === null) {
    sharedGraphemeSegmenter2 = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  }
  return sharedGraphemeSegmenter2;
}
function createEmptyPrepared(includeSegments) {
  if (includeSegments) {
    return {
      widths: [],
      lineEndFitAdvances: [],
      lineEndPaintAdvances: [],
      kinds: [],
      simpleLineWalkFastPath: true,
      segLevels: null,
      breakableWidths: [],
      breakablePrefixWidths: [],
      discretionaryHyphenWidth: 0,
      tabStopAdvance: 0,
      chunks: [],
      segments: []
    };
  }
  return {
    widths: [],
    lineEndFitAdvances: [],
    lineEndPaintAdvances: [],
    kinds: [],
    simpleLineWalkFastPath: true,
    segLevels: null,
    breakableWidths: [],
    breakablePrefixWidths: [],
    discretionaryHyphenWidth: 0,
    tabStopAdvance: 0,
    chunks: []
  };
}
function measureAnalysis(analysis, font, includeSegments) {
  const graphemeSegmenter = getSharedGraphemeSegmenter2();
  const engineProfile = getEngineProfile();
  const { cache, emojiCorrection } = getFontMeasurementState(font, textMayContainEmoji(analysis.normalized));
  const discretionaryHyphenWidth = getCorrectedSegmentWidth("-", getSegmentMetrics("-", cache), emojiCorrection);
  const spaceWidth = getCorrectedSegmentWidth(" ", getSegmentMetrics(" ", cache), emojiCorrection);
  const tabStopAdvance = spaceWidth * 8;
  if (analysis.len === 0)
    return createEmptyPrepared(includeSegments);
  const widths = [];
  const lineEndFitAdvances = [];
  const lineEndPaintAdvances = [];
  const kinds = [];
  let simpleLineWalkFastPath = analysis.chunks.length <= 1;
  const segStarts = includeSegments ? [] : null;
  const breakableWidths = [];
  const breakablePrefixWidths = [];
  const segments = includeSegments ? [] : null;
  const preparedStartByAnalysisIndex = Array.from({ length: analysis.len });
  const preparedEndByAnalysisIndex = Array.from({ length: analysis.len });
  function pushMeasuredSegment(text, width, lineEndFitAdvance, lineEndPaintAdvance, kind, start, breakable, breakablePrefix) {
    if (kind !== "text" && kind !== "space" && kind !== "zero-width-break") {
      simpleLineWalkFastPath = false;
    }
    widths.push(width);
    lineEndFitAdvances.push(lineEndFitAdvance);
    lineEndPaintAdvances.push(lineEndPaintAdvance);
    kinds.push(kind);
    segStarts?.push(start);
    breakableWidths.push(breakable);
    breakablePrefixWidths.push(breakablePrefix);
    if (segments !== null)
      segments.push(text);
  }
  for (let mi = 0;mi < analysis.len; mi++) {
    preparedStartByAnalysisIndex[mi] = widths.length;
    const segText = analysis.texts[mi];
    const segWordLike = analysis.isWordLike[mi];
    const segKind = analysis.kinds[mi];
    const segStart = analysis.starts[mi];
    if (segKind === "soft-hyphen") {
      pushMeasuredSegment(segText, 0, discretionaryHyphenWidth, discretionaryHyphenWidth, segKind, segStart, null, null);
      preparedEndByAnalysisIndex[mi] = widths.length;
      continue;
    }
    if (segKind === "hard-break") {
      pushMeasuredSegment(segText, 0, 0, 0, segKind, segStart, null, null);
      preparedEndByAnalysisIndex[mi] = widths.length;
      continue;
    }
    if (segKind === "tab") {
      pushMeasuredSegment(segText, 0, 0, 0, segKind, segStart, null, null);
      preparedEndByAnalysisIndex[mi] = widths.length;
      continue;
    }
    const segMetrics = getSegmentMetrics(segText, cache);
    if (segKind === "text" && segMetrics.containsCJK) {
      let unitText = "";
      let unitStart = 0;
      for (const gs of graphemeSegmenter.segment(segText)) {
        const grapheme = gs.segment;
        if (unitText.length === 0) {
          unitText = grapheme;
          unitStart = gs.index;
          continue;
        }
        if (kinsokuEnd.has(unitText) || kinsokuStart.has(grapheme) || leftStickyPunctuation.has(grapheme) || engineProfile.carryCJKAfterClosingQuote && isCJK(grapheme) && endsWithClosingQuote(unitText)) {
          unitText += grapheme;
          continue;
        }
        const unitMetrics = getSegmentMetrics(unitText, cache);
        const w2 = getCorrectedSegmentWidth(unitText, unitMetrics, emojiCorrection);
        pushMeasuredSegment(unitText, w2, w2, w2, "text", segStart + unitStart, null, null);
        unitText = grapheme;
        unitStart = gs.index;
      }
      if (unitText.length > 0) {
        const unitMetrics = getSegmentMetrics(unitText, cache);
        const w2 = getCorrectedSegmentWidth(unitText, unitMetrics, emojiCorrection);
        pushMeasuredSegment(unitText, w2, w2, w2, "text", segStart + unitStart, null, null);
      }
      preparedEndByAnalysisIndex[mi] = widths.length;
      continue;
    }
    const w = getCorrectedSegmentWidth(segText, segMetrics, emojiCorrection);
    const lineEndFitAdvance = segKind === "space" || segKind === "preserved-space" || segKind === "zero-width-break" ? 0 : w;
    const lineEndPaintAdvance = segKind === "space" || segKind === "zero-width-break" ? 0 : w;
    if (segWordLike && segText.length > 1) {
      const graphemeWidths = getSegmentGraphemeWidths(segText, segMetrics, cache, emojiCorrection);
      const graphemePrefixWidths = engineProfile.preferPrefixWidthsForBreakableRuns ? getSegmentGraphemePrefixWidths(segText, segMetrics, cache, emojiCorrection) : null;
      pushMeasuredSegment(segText, w, lineEndFitAdvance, lineEndPaintAdvance, segKind, segStart, graphemeWidths, graphemePrefixWidths);
    } else {
      pushMeasuredSegment(segText, w, lineEndFitAdvance, lineEndPaintAdvance, segKind, segStart, null, null);
    }
    preparedEndByAnalysisIndex[mi] = widths.length;
  }
  const chunks = mapAnalysisChunksToPreparedChunks(analysis.chunks, preparedStartByAnalysisIndex, preparedEndByAnalysisIndex);
  const segLevels = segStarts === null ? null : computeSegmentLevels(analysis.normalized, segStarts);
  if (segments !== null) {
    return {
      widths,
      lineEndFitAdvances,
      lineEndPaintAdvances,
      kinds,
      simpleLineWalkFastPath,
      segLevels,
      breakableWidths,
      breakablePrefixWidths,
      discretionaryHyphenWidth,
      tabStopAdvance,
      chunks,
      segments
    };
  }
  return {
    widths,
    lineEndFitAdvances,
    lineEndPaintAdvances,
    kinds,
    simpleLineWalkFastPath,
    segLevels,
    breakableWidths,
    breakablePrefixWidths,
    discretionaryHyphenWidth,
    tabStopAdvance,
    chunks
  };
}
function mapAnalysisChunksToPreparedChunks(chunks, preparedStartByAnalysisIndex, preparedEndByAnalysisIndex) {
  const preparedChunks = [];
  for (let i = 0;i < chunks.length; i++) {
    const chunk = chunks[i];
    const startSegmentIndex = chunk.startSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.startSegmentIndex] : preparedEndByAnalysisIndex[preparedEndByAnalysisIndex.length - 1] ?? 0;
    const endSegmentIndex = chunk.endSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.endSegmentIndex] : preparedEndByAnalysisIndex[preparedEndByAnalysisIndex.length - 1] ?? 0;
    const consumedEndSegmentIndex = chunk.consumedEndSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.consumedEndSegmentIndex] : preparedEndByAnalysisIndex[preparedEndByAnalysisIndex.length - 1] ?? 0;
    preparedChunks.push({
      startSegmentIndex,
      endSegmentIndex,
      consumedEndSegmentIndex
    });
  }
  return preparedChunks;
}
function prepareInternal(text, font, includeSegments, options) {
  const analysis = analyzeText(text, getEngineProfile(), options?.whiteSpace);
  return measureAnalysis(analysis, font, includeSegments);
}
function prepareWithSegments(text, font, options) {
  return prepareInternal(text, font, true, options);
}
function getSegmentGraphemes(segmentIndex, segments, cache) {
  let graphemes = cache.get(segmentIndex);
  if (graphemes !== undefined)
    return graphemes;
  graphemes = [];
  const graphemeSegmenter = getSharedGraphemeSegmenter2();
  for (const gs of graphemeSegmenter.segment(segments[segmentIndex])) {
    graphemes.push(gs.segment);
  }
  cache.set(segmentIndex, graphemes);
  return graphemes;
}
function getLineTextCache(prepared) {
  let cache = sharedLineTextCaches.get(prepared);
  if (cache !== undefined)
    return cache;
  cache = new Map;
  sharedLineTextCaches.set(prepared, cache);
  return cache;
}
function lineHasDiscretionaryHyphen(kinds, startSegmentIndex, startGraphemeIndex, endSegmentIndex) {
  return endSegmentIndex > 0 && kinds[endSegmentIndex - 1] === "soft-hyphen" && !(startSegmentIndex === endSegmentIndex && startGraphemeIndex > 0);
}
function buildLineTextFromRange(segments, kinds, cache, startSegmentIndex, startGraphemeIndex, endSegmentIndex, endGraphemeIndex) {
  let text = "";
  const endsWithDiscretionaryHyphen = lineHasDiscretionaryHyphen(kinds, startSegmentIndex, startGraphemeIndex, endSegmentIndex);
  for (let i = startSegmentIndex;i < endSegmentIndex; i++) {
    if (kinds[i] === "soft-hyphen" || kinds[i] === "hard-break")
      continue;
    if (i === startSegmentIndex && startGraphemeIndex > 0) {
      text += getSegmentGraphemes(i, segments, cache).slice(startGraphemeIndex).join("");
    } else {
      text += segments[i];
    }
  }
  if (endGraphemeIndex > 0) {
    if (endsWithDiscretionaryHyphen)
      text += "-";
    text += getSegmentGraphemes(endSegmentIndex, segments, cache).slice(startSegmentIndex === endSegmentIndex ? startGraphemeIndex : 0, endGraphemeIndex).join("");
  } else if (endsWithDiscretionaryHyphen) {
    text += "-";
  }
  return text;
}
function createLayoutLine(prepared, cache, width, startSegmentIndex, startGraphemeIndex, endSegmentIndex, endGraphemeIndex) {
  return {
    text: buildLineTextFromRange(prepared.segments, prepared.kinds, cache, startSegmentIndex, startGraphemeIndex, endSegmentIndex, endGraphemeIndex),
    width,
    start: {
      segmentIndex: startSegmentIndex,
      graphemeIndex: startGraphemeIndex
    },
    end: {
      segmentIndex: endSegmentIndex,
      graphemeIndex: endGraphemeIndex
    }
  };
}
function toLayoutLineRange(line) {
  return {
    width: line.width,
    start: {
      segmentIndex: line.startSegmentIndex,
      graphemeIndex: line.startGraphemeIndex
    },
    end: {
      segmentIndex: line.endSegmentIndex,
      graphemeIndex: line.endGraphemeIndex
    }
  };
}
function stepLineRange(prepared, start, maxWidth) {
  const line = layoutNextLineRange(prepared, start, maxWidth);
  if (line === null)
    return null;
  return toLayoutLineRange(line);
}
function materializeLine(prepared, line) {
  return createLayoutLine(prepared, getLineTextCache(prepared), line.width, line.start.segmentIndex, line.start.graphemeIndex, line.end.segmentIndex, line.end.graphemeIndex);
}
function layoutNextLine(prepared, start, maxWidth) {
  const line = stepLineRange(prepared, start, maxWidth);
  if (line === null)
    return null;
  return materializeLine(prepared, line);
}

// pages/fonts/Jersey10-Regular.ttf
var Jersey10_Regular_default = "./Jersey10-Regular-a6rrmssk.ttf";

// pages/fonts/BodoniModa-VariableFont_opsz,wght.ttf
var BodoniModa_VariableFont_opsz_wght_default = "./BodoniModa-VariableFont_opsz,wght-0dbbw35b.ttf";

// pages/fonts/BodoniModa-Italic-VariableFont_opsz,wght.ttf
var BodoniModa_Italic_VariableFont_opsz_wght_default = "./BodoniModa-Italic-VariableFont_opsz,wght-f0y52qjv.ttf";

// pages/app.ts
var runnerSpriteHrefCache = null;
function runnerSpriteHref() {
  if (runnerSpriteHrefCache === null) {
    runnerSpriteHrefCache = new URL("/sprites/flame-runner.png", document.baseURI).href;
  }
  return runnerSpriteHrefCache;
}
function injectFontFaces() {
  const css = `
@font-face {
  font-family: 'Jersey 10';
  src: url(${JSON.stringify(Jersey10_Regular_default)}) format('truetype');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Bodoni Moda';
  src: url(${JSON.stringify(BodoniModa_VariableFont_opsz_wght_default)}) format('truetype');
  font-weight: 100 900;
  font-stretch: 100% 100%;
  font-display: swap;
}
@font-face {
  font-family: 'Bodoni Moda';
  src: url(${JSON.stringify(BodoniModa_Italic_VariableFont_opsz_wght_default)}) format('truetype');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
`;
  const el = document.createElement("style");
  el.setAttribute("data-game-fonts", "");
  el.textContent = css;
  document.head.appendChild(el);
}
async function safeFontLoad(desc) {
  try {
    await document.fonts.load(desc);
  } catch {}
}
var FONT_DESK = '500 17px "Bodoni Moda", serif';
var LH_DESK = 29;
var FONT_NARROW = '500 14px "Bodoni Moda", serif';
var LH_NARROW = 24;
var POINTER_HALF = 56;
var PIN_HALF = 34;
var MAX_PINS = 3;
var RUNNER_SHEET_W = 682;
var RUNNER_SHEET_H = 1024;
var RUNNER_COLS = 5;
var RUNNER_ROW_COUNT = 6;
var RUNNER_FRAME_W = RUNNER_SHEET_W / RUNNER_COLS;
var RUNNER_FRAME_H = RUNNER_SHEET_H / RUNNER_ROW_COUNT;
var RUNNER_RUN_ROW = 0;
var RUNNER_RUN_FRAMES = 5;
var RUNNER_TICK_MS = 78;
var BEST_STORAGE_KEY = "pretext-runner-best";
var RUNNER_EDGE_MARGIN = 72;
var CURSOR_FOLLOW_SPRING = 4.6;
var CURSOR_FOLLOW_DAMP = 0.82;
var RUN_SCORE_PER_SPEED = 0.046;
var SPRINT_SPEED_PX_S = 205;
var DRIFT_SPEED_PX_S = 88;
var MS_TO_SHIFT_GEAR_UP = 2800;
var MS_TO_SHIFT_GEAR_DOWN = 2600;
var TYPE_CHAR_POINTS = 12;
var TYPE_LINE_BONUS = 95;
var POINTER_ENGAGE_MS = 520;
var POINTER_MOVE_THRESH = 6;
var SNAKE_CELL_PX = 17;
var SNAKE_TICK_MS = 90;
var SNAKE_FOOD_SCORE = 28;
var GOLD_LINE_RESONANCE_MS = 2000;
var GOLD_LINE_BURST_SCORE = 42;
var DUET_ORBIT_PX = 96;
var DUET_RESONANCE_MS = 2400;
var DUET_BURST_SCORE = 24;
var LORE = `炎の頭を持つ侍の長き物語

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
`;
var arena;
var linesEl;
var pinsEl;
var orbEl;
var pinCountEl;
var toastEl;
var runnerAEl;
var gameScoreEl;
var gameSpeedEl;
var gameGearEl;
var gameBestEl;
var gameTypeEl;
var gameLayerEl;
var snakeCanvasEl;
var snakeCtx;
function grabDom() {
  const a = document.getElementById("arena");
  const lines = document.getElementById("lines");
  const pins = document.getElementById("pins");
  const orb = document.getElementById("orb");
  const pinCount = document.getElementById("pinCount");
  const toast = document.getElementById("toast");
  const ra = document.getElementById("runner-a");
  const gs = document.getElementById("gameScore");
  const gsp = document.getElementById("gameSpeed");
  const gg = document.getElementById("gameGear");
  const gb = document.getElementById("gameBest");
  const gt = document.getElementById("gameType");
  const gl = document.getElementById("gameLayer");
  const sc = document.getElementById("snake-canvas");
  if (!a || !lines || !pins || !orb || !pinCount || !toast || !ra || !gs || !gsp || !gg || !gb || !gt || !gl || !sc || !(sc instanceof HTMLCanvasElement)) {
    console.error("[pretext] Missing DOM nodes (need #arena, #lines, …). Script may run before <body>.");
    return false;
  }
  arena = a;
  linesEl = lines;
  pinsEl = pins;
  orbEl = orb;
  pinCountEl = pinCount;
  toastEl = toast;
  runnerAEl = ra;
  gameScoreEl = gs;
  gameSpeedEl = gsp;
  gameGearEl = gg;
  gameBestEl = gb;
  gameTypeEl = gt;
  gameLayerEl = gl;
  const sctx = sc.getContext("2d");
  if (!sctx) {
    console.error("[pretext] snake canvas 2d context unavailable");
    return false;
  }
  snakeCanvasEl = sc;
  snakeCtx = sctx;
  return true;
}
var prepared = prepareWithSegments(LORE, FONT_DESK);
var pointerStage = null;
var pointerPrevClientX = null;
var cursorFacingLeft = false;
var pins = [];
var nextPinId = 0;
var toastTimer = 0;
var GAME_STEER_CODES = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"]);
var gameScore = 0;
var gameGear = 1;
var bestScore = 0;
var displaySpeedPxS = 0;
var sprintStreakMs = 0;
var driftStreakMs = 0;
var lastStepDt = 0;
var runnerPx = 0;
var runnerPy = 0;
var runnerVx = 0;
var runnerVy = 0;
var runnerPhysicsInited = false;
var runnerFacingLeft = false;
var lastPhysicsMs = 0;
var lastPointerArenaX = 0;
var lastPointerArenaY = 0;
var lastPointerActivityMs = 0;
var pointerActivityPrimed = false;
var typingTargetNorm = "";
var typingProgress = 0;
var typingLineClear = false;
var typingChallengeSig = "";
var goldLineBand = null;
var goldLineResonMs = 0;
var duetResonMs = 0;
var runnerOnGoldLine = false;
var pinDuetZone = false;
var snakeMode = false;
var snakeCols = 0;
var snakeRows = 0;
var snakeOx = 0;
var snakeOy = 0;
var snakeBody = [];
var snakeDir = { x: 1, y: 0 };
var snakePendingDir = null;
var snakeFood = { x: 0, y: 0 };
var snakeLastTick = 0;
var snakeDimSig = "";
function loadBestScore() {
  try {
    const v = localStorage.getItem(BEST_STORAGE_KEY);
    if (v !== null)
      bestScore = Math.max(0, parseInt(v, 10) || 0);
  } catch {}
}
function lettersAndDigitsNorm(s) {
  return Array.from(s.normalize("NFKC")).filter((ch) => /\p{L}|\p{N}/u.test(ch)).join("").toLowerCase();
}
function maybeBumpBest() {
  const shown = Math.floor(gameScore);
  if (shown > bestScore) {
    bestScore = shown;
    try {
      localStorage.setItem(BEST_STORAGE_KEY, String(bestScore));
    } catch {}
  }
}
function isPlayerEngaged(now) {
  if (pointerStage !== null)
    return true;
  return now - lastPointerActivityMs < POINTER_ENGAGE_MS;
}
function steerCodeToDir(code) {
  if (code === "ArrowRight" || code === "KeyD")
    return { x: 1, y: 0 };
  if (code === "ArrowLeft" || code === "KeyA")
    return { x: -1, y: 0 };
  if (code === "ArrowDown" || code === "KeyS")
    return { x: 0, y: 1 };
  if (code === "ArrowUp" || code === "KeyW")
    return { x: 0, y: -1 };
  return null;
}
function syncSnakeGridMetrics(W, H) {
  snakeCols = Math.max(10, Math.floor(W / SNAKE_CELL_PX));
  snakeRows = Math.max(10, Math.floor(H / SNAKE_CELL_PX));
  snakeOx = Math.floor((W - snakeCols * SNAKE_CELL_PX) / 2);
  snakeOy = Math.floor((H - snakeRows * SNAKE_CELL_PX) / 2);
}
function initSnakeBody() {
  const cx = Math.floor(snakeCols / 2);
  const cy = Math.floor(snakeRows / 2);
  snakeBody = [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy }
  ];
  snakeDir = { x: 1, y: 0 };
  snakePendingDir = null;
}
function spawnSnakeFood() {
  const taken = new Set(snakeBody.map((s) => `${s.x},${s.y}`));
  for (let attempt = 0;attempt < 400; attempt++) {
    const x = Math.floor(Math.random() * snakeCols);
    const y = Math.floor(Math.random() * snakeRows);
    if (!taken.has(`${x},${y}`)) {
      snakeFood = { x, y };
      return;
    }
  }
  snakeFood = { x: 0, y: 0 };
}
function resetSnakeAfterDeath(msg) {
  initSnakeBody();
  spawnSnakeFood();
  snakeLastTick = performance.now();
  flashToast(msg);
}
function setSnakeMode(on) {
  snakeMode = on;
  arena.classList.toggle("snake-on", on);
  snakePendingDir = null;
  if (on) {
    const W = arena.clientWidth;
    const H = arena.clientHeight;
    syncSnakeGridMetrics(W, H);
    initSnakeBody();
    spawnSnakeFood();
    snakeLastTick = performance.now();
    snakeDimSig = `${W}:${H}`;
    flashToast("Snake — WASD/arrows, ` or Esc to exit");
  } else {
    snakeDimSig = "";
    flashToast("Runner / type mode");
  }
  scheduleRender();
}
function drawSnakeOverlay(W, H) {
  const ctx = snakeCtx;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const bw = Math.floor(W * dpr);
  const bh = Math.floor(H * dpr);
  if (snakeCanvasEl.width !== bw || snakeCanvasEl.height !== bh) {
    snakeCanvasEl.width = bw;
    snakeCanvasEl.height = bh;
    snakeCanvasEl.style.width = `${W}px`;
    snakeCanvasEl.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "rgba(6, 8, 10, 0.2)";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(197, 242, 90, 0.14)";
  ctx.lineWidth = 1;
  ctx.strokeRect(snakeOx + 0.5, snakeOy + 0.5, snakeCols * SNAKE_CELL_PX - 1, snakeRows * SNAKE_CELL_PX - 1);
  const fx = snakeOx + snakeFood.x * SNAKE_CELL_PX + SNAKE_CELL_PX / 2;
  const fy = snakeOy + snakeFood.y * SNAKE_CELL_PX + SNAKE_CELL_PX / 2;
  const rg = ctx.createRadialGradient(fx - 2, fy - 2, 0, fx, fy, SNAKE_CELL_PX * 0.7);
  rg.addColorStop(0, "rgba(255, 248, 200, 0.95)");
  rg.addColorStop(0.55, "rgba(255, 190, 90, 0.55)");
  rg.addColorStop(1, "rgba(255, 120, 40, 0.2)");
  ctx.fillStyle = rg;
  ctx.beginPath();
  ctx.arc(fx, fy, SNAKE_CELL_PX * 0.36, 0, Math.PI * 2);
  ctx.fill();
  for (let i = snakeBody.length - 1;i >= 0; i--) {
    const s = snakeBody[i];
    const px = snakeOx + s.x * SNAKE_CELL_PX;
    const py = snakeOy + s.y * SNAKE_CELL_PX;
    const inset = i === 0 ? 2 : 3.5;
    const w = SNAKE_CELL_PX - inset * 2;
    ctx.fillStyle = i === 0 ? "rgba(130, 235, 255, 0.95)" : `rgba(70, 200, 255, ${0.4 + i / Math.max(8, snakeBody.length) * 0.45})`;
    ctx.fillRect(px + inset, py + inset, w, w);
  }
}
function tickSnake(now, W, H) {
  const dim = `${W}:${H}`;
  if (dim !== snakeDimSig) {
    snakeDimSig = dim;
    syncSnakeGridMetrics(W, H);
    initSnakeBody();
    spawnSnakeFood();
    snakeLastTick = now;
  }
  if (now - snakeLastTick < SNAKE_TICK_MS) {
    drawSnakeOverlay(W, H);
    return;
  }
  snakeLastTick = now;
  if (snakePendingDir !== null) {
    const d = snakePendingDir;
    if (!(d.x === -snakeDir.x && d.y === -snakeDir.y)) {
      snakeDir = d;
    }
    snakePendingDir = null;
  }
  const head = snakeBody[0];
  const nx = head.x + snakeDir.x;
  const ny = head.y + snakeDir.y;
  if (nx < 0 || ny < 0 || nx >= snakeCols || ny >= snakeRows) {
    resetSnakeAfterDeath("Snake — wall!");
    drawSnakeOverlay(W, H);
    return;
  }
  if (snakeBody.some((s, i) => i > 0 && s.x === nx && s.y === ny)) {
    resetSnakeAfterDeath("Snake — tail!");
    drawSnakeOverlay(W, H);
    return;
  }
  snakeBody.unshift({ x: nx, y: ny });
  if (nx === snakeFood.x && ny === snakeFood.y) {
    gameScore += SNAKE_FOOD_SCORE * gameGear;
    maybeBumpBest();
    spawnSnakeFood();
  } else {
    snakeBody.pop();
  }
  drawSnakeOverlay(W, H);
}
function stepRunnerPhysics(now, W, H) {
  const idle = runnerKinematics(now, W, H);
  const m = RUNNER_EDGE_MARGIN;
  const tx = pointerStage !== null ? pointerStage.x : idle.cx;
  const ty = pointerStage !== null ? pointerStage.y : idle.cy;
  if (!runnerPhysicsInited) {
    runnerPx = tx;
    runnerPy = ty;
    runnerPhysicsInited = true;
    lastPhysicsMs = now;
    lastStepDt = 0;
    runnerVx = 0;
    runnerVy = 0;
    return;
  }
  const dt = Math.min(0.034, Math.max(0.008, (now - lastPhysicsMs) / 1000));
  lastPhysicsMs = now;
  lastStepDt = dt;
  const spring = pointerStage !== null ? CURSOR_FOLLOW_SPRING : 0.42;
  const damp = pointerStage !== null ? CURSOR_FOLLOW_DAMP : 0.38;
  const ax = (tx - runnerPx) * spring - runnerVx * damp;
  const ay = (ty - runnerPy) * spring - runnerVy * damp;
  runnerVx += ax * dt;
  runnerVy += ay * dt;
  if (pointerStage !== null) {
    runnerVx *= 0.992;
    runnerVy *= 0.992;
  } else {
    runnerVx *= 0.987;
    runnerVy *= 0.987;
  }
  runnerPx += runnerVx * dt;
  runnerPy += runnerVy * dt;
  runnerPx = Math.max(m, Math.min(W - m, runnerPx));
  runnerPy = Math.max(m, Math.min(H - m, runnerPy));
  if (pointerStage !== null) {
    if (runnerVx > 18)
      runnerFacingLeft = false;
    else if (runnerVx < -18)
      runnerFacingLeft = true;
  } else if (runnerVx > 28) {
    runnerFacingLeft = false;
  } else if (runnerVx < -28) {
    runnerFacingLeft = true;
  }
}
function tickRunGame(speedPxS, dt, now) {
  if (dt <= 0)
    return;
  displaySpeedPxS += (speedPxS - displaySpeedPxS) * 0.18;
  if (!isPlayerEngaged(now)) {
    return;
  }
  gameScore += speedPxS * dt * RUN_SCORE_PER_SPEED * gameGear;
  maybeBumpBest();
  const dtMs = dt * 1000;
  if (speedPxS >= SPRINT_SPEED_PX_S) {
    sprintStreakMs += dtMs;
    driftStreakMs = 0;
    if (sprintStreakMs >= MS_TO_SHIFT_GEAR_UP) {
      sprintStreakMs = 0;
      if (gameGear < 12) {
        gameGear += 1;
        flashToast(`Gear up ×${gameGear}`);
      }
    }
  } else if (speedPxS <= DRIFT_SPEED_PX_S) {
    driftStreakMs += dtMs;
    sprintStreakMs = Math.max(0, sprintStreakMs - dtMs * 0.35);
    if (driftStreakMs >= MS_TO_SHIFT_GEAR_DOWN) {
      driftStreakMs = 0;
      if (gameGear > 1) {
        gameGear -= 1;
      }
    }
  } else {
    driftStreakMs = Math.max(0, driftStreakMs - dtMs * 0.5);
    sprintStreakMs = Math.max(0, sprintStreakMs - dtMs * 0.45);
  }
}
function rectOverlapsHorizontalBandY(r, top, bottom) {
  return r.bottom > top && r.top < bottom;
}
function tickBodoniLayerSynergy(dt) {
  if (dt <= 0)
    return;
  const { dispW, dispH } = runnerDisplayScale();
  const rr = runnerHitRect(runnerPx, runnerPy, dispW, dispH);
  const dtMs = dt * 1000;
  runnerOnGoldLine = false;
  if (goldLineBand !== null) {
    runnerOnGoldLine = rectOverlapsHorizontalBandY(rr, goldLineBand.top, goldLineBand.bottom);
    if (runnerOnGoldLine) {
      goldLineResonMs += dtMs;
      if (goldLineResonMs >= GOLD_LINE_RESONANCE_MS) {
        goldLineResonMs = 0;
        gameScore += GOLD_LINE_BURST_SCORE * gameGear;
        maybeBumpBest();
      }
    } else {
      goldLineResonMs = Math.max(0, goldLineResonMs - dtMs * 0.65);
    }
  } else {
    goldLineResonMs = 0;
  }
  pinDuetZone = false;
  let bestD = Infinity;
  for (const p of pins) {
    const d = Math.hypot(runnerPx - p.x, runnerPy - p.y);
    if (d < bestD)
      bestD = d;
  }
  if (bestD < DUET_ORBIT_PX) {
    pinDuetZone = true;
    duetResonMs += dtMs;
    if (duetResonMs >= DUET_RESONANCE_MS) {
      duetResonMs = 0;
      gameScore += DUET_BURST_SCORE * gameGear;
      maybeBumpBest();
    }
  } else {
    duetResonMs = Math.max(0, duetResonMs - dtMs * 0.5);
  }
}
function stepGame(now, W, H) {
  if (snakeMode)
    return;
  stepRunnerPhysics(now, W, H);
  if (lastStepDt <= 0)
    return;
  const speedPxS = Math.hypot(runnerVx, runnerVy);
  tickRunGame(speedPxS, lastStepDt, now);
  tickBodoniLayerSynergy(lastStepDt);
}
function typo() {
  const narrow = matchMedia("(max-width: 720px)").matches;
  if (narrow) {
    return { font: FONT_NARROW, lh: LH_NARROW };
  }
  return { font: FONT_DESK, lh: LH_DESK };
}
function baseHalf() {
  return matchMedia("(max-width: 720px)").matches ? 44 : POINTER_HALF;
}
function half() {
  return baseHalf();
}
function syncPrepare() {
  const { font } = typo();
  prepared = prepareWithSegments(LORE, font);
}
function pointerRect() {
  if (pointerStage === null)
    return null;
  const h = half();
  return {
    left: pointerStage.x - h,
    top: pointerStage.y - h,
    right: pointerStage.x + h,
    bottom: pointerStage.y + h
  };
}
function pinRects() {
  return pins.map((p) => ({
    left: p.x - PIN_HALF,
    top: p.y - PIN_HALF,
    right: p.x + PIN_HALF,
    bottom: p.y + PIN_HALF
  }));
}
function runnerDisplayScale() {
  const narrow = matchMedia("(max-width: 720px)").matches;
  const dispH = narrow ? 200 : 270;
  const scale = dispH / RUNNER_FRAME_H;
  const dispW = RUNNER_FRAME_W * scale;
  return { dispH, scale, dispW };
}
function runnerKinematics(now, W, H) {
  const t = now * 0.00051;
  const cx = W * (0.5 + 0.37 * Math.sin(t));
  const cy = H * (0.56 + 0.24 * Math.cos(t * 1.05));
  const dcx = 0.37 * W * 0.00051 * Math.cos(t);
  return { cx, cy, facingLeft: dcx < 0 };
}
function runnerHitRect(cx, cy, dispW, dispH) {
  const w = dispW * 0.44;
  const h = dispH * 0.52;
  const tcx = cx;
  const tcy = cy - dispH * 0.44;
  return {
    left: tcx - w / 2,
    right: tcx + w / 2,
    top: tcy - h / 2,
    bottom: tcy + h / 2
  };
}
function runnerRects(_now, W, H) {
  if (W < 120 || H < 120)
    return [];
  const { dispW, dispH } = runnerDisplayScale();
  return [runnerHitRect(runnerPx, runnerPy, dispW, dispH)];
}
function allObstacleRects(now, W, H) {
  const out = [...pinRects()];
  if (!snakeMode) {
    out.push(...runnerRects(now, W, H));
  }
  const pr = pointerRect();
  if (pr)
    out.push(pr);
  return out;
}
function syncRunnersDom(now, _W, _H) {
  const { scale, dispW, dispH } = runnerDisplayScale();
  const bw = RUNNER_SHEET_W * scale;
  const bh = RUNNER_SHEET_H * scale;
  const url = `url(${JSON.stringify(runnerSpriteHref())})`;
  const col = Math.floor(now / RUNNER_TICK_MS) % RUNNER_RUN_FRAMES;
  const el = runnerAEl;
  el.style.width = `${dispW}px`;
  el.style.height = `${dispH}px`;
  el.style.left = `${runnerPx}px`;
  el.style.top = `${runnerPy}px`;
  el.style.backgroundImage = url;
  el.style.backgroundSize = `${bw}px ${bh}px`;
  el.style.backgroundPosition = `${-col * RUNNER_FRAME_W * scale}px ${-RUNNER_RUN_ROW * RUNNER_FRAME_H * scale}px`;
  const faceLeft = pointerStage !== null ? cursorFacingLeft : runnerFacingLeft;
  const flip = faceLeft ? -1 : 1;
  el.style.transform = `translate(-50%, -82%) scaleX(${flip})`;
  el.classList.toggle("runner--on-gold", runnerOnGoldLine && !snakeMode);
}
function subtractInterval(iv, blo, bhi) {
  if (bhi <= iv.lo || blo >= iv.hi)
    return [iv];
  const out = [];
  if (blo > iv.lo)
    out.push({ lo: iv.lo, hi: Math.min(blo, iv.hi) });
  if (bhi < iv.hi)
    out.push({ lo: Math.max(bhi, iv.lo), hi: iv.hi });
  return out;
}
function slotMulti(bandTop, bandBottom, cL, cR, gap, rects, minW) {
  let intervals = [{ lo: cL, hi: cR }];
  for (const r of rects) {
    if (r.bottom <= bandTop || r.top >= bandBottom)
      continue;
    const blo = r.left - gap;
    const bhi = r.right + gap;
    const next = [];
    for (const iv of intervals) {
      next.push(...subtractInterval(iv, blo, bhi));
    }
    intervals = next.filter((iv) => iv.hi - iv.lo >= minW);
  }
  if (intervals.length === 0)
    return { x: cL, width: cR - cL };
  let best = intervals[0];
  for (const iv of intervals) {
    if (iv.hi - iv.lo > best.hi - best.lo)
      best = iv;
  }
  return { x: best.lo, width: best.hi - best.lo };
}
function toStage(cx, cy) {
  const r = arena.getBoundingClientRect();
  return { x: cx - r.left, y: cy - r.top };
}
function syncOrbSize() {
  const h = half();
  orbEl.style.width = `${h * 2}px`;
  orbEl.style.height = `${h * 2}px`;
  orbEl.style.marginLeft = `${-h}px`;
  orbEl.style.marginTop = `${-h}px`;
}
function syncOrb() {
  if (pointerStage === null) {
    arena.classList.remove("on");
    return;
  }
  arena.classList.add("on");
  syncOrbSize();
  orbEl.style.left = `${pointerStage.x}px`;
  orbEl.style.top = `${pointerStage.y}px`;
}
function syncHud() {
  pinCountEl.textContent = String(pins.length);
  gameScoreEl.textContent = String(Math.floor(gameScore));
  gameSpeedEl.textContent = String(Math.round(displaySpeedPxS));
  gameGearEl.textContent = `×${gameGear}`;
  gameBestEl.textContent = String(bestScore);
  if (typingTargetNorm.length === 0) {
    gameTypeEl.textContent = "—";
  } else if (typingLineClear) {
    gameTypeEl.textContent = "OK";
  } else {
    gameTypeEl.textContent = `${typingProgress}/${typingTargetNorm.length}`;
  }
  if (snakeMode) {
    gameLayerEl.textContent = "…";
  } else {
    const bits = [];
    if (goldLineBand !== null) {
      if (runnerOnGoldLine) {
        bits.push(`${Math.min(100, Math.round(100 * goldLineResonMs / GOLD_LINE_RESONANCE_MS))}%`);
      } else if (goldLineResonMs > 100) {
        bits.push(`·${Math.min(99, Math.round(100 * goldLineResonMs / GOLD_LINE_RESONANCE_MS))}`);
      }
    }
    if (pinDuetZone) {
      bits.push(`⌖${Math.min(100, Math.round(100 * duetResonMs / DUET_RESONANCE_MS))}%`);
    } else if (duetResonMs > 100) {
      bits.push("⌖·");
    }
    gameLayerEl.textContent = bits.length > 0 ? bits.join(" ") : "—";
  }
}
function handleTypingKeydown(e) {
  if (snakeMode)
    return;
  if (e.ctrlKey || e.metaKey || e.altKey)
    return;
  if (typingLineClear || typingTargetNorm.length === 0)
    return;
  let keyChar = null;
  if (e.code === "Space")
    keyChar = " ";
  else if (e.key.length === 1)
    keyChar = e.key;
  if (keyChar === null)
    return;
  const normKey = keyChar.normalize("NFKC").toLowerCase();
  const chars = Array.from(typingTargetNorm);
  if (typingProgress >= chars.length)
    return;
  const expect = chars[typingProgress];
  if (expect === undefined)
    return;
  if (normKey === expect) {
    e.preventDefault();
    typingProgress += 1;
    gameScore += TYPE_CHAR_POINTS * gameGear;
    maybeBumpBest();
    if (typingProgress >= chars.length) {
      gameScore += TYPE_LINE_BONUS * gameGear;
      maybeBumpBest();
      typingLineClear = true;
      typingProgress = 0;
      flashToast("Gold line typed!");
    }
    scheduleRender();
  } else if (/[\p{L}\p{N}]/u.test(keyChar)) {
    typingProgress = 0;
    scheduleRender();
  }
}
function flashToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("on");
  if (toastTimer)
    window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("on");
    toastTimer = 0;
  }, 2200);
}
function syncPinsDom() {
  pinsEl.replaceChildren(...pins.map((pin) => {
    const d = document.createElement("div");
    d.className = "pin";
    d.style.left = `${pin.x}px`;
    d.style.top = `${pin.y}px`;
    return d;
  }));
}
function render() {
  linesEl.replaceChildren();
  const pad = 20;
  const topPad = 2;
  const bottomPad = 3;
  const H = arena.clientHeight;
  const W = arena.clientWidth;
  const now = performance.now();
  stepGame(now, W, H);
  const cL = pad;
  const cR = W - pad;
  const rects = allObstacleRects(now, W, H);
  const gap = 14;
  const minW = 68;
  let cur = { segmentIndex: 0, graphemeIndex: 0 };
  let y = topPad;
  const frag = document.createDocumentFragment();
  const { font, lh } = typo();
  let lineCount = 0;
  let lineGuard = 0;
  const lineTexts = [];
  const lineBands = [];
  while (y + lh <= H - bottomPad && lineGuard < 800) {
    lineGuard++;
    const { x, width: maxW } = slotMulti(y, y + lh, cL, cR, gap, rects, minW);
    let line = layoutNextLine(prepared, cur, maxW);
    if (line === null) {
      cur = { segmentIndex: 0, graphemeIndex: 0 };
      line = layoutNextLine(prepared, cur, maxW);
      if (line === null)
        break;
    }
    const el = document.createElement("p");
    el.className = "line";
    el.textContent = line.text;
    lineTexts.push(line.text);
    lineBands.push({ top: y, bottom: y + lh });
    el.style.left = `${Math.round(x)}px`;
    el.style.top = `${Math.round(y)}px`;
    el.style.maxWidth = `${Math.round(maxW)}px`;
    el.style.font = font;
    el.style.lineHeight = `${lh}px`;
    lineCount++;
    frag.appendChild(el);
    cur = line.end;
    y += lh;
  }
  const hotLine = Math.floor(now / 2800) % Math.max(1, lineCount);
  const hotRaw = lineCount > 0 ? lineTexts[hotLine] ?? "" : "";
  const norm = lettersAndDigitsNorm(hotRaw);
  const sig = `${hotLine}:${norm}`;
  if (sig !== typingChallengeSig) {
    typingChallengeSig = sig;
    typingProgress = 0;
    typingLineClear = false;
  }
  typingTargetNorm = norm;
  if (lineCount > 0 && hotLine >= 0 && hotLine < lineBands.length) {
    goldLineBand = lineBands[hotLine];
  } else {
    goldLineBand = null;
  }
  const children = frag.children;
  for (let i = 0;i < children.length; i++) {
    const el = children[i];
    if (i === hotLine)
      el.classList.add("line--hot");
  }
  linesEl.appendChild(frag);
  syncRunnersDom(now, W, H);
  syncOrb();
  syncPinsDom();
  syncHud();
  if (snakeMode) {
    tickSnake(now, W, H);
  }
}
var renderRaf = 0;
function scheduleRender() {
  if (renderRaf)
    return;
  renderRaf = requestAnimationFrame(() => {
    renderRaf = 0;
    render();
  });
}
function gameLoop() {
  scheduleRender();
  requestAnimationFrame(gameLoop);
}
function startGameLoopWhenArenaReady() {
  const w = arena.clientWidth;
  const h = arena.clientHeight;
  if (w < 48 || h < 48) {
    requestAnimationFrame(startGameLoopWhenArenaReady);
    return;
  }
  requestAnimationFrame(gameLoop);
}
function wireKeyboard() {
  window.addEventListener("keydown", (e) => {
    const t = e.target;
    const inField = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
    if (!inField) {
      if (e.code === "Escape" && snakeMode) {
        e.preventDefault();
        setSnakeMode(false);
        return;
      }
      if (e.code === "KeyBackquote") {
        e.preventDefault();
        setSnakeMode(!snakeMode);
        return;
      }
    }
    if (GAME_STEER_CODES.has(e.code)) {
      if (inField)
        return;
      e.preventDefault();
      if (!snakeMode)
        return;
      const d = steerCodeToDir(e.code);
      if (d !== null) {
        snakePendingDir = d;
      }
      scheduleRender();
      return;
    }
    if (!inField)
      handleTypingKeydown(e);
  }, { passive: false });
}
function wireArenaEvents() {
  arena.addEventListener("pointerenter", (e) => {
    pointerPrevClientX = e.clientX;
    pointerStage = toStage(e.clientX, e.clientY);
    lastPointerArenaX = pointerStage.x;
    lastPointerArenaY = pointerStage.y;
    pointerActivityPrimed = true;
    scheduleRender();
  });
  arena.addEventListener("pointermove", (e) => {
    const t = performance.now();
    const st = toStage(e.clientX, e.clientY);
    if (pointerPrevClientX !== null) {
      const dx = e.clientX - pointerPrevClientX;
      if (Math.abs(dx) > 0.35)
        cursorFacingLeft = dx < 0;
    }
    pointerPrevClientX = e.clientX;
    if (!pointerActivityPrimed) {
      lastPointerArenaX = st.x;
      lastPointerArenaY = st.y;
      pointerActivityPrimed = true;
    } else if (Math.hypot(st.x - lastPointerArenaX, st.y - lastPointerArenaY) > POINTER_MOVE_THRESH) {
      lastPointerActivityMs = t;
      lastPointerArenaX = st.x;
      lastPointerArenaY = st.y;
    }
    pointerStage = st;
    scheduleRender();
  });
  arena.addEventListener("pointerleave", () => {
    pointerStage = null;
    pointerPrevClientX = null;
    pointerActivityPrimed = false;
    lastPointerActivityMs = Number.NEGATIVE_INFINITY;
    scheduleRender();
  });
  arena.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const { x, y } = toStage(e.clientX, e.clientY);
    pins.push({ id: nextPinId++, x, y });
    if (pins.length > MAX_PINS)
      pins.shift();
    flashToast("Pin placed");
    scheduleRender();
  });
  window.addEventListener("resize", () => {
    syncPrepare();
    scheduleRender();
  });
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
async function boot() {
  injectFontFaces();
  loadBestScore();
  if (document.fonts) {
    await Promise.race([document.fonts.ready, sleep(4000)]);
  }
  await safeFontLoad('28px "Jersey 10"');
  await safeFontLoad(FONT_DESK);
  await safeFontLoad(FONT_NARROW);
  syncHud();
  syncPrepare();
  startGameLoopWhenArenaReady();
}
function startApp() {
  if (!grabDom())
    return;
  wireKeyboard();
  wireArenaEvents();
  boot().catch(() => {
    syncPrepare();
    syncHud();
    startGameLoopWhenArenaReady();
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp, { once: true });
} else {
  startApp();
}
