import SiteFooter from '@ordinate/components/site-footer';

import { github, name, revision } from '../lib/site';
import Mark from './Mark';

interface Props {
  projects: { title: string; href: string }[];
  elsewhere: { text: string; href: string }[];
}

export default function Footer({ projects, elsewhere }: Props) {
  return (
    <SiteFooter
      brand={{ name, href: '/', logo: <Mark /> }}
      columns={[
        { title: 'Projects', links: projects.map((p) => ({ text: p.title, href: p.href })) },
        { title: 'Elsewhere', links: [{ text: 'GitHub', href: github }, ...elsewhere] },
      ]}
      legal={
        <>
          <span>
            {name}, {new Date().getFullYear()}
          </span>
          <span>Built with Ordinate {revision}</span>
        </>
      }
    />
  );
}
