import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* 🔥 HERO SECTION */}
      <section className="section fade-in">
        <Hero />
      </section>

      {/* 🧠 SKILLS */}
      <section id="skills" className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gradient mb-10">
            Core Skills
          </h2>

          <Skills />
        </div>
      </section>

      {/* 💼 EXPERIENCE */}
      <section id="experience" className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gradient mb-10">
            Experience
          </h2>

          <Experience />
        </div>
      </section>
      

      {/* 💼 EXPERIENCE */}
      <section id="testimonials" className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gradient mb-10">
            Testimonaials
          </h2>

          <Testimonials />
        </div>
      </section>

      {/* 📞 CONTACT */}
      <section id="contact" className="section text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gradient mb-6">
            Let’s Work Together
          </h2>

          <p className="text-muted max-w-xl mx-auto mb-6">
            Ready to deliver excellent customer experiences and help your
            business grow through exceptional support and communication.
          </p>

          <Contact />
        </div>
      </section>
    </>
  );
}