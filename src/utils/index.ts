
export const filePathConstructor = {
    resumes: 'resume',
    photos: 'photo'
}

export const getFileExtension = (file: File) => {
    return file.name.split('.').pop()?.toLowerCase() || "";
};

// Map folder names to database columns
export const columnMap: Record<string, string> = {
    resumes: "resume_url",
    photos: "photo_url",
};


export const mimeMap: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
};