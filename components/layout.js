import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, ...props }) {
  return (
    <div>
      <Header />
      <div className="mx-3" {...props}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
