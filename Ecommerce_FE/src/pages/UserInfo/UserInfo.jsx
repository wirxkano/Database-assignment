import { useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { deleteAccount } from '~/apis/deleteAPIs';
import { updateInfoAction } from '~/apis/putAPIs';
import Navbar from "~/components/Navbar";

function UserInfo() {
  const navigate = useNavigate();
  const { user } = useLoaderData();
  const [userInfo, setUserInfo] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addressChanges, setAddressChanges] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...userInfo, addressChanges });

    const response = await updateInfoAction({ ...userInfo, addressChanges });

    if (response.status === 200) {
      setAddressChanges([]);
      setIsEditing(false);
    }
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      street: "",
      commune: "",
      district: "",
      city: "",
      action: "add"
    };
    setUserInfo((prevState) => ({
      ...prevState,
      addresses: [...prevState.addresses, newAddress],
    }));

    setAddressChanges((prevState) => [
      ...prevState,
      { id: newAddress.id, action: "add", data: newAddress },
    ]);
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => {
      const updatedAddresses = prevState.addresses.map((address, idx) =>
        idx === index ? { ...address, [name]: value } : address
      );
      return { ...prevState, addresses: updatedAddresses };
    });

    setAddressChanges((prevState) => {
      const existingChange = prevState.find(
        (change) => change.id === userInfo.addresses[index].id
      );

      if (existingChange) {
        return prevState.map((change) =>
          change.id === userInfo.addresses[index].id
            ? { ...change, data: { ...change.data, [name]: value } }
            : change
        );
      }
    });
  };

  const handleRemoveAddress = (index) => {
    const addressToRemove = userInfo.addresses[index];

    setUserInfo((prevState) => {
      const updatedAddresses = prevState.addresses.filter(
        (_, idx) => idx !== index
      );

      return { ...prevState, addresses: updatedAddresses };
    });

    setAddressChanges((prevState) => {
      if (addressToRemove.action === "add") {
        return prevState.filter((change) => change.id !== addressToRemove.id);
      }

      return [
        ...prevState,
        { id: addressToRemove.id, action: "delete" },
      ];
    });
  };

  const handleDeleteAccount = async () => {
    const response = await deleteAccount();

    if (response.status === 200) {
      sessionStorage.setItem('infoMessage', 'Tài khoản của bạn đã bị xóa.');
      navigate("/login");
    }

  };

  const formatDate = (date) => {
    if (date !== 'N/A') {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-20">
        {isEditing ? (
          <>
            <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
              <Form onSubmit={handleSubmit}>
                {/* Grid Layout for Basic Info */}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={userInfo.fullName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dob"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={userInfo.dob || ""}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={userInfo.gender}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="N/A">Không</option>
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </select>
                  </div>
                </div>

                {/* Address Management */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Địa chỉ
                  </h3>
                  {userInfo.addresses.map((address, index) => (
                    <div
                      key={address.id}
                      className="mb-4 border p-4 rounded-lg bg-gray-50"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên đường
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={(e) => handleAddressChange(e, index)}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full mb-2 p-2.5"
                      />

                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phường / Xã / Thị trấn
                          </label>
                          <input
                            type="text"
                            name="commune"
                            value={address.commune}
                            onChange={(e) => handleAddressChange(e, index)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quận / Huyện
                          </label>
                          <input
                            type="text"
                            name="district"
                            value={address.district}
                            onChange={(e) => handleAddressChange(e, index)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thành phố / Tỉnh
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={(e) => handleAddressChange(e, index)}
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(index)}
                        className="mt-3 text-red-600 hover:text-red-800 font-medium"
                      >
                        <svg
                          className="w-6 h-6 text-red-600 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="py-2.5 px-2 me-2 mb-2 text-xs font-medium text-center inline-flex items-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-4 h-4 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="currentColor" d="M5 12h14m-7 7V5" />
                    </svg>
                    Thêm địa chỉ
                  </button>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-32 py-2.5 text-center"
                  >
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-gray-800 border border-gray-800 hover:bg-gray-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-32 py-2.5 text-center"
                  >
                    Hủy
                  </button>
                </div>
              </Form>
            </div>
          </>
        ) : (
          <div className="p-8 max-w-5xl mx-auto bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Thông tin khách hàng
                </h1>
                <p
                  className={`text-sm font-medium flex items-center space-x-2 
                  ${userInfo.rank === 'Bronze'
                      ? 'text-orange-400'
                      : userInfo.rank === 'Silver'
                        ? 'text-gray-400'
                        : userInfo.rank === 'Gold'
                          ? 'text-yellow-300'
                          : 'text-blue-400'
                    }`}
                >
                  <span className="inline-block w-4 h-4">
                    {userInfo.rank === 'Bronze' && (
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#cd7f32" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    {userInfo.rank === 'Silver' && (
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#c0c0c0" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    {userInfo.rank === 'Gold' && (
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#ffd700" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                    {userInfo.rank === 'Diamond' && (
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#00c1f5" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    )}
                  </span>
                  <span>
                    Hạng: {userInfo.rank === 'Bronze' ? 'Đồng' : userInfo.rank === 'Silver' ? 'Bạc' : userInfo.rank === 'Gold' ? 'Vàng' : 'Kim cương'}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Chỉnh sửa
              </button>
            </div>

            {/* Account Details Section */}
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Thông tin tài khoản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <strong>Họ và tên:</strong> {userInfo.fullName}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Ngày sinh:</strong> {formatDate(userInfo.dob) || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Số điện thoại:</strong> {userInfo.phone}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                {userInfo.addresses.map((address) => (
                  <div key={address.id} className="mt-2">
                    <p className="text-gray-600">
                      <strong>Địa chỉ:</strong>{" "}
                      {`${address.street}, ${address.commune}, ${address.district}, ${address.city}`}
                    </p>
                  </div> // Ensure this closing tag exists for the mapped div
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsDelete(true)}
                className="text-primary-500 hover:text-primary-700 font-medium mt-4"
              >
                Xóa tài khoản
              </button>
            </div>

            {isDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-md shadow-lg p-6 w-96">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bạn có chắc chắn muốn xóa tài khoản không?
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Tài khoản sẽ bị xóa vĩnh viễn và không thể khôi phục lại.
                  </p>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      onClick={() => setIsDelete(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default UserInfo;
