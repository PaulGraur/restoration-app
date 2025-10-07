import HeroSection from "@/app/sections/home-page/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow hover:bg-white/20 transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-white">
              Feature {i}
            </h2>
            <p className="text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut
              velit nec nulla ullamcorper.
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">What people say</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              text: "“This app is amazing! It helped me learn and improve my skills.”",
              author: "John Doe",
            },
            {
              text: "“Highly recommend for anyone who wants to practice coding.”",
              author: "Jane Smith",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow"
            >
              <p className="text-white/80 mb-4">{item.text}</p>
              <p className="font-semibold text-white">{`— ${item.author}`}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
