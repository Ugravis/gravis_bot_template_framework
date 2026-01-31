import { readdirSync, statSync } from 'fs'
import { join } from 'path'
import { pathToFileURL } from 'url'

export async function filesDiscovery(
  relativePath: string,
  excludedFolders?: string[]
): Promise<void> {

  const absolutePath = join(process.cwd(), relativePath)

  try {
    const entries = readdirSync(absolutePath)

    for (const entry of entries) {
      const fullPath = join(absolutePath, entry)
      const stats = statSync(fullPath)

      const isFolderExcluded = excludedFolders?.includes(entry) ?? false

      if (stats.isDirectory() && !isFolderExcluded) {
        await filesDiscovery(join(relativePath, entry), excludedFolders)

      } else if (entry.endsWith('.ts') || entry.endsWith('.js')) {
        try {
          await import(pathToFileURL(fullPath).href)
        } catch (e) {
          console.warn(`⚠️  Failed to import ${fullPath}:`, e)
        }
      }
    }
  } catch (e) {
    console.warn(`⚠️  Cannot read directory ${absolutePath}:`, e)
  }
}