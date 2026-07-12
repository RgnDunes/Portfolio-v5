"use client";

import { motion, useInView } from "framer-motion";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import Image from "next/image";
import { useRef } from "react";

export default function DigitalProductsModern() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="digital-products"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            05 · Products
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Digital <span className="gradient-text">Products</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Tools and products built to solve real problems and enhance developer experience
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col"
          >
            <div className="glass-strong flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/20 transition-all hover:border-accent/50 hover:shadow-2xl">
              {/* Product image with overlay */}
              {product.image && (
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-accent/5 to-accent2/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute right-4 top-4"
                  >
                    <span className="glass-strong rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-lg">
                      {product.type}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h4 className="font-serif text-2xl font-bold text-ink transition-colors group-hover:text-accent">
                  {product.title}
                </h4>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {product.description}
                </p>

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.4 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-6">
                  <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    {product.stats}
                  </span>
                  <motion.a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass flex items-center justify-center rounded-xl border border-accent/20 p-3 text-accent transition-all hover:bg-accent hover:text-white hover:shadow-lg"
                    aria-label={`View ${product.title}`}
                  >
                    <FaArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent blur-3xl"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
