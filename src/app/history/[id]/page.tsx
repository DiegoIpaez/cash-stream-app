interface Params {
  params: {
    id: string;
  };
}
const HistoryId = ({ params }: Params) => {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1>History: {id}</h1>
    </div>
  );
};

export default HistoryId;
