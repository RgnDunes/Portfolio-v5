"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { products } from "@/data/products";

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
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Digital Products
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:bg-gray-800/70"
            >
              <div>
                <span className="text-sm font-medium text-blue-400">
                  {product.type}
                </span>
                <h4 className="mt-1 text-xl font-semibold text-gray-100">
                  {product.title}
                </h4>
              </div>
              <p className="mt-4 text-gray-400">{product.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-500">{product.stats}</span>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  aria-label={`View ${product.title}`}
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
