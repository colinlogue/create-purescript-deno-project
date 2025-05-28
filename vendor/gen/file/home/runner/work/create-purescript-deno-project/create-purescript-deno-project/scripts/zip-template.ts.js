// scripts/zip-template.ts
// Usage: deno run --import-map=import_map.json --allow-read --allow-write scripts/zip-template.ts
// Zips all template directories into template zip files at the templates directory
import { join } from "jsr:@std/path@1.0.9";
// For backward compatibility
export async function zipTemplate() {
  await zipAllTemplates();
}
export async function zipAllTemplates() {
  try {
    for await (const entry of Deno.readDir(join(Deno.cwd(), "templates"))){
      if (entry.isDirectory) {
        await zipSingleTemplate(entry.name);
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error zipping templates: ${e.message}`);
    }
    Deno.exit(1);
  }
}
export async function zipSingleTemplate(templateName) {
  const zipPath = join(Deno.cwd(), "templates", `${templateName}.zip`);
  // Remove old zip if exists
  try {
    await Deno.remove(zipPath);
  } catch (_e) {
  // Ignore if file does not exist
  }
  // Use system zip command to create the zip file
  const templateDir = join("templates", templateName);
  const p = new Deno.Command("zip", {
    args: [
      "-r",
      zipPath,
      "."
    ],
    cwd: join(Deno.cwd(), templateDir)
  });
  const { code, stderr } = await p.output();
  if (code !== 0) {
    console.error(new TextDecoder().decode(stderr));
    Deno.exit(code);
  } else {
    console.log(`Created ${templateName}.zip`);
  }
}
if (import.meta.main) {
  await zipAllTemplates();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay9jcmVhdGUtcHVyZXNjcmlwdC1kZW5vLXByb2plY3QvY3JlYXRlLXB1cmVzY3JpcHQtZGVuby1wcm9qZWN0L3NjcmlwdHMvemlwLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHNjcmlwdHMvemlwLXRlbXBsYXRlLnRzXG4vLyBVc2FnZTogZGVubyBydW4gLS1pbXBvcnQtbWFwPWltcG9ydF9tYXAuanNvbiAtLWFsbG93LXJlYWQgLS1hbGxvdy13cml0ZSBzY3JpcHRzL3ppcC10ZW1wbGF0ZS50c1xuLy8gWmlwcyBhbGwgdGVtcGxhdGUgZGlyZWN0b3JpZXMgaW50byB0ZW1wbGF0ZSB6aXAgZmlsZXMgYXQgdGhlIHRlbXBsYXRlcyBkaXJlY3RvcnlcblxuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJqc3I6QHN0ZC9wYXRoQDEuMC45XCI7XG5cbi8vIEZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gemlwVGVtcGxhdGUoKSB7XG4gIGF3YWl0IHppcEFsbFRlbXBsYXRlcygpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gemlwQWxsVGVtcGxhdGVzKCkge1xuICB0cnkge1xuICAgIGZvciBhd2FpdCAoY29uc3QgZW50cnkgb2YgRGVuby5yZWFkRGlyKGpvaW4oRGVuby5jd2QoKSwgXCJ0ZW1wbGF0ZXNcIikpKSB7XG4gICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgYXdhaXQgemlwU2luZ2xlVGVtcGxhdGUoZW50cnkubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgemlwcGluZyB0ZW1wbGF0ZXM6ICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBEZW5vLmV4aXQoMSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHppcFNpbmdsZVRlbXBsYXRlKHRlbXBsYXRlTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHppcFBhdGggPSBqb2luKERlbm8uY3dkKCksIFwidGVtcGxhdGVzXCIsIGAke3RlbXBsYXRlTmFtZX0uemlwYCk7XG5cbiAgLy8gUmVtb3ZlIG9sZCB6aXAgaWYgZXhpc3RzXG4gIHRyeSB7XG4gICAgYXdhaXQgRGVuby5yZW1vdmUoemlwUGF0aCk7XG4gIH0gY2F0Y2ggKF9lKSB7XG4gICAgLy8gSWdub3JlIGlmIGZpbGUgZG9lcyBub3QgZXhpc3RcbiAgfVxuXG4gIC8vIFVzZSBzeXN0ZW0gemlwIGNvbW1hbmQgdG8gY3JlYXRlIHRoZSB6aXAgZmlsZVxuICBjb25zdCB0ZW1wbGF0ZURpciA9IGpvaW4oXCJ0ZW1wbGF0ZXNcIiwgdGVtcGxhdGVOYW1lKTtcbiAgY29uc3QgcCA9IG5ldyBEZW5vLkNvbW1hbmQoXCJ6aXBcIiwge1xuICAgIGFyZ3M6IFtcIi1yXCIsIHppcFBhdGgsIFwiLlwiXSxcbiAgICBjd2Q6IGpvaW4oRGVuby5jd2QoKSwgdGVtcGxhdGVEaXIpLFxuICB9KTtcbiAgY29uc3QgeyBjb2RlLCBzdGRlcnIgfSA9IGF3YWl0IHAub3V0cHV0KCk7XG4gIGlmIChjb2RlICE9PSAwKSB7XG4gICAgY29uc29sZS5lcnJvcihuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoc3RkZXJyKSk7XG4gICAgRGVuby5leGl0KGNvZGUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkICR7dGVtcGxhdGVOYW1lfS56aXBgKTtcbiAgfVxufVxuXG5pZiAoaW1wb3J0Lm1ldGEubWFpbikge1xuICBhd2FpdCB6aXBBbGxUZW1wbGF0ZXMoKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsa0dBQWtHO0FBQ2xHLG1GQUFtRjtBQUVuRixTQUFTLElBQUksUUFBUSxzQkFBc0I7QUFFM0MsNkJBQTZCO0FBQzdCLE9BQU8sZUFBZTtFQUNwQixNQUFNO0FBQ1I7QUFFQSxPQUFPLGVBQWU7RUFDcEIsSUFBSTtJQUNGLFdBQVcsTUFBTSxTQUFTLEtBQUssT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksY0FBZTtNQUNyRSxJQUFJLE1BQU0sV0FBVyxFQUFFO1FBQ3JCLE1BQU0sa0JBQWtCLE1BQU0sSUFBSTtNQUNwQztJQUNGO0VBQ0YsRUFBRSxPQUFPLEdBQUc7SUFDVixJQUFJLGFBQWEsT0FBTztNQUN0QixRQUFRLEtBQUssQ0FBQyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsT0FBTyxFQUFFO0lBQ3ZEO0lBQ0EsS0FBSyxJQUFJLENBQUM7RUFDWjtBQUNGO0FBRUEsT0FBTyxlQUFlLGtCQUFrQixZQUFvQjtFQUMxRCxNQUFNLFVBQVUsS0FBSyxLQUFLLEdBQUcsSUFBSSxhQUFhLEdBQUcsYUFBYSxJQUFJLENBQUM7RUFFbkUsMkJBQTJCO0VBQzNCLElBQUk7SUFDRixNQUFNLEtBQUssTUFBTSxDQUFDO0VBQ3BCLEVBQUUsT0FBTyxJQUFJO0VBQ1gsZ0NBQWdDO0VBQ2xDO0VBRUEsZ0RBQWdEO0VBQ2hELE1BQU0sY0FBYyxLQUFLLGFBQWE7RUFDdEMsTUFBTSxJQUFJLElBQUksS0FBSyxPQUFPLENBQUMsT0FBTztJQUNoQyxNQUFNO01BQUM7TUFBTTtNQUFTO0tBQUk7SUFDMUIsS0FBSyxLQUFLLEtBQUssR0FBRyxJQUFJO0VBQ3hCO0VBQ0EsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLEVBQUUsTUFBTTtFQUN2QyxJQUFJLFNBQVMsR0FBRztJQUNkLFFBQVEsS0FBSyxDQUFDLElBQUksY0FBYyxNQUFNLENBQUM7SUFDdkMsS0FBSyxJQUFJLENBQUM7RUFDWixPQUFPO0lBQ0wsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsYUFBYSxJQUFJLENBQUM7RUFDM0M7QUFDRjtBQUVBLElBQUksWUFBWSxJQUFJLEVBQUU7RUFDcEIsTUFBTTtBQUNSIn0=
// denoCacheMetadata=9373093281839083327,7288897780911584201