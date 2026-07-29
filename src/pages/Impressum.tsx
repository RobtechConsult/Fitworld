import { PageHeader } from '@/components/layout/AppShell'

/**
 * Impressum-Gerüst (§ 5 DDG).
 *
 * ACHTUNG: Die Pflichtangaben sind Platzhalter in [eckigen Klammern] und
 * müssen vom Betreiber mit den echten Daten befüllt werden, bevor die App
 * öffentlich vermarktet wird. Bewusst KEINE Personendaten vorbelegt.
 */
export function Impressum() {
  return (
    <div>
      <PageHeader title="Impressum" subtitle="Angaben gemäß § 5 DDG" />

      <div className="card px-5 py-5">
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-4 py-3 text-sm text-[var(--color-ink-muted)]">
          <strong className="text-[var(--color-warn)]">Entwurf –</strong> die
          Platzhalter <code>[…]</code> vor Veröffentlichung mit den echten
          Betreiberdaten ersetzen.
        </div>

        <dl className="mt-5 flex flex-col gap-4 text-sm leading-relaxed">
          <div>
            <dt className="font-semibold">Diensteanbieter</dt>
            <dd className="text-[var(--color-ink-muted)]">
              [Vor- und Nachname / Firma]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ und Ort]
              <br />
              [Land]
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Kontakt</dt>
            <dd className="text-[var(--color-ink-muted)]">
              E-Mail: [E-Mail-Adresse]
              <br />
              Telefon: [optional]
            </dd>
          </div>

          <div>
            <dt className="font-semibold">
              Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)
            </dt>
            <dd className="text-[var(--color-ink-muted)]">
              [Vor- und Nachname]
              <br />
              [Anschrift wie oben]
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Umsatzsteuer-ID</dt>
            <dd className="text-[var(--color-ink-muted)]">
              [USt-IdNr. gem. § 27 a UStG – falls vorhanden, sonst Zeile entfernen]
            </dd>
          </div>
        </dl>

        <p className="mt-5 text-xs text-[var(--color-ink-faint)]">
          Hinweis: Ob und in welchem Umfang eine Impressumspflicht besteht, hängt
          vom konkreten Angebot ab. Dieser Entwurf ersetzt keine Rechtsberatung.
        </p>
      </div>
    </div>
  )
}
