import { ImageResponse } from '@vercel/og';

  export const config = {
    runtime: 'edge',
  };

  export default function handler(req) {
    const { searchParams } = new URL(req.url);
    const titulo = (searchParams.get('titulo') ||
  'Bem-vindo!').slice(0, 60);
    const sub = (searchParams.get('sub') || '').slice(0, 80);
    const avatar = searchParams.get('avatar') || '';
    const fundo = searchParams.get('fundo') || '';

    const bgStyle = fundo
      ? { backgroundImage: `url(${fundo})`, backgroundSize:
  'cover', backgroundPosition: 'center' }
      : { background: 'linear-gradient(135deg, #667eea 0%, #764ba2
   100%)' };

    return new ImageResponse(
      {
        type: 'div',
        props: {                                                            style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: 40,
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            ...bgStyle,
          },
          children: [
            avatar
              ? {
                  type: 'img',
                  props: {
                    src: avatar,
                    width: 220,
                    height: 220,
                    style: {
                      borderRadius: '50%',
                      border: '8px solid white',
                      marginBottom: 30,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    },
                  },
                }
              : null,
            {
              type: 'div',
              props: {
                style: { fontSize: 72, fontWeight: 800, textAlign:
   'center', marginBottom: 16 },
                children: titulo,
              },
            },
            sub
              ? {
                  type: 'div',
                  props: {
                    style: { fontSize: 36, opacity: 0.95,
  textAlign: 'center' },
                    children: sub,
                  },
                }
              : null,
          ].filter(Boolean),
        },
      },
      {
        width: 1200,
        height: 630,
      }
    );
      }
