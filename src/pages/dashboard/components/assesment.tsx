import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface EmployeeAssessment {
  title: string;
  description: string;
  image: string;
  url: string;
  progress: number;
}

interface AssessmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  assessment: EmployeeAssessment;
  width?: number;
  height?: number;
  aspectRatio?: "portrait" | "square";
  progressAssessment?: number;
}

const AssessmentCard = ({
  assessment,
  aspectRatio = "portrait",
  width,
  height,
  progressAssessment,
  className,
  ...props
}: AssessmentCardProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setProgress(Number(progressAssessment)),
      500
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("space-y-3 bg-slate-200 dark:bg-slate-800 p-3 rounded-xl", className)} {...props}>
      <div className='overflow-hidden rounded-md'>
        <img
          src={assessment.image}
          alt={assessment.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-fill transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[4/2.5]"
          )}
        />
      </div>
 
      <div className='space-y-3 text-sm pb-4'>
        <Progress value={progress} className='w-full h-1' />
        <h3 className='font-bold leading-none mt-3'>{assessment.title}</h3>
        <p className='text-xs font-medium text-muted-foreground'>
          {assessment.description}
        </p>
      </div>
    </div>
  );
};

export default AssessmentCard;
