import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '24px',
          background: 'linear-gradient(to right, #4E73DF, #2A58B2)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F1F1F1',
          borderRadius: '4px',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
