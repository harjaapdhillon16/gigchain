import React from "react";
import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";

export default function CheckTags() {
  const [groupSelected, setGroupSelected] = React.useState([]);

  return (
    <div className="flex pl-3 flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        orientation="horizontal"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <CustomCheckbox value="wifi">Development</CustomCheckbox>
        <CustomCheckbox value="tv">Marketing</CustomCheckbox>
        <CustomCheckbox value="kitchen">Product Development</CustomCheckbox>
        <CustomCheckbox value="parking">Web3</CustomCheckbox>
        <CustomCheckbox value="pool">Blogging</CustomCheckbox>
      </CheckboxGroup>
    </div>
  );
}

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomCheckbox = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};

export const CheckIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
