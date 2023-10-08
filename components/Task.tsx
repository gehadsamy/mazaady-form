'use client'
import React, { FC, useState } from "react";
import Form from "./Form";
import Table from "./Table";

const Task: FC = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (values: Record<string, any>) => {
    setSelectedValues(values);
    setShowTable(true);
  };

  const handleReset = () => {
    setSelectedValues({});
    setShowTable(false);
  };
  return (
    <>
      {!showTable ? (
        <Form onSubmit={handleSubmit} />
      ) : (
        <Table selectedValues={selectedValues} handleReset={handleReset} />
      )}
    </>
  );
};

export default Task;
