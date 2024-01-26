import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { clsx } from "clsx";
import {
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  makePrefixer,
  Scrim,
  useFloatingComponent,
  useFloatingUI,
  useForkRef,
  useId,
} from "@salt-ds/core";
import { useWindow } from "@salt-ds/window";
import { useComponentCssInjection } from "@salt-ds/styles";
import drawerCss from "./Drawer.css";

export interface DrawerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Defines the drawer position within the screen. Defaults to `left`.
   */
  position?: "left" | "top" | "right" | "bottom";
  /**
   * Display or hide the component.
   */
  open?: boolean;
  /**
   * Callback function triggered when open state changes.
   */
  onOpenChange?: (newOpen: boolean) => void;
  /**
   * Change background color palette
   */
  variant?: "primary" | "secondary";
}

const withBaseName = makePrefixer("saltDrawer");

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    children,
    className,
    position = "left",
    open = false,
    onOpenChange,
    variant = "primary",
    id: idProp,
    ...rest
  } = props;

  const targetWindow = useWindow();
  useComponentCssInjection({
    testId: "salt-drawer",
    css: drawerCss,
    window: targetWindow,
  });

  const [showComponent, setShowComponent] = useState(false);
  const { Component: FloatingComponent } = useFloatingComponent();

  const id = useId(idProp);

  const { context, floating } = useFloatingUI({
    open,
    onOpenChange,
  });

  const { getFloatingProps } = useInteractions([
    useRole(context),
    useClick(context),
    useDismiss(context),
  ]);

  const handleRef = useForkRef<HTMLDivElement>(floating, ref);

  const getDrawerProps = () => {
    return getFloatingProps({
      ref: floating,
      id: `${id}-drawer`,
    });
  };

  useEffect(() => {
    if (open && !showComponent) {
      setShowComponent(true);
    }
  }, [open, showComponent, setShowComponent]);

  if (!showComponent) return <></>;

  return (
    <Scrim>
      <FloatingComponent
        aria-modal="true"
        open={open}
        ref={handleRef}
        aria-labelledby={`${id}-header`}
        aria-describedby={`${id}-content`}
        focusManagerProps={{
          context: context,
        }}
        className={clsx(
          withBaseName(),
          withBaseName(position),
          {
            [withBaseName("enterAnimation")]: open,
            [withBaseName("exitAnimation")]: !open,
            [withBaseName(variant)]: variant,
          },
          className
        )}
        onAnimationEnd={() => {
          if (!open && showComponent) {
            console.log("onAnimationEnd");
            setShowComponent(false);
          }
        }}
        {...getDrawerProps()}
        {...rest}
      >
        {children}
      </FloatingComponent>
    </Scrim>
  );
});
