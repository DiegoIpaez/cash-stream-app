export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/cash/:path*", "/history/:path*"],
};
