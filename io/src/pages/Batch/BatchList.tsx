import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { auth, useAuthContext } from '../../hooks/useAuthContext';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { handleRefresh } from '../../utils/utils';

const Batchs = () => {
  const [batchs, setBatchs] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const navigate = useNavigate();
  const [showModal, handleClose] = useState<boolean>(false);
  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };

  useEffect(() => {
    io.socket.get('/batch/get-user-batchs', (data: any) => {
      setBatchs(data);
      if (data == 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });

    io.socket.on('batch', function onDevice(batchData: any) {
      setBatchs((prevDevices) => [...prevDevices, batchData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('batch');
    };
  }, []);

  // Handle edit and delete actions
  const editRow = (idx: number) => {
    const batchToEdit = batchs[idx];
    navigate(`/batch/update/${batchToEdit.id}`);
  };

  const deleteRow = (idx: number) => {
    const batchToDelete = batchs[idx];
    // Call API to delete the batch or handle deletion logic here
    io.socket.delete(`/batch/${batchToDelete.id}`, (response: any) => {
      if (response.id === batchToDelete.id) {
        setBatchs(batchs.filter((_, index) => index !== idx));
      } else {
        console.error('Error deleting batch');
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Batchs" />
      {/* start go to create batch */}
      <Link
        to="/batch/create"
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
              Volume
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Nutrition History
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Irrigation History
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {batchs.map((row, idx) => (
            <tr key={idx} className="content-center">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.name}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.volume}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <pre className="text-xs text-black dark:text-white">
                  {JSON.stringify(row.nutritionHistory, null, 2)}
                </pre>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <pre className="text-xs text-black dark:text-white">
                  {JSON.stringify(row.irrigationHistory, null, 2)}
                </pre>
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
                    entityName={'batchs'}
                    handleRefresh={handleRefresh}
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

export default Batchs;
