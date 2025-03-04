import React, { useState, useEffect } from 'react';

interface ServerConfig {
  host: string;
  port: number;
}

interface StreamState {
  isStreaming: boolean;
  streamError: boolean;
  errorMessage: string;
}

const LiveVideo: React.FC = () => {
  const [streamState, setStreamState] = useState<StreamState>({
    isStreaming: false,
    streamError: false,
    errorMessage: '',
  });
  // Add a piece of state to force <img> to reload
  const [imgReloadKey, setImgReloadKey] = useState<number>(Date.now());

  const serverConfig: ServerConfig = {
    host: '127.0.0.1',
    port: 5000,
  };

  const BASE_FEED_URL = `http://${serverConfig.host}:${serverConfig.port}/api/processed_video_feed`;
  // We'll append a random param to ensure reloading
  const VIDEO_FEED_URL = `${BASE_FEED_URL}?reload=${imgReloadKey}`;

  const checkStreamAvailability = async (): Promise<void> => {
    console.log('Checking stream availability...');
    try {
      setStreamState(prev => ({
        ...prev,
        streamError: false,
        errorMessage: '',
      }));

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 5000);
      });

      const fetchPromise = fetch(BASE_FEED_URL, { method: 'GET' });
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      console.log('Stream server is available');
      // Once we confirm availability, set isStreaming to true
      // Also force <img> to reload by updating imgReloadKey
      setStreamState(prev => ({
        ...prev,
        isStreaming: true,
      }));
      setImgReloadKey(Date.now()); // This changes the query param => forces <img> reload

    } catch (error) {
      console.error(
        'Error checking stream:',
        error instanceof Error ? error.message : 'Unknown error'
      );

      let errorMessage = 'Connection error occurred';
      if (error instanceof Error) {
        if (error.message.includes('timed out')) {
          errorMessage =
            'Connection to video server timed out. Server might be down or unreachable.';
        } else if (
          error.message.includes('Failed to fetch') ||
          error.message.includes('Network error')
        ) {
          errorMessage =
            'Cannot connect to video server. Please ensure the server is running.';
        } else {
          errorMessage = `Connection error: ${error.message}`;
        }
      }

      setStreamState({
        isStreaming: false,
        streamError: true,
        errorMessage,
      });
    }
  };

  useEffect(() => {
    checkStreamAvailability();
    const intervalId = setInterval(checkStreamAvailability, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleImageError = (): void => {
    console.error('Video stream failed to load');
    setStreamState({
      isStreaming: false,
      streamError: true,
      errorMessage:
        'Video stream failed to load. Please try refreshing the page.',
    });
  };

  const retryConnection = (): void => {
    console.log('Retrying connection...');
    setStreamState({
      isStreaming: false,
      streamError: false,
      errorMessage: 'Reconnecting to server...',
    });
    // Force a new check
    setTimeout(() => {
      checkStreamAvailability();
    }, 1000);
  };

  const { isStreaming, streamError, errorMessage } = streamState;

  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-full max-w-4xl border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white text-center py-2 text-lg font-semibold flex justify-between items-center px-4">
          <span>Live Camera Feed</span>
          {streamError && (
            <button
              onClick={retryConnection}
              className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-3 py-1 rounded"
            >
              Retry Connection
            </button>
          )}
        </div>

        {/* Video container */}
        <div className="aspect-w-16 aspect-h-9 bg-black relative">
          {isStreaming ? (
            <img
              src={VIDEO_FEED_URL}
              alt="Processed Video Stream"
              className="h-full w-full object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full text-white p-4">
              {streamError ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-center">
                    {errorMessage ||
                      'Stream unavailable. Please check connection to the server.'}
                  </p>
                  <p className="text-center text-sm mt-2 text-gray-400">
                    Server URL: {BASE_FEED_URL}
                  </p>
                </>
              ) : (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                  <p className="mt-2">Connecting to stream...</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div className="bg-gray-700 text-white px-4 py-2 text-sm">
          Status:{' '}
          {isStreaming ? (
            <span className="text-green-400">Connected</span>
          ) : (
            <span className="text-red-400">Disconnected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
