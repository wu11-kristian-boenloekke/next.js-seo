import { ImageResponse } from 'next/og';

type AspectRatio = '1200x630' | '1x1' | '4x3' | '16x9';

const aspectRatios: Record<AspectRatio, { width: number; height: number }> = {
  '1200x630': { width: 1200, height: 630 },
  '1x1': { width: 800, height: 800 },
  '4x3': { width: 1200, height: 900 },
  '16x9': { width: 1600, height: 900 },
};

export async function GET(request: Request) {
  // const url = new URL(request.url);
  // const pathSegments = url.pathname.split('/');
  // const aspectRatio = pathSegments[pathSegments.length - 2] as AspectRatio;

  // const { searchParams } = new URL(request.url);
  // const title = searchParams.get('title') || 'Default Title';

  const url = new URL(request.url);
  const aspectRatio = url.pathname.split('/').pop() as AspectRatio;

  // Default to 1200x630 if the aspect ratio is not found
  const config = aspectRatios[aspectRatio] || aspectRatios['1200x630'];

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <img
            alt="Vercel"
            height={200}
            src="data:image/svg+xml,%3Csvg width='116' height='100' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
            style={{ margin: '0 30px' }}
            width={232}
          />
        </div>
        <div
          style={{
            fontSize: '60px',
            color: 'black',
            marginTop: '30px',
            padding: '0 120px',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
          }}
        >
         {aspectRatio}
        </div>
       
      </div>
    ),
    {
      width: config.width,
      height: config.height,
    }
  );
}
