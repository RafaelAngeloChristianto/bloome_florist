import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { motion } from "framer-motion"; // Install with: npm install framer-motion

interface ContactProps {
  setCurrentPage?: (page: string) => void;
}

const Contact: React.FC<ContactProps> = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const contactNumbers = [
    {
      number: "+62 815-1122-9009",
      name: "Primary Contact",
      icon: "🌸"
    },
    {
      number: "+62 813-8961-1976",
      name: "Customer Service",
      icon: "💐"
    }
  ];

  const features = [
    {
      title: "Artificial Flowers",
      description: "Long-lasting beauty without maintenance",
      icon: "🌸",
      color: "from-rose-100 to-pink-100"
    },
    {
      title: "Fast Delivery",
      description: "Same day delivery within Jakarta",
      icon: "🚚",
      color: "from-blue-100 to-cyan-100"
    },
    {
      title: "Custom Arrangements",
      description: "Personalized designs for any occasion",
      icon: "💝",
      color: "from-purple-100 to-violet-100"
    },
    {
      title: "Bulk Orders",
      description: "Special discounts for events & corporate",
      icon: "🎉",
      color: "from-amber-100 to-orange-100"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\D/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen mt-[50px] bg-gradient-to-br from-rose-50 via-white to-pink-50 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 blur-lg opacity-30 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={logo}
                alt="Bloome Logo"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient">
              Get In Touch
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to bloom your space with everlasting beauty? Our floral experts are here to help you create the perfect arrangement.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
            Contact Our Floral Experts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {contactNumbers.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(contact.number)}
                onMouseLeave={() => setIsHovered(null)}
                className={`bg-white rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 ${
                  isHovered === contact.number ? 'ring-2 ring-rose-200' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${contact.number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-center group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </div>
                  </a>
                  
                  <button
                    onClick={() => copyToClipboard(contact.number)}
                    className="w-full text-center py-3 rounded-xl border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300 group relative"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-700 group-hover:text-rose-600 font-medium">
                        {contact.number}
                      </span>
                      <span className="text-gray-400 group-hover:text-rose-500">
                        {copied ? '✓ Copied!' : '📋'}
                      </span>
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose Bloome?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className={`h-full bg-gradient-to-br ${feature.color} rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/50`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-3 text-center">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-center text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-white/30">
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800 mb-2">Business Hours</h4>
              <p className="text-gray-600">Monday - Sunday: 8AM - 5PM</p>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800 mb-2">Response Time</h4>
              <p className="text-gray-600">Typically within 15 minutes</p>
              <p className="text-sm text-gray-500">On WhatsApp during business hours</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Have questions about custom orders or bulk pricing? Our floral consultants are ready to assist you!
          </p>
          <a
            href={`https://wa.me/${contactNumbers[0].number.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg py-5 px-10 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Start Your Floral Journey</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;