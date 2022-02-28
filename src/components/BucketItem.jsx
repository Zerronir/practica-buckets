const BucketItem = (props) => {

    if(props.own) {
        return(
            <div className="bg-white rounded-3xl border shadow-xl p-8 w-1/2">
                <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="font-bold">{props.name}</span><br />
                </div>
                </div>
                <div>
                <h3 className="font-semibold text-sm text-gray-400">BTC</h3>
                <h1 className="font-semibold text-xl text-gray-700">{props.owner}</h1>
                </div>
            </div>
        )
    } else {
        return(
            <div className="bg-gray-200 rounded-3xl border shadow-xl p-8 w-1/2">
                <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="font-bold">{props.name}</span><br />
                </div>
                </div>
                <div>
                <h3 className="font-semibold text-sm text-gray-400">BTC</h3>
                <h1 className="font-semibold text-xl text-gray-700">{props.owner}</h1>
                </div>
            </div>
        )
    }
}

export default BucketItem;