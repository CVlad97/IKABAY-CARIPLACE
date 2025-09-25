import React from 'react';
import Container from './Container';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  animate?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  containerClassName = '', 
  children,
  animate = true
}) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const Content = () => (
    <section id={id} className={`py-12 md:py-16 lg:py-24 ${className}`}>
      <Container className={containerClassName}>
        {children}
      </Container>
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Content />
      </motion.div>
    );
  }

  return <Content />;
};

export default Section;