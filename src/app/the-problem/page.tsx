import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

export default function TheProblemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16 pt-32`}>
          <div className="max-w-[800px] mx-auto">

            {/* Eyebrow */}
            <p className="text-[12px] text-brand-red font-bold tracking-[3px] uppercase mb-4">
              চুপ নই | বাংলাদেশ | ২০২৫
            </p>

            {/* Headline */}
            <h1 className="font-display font-black leading-tight tracking-tight mb-8">
              <span className="block text-[clamp(36px,6vw,64px)] text-brand-cream">সমস্যাটা কী?</span>
            </h1>

            {/* Intro paragraph */}
            <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-10">
              বাংলাদেশে প্রতিদিন গড়ে ১৯ থেকে ২০টি ধর্ষণের মামলা নথিভুক্ত হয়। এটা শুধু একটা সংখ্যা না। প্রতিটা সংখ্যার পেছনে একটা মানুষ আছে। একটা পরিবার আছে। একটা জীবন আছে যা আর আগের মতো নেই। এবং এই সংখ্যাও পুরো সত্য না — কারণ বেশিরভাগ ঘটনা আদৌ রিপোর্ট হয় না।
            </p>

            {/* Blockquote cases */}
            <div className="mb-12 space-y-0 border-l-2 border-brand-red pl-6">
              <div className="mb-6">
                <p className="text-brand-cream text-[16px] font-light leading-relaxed">
                  <span className="font-bold text-brand-cream">মাগুরা, ২০২৫।</span> একটা শিশু। বয়স আট বছর। পরিচিত মানুষের হাতে নির্যাতিত। মামলা হয়েছে। আদালত চলছে। মিডিয়া তিন দিন আলোচনা করেছে। তারপর চুপ।
                </p>
              </div>
              <div className="mb-6">
                <p className="text-brand-cream text-[16px] font-light leading-relaxed">
                  <span className="font-bold text-brand-cream">তনু।</span> কুমিল্লা ভিক্টোরিয়া কলেজের ছাত্রী। ২০১৬ সালে ধর্ষণ ও হত্যার শিকার। ১০ বছর পরেও বিচার নেই। তার বাবা আজও আদালতে যান।
                </p>
              </div>
              <div className="mb-6">
                <p className="text-brand-cream text-[16px] font-light leading-relaxed">
                  <span className="font-bold text-brand-cream">পারি।</span> বয়স মাত্র পাঁচ। ঢাকার কাছে একটা গ্রামে। ২০২৩ সালে নিখোঁজ হয়। পরে পাওয়া যায়। যা ঘটেছে তা বলার ভাষা নেই। অভিযুক্ত জামিনে বাড়িতে।
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div
              className="grid grid-cols-2 mb-12"
              style={{ gap: '1px', background: '#1a1a1a' }}
            >
              {[
                { num: '১৯—২০', label: 'প্রতিদিন ধর্ষণ মামলা' },
                { num: '৯৯%', label: 'ভুক্তভোগী অদৃশ্য' },
                { num: '১০ বছর।', label: 'শূন্য রায়।' },
                { num: '১৪ দিনে', label: 'মৃত্যুদণ্ডের আইন আছে' },
              ].map(s => (
                <div key={s.label} className="bg-brand-black px-6 py-6 hover:bg-brand-card transition-colors">
                  <div className="font-display text-[36px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                  <div className="text-[10px] text-brand-muted font-bold tracking-[1.5px] uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-brand-border my-12" />

            {/* Comparison section */}
            <div className="mb-12">
              <h2 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                বাস্তবতার বিপরীত
              </h2>
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
                আইন আছে। কিন্তু বাস্তবতা আলাদা। এটা দেখুন।
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: 'আইনে আছে',
                    subtitle: 'বাস্তবে নেই',
                    body: 'নারী ও শিশু নির্যাতন দমন আইন ২০০০ অনুযায়ী ধর্ষণের শাস্তি মৃত্যুদণ্ড পর্যন্ত। কিন্তু দোষী সাব্যস্ত হওয়ার হার ৩% এর নিচে।',
                  },
                  {
                    title: 'মামলা হয়',
                    subtitle: 'বিচার হয় না',
                    body: 'প্রতি বছর হাজার হাজার মামলা দায়ের হয়। কিন্তু আদালতে মামলার চাপ, সাক্ষী না পাওয়া, এবং প্রভাবশালীদের হস্তক্ষেপে অধিকাংশ মামলা বছরের পর বছর ঝুলে থাকে।',
                  },
                  {
                    title: 'সংখ্যা বাড়ছে',
                    subtitle: 'সচেতনতা কমছে',
                    body: '২০২৪ থেকে ২০২৫ সালে শিশু নির্যাতনের ঘটনা ২৭% বেড়েছে। কিন্তু মিডিয়া কভারেজ এবং সামাজিক আলোচনা তিন দিনের বেশি থাকে না।',
                  },
                  {
                    title: 'ভুক্তভোগী কথা বলে',
                    subtitle: 'সমাজ দোষ দেয়',
                    body: 'একটা মেয়ে কথা বললে প্রথম প্রশ্ন হয় — সে কী পরেছিল, কোথায় গিয়েছিল। অপরাধীর বদলে ভুক্তভোগীকেই কাঠগড়ায় দাঁড় করানো হয়।',
                  },
                ].map(({ title, subtitle, body }) => (
                  <div key={title} className="border border-brand-border p-5" style={{ background: 'rgba(192,57,43,0.03)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-[15px] font-bold text-brand-cream">{title}</span>
                      <span className="text-brand-border">→</span>
                      <span className="font-display text-[15px] font-bold text-brand-red">{subtitle}</span>
                    </div>
                    <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-brand-border my-12" />

            {/* Closing */}
            <div className="mb-12 space-y-5">
              <p className="text-[16px] text-brand-muted font-light leading-relaxed">
                এই ওয়েবসাইট কোনো সরকারি প্রকল্প না। কোনো এনজিওর ফান্ডিংয়ে চলে না। আমরা কিছু সাধারণ মানুষ, যারা মনে করি — চুপ থাকাটাই এখন সবচেয়ে বড় অপরাধ।
              </p>
              <p className="text-[16px] text-brand-muted font-light leading-relaxed">
                আমরা নাম রাখছি। মুখ দেখাচ্ছি। তথ্য সংগ্রহ করছি। এবং যতদিন বিচার না হবে, এই তালিকা বাড়তে থাকবে।
              </p>
              <p className="text-[16px] text-brand-muted font-light leading-relaxed">
                আপনি যদি কোনো ঘটনা জানেন — রিপোর্ট করুন। আপনি যদি কাউকে চেনেন যে এই তালিকায় থাকা উচিত — জানান। আপনি যদি শুধু পড়েন — শেয়ার করুন।
              </p>
              <p className="font-display text-[20px] font-bold text-brand-cream">আমরা থামবো না।</p>
            </div>

            {/* Closing box */}
            <div className="border border-brand-red/30 p-8" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <p className="font-display text-[28px] font-black text-brand-red italic">চুপ নই। থামবো না।</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
