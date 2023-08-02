'use client';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { useContext, useState } from 'react';
import { Modal } from '../shared/modal';
import { modalContext } from '@/context_provider/modalProvider';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Input } from '../shared/input/input';

export function AddFoodModal() {
  const { openAddFoodModal, onCloseAddFoodModal } = useContext(modalContext);
  const [image, setImage] = useState(null);

  function onImageChange(event) {
    const images = event.target.files[0];
    const imageUrl = URL.createObjectURL(images);
    setImage(imageUrl);
  }

  function onRemoveImage() {
    setImage(null);
  }

  return (
    <Modal
      title={'Add New Food'}
      openModal={openAddFoodModal}
      onCloseModal={onCloseAddFoodModal}
      width={500}
    >
      <form>
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
            className='border rounded-md -mt-1'
            name='description'
            rows='3'
          />
        </div>
        <div className='w-fit ml-auto center-y gap-5 mt-5'>
          <p className='button bg-red-500 text-white font-semibold rounded-md cursor-pointer hover:bg-red-600'>
            Clear All
          </p>
          <button className='button bg-green-500 rounded-md text-white font-semibold hover:bg-green-600'>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
