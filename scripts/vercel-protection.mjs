import { readFile } from "node:fs/promises";

export async function addVercelProtectionCookie(context, baseUrl) {
  const cookieFile = process.env.VERCEL_BYPASS_COOKIE_FILE;
  if (!cookieFile) return;

  const cookieJar = await readFile(cookieFile, "utf8");
  const cookieLine = cookieJar
    .split("\n")
    .find((line) => line.startsWith("#HttpOnly_") && line.includes("\t_vercel_jwt\t"));

  if (!cookieLine) {
    throw new Error(`No _vercel_jwt cookie found in ${cookieFile}`);
  }

  const fields = cookieLine.split("\t");
  const name = fields.at(-2);
  const value = fields.at(-1);

  await context.addCookies([
    {
      httpOnly: true,
      name,
      sameSite: "Lax",
      secure: true,
      url: new URL("/", baseUrl).toString(),
      value,
    },
  ]);
}
