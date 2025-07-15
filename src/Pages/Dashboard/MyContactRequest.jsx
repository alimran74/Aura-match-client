import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
 import Swal from "sweetalert2";

const MyContactRequest = () => {
  const axios = useAxios();
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
    <div className="p-6 bg-[#cbdfbd] rounded-xl shadow-md">
      <h2 className="text-2xl text-center font-semibold mb-4 text-[#f19c79]">
        My Contact Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-[#f6f4d2] text-gray-700">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Biodata ID</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Mobile No</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Action</th>
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
                <tr key={req._id} className="text-center border-t">
                  <td className="py-2 px-4 border">{req.name || "Unknown"}</td>
                  <td className="py-2 px-4 border">{req.biodataId}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {req.status === "approved" ? req.mobile || "N/A" : "Hidden"}
                  </td>
                  <td className="py-2 px-4 border">
                    {req.status === "approved"
                      ? req.contactEmail || "N/A"
                      : "Hidden"}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Request"
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
    </div>
  );
};

export default MyContactRequest;
