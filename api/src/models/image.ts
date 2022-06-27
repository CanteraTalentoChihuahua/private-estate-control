export default {
    getImageDupe: 'SELECT * FROM images WHERE image_name =? @imageName',
    insertImage: `INSERT INTO images SET ?`
}