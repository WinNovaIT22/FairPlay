export { default } from "next-auth/middleware"

export const config = { 
    matcher: ["/", "/profiili/:path*", "/admin:path*"],
}

