import { parseArgs } from 'jsr:@std/cli@1.0.17/parse-args';
import * as path from 'jsr:@std/path@1.0.9';

const templateFiles = [
  'src/Main.purs',
  'src/Main.ts.template',
  'test/Test/Main.purs',
  '.gitignore.template',
  'package.json',
  'serve.ts.template',
  'spago.yaml',
  'tsconfig.json',
];

function exitWithError(message: string) {
  console.error(message);
  Deno.exit(1);
}

function validateArgs(args: { [key: string]: unknown; _: (string | number)[]; }): void {

  for (const key in args) {
    switch (key) {
      case 'build':
      case '_':
        break;
      default:
        exitWithError(`Unknown argument: ${key}\nUssage: create-purescript-deno-project [--build] [target-directory]`);
    }
  }

  if (args._.length > 1) {
    exitWithError('Too many arguments\nUsage: create-purescript-deno-project [--build] [target-directory]');
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

function destinationPath(filePath: string): string {

  // To avoid the Deno compilation treating .ts files as modules to include,
  // we save them with a .template suffix and remove it when copying.
  // .gitignore files are also copied as .template files because they would
  // otherwise be ignored when publishing to JSR.
  return filePath.endsWith('.template')
    ? filePath.slice(0, -'.template'.length)
    : filePath;
}

async function downloadTemplateFiles(targetDirectory: string): Promise<void> {

  const url = new URL(import.meta.url);
  const rootPath = url.pathname.split('/').slice(0, -1).join('/');
  url.pathname = rootPath + '/template';

  await Promise.all(templateFiles.map(async (filePath) => {
    const srcURL = new URL(url);
    srcURL.pathname += '/' + filePath;

    const destPath = path.join(targetDirectory, destinationPath(filePath));
    const destDir = path.dirname(destPath);

    await Deno.mkdir(destDir, { recursive: true });

    const resp = await fetch(srcURL);
    if (!resp.ok) {
      exitWithError(`Failed to download ${srcURL}: ${resp.status} ${resp.statusText}`);
    }

    await Deno.writeTextFile(destPath, await resp.text());
  }));
}

async function copyTemplateFiles(targetDirectory: string): Promise<void> {

  const templateDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'template');

  await Promise.all(templateFiles.map(async (filePath) => {

    const srcPath = path.join(templateDir, filePath);
    const destPath = path.join(targetDirectory, destinationPath(filePath));
    const destDir = path.dirname(destPath);

    await Deno.mkdir(destDir, { recursive: true });
    await Deno.copyFile(srcPath, destPath);
  }));
}

const defaultOptions: CreateProjecOptions = {
  build: false,
}

export async function createPurescriptDenoProject(targetDirectory: string, options: Partial<CreateProjecOptions> = {}): Promise<void> {

  const opts = { ...defaultOptions, ...options };

  if (!path.isAbsolute(targetDirectory)) {
    targetDirectory = path.resolve(Deno.cwd(), targetDirectory);
  }

  await validateTargetDirectory(targetDirectory);

  if (import.meta.url.startsWith('file://')) {
    await copyTemplateFiles(targetDirectory);
  }
  else {
    await downloadTemplateFiles(targetDirectory);
  }

  if (opts.build) {
    const installCommand = new Deno.Command('npm', {
      args: ['install'],
      cwd: targetDirectory,
    });
    const buildCommand = new Deno.Command('npm', {
      args: ['run', 'build'],
      cwd: targetDirectory,
    });
    console.log('Building project...');
    await installCommand.output();
    await buildCommand.output();
    console.log('Project built successfully.');
  }
}

if (import.meta.main) {
  const args = parseArgs(Deno.args, { boolean: ['build'], stopEarly: true });
  validateArgs(args);
  const targetDirectory = args._[0] ? `${args._[0]}` : '.';
  createPurescriptDenoProject(targetDirectory, args);
}

type CreateProjecOptions = {
  build: boolean;
}