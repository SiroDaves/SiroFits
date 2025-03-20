import FileDataTable from "@/components/tcx/file_data_table";
import TcxTimeChanger from "@/components/tcx/time_changer";

export default function Home() {
  return (
    <section>
      <div className="border-solid rounded-lg border-2 border-orange-500 m-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
            <div className="col-span-3 grid md:grid-cols-2 gap-10">
              <TcxTimeChanger />
              <FileDataTable />
            </div>
          </div>
        </div >
        <div className="m-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-3">
            <div className="col-span-3 grid md:grid-cols-2 gap-10">

              <div className="border-solid rounded-lg border-2 border-orange-500 h-40"></div>
              <div className="border-solid rounded-lg border-2 border-orange-500"></div>
            </div>
          </div>
        </div >
    </section>
  );
}
