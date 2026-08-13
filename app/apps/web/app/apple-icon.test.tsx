import { ImageResponse } from 'next/og';

import AppleIcon, { contentType, runtime, size } from './apple-icon';

describe('apple-icon metadata file convention', () => {
  it('exposes a 180x180 PNG apple touch icon for the App Router', () => {
    expect(size).toEqual({ width: 180, height: 180 });
    expect(contentType).toBe('image/png');
    // Node.js runtime (the deprecated Edge Runtime was removed in Next.js 16.3).
    expect(runtime).toBe('nodejs');
  });

  it('renders an ImageResponse from the brand mark', () => {
    const response = AppleIcon();
    expect(response).toBeInstanceOf(ImageResponse);
    expect(response.headers.get('content-type')).toBe('image/png');
  });
});
