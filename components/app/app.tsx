'use client';

import { useMemo } from 'react';
import { TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { ProductToastListener } from '@/components/ProductToastListener'; 

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return <ProductToastListener />;
}

interface AppProps {
  agentName?: string;
}

export function App({ agentName }: AppProps) {
  const activeAgentName = agentName?.trim() || undefined;

  // Use a custom TokenSource to read the token from the WhatsApp URL
  const tokenSource = useMemo(() => {
    return TokenSource.custom(async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "";

      if (!token) {
        throw new Error('No token found in URL parameters.');
      }
      if (!serverUrl) {
        throw new Error('No LiveKit server URL configured.');
      }

      return {
        serverUrl,
        participantToken: token,
      };
    });
  }, []);

  // Pass the required agentName configuration into useSession
  const session = useSession(tokenSource, {
    agentName: activeAgentName,
  });

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid h-svh grid-cols-1 place-content-center">
        <ViewController />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-right"
        duration={15000}
        gap={12}
        offset={16}
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
    </AgentSessionProvider>
  );
}