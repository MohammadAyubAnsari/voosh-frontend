// import React from "react";
// import Modal from "react-modal";

// const ViewTaskModal = ({ isOpen, onRequestClose, task }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="View Task Details"
//       className="modal bg-white rounded-lg p-6 shadow-lg"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//     >
//       <div className="bg-gray-100 p-4 rounded shadow-md w-full max-w-lg mx-auto">
//         <h3 className="text-xl font-semibold mb-4 text-center">Task Details</h3>
//         {task && (
//           <>
//             <p className="font-bold">Title</p>
//             <p className="mb-2 p-2 border rounded w-full">{task.title}</p>
//             <p className="font-bold">Category</p>
//             <p className="mb-2 p-2 border rounded w-full">{task.category}</p>
//             <p className="font-bold">Description</p>
//             <p className="mb-4 p-2 border rounded w-full">{task.description}</p>
//             <p className="font-bold">Created At</p>
//             <p className="mb-4 p-2 border rounded w-full">
//               {new Date(task.createdAt).toLocaleString()}
//             </p>
//             <button
//               onClick={onRequestClose}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               OK
//             </button>
//           </>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ViewTaskModal;

import React from "react";
import Modal from "react-modal";

const ViewTaskModal = ({ isOpen, onRequestClose, task }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Task Details"
      className="modal bg-white rounded-lg p-8 shadow-lg max-w-3xl w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-gray-100 p-6 rounded shadow-md w-full h-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">Task Details</h3>
        {task && (
          <>
            <p className="font-bold">Title</p>
            <p className="mb-3 p-3 border rounded w-full">{task.title}</p>
            <p className="font-bold">Category</p>
            <p className="mb-3 p-3 border rounded w-full">{task.category}</p>
            <p className="font-bold">Description</p>
            <p className="mb-6 p-3 border rounded w-full">{task.description}</p>
            <p className="font-bold">Created At</p>
            <p className="mb-6 p-3 border rounded w-full">
              {new Date(task.createdAt).toLocaleString()}
            </p>
            <button
              onClick={onRequestClose}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              OK
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
