const DashboardContent = () => {
  return (
    <>
      <h1 className="text-xl">
        Welcome <b>{`Adrian Villanueva  `}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>ADMIN</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      <ul className="my-4 list-inside list-disc">
        <li>Create discussions</li>
        <li>Edit discussions</li>
        <li>Delete discussions</li>
        <li>Comment on discussions</li>
        <li>Delete all comments</li>
      </ul>
    </>
  );
};

export default DashboardContent;
