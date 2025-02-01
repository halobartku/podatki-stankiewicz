import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X,
  Home,
  Calculator,
  FileText,
  Users,
  Phone
} from 'lucide-react'
import { cn } from '../lib/utils'
import type { NavItem } from '../types'
import logo from '../assets/logo.png'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface NavigationProps {
  sections: NavItem[]
  currentSection: string
  onNavigate: (id: string) => void
}

export const Navigation: React.FC<Partial<NavigationProps>> = ({
  sections = [],
  currentSection = 'home',
  onNavigate = () => {},
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleNavigate = (id: string): void => {
    onNavigate(id)
    setIsOpen(false)
  }

  React.useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      // Only reset overflow if we're on mobile
      if (isMobile) {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (isMobile) {
        document.body.style.overflow = '';
      }
    }
  }, [isOpen])


  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] p-3 rounded-xl bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors touch-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[50] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      {...{
                        src: logo,
                        alt: "Logo",
                        className: "h-14 w-14 object-contain"
                      } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
                    />
                    <div className="text-sm font-medium text-primary-600 leading-tight">
                      Kancelaria Podatkowa<br />
                      Stankiewicz
                    </div>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavigate(section.id)}
                        className={cn(
                          'w-full px-6 py-4 flex items-center gap-4 transition-colors',
                          currentSection === section.id
                            ? 'text-white bg-primary-500'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        <Icon size={24} />
                        <span className="font-medium text-base">{section.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.id}
                className="group relative flex items-center justify-end"
              >
                {/* Label tooltip */}
                <div
                  className={cn(
                    'absolute right-full mr-4 px-4 py-2 rounded-lg text-sm font-medium',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                    'bg-primary-500 text-cream shadow-lg',
                    'whitespace-nowrap'
                  )}
                >
                  {section.label}
                </div>

                {/* Icon button */}
                <button
                  onClick={() => handleNavigate(section.id)}
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300',
                    'backdrop-blur-sm shadow-lg',
                    currentSection === section.id
                      ? 'bg-primary-500'
                      : 'bg-primary-500/80 hover:bg-primary-500',
                    'border-2',
                    currentSection === section.id
                      ? 'border-secondary-500'
                      : 'border-cream/50 hover:border-cream'
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      'transition-colors duration-300',
                      currentSection === section.id
                        ? 'text-secondary-500'
                        : 'text-cream'
                    )}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </nav>
    </>
  )
}
