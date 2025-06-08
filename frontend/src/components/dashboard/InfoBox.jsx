// src/components/admin/dashboard/InfoBox.jsx
const InfoBox = ({ label, content }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-sm text-gray-700">
      <h4 className="font-semibold mb-1">{label}</h4>
      <p>{content}</p>
    </div>
  );
};

export default InfoBox;
