// Sky Soft's contact details, used by the header, contact section and footer.
// Requests and questions come in by WhatsApp or phone.
export const COMPANY = {
  phone: '010 6218 5244', // shown on the page
  phoneHref: 'tel:+201062185244',
  whatsapp: '201062185244', // international format, digits only (for wa.me links)
  email: '', // TODO: add the company email; email links stay hidden while this is empty
};

// Opens a WhatsApp chat with Sky Soft, optionally with the first message already typed
export const whatsappUrl = (text) =>
  `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
