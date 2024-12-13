import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import PolishVat from './PolishVat';
import EuVat from './EuVat';

export default function VatVerificationContainer() {
  const [activeTab, setActiveTab] = useState<'polish' | 'eu'>('polish');

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-[#862B44]">
            Narzędzia Weryfikacji
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Weryfikacja Numeru VAT
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Szybka i łatwa weryfikacja polskiego NIP oraz numerów VAT UE
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-white/10">
            <div className="border-b border-white/10">
              <nav className="flex" aria-label="Tabs">
                <motion.button
                  onClick={() => setActiveTab('polish')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-1/2 py-4 px-1 text-center font-medium text-sm transition-all duration-200",
                    activeTab === 'polish'
                      ? "bg-gradient-to-r from-[#862B44] via-[#A13553] to-[#DAA520]/40 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/10"
                  )}
                >
                  Polski NIP
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('eu')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-1/2 py-4 px-1 text-center font-medium text-sm transition-all duration-200",
                    activeTab === 'eu'
                      ? "bg-gradient-to-r from-[#862B44] via-[#A13553] to-[#DAA520]/40 text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/10"
                  )}
                >
                  VAT UE
                </motion.button>
              </nav>
            </div>

            <div className="bg-white/30 backdrop-blur-sm">
              {activeTab === 'polish' ? <PolishVat /> : <EuVat />}
            </div>
          </div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(134,43,68,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(218,165,32,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(134,43,68,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,_rgba(218,165,32,0.08)_0%,_transparent_60%)]" />
      </div>
    </section>
  );
}
