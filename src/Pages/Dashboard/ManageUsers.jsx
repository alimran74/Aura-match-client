import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Shared/Spinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`);
      return res.data;
    },
  });

  // Make Admin Mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/users/admin/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Success", "User is now an admin", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to make user admin", "error");
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Make this user an admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        makeAdminMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#f19c79]">
        👥 Manage Users
      </h2>

      {/* Search Field */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full max-w-sm shadow-sm focus:outline-[#f19c79]"
        />
      </div>

      {/* Card Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-[#cbdfbd] p-6 rounded-lg shadow border border-[#cbdfbd] flex flex-col justify-between"
          >
            <div className="mb-4">
              <p className="text-lg font-semibold text-[#444] mb-2">
                Name: <span className="text-[#f19c79]">{user.name}</span>
              </p>
              <p className="text-sm text-gray-700">
                Email: <span className="font-medium">{user.email}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Role: <span className="capitalize">{user.role || "user"}</span>
              </p>
            </div>

            {user.role !== "admin" && (
              <button
                onClick={() => handleMakeAdmin(user._id)}
                className="mt-4 px-4 py-2 rounded bg-[#f19c79] hover:bg-[#e6855f] text-white hover:text-gray-700 transition"
              >
                Make Admin
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
