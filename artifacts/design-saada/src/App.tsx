import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ProductCard } from '@/components/product-card';
import { CATEGORIES, NOMS_CATEGORIES, detailsComplets, produitsDesignSaada, type Categorie, type Produit } from '@/data/produits';
import {
  ArrowLeft, ArrowUpLeft, MapPin, Menu, MessageCircle, MoveUpRight,
  Ruler, Search, ShoppingBag, X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const image = (file: string) => `/images/${file}`;
const wa = '212656593754';
const copy = {
  ar: {
    home:'الرئيسية',collection:'الأعمال',tailor:'التفصيل حسب الطلب',atelier:'عن الأتيليه',contact:'تواصل',badge:'أتيليه تنجيد وديكور • المحمدية',titleA:'مساحة تشبهك،',titleB:'تُصنع بعناية.',lead:'من أول خيط إلى آخر تفصيلة؛ نصنع أثاثاً مفصلاً على قياس بيتك، بذوقك وبخبرة أتيليه محلي في المحمدية.',
    browse:'اكتشف الأعمال',consult:'تحدث مع الأتيليه',portfolio:'نماذج من أعمالنا',galleryTitle:'أثاث له مكانه في بيتك',galleryLead:'تصفّح أعمال الأتيليه، اختر ما يلهمك، وأرسل استفسارك مباشرة عبر واتساب. جميع الأسعار تُحدد بعد معرفة القياسات والاختيارات.',
    all:'الكل',salon:'الصالونات',wood:'الخشب والتلفاز',curtain:'الستائر',kitchen:'المطابخ',chair:'الكراسي',nightstand:'طاولات الليل',bed:'غرف النوم',find:'ابحث في الأعمال',item:'عملاً',quote:'السعر بعد المعاينة',order:'استفسر عن التفصيل',material:'القماش',timber:'الخشب',price:'السعر',zoom:'تكبير صورة',
    craftLabel:'من المحمدية، بتفاصيل منزلية',craftTitle:'عمل يدوي، يبدأ من فكرتك',craftText:'في أتيليه Désign Saâda، تتشكل القطعة حول المساحة التي ستعيش فيها. نناقش التصميم والقماش والقياسات معك قبل بدء التفصيل، ونبقي التواصل مباشراً في كل خطوة.',
    fact1:'المحمدية',fact1b:'مقر الأتيليه',fact2:'على قياسك',fact2b:'تفصيل حسب الطلب',fact3:'تواصل مباشر',fact3b:'عبر واتساب',bespokeTag:'خطوة أولى نحو قطعة خاصة',bespokeTitle:'لنبدأ بالقياسات والفكرة',bespokeText:'أخبرنا عن القطعة ومساحتها والمدينة. هذه المعلومات تساعد الأتيليه على فهم طلبك وتحديد ما يلزم للمتابعة. السعر النهائي عرض خاص بعد مناقشة التفاصيل.',
    type:'نوع العمل',width:'العرض بالسنتيمتر',length:'الطول بالسنتيمتر',city:'المدينة',choose:'اختر نوع العمل',notes:'ملاحظات أو تفاصيل إضافية',quoteOnly:'التسعير يتم بعد مراجعة الطلب',askQuote:'اطلب تقديراً عبر واتساب',
    processTag:'من الفكرة إلى التفصيل',processTitle:'خطوات واضحة، وتواصل مباشر',step1:'شارك فكرتك',step1d:'أرسل وصفاً وصوراً مرجعية أو اختر قطعة من المعرض.',step2:'نناقش التفاصيل',step2d:'نتعرف على القياسات والقماش والتشطيب المناسب.',step3:'عرض حسب الطلب',step3d:'تستلم تفاصيل العرض بعد مراجعة احتياجك.',step4:'تأكيد الطلب',step4d:'يبدأ العمل بعد الاتفاق على التفاصيل عبر التواصل المباشر.',
    connectTitle:'لديك فكرة لمنزلك؟',connectText:'شاركنا ما تبحث عنه، وسنساعدك على بدء المحادثة.',whatsapp:'ابدأ محادثة واتساب',empty:'لا توجد أعمال مطابقة. جرّب تصنيفاً آخر.',cart:'قائمة استفساراتك',emptyCart:'لم تضف أعمالاً بعد. اختر قطعة تود الاستفسار عنها.',cartHint:'هذه القائمة لإرسال استفسار عن الأعمال المختارة، وليست طلب شراء أو دفع.',sendList:'إرسال القائمة عبر واتساب',remove:'إزالة',aboutImage:'مريول العمل الخاص بأتيليه Désign Saâda',language:'اللغة'
  },
  fr: {
    home:'Accueil',collection:'Réalisations',tailor:'Sur mesure',atelier:'L’atelier',contact:'Contact',badge:'Atelier de tapisserie • Mohammedia',titleA:'Un intérieur à vous,',titleB:'fait avec soin.',lead:'Du premier fil au dernier détail, nous réalisons des pièces sur mesure, adaptées à votre maison et à vos envies.',
    browse:'Voir les réalisations',consult:'Parler à l’atelier',portfolio:'Le travail de l’atelier',galleryTitle:'Des pièces pensées pour chez vous',galleryLead:'Parcourez nos réalisations et envoyez votre demande sur WhatsApp. Les tarifs sont établis après échange sur les dimensions et les choix.',
    all:'Tout',salon:'Salons',wood:'Bois & TV',curtain:'Rideaux',kitchen:'Cuisines',chair:'Fauteuils',nightstand:'Tables de chevet',bed:'Chambres',find:'Rechercher',item:'pièces',quote:'Prix sur devis',order:'Demander un devis',material:'Tissu',timber:'Bois',price:'Prix',zoom:'Agrandir',
    craftLabel:'Mohammedia, détails faits maison',craftTitle:'Un travail qui commence par votre idée',craftText:'À l’atelier Désign Saâda, chaque pièce prend forme autour de votre espace. Nous échangeons sur le dessin, les tissus et les mesures avant la fabrication.',
    fact1:'Mohammedia',fact1b:'Atelier local',fact2:'Sur mesure',fact2b:'Selon votre projet',fact3:'Contact direct',fact3b:'Par WhatsApp',bespokeTag:'Votre projet commence ici',bespokeTitle:'Parlons de vos dimensions',bespokeText:'Indiquez la pièce, ses dimensions approximatives et votre ville. Le prix est communiqué sur devis après discussion.',
    type:'Type de projet',width:'Largeur en cm',length:'Longueur en cm',city:'Ville',choose:'Choisir un type',notes:'Notes ou détails',quoteOnly:'Tarif communiqué après étude',askQuote:'Demander une estimation sur WhatsApp',
    processTag:'De votre idée à la réalisation',processTitle:'Un échange direct, à chaque étape',step1:'Partagez votre idée',step1d:'Envoyez une description, des références ou choisissez une pièce.',step2:'Échangeons',step2d:'Nous discutons dimensions, tissu et finitions.',step3:'Devis personnalisé',step3d:'Recevez une proposition adaptée à votre demande.',step4:'Confirmation',step4d:'La fabrication commence après accord sur les détails.',
    connectTitle:'Un projet pour votre intérieur ?',connectText:'Expliquez-nous ce que vous imaginez.',whatsapp:'Écrire sur WhatsApp',empty:'Aucun résultat. Essayez une autre catégorie.',cart:'Vos demandes',emptyCart:'Aucune pièce sélectionnée pour le moment.',cartHint:'Cette liste sert à envoyer une demande, pas à acheter ou payer.',sendList:'Envoyer la liste sur WhatsApp',remove:'Retirer',aboutImage:'Tablier de travail de Désign Saâda',language:'Langue'
  },
  en: {
    home:'Home',collection:'Projects',tailor:'Made to measure',atelier:'The atelier',contact:'Contact',badge:'Upholstery & interiors • Mohammedia',titleA:'A room that feels yours,',titleB:'made with care.',lead:'From the first stitch to the final detail, we make furniture to fit your home, your taste and your space.',
    browse:'Explore the work',consult:'Talk to the atelier',portfolio:'Selected atelier work',galleryTitle:'Furniture made for your home',galleryLead:'Browse the atelier projects and send an enquiry on WhatsApp. Pricing is discussed after dimensions and choices are reviewed.',
    all:'All projects',salon:'Living rooms',wood:'Wood & TV',curtain:'Curtains',kitchen:'Kitchens',chair:'Chairs',nightstand:'Nightstands',bed:'Bedrooms',find:'Search projects',item:'projects',quote:'Price on request',order:'Enquire about sizing',material:'Fabric',timber:'Wood',price:'Price',zoom:'Zoom',
    craftLabel:'From Mohammedia, made for home',craftTitle:'Made by hand, starting with your idea',craftText:'At Désign Saâda, each piece is considered in the context of the home it will live in. We discuss design, fabric and dimensions before making begins.',
    fact1:'Mohammedia',fact1b:'Our atelier',fact2:'Made to measure',fact2b:'For your space',fact3:'Direct contact',fact3b:'On WhatsApp',bespokeTag:'A first step toward something personal',bespokeTitle:'Let’s start with your idea',bespokeText:'Tell us about the piece, approximate dimensions and your city. The final price is provided as a quote after discussing the details.',
    type:'Project type',width:'Width in cm',length:'Length in cm',city:'City',choose:'Choose a project type',notes:'Notes or details',quoteOnly:'Pricing follows a project review',askQuote:'Request an estimate on WhatsApp',
    processTag:'From idea to finish',processTitle:'Clear steps, direct conversation',step1:'Share your idea',step1d:'Send a description, references or a project you like.',step2:'Discuss details',step2d:'We talk through dimensions, fabric and finish.',step3:'A considered quote',step3d:'Receive a proposal based on your request.',step4:'Confirm together',step4d:'Work begins after the details are agreed.',
    connectTitle:'Have an idea for your home?',connectText:'Tell us what you have in mind and let’s begin.',whatsapp:'Start a WhatsApp chat',empty:'No matching projects. Try another category.',cart:'Your enquiry list',emptyCart:'No projects selected yet.',cartHint:'This list sends an enquiry about selected work. No checkout or payment.',sendList:'Send enquiry on WhatsApp',remove:'Remove',aboutImage:'Désign Saâda atelier work apron',language:'Language'
  }
};
type Language = keyof typeof copy;
function openWhatsApp(message: string) { window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); }

function Home() {
  const [language, setLanguage] = useState<Language>('ar');
  const [filter, setFilter] = useState<'all' | Categorie>('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [zoomed, setZoomed] = useState<Produit | null>(null);
  const [customType, setCustomType] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const t = copy[language];
  const rtl = language === 'ar';
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return produitsDesignSaada.filter((produit) => {
      const matchesFilter = filter === 'all' || produit.categorie === filter;
      return matchesFilter && (!query || `${produit.nom} ${produit.description} ${NOMS_CATEGORIES[produit.categorie]} ${copy[language][produit.categorie]}`.toLocaleLowerCase().includes(query));
    });
  }, [filter, search, language]);
  const cartProducts = cart.map((id) => produitsDesignSaada.find((produit) => produit.id === id)).filter((produit): produit is Produit => Boolean(produit));
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [language, rtl]);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setZoomed(null); setCartOpen(false); setMobileOpen(false); } };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  const sendCustomQuote = () => openWhatsApp(`السلام عليكم، أود الاستفسار عن تفصيل حسب الطلب.\nنوع العمل: ${customType || 'غير محدد'}\nالقياسات التقريبية: ${width || 'غير محدد'} × ${length || 'غير محدد'} سم\nالمدينة: ${city || 'غير محددة'}\nملاحظات: ${notes || 'لا توجد'}\nالمرجو تزويدي بعرض سعر بعد مناقشة التفاصيل.`);
  const sendCart = () => {
    if (!cartProducts.length) return;
    const list = cartProducts.map((product, index) => `${index + 1}. ${product.nom} — ${detailsComplets(product).prix}`).join('\n');
    openWhatsApp(`السلام عليكم، أود الاستفسار عن تفصيل الأعمال التالية:\n${list}\n\nالمرجو التواصل لمناقشة القياسات والتفاصيل. الأسعار حسب عرض خاص ولا يوجد دفع عبر الموقع.`);
  };
  const navLinks = [{ href: '#home', label: t.home }, { href: '#gallery', label: t.collection }, { href: '#custom', label: t.tailor }, { href: '#about', label: t.atelier }];
  return (
    <div className="site-shell" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="topline">
        <div className="place"><MapPin size={13} aria-hidden="true" /><span>المحمدية، المغرب</span><span>•</span><span>{language === 'ar' ? 'تفصيل حسب الطلب' : language === 'fr' ? 'Création sur mesure' : 'Made to measure'}</span></div>
        <div className="quick"><label htmlFor="language-select">{t.language}</label><select id="language-select" value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label={t.language} data-testid="select-language"><option value="ar">العربية</option><option value="fr">Français</option><option value="en">English</option></select><a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label="WhatsApp 06 56 59 37 54" data-testid="link-top-whatsapp">06 56 59 37 54</a></div>
      </div>
      <header className="header">
        <div className="nav-wrap">
          <a className="brand" href="#home" aria-label="Désign Saâda, الصفحة الرئيسية" data-testid="link-brand"><span className="brand-mark"><img src={image('IMG-20261007-WA0033_1791450693805.jpg')} alt="شعار أتيليه ديزاين سعادة" /></span><span><span className="brand-name">DÉSIGN SAÂDA</span><span className="brand-sub">Chez Tapissier Moderne</span></span></a>
          <nav className="main-nav" aria-label={t.home}>{navLinks.map((link) => <a key={link.href} href={link.href} data-testid={`link-nav-${link.href.slice(1)}`}>{link.label}</a>)}</nav>
          <div className="nav-actions"><button className="icon-btn" type="button" onClick={() => setCartOpen(true)} aria-label={t.cart} data-testid="button-open-enquiry-list"><ShoppingBag size={18} /><span className="cart-badge">{cart.length}</span></button><button className="icon-btn menu-trigger" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={mobileOpen} data-testid="button-mobile-menu">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
        </div>
        {mobileOpen && <nav className="mobile-panel" aria-label="التنقل" data-testid="nav-mobile">{navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>)}<a href="#contact" onClick={() => setMobileOpen(false)}>{t.contact}</a></nav>}
      </header>
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-image"><img src={image('IMG-20261007-WA0026_1791450825438.jpg')} alt="صالون زاوية منجز بألوان طبيعية وتفاصيل خشبية في منزل واسع" /></div><div className="hero-inner"><div className="hero-copy"><div className="eyebrow">{t.badge}</div><h1 id="hero-title">{t.titleA}<span>{t.titleB}</span></h1><p className="hero-lede">{t.lead}</p><div className="hero-ctas"><a className="btn btn-gold" href="#gallery" data-testid="link-explore">{t.browse}<ArrowLeft size={17} /></a><button className="btn btn-outline" type="button" onClick={() => openWhatsApp('السلام عليكم، أود أخذ استشارة حول أثاث وتنجيد منزلي.')} data-testid="button-hero-whatsapp"><MessageCircle size={17} />{t.consult}</button></div><div className="hero-foot"><span className="line" /><span>{t.portfolio}</span><span className="hero-number">01 — {String(produitsDesignSaada.length).padStart(2, '0')}</span></div></div></div></section>
        <section className="section catalog" id="gallery" aria-labelledby="gallery-title"><div className="section-inner">
          <div className="section-heading"><div><div className="section-kicker">{t.portfolio}</div><h2 id="gallery-title">{t.galleryTitle}</h2></div><p>{t.galleryLead}</p></div>
          <div className="filter-row" role="group" aria-label="تصفية الأعمال">{(['all', ...CATEGORIES] as const).map((key) => <button key={key} type="button" className={`filter-btn${filter === key ? ' active' : ''}`} onClick={() => setFilter(key)} aria-pressed={filter === key} data-testid={`filter-${key}`}>{key === 'all' ? t.all : t[key]}</button>)}<div className="catalog-tools"><label className="search-box"><Search size={15} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.find} aria-label={t.find} data-testid="input-search-projects" /></label><span className="result-count" aria-live="polite" data-testid="text-project-count">{visibleProducts.length} {t.item}</span></div></div>
          {visibleProducts.length ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6" data-testid="grid-products">
              {visibleProducts.map((produit, index) => (
                <ProductCard
                  key={produit.id}
                  produit={produit}
                  index={index}
                  labels={{ category: t[produit.categorie], fabric: t.material, wood: t.timber, price: t.price, enquire: t.order, zoom: t.zoom }}
                  onZoom={setZoomed}
                  onEnquire={(selected) => { setCart((previous) => [...previous, selected.id]); setCartOpen(true); }}
                />
              ))}
            </div>
          ) : <div className="no-results" data-testid="status-no-results">{t.empty}</div>}
        </div></section>
        <section className="section story" id="about" aria-labelledby="about-title"><div className="section-inner story">
          <div className="story-visual"><div className="story-photo"><img src={image('IMG-20261007-WA0046_1791450880053.jpg')} alt="جلسة منجزة بأقمشة متنوعة وقطع جلوس من تصميم الأتيليه" loading="lazy" /></div><div className="story-inset"><img src={image('IMG-20261007-WA0019_1791450693844.jpg')} alt={t.aboutImage} loading="lazy" /></div><div className="story-caption">{language === 'ar' ? 'حرفة محلية • المحمدية' : language === 'fr' ? 'Atelier local • Mohammedia' : 'Local craft • Mohammedia'}</div></div>
          <div className="story-copy"><div className="section-kicker">{t.craftLabel}</div><h2 id="about-title">{t.craftTitle}</h2><p>{t.craftText}</p><div className="story-facts"><div className="fact"><strong>{t.fact1}</strong><span>{t.fact1b}</span></div><div className="fact"><strong>{t.fact2}</strong><span>{t.fact2b}</span></div><div className="fact"><strong>{t.fact3}</strong><span>{t.fact3b}</span></div></div></div>
        </div></section>
        <section className="section bespoke" id="custom" aria-labelledby="custom-title"><div className="section-inner bespoke-grid">
          <div className="bespoke-copy"><div className="section-kicker">{t.bespokeTag}</div><h2 id="custom-title">{t.bespokeTitle}</h2><p>{t.bespokeText}</p><div className="bespoke-note"><Ruler size={19} /><span>{t.quoteOnly}</span></div></div>
          <form className="estimate" onSubmit={(event) => { event.preventDefault(); sendCustomQuote(); }}><h3>{t.tailor}</h3><div className="form-grid">
            <div className="form-field full"><label htmlFor="project-type">{t.type}</label><select id="project-type" value={customType} onChange={(event) => setCustomType(event.target.value)} data-testid="select-project-type"><option value="">{t.choose}</option>{CATEGORIES.map((key) => t[key]).map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
            <div className="form-field"><label htmlFor="project-width">{t.width}</label><input id="project-width" inputMode="decimal" type="number" min="1" value={width} onChange={(event) => setWidth(event.target.value)} placeholder="—" data-testid="input-width" /></div>
            <div className="form-field"><label htmlFor="project-length">{t.length}</label><input id="project-length" inputMode="decimal" type="number" min="1" value={length} onChange={(event) => setLength(event.target.value)} placeholder="—" data-testid="input-length" /></div>
            <div className="form-field full"><label htmlFor="project-city">{t.city}</label><input id="project-city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Mohammedia" data-testid="input-city" /></div>
            <div className="form-field full"><label htmlFor="project-notes">{t.notes}</label><textarea id="project-notes" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} data-testid="input-project-notes" /></div>
          </div><div className="estimate-bottom"><div className="quote-copy">{t.quoteOnly}<small>{language === 'ar' ? 'لا توجد أسعار ثابتة أو دفع عبر الموقع' : language === 'fr' ? 'Aucun prix fixe ni paiement en ligne' : 'No fixed prices or online payment'}</small></div><button className="btn btn-gold" type="submit" data-testid="button-request-estimate">{t.askQuote}<MoveUpRight size={16} /></button></div></form>
        </div></section>
        <section className="section process" aria-labelledby="process-title"><div className="section-inner"><div className="section-kicker">{t.processTag}</div><h2 id="process-title" style={{ margin:'12px 0 0',fontSize:'clamp(30px,4vw,46px)' }}>{t.processTitle}</h2><div className="steps">{[t.step1,t.step2,t.step3,t.step4].map((name,index) => { const descriptions=[t.step1d,t.step2d,t.step3d,t.step4d]; return <div className="step" key={name}><span className="step-index">0{index+1}</span><h3>{name}</h3><p>{descriptions[index]}</p></div>; })}</div></div></section>
        <section className="section contact" id="contact"><div className="section-inner contact-card"><div><h2>{t.connectTitle}</h2><p>{t.connectText}<br /><span dir="ltr">+212 656 593 754 · Mohammedia</span></p></div><button className="btn btn-gold" type="button" onClick={() => openWhatsApp('السلام عليكم، لدي فكرة لتفصيل أثاث منزلي وأود الاستفسار.')} data-testid="button-contact-whatsapp"><MessageCircle size={18} />{t.whatsapp}<ArrowUpLeft size={16} /></button></div></section>
      </main>
      <footer className="footer"><div className="footer-inner"><div><a className="brand" href="#home"><span className="brand-mark"><img src={image('IMG-20261007-WA0033_1791450693805.jpg')} alt="" /></span><span><span className="brand-name">DÉSIGN SAÂDA</span><span className="brand-sub">Chez Tapissier Moderne</span></span></a><p>{language === 'ar' ? 'أتيليه محلي للتنجيد والأثاث المفصل في المحمدية.' : language === 'fr' ? 'Atelier de tapisserie et de mobilier sur mesure à Mohammedia.' : 'A local upholstery and made-to-measure furniture atelier in Mohammedia.'}</p></div><div className="footer-links">{navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DÉSIGN SAÂDA</span><span>{language === 'ar' ? 'المحمدية، المغرب' : language === 'fr' ? 'Mohammedia, Maroc' : 'Mohammedia, Morocco'}</span></div></footer>
      {cartOpen && <><button className="drawer-scrim" type="button" aria-label="إغلاق قائمة الاستفسارات" onClick={() => setCartOpen(false)} /><aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" data-testid="drawer-enquiry-list">
        <div className="drawer-head"><h2 id="cart-title">{t.cart} <span>({cart.length})</span></h2><button className="close-btn" type="button" onClick={() => setCartOpen(false)} aria-label="إغلاق"><X size={20} /></button></div>
        <div className="cart-body">{cartProducts.length === 0 ? <div className="empty-cart"><div><ShoppingBag size={29} /><p>{t.emptyCart}</p></div></div> : cartProducts.map((product,index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={image(product.image)} alt={product.alt} /><div><h3>{product.nom}</h3><p>{detailsComplets(product).prix}</p></div><button className="remove-btn" type="button" onClick={() => setCart((previous) => previous.filter((_,i) => i !== index))} aria-label={`${t.remove}: ${product.nom}`} data-testid={`button-remove-${index}`}><X size={17} /></button></div>)}</div>
        <div className="drawer-footer"><p>{t.cartHint}</p><button className="btn btn-gold" type="button" onClick={sendCart} disabled={!cartProducts.length} data-testid="button-send-list"><MessageCircle size={18} />{t.sendList}</button></div>
      </aside></>}
      {zoomed && <div className="lightbox-scrim" role="presentation" onClick={() => setZoomed(null)} data-testid="modal-image-zoom"><div className="lightbox" role="dialog" aria-modal="true" aria-label={zoomed.nom} onClick={(event) => event.stopPropagation()}><button className="close-btn" type="button" onClick={() => setZoomed(null)} aria-label="إغلاق تكبير الصورة"><X size={20} /></button><img src={image(zoomed.image)} alt={zoomed.alt} /></div></div>}
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
