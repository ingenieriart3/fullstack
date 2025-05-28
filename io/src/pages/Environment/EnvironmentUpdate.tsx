import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getUserInfo } from '../../services/auth-service';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import { useState, useEffect } from 'react';
import { patchEntity, getEntity } from '../../services/entity-service';

interface FormData {
  name: string;
  volume: number;
  user: string;
}

const EnvironmentUpdate = () => {
  const { id } = useParams<{ id: string }>(); // Get the environment ID from the URL params
  const entity = 'environment';
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // To pre-populate form values
  } = useForm<FormData>();
  const [userId, setUserId] = useState<string>('');

  const handleResponse = (body, JWR) => {
    if (JWR.statusCode === 200) {
      setUserId(body.userId);
    } else {
      console.log('Error: ', JWR);
    }
  };

  // Fetch user information
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

  const onSubmit = async (formData: FormData) => {
    formData.user = userId;

    if (id) {
      // Use patchEntity for partial update or putEntity for full update
      await patchEntity(entity, id, formData, (response) => {
        console.log(response);
      });
      navigate(`/environments`, { replace: true }); // Navigate to the updated environment page
    }
  };

  useEffect(() => {
    if (id) {
      const fetchEnvironmentData = async () => {
        try {
          const environmentData = await getEntity(entity, id, (data, JWR) => {
            if (JWR.statusCode === 200) {
              // Populate form fields with existing environment data
              setValue('name', data.name);
              setValue('volume', data.volume);
              setValue('user', data.user);
            } else {
              console.error('Error fetching environment data:', JWR);
            }
          });
        } catch (error) {
          console.error('Error fetching environment data:', error);
        }
      };

      fetchEnvironmentData();
    }
  }, [id, setValue]); // Ensure this effect runs when `id` changes

  return (
    <>
      <Breadcrumb pageName="Update a environment" />
      <Link
        to="/environments"
        className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
      >
        <DevicesSvg />
        Environmentes
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

                {/* Volume Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Volume
                  </label>
                  <input
                    type="number"
                    placeholder="Volume"
                    {...register('volume', {
                      required: 'Volume is required',
                      valueAsNumber: true, // Ensure it's treated as a number
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

export default EnvironmentUpdate;
