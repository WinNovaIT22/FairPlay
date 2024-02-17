import "@/styles/globals.css"
import { Suspense } from "react";
import Loading from "@/app/loading"

export const metadata = {
    title: "FairPlay",
    description: "FairPlay kisasysteemi",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
       <body>
          <main className='app'>
              <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </body>
    </html>
  )
}

export default RootLayout;