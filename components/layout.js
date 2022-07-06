import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div className="m-4 fade-in" {...props}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
