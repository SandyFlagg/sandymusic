import { revalidatePath } from 'next/cache';

/**
 * Flush the cached pages that render database-backed content.
 *
 * The homepage and category archives are statically rendered with ISR, so
 * without this an admin edit would not show up until the revalidate window
 * expired (or, before ISR was added, until the next deploy).
 */
export function revalidateContent(extraPaths: string[] = []) {
    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');
    for (const path of extraPaths) {
        revalidatePath(path);
    }
}
