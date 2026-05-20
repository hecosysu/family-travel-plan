import { Route, Switch } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import TripDetail from './pages/TripDetail';
import Export from './pages/Export';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1ED]">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/timeline" component={Timeline} />
            <Route path="/trip/:id" component={TripDetail} />
            <Route path="/export" component={Export} />
            <Route path="/about" component={About} />
            <Route>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center min-h-[60vh]"
              >
                <div className="text-center">
                  <h1 className="text-4xl font-display text-[#2C2C2C] mb-4">404</h1>
                  <p className="text-[#2C2C2C]/70">页面未找到</p>
                </div>
              </motion.div>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
