import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StatusBadge from '@/components/StatusBadge'
import { db } from '@/lib/db'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

async function getStats() {
  try {
    const [totalRecords, convictions, districts, totalReports] = await Promise.all([
      db.perpetrator.count(),
      db.perpetrator.count({ where: { convictionStatus: { contains: 'Convicted' } } }),
      db.perpetrator.findMany({ select: { location: true } }),
      db.submission.count(),
    ])
    const uniqueDistricts = new Set(districts.map(p => p.location.split(',')[0].trim())).size
    return { totalRecords, convictions, districts: uniqueDistricts, totalReports }
  } catch {
    return { totalRecords: 0, convictions: 0, districts: 0, totalReports: 0 }
  }
}

async function getPreviewRecords() {
  try {
    return db.perpetrator.findMany({ take: 8, orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function LandingPage() {
  const [stats, records] = await Promise.all([getStats(), getPreviewRecords()])

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      {/* HERO */}
      <div
        className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(192,57,43,0.07) 0%, transparent 60%)' }}
      >
        <div className={`${C} pt-28 pb-16 flex flex-col justify-center`}>
          <div className="text-[10px] text-brand-red font-bold tracking-[3.5px] uppercase mb-8 flex items-center gap-1.5">
            <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
              <path d="M10 1L3 4v5c0 4.4 3 8.5 7 9.9C14 17.5 17 13.4 17 9V4L10 1z" />
            </svg>
            Bangladesh Child Safety Initiative
          </div>

          <h1 className="font-display font-black leading-[0.92] tracking-tight mb-8 max-w-[820px]">
            <span className="block text-[clamp(64px,10vw,120px)] text-brand-cream">চুপ নই।</span>
            <span className="block text-[clamp(64px,10vw,120px)] text-brand-red italic">Not Silent.</span>
          </h1>

          <div className="mb-10 max-w-[480px]">
            <p className="text-brand-cream text-[15px] mb-2 font-light">আমরা দেখছি। আমরা বলব।</p>
            <p className="text-brand-muted text-[15px] leading-relaxed font-light">
              We are ordinary people. We cannot sleep when a child is hurt. So we built this.
            </p>
          </div>

          <div
            className="grid grid-cols-3 mb-12 max-w-[680px]"
            style={{ gap: '1px', background: '#1a1a1a' }}
          >
            {[
              { num: '৭,০৬৮', label: 'Rape Cases in 2025' },
              { num: '২৭%', label: 'Increase from 2024' },
              { num: '৯৯%', label: 'Cases Invisible to Public' },
            ].map(s => (
              <div key={s.label} className="bg-brand-black px-6 py-5 hover:bg-brand-card transition-colors">
                <div className="font-display text-[36px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                <div className="text-[9px] text-brand-muted font-bold tracking-[1.5px] uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/report"
              className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
            >
              Report a Case →
            </Link>
            <Link
              href="/registry"
              className="text-brand-cream border border-[#2a2a2a] px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] transition-colors"
            >
              View Registry
            </Link>
          </div>
        </div>
      </div>

      {/* JUSTICE DELAYED */}
      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-14 flex gap-16 items-center`}>
          <div className="flex-1 max-w-[480px]">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black text-brand-cream leading-[1.1] mb-5">
              Justice <span className="text-brand-red italic">Delayed</span> is Justice Denied
            </h2>
            <p className="text-brand-muted text-[14px] leading-relaxed font-light mb-8">
              132,107 rape cases are pending in Bangladesh&apos;s tribunals. Nearly one in four has been
              waiting over five years for justice. Survivors deserve swift accountability.
            </p>
            <Link
              href="/registry"
              className="inline-block bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div
            className="grid grid-cols-2 flex-shrink-0"
            style={{ gap: '1px', background: '#1e1e2e' }}
          >
            {[
              { num: '132K+', label: 'Pending Cases' },
              { num: '99', label: 'Tribunals' },
              { num: '30K+', label: '5+ Years Waiting' },
              { num: '23%', label: 'Stuck in System' },
            ].map(s => (
              <div
                key={s.label}
                className="px-10 py-8 hover:brightness-110 transition-all"
                style={{ background: 'rgba(192,57,43,0.08)', minWidth: '180px' }}
              >
                <div className="font-display text-[42px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                <div className="text-[9px] text-brand-muted font-bold tracking-[2px] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THREE PILLARS */}
      <div className="border-b border-brand-border">
        <div className={C}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#111' }}>
            {[
              { title: 'Community Protection', desc: 'This registry empowers communities with knowledge about individuals who pose a risk to children.' },
              { title: 'Verified Records', desc: 'All entries are verified against public court records, law enforcement data, and NGO reports before publication.' },
              { title: 'Support Survivors', desc: 'We stand with survivors. If you or someone you know needs help, contact Ain o Salish Kendra: 01779-554391.' },
            ].map(p => (
              <div key={p.title} className="bg-brand-black px-8 py-7 border-l-[3px] border-l-transparent hover:border-l-brand-red transition-all">
                <div className="font-display text-[15px] font-bold text-brand-cream mb-2">{p.title}</div>
                <div className="text-[12.5px] text-brand-muted leading-relaxed font-light">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REGISTRY PREVIEW */}
      <div className="py-12 flex-1">
        <div className={C}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Public Record</p>
              <h2 className="font-display text-[30px] font-black text-brand-cream">Perpetrator Registry</h2>
              <p className="text-[12px] text-brand-muted mt-1">Showing {records.length} of {stats.totalRecords} records</p>
            </div>
            <Link href="/registry" className="text-brand-red text-[10px] font-bold tracking-[1px] uppercase no-underline hover:underline">
              View all →
            </Link>
          </div>

          <div className="border border-brand-border overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-card">
                  {['Name', 'Offense', 'Location', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-brand-muted text-sm">No records yet.</td>
                  </tr>
                )}
                {records.map((r, i) => (
                  <tr key={r.id} className={`border-b border-brand-border hover:bg-brand-card transition-colors ${i % 2 === 1 ? 'bg-[#080808]' : 'bg-brand-black'}`}>
                    <td className="px-5 py-3.5">
                      <div className="font-display text-[14px] font-bold text-brand-cream">{r.name}</div>
                      {r.age && <div className="text-[11px] text-brand-muted mt-0.5">Age {r.age}</div>}
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-brand-muted">{r.crimeTypes.join(', ')}</td>
                    <td className="px-5 py-3.5 text-[12px] text-brand-muted">{r.location}</td>
                    <td className="px-5 py-3.5 text-[12px] text-[#444] whitespace-nowrap">{r.incidentDate}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.convictionStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WHAT WE STAND FOR */}
      <div id="what-we-stand-for" style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-4">আমাদের সনদ | Our Charter</p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-brand-cream leading-tight mb-4">
              What We <span className="text-brand-red italic">Stand For</span>
            </h2>
            <p className="text-brand-muted text-[14px] font-light max-w-[520px] mx-auto leading-relaxed">
              5 government demands and 5 community actions to end sexual violence against children in Bangladesh.
            </p>
          </div>

          {/* Government Demands */}
          <div className="mb-12">
            <h3 className="font-display text-[20px] font-bold text-brand-cream mb-1 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
              Government Demands
            </h3>
            <div className="grid grid-cols-3 gap-8 mt-6">
              {[
                { n: '1', title: 'Mandatory Reporting Law', desc: 'Anyone who knows a child is in danger must legally report it. Silence becomes a crime.' },
                { n: '2', title: 'National Sex Offender Registry', desc: 'A public database of convicted offenders accessible to schools and institutions. Transparency protects.' },
                { n: '3', title: 'Fast-Track Courts, 180-Day Verdicts', desc: 'Every rape and child abuse case resolved within 180 days. Justice delayed is justice denied.' },
                { n: '4', title: 'Public Mental Health Services', desc: 'Free mental health care for every survivor in every upazila. Healing matters.' },
                { n: '5', title: 'Online Exploitation Task Force', desc: 'A dedicated team hunting online predators before abuse happens. Prevention saves lives.' },
              ].map(({ n, title, desc }) => (
                <div key={n}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] mb-3 flex-shrink-0"
                    style={{ border: '2px solid #c0392b' }}
                  >
                    {n}
                  </div>
                  <p className="font-display text-[15px] font-bold text-brand-cream mb-2">{title}</p>
                  <p className="text-[16px] text-brand-muted font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Must Do */}
          <div className="mb-12">
            <h3 className="font-display text-[20px] font-bold text-brand-cream mb-1 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
              What We Must Do
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { n: '1', title: 'Talk About Body Safety', desc: 'Tell children no one can touch their body without permission. This conversation saves lives.' },
                { n: '2', title: "Stay Vigilant, Don't Stay Silent", desc: 'Report warning signs. Bullying, cruelty, abuse—speak up. Watching out is responsibility.' },
                { n: '3', title: 'Believe Survivors', desc: "Don't question what they wore or where they went. Believe first. Silence protects perpetrators." },
                { n: '4', title: 'Sustained Action', desc: 'Not just three days of outrage. Keep the conversation alive in schools, mosques, communities.' },
                { n: '5', title: 'Hold Leaders Accountable', desc: 'Ask your teachers, imams, leaders directly. If they cover for abusers, your voice matters.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="border border-brand-border p-5" style={{ background: 'rgba(192,57,43,0.04)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-brand-red font-black text-[13px] mb-3"
                    style={{ border: '2px solid #c0392b' }}
                  >
                    {n}
                  </div>
                  <p className="font-display text-[15px] font-bold text-brand-cream mb-2">{title}</p>
                  <p className="text-[16px] text-brand-muted font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="border border-brand-red/30 p-8 text-center" style={{ background: 'rgba(192,57,43,0.04)' }}>
            <p className="text-brand-muted text-[13px] font-light mb-3">This is not a dream. This is our demand.</p>
            <p className="font-display text-[24px] font-black text-brand-red">চুপ নই | Not Silent</p>
          </div>

        </div>
      </div>

      {/* WHO ARE WE */}
      <div id="who-are-we" className="bg-brand-black" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>

          <div className="max-w-[760px] mx-auto">
            <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-4">Our Story</p>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-black text-brand-cream leading-tight mb-2">
              Who Are We?
            </h2>
            <p className="font-display text-[22px] font-black text-brand-red italic mb-10">
              Honestly? We are nobody.
            </p>

            <div className="space-y-5 text-[15px] text-brand-muted font-light leading-[1.8]">
              <p>
                We are not an NGO. We have no registration number, no annual report, no foreign grant keeping the lights on.
                We are not the kind of people who fly in funding from abroad and call it changing society.
              </p>
              <p>
                We are not politicians. No party flag, no constituency, no seat at any table where decisions get made.
              </p>
              <p>
                We are not celebrities. Our photos are not on this website and that is a deliberate choice.
                We do not want to buy anyone&apos;s attention with a familiar face.
              </p>
              <p>
                We do not have an office. No boardroom, no conference table, no chairs where we sit and draw up grand plans.
              </p>

              <div
                className="border-l-[3px] border-l-brand-red pl-6 py-1 my-8"
                style={{ background: 'rgba(192,57,43,0.04)' }}
              >
                <p className="text-brand-cream font-light text-[16px] leading-[1.8]">
                  We are just ordinary people.
                </p>
              </div>

              <p>
                People who cannot sleep at night when they hear a child has been hurt. People who open the newspaper
                in the morning with a kind of dread, because they know that somewhere, again, something has happened.
                People who scroll through their feed and suddenly stop, feel something heavy settle in their chest,
                and think, <span className="text-brand-cream italic">what happens next?</span>
              </p>
              <p>
                We are people who could not stop at anger. Who asked themselves whether the anger could be turned into something useful.
              </p>
              <p>
                We are not against the government. We want the government to do its job. But we also know that
                waiting and watching is not enough.
              </p>
              <p>
                The history of this country says that real change comes when ordinary people stand up themselves.
                We want to stand up. Not with noise, but with a process.
              </p>
              <p>
                We want to collect information. Verify it. And get it into the hands of the right authorities.
                Without spectacle, without viral posts, through one clean and responsible system.
              </p>

              <p className="text-brand-cream font-medium text-[16px]">That is who we are.</p>

              <p>
                We are witnesses. We are record-keepers. We are the people who say,
              </p>
            </div>

            <div className="mt-10 border border-brand-red/30 p-8 text-center" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <p className="font-display text-[22px] font-black text-brand-cream italic mb-3">
                &ldquo;We see. We will speak.&rdquo;
              </p>
              <p className="font-display text-[20px] font-black text-brand-red">
                চুপ নই. Not silent.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* WHAT WE WANT */}
      <div id="what-we-want" style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>
          <div className="max-w-[800px] mx-auto">

            {/* Part 1: Government demands */}
            <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-4">আমাদের দাবি</p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-brand-cream leading-tight mb-4">
              What We <span className="text-brand-red italic">Want</span>
            </h2>

            <div className="mb-12">
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                সরকারের কাছে আমাদের দাবি
              </h3>
              <p className="text-brand-muted text-[14px] font-light leading-relaxed mb-8">
                আমরা সরকারের বিরুদ্ধে না। আমরা চাই সরকার তার নিজের দায়িত্ব পালন করুক। নিচের প্রতিটা দাবি এই দেশের আইন, সমাজ এবং সন্তানদের জন্য।
              </p>

              <div className="space-y-8">
                {[
                  {
                    n: '১', title: 'বাধ্যতামূলক রিপোর্টিং আইন',
                    body: 'প্রতিটা ডাক্তার, শিক্ষক, এনজিও কর্মী, ইমাম, পুরোহিত, যে কেউ যিনি জানেন বা সন্দেহ করেন যে একটা শিশু বিপদে আছে, তাকে আইনত বাধ্য করতে হবে স্থানীয় কর্তৃপক্ষকে জানাতে। জানা সত্ত্বেও চুপ থাকা যদি অপরাধ হয়, তাহলে অনেক কিছু বদলে যাবে। কারণ এখন অনেকে জানেন, কিন্তু বলেন না।'
                  },
                  {
                    n: '২', title: 'জাতীয় যৌন অপরাধী নিবন্ধন',
                    body: 'যে ব্যক্তি একবার এই অপরাধে দোষী সাব্যস্ত হয়েছে, তার নাম, ছবি এবং তথ্য একটা জাতীয় ডেটাবেজে থাকবে। স্কুল, কিন্ডারগার্টেন, মাদ্রাসা, যেকোনো শিশু-সংক্রান্ত প্রতিষ্ঠান নিয়োগের আগে এই তালিকা দেখতে পারবে। একজন অপরাধী যেন বারবার নতুন জায়গায় গিয়ে নতুন শিকার খুঁজতে না পারে।'
                  },
                  {
                    n: '৩', title: 'প্রতিটা থানায় শিশু সুরক্ষা ইউনিট',
                    body: 'একটা মেয়ে থানায় গেলে তাকে একজন পুরুষ অফিসারের সামনে সব বলতে হবে না। প্রতিটা থানায় প্রশিক্ষিত নারী অফিসার থাকবে। একটা শিশু-বান্ধব রিপোর্টিং কক্ষ থাকবে। এবং একজন শিশু মনোবিজ্ঞানী অন-কলে থাকবে। কারণ ট্রমায় থাকা একটা বাচ্চা বা নারীর কাছ থেকে বিবৃতি নেওয়া একটা দক্ষতার কাজ, যেটা সবাই পারে না।'
                  },
                  {
                    n: '৪', title: 'ফাস্ট-ট্র্যাক আদালত, ১৮০ দিনের মধ্যে রায়',
                    body: 'ঘটনার তারিখ থেকে ১৮০ দিনের মধ্যে শিশু নির্যাতন ও ধর্ষণ মামলার রায় হতে হবে। তনুর বাবা ১০ বছর অপেক্ষা করেছেন। এটা আর হওয়া উচিত না। বিচারে দেরি মানে বিচার না পাওয়া। এবং বিচার না পাওয়া মানে পরবর্তী অপরাধীকে সাহস দেওয়া।'
                  },
                  {
                    n: '৫', title: 'সরকারি মানসিক স্বাস্থ্য পরিষেবা, সবার জন্য',
                    body: 'একটা শিশু যে নির্যাতনের শিকার হয়েছে, তার শুধু বিচার দরকার না। তার সুস্থ হওয়া দরকার। দেশের প্রতিটা উপজেলায় শিশুদের জন্য বিনামূল্যে মানসিক স্বাস্থ্যসেবা নিশ্চিত করতে হবে। কারণ ক্ষত শুধু শরীরে থাকে না।'
                  },
                  {
                    n: '৬', title: 'অনলাইন শিশু শোষণ প্রতিরোধে বিশেষ টাস্কফোর্স',
                    body: 'অপরাধ এখন রাস্তায় সীমাবদ্ধ নেই। সে ঢুকে গেছে ফোনে, গেমিং অ্যাপে, মেসেঞ্জারে। একটা বিশেষ টাস্কফোর্স দরকার যারা অনলাইন শিকারি খুঁজে বের করবে, প্রমাণ সংগ্রহ করবে এবং আক্রমণ হওয়ার আগেই ব্যবস্থা নেবে।'
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] flex-shrink-0 mt-0.5"
                      style={{ border: '2px solid #c0392b' }}
                    >
                      {n}
                    </div>
                    <div>
                      <p className="font-display text-[17px] font-bold text-brand-cream mb-2">{title}</p>
                      <p className="text-[14px] text-brand-muted font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-brand-border my-12" />

            {/* Part 2: People's appeal */}
            <div className="mb-12">
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                মানুষের কাছে আমাদের আবেদন
              </h3>
              <p className="text-brand-muted text-[14px] font-light leading-relaxed mb-8">
                সরকার একা পারবে না। আমরাও জানি। কিন্তু আমরাও যদি বসে থাকি, তাহলে কিছুই হবে না। এই অংশটা আইনের কথা না। এটা আমাদের নিজেদের কথা।
              </p>

              <div className="space-y-8">
                {[
                  {
                    n: 'ক', title: 'শরীরের নিরাপত্তার কথা ঘরে বলুন',
                    body: 'আপনার ছেলে বা মেয়েকে বলুন, কেউ তার শরীরে অনুমতি ছাড়া হাত দিতে পারবে না। কেউ না। আত্মীয় হলেও না, শিক্ষক হলেও না। এই কথাটা বলতে লজ্জা নেই। না বললেই বিপদ। একটা সচেতন সন্তান অনেক বেশি নিরাপদ।'
                  },
                  {
                    n: 'খ', title: 'সতর্ক থাকুন, চুপ থাকবেন না',
                    body: 'পশু নির্যাতন, বুলিং, দুর্বলদের হেয় করা এগুলো ছোট মনে হলেও এগুলো সতর্কতার লক্ষণ। যে বাচ্চা বিড়াল মারে সে বড় হয়ে কী করতে পারে, সেটা গবেষণা বলে। আশেপাশে কাউকে এরকম আচরণ করতে দেখলে সরাসরি রিপোর্ট করুন। নজর রাখা দায়িত্ব, নাক গলানো না।'
                  },
                  {
                    n: 'গ', title: 'বেঁচে যাওয়া মানুষকে বিচার করবেন না',
                    body: 'একটা মেয়ে কী পরেছিল, কোথায় গিয়েছিল, কখন ঘরে ফিরেছিল, এগুলো কোনো প্রশ্নের বিষয় না। অপরাধটা তার ছিল না। যদি কেউ কষ্টের কথা বলে, তাকে প্রথমে বিশ্বাস করুন। প্রশ্ন পরে করুন। বিশ্বাস না পেলে তারা আর বলবে না। আর না বললে অপরাধী আবার সুযোগ পাবে।'
                  },
                  {
                    n: 'ঘ', title: 'তিনদিনের আবেগ নয়, দীর্ঘমেয়াদী সচেতনতা',
                    body: 'একটা ঘটনা ভাইরাল হলে সবাই জেগে ওঠে। তিনদিন পর সবাই ভুলে যায়। এই চক্র ভাঙতে হবে। স্কুলে, মসজিদে, মন্দিরে, পাড়ার চায়ের দোকানে, বছরের পর বছর এই কথা বলতে হবে। একটা মোমবাতি মিছিল কিছু করে না। কিন্তু একটা সচেতন মানুষ অনেক কিছু করতে পারে।'
                  },
                  {
                    n: 'ঙ', title: 'নেতাদের জবাবদিহি করুন',
                    body: 'আপনার সন্তানের স্কুলের শিক্ষক, মসজিদের ইমাম, মন্দিরের পুরোহিত, পাড়ার কাউন্সিলর, এরা সবাই দায়িত্বশীল মানুষ। তারা যদি কোনো অপরাধকে আড়াল করে, তাহলে তাদের জিজ্ঞেস করুন। সরাসরি। কারণ আপনার নীরবতা তাদের সাহস দেয়।'
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex gap-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] flex-shrink-0 mt-0.5"
                      style={{ border: '2px solid #c0392b' }}
                    >
                      {n}
                    </div>
                    <div>
                      <p className="font-display text-[17px] font-bold text-brand-cream mb-2">{title}</p>
                      <p className="text-[14px] text-brand-muted font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="border border-brand-red/30 p-8" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-5">আমরা যে বাংলাদেশ চাই</h3>
              <div className="space-y-2 text-[14px] text-brand-muted font-light leading-relaxed mb-6">
                <p>এমন একটা দেশ, যেখানে একটা মেয়ে রাতে একা রাস্তায় হাঁটতে পারে।</p>
                <p>যেখানে একটা বাচ্চা তার বিশ্বস্ত মানুষের কাছে নিরাপদ।</p>
                <p>যেখানে বিচার ১০ বছর ধরে বিচারের অপেক্ষায় থাকে না।</p>
                <p>যেখানে অপরাধী জানে, কোথাও না কোথাও, কেউ না কেউ, দেখছে।</p>
              </div>
              <p className="text-brand-cream text-[15px] font-medium mb-4">এটা স্বপ্ন না। এটা আমাদের দাবি।</p>
              <p className="font-display text-[24px] font-black text-brand-red">চুপ নই।</p>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: '#0d0d0d', borderTop: '3px solid #c0392b' }}>
        <div className={`${C} py-8 flex justify-between items-center`}>
          <div>
            <h3 className="font-display text-[24px] font-black text-brand-cream mb-1 italic">
              &ldquo;Know something? Report it.&rdquo;
            </h3>
            <p className="text-brand-muted text-[13px] font-light">
              Your report can protect children and communities. All submissions are reviewed before publication.
            </p>
          </div>
          <Link
            href="/report"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline whitespace-nowrap hover:bg-brand-red-dark transition-colors"
          >
            Submit a Report
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
