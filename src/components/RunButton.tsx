interface RunButtonProps {
  onRun: () => void;
  disabled?: boolean;
}

export function RunButton({ onRun, disabled }: RunButtonProps) {
  const runFlow = () => {
    if (disabled) return;
    console.log("Running flow...");
    onRun();
  };

  return (
    <button
      onClick={runFlow}
      disabled={disabled}
      className={`absolute text-lg top-4 right-4 font-semibold py-2 px-4 rounded-lg transition-colors z-50 flex items-center gap-2
        ${disabled 
          ? 'bg-gray-100 text-gray-400 border-gray-400 cursor-not-allowed' 
          : 'bg-pink-100 hover:bg-pink-200 text-pink-500 border border-pink-500'
        }`}
    >
      {disabled ? 'Running...' : 'Run Flow'}
    </button>
  );
}
