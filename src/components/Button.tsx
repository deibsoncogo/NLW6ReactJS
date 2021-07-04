import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

// o & define que vai poder receber mais tipagens
type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ isOutlined = false, ...props }: ButtonType) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
