import FileCombiner from "@/components/sports/file-combiner";
import FileDataTable from "@/components/sports/file-data-table";
import TimeChanger from "@/components/sports/time-changer";

export default function Home() {
  return (
    <section>
      <div className="border-solid rounded-lg border-2 border-orange-500 m-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
          <div className="col-span-3 grid md:grid-cols-2 gap-10">
            <TimeChanger />
            <FileDataTable />
          </div>
        </div>
      </div >


      <div className="m-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
          <div className="col-span-3 grid md:grid-cols-2 gap-10">

            <div className="border-solid rounded-lg border-2 border-orange-500">
              <FileCombiner />
            </div>
          </div>
        </div>
      </div >
    </section>
  );
}
