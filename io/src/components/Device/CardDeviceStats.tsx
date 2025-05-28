import React, { ReactNode, useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { DeleteDeviceModal } from '../Modals/DeleteDeviceModal';
import { deleteDevice } from '../../services/device-service';

interface CardDeviceStatsProps {
  closeModal: () => {};
  title: string;
  total: string;
  id: string; // unico atributo mapeado al momento
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  handleRefresh: () => void;
}

const CardDeviceStats: React.FC<CardDeviceStatsProps> = ({
  title,
  total,
  id, // unico atributo mapeado al momento
  levelUp,
  levelDown,
  children,
  handleRefresh,
}) => {
  const entityName = `device`;
  const navigate = useNavigate();
  const [showModal, handleClose] = useState<boolean>(false);

  // A function to toggle the feature enabled state
  const toogleShowModal = () => {
    handleClose((prevState) => !prevState);
  };

  // const handleShow = () => setShow(true);
  return (
    <>
      {/* <div onClick={() => setShow(true)}>showModal: {JSON.stringify(show)}</div> */}
      <DeleteDeviceModal
        showModal={showModal}
        toogleShowModal={toogleShowModal}
        entityId={id}
        deleteFunction={deleteDevice}
        entityName={entityName}
        // handleShow={handleShow}
      ></DeleteDeviceModal>
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {children}
          </div>
          <div className="flex h-11.5 w-11.5 ">
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <span className="actions flex grid-cols-2 gap-4">
                <BsFillTrashFill
                  className="delete-btn cursor-pointer"
                  // onClick={() => setShow(true)}
                  onClick={toogleShowModal}
                />
                <BsFillPencilFill
                  className="edit-btn cursor-pointer"
                  onClick={() => {
                    navigate(`/device/update/${id}`, { replace: true }); // <-- redirect
                  }}
                />
              </span>
            </td>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-medium">{title}</span>
          </div>

          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp && 'text-meta-3'
            } ${levelDown && 'text-meta-5'} `}
          >
            {id}

            {levelUp && (
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                  fill=""
                />
              </svg>
            )}
            {levelDown && (
              <svg
                className="fill-meta-5"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill=""
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default CardDeviceStats;
