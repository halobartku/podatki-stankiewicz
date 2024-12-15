import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../lib/utils';
import PolishVat from './VatVerification/PolishVat';
import EuVat from './VatVerification/EuVat';

type TabType = 'polish' | 'eu';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<TabType>('polish');

  const TabButton = ({ tab, label }: { tab: TabType; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={cn(
        "relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 overflow-hidden group",
        activeTab === tab
          ? "text-white"
          : "text-primary-500/70 hover:text-primary-500 hover:bg-primary-50"
      )}
    >
      {activeTab === tab && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 transition-all duration-300"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 transition-opacity duration-300"></div>
          <div className="absolute inset-0 border border-white/10 rounded-lg shadow-lg"></div>
        </>
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-primary-500 sm:text-3xl">
            Weryfikacja Kontrahenta
          </h2>
          <p className="mt-1 text-base leading-6 text-primary-500/80">
            Sprawdź status VAT i dane rejestrowe
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-8 p-2 bg-white/80 rounded-lg border border-primary-100">
            <TabButton tab="polish" label="Polski NIP" />
            <TabButton tab="eu" label="VAT UE" />
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'polish' ? <PolishVat /> : <EuVat />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export { Analytics };
export default Analytics;
