

let mapTransform: unknown;

export async function createTransformer() {
    // map-transform is an ESM-only module, so we need to use dynamic import
    mapTransform = mapTransform || await import('map-transform');
    
    console.log(mapTransform);
    return {
        transform: (input: string) => {
            return input.toUpperCase();
        }
    }
}