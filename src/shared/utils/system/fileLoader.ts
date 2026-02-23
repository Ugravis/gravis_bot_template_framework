import { readdirSync, statSync } from 'fs'
import { join } from 'path'

export async function loadFoldersFiles<T>(
  path: string,
  exceptions: string[] = []
): Promise<(new (...args: any[]) => T)[]> {

  const absolutePath = join(process.cwd(), path)
  const entries = readdirSync(absolutePath)

  let classes: (new (...args: any[]) => T)[] = []

  for (const entry of entries) {
    const fullPath = join(absolutePath, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory() && !exceptions.includes(entry)) {
      const subClasses = await loadFoldersFiles<T>(join(path, entry), exceptions)
      classes = [...classes, ...subClasses]
    
    } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
      const module = await import(fullPath)
      const ExportedClass = module.default

      if (ExportedClass && typeof ExportedClass === 'function') {
        classes.push(ExportedClass)
      }
    }
  }
  return classes
}