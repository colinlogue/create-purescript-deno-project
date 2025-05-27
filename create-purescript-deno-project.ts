import { parseArgs } from 'jsr:@std/cli@1.0.17/parse-args';
import * as path from 'jsr:@std/path@1.0.9';



function exitWithError(message: string) {
  console.error(message);
  Deno.exit(1);
}

function validateArgs(args: { [key: string]: unknown; _: (string | number)[]; }): void {

  for (const key in args) {
    switch (key) {
      case 'build':
      case 'template':
      case '_':
        break;
      default:
        exitWithError(`Unknown argument: ${key}\nUssage: create-purescript-deno-project [--build] [--template=server] [target-directory]`);
    }
  }

  if (args._.length > 1) {
    exitWithError('Too many arguments\nUsage: create-purescript-deno-project [--build] [--template=server] [target-directory]');
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


async function downloadAndUnzipTemplate(targetDirectory: string, templateName: string): Promise<void> {
  // Download template.zip from the same location as the script
  const url = new URL(import.meta.url);
  const rootPath = url.pathname.split('/').slice(0, -1).join('/');
  url.pathname = `${rootPath}/templates/${templateName}.zip`;

  const resp = await fetch(url);
  if (!resp.ok) {
    exitWithError(`Failed to download ${templateName}.zip: ${resp.status} ${resp.statusText}`);
  }
  const zipData = new Uint8Array(await resp.arrayBuffer());

  // Unzip template to the target directory
  const tempZipPath = path.join(targetDirectory, `${templateName}.zip`);
  await Deno.mkdir(targetDirectory, { recursive: true });
  await Deno.writeFile(tempZipPath, zipData);
  await unzipFile(tempZipPath, targetDirectory);
  await Deno.remove(tempZipPath);
}

// TODO: Maybe we should manually unzip the file instead of useing a command?
async function unzipFile(zipPath: string, destDir: string): Promise<void> {
  const p = new Deno.Command('unzip', {
    args: ['-o', zipPath, '-d', destDir],
  });
  const { code } = await p.output();
  if (code !== 0) {
    exitWithError(`Failed to unzip template zip file`);
  }
}

async function copyAndUnzipTemplate(targetDirectory: string, templateName: string): Promise<void> {
  // Copy template zip from local directory and unzip
  const templateZipPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'templates', `${templateName}.zip`);
  await Deno.mkdir(targetDirectory, { recursive: true });
  const destZipPath = path.join(targetDirectory, `${templateName}.zip`);
  await Deno.copyFile(templateZipPath, destZipPath);
  await unzipFile(destZipPath, targetDirectory);
  await Deno.remove(destZipPath);
}

const defaultOptions: CreateProjecOptions = {
  build: false,
  template: 'server',
}

export async function createPurescriptDenoProject(targetDirectory: string, options: Partial<CreateProjecOptions> = {}): Promise<void> {

  const opts = { ...defaultOptions, ...options };

  if (!path.isAbsolute(targetDirectory)) {
    targetDirectory = path.resolve(Deno.cwd(), targetDirectory);
  }

  await validateTargetDirectory(targetDirectory);

  if (import.meta.url.startsWith('file://')) {
    await copyAndUnzipTemplate(targetDirectory, opts.template);
  } else {
    await downloadAndUnzipTemplate(targetDirectory, opts.template);
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
  const args = parseArgs(Deno.args, { 
    boolean: ['build'],
    string: ['template'], 
    default: { template: 'server' },
    stopEarly: true 
  });
  validateArgs(args);
  const targetDirectory = args._[0] ? `${args._[0]}` : '.';
  createPurescriptDenoProject(targetDirectory, args);
}

type CreateProjecOptions = {
  build: boolean;
  template: string;
}