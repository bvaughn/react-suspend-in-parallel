type AnyFunction = (...args: any[]) => any;

// Helper function to read from multiple Suspense caches in parallel.
// This method will re-throw any thrown value, but only after also calling subsequent caches.
export default function suspendInParallel<T extends AnyFunction[]>(
  ...callbacks: [...T]
): { [K in keyof T]: ReturnType<Extract<T[K], AnyFunction>> } {
  const values: any[] = [];
  let thrownValue = null;

  callbacks.forEach((callback) => {
    try {
      values.push(callback());
    } catch (error) {
      thrownValue = error;
    }
  });

  if (thrownValue !== null) {
    throw thrownValue;
  }

  return values as { [K in keyof T]: ReturnType<Extract<T[K], AnyFunction>> };
}
