function getImageUrl(image: string) {
    const byteCharacters = atob(image); // 
    console.log('getimageurl', byteCharacters)
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const image_file_path = URL.createObjectURL(new Blob([byteArray], { type: 'image/png' }));
    return image_file_path
}

export default getImageUrl