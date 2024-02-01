import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { makePrefixer, useId } from "@salt-ds/core";
import { clsx } from "clsx";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import menuGroupCss from "./MenuGroup.css";

export interface MenuGroupProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * The label of the option group.
   */
  label?: string;
  /**
   * Options to be rendered inside the option group.
   */
  children?: ReactNode;
}

const withBaseName = makePrefixer("saltMenuGroup");

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  function MenuGroup(props, ref) {
    const { className, children, label, ...rest } = props;

    const targetWindow = useWindow();
    useComponentCssInjection({
      testId: "salt-menu-group",
      css: menuGroupCss,
      window: targetWindow,
    });

    const labelId = useId();

    return (
      <div
        aria-labelledby={labelId}
        className={clsx(withBaseName(), className)}
        role="group"
        ref={ref}
        {...rest}
      >
        {label && (
          <div aria-hidden className={withBaseName("label")} id={labelId}>
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);
