// Static mock authApi - no server required
export const authApi = {
    getDescription: async (_username: string) => {
        return { result: true, description: "Thành viên LongChat" };
    },
    register: async (_username: string) => {
        return { result: true };
    },
    updateDescription: async (_username: string, description: string) => {
        return { result: true, description };
    }
};
