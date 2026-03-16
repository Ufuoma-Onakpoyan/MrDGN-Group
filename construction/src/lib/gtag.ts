const WHATSAPP_GA4_EVENT_NAME = 'conversion_event_contact_2';

/**
 * Track a WhatsApp click as a GA4 event.
 *
 * We don't interfere with navigation at all; the <a href="https://wa.me/...">
 * continues to open WhatsApp in a new tab/window, and we simply fire the
 * conversion_event_contact_2 event on click.
 */
export function trackWhatsAppClick() {
  if (typeof window === 'undefined') return;

  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', WHATSAPP_GA4_EVENT_NAME);
}
