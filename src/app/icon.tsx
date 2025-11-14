import { ImageResponse } from 'next/og'

// Force dynamic rendering to avoid build-time issues on Windows
export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(180deg, #BE30FF 0%, #5D31F8 50%, #00A3FF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        IA
      </div>
    ),
    {
      ...size,
    }
  )
}

