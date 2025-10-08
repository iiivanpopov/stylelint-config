import { isPackageExists } from 'local-pkg'

export function checkStylelintPackages(packages: string[]): void {
  const missingPackages = packages.filter(pkg => !isPackageExists(pkg))

  if (missingPackages.length > 0) {
    console.warn(`Missing packages: ${missingPackages.join(', ')}`)
    console.warn(`Install them with: pnpm install -D ${missingPackages.join(' ')}`)
  }
}
