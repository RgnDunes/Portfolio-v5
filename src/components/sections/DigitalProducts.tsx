"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { products } from "@/data/products";
import Image from "next/image";

export default function DigitalProducts() {
  return (
    <section
      id="digital-products"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
            Digital Products
          </h2>
          <span className="text-sm font-medium tracking-wider text-accent">
            05 · PRODUCTS
          </span>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                borderColor: "#c84b31"
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group relative overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-8"
            >
              <div className="flex gap-6">
                {product.image && (
                  <div className="h-48 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={128}
                      height={192}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {product.type}
                    </span>
                    <h4 className="mt-1 font-serif text-xl font-bold text-[#0f0e0c]">
                      {product.title}
                    </h4>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#0f0e0c]">
                    {product.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[#f5e6d3] px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-accent">
                      {product.stats}
                    </span>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent transition-colors hover:text-[#a03b25]"
                      aria-label={`View ${product.title}`}
                    >
                      <FaExternalLinkAlt className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
