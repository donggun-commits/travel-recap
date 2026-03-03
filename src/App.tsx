import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Passport from './pages/Passport';
import WorldMap from './pages/WorldMap';
import Timeline from './pages/Timeline';
import Badges from './pages/Badges';
import Trips from './pages/Trips';
import { TripProvider } from './context/TripContext';

function App() {
  return (
    <TripProvider>
      <Layout>
        <section id="dashboard">
          <Dashboard />
        </section>
        <hr className="my-10 border-gray-200" />
        <section id="passport">
          <Passport />
        </section>
        <hr className="my-10 border-gray-200" />
        <section id="map">
          <WorldMap />
        </section>
        <hr className="my-10 border-gray-200" />
        <section id="timeline">
          <Timeline />
        </section>
        <hr className="my-10 border-gray-200" />
        <section id="badges">
          <Badges />
        </section>
        <hr className="my-10 border-gray-200" />
        <section id="trips">
          <Trips />
        </section>
      </Layout>
    </TripProvider>
  );
}

export default App;
