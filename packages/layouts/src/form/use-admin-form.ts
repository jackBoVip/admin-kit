import type {
  BaseFormComponentType,
  ExtendedFormApi,
  AdminFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@admin-core/shared/utils';

import { FormApi } from './form-api';
import AdminUseForm from './admin-use-form.vue';

export function useAdminForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: AdminFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: AdminFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(AdminUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'AdminUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        if (options.schema) {
          api.setState({ schema: options.schema });
        }
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
