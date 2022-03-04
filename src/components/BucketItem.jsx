import { BsFillCloudDownloadFill } from "react-icons/bs";

const BucketItem = ({bucket, bg_color}) => {

    const downloadFile = (e) => {

        document.getElementsByTagName("body")[0].classList.add("cursor-wait")

        e.preventDefault();
        fetch(`http://www239.cfgs.esliceu.net/objects/${bucket.key}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken")
            },
        })
        .then((response) => response.blob())
        .then((blob) => {

            const url = window.URL.createObjectURL(
            new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
            'download',
            `${bucket.key}`,
            );

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);

            document.getElementsByTagName("body")[0].classList.remove("cursor-wait")
        })
        .catch((err) => {
            alert(err);
            document.getElementsByTagName("body")[0].classList.remove("cursor-wait")
        });
    }

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return(
        <div className={bg_color + " rounded-3xl border shadow-xl hover:shadow-sm p-4 w-1/3 hover:cursor-pointer"} onDoubleClick={e => downloadFile(e)}>
            <div className="flex justify-between mb-4">
                <div className="py-4">
                    <span className="font-bold">{bucket.key}</span>
                </div>
            </div>

            <div className="py-2">
                <h3 className="font-semibold py-1 text-sm text-gray-400">{bucket.lastModified}</h3>
                <p className="font-semibold py-1 text-sm text-gray-600">{formatBytes(bucket.size)}</p>
            </div>
        </div>
    )
}

export default BucketItem;