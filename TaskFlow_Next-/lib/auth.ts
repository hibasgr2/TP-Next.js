import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const session = (await cookies()).get('session')?.value;

  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}