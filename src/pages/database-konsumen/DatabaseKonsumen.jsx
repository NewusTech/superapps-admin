import Filter from "elements/Filter";
import SearchInput from "elements/Search";
import DatePrintFilter from "elements/DatePrintFilter";
import DatabaseKonsumenItem from "elements/DatabaseKonsumenItem";

const DatabaseKonsumen = () => {
  return (
    <>
      <div>
        <SearchInput />
        <div className="flex justify-between mt-8">
          <div className="space-x-1 flex items-center pt-4">
            <Filter active={false} />
          </div>
          <div className="flex items-end">
            <DatePrintFilter />
          </div>
        </div>
      </div>
      <div className="my-8 bg-white border rounded-md">
        <div className="flex flex-row gap-4 py-4 bg-gray-100 items-center text-sm font-bold border-b">
          <span className="w-36 text-center">Nama</span>
          <span className="w-36 text-center">Tanggal</span>
          <span className="w-48 text-center">Nomor Telepon</span>
          <span className="w-36 text-center">Email</span>
          <span className="w-52 text-center">Titik Jemput</span>
          <span className="w-52 text-center">Titik Antar</span>
          <span className="w-32 text-center">Jumlah Pesanan</span>
          <span className="w-60 text-center">Harga</span>
          <div className="w-5 h-4" />
        </div>
        <div className="flex flex-col">
          <DatabaseKonsumenItem />
          <DatabaseKonsumenItem />
          <DatabaseKonsumenItem />
        </div>
      </div>
    </>
  );
};

export default DatabaseKonsumen;
