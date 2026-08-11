import { ImageResponse } from 'next/og';

import Icon, { contentType, runtime, size } from './icon';

describe('app icon metadata file convention', () => {
  it('exposes a 32x32 PNG favicon for the App Router', () => {
    expect(size).toEqual({ width: 32, height: 32 });
    expect(contentType).toBe('image/png');
    expect(runtime).toBe('edge');
  });

  it('renders an ImageResponse from the brand mark', () => {
    const response = Icon();
    expect(response).toBeInstanceOf(ImageResponse);
    expect(response.headers.get('content-type')).toBe('image/png');
  });
});
