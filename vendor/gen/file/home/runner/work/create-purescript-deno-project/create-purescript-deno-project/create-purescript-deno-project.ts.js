import { parseArgs } from 'jsr:@std/cli@1.0.17/parse-args';
import * as path from 'jsr:@std/path@1.0.9';
function exitWithError(message) {
  console.error(message);
  Deno.exit(1);
}
function validateArgs(args) {
  for(const key in args){
    switch(key){
      case 'build':
      case 'template':
      case '_':
        break;
      default:
        exitWithError(`Unknown argument: ${key}\nUsage: create-purescript-deno-project [--build] [--template=server|cli] <target-directory>`);
    }
  }
  if (args._.length === 0) {
    exitWithError('Target directory is required\nUsage: create-purescript-deno-project [--build] [--template=server|cli] <target-directory>');
  }
  if (args._.length > 1) {
    exitWithError('Too many arguments\nUsage: create-purescript-deno-project [--build] [--template=server|cli] <target-directory>');
  }
}
async function validateTargetDirectory(targetDirectory) {
  try {
    const stat = await Deno.stat(targetDirectory);
    if (stat.isDirectory) {
      for await (const _ of Deno.readDir(targetDirectory)){
        exitWithError(`Target directory "${targetDirectory}" exists and is not empty.`);
      }
    } else {
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
async function downloadAndUnzipTemplate(targetDirectory, templateName) {
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
  await Deno.mkdir(targetDirectory, {
    recursive: true
  });
  await Deno.writeFile(tempZipPath, zipData);
  await unzipFile(tempZipPath, targetDirectory);
  await Deno.remove(tempZipPath);
}
// TODO: Maybe we should manually unzip the file instead of useing a command?
async function unzipFile(zipPath, destDir) {
  const p = new Deno.Command('unzip', {
    args: [
      '-o',
      zipPath,
      '-d',
      destDir
    ]
  });
  const { code } = await p.output();
  if (code !== 0) {
    exitWithError(`Failed to unzip template zip file`);
  }
}
async function copyAndUnzipTemplate(targetDirectory, templateName) {
  // Copy template zip from local directory and unzip
  const templateZipPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'templates', `${templateName}.zip`);
  await Deno.mkdir(targetDirectory, {
    recursive: true
  });
  const destZipPath = path.join(targetDirectory, `${templateName}.zip`);
  await Deno.copyFile(templateZipPath, destZipPath);
  await unzipFile(destZipPath, targetDirectory);
  await Deno.remove(destZipPath);
}
const defaultOptions = {
  build: false,
  template: 'server'
};
export async function createPurescriptDenoProject(targetDirectory, options = {}) {
  const opts = {
    ...defaultOptions,
    ...options
  };
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
      args: [
        'install'
      ],
      cwd: targetDirectory
    });
    const buildCommand = new Deno.Command('npm', {
      args: [
        'run',
        'build'
      ],
      cwd: targetDirectory
    });
    console.log('Building project...');
    await installCommand.output();
    await buildCommand.output();
    console.log('Project built successfully.');
  }
}
if (import.meta.main) {
  const args = parseArgs(Deno.args, {
    boolean: [
      'build'
    ],
    string: [
      'template'
    ],
    default: {
      template: 'server'
    }
  });
  validateArgs(args);
  const targetDirectory = `${args._[0]}`;
  createPurescriptDenoProject(targetDirectory, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L2NyZWF0ZS1wdXJlc2NyaXB0LWRlbm8tcHJvamVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZUFyZ3MgfSBmcm9tICdqc3I6QHN0ZC9jbGlAMS4wLjE3L3BhcnNlLWFyZ3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdqc3I6QHN0ZC9wYXRoQDEuMC45JztcblxuXG5cbmZ1bmN0aW9uIGV4aXRXaXRoRXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIERlbm8uZXhpdCgxKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcmdzKGFyZ3M6IHsgW2tleTogc3RyaW5nXTogdW5rbm93bjsgXzogKHN0cmluZyB8IG51bWJlcilbXTsgfSk6IHZvaWQge1xuXG4gIGZvciAoY29uc3Qga2V5IGluIGFyZ3MpIHtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAnYnVpbGQnOlxuICAgICAgY2FzZSAndGVtcGxhdGUnOlxuICAgICAgY2FzZSAnXyc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZXhpdFdpdGhFcnJvcihgVW5rbm93biBhcmd1bWVudDogJHtrZXl9XFxuVXNhZ2U6IGNyZWF0ZS1wdXJlc2NyaXB0LWRlbm8tcHJvamVjdCBbLS1idWlsZF0gWy0tdGVtcGxhdGU9c2VydmVyfGNsaV0gPHRhcmdldC1kaXJlY3Rvcnk+YCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFyZ3MuXy5sZW5ndGggPT09IDApIHtcbiAgICBleGl0V2l0aEVycm9yKCdUYXJnZXQgZGlyZWN0b3J5IGlzIHJlcXVpcmVkXFxuVXNhZ2U6IGNyZWF0ZS1wdXJlc2NyaXB0LWRlbm8tcHJvamVjdCBbLS1idWlsZF0gWy0tdGVtcGxhdGU9c2VydmVyfGNsaV0gPHRhcmdldC1kaXJlY3Rvcnk+Jyk7XG4gIH1cblxuICBpZiAoYXJncy5fLmxlbmd0aCA+IDEpIHtcbiAgICBleGl0V2l0aEVycm9yKCdUb28gbWFueSBhcmd1bWVudHNcXG5Vc2FnZTogY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0IFstLWJ1aWxkXSBbLS10ZW1wbGF0ZT1zZXJ2ZXJ8Y2xpXSA8dGFyZ2V0LWRpcmVjdG9yeT4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZVRhcmdldERpcmVjdG9yeSh0YXJnZXREaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXG4gIHRyeSB7XG4gICAgY29uc3Qgc3RhdCA9IGF3YWl0IERlbm8uc3RhdCh0YXJnZXREaXJlY3RvcnkpO1xuICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KSB7XG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IF8gb2YgRGVuby5yZWFkRGlyKHRhcmdldERpcmVjdG9yeSkpIHtcbiAgICAgICAgZXhpdFdpdGhFcnJvcihgVGFyZ2V0IGRpcmVjdG9yeSBcIiR7dGFyZ2V0RGlyZWN0b3J5fVwiIGV4aXN0cyBhbmQgaXMgbm90IGVtcHR5LmApO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGV4aXRXaXRoRXJyb3IoYFRhcmdldCBcIiR7dGFyZ2V0RGlyZWN0b3J5fVwiIGV4aXN0cyBhbmQgaXMgbm90IGEgZGlyZWN0b3J5LmApO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRGVuby5lcnJvcnMuTm90Rm91bmQpIHtcbiAgICAgIC8vIE9rYXkgaWYgdGhlIGRpcmVjdG9yeSBkb2VzIG5vdCBleGlzdC5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQW5kVW56aXBUZW1wbGF0ZSh0YXJnZXREaXJlY3Rvcnk6IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gRG93bmxvYWQgdGVtcGxhdGUuemlwIGZyb20gdGhlIHNhbWUgbG9jYXRpb24gYXMgdGhlIHNjcmlwdFxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGltcG9ydC5tZXRhLnVybCk7XG4gIGNvbnN0IHJvb3RQYXRoID0gdXJsLnBhdGhuYW1lLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmpvaW4oJy8nKTtcbiAgdXJsLnBhdGhuYW1lID0gYCR7cm9vdFBhdGh9L3RlbXBsYXRlcy8ke3RlbXBsYXRlTmFtZX0uemlwYDtcblxuICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgaWYgKCFyZXNwLm9rKSB7XG4gICAgZXhpdFdpdGhFcnJvcihgRmFpbGVkIHRvIGRvd25sb2FkICR7dGVtcGxhdGVOYW1lfS56aXA6ICR7cmVzcC5zdGF0dXN9ICR7cmVzcC5zdGF0dXNUZXh0fWApO1xuICB9XG4gIGNvbnN0IHppcERhdGEgPSBuZXcgVWludDhBcnJheShhd2FpdCByZXNwLmFycmF5QnVmZmVyKCkpO1xuXG4gIC8vIFVuemlwIHRlbXBsYXRlIHRvIHRoZSB0YXJnZXQgZGlyZWN0b3J5XG4gIGNvbnN0IHRlbXBaaXBQYXRoID0gcGF0aC5qb2luKHRhcmdldERpcmVjdG9yeSwgYCR7dGVtcGxhdGVOYW1lfS56aXBgKTtcbiAgYXdhaXQgRGVuby5ta2Rpcih0YXJnZXREaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBEZW5vLndyaXRlRmlsZSh0ZW1wWmlwUGF0aCwgemlwRGF0YSk7XG4gIGF3YWl0IHVuemlwRmlsZSh0ZW1wWmlwUGF0aCwgdGFyZ2V0RGlyZWN0b3J5KTtcbiAgYXdhaXQgRGVuby5yZW1vdmUodGVtcFppcFBhdGgpO1xufVxuXG4vLyBUT0RPOiBNYXliZSB3ZSBzaG91bGQgbWFudWFsbHkgdW56aXAgdGhlIGZpbGUgaW5zdGVhZCBvZiB1c2VpbmcgYSBjb21tYW5kP1xuYXN5bmMgZnVuY3Rpb24gdW56aXBGaWxlKHppcFBhdGg6IHN0cmluZywgZGVzdERpcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHAgPSBuZXcgRGVuby5Db21tYW5kKCd1bnppcCcsIHtcbiAgICBhcmdzOiBbJy1vJywgemlwUGF0aCwgJy1kJywgZGVzdERpcl0sXG4gIH0pO1xuICBjb25zdCB7IGNvZGUgfSA9IGF3YWl0IHAub3V0cHV0KCk7XG4gIGlmIChjb2RlICE9PSAwKSB7XG4gICAgZXhpdFdpdGhFcnJvcihgRmFpbGVkIHRvIHVuemlwIHRlbXBsYXRlIHppcCBmaWxlYCk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY29weUFuZFVuemlwVGVtcGxhdGUodGFyZ2V0RGlyZWN0b3J5OiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIENvcHkgdGVtcGxhdGUgemlwIGZyb20gbG9jYWwgZGlyZWN0b3J5IGFuZCB1bnppcFxuICBjb25zdCB0ZW1wbGF0ZVppcFBhdGggPSBwYXRoLmpvaW4ocGF0aC5kaXJuYW1lKG5ldyBVUkwoaW1wb3J0Lm1ldGEudXJsKS5wYXRobmFtZSksICd0ZW1wbGF0ZXMnLCBgJHt0ZW1wbGF0ZU5hbWV9LnppcGApO1xuICBhd2FpdCBEZW5vLm1rZGlyKHRhcmdldERpcmVjdG9yeSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIGNvbnN0IGRlc3RaaXBQYXRoID0gcGF0aC5qb2luKHRhcmdldERpcmVjdG9yeSwgYCR7dGVtcGxhdGVOYW1lfS56aXBgKTtcbiAgYXdhaXQgRGVuby5jb3B5RmlsZSh0ZW1wbGF0ZVppcFBhdGgsIGRlc3RaaXBQYXRoKTtcbiAgYXdhaXQgdW56aXBGaWxlKGRlc3RaaXBQYXRoLCB0YXJnZXREaXJlY3RvcnkpO1xuICBhd2FpdCBEZW5vLnJlbW92ZShkZXN0WmlwUGF0aCk7XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBDcmVhdGVQcm9qZWNPcHRpb25zID0ge1xuICBidWlsZDogZmFsc2UsXG4gIHRlbXBsYXRlOiAnc2VydmVyJyxcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVB1cmVzY3JpcHREZW5vUHJvamVjdCh0YXJnZXREaXJlY3Rvcnk6IHN0cmluZywgb3B0aW9uczogUGFydGlhbDxDcmVhdGVQcm9qZWNPcHRpb25zPiA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgY29uc3Qgb3B0cyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcblxuICBpZiAoIXBhdGguaXNBYnNvbHV0ZSh0YXJnZXREaXJlY3RvcnkpKSB7XG4gICAgdGFyZ2V0RGlyZWN0b3J5ID0gcGF0aC5yZXNvbHZlKERlbm8uY3dkKCksIHRhcmdldERpcmVjdG9yeSk7XG4gIH1cblxuICBhd2FpdCB2YWxpZGF0ZVRhcmdldERpcmVjdG9yeSh0YXJnZXREaXJlY3RvcnkpO1xuXG4gIGlmIChpbXBvcnQubWV0YS51cmwuc3RhcnRzV2l0aCgnZmlsZTovLycpKSB7XG4gICAgYXdhaXQgY29weUFuZFVuemlwVGVtcGxhdGUodGFyZ2V0RGlyZWN0b3J5LCBvcHRzLnRlbXBsYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBkb3dubG9hZEFuZFVuemlwVGVtcGxhdGUodGFyZ2V0RGlyZWN0b3J5LCBvcHRzLnRlbXBsYXRlKTtcbiAgfVxuXG4gIGlmIChvcHRzLmJ1aWxkKSB7XG4gICAgY29uc3QgaW5zdGFsbENvbW1hbmQgPSBuZXcgRGVuby5Db21tYW5kKCducG0nLCB7XG4gICAgICBhcmdzOiBbJ2luc3RhbGwnXSxcbiAgICAgIGN3ZDogdGFyZ2V0RGlyZWN0b3J5LFxuICAgIH0pO1xuICAgIGNvbnN0IGJ1aWxkQ29tbWFuZCA9IG5ldyBEZW5vLkNvbW1hbmQoJ25wbScsIHtcbiAgICAgIGFyZ3M6IFsncnVuJywgJ2J1aWxkJ10sXG4gICAgICBjd2Q6IHRhcmdldERpcmVjdG9yeSxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZygnQnVpbGRpbmcgcHJvamVjdC4uLicpO1xuICAgIGF3YWl0IGluc3RhbGxDb21tYW5kLm91dHB1dCgpO1xuICAgIGF3YWl0IGJ1aWxkQ29tbWFuZC5vdXRwdXQoKTtcbiAgICBjb25zb2xlLmxvZygnUHJvamVjdCBidWlsdCBzdWNjZXNzZnVsbHkuJyk7XG4gIH1cbn1cblxuaWYgKGltcG9ydC5tZXRhLm1haW4pIHtcbiAgY29uc3QgYXJncyA9IHBhcnNlQXJncyhEZW5vLmFyZ3MsIHtcbiAgICBib29sZWFuOiBbJ2J1aWxkJ10sXG4gICAgc3RyaW5nOiBbJ3RlbXBsYXRlJ10sXG4gICAgZGVmYXVsdDogeyB0ZW1wbGF0ZTogJ3NlcnZlcicgfSxcbiAgfSk7XG4gIHZhbGlkYXRlQXJncyhhcmdzKTtcbiAgY29uc3QgdGFyZ2V0RGlyZWN0b3J5ID0gYCR7YXJncy5fWzBdfWA7XG4gIGNyZWF0ZVB1cmVzY3JpcHREZW5vUHJvamVjdCh0YXJnZXREaXJlY3RvcnksIGFyZ3MpO1xufVxuXG50eXBlIENyZWF0ZVByb2plY09wdGlvbnMgPSB7XG4gIGJ1aWxkOiBib29sZWFuO1xuICB0ZW1wbGF0ZTogc3RyaW5nO1xufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFNBQVMsUUFBUSxpQ0FBaUM7QUFDM0QsWUFBWSxVQUFVLHNCQUFzQjtBQUk1QyxTQUFTLGNBQWMsT0FBZTtFQUNwQyxRQUFRLEtBQUssQ0FBQztFQUNkLEtBQUssSUFBSSxDQUFDO0FBQ1o7QUFFQSxTQUFTLGFBQWEsSUFBeUQ7RUFFN0UsSUFBSyxNQUFNLE9BQU8sS0FBTTtJQUN0QixPQUFRO01BQ04sS0FBSztNQUNMLEtBQUs7TUFDTCxLQUFLO1FBQ0g7TUFDRjtRQUNFLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLDRGQUE0RixDQUFDO0lBQ3hJO0VBQ0Y7RUFFQSxJQUFJLEtBQUssQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHO0lBQ3ZCLGNBQWM7RUFDaEI7RUFFQSxJQUFJLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ3JCLGNBQWM7RUFDaEI7QUFDRjtBQUVB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
// denoCacheMetadata=7361097885221787548,1209262243746520609