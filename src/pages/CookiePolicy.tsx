import SEO from '../components/SEO';

export default function CookiePolicy() {
  return (
    <div>
      <SEO
        title="Cookie Policy"
        description="Informativa sull'uso dei cookie su questo sito web."
      />
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Informativa sull'uso dei cookie su questo sito web.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Cosa sono i cookie</h2>
            <p className="text-gray-600 leading-relaxed">
              I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo dispositivo 
              (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti 
              alla visita successiva.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Cookie utilizzati</h2>
            <p className="text-gray-600 leading-relaxed">
              Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento del sito 
              e per migliorare l'esperienza di navigazione. Non utilizziamo cookie di profilazione né cookie 
              di terze parti per fini pubblicitari.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Cookie tecnici</h2>
            <p className="text-gray-600 leading-relaxed">
              I cookie tecnici sono essenziali per il funzionamento del sito e non richiedono il consenso dell'utente. 
              Servono a gestire la navigazione, mantenere la sessione attiva e garantire la sicurezza.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Gestione dei cookie</h2>
            <p className="text-gray-600 leading-relaxed">
              Puoi gestire le preferenze sui cookie direttamente dal tuo browser. La maggior parte dei browser 
              consente di visualizzare, gestire, eliminare e bloccare i cookie per i siti web visitati. 
              Tieni presente che la disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Aggiornamenti</h2>
            <p className="text-gray-600 leading-relaxed">
              La presente Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare questa pagina 
              regolarmente per essere sempre informato sulle modalità di utilizzo dei cookie.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
