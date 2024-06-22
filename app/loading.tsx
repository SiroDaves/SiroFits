import { Loader } from "@/components/reusable";

export default function loading() {
  return (
    <div className="mt-4 rounded-lg flex flex-row items-center justify-center w-full h-80 bg-white">
      <Loader />
    </div>
  );
}
