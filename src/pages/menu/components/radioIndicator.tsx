interface RadioIndicatorProps {
  onDecrement: () => void;
  onIncrement: () => void;
  selected: boolean;
}

export function RadioIndicator({
  selected,
  onDecrement,
  onIncrement,
}: RadioIndicatorProps) {
  return (
    <button
      className="flex items-center justify-center"
      onClick={selected ? onDecrement : onIncrement}
      type="button"
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
          selected ? "border-primary" : "border-gray-300"
        }
    `}
      >
        {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </div>
    </button>
  );
}
