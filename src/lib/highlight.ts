export interface Token {
  text: string
  cls: string
}

const TOKEN_RE =
  /(\/\/[^\n]*)|("(?:[^"\\\n]|\\.)*")|(@\w+)|\b(public|private|protected|class|interface|record|enum|extends|implements|return|new|final|static|void|long|int|boolean|double|var|if|else|for|while|try|catch|throw|throws|this|null|true|false|import|package)\b|\b([A-Z][A-Za-z0-9_]*)\b/g

const CLASS_MAP: Record<number, string> = {
  1: 'text-muted/60 italic',
  2: 'text-emerald-300/75',
  3: 'text-amber-300/85',
  4: 'text-accent',
  5: 'text-sky-300/75',
}

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  TOKEN_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = TOKEN_RE.exec(line)) !== null) {
    if (m.index > last) {
      tokens.push({ text: line.slice(last, m.index), cls: '' })
    }
    const groupIndex = [1, 2, 3, 4, 5].find((g) => m![g] !== undefined) ?? 0
    tokens.push({ text: m[0], cls: CLASS_MAP[groupIndex] ?? '' })
    last = m.index + m[0].length
  }
  if (last < line.length) {
    tokens.push({ text: line.slice(last), cls: '' })
  }
  return tokens
}

export function tokenizeJson(value: string): Token[] {
  const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g
  const tokens: Token[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(value)) !== null) {
    if (m.index > last) tokens.push({ text: value.slice(last, m.index), cls: '' })
    if (m[1] !== undefined && m[2] !== undefined) {
      tokens.push({ text: m[1], cls: 'text-sky-300/80' })
      tokens.push({ text: m[2], cls: 'text-muted' })
    } else if (m[1] !== undefined) {
      tokens.push({ text: m[1], cls: 'text-emerald-300/75' })
    } else if (m[3] !== undefined) {
      tokens.push({ text: m[3], cls: 'text-amber-300/85' })
    } else {
      tokens.push({ text: m[0], cls: 'text-amber-300/85' })
    }
    last = m.index + m[0].length
  }
  if (last < value.length) tokens.push({ text: value.slice(last), cls: '' })
  return tokens
}
