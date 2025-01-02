import { useState, useEffect, useCallback } from 'react';
import { 
  PhoneIcon, TabletIcon, XIcon, ShareIcon, 
  PlusCircleIcon, BellIcon, ZapIcon, CheckIcon 
} from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deviceType, setDeviceType] = useState('unknown');
  const [isVisible, setIsVisible] = useState(false);
  const [installStatus, setInstallStatus] = useState('pending'); // pending, installing, success, error

  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    // Don't show if already installed
    if (isStandalone) {
      return 'installed';
    }
    
    return isIOS ? 'ios' : isAndroid ? 'android' : 'desktop';
  }, []);

  useEffect(() => {
    const currentDevice = detectDevice();
    setDeviceType(currentDevice);

    if (currentDevice === 'installed') {
      return;
    }

    // Check if prompt was recently dismissed and respect user preference
    const lastDismissed = localStorage.getItem('pwaPromptDismissed');
    const dismissedDate = lastDismissed ? new Date(parseInt(lastDismissed)) : null;
    const showAfterDismiss = !dismissedDate || Date.now() - dismissedDate.getTime() > 7 * 24 * 60 * 60 * 1000;

    const handler = (e) => {
      e.preventDefault();
      if (showAfterDismiss) {
        setDeferredPrompt(e);
        setShowPrompt(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // Show iOS prompt if applicable
    if (currentDevice === 'ios' && showAfterDismiss) {
      setShowPrompt(true);
      setTimeout(() => setIsVisible(true), 100);
    }

    // Track installation success
    window.addEventListener('appinstalled', () => {
      setInstallStatus('success');
      setTimeout(handleClose, 2000);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', () => {});
    };
  }, [detectDevice]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    try {
      setInstallStatus('installing');
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setInstallStatus('success');
        setTimeout(handleClose, 2000);
      } else {
        handleClose();
      }
    } catch (error) {
      console.error('Installation failed:', error);
      setInstallStatus('error');
    } finally {
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPrompt(false);
      setInstallStatus('pending');
    }, 300);
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  const benefits = [
    { icon: ZapIcon, text: "Faster access to results" },
    { icon: BellIcon, text: "Instant notifications" },
    { icon: PhoneIcon, text: "Works offline" }
  ];

  if (!showPrompt) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 p-4 bg-opacity-95 backdrop-blur-sm z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      role="dialog"
      aria-labelledby="pwa-prompt-title"
    >
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${installStatus === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
              {installStatus === 'success' ? (
                <CheckIcon className="w-6 h-6 text-white" />
              ) : deviceType === 'ios' ? (
                <ShareIcon className="w-6 h-6 text-white" />
              ) : (
                <PlusCircleIcon className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 id="pwa-prompt-title" className="text-xl font-semibold">
                {installStatus === 'success' 
                  ? 'Successfully Installed!'
                  : 'Install Funoon Fiesta'}
              </h3>
              <p className="text-sm text-gray-500">
                {installStatus === 'success' 
                  ? 'You can now access the app from your home screen'
                  : 'Get the full experience'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close installation prompt"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {installStatus === 'pending' && (
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
                    disabled={installStatus === 'installing'}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    {installStatus === 'installing' ? 'Installing...' : 'Install App'}
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
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;