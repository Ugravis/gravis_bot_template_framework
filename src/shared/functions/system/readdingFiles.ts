import { readdirSync, statSync } from "fs"
import { pathToFileURL } from "url"
import { join } from "path"

export async function loadFoldersFiles(
  folderPath: string,
  folderNameExceptions: string[] = []
): Promise<void> {

  const absoluteFolderPath = join(process.cwd(), folderPath)
  const entries = readdirSync(absoluteFolderPath)

  for (const entry of entries) {
    const fullPath = join(absoluteFolderPath, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory() && !folderNameExceptions.includes(entry)) {
      await loadFoldersFiles(join(folderPath, entry), folderNameExceptions);

    } else if (entry.endsWith('.ts') || entry.endsWith(".js")) {
      try {
        await import(pathToFileURL(fullPath).href)

      } catch (err) {
        console.warn(`⚠️  Failed to import file ${fullPath}`, err)
      }
    }
  }
  return
}