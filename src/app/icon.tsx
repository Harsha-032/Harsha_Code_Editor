
import { ImageResponse } from 'next/og'
import { HarshasEditorLogo } from '@/components/harshas-editor-logo';

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <HarshasEditorLogo
        width={size.width}
        height={size.height}
        style={{
          color: '#9400D3', // primary color
        }}
       />
    ),
    {
      ...size,
    }
  )
}
