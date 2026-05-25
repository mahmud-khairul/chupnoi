export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StatusBadge from '@/components/StatusBadge'
import HeroSection from '@/components/HeroSection'
import { db } from '@/lib/db'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

type Record = {
  id: string; name: string; age: string | null
  crimeTypes: string[]; location: string
  incidentDate: string; convictionStatus: string
}

async function getStats() {
  try {
    const [totalRecords, convictions, districts, totalReports] = await Promise.all([
      db.perpetrator.count(),
      db.perpetrator.count({ where: { convictionStatus: { contains: 'Convicted' } } }),
      db.perpetrator.findMany({ select: { location: true } }),
      db.submission.count(),
    ])
    const uniqueDistricts = new Set(districts.map((p: { location: string }) => p.location.split(',')[0].trim())).size
    return { totalRecords, convictions, districts: uniqueDistricts, totalReports }
  } catch {
    return { totalRecords: 0, convictions: 0, districts: 0, totalReports: 0 }
  }
}

async function getPreviewRecords(): Promise<Record[]> {
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
      <HeroSection />

      {/* JUSTICE DELAYED */}
      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-14 flex gap-16 items-center`}>
          <div className="flex-1 max-w-[480px]">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black text-brand-cream leading-[1.1] mb-5">
              বিচার <span className="text-brand-red italic">বিলম্বিত</span> মানে বিচার না পাওয়া
            </h2>
            <p className="text-brand-muted text-[16px] leading-relaxed font-light mb-8">
              বাংলাদেশের আদালতে ১৩২,১০৭ ধর্ষণের মামলা অপেক্ষমাণ। চারিটির একটি পাঁচ বছরেরও বেশি অপেক্ষা করেছে। বেঁচে যাওয়া মানুষ দ্রুত বিচার পাওয়ার যোগ্য।
            </p>
            <Link
              href="/registry"
              className="inline-block bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
            >
              আরও জানুন
            </Link>
          </div>

          <div className="flex-shrink-0">
            <div
              className="grid grid-cols-2"
              style={{ gap: '1px', background: '#1e1e2e' }}
            >
              {[
                { num: '132K+', label: 'অপেক্ষমাণ মামলা' },
                { num: '99', label: 'আদালত' },
                { num: '30K+', label: '৫+ বছর অপেক্ষায়' },
                { num: '23%', label: 'সিস্টেমে আটকে আছে' },
              ].map(s => (
                <div
                  key={s.label}
                  className="px-10 py-8 hover:brightness-110 transition-all"
                  style={{ background: 'rgba(192,57,43,0.08)', minWidth: '180px' }}
                >
                  <div className="font-display text-[42px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                  <div className="text-[14px] text-brand-muted font-bold tracking-[2px] uppercase">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-brand-muted font-light tracking-wide mt-3">*ইন্টারনেট থেকে সংগৃহীত</p>
          </div>
        </div>
      </div>

      {/* THREE PILLARS */}
      <div className="border-b border-brand-border">
        <div className={C}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#111' }}>
            {[
              { title: 'সমাজের সুরক্ষা', desc: 'এই তালিকা সমাজকে সেই মানুষদের সম্পর্কে তথ্য দেয় যারা শিশুদের জন্য হুমকিস্বরূপ।' },
              { title: 'যাচাইকৃত তথ্য', desc: 'প্রকাশের আগে প্রতিটি তথ্য আদালতের নথি, আইন প্রয়োগকারী সংস্থার তথ্য ও এনজিও রিপোর্টের বিপরীতে যাচাই করা হয়।' },
              { title: 'ভুক্তভোগীর পাশে', desc: 'আমরা ভুক্তভোগীদের সাথে আছি। সাহায্যের প্রয়োজন হলে আইন ও সালিশ কেন্দ্রে যোগাযোগ করুন: ০১৭৭৯-৫৫৪৩৯১।' },
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
              <p className="text-[14px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Public Record</p>
              <h2 className="font-display text-[30px] font-black text-brand-cream">অপরাধী রেজিস্ট্রি</h2>
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
            <p className="text-[14px] text-brand-red font-bold tracking-[3px] uppercase mb-4">আমাদের সনদ</p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-brand-cream leading-tight mb-4">
              আমরা যা <span className="text-brand-red italic">বিশ্বাস করি</span>
            </h2>
            <p className="text-brand-muted text-[16px] font-light max-w-[520px] mx-auto leading-relaxed">
              বাংলাদেশে শিশুদের বিরুদ্ধে যৌন সহিংসতা বন্ধ করতে ৫টি সরকারি দাবি এবং ৫টি সামাজিক কর্তব্য।
            </p>
          </div>

          {/* Government Demands */}
          <div className="mb-12">
            <h3 className="font-display text-[20px] font-bold text-brand-cream mb-1 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
              সরকারের কাছে দাবি
            </h3>
            <div className="grid grid-cols-3 gap-8 mt-6">
              {[
                { n: '১', title: 'বাধ্যতামূলক রিপোর্টিং আইন', desc: 'যে কেউ জানলে আইনত জানাতে বাধ্য। চুপ থাকা নিজেই অপরাধ হবে।' },
                { n: '২', title: 'জাতীয় যৌন অপরাধী নিবন্ধন', desc: 'দোষী সাব্যস্তদের একটি পাবলিক ডেটাবেজ। স্কুল ও প্রতিষ্ঠানগুলো নিয়োগের আগে দেখতে পারবে।' },
                { n: '৩', title: 'ফাস্ট-ট্র্যাক আদালত, ১৮০ দিনে রায়', desc: 'প্রতিটি ধর্ষণ ও শিশু নির্যাতন মামলা ১৮০ দিনের মধ্যে নিষ্পত্তি হতে হবে।' },
                { n: '৪', title: 'সরকারি মানসিক স্বাস্থ্যসেবা', desc: 'প্রতিটি উপজেলায় প্রতিটি ভুক্তভোগীর জন্য বিনামূল্যে মানসিক স্বাস্থ্যসেবা।' },
                { n: '৫', title: 'অনলাইন শোষণ প্রতিরোধ টাস্কফোর্স', desc: 'নির্যাতন হওয়ার আগেই অনলাইন শিকারিদের খুঁজে বের করার বিশেষ দল।' },
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
              আমাদের যা করতে হবে
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { n: '১', title: 'শরীরের নিরাপত্তার কথা বলুন', desc: 'শিশুকে বলুন, অনুমতি ছাড়া কেউ তার শরীর স্পর্শ করতে পারবে না। এই কথাটা জীবন বাঁচায়।' },
                { n: '২', title: 'সতর্ক থাকুন, চুপ থাকবেন না', desc: 'সতর্কতার লক্ষণ দেখলে রিপোর্ট করুন। বুলিং, নিষ্ঠুরতা, নির্যাতন — কথা বলুন।' },
                { n: '৩', title: 'ভুক্তভোগীকে বিশ্বাস করুন', desc: 'তারা কী পরেছিল, কোথায় গিয়েছিল — প্রশ্ন করবেন না। আগে বিশ্বাস করুন।' },
                { n: '৪', title: 'দীর্ঘমেয়াদী সচেতনতা', desc: 'তিনদিনের আবেগ নয়। স্কুলে, মসজিদে, পাড়ায় বছরের পর বছর কথা বলতে হবে।' },
                { n: '৫', title: 'কমিউনিটি লিডারদের জবাবদিহিতা', desc: 'শিক্ষক, ইমাম, কাউন্সিলরকে সরাসরি জিজ্ঞেস করুন। আপনার নীরবতা তাদের সাহস দেয়।' },
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
            <p className="text-brand-muted text-[16px] font-light mb-3">এটা স্বপ্ন না। এটা আমাদের দাবি।</p>
            <p className="font-display text-[24px] font-black text-brand-red">চুপ নই।</p>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/what-we-want"
              className="inline-block border border-brand-border text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] hover:bg-brand-card transition-all"
            >
              See Details →
            </Link>
          </div>

        </div>
      </div>

      {/* WHO ARE WE */}
      <div id="who-are-we" className="bg-brand-black" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>

          <div className="max-w-[760px] mx-auto">
            <p className="text-[14px] text-brand-red font-bold tracking-[3px] uppercase mb-4">আমাদের গল্প</p>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-black text-brand-cream leading-tight mb-2">
              আমরা কারা?
            </h2>
            <p className="font-display text-[22px] font-black text-brand-red italic mb-10">
              সত্যি বলতে? আমরা কেউ না।
            </p>

            <div className="space-y-5 text-[15px] text-brand-muted font-light leading-[1.8]">
              <p>
                আমরা কোনো এনজিও না। আমাদের কোনো নিবন্ধন নম্বর নেই, বার্ষিক প্রতিবেদন নেই, বিদেশি অনুদান নেই।
                আমরা সেই ধরনের মানুষ না যারা বিদেশ থেকে ফান্ড এনে সমাজ বদলানোর কথা বলে।
              </p>
              <p>
                আমরা রাজনীতিবিদ না। কোনো দলের পতাকা নেই, নির্বাচনী এলাকা নেই, সিদ্ধান্ত নেওয়ার কোনো টেবিলে আমাদের আসন নেই।
              </p>
              <p>
                আমরা সেলিব্রিটি না। এই ওয়েবসাইটে আমাদের ছবি নেই — এটা ইচ্ছাকৃত।
                পরিচিত মুখ দিয়ে মানুষের মনোযোগ কিনতে চাই না আমরা।
              </p>
              <p>
                আমাদের কোনো অফিস নেই। কোনো বোর্ডরুম নেই, কনফারেন্স টেবিল নেই, বড় পরিকল্পনা আঁকার চেয়ার নেই।
              </p>

              <div
                className="border-l-[3px] border-l-brand-red pl-6 py-1 my-8"
                style={{ background: 'rgba(192,57,43,0.04)' }}
              >
                <p className="text-brand-cream font-light text-[16px] leading-[1.8]">
                  আমরা শুধু সাধারণ মানুষ।
                </p>
              </div>

              <p>
                যারা রাতে ঘুমাতে পারে না যখন শুনি কোনো শিশু কষ্ট পেয়েছে। যারা সকালে পত্রিকা খোলে একটা অজানা ভয় নিয়ে,
                কারণ জানি কোথাও না কোথাও আবার কিছু একটা ঘটেছে। যারা ফিডে স্ক্রল করতে করতে হঠাৎ থমকে যায়,
                বুকের মধ্যে একটা ভার অনুভব করে, আর ভাবে — <span className="text-brand-cream italic">এরপর কী হবে?</span>
              </p>
              <p>
                আমরা সেই মানুষ যারা শুধু রাগে থামতে পারিনি। যারা নিজেদের জিজ্ঞেস করেছি — এই রাগটাকে কি কোনো কাজে লাগানো যায়?
              </p>
              <p>
                আমরা সরকারের বিরুদ্ধে না। আমরা চাই সরকার তার দায়িত্ব পালন করুক। কিন্তু আমরা এটাও জানি
                শুধু অপেক্ষা করা আর দেখা যথেষ্ট না।
              </p>
              <p>
                এই দেশের ইতিহাস বলে, সত্যিকারের পরিবর্তন তখনই আসে যখন সাধারণ মানুষ নিজেরা দাঁড়ায়।
                আমরা দাঁড়াতে চাই। চিৎকার করে না, একটা প্রক্রিয়ার মধ্য দিয়ে।
              </p>
              <p>
                আমরা তথ্য সংগ্রহ করতে চাই। যাচাই করতে চাই। এবং সঠিক কর্তৃপক্ষের হাতে পৌঁছে দিতে চাই।
                কোনো তামাশা ছাড়া, ভাইরাল পোস্ট ছাড়া, একটা পরিষ্কার এবং দায়িত্বশীল ব্যবস্থার মাধ্যমে।
              </p>

              <p className="text-brand-cream font-medium text-[16px]">এটাই আমরা।</p>

              <p>
                আমরা সাক্ষী। আমরা রেকর্ড রাখি। আমরা সেই মানুষ যারা বলে,
              </p>
            </div>

            <div className="mt-10 border border-brand-red/30 p-8 text-center" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <p className="font-display text-[22px] font-black text-brand-cream italic mb-3">
                &ldquo;আমরা দেখছি। আমরা বলবো।&rdquo;
              </p>
              <p className="font-display text-[20px] font-black text-brand-red">
                চুপ নই।
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: '#0d0d0d', borderTop: '3px solid #c0392b' }}>
        <div className={`${C} py-8 flex justify-between items-center`}>
          <div>
            <h3 className="font-display text-[24px] font-black text-brand-cream mb-1 italic">
              &ldquo;কিছু জানেন? জানান।&rdquo;
            </h3>
            <p className="text-brand-muted text-[16px] font-light">
              আপনার রিপোর্ট শিশু ও সমাজকে রক্ষা করতে পারে। প্রকাশের আগে সব তথ্য যাচাই করা হয়।
            </p>
          </div>
          <Link
            href="/report"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline whitespace-nowrap hover:bg-brand-red-dark transition-colors"
          >
            রিপোর্ট করুন
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
