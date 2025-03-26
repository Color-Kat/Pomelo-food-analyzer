import type { Metadata } from 'next';
import '../styles/globals.css';

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: 'Pomelo - анализ состава продуктов',
    description: 'Приложение для анализа состава продуктов! Сфотографируйте этикетку и получите подробный отчёт о составе и вредности продукта прямо в магазине.',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className={`antialiased`}>{children}</body>
        </html>
    );
}
