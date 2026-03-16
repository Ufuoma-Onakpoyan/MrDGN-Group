const WHATSAPP_GA4_EVENT_NAME = 'conversion_event_contact_2';

/**
 * Track a WhatsApp click and then navigate, following Google's
 * recommended delayed-navigation helper for conversion_event_contact_2.
 *
 * This function is used as an onClick handler on <a> elements.
 */
export function trackWhatsAppClick(event?: unknown) {
  if (typeof window === 'undefined') return;

  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;

  // Try to read the href from the clicked anchor so we can delay navigation
  let href: string | undefined;
  if (event && typeof event === 'object') {
    const anyEvent = event as { preventDefault?: () => void; currentTarget?: unknown };
    const target = anyEvent.currentTarget as HTMLAnchorElement | undefined;
    if (target && typeof target.href === 'string') {
      href = target.href;
      // Prevent the browser from navigating immediately; we'll open WhatsApp in the callback
      anyEvent.preventDefault?.();
    }
  }

  if (href) {
    const callback = () => {
      // Open WhatsApp in a new tab/window, matching the target="_blank" usage in links
      window.open(href as string, '_blank', 'noopener,noreferrer');
    };

    gtag('event', WHATSAPP_GA4_EVENT_NAME, {
      event_callback: callback,
      event_timeout: 2000,
    });
  } else {
    // Fallback: just send the GA4 event without controlling navigation
    gtag('event', WHATSAPP_GA4_EVENT_NAME);
  }
}
