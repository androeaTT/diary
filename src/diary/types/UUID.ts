declare const __brand: unique symbol;

type Brand<T, TBrand> = T & { readonly [__brand]: TBrand };

export type UUID = Brand<string, 'UUID'>;


export function isUUID(value: string): value is UUID {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}