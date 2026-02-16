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

  // Preview modal state
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

  // Update filtered products when category or products change
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? products
        : products.filter(
            (product) => product.category.trim() === selectedCategory.trim(),
          );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewOpen) return;

      if (e.key === "ArrowLeft") {
        navigatePreview("prev");
      } else if (e.key === "ArrowRight") {
        navigatePreview("next");
      } else if (e.key === "Escape") {
        setPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen, currentPreviewIndex, filteredProducts]);

  // Prevent body scroll when modal is open
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    `;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
        {/* Hero Section - Enhanced with pink floral elements */}
        <div className="relative pt-20 overflow-hidden">
          {/* Decorative Floral Elements */}
          <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/40 via-pink-100/20 to-transparent"></div>

          {/* Floating Petals */}
          <div className="absolute top-40 left-[10%] w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 right-[15%] w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-[20%] w-36 h-36 bg-pink-200/20 rounded-full blur-3xl animate-float-slow"></div>

          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-64 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent rotate-45 translate-x-20"></div>
          <div className="absolute bottom-0 right-0 w-64 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent -rotate-45 -translate-x-20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
            <div className="text-center">
              {/* Refined Header with Bloom */}
              <div className="inline-flex items-center gap-3 sm:gap-4 text-pink-400 mb-6">
                <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-pink-300 to-pink-400"></span>
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-pink-300 animate-pulse-slow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7-1 2-3 4-3 4h14s-2-2-3-4c2.5-2 4-4.5 4-7 0-4-4-7-8-7z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-light text-pink-400">
                  BLOOME
                </span>
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-pink-300 animate-pulse-slow"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7-1 2-3 4-3 4h14s-2-2-3-4c2.5-2 4-4.5 4-7 0-4-4-7-8-7z" />
                  </svg>
                </div>
                <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-pink-300 to-pink-400"></span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-light text-gray-800 mb-6 tracking-tight">
                Floral
                <span className="text-pink-400 block sm:inline sm:ml-4 font-serif italic">
                  Gallery
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 font-light italic">
                "For over a decade, we've been creating moments of beauty and
                joy through the art of floral design"
              </p>

              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-pink-200/50">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} unique arrangements
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Section Title with Floral Accent */}
          <div className="flex items-center gap-4 sm:gap-8 mb-10 sm:mb-16">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-pink-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7-1 2-3 4-3 4h14s-2-2-3-4c2.5-2 4-4.5 4-7 0-4-4-7-8-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 tracking-tight">
              Our Collections
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-200 via-pink-300 to-transparent"></div>
            <span className="text-sm text-pink-500 font-light bg-pink-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Categories - Fixed 2-row grid */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-3 text-sm font-light rounded-full transition-all duration-500 group ${
                    selectedCategory === category
                      ? "text-white shadow-lg shadow-pink-200"
                      : "text-gray-600 hover:text-pink-500 bg-white/60 backdrop-blur-sm border border-pink-200 hover:border-pink-300 hover:bg-white/80"
                  }`}
                >
                  {selectedCategory === category && (
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full animate-scaleIn"></span>
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span
                      className={`${selectedCategory === category ? "text-white" : "text-pink-400"}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl mb-4"></div>
                  <div className="h-4 bg-pink-100 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-8 bg-pink-100 rounded-full w-32 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openPreview(index)}
                >
                  {/* Image Container - Refined */}
                  <div className="relative aspect-square mb-5 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 shadow-md group-hover:shadow-2xl transition-all duration-700">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      onError={handleImageError}
                      loading="lazy"
                    />

                    {/* Elegant Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Category Badge - Refined */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-xs font-light text-pink-500 rounded-full shadow-sm border border-white/50">
                        {product.category}
                      </span>
                    </div>

                    {/* Hover Action - Elegant */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 text-sm py-4 text-center font-light border-t border-pink-100">
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4 text-pink-400"
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
                          Preview Arrangement
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info - Refined */}
                  <div className="text-center space-y-4">
                    <h3 className="text-lg sm:text-xl text-gray-800 font-light group-hover:text-pink-500 transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage?.("contact");
                      }}
                      className="relative px-6 py-2.5 text-sm font-light rounded-full overflow-hidden group/btn transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-pink-500/10 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 border border-pink-200 rounded-full group-hover/btn:border-pink-300 transition-colors duration-300"></span>
                      <span className="relative z-10 text-pink-500 group-hover/btn:text-pink-600 transition-colors duration-300 flex items-center gap-2">
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
                        Inquire
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gradient-to-br from-pink-50/50 to-pink-100/50 rounded-3xl border border-pink-200">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-pink-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8 2 4 5 4 9c0 2.5 1.5 5 4 7-1 2-3 4-3 4h14s-2-2-3-4c2.5-2 4-4.5 4-7 0-4-4-7-8-7z" />
                </svg>
              </div>
              <p className="text-xl text-gray-600 font-light mb-4">
                No arrangements in this category
              </p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-pink-500 hover:text-pink-600 font-light transition-colors inline-flex items-center gap-2"
              >
                View all collections
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Help Section - Elegant */}
          <div className="mt-32 lg:mt-40 relative">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-pink-200/30 rounded-3xl blur-3xl"></div>

            {/* Floral Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-pink-200/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-pink-300/50 rounded-br-3xl"></div>

            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 sm:p-16 lg:p-20 shadow-xl border border-white/60">
              <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center gap-3 text-pink-400 mb-6">
                  <span className="w-8 h-px bg-pink-300"></span>
                  <span className="text-xs uppercase tracking-[0.2em] font-light">
                    Expert Guidance
                  </span>
                  <span className="w-8 h-px bg-pink-300"></span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight">
                  Need help choosing?
                </h3>

                <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed font-light">
                  Our floral experts are here to help you find the perfect
                  arrangement for any occasion. Let's create something beautiful
                  together.
                </p>

                <button
                  onClick={() => setCurrentPage?.("contact")}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full overflow-hidden shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 transition-all duration-300 text-base"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center gap-3">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Our Florists
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal - Enhanced */}
      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewOpen(false)}
        >
          {/* Backdrop with floral blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity animate-fadeIn"></div>

          {/* Decorative Floral Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>

          {/* Floating Petals */}
          <div className="absolute top-40 left-[30%] w-4 h-4 bg-pink-300/30 rounded-full blur-sm animate-float"></div>
          <div className="absolute bottom-40 right-[30%] w-6 h-6 bg-pink-400/30 rounded-full blur-sm animate-float-delayed"></div>

          {/* Modal Content */}
          <div
            className="relative w-full max-w-6xl mx-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Refined */}
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-16 right-0 text-white/40 hover:text-white transition-all z-20 p-3 hover:scale-110 group"
              aria-label="Close preview"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:blur-lg transition-all"></div>
                <svg
                  className="w-8 h-8 relative"
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
              </div>
            </button>

            {/* Navigation Buttons - Elegant */}
            <button
              onClick={() => navigatePreview("prev")}
              className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-full p-5 transition-all duration-300 z-20 hover:scale-110 border border-white/10 group"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
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

            <button
              onClick={() => navigatePreview("next")}
              className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-full p-5 transition-all duration-300 z-20 hover:scale-110 border border-white/10 group"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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

            {/* Image Container - Elegant Frame */}
            <div className="relative bg-gradient-to-br from-pink-900/20 via-black/40 to-pink-800/20 backdrop-blur-sm rounded-3xl p-3 shadow-2xl border border-white/10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <img
                  src={filteredProducts[currentPreviewIndex]?.image}
                  alt={filteredProducts[currentPreviewIndex]?.name}
                  className="w-full h-full object-contain animate-fadeIn"
                  onError={handleImageError}
                />
              </div>

              {/* Image Info Overlay - Refined */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-10 rounded-b-2xl">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-2">
                    {filteredProducts[currentPreviewIndex]?.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-pink-400/50"></span>
                    <p className="text-sm text-white/70 uppercase tracking-wider font-light">
                      {filteredProducts[currentPreviewIndex]?.category}
                    </p>
                    <span className="w-8 h-px bg-pink-400/50"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls - Refined */}
            <div className="flex justify-between items-center mt-8 px-4">
              {/* Counter Dots */}
              <div className="flex gap-3">
                {filteredProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPreviewIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentPreviewIndex
                        ? "w-10 bg-gradient-to-r from-pink-400 to-pink-500"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="text-white/40 text-sm font-light">
                {String(currentPreviewIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredProducts.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatDelayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseSlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 7s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default Gallery;
