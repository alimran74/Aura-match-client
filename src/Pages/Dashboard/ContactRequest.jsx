import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../components/Shared/Spinner";

const ContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/contact-requests/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contactRequests"]);
      Swal.fire("Success", "Contact request approved & user upgraded!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve contact request", "error");
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Contact Request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-6">
      <h2 className="text-3xl font-bold text-center text-[#f19c79] mb-8">
        📥 Contact Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No contact requests available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-[#cbdfbd] rounded-xl shadow-md border border-[#cbdfbd] p-5 hover:shadow-lg transition"
            >
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-[#f19c79] mb-1">
                  {req.name}
                </h3>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {req.requesterEmail}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Biodata ID:</strong> #{req.biodataId}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    req.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.status}
                </span>

                {req.status === "pending" ? (
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-[#f19c79] hover:bg-[#e6855f] text-white text-sm font-medium px-4 py-2 rounded transition"
                  >
                    Approve
                  </button>
                ) : (
                  <span className="text-sm text-gray-400 italic">No Action</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactRequest;
