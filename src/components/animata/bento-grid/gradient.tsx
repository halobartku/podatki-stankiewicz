import { cn } from "../../../lib/utils";
import { Service } from "../../../types";
import { motion } from "framer-motion";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
      {services.map((service, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={service.title}
          className={cn(
            "group relative overflow-hidden rounded-3xl w-full",
            "bg-white shadow-sm transition-all duration-300",
            "hover:shadow-lg hover:bg-gradient-to-br from-gray-50 to-primary-50/30",
            "box-border" 
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <service.icon className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-primary-500">
                {service.title}
              </h3>
            </div>
            
            <p className="text-sm text-primary-500/80 break-words whitespace-normal">
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
