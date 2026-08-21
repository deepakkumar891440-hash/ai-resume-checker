export const metadata = {
  title: 'AI Resume Checker',
  description: 'AI powered resume analyzer and ATS optimizer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#0f172a', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  );
}
