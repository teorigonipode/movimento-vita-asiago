export default function PrivacyPolicy() {
  return (
    <div>
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Titolare del trattamento</h2>
            <p className="text-gray-600 leading-relaxed">
              Il Titolare del trattamento è l'associazione Movimento per la Vita Asiago, con sede in Via Roma 1, 36012 Asiago (VI).
              Per qualsiasi informazione relativa al trattamento dei dati personali è possibile contattarci all'indirizzo email info@movimentovitaasiago.it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Dati raccolti</h2>
            <p className="text-gray-600 leading-relaxed">
              Raccogliamo i dati personali che ci fornisci volontariamente attraverso i moduli di contatto, 
              di richiesta di volontariato o via email/telefono. I dati possono includere nome, cognome, 
              indirizzo email, numero di telefono e il contenuto dei messaggi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Finalità del trattamento</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati sono trattati esclusivamente per rispondere alle tue richieste, gestire le comunicazioni, 
              organizzare l'attività di volontariato e fornire i servizi richiesti. Non utilizziamo i dati 
              per finalità di marketing né li cediamo a terzi.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Base giuridica</h2>
            <p className="text-gray-600 leading-relaxed">
              Il trattamento si basa sul tuo consenso espresso al momento dell'invio dei dati tramite i moduli 
              del sito, oppure sull'esecuzione di misure precontrattuali su tua richiesta.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Conservazione</h2>
            <p className="text-gray-600 leading-relaxed">
              I dati sono conservati per il tempo necessario a soddisfare le finalità per cui sono stati raccolti, 
              o fino alla tua eventuale richiesta di cancellazione.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Diritti dell'interessato</h2>
            <p className="text-gray-600 leading-relaxed">
              Hai diritto di accesso, retifica, cancellazione, limitazione del trattamento, opposizione e portabilità 
              dei dati. Per esercitare i tuoi diritti, scrivici a info@movimentovitaasiago.it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mv-blue mb-3">Sicurezza</h2>
            <p className="text-gray-600 leading-relaxed">
              Adottiamo misure tecniche e organizzative adeguate a proteggere i dati personali da accessi non autorizzati, 
              perdita o alterazione.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
