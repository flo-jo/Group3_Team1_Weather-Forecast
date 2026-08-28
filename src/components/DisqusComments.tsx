import React, { useEffect } from 'react';

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
  useEffect(() => {
    // Define Disqus configuration
    window.disqus_config = function () {
      this.page = this.page || {};
      this.page.url = window.location.href;
      this.page.identifier = identifier;
      this.page.title = title;
    };

    if (window.DISQUS) {
      // If Disqus is already loaded on the page, reset it with the new page info
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page = this.page || {};
          this.page.url = window.location.href;
          this.page.identifier = identifier;
          this.page.title = title;
        },
      });
    } else {
      // Inject Disqus script
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://test-8izaxa5kmz.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.async = true;
      (d.head || d.body).appendChild(s);
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

      <div id="disqus_thread" className="min-h-[250px]"></div>
      
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript" className="text-[#004a70] underline">
          comments powered by Disqus.
        </a>
      </noscript>
    </section>
  );
};
