import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { updateDevice, getDevice } from '../../services/device-service';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import { useNavigate } from 'react-router-dom';

const DeviceUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [deviceData, setDeviceData] = useState({
    alias: '',
    kind: '',
    port: '',
    status: '',
    plan: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeviceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleResponse = (body, JWR) => {
    if (JWR.statusCode === 200) {
      const { alias, kind, port, status, plan } = body;
      setDeviceData({ 
        alias, 
        kind, 
        port, 
        status: typeof status === 'object' ? JSON.stringify(status, null, 2) : status || '',
        plan: typeof plan === 'object' ? JSON.stringify(plan, null, 2) : plan || '' 
      });
    } else {
      console.log('Error: ', JWR);
    }
  };

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        await getDevice(id, handleResponse);
      } catch (error) {
        console.error('Error fetching device:', error);
      }
    };

    fetchDevice();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // Parseamos los strings JSON de vuelta a objetos antes de enviar
    const attributes = {
      id: id,
      alias: deviceData.alias,
      kind: deviceData.kind,
      port: deviceData.port,
      status: tryParseJson(deviceData.status),
      plan: tryParseJson(deviceData.plan),
    };
    updateDevice(attributes);
    navigate(`/devices/`, { replace: true });
  };

  // Función auxiliar para parsear JSON de forma segura
  const tryParseJson = (jsonString) => {
    try {
      return jsonString ? JSON.parse(jsonString) : null;
    } catch (e) {
      return jsonString; // Si no es JSON válido, devolvemos el string original
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update device" />
      <Link
        to="/devices"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg></DevicesSvg>
        Devices
      </Link>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Properties
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5.5 p-6.5">
                {/* Campos alias, kind y port se mantienen igual */}
                {/* ... */}

                <div>
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Status
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Status (JSON format)"
                    name="status"
                    value={deviceData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Plan
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Plan (JSON format)"
                    name="plan"
                    value={deviceData.plan}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="submit"
                    value="Update"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceUpdate;