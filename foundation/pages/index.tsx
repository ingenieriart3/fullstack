// pages/index.js
import { useRouter } from 'next/router';
import ManifestoES from './index.es';
import ManifestoEN from './index.en';
import ManifestoPT from './index.pt';

export default function Home() {
  const { locale } = useRouter();
  if (locale === 'en') return <ManifestoEN />;
  if (locale === 'pt') return <ManifestoPT />;
  return <ManifestoES />;
}
