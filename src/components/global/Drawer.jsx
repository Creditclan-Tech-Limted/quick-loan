import { useEffect } from 'react';
import classNames from 'classnames';
import Backdrop from './Backdrop.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { IconX } from '@tabler/icons-react';
import Button from './Button.jsx';

const Drawer = ({ isOpen, title, padding = true, onClose, children }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflowY = 'auto';
  }, [isOpen]);

  const variants = {
    hidden: {
      [isMobile ? 'y' : 'x']: '100%',
      opacity: 0,
    },
    visible: {
      [isMobile ? 'y' : 'x']: '0',
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      [isMobile ? 'y' : 'x']: '100%',
      opacity: 0,
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {isOpen && (
        <Backdrop onClick={onClose} className="text-black">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classNames(
              'fixed bottom-0 right-0 w-full overflow-hidden sm:top-0 md:w-[900px]',
              'rounded-t-3xl md:rounded-l-3xl md:rounded-r-3xl md:p-4'
            )}
          >
            <div
              className={classNames(
                'relative inset-x-0 bottom-0 h-min max-h-full overflow-y-auto overflow-x-hidden bg-white sm:h-full',
                'flex flex-col rounded-t-3xl md:rounded-l-3xl md:rounded-r-3xl',
                { 'p-8 md:p-10': padding }
              )}
            >
              {!!title && (
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <Button
                    onClick={onClose}
                    rounded-full
                    size="sm"
                    color="red"
                    variant="outlined"
                  >
                    {' '}
                    <IconX />{' '}
                  </Button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
