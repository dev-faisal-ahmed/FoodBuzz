'use client';
import { VscClose } from 'react-icons/vsc';

export function Modal({ children, openModal, onCloseModal, title, width }) {
  return (
    openModal && (
      <section onClick={onCloseModal} className='modal'>
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
            <button onClick={onCloseModal}>
              <VscClose size={20} />
            </button>
          </header>
          <main className='py-4 h-full overflow-y-auto'>{children}</main>
        </section>
      </section>
    )
  );
}
