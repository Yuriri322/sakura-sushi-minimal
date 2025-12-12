'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedList({ children, className = '' }: AnimatedListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedListItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DynamicListProps {
  children: ReactNode;
  className?: string;
}

export function DynamicList({ children, className = '' }: DynamicListProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function DynamicListItem({
  children,
  id,
  className = '',
}: {
  children: ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
      key={id}
    >
      {children}
    </motion.div>
  );
}
