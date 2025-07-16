import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
 import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["myContactRequests", user.email],
    queryFn: async () => {
      const res = await axios.get(`/contact-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

 

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(`/contact-requests/${id}`);
    if (res.data.deletedCount > 0) {
      toast.success("Request deleted.");
      refetch();
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete request.");
  }
};


  return (
   <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
  <div className="bg-[#cbdfbd] rounded-xl shadow-md max-w-full md:max-w-6xl mx-auto p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-6 text-[#f19c79]">
      My Contact Requests
    </h2>

    {/* Responsive table on md+ and cards on sm */}
    <div className="hidden md:block overflow-auto rounded-lg border border-gray-300">
      <table className="min-w-full table-auto text-sm md:text-base">
        <thead className="bg-[#f6f4d2] text-gray-700">
          <tr>
            <th className="py-3 px-4 border">Name</th>
            <th className="py-3 px-4 border">Biodata ID</th>
            <th className="py-3 px-4 border">Status</th>
            <th className="py-3 px-4 border">Mobile No</th>
            <th className="py-3 px-4 border">Email</th>
            <th className="py-3 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No contact requests yet.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr
                key={req._id}
                className="text-center border-t bg-white hover:bg-[#f6f4d2]/70 transition"
              >
                <td className="py-3 px-4 border">{req.name || "Unknown"}</td>
                <td className="py-3 px-4 border">{req.biodataId}</td>
                <td className="py-3 px-4 border">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      req.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="py-3 px-4 border">
                  {req.status === "approved" ? req.mobile || "N/A" : "Hidden"}
                </td>
                <td className="py-3 px-4 border">
                  {req.status === "approved"
                    ? req.contactEmail || "N/A"
                    : "Hidden"}
                </td>
                <td className="py-3 px-4 border">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden space-y-4">
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No contact requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-lg shadow-md p-4 space-y-2 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#f19c79]">
              {req.name || "Unknown"}
            </h3>
            <p><strong>Biodata ID:</strong> {req.biodataId}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  req.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {req.status}
              </span>
            </p>
            <p>
              <strong>Mobile:</strong>{" "}
              {req.status === "approved" ? req.mobile || "N/A" : "Hidden"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {req.status === "approved" ? req.contactEmail || "N/A" : "Hidden"}
            </p>
            <button
              onClick={() => handleDelete(req._id)}
              className="mt-2 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
            >
              <FaTrash className="inline-block mr-1" /> Delete Request
            </button>
          </div>
        ))
      )}
    </div>
  </div>
</div>



  );
};

export default MyContactRequest;
