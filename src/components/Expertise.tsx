import { motion } from "framer-motion";
import { FlipCard } from "./animata/card/flip-card";
import { 
  Calculator, 
  Building2, 
  FileText, 
  Receipt, 
  Scale, 
  Users 
} from "lucide-react";

const expertiseAreas = [
  {
    title: "Podatki Firmowe",
    subtitle: "Rozliczenia CIT",
    description: "Profesjonalne obsługa w zakresie podatku dochodowego od osób prawnych (CIT) oraz optymalizacji podatkowej.",
    image: "/images/expertise/firmowe.png",
    icon: Building2
  },
  {
    title: "Podatki Osobiste",
    subtitle: "Rozliczenia PIT",
    description: "Kompleksowa obsługa w zakresie podatku dochodowego od osób fizycznych (PIT) oraz ulg podatkowych.",
    image: "/images/expertise/personal.png",
    icon: Calculator
  },
  {
    title: "VAT i Akcyza",
    subtitle: "Podatki Pośrednie",
    description: "Specjalistyczna obsługa w zakresie podatku VAT, akcyzy oraz rozliczeń międzynarodowych.",
    image: "/images/expertise/VAT.png",
    icon: Receipt
  },
  {
    title: "Księgowość",
    subtitle: "Usługi Księgowe",
    description: "Pełna obsługa księgowa firm, prowadzenie ksiąg rachunkowych i dokumentacji finansowej.",
    image: "/images/expertise/ksiegowos.png",
    icon: FileText
  },
  {
    title: "ZUS",
    subtitle: "Rozliczenia z ZUS",
    description: "Pełna obsługa w zakresie rozliczeń z Zakładem Ubezpieczeń Społecznych.",
    image: "/images/expertise/prawo.png",
    icon: Scale
  },
  {
    title: "Kadry i Płace",
    subtitle: "Obsługa HR",
    description: "Kompleksowa obsługa kadrowo-płacowa, rozliczenia z ZUS, umowy i dokumentacja pracownicza.",
    image: "/images/expertise/kadry.png",
    icon: Users
  }
];

export function Expertise() {
  return (
    <div className="relative min-h-screen py-12 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-primary-500 pb-2 leading-relaxed">
            Specjalizacje i Usługi
          </h2>
          <p className="mt-4 text-lg text-primary-500/80 font-medium">
            Profesjonalne usługi podatkowe i księgowe dla firm oraz osób prywatnych
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="mx-auto w-full max-w-[350px] mb-6 sm:mb-0"
            >
              <FlipCard
                title={area.title}
                subtitle={area.subtitle}
                description={area.description}
                image={area.image}
                icon={area.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
