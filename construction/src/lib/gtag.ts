/** Replace 'whatsapp_click' with the conversion label from Google Ads (Tools > Conversions) if needed */
const WHATSAPP_CONVERSION_SEND_TO = 'AW-18002233283/whatsapp_click';

export function trackWhatsAppClick() {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', { send_to: WHATSAPP_CONVERSION_SEND_TO });
  }
}
