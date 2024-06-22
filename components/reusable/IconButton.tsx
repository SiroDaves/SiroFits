interface IconButtonProps {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  color,
}) => (
  <div
    className={`text-${color} flex font-bold text-xs  cursor-pointer  items-center`}
  >
    <Icon className="h-3 mr-1 w-3" />
    <span className="center-contents">{label}</span>
  </div>
);
