import { parseArgs } from 'jsr:@std/cli/parse-args';
import * as path from 'jsr:@std/path';

const scriptDir = path.dirname(path.fromFileUrl(import.meta.url));
const templateDir = path.join(scriptDir, 'template');
const templateFiles = [
  'src/Main.purs',
  'src/Main.ts.template',
  'test/Test/Main.purs',
  '.gitignore',
  'package.json',
  'serve.ts.template',
  'spago.yaml',
  'tsconfig.json',
]

function exitWithError(message: string) {
  console.error(message);
  Deno.exit(1);
}

function validateArgs(args: { [key: string]: unknown; _: (string | number)[]; }): void {
  if (args._.length > 1) {
    exitWithError('Too many arguments. Usage: create-purescript-deno-project [target-directory]');
  }
}

async function validateTargetDirectory(targetDirectory: string): Promise<void> {

  try {
    const stat = await Deno.stat(targetDirectory);
    if (stat.isDirectory) {
      for await (const _ of Deno.readDir(targetDirectory)) {
        exitWithError(`Target directory "${targetDirectory}" exists and is not empty.`);
      }
    }
    else {
      exitWithError(`Target "${targetDirectory}" exists and is not a directory.`);
    }
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      // Okay if the directory does not exist.
    } else {
      throw e;
    }
  }

}

async function copyTemplateFiles(targetDirectory: string): Promise<void> {
  await Promise.all(templateFiles.map(async (filePath) => {

    // To avoid the Deno compilation treating .ts files as modules to include,
    // we save them with a .template suffix and remove it after copying.
    const destFilePath = filePath.endsWith('.template')
      ? filePath.slice(0, -'.template'.length)
      : filePath;

    const srcPath = path.join(templateDir, filePath);
    const destPath = path.join(targetDirectory, destFilePath);
    const destDir = path.dirname(destPath);

    await Deno.mkdir(destDir, { recursive: true });
    await Deno.copyFile(srcPath, destPath);
  }));
}

export async function createPurescriptDenoProject(targetDirectory: string): Promise<void> {

  if (!path.isAbsolute(targetDirectory)) {
    targetDirectory = path.resolve(Deno.cwd(), targetDirectory);
  }

  await validateTargetDirectory(targetDirectory);

  await copyTemplateFiles(targetDirectory);
}

if (import.meta.main) {
  const args = parseArgs<Record<string, unknown>>(Deno.args, { stopEarly: true });
  validateArgs(args);
  const targetDirectory = args._[0] ? `${args._[0]}` : '.';
  createPurescriptDenoProject(targetDirectory);
}