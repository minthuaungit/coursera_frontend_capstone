import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import MainContent from './components/MainContent';
import FooterContent from './components/FooterContent';

function App() {
  return (
    <div>
      { <Header /> }
      { <Nav /> }
      { <MainContent /> }
      { <FooterContent /> }
    </div>
  );
}

export default App;
