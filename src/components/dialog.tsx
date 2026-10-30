import { useId, useLayoutEffect, useRef, type ReactNode } from "react";

type DialogProps = {
  heading: string;
  onCancel: () => void;
  children: ReactNode;
};

// A modal native <dialog>. Render it only while open: it opens on mount and
// closes on unmount. Escape and clicking the backdrop both call onCancel.
export function Dialog({ heading, onCancel, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);
  const headingId = useId();

  // Layout effect so close() runs while the element is still in the document,
  // which lets the browser return focus to the control that opened the dialog.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      className="m-auto w-full max-w-md rounded-lg border border-border bg-surface p-0 text-text shadow-xl backdrop:bg-text/40"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      // Chrome can close on a repeated Escape without firing "cancel"; keep
      // React's open state in sync if the browser closes the dialog itself.
      // The "close" event is queued, so ignore it if the dialog has since been
      // reopened (Strict Mode re-runs the effect above in development).
      onClose={(event) => {
        if (!event.currentTarget.open) onCancel();
      }}
      // The panel's padding sits on an inner element, so only a press on the
      // backdrop targets the <dialog> itself. Requiring the press to start
      // there too stops a text selection dragged out of a field from cancelling.
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressStartedOnBackdrop.current && event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="flex flex-col gap-4 p-5">
        <h2 id={headingId} className="text-lg font-semibold">
          {heading}
        </h2>
        {children}
      </div>
    </dialog>
  );
}

export const buttonStyles = {
  primary:
    "rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90",
  secondary:
    "rounded-md border border-border bg-surface px-4 py-2 font-medium hover:bg-page",
  destructive:
    "rounded-md bg-destructive px-4 py-2 font-medium text-white hover:bg-destructive/90",
};
