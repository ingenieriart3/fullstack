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
        status: status || '', 
        plan: plan || '' 
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
    const attributes = {
      id: id,
      alias: deviceData.alias,
      kind: deviceData.kind,
      port: deviceData.port,
      status: deviceData.status,
      plan: deviceData.plan,
    };
    updateDevice(attributes);
    navigate(`/devices/`, { replace: true });
  };

  return (
    <>
      <Breadcrumb pageName="Update device" />
      {/* start back to devices */}
      <Link
        to="/devices"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg></DevicesSvg>
        Devices
      </Link>
      {/* end back to devices */}
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Properties
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Alias
                  </label>
                  <input
                    type="text"
                    placeholder="Alias"
                    name="alias"
                    value={deviceData.alias}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Kind
                  </label>
                  <select
                    placeholder="Kind"
                    {...register('kind', { required: true })}
                    name="kind"
                    value={deviceData.kind}
                    onChange={handleChange}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      isOptionSelected ? 'text-black dark:text-white' : ''
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      Select Kind
                    </option>
                    <option
                      value="light-medulla"
                      className="text-body dark:text-bodydark"
                    >
                      light-medulla
                    </option>
                    <option
                      value="multi-medulla"
                      className="text-body dark:text-bodydark"
                    >
                      multi-medulla
                    </option>
                    <option
                      value="water-medulla"
                      className="text-body dark:text-bodydark"
                    >
                      water-medulla
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Port
                  </label>
                  <input
                    type="text"
                    placeholder="Port"
                    name="port"
                    value={deviceData.port}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div>
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Status
                  </label>
                  <input
                    type="text"
                    placeholder="Status"
                    name="status"
                    value={deviceData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Plan
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Active textarea"
                    name="plan"
                    value={deviceData.plan}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                  ></textarea>
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