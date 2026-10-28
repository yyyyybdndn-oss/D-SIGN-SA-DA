import { useState } from 'react';
import { ImageOff, Plus, Search } from 'lucide-react';
import { detailsComplets, type Produit } from '@/data/produits';

type ProductCardLabels = {
  category: string;
  fabric: string;
  wood: string;
  price: string;
  enquire: string;
  zoom: string;
};

type ProductCardProps = {
  produit: Produit;
  index: number;
  labels: ProductCardLabels;
  onZoom: (produit: Produit) => void;
  onEnquire: (produit: Produit) => void;
};

export function ProductCard({ produit, index, labels, onZoom, onEnquire }: ProductCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const details = detailsComplets(produit);
  const specs = [
    { label: labels.fabric, value: details.tissu },
    { label: labels.wood, value: details.bois },
    { label: labels.price, value: details.prix },
  ];

  return (
    <article
      className="group flex h-full min-w-0 flex-col overflow-hidden border border-[#38342c] bg-[#211f1a] transition-colors duration-300 hover:border-[#897346]"
      data-testid={`card-product-${produit.id}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2a2721]">
        {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-[#2a2721]" aria-hidden="true" />}
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#8f887c]" role="img" aria-label={produit.alt}>
            <ImageOff size={28} aria-hidden="true" />
            <span className="text-xs tracking-[0.2em]">DÉSIGN SAÂDA</span>
          </div>
        ) : (
          <img
            src={`/images/${produit.image}`}
            alt={produit.alt}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.04] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        <span
          className="absolute left-3 top-3 border border-[#d6be82]/40 bg-[#181612]/75 px-2.5 py-1 font-sans text-[11px] text-[#f1e5c6] backdrop-blur-sm"
          dir="ltr"
        >
          {String(produit.id).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => onZoom(produit)}
          disabled={failed}
          aria-label={`${labels.zoom} ${produit.nom}`}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-[#d6be82]/60 bg-[#151310]/70 text-[#f0e5c8] backdrop-blur-sm transition-colors hover:bg-[#b69a5b] hover:text-[#171512] disabled:opacity-40"
          data-testid={`button-zoom-${produit.id}`}
        >
          <Search size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold tracking-wider text-[#b69a5b]">{labels.category}</span>
        <h3 className="mt-2 line-clamp-1 text-lg font-bold leading-snug text-[#f0ece4] md:text-xl">{produit.nom}</h3>
        <p className="mt-2 line-clamp-2 min-h-[3.25rem] text-[13px] leading-relaxed text-[#aaa295]">{produit.description}</p>

        <dl className="mb-5 mt-4 border-b border-[#38342c]">
          {specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between gap-4 border-t border-[#38342c] py-2.5 text-xs">
              <dt className="shrink-0 text-[#8f887c]">{spec.label}</dt>
              <dd className="truncate text-end font-semibold text-[#d8c99e]">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => onEnquire(produit)}
          className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 border border-[#796744] bg-transparent text-[13px] font-bold text-[#d8c99e] transition-colors hover:bg-[#b69a5b] hover:text-[#171512] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b69a5b]"
          data-testid={`button-enquire-${produit.id}`}
        >
          <Plus size={16} aria-hidden="true" />
          {labels.enquire}
        </button>
      </div>
    </article>
  );
}
