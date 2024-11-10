import React, { useState } from "react";
import { CardUsuario } from "../../Home/components/perfil/CardUsuario";

export const HomeAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="p-5 m-auto w-full">
      <CardUsuario
        toggleModal={toggleModal}
        closeModal={closeModal}
        isOpen={isOpen}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};
