import { useState, useEffect } from 'react';
import { PhoneIcon, TabletIcon, XIcon, ShareIcon, PlusCircleIcon, BellIcon, ZapIcon } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deviceType, setDeviceType] = useState('unknown');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    
    setDeviceType(isIOS ? 'ios' : isAndroid ? 'android' : 'unknown');

    // Check if prompt was recently dismissed
    const lastDismissed = localStorage.getItem('pwaPromptDismissed');
    const showAfterDismiss = !lastDismissed || Date.now() - parseInt(lastDismissed) > 7 * 24 * 60 * 60 * 1000; // 7 days

    const handler = (e) => {
      e.preventDefault();
      if (showAfterDismiss) {
        setDeferredPrompt(e);
        setShowPrompt(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    if (isIOS && !window.navigator.standalone && showAfterDismiss) {
      setShowPrompt(true);
      setTimeout(() => setIsVisible(true), 100);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowPrompt(false), 300); // Wait for animation
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

  const benefits = [
    { icon: ZapIcon, text: "Faster access to results" },
    { icon: BellIcon, text: "Instant notifications" },
    { icon: PhoneIcon, text: "Works offline" }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 bg-opacity-95 backdrop-blur-sm z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 transform transition-transform duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              {deviceType === 'ios' ? (
                <ShareIcon className="w-6 h-6 text-white" />
              ) : (
                <PlusCircleIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">Install Funoon Fiesta</h3>
              <p className="text-sm text-gray-500">Get the full experience</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-6 justify-center mb-6">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-2">
                <div className="bg-red-50 p-2 rounded-full">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-xs text-gray-600 text-center">{text}</span>
              </div>
            ))}
          </div>

          {deviceType === 'ios' ? (
            <ol className="space-y-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
              <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Tap the <ShareIcon className="w-4 h-4 inline mx-1" /> share button
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Scroll and select "Add to Home Screen"
              </li>
              <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                Tap "Add" to install
              </li>
            </ol>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-3">
                <button
                  onClick={handleInstallClick}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Install App
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;