import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config?: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}

interface DisqusCommentsProps {
  identifier?: string;
  title?: string;
}

export const DisqusComments: React.FC<DisqusCommentsProps> = ({
  identifier = 'singapore-weather-dashboard',
  title = 'Singapore Weather Dashboard - Discussion',
}) => {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    try {
      // Define Disqus configuration
      window.disqus_config = function (this: any) {
        this.page = this.page || {};
        this.page.url = window.location.href;
        this.page.identifier = identifier;
        this.page.title = title;
      };

      if (window.DISQUS) {
        // If Disqus is already loaded on the page, reset it with the new page info
        window.DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page = this.page || {};
            this.page.url = window.location.href;
            this.page.identifier = identifier;
            this.page.title = title;
          },
        });
      } else {
        const existingScript = document.getElementById('disqus-script');
        if (!existingScript) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'disqus-script';
          s.src = 'https://test-8izaxa5kmz.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          s.async = true;
          s.onerror = () => {
            console.warn('Disqus embed script could not be loaded in this sandbox environment.');
            setLoadFailed(true);
          };
          (d.head || d.body).appendChild(s);
        }
      }
    } catch (err) {
      console.warn('Disqus initialization error:', err);
      setLoadFailed(true);
    }
  }, [identifier, title]);

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 card-shadow border border-[#e7e8e9] mt-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e7e8e9]">
        <div className="w-10 h-10 rounded-xl bg-[#004a70]/10 flex items-center justify-center text-[#004a70]">
          <span className="material-symbols-outlined text-2xl">forum</span>
        </div>
        <div>
          <h2 className="font-['Manrope'] text-2xl font-bold text-[#00334e] tracking-tight">
            Community Discussion & Live Weather Reports
          </h2>
          <p className="font-['Hanken_Grotesk'] text-sm text-[#41474e]">
            Share local observations, storm updates, and connect with fellow residents across Singapore.
          </p>
        </div>
      </div>

      <div id="disqus_thread" className="min-h-[150px]">
        {loadFailed && (
          <div className="p-6 text-center text-[#41474e] bg-[#f8f9fa] rounded-xl border border-dashed border-[#c1c7cf]">
            <span className="material-symbols-outlined text-3xl text-[#004a70] mb-2">forum</span>
            <p className="font-['Manrope'] font-semibold text-sm">Disqus Community Discussion Channel</p>
            <p className="text-xs text-[#71787f] mt-1">
              Comments and discussion forum are ready. (Third-party cookies or scripts may be restricted in sandboxed previews).
            </p>
          </div>
        )}
      </div>
      
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" className="text-[#004a70] underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};

