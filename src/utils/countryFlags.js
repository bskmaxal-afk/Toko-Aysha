/**
 * Utility to map country of origin to flag emoji and formatted name
 */
export function getCountryFlag(origin) {
  if (!origin) return '🌐';
  const lower = origin.toLowerCase();
  if (lower.includes('indonesia')) return '🇮🇩';
  if (lower.includes('korea')) return '🇰🇷';
  if (lower.includes('thai')) return '🇹🇭';
  if (lower.includes('china')) return '🇨🇳';
  if (lower.includes('sri lanka')) return '🇱🇰';
  if (lower.includes('japan')) return '🇯🇵';
  if (lower.includes('vietnam')) return '🇻🇳';
  if (lower.includes('philippines')) return '🇵🇭';
  if (lower.includes('malaysia')) return '🇲🇾';
  if (lower.includes('singapore')) return '🇸🇬';
  if (lower.includes('taiwan')) return '🇹🇼';
  if (lower.includes('india')) return '🇮🇳';
  return '🌐';
}
