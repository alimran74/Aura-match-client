export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md p-4 bg-[#cbdfbd] ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`text-center ${className}`}>{children}</div>
);
