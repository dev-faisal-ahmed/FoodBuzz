'use client';
import { modalContext } from '@/context_provider/modalProvider';
import { useContext, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Modal } from '../modal';
import { ProfileIcon } from '../profileIcon';
import { Input } from '../input/input';
import { Loader } from '../loader/loader';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { postReq } from '@/helper/apiReq';
import { useGetUser } from '@/hooks/useGetUser';
import { getUserInfoLocal, setUserInfoLocal } from '@/helper/localStorage';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export function ProfileModal() {
  const { openProfileModal, onCloseProfileModal } = useContext(modalContext);
  const { email, name, imageUrl, role } = getUserInfoLocal();
  const { refetch } = useGetUser(email);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  function onImageChange(e) {
    const images = e.target.files;
    const imageUrl = URL.createObjectURL(images[0]);
    setImage(imageUrl);
  }

  function onRemoveImage() {
    setImage(null);
    imageRef.current.value = null;
  }

  async function onProfileUpdate(e) {
    setIsLoading(true);
    e.preventDefault();
    const address = e.target.address.value;
    const targetImage = imageRef.current.files[0];

    if (address.trim() !== '' && targetImage) {
      const data = new FormData();
      data.append('file', targetImage);
      data.append('upload_preset', 'food-buzz');
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME);
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;
      let imageUrl;
      fetch(url, { method: 'POST', body: data })
        .then((res) => res.json())
        .then((res) => {
          if (res.secure_url) {
            imageUrl = res.secure_url;
            setUserInfoLocal({ name, email, role, image: imageUrl });
            fetch(
              '/api/edit-profile',
              postReq({ email, address: address.trim(), imageUrl })
            ).then((res) =>
              res.json().then((res) => {
                if (res.okay) toast.success(res.msg, toastConfig);
                else toast.error(res.msg, toastConfig);
                onCloseProfileModal();
                setIsLoading(false);
                refetch();
              })
            );
          } else toast.error('Could not add image', toastConfig);
        });
    }
  }

  return (
    <Modal
      openModal={openProfileModal}
      onCloseModal={onCloseProfileModal}
      title={'Edit Profile'}
      width={'500px'}
    >
      {email ? (
        <>
          <div className='relative h-[200px] rounded-xl border-2 border-dashed p-5'>
            {image && (
              <div
                onClick={onRemoveImage}
                className='w-fit absolute right-5 bg-gray-300 rounded-full p-1 cursor-pointer'
              >
                <IoCloseSharp size={20} />
              </div>
            )}

            <label htmlFor='imageUrl'>
              <div className='center-xy flex-col'>
                {image ? (
                  <ProfileIcon
                    image={image}
                    big={true}
                    size={150}
                    margin={'0 auto'}
                  />
                ) : (
                  <>
                    <>
                      <AiOutlineCloudUpload size={100} color='gray' />
                      <h1>Choose Image To Upload</h1>
                    </>
                  </>
                )}
              </div>
            </label>
          </div>
          <input
            ref={imageRef}
            onChange={onImageChange}
            type='file'
            id='imageUrl'
            name='imageUrl'
            className='hidden'
          />
          <form onSubmit={onProfileUpdate} className='flex flex-col gap-3 mt-5'>
            <Input
              name={'address'}
              placeholder={'Input Your Address'}
              title={'Address'}
              type={'string'}
            />
            {isLoading ? (
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
