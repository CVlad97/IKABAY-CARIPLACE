import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-coral-100 via-ocean-50 to-caribbean-100 bg-tropical-pattern">
      <div className="fixed inset-0 bg-gradient-to-br from-coral-400/5 via-ocean-400/5 to-caribbean-400/5 pointer-events-none" />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-grow relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default Layout;