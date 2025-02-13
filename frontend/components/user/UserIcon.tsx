import { useRouter } from "next/navigation";

interface UserIconProps {
  userName: string;
}

const UserIcon = ({ userName }: UserIconProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white">{userName}</span>
    </div>
  );
};

export default UserIcon;
