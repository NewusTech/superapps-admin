import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import FormLabel from "elements/form/label/label";
import { useState } from "react";
import FormTextArea from "elements/form/text-area/text-area";
import Buttons from "elements/form/button/button";
import FormInput from "elements/form/input/input";
import { createNewCar } from "service/api";
import Swal from "sweetalert2";

const TambahMobil = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [carsForm, setCarsForm] = useState({
    type: "",
    jumlah_kursi: 0,
    fasilitas: "",
    nopol: "",
  });

  const handleNewCar = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await createNewCar(carsForm);

      if (response.success === true) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil menambahkan mobil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        navigate("/mobil");
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 px-4">
      <Breadcrumb>
        <Link to="/mobil" className="flex pr-3 items-center text-[#0705EC]">
          <p>Mobil</p>
        </Link>
        <Breadcrumb.Item active="true" className="">
          <p className="ml-3">Tambah Mobil</p>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white mt-10">
        <form onSubmit={handleNewCar} className="p-10">
          <div className="flex flex-col w-full gap-y-6">
            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Tipe Mobil"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="tipe-mobil"
                  name="type"
                  value={carsForm.car}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, type: e.target.value })
                  }
                  htmlFor="tipe-mobil"
                  label="Tipe Mobil"
                  classLabel="w-full"
                />
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="number"
                  placeholder="Jumlah Kursi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="jumlah-kursi"
                  name="jumlah_kursi"
                  value={carsForm.seat}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, jumlah_kursi: e.target.value })
                  }
                  htmlFor="jumlah-kursi"
                  label="Jumlah Kursi"
                  classLabel="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-6">
              <div className="flex flex-col w-full gap-y-3">
                <FormInput
                  type="text"
                  placeholder="Nomor Polisi"
                  className="w-full border border-outlineBorder rounded-md h-[40px] pl-3"
                  id="nopop"
                  name="nopol"
                  value={carsForm.seat}
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, nopol: e.target.value })
                  }
                  htmlFor="nopol"
                  label="Nomor Polisi"
                  classLabel="w-full"
                />
              </div>

              <div className="w-full flex flex-col gap-y-3">
                <FormLabel
                  htmlFor="fasilitas"
                  name="Fasilitas"
                  className="w-full"
                />

                <FormTextArea
                  value={carsForm.facilities}
                  name="fasilitas"
                  id="fasilitas"
                  placeholder="Fasilitas"
                  onChange={(e) =>
                    setCarsForm({ ...carsForm, fasilitas: e.target.value })
                  }
                  className="w-full border border-outlineBorder pl-3 h-[100px] rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 w-full">
            <Buttons
              isLoading={isLoading}
              disables={isLoading ? true : false}
              type="submit"
              className="w-full bg-main hover:bg-primary-600 text-paper py-2 rounded-md"
              name="Tambah"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default TambahMobil;
