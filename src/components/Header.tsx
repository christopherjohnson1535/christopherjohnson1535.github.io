import SiteHeader from '@ordinate/components/site-header';

import { github, name } from '../lib/site';
import Mark from './Mark';

interface Props {
  path: string;
}

export default function Header({ path }: Props) {
  return (
    <SiteHeader
      brand={{ name, href: '/', logo: <Mark /> }}
      links={[
        { text: 'Projects', href: '/projects/', current: path.startsWith('/projects') },
        { text: 'GitHub', href: github },
      ]}
    />
  );
}
