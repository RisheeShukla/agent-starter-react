'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { useAgent, useSessionContext } from '@livekit/components-react';
import { AgentSessionView_01 } from '@/components/agents-ui/blocks/agent-session-view-01';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(AgentSessionView_01);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

interface ViewControllerProps {
  isVideoInputSupported: boolean;
}

export function ViewController({ isVideoInputSupported }: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();
  const agent = useAgent();
  const { resolvedTheme } = useTheme();
  const [hasToken, setHasToken] = useState(false);
  const [autoStartFailed, setAutoStartFailed] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) return;

    setHasToken(true);

    void start().catch((error) => {
      console.error('Failed to start LiveKit session:', error);
      setAutoStartFailed(true);
    });
  }, [start]);

  return (
    <AnimatePresence mode="wait">
      {/* Welcome view */}
      {!isConnected && (!hasToken || autoStartFailed) && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText="Start call"
          onStartCall={start}
        />
      )}
      {/* Session view */}
      {isConnected && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          preConnectMessage={
            agent.isConnected ? 'Agent is listening, ask it a question' : 'Waiting for agent'
          }
          supportsChatInput={true}
          supportsVideoInput={isVideoInputSupported}
          supportsScreenShare={isVideoInputSupported}
          isPreConnectBufferEnabled={true}
          themeMode={resolvedTheme === 'dark' ? 'dark' : 'light'}
          className="fixed inset-0"
        />
      )}
    </AnimatePresence>
  );
}
