import "../styles/globals.css"

export const metadata = {
    title: "FairPlay",
    description: "FairPlay kisasysteemi",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;