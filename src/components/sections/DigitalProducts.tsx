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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white"
            >
              {product.image && (
                <div className="relative h-52 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {product.type}
                </span>
                <h4 className="mt-1 font-serif text-xl font-bold text-[#0f0e0c]">
                  {product.title}
                </h4>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#0f0e0c]">
                  {product.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[#f5e6d3] px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm font-medium text-accent">
                    {product.stats}
                  </span>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#d4cdc0] p-2 text-accent transition-colors hover:border-accent hover:bg-[#f5e6d3]"
                    aria-label={`View ${product.title}`}
                  >
                    <FaExternalLinkAlt className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
