const PLATFORM_HOSTS = new Set(['nexotalento.com', 'www.nexotalento.com', 'localhost']);

export function getPublicProfileSlug(hostname = window.location.hostname): string | null {
  const host = hostname.toLowerCase().split(':')[0];
  if (PLATFORM_HOSTS.has(host) || host.endsWith('.vercel.app')) return null;

  const suffix = '.nexotalento.com';
  if (!host.endsWith(suffix)) return null;
  const slug = host.slice(0, -suffix.length);
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(slug) ? slug : null;
}

