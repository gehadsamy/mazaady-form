"use client";
import React, { FC, useEffect } from "react";
import { getData } from "@/core/api.crud";
import { useState } from "react";
import useSWR from "swr";
import Dropdown from "./Dropdown";
import { category } from "@/types/types";

interface FormProps {
  onSubmit: (values: Record<string, any>) => void;
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [categories, setCategories] = useState<Array<category>>();
  const [categoryProps, setCategoryProps] = useState<Array<any>>();
  const [propOptionChildren, setPropOptionChildren] = useState<any>();
  const [propOptionChildren2, setPropOptionChildren2] = useState<any>();

  const [selectedCategory, setSelectedCategory] = useState<category>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<category>();
  const [selectedCategoryProp, setSelectedCategoryProp] = useState<category>();
  const [selectedOther, setSelectedOther] = useState<string>();
  const [selectedPropOption, setSelectedPropOption] = useState<any>();
  const [selectedPropOption2, setSelectedPropOption2] = useState<any>();
  const [selectedPropOption2Option, setSelectedPropOption2Option] =
    useState<any>();
  const [selectedValues, setSelectedValues] = useState({});

  const { data: getCategories, isLoading: loadingCategories } = useSWR(
    "get_all_cats",
    getData,
    {
      onSuccess(data) {
        setCategories(data.data.categories);
      },
      revalidateOnFocus: false,
    }
  );

  const { data: getCategoryProps, isLoading: loadingProps } = useSWR(
    selectedSubCategory ? `properties/?cat=${selectedSubCategory?.id}` : null,
    getData,
    {
      onSuccess(data) {
        setCategoryProps([...data.data, { id: 0, name: "Other" }]);
      },
      revalidateOnFocus: false,
    }
  );

  const { data: getPropOptionChildren, isLoading: loadingPropOptionChildren } =
    useSWR(
      selectedPropOption ? `get-options-child/${selectedPropOption?.id}` : null,
      getData,
      {
        onSuccess(data) {
          setPropOptionChildren(data.data);
        },
        revalidateOnFocus: false,
      }
    );

  const handleSelect = (type: string, selectedValue: category) => {
    console.log(`Selected option: ${type}`);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [type]: selectedValue,
    }));

    if (type === "Categories") {
      setSelectedSubCategory(undefined);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedValues);
  };

  useEffect(() => {
    setCategoryProps(undefined);
    setPropOptionChildren(undefined);
    setPropOptionChildren2(undefined);
    setSelectedCategoryProp(undefined);
    setSelectedPropOption(undefined);
    setSelectedPropOption2(undefined);
    setSelectedPropOption2Option(undefined);
  }, [selectedCategory, selectedSubCategory]);
  return (
    <div>
      {!loadingCategories && categories && (
        <div className="w-full py-4 bg-slate-200 min-h-[100vh]">
          <div className="w-[75%]  mx-auto ">
            <Dropdown
              title="Categories"
              options={categories}
              onSelect={handleSelect}
              setSelected={setSelectedCategory}
            />
            {selectedCategory && selectedCategory.children && (
              <Dropdown
                title="Sub-Categories"
                options={selectedCategory.children}
                onSelect={handleSelect}
                setSelected={setSelectedSubCategory}
              />
            )}
            {!loadingProps && !!categoryProps?.length && (
              <Dropdown
                title="Category Properties"
                options={categoryProps}
                onSelect={handleSelect}
                setSelected={setSelectedCategoryProp}
              />
            )}
            {selectedCategoryProp?.name === "Other" && (
              <div>
                <label htmlFor="other" className="pr-8">
                  Please Specify:{" "}
                </label>
                <input
                  type="text"
                  name="other"
                  className="text-black px-4 py-2 rounded-md"
                  onChange={(e) => setSelectedOther(e.target.value)}
                />
              </div>
            )}
            {!!selectedCategoryProp?.options?.length && (
              <Dropdown
                title="Property Options"
                options={selectedCategoryProp.options}
                onSelect={handleSelect}
                setSelected={setSelectedPropOption}
              />
            )}
            {!loadingPropOptionChildren && !!propOptionChildren?.length && (
              <Dropdown
                title="Property Option Children"
                options={propOptionChildren}
                onSelect={handleSelect}
                setSelected={setSelectedPropOption2}
              />
            )}
            {!!selectedPropOption2?.options?.length && (
              <Dropdown
                title="Property Option Children Options"
                options={selectedPropOption2.options}
                onSelect={handleSelect}
                setSelected={setSelectedPropOption2Option}
              />
            )}
            <button
              onClick={handleSubmit}
              className="bg-blue-700 shadow-md px-6 py-2 text-white rounded-lg mt-8"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
