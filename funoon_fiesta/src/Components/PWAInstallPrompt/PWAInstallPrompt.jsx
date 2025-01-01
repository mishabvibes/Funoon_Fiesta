import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstallPrompt = () => {
 const [deferredPrompt, setDeferredPrompt] = useState(null);
 const [showPrompt, setShowPrompt] = useState(false);
 const [isIOS, setIsIOS] = useState(false);
 const [isStandalone, setIsStandalone] = useState(false);

 useEffect(() => {
   const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
   setIsIOS(isIOSDevice);
   setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

   if (isIOSDevice && !isStandalone) {
     setTimeout(() => setShowPrompt(true), 2000);
   }

   const handler = (e) => {
     e.preventDefault();
     setDeferredPrompt(e);
     setTimeout(() => setShowPrompt(true), 2000);
   };

   window.addEventListener('beforeinstallprompt', handler);
   const mediaQuery = window.matchMedia('(display-mode: standalone)');
   mediaQuery.addListener((e) => setIsStandalone(e.matches));

   return () => {
     window.removeEventListener('beforeinstallprompt', handler);
     mediaQuery.removeListener((e) => setIsStandalone(e.matches));
   };
 }, []);

 const handleInstallClick = async () => {
   if (!deferredPrompt) return;
   deferredPrompt.prompt();
   const { outcome } = await deferredPrompt.userChoice;
   setDeferredPrompt(null);
   setShowPrompt(false);
 };

 if (!showPrompt || isStandalone) return null;

 return (
   <AnimatePresence>
     <motion.div 
       initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       exit={{ y: 100, opacity: 0 }}
       className="fixed bottom-4 left-4 right-4 z-50"
     >
       <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6">
         <div className="flex flex-col items-center">
           <div className="w-16 h-16 mb-4 bg-secondery rounded-full flex items-center justify-center">
             <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                     d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
             </svg>
           </div>
           
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
             Install Funoon Fiesta
           </h3>

           {isIOS ? (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-center"
             >
               <p className="text-gray-600 mb-4">Follow these steps to install:</p>
               <div className="bg-gray-50 rounded-lg p-4 mb-4">
                 <ol className="text-left space-y-3">
                   <motion.li 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="flex items-center text-gray-700"
                   >
                     <span className="mr-2 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-secondery text-white rounded-full text-sm">1</span>
                     Tap <span className="mx-2 p-1 bg-gray-200 rounded">
                       <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                         <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                       </svg>
                     </span> Share
                   </motion.li>
                   <motion.li 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex items-center text-gray-700"
                   >
                     <span className="mr-2 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-secondery text-white rounded-full text-sm">2</span>
                     Select 'Add to Home Screen'
                   </motion.li>
                   <motion.li 
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="flex items-center text-gray-700"
                   >
                     <span className="mr-2 flex-shrink-0 w-6 h-6 flex items-center justify-center bg-secondery text-white rounded-full text-sm">3</span>
                     Tap 'Add' to install
                   </motion.li>
                 </ol>
               </div>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setShowPrompt(false)}
                 className="w-full px-6 py-3 bg-secondery text-white rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition-all"
               >
                 Got it
               </motion.button>
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full text-center"
             >
               <p className="text-gray-600 mb-6">
                 Install our app for a faster, enhanced experience with offline access
               </p>
               <div className="flex flex-col sm:flex-row gap-3">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handleInstallClick}
                   className="px-6 py-3 bg-secondery text-white rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition-all"
                 >
                   Install Now
                 </motion.button>
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setShowPrompt(false)}
                   className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                 >
                   Maybe Later
                 </motion.button>
               </div>
             </motion.div>
           )}
         </div>
       </div>
     </motion.div>
   </AnimatePresence>
 );
};

export default PWAInstallPrompt;