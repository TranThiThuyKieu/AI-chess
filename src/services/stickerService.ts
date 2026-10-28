import { MOCK_STICKERS } from "@/constants/staticMockData";

export interface StickerResponse {
    data: {
        data: {
            id: string,
            slug: string,
            file: {
                md: {
                    webp: {
                        url: string,
                    }
                }
            },
            blur_preview: string
        }[],
        has_next: boolean
    },
}

export class stickerService {
    static async trending(_page = 1, _perPage = 40): Promise<StickerResponse> {
        return {
            data: {
                data: MOCK_STICKERS.map((s, idx) => ({
                    id: String(idx + 1),
                    slug: `sticker-${idx + 1}`,
                    file: {
                        md: {
                            webp: {
                                url: s.src
                            }
                        }
                    },
                    blur_preview: s.preview
                })),
                has_next: false
            }
        };
    }
    
    static async search(search: string, _page = 1, _perPage = 40): Promise<StickerResponse> {
        const query = search.trim().toLowerCase();
        const filtered = query
            ? MOCK_STICKERS.slice(0, 8)
            : MOCK_STICKERS;

        return {
            data: {
                data: filtered.map((s, idx) => ({
                    id: String(idx + 1),
                    slug: `sticker-${idx + 1}`,
                    file: {
                        md: {
                            webp: {
                                url: s.src
                            }
                        }
                    },
                    blur_preview: s.preview
                })),
                has_next: false
            }
        };
    }
}