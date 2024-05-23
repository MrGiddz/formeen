import { SIGN_IN_LINK } from '@/routes';
import { redirect } from 'next/navigation';

export function redirectToSignIn() {
  redirect(SIGN_IN_LINK);
}