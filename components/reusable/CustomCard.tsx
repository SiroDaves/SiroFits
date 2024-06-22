import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

interface CustomCardProps {
  title?: string;
  label?: string;
  value?: string;
  description?: string;
  SubComponent?: React.FC;
  Icon: React.FC;
  iconColor?: string;
  iconBackGroundColor?: string;
}

export const CustomCard: FC<CustomCardProps> = ({
  title,
  label,
  value,
  description,
  SubComponent,
  Icon,
  iconBackGroundColor,
  iconColor,
}) => {
  return (
    <Card className="rounded-xl">
      <CardContent className="mt-5 flex items-center justify-between">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm">{label}</CardDescription>
          <p className="text-gray-500 text-xs">{value}</p>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
        <div
          className={`h-16 w-16 ${iconBackGroundColor} rounded-full flex items-center justify-center ${iconColor}`}
        >
          <Icon />
        </div>
      </CardContent>
      <CardFooter>{SubComponent ? <SubComponent /> : null}</CardFooter>
    </Card>
  );
};
