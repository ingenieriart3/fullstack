import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { auth, useAuthContext } from '../../hooks/useAuthContext';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { handleRefresh } from '../../utils/utils';

const Specimens = () => {
  const [specimens, setSpecimens] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const [showModal, handleClose] = useState<boolean>(false);
  const navigate = useNavigate();

  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };
  useEffect(() => {
    io.socket.get('/specimen/get-user-specimens', (data: any) => {
      setSpecimens(data);
      if (data === 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });

    io.socket.on('specimen', (specimenData: any) => {
      setSpecimens((prevSpecimens) => [...prevSpecimens, specimenData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('specimen');
    };
  }, []);

  // Handle edit and delete actions
  const editRow = (idx: number) => {
    const specimenToEdit = specimens[idx];
    navigate(`/specimen/update/${specimenToEdit.id}`);
  };

  const deleteRow = (idx: number) => {
    const specimenToDelete = specimens[idx];
    // Call API to delete the specimen or handle deletion logic here
    io.socket.delete(`/specimen/${specimenToDelete.id}`, (response: any) => {
      if (response.status === 'success') {
        setSpecimens(specimens.filter((_, index) => index !== idx));
      } else {
        console.error('Error deleting specimen');
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Specimens" />
      {/* start go to create specimen */}
      <Link
        to="/specimen/create"
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
              Birth
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {specimens.map((row, idx) => (
            <tr key={idx} className="content-center">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.name}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="label">{row.birth}</span>
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
                    entityName={'specimens'}
                    handleRefresh={() => handleRefresh('/specimens')}
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

export default Specimens;
