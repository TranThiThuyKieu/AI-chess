// Pure static frontend storage service without server or Cloudinary backend

export async function uploadAttachment(
    _folder: string,
    file: File,
    onProgress?: (percent: number) => void
): Promise<{ result: boolean, message: string, url: string }> {
    if (onProgress) onProgress(100);
    try {
        const url = URL.createObjectURL(file);
        return { result: true, message: "Tải lên thành công", url };
    } catch (e) {
        return { result: false, message: "Không thể xử lý tệp", url: "" };
    }
}

export async function uploadMultipleAttachments(
    _folder: string,
    files: File[],
    onProgress?: (percent: number) => void
): Promise<{ result: boolean, message: string, urls: string[] }> {
    if (onProgress) onProgress(100);
    try {
        const urls = files.map(file => URL.createObjectURL(file));
        return {
            result: true,
            message: `Tải lên thành công ${files.length}/${files.length} tệp.`,
            urls
        };
    } catch (e) {
        return { result: false, message: "Lỗi xử lý tệp", urls: [] };
    }
}

export const getThumbnail = (url: string, _width = 200) => {
    return url;
};

export const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = fileName || "download";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download failed", error);
    }
};