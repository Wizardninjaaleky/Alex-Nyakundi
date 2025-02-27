import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Slideshow from './components/Slideshow';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/about" component={AboutMe} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/slideshow" component={Slideshow} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
