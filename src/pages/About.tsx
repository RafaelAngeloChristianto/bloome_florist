import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";

interface AboutProps {
  setCurrentPage?: (page: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About({ setCurrentPage }: AboutProps) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-24 px-6 mt-[50px]">
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="max-w-5xl mx-auto text-center mb-24"
      >
        <h1 className="text-5xl md:text-6xl font-serif tracking-tight text-gray-900 mb-6">
          About <span className="italic">Bloome</span>
        </h1>

        <div className="w-24 h-[2px] bg-gray-900 mx-auto mb-8" />

        <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We design floral arrangements with intention, elegance, and attention
          to detail — focusing purely on quality and craftsmanship.
        </p>
      </motion.section>

      {/* Content Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center mb-28"
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-gray-900">Our Approach</h2>

          <p className="text-gray-600 leading-relaxed font-light">
            Every arrangement is thoughtfully composed to balance color,
            texture, and proportion. We focus on creating pieces that feel
            refined, timeless, and expressive without excess.
          </p>

          <p className="text-gray-600 leading-relaxed font-light">
            From intimate celebrations to large-scale events, our team works
            closely with clients to ensure each floral design complements the
            moment perfectly.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-full h-full border border-gray-900" />
          <img
            src={logo}
            alt="Bloome"
            className="relative w-full h-[420px] object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Minimal Stats */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 text-center mb-28"
      >
        {[
          { number: "10+", label: "Years Experience" },
          { number: "500+", label: "Happy Created" },
          { number: "200+", label: "Flowers Styled" },
        ].map((item, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-4xl font-serif text-gray-900">{item.number}</h3>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              {item.label}
            </p>
          </div>
        ))}
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-serif text-gray-900 mb-6">
          Let’s Create Something Beautiful
        </h2>

        <button
          onClick={() => setCurrentPage?.("shop")}
          className="border border-gray-900 px-12 py-4 text-gray-900 tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          Explore Collection
        </button>
      </motion.section>
    </div>
  );
}
