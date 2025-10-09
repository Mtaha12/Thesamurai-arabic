// app/layout.tsx - Root Layout (passes through to locale-specific layout)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}