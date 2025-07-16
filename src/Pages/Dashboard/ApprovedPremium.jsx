import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../components/Shared/Spinner";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch pending premium biodata
  const { data: pendingBiodatas = [], isLoading } = useQuery({
    queryKey: ["pendingPremiumBiodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium/pending");
      return res.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (biodataId) => {
      return await axiosSecure.patch(`/biodata/premium/approve/${biodataId}`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Biodata marked as premium", "success");
      queryClient.invalidateQueries(["pendingPremiumBiodatas"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve this premium request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-[#f19c79] mb-8">
        Pending Premium Requests
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingBiodatas.map((biodata) => (
          <div
            key={biodata._id}
            className="bg-[#cbdfbd] p-6 rounded-lg shadow border border-[#cbdfbd]"
          >
            <p className="text-xl font-semibold text-[#444]">
              Biodata ID: <span className="text-[#f19c79]">{biodata.biodataId}</span>
            </p>
            <p className="text-md text-gray-700 mb-4">
              Name: <span className="font-medium">{biodata.name}</span>
            </p>
            <button
              onClick={() => handleApprove(biodata.biodataId)}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedPremium;
