'use client';
import { useContext, useRef, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { Modal } from '../modal';
import { modalContext } from '@/context_provider/modalProvider';
import { useGetFood } from '@/hooks/useGetFood';
import Image from 'next/image';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { Input } from '../input/input';
import { LoaderDashed } from '../loaderDashed';

export function EditFoodModal() {
  const { openEditFoodModal, onCloseEditFoodModal, modalFoodId } =
    useContext(modalContext);
  const { foodInfo, refetch, loading } = useGetFood(modalFoodId);
  const [editImage, setEditImage] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const size = 200;

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

  return (
    <Modal
      title={'Edit Food'}
      openModal={openEditFoodModal}
      onCloseModal={handleModalClose}
      width={'500px'}
    >
      {Object.keys(foodInfo).length !== 0 ? (
        <form>
          <div className='relative border-2 border-dashed rounded-md p-3'>
            {editImage ? (
              <>
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
                    <label
                      className='flex flex-col items-center justify-center'
                      htmlFor='foodImage'
                    >
                      <AiOutlineCloudUpload size={100} color='gray' />
                      <h1>Choose Image To Upload</h1>
                    </label>
                    <input
                      onChange={onChangeImage}
                      ref={imageRef}
                      name='foodImage'
                      className='hidden'
                      id='foodImage'
                      type='file'
                    />
                  </>
                )}
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
            <button className='button px-8 font-semibold bg-primary-500 text-white rounded-md hover:bg-primary-600 block mx-auto w-fit mt-3'>
              Submit
            </button>
          )}
        </form>
      ) : (
        <LoaderDashed />
      )}
    </Modal>
  );
}
