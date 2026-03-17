const WHATSAPP_GA4_EVENT_NAME = 'conversion_event_contact_2';
const PROMO_ID = 'blocks_10k_30_free';
const PROMO_NAME = '10K Blocks \u2013 Get 30 Free';

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

export function trackPromoView(creativeSlot: string, creativeName: string) {
  if (typeof window === 'undefined') return;

  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', 'view_promotion', {
    promotion_id: PROMO_ID,
    promotion_name: PROMO_NAME,
    creative_name: creativeName,
    creative_slot: creativeSlot,
  });
}

export function trackPromoSelect(creativeSlot: string, creativeName: string) {
  if (typeof window === 'undefined') return;

  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', 'select_promotion', {
    promotion_id: PROMO_ID,
    promotion_name: PROMO_NAME,
    creative_name: creativeName,
    creative_slot: creativeSlot,
  });
}
