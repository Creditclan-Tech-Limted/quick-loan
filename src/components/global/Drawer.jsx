import { useEffect } from 'react';
import classNames from "classnames";
import Backdrop from "./Backdrop.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive'
import { IconX } from "@tabler/icons-react";
import Button from './Button.jsx';

const Drawer = (
  { isOpen, title, padding = true, onClose, children }
) => {
  const isMobile = useMediaQuery({ maxWidth: 640 })

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
        stiffness: 300
      }
    },
    exit: {
      [isMobile ? 'y' : 'x']: '100%',
      opacity: 0,
    }
  }

  return (
    <AnimatePresence initial={ false } mode="wait" onExitComplete={ () => null }>
      {
        isOpen && (
          <Backdrop onClick={ onClose } className="text-black">
            <motion.div
              onClick={ e => e.stopPropagation() }
              variants={ variants }
              initial="hidden"
              animate="visible"
              exit="exit"
              className={ classNames(
                "fixed right-0 bottom-0 sm:top-0 w-full sm:max-w-xl overflow-hidden",
                "rounded-t-3xl md:rounded-r-3xl md:rounded-l-3xl md:p-4"
              ) }
            >
              <div className={ classNames(
                "relative inset-x-0 bottom-0 bg-white h-min max-h-full sm:h-full overflow-x-hidden overflow-y-auto",
                "rounded-t-3xl md:rounded-r-3xl md:rounded-l-3xl flex flex-col",
                { 'p-8 md:p-10': padding }
              ) }>
                {
                  !!title && (
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xl font-semibold">{ title }</h3>
                      <Button
                        onClick={ onClose } rounded-full
                        size="sm" color="red" variant="outlined"
                      > <IconX /> </Button>
                    </div>
                  )
                }
                { children }
              </div>
            </motion.div>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default Drawer;
