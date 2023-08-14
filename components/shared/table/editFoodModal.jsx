'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import Image from 'next/image';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { Input } from '../input/input';
import { LoaderDashed } from '../loaderDashed';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { postReq } from '@/helper/apiReq';
import { useGetFoods } from '@/hooks/useGetFoods';
import { Loader } from '../loader/loader';

export function EditFoodModal() {
  const { openEditFoodModal, onCloseEditFoodModal, modalFoodId } =
    useContext(modalContext);
  const { foodRefetch } = useGetFoods();
  const [foodInfo, setFoodInfo] = useState({});
  const [editImage, setEditImage] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const size = 200;

  useEffect(() => {
    if (modalFoodId) {
      fetch(`/api/get-food/${modalFoodId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res?.okay) setFoodInfo(res.data);
        });
    }
  }, [modalFoodId]);

  function handleModalClose() {
    onCloseEditFoodModal();
    setImage(null);
    setEditImage(false);
    setEditName(false);
    setEditPrice(false);
  }

  function onEditImage() {
    setEditImage(true);
  }

  function onClearImage() {
    setEditImage(false);
    setImage(null);
  }

  function onChangeImage(event) {
    const images = event.target.files;
    const imageObject = URL.createObjectURL(images[0]);
    setImage(imageObject);
  }

  function postData(foodData, toastId) {
    fetch('/api/edit-food', postReq({ ...foodData }))
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          toast.success(res.msg, toastConfig);
        } else {
          toast.error(res.msg, toastConfig);
        }
        toast.dismiss(toastId);
        foodRefetch();
        setLoading(false);
        handleModalClose();
      });
  }

  function onSubmitForm(event) {
    setLoading(true);
    event.preventDefault();
    const toastId = toast.loading('Updating Food Info');
    const form = event.target;
    const foodName = form.foodName?.value;
    const price = form.price?.value;
    const foodData = {
      foodName: foodName || foodInfo?.foodName,
      price: price || foodInfo?.price,
      foodId: modalFoodId,
      imageUrl: foodInfo?.imageUrl,
    };
    const targetImage = imageRef.current.files[0];

    if (targetImage) {
      console.log('image found');
      const data = new FormData();
      data.append('file', targetImage);
      data.append('upload_preset', 'food-buzz');
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME);

      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;
      let imageUrl;
      fetch(url, { method: 'POST', body: data })
        .then((res) => res.json())
        .then((res) => {
          console.log('image uploaded', res);
          if (res.secure_url) {
            imageUrl = res.secure_url;
            foodData.imageUrl = imageUrl;
            postData(foodData, toastId);
            return;
          }
        });
    } else {
      postData(foodData, toastId);
    }
  }

  return (
    <Modal
      title={'Edit Food'}
      openModal={openEditFoodModal}
      onCloseModal={handleModalClose}
      width={'500px'}
    >
      {Object.keys(foodInfo).length !== 0 ? (
        <form onSubmit={onSubmitForm}>
          <div className='relative border-2 border-dashed rounded-md p-3'>
            {editImage ? (
              <>
                <label
                  className='flex flex-col items-center justify-center'
                  htmlFor='foodImage'
                >
                  {image ? (
                    <div style={{ height: size + 'px' }}>
                      <Image
                        style={{
                          width: size,
                          height: size,
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '50%',
                          margin: '0 auto',
                        }}
                        src={image}
                        height={size}
                        width={size}
                        alt=''
                      />
                    </div>
                  ) : (
                    <>
                      <AiOutlineCloudUpload size={100} color='gray' />
                      <h1>Choose Image To Upload</h1>
                    </>
                  )}
                </label>
                <input
                  ref={imageRef}
                  name='foodImage'
                  onChange={onChangeImage}
                  type='file'
                  className='hidden'
                  id='foodImage'
                />
              </>
            ) : (
              <Image
                style={{
                  width: size,
                  height: size,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '50%',
                  margin: '0 auto',
                }}
                src={foodInfo?.imageUrl}
                height={size}
                width={size}
                alt=''
              />
            )}

            {!editImage ? (
              <div
                onClick={onEditImage}
                className='bg-gray-100 w-fit p-1 rounded-md animation hover:scale-125 cursor-pointer absolute top-3 right-3'
              >
                <CiEdit size={20} />
              </div>
            ) : (
              <div
                onClick={onClearImage}
                className='bg-gray-100 w-fit p-1 rounded-md animation hover:scale-125 cursor-pointer absolute top-3 right-3'
              >
                <MdOutlineClose size={20} />
              </div>
            )}
          </div>

          <div className='mt-2 p-3 flex flex-col gap-3'>
            {/* name */}
            {editName ? (
              <Input
                type={'text'}
                title={'Food Name'}
                name={'foodName'}
                placeholder={'Enter Food Name'}
              />
            ) : (
              <div className='center-y justify-between'>
                <h3 className='font-semibold text-lg'>{foodInfo?.foodName}</h3>
                <p
                  onClick={() => setEditName(true)}
                  className='text-blue-600 cursor-pointer'
                >
                  Edit
                </p>
              </div>
            )}
            {/* price */}
            {editPrice ? (
              <Input
                type={'text'}
                title={'Price'}
                name={'price'}
                placeholder={'Enter Price'}
              />
            ) : (
              <div className='center-y justify-between'>
                <h3 className='font-semibold text-lg'>${foodInfo?.price}</h3>
                <p
                  onClick={() => setEditPrice(true)}
                  className='text-blue-600 cursor-pointer'
                >
                  Edit
                </p>
              </div>
            )}
          </div>
          {(editImage || editName || editPrice) && (
            <>
              {loading ? (
                <>
                  <p className='button px-8 font-semibold bg-primary-500 text-white rounded-md hover:bg-primary-600 block mx-auto w-fit mt-3'>
                    <Loader className={'w-fit mx-auto'} />
                  </p>
                </>
              ) : (
                <button className='button px-8 font-semibold bg-primary-500 text-white rounded-md hover:bg-primary-600 block mx-auto w-fit mt-3'>
                  Submit
                </button>
              )}
            </>
          )}
        </form>
      ) : (
        <LoaderDashed />
      )}
    </Modal>
  );
}
