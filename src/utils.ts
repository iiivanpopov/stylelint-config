export function mergeObjects(source: Record<string, any>, target: Record<string, any>): object {
  for (const [key, value] of Object.entries(target)) {
    if (Array.isArray(value)) source[key] = [...(source[key] || []), ...value]
    else if (value !== null && typeof value === 'object')
      source[key] = mergeObjects(source[key] || {}, value)
    else source[key] = value
  }
  return source
}
