import React from 'react';
import { Rocket, Mail, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="max-w-3xl mx-auto mt-12 p-6 space-y-8">
      <div className="flex items-center justify-center gap-2 text-lg">
        <span className="text-neutral-darkGray">Tool by Maurice Greenland</span>
        <Rocket className="text-primary-main" />
      </div>
      
      <div className="flex items-center justify-center gap-8">
        <a
          href="https://getck.mauricegreenland.com/ai-odyssey-newsletter-signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-main hover:text-primary-dark transition-colors"
        >
          <Mail />
          Get our FREE AI Newsletter
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary-main hover:text-primary-dark transition-colors"
        >
          <MessageSquare />
          Share your thoughts!
        </a>
      </div>

      <p className="text-sm text-neutral-mediumGray text-center">
        This tool uses AI to generate SEO-optimized meta title suggestions. Results may vary and should be reviewed for accuracy.
      </p>

      <div className="text-center">
        <a
          href="https://mauricegreenland.com/free-ai-tools-for-bloggers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-neutral-darkest text-white px-8 py-3 rounded-full hover:bg-neutral-darkGray transition-colors"
        >
          More Free Tools
        </a>
      </div>
    </footer>
  );
};