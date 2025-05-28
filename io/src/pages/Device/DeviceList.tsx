import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CardDeviceStats from '../../components/Device/CardDeviceStats';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { useNavigate } from 'react-router-dom';
import { auth, useAuthContext } from '../../hooks/useAuthContext';

const Devices = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const navigate = useNavigate();
  const handleRefresh = () => {
    // Navigate to the same route with a new state to trigger a re-render
    navigate('/devices', { state: { refresh: true } });
  };

  useEffect(() => {
    // user's devices
    io.socket.get('/device/get-user-devices', (data: any) => {
      setDevices(data);
      if (data == 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });
    io.socket.on('device', function onDevice(deviceData: any) {
      setDevices((prevDevices) => [...prevDevices, deviceData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('device');
      // io.socket.off('device', 'newDevice', 'updatedDevice');
    };
  }, []);
  return (
    <>
      <Breadcrumb pageName="Devices" />
      {/* start go to create device */}
      <Link
        to="/device/create"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg></DevicesSvg>
        Create
      </Link>

      {/* end create device */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {devices.map((row: any, idx: number) => {
          return (
            <CardDeviceStats
              title={row.kind}
              total={row.alias}
              id={row.id}
              levelUp
              levelDown
              handleRefresh={handleRefresh}
            >
              <svg
                className="fill-primary dark:fill-white"
                width="20"
                height="22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.01 512.01"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g transform="translate(-1)">
                    {' '}
                    <g>
                      {' '}
                      <g>
                        {' '}
                        <path d="M508.517,257.027l-106.445-57.318v-20.506c0-4.71-3.814-8.533-8.533-8.533h-25.6v-8.533 c0-6.562-0.683-12.962-1.783-19.217l56.346-24.141c3.14-1.34,5.171-4.429,5.171-7.842V17.07h51.2 c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533h-59.733c-4.719,0-8.533,3.823-8.533,8.533v96.777l-48.751,20.898 c-7.859-22.852-22.886-42.377-42.496-55.757c8.713-6.187,14.447-16.307,14.447-27.784c0-18.825-15.309-34.133-34.133-34.133 c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533c9.412,0,17.067,7.654,17.067,17.067 c0,9.412-7.654,17.067-17.067,17.067c-0.017,0-0.026,0.009-0.043,0.009c-13.133-5.487-27.529-8.542-42.624-8.542 s-29.491,3.055-42.624,8.542c-0.017,0-0.026-0.009-0.043-0.009c-9.412,0-17.067-7.654-17.067-17.067 c0-9.412,7.654-17.067,17.067-17.067c4.719,0,8.533-3.823,8.533-8.533s-3.814-8.533-8.533-8.533 c-18.825,0-34.133,15.309-34.133,34.133c0,11.477,5.734,21.598,14.447,27.784c-19.61,13.38-34.637,32.905-42.496,55.757 l-48.751-20.898V8.537c0-4.71-3.814-8.533-8.533-8.533H35.138c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533h51.2 v93.867c0,3.413,2.031,6.502,5.171,7.842l56.346,24.141c-1.101,6.255-1.784,12.655-1.784,19.217v8.533h-25.6 c-4.719,0-8.533,3.823-8.533,8.533v20.506L5.494,257.027c-4.147,2.227-5.709,7.407-3.473,11.554 c1.545,2.867,4.489,4.489,7.526,4.489c1.365,0,2.748-0.324,4.036-1.024l108.766-58.564l134.673,75.418l135.202-75.11 l108.203,58.257c1.289,0.7,2.671,1.024,4.036,1.024c3.038,0,5.982-1.621,7.526-4.489 C514.225,264.434,512.664,259.255,508.517,257.027z M350.872,170.67H163.138v-8.533c0-51.755,42.112-93.867,93.867-93.867 c51.755,0,93.867,42.112,93.867,93.867V170.67z"></path>{' '}
                        <path d="M450.208,343.32l-48.136-40.115v-75.366l-136.533,75.853v173.747c76.015-4.454,136.533-67.524,136.533-144.632v-7.381 l32.205,26.837l-39.97,87.945c-1.135,2.492-0.998,5.385,0.358,7.765l34.133,59.733c1.57,2.756,4.446,4.301,7.415,4.301 c1.434,0,2.893-0.367,4.224-1.126c4.096-2.338,5.521-7.552,3.174-11.648l-31.966-55.936l40.858-89.899 C454.1,349.899,453.152,345.777,450.208,343.32z"></path>{' '}
                        <path d="M111.938,303.205L63.802,343.32c-2.944,2.458-3.891,6.579-2.295,10.078l40.858,89.899l-31.966,55.936 c-2.347,4.096-0.922,9.31,3.174,11.648c1.331,0.759,2.79,1.126,4.224,1.126c2.97,0,5.845-1.545,7.415-4.301l34.133-59.733 c1.357-2.381,1.493-5.274,0.358-7.765l-39.97-87.945l32.205-26.837v7.381c0,77.107,60.518,140.177,136.533,144.632V303.674 l-136.533-76.459V303.205z"></path>{' '}
                      </g>{' '}
                    </g>{' '}
                  </g>{' '}
                </g>
              </svg>
            </CardDeviceStats>
          );
        })}
      </div>
    </>
  );
};

export default Devices;
