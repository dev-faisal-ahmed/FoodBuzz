'use client';
import { modalContext } from '@/context_provider/modalProvider';
import { useContext, useEffect, useState } from 'react';
import { Modal } from '../modal';
import { ProfileIcon } from '../profileIcon';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase.init';
import { Input } from '../input/input';
import { Loader } from '../loader/loader';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { postReq } from '@/helper/apiReq';
import { useGetUser } from '@/hooks/useGetUser';

export function ProfileModal() {
  const { openProfileModal, onCloseProfileModal } = useContext(modalContext);
  const [user] = useAuthState(auth);
  const { refetch } = useGetUser(user?.email);
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [imageUrl, setImageUrl] = useState(user?.photoURL);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImageUrl(user?.photoURL);
  }, [user]);

  const onChangeImageInput = (e) => setImageUrl(e.target.value);

  const onProfileUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const address = e.target.address.value;

    // update user photo on firebase
    if (user?.photoURL !== imageUrl && imageUrl) {
      const updated = await updateProfile({ photoURL: imageUrl });
      if (updated) toast.success('Photo updated', toastConfig);
    }

    // now storing the address to the database
    if (address.trim() !== '')
      fetch(
        '/api/edit-profile',
        postReq({ email: user?.email, address: address.trim() })
      ).then((res) =>
        res.json().then((res) => {
          if (res.okay) toast.success(res.msg, toastConfig);
          else toast.error(res.msg, toastConfig);
          onCloseProfileModal();
          setIsLoading(false);
          refetch();
        })
      );
  };

  if (error) toast.error(error.message, toastConfig);

  return (
    <Modal
      openModal={openProfileModal}
      onCloseModal={onCloseProfileModal}
      title={'Edit Profile'}
      width={'500px'}
    >
      {user ? (
        <>
          <div className='p-5 rounded-xl border'>
            <ProfileIcon
              image={imageUrl}
              big={true}
              size={150}
              margin={'0 auto'}
            />
          </div>
          <form onSubmit={onProfileUpdate} className='flex flex-col gap-3 mt-5'>
            <Input
              name={'imageUrl'}
              placeholder={'Input Your Image URL'}
              title={'Image URL'}
              type={'string'}
              onChange={onChangeImageInput}
            />
            <Input
              name={'address'}
              placeholder={'Input Your Address'}
              title={'Address'}
              type={'string'}
            />
            {updating || isLoading ? (
              <div className='mt-5 block px-8 lg:mx-0 mx-auto bg-gray-500 w-fit rounded-lg'>
                <Loader />
              </div>
            ) : (
              <button className=' mt-5 px-5 py-2 text-white font-semibold bg-primary-500 animation hover:bg-primary-700 rounded-lg'>
                Submit
              </button>
            )}
          </form>
        </>
      ) : (
        <h1 className='text-xl font-semibold text-center mt-3'>
          😥 Please Login First
        </h1>
      )}
    </Modal>
  );
}
