import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, FileSearch } from 'lucide-react';
import { cn } from '../../lib/utils';
import PolishVat from './PolishVat';
import EuVat from './EuVat';

export default function VatVerificationContainer() {
  const [activeTab, setActiveTab] = useState<'polish' | 'eu'>('polish');

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-primary-500 mb-3">
            Weryfikacja VAT
          </h2>
          <p className="text-lg text-primary-500/80 max-w-3xl mx-auto font-medium">
            Sprawdź status podatnika VAT w Polsce i UE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-100 overflow-hidden"
        >
          <div className="border-b border-primary-100">
            <nav className="flex" aria-label="Tabs">
              <motion.button
                onClick={() => setActiveTab('polish')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-1/2 py-4 px-6 text-center font-medium text-sm transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  activeTab === 'polish'
                    ? "bg-primary-500 text-white"
                    : "text-primary-500/70 hover:text-primary-500 hover:bg-primary-50"
                )}
              >
                <FileCheck className="w-4 h-4" />
                Polski NIP
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('eu')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-1/2 py-4 px-6 text-center font-medium text-sm transition-all duration-200",
                  "flex items-center justify-center gap-2",
                  activeTab === 'eu'
                    ? "bg-primary-500 text-white"
                    : "text-primary-500/70 hover:text-primary-500 hover:bg-primary-50"
                )}
              >
                <FileSearch className="w-4 h-4" />
                VAT UE
              </motion.button>
            </nav>
          </div>

          <div className="bg-white/30 backdrop-blur-sm">
            {activeTab === 'polish' ? <PolishVat /> : <EuVat />}
          </div>
        </motion.div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(0,0,128,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(0,0,128,0.03)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,0,128,0.05)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,_rgba(0,0,128,0.03)_0%,_transparent_60%)]" />
      </div>
    </section>
  );
}
