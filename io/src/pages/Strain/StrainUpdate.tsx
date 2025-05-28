import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getUserInfo } from '../../services/auth-service';
import { DevicesSvg } from '../../components/Svg/DevicesSvg';
import { useState, useEffect } from 'react';
import { patchEntity, getEntity } from '../../services/entity-service';

interface FormData {
  name: string;
  user: string;
  birth: string; // New field for birth
}

const StrainUpdate = () => {
  const { id } = useParams<{ id: string }>(); // Get the strain ID from the URL params
  const entity = 'strain';
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
      navigate(`/strains`, { replace: true }); // Navigate to the updated strain page
    }
  };

  useEffect(() => {
    if (id) {
      const fetchStrainData = async () => {
        try {
          const strainData = await getEntity(entity, id, (data, JWR) => {
            if (JWR.statusCode === 200) {
              // Populate form fields with existing strain data
              setValue('name', data.name);
              setValue('user', data.user);
              setValue('birth', data.birth); // Set value for birth field
            } else {
              console.error('Error fetching strain data:', JWR);
            }
          });
        } catch (error) {
          console.error('Error fetching strain data:', error);
        }
      };

      fetchStrainData();
    }
  }, [id, setValue]); // Ensure this effect runs when `id` changes

  const birthOptions = [
    'germination',
    'propagation',
    'micro-propagation',
    'migration',
    'wild',
    'unknown',
  ];

  return (
    <>
      <Breadcrumb pageName="Update a strain" />
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

                {/* User Field */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    User
                  </label>
                  <input
                    type="text"
                    placeholder="User"
                    {...register('user', {
                      required: 'User is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.user && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.user.message}
                    </p>
                  )}
                </div>

                {/* Birth Field (Select Dropdown) */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Birth
                  </label>
                  <select
                    {...register('birth', {
                      required: 'Birth type is required',
                    })}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select a birth type</option>
                    {birthOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.birth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birth.message}
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

export default StrainUpdate;
