import { ComponentProps } from "react";
import "./Container.css";

export function Container(props: ComponentProps<"div">) {
  const { children, ...rest } = props;
  return (
    <div className="container" {...rest}>
      {props.children}
    </div>
  );
}
