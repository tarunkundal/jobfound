import { createClient } from "@/lib/supabseClient";

interface useGetFileUrlProps {
    filePath: string;
    folder: string
}

const useGetFileUrl = async ({ filePath, folder }: useGetFileUrlProps) => {
    const supabase = createClient();

    const { data: publicUrlData } = await supabase.storage
        .from(folder)
        .createSignedUrl(filePath, 3600);

    const publicUrl = publicUrlData;

    if (!publicUrl) throw new Error("Public URL missing");

    return { publicUrl }
}

export default useGetFileUrl