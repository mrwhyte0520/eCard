'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 96 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -96 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
