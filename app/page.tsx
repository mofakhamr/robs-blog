import Image from "next/image";

export default function Home() {
  return (
    <main className="z-10 flex min-h-screen w-full flex-col items-center justify-center py-32">
      <div className="mx-2 sm:mx-4 lg:mx-32 xl:mx-64">
        <h1 className="">about me</h1>
        <p className="italic text-lg font-semibold text-slate-400">{"// &nbsp; Stoic &nbsp; // &nbsp; OCD &nbsp; // &nbsp; Londoner"}</p>
        <h2 className="text-slate-500">what I&apos;m like</h2>
        <ul className="about-list text-slate-600">
          <li>I've worked in IT for over 21 years and have been working in software development for the past 15 years.</li>
          <li>I naturally progressed into a leadership role, being an outspoken full-stack developer who's passionate about the products they build.</li>
          <li>I like talking about the "What", and I resonate with those who are interested in the "How" - joining this up in a cohesive way is a really enjoyable process for
            me.</li>
          <li>I like plans (even if they're written on a napkin) and motivating others to deliver the benefits quickly, learn from them and iterate quickly.</li>
          <li> I've usually got an opinion - and I've learned that it's okay as long to have one - as long as you don't cling to them for the sake of all else - being right
            is not as important as being kind.</li>
          <li>I used to jump straight to the problem solving stage, when others hadn't fully understood the problem - ensuring everyone is on the same journey has saved me
            time in the long run.</li>
        </ul>
        <div className="flex justify-center items-center">
          <Image
            alt={"A Spyglass icon"}
            title={"I created this solely in Powerpoint, because I felt it needed some imagery"}
            src={"/pages/spyglass.png"}
            width={160}
            height={160}
            className={""}
          />
        </div>
        <h2 className="text-slate-500">what I've done</h2>
        <ul className="about-list text-slate-600">
          <li>Improved on-time delivery from 20% to 90% through developing and coaching "on-time/to quality" culture and process</li>
          <li>Improved time to market by a factor of x5, reduced project overruns by x10 in 2 years</li>
          <li>Increased annual license revenue by 160% in 2 years by building new product development strategy and aligningg with business needs cross-organisation</li>
          <li>Charied product approvals team reviewing business cases, innovation and product ROI</li>
          <li>Reduced average project cost overrunes from 100% to 10% by improved governance</li>
        </ul>

      </div>


    </main>
  );
}
