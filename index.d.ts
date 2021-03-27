interface FormatOptions {
  dir?: string;
  root?: string;
  base?: string;
  name?: string;
  ext?: string;
}
export function normalize(path: string): string;
export function basename(path: string, ext?: string): string;
export function dirname(path: string): string;
export function extname(path: string): string;
export function format(options: FormatOptions);
export function isAbsolute(path: string): boolean;
export function parse(path: string): string;
export function resolve(...pathSegments: string[]): string;
export function relative(base: string, path: string): string;
