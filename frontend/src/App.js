import Login from './Components/Login';
import Nav from './Components/Nav';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import SugarForm from './Components/ServicesForm/SugarForm';
import InsulinForm from './Components/ServicesForm/InsulinForm';
import MealForm from './Components/ServicesForm/MealForm';
import ActivityForm from './Components/ServicesForm/ActivityForm';
import PressureForm from './Components/ServicesForm/PressureForm';
import WeightForm from './Components/ServicesForm/WeightForm';
import HorizontalServiceButtons from './Components/Statistics/HorizontalServiceButtons';
import Statistics from './Components/Statistics/Statistics';
import Settings from './Components/Settings/Settings';

function App() {
  return (
    <div className='main'>
      {/* <Dashboard /> */}
      {/* <Statistics /> */}
      {/* <HorizontalServiceButtons /> */}
      <Settings />
    </div>
  );
}

export default App;
