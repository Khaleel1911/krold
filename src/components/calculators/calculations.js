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

// Month-by-month simulation of a systematic withdrawal plan.
export function calcSWP(corpus, monthlyWithdrawal, ratePct, years) {
  const r = ratePct / 100 / 12
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
