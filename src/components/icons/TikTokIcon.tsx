import React from 'react';

type TikTokIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

// Minimal TikTok-style glyph (SVG) using currentColor.
const TikTokIcon = ({ title = 'TikTok', ...props }: TikTokIconProps) => (
  <svg viewBox="0 0 24 24" role="img" aria-label={title} {...props}>
    <path
      fill="currentColor"
      d="M16.6 1c.2 2.1 1.4 4 3.4 5.1.9.5 1.9.8 3 .9v3.4c-2 0-3.9-.6-5.5-1.7v7.2c0 4-3.3 7.1-7.3 7.1S6 18.9 6 14.9c0-4 3.3-7.1 7.3-7.1.4 0 .8 0 1.2.1v3.6c-.4-.2-.8-.3-1.2-.3-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V1h3.4Z"
    />
  </svg>
);

export default TikTokIcon;
