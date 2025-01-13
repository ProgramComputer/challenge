interface RunReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reportData?: {
    rows: Array<{
      id: number;
      name: string;
      age: number;
      shard: number;
    }>;
  };
}

export function RunReportPanel({ isOpen, onClose, reportData }: RunReportPanelProps) {
  return (
    <div
      className={`fixed top-20 right-4 h-[90vh] w-96 bg-white border border-gray-200 rounded-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-40`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Run Report</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>
      <div className="p-4 text-gray-600">
        {reportData ? (
          <div>
            <h3 className="font-bold mb-4">Data Distribution Across Shards:</h3>
            {[1, 2, 3].map((shardNum) => (
              <div key={shardNum} className="mb-6">
                <div className="font-bold text-blue-500 mb-2">Shard {shardNum}</div>
                <div className="font-mono bg-gray-50 p-2 rounded">
                  {reportData.rows
                    .filter((row) => row.shard === shardNum)
                    .map((row) => (
                      <div key={row.id} className="text-sm">
                        {row.id} | {row.name} | {row.age}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Click Run Flow to see sharding in action</p>
        )}
      </div>
    </div>
  );
}
