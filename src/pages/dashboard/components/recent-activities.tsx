import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    course: "IT",
    avatarSrc: "/avatars/01.png",
    fallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    course: "Quality Employee",
    avatarSrc: "/avatars/02.png",
    fallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    course: "Quality Employee",
    avatarSrc: "/avatars/03.png",
    fallback: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    course: "Quality Employee",
    avatarSrc: "/avatars/04.png",
    fallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    course: "Quality Employee",
    avatarSrc: "/avatars/05.png",
    fallback: "SD",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    course: "Quality Employee",
    avatarSrc: "/avatars/05.png",
    fallback: "SD",
  },
];

export default function RecentActivities() {
  return (
    <div className='space-y-8 overflow-auto'>
      {activities.map((activity, index) => (
        <div key={index} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={activity.avatarSrc} alt='Avatar' />
            <AvatarFallback>{activity.fallback}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{activity.name}</p>
          </div>
          <div className='ml-auto font-thin text-sm lg:text-xs'>
            has completed the {activity.course}
          </div>
        </div>
      ))}
    </div>
  );
}
