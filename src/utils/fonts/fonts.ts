import localFont from 'next/font/local';

export const sohne = localFont({
  src: [
    {
      path: './Sohne/Sohne-Buch.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Sohne/Sohne-BuchKursiv.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Sohne/Sohne-LeichtKursiv.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './Sohne/Sohne-Extraleicht.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './Sohne/Sohne-ExtraleichtKursiv.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './Sohne/Sohne-Kraftig.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Sohne/Sohne-KraftigKursiv.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './Sohne/Sohne-Dreiviertelfett.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Sohne/Sohne-Extrafett.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './Sohne/Sohne-ExtrafettKursiv.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-sohne'
});

export const agrandir = localFont({
  src: [
    {
      path: './Agrandir/PPAgrandir-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Agrandir/PPAgrandir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-agrandir',
});

export const bagoss = localFont({
  src: [
    {
      path: './Bagoss/BagossTRIALVF.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-bagoss',
});

