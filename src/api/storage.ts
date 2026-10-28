// Static mock storageApi - no server required
export const storageApi = {
    getUploadUrl: async (_folder: string, _fileName: string, _contentType: string) => {
        return {
            signature: "mock_signature",
            api_key: "mock_key",
            cloud_name: "mock_cloud",
            result: true
        };
    },
    getMultipleUploadUrls: async (_folder: string, fileNames: string[], _contentType: string) => {
        return {
            result: true,
            signatures: fileNames.map(() => ({
                signature: "mock_signature",
                api_key: "mock_key",
                cloud_name: "mock_cloud"
            }))
        };
    },
    upload: async (_formData: FormData, _format: "image" | "video", onProgress?: (percent: number) => void) => {
        if (onProgress) onProgress(100);
        return true;
    }
};