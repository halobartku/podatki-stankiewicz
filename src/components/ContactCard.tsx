import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Building, FileText, User, Mail, Navigation } from "lucide-react";
import { siteMetadata } from "../config/metadata";

const businessHours = [
  { day: "Poniedziałek", hours: "09:00–16:00" },
  { day: "Wtorek", hours: "09:00–16:00" },
  { day: "Środa", hours: "09:00–16:00" },
  { day: "Czwartek", hours: "09:00–16:00" },
  { day: "Piątek", hours: "09:00–16:00" },
  { day: "Sobota", hours: "Zamknięte" },
  { day: "Niedziela", hours: "Zamknięte" },
];

export function ContactCard() {
  const handleNavigation = () => {
    window.open('https://www.google.com/maps/dir//Kowalska+8-9%2FD,+82-300+Elbl%C4%85g/@54.1589988,19.3149878,17816m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x46fd4d9815ad9e9b:0x889fa4c5e7495e2b!2m2!1d19.3973879!2d54.1590269?hl=pl&entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-primary-500 mb-3">
            Kontakt
          </h2>
          <p className="text-lg text-primary-500/80 max-w-3xl mx-auto font-medium">
            Zapraszamy do kontaktu i odwiedzenia naszego biura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Adres do doręczeń</h3>
                  <p className="text-primary-500/80 mb-3">{siteMetadata.company.address}</p>
                  <motion.button
                    onClick={handleNavigation}
                    className="relative inline-flex items-center gap-2 rounded-lg px-8 py-3 text-sm font-medium text-white overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 transition-all duration-300"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 transition-opacity duration-300"></div>
                    <Navigation className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Prowadź do</span>
                    <div className="absolute inset-0 border border-white/10 rounded-lg shadow-lg"></div>
                  </motion.button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Telefon</h3>
                  <a 
                    href="tel:786131260"
                    className="text-primary-500/80 hover:text-primary-500 transition-colors inline-flex items-center gap-2"
                  >
                    786 131 260
                    <span className="text-sm text-primary-400">(Zadzwoń teraz)</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Email</h3>
                  <a 
                    href="mailto:biuro@podatkistankiewicz.pl"
                    className="text-primary-500/80 hover:text-primary-500 transition-colors"
                  >
                    biuro@podatkistankiewicz.pl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-3">Godziny otwarcia</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {businessHours.map((schedule) => (
                      <div key={schedule.day} className="contents">
                        <span className="text-primary-500/80 font-medium text-sm">{schedule.day}</span>
                        <span className="text-primary-500/80 text-sm">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Registration Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-100"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Forma prawna</h3>
                  <p className="text-primary-500/80">{siteMetadata.company.type}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <User className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Przedsiębiorca</h3>
                  <p className="text-primary-500/80">{siteMetadata.company.owner}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Dane rejestrowe</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-primary-500/80 font-medium">NIP: </span>
                      <span className="text-primary-500/80">{siteMetadata.company.registration.nip}</span>
                    </div>
                    <div>
                      <span className="text-primary-500/80 font-medium">REGON: </span>
                      <span className="text-primary-500/80">{siteMetadata.company.registration.regon}</span>
                    </div>
                    <div>
                      <span className="text-primary-500/80 font-medium">PKD: </span>
                      <span className="text-primary-500/80">{siteMetadata.company.registration.pkd}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-500 mb-2">Adres rejestrowy</h3>
                  <p className="text-primary-500/80">{siteMetadata.company.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <h1 className="text-xl font-bold text-primary-500">
            {siteMetadata.company.name}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
