import { UnifiedCDNFile } from "../classes.js";
import type { UnifiedCDN } from "../index.js";

export default async function uploadFiles(ucdn: UnifiedCDN, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    const data: {uploads: Omit<ConstructorParameters<typeof UnifiedCDNFile>[0], "viewUrl">[], failed: string[]} = await ucdn.requestData("/files/upload", {
        method: "POST",
        body: formData
    })
    const uploadsTransformed = data.uploads.map((upload) => new UnifiedCDNFile(upload, ucdn));
    return {
        uploads: uploadsTransformed,
        failed: data.failed
    }
}