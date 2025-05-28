import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import io from '../../services/socket';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { auth, useAuthContext } from '../../hooks/useAuthContext';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { handleRefresh } from '../../utils/utils';

const Strains = () => {
  const [strains, setStrains] = useState<any[]>([]);
  const { username, setUsername } = useAuthContext();
  const [showModal, handleClose] = useState<boolean>(false);
  const navigate = useNavigate();
  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };
  useEffect(() => {
    io.socket.get('/strain/get-user-strains', (data: any) => {
      setStrains(data);
      if (data === 'Unauthorized') {
        auth.signout(setUsername(null));
        navigate(`/auth/signin`, { replace: true });
      }
    });

    io.socket.on('strain', (strainData: any) => {
      setStrains((prevStrains) => [...prevStrains, strainData]);
    });

    // Cleanup the socket connection when the component is unmounted
    return () => {
      io.socket.off('strain');
    };
  }, []);

  // Handle edit and delete actions
  const editRow = (idx: number) => {
    const strainToEdit = strains[idx];
    navigate(`/strain/update/${strainToEdit.id}`);
  };

  const deleteRow = (idx: number) => {
    const strainToDelete = strains[idx];
    // Call API to delete the strain or handle deletion logic here
    io.socket.delete(`/strain/${strainToDelete.id}`, (response: any) => {
      if (response.status === 'success') {
        setStrains(strains.filter((_, index) => index !== idx));
      } else {
        console.error('Error deleting strain');
      }
    });
  };

  return (
    <>
      <Breadcrumb pageName="Strains" />
      {/* start go to create strain */}
      <Link
        to="/strain/create"
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
              Provider
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Provenance
            </th>
            <th className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {strains.map((row, idx) => (
            <tr key={idx} className="content-center">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className={`label label-${row.para}`}>{row.name}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="label">{row.provider}</span>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <span className="label">{row.provenance}</span>
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
                    entityName={'strains'}
                    handleRefresh={() => handleRefresh('/strains')}
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

export default Strains;
