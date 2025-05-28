import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { auth, useAuthContext } from '../../hooks/useAuthContext';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { handleRefresh } from '../../utils/utils';

const Environments = () => {
  const [environments, setEnvironments] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const [showModal, handleClose] = useState<boolean>(false);
  const navigate = useNavigate();
  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };

  const deleteRow = (idx: number) => {
    const environmentToDelete = environments[idx];
    // Call API to delete the environment or handle deletion logic here
    io.socket.delete(
      `/environment/${environmentToDelete.id}`,
      (response: any) => {
        if (response.id === environmentToDelete.id) {
          setEnvironments(environments.filter((_, index) => index !== idx));
        } else {
          console.error('Error deleting environment');
        }
      },
    );
  };

  // Handle edit and delete actions
  const editRow = (idx: number) => {
    const environmentToEdit = environments[idx];
    navigate(`/environment/update/${environmentToEdit.id}`);
  };

  useEffect(() => {
    // user's environments
    io.socket.get('/environment/get-user-environments', (data: any) => {
      setEnvironments(data);
      if (data == 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });
    io.socket.on('environment', function onDevice(environmentData: any) {
      setEnvironments((prevDevices) => [...prevDevices, environmentData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('environment');
      // io.socket.off('environment', 'newDevice', 'updatedDevice');
    };
  }, []);

  return (
    <>
      <Breadcrumb pageName="Environments" />
      {/* start go to create environment */}
      <Link
        to="/environment/create"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg></DevicesSvg>
        Create
      </Link>

      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Name
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Volume
            </th>
          </tr>
        </thead>
        <tbody>
          {environments.map((row, idx) => (
            <tr key={idx} className="content-center">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.name}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.volume}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="actions flex grid-cols-2 gap-4">
                  <BsFillTrashFill
                    className="delete-btn cursor-pointer"
                    onClick={toogleShowModal}
                  />
                  <DeleteModal
                    showModal={showModal}
                    toogleShowModal={toogleShowModal}
                    rowIdx={idx}
                    deleteRow={deleteRow}
                    entityName={'environments'}
                    handleRefresh={() => handleRefresh('/environments')}
                  ></DeleteModal>
                  <BsFillPencilFill
                    className="edit-btn cursor-pointer"
                    onClick={() => editRow(idx)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Environments;
