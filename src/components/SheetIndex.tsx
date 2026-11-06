import IndexList from '@ordinate/components/index-list';
import Stamp from '@ordinate/components/stamp';

export interface SheetIndexItem {
  id: string;
  title: string;
  href: string;
  stack: string;
  status: string;
}

// Every project as a numbered sheet, with its status stamped on the right.
export default function SheetIndex({ items }: { items: SheetIndexItem[] }) {
  return (
    <IndexList
      variant="numbered"
      size="large"
      ariaLabel="Projects"
      items={items.map((p, i) => ({
        id: p.id,
        number: String(i + 1).padStart(2, '0'),
        label: p.title,
        href: p.href,
        meta: p.stack,
        value: (
          <Stamp size="small" rotation="none" type={p.status === 'Live' ? 'complete' : 'draft'}>
            {p.status}
          </Stamp>
        ),
      }))}
    />
  );
}
