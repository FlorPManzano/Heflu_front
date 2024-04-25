const APIUrl = import.meta.env.VITE_API_URL

const BentoGrid = ({ images }) => {
    let gridComponent
    console.log(images.length)
    switch (images.length) {
        case 1:
            gridComponent = (
                <li className="flex items-center justify-center">
                    <div>
                        <img
                            className="rounded-[50px] object-cover h-[666px] w-[1486px]"
                            src={`${APIUrl}/${images}`}
                            alt=""
                        />
                    </div>
                </li>
            )
            break
        case 2:
            gridComponent = (
                <li className="grid grid-cols-3 items-center justify-center gap-4">
                    <div className="col-span-2">
                        <img
                            className="rounded-tl-[50px] rounded-bl-[50px] object-cover h-[666px] w-[996px]"
                            src={`${APIUrl}/${images[0]}`}
                            alt=""
                        />
                    </div>
                    <div className="col-span-1 h-full">
                        <img
                            className="rounded-tr-[50px] rounded-br-[50px] object-cover h-[666px] w-[490px]"
                            src={`${APIUrl}/${images[1]}`}
                            alt=""
                        />
                    </div>
                </li>
            )
            break
        case 3:
            gridComponent = (
                <li className="grid grid-cols-3 grid-rows-2 items-center justify-center gap-4">
                    <div className="col-span-2 row-span-2 h-full">
                        <img
                            className="rounded-tl-[50px] rounded-bl-[50px] object-cover h-[666px] w-[996px]"
                            src={`${APIUrl}/${images[0]}`}
                            alt=""
                        />
                    </div>
                    <div className="col-span-1 row-span-2 flex flex-col gap-4 items-center justify-between h-full">
                        <div className="row-span-1 h-full">
                            <img
                                className="rounded-tr-[50px] object-cover h-[325px] w-[490px]"
                                src={`${APIUrl}/${images[1]}`}
                                alt=""
                            />
                        </div>
                        <div className="row-span-1 h-full">
                            <img
                                className="rounded-br-[50px] object-cover h-[325px] w-[490px]"
                                src={`${APIUrl}/${images[2]}`}
                                alt=""
                            />
                        </div>
                    </div>
                </li>
            )
            break
        case 4:
            gridComponent = (
                <li className="grid grid-cols-3 grid-rows-2 items-center justify-center gap-4">
                    <div className="col-span-2 row-span-2 h-full">
                        <img
                            className="rounded-tl-[50px] rounded-bl-[50px] object-cover h-[666px] w-[996px]"
                            src={`${APIUrl}/${images[0]}`}
                            alt=""
                        />
                    </div>
                    <div className="col-span-1 row-span-2 flex flex-col gap-4 items-center justify-between h-full">
                        <div className="row-span-1 h-full flex gap-4">
                            <img
                                className="object-cover h-[325px] w-[237px]"
                                src={`${APIUrl}/${images[1]}`}
                                alt=""
                            />
                            <div>
                                <img
                                    className="rounded-tr-[50px] object-cover h-[325px] w-[237px]"
                                    src={`${APIUrl}/${images[2]}`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="row-span-1 h-full">
                            <img
                                className="rounded-br-[50px] object-cover h-[325px] w-[490px]"
                                src={`${APIUrl}/${images[3]}`}
                                alt=""
                            />
                        </div>
                    </div>
                </li>
            )
            break
        case 5:
        default:
            gridComponent = (
                <li className="grid grid-cols-3 grid-rows-2 items-center justify-center gap-4">
                    <div className="col-span-2 row-span-2 h-full">
                        <img
                            className="rounded-tl-[50px] rounded-bl-[50px] object-cover h-[666px] w-[996px]"
                            src={`${APIUrl}/${images[0]}`}
                            alt=""
                        />
                    </div>
                    <div className="col-span-1 row-span-2 flex flex-col gap-4 items-center justify-between h-full">
                        <div className="row-span-1 h-full flex gap-4">
                            <img
                                className="object-cover h-[325px] w-[237px]"
                                src={`${APIUrl}/${images[1]}`}
                                alt=""
                            />
                            <div>
                                <img
                                    className="rounded-tr-[50px] object-cover h-[325px] w-[237px]"
                                    src={`${APIUrl}/${images[2]}`}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="row-span-1 h-full flex gap-4">
                            <img
                                className="object-cover h-[325px] w-[237px]"
                                src={`${APIUrl}/${images[3]}`}
                                alt=""
                            />
                            <div>
                                <img
                                    className="rounded-br-[50px] object-cover h-[325px] w-[237px]"
                                    src={`${APIUrl}/${images[4]}`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </li>
            )
            break
    }

    return gridComponent
}

export default BentoGrid
