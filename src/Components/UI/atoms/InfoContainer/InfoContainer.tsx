interface IProps {
  label?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const InfoContainer = ({ label, className, children }: IProps) => (
  <div className="grid gap-6 rounded-md p-6">
    <div className="text-md font-bold text-mine-shaft">{label}</div>
    <div className={className}>{children}</div>
  </div>
);
