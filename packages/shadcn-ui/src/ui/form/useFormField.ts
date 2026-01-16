import { computed, inject } from 'vue';

import {
  FieldContextKey,
  useFieldError,
  useIsFieldDirty,
  useIsFieldTouched,
  useIsFieldValid,
} from 'vee-validate';

import { FORM_ITEM_INJECTION_KEY } from './injectionKeys';

// Global warning suppression system to handle multiple concurrent calls
let warningSuppressionCount = 0;
const originalWarn = console.warn;

// Suppress vee-validate "field not found" warnings
// This is a known issue where fields are accessed before they're fully registered
const suppressVeeValidateWarnings = () => {
  warningSuppressionCount++;
  if (warningSuppressionCount === 1) {
    // First suppression, override console.warn
    console.warn = (...args: any[]) => {
      const message = args[0]?.toString() || '';
      // Suppress only vee-validate field not found warnings
      if (
        message.includes('[vee-validate]') &&
        message.includes('field with name') &&
        message.includes('was not found')
      ) {
        return; // Suppress this warning
      }
      originalWarn.apply(console, args);
    };
  }
};

// Restore original console.warn when all suppressions are released
const restoreWarnings = () => {
  warningSuppressionCount--;
  if (warningSuppressionCount === 0) {
    console.warn = originalWarn;
  }
};

export function useFormField() {
  const fieldContext = inject(FieldContextKey);
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);

  if (!fieldContext)
    throw new Error('useFormField should be used within <FormField>');

  const { name } = fieldContext;
  const id = fieldItemContext || '';

  // Suppress warnings before calling hooks
  // Fields may not be registered yet during initial render
  suppressVeeValidateWarnings();

  // Hooks must be called at top level (Vue composition API rule)
  // These hooks may trigger warnings if field is not yet registered
  const errorHook = name ? useFieldError(name) : null;
  const dirtyHook = name ? useIsFieldDirty(name) : null;
  const touchedHook = name ? useIsFieldTouched(name) : null;
  const validHook = name ? useIsFieldValid(name) : null;

  // Restore warnings after hooks are called
  restoreWarnings();

  // Wrap hooks in computed to safely access values
  const error = computed(() => {
    if (!name || !errorHook) return undefined;
    // Access hook value - it will return undefined if field doesn't exist
    return errorHook.value;
  });

  const isDirty = computed(() => {
    if (!name || !dirtyHook) return false;
    return dirtyHook.value;
  });

  const isTouched = computed(() => {
    if (!name || !touchedHook) return false;
    return touchedHook.value;
  });

  const valid = computed(() => {
    if (!name || !validHook) return true;
    return validHook.value;
  });

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name,
    error,
    isDirty,
    isTouched,
    valid,
  };
}
