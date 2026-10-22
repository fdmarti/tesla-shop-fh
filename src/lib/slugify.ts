export const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quita acentos (á -> a)
        .replace(/[^a-z0-9\s-]/g, '')    // Quita caracteres especiales
        .replace(/\s+/g, '_')            // Espacios -> guiones
        .replace(/-+/g, '_');  