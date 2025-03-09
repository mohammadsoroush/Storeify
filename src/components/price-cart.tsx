import React from "react";

export const Price_cart = ({ price }: { price: number | string}) => {
  const numericPrice = Number(price); // تبدیل رشته به عدد
  const value = numericPrice.toFixed(2); // اعمال toFixed روی عدد
  const [intVal, floatVal] = value.split(".");
  return (
    <p>
      <span className="align-super text-xs">$</span>
      {intVal}.
      <span className="align-super text-xs">{floatVal}</span>
    </p>
  );
};
