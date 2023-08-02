'use client';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { useContext, useRef, useState } from 'react';
import { Modal } from '../shared/modal';
import { modalContext } from '@/context_provider/modalProvider';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Input } from '../shared/input/input';
import { toast } from 'react-hot-toast';
import { toastConfig } from '@/helper/toastConfig';
import { postReq } from '@/helper/apiReq';
import { useGetFoods } from '@/hooks/useGetFoods';

export function AddFoodModal() {
  const { openAddFoodModal, onCloseAddFoodModal } = useContext(modalContext);
  const [image, setImage] = useState(null);
  const { foodRefetch } = useGetFoods();

  function onImageChange(event) {
    const images = event.target.files[0];
    const imageUrl = URL.createObjectURL(images);
    setImage(imageUrl);
  }

  function onRemoveImage() {
    setImage(null);
  }

  function onAddFood(event) {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value.trim();
    const price = +form.price.value; // converting price into a number
    const category = form.category.value.trim().toLowerCase();
    const description = form.description.value.trim();

    if (foodName === '' || !price || category === '' || description === '') {
      toast.error('Please fill up the form properly', toastConfig);
      return;
    }

    const image = form.imageInput.files[0];
    if (!image) {
      toast.error('Please select the image', toastConfig);
      return;
    }
    const loadingToast = toast.loading('Adding a new food...');
    // uploading the image to the cloud
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'food-buzz');
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUD_NAME);

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`;
    let imageUrl;
    fetch(url, { method: 'POST', body: data })
      .then((res) => res.json())
      .then((res) => {
        if (res.secure_url) {
          imageUrl = res.secure_url;

          const foodData = {
            foodName,
            price,
            category,
            description,
            imageUrl,
          };

          fetch('api/add-food', postReq({ ...foodData }))
            .then((res) => res.json())
            .then((res) => {
              if (res.okay) {
                toast.success(res.msg, toastConfig);
                form.reset();
                setImage(null);
                toast.dismiss(loadingToast);
                foodRefetch();
              } else toast.error(res.msg, toastConfig);
              onCloseAddFoodModal();
            });
        } else {
          toast.error('Could not upload your image');
        }
      });
  }

  return (
    <Modal
      title={'Add New Food'}
      openModal={openAddFoodModal}
      onCloseModal={onCloseAddFoodModal}
      width={500}
    >
      <form onSubmit={onAddFood}>
        <label htmlFor='imageInput'>
          <div
            className={`h-[200px] center-xy flex-col gap-5 cursor-pointer ${
              image ? '' : 'border-2'
            }  border-dashed rounded-md relative`}
          >
            {image ? (
              <Image
                className='rounded-md'
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                src={image}
                width={400}
                height={300}
                alt='product-image'
              />
            ) : (
              <>
                <AiOutlineCloudUpload size={100} color='gray' />
                <h1>Choose Image To Upload</h1>
              </>
            )}
          </div>
        </label>
        {image && (
          <div
            onClick={onRemoveImage}
            className='bg-blue-400 center-y gap-1 w-fit ml-auto cursor-pointer mt-2 py-1 px-3 text-white rounded'
          >
            Remove Image <IoMdClose />
          </div>
        )}

        <input
          onChange={onImageChange}
          id='imageInput'
          name='imageInput'
          type='file'
          className='hidden'
        />
        <div className='mt-5 flex flex-col gap-3'>
          <Input
            name={'foodName'}
            type={'text'}
            placeholder={`food's name`}
            title={'Name of the food'}
          />
          <div className='center-y gap-5'>
            <Input
              name={'price'}
              type={'number'}
              placeholder={'price'}
              title={'Price'}
            />
            <Input
              name={'category'}
              type={'text'}
              placeholder={'category'}
              title={'Category'}
            />
          </div>
          <label htmlFor='description' className='text-gray-500 font-semibold'>
            Description
          </label>
          <textarea
            id='description'
            className='border rounded-md -mt-1 px-3 py-2 outline-primary-300'
            name='description'
            rows='3'
          />
        </div>

        <button className='block button bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 mt-5 ml-auto'>
          Submit
        </button>
      </form>
    </Modal>
  );
}
