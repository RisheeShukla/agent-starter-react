import { Button } from '@/components/ui/button';

function WelcomeImage() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-fg0 mb-4 size-16"
    >
      <path
        d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="min-h-screen">
      <section className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-6 pb-16 pt-20 text-center sm:px-8 md:pt-24">
        <div className="flex w-full max-w-md flex-col items-center justify-center">
          <WelcomeImage />

          <p className="text-foreground max-w-prose text-base leading-6 font-medium sm:text-lg md:text-xl">
            Chat live with your voice AI agent
          </p>

          <div
  className="group relative mt-6 inline-flex w-full max-w-md items-center justify-center gap-3 overflow-hidden rounded-full border border-yellow-600 bg-yellow-50 px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-primary backdrop-blur-md transition-all duration-300 sm:text-base"
>
  {/* Larger pulsing indicator dot */}
  <span className="flex h-3 w-3 rounded-full bg-yellow-600 animate-pulse" />
  
  <span className='text-yellow-600'>Welcome to Aniyor</span>
</div>
        </div>

        <div className="mt-10 flex flex-col w-full items-center justify-center px-4 text-center">
          <p className="text-muted-foreground max-w-prose text-[11px] leading-5 font-normal text-pretty sm:text-xs md:text-sm">
            Visit our site for shopping{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aniyor.net/"
              className="underline underline-offset-2"
            >
              Aniyor Store
            </a>
            .
          </p>
          <p className='mt-9 text-xl text-red-500'>If you are seeing this screen your token is expired.</p>
          <p className='mt-2 text-xl text-red-500'>Sorry, you can talk to the agent only for five minutes.</p>
        </div>
      </section>
    </div>
  );
};
