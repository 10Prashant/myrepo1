import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { SuccessModalComponent } from "../../shared/SuccessModalComponent";
import { DeleteModalComponent } from "../../shared/DeleteModalComponent";
import axios from "axios";

export const CategoryAdminComponent = () => {

  const [currentView, setCurrentView] = useState('L');
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const categoryEditHandler = (category) => {
    setCurrentView('E');
    setCategoryToEdit(category);
  }

  return (
    // <div className="w-full h-full p-6">
    //     <div className="w-full py-4 px-3 text-2xl text-left">
    //         {currentView === 'L' && "Category"}
    //         {currentView === 'A' && "Add Category"}
    //         {currentView === 'E' && "Edit Category"}
    //     </div>
    //     <div className="w-full py-4 px-3 text-right">
    //         {currentView === 'L' && <button onClick={(ev) => setCurrentView('A')} className=" mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
    //             Add Category
    //         </button>
    //         }
    //         {(currentView === 'A' || currentView === 'E') && <button onClick={(ev) => setCurrentView('L')} className=" mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
    //             List Category
    //         </button>}
    //     </div>
    //     {currentView === 'L' && <CategoryListComponent categoryEditHandler={categoryEditHandler} />}
    //     {currentView === 'A' && <CategoryAddFormComponent setCurrentView={setCurrentView} />}
    //     {currentView === 'E' && <CategoryEditFormComponent setCurrentView={setCurrentView} category={categoryToEdit} />}
    // </div>
    <div className="container-fluid p-4 w-full">
      <div className="row">
        <div className="col-lg">
          <div className="py-4 px-3 fs-3">
            {currentView === 'L' && "Category"}
            {currentView === 'A' && "Add Category"}
            {currentView === 'E' && "Edit Category"}
          </div>
          <div className="py-4 px-3 text-md text-end">
            {currentView === 'L' && (
              <button
                onClick={(ev) => setCurrentView('A')}
                className="btn btn-primary mt-2"
              >
                Add Category
              </button>
            )}
            {(currentView === 'A' || currentView === 'E') && (
              <button
                onClick={(ev) => setCurrentView('L')}
                className="btn btn-primary mt-2"
              >
                List Category
              </button>
            )}
          </div>
          {currentView === 'L' && <CategoryListComponent categoryEditHandler={categoryEditHandler} />}
          {currentView === 'A' && <CategoryAddFormComponent setCurrentView={setCurrentView} />}
          {currentView === 'E' && <CategoryEditFormComponent setCurrentView={setCurrentView} category={categoryToEdit} />}
        </div>
      </div>
    </div>

  )
}



const CategoryListComponent = (props) => {


  const [categoryList, setCategoryList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const modalCloseHandler = () => {
    setSuccessMessage(null);
  }

  const onDeleteModalCloseHandler = (deleteConfirmation) => {
    setOpenModal(false);
    if (deleteConfirmation) {
      const apiUrl = "http://localhost:9090/api/categories/del/" + categoryId;
      axios.delete(apiUrl)
        .then((response) => {
          if (response.status === 204) {
            setSuccessMessage("Category deleted successfully!");
            getAllCategory();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }

  const deleteCategoryHandler = (cid) => {
    setOpenModal(true);
    setCategoryId(cid);
  }

  const getAllCategory = () => {
    const apiUrl = "http://localhost:9090/api/categories/getallcategories";
    axios.get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((responseData) => {
        setCategoryList([...responseData]);
        console.log(categoryList); // Note: The console.log here might not display the updated value of categoryList immediately due to the asynchronous nature of this code.
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    // <React.Fragment>
    //     {openModal && <DeleteModalComponent onCloseHandler={onDeleteModalCloseHandler} />}
    //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
    //     <div className="relative overflow-x-auto">
    //         {categoryList.length === 0 && <div className="w-full text-2xl py-10 text-center text-gray-500 h-auto dark:text-gray-400">No category added yet</div>}
    //         {categoryList.length > 0 && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    //             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //                 <tr>
    //                     <th scope="col" className="px-6 py-3">
    //                         S.No.
    //                     </th>
    //                     <th scope="col" className="px-20 py-3">
    //                         Category name
    //                     </th>
    //                     <th scope="col" className="px-4 py-3">

    //                     </th>
    //                     <th scope="col" className="px-4 py-3">

    //                     </th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {
    //                     categoryList.map((category, index) => {
    //                         return (
    //                             <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //                                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     {index + 1}
    //                                 </td>
    //                                 <td className="px-20 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                     {category.categoryName}
    //                                 </td>
    //                                 <td className="px-4 py-4">
    //                                     <svg onClick={(ev) => props.categoryEditHandler(category)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-blue-500 cursor-pointer">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    //                                     </svg>
    //                                 </td>
    //                                 <td className="px-4 py-4">
    //                                     <svg onClick={() => {
    //                                         deleteCategoryHandler(category.id)
    //                                     }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-400 cursor-pointer">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    //                                     </svg>
    //                                 </td>
    //                             </tr>
    //                         )
    //                     })
    //                 }

    //             </tbody>
    //         </table>}
    //     </div>
    // </React.Fragment>
    <React.Fragment>
      {openModal && <DeleteModalComponent onCloseHandler={onDeleteModalCloseHandler} />}
      {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
      <div className="container" style={{ width: "100%" }}>
        {categoryList.length === 0 && (
          <div className="w-full text-2xl py-10 text-center text-gray-500">No category added yet</div>
        )}
        {categoryList.length > 0 && (
          <table className="table table-lg w-full table-responsive text-sm text-left text-gray-500">
            <thead className="table-light">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No.
                </th>
                <th scope="col" className="px-20 py-3">
                  Category name
                </th>
                <th scope="col" className="px-4 py-3">

                </th>
                <th scope="col" className="px-4 py-3">

                </th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category, index) => {
                return (
                  <tr key={category.id}>
                    <td className="px-6 py-4 font-weight-normal">
                      {index + 1}
                    </td>
                    <td className="px-20 py-4 font-weight-normal">
                      {category.categoryName}
                    </td>
                    <td className="px-4 py-4">
                      <svg onClick={(ev) => props.categoryEditHandler(category)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-primary cursor-pointer" style={{ width: '25px', height: '25px' }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </td>
                    <td className="px-4 py-4">
                      <svg onClick={() => {
                        deleteCategoryHandler(category.id)
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-danger cursor-pointer" style={{ width: '20px', height: '20px' }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>


  )
}

const CategoryAddFormComponent = (props) => {

  const [successMessage, setSuccessMessage] = useState(null);

  const modalCloseHandler = () => {
    setSuccessMessage(null);
    props.setCurrentView('L');
  }

  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .max(255, 'Category name must be less than or equal to 255 characters')
        .required('Category name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const apiUrl = "http://localhost:9090/api/categories/createcategory";
      axios.post(apiUrl, values, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.status === 201) {
            setSuccessMessage("Category added successfully!");
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      resetForm();
    }
  });

  return (

    // <form onSubmit={formik.handleSubmit}>
    //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
    //     <div className="grid gap-6 mb-6 md:grid-cols-1">
    //         <div>
    //             <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
    //             <input
    //                 type="text" id="categoryName"
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    //                 placeholder="Ring"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.categoryName}
    //             />
    //             <p className={`${(formik.errors.categoryName && formik.touched.categoryName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.categoryName && formik.touched.categoryName) ? formik.errors.categoryName : "no-error"}</p>
    //         </div>
    //     </div>
    //     <div className="w-full text-center">
    //         <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
    //     </div>
    // </form>
    <form onSubmit={formik.handleSubmit}>
      {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label mb-2">Category Name</label>
        <input
          type="text" id="categoryName"
          className="form-control"
          placeholder="Ring"
          onChange={formik.handleChange}
          value={formik.values.categoryName}
        />
        <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.categoryName && formik.touched.categoryName ? '' : 'd-none'}`}>
          {formik.errors.categoryName ? formik.errors.categoryName : "no-error"}
        </p>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary text-sm">
          Add
        </button>
      </div>
    </form>

  )
}

const CategoryEditFormComponent = (props) => {


  const [successMessage, setSuccessMessage] = useState(null);

  const modalCloseHandler = () => {
    setSuccessMessage(null);
    props.setCurrentView('L');
  }

  const formik = useFormik({
    initialValues: {
      categoryName: props.category.categoryName,
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .max(255, 'Category name must be less than or equal to 255 characters')
        .required('Category name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const apiUrl = "http://localhost:9090/api/categories/update/" + props.category.id;
      axios.put(apiUrl, {
        id: props.category.id,
        categoryName: values.categoryName
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.status === 200) {
            setSuccessMessage("Category updated successfully!");
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return (

    // <form onSubmit={formik.handleSubmit}>
    //     {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
    //     <div className="grid gap-6 mb-6 md:grid-cols-1">
    //         <div>
    //             <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
    //             <input
    //                 type="text" id="categoryName"
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    //                 placeholder="Ring"
    //                 onChange={formik.handleChange}
    //                 value={formik.values.categoryName}
    //             />
    //             <p className={`${(formik.errors.categoryName && formik.touched.categoryName) ? '' : 'invisible'} text-red-500 text-xs font-open-sans font-normal`}>{(formik.errors.categoryName && formik.touched.categoryName) ? formik.errors.categoryName : "no-error"}</p>
    //         </div>
    //     </div>
    //     <div className="w-full text-center">
    //         <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
    //     </div>
    // </form>
    <form onSubmit={formik.handleSubmit}>
      {successMessage !== null && <SuccessModalComponent closeHandler={modalCloseHandler} message={successMessage} />}
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label mb-2">Category Name</label>
        <input
          type="text" id="categoryName"
          className="form-control"
          placeholder="Ring"
          onChange={formik.handleChange}
          value={formik.values.categoryName}
        />
        <p className={`text-danger text-xs font-open-sans font-normal ${formik.errors.categoryName && formik.touched.categoryName ? '' : 'd-none'}`}>
          {formik.errors.categoryName ? formik.errors.categoryName : "no-error"}
        </p>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-primary text-sm">
          Edit
        </button>
      </div>
    </form>


  )
}
