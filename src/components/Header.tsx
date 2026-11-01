import Link from '@ordinate/components/link';
import SiteHeader from '@ordinate/components/site-header';

import { github, name } from '../lib/site';
import Mark from './Mark';

interface Props {
  path: string;
  current?: { title: string; href: string };
}

export default function Header({ path, current }: Props) {
  return (
    <SiteHeader
      brand={{ name, href: '/', logo: <Mark /> }}
      links={[
        { text: 'Projects', href: '/projects/', current: path.startsWith('/projects') },
        { text: 'GitHub', href: github },
      ]}
      notice={
        current && (
          <>
            Now building · <Link href={current.href}>{current.title}</Link>
          </>
        )
      }
    />
  );
}
