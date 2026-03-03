import React, { useState, useEffect, useCallback } from "react";
import {
  getAvailableCategories,
  generateProductsFromAssets,
} from "../utils/imageLoader";

interface GalleryProps {
  setCurrentPage?: (page: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [products, setProducts] = useState<
    Array<{
      id: number;
      category: string;
      image: string;
      name: string;
    }>
  >([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const availableCategories = getAvailableCategories();
    setCategories(["All", ...availableCategories]);
    const loadedProducts = generateProductsFromAssets();
    setProducts(loadedProducts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? products
        : products.filter(
            (product) => product.category.trim() === selectedCategory.trim(),
          );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewOpen) return;
      if (e.key === "ArrowLeft") navigatePreview("prev");
      else if (e.key === "ArrowRight") navigatePreview("next");
      else if (e.key === "Escape") setPreviewOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen, currentPreviewIndex, filteredProducts]);

  useEffect(() => {
    if (previewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [previewOpen]);

  const openPreview = (index: number) => {
    setCurrentPreviewIndex(index);
    setPreviewOpen(true);
  };

  const navigatePreview = useCallback(
    (direction: "prev" | "next") => {
      setCurrentPreviewIndex((prev) => {
        if (direction === "prev") {
          return prev === 0 ? filteredProducts.length - 1 : prev - 1;
        } else {
          return prev === filteredProducts.length - 1 ? 0 : prev + 1;
        }
      });
    },
    [filteredProducts.length],
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    target.parentElement!.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <svg class="w-16 h-16 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    `;
  };

  // Parse price from name — e.g. "Bouquet 2k" → label "Bouquet", price "2K"
  // If name is just a price like "2k", label is empty
  const parseName = (name: string) => {
    const match = name.match(/^(.*?)\s*(\d+(?:\.\d+)?k)$/i);
    if (match) {
      const label = match[1].trim(); // may be empty if name was just "2k"
      const price = match[2].toUpperCase();
      return { label, price: `start from ${price}` };
    }
    // No price found — treat entire name as label
    return { label: name, price: null };
  };

  return (
    <>
      <div className="min-h-screen bg-[#fdf8f6]">
        {/* Hero */}
        <div className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-pink-100/50 blur-[120px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-rose-100/40 blur-[100px] translate-y-1/2 -translate-x-1/4" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
            <div className="text-center">
              <p className="font-light tracking-[0.4em] text-pink-400 text-xs uppercase mb-6 flex items-center justify-center gap-3">
                <span className="w-10 h-px bg-pink-300/70" />
                BLOOME
                <span className="w-10 h-px bg-pink-300/70" />
              </p>

              <h1 className="font-serif text-[clamp(3.5rem,10vw,7rem)] leading-none text-gray-900 mb-6">
                Floral <em className="text-pink-400 not-italic">Gallery</em>
              </h1>

              <p className="text-gray-500 text-lg max-w-xl mx-auto font-light leading-relaxed">
                Over a decade of crafting moments through the art of floral
                design
              </p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 bg-white/80 border border-pink-100 px-5 py-2.5 rounded-full shadow-sm">
                <svg
                  className="w-4 h-4 text-pink-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {filteredProducts.length} unique arrangements
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Category Filter */}
          <div className="mb-14 flex flex-wrap gap-2.5 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm rounded-full border transition-all duration-300 font-light ${
                  selectedCategory === category
                    ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200"
                    : "bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-serif text-gray-800">
              Our Collections
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent" />
            <span className="text-xs text-pink-400 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Money Bouquet Pricing */}
          {selectedCategory === "1. Money Bouquet" && (
            <div className="mb-10 bg-white rounded-2xl border border-pink-100 p-6 shadow-sm">
              <h3 className="text-lg font-serif text-gray-800 mb-4">Money Bouquet Pricing</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">10 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 100k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">15 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 125k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">20 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 150k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">25 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 175k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">30 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 200k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">40 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 250k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">50 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 350k</span>
                </div>
                <div className="flex justify-between p-3 bg-pink-50/50 rounded-lg">
                  <span className="text-gray-600">60 lembar</span>
                  <span className="font-medium text-gray-900">Rp. 375k</span>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-pink-50 rounded-2xl mb-4" />
                  <div className="h-4 bg-pink-50 rounded w-2/3 mb-2" />
                  <div className="h-6 bg-pink-50 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
                const { label, price } = parseName(product.name);
                return (
                  <div
                    key={product.id}
                    className="group cursor-pointer animate-fadeInUp"
                    style={{ animationDelay: `${index * 80}ms` }}
                    onClick={() => openPreview(index)}
                  >
                    {/* Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-100 transition-all duration-500 hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-pink-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={handleImageError}
                          loading="lazy"
                        />

                        {/* View overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-4 py-2 rounded-full flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                            <svg
                              className="w-3.5 h-3.5 text-pink-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            Preview
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        {label && (
                          <p className="text-sm text-gray-500 font-light mb-1.5 truncate">
                            {label}
                          </p>
                        )}
                        {price && (
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-serif text-gray-900 tracking-tight">
                              {price}
                            </span>
                            <span className="text-xs text-gray-400 font-light">
                              IDR
                            </span>
                          </div>
                        )}
                        {!price && !label && (
                          <p className="text-sm text-gray-400 font-light italic">
                            View details
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-pink-50 mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-pink-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7-1 2-3 4-3 4h14s-2-2-3-4c2.5-2 4-4.5 4-7 0-4-4-7-8-7z" />
                </svg>
              </div>
              <p className="text-gray-500 font-light mb-3">
                No arrangements in this category
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-pink-400 text-sm hover:text-pink-600 transition-colors"
              >
                View all →
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-24 relative bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50/80 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            </div>
            <div className="relative p-12 sm:p-16 text-center max-w-lg mx-auto">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400 mb-4 font-light">
                Expert Guidance
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-3">
                Need help choosing?
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                Our florists are here to help you find the perfect arrangement
                for any occasion.
              </p>
              <button
                onClick={() => setCurrentPage?.("contact")}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm font-light transition-all duration-300 shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Our Florists
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl animate-fadeIn" />

          <div
            className="relative w-full max-w-5xl mx-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-14 right-0 text-white/50 hover:text-white transition-colors z-20 p-2"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Nav Prev */}
            <button
              onClick={() => navigatePreview("prev")}
              className="absolute left-0 lg:-left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 z-20 hover:scale-110 border border-white/10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Nav Next */}
            <button
              onClick={() => navigatePreview("next")}
              className="absolute right-0 lg:-right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 z-20 hover:scale-110 border border-white/10"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image */}
            <div className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="aspect-[4/3] relative">
                <img
                  src={filteredProducts[currentPreviewIndex]?.image}
                  alt={filteredProducts[currentPreviewIndex]?.name}
                  className="w-full h-full object-contain animate-fadeIn"
                  onError={handleImageError}
                />
              </div>

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-8 pt-16 pb-8">
                <div className="flex items-end justify-between">
                  <div>
                    {(() => {
                      const { label, price } = parseName(
                        filteredProducts[currentPreviewIndex]?.name ?? "",
                      );
                      return (
                        <>
                          {label && (
                            <p className="text-white/60 text-sm font-light mb-1">
                              {label}
                            </p>
                          )}
                          {price && (
                            <p className="text-white font-serif text-4xl tracking-tight">
                              {price}{" "}
                              <span className="text-white/50 text-lg font-light">
                                IDR
                              </span>
                            </p>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <span className="text-white/40 text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    {filteredProducts[currentPreviewIndex]?.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Dots + counter */}
            <div className="flex justify-between items-center mt-6 px-2">
              <div className="flex gap-2">
                {filteredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPreviewIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      idx === currentPreviewIndex
                        ? "w-8 bg-pink-400"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/30 text-sm tabular-nums">
                {String(currentPreviewIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredProducts.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
      `}</style>
    </>
  );
};

export default Gallery;
