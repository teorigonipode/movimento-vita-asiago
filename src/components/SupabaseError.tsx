import { AlertTriangle, Phone, Mail } from 'lucide-react';

export default function SupabaseError() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-800 mb-1">
            Servizio temporaneamente non disponibile
          </h3>
          <p className="text-amber-700 text-sm leading-relaxed mb-3">
            Non siamo riusciti a inviare la tua richiesta online. Ti preghiamo di contattarci direttamente:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+39000000000"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Chiama ora
            </a>
            <a
              href="mailto:info@movimentovitaasiago.it"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Scrivici via email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
