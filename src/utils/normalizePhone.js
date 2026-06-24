import{BadRequestError} from './errors.js';

export function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    throw new BadRequestError('Phone must be a non-empty string');
  }

  let digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    digits = '91' + digits;
  }

  if (!digits.startsWith('91')) {
    throw new BadRequestError('Invalid Indian phone number');
  }

  return `+${digits}`;
}