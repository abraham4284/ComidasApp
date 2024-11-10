import React, { useState } from "react";
import { CardUsuario } from "../../components/perfil/CardUsuario";
import { TableDomicilios } from "../../components/perfil/TableDomicilios";

export const PerfilPage = () => {
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
       toggleModal= {toggleModal}
       closeModal = {closeModal}
       isOpen = {isOpen}
       setDataToEdit = {setDataToEdit}
      />
      <TableDomicilios
        toggleModal={toggleModal}
        closeModal={closeModal}
        isOpen={isOpen}
        dataToEdit = { dataToEdit }
        setDataToEdit = {setDataToEdit}
      />
    </div>
  );
};
