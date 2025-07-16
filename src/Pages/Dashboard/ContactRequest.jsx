import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
})


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

  if (isLoading) return <p>Loading requests...</p>;

  return (
    <div className="overflow-x-auto mt-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#f19c79] mb-6">📥 Contact Requests</h2>
      <table className="table w-full border">
        <thead className="bg-[#cbdfbd] text-[#333]">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Biodata ID</th>
            <th>Status</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="text-center">
              <td>{req.name}</td>
              <td>{req.requesterEmail}</td>
              <td>{req.biodataId}</td>
              <td>
                {req.status === "approved" ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </td>
              <td>
                {req.status === "pending" && (
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-[#f19c79] text-white px-3 py-1 rounded hover:bg-[#e6855f]"
                  >
                    Approve Contact
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactRequest;
