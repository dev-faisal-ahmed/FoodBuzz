'use client';
import { VscClose } from 'react-icons/vsc';

export function Modal({ children, openModal, onCloseModal, title, width }) {
  return (
    openModal && (
      <section onClick={onCloseModal} className='modal p-3'>
        <section
          className='bg-white rounded-xl p-4 grid grid-rows-[auto_1fr]'
          style={{
            width: width || '70%',
            minWidth: '300px',
            maxWidth: '700px',
            maxHeight: '700px',
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <header className='border-b center-y pb-3 px-1'>
            <h1 className='text-xl font-semibold flex-grow'>{title}</h1>
            <button
              onClick={onCloseModal}
              className='bg-primary-500 text-white rounded-full p-1 font-semibold'
            >
              <VscClose size={15} />
            </button>
          </header>
          <main className='pt-4 h-full overflow-y-auto no-scrollbar'>
            {children}
          </main>
        </section>
      </section>
    )
  );
}
