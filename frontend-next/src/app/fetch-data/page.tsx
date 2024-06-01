async function getData() {
  const res = await fetch("http://localhost:5951/", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// export const dynamic = "force-dynamic";

export default async function FetchDataPage() {
  let data = await getData();

  // console.log("data: ", data.persons);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">FetchDataPage</h1>
      <div className="w-96">
        {data?.persons.map((item: any, idx: number) => (
          <div className="flex justify-between py-2 px-4 gap-4 border-b" key={idx}>
            <p>{item?.name}</p>
            <p>{item?.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
