import { Label } from "./ui/label"

const OrderItem = () => {
    const nikeImage = "https://giayxshop.vn/wp-content/uploads/2022/06/z5442264909753_24969d985c65eca6bdf2e8561c4e2926.jpg"

    return (
        <>
            <div className="border border-slate-300 w-fit shadow-md">
                <img src={nikeImage} alt="Nike Shoes" width={60} height={60} />
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col justify-start">
                    <span>
                        <Label>Nike Air Force 1</Label>
                    </span>
                    <span className="text-slate-600 text-sm">
                        <p>Category: Premium</p>
                    </span>
                    <span>
                        <p>x2</p>
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xl">
                    <span className="flex items-center text-gray-400 line-through"><span className="text-xs">đ</span><p>5.000.000</p></span>
                    <span className="flex items-center text-red-500"><span className="text-xs">đ</span>4.000.000</span>
                </div>
            </div>
        </>
    )
}

export default OrderItem