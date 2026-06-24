import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';

const faqs = [
  {
    question: 'Chi può chiedere aiuto al Movimento per la Vita?',
    answer: 'Chiunque si trovi in difficoltà può rivolgersi a noi. Non ci sono requisiti particolari né selezioni: accogliamo chiunque abbia bisogno di ascolto, supporto materiale o orientamento ai servizi del territorio.',
  },
  {
    question: 'I servizi sono gratuiti?',
    answer: 'Sì, tutti i nostri servizi sono completamente gratuiti. Siamo un\'associazione di volontariato senza scopo di lucro e il nostro impegno è totalmente gratuito.',
  },
  {
    question: 'La mia richiesta rimarrà riservata?',
    answer: 'Assolutamente sì. La riservatezza è uno dei nostri pilastri fondamentali. Tutto ciò che condividi con noi rimane strettamente confidenziale. Non condividiamo mai informazioni con terzi senza il tuo esplicito consenso.',
  },
  {
    question: 'Devo essere credente per chiedere aiuto?',
    answer: 'No. Accogliamo chiunque, indipendentemente dalle convinzioni religiose, politiche o personali. Il nostro impegno è umano e universale.',
  },
  {
    question: 'Posso chiedere aiuto per conto di un\'altra persona?',
    answer: 'Sì, puoi contattarci anche per segnalare una situazione di difficoltà che riguarda un familiare, un amico o un conoscente. Valuteremo insieme come intervenire nel rispetto della persona.',
  },
  {
    question: 'Come posso diventare volontario?',
    answer: 'Compila il modulo nella pagina "Diventa volontario" o scrivici. Ti contatteremo per un colloquio conoscitivo in cui ti spiegheremo le attività e valuteremo insieme il tuo percorso.',
  },
  {
    question: 'Quanto tempo devo dedicare come volontario?',
    answer: 'Non c\'è un impegno minimo obbligatorio. Anche poche ore alla settimana sono preziose. Organizziamo i turni in base alla disponibilità di ciascuno.',
  },
  {
    question: 'Come vengono usate le donazioni?',
    answer: 'Le donazioni vengono utilizzate per acquistare beni materiali (alimentari, prodotti per l\'infanzia, vestiti), organizzare eventi di sensibilizzazione e coprire le spese operative della sede. Rendicontiamo periodicamente le nostre attività.',
  },
  {
    question: 'Posso donare beni materiali invece di denaro?',
    answer: 'Certamente. Accettiamo alimentari, vestiti in buono stato, prodotti per l\'infanzia e altri beni di prima necessità. Contattaci per concordare la consegna.',
  },
  {
    question: 'Dove si trova la sede?',
    answer: 'La nostra sede è in Via Roma 1, 36012 Asiago (VI). Gli incontri sono su appuntamento per garantire la massima riservatezza.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <SEO
        title="Domande frequenti"
        description="Trova le risposte alle domande più comuni sui nostri servizi, il volontariato e le donazioni."
      />
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Domande frequenti</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trova le risposte alle domande più comuni sui nostri servizi, il volontariato e le donazioni.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Hai una domanda?"
            subtitle="Ecco le risposte alle domande che ci vengono poste più spesso."
          />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-mv-warm bg-mv-cream overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-mv-blue">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-mv-teal shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-mv-blue text-center">
            <HelpCircle className="w-10 h-10 text-mv-teal mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Non hai trovato la risposta che cercavi?</h3>
            <p className="text-gray-300 mb-6">
              Scrivici o chiamaci: saremo felici di rispondere a tutte le tue domande.
            </p>
            <a
              href="mailto:info@movimentovitaasiago.it"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors"
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
