import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import FooterContent from './components/FooterContent';

function App() {
  return (
    <div className="main-grid">
      { <Header /> }
      {/* <Nav /> */}
      { <MainContent /> }
      { <FooterContent /> }
    </div>
  );
}

export default App;
