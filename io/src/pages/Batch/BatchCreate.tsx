import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { createEntity } from '../../services/entity-service';
import { getUserInfo } from '../../services/auth-service';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BatchCreate = () => {
  const entity = 'batch';
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userId, setUserId] = useState<string>('');

  const handleResponse = (body, JWR) => {
    if (JWR.statusCode === 200) {
      setUserId(body.userId);
    } else {
      console.log('Error: ', JWR);
    }
  };

  const onSubmit = (formData) => {
    formData['user'] = userId;
    createEntity(entity, { ...formData });
    navigate(`/batchs/`, { replace: true });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        getUserInfo(handleResponse);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <>
      <Breadcrumb pageName="Create a batch" />
      <Link
        to="/batchs"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg />
        Batchs
      </Link>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Properties - userId: {userId}
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5.5 p-6.5">
                {/* Name Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    {...register('name', {
                      required: 'Name is required',
                      defaultValue: 'Unnamed batch',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Nutrition History Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nutrition History (JSON)
                  </label>
                  <textarea
                    placeholder="Enter Nutrition History in JSON format"
                    {...register('nutritionHistory', {
                      required: 'This field is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.nutritionHistory && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nutritionHistory.message}
                    </p>
                  )}
                </div>

                {/* Nutrition Plain Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nutrition Plain (JSON)
                  </label>
                  <textarea
                    placeholder="Enter Nutrition Plain in JSON format"
                    {...register('nutritionPlain', {
                      required: 'This field is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.nutritionPlain && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nutritionPlain.message}
                    </p>
                  )}
                </div>

                {/* Irrigation History Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Irrigation History (JSON)
                  </label>
                  <textarea
                    placeholder="Enter Irrigation History in JSON format"
                    {...register('irrigationHistory', {
                      required: 'This field is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.irrigationHistory && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.irrigationHistory.message}
                    </p>
                  )}
                </div>

                {/* Irrigation Plain Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Irrigation Plain (JSON)
                  </label>
                  <textarea
                    placeholder="Enter Irrigation Plain in JSON format"
                    {...register('irrigationPlain', {
                      required: 'This field is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.irrigationPlain && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.irrigationPlain.message}
                    </p>
                  )}
                </div>

                {/* Volume Field */}
                <div>
                  <label className="mb-3 block font-medium text-black dark:text-white">
                    Volume
                  </label>
                  <input
                    type="number"
                    placeholder="Volume"
                    {...register('volume', { required: 'Volume is required' })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                  />
                  {errors.volume && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.volume.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mb-3">
                  <input
                    type="submit"
                    value="Create"
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

export default BatchCreate;
