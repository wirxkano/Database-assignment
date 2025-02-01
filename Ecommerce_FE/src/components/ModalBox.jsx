/* eslint-disable react/prop-types */

function ModalBox({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center px-5 py-3 border-b border-gray-300">
          <h2 className="text-lg font-medium">Mã giảm giá</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </button>
        </header>
        <div className="p-5">{children}</div>
        <footer className="flex justify-end items-center px-5 py-3 border-t border-gray-300">
          <button
            className="min-w-24 px-4 py-2 bg-gray-200 border rounded-md text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Đóng
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ModalBox;
