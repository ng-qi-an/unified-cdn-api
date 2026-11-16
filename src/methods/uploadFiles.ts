import { UnifiedCDNFile } from "../classes.js";
import { apiRequestData } from "../request.js";
import type { FlexibleAPI } from "../types.js";

export default async function uploadFiles(files: File[], api: FlexibleAPI) {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    const data: {uploads: Omit<ConstructorParameters<typeof UnifiedCDNFile>[0], "viewUrl">[], failed: string[]} = await apiRequestData(api,  "/files/upload", {
        method: "POST",
        body: formData
    })
    const uploadsTransformed = data.uploads.map((upload) => new UnifiedCDNFile(upload, api));
    return {
        uploads: uploadsTransformed,
        failed: data.failed
    }
}