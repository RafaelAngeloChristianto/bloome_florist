import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { motion } from "framer-motion";

interface ContactProps {
  setCurrentPage?: (page: string) => void;
}

const Contact: React.FC<ContactProps> = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const contactNumbers = [
    {
      number: "+62 815-1122-9009",
      name: "Primary Contact",
      icon: "🌸",
    },
    {
      number: "+62 813-8961-1976",
      name: "Customer Service",
      icon: "💐",
    },
  ];

  const features = [
    {
      title: "Artificial Flowers",
      description: "Long-lasting beauty without maintenance",
      icon: "🌸",
      color: "from-rose-100 to-pink-100",
    },
    {
      title: "Fast Delivery",
      description: "Same day delivery within Jakarta",
      icon: "🚚",
      color: "from-blue-100 to-cyan-100",
    },
    {
      title: "Custom Arrangements",
      description: "Personalized designs for any occasion",
      icon: "💝",
      color: "from-purple-100 to-violet-100",
    },
    {
      title: "Bulk Orders",
      description: "Special discounts for events & corporate",
      icon: "🎉",
      color: "from-amber-100 to-orange-100",
    },
  ];

  const paymentMethods = [
    {
      bank: "BCA",
      accountNumber: "0662422949",
      accountName: "RIANTO",
      color: "from-blue-100 to-blue-200",
    },
    {
      bank: "BTN",
      accountNumber: "437015000033333",
      accountName: "RIANTO",
      color: "from-indigo-100 to-indigo-200",
    },
    {
      bank: "BRI",
      accountNumber: "182201000961566",
      accountName: "RIANTO",
      color: "from-sky-100 to-cyan-200",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\D/g, ""));
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
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

          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-6 tracking-tight">
            <span className="font-serif text-gray-900">Get In</span>
            <br />
            <span className="font-serif italic text-gray-700">Touch</span>
          </h1>

          <div className="w-24 h-[2px] bg-gray-900 mx-auto mt-4 mb-6"></div>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to bloom your space with everlasting beauty? Our floral
            experts are here to help you create the perfect arrangement.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
            Contact Our Floral Experts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactNumbers.map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(contact.number)}
                onMouseLeave={() => setIsHovered(null)}
                className={`bg-white rounded-3xl p-8 shadow-xl border hover:shadow-2xl transition-all duration-300 ${
                  isHovered === contact.number ? "ring-2 ring-rose-200" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">{contact.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {contact.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${contact.number.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold py-4 px-6 rounded-xl shadow-lg text-center hover:scale-[1.02] transition-all"
                  >
                    Chat on WhatsApp
                  </a>

                  <button
                    onClick={() => copyToClipboard(contact.number)}
                    className="w-full text-center py-3 rounded-xl border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300"
                  >
                    {copied === contact.number ? "✓ Copied!" : contact.number}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
            Why Choose Bloome?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} whileHover={{ y: -6, scale: 1.05 }}>
                <div
                  className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 shadow-lg`}
                >
                  <div className="text-3xl mb-4 text-center">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2 text-center">
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

        {/* Payment Methods Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
              Payment Methods
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentMethods.map((payment, index) => (
                <motion.div key={index} whileHover={{ y: -6, scale: 1.03 }}>
                  <div
                    className={`bg-gradient-to-br ${payment.color} rounded-2xl p-6 shadow-lg`}
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      {payment.bank}
                    </h4>

                    <p className="text-center font-medium text-gray-700">
                      {payment.accountNumber}
                    </p>
                    <p className="text-center text-sm text-gray-600 mb-4">
                      a/n {payment.accountName}
                    </p>

                    <button
                      onClick={() => copyToClipboard(payment.accountNumber)}
                      className="w-full py-2 rounded-xl border-2 border-white hover:bg-white/70 transition-all duration-300"
                    >
                      {copied === payment.accountNumber
                        ? "✓ Copied!"
                        : "Copy Account Number"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Please send your payment receipt via WhatsApp after transfer for
              confirmation.
            </p>
          </div>
        </div>

        {/* Business Info */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white rounded-2xl px-8 py-6 shadow-xl">
            <div>
              <h4 className="font-bold text-lg text-gray-800">
                Business Hours
              </h4>
              <p className="text-gray-600">Monday - Sunday: 8AM - 5PM</p>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">Response Time</h4>
              <p className="text-gray-600">Typically within 15 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
