export const commonFileTypes = {
    images: ["image/bmp", "image/jpeg", "image/png", "image/webp", "image/vnd.microsoft.icon", "image/svg+xml", "image/tiff", "image/avif"],
    audio: ["audio/mp4", "audio/mpeg", "audio/ogg", "audio/wav", "audio/webm"],
    video: ["video/mp4", "video/mpeg", "video/ogg", "video/webm"],
    text: ["text/html", "text/plain", "text/calendar", "text/markdown", "text/javascript", "application/xml", "text/xml"],
    documents: ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/json", "application/x-httpd-php", "application/rtf", "application/manifest+json"],
    archives: ["application/zip", "application/x-7z-compressed", "application/vnd.rar", "application/x-tar"],
    other: ["text/calendar", "font/otf", "font/ttf", "application/vnd.rar"],
    
}

export function convertFileTypesToList(fileTypes: (keyof typeof commonFileTypes)[]) {
    const commonFileTypesList: string[] = [];
    for (const type of fileTypes) {
        if (commonFileTypes[type]) {
            commonFileTypesList.push(...commonFileTypes[type]);
        }
    }
    return commonFileTypesList;
}

export function convertMimeToReadable(mime: string) {
    if (mime === "application/x-directory") return "Folder";
    if (mime === "application/pdf") return "PDF Document";
    if (mime === "text/plain" || mime === "application/msword" || mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "Text Document";
    if (mime === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || mime === "application/vnd.ms-powerpoint") return "Presentation";
    const parts = mime.split("/");
    if (parts.length < 2) return mime;
    if (parts[0] === "image") return parts[1]?.toUpperCase() + " Image";
    return parts[1]?.toUpperCase() + " File";
}

