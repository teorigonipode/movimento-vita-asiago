import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, LifeBuoy, Phone, ShieldCheck, Sparkles, Users } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import { siteConfig } from '../config/site';
import { getPublishedNews } from '../services/news';
import { testimonials } from '../content/testimonials';

const services = [
  { icon: HeartHandshake, title: 'Ascolto e accoglienza', text: 'Uno spazio dove poter parlare, con rispetto, attenzione e senza giudizio.' },
  { icon: Users, title: 'Sostegno alla maternità', text: 'Un accompagnamento umano per affrontare con maggiore serenità una gravidanza difficile o inattesa.' },
  { icon: LifeBuoy, title: 'Orientamento', text: 'Informazioni e collegamento con le risorse più adatte alle tue necessità.' },
];

const resources = [
  { title: 'Parto in anonimato', text: 'Una possibilità prevista dalla legge per ricevere assistenza sanitaria e tutelare la propria riservatezza.', href: 'https://www.salute.gov.it/new/it/tema/salute-della-donna/parto-anonimato/', label: 'Approfondisci sul sito MPV' },
  { title: 'Culle per la Vita', text: 'Una risorsa esterna per conoscere le strutture disponibili e le modalità di accoglienza previste.', href: 'https://www.culleperlavita.it/dove-sono/', label: 'Cerca una culla' },
  { title: 'SOS Vita', text: 'Il servizio nazionale di ascolto per chi vive una gravidanza difficile o non programmata.', href: 'https://sosvita.it', label: 'Vai a SOS Vita' },
  { title: 'Progetto Gemma', text: 'Un progetto nazionale di sostegno a distanza per accompagnare una mamma in difficoltà.', href: 'https://www.mpv.org/progettualita', label: 'Scopri il progetto' },
];

export default function Home() {
  const latestNews = getPublishedNews().slice(0, 3);

  return (
    <div>
      <SEO title={siteConfig.name} description={siteConfig.description} path="/" />
      <section className="relative overflow-hidden bg-mv-blue">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(139,198,63,0.24),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.08),transparent_26%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-mv-teal-light font-semibold tracking-wide uppercase text-sm mb-5">Centro Aiuto alla Vita</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-7">Non sei sola.</h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl leading-relaxed mb-10">Se stai vivendo una gravidanza difficile o inattesa, puoi trovare ascolto, accoglienza e un aiuto concreto. Siamo qui per te, con discrezione e senza giudizio.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={siteConfig.phone.href} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2 focus:ring-offset-mv-blue" aria-label={`Chiama il ${siteConfig.phone.display}`}><Phone className="w-5 h-5" aria-hidden="true" />Chiamaci</a>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-mv-blue font-semibold rounded-lg hover:bg-mv-cream transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-mv-blue"><ArrowRight className="w-5 h-5" aria-hidden="true" />Scrivici</a>
              <Link to="/come-possiamo-aiutarti" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/35 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-mv-blue">Scopri come aiutarti</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="text-mv-teal font-semibold uppercase tracking-wide text-sm mb-4">Chi siamo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-mv-blue mb-5">Un punto di ascolto vicino a te</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">Siamo il Centro Aiuto alla Vita del Movimento per la Vita per l’Altopiano dei Sette Comuni. Accogliamo donne, mamme e famiglie che stanno attraversando un momento delicato.</p>
            <p className="text-gray-600 leading-relaxed mb-7">Il nostro impegno nasce dall’ascolto e si traduce in presenza, orientamento e sostegno concreto, nel rispetto della storia e delle scelte di ogni persona.</p>
            <Link to="/chi-siamo" className="inline-flex items-center gap-2 text-mv-blue font-semibold hover:text-mv-teal transition-colors">Scopri chi siamo <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
          <div className="rounded-[2rem] bg-mv-cream border border-mv-warm p-8 md:p-10">
            <Sparkles className="w-9 h-9 text-mv-teal mb-5" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-mv-blue mb-3">Ogni vita è preziosa</h2>
            <p className="text-gray-600 leading-relaxed">Crediamo che nessuna donna debba affrontare da sola una scelta difficile. Per questo costruiamo accanto a lei una rete di ascolto, fiducia e possibilità.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-mv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Non sei sola" subtitle="Un primo passo può essere semplicemente parlare con qualcuno." />
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => <div key={service.title} className="bg-white rounded-2xl border border-mv-warm p-7 hover:-translate-y-1 hover:shadow-lg transition-all"><div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mb-5"><service.icon className="w-6 h-6 text-mv-teal" aria-hidden="true" /></div><h3 className="text-xl font-semibold text-mv-blue mb-3">{service.title}</h3><p className="text-gray-600 leading-relaxed">{service.text}</p></div>)}
          </div>
          <div className="text-center mt-9"><Link to="/non-sei-sola" className="inline-flex items-center gap-2 px-6 py-3 bg-mv-blue text-white font-semibold rounded-lg hover:bg-mv-blue-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2">Scopri di più <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><SectionTitle title="Risorse utili" subtitle="Informazioni e servizi nazionali che possono essere preziosi nei momenti più delicati." /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{resources.map((resource) => <article key={resource.title} className="rounded-2xl border border-mv-warm p-6 hover:border-mv-teal/50 hover:shadow-md transition-all"><h3 className="font-semibold text-mv-blue text-lg mb-3">{resource.title}</h3><p className="text-gray-600 text-sm leading-relaxed mb-5">{resource.text}</p><a href={resource.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-mv-teal hover:text-mv-blue transition-colors">{resource.label} <span aria-hidden="true">→</span></a></article>)}</div></div>
      </section>

      {latestNews.length > 0 && <section className="py-20 md:py-24 bg-mv-cream"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><SectionTitle title="Notizie ed eventi" subtitle="Le ultime novità dal Centro Aiuto alla Vita." /><div className="grid md:grid-cols-3 gap-6">{latestNews.map((post) => <article key={post.slug} className="bg-white rounded-2xl border border-mv-warm p-6"><p className="text-sm text-mv-teal font-semibold mb-3">{post.category}</p><h3 className="text-xl font-semibold text-mv-blue mb-3">{post.title}</h3>{post.excerpt && <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>}<Link to={`/notizie/${post.slug}`} className="inline-flex items-center gap-2 text-mv-blue font-semibold hover:text-mv-teal">Leggi la notizia <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link></article>)}</div></div></section>}

      {testimonials.filter((item) => item.published).length > 0 && <section className="py-20 md:py-24 bg-white"><div className="max-w-4xl mx-auto px-4 text-center"><SectionTitle title="Le vostre parole" />{testimonials.filter((item) => item.published).map((item) => <blockquote key={item.alias} className="text-xl text-gray-700 leading-relaxed">“{item.quote}”<cite className="block mt-4 text-sm font-semibold text-mv-teal not-italic">{item.alias}</cite></blockquote>)}</div></section>}

      <section className="py-20 md:py-24 bg-mv-blue"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><ShieldCheck className="w-12 h-12 text-mv-teal-light mx-auto mb-6" aria-hidden="true" /><h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Aiutaci ad aiutare</h2><p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-9">Il tuo sostegno ci permette di essere presenti accanto a chi ha bisogno. Contattaci per conoscere le modalità aggiornate per sostenere il Centro.</p><Link to="/donazioni" className="inline-flex items-center gap-2 px-7 py-3.5 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2 focus:ring-offset-mv-blue">Scopri come sostenerci <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link></div></section>

      <section className="py-20 md:py-24 bg-white"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-mv-cream border border-mv-warm p-8 md:p-12 text-center"><p className="text-mv-teal font-semibold uppercase tracking-wide text-sm mb-3">Parliamone</p><h2 className="text-3xl md:text-4xl font-bold text-mv-blue mb-4">Siamo qui per ascoltarti</h2><p className="text-gray-600 mb-7">{siteConfig.locationName}. Puoi chiamarci o scriverci direttamente.</p><div className="flex flex-col sm:flex-row justify-center gap-3"><a href={siteConfig.phone.href} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-mv-blue text-white font-semibold rounded-lg hover:bg-mv-blue-light transition-colors"><Phone className="w-5 h-5" aria-hidden="true" />{siteConfig.phone.display}</a><a href={`mailto:${siteConfig.email}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-mv-blue font-semibold rounded-lg border border-mv-warm hover:border-mv-teal transition-colors">Scrivici</a></div></div></div></section>
    </div>
  );
}
