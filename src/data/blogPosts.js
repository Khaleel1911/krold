// The first posts, from KMfins_Blog_1.docx and KMfins_Blog_2.docx. They are what the blog
// shows until the admin saves anything; the first save copies them into the Cloudinary
// store, where they can be edited like any other post.

const COMPOUNDING = `
<p>Arjun and Vikram have sat at neighbouring desks for fifteen years. Same age, same salary, same love for Sunday cricket. At 40, both start thinking about retirement.</p>
<p>Arjun acts first. He puts ₹5 lakh into a long-term investment and leaves it alone.</p>
<p>Vikram decides to wait. “I’ll invest when I can afford a bigger amount,” he says. Ten years later, at 50, he keeps his word and invests ₹10 lakh — double what Arjun put in.</p>
<p>Both earn the same return of 12% a year. Both retire at 60. <strong>Who do you think retires richer?</strong></p>
<h2>The surprising answer</h2>
<table>
  <tbody>
    <tr><th></th><th>Arjun</th><th>Vikram</th></tr>
    <tr><td>Amount invested</td><td>₹5,00,000</td><td>₹10,00,000</td></tr>
    <tr><td>Age at investing</td><td>40</td><td>50</td></tr>
    <tr><td>Years invested</td><td>20</td><td>10</td></tr>
    <tr><td>Assumed annual return</td><td>12%</td><td>12%</td></tr>
    <tr><td><strong>Value at age 60</strong></td><td><strong>₹48,23,147</strong></td><td><strong>₹31,05,848</strong></td></tr>
  </tbody>
</table>
<p>Arjun invested <strong>half</strong> the money, yet retires with about <strong>55% more</strong>. The only thing he had more of was time.</p>
<h2>What actually happened</h2>
<p>Compounding means earning returns on your returns. In the first year, Arjun earns 12% on his ₹5 lakh. In the second year, he earns 12% on that larger amount. Each year, the base grows a little bigger, and so does the growth.</p>
<p>At 12% a year, money roughly doubles every six years. So Arjun’s ₹5 lakh became about ₹10 lakh by 46, ₹20 lakh by 52, and nearly ₹40 lakh by 58.</p>
<p>Here is the twist. By the time Vikram finally wrote his ₹10 lakh cheque at 50, Arjun’s original ₹5 lakh had already grown to about ₹15.50 lakh. Vikram was starting the race when Arjun was already well ahead — and still running.</p>
<h2>Think of it as a snowball</h2>
<p>Roll a small snowball down a long hill, and it gathers more snow with every turn. Roll a bigger snowball down a short hill, and it never catches up. In investing, the size of the hill is time.</p>
<blockquote><p>Compound interest is the eighth wonder of the world. Those who understand it, earn it; those who don’t, pay it.</p></blockquote>
<p>That famous line is often attributed to Albert Einstein. Whoever said it first, the maths behind it holds.</p>
<h2>Three lessons from Arjun</h2>
<ul>
  <li><p><strong>Start early, even if it’s small.</strong> A modest amount invested today can outgrow a larger amount invested later.</p></li>
  <li><p><strong>Stay invested.</strong> Compounding does its best work in the later years. Withdrawing early stops the snowball just as it gets big.</p></li>
  <li><p><strong>Be patient.</strong> The first few years can look unexciting. That’s normal — the real growth comes later.</p></li>
</ul>
<h2>Your next step</h2>
<p>The best time to start was yesterday. The next best time is today. Talk to our team, and we’ll help you put the power of compounding to work for your goals.</p>
`

const PROCRASTINATION = `
<p>Shyam turns 35 this year. He runs a busy business, and retirement feels far away. But he has done the thinking. He wants to retire at 60, and he has decided to invest ₹1 lakh every year until then.</p>
<p>Then life gets in the way. Orders pile up, a new machine needs installing, and the paperwork can wait. Shyam tells himself, “What difference will one year make? I’ll start next year.”</p>
<p><strong>It sounds harmless. It isn’t.</strong></p>
<h2>The price of one year</h2>
<p>Let’s assume Shyam’s investments grow at 12% a year, and he invests at the start of each year.</p>
<table>
  <tbody>
    <tr><th></th><th>Starts this year</th><th>Starts next year</th></tr>
    <tr><td>Annual investment</td><td>₹1,00,000</td><td>₹1,00,000</td></tr>
    <tr><td>Years of investing</td><td>25</td><td>24</td></tr>
    <tr><td>Total amount invested</td><td>₹25,00,000</td><td>₹24,00,000</td></tr>
    <tr><td>Assumed annual return</td><td>12%</td><td>12%</td></tr>
    <tr><td><strong>Value at age 60</strong></td><td><strong>₹1,49,33,393</strong></td><td><strong>₹1,32,33,387</strong></td></tr>
  </tbody>
</table>
<p>By waiting one year, Shyam invests just ₹1 lakh less. But he retires with <strong>₹17,00,006 less</strong>. That’s nearly 17 times the money he “saved” by waiting.</p>
<h2>Why one year costs so much</h2>
<p>It feels like a delay should cost you the first year. In reality, it costs you the <strong>last</strong> year — and with compounding, the last year is the most valuable one.</p>
<p>In the final year before retirement, Shyam’s portfolio is at its largest. A year of growth on a fund worth over ₹2 crore is worth far more than a year of growth on ₹1 lakh. Starting late doesn’t trim the beginning of the journey. It cuts off the most rewarding stretch at the end.</p>
<h2>The usual reasons we wait</h2>
<ul>
  <li><p>“I’ll start when I earn more.”</p></li>
  <li><p>“Let the markets settle first.”</p></li>
  <li><p>“I don’t have time to do the paperwork.”</p></li>
  <li><p>“I’ll do it after this big expense.”</p></li>
</ul>
<p>Each one sounds reasonable. Each one has a price tag — and it’s usually far bigger than we imagine.</p>
<h2>So, what is your cost of procrastination?</h2>
<p>You don’t need a perfect plan or a large amount to begin. The most important thing is — <strong>you need to begin</strong>. Share your goal and timeline with our team, and we’ll show you exactly what waiting would cost you — and help you get started this week, not next year.</p>
`

export const SEED_POSTS = [
  {
    id: 'seed-cost-of-procrastination',
    title: 'The Cost of Procrastination — What “I’ll Start Next Year” Really Costs You',
    slug: 'cost-of-procrastination',
    excerpt:
      'Shyam delayed investing by just one year to save ₹1 lakh. It cost him ₹17 lakh at retirement. Here is why the last year of compounding is the most valuable one.',
    content: PROCRASTINATION.trim(),
    coverImage: null,
    category: 'Investing Basics',
    tags: ['Compounding', 'SIP', 'Retirement'],
    author: 'Krold Mfins Team',
    disclaimer:
      'This example is for illustration only. It assumes constant annual returns of 12%, with investments made at the start of each year. Returns are not guaranteed and actual results will vary. Mutual Fund investments are subject to market risks, read all scheme related documents carefully.',
    featured: false,
    status: 'published',
    createdAt: '2026-02-11T04:30:00.000Z',
    updatedAt: '2026-02-11T04:30:00.000Z',
    publishedAt: '2026-02-11T04:30:00.000Z',
  },
  {
    id: 'seed-power-of-compounding',
    title: 'The Magical Power of Compounding — Why Time Beats Money',
    slug: 'power-of-compounding',
    excerpt:
      'Arjun invested half as much as Vikram, yet retired with 55% more. The difference wasn’t money — it was ten extra years of compounding.',
    content: COMPOUNDING.trim(),
    coverImage: null,
    category: 'Investing Basics',
    tags: ['Compounding', 'Long-term investing'],
    author: 'Krold Mfins Team',
    disclaimer:
      'The example given is for illustration only. It assumes a constant return of 12% a year, compounded annually. The returns are not guaranteed. Mutual Fund investments are subject to market risks, read all scheme related documents carefully.',
    featured: true,
    status: 'published',
    createdAt: '2025-06-18T04:30:00.000Z',
    updatedAt: '2025-06-18T04:30:00.000Z',
    publishedAt: '2025-06-18T04:30:00.000Z',
  },
]
