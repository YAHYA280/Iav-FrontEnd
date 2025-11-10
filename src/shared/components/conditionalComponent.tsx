import { Fragment } from "react";

type PropsType = {
  isValid: boolean;
  defaultComponent?: React.ReactNode;
  children: React.ReactNode;
};

export default function ConditionalComponent({ 
  isValid, 
  defaultComponent, 
  children 
}: PropsType): JSX.Element {
  return <>{isValid ? children : defaultComponent || null}</>;
}
