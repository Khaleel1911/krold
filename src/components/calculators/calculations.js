export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)))
}

export function formatINRShort(value) {
  const v = Math.max(0, Math.round(value))
  if (v >= 1_00_00_000) return `₹${(v / 1_00_00_000).toFixed(2)} Cr`
  if (v >= 1_00_000) return `₹${(v / 1_00_000).toFixed(2)} L`
  return formatINR(v)
}

// Slider end labels: ₹25 Cr, ₹50 L, ₹10K, ₹500.
export function formatINRCompact(value) {
  const trim = (n) => String(Number(n.toFixed(2)))
  if (value >= 1_00_00_000) return `₹${trim(value / 1_00_00_000)} Cr`
  if (value >= 1_00_000) return `₹${trim(value / 1_00_000)} L`
  if (value >= 1_000) return `₹${trim(value / 1_000)}K`
  return `₹${value}`
}

// Effective monthly rate for an annual return, as the existing kroldmfins.com calculators use.
const monthlyRate = (annualPct) => Math.pow(1 + annualPct / 100, 1 / 12) - 1

// Future value of a monthly SIP (annuity due — investment at the start of each month).
export function calcSIP(monthly, ratePct, years) {
  const r = ratePct / 100 / 12
  const n = Math.round(years * 12)
  const invested = monthly * n
  const total = r === 0 ? invested : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  return { invested, total, returns: total - invested }
}

// Future value of a one-time lumpsum investment, compounded annually.
export function calcLumpsum(principal, ratePct, years) {
  const total = principal * Math.pow(1 + ratePct / 100, years)
  return { invested: principal, total, returns: total - principal }
}

// Wealth calculator: today's portfolio, plus a lumpsum at the start of every year,
// plus a monthly SIP, all growing at one assumed return.
export function calcWealth({ current, lumpsum, sip, rate, years }) {
  const r = rate / 100
  const m = monthlyRate(rate)
  const fromCurrent = current * Math.pow(1 + r, years)
  const fromLumpsum = (1 + r) * lumpsum * ((Math.pow(1 + r, years) - 1) / r)
  const fromSip = (1 + m) * sip * ((Math.pow(1 + m, years * 12) - 1) / m)
  const total = fromCurrent + fromLumpsum + fromSip
  const invested = current + lumpsum * years + sip * 12 * years
  return { invested, total, returns: Math.max(0, total - invested) }
}

// Month-by-month simulation of a systematic withdrawal plan.
export function calcSWP(corpus, monthlyWithdrawal, ratePct, years) {
  const r = monthlyRate(ratePct)
  const n = Math.round(years * 12)
  let balance = corpus
  let totalWithdrawn = 0
  let depletedAtMonth = null

  for (let m = 1; m <= n; m++) {
    balance *= 1 + r
    const withdrawal = Math.min(monthlyWithdrawal, Math.max(balance, 0))
    balance -= withdrawal
    totalWithdrawn += withdrawal
    if (balance <= 0) {
      depletedAtMonth = m
      balance = 0
      break
    }
  }

  return { invested: corpus, finalBalance: Math.max(balance, 0), totalWithdrawn, depletedAtMonth }
}

// SIP + SWP ("Future Annuity" on kroldmfins.com): build a corpus with a yearly top-up SIP,
// let it grow through a deferment period, then draw an inflation-linked monthly income
// that leaves the chosen balance at the end.
export function calcSipSwp({
  current,
  sip,
  topUp,
  sipYears,
  deferYears,
  accRate,
  swpYears,
  swpRate,
  inflation,
  endBalance,
}) {
  const ra = accRate / 100
  const g = topUp / 100
  const ma = monthlyRate(accRate)

  // One year of SIPs, valued at the end of that year; each later year is `topUp`% larger.
  const firstYear = (1 + ma) * sip * ((Math.pow(1 + ma, 12) - 1) / ma)
  const sipValue =
    Math.abs(ra - g) < 1e-9
      ? firstYear * sipYears * Math.pow(1 + ra, sipYears - 1)
      : (firstYear / (ra - g)) * (Math.pow(1 + ra, sipYears) - Math.pow(1 + g, sipYears))
  const corpus = (sipValue + current * Math.pow(1 + ra, sipYears)) * Math.pow(1 + ra, deferYears)

  const sipInvested = g === 0 ? sip * 12 * sipYears : sip * 12 * ((Math.pow(1 + g, sipYears) - 1) / g)
  const invested = current + sipInvested

  // Withdrawals: set aside today's value of the end balance, spread the rest as a growing monthly income.
  const md = monthlyRate(swpRate)
  const mi = monthlyRate(inflation)
  const n = swpYears * 12
  const usable = corpus - endBalance / Math.pow(1 + swpRate / 100, swpYears)
  const monthly =
    Math.abs(md - mi) < 1e-12
      ? (usable * (1 + md)) / n
      : (usable * (md - mi)) / (1 - Math.pow(1 + mi, n) * Math.pow(1 + md, -n))
  const firstSwp = Math.max(0, monthly)
  const totalWithdrawn = mi === 0 ? firstSwp * n : firstSwp * ((Math.pow(1 + mi, n) - 1) / mi)

  return { corpus, invested, firstSwp, totalWithdrawn, shortfall: usable <= 0 }
}
