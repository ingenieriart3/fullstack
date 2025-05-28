import { Route, Routes } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Calendar from '../pages/Calendar';
import Chart from '../pages/Chart';
import ECommerce from '../pages/Dashboard/ECommerce';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Tables from '../pages/Tables';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import DefaultLayout from '../layout/DefaultLayout';
import Devices from '../pages/Device/DeviceList';
import DevicesCreate from '../pages/Device/DeviceCreate';
import DevicesUpdate from '../pages/Device/DeviceUpdate';
import Environments from '../pages/Environment/EnvironmentList';
import EnvironmentCreate from '../pages/Environment/EnvironmentCreate';
import EnvironmentUpdate from '../pages/Environment/EnvironmentUpdate';
import Batchs from '../pages/Batch/BatchList';
import BatchCreate from '../pages/Batch/BatchCreate';
import BatchUpdate from '../pages/Batch/BatchUpdate';
import { useAuthContext } from '../hooks/useAuthContext';
import Farms from '../pages/Farm/FarmList';
import FarmCreate from '../pages/Farm/FarmCreate';
import FarmUpdate from '../pages/Farm/FarmUpdate';
import Specimens from '../pages/Specimen/SpecimenList';
import SpecimenCreate from '../pages/Specimen/SpecimenCreate';
import SpecimenUpdate from '../pages/Specimen/SpecimenUpdate';
import Strains from '../pages/Strain/StrainList';
import StrainCreate from '../pages/Strain/StrainCreate';
import StrainUpdate from '../pages/Strain/StrainUpdate';

function AppRouter() {
  const { username } = useAuthContext();

  if (!username) {
    return (
      <>
        <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin | GrowHardware" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup | GrowHardware" />
                  <SignUp />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      </>
    );
  } else
    return (
      <>
        <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/devices"
              element={
                <>
                  <PageTitle title="Devices | GrowHardware" />
                  <Devices />
                </>
              }
            />
            <Route
              path="/device/create"
              element={
                <>
                  <PageTitle title="Devices Create | GrowHardware" />
                  <DevicesCreate />
                </>
              }
            />
            <Route
              path="/device/update/:id"
              element={
                <>
                  <PageTitle title="Device Update | GrowHardware" />
                  <DevicesUpdate />
                </>
              }
            />
            <Route
              path="/environments"
              element={
                <>
                  <PageTitle title="Environments | GrowHardware" />
                  <Environments />
                </>
              }
            />
            <Route
              path="/environment/create"
              element={
                <>
                  <PageTitle title="Environment Create | GrowHardware" />
                  <EnvironmentCreate />
                </>
              }
            />
            <Route
              path="/environment/update/:id"
              element={
                <>
                  <PageTitle title="Environment Update | GrowHardware" />
                  <EnvironmentUpdate />
                </>
              }
            />
            <Route
              path="/batchs"
              element={
                <>
                  <PageTitle title="Batchs | GrowHardware" />
                  <Batchs />
                </>
              }
            />
            <Route
              path="/batch/create"
              element={
                <>
                  <PageTitle title="Batch Create | GrowHardware" />
                  <BatchCreate />
                </>
              }
            />
            <Route
              path="/batch/update/:id"
              element={
                <>
                  <PageTitle title="Batch Update | GrowHardware" />
                  <BatchUpdate />
                </>
              }
            />
            <Route
              path="/farms"
              element={
                <>
                  <PageTitle title="Farms | GrowHardware" />
                  <Farms />
                </>
              }
            />
            <Route
              path="/farm/create"
              element={
                <>
                  <PageTitle title="Farm Create | GrowHardware" />
                  <FarmCreate />
                </>
              }
            />
            <Route
              path="/farm/update/:id"
              element={
                <>
                  <PageTitle title="Farm Update | GrowHardware" />
                  <FarmUpdate />
                </>
              }
            />
            <Route
              path="/specimens"
              element={
                <>
                  <PageTitle title="Specimens | GrowHardware" />
                  <Specimens />
                </>
              }
            />
            <Route
              path="/specimen/create"
              element={
                <>
                  <PageTitle title="Specimens Create | GrowHardware" />
                  <SpecimenCreate />
                </>
              }
            />
            <Route
              path="/specimen/update/:id"
              element={
                <>
                  <PageTitle title="Specimen Update | GrowHardware" />
                  <SpecimenUpdate />
                </>
              }
            />
            <Route
              path="/strains"
              element={
                <>
                  <PageTitle title="Strains | GrowHardware" />
                  <Strains />
                </>
              }
            />
            <Route
              path="/strain/create"
              element={
                <>
                  <PageTitle title="Strains Create | GrowHardware" />
                  <StrainCreate />
                </>
              }
            />
            <Route
              path="/strain/update/:id"
              element={
                <>
                  <PageTitle title="Strain Update | GrowHardware" />
                  <StrainUpdate />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/plan"
              element={
                <>
                  <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Buttons />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      </>
    );
}

export default AppRouter;
