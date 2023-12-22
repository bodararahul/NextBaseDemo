'use client';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  MutationFunction,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type MutationFn<TData, TVariables> = MutationFunction<TData, TVariables>;

interface ToastMutationOptions<TData, TError, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  loadingMessage?: string | ((variables: TVariables) => string);
  successMessage?: string | ((data: TData, variables: TVariables) => string);
  errorMessage?: string | ((error: TError, variables: TVariables) => string);
}

export function useToastMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
>(
  mutationFn: MutationFn<TData, TVariables>,
  options?: ToastMutationOptions<TData, TError, TVariables>,
): UseMutationResult<TData, TError, TVariables> {
  const toastIdRef = useRef<string | number | null>(null);
  return useMutation<TData, TError, TVariables>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      const loadingMessage = options?.loadingMessage
        ? typeof options.loadingMessage === 'function'
          ? options.loadingMessage(variables)
          : options.loadingMessage
        : 'Loading...';

      toastIdRef.current = toast.loading(loadingMessage);

      if (options?.onMutate) {
        await options.onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      // router.refresh();
      const successMessage = options?.successMessage
        ? typeof options.successMessage === 'function'
          ? options.successMessage(data, variables)
          : options.successMessage
        : 'Success!';
      toast.success(successMessage, {
        id: toastIdRef.current ?? undefined,
      });
      toastIdRef.current = null;
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = options?.errorMessage
        ? typeof options.errorMessage === 'function'
          ? options.errorMessage(error, variables)
          : options.errorMessage
        : 'Error!';
      toast.error(errorMessage, {
        id: toastIdRef.current ?? undefined,
      });
      toastIdRef.current = null;
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
