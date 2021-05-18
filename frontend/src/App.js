import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar/Navbar';

import Footer from './components/Footer/Footer';
import Coursepage from './components/Coursepage/Coursepage';



function App() {
  return (
    <>
    <div className='main'>
        <Router>
          <>
            <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
                          <Route path="/Course"  component={Coursepage} />

          </Switch>
        </>
        </Router>
        <Footer />

      </div>

</>
  );
}

export default App;
