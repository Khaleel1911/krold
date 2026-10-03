import { calcSIP, calcLumpsum, calcSWP, calcWealth, calcSipSwp } from './calculations'

const CR = 1_00_00_000
const L = 1_00_000

// Each field may carry `info`: a plain-language hint shown from the ⓘ next to its label.
// `group` starts a titled block of fields within a calculator.

export const WEALTH = {
  id: 'wealth',
  label: 'Wealth',
  title: 'Wealth Calculator',
  description: 'Understand how disciplined savings can help you build wealth over your chosen investment horizon.',
  fields: [
    {
      key: 'current',
      label: 'Current Portfolio Value',
      min: 0,
      max: 25 * CR,
      step: L,
      prefix: '₹',
      info: 'The total value of everything you have invested today (mutual funds, shares, bonds and so on). Enter 0 if you are just starting.',
    },
    {
      key: 'lumpsum',
      label: 'Lumpsum Investment Every Year',
      min: 0,
      max: 50 * L,
      step: 10_000,
      prefix: '₹',
      info: 'A one-time amount you plan to invest once every year, such as an annual bonus. Enter 0 if you will not add one.',
    },
    {
      key: 'sip',
      label: 'Monthly SIP',
      min: 500,
      max: 10 * L,
      step: 500,
      prefix: '₹',
      info: 'SIP (Systematic Investment Plan) is a fixed amount you invest every month. Enter the total of all your monthly SIPs.',
    },
    {
      key: 'rate',
      label: 'Assumed Portfolio Return',
      min: 4,
      max: 13,
      step: 0.5,
      suffix: '%',
      info: 'The average yearly return you expect your investments to earn. Returns are not guaranteed, so a conservative figure is safer.',
    },
    {
      key: 'years',
      label: 'Duration',
      min: 0,
      max: 50,
      step: 1,
      suffix: 'Yr',
      info: 'How many years from today you want to see your wealth projected for.',
    },
  ],
  defaults: { current: 25 * L, lumpsum: 3 * L, sip: 20_000, rate: 12, years: 20 },
  compute: (v) => {
    const { invested, total, returns } = calcWealth(v)
    return {
      centerValue: total,
      centerLabel: 'Your wealth will be',
      segments: [
        { label: 'Amount Invested', value: invested, colorClass: 'primary' },
        { label: 'Est. Growth', value: returns, colorClass: 'secondary' },
      ],
    }
  },
}

export const SWP = {
  id: 'swp',
  label: 'SWP',
  title: 'SWP Calculator',
  description: 'Explore how systematic withdrawals can help turn your accumulated wealth into a regular income stream.',
  fields: [
    {
      key: 'corpus',
      label: 'Current Portfolio Value',
      min: 25 * L,
      max: 50 * CR,
      step: L,
      prefix: '₹',
      info: 'The amount you have invested today that your monthly income will be withdrawn from.',
    },
    {
      key: 'rate',
      label: 'Assumed Portfolio Return',
      min: 4,
      max: 8,
      step: 0.5,
      suffix: '%',
      info: 'The average yearly return you expect on the money that stays invested while you withdraw. Income portfolios are usually lower-risk, so this is typically lower than for growth investing.',
    },
    {
      key: 'withdrawal',
      label: 'Current Monthly SWP',
      min: 10_000,
      max: 5 * L,
      step: 1_000,
      prefix: '₹',
      info: 'SWP (Systematic Withdrawal Plan) is a fixed amount you take out of your investments every month, like a monthly income.',
    },
    {
      key: 'years',
      label: 'Duration',
      min: 0,
      max: 30,
      step: 1,
      suffix: 'Yr',
      info: 'How many years you want the monthly withdrawals to continue.',
    },
  ],
  defaults: { corpus: CR, rate: 7, withdrawal: 50_000, years: 20 },
  compute: (v) => {
    const { totalWithdrawn, finalBalance, depletedAtMonth } = calcSWP(v.corpus, v.withdrawal, v.rate, v.years)
    return {
      centerValue: finalBalance,
      centerLabel: depletedAtMonth ? 'Runs out early' : 'Balance left',
      segments: [
        { label: 'Total Withdrawn', value: totalWithdrawn, colorClass: 'primary' },
        { label: 'Balance Left', value: finalBalance, colorClass: 'secondary' },
      ],
      footnote: depletedAtMonth
        ? `At this withdrawal rate the portfolio lasts about ${Math.floor(depletedAtMonth / 12)} yr ${depletedAtMonth % 12} mo.`
        : null,
    }
  },
}

// Mirrors Calculators → Future Annuity → Calculate SWP on kroldmfins.com, plus today's portfolio.
export const SIP_SWP = {
  id: 'sip-swp',
  label: 'SIP + SWP',
  title: 'SIP + SWP Calculator',
  description:
    'Plan both sides of your financial journey — build your corpus with SIPs and generate income through systematic withdrawals.',
  fields: [
    {
      group: 'Build your corpus',
      key: 'current',
      label: 'Current Portfolio Value',
      min: 0,
      max: 25 * CR,
      step: L,
      prefix: '₹',
      info: 'What your existing investments are worth today. They keep growing alongside your SIPs. Enter 0 if you are just starting.',
    },
    {
      key: 'sip',
      label: 'Monthly SIP Amount',
      min: 500,
      max: 10 * L,
      step: 500,
      prefix: '₹',
      info: 'The fixed amount you will invest every month while building your corpus.',
    },
    {
      key: 'topUp',
      label: 'Top Up Every Year',
      min: 0,
      max: 15,
      step: 1,
      suffix: '%',
      info: 'How much you raise your SIP each year. For example, 10% turns a ₹10,000 SIP into ₹11,000 the next year. Enter 0 to keep it fixed.',
    },
    {
      key: 'sipYears',
      label: 'SIP Period',
      min: 1,
      max: 60,
      step: 1,
      suffix: 'Yr',
      info: 'How many years you will keep investing through your SIP.',
    },
    {
      key: 'deferYears',
      label: 'Deferment Period',
      min: 0,
      max: 50,
      step: 1,
      suffix: 'Yr',
      info: 'The waiting time, in years, between your last SIP and your first withdrawal. Your money stays invested and keeps growing. Enter 0 to start withdrawals as soon as SIPs end.',
    },
    {
      key: 'accRate',
      label: 'Assumed Return (Accumulation Period)',
      min: 4,
      max: 15,
      step: 0.5,
      suffix: '%',
      info: 'The average yearly return you expect while you are investing and during the deferment period.',
    },
    {
      group: 'Withdraw an income',
      key: 'swpYears',
      label: 'SWP Period',
      min: 1,
      max: 60,
      step: 1,
      suffix: 'Yr',
      info: 'How many years you want to receive a monthly income from your corpus.',
    },
    {
      key: 'swpRate',
      label: 'Assumed Return (Distribution Period)',
      min: 1,
      max: 10,
      step: 0.5,
      suffix: '%',
      info: 'The average yearly return you expect on the money that stays invested while you withdraw.',
    },
    {
      key: 'inflation',
      label: 'Assumed Inflation (Distribution Period)',
      min: 0,
      max: 10,
      step: 0.5,
      suffix: '%',
      info: 'The yearly rise in prices. Your monthly income grows at this rate so it keeps its buying power. Enter 0 for a fixed monthly amount.',
    },
    {
      key: 'endBalance',
      label: 'Balance Required at End of SWP',
      min: 0,
      max: 10 * CR,
      step: L,
      prefix: '₹',
      info: 'The amount you want left over when withdrawals end, for example to pass on to your family. Enter 0 if you plan to use it all.',
    },
  ],
  defaults: {
    current: 10 * L,
    sip: 25_000,
    topUp: 5,
    sipYears: 15,
    deferYears: 5,
    accRate: 12,
    swpYears: 25,
    swpRate: 7,
    inflation: 5,
    endBalance: CR,
  },
  compute: (v) => {
    const { corpus, invested, firstSwp, totalWithdrawn, shortfall } = calcSipSwp(v)
    return {
      centerValue: firstSwp,
      centerLabel: v.inflation > 0 ? 'Starting monthly SWP' : 'Monthly SWP',
      segments: [
        { label: 'Total Investment', value: invested, colorClass: 'primary' },
        { label: 'Total Withdrawal', value: totalWithdrawn, colorClass: 'secondary' },
      ],
      extras: [{ label: 'Accumulated corpus when SWP starts', value: corpus }],
      footnote: shortfall
        ? 'The corpus is not enough to leave the balance you want at the end. Lower that balance or invest more.'
        : null,
    }
  },
}

export const SIP = {
  id: 'sip',
  label: 'SIP',
  title: 'SIP Calculator',
  description: 'See how small, regular monthly investments compound into a large corpus over time.',
  fields: [
    {
      key: 'monthly',
      label: 'Monthly Investment',
      min: 500,
      max: 100000,
      step: 500,
      prefix: '₹',
      info: 'SIP (Systematic Investment Plan) is a fixed amount you invest every month.',
    },
    { key: 'rate', label: 'Expected Return (p.a.)', min: 1, max: 30, step: 0.5, suffix: '%' },
    { key: 'years', label: 'Time Period', min: 1, max: 40, step: 1, suffix: 'Yr' },
  ],
  defaults: { monthly: 25000, rate: 12, years: 15 },
  compute: (v) => {
    const { invested, total, returns } = calcSIP(v.monthly, v.rate, v.years)
    return {
      centerValue: total,
      centerLabel: 'Total Value',
      segments: [
        { label: 'Invested Amount', value: invested, colorClass: 'primary' },
        { label: 'Est. Returns', value: returns, colorClass: 'secondary' },
      ],
    }
  },
}

export const LUMPSUM = {
  id: 'lumpsum',
  label: 'Lumpsum',
  title: 'Lumpsum Calculator',
  description: 'Estimate how a one-time investment grows with the power of compounding.',
  fields: [
    { key: 'principal', label: 'Investment Amount', min: 10000, max: 10000000, step: 10000, prefix: '₹' },
    { key: 'rate', label: 'Expected Return (p.a.)', min: 1, max: 30, step: 0.5, suffix: '%' },
    { key: 'years', label: 'Time Period', min: 1, max: 40, step: 1, suffix: 'Yr' },
  ],
  defaults: { principal: 500000, rate: 12, years: 15 },
  compute: (v) => {
    const { invested, total, returns } = calcLumpsum(v.principal, v.rate, v.years)
    return {
      centerValue: total,
      centerLabel: 'Total Value',
      segments: [
        { label: 'Invested Amount', value: invested, colorClass: 'primary' },
        { label: 'Est. Returns', value: returns, colorClass: 'secondary' },
      ],
    }
  },
}

// The home page features three; the calculators page shows them all.
export const FEATURED_CALCULATORS = [WEALTH, SWP, SIP_SWP]
export const ALL_CALCULATORS = [WEALTH, SWP, SIP_SWP, SIP, LUMPSUM]
