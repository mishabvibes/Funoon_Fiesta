// src/components/PWAInstallPrompt/PWAInstallPrompt.jsx
import { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    const handler = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show prompt modal if not installed
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    setShowPrompt(false);

    // Optionally, send analytics event
    console.log(`User response to install prompt: ${outcome}`);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg z-50">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Install Funoon Fiesta</h3>
        {isIOS ? (
          <div className="text-center">
            <p className="text-gray-600 mb-2">To install our app:</p>
            <ol className="text-left text-sm text-gray-600 mb-4">
              <li>1. Tap the Share button</li>
              <li>2. Scroll down and tap "Add to Home Screen"</li>
              <li>3. Tap "Add" to install</li>
            </ol>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-4 py-2 bg-secondery text-white rounded-md hover:bg-opacity-90"
            >
              Got it
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-center mb-4">
              Install our app for a better experience and quick access to results
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-secondery text-white rounded-md hover:bg-opacity-90"
              >
                Install
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Not now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;