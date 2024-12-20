import './globals.css';
import '@/node_modules/react-modal-video/scss/modal-video.scss';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import GoogleAnalytics from './components/GoogleAnalytics';  // <-- Import GoogleAnalytics

export const metadata = {
  title: 'CoinClick',
  description: 'Generated by create next app',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />  {/* <-- Add GoogleAnalytics here */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
