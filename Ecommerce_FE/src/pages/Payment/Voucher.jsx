/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getCoupons } from '~/apis/getAPIs';
import ModalBox from '~/components/ModalBox';
import { isEmpty } from '~/utils/isEmpty';
import voucherImg from '~/assets/voucher.png';

function Voucher({ appliedVoucher, setAppliedVoucher }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await getCoupons();
      if (response.status === 200) {
        const availableCoupons = response.data.filter(coupon => coupon?.Quantity > 0)
        setVouchers(availableCoupons);
      }
    }

    fetchCoupons();
  }, []);

  const handleApplyVoucher = () => {
    if (selectedVoucher) {
      setAppliedVoucher(selectedVoucher);
      setIsOpenModal(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg font-medium p-4 flex items-center justify-end mt-8 shadow-md">
        <div className="flex items-center mr-7">
          <div className="w-6 h-auto"><img src={voucherImg} /></div>
          <div className="p-2 mb-0.5">
            {!isEmpty(appliedVoucher) ? `Mã áp dụng: ${appliedVoucher.Title}` : 'Chưa chọn mã giảm giá'}
          </div>
        </div>
        <button
          className="bg-none border-none cursor-pointer text-primary-400"
          onClick={() => setIsOpenModal(true)}
        >
          Chọn mã giảm giá
        </button>
        <ModalBox isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} vouchers={vouchers}>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="w-[calc(100%-80px)] p-2 mr-0.5 flex-1 border border-[#cccccc] rounded-[2px] outline-none focus:border-[#a8a8a8] focus:shadow-md focus:shadow-gray-400"
              value={selectedVoucher.Title}
            />
            <button
              className="p-2 whitespace-nowrap bg-primary-500 text-white border-none rounded-sm cursor-pointer hover:bg-primary-600"
              onClick={handleApplyVoucher}
            >
              ÁP DỤNG
            </button>
          </div>
          <div className="mt-5 max-h-[150px] overflow-y-auto pr-2">
            {vouchers.map((voucher, index) => (
              <div
                key={voucher.CouponID}
                className="flex justify-between p-2 border border-gray-300 rounded-md mb-2 cursor-pointer"
                onClick={() => setSelectedVoucher(vouchers[index])}
              >
                <div className="font-semibold line-clamp-1">{voucher.Title}</div>
                <div className="text-gray-700 line-clamp-1">{voucher.Detail}</div>
              </div>
            ))}
          </div>
        </ModalBox>
      </div>
    </div>
  );
}

export default Voucher;