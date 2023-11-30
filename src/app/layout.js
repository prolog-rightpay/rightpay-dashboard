export const metadata = {
  title: 'RightPay Dashboard',
  description: 'RightPay Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
