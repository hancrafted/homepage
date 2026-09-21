import { BLOCKING_PREFERENCES_INLINE_SCRIPT } from '@/lib/preferences';

export function PreferencesScript() {
  return <script id="preferences-init" dangerouslySetInnerHTML={{ __html: BLOCKING_PREFERENCES_INLINE_SCRIPT }} />;
}
