import SEO from '../components/SEO';

export default function CookiePolicy() {
  return (
    <div>
      <SEO
        title="Cookie Policy"
        description="Informativa sull'uso dei cookie e sulla raccolta di statistiche anonime su questo sito."
        path="/cookie-policy"
      />
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-lg text-white/80">
            Informativa sull'uso dei cookie e sulla raccolta di statistiche di navigazione.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Cosa sono i cookie</h2>
            <p className="text-gray-600 leading-relaxed">
              I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo
              dispositivo (computer, tablet, smartphone), dove vengono memorizzati per essere poi
              ritrasmessi agli stessi siti alla visita successiva.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Cookie utilizzati da questo sito</h2>
            <p className="text-gray-600 leading-relaxed">
              Questo sito non utilizza cookie di profilazione né cookie di terze parti per fini
              pubblicitari. Non sono presenti moduli di registrazione, aree riservate o carrelli
              acquisti che richiedano cookie di sessione applicativi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Statistiche di navigazione</h2>
            <p className="text-gray-600 leading-relaxed">
              Il sito utilizza Vercel Web Analytics, il servizio di analisi integrato nella piattaforma
              di hosting. Vercel Web Analytics è un sistema <strong>privacy-friendly first-party</strong> che
              raccoglie dati aggregati e anonimi sulle visite (pagine visitate, dispositivo, paese di
              provenienza) senza utilizzare cookie per identificare i visitatori e senza ricondurre i
              dati a singoli individui. Queste informazioni ci aiutano a comprendere l'utilizzo del
              sito e a migliorarlo.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Gestione dei cookie dal browser</h2>
            <p className="text-gray-600 leading-relaxed">
              Puoi gestire le preferenze sui cookie direttamente dal tuo browser. La maggior parte dei
              browser consente di visualizzare, gestire, eliminare e bloccare i cookie per i siti web
              visitati.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Aggiornamenti</h2>
            <p className="text-gray-600 leading-relaxed">
              La presente Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare
              questa pagina regolarmente per essere sempre informato sulle modalità di utilizzo dei cookie.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
