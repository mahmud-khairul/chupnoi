import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

export default function WhatWeWantPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16 pt-32`}>
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
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
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
                      <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
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
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
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
                      <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="border border-brand-red/30 p-8" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-5">আমরা যে বাংলাদেশ চাই</h3>
              <div className="space-y-2 text-[16px] text-brand-muted font-light leading-relaxed mb-6">
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

      <Footer />
    </div>
  )
}
