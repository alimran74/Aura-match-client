import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card, CardContent } from "../../components/ui/card";
import Spinner from "../../components/Shared/Spinner";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <Spinner/>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  <Card className="bg-[#cbdfbd] shadow-md rounded-2xl">
    <CardContent className="text-center p-6">
      <h3 className="text-lg font-semibold text-[#f19c79]">Total Biodata</h3>
      <p className="text-4xl font-bold text-[#2f2f2f]">{stats.total}</p>
    </CardContent>
  </Card>

  <Card className="bg-[#cbdfbd] shadow-md rounded-2xl">
    <CardContent className="text-center p-6">
      <h3 className="text-lg font-semibold text-[#f19c79]">Male Biodata</h3>
      <p className="text-4xl font-bold text-[#1d2f1f]">{stats.male}</p>
    </CardContent>
  </Card>

  <Card className="bg-[#cbdfbd] shadow-md rounded-2xl">
    <CardContent className="text-center p-6">
      <h3 className="text-lg font-semibold text-[#f19c79]">Female Biodata</h3>
      <p className="text-4xl font-bold text-[#3a3a3a]">{stats.female}</p>
    </CardContent>
  </Card>

  <Card className="bg-[#cbdfbd] shadow-md rounded-2xl">
    <CardContent className="text-center p-6">
      <h3 className="text-lg font-semibold text-[#f19c79]">Premium Biodata</h3>
      <p className="text-4xl font-bold text-[#3a3a3a]">{stats.premium}</p>
    </CardContent>
  </Card>

  <Card className="bg-[#cbdfbd] shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-1">
    <CardContent className="text-center p-6">
      <h3 className="text-lg font-semibold text-[#f19c79]">Total Revenue</h3>
      <p className="text-4xl font-bold text-[#2f2f2f]">${stats.revenue}</p>
    </CardContent>
  </Card>
</div>


  );
};

export default AdminDashboard;
