export default function TESTPAGE() {
    const background="#4d7c0f";
    const parentBg = `bg-[${background}]/80`

    return (


        <><div className="h-screen grid place-items-center ">
            <div className="w-12 p-5  gap-3">
                <div className={`relative z-10 rounded-full p-5 text-black w-40 flex items-center 
                    justify-between ${parentBg}`}
                >
                    <p>Btn</p>
                    <div className={`relative z-20 w-5 h-5 grid place-items-center rounded-full bg-[${background}]`}>x</div>
                </div>

            </div>

        </div></>
    )

}