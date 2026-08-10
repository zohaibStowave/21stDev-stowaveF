"use client";

import { Cormorant_Garamond, Work_Sans, IBM_Plex_Mono } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/**
 * Placeholder photography — swap every `src` below with your own product /
 * lookbook photography before shipping. Seeds are just kept consistent so
 * the layout previews nicely; picsum.photos is only a stand-in service.
 */
const IMG = {
  hero: "https://picsum.photos/seed/noorloom-hero/1800/1000",
  fabric: "https://picsum.photos/seed/noorloom-fabric/900/1100",
  artisan: "https://picsum.photos/seed/noorloom-artisan/900/1100",
  look1: "https://picsum.photos/seed/noorloom-look1/700/900",
  look2: "https://picsum.photos/seed/noorloom-look2/700/900",
  look3: "https://picsum.photos/seed/noorloom-look3/700/900",
  look4: "https://picsum.photos/seed/noorloom-look4/700/900",
};

export default function Page() {
  const fontVars = `${display.variable} ${body.variable} ${mono.variable}`;

  return (
    <div
      className={`${fontVars} min-h-screen bg-[#FBF8F3] text-[#2B2621] font-[family-name:var(--font-body)] antialiased`}
    >
      {/* top bar */}
      <div className="border-b border-[#E7DFD2]">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] italic text-xl tracking-wide">
            Noor &amp; Loom
          </span>
          <nav className="hidden sm:flex gap-8 font-[family-name:var(--font-mono)] text-[0.72rem] tracking-[0.12em] uppercase text-[#6B6255]">
            <a href="#" className="hover:text-[#8A6A34] transition-colors">
              Collection
            </a>
            <a href="#" className="hover:text-[#8A6A34] transition-colors">
              Journal
            </a>
            <a href="#" className="hover:text-[#8A6A34] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#8A6A34] transition-colors">
              Store
            </a>
          </nav>
        </div>
      </div>

      {/* hero */}
      <header className="relative">
        <div className="w-full h-[52vh] min-h-[340px] max-h-[560px] overflow-hidden">
          <img
            src={IMG.hero}
            alt="Noor & Loom studio — fabric and light"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2621]/55 via-[#2B2621]/10 to-transparent" />
        </div>

        <div className="max-w-[820px] mx-auto px-6 -mt-24 relative">
          <div className="bg-[#FBF8F3] rounded-sm shadow-[0_20px_60px_-25px_rgba(43,38,33,0.35)] px-7 py-10 sm:px-12 sm:py-12 border border-[#E7DFD2]">
            <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.16em] uppercase text-[#8A6A34] mb-4">
              Journal — Collection Story
            </p>
            <h1 className="font-[family-name:var(--font-display)] italic font-medium text-[clamp(2.2rem,5.5vw,3.4rem)] leading-[1.15] mb-5">
              Kaarigar Ke Haath Se: <br className="hidden sm:block" />
              &lsquo;Khaddar Reverie&rsquo; Collection Ki Kahani
            </h1>
            <p className="text-[#5C5348] text-lg leading-8 mb-7 max-w-[560px]">
              Aik dhaage se shuru hone wali kahani, jo haath se buni hui khaddar,
              sabar wale kaarigaron, aur mausam ke saath badalte rangon tak
              ja pohanchi.
            </p>
            <div className="flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.75rem] text-[#6B6255]">
              <span className="w-8 h-8 rounded-full bg-[#EAD9B8] flex items-center justify-center text-[#8A6A34] font-semibold">
                NL
              </span>
              <span>Team Noor &amp; Loom</span>
              <span className="opacity-40">•</span>
              <span>03 Aug 2026</span>
              <span className="opacity-40">•</span>
              <span>7 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* article body */}
      <main className="max-w-[720px] mx-auto px-6 pt-20 pb-10">
        {/* lead / drop-cap paragraph */}
        <p className="text-[1.2rem] leading-9 text-[#3A342C] mb-10 first-letter:font-[family-name:var(--font-display)] first-letter:italic first-letter:text-[4.2rem] first-letter:leading-[3.2rem] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#8A6A34]">
          Noor &amp; Loom kabhi aik badi company banne ke liye shuru nahi hua
          tha. Yeh shuru hua tha aik chhoti si baat se — ke jo kapra hum roz
          pehente hain, uski kahani bhi utni hi khoobsurat honi chahiye jitna
          wo kapra khud hai. Aaj, kayi saalon baad, hum apna sabse pyara
          collection aapke saamne la rahe hain: &lsquo;Khaddar Reverie&rsquo;.
        </p>

        {/* section 1 */}
        <section className="mb-14">
          <h2 className="font-[family-name:var(--font-display)] italic text-3xl mb-5 text-[#2B2621]">
            Aik Dhaage Se Shuruat
          </h2>
          <p className="text-[1.05rem] leading-8 text-[#4A443B] mb-4">
            Do saal pehle, hamari founder ne apni nani ke sandook mein aik
            purani khaddar ki chadar dekhi — dhaage thoray se ukhray huay,
            rang halka pad chuka, lekin bunavat abhi bhi mazboot. Usi din
            faisla hua ke hum wapas un cheezon ki taraf jayenge jo waqt ke
            saath aur khoobsurat hoti hain, ghatati nahi.
          </p>
          <p className="text-[1.05rem] leading-8 text-[#4A443B]">
            Machine se bane kapray tez hain, sasty hain, lekin unmein wo
            saans lene wali garmahat nahi hoti jo haath se buni hui khaddar
            mein hoti hai. Hum ne wahi rasta chuna — sust, mushkil, lekin
            asli.
          </p>
        </section>

        {/* inline image — fabric */}
        <figure className="mb-14 -mx-6 sm:mx-0">
          <img
            src={IMG.fabric}
            alt="Haath se buni khaddar ka close-up texture"
            className="w-full h-[380px] sm:h-[440px] object-cover rounded-sm"
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-wide text-[#8A7F6E] mt-3 px-6 sm:px-0">
            Khaddar ka pehla thaan — Multan ke aik chhote se karkhane se
          </figcaption>
        </figure>

        {/* section 2 */}
        <section className="mb-14">
          <h2 className="font-[family-name:var(--font-display)] italic text-3xl mb-5 text-[#2B2621]">
            Kapray Ka Intekhab
          </h2>
          <p className="text-[1.05rem] leading-8 text-[#4A443B] mb-4">
            Har thaan haath se chuna gaya. Hum ne un buno kaaron se milkar
            kaam kiya jo teen naslon se yehi kaam karte aa rahe hain — jinke
            haathon ko ab naap ki zaroorat nahi padti, unhein dhaage ka
            farq ungliyon se hi pata chal jata hai.
          </p>
          <p className="text-[1.05rem] leading-8 text-[#4A443B]">
            Rangai bhi qudrati rangon se ki gayi — haldi, indigo, aur
            supari ke chilkon se. Isi liye har piece ka rang thoda mukhtalif
            hota hai; yeh khrabi nahi, yeh nishani hai ke yeh haath se bana
            hai, factory se nahi.
          </p>
        </section>

        {/* pull quote */}
        <blockquote className="my-14 border-y border-[#E7DFD2] py-8 px-2">
          <p className="font-[family-name:var(--font-display)] italic text-[1.6rem] sm:text-[1.9rem] leading-[1.4] text-[#3A342C]">
            &ldquo;Kapra sirf pehnne ki cheez nahi — yeh us haath ki yaadgar
            hai jisne isay bunaa.&rdquo;
          </p>
          <span className="block font-[family-name:var(--font-mono)] text-[0.75rem] tracking-wide text-[#8A6A34] mt-4">
            — Ustad Bashir, Master Weaver, 30+ saal ka tajurba
          </span>
        </blockquote>

        {/* inline image — artisan */}
        <figure className="mb-14 -mx-6 sm:mx-0">
          <img
            src={IMG.artisan}
            alt="Kaarigar apne haath se khaddar bunte huay"
            className="w-full h-[380px] sm:h-[440px] object-cover rounded-sm"
          />
          <figcaption className="font-[family-name:var(--font-mono)] text-[0.72rem] tracking-wide text-[#8A7F6E] mt-3 px-6 sm:px-0">
            Ustad Bashir apne loom par — 6 ghante mein aik thaan taiyar hota hai
          </figcaption>
        </figure>

        {/* section 3 */}
        <section className="mb-14">
          <h2 className="font-[family-name:var(--font-display)] italic text-3xl mb-5 text-[#2B2621]">
            &lsquo;Khaddar Reverie&rsquo; — Naya Collection
          </h2>
          <p className="text-[1.05rem] leading-8 text-[#4A443B] mb-4">
            Yeh collection saat pieces par mushtamil hai — do kurte,
            aik jacket, teen shirts, aur aik shawl — har aik unhi haathon
            se bana jinka zikr upar hua. Cuts simple rakhe gaye hain, taake
            kapray ki bunawat khud apni kahani sunaye.
          </p>
          <p className="text-[1.05rem] leading-8 text-[#4A443B]">
            Rang palette mausam se mutasir hai: mitti ka bhoora, halka
            zaitooni sabz, aur khaddar ka apna qudrati oat tone. Har piece
            limited hai — kyunke haath se itna hi ban sakta hai jitna
            waqt ijazat de.
          </p>
        </section>

        {/* lookbook gallery */}
        <section className="mb-14">
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.16em] uppercase text-[#8A6A34] mb-5">
            Lookbook
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={IMG.look1}
              alt="Look 01 — Khaddar Reverie collection"
              className="w-full h-[300px] sm:h-[420px] object-cover rounded-sm"
            />
            <img
              src={IMG.look2}
              alt="Look 02 — Khaddar Reverie collection"
              className="w-full h-[300px] sm:h-[420px] object-cover rounded-sm mt-8"
            />
            <img
              src={IMG.look3}
              alt="Look 03 — Khaddar Reverie collection"
              className="w-full h-[300px] sm:h-[420px] object-cover rounded-sm"
            />
            <img
              src={IMG.look4}
              alt="Look 04 — Khaddar Reverie collection"
              className="w-full h-[300px] sm:h-[420px] object-cover rounded-sm mt-8"
            />
          </div>
        </section>

        {/* section 4 — promise */}
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] italic text-3xl mb-5 text-[#2B2621]">
            Hamara Wada
          </h2>
          <p className="text-[1.05rem] leading-8 text-[#4A443B] mb-4">
            Hum tez fashion nahi banate. Har collection saal mein sirf do
            baar aata hai, thora quantity mein, taake kisi kaarigar ko
            jaldi mein kaam na karna pade. Jo bacha hua kapra hota hai,
            usay hum chhote accessories mein badal dete hain — kuch bhi
            zaya nahi hota.
          </p>
          <p className="text-[1.05rem] leading-8 text-[#4A443B]">
            Yeh wada sirf kapray ka nahi — un haathon ka bhi hai jinhon ne
            isay banaya. Jab aap Noor &amp; Loom pehente hain, aap sirf
            kapra nahi khareed rahe, aap aik kahani ka hissa ban rahe hain.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-sm bg-[#2B2621] text-[#F4EDE1] px-8 py-12 sm:px-12 sm:py-14 text-center mb-16">
          <p className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.16em] uppercase text-[#C7A55E] mb-4">
            Ab Available
          </p>
          <h3 className="font-[family-name:var(--font-display)] italic text-3xl sm:text-4xl mb-5">
            Khaddar Reverie Collection Dekhein
          </h3>
          <p className="text-[#D8D0C2] max-w-[440px] mx-auto mb-8 leading-7">
            Limited pieces, haath se bunay huay. Jitni jaldi collection
            khatam, dobara utni hi der se aayega.
          </p>
          <a
            href="#"
            className="inline-block bg-[#C7A55E] text-[#2B2621] font-[family-name:var(--font-mono)] text-sm tracking-wide px-8 py-3.5 rounded-full transition-transform hover:scale-[1.03]"
          >
            Collection Explore Karein
          </a>
        </section>

        {/* newsletter */}
        <section className="border-t border-[#E7DFD2] pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] italic text-2xl mb-1">
              Journal mein naye likhay parhna chahte hain?
            </p>
            <p className="text-[#6B6255] text-sm">
              Naye collections aur kaarigaron ki kahaniyan seedhi apne inbox mein payein.
            </p>
          </div>
          <form className="flex w-full sm:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="aapka email"
              className="flex-1 sm:w-56 bg-transparent border border-[#D8CDB9] rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#8A6A34] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#2B2621] text-[#F4EDE1] text-sm px-5 py-2.5 rounded-full whitespace-nowrap hover:bg-[#3A342C] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-[#E7DFD2] mt-10">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 font-[family-name:var(--font-mono)] text-[0.72rem] text-[#8A7F6E]">
          <span>© {new Date().getFullYear()} Noor &amp; Loom — haath se bana, dil se socha</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#8A6A34] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#8A6A34] transition-colors">Journal</a>
            <a href="#" className="hover:text-[#8A6A34] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}