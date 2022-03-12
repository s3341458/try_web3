import { Footer, Navbar, Services, Transactions, Welcome } from './components';

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-tr to-cyan-500 from-blue-500">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
