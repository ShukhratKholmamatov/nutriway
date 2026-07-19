import { uz } from "./uz";
import { ru } from "./ru";
import type { Locale } from "@/lib/site";

export type Dict = typeof uz;

const dictionaries: Record<Locale, Dict> = { uz, ru };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/**
 * The site uses no photography. Every visual is drawn — see
 * `components/ui/ProductJar.tsx` and `components/ui/Motifs.tsx` — so that all
 * on-screen text is real, selectable, translatable and indexable.
 *
 * The social preview image is generated at `app/[locale]/opengraph-image.tsx`.
 */
