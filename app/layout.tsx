import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
    title: 'Testing Animation',
    description: 'Personal animation tester website',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
