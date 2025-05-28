import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { auth, useAuthContext } from '../../hooks/useAuthContext';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { handleRefresh } from '../../utils/utils';

const Farms = () => {
  const [farms, setFarms] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const [showModal, handleClose] = useState<boolean>(false);
  const navigate = useNavigate();
  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };
  useEffect(() => {
    io.socket.get('/farm/get-user-farms', (data: any) => {
      setFarms(data);
      if (data === 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });

    io.socket.on('farm', (farmData: any) => {
      setFarms((prevFarms) => [...prevFarms, farmData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('farm');
    };
  }, []);

  // Handle edit and delete actions
  const editRow = (idx: number) => {
    const farmToEdit = farms[idx];
    navigate(`/farm/update/${farmToEdit.id}`);
  };

  const deleteRow = (idx: number) => {
    const farmToDelete = farms[idx];
    // Call API to delete the farm or handle deletion logic here
    io.socket.delete(`/farm/${farmToDelete.id}`, (response: any) => {
      if (response.status === 'success') {
        setFarms(farms.filter((_, index) => index !== idx));
      } else {
        console.error('Error deleting farm');
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Farms" />
      {/* start go to create farm */}
      <Link
        to="/farm/create"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg />
        Create
      </Link>

      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Name
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {farms.map((row, idx) => (
            <tr key={idx} className="content-center">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.name}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="actions flex gap-4">
                  <BsFillTrashFill
                    className="delete-btn cursor-pointer"
                    onClick={toogleShowModal}
                  />
                  <DeleteModal
                    showModal={showModal}
                    toogleShowModal={toogleShowModal}
                    rowIdx={idx}
                    deleteRow={deleteRow}
                    entityName={'farms'}
                    handleRefresh={() => handleRefresh('/farms')}
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

export default Farms;
