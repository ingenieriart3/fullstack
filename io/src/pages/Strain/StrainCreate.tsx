import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { createEntity } from '../../services/entity-service';
import { getUserInfo } from '../../services/auth-service';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StrainCreate = () => {
  const entity = 'strain';
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'Unnamed strain', // Default value for the 'name' field
      provider: 'unknown', // Default value for the 'provider' field
      provenance: 'unknown', // Default value for the 'provenance' field
    },
  });

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
    navigate(`/strains/`, { replace: true });
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

  // Whitelist for provenance field
  const provenanceWhitelist = ['bank', 'sharing', 'wild', 'unknown'];

  return (
    <>
      <Breadcrumb pageName="Create a strain" />
      <Link
        to="/strains"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg />
        Strains
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
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Provider Field (Textarea) */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Provider
                  </label>
                  <textarea
                    placeholder="Provider"
                    {...register('provider', {
                      required: 'Provider is required',
                      maxLength: {
                        value: 150,
                        message: 'Provider should not exceed 150 characters',
                      },
                    })}
                    defaultValue="unknown"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    maxLength="150"
                  />
                  {errors.provider && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.provider.message}
                    </p>
                  )}
                </div>

                {/* Provenance Field (Select Dropdown) */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Provenance
                  </label>
                  <select
                    {...register('provenance', {
                      required: 'Provenance is required',
                    })}
                    defaultValue="unknown" // Set "unknown" as the default value
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {provenanceWhitelist.map((provenanceValue) => (
                      <option key={provenanceValue} value={provenanceValue}>
                        {provenanceValue.charAt(0).toUpperCase() +
                          provenanceValue.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.provenance && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.provenance.message}
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

export default StrainCreate;
