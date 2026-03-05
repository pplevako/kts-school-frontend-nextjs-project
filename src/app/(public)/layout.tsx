'use client';

import Header from '@components/Header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO:
    // <div className={styles.page}>
    // <main className={styles.main}></main>
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
