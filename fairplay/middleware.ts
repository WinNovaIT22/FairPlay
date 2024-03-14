import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware() {},
    {
        callbacks: {
            authorized: ({ req, token }) => {
                // Check if the user has a token and if the pathname includes '/admin'
                if (Boolean(token) && req.nextUrl.pathname.includes('/admin')) {
                    // Return true only if the user's role is 'ylläpitäjä' (administrator)
                    return token.role === 'ylläpitäjä';
                }
                // For all other routes, return true if there's a token
                return Boolean(token);
            }
        }
    }
)

export const config = { 
    matcher: ["/", "/profiili/:path*", "/admin/:path*"],
}

