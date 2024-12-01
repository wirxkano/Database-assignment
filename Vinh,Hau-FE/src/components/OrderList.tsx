import OrderItem from "./OrderItem"
import SearchBar from "./SearchBar"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"



const OrderList = () => {
    const orders = [1,2]
    return (
        <div className="flex flex-col gap-4">
            <div className="flex h-14 items-center">
                <SearchBar />
            </div>
            <Card className="px-8">
                <CardHeader className="flex flex-row w-full justify-between items-center ">
                    <CardTitle className="text-2xl">Order 1</CardTitle>
                    <div className="text-red-500">
                        COMPLETED
                    </div>
                </CardHeader>
                <Separator className="mb-5" />
                <CardContent className="flex items-center gap-4">
                    <OrderItem />
                </CardContent>
                <CardContent className="flex items-center gap-4">
                    <OrderItem />
                </CardContent>
                {orders.map(() => (
                    <CardContent className="flex items-center gap-4">
                        <OrderItem />
                    </CardContent>
                ))}
                <Separator />
                <CardFooter className="flex flex-col items-end w-full gap-3">
                    <div className="flex items-center gap-2 text-2xl pt-4">
                        <Label>Total Price:</Label>
                        <span className="flex items-center text-red-500"><span className="text-xs">đ</span>8.000.000</span>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Button variant="destructive">Buy Again</Button>
                        <Button variant="outline">Contact Us</Button>
                    </div>
                </CardFooter>
            </Card>
            <Card className="px-8">
                <CardHeader className="flex flex-row w-full justify-between items-center ">
                    <CardTitle className="text-2xl">Order 1</CardTitle>
                    <div className="text-red-500">
                        COMPLETED
                    </div>
                </CardHeader>
                <Separator className="mb-5" />
                <CardContent className="flex items-center gap-4">
                    <OrderItem />
                </CardContent>
                <CardContent className="flex items-center gap-4">
                    <OrderItem />
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col items-end w-full gap-3">
                    <div className="flex items-center gap-2 text-2xl pt-4">
                        <Label>Total Price:</Label>
                        <span className="flex items-center text-red-500"><span className="text-xs">đ</span>8.000.000</span>
                    </div>
                    <div className="flex gap-4 pt-2">
                        <Button variant="destructive">Buy Again</Button>
                        <Button variant="outline">Contact Us</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default OrderList