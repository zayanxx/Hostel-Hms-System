const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
