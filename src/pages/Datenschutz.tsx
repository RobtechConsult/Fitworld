import { PageHeader } from '@/components/layout/AppShell'

/**
 * Datenschutzerklärung – Entwurf, passend zum aktuellen local-first-Stand.
 *
 * Stand jetzt: Alle vom Nutzer eingegebenen Daten bleiben ausschließlich lokal
 * im Browser (localStorage) auf dem Gerät. Keine Server-Übertragung, keine
 * Konten, kein Tracking, keine Cookies, keine Analyse-Tools, keine externen
 * Fonts/CDNs. Ausgeliefert wird die App über GitHub Pages.
 *
 * WICHTIG: Vor Einführung eines Backends / Nutzerkonten / einer Vergleichs-
 * oder Sync-Funktion muss diese Erklärung erweitert werden (Auftragsverarbeitung,
 * Server-Speicherung, ggf. Drittlandtransfer, Einwilligungen).
 */
export function Datenschutz() {
  return (
    <div>
      <PageHeader title="Datenschutz" subtitle="Wie ForgeFit mit deinen Daten umgeht" />

      <div className="card px-5 py-5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
        <div className="rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-4 py-3">
          <strong className="text-[var(--color-warn)]">Entwurf –</strong> gültig für
          den aktuellen local-first-Stand. Vor einem Backend / Nutzerkonten
          erweitern. Platzhalter <code>[…]</code> vor Veröffentlichung befüllen.
        </div>

        <Section title="1. Verantwortlicher">
          Verantwortlich im Sinne der DSGVO ist [Name / Firma], [Anschrift],
          [E-Mail-Adresse]. Die vollständigen Kontaktdaten stehen im{' '}
          <strong>Impressum</strong>.
        </Section>

        <Section title="2. Grundprinzip: deine Daten bleiben auf deinem Gerät">
          ForgeFit ist eine „local-first"-App. Alle Inhalte, die du eingibst –
          z. B. Trainingseinheiten, Sätze, Gewichte, Trainingspläne, Körper-Metriken
          (Gewicht, Körperfettanteil, Umfänge) und Einstellungen – werden{' '}
          <strong>ausschließlich lokal in deinem Browser</strong> (localStorage) auf
          deinem Gerät gespeichert. Diese Daten werden <strong>nicht</strong> an uns
          oder Dritte übertragen und sind für uns nicht einsehbar.
        </Section>

        <Section title="3. Keine Cookies, kein Tracking, keine Analyse">
          Die App setzt keine Tracking- oder Marketing-Cookies, nutzt keine
          Analyse-Dienste, kein Profiling und keine Werbenetzwerke. Es werden keine
          externen Schriftarten, Content-Delivery-Networks oder Social-Media-Plugins
          nachgeladen.
        </Section>

        <Section title="4. Hosting / Bereitstellung (GitHub Pages)">
          Die App wird über <strong>GitHub Pages</strong> (GitHub, Inc., USA)
          bereitgestellt. Beim Abruf verarbeitet der Hosting-Anbieter technisch
          notwendige Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, aufgerufene
          Dateien) in Server-Logfiles, um die Auslieferung zu ermöglichen und die
          Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO (berechtigtes Interesse an einer stabilen, sicheren Bereitstellung).
          Da GitHub in den USA sitzt, kann ein Drittlandtransfer erfolgen. [Details /
          ggf. Data Privacy Framework anwaltlich prüfen und ergänzen.]
        </Section>

        <Section title="5. Export / Import (freiwillig, durch dich ausgelöst)">
          Du kannst deine Daten selbst als Datei exportieren und wieder importieren.
          Dieser Vorgang findet lokal auf deinem Gerät statt; wohin du eine
          exportierte Datei speicherst oder weitergibst, entscheidest ausschließlich
          du.
        </Section>

        <Section title="6. Speicherdauer / Löschung">
          Die lokal gespeicherten Daten bleiben so lange erhalten, bis du sie in der
          App löschst oder die Browserdaten/den Speicher dieser Website leerst. Es
          gibt keine serverseitige Kopie, die wir für dich löschen müssten.
        </Section>

        <Section title="7. Deine Rechte">
          Dir stehen nach DSGVO grundsätzlich Rechte auf Auskunft, Berichtigung,
          Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu sowie ein
          Beschwerderecht bei einer Aufsichtsbehörde. Da wir keine personenbezogenen
          Daten von dir auf Servern speichern, beziehen sich diese Rechte im
          Wesentlichen auf die beim Hosting anfallenden Verbindungsdaten; für deine
          lokal gespeicherten Inhalte hast du die volle Kontrolle direkt in der App.
        </Section>

        <Section title="8. Änderungen">
          Sobald neue Funktionen (z. B. Nutzerkonten, Cloud-Synchronisierung oder
          eine Vergleichs-/Social-Funktion) hinzukommen, wird diese Erklärung
          entsprechend erweitert.
        </Section>

        <p className="mt-5 text-xs text-[var(--color-ink-faint)]">
          Dieser Entwurf ist eine erste Fassung und ersetzt keine Rechtsberatung.
          Vor einer Vermarktung anwaltlich prüfen lassen.
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="mb-1 font-semibold text-[var(--color-ink)]">{title}</h2>
      <p>{children}</p>
    </div>
  )
}
